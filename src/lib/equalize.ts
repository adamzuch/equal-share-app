export type Contribution = {
  amount: number | null
  contributor: string
  description: string
}

export type Account = {
  contributor: string
  balance: number
  total: number
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
  const target = total / contributors.length

  const accounts = calculateAccounts(contributions, target)
  const repayments = calculateRepayments(accounts)

  return { target, total, repayments, accounts }
}

function calculateAccounts(
  contributions: Contribution[],
  target: number
): Account[] {
  const accounts = new Map<string, Account>()
  for (const { contributor, amount } of contributions) {
    if (accounts.has(contributor)) {
      const account = accounts.get(contributor)!
      account.total += amount ?? 0
      account.balance += amount ?? 0
    } else {
      accounts.set(contributor, {
        contributor,
        total: amount ?? 0,
        balance: (amount ?? 0) - target,
      })
    }
  }
  return Array.from(accounts.values())
}

function calculateRepayments(accounts: Account[]): Repayment[] {
  const repayments: Repayment[] = []

  let balances = [
    ...accounts.map(({ contributor, balance }) => [contributor, balance]),
  ].filter(([, balance]) => balance !== 0) as [string, number][]

  while (balances.length > 1) {
    const [contributor1, balance1] = balances[0]

    const i = balances.findIndex(([contributor, balance]) => {
      return contributor1 !== contributor && !isSameSign(balance1, balance)
    })

    if (i === -1) {
      break
    }
    const [contributor2, balance2] = balances[i]

    const paymentAmount = Math.min(Math.abs(balance1), Math.abs(balance2))

    balances[0][1] += paymentAmount * (balance1 > 0 ? -1 : 1)
    balances[i][1] += paymentAmount * (balance2 > 0 ? -1 : 1)

    // record transaction
    repayments.push({
      creditor: balance1 > 0 ? contributor1 : contributor2,
      debtor: balance1 > 0 ? contributor2 : contributor1,
      amount: paymentAmount,
    })

    // delete balances which have been resolved (i.e. ~0)
    balances = balances.filter(([, balance]) => !isCloseToZero(balance))
  }

  return repayments
}

const isCloseToZero = (value: number) => Math.abs(value) < 0.01
const isSameSign = (x: number, y: number) => exclusiveOr(x > 0, y > 0)
const exclusiveOr = (a: boolean, b: boolean) => (a && b) || (!a && !b)
