import { describe, expect, it } from "vitest";

import { slugify } from "./slugify";

describe("slugify", () => {
  it("strips Vietnamese diacritics", () => {
    expect(slugify("Học Next.js 16 từ đầu")).toBe("hoc-next-js-16-tu-dau");
    expect(slugify("Đường đi của dữ liệu")).toBe("duong-di-cua-du-lieu");
  });

  it("trims separators and limits length", () => {
    expect(slugify("  --Xin chào!--  ")).toBe("xin-chao");
    expect(slugify("a ".repeat(100), 10)).toBe("a-a-a-a-a");
  });
});
