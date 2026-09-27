import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = { name: string; src: string | null; size?: number; className?: string };

export function Avatar({ name, src, size = 28, className }: Props) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className={cn("rounded-full ring-1 ring-border object-cover", className)}
      />
    );
  }

  return (
    <span
      aria-hidden
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full bg-surface-hover font-semibold text-muted ring-1 ring-border",
        className,
      )}
    >
      {initials}
    </span>
  );
}
