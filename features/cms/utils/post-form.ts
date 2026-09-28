import { TAG_INPUT_JOINER } from "../constants";
import type { PostInput } from "../schemas";
import type { CmsPost, PostFormValues } from "../types";
import { parseTagInput } from "./tag-names";

export function toPostFormValues(post: CmsPost): PostFormValues {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    contentMd: post.contentMd,
    categoryId: post.categoryId,
    level: post.level,
    seriesId: post.seriesId,
    seriesPosition: post.seriesPosition,
    coverUrl: post.coverUrl ?? "",
    seoTitle: post.seoTitle ?? "",
    seoDescription: post.seoDescription ?? "",
    tagsText: post.tags.join(TAG_INPUT_JOINER),
  };
}

export function toPostInput(form: PostFormValues): PostInput {
  return {
    title: form.title,
    slug: form.slug,
    excerpt: form.excerpt,
    contentMd: form.contentMd,
    categoryId: form.categoryId,
    level: form.level,
    seriesId: form.seriesId,
    seriesPosition: form.seriesId ? form.seriesPosition : null,
    coverUrl: form.coverUrl,
    seoTitle: form.seoTitle,
    seoDescription: form.seoDescription,
    tags: parseTagInput(form.tagsText),
  };
}

/** Parse a number input; empty means null. */
export function toOptionalNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}
