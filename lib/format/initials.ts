/** Vietnamese names are read by their last words: "Nguyễn Hải Nam" -> "HN". */
const INITIALS_WORD_COUNT = 2;

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(-INITIALS_WORD_COUNT)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
