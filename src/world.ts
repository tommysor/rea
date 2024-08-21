import rnd from "./rnd";
import { TamUnit, createTam, feedTam, idleTam } from "./tam/tam";

export type WorldUnit = {
  age: number;
  topLevelTamIds: string[];
  tamMap: Record<string, TamUnit>;
};

export function initialWorld(): WorldUnit {
  return {
    age: 0,
    topLevelTamIds: [],
    tamMap: {},
  };
}

function cloneWorld(world: WorldUnit): WorldUnit {
  return {
    age: world.age,
    topLevelTamIds: [...world.topLevelTamIds],
    tamMap: { ...world.tamMap },
  };
}

export function nextWorld(oldWorld: WorldUnit): WorldUnit {
  const world = cloneWorld(oldWorld);
  world.age++;
  maybeAddTam(world);
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

function maybeAddTam(world: WorldUnit): WorldUnit {
  const odds = baseProbabilityFromProgress({
    value: world.topLevelTamIds.length,
    max: 3,
  });
  const rndVal = rnd().rnd();
  if (world.topLevelTamIds.length === 0 || rndVal < odds) {
    return addTopLevelTam(world, createNewTam());
  }
  const rndVal2 = rnd().rnd();
  if (rndVal2 < 0.05) {
    var tam = createNewTam();
    world.tamMap[tam.id] = tam;
    assignTamToSomeParent(world, tam);
  }

  return world;
}

function addTopLevelTam(world: WorldUnit, tam: TamUnit): WorldUnit {
  world.tamMap[tam.id] = tam;
  world.topLevelTamIds.push(tam.id);
  return world;
}

function assignTamToSomeParent(world: WorldUnit, tam: TamUnit): WorldUnit {
  let idx = rnd().rndInt(world.topLevelTamIds.length);
  let parent = world.tamMap[world.topLevelTamIds[idx]];
  while (parent) {
    if (parent.children.length < 3) {
      const rnd2 = rnd().rnd();
      if (parent.children.length === 0 || rnd2 < 0.3) {
        parent.children.push(tam);
        return world;
      }
    }
    idx = rnd().rndInt(parent.children.length);
    //todo: when refactor to children containing ids instead of references.
    parent = world.tamMap[parent.children[idx].id];
  }
  console.assert(false, "should not reach here");
  return world;
}

function createNewTam(): TamUnit {
  const id = rnd().rndTamId();
  return createTam({ id: id.toString() });
}

function gameTickTams(world: WorldUnit): WorldUnit {
  for (const tamId of world.topLevelTamIds) {
    const tam = world.tamMap[tamId];
    console.assert(tam, `tam not found for id ${tamId}`);
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
