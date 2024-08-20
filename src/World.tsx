import { useState, useEffect } from "react";
import { WorldUnit, nextWorld, initialWorld } from "./world";
import Tam from "./tam/Tam";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Dagre from "@dagrejs/dagre";

export default function World() {
  const [world, setWorld] = useState<WorldUnit>(initialWorld);
  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      setWorld((oldWorld) => {
        return nextWorld(oldWorld);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const initialNodes = [
    {
      id: "0",
      position: { x: 0, y: 0 },
      data: { label: <div></div> },
      style: { width: 300, height: 230 },
      measured: { width: 300, height: 200 },
    },
  ];
  const initialEdges = [];
  if (world.topLevelTamIds.length > 0) {
    const tams = world.topLevelTamIds.map((tamId) => {
      const tam = world.tamMap[tamId];
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
        id: `e0-${tam.id}`,
        source: "0",
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
