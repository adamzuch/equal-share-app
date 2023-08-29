import { Card } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import { getAvatarColor, getAvatarIcon } from '@/lib/avatar'

export function DebtorCard({
  debtor,
  balance,
  target,
  total,
}: {
  debtor: string
  balance: number
  target: number
  total: number
}) {
  const DebtorIcon = getAvatarIcon(debtor)
  const debtorColor = getAvatarColor(debtor)

  return (
    <Card className="p-3">
      <div className="flex flex-row justify-between items-center gap-3">
        <Avatar>
          <AvatarFallback style={{ backgroundColor: debtorColor }}>
            <DebtorIcon />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-16">
          {debtor} paid <span className="font-semibold">-${total}</span> and
          must pay a further{' '}
          <span className="font-semibold">-${Math.abs(balance)}</span> to reach
          the target of <span className="font-semibold">${target}</span>
        </div>
      </div>
    </Card>
  )
}
