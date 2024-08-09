import { TamUnit } from "./tam";

export type GodTamUnit = {
  tams: TamUnit[];
};

export function createGodTam(): GodTamUnit {
  return {
    tams: [] as TamUnit[],
  };
}
