import { expect, test } from "bun:test";

import type {
  ActionTokenClaims,
  ExecutionContext,
  HtxRequest,
  HtxResponse,
  QueryMeta,
  QueryResult,
  ReplayGuard,
} from "../src";
import { InMemoryAdapter } from "./helpers/in-memory-adapter";

test("shared contracts preserve the PHP query shape", () => {
  const adapter = new InMemoryAdapter();
  const meta: QueryMeta = { type: "post", where: "status=published", howmany: 10 };
  const result: QueryResult = adapter.query(meta);

  expect(Array.isArray(result.rows)).toBe(true);
  expect(typeof result.total).toBe("number");
});

test("runtime request and response types support the handler shape", () => {
  const request: HtxRequest = {
    method: "GET",
    path: "/blog",
    headers: {},
    body: {},
    query: {},
  };
  const response: HtxResponse = {
    status: 200,
    body: "<h1>ok</h1>",
    headers: { "Content-Type": "text/html; charset=UTF-8" },
  };
  const context: ExecutionContext = {
    method: request.method,
    path: request.path,
    headers: request.headers,
    body: request.body,
    query: request.query,
    routeParams: {},
    currentPath: request.path,
  };

  expect(response.status).toBe(200);
  expect(context.currentPath).toBe("/blog");
});

test("security contracts support async-aware token validation", async () => {
  const claims: ActionTokenClaims = {
    sub: "site:1",
    jti: "token-1",
    "htx-context": "save",
    "htx-recordId": null,
  };
  const replayGuard: ReplayGuard = {
    isReplayed: async (jti) => jti === "used",
    markUsed: async () => {},
    cleanup: async () => 0,
  };

  expect(claims["htx-context"]).toBe("save");
  await expect(replayGuard.isReplayed("fresh")).resolves.toBe(false);
});
