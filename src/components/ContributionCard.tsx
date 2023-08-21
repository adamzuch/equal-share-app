import { Contribution } from '@/lib/equalize'
import { Card } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'

import { getAvatarColor, getAvatarIcon } from '@/lib/avatar'
import { MoreVertical } from 'lucide-react'
import { Button } from './ui/button'

export default function ContributionCard({
  contribution,
}: {
  contribution: Contribution
}) {
  const { amount, contributor, description } = contribution

  const Icon = getAvatarIcon(contributor)
  const iconColor = getAvatarColor(contributor)

  return (
    <Card className="p-3 flex items-center gap-3">
      <div className="flex-1 min-w-0 flex items-center gap-3">
        <Avatar>
          <AvatarFallback style={{ backgroundColor: iconColor }}>
            <Icon />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 truncate">
          <span className="font-medium">{contributor}</span> paid{' '}
          <span className="font-bold">${amount}</span>
          {description ? (
            <span>
              {' '}
              for <span className="italic">{description}</span>
            </span>
          ) : null}
        </div>
      </div>
      <Button size="icon" variant="ghost">
        <MoreVertical />
      </Button>
    </Card>
  )
}
