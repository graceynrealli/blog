import { describe, expect, it } from "vitest";

import { getInitials } from "./initials";

describe("getInitials", () => {
  it("uses the last two words", () => {
    expect(getInitials("Nguyễn Hải Nam")).toBe("HN");
    expect(getInitials("minhanh")).toBe("M");
    expect(getInitials("  ")).toBe("");
  });
});
