import { QUERY_PARAMS } from "@/config/routes";

import { LOGIN_ERROR_MESSAGES, MAGIC_LINK_SENT_FLAG, type LoginErrorCode } from "../constants";

type SearchParams = Record<string, string | string[] | undefined>;

function isLoginErrorCode(value: unknown): value is LoginErrorCode {
  return typeof value === "string" && value in LOGIN_ERROR_MESSAGES;
}

/** What the login page should show, read from its query string. */
export function readLoginStatus(params: SearchParams) {
  const error = params[QUERY_PARAMS.error];
  return {
    errorMessage: isLoginErrorCode(error) ? LOGIN_ERROR_MESSAGES[error] : undefined,
    sent: params[QUERY_PARAMS.sent] === MAGIC_LINK_SENT_FLAG,
  };
}
