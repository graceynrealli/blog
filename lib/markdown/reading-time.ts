import { MIN_READING_MINUTES, WORDS_PER_MINUTE } from "./constants";

export function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(MIN_READING_MINUTES, Math.round(words / WORDS_PER_MINUTE));
}
