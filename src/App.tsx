import { useState } from 'react'
import { createTam, TamUnit } from './tam/tam'
import Tam from './tam/Tam'

export default function App() {
  const [tams, setTams] = useState<TamUnit[]>([]);
  function addNewTam() {
    const newTam = createTam();
    setTams([...tams, newTam]);
  }
  function clearTams() {
    setTams([]);
  }

  return (
    <>
      <p>
        Hello reatam
      </p>
      <button onClick={addNewTam}>
        Add Tam
      </button>
      <button onClick={clearTams}>
        Clear
      </button>
      {
        tams.map((tam, index) => (
          <div id={index.toString()}><Tam tam={tam} /></div>))
      }
    </>
  )
}
