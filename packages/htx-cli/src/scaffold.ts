import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { defaultConfig } from "./project-config";

export const scaffoldPackageNames = {
  engine: "@htx/engine",
  markdown: "@htx/adapter-markdown",
  sqlite: "@htx/adapter-sqlite",
  cli: "@htx/cli",
} as const;

export type DependencyMode = "published" | "local";
export type ScaffoldVariant = "minimal" | "cms" | "blog" | "docs";

export interface ScaffoldProjectOptions {
  projectName: string;
  destinationRoot?: string;
  dependencyMode: DependencyMode;
  variant?: ScaffoldVariant;
  localPackageRoot?: string;
}

interface CliPackageManifest {
  version: string;
  dependencies?: Record<string, string>;
}

type ScaffoldFile = [string, string];

interface MarkdownSiteOptions {
  navLinks: Array<[string, string]>;
  extraFiles: ScaffoldFile[];
}

function writeFile(filePath: string, content: string): void {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);
  console.log(`  + ${path.relative(process.cwd(), filePath)}`);
}

function readCliManifest(): CliPackageManifest {
  return JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as CliPackageManifest;
}

function sanitizePackageName(projectName: string): string {
  return projectName.toLowerCase().replace(/[^a-z0-9-]/gi, "-");
}

function publishedDependencySpecs(): Record<string, string> {
  const manifest = readCliManifest();

  return {
    [scaffoldPackageNames.markdown]: manifest.dependencies?.[scaffoldPackageNames.markdown] ?? manifest.version,
    [scaffoldPackageNames.sqlite]: manifest.dependencies?.[scaffoldPackageNames.sqlite] ?? manifest.version,
    [scaffoldPackageNames.cli]: manifest.version,
    [scaffoldPackageNames.engine]: manifest.dependencies?.[scaffoldPackageNames.engine] ?? manifest.version,
  };
}

function resolveDefaultLocalPackageRoot(): string | null {
  const workspaceRoot = path.resolve(import.meta.dir, "../../..");
  const engineDir = path.join(workspaceRoot, "packages", "htx-engine");
  const markdownDir = path.join(workspaceRoot, "packages", "htx-adapter-markdown");
  const sqliteDir = path.join(workspaceRoot, "packages", "htx-adapter-sqlite");
  const cliDir = path.join(workspaceRoot, "packages", "htx-cli");

  if (
    existsSync(path.join(engineDir, "package.json")) &&
    existsSync(path.join(markdownDir, "package.json")) &&
    existsSync(path.join(sqliteDir, "package.json")) &&
    existsSync(path.join(cliDir, "package.json"))
  ) {
    return workspaceRoot;
  }

  return null;
}

function localDependencySpecs(projectDir: string, localPackageRoot?: string): Record<string, string> {
  const workspaceRoot = localPackageRoot ?? resolveDefaultLocalPackageRoot();
  if (!workspaceRoot) {
    throw new Error("Local scaffold mode requires a workspace checkout with packages/htx-* available.");
  }

  const packageDirs = {
    [scaffoldPackageNames.markdown]: path.join(workspaceRoot, "packages", "htx-adapter-markdown"),
    [scaffoldPackageNames.sqlite]: path.join(workspaceRoot, "packages", "htx-adapter-sqlite"),
    [scaffoldPackageNames.cli]: path.join(workspaceRoot, "packages", "htx-cli"),
    [scaffoldPackageNames.engine]: path.join(workspaceRoot, "packages", "htx-engine"),
  };

  for (const packageDir of Object.values(packageDirs)) {
    if (!existsSync(path.join(packageDir, "package.json"))) {
      throw new Error(`Missing local package directory: ${packageDir}`);
    }
  }

  return Object.fromEntries(
    Object.entries(packageDirs).map(([packageName, packageDir]) => [
      packageName,
      `file:${path.relative(projectDir, packageDir)}`,
    ]),
  );
}

function dependencySpecsFor(options: ScaffoldProjectOptions, projectDir: string): Record<string, string> {
  if (options.dependencyMode === "published") {
    return publishedDependencySpecs();
  }

  return localDependencySpecs(projectDir, options.localPackageRoot);
}

function renderPackageJson(
  packageName: string,
  dependencySpecs: Record<string, string>,
  variant: ScaffoldVariant,
  overrides?: Record<string, string>,
): string {
  return (
    JSON.stringify(
      {
        name: packageName,
        private: true,
        type: "module",
        scripts: {
          dev: "htx dev",
          "dev:prod-errors": "htx dev --prod-errors",
          serve: "htx serve",
          "serve:prod-errors": "htx serve --prod-errors",
          ...(variant === "cms" ? { seed: "bun app/seed.ts" } : {}),
        },
        dependencies: dependencySpecs,
        ...(overrides ? { overrides } : {}),
      },
      null,
      2,
    ) + "\n"
  );
}

function renderHtxConfig(projectName: string, variant: ScaffoldVariant): string {
  const config = {
    ...defaultConfig(),
    appName: projectName,
    adapters:
      variant === "blog" || variant === "docs"
        ? {
            default: {
              driver: "markdown",
              contentRoot: "content",
            },
          }
        : defaultConfig().adapters,
  };

  return (
    JSON.stringify(
      config,
      null,
      2,
    ) + "\n"
  );
}

function renderAppConfig(): string {
  return `import path from "node:path";

export interface CmsAppConfig {
  appName: string;
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

export function createCmsAppConfig(
  overrides: Partial<CmsAppConfig> = {},
): CmsAppConfig {
  return {
    appName: "HTX CMS",
    templatesDir: path.resolve(import.meta.dir, "templates"),
    publicDir: path.resolve(import.meta.dir, "public"),
    databasePath: path.resolve(import.meta.dir, "data", "content.sqlite"),
    secretKey: "replace-this-secret-before-production-use!",
    adminUsername: process.env.HTX_ADMIN_USERNAME ?? "admin",
    adminPassword: process.env.HTX_ADMIN_PASSWORD ?? "admin",
    adminSessionSecret:
      process.env.HTX_ADMIN_SESSION_SECRET ??
      "replace-this-admin-session-secret-before-production-use!",
    adminSessionCookieName: "htx_admin_session",
    adminSessionTtlSeconds: 60 * 60 * 12,
    ...overrides,
  };
}
`;
}

function renderAppRuntime(): string {
  return `import { mkdirSync } from "node:fs";
import path from "node:path";

import {
  AdapterRegistry,
  ActionTokenService,
  ComponentResolver,
  DeleteContentExecutor,
  DSLParser,
  ExpressionEngine,
  GetContentExecutor,
  HttpHost,
  Hydrator,
  IncludeResolver,
  InMemoryReplayGuard,
  LayoutResolver,
  LetResolver,
  RequestHandler,
  Router,
  SetContentExecutor,
} from "@htx/engine";
import { SQLiteAdapter } from "@htx/adapter-sqlite";

import { createConfigBackedAdminAuth } from "../admin-auth";
import { CmsAppHost } from "../admin-host";
import { createCmsAppConfig, type CmsAppConfig } from "../config";

export interface CmsAppRuntime {
  config: CmsAppConfig;
  adapter: SQLiteAdapter;
  handler: RequestHandler;
  host: CmsAppHost;
}

export function createCmsAppRuntime(
  overrides: Partial<CmsAppConfig> = {},
): CmsAppRuntime {
  const config = createCmsAppConfig(overrides);
  mkdirSync(path.dirname(config.databasePath), { recursive: true });

  const adapter = new SQLiteAdapter(config.databasePath);
  const expressionEngine = new ExpressionEngine();
  const hydrator = new Hydrator();
  const parser = new DSLParser();
  const router = new Router();
  const layoutResolver = new LayoutResolver();
  const includeResolver = new IncludeResolver();
  const letResolver = new LetResolver(expressionEngine);
  const componentResolver = new ComponentResolver(config.templatesDir, expressionEngine, includeResolver);
  const tokenService = new ActionTokenService(config.secretKey);
  const replayGuard = new InMemoryReplayGuard();
  const registry = new AdapterRegistry({ default: adapter });
  const auth = createConfigBackedAdminAuth({
    username: config.adminUsername,
    password: config.adminPassword,
    sessionSecret: config.adminSessionSecret,
    sessionTtlSeconds: config.adminSessionTtlSeconds,
    cookieName: config.adminSessionCookieName,
    secureCookies: false,
  });

  const getExecutor = new GetContentExecutor(parser, registry, hydrator, expressionEngine, { dev: true });
  const setExecutor = new SetContentExecutor(
    parser,
    registry,
    hydrator,
    expressionEngine,
    tokenService,
    replayGuard,
  );
  const deleteExecutor = new DeleteContentExecutor(
    parser,
    registry,
    hydrator,
    tokenService,
    replayGuard,
  );

  const handler = new RequestHandler(
    router,
    parser,
    expressionEngine,
    hydrator,
    registry,
    layoutResolver,
    includeResolver,
    letResolver,
    componentResolver,
    getExecutor,
    config.templatesDir,
    setExecutor,
    deleteExecutor,
    { dev: true },
  );

  return {
    config,
    adapter,
    handler,
    host: new CmsAppHost(new HttpHost(handler, config.publicDir), auth),
  };
}

export async function handleCmsRequest(
  request: Request,
  overrides: Partial<CmsAppConfig> = {},
): Promise<Response> {
  const runtime = createCmsAppRuntime(overrides);
  return runtime.host.handle(request);
}

if (import.meta.main) {
  const runtime = createCmsAppRuntime();
  const hostname = process.env.HTX_HOST ?? "127.0.0.1";
  const port = Number(process.env.HTX_PORT ?? "3000");

  console.log(\`CMS app listening on http://\${hostname}:\${port}\`);

  Bun.serve({
    hostname,
    port,
    fetch(request) {
      return runtime.host.handle(request);
    },
  });
}
`;
}

function renderSeedContent(): string {
  return `export interface CmsRecord extends Record<string, unknown> {
  slug: string;
}

export interface SeedEntry {
  type: "post" | "page";
  record: CmsRecord;
}

export const CMS_SEED_CONTENT: SeedEntry[] = [
  {
    type: "post",
    record: {
      title: "Why Hypermedia App Starts With HTX Files",
      slug: "why-hypermedia-app-starts-with-htx-files",
      summary: "See how routes, templates, and content queries stay in one readable file.",
      body: "This starter keeps routes, layout composition, and content reads close together so you can learn the system by opening the templates. The posts section demonstrates list and detail reads, the pages section shows content-managed marketing routes, and the admin area exercises token-backed mutations.",
      author: "HTX Team",
      status: "published",
      published_at: "2026-03-29 09:00:00",
    },
  },
  {
    type: "post",
    record: {
      title: "A CMS Starter Should Feel Like An App",
      slug: "a-cms-starter-should-feel-like-an-app",
      summary: "The generated project is meant to teach HTX by being usable on day one.",
      body: "Instead of a blank hello world, this scaffold gives you a homepage, content-managed pages, a post listing, and an authenticated admin surface. You can inspect the generated files, run the seed script, and immediately see how public and mutation routes work together.",
      author: "HTX Team",
      status: "published",
      published_at: "2026-03-30 10:15:00",
    },
  },
  {
    type: "post",
    record: {
      title: "Using The Admin To Manage Content",
      slug: "using-the-admin-to-manage-content",
      summary: "Create, edit, and delete records while the public site updates from the same database.",
      body: "The admin area is intentionally small, but it demonstrates the full prepare and execute lifecycle for create, update, and delete actions. Open the admin, create a post, and then confirm that it appears on the public posts pages.",
      author: "HTX Team",
      status: "published",
      published_at: "2026-03-31 14:30:00",
    },
  },
  {
    type: "post",
    record: {
      title: "Draft Content Stays Out Of Public Views",
      slug: "draft-content-stays-out-of-public-views",
      summary: "A draft post is seeded so you can verify filtering in the public templates.",
      body: "This draft record exists to show how public templates can query only published content while the admin still lists all content. Edit it in the admin and publish it when you want to see it appear publicly.",
      author: "HTX Team",
      status: "draft",
      published_at: "2026-04-01 08:00:00",
    },
  },
  {
    type: "page",
    record: {
      title: "About",
      slug: "about",
      summary: "A content-managed page that explains the generated CMS starter.",
      status: "published",
      body: "This CMS starter demonstrates HTX routing, reads, and secure mutations.",
      body_html: "<p>This scaffold is designed to feel like a small product instead of a blank shell. It gives you seeded content, reusable templates, public pages, and an authenticated admin so you can learn the platform by running a real app.</p><p>Open the public pages first, then inspect the generated files to see how HTX directives map directly to routes and content queries.</p>",
    },
  },
  {
    type: "page",
    record: {
      title: "Services",
      slug: "services",
      summary: "A second seeded page that proves pages can be managed outside the homepage.",
      status: "published",
      body: "Pages are ordinary content records that render through HTX routes.",
      body_html: "<p>Pages give the CMS starter a more general shape than a docs-specific demo. You can use them for marketing pages, pricing, onboarding, or any other content-managed route.</p><p>The admin updates the same records that public routes render, so edits show up without a separate API layer.</p>",
    },
  },
  {
    type: "page",
    record: {
      title: "Contact",
      slug: "contact",
      summary: "A third seeded page for common CMS navigation patterns.",
      status: "draft",
      body: "Draft pages stay visible in the admin while remaining hidden from public routes.",
      body_html: "<p>This draft page exists to prove that public templates can filter to published content while the admin still lists every record.</p>",
    },
  },
];
`;
}

function renderSeedScript(): string {
  return `import { mkdirSync } from "node:fs";
import path from "node:path";

import type { ContentAdapter } from "@htx/engine";
import { SQLiteAdapter } from "@htx/adapter-sqlite";

import { createCmsAppConfig } from "./config";
import { CMS_SEED_CONTENT } from "./seed-content";

export interface CmsSeedResult {
  created: number;
  updated: number;
  total: number;
}

export function seedCmsContent(adapter: ContentAdapter): CmsSeedResult {
  let created = 0;
  let updated = 0;

  for (const entry of CMS_SEED_CONTENT) {
    const existing = adapter.findBySlug(entry.type, entry.record.slug);

    if (existing) {
      adapter.update(entry.type, String(existing.id ?? ""), entry.record);
      updated += 1;
    } else {
      adapter.create(entry.type, entry.record);
      created += 1;
    }
  }

  return {
    created,
    updated,
    total: CMS_SEED_CONTENT.length,
  };
}

export function seedCmsDatabase(databasePath?: string): CmsSeedResult {
  const config = createCmsAppConfig(databasePath ? { databasePath } : {});
  mkdirSync(path.dirname(config.databasePath), { recursive: true });

  const adapter = new SQLiteAdapter(config.databasePath);

  try {
    return seedCmsContent(adapter);
  } finally {
    adapter.getDatabase().close(false);
  }
}

if (import.meta.main) {
  const result = seedCmsDatabase();
  console.log(
    \`CMS seed complete. Created: \${result.created}, Updated: \${result.updated}, Total: \${result.total}\`,
  );
}
`;
}

