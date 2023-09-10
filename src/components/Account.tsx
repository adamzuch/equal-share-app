import { ArrowDownLeft, ArrowUpRight, Minus } from 'lucide-react'

import { Card } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { ContributorAvatar } from '@/components/ContributorAvatar'
import type { Currency } from '@/lib/calculate-summary'

export function Account({
  contributor,
  balance,
  total,
  rank,
}: {
  contributor: string
  balance: Currency
  total: Currency
  rank: number
}) {
  let AccountDescription = CreditorDescription
  let AccountIcon = ArrowDownLeft
  let accountIconClassName = 'text-green-500'
  if (balance.value === 0) {
    AccountDescription = BalancedDescription
    AccountIcon = Minus
    accountIconClassName = ''
  } else if (balance.value < 0) {
    AccountDescription = DebtorDescription
    AccountIcon = ArrowUpRight
    accountIconClassName = 'text-destructive'
  }

  return (
    <Card className="p-3 flex items-center">
      <div className="flex flex-row justify-between items-center gap-3 w-full">
        <div className="text-sm text-muted-foreground">#{rank}</div>
        <ContributorAvatar contributor={contributor} />
        <div className="flex-1 min-w-16">
          <AccountDescription
            contributor={contributor}
            balance={balance}
            total={total}
          />
        </div>

        <AccountIcon className={cn('mx-3', accountIconClassName)} />
      </div>
    </Card>
  )
}

const CreditorDescription = ({
  contributor,
  balance,
  total,
}: {
  contributor: string
  balance: Currency
  total: Currency
}) => {
  return (
    <>
      {contributor} paid <span className="font-semibold">{total.format()}</span>{' '}
      and must receive{' '}
      <span className="font-semibold text-green-500">{balance.format()}</span>{' '}
      to match the equal share
    </>
  )
}

const BalancedDescription = ({
  contributor,
  total,
}: {
  contributor: string
  total: Currency
}) => {
  return (
    <>
      {contributor} paid <span className="font-semibold">{total.format()}</span>{' '}
      which already matches the equal share
    </>
  )
}

const DebtorDescription = ({
  contributor,
  balance,
  total,
}: {
  contributor: string
  balance: Currency
  total: Currency
}) => {
  return (
    <>
      {contributor} paid <span className="font-semibold">{total.format()}</span>{' '}
      and must pay a further{' '}
      <span className="font-semibold text-destructive">
        {balance.format({ negativePattern: '$#' })}
      </span>{' '}
      to match the equal share
    </>
  )
}
