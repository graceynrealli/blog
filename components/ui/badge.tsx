import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

/** Small status pill. Pass the tone classes from a feature's constants. */
export function Badge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-block whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[11px] font-medium ring-1", className)}>
      {children}
    </span>
  );
}
