import { describe, expect, it } from "vitest";

import { EMPTY_POST_FORM } from "../constants";
import { postInputSchema } from "../schemas";
import { toOptionalNumber, toPostInput } from "./post-form";

describe("post form", () => {
  it("turns the form into valid input", () => {
    const input = toPostInput({ ...EMPTY_POST_FORM, title: "Xin chào", slug: "xin-chao", categoryId: 1, tagsText: "a, b" });
    const parsed = postInputSchema.safeParse(input);
    expect(parsed.success).toBe(true);
    expect(parsed.data?.tags).toEqual(["a", "b"]);
    expect(parsed.data?.excerpt).toBeNull();
  });

  it("requires a category", () => {
    const parsed = postInputSchema.safeParse(toPostInput({ ...EMPTY_POST_FORM, title: "A", slug: "a" }));
    expect(parsed.success).toBe(false);
  });

  it("drops the series position without a series", () => {
    expect(toPostInput({ ...EMPTY_POST_FORM, seriesPosition: 3 }).seriesPosition).toBeNull();
  });

  it("parses optional numbers", () => {
    expect(toOptionalNumber("")).toBeNull();
    expect(toOptionalNumber("4")).toBe(4);
    expect(toOptionalNumber("x")).toBeNull();
  });
});
