import { useState } from 'react'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import currency from 'currency.js'

import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

import type { ContributionType } from '~/lib/calculate-summary'
import { EditContribution } from '~/components/forms/EditContribution'
import { ContributorAvatar } from '~/components/ContributorAvatar'

export function Contribution({
  contribution,
  contributors,
  index,
  onEdit,
  onDelete,
}: {
  contribution: ContributionType
  contributors: string[]
  index: number
  onEdit?: (index: number, contribution: ContributionType) => void
  onDelete?: (index: number) => void
}) {
  const { amount, contributor, description } = contribution

  return (
    <Card className="p-3 flex items-center gap-3">
      <div className="flex-1 min-w-0 flex items-center gap-3">
        <ContributorAvatar contributor={contributor} />
        <div className="flex-1 min-w-0 truncate">
          {contributor} paid{' '}
          <span className="font-semibold">{currency(amount).format()}</span>
          {description ? (
            <span>
              {' '}
              for <span>{description}</span>
            </span>
          ) : null}
        </div>
      </div>

      <EditDeleteMenu
        contributors={contributors}
        contribution={contribution}
        index={index}
        onEdit={onEdit}
        onDelete={onDelete}
      />
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
  contribution: ContributionType
  index: number
  onEdit?: (index: number, contribution: ContributionType) => void
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
        <EditContribution
          contribution={contribution}
          contributors={contributors}
          onSubmit={(contribution) => {
            onEdit?.(index, contribution)
            setShowDialog(false)
          }}
          onCancel={() => setShowDialog(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
