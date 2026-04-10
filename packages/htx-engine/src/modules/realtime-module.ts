import type { Server, ServerWebSocket } from "bun";
import type { MaybePromise, HtxRequest, HtxResponse } from "../runtime/types";
import type { Module } from "../contracts/module";
import type { ModuleRegistry, ContextProvider } from "../contracts/module-registry";
import type { Middleware, NextMiddleware } from "../contracts/middleware";
import { ActionTokenService } from "../security/action-token-service";

// ── Types ──

export interface RealtimeOptions {
  secretKey: string;
  tokenTtl?: number;
  tickInterval?: number;
  resolveUserId: (request: HtxRequest) => MaybePromise<string | null>;
  onMessage?: (ws: ServerWebSocket<RealtimeWsData>, parsed: any, userId: string) => boolean;
  onBinary?: (ws: ServerWebSocket<RealtimeWsData>, data: Buffer, userId: string) => boolean;
}

export interface RealtimeWsData {
  userId: string;
  _interval?: ReturnType<typeof setInterval>;
}

// ── Context Provider ──

class RealtimeContextProvider implements ContextProvider {
  private readonly tokenService: ActionTokenService;
  private readonly resolveUserId: (request: HtxRequest) => MaybePromise<string | null>;

  constructor(
    tokenService: ActionTokenService,
    resolveUserId: (request: HtxRequest) => MaybePromise<string | null>,
  ) {
    this.tokenService = tokenService;
    this.resolveUserId = resolveUserId;
  }

  async resolve(request: HtxRequest): Promise<Record<string, unknown>> {
    const userId = await this.resolveUserId(request);
    if (!userId) return {};

    const issued = await this.tokenService.issue(userId, "websocket");
    return {
      token: issued.token,
      url: `ws://${request.headers?.host ?? "localhost"}/ws`,
    };
  }
}

// ── Token Refresh Middleware ──

class RealtimeTokenRefreshMiddleware implements Middleware {
  private readonly tokenService: ActionTokenService;
  private readonly resolveUserId: (request: HtxRequest) => MaybePromise<string | null>;

  constructor(
    tokenService: ActionTokenService,
    resolveUserId: (request: HtxRequest) => MaybePromise<string | null>,
  ) {
    this.tokenService = tokenService;
    this.resolveUserId = resolveUserId;
  }

  async handle(request: HtxRequest, next: NextMiddleware): Promise<HtxResponse> {
    if (request.path !== "/api/ws/token" || request.method !== "POST") {
      return next(request);
    }

    const userId = await this.resolveUserId(request);
    if (!userId) {
      return {
        status: 401,
        body: JSON.stringify({ error: "Unauthorized" }),
        headers: { "content-type": "application/json" },
      };
    }

    const issued = await this.tokenService.issue(userId, "websocket");
    return {
      status: 200,
      body: JSON.stringify({ token: issued.token, expires_at: issued.expires_at }),
      headers: { "content-type": "application/json" },
    };
  }
}

// ── Publisher ──

export class RealtimePublisher {
  private server: Server<RealtimeWsData> | null = null;

  setServer(server: Server<RealtimeWsData>): void {
    this.server = server;
  }

  broadcast(userId: string, channel: string, data: unknown): void {
    if (!this.server) return;
    const payload = JSON.stringify({ type: "event", channel, data });
    this.server.publish(`user:${userId}:${channel}`, payload);
    this.server.publish("global:activity", payload);
  }

  broadcastGlobal(channel: string, data: unknown): void {
    if (!this.server) return;
    this.server.publish(
      `global:${channel}`,
      JSON.stringify({ type: "event", channel, data }),
    );
  }
}

// ── Module ──

export class RealtimeModule implements Module {
  private readonly tokenService: ActionTokenService;
  private readonly channelTokenService: ActionTokenService;
  private readonly options: RealtimeOptions;
  readonly publisher: RealtimePublisher;

  constructor(options: RealtimeOptions) {
    this.options = options;
    this.tokenService = new ActionTokenService(options.secretKey, options.tokenTtl ?? 60);
    this.channelTokenService = new ActionTokenService(options.secretKey, 120);
    this.publisher = new RealtimePublisher();
  }

  async issueChannelToken(userId: string, moduleName: string) {
    return this.channelTokenService.issue(userId, `channel:${moduleName}`);
  }

  name(): string {
    return "realtime";
  }

  boot(registry: ModuleRegistry): void {
    registry.registerContextProvider(
      "ws",
      new RealtimeContextProvider(this.tokenService, this.options.resolveUserId),
    );
    registry.registerMiddleware(
      new RealtimeTokenRefreshMiddleware(this.tokenService, this.options.resolveUserId),
    );
  }

  setServer(server: Server<RealtimeWsData>): void {
    this.publisher.setServer(server);
    setInterval(() => {
      this.publisher.broadcastGlobal("time", {
        time: new Date().toISOString(),
        uptime: Math.floor(process.uptime()),
      });
    }, 5000);
  }

  async handleUpgrade(request: Request, server: Server<RealtimeWsData>): Promise<Response | undefined> {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    let userId = "anonymous";

    if (token) {
      try {
        const claims = await this.tokenService.validate(token, "websocket");
        userId = claims.sub;
      } catch {
        // Invalid token — connect as anonymous
      }
    }

    if (server.upgrade(request, { data: { userId } as RealtimeWsData })) {
      return undefined;
    }
    return new Response("WebSocket upgrade failed", { status: 500 });
  }

  getWebSocketConfig() {
    const tickInterval = this.options.tickInterval ?? 1000;
    const onMessage = this.options.onMessage;
    const onBinary = this.options.onBinary;

    return {
      open(ws: ServerWebSocket<RealtimeWsData>) {
        const userId = ws.data?.userId ?? "anonymous";
        ws.subscribe(`user:${userId}:activity`);
        ws.subscribe("global:time");
        ws.subscribe("global:activity");

        const interval = setInterval(() => {
          ws.send(JSON.stringify({
            type: "tick",
            time: new Date().toISOString(),
            user: userId,
          }));
        }, tickInterval);
        ws.data._interval = interval;
      },

      message(ws: ServerWebSocket<RealtimeWsData>, msg: string | Buffer) {
        const userId = ws.data?.userId ?? "anonymous";

        // Binary frame — delegate to app
        if (typeof msg !== "string") {
          if (onBinary) onBinary(ws, msg as Buffer, userId);
          return;
        }

        // Text frame — JSON protocol
        try {
          const parsed = JSON.parse(msg);

          // App-specific handler gets first pass
          if (onMessage && onMessage(ws, parsed, userId)) return;

          if (parsed.type === "subscribe" && parsed.channel) {
            const topic = `user:${userId}:${parsed.channel}`;
            ws.subscribe(topic);
            ws.send(JSON.stringify({ type: "subscribed", channel: parsed.channel, topic }));
          } else if (parsed.type === "unsubscribe" && parsed.channel) {
            const topic = `user:${userId}:${parsed.channel}`;
            ws.unsubscribe(topic);
            ws.send(JSON.stringify({ type: "unsubscribed", channel: parsed.channel }));
          } else {
            ws.send(JSON.stringify({ type: "echo", data: msg }));
          }
        } catch {
          ws.send(JSON.stringify({ type: "echo", data: msg }));
        }
      },

      close(ws: ServerWebSocket<RealtimeWsData>) {
        if (ws.data?._interval) clearInterval(ws.data._interval);
      },
    };
  }
}
