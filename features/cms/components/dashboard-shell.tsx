import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { PublicSessionUser } from "@/features/auth/types";

import { DashboardNav } from "./dashboard-nav";

export function DashboardShell({ user, children }: { user: PublicSessionUser; children: ReactNode }) {
  return (
    <Container className="grid gap-8 py-10 lg:grid-cols-[200px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <div>
          <Eyebrow>Quản trị</Eyebrow>
          <p className="mt-1 text-sm text-muted">{user.displayName}</p>
        </div>
        <DashboardNav role={user.role} />
      </aside>
      <div className="min-w-0">{children}</div>
    </Container>
  );
}
