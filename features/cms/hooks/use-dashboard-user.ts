"use client";

import { useContext } from "react";

import { DashboardUserContext } from "../components/dashboard-user-provider";

/** The signed-in user inside /dashboard (the layout guarantees one). */
export function useDashboardUser() {
  const user = useContext(DashboardUserContext);
  if (!user) throw new Error("useDashboardUser must be used inside DashboardUserProvider");
  return user;
}
