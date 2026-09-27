import { ROLE_RANK } from "../constants";
import type { Role } from "../types";

export function hasRole(role: Role | null | undefined, min: Role): boolean {
  return role != null && ROLE_RANK[role] >= ROLE_RANK[min];
}
