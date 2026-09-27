import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Avatar } from "@/components/avatar";
import { CategoryChip } from "@/components/category-chip";
import { LevelBadge } from "@/components/level-badge";
import { PostMeta } from "@/components/post-meta";
import { getPostBySlug, getPublishedSlugs } from "@/features/posts/queries";

// Slugs not built ahead of time are rendered on first request, then cached.
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt ?? undefined;
  return {
    title,
    description,
    alternates: { canonical: `/posts/${post.slug}` },
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

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-faint">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-text">
              Trang chủ
            </Link>
          </li>
          {post.category?.parent && (
            <>
              <li aria-hidden>/</li>
              <li>{post.category.parent.name}</li>
            </>
          )}
          {post.category && (
            <>
              <li aria-hidden>/</li>
              <li>{post.category.name}</li>
            </>
          )}
        </ol>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0 max-w-3xl">
          <header className="border-b border-border pb-8">
            <div className="flex flex-wrap items-center gap-3">
              {post.category && <CategoryChip category={post.category} />}
              <LevelBadge level={post.level} />
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-balance md:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && <p className="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>}
            <div className="mt-6">
              <PostMeta authors={post.authors} publishedAt={post.publishedAt} readingMinutes={post.readingMinutes} />
            </div>
            {post.series && (
              <p className="mt-6 rounded-md border border-border bg-surface px-4 py-3 text-sm">
                <span className="font-mono text-xs uppercase tracking-wider text-faint">Series</span>{" "}
                <span className="font-semibold">{post.series.title}</span>
                {post.series.position && <span className="text-muted"> · Phần {post.series.position}</span>}
              </p>
            )}
          </header>

          <div className="article-prose mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.tags.length > 0 && (
            <ul className="mt-12 flex flex-wrap gap-2 border-t border-border pt-6">
              {post.tags.map((tag) => (
                <li
                  key={tag.slug}
                  className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
                >
                  #{tag.name}
                </li>
              ))}
            </ul>
          )}

          <section aria-label="Tác giả" className="mt-10 space-y-4">
            {post.authors.map((author) => (
              <div key={author.username} className="flex items-center gap-4 rounded-lg border border-border bg-surface p-5">
                <Avatar name={author.displayName} src={author.avatarUrl} size={48} />
                <div>
                  <p className="font-display font-bold">{author.displayName}</p>
                  <p className="font-mono text-xs text-faint">@{author.username}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        {post.toc.length > 0 && (
          <aside className="hidden lg:block">
            <nav aria-label="Mục lục" className="sticky top-24">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-faint">Trong bài này</p>
              <ol className="space-y-2 border-l border-border text-sm">
                {post.toc.map((item) => (
                  <li key={item.id} className={item.depth === 3 ? "pl-7" : "pl-4"}>
                    <a href={`#${item.id}`} className="text-muted transition hover:text-accent">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}
      </div>
    </article>
  );
}
