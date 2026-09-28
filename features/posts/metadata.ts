import type { Metadata } from "next";

import { ROUTES } from "@/config/routes";

import type { PostDetail } from "./types";

export function buildPostMetadata(post: PostDetail): Metadata {
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt ?? undefined;
  return {
    title,
    description,
    alternates: { canonical: ROUTES.post(post.slug) },
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: post.authors.map((a) => a.displayName),
      images: post.coverUrl ? [post.coverUrl] : undefined,
    },
  };
}