function renderAdminAuth(): string {
  return `import { createHmac, timingSafeEqual } from "node:crypto";

export interface AdminIdentity {
  username: string;
}

export interface AdminCredentialStore {
  validateCredentials(username: string, password: string): AdminIdentity | null;
}

export interface AdminSessionStrategy {
  issueSession(identity: AdminIdentity): string;
  validateSession(token: string): AdminIdentity | null;
}

export interface AdminAuthServiceOptions {
  cookieName: string;
  secureCookies?: boolean;
  sameSite?: "Lax" | "Strict";
}

export interface ConfigBackedAdminAuthOptions extends AdminAuthServiceOptions {
  username: string;
  password: string;
  sessionSecret: string;
  sessionTtlSeconds: number;
}

interface SessionClaims {
  sub: string;
  exp: number;
}

export class ConfigAdminCredentialStore implements AdminCredentialStore {
  private readonly username: string;
  private readonly password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  validateCredentials(username: string, password: string): AdminIdentity | null {
    if (!safeCompare(username, this.username) || !safeCompare(password, this.password)) {
      return null;
    }

    return { username };
  }
}

export class SignedAdminSessionStrategy implements AdminSessionStrategy {
  private readonly secret: string;
  private readonly ttlSeconds: number;

  constructor(secret: string, ttlSeconds: number) {
    this.secret = secret;
    this.ttlSeconds = ttlSeconds;
  }

  issueSession(identity: AdminIdentity): string {
    const claims: SessionClaims = {
      sub: identity.username,
      exp: Math.floor(Date.now() / 1000) + this.ttlSeconds,
    };
    const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
    const signature = this.sign(payload);
    return \`\${payload}.\${signature}\`;
  }

  validateSession(token: string): AdminIdentity | null {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) {
      return null;
    }

    const expected = this.sign(payload);
    if (!safeCompare(signature, expected)) {
      return null;
    }

    let claims: SessionClaims;
    try {
      claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SessionClaims;
    } catch {
      return null;
    }

    if (typeof claims.sub !== "string" || typeof claims.exp !== "number") {
      return null;
    }

    if (claims.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return { username: claims.sub };
  }

  private sign(payload: string): string {
    return createHmac("sha256", this.secret).update(payload).digest("base64url");
  }
}

export class AdminAuthService {
  private readonly credentialStore: AdminCredentialStore;
  private readonly sessionStrategy: AdminSessionStrategy;
  private readonly cookieName: string;
  private readonly secureCookies: boolean;
  private readonly sameSite: "Lax" | "Strict";

  constructor(
    credentialStore: AdminCredentialStore,
    sessionStrategy: AdminSessionStrategy,
    options: AdminAuthServiceOptions,
  ) {
    this.credentialStore = credentialStore;
    this.sessionStrategy = sessionStrategy;
    this.cookieName = options.cookieName;
    this.secureCookies = options.secureCookies ?? false;
    this.sameSite = options.sameSite ?? "Lax";
  }

  authenticate(username: string, password: string): AdminIdentity | null {
    return this.credentialStore.validateCredentials(username, password);
  }

  currentUser(cookieHeader?: string | null): AdminIdentity | null {
    const cookies = parseCookieHeader(cookieHeader);
    const token = cookies[this.cookieName];
    if (!token) {
      return null;
    }

    return this.sessionStrategy.validateSession(token);
  }

  createSessionCookie(identity: AdminIdentity): string {
    const token = this.sessionStrategy.issueSession(identity);
    return this.formatCookie(token, false);
  }

  clearSessionCookie(): string {
    return this.formatCookie("", true);
  }

  private formatCookie(value: string, expired: boolean): string {
    const parts = [
      \`\${this.cookieName}=\${value}\`,
      "Path=/",
      "HttpOnly",
      \`SameSite=\${this.sameSite}\`,
      expired ? "Max-Age=0" : "",
    ].filter(Boolean);

    if (this.secureCookies) {
      parts.push("Secure");
    }

    return parts.join("; ");
  }
}

export function createConfigBackedAdminAuth(
  options: ConfigBackedAdminAuthOptions,
): AdminAuthService {
  return new AdminAuthService(
    new ConfigAdminCredentialStore(options.username, options.password),
    new SignedAdminSessionStrategy(options.sessionSecret, options.sessionTtlSeconds),
    options,
  );
}

export function parseCookieHeader(cookieHeader?: string | null): Record<string, string> {
  if (!cookieHeader) {
    return {};
  }

  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separator = part.indexOf("=");
        if (separator === -1) {
          return [part, ""];
        }

        const name = part.slice(0, separator).trim();
        const value = part.slice(separator + 1).trim();
        return [name, decodeURIComponent(value)];
      }),
  );
}

export function normalizeAdminNextPath(candidate?: string | null): string {
  if (!candidate || typeof candidate !== "string") {
    return "/admin";
  }

  if (!candidate.startsWith("/") || candidate.startsWith("//")) {
    return "/admin";
  }

  if (!candidate.startsWith("/admin")) {
    return "/admin";
  }

  return candidate;
}

function safeCompare(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}
`;
}

function renderAdminHost(): string {
  return `import { HttpHost } from "@htx/engine";

import { AdminAuthService, normalizeAdminNextPath } from "./admin-auth";

export class CmsAppHost {
  private readonly baseHost: HttpHost;
  private readonly auth: AdminAuthService;

  constructor(baseHost: HttpHost, auth: AdminAuthService) {
    this.baseHost = baseHost;
    this.auth = auth;
  }

  async handle(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const pathname = decodeURIComponent(url.pathname);
    const currentUser = this.auth.currentUser(request.headers.get("cookie"));

    if (this.isLoginPath(pathname)) {
      return request.method.toUpperCase() === "POST"
        ? this.handleLoginPost(request)
        : currentUser
          ? this.redirect(normalizeAdminNextPath(url.searchParams.get("next")))
          : this.baseHost.handle(request);
    }

    if (this.isLogoutPath(pathname)) {
      return this.redirect("/admin/login", this.auth.clearSessionCookie());
    }

    if (this.isProtectedAdminPath(pathname) && !currentUser) {
      return this.redirect(this.buildLoginPath(pathname, url.search));
    }

    return this.baseHost.handle(request);
  }

  private async handleLoginPost(request: Request): Promise<Response> {
    const formData = await request.formData();
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");
    const next = normalizeAdminNextPath(String(formData.get("next") ?? "/admin"));
    const identity = this.auth.authenticate(username, password);

    if (!identity) {
      return this.redirect(\`/admin/login?error=invalid&next=\${encodeURIComponent(next)}\`);
    }

    return this.redirect(next, this.auth.createSessionCookie(identity));
  }

  private buildLoginPath(pathname: string, search: string): string {
    const next = normalizeAdminNextPath(\`\${pathname}\${search}\`);
    return \`/admin/login?next=\${encodeURIComponent(next)}\`;
  }

  private redirect(location: string, setCookie?: string): Response {
    const headers = new Headers({ Location: location });
    if (setCookie) {
      headers.set("Set-Cookie", setCookie);
    }

    return new Response(null, {
      status: 302,
      headers,
    });
  }

  private isLoginPath(pathname: string): boolean {
    return pathname === "/admin/login" || pathname === "/admin/login/";
  }

  private isLogoutPath(pathname: string): boolean {
    return pathname === "/admin/logout" || pathname === "/admin/logout/";
  }

  private isProtectedAdminPath(pathname: string): boolean {
    return pathname === "/admin" || pathname.startsWith("/admin/");
  }
}
`;
}

