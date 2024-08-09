import { describe, expect, it } from "@jest/globals";
import * as G from "./godtam";

describe("createGodTam", () => {
  it("should have no tams", () => {
    const godTam = G.createGodTam();
    expect(godTam.tams.length).toBe(0);
  });
});

describe("godDecision", () => {
    it("should create a new tam, when none is alive", () => {
        const godtam = G.createGodTam();
        const newGodTam = G.godDecision(godtam);
        expect(newGodTam.tams.length).toBe(1);
    })
});
