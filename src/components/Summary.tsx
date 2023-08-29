import { Account, Repayment } from '../lib/equalize'

import { CreditorCard } from './CreditorCard'
import { DebtorCard } from './DebtorCard'
import { RepaymentCard } from './RepaymentCard'

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
  return (
    <div className="space-y-12">
      <h2 className="text-2xl text-center">
        <span className="font-bold">-${total}</span> contributed by{' '}
        <span className="font-bold">{contributors.length} people</span> results
        in an equal share of <span className="font-bold">-${target}</span> per
        person
      </h2>

      <div className="space-y-1.5">
        <h2 className="text-xl font-bold tracking-wide">Creditors</h2>
        <div className="grid grid-cols-1 auto-rows-[1fr] gap-3">
          {accounts
            .filter(({ balance }) => balance > 0)
            .map((account) => (
              <CreditorCard
                key={account.contributor}
                creditor={account.contributor}
                balance={account.balance}
                total={account.total}
                target={target}
              />
            ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <h2 className="text-xl font-bold tracking-wide">Debtors</h2>
        <div className="grid grid-cols-1 auto-rows-[1fr] gap-3">
          {accounts
            .filter(({ balance }) => balance < 0)
            .map((account) => (
              <DebtorCard
                key={account.contributor}
                debtor={account.contributor}
                balance={account.balance}
                total={account.total}
                target={target}
              />
            ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <h2 className="text-xl font-bold tracking-wide">Settle debts</h2>
        <div className="grid grid-cols-1 auto-rows-[1fr] gap-3">
          {repayments.map((repayment, i) => (
            <RepaymentCard key={i} repayment={repayment} />
          ))}
        </div>
      </div>
    </div>
  )
}
