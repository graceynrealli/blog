import "server-only";

import { cache } from "react";

import { getSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

import { toSessionUser } from "./mappers";
import type { SessionUser } from "./types";

export const PROFILE_SESSION_SELECT = "username, display_name, avatar_url, role" as const;

/** The signed-in user's profile, at most once per request. */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  if (!getSupabaseEnv()) return null;

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select(PROFILE_SESSION_SELECT)
    .eq("id", userId)
    .maybeSingle();
  return profile ? toSessionUser(profile) : null;
});
