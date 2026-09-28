import type { ComponentProps } from "react";

import { cn } from "@/lib/utils/cn";

/** Pill label, e.g. a tag. */
export function Chip({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("inline-block rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted", className)}
      {...props}
    />
  );
}
