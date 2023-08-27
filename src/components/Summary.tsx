import { Repayment } from '../lib/equalize'

import { Card } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import { getAvatarColor, getAvatarIcon } from '@/lib/avatar'
import { ArrowRight } from 'lucide-react'

export function Summary({
  repayments,
  total,
  targetContribution,
  contributors,
  outstandingBalances,
}: {
  contributors: string[]
  outstandingBalances: [string, number][]
  repayments: Repayment[]
  targetContribution: number
  total: number
}) {
  return (
    <div className="space-y-12">
      <h2 className="text-2xl text-center">
        <span className="font-bold">${total}</span> contributed by{' '}
        <span className="font-bold">{contributors.length} people</span> equals{' '}
        <span className="font-bold">${targetContribution}</span> per person
      </h2>

      <div className="space-y-1.5">
        <h2 className="text-xl font-bold tracking-wide">Creditors</h2>
        <div className="grid grid-cols-1 auto-rows-[1fr] gap-3">
          {outstandingBalances
            .filter(([, balance]) => balance > 0)
            .map(([creditor, balance]) => (
              <CreditorCard
                key={creditor}
                creditor={creditor}
                balance={balance}
              />
            ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <h2 className="text-xl font-bold tracking-wide">Debtors</h2>
        <div className="grid grid-cols-1 auto-rows-[1fr] gap-3">
          {outstandingBalances
            .filter(([, balance]) => balance < 0)
            .map(([debtor, balance]) => (
              <DebtorCard key={debtor} debtor={debtor} balance={balance} />
            ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <h2 className="text-xl font-bold tracking-wide">Settle debts</h2>
        <div className="grid grid-cols-1 auto-rows-[1fr] gap-3">
          {repayments.map((repayment, i) => (
            <RepaymentCard key={i} repayment={repayment} />
          ))}
        </div>
      </div>
    </div>
  )
}

function CreditorCard({
  creditor,
  balance,
}: {
  creditor: string
  balance: number
}) {
  const CreditorIcon = getAvatarIcon(creditor)
  const creditorColor = getAvatarColor(creditor)

  return (
    <Card className="p-3">
      <div className="flex flex-row justify-between items-center gap-3">
        <Avatar>
          <AvatarFallback style={{ backgroundColor: creditorColor }}>
            <CreditorIcon />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-16 truncate">
          <span className="font-medium">{creditor}</span> is owed{' '}
          <span className="font-bold">${balance}</span>
        </div>
      </div>
    </Card>
  )
}

function DebtorCard({ debtor, balance }: { debtor: string; balance: number }) {
  const DebtorIcon = getAvatarIcon(debtor)
  const debtorColor = getAvatarColor(debtor)

  return (
    <Card className="p-3">
      <div className="flex flex-row justify-between items-center gap-3">
        <Avatar>
          <AvatarFallback style={{ backgroundColor: debtorColor }}>
            <DebtorIcon />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-16 truncate">
          <span className="font-medium">{debtor}</span> owes{' '}
          <span className="font-bold">${balance}</span>
        </div>
      </div>
    </Card>
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
