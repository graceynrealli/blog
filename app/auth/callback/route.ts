import { NextResponse, type NextRequest } from "next/server";

import { QUERY_PARAMS } from "@/config/routes";
import { LOGIN_ERROR_CODES } from "@/features/auth/constants";
import { buildLoginPath } from "@/features/auth/utils/login-url";
import { safeNextPath } from "@/features/auth/utils/safe-next-path";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get(QUERY_PARAMS.code);
  const next = safeNextPath(searchParams.get(QUERY_PARAMS.next));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, origin));
  }

  return NextResponse.redirect(new URL(buildLoginPath({ error: LOGIN_ERROR_CODES.callback }), origin));
}
