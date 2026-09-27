"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { safeNextPath } from "@/lib/auth/redirect";
import { siteUrl } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

function callbackUrl(next: string) {
  const url = new URL("/auth/callback", siteUrl);
  url.searchParams.set("next", next);
  return url.toString();
}

export async function signInWithGitHub(formData: FormData) {
  const next = safeNextPath(formData.get("next"));
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: callbackUrl(next) },
  });
  if (error || !data.url) redirect(`/login?error=oauth&next=${encodeURIComponent(next)}`);
  redirect(data.url);
}

const emailSchema = z.email();

export async function signInWithEmail(formData: FormData) {
  const next = safeNextPath(formData.get("next"));
  const email = emailSchema.safeParse(formData.get("email"));
  if (!email.success) redirect(`/login?error=email&next=${encodeURIComponent(next)}`);

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: email.data,
    options: { emailRedirectTo: callbackUrl(next) },
  });
  if (error) redirect(`/login?error=send&next=${encodeURIComponent(next)}`);
  redirect(`/login?sent=1&next=${encodeURIComponent(next)}`);
}
