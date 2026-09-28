import type { PostDetail } from "../types";
import { CategoryChip } from "./category-chip";
import { LevelBadge } from "./level-badge";
import { PostMeta } from "./post-meta";
import { SeriesNote } from "./series-note";

export function PostHeader({ post }: { post: PostDetail }) {
  return (
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
      {post.series && <SeriesNote series={post.series} />}
    </header>
  );
}
