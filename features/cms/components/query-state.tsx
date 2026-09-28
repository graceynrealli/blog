import { Alert } from "@/components/ui/alert";

/** Loading / error placeholder for TanStack Query results. */
export function QueryState({ isLoading, error }: { isLoading: boolean; error: Error | null }) {
  if (error) return <Alert tone="error">{error.message}</Alert>;
  if (isLoading) return <p className="py-10 text-center text-sm text-muted">Đang tải…</p>;
  return null;
}
