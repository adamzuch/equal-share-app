import { useEffect, useState } from 'react'

import { ContributionType, calculateSummary } from '@/lib/calculate-summary'
import { NewContribution } from '@/components/forms/NewContribution'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Summary } from '@/components/Summary'
import { Contributions } from '@/components/Contributions'
import { Header } from '@/components/Header'
import { ShareControls } from './components/ShareControls'

const INIT_CONRIBUTIONS: ContributionType[] = [
  { contributor: 'Alice', amount: 100, description: '' },
  { contributor: 'Bob', amount: 50, description: '' },
]

function App() {
  useEffect(() => {
    const url = new URL(window.location.href)
    const id = url.searchParams.get('share')
    if (id) {
      fetchContributions(id)
    }
  }, [])

  const [initialContributions, setInitialContributions] = useState<string>()
  const [contributions, setContributions] =
    useState<ContributionType[]>(INIT_CONRIBUTIONS)

  const canShare =
    initialContributions === undefined ||
    initialContributions !== JSON.stringify(contributions)

  const contributors = [...new Set(contributions.map((c) => c.contributor))]

  const summary = calculateSummary(contributions, contributors)

  const fetchContributions = async (id: string) => {
    fetch(`/share?id=${id}`)
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((contributions) => {
        if (contributions) {
          setContributions(contributions)
          setInitialContributions(JSON.stringify(contributions))
        }
      })
  }

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
          <Header />

          <NewContribution
            contributors={contributors}
            onSubmit={addContribution}
          />

          {contributions.length === 0 ? null : (
            <Contributions
              contributions={contributions}
              contributors={contributors}
              updateContribution={updateContribution}
              deleteContribution={deleteContribution}
            />
          )}

          {summary !== null ? (
            <Summary contributors={contributors} {...summary} />
          ) : null}

          {summary !== null && canShare ? (
            <ShareControls contributions={contributions} />
          ) : null}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
