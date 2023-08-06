import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { refresh } from './lib/equalize'

export type Payer = {
  id: number
  name: string
  payments: Payment[]
}

export type Payment = {
  id: number
  amount: number | null
}

function App() {
  const [payers, setPayers] = useState<Payer[]>([
    {
      id: 0,
      name: 'John Doe',
      payments: [{ id: 0, amount: 5.3 }],
    },
  ])

  const results = refresh(payers)

  console.log(...payers)

  console.log('calculated: ', results)

  const updatePayerName = (payer: Payer, newName: string) => {
    setPayers(
      payers.map((p) => (p.id === payer.id ? { ...p, name: newName } : p))
    )
  }

  const handlePayerPaymentAmountChange = (
    payer: Payer,
    payment: Payment,
    inputText: string
  ) => {
    const newAmount = parseFloat(inputText)
    if (inputText === '') {
      updatePayerPayment(payer, payment, null)
    }
    if (!isNaN(newAmount)) {
      updatePayerPayment(payer, payment, newAmount)
    }
  }

  const updatePayerPayment = (
    payer: Payer,
    payment: Payment,
    newAmount: number | null
  ) => {
    const payments = payer.payments.map((p) =>
      p.id === payment.id ? { ...p, amount: newAmount } : p
    )
    setPayers(payers.map((p) => (p.id === payer.id ? { ...p, payments } : p)))
  }

  const createPayer = () => {
    setPayers(payers.concat([{ id: Math.random(), name: '', payments: [] }]))
  }

  const createPayment = (payer: Payer) => {
    setPayers(
      payers.map((p) =>
        p.id === payer.id
          ? {
              ...p,
              payments: p.payments.concat({ id: Math.random(), amount: null }),
            }
          : p
      )
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold underline">Vite + React</h1>
      <div className="flex flex-col">
        {payers.map((payer) => (
          <div>
            <input
              key={payer.id}
              className="border border-gray-500"
              type="text"
              value={payer.name}
              placeholder="Enter your name"
              onChange={(e) => updatePayerName(payer, e.target.value)}
            />
            <div>Payments</div>
            <div className="flex flex-col">
              {payer.payments.map((payment) =>
                payment.amount !== null ? (
                  <input
                    key={payment.id}
                    className="border border-gray-500"
                    type="number"
                    min="0"
                    step="any"
                    value={payment.amount}
                    placeholder="Enter a payment"
                    onChange={(e) => {
                      handlePayerPaymentAmountChange(
                        payer,
                        payment,
                        e.target.value
                      )
                    }}
                  />
                ) : (
                  <input
                    key={payment.id}
                    className="border border-gray-500"
                    type="text"
                    value={''}
                    placeholder="Enter a payment"
                    onChange={(e) => {
                      handlePayerPaymentAmountChange(
                        payer,
                        payment,
                        e.target.value
                      )
                    }}
                  />
                )
              )}
            </div>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => createPayment(payer)}
              >
                Add payment +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={createPayer}
        >
          Add payer +
        </button>
      </div>

      <div>
        {results.map((result) => (
          <div>
            {result.debtor} owes {result.creditor} {result.value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
