import { useState, useEffect } from "react";
import { createTam, idleTam, feedTam } from "./tam/tam";
import Godtam from "./tam/Godtam";
import Tam from "./tam/Tam";
import { createGodTam, godDecision } from "./tam/godtam";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Dagre from "@dagrejs/dagre";

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
      id: worldTam.id,
      position: { x: 0, y: 0 },
      data: { label: <Godtam addNewTam={addNewTam} clearTams={clearTams} /> },
      style: { width: 300, height: 230 },
      measured: { width: 300, height: 200 },
    },
  ];
  const initialEdges = [];
  if (worldTam.tams.length > 0) {
    const tams = worldTam.tams.map((tam) => {
      return {
        id: tam.id,
        position: { x: 0, y: 0 },
        data: { label: <Tam tam={tam} /> },
        style: { width: 300, height: 230 },
        measured: { width: 300, height: 200 },
      };
    });
    initialNodes.push(...tams);
    var edges = tams.map((tam) => {
      return {
        id: `e${worldTam.id}-${tam.id}`,
        source: worldTam.id,
        target: tam.id,
      };
    });
    initialEdges.push(...edges);
  }

  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB" });

  initialEdges.forEach((edge) => g.setEdge(edge.source, edge.target));
  initialNodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    }),
  );

  Dagre.layout(g);

  var nodes = initialNodes.map((node) => {
    const position = g.node(node.id);
    return { ...node, position };
  });

  return (
    <div>
      <div className="w-screen h-screen">
        <ReactFlow nodes={nodes} edges={initialEdges}>
          <MiniMap
            zoomable
            pannable
            nodeStrokeWidth={5}
            nodeBorderRadius={50}
            bgColor="olivedrab"
            nodeColor="teal"
            nodeStrokeColor="black"
          />
          <Background
            bgColor="powderblue"
            variant={BackgroundVariant.Dots}
            gap={32}
            size={1}
          />
        </ReactFlow>
      </div>
    </div>
  );
}
