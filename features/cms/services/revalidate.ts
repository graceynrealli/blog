import "server-only";

import { updateTag } from "next/cache";

import { POST_CACHE_TAGS } from "@/features/posts/constants";

/** Expire cached public pages that show this post (and every post list). */
export function refreshPublicPost(...slugs: (string | null | undefined)[]) {
  updateTag(POST_CACHE_TAGS.posts);
  for (const slug of new Set(slugs)) {
    if (slug) updateTag(POST_CACHE_TAGS.post(slug));
  }
}

export function refreshPublicTaxonomy() {
  updateTag(POST_CACHE_TAGS.categories);
  updateTag(POST_CACHE_TAGS.posts);
}
