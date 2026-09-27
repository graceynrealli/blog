import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const COLUMNS = {
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

type CardGridProps = {
  columns?: keyof typeof COLUMNS;
  /** Use "ul" when the children are <li> cards. */
  as?: "div" | "ul";
  className?: string;
  children: ReactNode;
};

export function CardGrid({ columns = 3, as: Tag = "div", className, children }: CardGridProps) {
  return <Tag className={cn("grid gap-6", COLUMNS[columns], className)}>{children}</Tag>;
}
