import { cn } from "@/lib/utils/cn";

export const BUTTON_VARIANTS = {
  primary: "bg-accent text-canvas hover:bg-accent-hover",
  outline: "border border-border-strong text-text hover:border-accent hover:text-accent",
  inverted: "bg-text text-canvas hover:bg-white",
  ghost: "text-muted hover:text-text",
} as const;

export const BUTTON_SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5",
  lg: "px-6 py-3",
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
export type ButtonSize = keyof typeof BUTTON_SIZES;

export type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export function buttonClassName({ variant = "primary", size = "md", fullWidth }: ButtonStyleProps, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition disabled:pointer-events-none disabled:opacity-50",
    BUTTON_VARIANTS[variant],
    variant !== "ghost" && BUTTON_SIZES[size],
    fullWidth && "w-full",
    className,
  );
}
