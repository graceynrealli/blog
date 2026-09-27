import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils/cn";

const TONES = {
  muted: "text-muted hover:text-text",
  accent: "text-accent hover:text-accent-hover",
} as const;

type TextLinkProps = ComponentProps<typeof Link> & { tone?: keyof typeof TONES };

export function TextLink({ tone = "muted", className, ...props }: TextLinkProps) {
  return <Link className={cn("transition", TONES[tone], className)} {...props} />;
}
