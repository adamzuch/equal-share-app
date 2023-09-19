import { ArrowLeftRight, Smile, Users2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'

import type {
  AccountType,
  Currency,
  RepaymentType,
} from '@/lib/calculate-summary'
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
  target: Currency
  total: Currency
}) {
  const rankedAccounts = (accounts = accounts
    .sort((a, b) => b.balance.value - a.balance.value)
    .map((account) => ({
      ...account,
      rank: accounts.findIndex((a) => a.balance === account.balance) + 1,
    })))

  return (
    <div className="flex flex-col items-center space-y-12">
      <Separator />
      <div className="text-2xl text-center ">
        <span className="font-semibold">{total.format()}</span> paid by{' '}
        <span className="font-semibold">{contributors.length} people</span>{' '}
        results in an equal share of{' '}
        <span className="font-semibold">{target.format()}</span>
      </div>
      <Separator />

      <div className="space-y-3 w-full">
        <span className="font-montserrat tracking-wide text-xl font-bold flex items-center gap-2">
          <Users2 />
          Contributors
        </span>
        <div className="grid grid-cols-1 gap-3 auto-rows-[1fr]">
          {rankedAccounts.map((account) => (
            <Account key={account.contributor} {...account} />
          ))}
        </div>
      </div>

      <div className="w-full space-y-3">
        <span className="font-montserrat tracking-wide text-xl font-bold flex items-center gap-2">
          <ArrowLeftRight />
          Settle debts
        </span>
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
              Contributions are already balanced (as best as they can be)
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
