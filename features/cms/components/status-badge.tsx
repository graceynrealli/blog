import { Badge } from "@/components/ui/badge";

import { POST_STATUS_META, TAG_STATUS_META } from "../constants";
import type { PostStatus, TagStatus } from "../types";

export function PostStatusBadge({ status }: { status: PostStatus }) {
  const { label, className } = POST_STATUS_META[status];
  return <Badge className={className}>{label}</Badge>;
}

export function TagStatusBadge({ status }: { status: TagStatus }) {
  const { label, className } = TAG_STATUS_META[status];
  return <Badge className={className}>{label}</Badge>;
}
