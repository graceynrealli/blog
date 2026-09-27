import { describe, expect, it } from "vitest";

import { unwrapEmbedded } from "./embedded";

describe("unwrapEmbedded", () => {
  it("unwraps embeds given as arrays or objects", () => {
    expect(unwrapEmbedded([1])).toBe(1);
    expect(unwrapEmbedded(2)).toBe(2);
    expect(unwrapEmbedded([])).toBeNull();
    expect(unwrapEmbedded(null)).toBeNull();
  });
});
