import { Payer } from '../App'

export function refresh(payers: Payer[]) {
  // don't need to calculate payments when there is less than two people.
  if (payers.length < 2) return []

  const balances = getBalances(payers)
  const results = determinePayments(balances)
  return results
}

function determinePayments(balances: [string, number][]) {
  const results = []

  while (balances.length > 1 && !withinError(balances[0][1])) {
    const [currentName, currentBalance] = balances[0]

    // find another balance with different polarity to exchange with
    let i = 0
    let [otherName, otherBalance] = balances[i]
    do {
      i += 1
      ;[otherName, otherBalance] = balances[i]
    } while (
      i < balances.length &&
      hasSamePolarity(currentBalance, otherBalance)
    )

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
    if (withinError(balances[i][1])) balances = deleteObjectInArray(balances, i)
    if (withinError(balances[0][1])) balances = deleteObjectInArray(balances, 0)
  }
  return results
}

function getBalances(payers: Payer[]) {
  // pre-process state to get array of payment sums as well as sum of all payments.
  const totals = []
  let total = 0
  for (const payer of payers) {
    const payments = payer.payments
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
  return balances.filter(([, balance]) => !withinError(balance))
}

const deleteObjectInArray = <T>(arr: T[], i: number) => {
  return Array.prototype.concat(arr.slice(0, i), arr.slice(i + 1))
}

const hasSamePolarity = (x: number, y: number) => XNOR(x > 0, y > 0)

const XNOR = (a: boolean, b: boolean) => (a && b) || (!a && !b)

const withinError = (value: number) => Math.abs(value) < 0.01
