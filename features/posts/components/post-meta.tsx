import { Avatar } from "@/components/ui/avatar";
import { formatDate } from "@/lib/format/date";

import type { AuthorRef } from "../types";

type PostMetaProps = { authors: AuthorRef[]; publishedAt: string | null; readingMinutes: number };

export function PostMeta({ authors, publishedAt, readingMinutes }: PostMetaProps) {
  const [first, ...rest] = authors;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
      {first && (
        <span className="flex items-center gap-2">
          <Avatar name={first.displayName} src={first.avatarUrl} />
          <span className="font-medium text-text">
            {first.displayName}
            {rest.length > 0 && <span className="text-muted"> +{rest.length}</span>}
          </span>
        </span>
      )}
      {publishedAt && <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>}
      <span className="font-mono text-xs text-faint">{readingMinutes} phút đọc</span>
    </div>
  );
}
