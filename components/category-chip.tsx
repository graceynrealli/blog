import type { CategoryRef } from "@/features/posts/types";

export function CategoryChip({ category }: { category: CategoryRef }) {
  const color = category.color ?? "#60a5fa";
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wider"
      style={{ color }}
    >
      <span aria-hidden className="size-1.5 rounded-full" style={{ background: color }} />
      {category.name}
    </span>
  );
}
