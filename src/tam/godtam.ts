import { TamUnit, createTam } from "./tam";

const maxTams = 5;

export type GodTamUnit = {
  id: string;
  children: TamUnit[];
};

export function createGodTam(): GodTamUnit {
  return {
    id: "0",
    children: [],
  };
}

function triggerChange({ triggerValue }: { triggerValue: number }): boolean {
  return Math.random() < triggerValue;
}

function triggerValueFromProgress({
  value,
  max,
}: {
  value: number;
  max: number;
}): number {
  return 0.25 * (1 - value / max);
}

export function godDecision(godTam: GodTamUnit): GodTamUnit {
  // Pri1, if no tams, create one
  if (godTam.children.length === 0) {
    return godWithNewTam(godTam);
  }
  // Pri2, if any tam is dead, remove it
  const deadTam = godTam.children.find((tam) => tam.foodLevel <= 0);
  if (deadTam) {
    return godWithOneTamRemoved({ godTam, tamToRemove: deadTam });
  }
  // Chance to create a new tam
  const chance = triggerValueFromProgress({
    value: godTam.children.length,
    max: maxTams,
  });
  if (triggerChange({ triggerValue: chance })) {
    return godWithNewTam(godTam);
  }
  // Chance to give a tam a new tam
  if (triggerChange({ triggerValue: Math.max(chance / 2, 0.1) })) {
    return godWithNewDecendantTam(godTam);
  }
  return godTam;
}

function createTamWithGeneratedId(): TamUnit {
  const id = Math.ceil(Math.random() * 1_000_000);
  return createTam({ id: id.toString() });
}

function godWithNewDecendantTam(godTam: GodTamUnit): GodTamUnit {
  const idx = Math.floor(Math.random() * godTam.children.length);
  const tam = godTam.children[idx];
  const newGod = { ...godTam, children: [...godTam.children] };
  newGod.children[idx] = tamWithNewDecendantTam(tam);
  return newGod;
}

function tamWithNewDecendantTam(tam: TamUnit): TamUnit {
  if (tam.children.length <= 0) {
    return tamWithNewTam(tam);
  } else if (tam.children.length < 3) {
    if (Math.random() < 0.5) {
      return tamWithNewTam(tam);
    }
  }
  const idx = Math.floor(Math.random() * tam.children.length);
  tam.children[idx] = tamWithNewDecendantTam(tam.children[idx]);
  return tam;
}

function tamWithNewTam(tam: TamUnit): TamUnit {
  return {
    ...tam,
    children: [...tam.children, createTamWithGeneratedId()],
  };
}

export function godWithNewTam(godTam: GodTamUnit): GodTamUnit {
  return {
    ...godTam,
    children: [...godTam.children, createTamWithGeneratedId()],
  };
}

function godWithOneTamRemoved({
  godTam,
  tamToRemove,
}: {
  godTam: GodTamUnit;
  tamToRemove: TamUnit;
}): GodTamUnit {
  const newGodTam = { ...godTam, children: [...godTam.children] };
  newGodTam.children = godTam.children.filter(
    (tam) => tam.id != tamToRemove.id,
  );
  return newGodTam;
}
