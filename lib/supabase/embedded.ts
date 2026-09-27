/** PostgREST returns an object or an array for embeds depending on the relation. */
export type Embedded<T> = T | T[] | null;

export function unwrapEmbedded<T>(value: Embedded<T>): T | null {
  return Array.isArray(value) ? (value[0] ?? null) : value;
}
