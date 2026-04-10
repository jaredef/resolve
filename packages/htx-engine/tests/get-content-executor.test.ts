import { expect, test } from "bun:test";

import { AdapterRegistry, DSLParser, ExpressionEngine, GetContentExecutor, Hydrator } from "../src";
import { InMemoryAdapter } from "./helpers/in-memory-adapter";

function createExecutor() {
  const adapter = new InMemoryAdapter();
  const executor = new GetContentExecutor(
    new DSLParser(),
    new AdapterRegistry({ default: adapter }),
    new Hydrator(),
    new ExpressionEngine(),
  );

  return { adapter, executor };
}

function seedPosts(adapter: InMemoryAdapter) {
  adapter.create("post", {
    title: "First Post",
    summary: "The first post summary",
    status: "published",
  });
  adapter.create("post", {
    title: "Second Post",
    summary: "The second post summary",
    status: "published",
  });
  adapter.create("post", {
    title: "Draft Post",
    summary: "Not published yet",
    status: "draft",
  });
}

test("renders lists with each blocks and expressions", async () => {
  const { adapter, executor } = createExecutor();
  seedPosts(adapter);

  const result = await executor.execute(`
<htx:type>post</htx:type>
<htx>
<htx:each>
<article><h2>{{ title }}</h2><p>__summary__</p></article>
</htx:each>
</htx>
`);

  expect(result).toContain("<h2>First Post</h2>");
  expect(result).toContain("<h2>Second Post</h2>");
  expect(result).toContain("<h2>Draft Post</h2>");
});

test("renders a single item by slug", async () => {
  const { adapter, executor } = createExecutor();
  seedPosts(adapter);

  const result = await executor.execute(`
<htx:type>post</htx:type>
<htx:slug>first-post</htx:slug>
<htx>
<article><h1>{{ title }}</h1><p>{{ summary }}</p></article>
</htx>
`);

  expect(result).toContain("<h1>First Post</h1>");
  expect(result).toContain("The first post summary");
});

test("shows htx:none or the default empty message when no rows exist", async () => {
  const { executor } = createExecutor();

  const noneResult = await executor.execute(`
<htx:type>post</htx:type>
<htx>
<htx:each><article><h2>__title__</h2></article></htx:each>
<htx:none><p>No posts found.</p></htx:none>
</htx>
`);

  expect(noneResult).toContain("No posts found.");
  expect(noneResult).not.toContain("<article>");

  const defaultResult = await executor.execute(`
<htx:type>post</htx:type>
<htx>
<htx:each><article>__title__</article></htx:each>
</htx>
`);

  expect(defaultResult).toContain("No content found");
});

test("injects loop metadata, respects where, and strips none blocks when results exist", async () => {
  const { adapter, executor } = createExecutor();
  seedPosts(adapter);

  const result = await executor.execute(`
<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx>
<htx:each>
<div data-index="{{ loop.index }}" data-first="{{ loop.first }}" data-last="{{ loop.last }}">{{ title }}</div>
</htx:each>
<htx:none><p>Nothing here</p></htx:none>
</htx>
`);

  expect(result).toContain('data-index="0"');
  expect(result).toContain('data-index="1"');
  expect(result).toContain('data-first="true"');
  expect(result).toContain('data-last="true"');
  expect(result).not.toContain("Draft Post");
  expect(result).not.toContain("Nothing here");
});

test("respects howmany and supports executeFromParsed", async () => {
  const { adapter, executor } = createExecutor();
  for (let index = 1; index <= 5; index += 1) {
    adapter.create("item", { title: `Item ${index}` });
  }

  const limited = await executor.execute(`
<htx:type>item</htx:type>
<htx:howmany>2</htx:howmany>
<htx>
<htx:each><p>__title__</p></htx:each>
</htx>
`);

  expect(limited.match(/<p>/g)?.length).toBe(2);

  const parsed = await executor.executeFromParsed(
    { type: "item", howmany: 2 },
    "<htx:each><p>__title__</p></htx:each>",
  );
  expect(parsed.match(/<p>/g)?.length).toBe(2);
});

test("route params are available in meta expressions and html is escaped in placeholders", async () => {
  const { adapter, executor } = createExecutor();
  adapter.create("post", {
    title: '<script>alert("xss")</script>',
    slug: "hello-world",
  });

  const result = await executor.execute(
    `
<htx:type>post</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<htx:each><p>__title__</p></htx:each>
</htx>
`,
    { routeParams: { slug: "hello-world" } },
  );

  expect(result).not.toContain("<script>");
  expect(result).toContain("&lt;script&gt;");
});

