import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { PostCard } from "@/components/post-card";
import { getLatestPosts } from "@/features/posts/queries";

export const metadata: Metadata = {
  title: "Bài viết",
  description: "Tất cả bài viết mới nhất trên Codelog.",
};

export default async function PostsPage() {
  const posts = await getLatestPosts(30);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-wider text-faint">Bài viết</p>
      <h1 className="mt-1 font-display text-4xl font-extrabold">Mới nhất</h1>
      <div className="mt-10">
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState title="Chưa có bài viết nào" />
        )}
      </div>
    </div>
  );
}
