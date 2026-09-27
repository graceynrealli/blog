"use client";

import { useEffect, useState } from "react";

import { ROUTES } from "@/config/routes";

import type { MeResponse, SessionUser } from "../types";

/** `undefined` while loading, `null` when signed out. */
export type SessionUserState = SessionUser | null | undefined;

/**
 * Pages are static, so the signed-in user is fetched from our own API after
 * load. The browser never talks to Supabase.
 */
export function useSessionUser(): SessionUserState {
  const [user, setUser] = useState<SessionUserState>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    fetch(ROUTES.apiMe, { signal: controller.signal, credentials: "same-origin" })
      .then((res) => (res.ok ? (res.json() as Promise<MeResponse>) : { user: null }))
      .then((body) => setUser(body.user))
      .catch(() => {
        if (!controller.signal.aborted) setUser(null);
      });
    return () => controller.abort();
  }, []);

  return user;
}
