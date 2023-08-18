import { ParentSize } from '@visx/responsive'

import { Repayment } from '../lib/equalize'
import { BarChart } from './BarChart'
import { Separator } from './ui/separator'

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
    <div className="flex flex-col gap-6 w-full">
      <div className="flex gap-6 items-center">
        <div>
          <div className="text-2xl">
            <div>${total.toFixed(0)} total contributed</div>
            <div>{contributors.length} people</div>
            <Separator />
            <div>${targetContribution.toFixed(0)} per person</div>
          </div>

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
        </div>

        <BarChart
          width={512 * 0.75}
          height={256}
          outstandingBalances={outstandingBalances.sort(
            ([, a], [, b]) => b - a
          )}
        />
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
