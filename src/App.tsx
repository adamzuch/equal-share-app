import { useState } from 'react'

import { Button } from './components/Button'
import clsx from 'clsx'

import { Contribution, Contributor } from './lib/equalize'

function App() {
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [contributors, setContributors] = useState<Map<number, Contributor>>(
    new Map()
  )

  // const calculated = equalize(contributions, contributors)

  return (
    <div className="font-atkinson p-4 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">equal share</h1>

      <p>Enter payments to split equally, see instant results.</p>

      <div className="flex flex-col -space-y-px">
        {contributions.map((contribution, i) => (
          <div key={contribution.id} className={clsx('flex -space-x-px')}>
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
              value={contribution.contributor.name}
              onChange={() => null}
              placeholder="Enter a name"
            />

            <Button
              className={clsx('rounded-none', i === 0 ? 'rounded-tr-lg' : '')}
              type="submit"
            >
              x
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
            const name = String(formData.get('name'))

            const contributor = { id: Math.random(), name }
            const contribution = {
              id: Math.random(),
              amount,
              contributor,
            }

            setContributions([...contributions, contribution])
            setContributors(contributors.set(contributor.id, contributor))

            form.reset()
            document.getElementById('newAmountInput')?.focus()
          }}
        >
          <div className="relative flex">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-20">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              id="newAmountInput"
              className={clsx(
                'placeholder:text-gray-300 rounded-bl-lg pl-7 w-full block px-2 py-1 border-0 ring-1 ring-inset ring-gray-200 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400'
              )}
              type="number"
              min="0"
              step="any"
              name="amount"
              defaultValue={''}
              placeholder="0.00"
            />
          </div>

          <input
            className={clsx(
              'placeholder:text-gray-300 w-full  block px-2 py-1 border-0 ring-1 ring-inset ring-gray-200 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400'
            )}
            type="text"
            defaultValue={''}
            name="name"
            placeholder="Enter a name"
          />

          <Button className="rounded-none rounded-br-lg" type="submit">
            +
          </Button>
        </form>
      </div>
    </div>
  )
}

export default App
