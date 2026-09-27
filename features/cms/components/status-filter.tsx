"use client";

import { Tabs } from "@/components/ui/tabs";

import { POST_STATUS_META, POST_STATUSES } from "../constants";
import type { PostStatus } from "../types";

const ALL = "all";
type FilterValue = PostStatus | typeof ALL;

const FILTER_TABS = [
  { id: ALL, label: "Tất cả" },
  ...POST_STATUSES.map((status) => ({ id: status, label: POST_STATUS_META[status].label })),
] as { id: FilterValue; label: string }[];

type StatusFilterProps = { value: PostStatus | null; onChange: (value: PostStatus | null) => void };

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <Tabs
      label="Lọc theo trạng thái"
      tabs={FILTER_TABS}
      value={value ?? ALL}
      onChange={(next) => onChange(next === ALL ? null : next)}
    />
  );
}
