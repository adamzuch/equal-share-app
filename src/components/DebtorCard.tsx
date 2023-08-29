import { Card } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import { getAvatarColor, getAvatarIcon } from '@/lib/avatar'

export function DebtorCard({
  debtor,
  balance,
  total,
}: {
  debtor: string
  balance: number
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
          {debtor} paid <span className="font-semibold">${total}</span> and must
          pay a further{' '}
          <span className="font-semibold">${Math.abs(balance).toFixed(2)}</span>{' '}
          to reach the equal share
        </div>
      </div>
    </Card>
  )
}
