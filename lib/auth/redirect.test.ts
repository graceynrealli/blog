import { describe, expect, it } from "vitest";

import { safeNextPath } from "./redirect";

describe("safeNextPath", () => {
  it("keeps relative paths", () => {
    expect(safeNextPath("/dashboard/posts?x=1")).toBe("/dashboard/posts?x=1");
  });

  it.each(["https://evil.test", "//evil.test", "/\\evil.test", "dashboard", undefined, 42])(
    "rejects %s",
    (value) => {
      expect(safeNextPath(value)).toBe("/");
    },
  );
});
