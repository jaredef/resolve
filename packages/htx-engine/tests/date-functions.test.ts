import { expect, test } from "bun:test";

import { ExpressionEngine } from "../src";

test("date helpers return formatted values", () => {
  const engine = new ExpressionEngine();

  expect(engine.evaluate("{{ format_date(value, \"Y-m-d\") }}", { value: "2024-01-02T00:00:00Z" })).toBe(
    "2024-01-02",
  );
  expect(engine.evaluate("{{ year(value) }}", { value: "2024-01-02T00:00:00Z" })).toBe("2024");
});
