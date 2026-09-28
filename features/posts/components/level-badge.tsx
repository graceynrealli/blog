import { Badge } from "@/components/ui/badge";

import { POST_LEVELS } from "../constants";
import type { PostLevel } from "../types";

export function LevelBadge({ level }: { level: PostLevel }) {
  const { label, className } = POST_LEVELS[level];
  return <Badge className={className}>{label}</Badge>;
}
