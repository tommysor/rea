import { TamUnit, createTam } from "./tam";

export type GodTamUnit = {
  tams: TamUnit[];
};

export function createGodTam(): GodTamUnit {
  return {
    tams: [],
  };
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
  // todo: Chance to create a new tam
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
