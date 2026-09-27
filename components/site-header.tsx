import Link from "next/link";

import { Logo } from "./logo";
import { UserNav } from "./user-nav";

const NAV = [
  { href: "/posts", label: "Bài viết" },
  { href: "/#chu-de", label: "Chủ đề" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Chính" className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-muted transition hover:text-text">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
