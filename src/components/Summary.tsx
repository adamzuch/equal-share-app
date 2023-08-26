import { Repayment } from '../lib/equalize'

import { Card } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import { getAvatarColor, getAvatarIcon } from '@/lib/avatar'
import { ArrowRight } from 'lucide-react'

export function Summary({
  repayments,
}: {
  contributors: string[]
  outstandingBalances: [string, number][]
  repayments: Repayment[]
  targetContribution: number
  total: number
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold tracking-wide">Settle debts</h2>
      <div className="grid grid-cols-1 auto-rows-[1fr] gap-3">
        {repayments.map((repayment, i) => (
          <RepaymentCard key={i} repayment={repayment} />
        ))}
      </div>
    </div>
  )
}

function RepaymentCard({ repayment }: { repayment: Repayment }) {
  const { creditor, debtor, amount } = repayment

  const CreditorIcon = getAvatarIcon(creditor)
  const creditorColor = getAvatarColor(creditor)

  const DebtorIcon = getAvatarIcon(debtor)
  const debtorColor = getAvatarColor(debtor)

  return (
    <Card className="p-3 grid grid-cols-3 gap-3">
      <div className="flex flex-row justify-between items-center gap-3">
        <Avatar>
          <AvatarFallback style={{ backgroundColor: debtorColor }}>
            <DebtorIcon />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-16 truncate font-medium">{debtor}</div>
      </div>

      <div className="flex w-full justify-center items-center gap-1.5">
        <div className="font-bold">${amount.toFixed(2)}</div>
        <ArrowRight />
      </div>

      <div className="flex flex-row justify-right items-center gap-3">
        <div className="text-right flex-1 min-w-16 truncate font-medium">
          {creditor}
        </div>
        <Avatar>
          <AvatarFallback style={{ backgroundColor: creditorColor }}>
            <CreditorIcon />
          </AvatarFallback>
        </Avatar>
      </div>
    </Card>
  )
}
