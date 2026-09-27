import Link from "next/link";

import { EmptyState } from "@/components/empty-state";
import { PostCard } from "@/components/post-card";
import { getCategoryTree, getLatestPosts } from "@/features/posts/queries";

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getLatestPosts(6), getCategoryTree()]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(96_165_250/0.14),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
          <p className="font-mono text-sm text-accent">{"// nhật ký của developer"}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-balance md:text-6xl">
            Học một chút mỗi ngày, <span className="text-accent">ghi lại</span> và chia sẻ.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Bài viết thực chiến từ những người đang viết code mỗi ngày, từ frontend, backend tới DevOps và AI.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/posts"
              className="rounded-md bg-accent px-6 py-3 font-semibold text-canvas transition hover:bg-accent-hover"
            >
              Đọc bài mới nhất
            </Link>
            <Link
              href="#chu-de"
              className="rounded-md border border-border-strong px-6 py-3 font-semibold transition hover:border-accent hover:text-accent"
            >
              Chọn chủ đề
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-faint">Mới ra lò</p>
            <h2 className="mt-1 font-display text-3xl font-bold">Bài viết mới</h2>
          </div>
          <Link href="/posts" className="text-sm font-medium text-accent hover:text-accent-hover">
            Xem tất cả →
          </Link>
        </div>
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState title="Chưa có bài viết nào">Bài đầu tiên sẽ sớm xuất hiện ở đây.</EmptyState>
        )}
      </section>

      <section id="chu-de" className="scroll-mt-20 border-y border-border bg-surface-sunken">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-wider text-faint">Chọn món</p>
          <h2 className="mt-1 font-display text-3xl font-bold">Chủ đề</h2>
          {categories.length > 0 ? (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <li
                  key={category.slug}
                  className="rounded-lg border border-border bg-surface p-5 transition hover:border-accent/60 hover:shadow-glow"
                >
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="size-2.5 rounded-full"
                      style={{ background: category.color ?? "var(--accent)" }}
                    />
                    <h3 className="font-display text-lg font-bold">{category.name}</h3>
                  </div>
                  {category.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted">{category.description}</p>
                  )}
                  {category.children.length > 0 && (
                    <p className="mt-3 font-mono text-xs text-faint">
                      {category.children.map((child) => child.name).join(" · ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8">
              <EmptyState title="Chưa có chủ đề" />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
