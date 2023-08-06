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
    <div className="p-4 bg-gray-100">
      <div className="flex flex-col">
        <input
          key={id}
          className="border border-gray-500"
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => onContributorNameChange(contributor, e.target.value)}
        />
        <h3>Contributions</h3>
        {contributions.map((contribution) => (
          <input
            key={contribution.id}
            className="border border-gray-500"
            type="number"
            min="0"
            step="any"
            value={contribution.amount ?? ''}
            placeholder="Enter a contribution"
            onChange={(e) => {
              onContributionAmountChange(
                contributor,
                contribution,
                e.target.value
              )
            }}
          />
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onAddContributionClick(contributor)}
        >
          Add contribution
        </button>
      </div>
    </div>
  )
}
