"use client";

import { useState } from "react";

import { Alert } from "@/components/ui/alert";
import { Tabs } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { useMarkdownPreview } from "../../hooks/use-markdown-preview";

const PANE_TABS = [
  { id: "write", label: "Viết" },
  { id: "preview", label: "Xem trước" },
] as const;
type Pane = (typeof PANE_TABS)[number]["id"];

const EDITOR_ROWS = 24;

type MarkdownPanesProps = { value: string; onChange: (value: string) => void; readOnly?: boolean };

/** Markdown on the left, server-rendered preview on the right (tabs on small screens). */
export function MarkdownPanes({ value, onChange, readOnly }: MarkdownPanesProps) {
  const [pane, setPane] = useState<Pane>("write");
  const { html, error } = useMarkdownPreview(value, true);

  return (
    <div>
      <div className="lg:hidden">
        <Tabs label="Chế độ soạn" tabs={PANE_TABS} value={pane} onChange={setPane} />
      </div>
      <div className="mt-3 grid gap-4 lg:mt-0 lg:grid-cols-2">
        <div className={pane === "write" ? "" : "hidden lg:block"}>
          <Textarea
            aria-label="Nội dung Markdown"
            value={value}
            readOnly={readOnly}
            onChange={(e) => onChange(e.target.value)}
            rows={EDITOR_ROWS}
            spellCheck={false}
            placeholder="## Bắt đầu viết bằng Markdown…"
            className="h-full min-h-[32rem] font-mono leading-relaxed"
          />
        </div>
        <div className={pane === "preview" ? "" : "hidden lg:block"}>
          <div className="h-full min-h-[32rem] overflow-y-auto rounded-md border border-border bg-canvas p-5">
            {error && <Alert tone="error">{error}</Alert>}
            {/* Rendered and sanitized on the server by the same pipeline as the public page. */}
            <div className="article-prose prose-base" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </div>
    </div>
  );
}
