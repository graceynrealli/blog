import type { ComponentProps } from "react";

import { cn } from "@/lib/utils/cn";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-border bg-surface-sunken px-4 py-3 text-sm placeholder:text-faint focus:border-accent focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("block text-sm font-medium", className)} {...props} />;
}
