import clsx from 'clsx'

import { Contribution, Contributor } from '../lib/equalize'
import { Button } from './Button'

export function ContributorCard({
  contributor,
  onAddContributionClick,
  onContributorNameChange,
  onContributionAmountChange,
}: {
  contributor: Contributor
  onAddContributionClick: (contributor: Contributor) => void
  onContributorNameChange: (contributor: Contributor, nameText: string) => void
  onContributionAmountChange: (
    contributor: Contributor,
    contribution: Contribution,
    amountText: string
  ) => void
}) {
  const { id, name, contributions } = contributor
  return (
    <div className="font-poppins w-fit">
      <div className="w-96 flex flex-col gap-4">
        <input
          key={id}
          className="bg-white placeholder:text-gray-300 ring-1 ring-inset ring-gray-200 px-2 py-1 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400"
          type="text"
          value={name}
          placeholder="Enter name"
          onChange={(e) => onContributorNameChange(contributor, e.target.value)}
        />
        <div>
          Contributions
          <div className="flex flex-col -space-y-px">
            {contributions.map((contribution, i) => (
              <div className={clsx('flex -space-x-px')}>
                <input
                  key={contribution.id}
                  className={clsx(
                    'placeholder:text-gray-300 w-full block px-2 py-1 border-0 ring-1 ring-inset ring-gray-200 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400',
                    i === 0 ? 'rounded-tl-lg' : '',
                    i === contributions.length - 1 ? 'rounded-bl-lg' : ''
                  )}
                  type="text"
                  defaultValue={''}
                  placeholder="Describe contribution"
                />

                <div className="relative flex">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-20">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    key={contribution.id}
                    className={clsx(
                      'placeholder:text-gray-300 pl-7 w-full block px-2 py-1 border-0 ring-1 ring-inset ring-gray-200 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400',
                      i === 0 ? 'rounded-tr-lg' : '',
                      i === contributions.length - 1 ? 'rounded-br-lg' : ''
                    )}
                    type="number"
                    min="0"
                    step="any"
                    value={contribution.amount ?? ''}
                    placeholder="0.00"
                    onChange={(e) => {
                      onContributionAmountChange(
                        contributor,
                        contribution,
                        e.target.value
                      )
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              className=" focus:outline-none focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600"
              onClick={() => onAddContributionClick(contributor)}
            >
              Add contribution
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
