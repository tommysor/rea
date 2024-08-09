import { useState, useEffect } from "react";
import { createTam, TamUnit, idleTam, feedTam } from "./tam/tam";
import Tam from "./tam/Tam";

export default function App() {
  const [tams, setTams] = useState<TamUnit[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTams((prevTams) => {
        const updatedTams = prevTams.map((tam) => {
          const rnd = Math.random();
          if (rnd < 0.095) {
            return feedTam(tam);
          } else {
            return idleTam(tam);
          }
        });
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
      <h1 className="flex items-center justify-center text-3xl font-bold">
        ReaTam
      </h1>
      <div className="flex items-center justify-center">
        <button
          onClick={addNewTam}
          className="rounded-md bg-stone-500 mx-1 my-1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Tam
        </button>
        <button
          onClick={clearTams}
          className="rounded-md bg-stone-500 mx-1 my-1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Clear
        </button>
      </div>
      {tams.map((tam) => (
        <div key={tam.id}>
          <Tam tam={tam} />
        </div>
      ))}
    </>
  );
}
