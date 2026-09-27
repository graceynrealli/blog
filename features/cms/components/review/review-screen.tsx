"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDateTime } from "@/lib/format/date";
import { cn } from "@/lib/utils/cn";

import { useReviewPosts } from "../../hooks/use-cms-queries";
import { PageHeader } from "../page-header";
import { QueryState } from "../query-state";
import { ReviewPanel } from "./review-panel";

export function ReviewScreen() {
  const { data, isLoading, error } = useReviewPosts();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = data?.find((p) => p.id === selectedId) ?? data?.[0] ?? null;

  return (
    <>
      <PageHeader title="Duyệt bài" description="Bài tác giả gửi lên, cũ nhất ở trên." />
      <QueryState isLoading={isLoading} error={error} />
      {data && data.length === 0 && <EmptyState title="Không có bài nào chờ duyệt" />}
      {data && selected && (
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <ul className="space-y-2">
            {data.map((post) => (
              <li key={post.id}>
                <button type="button" onClick={() => setSelectedId(post.id)} className="w-full text-left">
                  <Card
                    interactive
                    className={cn("p-4", post.id === selected.id && "border-accent/60 bg-surface-hover")}
                  >
                    <p className="font-medium">{post.title}</p>
                    <p className="mt-1 text-xs text-muted">
                      {post.authorName} · {formatDateTime(post.updatedAt)}
                    </p>
                  </Card>
                </button>
              </li>
            ))}
          </ul>
          <ReviewPanel key={selected.id} postId={selected.id} />
        </div>
      )}
    </>
  );
}
