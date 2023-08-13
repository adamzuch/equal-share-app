export type Contribution = {
  amount: number | null
  contributor: string
}

export type Repayment = {
  creditor: string
  debtor: string
  amount: number
}

export function equalize(
  contributions: Contribution[],
  contributors: string[]
) {
  if (contributors.length < 2) return null

  const total = contributions.reduce((a, b) => a + (b.amount ?? 0), 0)
  const targetContribution = total / contributors.length

  const contributorTotals = calculateContributorTotals(contributions)
  const outstandingBalances = calculateContributorBalances(
    contributorTotals,
    targetContribution
  )

  const repayments: Repayment[] = []

  let workingBalances = [...outstandingBalances.map(([a, b]) => [a, b])] as [
    string,
    number
  ][]

  let x = 0
  while (workingBalances.length > 1 && x++ < 100) {
    const [contributor1, balance1] = workingBalances[0]

    const i = workingBalances.findIndex(([contributor, balance]) => {
      return contributor1 !== contributor && !isSameSign(balance1, balance)
    })

    if (i === -1) {
      break
    }

    const [contributor2, balance2] = workingBalances[i]

    const paymentAmount = Math.min(Math.abs(balance1), Math.abs(balance2))

    workingBalances[0][1] += paymentAmount * (balance1 > 0 ? -1 : 1)
    workingBalances[i][1] += paymentAmount * (balance2 > 0 ? -1 : 1)

    // record transaction
    repayments.push({
      creditor: balance1 > 0 ? contributor1 : contributor2,
      debtor: balance1 > 0 ? contributor2 : contributor1,
      amount: paymentAmount,
    })

    // delete balances which have been resolved (i.e. ~0)
    workingBalances = workingBalances.filter(
      ([, balance]) => !isCloseToZero(balance)
    )
  }

  return {
    outstandingBalances,
    targetContribution,
    total,
    repayments,
  }
}

function calculateContributorTotals(contributions: Contribution[]) {
  const contributorTotals = new Map<string, number>()
  for (const { contributor, ...contribution } of contributions) {
    if (contribution.amount !== null) {
      const total = contributorTotals.get(contributor) ?? 0
      contributorTotals.set(contributor, total + contribution.amount)
    }
  }
  return contributorTotals
}

function calculateContributorBalances(
  contributorTotals: Map<string, number>,
  equalAmount: number
) {
  const contributorBalances: [string, number][] = []
  for (const [contributor, total] of contributorTotals) {
    contributorBalances.push([contributor, total - equalAmount])
  }
  return contributorBalances
}

const isCloseToZero = (value: number) => Math.abs(value) < 0.01
const isSameSign = (x: number, y: number) => exclusiveOr(x > 0, y > 0)
const exclusiveOr = (a: boolean, b: boolean) => (a && b) || (!a && !b)
