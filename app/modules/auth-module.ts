import type {
  Module,
  ModuleRegistry,
  Middleware,
  NextMiddleware,
  ContextProvider,
  TemplateProcessor,
  ProcessResult,
  MutationActionHandler,
  MutationResult,
  HtxRequest,
  HtxResponse,
  HtxBody,
  MaybePromise,
} from "@htx/engine";

import { SessionAuthProvider } from "@htx/engine";
import type { AuthContext, CredentialStore } from "@htx/engine";
import type { SetContentExecutor } from "@htx/engine";

interface AuthModuleOptions {
  secret: string;
  cookieName?: string;
  ttlSeconds?: number;
  secureCookies?: boolean;
  sameSite?: "Lax" | "Strict";
  logoutField?: string;
}

// ── Middleware: handles logout POST ──

class AuthMiddleware implements Middleware {
  private readonly provider: SessionAuthProvider;
  private readonly logoutField: string;

  constructor(provider: SessionAuthProvider, logoutField: string) {
    this.provider = provider;
    this.logoutField = logoutField;
  }

  handle(request: HtxRequest, next: (req: HtxRequest) => MaybePromise<HtxResponse>): MaybePromise<HtxResponse> {
    if (request.method === "POST" && request.body[this.logoutField] === "true") {
      const result = this.provider.logout();
      const redirect = String(request.body[`${this.logoutField}-redirect`] ?? "/");
      return {
        status: 302,
        body: "",
        headers: { Location: redirect },
        cookies: [result.setCookie],
      };
    }

    return next(request);
  }
}

// ── Context Provider: resolves session from cookie ──

class AuthContextProvider implements ContextProvider {
  private readonly provider: SessionAuthProvider;

  constructor(provider: SessionAuthProvider) {
    this.provider = provider;
  }

  resolve(request: HtxRequest): Record<string, unknown> {
    const context = this.provider.resolve(request);
    return context ?? {};
  }
}

// ── Template Processor: htx:auth, htx:auth-none, htx:auth redirect ──

class AuthTemplateProcessor implements TemplateProcessor {
  private readonly provider: SessionAuthProvider;

  constructor(provider: SessionAuthProvider) {
    this.provider = provider;
  }

  process(content: string, data: Record<string, unknown>, phase: "pre-layout" | "post-layout"): ProcessResult {
    const authContext = data.auth as AuthContext | null | undefined;
    const isAuthenticated = authContext && Object.keys(authContext).length > 0;

    // Check for redirect directive
    if (!isAuthenticated) {
      const match = content.match(/<htx:auth\s+redirect="([^"]*)"[^>]*\/>/);
      if (match) {
        return { content, redirect: match[1] };
      }
    }

    let output = content;

    // Remove redirect directives (they've been checked)
    output = output.replace(/<htx:auth\s+redirect="[^"]*"[^>]*\/>/g, "");

    if (isAuthenticated) {
      // Authenticated: remove htx:auth-none blocks, unwrap htx:auth blocks
      output = output.replace(/<htx:auth-none>[\s\S]*?<\/htx:auth-none>/gs, "");
      output = output.replace(/<htx:auth>/g, "").replace(/<\/htx:auth>/g, "");
    } else {
      // Not authenticated: remove htx:auth blocks, unwrap htx:auth-none blocks
      output = output.replace(/<htx:auth>[\s\S]*?<\/htx:auth>/gs, "");
      output = output.replace(/<htx:auth-none>/g, "").replace(/<\/htx:auth-none>/g, "");
    }

    return { content: output };
  }
}

// ── Mutation Handler: login action ──

class AuthMutationHandler implements MutationActionHandler {
  private readonly provider: SessionAuthProvider;
  private readonly setExecutor: SetContentExecutor | null;

  constructor(provider: SessionAuthProvider, setExecutor: SetContentExecutor | null) {
    this.provider = provider;
    this.setExecutor = setExecutor;
  }

  actions(): string[] {
    return ["login"];
  }

  async prepare(action: string, meta: Record<string, unknown>, template: string, sub: string): Promise<MutationResult> {
    if (!this.setExecutor) {
      return { html: '<div class="error">Auth support not configured.</div>' };
    }

    const directives = Object.entries(meta)
      .filter(([, value]) => value !== null && value !== "")
      .map(([key, value]) => `<htx:${key}>${value}</htx:${key}>`)
      .join("\n");
    const dsl = `${directives}${directives ? "\n" : ""}<htx>\n${template}\n</htx>`;

    const result = await this.setExecutor.prepare(dsl, sub, {}, false);
    return { html: result.html };
  }

  async execute(action: string, body: HtxBody, responseTemplates: Record<string, string>): Promise<MutationResult> {
    const authResult = await Promise.resolve(this.provider.login(body));
    if (!authResult) {
      const errorTemplate = responseTemplates.error ?? '<div class="error">Invalid credentials.</div>';
      return { html: errorTemplate };
    }

    const redirectUrl = responseTemplates.redirect ?? "/";
    return {
      html: "",
      redirect: redirectUrl,
      cookies: [authResult.setCookie],
    };
  }
}

// ── The Module ──

export class AuthModule implements Module {
  private readonly credentialStore: CredentialStore;
  private readonly options: AuthModuleOptions;
  private provider!: SessionAuthProvider;
  private setExecutor: SetContentExecutor | null;

  constructor(credentialStore: CredentialStore, options: AuthModuleOptions, setExecutor: SetContentExecutor | null = null) {
    this.credentialStore = credentialStore;
    this.options = options;
    this.setExecutor = setExecutor;
  }

  name(): string {
    return "auth";
  }

  boot(registry: ModuleRegistry): void {
    this.provider = new SessionAuthProvider(this.credentialStore, {
      secret: this.options.secret,
      cookieName: this.options.cookieName,
      ttlSeconds: this.options.ttlSeconds,
      secureCookies: this.options.secureCookies,
      sameSite: this.options.sameSite,
    });

    const logoutField = this.options.logoutField ?? "htx-logout";

    registry.registerMiddleware(new AuthMiddleware(this.provider, logoutField));
    registry.registerContextProvider("auth", new AuthContextProvider(this.provider));
    registry.registerTemplateProcessor(new AuthTemplateProcessor(this.provider));
    registry.registerMutationHandler(new AuthMutationHandler(this.provider, this.setExecutor));
  }
}
