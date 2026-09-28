import { Eyebrow } from "@/components/ui/eyebrow";
import type { TocItem } from "@/lib/markdown/types";

const INDENT_BY_DEPTH: Record<TocItem["depth"], string> = { 2: "pl-4", 3: "pl-7" };

export function PostToc({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Mục lục" className="sticky top-24">
      <Eyebrow className="mb-3">Trong bài này</Eyebrow>
      <ol className="space-y-2 border-l border-border text-sm">
        {items.map((item) => (
          <li key={item.id} className={INDENT_BY_DEPTH[item.depth]}>
            <a href={`#${item.id}`} className="text-muted transition hover:text-accent">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
