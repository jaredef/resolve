import { betterAuth } from "better-auth";
import { Kysely } from "kysely";
import { BunSqliteDialect } from "kysely-bun-sqlite";
import { Database } from "bun:sqlite";

import type {
  Module,
  ModuleRegistry,
  Middleware,
  NextMiddleware,
  ContextProvider,
  TemplateProcessor,
  ProcessResult,
  HtxRequest,
  HtxResponse,
  MaybePromise,
} from "@htx/engine";

interface BetterAuthModuleOptions {
  databasePath: string;
  baseURL?: string;
  secret?: string;
  socialProviders?: Record<string, { clientId: string; clientSecret: string }>;
  logoutField?: string;
  requireAuth?: boolean;
  loginPath?: string;
  disableSignup?: boolean;
}

// ── Middleware: mount better-auth handler + logout ──

class BetterAuthMiddleware implements Middleware {
  private readonly auth: ReturnType<typeof betterAuth>;
  private readonly logoutField: string;
  private readonly disableSignup: boolean;

  constructor(auth: ReturnType<typeof betterAuth>, logoutField: string, disableSignup = false) {
    this.auth = auth;
    this.logoutField = logoutField;
    this.disableSignup = disableSignup;
  }

  async handle(request: HtxRequest, next: (req: HtxRequest) => MaybePromise<HtxResponse>): Promise<HtxResponse> {
    // Handle logout POST
    if (request.method === "POST" && request.body[this.logoutField] === "true") {
      if (request.raw) {
        try {
          const response = await this.auth.handler(new Request(request.raw.url + "/api/auth/sign-out", {
            method: "POST",
            headers: request.raw.headers,
          }));
          const redirect = String(request.body[`${this.logoutField}-redirect`] ?? "/");
          const cookies = response.headers.getSetCookie?.() ?? [];
          return {
            status: 302,
            body: "",
            headers: { Location: redirect },
            cookies,
          };
        } catch {
          return { status: 302, body: "", headers: { Location: "/" } };
        }
      }
      return { status: 302, body: "", headers: { Location: String(request.body[`${this.logoutField}-redirect`] ?? "/") } };
    }

    // Block signup when disabled
    if (this.disableSignup && request.path.startsWith("/api/auth/sign-up")) {
      return {
        status: 403,
        body: JSON.stringify({ error: "Signups are currently disabled." }),
        headers: { "Content-Type": "application/json" },
      };
    }

    // Route /api/auth/* to better-auth
    if (request.path.startsWith("/api/auth/") || request.path === "/api/auth") {
      if (!request.raw) {
        return next(request);
      }

      try {
        // Clone the request with fresh body for better-auth (HttpHost already consumed the original body)
        const freshRequest = new Request(request.raw.url, {
          method: request.raw.method,
          headers: request.raw.headers,
          body: request.method !== "GET" && request.method !== "HEAD"
            ? JSON.stringify(request.body)
            : undefined,
        });
        const response = await this.auth.handler(freshRequest);
        const body = await response.text();
        const headers: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          if (key.toLowerCase() !== "set-cookie") {
            headers[key] = value;
          }
        });
        const cookies = response.headers.getSetCookie?.() ?? [];

        return {
          status: response.status,
          body,
          headers,
          cookies,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`[HTX] BetterAuth error: ${message}`);
        return next(request);
      }
    }

    return next(request);
  }
}

// ── Context Provider: resolve session ──

class BetterAuthContextProvider implements ContextProvider {
  private readonly auth: ReturnType<typeof betterAuth>;

  constructor(auth: ReturnType<typeof betterAuth>) {
    this.auth = auth;
  }

  async resolve(request: HtxRequest): Promise<Record<string, unknown>> {
    if (!request.raw) return {};

    try {
      const session = await this.auth.api.getSession({
        headers: request.raw.headers,
      });

      if (!session?.user) return {};

      return {
        username: session.user.name ?? session.user.email ?? "",
        email: session.user.email ?? "",
        name: session.user.name ?? "",
        id: session.user.id,
        image: session.user.image ?? "",
        authenticated: true,
      };
    } catch {
      return {};
    }
  }
}

