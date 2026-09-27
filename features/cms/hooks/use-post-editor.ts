"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { ROUTES } from "@/config/routes";
import { slugify } from "@/lib/slug/slugify";

import { publishPost, savePost, submitForReview, unpublishPost } from "../actions/posts";
import { CMS_QUERY_KEYS, CMS_TIMINGS, EMPTY_POST_FORM } from "../constants";
import type { ActionResult, CmsPost, PostFormValues, SavedPost, SaveState } from "../types";
import { toPostFormValues, toPostInput } from "../utils/post-form";

type StatusAction = (id: string) => Promise<ActionResult<SavedPost>>;

/** Form state, autosave and status changes for one post (or a new one). */
export function usePostEditor(post: CmsPost | null) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [values, setValues] = useState<PostFormValues>(() => (post ? toPostFormValues(post) : EMPTY_POST_FORM));
  const [saved, setSaved] = useState<SavedPost | null>(
    post ? { id: post.id, slug: post.slug, status: post.status, updatedAt: post.updatedAt } : null,
  );
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [error, setError] = useState<string | null>(null);
  // New posts follow the title until the author edits the slug by hand.
  const slugTouched = useRef(post !== null);

  const canEdit = post ? post.canEdit : true;
  const canPublish = post?.canPublish ?? false;

  const update = useCallback(<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "slug") slugTouched.current = true;
      if (key === "title" && !slugTouched.current) next.slug = slugify(String(value));
      return next;
    });
    setSaveState("dirty");
  }, []);

  const refreshLists = useCallback(
    (id: string) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: CMS_QUERY_KEYS.allPosts }),
        queryClient.invalidateQueries({ queryKey: CMS_QUERY_KEYS.review }),
        queryClient.invalidateQueries({ queryKey: CMS_QUERY_KEYS.post(id) }),
      ]),
    [queryClient],
  );

  const save = useCallback(async (): Promise<SavedPost | null> => {
    setSaveState("saving");
    const result = await savePost(saved?.id ?? null, toPostInput(values));
    if (!result.ok) {
      setSaveState("error");
      setError(result.error);
      return null;
    }
    setError(null);
    setSaveState("saved");
    setSaved(result.data);
    if (!saved) router.replace(ROUTES.dashboardEditPost(result.data.id));
    await refreshLists(result.data.id);
    return result.data;
  }, [saved, values, router, refreshLists]);

  /** Save pending edits, then run a status change. */
  const runStatusAction = useCallback(
    async (action: StatusAction) => {
      const current = saveState === "dirty" || !saved ? await save() : saved;
      if (!current) return;
      const result = await action(current.id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setError(null);
      setSaved(result.data);
      await refreshLists(result.data.id);
    },
    [saveState, saved, save, refreshLists],
  );

  // Autosave drafts a few seconds after the last change.
  useEffect(() => {
    if (saveState !== "dirty" || !saved || saved.status !== "draft" || !canEdit) return;
    const timer = setTimeout(() => void save(), CMS_TIMINGS.autosaveDelayMs);
    return () => clearTimeout(timer);
  }, [saveState, saved, canEdit, save]);

  return {
    values,
    update,
    saved,
    saveState,
    error,
    canEdit,
    canPublish,
    save,
    submitForReview: () => runStatusAction(submitForReview),
    publish: () => runStatusAction(publishPost),
    unpublish: () => runStatusAction(unpublishPost),
  };
}

export type PostEditorState = ReturnType<typeof usePostEditor>;
