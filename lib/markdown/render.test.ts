import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { renderMarkdown } = await import("./render");

describe("renderMarkdown", () => {
  it("builds a table of contents from h2 and h3", async () => {
    const { toc } = await renderMarkdown("# Tiêu đề\n\n## Vì sao cần queue\n\n### Retry\n\n#### Bỏ qua");
    expect(toc).toEqual([
      { id: "vì-sao-cần-queue", text: "Vì sao cần queue", depth: 2 },
      { id: "retry", text: "Retry", depth: 3 },
    ]);
  });

  it("strips raw HTML and scripts", async () => {
    const { html } = await renderMarkdown('<script>alert(1)</script>\n\n[x](javascript:alert(1))');
    expect(html).not.toContain("<script");
    expect(html).not.toContain("javascript:");
  });
});
