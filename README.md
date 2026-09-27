# Codelog

Blog kỹ thuật nhiều tác giả, lấy cảm hứng giao diện từ Laracasts. Next.js 16 (App Router) + Supabase, deploy trên Vercel.

## Kiến trúc ngắn gọn

- **BFF**: trình duyệt không gọi Supabase. Mọi truy vấn chạy trên server (Server Components, Server Actions, Route Handlers) và chỉ trả DTO.
- **Trang công khai tĩnh (ISR)**: dùng client ẩn danh không cookie (`lib/supabase/public.ts`) + `unstable_cache` gắn tag, revalidate 1 giờ hoặc khi CMS gọi `updateTag`.
- **Phiên đăng nhập**: cookie httpOnly, làm mới trong `proxy.ts` (chỉ chạy trên `/dashboard`, `/me`, `/auth`, `/api`, `/login`).
- **RLS** là lớp phân quyền cuối cùng. Hàm SECURITY DEFINER nằm trong schema `private`, không lộ qua `/rest/v1/rpc`.
- **Markdown** render ở server: GFM, sanitize, slug heading, highlight bằng Shiki, sinh mục lục và thời gian đọc.

## Chạy local

```bash
cp .env.example .env.local   # điền SUPABASE_URL và SUPABASE_PUBLISHABLE_KEY
npm install
npm run dev
```

Supabase local (cần Docker):

```bash
npx supabase start     # áp migrations + seed dữ liệu mẫu
npx supabase test db   # test RLS bằng pgTAP
```

## Lệnh

| Lệnh | Việc |
| --- | --- |
| `npm run lint` | ESLint |
| `npm run typecheck` | Sinh route types + `tsc` |
| `npm test` | Unit test (Vitest) |
| `npm run build` | Build production |

## Biến môi trường trên Vercel

`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SITE_URL`. Không dùng tiền tố `NEXT_PUBLIC_`.
