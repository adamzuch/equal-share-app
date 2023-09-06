import { ArrowRight } from 'lucide-react'

import { Card } from '@/components/ui/card'

import { RepaymentType } from '@/lib/calculate-summary'
import { ContributorAvatar } from '@/components/ContributorAvatar'

export function Repayment({ repayment }: { repayment: RepaymentType }) {
  const { creditor, debtor, amount } = repayment

  return (
    <Card className="p-3 grid grid-cols-3 gap-3">
      <div className="flex flex-row justify-between items-center gap-3">
        <ContributorAvatar contributor={debtor} />
        <div className="flex-1 min-w-16 truncate">{debtor}</div>
      </div>

      <div className="flex w-full justify-center items-center gap-1.5">
        <div className="font-semibold">{amount.format()}</div>
        <ArrowRight />
      </div>

      <div className="flex flex-row justify-right items-center gap-3">
        <div className="text-right flex-1 min-w-16 truncate">{creditor}</div>
        <ContributorAvatar contributor={creditor} />
      </div>
    </Card>
  )
}
