import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type Payer = {
  id: number
  name: string
}

function App() {
  const [count, setCount] = useState(0)

  const [payers, setPayers] = useState<Payer[]>([
    {
      id: 0,
      name: 'John Doe',
    },
  ])

  console.log(...payers)

  const updatePayerName = (payer: Payer, newName: string) => {
    setPayers(
      payers.map((p) => (p.id === payer.id ? { ...p, name: newName } : p))
    )
  }

  const createPayer = () => {
    setPayers(payers.concat([{ id: Math.random(), name: '' }]))
  }

  return (
    <>
      <div className="flex justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold underline">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        {payers.map((payer) => (
          <input
            key={payer.id}
            className="border border-gray-500"
            type="text"
            value={payer.name}
            placeholder="Enter your name"
            onChange={(e) => updatePayerName(payer, e.target.value)}
          />
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={createPayer}
        >
          Add payer +
        </button>
      </div>
    </>
  )
}

export default App
