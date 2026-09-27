import type { PostLevel } from "@/features/posts/types";
import { cn } from "@/lib/utils";

const LEVELS: Record<PostLevel, { label: string; className: string }> = {
  beginner: { label: "Cơ bản", className: "text-emerald bg-emerald/10 ring-emerald/25" },
  intermediate: { label: "Trung cấp", className: "text-sky bg-sky/10 ring-sky/25" },
  advanced: { label: "Nâng cao", className: "text-violet bg-violet/10 ring-violet/25" },
};

export function LevelBadge({ level }: { level: PostLevel }) {
  const { label, className } = LEVELS[level];
  return (
    <span className={cn("rounded-full px-2 py-0.5 font-mono text-[11px] font-medium ring-1", className)}>
      {label}
    </span>
  );
}
