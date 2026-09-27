import { ROUTES } from "./routes";

export type NavItem = { href: string; label: string };

export const MAIN_NAV: NavItem[] = [
  { href: ROUTES.posts, label: "Bài viết" },
  { href: ROUTES.topics, label: "Chủ đề" },
];

export const FOOTER_NAV: { title: string; items: NavItem[] }[] = [
  {
    title: "Khám phá",
    items: [
      { href: ROUTES.posts, label: "Bài viết mới" },
      { href: ROUTES.topics, label: "Chủ đề" },
    ],
  },
  {
    title: "Tài khoản",
    items: [{ href: ROUTES.login, label: "Đăng nhập" }],
  },
];
