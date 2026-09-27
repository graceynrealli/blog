import "server-only";

import rehypeShiki from "@shikijs/rehype";
import type { Element, Root } from "hast";
import { headingRank } from "hast-util-heading-rank";
import { toString } from "hast-util-to-string";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export type TocItem = { id: string; text: string; depth: 2 | 3 };

export type RenderedMarkdown = {
  html: string;
  toc: TocItem[];
  readingMinutes: number;
};

const WORDS_PER_MINUTE = 200;

// Keep GitHub-style defaults, but don't prefix heading ids with "user-content-"
// so TOC anchors stay readable. rehype-slug adds ids after sanitizing.
const schema = { ...defaultSchema, clobberPrefix: "" };

function collectToc(toc: TocItem[]) {
  return () => (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      const rank = headingRank(node);
      if (rank !== 2 && rank !== 3) return;
      const id = node.properties?.id;
      if (typeof id !== "string") return;
      toc.push({ id, text: toString(node).trim(), depth: rank });
    });
  };
}

/**
 * Markdown to sanitized HTML with highlighted code, a table of contents and a
 * reading time. Runs when a post is published (or when a cached page is
 * built), never in the browser.
 */
export async function renderMarkdown(markdown: string): Promise<RenderedMarkdown> {
  const toc: TocItem[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize, schema)
    .use(rehypeSlug)
    .use(collectToc(toc))
    .use(rehypeShiki, { theme: "github-dark-default" })
    .use(rehypeStringify)
    .process(markdown);

  return { html: String(file), toc, readingMinutes: estimateReadingMinutes(markdown) };
}

export function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
