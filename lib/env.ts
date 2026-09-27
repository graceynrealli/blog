import "server-only";

/**
 * Server-only environment. None of these are prefixed with NEXT_PUBLIC_, so
 * they are never bundled into browser JavaScript (BFF: the browser never talks
 * to Supabase directly).
 */
export function getSupabaseEnv(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export function requireSupabaseEnv(): { url: string; key: string } {
  const env = getSupabaseEnv();
  if (!env) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY. See .env.example.");
  }
  return env;
}

export const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
