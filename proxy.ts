import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

const PROTECTED_PREFIXES = ["/dashboard", "/me"];

export async function proxy(request: NextRequest) {
  const { response, userId } = await updateSession(request);

  const { pathname } = request.nextUrl;
  if (!userId && PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

// Only session-aware routes run the proxy. Public pages stay static (ISR).
export const config = {
  matcher: ["/dashboard/:path*", "/me/:path*", "/auth/:path*", "/api/:path*", "/login"],
};
