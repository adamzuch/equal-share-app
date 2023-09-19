import { useEffect, useState } from 'react'

import { ContributionType, calculateSummary } from '@/lib/calculate-summary'
import { NewContribution } from '@/components/forms/NewContribution'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Summary } from '@/components/Summary'
import { Contributions } from '@/components/Contributions'
import { Header } from '@/components/Header'
import { ShareControls } from '@/components/ShareControls'
import { Footer } from '@/components/Footer'

function App() {
  useEffect(() => {
    const url = new URL(window.location.href)
    const id = url.searchParams.get('contributions')
    if (id) {
      fetchContributions(id)
    }
  }, [])

  const [savedContributions, setSavedContributions] = useState<string>()
  const [contributions, setContributions] = useState<ContributionType[]>([])

  const contributors = [...new Set(contributions.map((c) => c.contributor))]

  const summary = calculateSummary(contributions, contributors)

  const fetchContributions = async (id: string) => {
    fetch(`/share?id=${id}`)
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((contributions) => {
        if (contributions) {
          setContributions(contributions)
          setSavedContributions(JSON.stringify(contributions))
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
      <div className="h-screen flex flex-col items-center font-work-sans">
        <div className="w-full flex-1 md:w-[768px] px-6 pt-6 pb-12 space-y-12">
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

          {summary !== null ? (
            <ShareControls
              contributions={contributions}
              savedContributions={savedContributions}
              setSavedContributions={setSavedContributions}
            />
          ) : null}
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
