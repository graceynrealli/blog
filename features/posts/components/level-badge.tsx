import { cn } from "@/lib/utils/cn";

import { POST_LEVELS } from "../constants";
import type { PostLevel } from "../types";

export function LevelBadge({ level }: { level: PostLevel }) {
  const { label, className } = POST_LEVELS[level];
  return <span className={cn("rounded-full px-2 py-0.5 font-mono text-[11px] font-medium ring-1", className)}>{label}</span>;
}
