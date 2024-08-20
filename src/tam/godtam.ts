import { TamUnit, createTam } from "./tam";

const maxTams = 5;

export type GodTamUnit = {
  id: string;
  tams: TamUnit[];
};

export function createGodTam(): GodTamUnit {
  return {
    id: "0",
    tams: [],
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
  if (godTam.tams.length === 0) {
    return godWithNewTam(godTam);
  }
  // Pri2, if any tam is dead, remove it
  const deadTam = godTam.tams.find((tam) => tam.foodLevel <= 0);
  if (deadTam) {
    return godWithOneTamRemoved({ godTam, tamToRemove: deadTam });
  }
  // Chance to create a new tam
  const chance = triggerValueFromProgress({
    value: godTam.tams.length,
    max: maxTams,
  });
  if (triggerChange({ triggerValue: chance })) {
    return godWithNewTam(godTam);
  }
  return godTam;
}

export function godWithNewTam(godTam: GodTamUnit): GodTamUnit {
  const id = Math.ceil(Math.random() * 1_000_000);
  return {
    ...godTam,
    tams: [...godTam.tams, createTam({ id: id.toString() })],
  };
}

function godWithOneTamRemoved({
  godTam,
  tamToRemove,
}: {
  godTam: GodTamUnit;
  tamToRemove: TamUnit;
}): GodTamUnit {
  const newGodTam = { ...godTam, tams: [...godTam.tams] };
  newGodTam.tams = godTam.tams.filter((tam) => tam.id != tamToRemove.id);
  return newGodTam;
}
