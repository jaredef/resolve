import { expect, test } from "bun:test";

import { ExpressionEngine } from "../src";

test("array helpers work through the expression engine", () => {
  const engine = new ExpressionEngine();

  expect(engine.evaluate("{{ count(items) }}", { items: ["a", "b", "c"] })).toBe("3");
  expect(engine.evaluate("{{ first(items) }}", { items: ["a", "b", "c"] })).toBe("a");
  expect(engine.evaluate("{{ empty(items) ? \"yes\" : \"no\" }}", { items: [] })).toBe("yes");
});
