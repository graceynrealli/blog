"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { MeResponse } from "@/app/api/me/route";

import { Avatar } from "./avatar";

/**
 * Pages are static, so the signed-in state is fetched from our own API after
 * load. The browser never talks to Supabase.
 */
export function UserNav() {
  const [me, setMe] = useState<MeResponse["user"] | undefined>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/me", { signal: controller.signal, credentials: "same-origin" })
      .then((res) => (res.ok ? (res.json() as Promise<MeResponse>) : { user: null }))
      .then((body) => setMe(body.user))
      .catch(() => {
        if (!controller.signal.aborted) setMe(null);
      });
    return () => controller.abort();
  }, []);

  if (me === undefined) return <span className="h-9 w-24" aria-hidden />;

  if (!me) {
    return (
      <Link
        href="/login"
        className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-canvas transition hover:bg-accent-hover"
      >
        Đăng nhập
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-muted sm:inline">{me.displayName}</span>
      <Avatar name={me.displayName} src={me.avatarUrl} size={32} />
      <form action="/auth/signout" method="post">
        <button type="submit" className="text-sm text-muted transition hover:text-text">
          Đăng xuất
        </button>
      </form>
    </div>
  );
}
