import { Card } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import { getAvatarColor, getAvatarIcon } from '@/lib/avatar'

export function AccountCard({
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
  const Icon = getAvatarIcon(contributor)
  const color = getAvatarColor(contributor)

  let AccountDescription = CreditorDescription
  if (balance === 0) {
    AccountDescription = BalancedDescription
  } else if (balance < 0) {
    AccountDescription = DebtorDescription
  }

  return (
    <Card className="p-3 flex items-center">
      <div className="flex flex-row justify-between items-center gap-3 w-full">
        <Avatar>
          <AvatarFallback style={{ backgroundColor: color }}>
            <Icon />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-16">
          <AccountDescription
            contributor={contributor}
            balance={balance}
            total={total}
          />
        </div>
        <div className="text-sm text-muted-foreground">#{rank}</div>
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
      to decrease their contribution
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
      already matches the equal share contribution
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
      to increase their contribution
    </>
  )
}
