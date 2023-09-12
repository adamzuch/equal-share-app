import {
  ActionArgs,
  json,
  type LoaderArgs,
  type V2_MetaFunction,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import App from '~/components/App'
import { ContributionType } from '~/lib/calculate-summary'

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

type Env = {
  EQUAL_SHARE_KV: KVNamespace
}

type ShareRequest = {
  id: string
  contributions: ContributionType[]
}

type ShareResponse = {
  id: string
}

export const loader = async ({ context }: LoaderArgs) => {
  const env = context.env as Env

  const keys = await env.EQUAL_SHARE_KV.list()

  return json({ keys })
}

export const action = async ({ context, request }: ActionArgs) => {
  const env = context.env as Env
  const kv = env.EQUAL_SHARE_KV

  const { id, contributions } = (await request.json()) as ShareRequest

  if (!id) {
    return json('Missing id', { status: 400 })
  }
  if (!contributions) {
    return json('Missing contributions', { status: 400 })
  }

  try {
    await kv.put(id, JSON.stringify(contributions), { expirationTtl: 60 })

    const list = await kv.list()

    for (const key of list.keys) {
      const value = await kv.get(key.name)
      console.log(key, value)
    }

    const response: ShareResponse = { id }

    return json(response, { status: 201 })
  } catch (err) {
    console.error(err)
    return json('Something went wrong', { status: 500 })
  }
}

export default function Index() {
  const { keys } = useLoaderData<typeof loader>()

  console.log(keys)

  return <App />
}
