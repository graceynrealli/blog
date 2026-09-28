import type { Tables } from "@/types/database";

import type { SessionUser } from "./types";

type ProfileRow = Pick<Tables<"profiles">, "username" | "display_name" | "avatar_url" | "role">;

export function toSessionUser(row: ProfileRow): SessionUser {
  return {
    username: row.username,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
    role: row.role,
  };
}
