import {
  json,
  type LoaderArgs,
  type V2_MetaFunction,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { Header } from '~/components/Header'

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

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1 className="text-2xl font-thin text-red-500">Welcome to Remix</h1>
      <Header />
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  )
}
