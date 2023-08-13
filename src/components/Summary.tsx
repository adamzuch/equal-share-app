import { Repayment } from '../lib/equalize'

export function Summary({
  contributors,
  outstandingBalances,
  repayments,
  targetContribution,
  total,
}: {
  contributors: string[]
  outstandingBalances: [string, number][]
  repayments: Repayment[]
  targetContribution: number
  total: number
}) {
  return (
    <div className="flex flex-col gap-4">
      <p>
        ${total.toFixed(2)} shared by {contributors.length} people equals $
        {targetContribution.toFixed(2)} per person
      </p>

      <div className="flex gap-4">
        <div>
          <div>Creditors</div>
          {outstandingBalances
            .filter(([, balance]) => balance > 0)
            .map(([contributor, balance]) => (
              <div key={contributor}>
                {contributor} is owed ${balance.toFixed(2)}
              </div>
            ))}
        </div>
        <div>
          <div>Debtors</div>
          {outstandingBalances
            .filter(([, balance]) => balance < 0)
            .map(([contributor, balance]) => (
              <div key={contributor}>
                {contributor} owes ${Math.abs(balance).toFixed(2)}
              </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {repayments.map(({ creditor, debtor, amount }, i) => (
          <div className="p-2 bg-gray-100 rounded-lg" key={i}>
            <div>
              {debtor} pays {creditor} ${amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
