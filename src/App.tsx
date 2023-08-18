import { useState } from 'react'

import { Contribution, equalize } from './lib/equalize'
// import { Contributions } from './components/Contributions'

import { Summary } from './components/Summary'
import ContributionCard from './components/Contribution'
import { NewContributionForm } from './components/NewContributionForm'

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
    <div className="font-atkinson h-screen w-screen flex flex-col items-center">
      <div className="h-full p-4 space-y-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">equalshare</h1>
          <p className="text-base">
            Enter payments to split equally, see instant results.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full min-w-[318px] sm:w-80">
            <NewContributionForm
              contributions={contributions}
              contributors={contributors}
              onNewContribution={addContribution}
            />
          </div>

          <div className="space-y-1.5 pr-1.5 max-h-[492px] overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-[1fr]  gap-3">
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
  )
}

export default App
