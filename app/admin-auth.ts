import { createHmac, timingSafeEqual } from "node:crypto";

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
    return `${payload}.${signature}`;
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
      `${this.cookieName}=${value}`,
      "Path=/",
      "HttpOnly",
      `SameSite=${this.sameSite}`,
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
