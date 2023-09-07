import currency from 'currency.js'

export type Currency = ReturnType<typeof currency>

export type ContributionType = {
  amount: number
  contributor: string
  description: string
}

export type CurrencyContributionType = {
  amount: Currency
  contributor: string
  description: string
}

export type AccountType = {
  contributor: string
  balance: Currency
  total: Currency
}

export type RepaymentType = {
  creditor: string
  debtor: string
  amount: Currency
}

export function calculateSummary(
  initialContributions: ContributionType[],
  contributors: string[]
) {
  if (contributors.length < 2) return null

  const contributions = initialContributions.map((contribution) => ({
    ...contribution,
    amount: currency(contribution.amount),
  }))

  const total = contributions.reduce((a, b) => a.add(b.amount), currency(0))
  const target = total.divide(contributors.length)

  const accounts = calculateAccounts(contributions, target)
  const repayments = calculateRepayments(accounts)

  return { target, total, repayments, accounts }
}

function calculateAccounts(
  contributions: CurrencyContributionType[],
  target: Currency
): AccountType[] {
  const accounts = new Map<string, AccountType>()
  for (const { contributor, amount } of contributions) {
    if (accounts.has(contributor)) {
      const account = accounts.get(contributor)!
      account.total = account.total.add(amount)
      account.balance = account.balance.add(amount)
    } else {
      accounts.set(contributor, {
        contributor,
        total: amount,
        balance: amount.subtract(target),
      })
    }
  }
  return Array.from(accounts.values())
}

function calculateRepayments(accounts: AccountType[]): RepaymentType[] {
  const repayments: RepaymentType[] = []

  let balances = [
    ...accounts.map(({ contributor, balance }) => [contributor, balance]),
  ].filter(([, balance]) => (balance as Currency).value !== 0) as [
    string,
    Currency
  ][]

  while (balances.length > 1) {
    const [contributor1, balance1] = balances[0]

    const i = balances.findIndex(([contributor, balance]) => {
      return contributor1 !== contributor && !isSameSign(balance1, balance)
    })

    if (i === -1) {
      break
    }
    const [contributor2, balance2] = balances[i]

    const paymentAmount = currency(
      Math.min(Math.abs(balance1.value), Math.abs(balance2.value))
    )

    balances[0][1] = balances[0][1].add(
      paymentAmount.multiply(balance1.value > 0 ? -1 : 1)
    )

    balances[i][1] = balances[i][1].add(
      paymentAmount.multiply(balance2.value > 0 ? -1 : 1)
    )

    // record transaction
    repayments.push({
      creditor: balance1.value > 0 ? contributor1 : contributor2,
      debtor: balance1.value > 0 ? contributor2 : contributor1,
      amount: paymentAmount,
    })

    // delete balances which have been resolved (i.e. ~0)
    balances = balances.filter(([, balance]) => !isCloseToZero(balance))
  }

  return repayments
}

const isCloseToZero = (value: Currency) => Math.abs(value.value) < 0.01
const isSameSign = (x: Currency, y: Currency) =>
  exclusiveOr(x.value > 0, y.value > 0)
const exclusiveOr = (a: boolean, b: boolean) => (a && b) || (!a && !b)
