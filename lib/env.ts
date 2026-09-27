import "server-only";

import { DEFAULT_SITE_URL, ENV_KEYS, readSupabaseEnv } from "./env-keys";

export function getSupabaseEnv() {
  return readSupabaseEnv();
}

export function requireSupabaseEnv() {
  const env = readSupabaseEnv();
  if (!env) {
    throw new Error(`Missing ${ENV_KEYS.supabaseUrl} or ${ENV_KEYS.supabasePublishableKey}. See .env.example.`);
  }
  return env;
}

export const siteUrl = process.env[ENV_KEYS.siteUrl] ?? DEFAULT_SITE_URL;
