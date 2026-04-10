import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { expect, test } from "bun:test";

import {
  AdapterRegistry,
  ActionTokenService,
  ComponentResolver,
  DeleteContentExecutor,
  DSLParser,
  ExpressionEngine,
  GetContentExecutor,
  Hydrator,
  IncludeResolver,
  InMemoryReplayGuard,
  LayoutResolver,
  LetResolver,
  RequestHandler,
  Router,
  SetContentExecutor,
} from "../src";
import { InMemoryAdapter } from "./helpers/in-memory-adapter";

const TEST_KEY = "test-secret-key-at-least-32-bytes-long!!";

function createFixtureDir(): string {
  return mkdtempSync(path.join(os.tmpdir(), "htx-request-handler-"));
}

function writeFile(root: string, relativePath: string, content: string): void {
  const filePath = path.join(root, relativePath);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);
}

function createHandler(
  root: string,
  adapter = new InMemoryAdapter(),
  options: { dev?: boolean } = {},
): RequestHandler {
  const parser = new DSLParser();
  const expressionEngine = new ExpressionEngine();
  const hydrator = new Hydrator();
  const router = new Router();
  const layoutResolver = new LayoutResolver();
  const includeResolver = new IncludeResolver();
  const letResolver = new LetResolver(expressionEngine);
  const componentResolver = new ComponentResolver(root, expressionEngine, includeResolver);
  const tokenService = new ActionTokenService(TEST_KEY);
  const replayGuard = new InMemoryReplayGuard();
  const registry = new AdapterRegistry({ default: adapter });
  const getExecutor = new GetContentExecutor(parser, registry, hydrator, expressionEngine, options);
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

  return new RequestHandler(
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
    root,
    setExecutor,
    deleteExecutor,
    options,
  );
}

