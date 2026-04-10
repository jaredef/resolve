import { expect, test } from "bun:test";

import { ExpressionEngine } from "../src";

test("expression engine handles escaped expressions and raw evaluation", () => {
  const engine = new ExpressionEngine();

  expect(engine.evaluate("\\{{ title }} {{ title }}", { title: "HTX" })).toBe("{{ title }} HTX");
  expect(engine.evaluateRaw("{{ body }}", { body: "<strong>ok</strong>" })).toBe("<strong>ok</strong>");
});

test("evaluateCondition uses the same expression semantics", () => {
  const engine = new ExpressionEngine();

  expect(engine.evaluateCondition("count(items) > 0", { items: ["a"] })).toBe(true);
  expect(engine.evaluateCondition("empty(items)", { items: [] })).toBe(true);
});
