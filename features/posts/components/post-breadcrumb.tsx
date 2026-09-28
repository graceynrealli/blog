import { Fragment } from "react";

import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/config/routes";

import type { CategoryRef } from "../types";

const SEPARATOR = "/";

export function PostBreadcrumb({ category }: { category: CategoryRef | null }) {
  const trail = [category?.parent?.name, category?.name].filter((name): name is string => Boolean(name));
  return (
    <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-faint">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <TextLink href={ROUTES.home} className="text-faint">
            Trang chủ
          </TextLink>
        </li>
        {trail.map((name) => (
          <Fragment key={name}>
            <li aria-hidden>{SEPARATOR}</li>
            <li>{name}</li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
