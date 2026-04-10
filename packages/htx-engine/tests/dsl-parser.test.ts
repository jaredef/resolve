import { expect, test } from "bun:test";

import { DSLParser, MetaExtractor, ResponseExtractor, TemplateExtractor } from "../src";
import { scanTopLevelHtxTemplates, stripTopLevelHtxTemplates } from "../src/parser/htx-template-scanner";

test("meta extractor ports core HTX directives", () => {
  const extractor = new MetaExtractor();
  const meta = extractor.extract(
    "<htx:type>post</htx:type><htx:where>status=published</htx:where><htx:howmany>10</htx:howmany>",
  );

  expect(meta.type).toBe("post");
  expect(meta.where).toBe("status=published");
  expect(meta.howmany).toBe(10);
});

test("template extractor returns the main htx body", () => {
  const extractor = new TemplateExtractor();
  const template = extractor.extract("<htx:type>post</htx:type><htx><div>{{ title }}</div></htx>");

  expect(template).toContain("{{ title }}");
});

test("response extractor ports named response blocks", () => {
  const extractor = new ResponseExtractor();
  const responses = extractor.extract("<htx:responsesuccess><div>Created!</div></htx:responsesuccess>");

  expect(responses.success).toContain("Created!");
});

test("dsl parser handles a realistic read block", () => {
  const parser = new DSLParser();
  const parsed = parser.parse(`
<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx:order>newest</htx:order>
<htx:howmany>10</htx:howmany>
<htx>
  <htx:each>
    <article>{{ title }}</article>
  </htx:each>
  <htx:none>No posts</htx:none>
</htx>
`);

  expect(parsed.meta.type).toBe("post");
  expect(parsed.meta.where).toBe("status=published");
  expect(parsed.template).toContain("{{ title }}");
});

test("dsl parser preserves region offsets for multiple blocks", () => {
  const parser = new DSLParser();
  const blocks = parser.parseBlocks(`
<htx:type>post</htx:type>
<htx><div>one</div></htx>
<htx:type>page</htx:type>
<htx><div>two</div></htx>
`);

  expect(blocks).toHaveLength(2);
  expect(blocks[0].meta.type).toBe("post");
  expect(blocks[1].meta.type).toBe("page");
  expect(blocks[1].regionStart).toBeGreaterThanOrEqual(blocks[0].endPos);
});

test("template extractor and block parser keep nested htx blocks intact", () => {
  const extractor = new TemplateExtractor();
  const parser = new DSLParser();
  const dsl = `
<htx:type>post</htx:type>
<htx:slug>first-post</htx:slug>
<htx>
  <article>
    <htx:type>post</htx:type>
    <htx:where>status=published</htx:where>
    <htx>
      <htx:each><li>__title__</li></htx:each>
    </htx>
    <h1>__title__</h1>
  </article>
</htx>
`;

  const template = extractor.extract(dsl);
  const blocks = parser.parseBlocks(dsl);

  expect(template).toContain("<h1>__title__</h1>");
  expect(template).toContain("<htx:where>status=published</htx:where>");
  expect(blocks).toHaveLength(1);
  expect(blocks[0].template).toContain("<htx:each><li>__title__</li></htx:each>");
  expect(blocks[0].meta.slug).toBe("first-post");
});

test("scanner helpers can reuse precomputed ranges without changing stripped root DSL", () => {
  const extractor = new TemplateExtractor();
  const dsl = `
<htx:type>post</htx:type>
<htx:responsesuccess><div>Saved</div></htx:responsesuccess>
<htx foo="bar"><div>Body</div></htx>
`;
  const ranges = scanTopLevelHtxTemplates(dsl);
  const stripped = stripTopLevelHtxTemplates(dsl, ranges);

  expect(ranges).toHaveLength(1);
  expect(extractor.extractFromRanges(ranges)).toContain("<div>Body</div>");
  expect(stripped).toContain("<htx:type>post</htx:type>");
  expect(stripped).toContain("<htx:responsesuccess><div>Saved</div></htx:responsesuccess>");
  expect(stripped).not.toContain("<htx foo=\"bar\">");
});
