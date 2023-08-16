import { Contribution } from '@/lib/equalize'
import { Card } from './ui/card'
import { Bird, Dog, Squirrel, Sun, Turtle } from 'lucide-react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { ReactNode, useState } from 'react'

export default function ContributionCard({
  contribution,
}: // contributors,
// onAmountChange,
// onContributorChange,
// onDelete,
// onDescriptionChange,
// onNewContribution,
{
  contribution: Contribution
  // contributors: string[]
  // onAmountChange?: (i: number, value: string) => void
  // onContributorChange?: (i: number, value: string) => void
  // onDescriptionChange?: (i: number, value: string) => void
  // onDelete?: (i: number) => void
  // onNewContribution?: (contribution: Contribution) => void
}) {
  const { amount, contributor, description } = contribution

  const iconLookup: { [key: string]: ReactNode } = {
    Adam: <Dog />,
    Bill: <Bird />,
    Charlie: <Turtle />,
    Frank: <Sun />,
  }
  const defaultIcon = iconLookup?.[contributor] ?? <Squirrel />
  const [icon] = useState<ReactNode>(defaultIcon)

  return (
    <Card className="flex-1 p-3 flex flex-row items-center gap-4">
      <Avatar>
        <AvatarFallback>{icon}</AvatarFallback>
      </Avatar>

      <div className="flex-1 flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-col">
          <div className="font-medium">{contributor}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex-1 text-right font-bold">${amount}</div>{' '}
          {/* <div className="-mr-3 -mb-3 text-right text-muted-foreground">
            <Button className="h-6" size="icon" variant="ghost">
              <MoreHorizontal />
            </Button>
          </div> */}
        </div>
      </div>
    </Card>
  )
}
