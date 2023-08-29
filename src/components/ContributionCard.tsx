import { Contribution } from '@/lib/equalize'
import { Card } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'

import { getAvatarColor, getAvatarIcon } from '@/lib/avatar'
import { MoreVertical } from 'lucide-react'
import { Button } from './ui/button'

export function ContributionCard({
  contribution,
  isEditable = true,
}: {
  contribution: Contribution
  isEditable?: boolean
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
          {contributor} paid <span className="font-semibold">${amount}</span>
          {description ? (
            <span>
              {' '}
              for <span>{description}</span>
            </span>
          ) : null}
        </div>
      </div>
      {isEditable ? (
        <Button type="button" size="icon" variant="ghost">
          <MoreVertical />
        </Button>
      ) : null}
    </Card>
  )
}
