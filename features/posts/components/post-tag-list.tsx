import { Chip } from "@/components/ui/chip";

import type { TagRef } from "../types";

export function PostTagList({ tags }: { tags: TagRef[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="mt-12 flex flex-wrap gap-2 border-t border-border pt-6">
      {tags.map((tag) => (
        <li key={tag.slug}>
          <Chip>#{tag.name}</Chip>
        </li>
      ))}
    </ul>
  );
}
