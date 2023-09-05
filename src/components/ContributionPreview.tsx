import { ContributionType } from '@/lib/equalize'
import { ContributorAvatar } from '@/components/ContributorAvatar'

export function ContributionPreview({
  contribution,
}: {
  contribution: ContributionType
}) {
  const { amount, contributor, description } = contribution

  return (
    <div className="p-3 flex items-center gap-3">
      <ContributorAvatar contributor={contributor} />
      <div className=" truncate">
        {contributor} paid <span className="font-semibold">${amount}</span>
        {description ? (
          <span>
            {' '}
            for <span>{description}</span>
          </span>
        ) : null}
      </div>
    </div>
  )
}