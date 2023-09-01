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
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { EditContributionForm } from './EditContributionForm'
import { useState } from 'react'

export function ContributionCard({
  index = -1,
  contribution,
  contributors,
  editable = true,
  onEdit,
  onDelete,
}: {
  contributors: string[]
  contribution: Contribution
  index?: number
  editable?: boolean
  onEdit?: (index: number, contribution: Contribution) => void
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
        <EditDeleteMenu
          contributors={contributors}
          contribution={contribution}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : null}
    </Card>
  )
}

const EditDeleteMenu = ({
  contribution,
  index,
  contributors,
  onEdit,
  onDelete,
}: {
  contributors: string[]
  contribution: Contribution
  index: number
  onEdit?: (index: number, contribution: Contribution) => void
  onDelete?: (index: number) => void
}) => {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" size="icon" variant="ghost">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={() => onDelete?.(index)}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <EditContributionForm
          contribution={contribution}
          contributors={contributors}
          onEditContribution={(contribution) => {
            onEdit?.(index, contribution)
            setShowDialog(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
