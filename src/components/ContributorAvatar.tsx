import {
  getAvatarBorderColor,
  getAvatarColor,
  getAvatarIcon,
} from '@/lib/avatar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function ContributorAvatar({ contributor }: { contributor: string }) {
  const Icon = getAvatarIcon(contributor)
  const backgroundColor = getAvatarColor(contributor)
  const borderColor = getAvatarBorderColor(contributor)
  return (
    <Avatar>
      <AvatarFallback
        className="text-[#020817] transition-colors group border-[3px]"
        style={{ backgroundColor, borderColor }}
      >
        <Icon className="group-hover:animate-bounce-better animate-none duration-1000" />
      </AvatarFallback>
    </Avatar>
  )
}
