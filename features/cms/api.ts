import { CMS_API_ROUTES, QUERY_PARAMS } from "@/config/routes";

import { CMS_ERROR_MESSAGES } from "./constants";
import type { CmsPost, CmsPostListItem, CmsTaxonomy, PostStatus } from "./types";

/** Browser-side reads from our own API (BFF). */
async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: "same-origin", cache: "no-store" });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? CMS_ERROR_MESSAGES.unknown);
  }
  return res.json() as Promise<T>;
}

export const cmsApi = {
  posts(status: PostStatus | null) {
    const url = status ? `${CMS_API_ROUTES.posts}?${QUERY_PARAMS.status}=${status}` : CMS_API_ROUTES.posts;
    return getJson<CmsPostListItem[]>(url);
  },
  post: (id: string) => getJson<CmsPost>(CMS_API_ROUTES.post(id)),
  review: () => getJson<CmsPostListItem[]>(CMS_API_ROUTES.review),
  taxonomy: () => getJson<CmsTaxonomy>(CMS_API_ROUTES.taxonomy),
};
