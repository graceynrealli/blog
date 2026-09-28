import Image from "next/image";

import { getInitials } from "@/lib/format/initials";
import { cn } from "@/lib/utils/cn";

export const AVATAR_SIZES = { sm: 24, md: 32, lg: 48 } as const;
export type AvatarSize = keyof typeof AVATAR_SIZES;

/** Initials are drawn at this fraction of the avatar's size. */
const INITIALS_FONT_RATIO = 0.4;

type AvatarProps = { name: string; src: string | null; size?: AvatarSize; className?: string };

export function Avatar({ name, src, size = "sm", className }: AvatarProps) {
  const px = AVATAR_SIZES[size];

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={px}
        height={px}
        className={cn("rounded-full object-cover ring-1 ring-border", className)}
      />
    );
  }

  return (
    <span
      aria-hidden
      style={{ width: px, height: px, fontSize: px * INITIALS_FONT_RATIO }}
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full bg-surface-hover font-semibold text-muted ring-1 ring-border",
        className,
      )}
    >
      {getInitials(name)}
    </span>
  );
}
