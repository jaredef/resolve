import { afterEach, expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { Router, TemplateResolver } from "../src";

const fixtureDirs: string[] = [];

function createFixtureDir(): string {
  const dir = mkdtempSync(join(tmpdir(), "htx-router-test-"));
  fixtureDirs.push(dir);
  return dir;
}

function createFile(root: string, relativePath: string, content = "<htx>test</htx>"): void {
  const fullPath = join(root, relativePath);
  mkdirSync(join(fullPath, ".."), { recursive: true });
  writeFileSync(fullPath, content);
}

afterEach(() => {
  while (fixtureDirs.length > 0) {
    rmSync(fixtureDirs.pop()!, { recursive: true, force: true });
  }
});

test("router resolves exact and index routes", () => {
  const root = createFixtureDir();
  const router = new Router();

  createFile(root, "about.htx");
  createFile(root, "blog/index.htx");

  expect(router.resolve("/about", root)?.filePath.endsWith("about.htx")).toBe(true);
  expect(router.resolve("/blog", root)?.filePath.endsWith("blog/index.htx")).toBe(true);
});

test("router resolves dynamic segments", () => {
  const root = createFixtureDir();
  const router = new Router();

  createFile(root, "blog/[slug].htx");
  createFile(root, "posts/[id]/comments.htx");

  expect(router.resolve("/blog/hello-world", root)?.params.slug).toBe("hello-world");
  expect(router.resolve("/posts/42/comments", root)?.params.id).toBe("42");
});

test("router excludes underscore, partials, and public paths", () => {
  const root = createFixtureDir();
  const router = new Router();

  createFile(root, "_layout.htx");
  createFile(root, "partials/header.htx");
  createFile(root, "public/style.htx");

  expect(router.resolve("/_layout", root)).toBeNull();
  expect(router.resolve("/partials/header", root)).toBeNull();
  expect(router.resolve("/public/style", root)).toBeNull();
});

test("router resolves catch-all dynamic files", () => {
  const root = createFixtureDir();
  const router = new Router();

  createFile(root, "docs/[slug].htx");

  expect(router.resolve("/docs/build-with-claude/analytics", root)?.params.slug).toBe(
    "build-with-claude/analytics",
  );
});

test("router rejects invalid dynamic segment names", () => {
  const root = createFixtureDir();
  const router = new Router();

  // Valid dynamic segments should work
  createFile(root, "valid/[slug].htx");
  createFile(root, "valid/[_private].htx");
  expect(router.resolve("/valid/hello", root)?.params.slug ?? router.resolve("/valid/hello", root)?.params._private).toBeTruthy();

  // Invalid dynamic segment names — these files exist on disk but should NOT be matched as dynamic routes
  createFile(root, "bad/[123].htx");
  createFile(root, "bad/[foo bar].htx");
  createFile(root, "bad/[].htx");

  expect(router.resolve("/bad/anything", root)).toBeNull();
});

test("template resolver preserves first-match priority across roots", () => {
  const primary = createFixtureDir();
  const fallback = createFixtureDir();
  const resolver = new TemplateResolver([primary, fallback]);

  createFile(primary, "docs/index.htx", "<htx>primary</htx>");
  createFile(fallback, "docs/index.htx", "<htx>fallback</htx>");

  expect(resolver.resolve("docs/index.htx")).toBe(join(primary, "docs/index.htx"));
});
