import { useState } from 'react'
import { Check, Copy, Loader2, Share } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import type { ContributionType } from '@/lib/calculate-summary'

export function ShareControls({
  contributions,
}: {
  contributions: ContributionType[]
}) {
  const [shareId, setShareId] = useState<string>()
  const [, setError] = useState<Error>()
  const [loading, setLoading] = useState<boolean>(false)

  const shareLink =
    shareId !== undefined ? generateShareLink(shareId) : undefined

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const shareContributions = async () => {
    setTimeout(() => setLoading(true), 100)

    fetch('/share', { method: 'POST', body: JSON.stringify({ contributions }) })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error()
        }
        return res.text()
      })
      .then((id) => {
        if (id && typeof id === 'string') {
          setShareId(id)
          copyToClipboard(generateShareLink(id))
        }
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 500)
      })
  }

  return (
    <div className="w-full flex flex-col gap-12 items-center">
      {shareLink ? undefined : loading ? (
        <Button disabled={loading} onClick={shareContributions}>
          Saving... <Loader2 className="animate-spin ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button disabled={loading} onClick={shareContributions}>
          Share <Share className="ml-2 h-4 w-4" />
        </Button>
      )}

      {shareLink ? (
        <Card className="w-full">
          <CardHeader className="">
            <CardTitle className="font-montserrat tracking-wide text-xl font-bold flex items-center">
              Link created <Check className="ml-2" />
            </CardTitle>
            <CardDescription>
              A shareable link has been copied to your clipboard. Anyone with
              the link can view this page, but if changes are made they will be
              saved under a new link. It will expire after 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(shareLink)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <a
                href={shareLink}
                className={cn(buttonVariants({ variant: 'link' }), 'px-0')}
              >
                {shareLink}
              </a>
            </div>
          </CardContent>
        </Card>
      ) : undefined}
    </div>
  )
}

function generateShareLink(id: string) {
  const { protocol, hostname, port } = window.location
  return `${protocol}//${hostname}${port ? `:${port}` : ''}/?share=${id}`
}
