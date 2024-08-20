import { useState, useEffect } from "react";
import { WorldUnit, nextWorld } from "./world";
import { createTam, idleTam, feedTam, TamUnit } from "./tam/tam";
import Godtam from "./tam/Godtam";
import Tam from "./tam/Tam";
import { createGodTam, godDecision, GodTamUnit } from "./tam/godtam";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Dagre from "@dagrejs/dagre";

type Unit = GodTamUnit | TamUnit;

export default function World() {
  const [world, setWorld] = useState<WorldUnit>({
    age: 0,
    topLevelTamIds: [],
    tamMap: {},
  });
  const [worldTam, setWorldTam] = useState(createGodTam());
  useEffect(() => {
    let counter = 0;
    setWorld((oldWorld) => {
      return nextWorld(oldWorld);
    });
    const interval = setInterval(() => {
      counter++;
      if (counter % 10 === 0) {
        setWorldTam((prev) => {
          return godDecision(prev);
        });
      }
      const mapChildrenStatus = (tam: Unit): Unit => {
        const updatedTams = tam.children.map((tam) => {
          const rnd = Math.random();
          let newTam = tam;
          if (rnd < 0.085) {
            newTam = feedTam(tam);
          } else {
            newTam = idleTam(tam);
          }
          return newTam;
        });
        for (let i = 0; i < updatedTams.length; i++) {
          updatedTams[i] = mapChildrenStatus(updatedTams[i]) as TamUnit;
        }
        return { ...tam, children: updatedTams };
      };
      setWorldTam((prevWorldTam) => {
        return mapChildrenStatus(prevWorldTam);
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
      return { ...prevWorldTam, children: [...prevWorldTam.children, newTam] };
    });
  }
  function clearTams() {
    setWorldTam({ ...worldTam, children: [] });
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
  if (worldTam.children.length > 0) {
    const tams = worldTam.children.map((tam) => {
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

  const addNodes = ({ tam }: { tam: TamUnit }): void => {
    if (tam.children.length > 0) {
      const nodes = tam.children.map((child) => {
        return {
          id: child.id,
          position: { x: 0, y: 0 },
          data: { label: <Tam tam={child} /> },
          style: { width: 300, height: 230 },
          measured: { width: 300, height: 200 },
        };
      });
      initialNodes.push(...nodes);
      var edges = nodes.map((child) => {
        return {
          id: `e${tam.id}-${child.id}`,
          source: tam.id,
          target: child.id,
        };
      });
      initialEdges.push(...edges);

      for (let i = 0; i < tam.children.length; i++) {
        addNodes({ tam: tam.children[i] });
      }
    }
  };
  for (let i = 0; i < worldTam.children.length; i++) {
    addNodes({ tam: worldTam.children[i] });
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
