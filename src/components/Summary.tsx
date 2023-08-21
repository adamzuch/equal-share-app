import { ParentSize } from '@visx/responsive'

import { Repayment } from '../lib/equalize'
import { BarChart } from './BarChart'
import { Separator } from './ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import { getAvatarColor, getAvatarIcon } from '@/lib/avatar'
import { ArrowRight } from 'lucide-react'

export function Summary({
  contributors,
  outstandingBalances,
  repayments,
  targetContribution,
  total,
}: {
  contributors: string[]
  outstandingBalances: [string, number][]
  repayments: Repayment[]
  targetContribution: number
  total: number
}) {
  const totalExchanged = outstandingBalances.reduce(
    (a, [, b]) => (b > 0 ? a + b : a),
    0
  )

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Settle debts</h2>
      <div className="grid grid-cols-1 auto-rows-[1fr] gap-3">
        {repayments.map((repayment, i) => (
          <RepaymentCard key={i} repayment={repayment} />
        ))}
      </div>
    </div>
  )

  // return (
  //   <div className="flex flex-col gap-6 w-full">
  //     <div className="flex gap-6 items-center">
  //       <div className="text-2xl">
  //         <div>${total.toFixed(0)} total contributed</div>
  //         <div>{contributors.length} people</div>
  //         <Separator />
  //         <div>${targetContribution.toFixed(0)} per person</div>
  //       </div>

  //       <div>
  //         <div>${totalExchanged.toFixed(2)} needs to be settled</div>
  //         <div className="flex gap-4">
  //           <div>
  //             <div>Creditors</div>
  //             {outstandingBalances
  //               .filter(([, balance]) => balance > 0)
  //               .map(([contributor, balance]) => (
  //                 <div key={contributor}>
  //                   {contributor} is owed ${balance.toFixed(2)}{' '}
  //                   {((balance / total) * 100).toFixed(2)}%
  //                 </div>
  //               ))}
  //           </div>
  //           <div>
  //             <div>Debtors</div>
  //             {outstandingBalances
  //               .filter(([, balance]) => balance < 0)
  //               .map(([contributor, balance]) => (
  //                 <div key={contributor}>
  //                   {contributor} owes ${Math.abs(balance).toFixed(2)} (
  //                   {((Math.abs(balance) / total) * 100).toFixed(2)}%)
  //                 </div>
  //               ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     <Card className="p-6 min-w-0 w-full">
  //       <ParentSize>
  //         {({ width }) => (
  //           <BarChart
  //             width={width / 2}
  //             height={256}
  //             outstandingBalances={outstandingBalances.sort(
  //               ([, a], [, b]) => b - a
  //             )}
  //           />
  //         )}
  //       </ParentSize>
  //     </Card>

  //     <div className="grid grid-cols-3 gap-4">
  //       {repayments.map(({ creditor, debtor, amount }, i) => (
  //         <div className="p-2 bg-gray-100 rounded-lg" key={i}>
  //           <div>
  //             {debtor} pays {creditor} ${amount.toFixed(2)}
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // )
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
