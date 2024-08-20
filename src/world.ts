import rnd from "./rnd";
import { TamUnit, createTam, feedTam, idleTam } from "./tam/tam";

export type WorldUnit = {
  age: number;
  topLevelTamIds: string[];
  tamMap: Record<string, TamUnit>;
};

export const initialWorld: WorldUnit = {
  age: 0,
  topLevelTamIds: [],
  tamMap: {},
};

export function nextWorld(oldWorld: WorldUnit): WorldUnit {
  const world = { ...oldWorld };
  world.age++;
  maybeAddTopLevelTam(world);
  maybeCleanupDeadTam(world);
  gameTickTams(world);
  return world;
}

function maybeCleanupDeadTam(world: WorldUnit): WorldUnit {
  if (world.age % 10 === 0) {
    for (const tamId of world.topLevelTamIds) {
      const tam = world.tamMap[tamId];
      if (tam.foodLevel <= 0) {
        delete world.tamMap[tamId];
        world.topLevelTamIds = world.topLevelTamIds.filter(
          (id) => id !== tamId,
        );
        break;
      }
    }
  }
  return world;
}

function maybeAddTopLevelTam(world: WorldUnit): WorldUnit {
  const odds = baseProbabilityFromProgress({
    value: world.topLevelTamIds.length,
    max: 3,
  });
  const rndVal = rnd().rnd();
  if (world.topLevelTamIds.length === 0 || rndVal < odds) {
    return addTopLevelTam(world, createNewTam());
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

export function baseProbabilityFromProgress({
  value,
  max,
}: {
  value: number;
  max: number;
}): number {
  return 0.25 * (1 - value / max);
}
