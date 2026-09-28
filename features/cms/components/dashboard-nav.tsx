"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DASHBOARD_NAV } from "@/config/navigation";
import type { Role } from "@/features/auth/types";
import { hasRole } from "@/features/auth/utils/roles";
import { cn } from "@/lib/utils/cn";

export function DashboardNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = DASHBOARD_NAV.filter((item) => hasRole(role, item.minRole));

  return (
    <nav aria-label="Quản trị" className="flex gap-1 overflow-x-auto lg:flex-col">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition",
              active ? "bg-accent/15 text-accent" : "text-muted hover:bg-surface-hover hover:text-text",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
