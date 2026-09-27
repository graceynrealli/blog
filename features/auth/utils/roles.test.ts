import { describe, expect, it } from "vitest";

import { hasRole } from "./roles";

describe("hasRole", () => {
  it("includes lower ranks", () => {
    expect(hasRole("editor", "author")).toBe(true);
    expect(hasRole("admin", "editor")).toBe(true);
  });

  it("rejects lower roles and anonymous users", () => {
    expect(hasRole("author", "editor")).toBe(false);
    expect(hasRole(null, "reader")).toBe(false);
  });
});
