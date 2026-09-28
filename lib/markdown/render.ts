import "server-only";

import rehypeShiki from "@shikijs/rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { CODE_THEME, SANITIZE_SCHEMA } from "./constants";
import { estimateReadingMinutes } from "./reading-time";
import { rehypeCollectToc } from "./rehype-collect-toc";
import type { RenderedMarkdown, TocItem } from "./types";

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
    .use(rehypeSanitize, SANITIZE_SCHEMA)
    .use(rehypeSlug)
    .use(rehypeCollectToc(toc))
    .use(rehypeShiki, { theme: CODE_THEME })
    .use(rehypeStringify)
    .process(markdown);

  return { html: String(file), toc, readingMinutes: estimateReadingMinutes(markdown) };
}
