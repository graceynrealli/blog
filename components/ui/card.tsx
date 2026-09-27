import type { ComponentProps } from "react";

import { cn } from "@/lib/utils/cn";

type CardProps<T extends "div" | "article" | "li"> = ComponentProps<T> & {
  as?: T;
  /** Accent border and glow on hover, for clickable cards. */
  interactive?: boolean;
};

export function Card<T extends "div" | "article" | "li" = "div">({
  as,
  interactive,
  className,
  ...props
}: CardProps<T>) {
  const Tag = (as ?? "div") as "div";
  return (
    <Tag
      className={cn(
        "rounded-lg border border-border bg-surface",
        interactive && "transition hover:border-accent/60 hover:bg-surface-hover hover:shadow-glow",
        className,
      )}
      {...(props as ComponentProps<"div">)}
    />
  );
}
