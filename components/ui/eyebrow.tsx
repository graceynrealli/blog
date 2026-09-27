import type { ComponentProps } from "react";

import { cn } from "@/lib/utils/cn";

/** Small monospace caption above a heading, e.g. "MỚI RA LÒ". */
export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("font-mono text-xs uppercase tracking-wider text-faint", className)} {...props} />;
}
