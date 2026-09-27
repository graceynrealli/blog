import type { ComponentProps } from "react";

import { cn } from "@/lib/utils/cn";

export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "w-full rounded-md border border-border bg-surface-sunken px-3 py-2.5 text-sm focus:border-accent focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
