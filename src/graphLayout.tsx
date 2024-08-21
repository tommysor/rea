import { WorldUnit } from "./world";
import Tam from "./tam/Tam";
import Dagre from "@dagrejs/dagre";
import { Edge, Node } from "@xyflow/react";
import { TamUnit } from "./tam/tam";

export function createGraph(world: WorldUnit): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodes = [createGodNode()];
  const edges = [];
  if (world.topLevelTamIds.length > 0) {
    const tams = world.topLevelTamIds.map((tamId) => {
      return createNodeFromTam(world.tamMap[tamId]);
    });
    nodes.push(...tams);
    const childEdges = createEdgesToChildren("0", tams);
    edges.push(...childEdges);
  }
  createNodesAndEdgesForAllChildren(world, nodes, edges);

  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB" });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    }),
  );

  Dagre.layout(g);

  nodes.forEach((node) => {
    const position = g.node(node.id);
    node.position.x = position.x;
    node.position.y = position.y;
    return node;
  });
  return {
    nodes: nodes,
    edges: edges,
  };
}

function createNodesAndEdgesForAllChildren(
  world: WorldUnit,
  nodes: Node[],
  edges: any[],
) {
  const queue = [...world.topLevelTamIds];
  while (queue.length > 0) {
    const parentId = queue.shift()!;
    const parent = world.tamMap[parentId];
    if (parent.children.length > 0) {
      const children = parent.children.map((childId) => {
        return createNodeFromTam(world.tamMap[childId.id]);
      });
      nodes.push(...children);
      const childEdges = createEdgesToChildren(parentId, children);
      edges.push(...childEdges);
      queue.push(...parent.children.map((child) => child.id));
    }
  }
}

function createGodNode(): Node {
  return {
    id: "0",
    position: { x: 0, y: 0 },
    data: { label: <div></div> },
    style: { width: 100, height: 50 },
    measured: { width: 100, height: 50 },
  };
}

function createNodeFromTam(tam: TamUnit): Node {
  return {
    id: tam.id,
    position: { x: 0, y: 0 },
    data: { label: <Tam tam={tam} /> },
    style: { width: 300, height: 230 },
    measured: { width: 300, height: 200 },
  };
}

function createEdgesToChildren(parentId: string, children: Node[]): Edge[] {
  var edges = children.map((childNode) => {
    return {
      id: `e${parentId}-${childNode.id}`,
      source: parentId,
      target: childNode.id,
    };
  });
  return edges;
}
