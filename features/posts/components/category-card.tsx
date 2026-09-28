import { Card } from "@/components/ui/card";
import { ColorDot } from "@/components/ui/color-dot";

import type { CategoryNode } from "../types";

const CHILD_SEPARATOR = " · ";

export function CategoryCard({ category }: { category: CategoryNode }) {
  return (
    <Card as="li" interactive className="p-5">
      <div className="flex items-center gap-2">
        <ColorDot color={category.color} size="md" />
        <h3 className="font-display text-lg font-bold">{category.name}</h3>
      </div>
      {category.description && <p className="mt-2 text-sm leading-relaxed text-muted">{category.description}</p>}
      {category.children.length > 0 && (
        <p className="mt-3 font-mono text-xs text-faint">
          {category.children.map((child) => child.name).join(CHILD_SEPARATOR)}
        </p>
      )}
    </Card>
  );
}
