import { useState } from 'react'

import { Contribution, equalize } from './lib/equalize'
import { Contributions } from './components/Contributions'
import { Summary } from './components/Summary'

const INITIAL_CONTRIBUTIONS: Contribution[] = [
  { amount: 23, contributor: 'Adam', description: '' },
  { amount: 7, contributor: 'Bill', description: '' },
  { amount: 5, contributor: 'John', description: '' },
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
    setContributions([...contributions, contribution])
  }

  return (
    <div className="h-screen w-scree flex flex-col items-center">
      <div className="h-full max-w-3xl p-4 space-y-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">equal share</h1>
          <p className="text-base">
            Enter payments to split equally, see instant results.
          </p>
        </div>

        <Contributions
          contributions={contributions}
          contributors={contributors}
          onAmountChange={updateAmount}
          onContributorChange={updateContributor}
          onDescriptionChange={updateDescription}
          onDelete={deleteContribution}
          onNewContribution={addContribution}
        />

        {calculated !== null ? (
          <Summary contributors={contributors} {...calculated} />
        ) : null}
      </div>
    </div>
  )
}

export default App
