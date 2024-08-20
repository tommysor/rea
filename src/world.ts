import rnd from "./rnd";
import { TamUnit, createTam, feedTam, idleTam } from "./tam/tam";

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
  gameTickTams(world);
  return world;
}

function addTopLevelTam(world: WorldUnit, tam: TamUnit): WorldUnit {
  world.tamMap[tam.id] = tam;
  world.topLevelTamIds.push(tam.id);
  return world;
}

function createNewTam(): TamUnit {
  const id = rnd().rndTamId();
  return createTam({ id: id.toString() });
}

function gameTickTams(world: WorldUnit): WorldUnit {
  for (const tamId of world.topLevelTamIds) {
    const tam = world.tamMap[tamId];
    world.tamMap[tamId] = gameTickTam(tam);
  }
  return world;
}

function gameTickTam(tam: TamUnit): TamUnit {
  const rndVal = rnd().rnd();
  if (rndVal < 0.085) {
    return feedTam(tam);
  } else {
    return idleTam(tam);
  }
}
