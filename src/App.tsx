import { useState } from 'react'

import { Button } from './components/Button'
import clsx from 'clsx'

import { Contribution, equalize } from './lib/equalize'

function App() {
  const [contributions, setContributions] = useState<Contribution[]>([
    {
      amount: 23,
      contributor: 'Adam',
    },
    {
      amount: 7,
      contributor: 'Bill',
    },
    {
      amount: 5,
      contributor: 'John',
    },
  ])

  const contributors = [...new Set(contributions.map((c) => c.contributor))]

  console.log(...contributions)

  const calculated = equalize(contributions)

  console.log(calculated)

  return (
    <div className="font-atkinson p-4 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">equal share</h1>

      <p>Enter payments to split equally, see instant results.</p>

      <div className="flex flex-col -space-y-px">
        {contributions.map((contribution, i) => (
          <div key={i} className={clsx('flex -space-x-px')}>
            <div className="relative flex">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-20">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>

              <input
                className={clsx(
                  'placeholder:text-gray-300 pl-7 w-full block px-2 py-1 border-0 ring-1 ring-inset ring-gray-200 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400',
                  i === 0 ? 'rounded-tl-lg' : ''
                )}
                type="number"
                min="0"
                step="any"
                value={contribution.amount ?? ''}
                placeholder="0.00"
                onChange={() => null}
              />
            </div>

            <input
              className={clsx(
                'placeholder:text-gray-300 w-full block px-2 py-1 border-0 ring-1 ring-inset ring-gray-200 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400'
              )}
              type="text"
              value={contribution.contributor}
              onChange={() => null}
              placeholder="Enter a name"
            />

            <Button
              className={clsx('rounded-none', i === 0 ? 'rounded-tr-lg' : '')}
              type="submit"
            >
              -
            </Button>
          </div>
        ))}

        <form
          className={clsx('flex -space-x-px')}
          onSubmit={(e) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            const formData = new FormData(form)
            const amount = Number(formData.get('amount'))
            const contributor = String(formData.get('name'))

            const contribution = { amount, contributor }

            setContributions([...contributions, contribution])

            form.reset()
            document.getElementById('new-amount-input')?.focus()
          }}
        >
          <div className="relative flex">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-20">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              required
              id="new-amount-input"
              className={clsx(
                'placeholder:text-gray-300 rounded-bl-lg pl-7 w-full block px-2 py-1 border-0 ring-1 ring-inset ring-gray-200 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400'
              )}
              type="number"
              min="0"
              step="any"
              name="amount"
              defaultValue={''}
              placeholder="0"
            />
          </div>

          <input
            id="new-name-input"
            list="contributors"
            autoComplete="off"
            required
            className={clsx(
              'placeholder:text-gray-300 w-full  block px-2 py-1 border-0 ring-1 ring-inset ring-gray-200 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400'
            )}
            type="text"
            defaultValue={''}
            name="name"
            placeholder="Enter a name"
          />
          <datalist id="contributors">
            {Array.from(contributors.values()).map((contributor) => (
              <option key={contributor}>{contributor}</option>
            ))}
          </datalist>

          <Button className="rounded-none rounded-br-lg" type="submit">
            -
          </Button>
        </form>
      </div>

      {calculated !== null ? (
        <div className="flex flex-col gap-4">
          <p>
            ${calculated.total} shared by {contributors.length} people equals $
            {calculated.targetContribution} per person
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
