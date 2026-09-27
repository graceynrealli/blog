import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/config/routes";
import { SEE_OTHER } from "@/features/auth/constants";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL(ROUTES.home, request.nextUrl.origin), { status: SEE_OTHER });
}
