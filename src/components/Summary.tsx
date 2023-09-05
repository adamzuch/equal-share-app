import { Smile } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import type { AccountType, RepaymentType } from '@/lib/calculate-summary'
import { Repayment } from '@/components/Repayment'
import { Account } from '@/components/Account'

export function Summary({
  accounts,
  contributors,
  repayments,
  target,
  total,
}: {
  accounts: AccountType[]
  contributors: string[]
  repayments: RepaymentType[]
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

      <div className="space-y-3">
        <h2 className="text-xl font-bold font-montserrat tracking-wide">
          Contributors
        </h2>
        <div className="grid grid-cols-1 auto-rows-[1fr] gap-3">
          {rankedAccounts.map((account) => (
            <Account key={account.contributor} {...account} />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold font-montserrat tracking-wide">
          Settle debts
        </h2>
        {repayments.length > 0 ? (
          <div className={cn('grid grid-cols-1 auto-rows-[1fr] gap-3')}>
            {repayments.map((repayment, i) => (
              <Repayment key={i} repayment={repayment} />
            ))}
          </div>
        ) : (
          <Alert>
            <Smile className="h-4 w-4" />
            <AlertTitle>No debts to settle</AlertTitle>
            <AlertDescription>
              Contributions are already balanced
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
