import { afterEach, expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";

import {
  ComponentResolver,
  ExpressionEngine,
  IncludeResolver,
  LayoutResolver,
  LetResolver,
  PropsParser,
  TemplateResolver,
} from "../src";

const fixtureDirs: string[] = [];

function createFixtureDir(): string {
  const dir = mkdtempSync(join(tmpdir(), "htx-runtime-test-"));
  fixtureDirs.push(dir);
  return dir;
}

function createFile(root: string, relativePath: string, content: string): string {
  const fullPath = join(root, relativePath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, content);
  return fullPath;
}

afterEach(() => {
  while (fixtureDirs.length > 0) {
    rmSync(fixtureDirs.pop()!, { recursive: true, force: true });
  }
});

test("layout resolver wraps nested layouts and can skip the root shell", () => {
  const root = createFixtureDir();
  createFile(root, "_layout.htx", "<!doctype html><html>__content__</html>");
  const page = createFile(root, "docs/intro.htx", "<p>Intro</p>");
  createFile(root, "docs/_layout.htx", '<div class="docs">__content__</div>');

  const resolver = new LayoutResolver();
  const full = resolver.wrap("<p>Intro</p>", page, root);
  const fragment = resolver.wrap("<p>Intro</p>", page, root, true);

  expect(full).toContain('<div class="docs"><p>Intro</p></div>');
  expect(full).toContain("<!doctype html>");
  expect(fragment).toContain('<div class="docs"><p>Intro</p></div>');
  expect(fragment).not.toContain("<!doctype html>");
});

test("include resolver expands absolute and relative includes and rejects traversal", () => {
  const root = createFixtureDir();
  const page = createFile(root, "docs/page.htx", '<htx:include src="shared/note.htx" /><htx:include src="/partials/header.htx" />');
  createFile(root, "docs/shared/note.htx", "<aside>Note</aside>");
  createFile(root, "partials/header.htx", "<header>Logo</header>");

  const resolver = new IncludeResolver();
  const expanded = resolver.expand(readFileSync(page, "utf8"), page, root);

  expect(expanded).toContain("<aside>Note</aside>");
  expect(expanded).toContain("<header>Logo</header>");
  expect(() => resolver.expand('<htx:include src="../../etc/passwd" />', page, root)).toThrow(
    /escapes site root/,
  );
});

test("let resolver supports shorthand, attribute syntax, and dependency chaining", () => {
  const engine = new ExpressionEngine();
  const resolver = new LetResolver(engine);
  const data: Record<string, unknown> = { role: "admin", name: "World" };

  const content =
    '<htx:let is_admin = role == "admin" ? "yes" : "no" />' +
    '<htx:let name="label" value="name" />' +
    '<htx:let greeting = is_admin == "yes" ? "Hello" : "Bye" />';

  const result = resolver.resolve(content, data);

  expect(data.is_admin).toBe("yes");
  expect(data.label).toBe("World");
  expect(data.greeting).toBe("Hello");
  expect(result).not.toContain("<htx:let");
});

test("props parser extracts defaults, required props, booleans, numbers, and equals in strings", () => {
  const parser = new PropsParser();
  const result = parser.extract(
    '<htx:props>\nvariant = "primary"\ndisabled = false\nmax = 100\ntitle\nequation = "1+1=2"\n</htx:props>\n<button />',
  );

  expect(result.props.variant.default).toBe("primary");
  expect(result.props.disabled.default).toBe(false);
  expect(result.props.max.default).toBe(100);
  expect(result.props.title.required).toBe(true);
  expect(result.props.equation.default).toBe("1+1=2");
});

test("component resolver supports props, slots, defaults, and self-closing components", () => {
  const root = createFixtureDir();
  createFile(root, "components/btn.htx", '<button class="{{ variant }}"><htx:slot /></button>');
  createFile(root, "components/card.htx", '<div><htx:slot name="header" /><htx:slot /></div>');
  createFile(root, "components/alert.htx", '<div class="alert"><htx:slot>Default message</htx:slot></div>');
  createFile(root, "components/hr.htx", "<hr class=\"fancy\" />");
  createFile(
    root,
    "components/default-btn.htx",
    '<htx:props>\nvariant = "primary"\n</htx:props>\n<button class="{{ variant }}"><htx:slot /></button>',
  );

  const engine = new ExpressionEngine();
  const includes = new IncludeResolver();
  const resolver = new ComponentResolver(root, engine, includes);

  expect(
    resolver.resolve('<htx:component src="components/btn.htx" variant="danger">Delete</htx:component>', {}),
  ).toBe('<button class="danger">Delete</button>');

  const card = resolver.resolve(
    '<htx:component src="components/card.htx"><htx:fill name="header"><h2>Title</h2></htx:fill>Body text</htx:component>',
    {},
  );
  expect(card).toContain("<h2>Title</h2>");
  expect(card).toContain("Body text");

  expect(
    resolver.resolve('<htx:component src="components/alert.htx"></htx:component>', {}),
  ).toContain("Default message");

  expect(resolver.resolve('<htx:component src="components/hr.htx" />', {})).toBe('<hr class="fancy" />');

  expect(
    resolver.resolve('<htx:component src="components/default-btn.htx">Click</htx:component>', {}),
  ).toContain('class="primary"');
});

test("htx:script is extracted and collected with data-htx-id binding", () => {
  const root = createFixtureDir();
  createFile(
    root,
    "components/counter.htx",
    '<htx:props>\nstep = "1"\n</htx:props>\n<div class="counter">\n  <span>0</span>\n</div>\n<htx:script>\n  el.querySelector("span").textContent = "ready";\n</htx:script>',
  );

  const engine = new ExpressionEngine();
  const includes = new IncludeResolver();
  const resolver = new ComponentResolver(root, engine, includes);
  const scripts: string[] = [];

  const result = resolver.resolve(
    '<htx:component src="components/counter.htx" step="5" />',
    {},
    0,
    scripts,
  );

  expect(result).toContain('data-htx-id="htx-c0"');
  expect(result).not.toContain("<htx:script>");
  expect(scripts).toHaveLength(1);
  expect(scripts[0]).toContain('document.querySelector(\'[data-htx-id="htx-c0"]\')');
  expect(scripts[0]).toContain("el.querySelector");
  expect(scripts[0]).toContain("(function(){");
});

test("htx:script expressions are evaluated with component props", () => {
  const root = createFixtureDir();
  createFile(
    root,
    "components/stepper.htx",
    '<htx:props>\nstep = "1"\n</htx:props>\n<button>+</button>\n<htx:script>\n  var step = {{ step }};\n</htx:script>',
  );

  const engine = new ExpressionEngine();
  const includes = new IncludeResolver();
  const resolver = new ComponentResolver(root, engine, includes);
  const scripts: string[] = [];

  resolver.resolve(
    '<htx:component src="components/stepper.htx" step="5" />',
    {},
    0,
    scripts,
  );

  expect(scripts).toHaveLength(1);
  expect(scripts[0]).toContain("var step = 5;");
});

test("multiple components collect separate scripts", () => {
  const root = createFixtureDir();
  createFile(
    root,
    "components/a.htx",
    '<div class="a">A</div>\n<htx:script>\n  el.classList.add("init-a");\n</htx:script>',
  );
  createFile(
    root,
    "components/b.htx",
    '<div class="b">B</div>\n<htx:script>\n  el.classList.add("init-b");\n</htx:script>',
  );

  const engine = new ExpressionEngine();
  const includes = new IncludeResolver();
  const resolver = new ComponentResolver(root, engine, includes);
  const scripts: string[] = [];

  const result = resolver.resolve(
    '<htx:component src="components/a.htx" />\n<htx:component src="components/b.htx" />',
    {},
    0,
    scripts,
  );

  expect(result).toContain('data-htx-id="htx-c0"');
  expect(result).toContain('data-htx-id="htx-c1"');
  expect(scripts).toHaveLength(2);
  expect(scripts[0]).toContain("init-a");
  expect(scripts[1]).toContain("init-b");
});

test("component without htx:script is unchanged when collector is passed", () => {
  const root = createFixtureDir();
  createFile(root, "components/plain.htx", '<div class="plain">Hello</div>');

  const engine = new ExpressionEngine();
  const includes = new IncludeResolver();
  const resolver = new ComponentResolver(root, engine, includes);
  const scripts: string[] = [];

  const result = resolver.resolve(
    '<htx:component src="components/plain.htx" />',
    {},
    0,
    scripts,
  );

  expect(result).toBe('<div class="plain">Hello</div>');
  expect(result).not.toContain("data-htx-id");
  expect(scripts).toHaveLength(0);
});

test("nested components collect scripts depth-first", () => {
  const root = createFixtureDir();
  createFile(
    root,
    "components/inner.htx",
    '<span class="inner">I</span>\n<htx:script>\n  el.dataset.inner = "true";\n</htx:script>',
  );
  createFile(
    root,
    "components/outer.htx",
    '<div class="outer">\n  <htx:component src="components/inner.htx" />\n</div>\n<htx:script>\n  el.dataset.outer = "true";\n</htx:script>',
  );

  const engine = new ExpressionEngine();
  const includes = new IncludeResolver();
  const resolver = new ComponentResolver(root, engine, includes);
  const scripts: string[] = [];

  resolver.resolve(
    '<htx:component src="components/outer.htx" />',
    {},
    0,
    scripts,
  );

  expect(scripts).toHaveLength(2);
  // Inner resolves first (depth-first), so its script is collected first
  expect(scripts[0]).toContain("inner");
  expect(scripts[1]).toContain("outer");
});

test("layout resolver skips unreadable layout files gracefully", () => {
  const root = createFixtureDir();
  createFile(root, "_layout.htx", "<!doctype html><html>__content__</html>");
  const page = createFile(root, "docs/intro.htx", "<p>Intro</p>");
  // Create the docs/_layout.htx path but make it a directory instead of a file,
  // which will cause readFileSync to throw.
  mkdirSync(join(root, "docs", LAYOUT_FILE), { recursive: true });

  const resolver = new LayoutResolver();
  // Should not throw — the unreadable layout is skipped.
  const result = resolver.wrap("<p>Intro</p>", page, root);

  // Root layout should still apply.
  expect(result).toContain("<!doctype html>");
  expect(result).toContain("<p>Intro</p>");
});

test("layout resolver chained mode skips unreadable layouts and keeps walking upward", () => {
  const site = createFixtureDir();
  const theme = createFixtureDir();

  createFile(theme, "_layout.htx", "<!doctype html><html>__content__</html>");
  const page = createFile(site, "docs/intro.htx", "<p>Intro</p>");
  mkdirSync(join(site, "docs", LAYOUT_FILE), { recursive: true });

  const templates = new TemplateResolver([site, theme]);
  const resolver = new LayoutResolver();
  const result = resolver.wrap("<p>Intro</p>", page, templates);

  expect(result).toContain("<!doctype html>");
  expect(result).toContain("<p>Intro</p>");
});

const LAYOUT_FILE = "_layout.htx";

test("include and component resolution work with template resolver chains", () => {
  const site = createFixtureDir();
  const theme = createFixtureDir();

  createFile(theme, "components/badge.htx", '<span class="badge"><htx:slot /></span>');
  createFile(theme, "partials/shared.htx", "<small>shared</small>");
  createFile(site, "docs/page.htx", '<htx:include src="/partials/shared.htx" /><htx:component src="/components/badge.htx">Live</htx:component>');

  const templates = new TemplateResolver([site, theme]);
  const includes = new IncludeResolver();
  includes.setTemplateResolver(templates);
  const resolver = new ComponentResolver(templates, new ExpressionEngine(), includes);

  const pagePath = join(site, "docs/page.htx");
  const expanded = includes.expand(readFileSync(pagePath, "utf8"), pagePath, templates);
  const rendered = resolver.resolve(expanded, {});

  expect(rendered).toContain("<small>shared</small>");
  expect(rendered).toContain('<span class="badge">Live</span>');
});
