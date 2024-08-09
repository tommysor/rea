import { TamUnit, createTam } from "./tam";

export type GodTamUnit = {
  tams: TamUnit[];
};

export function createGodTam(): GodTamUnit {
  return {
    tams: [] as TamUnit[],
  };
}

export function godDecision(godTam: GodTamUnit): GodTamUnit {
  if (godTam.tams.length === 0) {
    const id = Math.ceil(Math.random() * 1_000_000);
    return {
      ...godTam,
      tams: [...godTam.tams, createTam({ id: id.toString() })],
    };
  }

  const newGodTam = { ...godTam, tams: [...godTam.tams] };
  const deadTam = godTam.tams.find((tam) => tam.foodLevel <= 0);
  newGodTam.tams = godTam.tams.filter((tam) => tam.id != deadTam?.id);

  return newGodTam;
}
