"use server";

import { authorize } from "@/features/auth/guards";
import { renderMarkdown } from "@/lib/markdown/render";

import { CMS_ERROR_MESSAGES, CMS_LIMITS } from "../constants";
import type { ActionResult } from "../types";
import { fail, ok } from "../utils/action-error";

/** Same renderer as the public page, so the preview matches what readers see. */
export async function previewMarkdown(markdown: string): Promise<ActionResult<string>> {
  const user = await authorize("author");
  if (!user) return fail(CMS_ERROR_MESSAGES.forbidden);
  if (markdown.length > CMS_LIMITS.contentMax) return fail(CMS_ERROR_MESSAGES.invalid);
  const { html } = await renderMarkdown(markdown);
  return ok(html);
}
