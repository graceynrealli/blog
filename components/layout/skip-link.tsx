export const MAIN_CONTENT_ID = "main";

export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-canvas"
    >
      Bỏ qua tới nội dung
    </a>
  );
}