function renderRootLayout(projectName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <script>
    (function() {
      var t = localStorage.getItem('theme');
      if (t === 'light' || t === 'dark') {
        document.documentElement.setAttribute('data-theme', t);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>
  <script src="https://unpkg.com/htmx.org@2"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <style>
    /* -- Intercooler Theme CSS Variables -- */
    :root {
      color-scheme: dark;
      --bg-primary: #1f1f1f;
      --bg-secondary: #1a1d1e;
      --bg-code: #272822;
      --bg-hover-subtle: rgba(255,255,255,0.04);
      --text-primary: #c7c4c1;
      --text-heading: #e0ddd9;
      --text-body: #c7c4c1;
      --text-secondary: #b0ada9;
      --text-muted: #8a8785;
      --text-dim: #777;
      --text-subtle: #666;
      --text-placeholder: #444;
      --text-footer: #555;
      --border-primary: #41464b;
      --border-hover: #555;
      --border-subtle: rgba(255,255,255,0.08);
      --accent: #5b96d5;
      --accent-bg: rgba(91, 150, 213, 0.08);
      --color-success: #4ade80;
      --color-warning: #f59e0b;
      --success-bg: rgba(74, 222, 128, 0.08);
      --warning-bg: rgba(245, 158, 11, 0.08);
      --nav-link: rgba(199, 196, 193, 0.6);
      --nav-link-hover: rgba(199, 196, 193, 0.85);
      --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      --font-code: 'SF Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
      --blockquote-border: #41464b;
    }

    html[data-theme="light"] {
      color-scheme: light;
      --bg-primary: #ffffff;
      --bg-secondary: #f6f6f6;
      --bg-code: #f5f5f5;
      --bg-hover-subtle: rgba(0,0,0,0.03);
      --text-primary: #111;
      --text-heading: #111;
      --text-body: #333;
      --text-secondary: #444;
      --text-muted: #666;
      --text-dim: #777;
      --text-subtle: #888;
      --text-placeholder: #aaa;
      --text-footer: #888;
      --border-primary: #d0d0d0;
      --border-hover: #bbb;
      --border-subtle: rgba(0,0,0,0.08);
      --accent: #3366cc;
      --accent-bg: rgba(51, 102, 204, 0.06);
      --color-success: #16a34a;
      --color-warning: #d97706;
      --success-bg: rgba(22, 163, 74, 0.06);
      --warning-bg: rgba(217, 119, 6, 0.06);
      --nav-link: rgba(0,0,0,0.5);
      --nav-link-hover: rgba(0,0,0,0.7);
      --blockquote-border: #ddd;
    }

    /* -- Base -- */
    html { scroll-behavior: smooth; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: var(--font-body);
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      -webkit-text-size-adjust: 100%;
      -webkit-font-smoothing: antialiased;
    }

    /* -- Navigation -- */
    nav.site-nav {
      background: linear-gradient(var(--bg-primary), var(--bg-secondary));
      color: var(--text-heading);
      padding: 0 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid var(--border-primary);
      height: 3.25rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    nav.site-nav .brand {
      font-weight: 700;
      font-size: 1.05rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      text-decoration: none;
      color: var(--text-heading);
      letter-spacing: -0.02em;
    }
    nav.site-nav .brand .brand-accent { color: var(--accent); }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.15rem;
      margin-left: auto;
    }
    .nav-link {
      color: var(--nav-link);
      text-decoration: none;
      font-size: 0.85rem;
      transition: opacity 0.15s;
      padding: 0.4rem 0.6rem;
      display: flex;
      align-items: center;
    }
    .nav-link:hover { opacity: 0.6; text-decoration: none; }

    /* -- Theme toggle -- */
    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      background: transparent;
      border: none;
      color: var(--nav-link);
      cursor: pointer;
      border-radius: 4px;
      transition: opacity 0.15s;
      padding: 0;
    }
    .theme-toggle:hover { opacity: 0.6; }
    .theme-toggle .icon-sun, .theme-toggle .icon-moon { display: none; }
    :root .theme-toggle .icon-sun { display: block; }
    :root .theme-toggle .icon-moon { display: none; }
    html[data-theme="light"] .theme-toggle .icon-sun { display: none; }
    html[data-theme="light"] .theme-toggle .icon-moon { display: block; }

    /* -- Main content -- */
    main {
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      padding: 0 2rem;
      flex: 1;
    }

    /* -- Footer -- */
    footer.site-footer {
      text-align: center;
      padding: 1.5rem 1rem;
      color: var(--text-footer);
      font-size: 0.75rem;
      border-top: 1px solid var(--border-primary);
      background: var(--bg-secondary);
      margin-top: auto;
    }
    footer.site-footer a { color: var(--text-placeholder); text-decoration: none; }
    footer.site-footer a:hover { color: var(--accent); }

    /* -- Typography -- */
    a { color: var(--accent); text-decoration: none; }
    a:hover { opacity: 0.6; }
    h1 { font-size: 2rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-heading); letter-spacing: -0.02em; line-height: 1.2; }
    h2 { font-size: 1.5rem; font-weight: 600; margin-top: 42px; margin-bottom: 0.5rem; color: var(--text-heading); letter-spacing: -0.01em; line-height: 1.3; }
    h3 { font-size: 1.15rem; font-weight: 600; margin-top: 32px; margin-bottom: 0.25rem; color: var(--text-heading); line-height: 1.4; }
    h4 { font-size: 1rem; font-weight: 600; margin-top: 16px; margin-bottom: 0.25rem; color: var(--text-heading); line-height: 1.4; }

    /* -- Code blocks -- */
    pre {
      background: var(--bg-code); padding: 1rem 1.25rem; border-radius: 6px;
      overflow-x: auto; font-size: 0.8rem; line-height: 1.65; margin: 1.25rem 0;
      border: 1px solid var(--border-primary);
    }
    pre code.hljs { background: transparent; padding: 0; }
    code { font-family: var(--font-code); font-size: 0.85em; }
    :not(pre) > code {
      background: rgba(52, 101, 164, 0.12);
      padding: 0.1rem 0.35rem;
      border-radius: 2px;
      color: var(--text-secondary);
      font-size: 0.82em;
    }

    /* -- Tables -- */
    table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
    th, td { text-align: left; padding: 0.6rem 0.75rem; border-bottom: 1px solid var(--border-primary); }
    th { font-weight: 600; color: var(--text-secondary); font-size: 0.8rem; }

    /* -- Doc body -- */
    .doc-body blockquote {
      border-left: 4px solid var(--blockquote-border); margin: 1.5rem 0;
      padding: 0.75rem 1rem; background: var(--bg-secondary);
      color: var(--text-dim); font-size: 0.9rem;
    }
    .doc-body blockquote p { margin-bottom: 0.5rem; }
    .doc-body blockquote p:last-child { margin-bottom: 0; }
    .doc-body hr { border: none; height: 1px; background: var(--border-primary); margin: 2.5rem 0; }
    .doc-body strong { color: var(--text-heading); }
    .doc-body ul, .doc-body ol { margin-left: 1.5rem; margin-bottom: 1.25rem; }
    .doc-body li { margin-bottom: 0.4rem; line-height: 1.7; }
    .doc-body p { margin-bottom: 1.25rem; }
    .doc-body a { color: var(--accent); }
    .doc-body a:hover { opacity: 0.6; }

    /* -- Scroll to top -- */
    .scroll-top {
      position: fixed; bottom: 2rem; right: 2rem; width: 2rem; height: 2rem;
      background: var(--bg-secondary); border: 1px solid var(--border-primary);
      border-radius: 4px; color: var(--text-subtle);
      display: flex; align-items: center; justify-content: center; cursor: pointer;
      opacity: 0; visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s, color 0.15s;
      z-index: 50; font-size: 1rem;
    }
    .scroll-top.visible { opacity: 1; visibility: visible; }
    .scroll-top:hover { color: var(--text-heading); border-color: var(--border-hover); }

    /* -- Mobile -- */
    .mobile-menu-toggle {
      display: none;
      background: none; border: none; color: var(--text-heading);
      cursor: pointer; padding: 0.25rem;
    }
    @media (max-width: 640px) {
      .mobile-menu-toggle { display: flex; align-items: center; }
      .nav-links { display: none; }
      .nav-links.nav-open {
        display: flex; flex-direction: column; position: absolute;
        top: 3.25rem; left: 0; right: 0; background: var(--bg-primary);
        border-bottom: 1px solid var(--border-primary); padding: 0.5rem 1rem;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1); z-index: 99;
      }
      .nav-links.nav-open .nav-link { padding: 0.5rem 0; }
    }

    /* -- Light mode hljs -- */
    html[data-theme="light"] pre code.hljs { color: var(--text-body); }
    html[data-theme="light"] .hljs-keyword, html[data-theme="light"] .hljs-selector-tag { color: #8b4c2a; }
    html[data-theme="light"] .hljs-string, html[data-theme="light"] .hljs-title, html[data-theme="light"] .hljs-name { color: #5a7a3a; }
    html[data-theme="light"] .hljs-comment, html[data-theme="light"] .hljs-quote { color: #9a9088; }
    html[data-theme="light"] .hljs-number, html[data-theme="light"] .hljs-literal, html[data-theme="light"] .hljs-built_in { color: #8a6a20; }

    input, textarea, select, button { font-size: 16px; }

    @media (max-width: 768px) {
      h1 { font-size: 1.5rem; } h2 { font-size: 1.25rem; }
      main { padding: 0 1rem; }
      pre { font-size: 0.75rem; padding: 0.85rem 1rem; }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; scroll-behavior: auto !important; }
    }
  </style>
</head>
<body>
  <nav class="site-nav" aria-label="Main navigation">
    <a href="/" class="brand">
      <span class="brand-accent">&lt;/&gt;</span> ${projectName}
    </a>
    <button class="mobile-menu-toggle" onclick="document.querySelector('.nav-links').classList.toggle('nav-open')" type="button" aria-label="Toggle menu">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
    </button>
    <div class="nav-links">
      <a href="/docs" class="nav-link">Docs</a>
      <a href="/posts" class="nav-link">Blog</a>
      <a href="/admin" class="nav-link">Admin</a>
      <button class="theme-toggle" onclick="toggleTheme()" type="button" aria-label="Toggle theme">
        <svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <a href="https://github.com/hypermediacms/hypermedia-app" target="_blank" rel="noopener" class="nav-link" title="GitHub">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
      </a>
    </div>
  </nav>

  <main id="main-content">__content__</main>

  <footer class="site-footer" role="contentinfo">
    ${projectName} &mdash; Built with <a href="https://github.com/hypermediacms/hypermedia-app">HTX Engine</a>
  </footer>

  <button class="scroll-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Scroll to top">&uarr;</button>

  <script>
    function toggleTheme() {
      var html = document.documentElement;
      var current = html.getAttribute('data-theme');
      var next = (current === 'light') ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    }

    hljs.highlightAll();

    function updateScrollTop() {
      var btn = document.querySelector('.scroll-top');
      if (btn) btn.classList.toggle('visible', window.scrollY > 400);
    }
    window.addEventListener('scroll', updateScrollTop, { passive: true });
    document.addEventListener('DOMContentLoaded', updateScrollTop);
  </script>
</body>
</html>
`;
}

function renderMinimalLayout(projectName: string): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <htx:include src="/partials/_nav.htx" />
  <main class="site-main">
    __content__
  </main>
</body>
</html>
`;
}

function renderMinimalHomePage(projectName: string): string {
  return `<section class="hero">
  <p class="eyebrow">Minimal Starter</p>
  <h1>${projectName}</h1>
  <p>This lean scaffold gives you file-routed HTX templates, a shared layout, and a small starting point for your app.</p>
</section>

<section class="minimal-grid">
  <article class="minimal-card">
    <h2>Start editing</h2>
    <p>Open <code>app/templates/index.htx</code> and <code>app/templates/about.htx</code> to shape your first routes.</p>
  </article>

  <article class="minimal-card">
    <h2>Run locally</h2>
    <p>Use <code>bun run dev</code> to serve the app through the HTX runtime and static file host.</p>
  </article>

  <article class="minimal-card">
    <h2>Grow into CMS</h2>
    <p>When you want seeded content or admin flows, create a new app with the default CMS variant.</p>
  </article>
</section>
`;
}

function renderMinimalAboutPage(): string {
  return `<section class="page-section">
  <p class="eyebrow">About</p>
  <h1>Lean HTX starter</h1>
  <p>This minimal variant keeps only the essentials: a root layout, a couple of routes, shared navigation, and lightweight CSS.</p>
  <p>It is useful when you want to start small and add your own content model and templates from scratch.</p>
</section>
`;
}

function renderMinimalNav(projectName: string): string {
  return `<header class="site-header">
  <nav>
    <a href="/" class="logo">${projectName}</a>
    <a href="/about">About</a>
  </nav>
</header>
`;
}

function renderMinimalStyles(): string {
  return `*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.6;
  color: #172033;
  background: #f7f8fc;
}

a {
  color: #2453d4;
}

.site-header nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 2rem;
  background: #ffffff;
  border-bottom: 1px solid #dbe3f1;
}

.site-header .logo {
  margin-right: auto;
  font-weight: 700;
  text-decoration: none;
  color: #172033;
}

.site-header a {
  text-decoration: none;
  color: #4b5568;
}

.site-main {
  max-width: 56rem;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  padding: 3rem 0 2rem;
}

.eyebrow {
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  font-weight: 700;
  color: #2453d4;
}

.hero h1,
.page-section h1 {
  margin: 0 0 0.75rem;
  font-size: 2.4rem;
  line-height: 1.1;
}

.minimal-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.minimal-card,
.page-section {
  padding: 1.25rem;
  background: #ffffff;
  border: 1px solid #dbe3f1;
  border-radius: 1rem;
}

@media (max-width: 900px) {
  .minimal-grid {
    grid-template-columns: 1fr;
  }
}
`;
}

function renderHomePage(): string {
  return `<style>
  .hero { padding: 3rem 0 2rem; }
  .hero h1 { font-size: 2.4rem; margin-bottom: 0.5rem; }
  .hero p { color: var(--text-muted); font-size: 1.05rem; max-width: 36em; }
  .home-card-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
  .home-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    padding: 1.25rem 1.5rem;
  }
  .home-card-eyebrow {
    font-size: 0.68rem; font-weight: 600; color: var(--accent);
    text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.5rem;
  }
  .home-card h2 { font-size: 1.1rem; font-weight: 600; color: var(--text-heading); margin: 0 0 0.35rem; }
  .home-card p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 0; }
  .home-section { margin-bottom: 2.5rem; }
  .home-section-heading { margin-bottom: 1rem; }
  .home-section-heading h2 { font-size: 1.15rem; font-weight: 600; color: var(--text-heading); margin: 0 0 0.15rem; }
  .home-section-heading p { font-size: 0.85rem; color: var(--text-muted); }
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }
  .feature-item {
    padding: 1rem 1.1rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 6px;
  }
  .feature-item h3 { font-size: 0.95rem; font-weight: 600; color: var(--text-heading); margin: 0 0 0.35rem; }
  .feature-item p { font-size: 0.82rem; color: var(--text-muted); margin: 0; line-height: 1.55; }
  .post-stack { display: grid; gap: 0.75rem; }
  .post-row {
    display: block;
    padding: 0.65rem 0;
    border-bottom: 1px solid var(--border-primary);
  }
  .post-row:first-child { border-top: 1px solid var(--border-primary); }
  .post-row h3 { font-size: 0.92rem; font-weight: 500; margin: 0 0 0.15rem; color: var(--text-heading); }
  .post-row h3 a { color: var(--accent); }
  .post-row > p { font-size: 0.8rem; color: var(--text-muted); margin: 0; }
  .post-row .meta { font-size: 0.75rem; color: var(--text-subtle); margin-top: 0.15rem; }
  @media (max-width: 768px) {
    .home-card-grid, .feature-grid { grid-template-columns: 1fr; }
  }
</style>

<section class="hero">
  <h1>CMS Starter</h1>
  <p>A real HTX app from the first install. This generated project demonstrates routing, seeded content, public pages, and authenticated admin mutations.</p>
</section>

<div class="home-card-grid">
  <div class="home-card">
    <p class="home-card-eyebrow">Page Content</p>
    <h2><a href="/pages/about">Read the about page</a></h2>
    <p>Inspect a public page rendered from the same content layer the admin updates.</p>
  </div>

  <div class="home-card">
    <p class="home-card-eyebrow">Public Content</p>
    <h2><a href="/posts">Browse posts</a></h2>
    <p>See list and detail routes driven by seeded content and HTX query directives.</p>
  </div>

  <div class="home-card">
    <p class="home-card-eyebrow">Admin Flow</p>
    <h2><a href="/admin">Open the CMS</a></h2>
    <p>Sign in, then create, edit, and delete posts and pages through the built-in mutation flow.</p>
  </div>
</div>

<section class="home-section">
  <div class="home-section-heading">
    <h2>What this starter proves</h2>
    <p>The generated app is intentionally small, but each surface maps to an important HTX capability.</p>
  </div>
  <div class="feature-grid">
    <div class="feature-item">
      <h3>File-routed pages</h3>
      <p>Routes come directly from the HTX files you can open and edit.</p>
    </div>
    <div class="feature-item">
      <h3>SQLite-backed reads</h3>
      <p>Public pages and posts are driven by seeded content instead of hardcoded placeholders.</p>
    </div>
    <div class="feature-item">
      <h3>Authenticated admin</h3>
      <p>The admin UI demonstrates login, protected routes, and signed content mutations.</p>
    </div>
  </div>
</section>

<section class="home-section">
  <div class="home-section-heading">
    <h2>Recent published posts</h2>
    <p>The public post routes only show published content, so the seeded draft stays hidden until you publish it.</p>
  </div>

  <htx:type>post</htx:type>
  <htx:where>status=published</htx:where>
  <htx:order>newest</htx:order>
  <htx:howmany>3</htx:howmany>
  <htx>
  <div class="post-stack">
    <htx:each>
    <article class="post-row">
      <h3><a href="/posts/__slug__">__title__</a></h3>
      <p>__summary__</p>
      <p class="meta">By __author__</p>
    </article>
    </htx:each>
  </div>
  <htx:none>
  <p style="color: var(--text-muted); font-size: 0.85rem;">No published posts yet. Open <a href="/admin/posts/new">the admin</a> to create one.</p>
  </htx:none>
  </htx>
</section>

<section class="home-section">
  <div class="home-section-heading">
    <h2>Featured pages</h2>
    <p>These content-managed pages use the same adapter and HTX read lifecycle as the rest of the CMS starter.</p>
  </div>

  <htx:type>page</htx:type>
  <htx:where>status=published</htx:where>
  <htx:order>oldest</htx:order>
  <htx:howmany>3</htx:howmany>
  <htx>
  <div class="post-stack">
    <htx:each>
    <article class="post-row">
      <h3><a href="/pages/__slug__">__title__</a></h3>
      <p>__summary__</p>
    </article>
    </htx:each>
  </div>
  </htx>
</section>
`;
}

function renderPostsIndex(): string {
  return `<style>
  .posts-page { padding: 1.5rem 0 3rem; }
  .posts-header { margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-primary); }
  .posts-header .eyebrow { font-size: 0.7rem; font-weight: 600; color: var(--accent); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.35rem; }
  .posts-header h1 { font-size: 1.75rem; margin-bottom: 0.35rem; }
  .posts-header p { color: var(--text-muted); font-size: 0.9rem; }
  .post-list { display: flex; flex-direction: column; }
  .post-item {
    display: block; padding: 1rem 0;
    border-bottom: 1px solid var(--border-primary);
  }
  .post-item:first-child { border-top: 1px solid var(--border-primary); }
  .post-item h2 { font-size: 1rem; font-weight: 500; margin: 0 0 0.15rem; color: var(--text-heading); }
  .post-item h2 a { color: var(--accent); }
  .post-item > p { font-size: 0.82rem; color: var(--text-muted); margin: 0; line-height: 1.55; }
  .post-item .meta { font-size: 0.75rem; color: var(--text-subtle); margin-top: 0.2rem; }
</style>

<div class="posts-page">
  <header class="posts-header">
    <p class="eyebrow">Posts</p>
    <h1>Published posts</h1>
    <p>These pages are driven by seeded content in SQLite and rendered through HTX read directives.</p>
  </header>

  <htx:type>post</htx:type>
  <htx:where>status=published</htx:where>
  <htx:order>newest</htx:order>
  <htx:howmany>20</htx:howmany>
  <htx>
  <div class="post-list">
    <htx:each>
    <article class="post-item">
      <h2><a href="/posts/__slug__">__title__</a></h2>
      <p>__summary__</p>
      <p class="meta">By __author__ &middot; __published_at__</p>
    </article>
    </htx:each>
  </div>
  <htx:none>
  <p style="color: var(--text-muted); font-size: 0.85rem;">No published posts yet.</p>
  </htx:none>
  </htx>
</div>
`;
}

function renderPostDetail(): string {
  return `<style>
  .post-page { padding: 1.5rem 0 3rem; max-width: 780px; }
  .post-breadcrumb {
    font-size: 0.8rem; margin-bottom: 1.5rem; display: flex;
    align-items: center; gap: 0.35rem; color: var(--text-footer);
  }
  .post-breadcrumb a { color: var(--text-placeholder); text-decoration: none; }
  .post-breadcrumb a:hover { color: var(--accent); opacity: 1; }
  .post-breadcrumb .sep { color: var(--border-hover); }
  .post-header { margin-bottom: 2rem; }
  .post-header h1 { margin-bottom: 0.5rem; font-size: 1.75rem; }
  .post-summary { color: var(--text-dim); font-size: 1rem; line-height: 1.65; margin-bottom: 0.75rem; }
  .post-meta {
    display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
    font-size: 0.78rem; color: var(--text-footer); padding-top: 0.75rem;
    border-top: 1px solid var(--border-primary);
  }
  .post-body { line-height: 1.85; font-size: 0.95rem; color: var(--text-body); }
  .post-body p { margin-bottom: 1.25rem; }
</style>

<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<htx:each>
  <article class="post-page">
    <nav class="post-breadcrumb" aria-label="Breadcrumb">
      <a href="/posts">Posts</a>
      <span class="sep">/</span>
      <span>__title__</span>
    </nav>

    <header class="post-header">
      <h1>__title__</h1>
      <p class="post-summary">__summary__</p>
      <div class="post-meta">
        <span>By __author__</span>
        <span>__published_at__</span>
      </div>
    </header>

    <div class="post-body">
      <p>__body__</p>
    </div>
  </article>
</htx:each>

<htx:none>
  <div style="text-align: center; padding: 4rem 1rem;">
    <h2 style="margin-bottom: 0.5rem; color: var(--text-subtle);">Post not found</h2>
    <p style="color: var(--text-placeholder); margin-bottom: 1.5rem;">This post doesn't exist yet.</p>
    <a href="/posts" style="color: var(--accent);">Browse all posts &rarr;</a>
  </div>
</htx:none>
</htx>
`;
}

function renderPageDetail(): string {
  return `<htx:type>page</htx:type>
<htx:where>status=published</htx:where>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<article class="article-shell">
  <p class="eyebrow">Page</p>
  <h1>__title__</h1>
  <p class="article-summary">__summary__</p>
  <div class="article-body">__body__</div>
</article>
</htx>
`;
}

function renderDocsLayout(): string {
  return `<style>
  .docs-shell {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 0;
    min-height: calc(100vh - 3.25rem - 4rem);
    margin: 0 -2rem;
  }

  /* -- Sidebar -- */
  .docs-sidebar {
    border-right: 1px solid var(--border-primary);
    padding: 1.5rem 0;
    position: sticky;
    top: 3.25rem;
    height: calc(100vh - 3.25rem);
    overflow-y: auto;
  }
  .docs-nav-label {
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--text-subtle);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0 1.25rem 0.75rem;
  }
  .docs-nav-filter { padding: 0 1rem 0.75rem; }
  .docs-nav-filter input {
    width: 100%;
    padding: 0.4rem 0.65rem;
    font-size: 0.78rem;
    font-family: var(--font-body);
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-primary);
    border-radius: 4px;
    outline: none;
    transition: border-color 0.15s;
  }
  .docs-nav-filter input:focus { border-color: var(--accent); }
  .docs-nav-filter input::placeholder { color: var(--text-placeholder); }
  .docs-nav-group { margin-bottom: 0.35rem; }
  .docs-nav-group h3 {
    font-size: 0.72rem; font-weight: 600; color: var(--text-muted);
    padding: 0.5rem 1.25rem 0.25rem; margin: 0;
    text-transform: uppercase; letter-spacing: 0.04em;
  }
  .docs-nav-group ul { list-style: none; }
  .docs-nav-group li a {
    display: block; padding: 0.3rem 1.25rem; font-size: 0.82rem;
    color: var(--nav-link); text-decoration: none;
    transition: color 0.15s, background 0.15s;
  }
  .docs-nav-group li a:hover {
    color: var(--nav-link-hover); background: var(--bg-hover-subtle); opacity: 1;
  }

  /* -- Content area -- */
  .docs-main { padding: 1.5rem 2.5rem 3rem; max-width: 780px; min-width: 0; }

  /* -- Mobile sidebar -- */
  .docs-mobile-toggle {
    display: none;
    background: var(--bg-secondary); border: 1px solid var(--border-primary);
    border-radius: 5px; color: var(--text-muted); font-size: 0.8rem;
    font-family: var(--font-body); padding: 0.45rem 0.85rem;
    cursor: pointer; margin-bottom: 1.25rem;
  }
  .docs-mobile-toggle:hover { border-color: var(--border-hover); color: var(--text-primary); }

  @media (max-width: 768px) {
    .docs-shell { grid-template-columns: 1fr; margin: 0 -1rem; }
    .docs-sidebar {
      display: none; position: static; height: auto;
      border-right: none; border-bottom: 1px solid var(--border-primary); padding: 1rem 0;
    }
    .docs-sidebar.sidebar-open { display: block; }
    .docs-mobile-toggle { display: block; }
    .docs-main { padding: 1rem 1rem 2rem; }
  }
</style>

<button class="docs-mobile-toggle" onclick="document.querySelector('.docs-sidebar').classList.toggle('sidebar-open')" type="button">
  Browse topics
</button>

<div class="docs-shell">
  <aside class="docs-sidebar">
    <htx:include src="/partials/_docs-nav.htx" />
  </aside>
  <div class="docs-main">
    __content__
  </div>
</div>
`;
}

function renderDocsIndex(): string {
  return `<style>
  .docs-index { padding: 0.5rem 0 3rem; }
  .docs-index-header h1 { font-size: 1.75rem; margin-bottom: 0.35rem; letter-spacing: -0.02em; font-weight: 600; }
  .docs-index-header p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 0; }
  .docs-index-header .docs-count {
    font-size: 0.75rem; color: var(--text-subtle); margin-top: 0.5rem;
    padding-top: 0.5rem; border-top: 1px solid var(--border-primary);
  }
  .docs-section { margin-bottom: 2rem; }
  .docs-section-heading { margin-bottom: 0.75rem; }
  .docs-section-heading h2 { font-size: 1.05rem; font-weight: 600; color: var(--text-heading); margin: 0 0 0.15rem; }
  .docs-section-heading p { font-size: 0.82rem; color: var(--text-muted); }
  .docs-card {
    display: block; padding: 0.65rem 0;
    border-bottom: 1px solid var(--border-primary);
  }
  .docs-card:first-child { border-top: 1px solid var(--border-primary); }
  .docs-card h3 {
    font-size: 0.92rem; font-weight: 500; margin: 0 0 0.15rem;
    color: var(--text-heading); line-height: 1.4;
  }
  .docs-card h3 a { color: var(--accent); text-decoration: none; }
  .docs-card h3 a:hover { opacity: 0.6; }
  .docs-card > p { font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; margin: 0; }
</style>

<div class="docs-index">
  <header class="docs-index-header">
    <h1>Documentation</h1>
    <p>Explore the CMS starter docs. Learn how the HTX engine routes templates, reads content, handles secure mutations, and runs on the Bun runtime.</p>

    <htx:type>documentation</htx:type>
    <htx:where>status=published</htx:where>
    <htx:order>oldest</htx:order>
    <htx>
    <p class="docs-count">{{ result.total }} articles</p>
    </htx>
  </header>

  <section class="docs-section">
    <div class="docs-section-heading">
      <h2>Getting Started</h2>
      <p>See what the scaffold includes and how to orient yourself in the generated project.</p>
    </div>

    <htx:type>documentation</htx:type>
    <htx:where>status=published,section=getting-started</htx:where>
    <htx:order>oldest</htx:order>
    <htx>
    <htx:each>
    <article class="docs-card">
      <h3><a href="/docs/__slug__">__title__</a></h3>
      <p>__summary__</p>
    </article>
    </htx:each>
    </htx>
  </section>

  <section class="docs-section">
    <div class="docs-section-heading">
      <h2>Core Concepts</h2>
      <p>Understand how routes, layouts, and content reads fit together.</p>
    </div>

    <htx:type>documentation</htx:type>
    <htx:where>status=published,section=core-concepts</htx:where>
    <htx:order>oldest</htx:order>
    <htx>
    <htx:each>
    <article class="docs-card">
      <h3><a href="/docs/__slug__">__title__</a></h3>
      <p>__summary__</p>
    </article>
    </htx:each>
    </htx>
  </section>

  <section class="docs-section">
    <div class="docs-section-heading">
      <h2>Building Pages</h2>
      <p>Inspect how the generated templates compose layouts, docs, and admin mutations.</p>
    </div>

    <htx:type>documentation</htx:type>
    <htx:where>status=published,section=building-pages</htx:where>
    <htx:order>oldest</htx:order>
    <htx>
    <htx:each>
    <article class="docs-card">
      <h3><a href="/docs/__slug__">__title__</a></h3>
      <p>__summary__</p>
    </article>
    </htx:each>
    </htx>
  </section>

  <section class="docs-section">
    <div class="docs-section-heading">
      <h2>Operations</h2>
      <p>Seed the app, run it locally, and then extend it from a working baseline.</p>
    </div>

    <htx:type>documentation</htx:type>
    <htx:where>status=published,section=operations</htx:where>
    <htx:order>oldest</htx:order>
    <htx>
    <htx:each>
    <article class="docs-card">
      <h3><a href="/docs/__slug__">__title__</a></h3>
      <p>__summary__</p>
    </article>
    </htx:each>
    </htx>
  </section>
</div>
`;
}

function renderDocsDetail(): string {
  return `<style>
  .doc-page { padding: 0.5rem 0 3rem; }
  .doc-breadcrumb {
    font-size: 0.8rem; margin-bottom: 1.5rem; display: flex;
    align-items: center; gap: 0.35rem; color: var(--text-footer);
  }
  .doc-breadcrumb a { color: var(--text-placeholder); text-decoration: none; transition: color 0.15s; }
  .doc-breadcrumb a:hover { color: var(--accent); opacity: 1; }
  .doc-breadcrumb .sep { color: var(--border-hover); }
  .doc-header { margin-bottom: 2rem; }
  .doc-header h1 { margin-bottom: 0.75rem; font-size: 1.75rem; line-height: 1.2; letter-spacing: -0.02em; font-weight: 600; }
  .doc-summary { color: var(--text-dim); font-size: 1rem; line-height: 1.65; margin-bottom: 0.75rem; }
  .doc-meta {
    display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
    font-size: 0.78rem; color: var(--text-footer); padding-top: 0.75rem;
    border-top: 1px solid var(--border-primary);
  }
  .doc-body { line-height: 1.85; font-size: 0.95rem; color: var(--text-body); }
  .doc-body h2 { margin-top: 42px; margin-bottom: 0.75rem; padding-bottom: 0.35rem; border-bottom: 1px solid var(--border-primary); font-weight: 600; }
  .doc-body h3 { margin-top: 32px; margin-bottom: 0.5rem; font-weight: 600; }
  .doc-body h4 { margin-top: 16px; margin-bottom: 0.5rem; font-weight: 600; }
  .doc-body ul, .doc-body ol { margin-left: 1.5rem; margin-bottom: 1.25rem; }
  .doc-body li { margin-bottom: 0.4rem; line-height: 1.7; }
  .doc-body li > p { margin-bottom: 0.5rem; }
  .doc-body p { margin-bottom: 1.25rem; }
  @media (max-width: 768px) {
    .doc-header h1 { font-size: 1.5rem; }
    .doc-body { font-size: 0.9rem; line-height: 1.75; }
  }
</style>

<htx:type>documentation</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<htx:each>
  <article class="doc-page">
    <nav class="doc-breadcrumb" aria-label="Breadcrumb">
      <a href="/docs">Docs</a>
      <span class="sep">/</span>
      <span>__title__</span>
    </nav>

    <header class="doc-header">
      <h1>__title__</h1>
      <p class="doc-summary">__summary__</p>
      <div class="doc-meta">
        <span>__section_label__</span>
      </div>
    </header>

    <div class="doc-body">
      __body__
    </div>
  </article>
</htx:each>

<htx:none>
  <div style="text-align: center; padding: 4rem 1rem;">
    <h2 style="margin-bottom: 0.5rem; color: var(--text-subtle);">Page not found</h2>
    <p style="color: var(--text-placeholder); margin-bottom: 1.5rem;">This documentation page doesn't exist yet.</p>
    <a href="/docs" style="color: var(--accent);">Browse all topics &rarr;</a>
  </div>
</htx:none>
</htx>
`;
}

function renderAdminLayout(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTX Admin</title>
  <script>
    (function() {
      var t = localStorage.getItem('theme');
      if (t === 'light' || t === 'dark') {
        document.documentElement.setAttribute('data-theme', t);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>
  <style>
    /* -- Intercooler Theme -- */
    :root {
      color-scheme: dark;
      --bg-primary: #1f1f1f;
      --bg-secondary: #1a1d1e;
      --bg-surface: #262829;
      --bg-surface-hover: #2e3032;
      --bg-input: #1a1d1e;
      --bg-hover-subtle: rgba(255,255,255,0.04);
      --text-primary: #c7c4c1;
      --text-heading: #e0ddd9;
      --text-body: #c7c4c1;
      --text-secondary: #b0ada9;
      --text-muted: #8a8785;
      --text-dim: #777;
      --text-subtle: #666;
      --text-placeholder: #555;
      --text-footer: #555;
      --border-primary: #41464b;
      --border-hover: #555;
      --border-subtle: rgba(255,255,255,0.08);
      --border-input: #41464b;
      --border-input-focus: #5b96d5;
      --accent: #5b96d5;
      --accent-hover: #4a85c4;
      --accent-bg: rgba(91, 150, 213, 0.08);
      --color-success: #4ade80;
      --color-warning: #f59e0b;
      --color-error: #ef4444;
      --color-danger-bg: rgba(239, 68, 68, 0.1);
      --color-danger-border: rgba(239, 68, 68, 0.3);
      --color-danger-hover: rgba(239, 68, 68, 0.2);
      --success-bg: rgba(74, 222, 128, 0.08);
      --warning-bg: rgba(245, 158, 11, 0.08);
      --nav-link: rgba(199, 196, 193, 0.6);
      --nav-link-hover: rgba(199, 196, 193, 0.85);
      --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      --font-code: 'SF Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
      --sidebar-width: 240px;
    }

    html[data-theme="light"] {
      color-scheme: light;
      --bg-primary: #ffffff;
      --bg-secondary: #f6f6f6;
      --bg-surface: #f0f0f0;
      --bg-surface-hover: #e8e8e8;
      --bg-input: #fff;
      --bg-hover-subtle: rgba(0,0,0,0.03);
      --text-primary: #111;
      --text-heading: #111;
      --text-body: #333;
      --text-secondary: #444;
      --text-muted: #666;
      --text-dim: #777;
      --text-subtle: #888;
      --text-placeholder: #aaa;
      --text-footer: #888;
      --border-primary: #d0d0d0;
      --border-hover: #bbb;
      --border-subtle: rgba(0,0,0,0.08);
      --border-input: #d0d0d0;
      --border-input-focus: #3366cc;
      --accent: #3366cc;
      --accent-hover: #2855b0;
      --accent-bg: rgba(51, 102, 204, 0.06);
      --color-success: #16a34a;
      --color-warning: #d97706;
      --color-error: #dc2626;
      --color-danger-bg: rgba(220, 38, 38, 0.06);
      --color-danger-border: rgba(220, 38, 38, 0.2);
      --color-danger-hover: rgba(220, 38, 38, 0.12);
      --success-bg: rgba(22, 163, 74, 0.06);
      --warning-bg: rgba(217, 119, 6, 0.06);
      --nav-link: rgba(0,0,0,0.5);
      --nav-link-hover: rgba(0,0,0,0.7);
    }

    /* -- Reset -- */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      font-family: var(--font-body);
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      min-height: 100vh;
      -webkit-text-size-adjust: 100%;
      -webkit-font-smoothing: antialiased;
    }

    a { color: var(--accent); text-decoration: none; }
    a:hover { opacity: 0.75; }

    /* -- Top bar -- */
    .admin-topbar {
      background: linear-gradient(var(--bg-primary), var(--bg-secondary));
      border-bottom: 1px solid var(--border-primary);
      height: 3.25rem;
      display: flex;
      align-items: center;
      padding: 0 1.5rem;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .admin-topbar .brand {
      font-weight: 700; font-size: 1.05rem;
      display: flex; align-items: center; gap: 0.4rem;
      text-decoration: none; color: var(--text-heading); letter-spacing: -0.02em;
    }
    .admin-topbar .brand .brand-accent { color: var(--accent); }
    .admin-topbar .brand-tag {
      font-size: 0.65rem; font-weight: 500; color: var(--text-muted);
      background: var(--accent-bg); border: 1px solid var(--border-subtle);
      padding: 0.1rem 0.4rem; border-radius: 3px;
      letter-spacing: 0.04em; text-transform: uppercase; margin-left: 0.25rem;
    }
    .admin-topbar-actions {
      margin-left: auto; display: flex; align-items: center; gap: 0.25rem;
    }
    .admin-topbar-link {
      color: var(--nav-link); font-size: 0.82rem;
      padding: 0.4rem 0.5rem; transition: opacity 0.15s;
    }
    .admin-topbar-link:hover { opacity: 0.6; }

    /* -- Theme toggle -- */
    .theme-toggle {
      display: flex; align-items: center; justify-content: center;
      width: 2rem; height: 2rem; background: transparent;
      border: none; color: var(--nav-link); cursor: pointer;
      border-radius: 4px; padding: 0; transition: opacity 0.15s;
    }
    .theme-toggle:hover { opacity: 0.6; }
    .theme-toggle .icon-sun, .theme-toggle .icon-moon { display: none; }
    :root .theme-toggle .icon-sun { display: block; }
    html[data-theme="light"] .theme-toggle .icon-sun { display: none; }
    html[data-theme="light"] .theme-toggle .icon-moon { display: block; }

    /* -- Layout shell -- */
    .admin-shell { display: flex; min-height: calc(100vh - 3.25rem); }

    /* -- Sidebar -- */
    .admin-sidebar {
      width: var(--sidebar-width); background: var(--bg-secondary);
      border-right: 1px solid var(--border-primary); padding: 1.25rem 0;
      flex-shrink: 0; position: sticky; top: 3.25rem;
      height: calc(100vh - 3.25rem); overflow-y: auto;
      display: flex; flex-direction: column;
    }
    .admin-sidebar-header { padding: 0 1.25rem 1rem; border-bottom: 1px solid var(--border-primary); margin-bottom: 0.75rem; }
    .admin-sidebar-header h3 { font-size: 0.8rem; font-weight: 600; color: var(--text-heading); letter-spacing: -0.01em; margin-bottom: 0.15rem; }
    .admin-sidebar-header p { font-size: 0.72rem; color: var(--text-muted); line-height: 1.5; }

    .admin-nav-group { margin-bottom: 0.5rem; }
    .admin-nav-label {
      font-size: 0.68rem; font-weight: 600; color: var(--text-subtle);
      text-transform: uppercase; letter-spacing: 0.06em; padding: 0.5rem 1.25rem 0.25rem;
    }
    .admin-nav-group ul { list-style: none; }
    .admin-nav-group li a {
      display: block; padding: 0.35rem 1.25rem; font-size: 0.82rem;
      color: var(--nav-link); transition: color 0.15s, background 0.15s; text-decoration: none;
    }
    .admin-nav-group li a:hover { color: var(--nav-link-hover); background: var(--bg-hover-subtle); opacity: 1; }

    .admin-sidebar-footer { margin-top: auto; padding: 1rem 1.25rem 0; border-top: 1px solid var(--border-primary); }

    /* -- Main content -- */
    .admin-main { flex: 1; min-width: 0; padding: 2rem 2.5rem 3rem; max-width: 960px; }

    /* -- Page header -- */
    .admin-page-header {
      display: flex; align-items: flex-start; justify-content: space-between;
      gap: 1rem; margin-bottom: 2rem; padding-bottom: 1.25rem;
      border-bottom: 1px solid var(--border-primary);
    }
    .admin-eyebrow {
      font-size: 0.7rem; font-weight: 600; color: var(--accent);
      text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.35rem;
    }
    .admin-page-header h1 {
      font-size: 1.5rem; font-weight: 600; color: var(--text-heading);
      letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 0.35rem;
    }
    .admin-lead { font-size: 0.85rem; color: var(--text-muted); line-height: 1.55; max-width: 36em; }

    /* -- Buttons -- */
    .btn {
      display: inline-flex; align-items: center; gap: 0.35rem;
      padding: 0.5rem 1rem; font-size: 0.82rem; font-weight: 500;
      font-family: var(--font-body); border-radius: 5px;
      border: 1px solid var(--border-primary); background: var(--bg-surface);
      color: var(--text-primary); cursor: pointer;
      transition: background 0.15s, border-color 0.15s; text-decoration: none; white-space: nowrap;
    }
    .btn:hover { background: var(--bg-surface-hover); border-color: var(--border-hover); opacity: 1; }
    .btn-primary { background: var(--accent); border-color: var(--accent); color: #fff; }
    .btn-primary:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
    .btn-secondary { background: transparent; border-color: var(--border-primary); color: var(--text-muted); }
    .btn-secondary:hover { color: var(--text-primary); border-color: var(--border-hover); }
    .btn-danger { background: var(--color-danger-bg); border-color: var(--color-danger-border); color: var(--color-error); }
    .btn-danger:hover { background: var(--color-danger-hover); }
    .btn-sm { padding: 0.3rem 0.6rem; font-size: 0.75rem; }

    /* -- Card grid -- */
    .admin-card-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem; margin-bottom: 2rem;
    }
    .admin-card {
      background: var(--bg-secondary); border: 1px solid var(--border-primary);
      border-radius: 6px; padding: 1.25rem 1.5rem;
    }
    .admin-card-eyebrow {
      font-size: 0.68rem; font-weight: 600; color: var(--accent);
      text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.5rem;
    }
    .admin-card h2 { font-size: 1.1rem; font-weight: 600; color: var(--text-heading); margin-bottom: 0.35rem; margin-top: 0; }
    .admin-card > p { font-size: 0.82rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 0.75rem; }
    .admin-card-stat { font-size: 2rem; font-weight: 700; color: var(--text-heading); letter-spacing: -0.02em; line-height: 1; margin-bottom: 0.15rem; }
    .admin-card-meta { font-size: 0.72rem; color: var(--text-subtle); margin-bottom: 1rem; }
    .admin-card-actions { display: flex; gap: 0.5rem; padding-top: 0.75rem; border-top: 1px solid var(--border-primary); }

    /* -- Content list -- */
    .admin-list { display: flex; flex-direction: column; }
    .admin-row {
      display: flex; align-items: flex-start; justify-content: space-between;
      gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border-primary);
    }
    .admin-row:first-child { border-top: 1px solid var(--border-primary); }
    .admin-row-main { flex: 1; min-width: 0; }
    .admin-row-title { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; }
    .admin-row-title strong { font-size: 0.92rem; color: var(--text-heading); font-weight: 500; }
    .admin-row-meta { font-size: 0.75rem; color: var(--text-subtle); margin-bottom: 0.2rem; font-family: var(--font-code); }
    .admin-row p:not(.admin-row-meta) { font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; }

    /* -- Status badges -- */
    .status-badge {
      font-size: 0.65rem; font-weight: 600; padding: 0.1rem 0.45rem;
      border-radius: 3px; text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap;
    }
    .status-published { color: var(--color-success); background: var(--success-bg); }
    .status-draft { color: var(--color-warning); background: var(--warning-bg); }

    /* -- Row actions -- */
    .admin-row .actions { display: flex; gap: 0.15rem; flex-shrink: 0; padding-top: 0.15rem; }
    .admin-row .actions a {
      font-size: 0.75rem; color: var(--nav-link); padding: 0.25rem 0.5rem;
      border-radius: 4px; transition: color 0.15s, background 0.15s;
    }
    .admin-row .actions a:hover { color: var(--text-primary); background: var(--bg-hover-subtle); opacity: 1; }

    /* -- Quick links -- */
    .admin-section { margin-bottom: 2rem; }
    .admin-section-heading { margin-bottom: 1rem; }
    .admin-section-heading h2 { font-size: 1.05rem; font-weight: 600; color: var(--text-heading); margin-bottom: 0.15rem; margin-top: 0; }
    .admin-section-heading p { font-size: 0.82rem; color: var(--text-muted); }
    .admin-quick-links { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.5rem; }
    .admin-quick-link {
      display: block; padding: 0.85rem 1rem; background: var(--bg-secondary);
      border: 1px solid var(--border-primary); border-radius: 6px;
      transition: border-color 0.15s, background 0.15s; text-decoration: none;
    }
    .admin-quick-link:hover { border-color: var(--border-hover); background: var(--bg-surface); opacity: 1; }
    .admin-quick-link strong { display: block; font-size: 0.85rem; font-weight: 500; color: var(--text-heading); margin-bottom: 0.15rem; }
    .admin-quick-link span { font-size: 0.75rem; color: var(--text-subtle); }

    /* -- Empty state -- */
    .admin-empty-state { text-align: center; padding: 3rem 1rem; color: var(--text-muted); }
    .admin-empty-state h2 { font-size: 1.15rem; color: var(--text-subtle); margin-bottom: 0.5rem; margin-top: 0; }
    .admin-empty-state p { font-size: 0.85rem; margin-bottom: 1rem; }

    /* -- Forms -- */
    .admin-form { max-width: 680px; }
    .admin-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0; }
    .admin-form-grid-3 { grid-template-columns: 1fr 1fr 1fr; }
    .admin-form-field { margin-bottom: 1rem; }
    .admin-form-field label {
      display: block; font-size: 0.78rem; font-weight: 600;
      color: var(--text-secondary); margin-bottom: 0.35rem; letter-spacing: 0.01em;
    }
    .admin-form-field input[type="text"],
    .admin-form-field input[type="password"],
    .admin-form-field textarea,
    .admin-form-field select {
      width: 100%; padding: 0.55rem 0.75rem; font-size: 0.85rem;
      font-family: var(--font-body); background: var(--bg-input);
      color: var(--text-primary); border: 1px solid var(--border-input);
      border-radius: 5px; outline: none; transition: border-color 0.15s;
    }
    .admin-form-field input:focus,
    .admin-form-field textarea:focus,
    .admin-form-field select:focus { border-color: var(--border-input-focus); }
    .admin-form-field input::placeholder,
    .admin-form-field textarea::placeholder { color: var(--text-placeholder); }
    .admin-form-field textarea { resize: vertical; line-height: 1.6; }
    .admin-form-actions { display: flex; align-items: center; gap: 0.5rem; padding-top: 0.5rem; }
    .admin-form-actions button {
      display: inline-flex; align-items: center; padding: 0.55rem 1.25rem;
      font-size: 0.82rem; font-weight: 500; font-family: var(--font-body);
      background: var(--accent); color: #fff; border: 1px solid var(--accent);
      border-radius: 5px; cursor: pointer; transition: background 0.15s;
    }
    .admin-form-actions button:hover { background: var(--accent-hover); }
    .admin-form-actions .btn-danger {
      background: var(--color-danger-bg); border-color: var(--color-danger-border); color: var(--color-error);
    }
    .admin-form-actions .btn-danger:hover { background: var(--color-danger-hover); }

    /* -- Confirm delete -- */
    .confirm-delete {
      background: var(--bg-secondary); border: 1px solid var(--border-primary);
      border-radius: 6px; padding: 1.5rem 2rem; max-width: 520px;
    }
    .confirm-delete p { font-size: 0.88rem; color: var(--text-body); margin-bottom: 0.5rem; line-height: 1.6; }
    .confirm-delete .admin-row-meta { margin-bottom: 0.75rem; }
    .confirm-delete .admin-form-actions { padding-top: 1rem; border-top: 1px solid var(--border-primary); margin-top: 0.75rem; }

    /* -- Logout button -- */
    .admin-logout-btn {
      display: inline-flex; align-items: center; gap: 0.3rem; width: 100%;
      padding: 0.4rem 0; font-size: 0.78rem; font-family: var(--font-body);
      background: none; border: none; color: var(--text-subtle);
      cursor: pointer; transition: color 0.15s; text-align: left;
    }
    .admin-logout-btn:hover { color: var(--text-primary); }

    /* -- Mobile sidebar -- */
    .admin-mobile-toggle {
      display: none; background: none; border: none; color: var(--text-heading);
      cursor: pointer; padding: 0.25rem; margin-right: 0.5rem;
    }

    @media (max-width: 768px) {
      .admin-mobile-toggle { display: flex; align-items: center; }
      .admin-sidebar {
        position: fixed; left: -260px; top: 3.25rem; z-index: 90;
        width: var(--sidebar-width); transition: left 0.2s ease; box-shadow: none;
      }
      .admin-sidebar.sidebar-open { left: 0; box-shadow: 4px 0 12px rgba(0,0,0,0.2); }
      .admin-main { padding: 1.5rem 1rem 2rem; }
      .admin-page-header { flex-direction: column; }
      .admin-form-grid { grid-template-columns: 1fr; }
      .admin-form-grid-3 { grid-template-columns: 1fr; }
    }

    input, textarea, select, button { font-size: 16px; }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
    }
  </style>
</head>
<body>
  <header class="admin-topbar">
    <button class="admin-mobile-toggle" onclick="document.querySelector('.admin-sidebar').classList.toggle('sidebar-open')" type="button" aria-label="Toggle sidebar">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
    </button>
    <a href="/admin" class="brand">
      <span class="brand-accent">&lt;/&gt;</span> HTX
      <span class="brand-tag">Admin</span>
    </a>
    <div class="admin-topbar-actions">
      <a href="/" class="admin-topbar-link">View Site</a>
      <a href="/docs" class="admin-topbar-link">Docs</a>
      <button class="theme-toggle" onclick="toggleTheme()" type="button" aria-label="Toggle theme">
        <svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
    </div>
  </header>

  <div class="admin-shell">
    <aside class="admin-sidebar">
      <div class="admin-sidebar-header">
        <h3>Content Admin</h3>
        <p>Manage posts, docs, and pages with HTX templates.</p>
      </div>

      <div class="admin-nav-group">
        <p class="admin-nav-label">Overview</p>
        <ul>
          <li><a href="/admin">Dashboard</a></li>
        </ul>
      </div>

      <div class="admin-nav-group">
        <p class="admin-nav-label">Publishing</p>
        <ul>
          <li><a href="/admin/posts">Posts</a></li>
          <li><a href="/admin/posts/new">New Post</a></li>
        </ul>
      </div>

      <div class="admin-nav-group">
        <p class="admin-nav-label">Documentation</p>
        <ul>
          <li><a href="/admin/docs">Docs</a></li>
          <li><a href="/admin/docs/new">New Doc</a></li>
        </ul>
      </div>

      <div class="admin-nav-group">
        <p class="admin-nav-label">Pages</p>
        <ul>
          <li><a href="/admin/pages">Pages</a></li>
          <li><a href="/admin/pages/new">New Page</a></li>
        </ul>
      </div>

      <div class="admin-sidebar-footer">
        <form method="post" action="/admin/logout">
          <button type="submit" class="admin-logout-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Log Out
          </button>
        </form>
      </div>
    </aside>

    <main class="admin-main">
      __content__
    </main>
  </div>

  <script>
    function toggleTheme() {
      var html = document.documentElement;
      var current = html.getAttribute('data-theme');
      var next = (current === 'light') ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    }
  </script>
</body>
</html>
`;
}

function renderAdminIndex(): string {
  return `<section class="admin-page-header">
  <div>
    <p class="admin-eyebrow">Dashboard</p>
    <h1>Content Admin</h1>
    <p class="admin-lead">
      Manage the app's published content through HTX routes,
      layouts, and the mutation lifecycle.
    </p>
  </div>
</section>

<section class="admin-card-grid">
  <div class="admin-card">
    <p class="admin-card-eyebrow">Publishing</p>
    <h2>Posts</h2>
    <p>Manage blog entries, drafts, and published updates.</p>
    <htx:type>post</htx:type>
    <htx>
    <p class="admin-card-stat">{{ result.total }}</p>
    <p class="admin-card-meta">Total posts in database</p>
    </htx>
    <div class="admin-card-actions">
      <a href="/admin/posts" class="btn">Manage Posts</a>
      <a href="/admin/posts/new" class="btn btn-secondary">New Post</a>
    </div>
  </div>

  <div class="admin-card">
    <p class="admin-card-eyebrow">Knowledge Base</p>
    <h2>Docs</h2>
    <p>Edit documentation articles, sections, ordering, and slugs.</p>
    <htx:type>documentation</htx:type>
    <htx>
    <p class="admin-card-stat">{{ result.total }}</p>
    <p class="admin-card-meta">Documentation records</p>
    </htx>
    <div class="admin-card-actions">
      <a href="/admin/docs" class="btn">Manage Docs</a>
      <a href="/admin/docs/new" class="btn btn-secondary">New Doc</a>
    </div>
  </div>

  <div class="admin-card">
    <p class="admin-card-eyebrow">Content</p>
    <h2>Pages</h2>
    <p>Manage content-managed public pages.</p>
    <htx:type>page</htx:type>
    <htx>
    <p class="admin-card-stat">{{ result.total }}</p>
    <p class="admin-card-meta">Page records</p>
    </htx>
    <div class="admin-card-actions">
      <a href="/admin/pages" class="btn">Manage Pages</a>
      <a href="/admin/pages/new" class="btn btn-secondary">New Page</a>
    </div>
  </div>
</section>

<section class="admin-section">
  <div class="admin-section-heading">
    <h2>Quick links</h2>
    <p>Jump directly into common authoring flows.</p>
  </div>

  <div class="admin-quick-links">
    <a href="/posts" class="admin-quick-link">
      <strong>View blog</strong>
      <span>Open the public posts listing</span>
    </a>
    <a href="/docs" class="admin-quick-link">
      <strong>View docs</strong>
      <span>Open the public documentation index</span>
    </a>
    <a href="/admin/posts/new" class="admin-quick-link">
      <strong>Create post</strong>
      <span>Start a new blog entry</span>
    </a>
    <a href="/admin/docs/new" class="admin-quick-link">
      <strong>Create doc</strong>
      <span>Draft a new documentation article</span>
    </a>
  </div>
</section>
`;
}

function renderAdminPostsIndex(): string {
  return `<section class="admin-page-header">
  <div>
    <p class="admin-eyebrow">Publishing</p>
    <h1>All posts</h1>
    <p class="admin-lead">
      Drafts and published records share the same content type. Public routes only render published entries.
    </p>
  </div>
  <a href="/admin/posts/new" class="btn btn-primary">Create Post</a>
</section>

<htx:type>post</htx:type>
<htx:order>newest</htx:order>
<htx>
<div class="admin-list">
<htx:each>
<article class="admin-row">
  <div class="admin-row-main">
    <div class="admin-row-title">
      <strong>__title__</strong>
      <span class="status-badge status-__status__">__status__</span>
    </div>
    <p class="admin-row-meta">__slug__</p>
    <p>__summary__</p>
  </div>
  <div class="actions">
    <a href="/posts/__slug__">View</a>
    <a href="/admin/posts/__id__/edit">Edit</a>
    <a href="/admin/posts/__id__/delete">Delete</a>
  </div>
</article>
</htx:each>
</div>
<htx:none>
<div class="admin-empty-state">
  <h2>No posts yet</h2>
  <p>Create a post to populate the blog and admin listing.</p>
  <a href="/admin/posts/new" class="btn btn-primary">Create Post</a>
</div>
</htx:none>
</htx>
`;
}

function renderAdminPostsNew(): string {
  return `<section class="admin-page-header">
  <div>
    <p class="admin-eyebrow">Create</p>
    <h1>New post</h1>
    <p class="admin-lead">Draft a new blog entry for the public site.</p>
  </div>
  <a href="/admin/posts" class="btn btn-secondary">Back to Posts</a>
</section>

<htx:type>post</htx:type>
<htx:action>save</htx:action>
<htx:response name="redirect">/admin/posts</htx:response>
<htx>
<form method="post" class="admin-form">
  <input type="hidden" name="htx-payload" value="__payload__" />

  <div class="admin-form-grid">
    <div class="admin-form-field">
      <label for="title">Title</label>
      <input type="text" id="title" name="title" required />
    </div>

    <div class="admin-form-field">
      <label for="slug">Slug</label>
      <input type="text" id="slug" name="slug" placeholder="auto-generated from title" />
    </div>
  </div>

  <div class="admin-form-field">
    <label for="summary">Summary</label>
    <textarea id="summary" name="summary" rows="3" placeholder="Brief description for listings"></textarea>
  </div>

  <div class="admin-form-grid">
    <div class="admin-form-field">
      <label for="author">Author</label>
      <input type="text" id="author" name="author" value="HTX Team" />
    </div>

    <div class="admin-form-field">
      <label for="status">Status</label>
      <input type="text" id="status" name="status" value="draft" />
    </div>
  </div>

  <div class="admin-form-field">
    <label for="body">Body</label>
    <textarea id="body" name="body" rows="14" placeholder="Post content"></textarea>
  </div>

  <div class="admin-form-actions">
    <button type="submit">Create Post</button>
    <a href="/admin/posts" class="btn btn-secondary">Cancel</a>
  </div>
</form>
</htx>
`;
}

function renderAdminPostsEdit(): string {
  return `<section class="admin-page-header">
  <div>
    <p class="admin-eyebrow">Edit</p>
    <h1>Edit post</h1>
    <p class="admin-lead">Update content, slug, and publication state.</p>
  </div>
  <a href="/admin/posts" class="btn btn-secondary">Back to Posts</a>
</section>

<htx:type>post</htx:type>
<htx:action>update</htx:action>
<htx:recordId>{{ route.id }}</htx:recordId>
<htx:response name="redirect">/admin/posts</htx:response>
<htx>
<form method="post" class="admin-form">
  <input type="hidden" name="htx-payload" value="__payload__" />

  <div class="admin-form-grid">
    <div class="admin-form-field">
      <label for="title">Title</label>
      <input type="text" id="title" name="title" value="__title__" required />
    </div>

    <div class="admin-form-field">
      <label for="slug">Slug</label>
      <input type="text" id="slug" name="slug" value="__slug__" />
    </div>
  </div>

  <div class="admin-form-field">
    <label for="summary">Summary</label>
    <textarea id="summary" name="summary" rows="3">__summary__</textarea>
  </div>

  <div class="admin-form-grid">
    <div class="admin-form-field">
      <label for="author">Author</label>
      <input type="text" id="author" name="author" value="__author__" />
    </div>

    <div class="admin-form-field">
      <label for="status">Status</label>
      <input type="text" id="status" name="status" value="__status__" />
    </div>
  </div>

  <div class="admin-form-field">
    <label for="body">Body</label>
    <textarea id="body" name="body" rows="14">__body__</textarea>
  </div>

  <div class="admin-form-actions">
    <button type="submit">Update Post</button>
    <a href="/posts/__slug__" class="btn btn-secondary">View Live</a>
  </div>
</form>
</htx>
`;
}

function renderAdminPostsDelete(): string {
  return `<section class="admin-page-header">
  <div>
    <p class="admin-eyebrow">Delete</p>
    <h1>Delete post</h1>
    <p class="admin-lead">This action cannot be undone.</p>
  </div>
</section>

<htx:type>post</htx:type>
<htx:action>delete</htx:action>
<htx:recordId>{{ route.id }}</htx:recordId>
<htx:response name="redirect">/admin/posts</htx:response>
<htx>
<div class="confirm-delete">
  <p>Are you sure you want to delete <strong>__title__</strong>?</p>
  <p class="admin-row-meta">__slug__</p>
  <p>This removes the record from the blog and the admin listing permanently.</p>
  <form method="post" class="admin-form-actions">
    <input type="hidden" name="htx-payload" value="__payload__" />
    <button type="submit" class="btn-danger">Delete Post</button>
    <a href="/admin/posts" class="btn btn-secondary">Cancel</a>
  </form>
</div>
</htx>
`;
}

function renderAdminPagesIndex(): string {
  return `<section class="admin-page-header">
  <div>
    <p class="admin-eyebrow">Pages</p>
    <h1>All pages</h1>
    <p class="admin-lead">
      Pages are content-managed public routes rendered through <code>/pages/[slug]</code>.
    </p>
  </div>
  <a href="/admin/pages/new" class="btn btn-primary">Create Page</a>
</section>

<htx:type>page</htx:type>
<htx:order>oldest</htx:order>
<htx>
<div class="admin-list">
<htx:each>
<article class="admin-row">
  <div class="admin-row-main">
    <div class="admin-row-title">
      <strong>__title__</strong>
      <span class="status-badge status-__status__">__status__</span>
    </div>
    <p class="admin-row-meta">__slug__</p>
    <p>__summary__</p>
  </div>
  <div class="actions">
    <a href="/pages/__slug__">View</a>
    <a href="/admin/pages/__id__/edit">Edit</a>
    <a href="/admin/pages/__id__/delete">Delete</a>
  </div>
</article>
</htx:each>
</div>
<htx:none>
<div class="admin-empty-state">
  <h2>No pages yet</h2>
  <p>Create a page to populate the content-managed routes.</p>
  <a href="/admin/pages/new" class="btn btn-primary">Create Page</a>
</div>
</htx:none>
</htx>
`;
}

function renderAdminPagesNew(): string {
  return `<section class="admin-page-header">
  <div>
    <p class="admin-eyebrow">Create</p>
    <h1>New page</h1>
    <p class="admin-lead">Add a content-managed page for the public site.</p>
  </div>
  <a href="/admin/pages" class="btn btn-secondary">Back to Pages</a>
</section>

<htx:type>page</htx:type>
<htx:action>save</htx:action>
<htx:response name="redirect">/admin/pages</htx:response>
<htx>
<form method="post" class="admin-form">
  <input type="hidden" name="htx-payload" value="__payload__" />

  <div class="admin-form-grid">
    <div class="admin-form-field">
      <label for="title">Title</label>
      <input type="text" id="title" name="title" required />
    </div>

    <div class="admin-form-field">
      <label for="slug">Slug</label>
      <input type="text" id="slug" name="slug" placeholder="auto-generated from title" />
    </div>
  </div>

  <div class="admin-form-field">
    <label for="summary">Summary</label>
    <textarea id="summary" name="summary" rows="3" placeholder="Brief description for listings"></textarea>
  </div>

  <div class="admin-form-field">
    <label for="status">Status</label>
    <input type="text" id="status" name="status" value="draft" />
  </div>

  <div class="admin-form-field">
    <label for="body">Body</label>
    <textarea id="body" name="body" rows="10" placeholder="Page content"></textarea>
  </div>

  <div class="admin-form-actions">
    <button type="submit">Create Page</button>
    <a href="/admin/pages" class="btn btn-secondary">Cancel</a>
  </div>
</form>
</htx>
`;
}

function renderAdminPagesEdit(): string {
  return `<section class="admin-page-header">
  <div>
    <p class="admin-eyebrow">Edit</p>
    <h1>Edit page</h1>
    <p class="admin-lead">Update content, slug, and publication state.</p>
  </div>
  <a href="/admin/pages" class="btn btn-secondary">Back to Pages</a>
</section>

<htx:type>page</htx:type>
<htx:action>update</htx:action>
<htx:recordId>{{ route.id }}</htx:recordId>
<htx:response name="redirect">/admin/pages</htx:response>
<htx>
<form method="post" class="admin-form">
  <input type="hidden" name="htx-payload" value="__payload__" />

  <div class="admin-form-grid">
    <div class="admin-form-field">
      <label for="title">Title</label>
      <input type="text" id="title" name="title" value="__title__" required />
    </div>

    <div class="admin-form-field">
      <label for="slug">Slug</label>
      <input type="text" id="slug" name="slug" value="__slug__" />
    </div>
  </div>

  <div class="admin-form-field">
    <label for="summary">Summary</label>
    <textarea id="summary" name="summary" rows="3">__summary__</textarea>
  </div>

  <div class="admin-form-field">
    <label for="status">Status</label>
    <input type="text" id="status" name="status" value="__status__" />
  </div>

  <div class="admin-form-field">
    <label for="body">Body</label>
    <textarea id="body" name="body" rows="10">__body__</textarea>
  </div>

  <div class="admin-form-actions">
    <button type="submit">Update Page</button>
    <a href="/pages/__slug__" class="btn btn-secondary">View Live</a>
  </div>
</form>
</htx>
`;
}

function renderAdminPagesDelete(): string {
  return `<section class="admin-page-header">
  <div>
    <p class="admin-eyebrow">Delete</p>
    <h1>Delete page</h1>
    <p class="admin-lead">This action cannot be undone.</p>
  </div>
</section>

<htx:type>page</htx:type>
<htx:action>delete</htx:action>
<htx:recordId>{{ route.id }}</htx:recordId>
<htx:response name="redirect">/admin/pages</htx:response>
<htx>
<div class="confirm-delete">
  <p>Are you sure you want to delete <strong>__title__</strong>?</p>
  <p class="admin-row-meta">__slug__</p>
  <p>Deleted pages disappear from their public route and the admin list permanently.</p>
  <form method="post" class="admin-form-actions">
    <input type="hidden" name="htx-payload" value="__payload__" />
    <button type="submit" class="btn-danger">Delete Page</button>
    <a href="/admin/pages" class="btn btn-secondary">Cancel</a>
  </form>
</div>
</htx>
`;
}

function renderAdminLoginLayout(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTX Admin &mdash; Sign In</title>
  <script>
    (function() {
      var t = localStorage.getItem('theme');
      if (t === 'light' || t === 'dark') {
        document.documentElement.setAttribute('data-theme', t);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>
  <style>
    :root {
      color-scheme: dark;
      --bg-primary: #1f1f1f;
      --bg-secondary: #1a1d1e;
      --bg-surface: #262829;
      --bg-input: #1a1d1e;
      --text-primary: #c7c4c1;
      --text-heading: #e0ddd9;
      --text-secondary: #b0ada9;
      --text-muted: #8a8785;
      --text-subtle: #666;
      --text-placeholder: #555;
      --border-primary: #41464b;
      --border-input: #41464b;
      --border-input-focus: #5b96d5;
      --accent: #5b96d5;
      --accent-hover: #4a85c4;
      --accent-bg: rgba(91, 150, 213, 0.08);
      --color-error: #ef4444;
      --color-danger-bg: rgba(239, 68, 68, 0.08);
      --nav-link: rgba(199, 196, 193, 0.6);
      --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    }
    html[data-theme="light"] {
      color-scheme: light;
      --bg-primary: #ffffff;
      --bg-secondary: #f6f6f6;
      --bg-surface: #f0f0f0;
      --bg-input: #fff;
      --text-primary: #111;
      --text-heading: #111;
      --text-secondary: #444;
      --text-muted: #666;
      --text-subtle: #888;
      --text-placeholder: #aaa;
      --border-primary: #d0d0d0;
      --border-input: #d0d0d0;
      --border-input-focus: #3366cc;
      --accent: #3366cc;
      --accent-hover: #2855b0;
      --accent-bg: rgba(51, 102, 204, 0.06);
      --color-error: #dc2626;
      --color-danger-bg: rgba(220, 38, 38, 0.06);
      --nav-link: rgba(0,0,0,0.5);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-body);
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-font-smoothing: antialiased;
    }
    a { color: var(--accent); text-decoration: none; }
    a:hover { opacity: 0.75; }
    .login-shell { width: 100%; max-width: 380px; padding: 0 1.5rem; }
    .login-brand {
      display: flex; align-items: center; gap: 0.4rem;
      font-weight: 700; font-size: 1.05rem; color: var(--text-heading);
      letter-spacing: -0.02em; margin-bottom: 2rem; justify-content: center;
    }
    .login-brand .brand-accent { color: var(--accent); }
    .login-brand .brand-tag {
      font-size: 0.65rem; font-weight: 500; color: var(--text-muted);
      background: var(--accent-bg); border: 1px solid rgba(255,255,255,0.08);
      padding: 0.1rem 0.4rem; border-radius: 3px;
      letter-spacing: 0.04em; text-transform: uppercase; margin-left: 0.15rem;
    }
    .login-card {
      background: var(--bg-secondary); border: 1px solid var(--border-primary);
      border-radius: 8px; padding: 2rem;
    }
    .login-card h1 {
      font-size: 1.25rem; font-weight: 600; color: var(--text-heading);
      margin-bottom: 0.35rem; letter-spacing: -0.02em;
    }
    .login-card .login-subtitle {
      font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.5;
    }
    .login-error {
      font-size: 0.8rem; color: var(--color-error); background: var(--color-danger-bg);
      padding: 0.5rem 0.75rem; border-radius: 5px; margin-bottom: 1rem;
    }
    .login-field { margin-bottom: 1rem; }
    .login-field label {
      display: block; font-size: 0.78rem; font-weight: 600;
      color: var(--text-secondary); margin-bottom: 0.35rem;
    }
    .login-field input {
      width: 100%; padding: 0.55rem 0.75rem; font-size: 0.85rem;
      font-family: var(--font-body); background: var(--bg-input);
      color: var(--text-primary); border: 1px solid var(--border-input);
      border-radius: 5px; outline: none; transition: border-color 0.15s;
    }
    .login-field input:focus { border-color: var(--border-input-focus); }
    .login-field input::placeholder { color: var(--text-placeholder); }
    .login-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.25rem; }
    .login-actions button {
      padding: 0.55rem 1.5rem; font-size: 0.85rem; font-weight: 500;
      font-family: var(--font-body); background: var(--accent); color: #fff;
      border: 1px solid var(--accent); border-radius: 5px;
      cursor: pointer; transition: background 0.15s;
    }
    .login-actions button:hover { background: var(--accent-hover); }
    .login-actions a { font-size: 0.8rem; color: var(--nav-link); }
    input { font-size: 16px; }
  </style>
</head>
<body>
  <div class="login-shell">
    <div class="login-brand">
      <span class="brand-accent">&lt;/&gt;</span> HTX
      <span class="brand-tag">Admin</span>
    </div>
    __content__
  </div>
</body>
</html>
`;
}

function renderAdminLogin(): string {
  return `<div class="login-card">
  <h1>Sign in</h1>
  <p class="login-subtitle">
    {{ query.error == 'invalid' ? 'Invalid username or password. Try again.' : 'Enter your admin credentials to continue.' }}
  </p>

  {{ if query.error == 'invalid' }}
  <div class="login-error">Authentication failed. Please check your credentials.</div>
  {{ endif }}

  <form method="post" action="/admin/login">
    <input type="hidden" name="next" value="{{ query.next ? query.next : '/admin' }}" />

    <div class="login-field">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" autocomplete="username" required />
    </div>

    <div class="login-field">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" autocomplete="current-password" required />
    </div>

    <div class="login-actions">
      <button type="submit">Log In</button>
      <a href="/">Back to site</a>
    </div>
  </form>
</div>
`;
}

function renderAdminDocsIndex(): string {
  return `<section class="admin-page-header">
  <div>
    <p class="admin-eyebrow">Documentation</p>
    <h1>All docs</h1>
    <p class="admin-lead">
      Manage documentation records rendered by the public docs routes.
    </p>
  </div>
  <a href="/admin/docs/new" class="btn btn-primary">Create Doc</a>
</section>

<htx:type>documentation</htx:type>
<htx:order>oldest</htx:order>
<htx>
<div class="admin-list">
<htx:each>
<article class="admin-row">
  <div class="admin-row-main">
    <div class="admin-row-title">
      <strong>__title__</strong>
      <span class="status-badge status-__status__">__status__</span>
    </div>
    <p class="admin-row-meta">__section_label__ &middot; #__order__ &middot; __slug__</p>
    <p>__summary__</p>
  </div>
  <div class="actions">
    <a href="/docs/__slug__">View</a>
    <a href="/admin/docs/__id__/edit">Edit</a>
    <a href="/admin/docs/__id__/delete">Delete</a>
  </div>
</article>
</htx:each>
</div>
<htx:none>
<div class="admin-empty-state">
  <h2>No docs yet</h2>
  <p>Create a documentation article to populate the docs section.</p>
  <a href="/admin/docs/new" class="btn btn-primary">Create Doc</a>
</div>
</htx:none>
</htx>
`;
}

function renderAdminDocsNew(): string {
  return `<section class="admin-page-header">
  <div>
    <p class="admin-eyebrow">Create</p>
    <h1>New doc</h1>
    <p class="admin-lead">Add a documentation article for the public docs section.</p>
  </div>
  <a href="/admin/docs" class="btn btn-secondary">Back to Docs</a>
</section>

<htx:type>documentation</htx:type>
<htx:action>save</htx:action>
<htx:response name="redirect">/admin/docs</htx:response>
<htx>
<form method="post" class="admin-form">
  <input type="hidden" name="htx-payload" value="__payload__" />

  <div class="admin-form-grid">
    <div class="admin-form-field">
      <label for="title">Title</label>
      <input type="text" id="title" name="title" required />
    </div>

    <div class="admin-form-field">
      <label for="slug">Slug</label>
      <input type="text" id="slug" name="slug" placeholder="auto-generated from title" />
    </div>
  </div>

  <div class="admin-form-field">
    <label for="summary">Summary</label>
    <textarea id="summary" name="summary" rows="3" placeholder="Brief description for listings"></textarea>
  </div>

  <div class="admin-form-grid admin-form-grid-3">
    <div class="admin-form-field">
      <label for="section">Section ID</label>
      <input type="text" id="section" name="section" value="getting-started" />
    </div>

    <div class="admin-form-field">
      <label for="section_label">Section Label</label>
      <input type="text" id="section_label" name="section_label" value="Getting Started" />
    </div>

    <div class="admin-form-field">
      <label for="order">Order</label>
      <input type="text" id="order" name="order" value="1" />
    </div>
  </div>

  <div class="admin-form-grid">
    <div class="admin-form-field">
      <label for="status">Status</label>
      <input type="text" id="status" name="status" value="published" />
    </div>

    <div class="admin-form-field">
      <label for="created_at">Created At</label>
      <input type="text" id="created_at" name="created_at" placeholder="YYYY-MM-DD HH:MM:SS" />
    </div>
  </div>

  <div class="admin-form-field">
    <label for="body">Body</label>
    <textarea id="body" name="body" rows="16" placeholder="Markdown content"></textarea>
  </div>

  <div class="admin-form-actions">
    <button type="submit">Create Doc</button>
    <a href="/admin/docs" class="btn btn-secondary">Cancel</a>
  </div>
</form>
</htx>
`;
}

function renderAdminDocsEdit(): string {
  return `<section class="admin-page-header">
  <div>
    <p class="admin-eyebrow">Edit</p>
    <h1>Edit doc</h1>
    <p class="admin-lead">Update metadata and content for this documentation article.</p>
  </div>
  <a href="/admin/docs" class="btn btn-secondary">Back to Docs</a>
</section>

<htx:type>documentation</htx:type>
<htx:action>update</htx:action>
<htx:recordId>{{ route.id }}</htx:recordId>
<htx:response name="redirect">/admin/docs</htx:response>
<htx>
<form method="post" class="admin-form">
  <input type="hidden" name="htx-payload" value="__payload__" />

  <div class="admin-form-grid">
    <div class="admin-form-field">
      <label for="title">Title</label>
      <input type="text" id="title" name="title" value="__title__" required />
    </div>

    <div class="admin-form-field">
      <label for="slug">Slug</label>
      <input type="text" id="slug" name="slug" value="__slug__" />
    </div>
  </div>

  <div class="admin-form-field">
    <label for="summary">Summary</label>
    <textarea id="summary" name="summary" rows="3">__summary__</textarea>
  </div>

  <div class="admin-form-grid admin-form-grid-3">
    <div class="admin-form-field">
      <label for="section">Section ID</label>
      <input type="text" id="section" name="section" value="__section__" />
    </div>

    <div class="admin-form-field">
      <label for="section_label">Section Label</label>
      <input type="text" id="section_label" name="section_label" value="__section_label__" />
    </div>

    <div class="admin-form-field">
      <label for="order">Order</label>
      <input type="text" id="order" name="order" value="__order__" />
    </div>
  </div>

  <div class="admin-form-grid">
    <div class="admin-form-field">
      <label for="status">Status</label>
      <input type="text" id="status" name="status" value="__status__" />
    </div>

    <div class="admin-form-field">
      <label for="created_at">Created At</label>
      <input type="text" id="created_at" name="created_at" value="__created_at__" />
    </div>
  </div>

  <div class="admin-form-field">
    <label for="body">Body</label>
    <textarea id="body" name="body" rows="16">__body__</textarea>
  </div>

  <div class="admin-form-actions">
    <button type="submit">Update Doc</button>
    <a href="/docs/__slug__" class="btn btn-secondary">View Live</a>
  </div>
</form>
</htx>
`;
}

function renderAdminDocsDelete(): string {
  return `<section class="admin-page-header">
  <div>
    <p class="admin-eyebrow">Delete</p>
    <h1>Delete doc</h1>
    <p class="admin-lead">This action cannot be undone.</p>
  </div>
</section>

<htx:type>documentation</htx:type>
<htx:action>delete</htx:action>
<htx:recordId>{{ route.id }}</htx:recordId>
<htx:response name="redirect">/admin/docs</htx:response>
<htx>
<div class="confirm-delete">
  <p>Are you sure you want to delete <strong>__title__</strong>?</p>
  <p class="admin-row-meta">__section_label__ &middot; __slug__</p>
  <p>This removes the document from the admin and public docs routes permanently.</p>
  <form method="post" class="admin-form-actions">
    <input type="hidden" name="htx-payload" value="__payload__" />
    <button type="submit" class="btn-danger">Delete Doc</button>
    <a href="/admin/docs" class="btn btn-secondary">Cancel</a>
  </form>
</div>
</htx>
`;
}

function renderCardComponent(): string {
  return `<htx:props>
tone = ""
</htx:props>
<article class="showcase-card {{ tone }}">
  <htx:slot />
</article>
`;
}

function renderPageHeaderComponent(): string {
  return `<htx:props>
eyebrow = ""
title
lead = ""
</htx:props>
<section class="page-header">
  <p class="eyebrow">{{ eyebrow }}</p>
  <h1>{{ title }}</h1>
  <p class="page-lead">{{ lead }}</p>
</section>
`;
}

function renderNav(projectName: string): string {
  return `<header class="site-header">
  <nav>
    <a href="/" class="logo">${projectName}</a>
    <a href="/posts">Posts</a>
    <a href="/pages/about">About</a>
    <a href="/pages/services">Services</a>
    <a href="/admin">Admin</a>
  </nav>
</header>
`;
}

function renderFooter(): string {
  return `<footer class="site-footer">
  <p>Built with HTX, Bun, SQLite, and a file-routed CMS template system.</p>
</footer>
`;
}

function renderDocsNav(): string {
  return `<div class="docs-nav-shell">
  <p class="docs-nav-label">Documentation</p>

  <div class="docs-nav-filter">
    <input type="text" placeholder="Filter topics..." oninput="filterDocsNav(this.value)" />
  </div>

  <div class="docs-nav-group" data-filter-section>
    <h3>Getting Started</h3>
    <ul>
      <li><a href="/docs/what-this-starter-demonstrates" data-filter-text="what this starter demonstrates">What This Starter Demonstrates</a></li>
    </ul>
  </div>

  <div class="docs-nav-group" data-filter-section>
    <h3>Core Concepts</h3>
    <ul>
      <li><a href="/docs/routing-layouts-and-components" data-filter-text="routing layouts and components">Routing, Layouts, And Components</a></li>
      <li><a href="/docs/reading-content-with-htx" data-filter-text="reading content with htx">Reading Content With HTX</a></li>
    </ul>
  </div>

  <div class="docs-nav-group" data-filter-section>
    <h3>Building Pages</h3>
    <ul>
      <li><a href="/docs/mutations-and-the-admin-flow" data-filter-text="mutations and the admin flow">Mutations And The Admin Flow</a></li>
    </ul>
  </div>

  <div class="docs-nav-group" data-filter-section>
    <h3>Operations</h3>
    <ul>
      <li><a href="/docs/running-and-extending-the-app" data-filter-text="running and extending the app">Running And Extending The App</a></li>
    </ul>
  </div>
</div>

<script>
  function filterDocsNav(query) {
    var q = query.toLowerCase().trim();
    var sections = document.querySelectorAll('[data-filter-section]');
    sections.forEach(function(section) {
      var items = section.querySelectorAll('li');
      var anyVisible = false;
      items.forEach(function(item) {
        var text = (item.querySelector('[data-filter-text]') || item).getAttribute('data-filter-text') || item.textContent || '';
        var match = !q || text.toLowerCase().indexOf(q) !== -1;
        item.style.display = match ? '' : 'none';
        if (match) anyVisible = true;
      });
      section.style.display = anyVisible ? '' : 'none';
    });
  }
</script>
`;
}

function renderStyles(): string {
  return `*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.6;
  color: #172033;
  background: #f7f8fc;
}

a {
  color: #2453d4;
}

a:hover {
  color: #183a97;
}

.site-header nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 2rem;
  background: #ffffff;
  border-bottom: 1px solid #dbe3f1;
}

.site-header .logo {
  margin-right: auto;
  font-weight: 700;
  font-size: 1.05rem;
  text-decoration: none;
  color: #172033;
}

.site-header a {
  text-decoration: none;
  color: #4b5568;
}

.site-main {
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem;
}

.site-footer {
  text-align: center;
  padding: 2.5rem 2rem 3rem;
  color: #667289;
  font-size: 0.95rem;
}

.eyebrow,
.card-eyebrow,
.docs-nav-label,
.admin-nav-label {
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  font-weight: 700;
  color: #2453d4;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1,
.article-shell h1,
.admin-header h1,
h1 {
  margin: 0 0 0.75rem;
  font-size: 2.4rem;
  line-height: 1.1;
}

.page-lead,
.article-summary {
  max-width: 54rem;
  margin: 0;
  color: #5d6980;
  font-size: 1.05rem;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.showcase-card,
.article-shell,
.docs-nav-shell,
.admin-nav,
.confirm-delete {
  background: #ffffff;
  border: 1px solid #dbe3f1;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(23, 32, 51, 0.04);
}

.showcase-card,
.confirm-delete,
.admin-nav {
  padding: 1.25rem;
}

.showcase-card.primary {
  background: linear-gradient(180deg, #f5f8ff 0%, #ffffff 100%);
}

.showcase-card h2,
.showcase-card h3 {
  margin: 0 0 0.5rem;
}

.showcase-card p:last-child,
.feature-item p:last-child,
.docs-card p:last-child,
.admin-row p:last-child {
  margin-bottom: 0;
}

.stack {
  display: grid;
  gap: 1rem;
}

.home-section,
.docs-section {
  margin-top: 2.5rem;
}

.section-heading {
  margin-bottom: 1rem;
}

.section-heading h2 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
}

.section-heading p {
  margin: 0;
  color: #5d6980;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.feature-item {
  padding: 1rem 1.1rem;
  background: #eef3fb;
  border-radius: 0.9rem;
}

.feature-item h3 {
  margin: 0 0 0.4rem;
}

.meta-line,
.article-meta {
  color: #667289;
  font-size: 0.95rem;
}

.article-shell {
  padding: 2rem;
}

.article-body,
.docs-body {
  margin-top: 1.5rem;
}

.article-body p,
.docs-body p {
  margin-top: 0;
  margin-bottom: 1rem;
}

.docs-body code {
  padding: 0.12rem 0.35rem;
  background: #eef3fb;
  border-radius: 0.35rem;
  font-size: 0.92em;
}

.docs-shell {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 2rem;
}

.docs-sidebar {
  position: sticky;
  top: 1.5rem;
  align-self: start;
}

.docs-nav-shell {
  padding: 1rem;
}

.docs-nav-group + .docs-nav-group {
  margin-top: 1rem;
}

.docs-nav-group h3 {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
}

.docs-nav-group ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.docs-nav-group li + li {
  margin-top: 0.45rem;
}

.docs-nav-group a {
  color: #4b5568;
  text-decoration: none;
}

.docs-nav-group a:hover {
  color: #172033;
}

.admin-shell {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 2rem;
}

.admin-nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.admin-nav li + li {
  margin-top: 0.5rem;
}

.admin-nav a {
  text-decoration: none;
  color: #4b5568;
}

.admin-nav a:hover {
  color: #172033;
}

.admin-logout-form {
  margin-top: 1.5rem;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1.5rem;
}

.admin-list {
  background: #ffffff;
  border: 1px solid #dbe3f1;
  border-radius: 1rem;
  padding: 0.5rem 1.25rem;
}

.admin-row {
  display: flex;
  align-items: start;
  gap: 1rem;
  padding: 1rem 0;
}

.admin-row + .admin-row {
  border-top: 1px solid #edf1f7;
}

.admin-row-main {
  min-width: 0;
}

.admin-row-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.35rem;
}

.actions {
  margin-left: auto;
  display: flex;
  gap: 0.75rem;
  white-space: nowrap;
}

.actions a {
  text-decoration: none;
}

.post-form label {
  display: block;
  margin-top: 1rem;
  margin-bottom: 0.35rem;
  font-weight: 600;
}

.post-form input[type="text"],
.post-form input[type="password"],
.post-form textarea {
  width: 100%;
  padding: 0.7rem 0.8rem;
  border: 1px solid #c8d3e7;
  border-radius: 0.7rem;
  font: inherit;
  background: #ffffff;
  color: #172033;
}

.post-form textarea {
  resize: vertical;
}

.btn,
.btn-danger,
.btn-secondary,
.post-form button {
  display: inline-block;
  padding: 0.7rem 1.2rem;
  margin-top: 1rem;
  border-radius: 0.75rem;
  border: none;
  background: #2453d4;
  color: #ffffff;
  text-decoration: none;
  font: inherit;
  cursor: pointer;
}

.btn:hover,
.post-form button:hover {
  background: #183a97;
}

.btn-danger {
  background: #cf2f3a;
}

.btn-danger:hover {
  background: #a7252f;
}

.btn-secondary {
  background: #8a96ad;
}

.btn-secondary:hover {
  background: #69758b;
}

.admin-auth-page {
  min-height: 100vh;
}

.admin-auth-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
}

.admin-auth-card {
  width: min(100%, 34rem);
}

.status-badge {
  display: inline-block;
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.status-published {
  background: #dcfce7;
  color: #166534;
}

.status-draft {
  background: #fef3c7;
  color: #92400e;
}

@media (max-width: 960px) {
  .showcase-grid,
  .feature-list,
  .docs-shell,
  .admin-shell {
    grid-template-columns: 1fr;
  }

  .docs-sidebar {
    position: static;
  }
}

@media (max-width: 720px) {
  .site-header nav,
  .site-main {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .admin-header {
    flex-direction: column;
    align-items: start;
  }

  .admin-row {
    flex-direction: column;
  }

  .actions {
    margin-left: 0;
  }
}
`;
}

function renderMarkdownAppLayout(projectName: string): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <htx:include src="/partials/_nav.htx" />
  <main class="site-main">
    __content__
  </main>
  <htx:include src="/partials/_footer.htx" />
</body>
</html>
`;
}

function renderMarkdownNav(projectName: string, links: Array<[string, string]>): string {
  const items = links.map(([href, label]) => `    <a href="${href}">${label}</a>`).join("\n");
  return `<header class="site-header">
  <nav>
    <a href="/" class="logo">${projectName}</a>
${items}
  </nav>
</header>
`;
}

function renderBlogHome(): string {
  return `<section class="hero">
  <p class="eyebrow">Markdown Blog</p>
  <h1>Publish from flat files</h1>
  <p>This starter uses the read-only markdown adapter so your posts live in <code>content/post/*.md</code>.</p>
</section>

<section class="home-section">
  <div class="section-heading">
    <h2>Latest posts</h2>
    <p>Markdown front matter becomes HTX content rows, and <code>body_html</code> is rendered automatically.</p>
  </div>

  <htx:type>post</htx:type>
  <htx:where>status=published</htx:where>
  <htx:order>newest</htx:order>
  <htx:howmany>3</htx:howmany>
  <htx>
  <div class="stack">
    <htx:each>
    <article class="showcase-card">
      <p class="card-eyebrow">__published_at__</p>
      <h2><a href="/posts/__slug__">__title__</a></h2>
      <p>__summary__</p>
      <p class="meta-line">By __author__</p>
    </article>
    </htx:each>
  </div>
  </htx>
</section>
`;
}

function renderBlogPostsIndex(): string {
  return `<section class="page-header">
  <p class="eyebrow">Posts</p>
  <h1>All published posts</h1>
  <p class="page-lead">Each file in <code>content/post</code> becomes a row in the markdown adapter index.</p>
</section>

<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx:order>newest</htx:order>
<htx:howmany>20</htx:howmany>
<htx>
<div class="stack">
  <htx:each>
  <article class="showcase-card">
    <p class="card-eyebrow">__published_at__</p>
    <h2><a href="/posts/__slug__">__title__</a></h2>
    <p>__summary__</p>
    <p class="meta-line">By __author__</p>
  </article>
  </htx:each>
</div>
<htx:none>
<p>No published posts found.</p>
</htx:none>
</htx>
`;
}

function renderBlogPostDetail(): string {
  return `<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<article class="article-shell">
  <p class="eyebrow">Post</p>
  <h1>__title__</h1>
  <p class="article-meta">By __author__ • __published_at__</p>
  <p class="article-summary">__summary__</p>
  <div class="article-body">__body__</div>
</article>
<p><a href="/posts">Back to posts</a></p>
</htx>
`;
}

function renderDocsHome(): string {
  return `<section class="hero">
  <p class="eyebrow">Markdown Docs</p>
  <h1>Docs from flat files</h1>
  <p>This starter uses markdown files under <code>content/documentation</code> and HTX templates under <code>app/templates/docs</code>.</p>
</section>

<section class="home-section">
  <div class="section-heading">
    <h2>Start reading</h2>
    <p>Open the docs index, inspect the markdown files, and extend the structure section by section.</p>
  </div>
  <p><a class="btn" href="/docs">Open docs</a></p>
</section>
`;
}

function renderDocsOnlyLayout(): string {
  return `<div class="docs-shell">
  <aside class="docs-sidebar">
    <htx:include src="/partials/_docs-nav.htx" />
  </aside>
  <div class="docs-main">
    __content__
  </div>
</div>
`;
}

function renderDocsOnlyIndex(): string {
  return `<section class="page-header">
  <p class="eyebrow">Documentation</p>
  <h1>Product docs</h1>
  <p class="page-lead">These pages are read from markdown files, indexed in memory, and rendered through HTX templates.</p>
</section>

<section class="docs-section">
  <div class="section-heading">
    <h2>Getting Started</h2>
    <p>High-level pages that explain the generated docs starter.</p>
  </div>
  <htx:type>documentation</htx:type>
  <htx:where>status=published,section=getting-started</htx:where>
  <htx:order>oldest</htx:order>
  <htx>
  <div class="stack">
    <htx:each>
    <article class="showcase-card">
      <h3><a href="/docs/__slug__">__title__</a></h3>
      <p>__summary__</p>
    </article>
    </htx:each>
  </div>
  </htx>
</section>

<section class="docs-section">
  <div class="section-heading">
    <h2>Guides</h2>
    <p>Pages that show how markdown content and HTX templates fit together.</p>
  </div>
  <htx:type>documentation</htx:type>
  <htx:where>status=published,section=guides</htx:where>
  <htx:order>oldest</htx:order>
  <htx>
  <div class="stack">
    <htx:each>
    <article class="showcase-card">
      <h3><a href="/docs/__slug__">__title__</a></h3>
      <p>__summary__</p>
    </article>
    </htx:each>
  </div>
  </htx>
</section>
`;
}

function renderDocsOnlyDetail(): string {
  return `<htx:type>documentation</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<article class="article-shell docs-article">
  <p class="eyebrow">__section_label__</p>
  <h1>__title__</h1>
  <p class="article-summary">__summary__</p>
  <div class="docs-body">__body__</div>
</article>
</htx>
`;
}

function renderDocsOnlyNav(): string {
  return `<div class="docs-nav-shell">
  <p class="docs-nav-label">Documentation</p>
  <div class="docs-nav-group">
    <h3>Getting Started</h3>
    <ul>
      <li><a href="/docs/welcome">Welcome</a></li>
      <li><a href="/docs/how-this-works">How This Works</a></li>
    </ul>
  </div>
  <div class="docs-nav-group">
    <h3>Guides</h3>
    <ul>
      <li><a href="/docs/writing-content">Writing Content</a></li>
      <li><a href="/docs/extending-templates">Extending Templates</a></li>
    </ul>
  </div>
</div>
`;
}

function renderMarkdownStyles(): string {
  return `*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.6;
  color: #172033;
  background: #f7f8fc;
}

a {
  color: #2453d4;
}

a:hover {
  color: #183a97;
}

.site-header nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 2rem;
  background: #ffffff;
  border-bottom: 1px solid #dbe3f1;
}

.site-header .logo {
  margin-right: auto;
  font-weight: 700;
  text-decoration: none;
  color: #172033;
}

.site-header a {
  text-decoration: none;
  color: #4b5568;
}

.site-main {
  max-width: 1080px;
  margin: 0 auto;
  padding: 2rem;
}

.site-footer {
  text-align: center;
  padding: 2rem;
  color: #667289;
}

.eyebrow,
.card-eyebrow,
.docs-nav-label {
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  font-weight: 700;
  color: #2453d4;
}

.hero,
.page-header,
.home-section,
.docs-section {
  margin-bottom: 2rem;
}

.hero h1,
.page-header h1,
.article-shell h1 {
  margin: 0 0 0.75rem;
  font-size: 2.4rem;
  line-height: 1.1;
}

.page-lead,
.article-summary,
.section-heading p,
.meta-line,
.article-meta {
  color: #5d6980;
}

.stack {
  display: grid;
  gap: 1rem;
}

.showcase-card,
.article-shell,
.docs-nav-shell {
  background: #ffffff;
  border: 1px solid #dbe3f1;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(23, 32, 51, 0.04);
}

.showcase-card,
.docs-nav-shell {
  padding: 1.25rem;
}

.article-shell {
  padding: 2rem;
}

.article-body,
.docs-body {
  margin-top: 1.5rem;
}

.article-body p,
.docs-body p {
  margin-top: 0;
  margin-bottom: 1rem;
}

.docs-body code {
  padding: 0.12rem 0.35rem;
  background: #eef3fb;
  border-radius: 0.35rem;
  font-size: 0.92em;
}

.docs-shell {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 2rem;
}

.docs-sidebar {
  position: sticky;
  top: 1.5rem;
  align-self: start;
}

.docs-nav-group + .docs-nav-group {
  margin-top: 1rem;
}

.docs-nav-group h3 {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
}

.docs-nav-group ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.docs-nav-group li + li {
  margin-top: 0.45rem;
}

.docs-nav-group a {
  color: #4b5568;
  text-decoration: none;
}

.btn {
  display: inline-block;
  padding: 0.7rem 1.2rem;
  border-radius: 0.75rem;
  background: #2453d4;
  color: #ffffff;
  text-decoration: none;
}

@media (max-width: 960px) {
  .docs-shell {
    grid-template-columns: 1fr;
  }

  .docs-sidebar {
    position: static;
  }
}
`;
}

function standardProjectFiles(includePublicDir = true): ScaffoldFile[] {
  const files: ScaffoldFile[] = [];

  if (includePublicDir) {
    files.push(["app/public/.gitkeep", ""]);
  }

  files.push(
    ["app/data/.gitkeep", ""],
    [
      ".gitignore",
      `node_modules/
app/data/*.sqlite
app/data/*.db
`,
    ],
  );

  return files;
}

function markdownSiteFiles(projectName: string, options: MarkdownSiteOptions): ScaffoldFile[] {
  return [
    ["app/templates/_layout.htx", renderMarkdownAppLayout(projectName)],
    ["app/templates/partials/_nav.htx", renderMarkdownNav(projectName, options.navLinks)],
    ["app/templates/partials/_footer.htx", renderFooter()],
    ["app/public/css/style.css", renderMarkdownStyles()],
    ...options.extraFiles,
    ...standardProjectFiles(),
  ];
}

function blogFiles(projectName: string): ScaffoldFile[] {
  return markdownSiteFiles(projectName, {
    navLinks: [["/posts", "Posts"]],
    extraFiles: [
      ["app/templates/index.htx", renderBlogHome()],
      ["app/templates/posts/index.htx", renderBlogPostsIndex()],
      ["app/templates/posts/[slug].htx", renderBlogPostDetail()],
      [
        "content/post/why-flat-file-blogging-fits-htx.md",
        `---
title: Why Flat File Blogging Fits HTX
slug: why-flat-file-blogging-fits-htx
summary: Markdown files make a strong fit for read-only blogs powered by HTX routes.
author: HTX Team
status: published
published_at: 2026-04-01 09:00:00
---
HTX works well with flat-file blogs because routes and templates stay simple while the content adapter handles indexing and filtering.

This post is read from markdown, rendered into <strong>body_html</strong>, and inserted through the normal HTX read pipeline.
`,
      ],
      [
        "content/post/how-front-matter-becomes-content-rows.md",
        `---
title: How Front Matter Becomes Content Rows
slug: how-front-matter-becomes-content-rows
summary: Front matter keys become row fields that HTX templates can query directly.
author: HTX Team
status: published
published_at: 2026-04-02 10:15:00
---
The markdown adapter turns front matter into row fields like title, slug, summary, author, and published_at.

That means HTX templates can filter and sort markdown content using the same read primitives used by the SQLite adapter.
`,
      ],
      [
        "content/post/draft-post.md",
        `---
title: Draft Post
slug: draft-post
summary: This post should stay out of the public listing until it is published.
author: HTX Team
status: draft
published_at: 2026-04-03 08:00:00
---
This markdown file exists so the starter demonstrates published filtering by default.
`,
      ],
    ],
  });
}

function docsFiles(projectName: string): ScaffoldFile[] {
  return markdownSiteFiles(projectName, {
    navLinks: [["/docs", "Docs"]],
    extraFiles: [
      ["app/templates/index.htx", renderDocsHome()],
      ["app/templates/docs/_layout.htx", renderDocsOnlyLayout()],
      ["app/templates/docs/index.htx", renderDocsOnlyIndex()],
      ["app/templates/docs/[slug].htx", renderDocsOnlyDetail()],
      ["app/templates/partials/_docs-nav.htx", renderDocsOnlyNav()],
      [
        "content/documentation/welcome.md",
        `---
title: Welcome
slug: welcome
summary: Start here to understand the markdown-backed docs starter.
section: getting-started
section_label: Getting Started
status: published
order: 1
---
Welcome to the docs starter.

These pages are read from markdown files under <code>content/documentation</code> and rendered through HTX templates.
`,
      ],
      [
        "content/documentation/how-this-works.md",
        `---
title: How This Works
slug: how-this-works
summary: Learn how the markdown adapter, HTX templates, and content root fit together.
section: getting-started
section_label: Getting Started
status: published
order: 2
---
The CLI runtime reads your HTX templates from <code>app/templates</code> and markdown content from <code>content</code>.

The markdown adapter indexes files, parses front matter, renders markdown into HTML, and returns rows to the engine.
`,
      ],
      [
        "content/documentation/writing-content.md",
        `---
title: Writing Content
slug: writing-content
summary: Use front matter for metadata and markdown for the body.
section: guides
section_label: Guides
status: published
order: 3
---
Each markdown file can include front matter fields like title, summary, section, and order.

The body stays in markdown source form while the adapter also exposes a rendered <code>body_html</code> value.
`,
      ],
      [
        "content/documentation/extending-templates.md",
        `---
title: Extending Templates
slug: extending-templates
summary: Add your own layouts, index pages, and detail routes as the docs grow.
section: guides
section_label: Guides
status: published
order: 4
---
You can add more HTX files, split docs into additional sections, and style them however you want.

The markdown adapter stays focused on read-only content while HTX handles routing and rendering.
`,
      ],
    ],
  });
}

function cmsFiles(projectName: string): ScaffoldFile[] {
  return [
    ["app/config.ts", renderAppConfig()],
    ["app/public/index.ts", renderAppRuntime()],
    ["app/admin-auth.ts", renderAdminAuth()],
    ["app/admin-host.ts", renderAdminHost()],
    ["app/seed-content.ts", renderSeedContent()],
    ["app/seed.ts", renderSeedScript()],
    ["app/templates/_layout.htx", renderRootLayout(projectName)],
    ["app/templates/index.htx", renderHomePage()],
    ["app/templates/posts/index.htx", renderPostsIndex()],
    ["app/templates/posts/[slug].htx", renderPostDetail()],
    ["app/templates/pages/[slug].htx", renderPageDetail()],
    ["app/templates/docs/_layout.htx", renderDocsLayout()],
    ["app/templates/docs/index.htx", renderDocsIndex()],
    ["app/templates/docs/[slug].htx", renderDocsDetail()],
    ["app/templates/partials/_docs-nav.htx", renderDocsNav()],
    ["app/templates/admin/_layout.htx", renderAdminLayout()],
    ["app/templates/admin/login/_layout.htx", renderAdminLoginLayout()],
    ["app/templates/admin/login/index.htx", renderAdminLogin()],
    ["app/templates/admin/index.htx", renderAdminIndex()],
    ["app/templates/admin/posts/index.htx", renderAdminPostsIndex()],
    ["app/templates/admin/posts/new.htx", renderAdminPostsNew()],
    ["app/templates/admin/posts/[id]/edit.htx", renderAdminPostsEdit()],
    ["app/templates/admin/posts/[id]/delete.htx", renderAdminPostsDelete()],
    ["app/templates/admin/pages/index.htx", renderAdminPagesIndex()],
    ["app/templates/admin/pages/new.htx", renderAdminPagesNew()],
    ["app/templates/admin/pages/[id]/edit.htx", renderAdminPagesEdit()],
    ["app/templates/admin/pages/[id]/delete.htx", renderAdminPagesDelete()],
    ["app/templates/admin/docs/index.htx", renderAdminDocsIndex()],
    ["app/templates/admin/docs/new.htx", renderAdminDocsNew()],
    ["app/templates/admin/docs/[id]/edit.htx", renderAdminDocsEdit()],
    ["app/templates/admin/docs/[id]/delete.htx", renderAdminDocsDelete()],
    ["app/templates/components/card.htx", renderCardComponent()],
    ["app/templates/components/page-header.htx", renderPageHeaderComponent()],
    ...standardProjectFiles(false),
  ];
}

function minimalFiles(projectName: string): ScaffoldFile[] {
  return [
    ["app/templates/_layout.htx", renderMinimalLayout(projectName)],
    ["app/templates/index.htx", renderMinimalHomePage(projectName)],
    ["app/templates/about.htx", renderMinimalAboutPage()],
    ["app/templates/partials/_nav.htx", renderMinimalNav(projectName)],
    ["app/public/css/style.css", renderMinimalStyles()],
    ...standardProjectFiles(),
  ];
}

function filesForVariant(projectName: string, variant: ScaffoldVariant): ScaffoldFile[] {
  switch (variant) {
    case "minimal":
      return minimalFiles(projectName);
    case "blog":
      return blogFiles(projectName);
    case "docs":
      return docsFiles(projectName);
    case "cms":
    default:
      return cmsFiles(projectName);
  }
}

export function scaffoldProject(options: ScaffoldProjectOptions): { projectDir: string } {
  const destinationRoot = options.destinationRoot ?? process.cwd();
  const projectDir = path.resolve(destinationRoot, options.projectName);

  if (existsSync(projectDir)) {
    throw new Error(`Directory '${options.projectName}' already exists.`);
  }

  const packageName = sanitizePackageName(options.projectName);
  const dependencySpecs = dependencySpecsFor(options, projectDir);
  const overrides = options.dependencyMode === "local" ? dependencySpecs : undefined;
  const variant = options.variant ?? "cms";

  console.log(`Creating new HTX project: ${options.projectName} (${variant})`);

  writeFile(
    path.join(projectDir, "package.json"),
    renderPackageJson(packageName, dependencySpecs, variant, overrides),
  );

  writeFile(
    path.join(projectDir, "htx.config.json"),
    renderHtxConfig(options.projectName, variant),
  );

  for (const [relativePath, content] of filesForVariant(options.projectName, variant)) {
    writeFile(path.join(projectDir, relativePath), content);
  }

  console.log("");
  console.log("Project created successfully!");
  console.log("");
  console.log("Next steps:");
  console.log(`  cd ${options.projectName}`);
  console.log("  bun install");
  if (variant === "cms") {
    console.log("  bun run seed");
  }
  console.log("  bun run dev");

  return { projectDir };
}
