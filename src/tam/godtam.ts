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

  // Do nothing
  return godTam;
}