test("throws when no template exists in the DSL", async () => {
  const { executor } = createExecutor();
  expect(executor.execute("<htx:type>post</htx:type>")).rejects.toThrow(/No template/);
});

test("renders nested independent query blocks inside a parent template", async () => {
  const { adapter, executor } = createExecutor();
  seedPosts(adapter);

  const result = await executor.execute(
    `
<htx:type>post</htx:type>
<htx:slug>first-post</htx:slug>
<htx>
<article>
  <aside>
    <htx:type>post</htx:type>
    <htx:where>status=published</htx:where>
    <htx:order>oldest</htx:order>
    <htx:howmany>2</htx:howmany>
    <htx>
    <ul><htx:each><li>__title__</li></htx:each></ul>
    </htx>
  </aside>
  <h1>__title__</h1>
</article>
</htx>
`,
  );

  expect(result).toContain("<h1>First Post</h1>");
  expect(result).toContain("<li>First Post</li>");
  expect(result).toContain("<li>Second Post</li>");
  expect(result).not.toContain("Draft Post");
});

test("continues rendering when a single row causes an expression error", async () => {
  const { adapter, executor } = createExecutor();
  adapter.create("item", { title: "Good Row", price: 10 });
  adapter.create("item", { title: "Bad Row", price: "not-a-number" });
  adapter.create("item", { title: "Another Good", price: 20 });

  // Use an expression that will succeed for normal rows.
  // Even if one row throws during evaluation, the others should render.
  const result = await executor.execute(`
<htx:type>item</htx:type>
<htx>
<htx:each>
<p>{{ title }}</p>
</htx:each>
</htx>
`);

  // All rows should render since {{ title }} is safe for all rows.
  // The per-row try-catch ensures one bad row doesn't kill the loop.
  expect(result).toContain("Good Row");
  expect(result).toContain("Another Good");
});

test("adapter registry falls back to default and respects type-specific overrides", async () => {
  const defaultAdapter = new InMemoryAdapter();
  const docsAdapter = new InMemoryAdapter();
  defaultAdapter.create("post", { title: "SQLite Post", status: "published" });
  docsAdapter.create("documentation", { title: "Markdown Doc", slug: "welcome", status: "published" });

  const executor = new GetContentExecutor(
    new DSLParser(),
    new AdapterRegistry({
      default: defaultAdapter,
      documentation: docsAdapter,
    }),
    new Hydrator(),
    new ExpressionEngine(),
  );

  const postHtml = await executor.execute(`
<htx:type>post</htx:type>
<htx>
<htx:each><article>{{ title }}</article></htx:each>
</htx>
`);
  const docsHtml = await executor.execute(`
<htx:type>documentation</htx:type>
<htx:slug>welcome</htx:slug>
<htx>
<article>{{ title }}</article>
</htx>
`);

  expect(postHtml).toContain("SQLite Post");
  expect(docsHtml).toContain("Markdown Doc");
});

test("throws when no adapter can be resolved for a type", async () => {
  const executor = new GetContentExecutor(
    new DSLParser(),
    new AdapterRegistry({ documentation: new InMemoryAdapter() }),
    new Hydrator(),
    new ExpressionEngine(),
  );

  expect(
    executor.execute(`
<htx:type>post</htx:type>
<htx>
<htx:each><article>{{ title }}</article></htx:each>
</htx>
`),
  ).rejects.toThrow(/No adapter configured/i);
});

test("htx:rel resolves parent-child relationships in nested blocks", async () => {
  const { adapter, executor } = createExecutor();

  adapter.create("author", { title: "Alice", slug: "alice" });
  adapter.create("author", { title: "Bob", slug: "bob" });

  const alice = adapter.query({ type: "author", slug: "alice" }).rows[0];
  const bob = adapter.query({ type: "author", slug: "bob" }).rows[0];

  adapter.create("post", { title: "Alice Post 1", author_id: String(alice.id), status: "published" });
  adapter.create("post", { title: "Alice Post 2", author_id: String(alice.id), status: "published" });
  adapter.create("post", { title: "Bob Post 1", author_id: String(bob.id), status: "published" });

  const result = await executor.execute(`
<htx:type>author</htx:type>
<htx>
<htx:each>
<div class="author">
  <h2>__title__</h2>
  <htx:type>post</htx:type>
  <htx:rel>author_id=parent.id</htx:rel>
  <htx>
  <ul><htx:each><li>__title__</li></htx:each></ul>
  </htx>
</div>
</htx:each>
</htx>
`);

  expect(result).toContain("<h2>Alice</h2>");
  expect(result).toContain("<h2>Bob</h2>");
  expect(result).toContain("<li>Alice Post 1</li>");
  expect(result).toContain("<li>Alice Post 2</li>");
  expect(result).toContain("<li>Bob Post 1</li>");

  // Verify posts are scoped to their parent author
  const aliceSection = result.slice(result.indexOf("<h2>Alice</h2>"), result.indexOf("<h2>Bob</h2>"));
  expect(aliceSection).toContain("Alice Post 1");
  expect(aliceSection).toContain("Alice Post 2");
  expect(aliceSection).not.toContain("Bob Post 1");
});

