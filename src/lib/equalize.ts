export type Contribution = {
  id: number
  amount: number | null
  contributor: Contributor
}

export type Contributor = {
  id: number
  name: string
}

export type Repayment = {
  id: number
  creditor: number
  debtor: number
  amount: number
}

export function refresh(payers: Contributor[]) {
  // don't need to calculate payments when there is less than two people.
  if (payers.length < 2) return []

  const balances = getBalances(payers)
  const results = determinePayments(balances)
  return results
}

export function equalize(
  contributions: Contribution[],
  contributors: Map<number, Contributor>
) {
  if (contributors.size < 2) return null

  const total = contributions.reduce((a, b) => a + (b.amount ?? 0), 0)
  const targetContribution = total / contributors.size

  const contributorTotals = calculateContributorTotals(contributions)
  const contributorBalances = calculateContributorBalances(
    contributorTotals,
    targetContribution
  )

  const repayments: any[] = []

  let repaymentsCount = 0
  while (contributorBalances.length > 1) {
    const [id1, balance1] = contributorBalances[0]

    const i = contributorBalances.findIndex(([id, balance]) => {
      return id1 !== id && !isSameSign(balance1, balance)
    })!

    const [id2, balance2] = contributorBalances[i]

    const paymentAmount = Math.min(Math.abs(balance1), Math.abs(balance2))

    contributorBalances[0][1] += paymentAmount * (balance1 > 0 ? -1 : 1)
    contributorBalances[i][1] += paymentAmount * (balance2 > 0 ? -1 : 1)

    // record transaction
    repayments.push({
      id: repaymentsCount++,
      creditorId: balance1 > 0 ? id1 : id2,
      debtorId: balance1 > 0 ? id2 : id1,
      amount: paymentAmount,
    })

    // delete balances which have been resolved (i.e. ~0)
    contributorBalances.filter(([, balance]) => !isCloseToZero(balance))
  }

  return {
    contributorTotals,
    targetContribution,
    total,
    repayments,
  }
}

function calculateContributorTotals(contributions: Contribution[]) {
  const contributorTotals = new Map<number, number>()
  for (const { contributor, ...contribution } of contributions) {
    if (contribution.amount !== null) {
      const total = contributorTotals.get(contributor.id) ?? 0
      contributorTotals.set(contributor.id, total + contribution.amount)
    }
  }
  return contributorTotals
}

function calculateContributorBalances(
  contributorAmounts: Map<number, number>,
  equalAmount: number
) {
  const contributorBalances: [number, number][] = []
  for (const [contributorId, contributorAmount] of contributorAmounts) {
    contributorBalances.push([contributorId, contributorAmount - equalAmount])
  }
  return contributorBalances
}

function determinePayments(balances: [string, number][]) {
  const results = []

  while (balances.length > 1 && !isCloseToZero(balances[0][1])) {
    const [currentName, currentBalance] = balances[0]

    // find another balance with different polarity to exchange with
    let i = 0
    let [otherName, otherBalance] = balances[i]
    do {
      i += 1
      ;[otherName, otherBalance] = balances[i]
    } while (i < balances.length && isSameSign(currentBalance, otherBalance))

    // do transaction
    const paymentAmount = Math.min(
      Math.abs(currentBalance),
      Math.abs(otherBalance)
    )
    balances[0][1] += paymentAmount * (currentBalance > 0 ? -1 : 1)
    balances[i][1] += paymentAmount * (otherBalance > 0 ? -1 : 1)

    // record transaction
    results.push({
      id: Math.random(),
      creditor: currentBalance > 0 ? currentName : otherName,
      debtor: currentBalance > 0 ? otherName : currentName,
      value: paymentAmount,
    })

    // delete balances which have been resolved (i.e. ~0)
    if (isCloseToZero(balances[i][1]))
      balances = deleteObjectInArray(balances, i)
    if (isCloseToZero(balances[0][1]))
      balances = deleteObjectInArray(balances, 0)
  }
  return results
}

function getBalances(payers: Contributor[]) {
  // pre-process state to get array of payment sums as well as sum of all payments.
  const totals = []
  let total = 0
  for (const payer of payers) {
    const payments = payer.contributions
      .filter((payment) => payment.amount !== null && !isNaN(payment.amount))
      .map((payment) => {
        return payment.amount
      }) as number[]
    const paymentsSum = payments.reduce((a, b) => a + b, 0)

    total += paymentsSum
    totals.push({ name: payer.name, total: paymentsSum })
  }

  // once total sum of all payments is known we can calculate who owes money (-ve value) and who is owed (+ve).
  const contribution = total / payers.length
  const balances: [string, number][] = totals.map((person) => [
    person.name,
    person.total - contribution,
  ])
  return balances.filter(([, balance]) => !isCloseToZero(balance))
}

const isCloseToZero = (value: number) => Math.abs(value) < 0.01
const isSameSign = (x: number, y: number) => XNOR(x > 0, y > 0)

const XNOR = (a: boolean, b: boolean) => (a && b) || (!a && !b)
const deleteObjectInArray = <T>(arr: T[], i: number) => {
  return Array.prototype.concat(arr.slice(0, i), arr.slice(i + 1))
}
