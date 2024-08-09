import { useState } from 'react'
import { createTam } from './tam/tam'

export default function App() {
  const [count, setCount] = useState(0)
  const tam = createTam();

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
      <p>
        {tam.id}: {tam.age}
      </p>
    </>
  )
}
