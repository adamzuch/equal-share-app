import { useState } from 'react'

import { Contribution, equalize } from './lib/equalize'
import { Contributions } from './components/Contributions'
import { Summary } from './components/Summary'

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

      <Contributions
        contributions={contributions}
        contributors={contributors}
        onAmountChange={updateAmount}
        onContributorChange={updateContributor}
        onDelete={deleteContribution}
        onNewContribution={addContribution}
      />

      {calculated !== null ? (
        <Summary contributors={contributors} {...calculated} />
      ) : null}
    </div>
  )
}

export default App
