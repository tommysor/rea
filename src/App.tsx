import { useState, useEffect } from "react";
import { createTam, TamUnit, idleTam } from "./tam/tam";
import Tam from "./tam/Tam";

export default function App() {
  const [tams, setTams] = useState<TamUnit[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTams((prevTams) => {
        const updatedTams = prevTams.map((tam) => idleTam(tam));
        return updatedTams;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
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
      <p className="text-3xl font-bold underline">Hello reatam</p>
      <button onClick={addNewTam}>Add Tam</button>
      <button onClick={clearTams}>Clear</button>
      {tams.map((tam) => (
        <div id={tam.id}>
          <Tam tam={tam} />
        </div>
      ))}
    </>
  );
}
