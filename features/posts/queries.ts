import "server-only";

import { unstable_cache } from "next/cache";

import { renderMarkdown, type TocItem } from "@/lib/markdown";
import { getPublicClient } from "@/lib/supabase/public";

import type { AuthorRef, CategoryNode, CategoryRef, PostDetail, PostSummary, TagRef } from "./types";

/** Cache tags. Server Actions that change content call updateTag() on these. */
export const cacheTags = {
  posts: "posts",
  post: (slug: string) => `post:${slug}`,
  categories: "categories",
} as const;

const REVALIDATE_SECONDS = 3600;

const SUMMARY_SELECT = `
  slug, title, excerpt, cover_url, level, reading_minutes, published_at,
  category:category_id (
    slug, name, color,
    parent:parent_id ( slug, name )
  ),
  post_authors ( position, profile:profiles ( username, display_name, avatar_url ) ),
  post_tags ( tag:tags ( slug, name ) )
` as const;

type Embedded<T> = T | T[] | null;

type SummaryRow = {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_url: string | null;
  level: PostSummary["level"];
  reading_minutes: number;
  published_at: string | null;
  category: Embedded<{
    slug: string;
    name: string;
    color: string | null;
    parent: Embedded<{ slug: string; name: string }>;
  }>;
  post_authors: {
    position: number;
    profile: Embedded<{ username: string; display_name: string; avatar_url: string | null }>;
  }[];
  post_tags: { tag: Embedded<{ slug: string; name: string }> }[];
};

function one<T>(value: Embedded<T>): T | null {
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function toSummary(row: SummaryRow): PostSummary {
  const category = one(row.category);
  const parent = category ? one(category.parent) : null;
  const categoryRef: CategoryRef | null = category
    ? { slug: category.slug, name: category.name, color: category.color, parent }
    : null;

  const authors: AuthorRef[] = [...row.post_authors]
    .sort((a, b) => a.position - b.position)
    .flatMap(({ profile }) => {
      const p = one(profile);
      return p ? [{ username: p.username, displayName: p.display_name, avatarUrl: p.avatar_url }] : [];
    });

  const tags: TagRef[] = row.post_tags.flatMap(({ tag }) => {
    const t = one(tag);
    return t ? [{ slug: t.slug, name: t.name }] : [];
  });

  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    coverUrl: row.cover_url,
    level: row.level,
    readingMinutes: row.reading_minutes,
    publishedAt: row.published_at,
    category: categoryRef,
    authors,
    tags,
  };
}

export const getLatestPosts = unstable_cache(
  async (limit: number = 12): Promise<PostSummary[]> => {
    const supabase = getPublicClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("posts")
      .select(SUMMARY_SELECT)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit)
      .overrideTypes<SummaryRow[], { merge: false }>();
    if (error) throw new Error(`getLatestPosts: ${error.message}`);
    return data.map(toSummary);
  },
  ["posts:latest"],
  { tags: [cacheTags.posts], revalidate: REVALIDATE_SECONDS },
);

export const getPublishedSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const supabase = getPublicClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("posts")
      .select("slug")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(`getPublishedSlugs: ${error.message}`);
    return data.map((row) => row.slug);
  },
  ["posts:slugs"],
  { tags: [cacheTags.posts], revalidate: REVALIDATE_SECONDS },
);

type DetailRow = SummaryRow & {
  content_md: string;
  content_html: string | null;
  toc: unknown;
  seo_title: string | null;
  seo_description: string | null;
  updated_at: string;
  series_position: number | null;
  series: Embedded<{ slug: string; title: string }>;
};

export function getPostBySlug(slug: string): Promise<PostDetail | null> {
  return unstable_cache(
    async (): Promise<PostDetail | null> => {
      const supabase = getPublicClient();
      if (!supabase) return null;
      const { data, error } = await supabase
        .from("posts")
        .select(
          `${SUMMARY_SELECT}, content_md, content_html, toc, seo_title, seo_description, updated_at,
           series_position, series ( slug, title )`,
        )
        .eq("status", "published")
        .eq("slug", slug)
        .maybeSingle()
        .overrideTypes<DetailRow, { merge: false }>();
      if (error) throw new Error(`getPostBySlug: ${error.message}`);
      if (!data) return null;

      // Posts are normally rendered on publish. Fall back to rendering here
      // (still cached) for rows written without HTML, such as seed data.
      const rendered =
        data.content_html != null
          ? { html: data.content_html, toc: (data.toc as TocItem[]) ?? [] }
          : await renderMarkdown(data.content_md);

      const series = one(data.series);
      return {
        ...toSummary(data),
        html: rendered.html,
        toc: rendered.toc,
        seoTitle: data.seo_title,
        seoDescription: data.seo_description,
        updatedAt: data.updated_at,
        series: series ? { ...series, position: data.series_position } : null,
      };
    },
    ["posts:detail", slug],
    { tags: [cacheTags.posts, cacheTags.post(slug)], revalidate: REVALIDATE_SECONDS },
  )();
}

type CategoryRow = {
  id: number;
  parent_id: number | null;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
};

export const getCategoryTree = unstable_cache(
  async (): Promise<CategoryNode[]> => {
    const supabase = getPublicClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("categories")
      .select("id, parent_id, slug, name, description, icon, color")
      .order("position");
    if (error) throw new Error(`getCategoryTree: ${error.message}`);

    const rows = data as CategoryRow[];
    return rows
      .filter((c) => c.parent_id === null)
      .map((c) => ({
        slug: c.slug,
        name: c.name,
        description: c.description,
        icon: c.icon,
        color: c.color,
        children: rows
          .filter((child) => child.parent_id === c.id)
          .map((child) => ({ slug: child.slug, name: child.name })),
      }));
  },
  ["categories:tree"],
  { tags: [cacheTags.categories], revalidate: REVALIDATE_SECONDS },
);
