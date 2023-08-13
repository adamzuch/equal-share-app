import { useState } from 'react'

import { Contribution, equalize } from './lib/equalize'
import { ContributionGrid } from './components/ContributionGrid'

const INITIAL_CONTRIBUTIONS: Contribution[] = [
  { amount: 23, contributor: 'Adam' },
  { amount: 7, contributor: 'Bill' },
  { amount: 5, contributor: 'John' },
]

function App() {
  const [contributions, setContributions] = useState(INITIAL_CONTRIBUTIONS)

  const contributors = [
    ...new Set(contributions.map((c) => c.contributor).filter((c) => c !== '')),
  ]

  console.log(...contributions)

  const calculated = equalize(contributions, contributors)

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

  const deleteContribution = (i: number) => {
    setContributions(contributions.filter((_, j) => i !== j))
  }

  const addContribution = (contribution: Contribution) => {
    setContributions([...contributions, contribution])
  }

  return (
    <div className="font-atkinson p-4 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">equal share</h1>

      <p>Enter payments to split equally, see instant results.</p>

      <ContributionGrid
        contributions={contributions}
        contributors={contributors}
        onAmountChange={updateAmount}
        onContributorChange={updateContributor}
        onDelete={deleteContribution}
        onNewContribution={addContribution}
      />

      {calculated !== null ? (
        <div className="flex flex-col gap-4">
          <p>
            ${calculated.total.toFixed(2)} shared by {contributors.length}{' '}
            people equals ${calculated.targetContribution.toFixed(2)} per person
          </p>

          <div className="flex gap-4">
            <div>
              <div>Creditors</div>
              {calculated.outstandingBalances
                .filter(([, balance]) => balance > 0)
                .map(([contributor, balance]) => (
                  <div key={contributor}>
                    {contributor} is owed ${balance.toFixed(2)}
                  </div>
                ))}
            </div>
            <div>
              <div>Debtors</div>
              {calculated.outstandingBalances
                .filter(([, balance]) => balance < 0)
                .map(([contributor, balance]) => (
                  <div key={contributor}>
                    {contributor} owes ${Math.abs(balance).toFixed(2)}
                  </div>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {calculated.repayments.map(({ creditor, debtor, amount }, i) => (
              <div className="p-2 bg-gray-100 rounded-lg" key={i}>
                <div>
                  {debtor} pays {creditor} ${amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
