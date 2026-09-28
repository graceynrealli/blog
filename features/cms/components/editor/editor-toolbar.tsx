import { Button } from "@/components/ui/button";

import { SAVE_STATE_LABELS } from "../../constants";
import type { PostEditorState } from "../../hooks/use-post-editor";
import { PostStatusBadge } from "../status-badge";

export function EditorToolbar({ editor }: { editor: PostEditorState }) {
  const { saved, saveState, canEdit, canPublish } = editor;
  const status = saved?.status ?? "draft";
  const busy = saveState === "saving";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <PostStatusBadge status={status} />
      <span className="font-mono text-xs text-faint" aria-live="polite">
        {SAVE_STATE_LABELS[saveState]}
      </span>
      <div className="ml-auto flex flex-wrap gap-2">
        {canEdit && (
          <Button variant="outline" size="sm" disabled={busy} onClick={() => void editor.save()}>
            Lưu
          </Button>
        )}
        {canEdit && !canPublish && status === "draft" && (
          <Button size="sm" disabled={busy} onClick={() => void editor.submitForReview()}>
            Gửi duyệt
          </Button>
        )}
        {canPublish && status !== "published" && (
          <Button size="sm" disabled={busy} onClick={() => void editor.publish()}>
            Đăng bài
          </Button>
        )}
        {canPublish && status === "published" && (
          <Button variant="outline" size="sm" disabled={busy} onClick={() => void editor.unpublish()}>
            Gỡ bài
          </Button>
        )}
      </div>
    </div>
  );
}
