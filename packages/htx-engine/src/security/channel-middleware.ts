import type { ChannelHandler } from "../contracts/channel-handler";
import type { Middleware, NextMiddleware } from "../contracts/middleware";
import type { HtxRequest, HtxResponse } from "../runtime/types";
import { ActionTokenService } from "./action-token-service";

export class ChannelMiddleware implements Middleware {
  private readonly tokenService: ActionTokenService;
  private readonly handlers: Map<string, ChannelHandler>;

  constructor(secretKey: string, handlers: Map<string, ChannelHandler>) {
    this.tokenService = new ActionTokenService(secretKey, 120);
    this.handlers = handlers;
  }

  async handle(request: HtxRequest, next: NextMiddleware): Promise<HtxResponse> {
    if (!request.path.startsWith("/api/channel/")) {
      return next(request);
    }

    // Parse: /api/channel/{moduleName}/{subPath...}
    const rest = request.path.slice("/api/channel/".length);
    const slashIdx = rest.indexOf("/");
    const moduleName = slashIdx >= 0 ? rest.slice(0, slashIdx) : rest;
    const subPath = slashIdx >= 0 ? rest.slice(slashIdx + 1) : "";

    // Extract Bearer token
    const authHeader = request.headers?.authorization ?? request.headers?.Authorization ?? "";
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (!match) {
      return {
        status: 401,
        body: JSON.stringify({ error: "Missing Authorization header" }),
        headers: { "content-type": "application/json" },
      };
    }

    // Validate channel token
    let userId: string;
    try {
      const claims = await this.tokenService.validate(match[1], `channel:${moduleName}`);
      userId = claims.sub;
    } catch {
      return {
        status: 401,
        body: JSON.stringify({ error: "Invalid or expired channel token" }),
        headers: { "content-type": "application/json" },
      };
    }

    // Token refresh: POST /api/channel/{module}/token
    if (request.method === "POST" && subPath === "token") {
      const issued = await this.tokenService.issue(userId, `channel:${moduleName}`);
      return {
        status: 200,
        body: JSON.stringify({ token: issued.token, expires_at: issued.expires_at }),
        headers: { "content-type": "application/json" },
      };
    }

    // Route to handler
    const handler = this.handlers.get(moduleName);
    if (!handler) {
      return {
        status: 404,
        body: JSON.stringify({ error: `No channel handler for: ${moduleName}` }),
        headers: { "content-type": "application/json" },
      };
    }

    const result = await handler.handle(subPath, request.query, userId, {
      method: request.method,
      body: request.body,
    });
    return {
      status: result.status,
      body: JSON.stringify(result.data),
      headers: { "content-type": "application/json" },
    };
  }
}
