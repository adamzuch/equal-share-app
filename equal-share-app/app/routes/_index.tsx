import {
  json,
  type LoaderArgs,
  type V2_MetaFunction,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import App from '~/components/App'

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

type Env = {
  EQUAL_SHARE_KV: KVNamespace
}

export const loader = async ({ context }: LoaderArgs) => {
  const env = context.env as Env

  const keys = await env.EQUAL_SHARE_KV.list()

  return json({ keys })
}

export default function Index() {
  const { keys } = useLoaderData<typeof loader>()

  console.log(keys)

  return <App />
}
