"use client";

import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

import { CMS_LIMITS } from "../../constants";
import { useCmsTaxonomy } from "../../hooks/use-cms-queries";
import { usePostEditor } from "../../hooks/use-post-editor";
import type { CmsPost } from "../../types";
import { QueryState } from "../query-state";
import { EditorToolbar } from "./editor-toolbar";
import { MarkdownPanes } from "./markdown-panes";
import { PostSettings } from "./post-settings";

export function PostEditor({ post }: { post: CmsPost | null }) {
  const editor = usePostEditor(post);
  const taxonomy = useCmsTaxonomy();
  const { values, update, canEdit, error } = editor;

  return (
    <div className="space-y-5">
      <EditorToolbar editor={editor} />

      {error && <Alert tone="error">{error}</Alert>}
      {post?.reviewNote && post.status === "draft" && (
        <Alert tone="warning">Biên tập viên nhắn: {post.reviewNote}</Alert>
      )}
      {!canEdit && (
        <Alert tone="info">Bài đã gửi đi hoặc đã đăng. Chỉ biên tập viên mới sửa được lúc này.</Alert>
      )}

      <Input
        aria-label="Tiêu đề"
        value={values.title}
        readOnly={!canEdit}
        maxLength={CMS_LIMITS.titleMax}
        onChange={(e) => update("title", e.target.value)}
        placeholder="Tiêu đề bài viết"
        className="border-none bg-transparent px-0 font-display text-3xl font-extrabold focus:ring-0"
      />
      <div className="flex items-center gap-2 font-mono text-xs text-faint">
        <span>/posts/</span>
        <Input
          aria-label="Slug"
          value={values.slug}
          readOnly={!canEdit}
          onChange={(e) => update("slug", e.target.value)}
          className="px-2 py-1 font-mono text-xs"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <MarkdownPanes value={values.contentMd} onChange={(v) => update("contentMd", v)} readOnly={!canEdit} />
        <div>
          <QueryState isLoading={taxonomy.isLoading} error={taxonomy.error} />
          {taxonomy.data && <PostSettings editor={editor} taxonomy={taxonomy.data} />}
        </div>
      </div>
    </div>
  );
}
