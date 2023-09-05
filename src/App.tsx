import { useState } from 'react'

import { ContributionType, calculateSummary } from '@/lib/calculate-summary'
import { NewContribution } from '@/components/forms/NewContribution'
import { Summary } from '@/components/Summary'
import { Contributions } from '@/components/Contributions'
import { Header } from '@/components/Header'

// const INITIAL_CONTRIBUTIONS: Contribution[] = [
//   { amount: 23, contributor: 'Adam', description: '' },
//   { amount: 7, contributor: 'Bill', description: 'Bus fare' },
//   { amount: 5, contributor: 'John', description: 'Shared lunch' },
//   {
//     amount: 52,
//     contributor: 'John',
//     description: 'Accomodation for London',
//   },
//   { amount: 15, contributor: 'Frank', description: '' },
// ]

const TEST_CONTRIBUTIONS: ContributionType[] = [
  {
    amount: 1,
    contributor: 'Adam',
    description: '',
  },
  {
    amount: 3,
    contributor: 'Assa',
    description: '',
  },
  {
    amount: 12,
    contributor: 'aaron',
    description: '',
  },
  {
    amount: 23,
    contributor: 'Adam',
    description: '',
  },
  {
    amount: 7,
    contributor: 'Bill',
    description: 'Bus fare',
  },
  {
    amount: 5,
    contributor: 'John',
    description: 'Shared lunch',
  },
  {
    amount: 15,
    contributor: 'Frank',
    description: '',
  },
]

function App() {
  const [contributions, setContributions] =
    useState<ContributionType[]>(TEST_CONTRIBUTIONS)
  const contributors = [
    ...new Set(contributions.map((c) => c.contributor).filter((c) => c !== '')),
  ]
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
    <div className="font-work-sans flex flex-col items-center py-12 space-y-12 overflow-x-hidden">
      <div className="space-y-12 px-6 w-full md:w-[768px]">
        <Header />

        <div className="flex flex-col gap-3">
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
        <Summary contributors={contributors} {...summary} />
      ) : null}
    </div>
  )
}

export default App
