import { cn } from "@/lib/utils/cn";

const SIZES = { sm: "size-1.5", md: "size-2.5" } as const;

export const DEFAULT_DOT_COLOR = "var(--accent)";

type ColorDotProps = { color?: string | null; size?: keyof typeof SIZES };

export function ColorDot({ color, size = "sm" }: ColorDotProps) {
  return (
    <span
      aria-hidden
      className={cn("shrink-0 rounded-full", SIZES[size])}
      style={{ background: color ?? DEFAULT_DOT_COLOR }}
    />
  );
}
