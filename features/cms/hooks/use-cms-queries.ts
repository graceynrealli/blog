"use client";

import { useQuery } from "@tanstack/react-query";

import { cmsApi } from "../api";
import { CMS_QUERY_KEYS } from "../constants";
import type { PostStatus } from "../types";

export function useCmsPosts(status: PostStatus | null) {
  return useQuery({ queryKey: CMS_QUERY_KEYS.posts(status), queryFn: () => cmsApi.posts(status) });
}

export function useCmsPost(id: string) {
  return useQuery({ queryKey: CMS_QUERY_KEYS.post(id), queryFn: () => cmsApi.post(id) });
}

export function useReviewPosts() {
  return useQuery({ queryKey: CMS_QUERY_KEYS.review, queryFn: cmsApi.review });
}

export function useCmsTaxonomy() {
  return useQuery({ queryKey: CMS_QUERY_KEYS.taxonomy, queryFn: cmsApi.taxonomy });
}
