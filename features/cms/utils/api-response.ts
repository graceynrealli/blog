import "server-only";

import { NextResponse } from "next/server";

import { NO_STORE_HEADERS } from "@/features/auth/constants";

import { CMS_ERROR_MESSAGES, HTTP_STATUS } from "../constants";

export function jsonNoStore<T>(body: T) {
  return NextResponse.json(body, { headers: NO_STORE_HEADERS });
}

export function forbidden() {
  return NextResponse.json({ error: CMS_ERROR_MESSAGES.forbidden }, { status: HTTP_STATUS.forbidden, headers: NO_STORE_HEADERS });
}

export function notFound() {
  return NextResponse.json({ error: CMS_ERROR_MESSAGES.notFound }, { status: HTTP_STATUS.notFound, headers: NO_STORE_HEADERS });
}

export function badRequest() {
  return NextResponse.json({ error: CMS_ERROR_MESSAGES.invalid }, { status: HTTP_STATUS.badRequest, headers: NO_STORE_HEADERS });
}
