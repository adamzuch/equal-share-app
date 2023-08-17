import { Contribution } from '@/lib/equalize'
import { Card } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'

import { getAvatarColor, getAvatarIcon } from '@/lib/avatar'

export default function ContributionCard({
  contribution,
}: {
  contribution: Contribution
}) {
  const { amount, contributor, description } = contribution

  const Icon = getAvatarIcon(contributor)
  const iconColor = getAvatarColor(contributor)

  return (
    <Card className="flex-1 p-3 flex flex-row items-center gap-4">
      <Avatar>
        <AvatarFallback style={{ backgroundColor: iconColor }}>
          <Icon />
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-col">
          <div className="font-medium">{contributor}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex-1 text-right font-bold">${amount}</div>{' '}
        </div>
      </div>
    </Card>
  )
}
