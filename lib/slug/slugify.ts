import { SLUG_MAX_LENGTH } from "./constants";

/** Vietnamese-aware slug: "Học Next.js 16" -> "hoc-next-js-16". */
export function slugify(input: string, maxLength: number = SLUG_MAX_LENGTH): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLength)
    .replace(/-+$/g, "");
}
