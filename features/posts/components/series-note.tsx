import { Card } from "@/components/ui/card";

import type { PostDetail } from "../types";

export function SeriesNote({ series }: { series: NonNullable<PostDetail["series"]> }) {
  return (
    <Card className="mt-6 rounded-md px-4 py-3 text-sm">
      <span className="font-mono text-xs uppercase tracking-wider text-faint">Series</span>{" "}
      <span className="font-semibold">{series.title}</span>
      {series.position && <span className="text-muted"> · Phần {series.position}</span>}
    </Card>
  );
}
