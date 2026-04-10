import { expect, test } from "bun:test";

import { Hydrator } from "../src";

test("hydrator replaces placeholders and escapes html", () => {
  const hydrator = new Hydrator();

  expect(
    hydrator.hydrate("<h1>__title__</h1><p>__summary__</p>", {
      title: "Hello World",
      summary: "A test post",
    }),
  ).toBe("<h1>Hello World</h1><p>A test post</p>");

  const escaped = hydrator.hydrate("<p>__content__</p>", {
    content: '<script>alert("xss")</script>',
  });
  expect(escaped).not.toContain("<script>");
  expect(escaped).toContain("&lt;script&gt;");
});

test("hydrator trusts body_html, swaps __body__, resolves dot notation, and cleans unresolved placeholders", () => {
  const hydrator = new Hydrator();

  expect(
    hydrator.hydrate("<div>__body_html__</div>", {
      body_html: "<strong>Bold</strong>",
    }),
  ).toContain("<strong>Bold</strong>");

  const swapped = hydrator.hydrate("<div>__body__</div>", {
    body: "# Markdown",
    body_html: "<h1>Markdown</h1>",
  });
  expect(swapped).toContain("<h1>Markdown</h1>");
  expect(swapped).not.toContain("# Markdown");

  expect(
    hydrator.hydrate("<span>__author.name__</span>", {
      author: { name: "Jared", role: "admin" },
    }),
  ).toBe("<span>Jared</span>");

  expect(
    hydrator.hydrate("<p>__title__ by __author__</p>", {
      title: "Hello",
    }),
  ).toBe("<p>Hello by </p>");
});

test("hydrator preserves escaped placeholders as literal text", () => {
  const hydrator = new Hydrator();
  const result = hydrator.hydrate("<p>Use \\__placeholder__ in templates</p>", {});

  expect(result).toContain("__placeholder__");
});

test("hydrator shields raw blocks from placeholder replacement until final output", () => {
  const hydrator = new Hydrator();
  const result = hydrator.hydrate(
    "<htx:raw><pre><code>__title__ {{ title }}</code></pre></htx:raw><p>__title__</p>",
    { title: "Hello World" },
  );

  expect(result).toContain("<htx:raw><pre><code>__title__ \\{{ title }}</code></pre></htx:raw>");
  expect(result).toContain("<p>Hello World</p>");
});
