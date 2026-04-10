import { expect, test } from "bun:test";

import { Evaluator, FunctionRegistry, Lexer, Parser } from "../src";

function createCoreExpressionStack() {
  const functions = new FunctionRegistry();
  functions.register("uppercase", (value: unknown) => String(value ?? "").toUpperCase());

  return {
    evaluator: new Evaluator(functions),
    lexer: new Lexer(),
    parser: new Parser(functions),
  };
}

test("lexer tokenizes text and expressions", () => {
  const { lexer } = createCoreExpressionStack();
  const segments = lexer.tokenize("Hello {{ name }}");

  expect(segments).toHaveLength(2);
  expect(segments[0]).toEqual({ type: "text", content: "Hello " });
  expect(segments[1]).toEqual({ type: "expression", content: "name", mode: "default" });
});

test("parser and evaluator render simple output", () => {
  const { evaluator, lexer, parser } = createCoreExpressionStack();
  const ast = parser.parse(lexer.tokenize("{{ title }}"));

  expect(evaluator.evaluate(ast, { title: "HTX" })).toBe("HTX");
});

test("if and each blocks preserve PHP-style truthiness and loop metadata", () => {
  const { evaluator, lexer, parser } = createCoreExpressionStack();
  const ast = parser.parse(
    lexer.tokenize(
      "{{ if items }}{{ each item in items }}{{ loop.count }}:{{ item }};{{ endeach }}{{ else }}empty{{ endif }}",
    ),
  );

  expect(evaluator.evaluate(ast, { items: ["a", "b"] })).toBe("1:a;2:b;");
  expect(evaluator.evaluate(ast, { items: [] })).toBe("empty");
});

test("pipe expressions become function calls", () => {
  const { evaluator, lexer, parser } = createCoreExpressionStack();
  const ast = parser.parse(lexer.tokenize("{{ title | uppercase }}"));

  expect(evaluator.evaluate(ast, { title: "hypermedia" })).toBe("HYPERMEDIA");
});

test("lexer parses js expression mode", () => {
  const { lexer } = createCoreExpressionStack();
  const segments = lexer.tokenize("{{ js name }}");
  expect(segments).toHaveLength(1);
  expect(segments[0]).toMatchObject({ type: "raw_expression", content: "name", mode: "js" });
});

test("lexer parses json expression mode", () => {
  const { lexer } = createCoreExpressionStack();
  const segments = lexer.tokenize("{{ json data }}");
  expect(segments).toHaveLength(1);
  expect(segments[0]).toMatchObject({ type: "raw_expression", content: "data", mode: "json" });
});

test("js mode escapes for JavaScript string context", () => {
  const { evaluator, lexer, parser } = createCoreExpressionStack();
  const ast = parser.parse(lexer.tokenize('{{ js name }}'));
  const result = evaluator.evaluate(ast, { name: 'He said "hello" & <script>' });
  expect(result).toContain('\\"');
  expect(result).toContain("\\x3c");
  expect(result).not.toContain("<script>");
  expect(result).not.toContain("&amp;");
});

test("json mode serializes objects", () => {
  const { evaluator, lexer, parser } = createCoreExpressionStack();
  const ast = parser.parse(lexer.tokenize('{{ json config }}'));
  const result = evaluator.evaluate(ast, { config: { plan: "pro", count: 3 } });
  expect(result).toBe('{"plan":"pro","count":3}');
});

test("json mode serializes arrays", () => {
  const { evaluator, lexer, parser } = createCoreExpressionStack();
  const ast = parser.parse(lexer.tokenize('{{ json items }}'));
  const result = evaluator.evaluate(ast, { items: [1, 2, 3] });
  expect(result).toBe("[1,2,3]");
});

test("json mode handles null and undefined", () => {
  const { evaluator, lexer, parser } = createCoreExpressionStack();
  const ast = parser.parse(lexer.tokenize('{{ json missing }}'));
  const result = evaluator.evaluate(ast, {});
  expect(result).toBe("null");
});

test("default mode still HTML-escapes", () => {
  const { evaluator, lexer, parser } = createCoreExpressionStack();
  const ast = parser.parse(lexer.tokenize('{{ name }}'));
  const result = evaluator.evaluate(ast, { name: '<script>alert("xss")</script>' });
  expect(result).toContain("&lt;script&gt;");
  expect(result).not.toContain("<script>");
});

