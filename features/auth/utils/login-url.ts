import { QUERY_PARAMS, ROUTES } from "@/config/routes";

import type { LoginErrorCode } from "../constants";
import { MAGIC_LINK_SENT_FLAG } from "../constants";

type LoginUrlOptions = { next?: string; error?: LoginErrorCode; sent?: boolean };

/** Relative /login URL with its query string. */
export function buildLoginPath({ next, error, sent }: LoginUrlOptions = {}): string {
  const params = new URLSearchParams();
  if (error) params.set(QUERY_PARAMS.error, error);
  if (sent) params.set(QUERY_PARAMS.sent, MAGIC_LINK_SENT_FLAG);
  if (next) params.set(QUERY_PARAMS.next, next);
  const query = params.toString();
  return query ? `${ROUTES.login}?${query}` : ROUTES.login;
}

/** Absolute auth callback URL that Supabase redirects back to. */
export function buildCallbackUrl(origin: string, next: string): string {
  const url = new URL(ROUTES.authCallback, origin);
  url.searchParams.set(QUERY_PARAMS.next, next);
  return url.toString();
}
