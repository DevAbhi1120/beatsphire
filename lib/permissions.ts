export type AdminRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "MODERATOR"
  | "VIEWER";

export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  SUPER_ADMIN: [
    "dashboard",
    "users",
    "analytics",
    "reports",
    "config",
    "logs",
  ],
  ADMIN: [
    "dashboard",
    "users",
    "analytics",
    "reports",
  ],
  MODERATOR: [
    "dashboard",
    "users",
    "reports",
  ],
  VIEWER: [
    "dashboard",
    "analytics",
  ],
};
