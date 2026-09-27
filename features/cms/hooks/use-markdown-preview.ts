"use client";

import { useEffect, useState } from "react";

import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";

import { previewMarkdown } from "../actions/preview";
import { CMS_TIMINGS } from "../constants";

/** Server-rendered preview HTML for `markdown`, refreshed after typing pauses. */
export function useMarkdownPreview(markdown: string, enabled: boolean) {
  const debounced = useDebouncedValue(markdown, CMS_TIMINGS.previewDebounceMs);
  const [html, setHtml] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    previewMarkdown(debounced).then((result) => {
      if (cancelled) return;
      if (result.ok) {
        setHtml(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [debounced, enabled]);

  return { html, error };
}
