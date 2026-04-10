import { timingSafeEqual } from "node:crypto";

import type { AuthContext, CredentialStore } from "../contracts/auth-provider";

export class EnvCredentialStore implements CredentialStore {
  private readonly username: string;
  private readonly password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  validate(username: string, password: string): AuthContext | null {
    const usernameMatch = this.safeEqual(username, this.username);
    const passwordMatch = this.safeEqual(password, this.password);

    if (!usernameMatch || !passwordMatch) {
      return null;
    }

    return { username: this.username, role: "admin" };
  }

  private safeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }

    try {
      return timingSafeEqual(Buffer.from(a), Buffer.from(b));
    } catch {
      return false;
    }
  }
}
