import { useState } from 'react'
import { Copy, Loader2, Share } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import type { ContributionType } from '@/lib/calculate-summary'

export function ShareControls({
  contributions,
  savedContributions,
  setSavedContributions,
}: {
  contributions: ContributionType[]
  savedContributions?: string
  setSavedContributions: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
}) {
  const [shareId, setShareId] = useState<string>()
  const [error, setError] = useState<Error>()
  const [loading, setLoading] = useState<boolean>(false)

  const shareLink =
    shareId !== undefined ? generateShareLink(shareId) : undefined

  const canShare =
    savedContributions === undefined ||
    savedContributions !== JSON.stringify(contributions)

  const { toast } = useToast()

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  const shareContributions = async () => {
    setLoading(true)

    fetch('/share', { method: 'POST', body: JSON.stringify({ contributions }) })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error()
        }
        return res.text()
      })
      .then((id) => {
        if (id && typeof id === 'string') {
          setSavedContributions(JSON.stringify(contributions))
          setShareId(id)
          copyToClipboard(generateShareLink(id))
        }
      })
      .catch((err) => setError(err))
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
          if (error) {
            toast({
              variant: 'destructive',
              title: 'Uh oh!',
              description: 'An error occurred creating the shareable link.',
              duration: 6000,
            })
          }
        }, 500)
      })
  }

  return (
    <div className="w-full flex flex-col gap-12 items-center">
      {canShare ? (
        loading ? (
          <Button disabled={loading} onClick={shareContributions}>
            Saving... <Loader2 className="animate-spin ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button disabled={loading} onClick={shareContributions}>
            Share <Share className="ml-2 h-4 w-4" />
          </Button>
        )
      ) : null}

      {!canShare && shareLink ? (
        <Card className="w-full border-none">
          <CardHeader className="px-0">
            <CardDescription>
              A shareable link has been copied to your clipboard. Anyone with
              the link can view this page, but additional changes will need to
              be saved under a new link. Links expire after 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center gap-2 px-0">
            <a
              href={shareLink}
              className={cn(buttonVariants({ variant: 'link' }), 'px-0')}
            >
              {shareLink}
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                copyToClipboard(shareLink)
                toast({ title: 'Copied to clipboard.', duration: 3000 })
              }}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ) : undefined}
    </div>
  )
}

function generateShareLink(id: string) {
  const { protocol, hostname, port } = window.location
  return `${protocol}//${hostname}${
    port ? `:${port}` : ''
  }/?contributions=${id}`
}
