import { useState } from 'react'
import { nanoid } from 'nanoid'

import { Separator } from '~/components/ui/separator'

import { ContributionType, calculateSummary } from '~/lib/calculate-summary'
import { NewContribution } from '~/components/forms/NewContribution'

import { Summary } from '~/components/Summary'
import { Contributions } from '~/components/Contributions'
import { Header } from '~/components/Header'
import { Button, buttonVariants } from '~/components/ui/button'

const INIT_CONRIBUTIONS: ContributionType[] = [
  { contributor: 'Alice', amount: 100, description: '' },
  { contributor: 'Bob', amount: 50, description: '' },
]

function App() {
  const [shareId, setShareId] = useState<string>()

  const [contributions, setContributions] =
    useState<ContributionType[]>(INIT_CONRIBUTIONS)

  const contributors = [...new Set(contributions.map((c) => c.contributor))]
  const summary = calculateSummary(contributions, contributors)

  const updateContribution = (i: number, contribution: ContributionType) => {
    setContributions([
      ...contributions.slice(0, i),
      contribution,
      ...contributions.slice(i + 1),
    ])
  }

  const deleteContribution = (i: number) => {
    setContributions(contributions.filter((_, j) => i !== j))
  }

  const addContribution = (contribution: ContributionType) => {
    setContributions([contribution, ...contributions])
  }

  return (
    <div className="flex flex-col items-center font-work-sans">
      <div className="w-full md:w-[768px] px-6 py-12 space-y-12">
        <div className="space-y-12">
          <Header />

          <div className="flex flex-col gap-12">
            <div className="w-full">
              <NewContribution
                contributors={contributors}
                onSubmit={addContribution}
              />
            </div>

            {contributions.length > 0 ? (
              <Contributions
                contributions={contributions}
                contributors={contributors}
                updateContribution={updateContribution}
                deleteContribution={deleteContribution}
              />
            ) : null}
          </div>
        </div>

        {summary !== null ? (
          <>
            <Separator />
            <Summary contributors={contributors} {...summary} />
            {shareId === undefined ? (
              <Button disabled={shareId !== undefined} onClick={async () => {}}>
                Share!
              </Button>
            ) : (
              <div>
                Link to share:{' '}
                <a
                  className={buttonVariants({ variant: 'link' })}
                  target="blank"
                  href={getShareLink(shareId)}
                >
                  {getShareLink(shareId)}
                </a>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  )
}

function getShareLink(id: string) {
  const { protocol, hostname, port } = window.location
  return `${protocol}//${hostname}${port ? `:${port}` : ''}/${id}`
}

async function share(contributions: ContributionType[]) {
  return await fetch('/share', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: nanoid(),
      contributions,
    }),
  })
}

export default App
