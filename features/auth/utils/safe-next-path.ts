import { ROUTES } from "@/config/routes";

/** Only allow same-site relative paths as post-login destinations. */
export function safeNextPath(value: unknown, fallback: string = ROUTES.home): string {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}
