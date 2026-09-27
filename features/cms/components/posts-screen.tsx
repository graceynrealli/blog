"use client";

import { useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { hasRole } from "@/features/auth/utils/roles";

import { useCmsPosts } from "../hooks/use-cms-queries";
import { useDashboardUser } from "../hooks/use-dashboard-user";
import type { PostStatus } from "../types";
import { PageHeader } from "./page-header";
import { PostsTable } from "./posts-table";
import { QueryState } from "./query-state";
import { StatusFilter } from "./status-filter";

export function PostsScreen() {
  const { role } = useDashboardUser();
  const [status, setStatus] = useState<PostStatus | null>(null);
  const { data, isLoading, error } = useCmsPosts(status);
  const isEditor = hasRole(role, "editor");

  return (
    <>
      <PageHeader
        title={isEditor ? "Tất cả bài viết" : "Bài của tôi"}
        actions={<ButtonLink href={ROUTES.dashboardNewPost}>Viết bài mới</ButtonLink>}
      />
      <StatusFilter value={status} onChange={setStatus} />
      <div className="mt-6">
        <QueryState isLoading={isLoading} error={error} />
        {data && <PostsTable posts={data} showAuthor={isEditor} />}
      </div>
    </>
  );
}
