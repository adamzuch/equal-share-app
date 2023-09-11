interface Env {
  EQUAL_SHARE_KV: KVNamespace
}

type ContributionType = {
  amount: number
  contributor: string
  description: string
}

type ShareRequest = {
  id: string
  contributions: ContributionType[]
}

type ShareResponse = {
  link: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const kv = context.env.EQUAL_SHARE_KV

  const { id, contributions } = (await context.request.json()) as ShareRequest

  if (!id) {
    return new Response('Missing id', { status: 400 })
  }
  if (!contributions) {
    return new Response('Missing contributions', { status: 400 })
  }

  try {
    await kv.put(id, JSON.stringify(contributions), { expirationTtl: 60 })

    const list = await kv.list()

    for (const key of list.keys) {
      const value = await kv.get(key.name)
      console.log(key, value)
    }

    const response: ShareResponse = {
      link: `https://equal-share-app.pages.dev/${id}`,
    }

    return new Response(JSON.stringify(response), { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response('Something went wrong', { status: 500 })
  }
}
