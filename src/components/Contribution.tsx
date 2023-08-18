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
    <Card className="p-3 flex flex-row items-center gap-3">
      <Avatar>
        <AvatarFallback style={{ backgroundColor: iconColor }}>
          <Icon />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 truncate flex flex-col">
        <div className="font-medium">{contributor}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      <div className="text-right font-medium">${amount}</div> {/* </div> */}
    </Card>
  )
}
