import { useState } from 'react'
import { createTam, TamUnit } from './tam/tam'
import Tam from './tam/Tam'

export default function App() {
  const [tams, setTams] = useState<TamUnit[]>([]);
  function addNewTam() {
    const rnd = Math.random();
    const id = Math.ceil(rnd * 1_000_000);
    const newTam = createTam({ id: id.toString() });
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
        tams.map(tam => (
          <div id={tam.id}><Tam tam={tam} /></div>))
      }
    </>
  )
}
