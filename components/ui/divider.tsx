/** Horizontal rule with a word in the middle, e.g. "hoặc". */
export function Divider({ label }: { label: string }) {
  return (
    <div className="my-6 flex items-center gap-3 font-mono text-xs text-faint">
      <span className="h-px flex-1 bg-border" />
      {label}
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
