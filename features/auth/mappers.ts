import type { Tables } from "@/types/database";

import type { PublicSessionUser, SessionUser } from "./types";

type ProfileRow = Pick<Tables<"profiles">, "id" | "username" | "display_name" | "avatar_url" | "role">;

export function toSessionUser(row: ProfileRow): SessionUser {
  return {
    id: row.id,
    username: row.username,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
    role: row.role,
  };
}

export function toPublicSessionUser(user: SessionUser): PublicSessionUser {
  return {
    username: user.username,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    role: user.role,
  };
}
