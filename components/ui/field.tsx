import type { ReactNode } from "react";

import { Label } from "./input";

type FieldProps = { id: string; label: string; hint?: string; children: ReactNode };

/** Label + control + optional hint, stacked. */
export function Field({ id, label, hint, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-faint">{hint}</p>}
    </div>
  );
}
