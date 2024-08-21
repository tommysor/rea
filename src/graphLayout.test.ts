import { describe, expect, it } from "@jest/globals";
import { initialWorld, nextWorld } from "./world";
import { createGraph } from "./graphLayout";

function createAgedWorld() {
  let world = initialWorld();
  for (let i = 0; i < 30; i++) {
    world = nextWorld(world);
  }
  return world;
}
describe("graphLayout", () => {
  it("should contain same number of nodes as tams plus a god node", () => {
    const world = createAgedWorld();
    const { nodes } = createGraph(world);
    expect(nodes).toHaveLength(Object.keys(world.tamMap).length + 1);
  });
  it("should contain 1 less edge than nodes", () => {
    const world = createAgedWorld();
    const { nodes, edges } = createGraph(world);
    expect(edges).toHaveLength(nodes.length - 1);
  });
  it("should contain 1 node and 0 edges when there are no tams", () => {
    const world = initialWorld();
    const { nodes, edges } = createGraph(world);
    expect(nodes).toHaveLength(1);
    expect(edges).toHaveLength(0);
  });
});
