import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTurnUp, faXmark } from '@fortawesome/free-solid-svg-icons'

import { Contribution } from '../lib/equalize'

export function Contributions({
  contributions,
  contributors,
  onAmountChange,
  onContributorChange,
  onDelete,
  onDescriptionChange,
  onNewContribution,
}: {
  contributions: Contribution[]
  contributors: string[]
  onAmountChange?: (i: number, value: string) => void
  onContributorChange?: (i: number, value: string) => void
  onDescriptionChange?: (i: number, value: string) => void
  onDelete?: (i: number) => void
  onNewContribution?: (contribution: Contribution) => void
}) {
  return (
    <div className="flex flex-col divide-y divide-black">
      {contributions.map((contribution, i) => (
        <div key={i} className="flex">
          <div className="relative flex">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-20">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>

            <input
              className={clsx(
                'w-28 placeholder:text-gray-300 pl-7 block px-2 py-1.5 border-0 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400'
              )}
              type="number"
              min="0"
              step="any"
              value={contribution.amount ?? ''}
              placeholder="0"
              onChange={(e) => onAmountChange?.(i, e.target.value)}
            />
          </div>

          <input
            className={clsx(
              'w-56 placeholder:text-gray-300 block px-2 py-1.5 border-0 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400'
            )}
            type="text"
            value={contribution.contributor}
            onChange={(e) => onContributorChange?.(i, e.target.value)}
            placeholder="Enter a name"
          />

          <input
            className={clsx(
              'placeholder:text-gray-300 w-full block px-2 py-1.5 border-0 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400'
            )}
            type="text"
            value={contribution.description}
            onChange={(e) => onDescriptionChange?.(i, e.target.value)}
            placeholder="Enter a description"
          />

          {/* <button
              className={clsx(
                'rounded-none bg-red-700 text-white px-2 py-1 border-white',
                i === 0 ? 'rounded-tr-lg' : 'border-t',
                i === contributions.length - 1 ? 'rounded-br-lg' : ''
              )}
              onClick={() => onDelete?.(i)}
            >
              <FontAwesomeIcon className="w-4 h-4" icon={faXmark} />
            </button> */}
        </div>
      ))}

      <form
        className="flex items-center space-between"
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.target as HTMLFormElement
          const formData = new FormData(form)
          const amount = Number(formData.get('amount'))
          const contributor = String(formData.get('name'))
          const description = String(formData.get('description'))

          const contribution = { amount, contributor, description }

          onNewContribution?.(contribution)

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
            className="w-28 placeholder:text-gray-300 pl-7 block px-2 py-1.5 border-0 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400"
            type="number"
            min="0"
            step="any"
            name="amount"
            defaultValue=""
            placeholder="0"
          />
        </div>

        <input
          id="new-name-input"
          list="contributors"
          autoComplete="off"
          required
          className={clsx(
            'w-56 placeholder:text-gray-300 block px-2 py-1.5 border-0 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400'
          )}
          type="text"
          defaultValue=""
          name="name"
          placeholder="Enter a name"
        />
        <datalist id="contributors">
          {Array.from(contributors.values()).map((contributor) => (
            <option key={contributor}>{contributor}</option>
          ))}
        </datalist>

        <input
          id="new-description-input"
          className={clsx(
            'placeholder:text-gray-300 w-full block px-2 py-1.5 border-0 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400'
          )}
          type="text"
          defaultValue=""
          name="description"
          placeholder="Enter a description"
        />

        <button
          className="bg-indigo-700 text-white px-2 py-1.5 hidden"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  )
}
