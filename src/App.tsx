import { useState } from 'react'

import { Contribution, equalize } from './lib/equalize'
// import { Contributions } from './components/Contributions'

import { Summary } from './components/Summary'
import ContributionCard from './components/Contribution'
import { NewContributionForm } from './components/NewContributionForm'

import { ScrollArea } from '@/components/ui/scroll-area'

const INITIAL_CONTRIBUTIONS: Contribution[] = [
  { amount: 23, contributor: 'Adam', description: '' },
  { amount: 7, contributor: 'Bill', description: 'Bus fare' },
  { amount: 5, contributor: 'John', description: 'Shared lunch' },
  {
    amount: 52,
    contributor: 'John',
    description: 'Accomodation for London',
  },

  { amount: 15, contributor: 'Frank', description: '' },
]

function App() {
  const [contributions, setContributions] = useState(INITIAL_CONTRIBUTIONS)
  const contributors = [
    ...new Set(contributions.map((c) => c.contributor).filter((c) => c !== '')),
  ]
  const calculated = equalize(contributions, contributors)

  console.log(contributions)
  console.log(calculated)

  const updateAmount = (i: number, value: string) => {
    const amount = isNaN(Number(value)) ? null : Number(value)
    const updatedContribution = { ...contributions[i], amount }
    setContributions([
      ...contributions.slice(0, i),
      updatedContribution,
      ...contributions.slice(i + 1),
    ])
  }

  const updateContributor = (i: number, value: string) => {
    const updatedContribution = { ...contributions[i], contributor: value }
    setContributions([
      ...contributions.slice(0, i),
      updatedContribution,
      ...contributions.slice(i + 1),
    ])
  }

  const updateDescription = (i: number, value: string) => {
    const updatedContribution = { ...contributions[i], description: value }
    setContributions([
      ...contributions.slice(0, i),
      updatedContribution,
      ...contributions.slice(i + 1),
    ])
  }

  const deleteContribution = (i: number) => {
    setContributions(contributions.filter((_, j) => i !== j))
  }

  const addContribution = (contribution: Contribution) => {
    setContributions([contribution, ...contributions])
  }

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="h-full w-full md:w-[768px] lg:w-[1024px] p-6 space-y-12">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold">equalshare</h1>
          <p className="text-base">
            Enter payments to split equally, see instant results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          <div className="flex flex-col gap-12">
            <div className="min-w-[318px] w-full">
              <NewContributionForm
                contributions={contributions}
                contributors={contributors}
                onNewContribution={addContribution}
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold">Contributions</h2>
              <div className="grid grid-cols-1 auto-rows-[1fr] gap-3">
                {contributions.map((contribution, i) => (
                  <ContributionCard key={i} contribution={contribution} />
                ))}
              </div>
            </div>
          </div>

          {calculated !== null ? (
            <Summary contributors={contributors} {...calculated} />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default App
