import { describe, expect, it } from "@jest/globals";
import * as G from "./godtam";

describe("createGodTam", () => {
  it("should have no tams", () => {
    const godTam = G.createGodTam();
    expect(godTam.tams.length).toBe(0);
  });
});
