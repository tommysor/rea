import { describe, it, expect } from "@jest/globals";
import * as Tam from "../tam/tam";

describe("createTam", () => {
  it("should return a new TamUnit object with specified id", () => {
    const id = "myId";
    const tam = Tam.createTam({ id });
    expect(tam).toBeDefined();
    expect(tam.id).toBeTruthy();
    expect(typeof tam.id).toBe("string");
    expect(tam.id).toBe(id);
  });

  it("should create Tam alive", () => {
    const tam = Tam.createTam({ id: "myId" });
    expect(tam.foodLevel).toBeGreaterThan(0);
  });
});

describe("idleTam", () => {
  it("should age Tam", () => {
    const tam = Tam.createTam({ id: "myId" });
    const idledTam = Tam.idleTam(tam);
    expect(idledTam.age).toBeGreaterThan(tam.age);
  });

  it("should decrease foodLevel", () => {
    const tam = Tam.createTam({ id: "myId" });
    const idledTam = Tam.idleTam(tam);
    expect(idledTam.foodLevel).toBeLessThan(tam.foodLevel);
  });
});

describe("feedTam", () => {
  it("should increase foodLevel", () => {
    let tam = Tam.createTam({ id: "myId" });
    tam = Tam.idleTam(tam);
    const fedTam = Tam.feedTam(tam);
    expect(fedTam.foodLevel).toBeGreaterThan(tam.foodLevel);
  });
});

describe("deadTam", () => {
  it("should not process more actions", () => {
    let tam = Tam.createTam({ id: "myId" });
    for (let i = 0; i < 100; i++) {
      tam = Tam.idleTam(tam);
    }
    expect(tam.foodLevel).toBe(0);

    tam = Tam.feedTam(tam);
    expect(tam.foodLevel).toBe(0);
  });
});