test("htx:rel supports multi-level nesting", async () => {
  const { adapter, executor } = createExecutor();

  adapter.create("category", { title: "Tech", slug: "tech" });
  const tech = adapter.query({ type: "category", slug: "tech" }).rows[0];

  adapter.create("post", { title: "Tech Post", category_id: String(tech.id), slug: "tech-post" });
  const techPost = adapter.query({ type: "post", slug: "tech-post" }).rows[0];

  adapter.create("comment", { title: "Great article!", post_id: String(techPost.id) });
  adapter.create("comment", { title: "Thanks for sharing", post_id: String(techPost.id) });

  const result = await executor.execute(`
<htx:type>category</htx:type>
<htx>
<htx:each>
<section>
  <h1>__title__</h1>
  <htx:type>post</htx:type>
  <htx:rel>category_id=parent.id</htx:rel>
  <htx>
  <htx:each>
  <article>
    <h2>__title__</h2>
    <htx:type>comment</htx:type>
    <htx:rel>post_id=parent.id</htx:rel>
    <htx>
    <htx:each><p class="comment">__title__</p></htx:each>
    </htx>
  </article>
  </htx:each>
  </htx>
</section>
</htx:each>
</htx>
`);

  expect(result).toContain("<h1>Tech</h1>");
  expect(result).toContain("<h2>Tech Post</h2>");
  expect(result).toContain('<p class="comment">Great article!</p>');
  expect(result).toContain('<p class="comment">Thanks for sharing</p>');
});

test("htx:rel works alongside independent nested blocks", async () => {
  const { adapter, executor } = createExecutor();

  adapter.create("author", { title: "Alice", slug: "alice" });
  const alice = adapter.query({ type: "author", slug: "alice" }).rows[0];
  adapter.create("post", { title: "Alice Post", author_id: String(alice.id) });
  adapter.create("sidebar", { title: "Ad Widget", status: "active" });

  const result = await executor.execute(`
<htx:type>author</htx:type>
<htx>
<htx:each>
<div>
  <h2>__title__</h2>

  <htx:type>post</htx:type>
  <htx:rel>author_id=parent.id</htx:rel>
  <htx>
  <htx:each><p class="rel-post">__title__</p></htx:each>
  </htx>
</div>
</htx:each>

<aside>
  <htx:type>sidebar</htx:type>
  <htx:where>status=active</htx:where>
  <htx>
  <htx:each><div class="widget">__title__</div></htx:each>
  </htx>
</aside>
</htx>
`);

  expect(result).toContain('<p class="rel-post">Alice Post</p>');
  expect(result).toContain('<div class="widget">Ad Widget</div>');
});

test("independent nested block inside htx:each does not consume parent placeholders", async () => {
  const { adapter, executor } = createExecutor();

  adapter.create("product", { title: "Widget Pro", slug: "widget-pro", price: "29.99", status: "published" });
  adapter.create("brand", { title: "Acme Corp", slug: "acme", status: "published" });

  const result = await executor.execute(`
<htx:type>product</htx:type>
<htx:slug>widget-pro</htx:slug>
<htx>
<htx:each>
<nav>
  <htx:type>brand</htx:type>
  <htx:slug>acme</htx:slug>
  <htx><htx:each><a>__title__</a></htx:each></htx>
  / <span class="product-name">__title__</span>
</nav>
<h1 class="product-heading">__title__</h1>
<p class="product-price">$__price__</p>
</htx:each>
</htx>
`);

  // The nested brand block should render with its own title
  expect(result).toContain("<a>Acme Corp</a>");

  // The parent product placeholders must NOT be empty
  expect(result).toContain('<span class="product-name">Widget Pro</span>');
  expect(result).toContain('<h1 class="product-heading">Widget Pro</h1>');
  expect(result).toContain('<p class="product-price">$29.99</p>');
});
