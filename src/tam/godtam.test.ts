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
  });

  it("should create additional tams, by chance", () => {
    const godtam = G.createGodTam();
    let newGodTam = G.godDecision(godtam);
    expect(newGodTam.tams.length).toBe(1);

    for (let i = 0; i < 200; i++) {
      newGodTam = G.godDecision(newGodTam);
    }
    expect(newGodTam.tams.length).toBeGreaterThan(1);
  });

  it("should remove a tam, when one is dead", () => {
    let godtam = G.createGodTam();
    godtam = G.godDecision(godtam);
    expect(godtam.tams.length).toBe(1);

    const tam = godtam.tams[0];
    tam.foodLevel = 0;
    godtam = G.godDecision(godtam);
    expect(godtam.tams.length).toBe(0);
  });

  it("should remove only 1 tam, when 2 are dead", () => {
    let godtam = G.createGodTam();
    godtam = G.godDecision(godtam);
    const tam = godtam.tams[0];
    const tam2 = { ...tam, id: "2" };
    godtam.tams = [...godtam.tams, tam2];
    expect(godtam.tams.length).toBe(2);

    godtam.tams[0].foodLevel = 0;
    godtam.tams[1].foodLevel = 0;
    godtam = G.godDecision(godtam);
    expect(godtam.tams.length).toBe(1);
  });
});
