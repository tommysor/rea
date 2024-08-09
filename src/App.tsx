import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>
        Hello reatam
      </p>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <button onClick={() => setCount(0)}>
        Clear
      </button>
    </>
  )
}
