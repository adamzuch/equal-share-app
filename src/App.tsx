import { useState } from 'react'

import { refresh } from './lib/equalize'
import { ContributorCard } from './components/ContributorCard'

import { Contribution, Contributor } from './lib/equalize'

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
      contributors.concat([{ id: Math.random(), name: '', contributions: [] }])
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
    <div className="space-y-4">
      <h1 className="text-3xl font-bold underline">equal share</h1>
      <div className="flex flex-col gap-4">
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addContributor}
        >
          Add contributor
        </button>
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