test("request handler runs the main GET pipeline in PHP order", async () => {
  const root = createFixtureDir();

  try {
    writeFile(root, "_layout.htx", "<!doctype html><html><body>__content__</body></html>");
    writeFile(root, "partials/header.htx", "<header>Logo</header>");
    writeFile(root, "components/badge.htx", '<span class="badge"><htx:slot /></span>');
    writeFile(
      root,
      "index.htx",
      `<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx>
<htx:each><article>{{ title }}</article></htx:each>
</htx>
<htx:include src="/partials/header.htx" />
<htx:let greeting = "Hello" />
<htx:component src="components/badge.htx">Active</htx:component>
<p>{{ greeting }}</p>`,
    );

    const adapter = new InMemoryAdapter();
    adapter.seed("post", [
      { title: "First Post", status: "published" },
      { title: "Draft Post", status: "draft" },
    ]);

    const handler = createHandler(root, adapter);
    const response = await handler.handle({
      method: "GET",
      path: "/",
      headers: {},
      body: {},
      query: {},
    });

    expect(response.status).toBe(200);
    expect(response.body).toContain("<!doctype html>");
    expect(response.body).toContain("<header>Logo</header>");
    expect(response.body).toContain('<span class="badge">Active</span>');
    expect(response.body).toContain("<p>Hello</p>");
    expect(response.body).toContain("<article>First Post</article>");
    expect(response.body).not.toContain("Draft Post");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("request handler preserves nested layouts for htmx but skips the root shell", async () => {
  const root = createFixtureDir();

  try {
    writeFile(root, "_layout.htx", "<!doctype html><html>__content__</html>");
    writeFile(root, "docs/_layout.htx", '<div class="docs">__content__</div>');
    writeFile(root, "docs/page.htx", "<p>Docs page</p>");

    const handler = createHandler(root);
    const response = await handler.handle({
      method: "GET",
      path: "/docs/page",
      headers: { "HX-Request": "true" },
      body: {},
      query: {},
    });

    expect(response.status).toBe(200);
    expect(response.body).toContain('<div class="docs"><p>Docs page</p></div>');
    expect(response.body).not.toContain("<!doctype html>");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("request handler processes blocks in reverse and strips meta directives", async () => {
  const root = createFixtureDir();

  try {
    writeFile(root, "_layout.htx", "__content__");
    writeFile(
      root,
      "index.htx",
      `<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx>
<htx:each><p>{{ title }}</p></htx:each>
</htx>
<htx:type>post</htx:type>
<htx:slug>first-post</htx:slug>
<htx>
<strong>{{ title }}</strong>
</htx>`,
    );

    const adapter = new InMemoryAdapter();
    adapter.seed("post", [
      { title: "First Post", status: "published" },
      { title: "Second Post", status: "published" },
    ]);

    const handler = createHandler(root, adapter);
    const response = await handler.handle({
      method: "GET",
      path: "/",
      headers: {},
      body: {},
      query: {},
    });

    expect(response.status).toBe(200);
    expect(response.body).toContain("<p>First Post</p>");
    expect(response.body).toContain("<p>Second Post</p>");
    expect(response.body).toContain("<strong>First Post</strong>");
    expect(response.body).not.toContain("<htx:type>");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("request handler renders development diagnostics with request and template context", async () => {
  const root = createFixtureDir();

  try {
    writeFile(root, "_layout.htx", "__content__");
    writeFile(root, "index.htx", '<htx:include src="/partials/missing.htx" />');

    const handler = createHandler(root, new InMemoryAdapter(), { dev: true });
    const response = await handler.handle({
      method: "GET",
      path: "/",
      headers: {},
      body: {},
      query: {},
    });

    expect(response.status).toBe(500);
    expect(response.body).toContain("HTX runtime error");
    expect(response.body).toContain("INCLUDE_RESOLUTION_ERROR");
    expect(response.body).toContain("/");
    expect(response.body).toContain(path.join(root, "index.htx"));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("request handler supports orphan POST mutation execution", async () => {
  const root = createFixtureDir();

  try {
    writeFile(root, "_layout.htx", "__content__");
    writeFile(root, "api/content/save.htx", "<p>Mutation endpoint</p>");

    const adapter = new InMemoryAdapter();
    const handler = createHandler(root, adapter);
    const tokenService = new ActionTokenService(TEST_KEY);
    const issued = await tokenService.issue("site:1", "save");

    const response = await handler.handle({
      method: "POST",
      path: "/api/content/save",
      headers: {},
      body: {
        "htx-token": issued.token,
        "htx-context": "save",
        type: "post",
        title: "Created via API",
      },
      query: {},
    });

    expect(response.status).toBe(200);
    expect(adapter.findBySlug("post", "created-via-api")).not.toBeNull();
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("request handler preserves inline escapes and raw blocks as literal output", async () => {
  const root = createFixtureDir();

  try {
    writeFile(root, "_layout.htx", "__content__");
    writeFile(
      root,
      "index.htx",
      `<htx:type>post</htx:type>
<htx:slug>literal-post</htx:slug>
<htx>
<article>__title__</article>
</htx>
<p>Escaped placeholder: \\__title__</p>
<p>Escaped expression: \\{{ title }}</p>
<htx:raw><pre><code><a href="/posts/__slug__">{{ title }}</a></code></pre></htx:raw>`,
    );

    const adapter = new InMemoryAdapter();
    adapter.seed("post", [{ title: "Literal Post", slug: "literal-post" }]);

    const handler = createHandler(root, adapter);
    const response = await handler.handle({
      method: "GET",
      path: "/",
      headers: {},
      body: {},
      query: {},
    });

    expect(response.status).toBe(200);
    expect(response.body).toContain("<article>Literal Post</article>");
    expect(response.body).toContain("<p>Escaped placeholder: __title__</p>");
    expect(response.body).toContain("<p>Escaped expression: {{ title }}</p>");
    expect(response.body).toContain('<pre><code><a href="/posts/__slug__">{{ title }}</a></code></pre>');
    expect(response.body).not.toContain("<htx:raw>");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("request handler renders independent query partials inside a single-record page block", async () => {
  const root = createFixtureDir();

  try {
    writeFile(root, "_layout.htx", "__content__");
    writeFile(
      root,
      "partials/docs-nav.htx",
      `<htx:type>documentation</htx:type>
<htx:where>status=published</htx:where>
<htx:order>oldest</htx:order>
<htx>
<ul class="docs-nav">
  <htx:each><li><a href="/docs/__slug__">__title__</a></li></htx:each>
</ul>
</htx>`,
    );
    writeFile(
      root,
      "docs/[slug].htx",
      `<htx:type>documentation</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<article class="doc-page">
  <aside><htx:include src="/partials/docs-nav.htx" /></aside>
  <main><h1>__title__</h1><div>__body__</div></main>
</article>
</htx>`,
    );

    const adapter = new InMemoryAdapter();
    adapter.seed("documentation", [
      {
        title: "Quick Start",
        slug: "quick-start",
        body_html: "<p>Quick start body</p>",
        status: "published",
      },
      {
        title: "Routing",
        slug: "routing",
        body_html: "<p>Routing body</p>",
        status: "published",
      },
    ]);

    const handler = createHandler(root, adapter);
    const response = await handler.handle({
      method: "GET",
      path: "/docs/quick-start",
      headers: {},
      body: {},
      query: {},
    });

    expect(response.status).toBe(200);
    expect(response.body).toContain("<h1>Quick Start</h1>");
    expect(response.body).toContain('<ul class="docs-nav">');
    expect(response.body).toContain('href="/docs/quick-start"');
    expect(response.body).toContain('href="/docs/routing"');
    expect(response.body).toContain("Routing");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("request handler supports data-driven query partials on index pages", async () => {
  const root = createFixtureDir();

  try {
    writeFile(root, "_layout.htx", "__content__");
    writeFile(
      root,
      "partials/docs-nav.htx",
      `<htx:type>documentation</htx:type>
<htx:where>status=published</htx:where>
<htx:order>oldest</htx:order>
<htx>
<nav class="docs-nav"><htx:each><a href="/docs/__slug__">__title__</a></htx:each></nav>
</htx>`,
    );
    writeFile(
      root,
      "docs/index.htx",
      `<div class="docs-index">
  <aside><htx:include src="/partials/docs-nav.htx" /></aside>
  <section>
    <htx:type>documentation</htx:type>
    <htx:where>status=published</htx:where>
    <htx:order>oldest</htx:order>
    <htx>
    <htx:each><article>__title__</article></htx:each>
    </htx>
  </section>
</div>`,
    );

    const adapter = new InMemoryAdapter();
    adapter.seed("documentation", [
      { title: "Quick Start", slug: "quick-start", status: "published" },
      { title: "Routing", slug: "routing", status: "published" },
    ]);

    const handler = createHandler(root, adapter);
    const response = await handler.handle({
      method: "GET",
      path: "/docs",
      headers: {},
      body: {},
      query: {},
    });

    expect(response.status).toBe(200);
    expect(response.body).toContain('<nav class="docs-nav">');
    expect(response.body).toContain('href="/docs/quick-start"');
    expect(response.body).toContain('href="/docs/routing"');
    expect(response.body).toContain("<article>Quick Start</article>");
    expect(response.body).toContain("<article>Routing</article>");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("request handler executes query blocks introduced by layout includes", async () => {
  const root = createFixtureDir();

  try {
    writeFile(
      root,
      "_layout.htx",
      `<div class="shell">
  <aside><htx:include src="/partials/docs-nav.htx" /></aside>
  <main>__content__</main>
</div>`,
    );
    writeFile(
      root,
      "partials/docs-nav.htx",
      `<htx:type>documentation</htx:type>
<htx:where>status=published</htx:where>
<htx:order>oldest</htx:order>
<htx>
<nav class="docs-nav"><htx:each><span>__title__</span></htx:each></nav>
</htx>`,
    );
    writeFile(
      root,
      "docs/[slug].htx",
      `<htx:type>documentation</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<article><h1>__title__</h1></article>
</htx>`,
    );

    const adapter = new InMemoryAdapter();
    adapter.seed("documentation", [
      { title: "Quick Start", slug: "quick-start", status: "published" },
      { title: "Routing", slug: "routing", status: "published" },
    ]);

    const handler = createHandler(root, adapter);
    const response = await handler.handle({
      method: "GET",
      path: "/docs/quick-start",
      headers: {},
      body: {},
      query: {},
    });

    expect(response.status).toBe(200);
    expect(response.body).toContain('<nav class="docs-nav">');
    expect(response.body).toContain("<span>Quick Start</span>");
    expect(response.body).toContain("<span>Routing</span>");
    expect(response.body).not.toContain("<htx:type>");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("htx:script in components is collected and injected before </body>", async () => {
  const root = createFixtureDir();

  try {
    writeFile(root, "_layout.htx", "<!doctype html><html><body>__content__</body></html>");
    writeFile(
      root,
      "components/toggle.htx",
      '<htx:props>\nlabel = "Toggle"\n</htx:props>\n<button class="toggle">{{ label }}</button>\n<htx:script>\n  el.addEventListener("click", () => el.classList.toggle("active"));\n</htx:script>',
    );
    writeFile(
      root,
      "index.htx",
      '<htx:component src="components/toggle.htx" label="Dark Mode" />',
    );

    const handler = createHandler(root);
    const response = await handler.handle({ method: "GET", path: "/" });

    expect(response.status).toBe(200);
    // Component output should have data-htx-id
    expect(response.body).toContain('data-htx-id="htx-c0"');
    // htx:script tag should be stripped from output
    expect(response.body).not.toContain("<htx:script>");
    // Script should be injected before </body>
    expect(response.body).toContain("<script>");
    expect(response.body).toContain('document.querySelector(\'[data-htx-id="htx-c0"]\')');
    expect(response.body).toContain("classList.toggle");
    // Expression in label should be evaluated
    expect(response.body).toContain("Dark Mode");
    // Script block should appear before </body>
    const scriptPos = response.body.indexOf("<script>");
    const bodyClosePos = response.body.indexOf("</body>");
    expect(scriptPos).toBeLessThan(bodyClosePos);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
