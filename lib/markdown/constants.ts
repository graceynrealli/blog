import { defaultSchema } from "rehype-sanitize";

export const WORDS_PER_MINUTE = 200;

export const MIN_READING_MINUTES = 1;

export const CODE_THEME = "github-dark-default";

/** Headings that appear in the table of contents. */
export const TOC_DEPTHS = [2, 3] as const;

// Keep GitHub-style defaults, but don't prefix heading ids with "user-content-"
// so TOC anchors stay readable. rehype-slug adds ids after sanitizing.
export const SANITIZE_SCHEMA = { ...defaultSchema, clobberPrefix: "" };
