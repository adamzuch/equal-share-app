import { cn } from '@/lib/utils'

import { ContributionType } from '@/lib/calculate-summary'
import { Contribution } from '@/components/Contribution'

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
    <div className={cn('px-6 grid grid-cols-1 auto-rows-[1fr]')}>
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
  )
}
