import { DATE_LOCALE, DATE_TIME_ZONE } from "./constants";

const dateFormatter = new Intl.DateTimeFormat(DATE_LOCALE, {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: DATE_TIME_ZONE,
});

export function formatDate(iso: string | null): string {
  return iso ? dateFormatter.format(new Date(iso)) : "";
}

const dateTimeFormatter = new Intl.DateTimeFormat(DATE_LOCALE, {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: DATE_TIME_ZONE,
});

export function formatDateTime(iso: string | null): string {
  return iso ? dateTimeFormatter.format(new Date(iso)) : "";
}
