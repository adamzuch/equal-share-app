import { useState } from 'react'

import { refresh } from './lib/equalize'
import { ContributorCard } from './components/ContributorCard'

import { Contribution, Contributor } from './lib/equalize'
import { Button } from './components/Button'

function App() {
  const [contributors, setContributors] = useState<Contributor[]>([
    {
      id: 0,
      name: 'John Doe',
      contributions: [{ id: 0, amount: 5.3 }],
    },
  ])

  const results = refresh(contributors)

  console.log(...contributors)

  console.log('calculated: ', results)

  const updateContributorName = (payer: Contributor, nameText: string) => {
    setContributors(
      contributors.map((p) =>
        p.id === payer.id ? { ...p, name: nameText } : p
      )
    )
  }

  const updateContributionAmount = (
    contributor: Contributor,
    contribution: Contribution,
    amountText: string
  ) => {
    const amountFloat = parseFloat(amountText)
    let newAmount: number | null = null
    if (amountText !== '' && !isNaN(amountFloat)) {
      newAmount = amountFloat
    }
    const contributions = contributor.contributions.map((p) =>
      p.id === contribution.id ? { ...p, amount: newAmount } : p
    )
    setContributors(
      contributors.map((p) =>
        p.id === contributor.id ? { ...p, contributions } : p
      )
    )
  }

  const addContributor = () => {
    setContributors(
      contributors.concat([
        {
          id: Math.random(),
          name: '',
          contributions: [{ id: 0, amount: null }],
        },
      ])
    )
  }

  const addContribution = (payer: Contributor) => {
    setContributors(
      contributors.map((p) =>
        p.id === payer.id
          ? {
              ...p,
              contributions: p.contributions.concat({
                id: Math.random(),
                amount: null,
              }),
            }
          : p
      )
    )
  }

  return (
    <div className="p-8 flex bg-gray-50 flex-col items-center gap-8">
      <h1 className="text-3xl font-poppins ">equal share</h1>

      <div>
        <Button onClick={addContributor}>Add contributor</Button>
      </div>

      <div className="flex flex-row gap-8">
        {contributors.map((payer) => (
          <ContributorCard
            contributor={payer}
            onAddContributionClick={addContribution}
            onContributorNameChange={updateContributorName}
            onContributionAmountChange={updateContributionAmount}
          />
        ))}
      </div>

      <div>
        {results.map((result) => (
          <div>
            {result.debtor} owes {result.creditor} {result.value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
