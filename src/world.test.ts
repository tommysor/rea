import { describe, it, expect, jest } from "@jest/globals";
import {
  WorldUnit,
  initialWorld,
  baseProbabilityFromProgress,
  nextWorld,
} from "./world";

const mockRnd = jest.fn().mockReturnValue(0.999);
const mockRndInt = jest.fn().mockReturnValue(42);
const mockRndTamId = jest
  .fn()
  // needs actual random number to avoid collisions
  .mockImplementation(() => Math.ceil(Math.random() * 2 ** 30));
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
  return initialWorld;
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

  it("should age tams", () => {
    const world1 = createWorld();
    const world2 = nextWorld(world1);
    const tamId = world2.topLevelTamIds[0];
    const tam = world2.tamMap[tamId];
    const tam2 = nextWorld(world2).tamMap[tamId];
    expect(tam2.age).toBeGreaterThan(tam.age);
  });
});

describe("nextWorld tam lifetimes", () => {
  it("should create 1 top level Tam when none exist", () => {
    const world1 = createWorld();
    const world2 = nextWorld(world1);
    expect(world2.topLevelTamIds).toHaveLength(1);
    const tamId = world2.topLevelTamIds[0];
    const tam = world2.tamMap[tamId];
    expect(tam).toBeDefined();
    expect(tam.id).toBe(tamId);
  });
  it("should create more top level Tams by chance", () => {
    let world = createWorld();
    world = nextWorld(world);
    expect(world.topLevelTamIds).toHaveLength(1);
    mockRnd.mockReturnValue(0.999);
    world = nextWorld(world);
    expect(world.topLevelTamIds).toHaveLength(1);
    mockRnd.mockReturnValue(0.001);
    world = nextWorld(world);
    expect(world.topLevelTamIds).toHaveLength(2);
  });
  it("should remove dead tams after delay", () => {
    let world = createWorld();
    world = nextWorld(world);
    const tamId = world.topLevelTamIds[0];
    const tam = world.tamMap[tamId];
    tam.foodLevel = 0;
    const deathAge = tam.age;

    world = nextWorld(world);
    expect(world.tamMap[tamId]).toBeDefined();
    expect(world.tamMap[tamId].foodLevel).toBe(0);
    expect(world.tamMap[tamId].age).toBe(deathAge);
    for (let i = 0; i < 15; i++) {
      world = nextWorld(world);
    }
    expect(world.tamMap[tamId]).toBeUndefined();
    expect(world.topLevelTamIds).not.toContain(tamId);
  });
});

describe("baseProbabilityFromProgress", () => {
  it("should be between 0 and 1", () => {
    const res = baseProbabilityFromProgress({ value: 0, max: 3 });
    expect(res).toBeGreaterThanOrEqual(0);
    expect(res).toBeLessThan(1);
  });
  it("should be 0 when value is max", () => {
    const res = baseProbabilityFromProgress({ value: 3, max: 3 });
    expect(res).toBe(0);
  });
  it("should be lower when value is higher", () => {
    const res1 = baseProbabilityFromProgress({ value: 1, max: 3 });
    const res2 = baseProbabilityFromProgress({ value: 2, max: 3 });
    expect(res1).toBeGreaterThan(res2);
  });
});
