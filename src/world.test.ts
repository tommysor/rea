import { describe, it, expect, jest } from "@jest/globals";
import { WorldUnit, nextWorld } from "./world";

const mockRnd = jest.fn().mockReturnValue(0.5);
const mockRndInt = jest.fn().mockReturnValue(42);
const mockRndTamId = jest.fn().mockReturnValue(8964);
jest.mock("./rnd", () => {
  return jest.fn().mockImplementation(() => {
    return {
      rnd: mockRnd,
      rndInt: mockRndInt,
      rndTamId: mockRndTamId,
    };
  });
});

function createWorld(): WorldUnit {
  return { age: 0, topLevelTamIds: [], tamMap: {} } as WorldUnit;
}

describe("nextWorld", () => {
  it("should increment age", () => {
    const world1 = createWorld();
    expect(world1.age).toBe(0);
    const world2 = nextWorld(world1);
    expect(world2.age).toBe(1);
    const world3 = nextWorld(world2);
    expect(world3.age).toBe(2);
  });

  it("should create 1 top level Tam when none exist", () => {
    const world1 = createWorld();
    const world2 = nextWorld(world1);
    expect(world2.topLevelTamIds).toHaveLength(1);
    const tamId = world2.topLevelTamIds[0];
    const tam = world2.tamMap[tamId];
    expect(tam).toBeDefined();
    expect(tam.id).toBe(tamId);
  });

  it("should age tams", () => {
    const world1 = createWorld();
    const world2 = nextWorld(world1);
    const tamId = world2.topLevelTamIds[0];
    const tam = world2.tamMap[tamId];
    const tam2 = nextWorld(world2).tamMap[tamId];
    expect(tam2.age).toBeGreaterThan(tam.age);
  });
});
