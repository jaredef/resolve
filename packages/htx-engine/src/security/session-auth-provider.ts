import { createHmac, timingSafeEqual } from "node:crypto";

import type { AuthProvider, AuthContext, AuthResult, LogoutResult, CredentialStore } from "../contracts/auth-provider";
import type { HtxRequest } from "../runtime/types";

interface SessionAuthProviderOptions {
  secret: string;
  ttlSeconds?: number;
  cookieName?: string;
  secureCookies?: boolean;
  sameSite?: "Lax" | "Strict";
}

interface SessionClaims {
  sub: string;
  exp: number;
  [key: string]: unknown;
}

export class SessionAuthProvider implements AuthProvider {
  private readonly secret: string;
  private readonly ttlSeconds: number;
  private readonly cookieName: string;
  private readonly secureCookies: boolean;
  private readonly sameSite: "Lax" | "Strict";
  private readonly credentialStore: CredentialStore;

  constructor(credentialStore: CredentialStore, options: SessionAuthProviderOptions) {
    this.credentialStore = credentialStore;
    this.secret = options.secret;
    this.ttlSeconds = options.ttlSeconds ?? 43200;
    this.cookieName = options.cookieName ?? "htx_session";
    this.secureCookies = options.secureCookies ?? false;
    this.sameSite = options.sameSite ?? "Lax";
  }

  resolve(request: HtxRequest): AuthContext | null {
    const token = request.cookies?.[this.cookieName];
    if (!token) {
      return null;
    }

    return this.validateSession(token);
  }

  async login(credentials: Record<string, unknown>): Promise<AuthResult | null> {
    const username = String(credentials.username ?? "");
    const password = String(credentials.password ?? "");

    if (!username || !password) {
      return null;
    }

    const context = await Promise.resolve(this.credentialStore.validate(username, password));
    if (!context) {
      return null;
    }

    const token = this.issueSession(context);
    return {
      context,
      setCookie: this.formatCookie(token, false),
    };
  }

  logout(): LogoutResult {
    return {
      setCookie: this.formatCookie("", true),
    };
  }

  private issueSession(context: AuthContext): string {
    const claims: SessionClaims = {
      sub: String(context.username ?? ""),
      exp: Math.floor(Date.now() / 1000) + this.ttlSeconds,
      ...context,
    };

    const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
    const signature = this.sign(payload);
    return `${payload}.${signature}`;
  }

  private validateSession(token: string): AuthContext | null {
    const dotIndex = token.indexOf(".");
    if (dotIndex === -1) {
      return null;
    }

    const payload = token.slice(0, dotIndex);
    const signature = token.slice(dotIndex + 1);
    const expected = this.sign(payload);

    if (signature.length !== expected.length) {
      return null;
    }

    try {
      if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
        return null;
      }
    } catch {
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

    const { sub, exp, ...rest } = claims;
    return { username: sub, ...rest };
  }

  private sign(payload: string): string {
    return createHmac("sha256", this.secret).update(payload).digest("base64url");
  }

  private formatCookie(value: string, expired: boolean): string {
    const parts = [
      `${this.cookieName}=${value}`,
      "Path=/",
      "HttpOnly",
      `SameSite=${this.sameSite}`,
      expired ? "Max-Age=0" : `Max-Age=${this.ttlSeconds}`,
    ].filter(Boolean);

    if (this.secureCookies) {
      parts.push("Secure");
    }

    return parts.join("; ");
  }
}
