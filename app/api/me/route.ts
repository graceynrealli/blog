import { NextResponse } from "next/server";

import { getSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export type MeResponse = {
  user: { username: string; displayName: string; avatarUrl: string | null; role: string } | null;
};

const noStore = { headers: { "Cache-Control": "private, no-store" } };

/** Who is signed in, for the header on otherwise static pages. */
export async function GET() {
  if (!getSupabaseEnv()) return NextResponse.json<MeResponse>({ user: null }, noStore);

  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) return NextResponse.json<MeResponse>({ user: null }, noStore);

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, avatar_url, role")
    .eq("id", userId)
    .maybeSingle();

  return NextResponse.json<MeResponse>(
    {
      user: profile
        ? {
            username: profile.username,
            displayName: profile.display_name,
            avatarUrl: profile.avatar_url,
            role: profile.role,
          }
        : null,
    },
    noStore,
  );
}