// ── Template Processor: htx:auth / htx:auth-none ──

class BetterAuthTemplateProcessor implements TemplateProcessor {
  process(content: string, data: Record<string, unknown>, _phase: "pre-layout" | "post-layout"): ProcessResult {
    const authData = data.auth as Record<string, unknown> | undefined;
    const isAuthenticated = authData && authData.authenticated === true;

    if (!isAuthenticated) {
      const match = content.match(/<htx:auth\s+redirect="([^"]*)"[^>]*\/>/);
      if (match) {
        return { content, redirect: match[1] };
      }
    }

    let output = content;
    output = output.replace(/<htx:auth\s+redirect="[^"]*"[^>]*\/>/g, "");

    if (isAuthenticated) {
      output = output.replace(/<htx:auth-none>[\s\S]*?<\/htx:auth-none>/gs, "");
      output = output.replace(/<htx:auth>/g, "").replace(/<\/htx:auth>/g, "");
    } else {
      output = output.replace(/<htx:auth>[\s\S]*?<\/htx:auth>/gs, "");
      output = output.replace(/<htx:auth-none>/g, "").replace(/<\/htx:auth-none>/g, "");
    }

    return { content: output };
  }
}

// ── Site-Wide Auth Gate ──

class AuthGateMiddleware implements Middleware {
  private readonly auth: ReturnType<typeof betterAuth>;
  private readonly loginPath: string;

  constructor(auth: ReturnType<typeof betterAuth>, loginPath: string) {
    this.auth = auth;
    this.loginPath = loginPath;
  }

  async handle(request: HtxRequest, next: (req: HtxRequest) => MaybePromise<HtxResponse>): Promise<HtxResponse> {
    // Allow auth API routes and login page through
    if (
      request.path.startsWith("/api/auth") ||
      request.path === this.loginPath ||
      request.path.startsWith(this.loginPath + "/")
    ) {
      return next(request);
    }

    // Check if user is authenticated
    if (!request.raw) return next(request);

    try {
      const session = await this.auth.api.getSession({
        headers: request.raw.headers,
      });
      if (session?.user) {
        return next(request);
      }
    } catch {}

    // Not authenticated — redirect to login
    return {
      status: 302,
      body: "",
      headers: { Location: this.loginPath },
    };
  }
}

// ── The Module ──

export class BetterAuthModule implements Module {
  private readonly options: BetterAuthModuleOptions;
  private auth!: ReturnType<typeof betterAuth>;

  constructor(options: BetterAuthModuleOptions) {
    this.options = options;
  }

  name(): string {
    return "better-auth";
  }

  boot(registry: ModuleRegistry): void {
    const sqlite = new Database(this.options.databasePath);
    const db = new Kysely({ dialect: new BunSqliteDialect({ database: sqlite }) });

    const authConfig: Parameters<typeof betterAuth>[0] = {
      database: {
        db,
        type: "sqlite",
      } as any,
      baseURL: this.options.baseURL ?? "http://localhost:3000",
      secret: this.options.secret,
      trustedOrigins: [this.options.baseURL ?? "http://localhost:3000"],
      emailAndPassword: {
        enabled: true,
      },
    };

    if (this.options.socialProviders) {
      authConfig.socialProviders = {};
      for (const [provider, config] of Object.entries(this.options.socialProviders)) {
        (authConfig.socialProviders as Record<string, unknown>)[provider] = config;
      }
    }

    this.auth = betterAuth(authConfig);

    const logoutField = this.options.logoutField ?? "htx-logout";

    registry.registerMiddleware(new BetterAuthMiddleware(this.auth, logoutField, this.options.disableSignup));

    if (this.options.requireAuth) {
      registry.registerMiddleware(new AuthGateMiddleware(this.auth, this.options.loginPath ?? "/admin/login"));
    }

    registry.registerContextProvider("auth", new BetterAuthContextProvider(this.auth));
    registry.registerTemplateProcessor(new BetterAuthTemplateProcessor());
  }
}
