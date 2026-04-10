import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { expect, test } from "bun:test";

import {
  AdapterRegistry,
  ComponentResolver,
  DSLParser,
  ExpressionEngine,
  GetContentExecutor,
  HttpHost,
  Hydrator,
  IncludeResolver,
  LayoutResolver,
  LetResolver,
  RequestHandler,
  Router,
} from "../src";
import { InMemoryAdapter } from "./helpers/in-memory-adapter";

function createFixtureDir(): string {
  return mkdtempSync(path.join(os.tmpdir(), "htx-http-host-"));
}

function writeFile(root: string, relativePath: string, content: string): void {
  const filePath = path.join(root, relativePath);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);
}

function createHandler(root: string): RequestHandler {
  const parser = new DSLParser();
  const expressionEngine = new ExpressionEngine();
  const hydrator = new Hydrator();
  const router = new Router();
  const includeResolver = new IncludeResolver();
  const registry = new AdapterRegistry({ default: new InMemoryAdapter() });

  return new RequestHandler(
    router,
    parser,
    expressionEngine,
    hydrator,
    registry,
    new LayoutResolver(),
    includeResolver,
    new LetResolver(expressionEngine),
    new ComponentResolver(root, expressionEngine, includeResolver),
    new GetContentExecutor(parser, registry, hydrator, expressionEngine),
    root,
  );
}

test("http host serves static files before HTX routing", async () => {
  const root = createFixtureDir();

  try {
    writeFile(root, "public/style.css", "body { color: red; }");
    writeFile(root, "index.htx", "<p>Dynamic page</p>");

    const host = new HttpHost(createHandler(root), path.join(root, "public"));
    const response = await host.handle(new Request("http://example.test/style.css"));

    expect(response.status).toBe(200);
    expect(await response.text()).toContain("color: red");
    expect(response.headers.get("content-type")).toContain("text/css");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("http host maps web requests into handler requests", async () => {
  const root = createFixtureDir();

  try {
    writeFile(root, "_layout.htx", "__content__");
    writeFile(root, "index.htx", "<p>{{ query.name }}</p>");

    const host = new HttpHost(createHandler(root), path.join(root, "public"));
    const response = await host.handle(new Request("http://example.test/?name=Jared"));

    expect(response.status).toBe(200);
    expect(await response.text()).toContain("<p>Jared</p>");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
