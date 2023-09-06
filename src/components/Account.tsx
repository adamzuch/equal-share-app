import { ArrowDownLeft, ArrowUpRight, Minus } from 'lucide-react'

import { Card } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { ContributorAvatar } from '@/components/ContributorAvatar'

export function Account({
  contributor,
  balance,
  total,
  rank,
}: {
  contributor: string
  balance: number
  total: number
  rank: number
}) {
  let AccountDescription = CreditorDescription
  let AccountIcon = ArrowDownLeft
  let accountIconClassName = 'text-green-500'
  if (balance === 0) {
    AccountDescription = BalancedDescription
    AccountIcon = Minus
    accountIconClassName = ''
  } else if (balance < 0) {
    AccountDescription = DebtorDescription
    AccountIcon = ArrowUpRight
    accountIconClassName = 'text-red-500'
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
  balance: number
  total: number
}) => {
  return (
    <>
      {contributor} paid <span className="font-semibold">${total}</span> and
      must receive{' '}
      <span className="font-semibold text-green-500">
        ${balance.toFixed(2)}
      </span>{' '}
      to match the equal share
    </>
  )
}

const BalancedDescription = ({
  contributor,
  total,
}: {
  contributor: string
  total: number
}) => {
  return (
    <>
      {contributor} paid <span className="font-semibold">${total}</span> which
      already matches the equal share
    </>
  )
}

const DebtorDescription = ({
  contributor,
  balance,
  total,
}: {
  contributor: string
  balance: number
  total: number
}) => {
  return (
    <>
      {contributor} paid <span className="font-semibold">${total}</span> and
      must pay a further{' '}
      <span className="font-semibold text-destructive">
        ${Math.abs(balance).toFixed(2)}
      </span>{' '}
      to match the equal share
    </>
  )
}
