import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/lib/env";
import type { Database } from "@/types/database";

let client: SupabaseClient<Database> | null | undefined;

/**
 * Anonymous, cookie-less client for public pages. It reads only what RLS
 * allows anonymous visitors to see, and because it never touches cookies the
 * pages that use it stay statically cacheable (ISR).
 *
 * Returns null when Supabase is not configured (e.g. CI builds), so public
 * pages render empty instead of failing the build.
 */
export function getPublicClient(): SupabaseClient<Database> | null {
  if (client !== undefined) return client;
  const env = getSupabaseEnv();
  client = env
    ? createClient<Database>(env.url, env.key, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      })
    : null;
  return client;
}
