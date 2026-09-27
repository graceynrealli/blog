import Link from "next/link";

import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface-sunken">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Nơi các developer ghi lại và chia sẻ những gì mình học được, mỗi ngày một chút.
          </p>
        </div>
        <div>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-faint">Khám phá</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/posts" className="text-muted hover:text-text">
                Bài viết mới
              </Link>
            </li>
            <li>
              <Link href="/#chu-de" className="text-muted hover:text-text">
                Chủ đề
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-faint">Tài khoản</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/login" className="text-muted hover:text-text">
                Đăng nhập
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center font-mono text-xs text-faint">
        © {new Date().getFullYear()} Codelog
      </div>
    </footer>
  );
}
