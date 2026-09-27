import type { Enums } from "@/types/database";

export type Role = Enums<"user_role">;

/** The signed-in user as the browser may see it. */
export type SessionUser = {
  username: string;
  displayName: string;
  avatarUrl: string | null;
  role: Role;
};

export type MeResponse = { user: SessionUser | null };
