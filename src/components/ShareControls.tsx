import { Button, buttonVariants } from '@/components/ui/button'
import type { ContributionType } from '@/lib/calculate-summary'
import { cn } from '@/lib/utils'
import { Check, Copy, Share } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export function ShareControls({
  contributions,
  shareId,
  setShareId,
}: {
  contributions: ContributionType[]
  shareId?: string
  setShareId: React.Dispatch<React.SetStateAction<string | undefined>>
}) {
  const shareLink =
    shareId !== undefined ? generateShareLink(shareId) : undefined

  async function shareContributions() {
    const body = JSON.stringify({ contributions })

    fetch('/share', { method: 'POST', body })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error('Failed to share contributions')
        }
        return res.text()
      })
      .then((id) => {
        if (id && typeof id === 'string') {
          setShareId(id)
          navigator.clipboard.writeText(generateShareLink(id))
        }
      })
  }

  return (
    <div className="w-full flex flex-col gap-12 items-center">
      {shareLink ? undefined : (
        <Button onClick={shareContributions}>
          Share
          <Share className="ml-2 h-4 w-4" />
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
                onClick={() => navigator.clipboard.writeText(shareLink)}
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
