import { useState, useEffect } from "react";
import { createTam, idleTam, feedTam } from "./tam/tam";
import Godtam from "./tam/Godtam";
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
    {
      id: "1",
      position: { x: 400, y: 20 },
      data: { label: <Godtam addNewTam={addNewTam} clearTams={clearTams} /> },
      style: { width: 300 },
    },
    { id: "2", position: { x: 300, y: 300 }, data: { label: "2" } },
    { id: "3", position: { x: 500, y: 300 }, data: { label: "3" } },
  ];
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" },
  ];

  return (
    <div>
      <Godtam addNewTam={addNewTam} clearTams={clearTams} />
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
