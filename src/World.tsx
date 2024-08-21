import { useState, useEffect } from "react";
import { WorldUnit, nextWorld, initialWorld } from "./world";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { createGraph } from "./graphLayout";

export default function World() {
  const [world, setWorld] = useState<WorldUnit>(initialWorld());
  useEffect(() => {
    const interval = setInterval(() => {
      setWorld((oldWorld) => {
        return nextWorld(oldWorld);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const { nodes, edges } = createGraph(world);
  return (
    <div>
      <div className="w-screen h-screen">
        <ReactFlow nodes={nodes} edges={edges}>
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
