import { cn } from '@/lib/utils'
import { Account, Repayment } from '../lib/equalize'

import { RepaymentCard } from './RepaymentCard'
import { AccountCard } from './AccountCard'

export function Summary({
  accounts,
  contributors,
  repayments,
  target,
  total,
}: {
  accounts: Account[]
  contributors: string[]
  repayments: Repayment[]
  target: number
  total: number
}) {
  const rankedAccounts = (accounts = accounts
    .sort((a, b) => b.balance - a.balance)
    .map((account) => ({
      ...account,
      rank: accounts.findIndex((a) => a.balance === account.balance) + 1,
    })))

  return (
    <div className="space-y-24">
      <h2 className="text-2xl text-center">
        <span className="font-semibold">${total}</span> paid by{' '}
        <span className="font-semibold">{contributors.length} people</span>{' '}
        results in an equal share of{' '}
        <span className="font-semibold">${target.toFixed(2)}</span>
      </h2>

      <div className="space-y-1.5">
        <h2 className="text-xl font-bold tracking-wider">Contributors</h2>
        <div className="grid grid-cols-1 auto-rows-[1fr] gap-3">
          {rankedAccounts.map((account) => (
            <AccountCard key={account.contributor} {...account} />
          ))}
        </div>
      </div>

      {repayments.length > 0 ? (
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold tracking-wider">Settle debts</h2>
          <div
            className={cn(
              'grid grid-cols-1 auto-rows-[1fr] gap-3',
              repayments.length > 1 ? 'md:grid-cols-2' : ''
            )}
          >
            {repayments.map((repayment, i) => (
              <RepaymentCard key={i} repayment={repayment} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
