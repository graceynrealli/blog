import Link from "next/link";

import { Card } from "@/components/ui/card";
import { ROUTES } from "@/config/routes";

import { POST_LIMITS } from "../constants";
import type { PostSummary } from "../types";
import { CategoryChip } from "./category-chip";
import { LevelBadge } from "./level-badge";
import { PostMeta } from "./post-meta";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Card as="article" interactive className="group relative flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between gap-3">
        {post.category && <CategoryChip category={post.category} />}
        <LevelBadge level={post.level} />
      </div>

      <h3 className="font-display text-xl font-bold leading-snug text-balance">
        <Link href={ROUTES.post(post.slug)} className="after:absolute after:inset-0 focus-visible:outline-none">
          {post.title}
        </Link>
      </h3>

      {post.excerpt && <p className="line-clamp-3 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>}

      {post.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {post.tags.slice(0, POST_LIMITS.tagsOnCard).map((tag) => (
            <li key={tag.slug} className="font-mono text-xs text-faint">
              #{tag.name}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto border-t border-border pt-4">
        <PostMeta authors={post.authors} publishedAt={post.publishedAt} readingMinutes={post.readingMinutes} />
      </div>
    </Card>
  );
}
