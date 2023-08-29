import { Card } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import { getAvatarColor, getAvatarIcon } from '@/lib/avatar'

export function CreditorCard({
  creditor,
  balance,
  total,
}: {
  creditor: string
  balance: number
  total: number
}) {
  const CreditorIcon = getAvatarIcon(creditor)
  const creditorColor = getAvatarColor(creditor)

  return (
    <Card className="p-3">
      <div className="flex flex-row justify-between items-center gap-3">
        <Avatar>
          <AvatarFallback style={{ backgroundColor: creditorColor }}>
            <CreditorIcon />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-16">
          {creditor} paid <span className="font-semibold">${total}</span> and
          must receive{' '}
          <span className="font-semibold">${balance.toFixed(2)}</span> to reach
          the equal share
        </div>
      </div>
    </Card>
  )
}
