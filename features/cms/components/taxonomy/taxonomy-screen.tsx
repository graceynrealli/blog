"use client";

import { useState } from "react";

import { Tabs } from "@/components/ui/tabs";

import { TAXONOMY_TABS, type TaxonomyTab } from "../../constants";
import { useCmsTaxonomy } from "../../hooks/use-cms-queries";
import { PageHeader } from "../page-header";
import { QueryState } from "../query-state";
import { CategoryManager } from "./category-manager";
import { SeriesManager } from "./series-manager";
import { TagManager } from "./tag-manager";

export function TaxonomyScreen() {
  const [tab, setTab] = useState<TaxonomyTab>(TAXONOMY_TABS[0].id);
  const { data, isLoading, error } = useCmsTaxonomy();

  return (
    <>
      <PageHeader title="Phân loại" description="Danh mục 2 cấp, tag và series dùng cho bài viết." />
      <Tabs label="Loại phân loại" tabs={TAXONOMY_TABS} value={tab} onChange={setTab} />
      <div className="mt-6">
        <QueryState isLoading={isLoading} error={error} />
        {data && tab === "categories" && <CategoryManager categories={data.categories} />}
        {data && tab === "tags" && <TagManager tags={data.tags} />}
        {data && tab === "series" && <SeriesManager series={data.series} />}
      </div>
    </>
  );
}
