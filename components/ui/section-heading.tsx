import type { ReactNode } from "react";

import { Eyebrow } from "./eyebrow";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  /** Rendered on the right, e.g. a "Xem tất cả" link. */
  action?: ReactNode;
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, action, as: Heading = "h2" }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading className="mt-1 font-display text-3xl font-bold">{title}</Heading>
      </div>
      {action}
    </div>
  );
}
