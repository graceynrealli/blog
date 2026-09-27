import { describe, expect, it } from "vitest";

import { estimateReadingMinutes } from "./reading-time";

describe("estimateReadingMinutes", () => {
  it("never returns less than one minute", () => {
    expect(estimateReadingMinutes("")).toBe(1);
  });

  it("rounds words at 200 per minute", () => {
    expect(estimateReadingMinutes("từ ".repeat(700))).toBe(4);
  });
});
