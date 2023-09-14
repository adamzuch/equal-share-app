import { nanoid } from 'nanoid'
import { z } from 'zod'

interface Env {
  EQUAL_SHARE_KV: KVNamespace
}

export const contributionsSchema = z.array(
  z.object({
    amount: z.number().nonnegative(),
    contributor: z.string().nonempty(),
    description: z.string(),
  })
)

type Contribution = z.infer<typeof contributionsSchema>[0]

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const kv = context.env.EQUAL_SHARE_KV

  const url = new URL(context.request.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return new Response('Bad request', { status: 400 })
  }

  try {
    const contributions = await kv.get(id)
    if (!contributions) {
      return new Response('Not found', { status: 404 })
    }

    return new Response(JSON.parse(contributions), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response('Something went wrong', { status: 500 })
  }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const kv = context.env.EQUAL_SHARE_KV

  const body = (await context.request.json()) as {
    contributions?: Contribution[]
  }

  if (!body || !body?.contributions) {
    return new Response('Bad request', { status: 400 })
  }

  try {
    const id = nanoid()
    const contributions = contributionsSchema.parse(body.contributions)

    await kv.put(id, JSON.stringify(contributions), { expirationTtl: 60 })

    return new Response(JSON.stringify({ id }), { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response('Something went wrong', { status: 500 })
  }
}
