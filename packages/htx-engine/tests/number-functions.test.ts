import { expect, test } from "bun:test";

import { ExpressionEngine } from "../src";

test("number helpers preserve core numeric behaviors", () => {
  const engine = new ExpressionEngine();

  expect(engine.evaluate("{{ add(2, 3) }}", {})).toBe("5");
  expect(engine.evaluate("{{ number_format(1234.5, 1) }}", {})).toBe("1,234.5");
  expect(engine.evaluate("{{ bool(\"false\") ? \"yes\" : \"no\" }}", {})).toBe("no");
});
