"use client";

import { useCmsPost } from "../../hooks/use-cms-queries";
import { QueryState } from "../query-state";
import { PostEditor } from "./post-editor";

export function EditPostScreen({ id }: { id: string }) {
  const { data, isLoading, error } = useCmsPost(id);
  if (!data) return <QueryState isLoading={isLoading} error={error} />;
  // Keyed so the form resets when a different post loads.
  return <PostEditor key={data.id} post={data} />;
}
