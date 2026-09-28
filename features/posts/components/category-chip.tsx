import { ColorDot, DEFAULT_DOT_COLOR } from "@/components/ui/color-dot";

import type { CategoryRef } from "../types";

export function CategoryChip({ category }: { category: CategoryRef }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wider"
      style={{ color: category.color ?? DEFAULT_DOT_COLOR }}
    >
      <ColorDot color={category.color} />
      {category.name}
    </span>
  );
}
