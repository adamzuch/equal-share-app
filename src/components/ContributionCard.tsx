import { Contribution } from '@/lib/equalize'
import { Card } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'

import { getAvatarColor, getAvatarIcon } from '@/lib/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { Button } from './ui/button'

export function ContributionCard({
  index = -1,
  contribution,
  editable = true,
  onEdit,
  onDelete,
}: {
  contribution: Contribution
  index?: number
  editable?: boolean
  onEdit?: (index: number) => void
  onDelete?: (index: number) => void
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
      {editable ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" size="icon" variant="ghost">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(index)}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete?.(index)}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </Card>
  )
}
