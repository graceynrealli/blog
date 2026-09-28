import type { Element, Root } from "hast";
import { headingRank } from "hast-util-heading-rank";
import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";

import { TOC_DEPTHS } from "./constants";
import type { TocItem } from "./types";

function isTocDepth(rank: number | undefined): rank is TocItem["depth"] {
  return TOC_DEPTHS.some((depth) => depth === rank);
}

/** Rehype plugin: pushes every h2/h3 (with an id) into `toc`. Run after rehype-slug. */
export function rehypeCollectToc(toc: TocItem[]) {
  return () => (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      const rank = headingRank(node);
      const id = node.properties?.id;
      if (!isTocDepth(rank) || typeof id !== "string") return;
      toc.push({ id, text: toString(node).trim(), depth: rank });
    });
  };
}
