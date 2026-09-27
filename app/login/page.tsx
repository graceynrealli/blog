import type { Metadata } from "next";

import { safeNextPath } from "@/lib/auth/redirect";

import { signInWithEmail, signInWithGitHub } from "./actions";

export const metadata: Metadata = { title: "Đăng nhập", robots: { index: false } };

const ERRORS: Record<string, string> = {
  oauth: "Không kết nối được với GitHub. Thử lại nhé.",
  email: "Email chưa đúng định dạng.",
  send: "Chưa gửi được email đăng nhập. Thử lại sau ít phút.",
  callback: "Liên kết đăng nhập đã hết hạn hoặc không hợp lệ.",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const next = safeNextPath(params.next);
  const error = typeof params.error === "string" ? ERRORS[params.error] : undefined;
  const sent = params.sent === "1";

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="rounded-xl border border-border bg-surface p-8 shadow-popover">
        <h1 className="font-display text-2xl font-extrabold">Đăng nhập Codelog</h1>
        <p className="mt-2 text-sm text-muted">Để bình luận, thả reaction và theo dõi chủ đề bạn quan tâm.</p>

        {error && (
          <p role="alert" className="mt-6 rounded-md border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </p>
        )}
        {sent && (
          <p role="status" className="mt-6 rounded-md border border-emerald/40 bg-emerald/10 px-4 py-3 text-sm text-emerald">
            Đã gửi liên kết đăng nhập. Kiểm tra hộp thư của bạn nhé.
          </p>
        )}

        <form action={signInWithGitHub} className="mt-8">
          <input type="hidden" name="next" value={next} />
          <button
            type="submit"
            className="w-full rounded-md bg-text px-4 py-3 font-semibold text-canvas transition hover:bg-white"
          >
            Tiếp tục với GitHub
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 font-mono text-xs text-faint">
          <span className="h-px flex-1 bg-border" />
          hoặc
          <span className="h-px flex-1 bg-border" />
        </div>

        <form action={signInWithEmail} className="space-y-3">
          <input type="hidden" name="next" value={next} />
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ban@example.com"
            className="w-full rounded-md border border-border bg-surface-sunken px-4 py-3 text-sm placeholder:text-faint focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-accent px-4 py-3 font-semibold text-canvas transition hover:bg-accent-hover"
          >
            Gửi liên kết đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
