import { expect, test } from "bun:test";

import { ExpressionEngine } from "../src";

test("string functions preserve PHP-style template names", () => {
  const engine = new ExpressionEngine();

  expect(engine.evaluate("{{ title | uppercase }}", { title: "htx" })).toBe("HTX");
  expect(engine.evaluate("{{ title | truncate:3 }}", { title: "hypermedia" })).toBe("hyp...");
  expect(engine.evaluate("{{ value | slug }}", { value: "Hello World" })).toBe("hello-world");
});

test("string fallback and coalesce behavior matches PHP intent", () => {
  const engine = new ExpressionEngine();

  expect(engine.evaluate("{{ emptyValue | default:\"fallback\" }}", { emptyValue: "" })).toBe("fallback");
  expect(engine.evaluate("{{ coalesce(a, b, c) }}", { a: null, b: "", c: "ok" })).toBe("ok");
});
