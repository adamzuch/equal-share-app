import { useState } from 'react'
import { nanoid } from 'nanoid'

import { Separator } from '@/components/ui/separator'

import { ContributionType, calculateSummary } from '@/lib/calculate-summary'
import { NewContribution } from '@/components/forms/NewContribution'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Summary } from '@/components/Summary'
import { Contributions } from '@/components/Contributions'
import { Header } from '@/components/Header'
import { Button } from './components/ui/button'

function App() {
  const [contributions, setContributions] = useState<ContributionType[]>([])
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
    <ThemeProvider defaultTheme="system">
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
              <Button
                onClick={async () => {
                  const response = await share(contributions)
                  const responseJSON = await response.json()
                  console.log(responseJSON)
                }}
              >
                Share
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </ThemeProvider>
  )
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
