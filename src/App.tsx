import { useState } from 'react'

import { Summary } from './components/Summary'
import { ContributionCard } from './components/ContributionCard'
import { NewContributionForm } from './components/NewContributionForm'

import { Contribution, equalize } from './lib/equalize'
import { cn } from './lib/utils'

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

const TEST_CONTRIBUTIONS: Contribution[] = [
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
  const [contributions, setContributions] = useState(TEST_CONTRIBUTIONS)
  const contributors = [
    ...new Set(contributions.map((c) => c.contributor).filter((c) => c !== '')),
  ]
  const calculated = equalize(contributions, contributors)

  console.log(contributions)
  console.log(calculated)

  const updateContribution = (i: number, contribution: Contribution) => {
    setContributions([
      ...contributions.slice(0, i),
      contribution,
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
    <div className="flex flex-col items-center font-work-sans">
      <div className="w-full md:w-[768px] px-6 py-12 space-y-24">
        <div className="space-y-12">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-wider">equal share</h1>
            <p className="text-base">
              Effortlessly split group expenses and instantly settle debts.
              Share using a 24-hour link, with no data collected permanently and
              no need for sign-up.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="w-full">
              <NewContributionForm
                contributors={contributors}
                onNewContribution={addContribution}
              />
            </div>

            {contributions.length > 0 ? (
              <div className="space-y-3">
                <h2 className="text-xl font-bold tracking-wide">
                  Contributions
                </h2>
                <div
                  className={cn(
                    'grid grid-cols-1 auto-rows-[1fr] gap-3',
                    contributions.length > 1 ? 'md:grid-cols-2' : ''
                  )}
                >
                  {contributions.map((contribution, i) => (
                    <ContributionCard
                      contributors={contributors}
                      key={i}
                      index={i}
                      contribution={contribution}
                      onEdit={(i, contribution) =>
                        updateContribution(i, contribution)
                      }
                      onDelete={(i) => deleteContribution(i)}
                    />
                  ))}
                </div>
              </div>
            ) : null}
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
