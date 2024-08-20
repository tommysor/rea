import rnd from "./rnd";
import { TamUnit } from "./tam/tam";

export type WorldUnit = {
  age: number;
  topLevelTamIds: string[];
  tamMap: Record<string, TamUnit>;
};

export function nextWorld(oldWorld: WorldUnit): WorldUnit {
  const world = { ...oldWorld };
  world.age++;
  if (world.topLevelTamIds.length === 0) {
    addTopLevelTam(world, createNewTam());
  }
  return world;
}

function addTopLevelTam(world: WorldUnit, tam: TamUnit): WorldUnit {
  world.tamMap[tam.id] = tam;
  world.topLevelTamIds.push(tam.id);
  return world;
}

function createNewTam(): TamUnit {
  const id = rnd().rndTamId();
  return {
    id: id.toString(),
    age: 0,
    foodLevel: 100,
    children: [],
  };
}
