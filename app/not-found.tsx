import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold">Không tìm thấy trang</h1>
      <p className="mt-4 text-muted">Trang bạn tìm có thể đã bị đổi tên hoặc chưa từng tồn tại.</p>
      <Link href="/" className="mt-8 rounded-md bg-accent px-5 py-2.5 font-semibold text-canvas hover:bg-accent-hover">
        Về trang chủ
      </Link>
    </div>
  );
}
