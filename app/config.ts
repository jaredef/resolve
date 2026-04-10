import path from "node:path";

export interface DogfoodAppConfig {
  templatesDir: string;
  publicDir: string;
  databasePath: string;
  secretKey: string;
  adminUsername: string;
  adminPassword: string;
  adminSessionSecret: string;
  adminSessionCookieName: string;
  adminSessionTtlSeconds: number;
}

export function createDogfoodAppConfig(
  overrides: Partial<DogfoodAppConfig> = {},
): DogfoodAppConfig {
  return {
    templatesDir: path.resolve(import.meta.dir, "templates"),
    publicDir: path.resolve(import.meta.dir, "public"),
    databasePath: path.resolve(import.meta.dir, "data", "database.sqlite"),
    secretKey: "htx-dogfood-secret-key-change-in-production!",
    adminUsername: process.env.HTX_ADMIN_USERNAME ?? "admin",
    adminPassword: process.env.HTX_ADMIN_PASSWORD ?? "admin",
    adminSessionSecret:
      process.env.HTX_ADMIN_SESSION_SECRET ??
      "htx-dogfood-admin-session-secret-change-in-production!",
    adminSessionCookieName: "htx_admin_session",
    adminSessionTtlSeconds: 60 * 60 * 12,
    ...overrides,
  };
}
