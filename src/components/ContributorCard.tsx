import clsx from 'clsx'

import { Contribution, Contributor } from '../lib/equalize'

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
    <div className="w-content p-4 bg-gray-100">
      <div className="flex flex-col gap-4">
        <input
          key={id}
          className="w-64 px-2 py-1 rounded-lg border border-gray-300"
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => onContributorNameChange(contributor, e.target.value)}
        />
        <div className="flex flex-col -space-y-px">
          {contributions.map((contribution, i) => (
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                key={contribution.id}
                className={clsx(
                  'w-64 pl-7 block px-2 py-1 border-0 ring-1 ring-inset ring-gray-300 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600',
                  i === 0 ? 'rounded-t-lg' : '',
                  i === contributions.length - 1 ? 'rounded-b-lg' : ''
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
          ))}
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => onAddContributionClick(contributor)}
          >
            Add contribution
          </button>
        </div>
      </div>
    </div>
  )
}
