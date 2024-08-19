import { useState, useEffect } from "react";
import { createTam, idleTam, feedTam } from "./tam/tam";
import Tam from "./tam/Tam";
import { createGodTam, godDecision } from "./tam/godtam";
import { ReactFlow, Background, BackgroundVariant } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export default function World() {
  const [worldTam, setWorldTam] = useState(createGodTam());
  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      if (counter % 10 === 0) {
        setWorldTam((prev) => {
          return godDecision(prev);
        });
      }
      setWorldTam((prevWorldTam) => {
        const updatedTams = prevWorldTam.tams.map((tam) => {
          const rnd = Math.random();
          if (rnd < 0.085) {
            return feedTam(tam);
          } else {
            return idleTam(tam);
          }
        });
        const newWorldTam = { ...prevWorldTam, tams: updatedTams };
        return newWorldTam;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  function addNewTam() {
    const id = Math.ceil(Math.random() * 1_000_000);
    const newTam = createTam({ id: id.toString() });
    setWorldTam((prevWorldTam) => {
      return { ...prevWorldTam, tams: [...prevWorldTam.tams, newTam] };
    });
  }
  function clearTams() {
    setWorldTam({ ...worldTam, tams: [] });
  }

  const initialNodes = [
    { id: "1", position: { x: 400, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 300, y: 100 }, data: { label: "2" } },
    { id: "3", position: { x: 500, y: 100 }, data: { label: "3" } },
  ];
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" },
  ];

  return (
    <div>
      <div className="bg-neutral-300 rounded-3xl my-4 mx-4 py-4 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="order-first text-xs leading-1 text-gray-600">-</dt>
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
            </div>
          </dl>
        </div>
      </div>
      <div className="grid grid-cols-5">
        {worldTam.tams.map((tam) => (
          <div key={tam.id} className="grid-flow-col">
            <Tam tam={tam} />
          </div>
        ))}
      </div>
      <div
        style={{
          width: "100vw",
          height: "100vw",
        }}
      >
        <ReactFlow nodes={initialNodes} edges={initialEdges}>
          <Background
            color="#aaa"
            variant={BackgroundVariant.Dots}
            gap={32}
            size={1}
          />
        </ReactFlow>
      </div>
    </div>
  );
}
