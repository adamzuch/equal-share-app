import { getAvatarColor, getAvatarIcon } from '@/lib/avatar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function ContributorAvatar({ contributor }: { contributor: string }) {
  const Icon = getAvatarIcon(contributor)
  const iconColor = getAvatarColor(contributor)
  return (
    <Avatar>
      <AvatarFallback style={{ backgroundColor: iconColor }}>
        <Icon />
      </AvatarFallback>
    </Avatar>
  )
}
