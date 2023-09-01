import { Contribution } from '@/lib/equalize'
import { Card } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'

import { getAvatarColor, getAvatarIcon } from '@/lib/avatar'

export function ContributionCardPreview({
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
          {contributor} paid <span className="font-semibold">${amount}</span>
          {description ? (
            <span>
              {' '}
              for <span>{description}</span>
            </span>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
