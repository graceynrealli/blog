import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const TONES = {
  error: { role: "alert", className: "border-danger/40 bg-danger/10 text-danger" },
  success: { role: "status", className: "border-emerald/40 bg-emerald/10 text-emerald" },
} as const;

type AlertProps = { tone: keyof typeof TONES; children: ReactNode; className?: string };

export function Alert({ tone, children, className }: AlertProps) {
  const { role, className: toneClass } = TONES[tone];
  return (
    <p role={role} className={cn("rounded-md border px-4 py-3 text-sm", toneClass, className)}>
      {children}
    </p>
  );
}
