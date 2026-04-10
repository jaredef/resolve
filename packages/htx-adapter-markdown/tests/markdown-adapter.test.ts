import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { expect, test } from "bun:test";
import { AdapterRegistry, DSLParser, ExpressionEngine, GetContentExecutor, Hydrator } from "@htx/engine";

import { MarkdownAdapter } from "../src";

function createContentFile(root: string, relativePath: string, content: string): void {
  const filePath = path.join(root, relativePath);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);
}

test("markdown adapter indexes front matter and derives ids and slugs", () => {
  const root = mkdtempSync(path.join(tmpdir(), "htx-markdown-adapter-"));

  try {
    createContentFile(
      root,
      "post/hello-world.md",
      `---
title: Hello World
category: tech
priority: 3
status: published
---
This is **markdown** content.
`,
    );

    const adapter = new MarkdownAdapter(root);
    const row = adapter.findBySlug("post", "hello-world");

    expect(row?.type).toBe("post");
    expect(row?.id).toBe("post:hello-world");
    expect(row?.title).toBe("Hello World");
    expect(row?.category).toBe("tech");
    expect(row?.priority).toBe(3);
    expect(row?.body).toContain("**markdown**");
    expect(String(row?.body_html ?? "")).toContain("<strong>markdown</strong>");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("markdown adapter query mirrors sqlite-style filtering, ordering, offset, and slug shortcuts", () => {
  const root = mkdtempSync(path.join(tmpdir(), "htx-markdown-query-"));

  try {
    createContentFile(
      root,
      "item/apple.md",
      `---
title: Apple
category: fruit
status: published
created_at: 2026-03-01 00:00:00
---
Apple body
`,
    );
    createContentFile(
      root,
      "item/banana.md",
      `---
title: Banana
category: fruit
status: published
created_at: 2026-03-02 00:00:00
---
Banana body
`,
    );
    createContentFile(
      root,
      "item/cherry.md",
      `---
title: Cherry
category: fruit
status: published
created_at: 2026-03-03 00:00:00
---
Cherry body
`,
    );

    const adapter = new MarkdownAdapter(root);

    const filtered = adapter.query({
      type: "item",
      where: "category=fruit",
      order: "alpha",
      howmany: 2,
      offset: 1,
    });

    expect(filtered.total).toBe(3);
    expect(filtered.rows).toHaveLength(2);
    expect(filtered.rows[0]?.title).toBe("Banana");
    expect(filtered.rows[1]?.title).toBe("Cherry");

    const single = adapter.query({
      type: "item",
      slug: "apple",
    });

    expect(single.total).toBe(1);
    expect(single.rows[0]?.title).toBe("Apple");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("markdown adapter is explicitly read-only", () => {
  const root = mkdtempSync(path.join(tmpdir(), "htx-markdown-readonly-"));

  try {
    const adapter = new MarkdownAdapter(root);

    expect(() => adapter.create("post", { title: "Hello" })).toThrow(/read-only/i);
    expect(() => adapter.update("post", "post:hello", { title: "Updated" })).toThrow(/read-only/i);
    expect(() => adapter.delete("post", "post:hello")).toThrow(/read-only/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("markdown adapter fails fast when the content root is missing", () => {
  const root = path.join(tmpdir(), `htx-markdown-missing-${Date.now()}`);

  expect(() => new MarkdownAdapter(root)).toThrow(/MARKDOWN_CONTENT_ROOT_MISSING|content root does not exist/i);
});

test("markdown adapter rejects malformed front matter", () => {
  const root = mkdtempSync(path.join(tmpdir(), "htx-markdown-malformed-"));

  try {
    createContentFile(
      root,
      "post/bad.md",
      `---
title Broken
status: published
---
Bad body
`,
    );

    expect(() => new MarkdownAdapter(root)).toThrow(/Invalid front matter line|MARKDOWN_FRONT_MATTER_ERROR/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("markdown adapter rejects duplicate slugs within a type", () => {
  const root = mkdtempSync(path.join(tmpdir(), "htx-markdown-duplicate-slug-"));

  try {
    createContentFile(
      root,
      "post/first.md",
      `---
title: First
slug: shared
status: published
---
First body
`,
    );
    createContentFile(
      root,
      "post/second.md",
      `---
title: Second
slug: shared
status: published
---
Second body
`,
    );

    expect(() => new MarkdownAdapter(root)).toThrow(/Duplicate slug|MARKDOWN_DUPLICATE_SLUG/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("markdown adapter works through get executor rendering", () => {
  const root = mkdtempSync(path.join(tmpdir(), "htx-markdown-executor-"));

  try {
    createContentFile(
      root,
      "post/rendered-post.md",
      `---
title: Rendered Post
status: published
category: tech
---
Rendered body
`,
    );
    createContentFile(
      root,
      "post/draft-post.md",
      `---
title: Draft Post
status: draft
---
Draft body
`,
    );

    const adapter = new MarkdownAdapter(root);
    const executor = new GetContentExecutor(
      new DSLParser(),
      new AdapterRegistry({ default: adapter }),
      new Hydrator(),
      new ExpressionEngine(),
    );

    const html = executor.execute(`
<htx:type>post</htx:type>
<htx:where>status=published,category=tech</htx:where>
<htx>
<htx:each><article>{{ title }}</article></htx:each>
</htx>
`);

    expect(html).toContain("<article>Rendered Post</article>");
    expect(html).not.toContain("Draft Post");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("markdown adapter protects placeholder and expression syntax inside code fences", () => {
  const root = mkdtempSync(path.join(tmpdir(), "htx-markdown-code-fence-"));

  try {
    createContentFile(
      root,
      "post/literals.md",
      `---
title: Literal Syntax
status: published
---
\`\`\`html
<a href="/posts/__slug__">{{ title }}</a>
\`\`\`
`,
    );

    const adapter = new MarkdownAdapter(root);
    const row = adapter.findBySlug("post", "literals");

    expect(String(row?.body_html ?? "")).toContain("&#95;&#95;slug&#95;&#95;");
    expect(String(row?.body_html ?? "")).toContain("&#123;&#123; title &#125;&#125;");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
