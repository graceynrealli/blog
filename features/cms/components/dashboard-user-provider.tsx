"use client";

import { createContext, type ReactNode } from "react";

import type { PublicSessionUser } from "@/features/auth/types";

export const DashboardUserContext = createContext<PublicSessionUser | null>(null);

export function DashboardUserProvider({ user, children }: { user: PublicSessionUser; children: ReactNode }) {
  return <DashboardUserContext.Provider value={user}>{children}</DashboardUserContext.Provider>;
}
