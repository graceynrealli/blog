import { CMS_ERROR_MESSAGES, PG_ERROR_CODES } from "../constants";
import type { ActionResult } from "../types";

type DbError = { code?: string; message: string } | null | undefined;

/** Turn a Postgres/PostgREST error into a message people can act on. */
export function describeDbError(error: DbError): string {
  switch (error?.code) {
    case PG_ERROR_CODES.uniqueViolation:
      return CMS_ERROR_MESSAGES.duplicateSlug;
    case PG_ERROR_CODES.foreignKeyViolation:
      return CMS_ERROR_MESSAGES.inUse;
    case PG_ERROR_CODES.insufficientPrivilege:
      return CMS_ERROR_MESSAGES.forbidden;
    case PG_ERROR_CODES.checkViolation:
      return CMS_ERROR_MESSAGES.invalid;
    default:
      return CMS_ERROR_MESSAGES.unknown;
  }
}

export function ok<T>(data: T): ActionResult<T> {
  return { ok: true, data };
}

export function fail<T = never>(error: string): ActionResult<T> {
  return { ok: false, error };
}

/** First zod issue message, or the generic one. */
export function firstIssue(issues: { message: string }[]): string {
  return issues[0]?.message ?? CMS_ERROR_MESSAGES.invalid;
}
