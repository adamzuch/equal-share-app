import { Coins } from 'lucide-react'

import { cn } from '~/lib/utils'

import { ContributionType } from '~/lib/calculate-summary'
import { Contribution } from '~/components/Contribution'

export function Contributions({
  contributions,
  contributors,
  updateContribution,
  deleteContribution,
}: {
  contributions: ContributionType[]
  contributors: string[]
  updateContribution: (i: number, contribution: ContributionType) => void
  deleteContribution: (i: number) => void
}) {
  return (
    <div className="space-y-3 w-full">
      <span className="font-montserrat tracking-wide text-xl font-bold flex items-center gap-2">
        <Coins />
        Contributions
      </span>

      <div
        className={cn('grid grid-cols-1 lg:grid-cols-2 gap-3 auto-rows-[1fr]')}
      >
        {contributions.map((contribution, i) => (
          <Contribution
            contributors={contributors}
            key={i}
            index={i}
            contribution={contribution}
            onEdit={(i, contribution) => updateContribution(i, contribution)}
            onDelete={(i) => deleteContribution(i)}
          />
        ))}
      </div>
    </div>
  )
}
