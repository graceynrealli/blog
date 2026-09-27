import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2 font-display text-lg font-extrabold tracking-tight">
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-md bg-accent/15 font-mono text-sm text-accent ring-1 ring-accent/30 transition group-hover:bg-accent/25"
      >
        {"</>"}
      </span>
      <span>
        code<span className="text-accent">log</span>
      </span>
    </Link>
  );
}
