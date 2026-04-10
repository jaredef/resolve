import { expect, test } from "bun:test";

import type { ContentAdapter, ContentId, ContentRow, ContentSchema, QueryMeta, QueryResult } from "../src";
import {
  AdapterRegistry,
  ActionTokenService,
  DeleteContentExecutor,
  DSLParser,
  ExpressionEngine,
  Hydrator,
  InMemoryReplayGuard,
  SetContentExecutor,
} from "../src";
import { InMemoryAdapter } from "./helpers/in-memory-adapter";

const TEST_KEY = "test-secret-key-at-least-32-bytes-long!!";

class ReadOnlyAdapter implements ContentAdapter {
  query(_meta: QueryMeta): QueryResult {
    return { rows: [], total: 0 };
  }

  find(_type: string, _id: ContentId): ContentRow | null {
    return null;
  }

  findBySlug(_type: string, _slug: string): ContentRow | null {
    return null;
  }

  create(_type: string, _data: Record<string, unknown>): ContentRow {
    throw new Error("Read-only adapter.");
  }

  update(_type: string, _id: ContentId, _data: Record<string, unknown>): ContentRow {
    throw new Error("Read-only adapter.");
  }

  delete(_type: string, _id: ContentId): void {
    throw new Error("Read-only adapter.");
  }

  schema(_type: string): ContentSchema | null {
    return null;
  }
}

function createExecutors() {
  const adapter = new InMemoryAdapter();
  const tokenService = new ActionTokenService(TEST_KEY);
  const replayGuard = new InMemoryReplayGuard();
  const parser = new DSLParser();
  const hydrator = new Hydrator();
  const expressionEngine = new ExpressionEngine();
  const registry = new AdapterRegistry({ default: adapter });

  return {
    adapter,
    tokenService,
    replayGuard,
    setExecutor: new SetContentExecutor(
      parser,
      registry,
      hydrator,
      expressionEngine,
      tokenService,
      replayGuard,
    ),
    deleteExecutor: new DeleteContentExecutor(
      parser,
      registry,
      hydrator,
      tokenService,
      replayGuard,
    ),
  };
}

test("set executor prepare injects endpoint, payload, and existing data", async () => {
  const { setExecutor } = createExecutors();

  const created = await setExecutor.prepare(
    `
<htx:action>update</htx:action>
<htx:type>post</htx:type>
<htx>
<form hx-post="__endpoint__" hx-vals="__payload__">
  <input name="title" value="__title__" />
</form>
</htx>
`,
    "site:1",
    { id: "42", title: "Existing Title" },
  );

  expect(created.html).toContain("/api/content/update");
  expect(created.html).toContain("Existing Title");
  expect(created.html).not.toContain("__endpoint__");
  expect(created.html).not.toContain("__payload__");
  expect(created.token).toBeString();
});

test("set executor create/update paths normalize internal fields and support redirect", async () => {
  const { adapter, setExecutor, tokenService } = createExecutors();

  const issuedCreate = await tokenService.issue("site:1", "save");
  const created = await setExecutor.execute(
    issuedCreate.token,
    "save",
    null,
    {
      type: "post",
      title: "New Post",
      body: "Hello",
      "htx-token": "discard-me",
      "htx-context": "save",
    },
    { success: "<div>Created: __title__</div>" },
  );

  expect(created.mode).toBe("success");
  expect(created.html).toContain("Created: New Post");
  expect(created.record.title).toBe("New Post");
  expect(created.record).not.toHaveProperty("htx-token");

  const issuedRedirect = await tokenService.issue("site:1", "save");
  const redirected = await setExecutor.execute(
    issuedRedirect.token,
    "save",
    null,
    { type: "post", title: "Redirect Post" },
    { redirect: "/posts/%%slug%%" },
  );

  expect(redirected.mode).toBe("redirect");
  expect(redirected.html).toContain("/posts/redirect-post");

  const existing = adapter.create("post", { title: "Old Title", body: "Old body" });
  const existingId = String(existing.id);
  const issuedUpdate = await tokenService.issue("site:1", "update", existingId);
  const updated = await setExecutor.execute(
    issuedUpdate.token,
    "update",
    existingId,
    { type: "post", title: "New Title" },
    { success: "<div>Updated: __title__</div>" },
  );

  expect(updated.mode).toBe("success");
  expect(updated.html).toContain("Updated: New Title");
});

test("mutation executors preserve raw blocks in final responses", async () => {
  const { setExecutor, tokenService } = createExecutors();

  const issued = await tokenService.issue("site:1", "save");
  const result = await setExecutor.execute(
    issued.token,
    "save",
    null,
    { type: "post", title: "Created Post" },
    {
      success:
        '<htx:raw><pre><code><a href="/posts/__slug__">{{ title }}</a></code></pre></htx:raw>',
    },
  );

  expect(result.mode).toBe("success");
  expect(result.html).toContain('<pre><code><a href="/posts/__slug__">{{ title }}</a></code></pre>');
  expect(result.html).not.toContain("<htx:raw>");
});

test("set executor rejects replay and context mismatch", async () => {
  const { setExecutor, tokenService } = createExecutors();

  const issued = await tokenService.issue("site:1", "save");
  await setExecutor.execute(issued.token, "save", null, {
    type: "post",
    title: "First",
  });

  expect(
    setExecutor.execute(issued.token, "save", null, {
      type: "post",
      title: "Second",
    }),
  ).rejects.toThrow(/replay/i);


  const contextMismatch = await tokenService.issue("site:1", "save");
  expect(
    setExecutor.execute(contextMismatch.token, "delete", null, {
      type: "post",
      title: "Hack",
    }),
  ).rejects.toThrow(/Context mismatch/);
});

test("set executor supports the full prepare and execute lifecycle", async () => {
  const { adapter, setExecutor } = createExecutors();

  const dsl = `
<htx:action>save</htx:action>
<htx:type>post</htx:type>
<htx:responsesuccess>
<div class="alert">Created "%%title%%"!</div>
</htx:responsesuccess>
<htx>
<form hx-post="__endpoint__" hx-vals='__payload__'>
  <input name="title" required />
  <button type="submit">Create</button>
</form>
</htx>
`;

  const prepared = await setExecutor.prepare(dsl, "site:1");
  const parsed = new DSLParser().parse(dsl);
  const result = await setExecutor.execute(prepared.token, "save", null, {
    type: "post",
    title: "My Article",
    body: "Content here",
  }, parsed.responses);

  expect(result.mode).toBe("success");
  expect(result.html).toContain("Created");
  expect(result.html).toContain("My Article");
  expect(adapter.findBySlug("post", "my-article")).not.toBeNull();
});

test("set executor returns an error response when the resolved adapter is read-only", async () => {
  const tokenService = new ActionTokenService(TEST_KEY);
  const replayGuard = new InMemoryReplayGuard();
  const setExecutor = new SetContentExecutor(
    new DSLParser(),
    new AdapterRegistry({
      default: new InMemoryAdapter(),
      documentation: new ReadOnlyAdapter(),
    }),
    new Hydrator(),
    new ExpressionEngine(),
    tokenService,
    replayGuard,
  );

  const issued = await tokenService.issue("site:1", "save");
  const result = await setExecutor.execute(
    issued.token,
    "save",
    null,
    { type: "documentation", title: "Doc Title" },
    { error: "<div>__error__</div>" },
  );

  expect(result.mode).toBe("error");
  expect(result.html).toContain("Read-only adapter");
});

test("delete executor prepare and execute remove records and support redirects", async () => {
  const { adapter, deleteExecutor, tokenService } = createExecutors();
  const record = adapter.create("post", { title: "To Delete", slug: "to-delete" });
  const recordId = String(record.id);

  const prepared = await deleteExecutor.prepare(
    `
<htx:action>delete</htx:action>
<htx:type>post</htx:type>
<htx>
<form hx-post="__endpoint__">
  <p>Delete "__title__"?</p>
  <button>Confirm</button>
</form>
</htx>
`,
    "site:1",
    record,
  );

  expect(prepared.html).toContain("To Delete");
  expect(prepared.token).toBeString();

  const issuedDelete = await tokenService.issue("site:1", "delete", recordId);
  const deleted = await deleteExecutor.execute(issuedDelete.token, recordId, "post", {
    success: "<div>Deleted __title__</div>",
  });

  expect(deleted.mode).toBe("success");
  expect(deleted.html).toContain("Deleted To Delete");
  expect(adapter.find("post", recordId)).toBeNull();

  const redirectRecord = adapter.create("post", { title: "Gone", slug: "gone" });
  const redirectId = String(redirectRecord.id);
  const issuedRedirect = await tokenService.issue("site:1", "delete", redirectId);
  const redirected = await deleteExecutor.execute(issuedRedirect.token, redirectId, "post", {
    redirect: "/posts",
  });

  expect(redirected.mode).toBe("redirect");
  expect(redirected.html).toBe("/posts");
});

test("delete executor rejects replay and record mismatches", async () => {
  const { adapter, deleteExecutor, tokenService } = createExecutors();
  const record = adapter.create("post", { title: "Test" });
  const recordId = String(record.id);

  const issued = await tokenService.issue("site:1", "delete", recordId);
  await deleteExecutor.execute(issued.token, recordId, "post");

  expect(deleteExecutor.execute(issued.token, recordId, "post")).rejects.toThrow(/replay/i);

  const other = adapter.create("post", { title: "Other" });
  const otherId = String(other.id);
  const mismatchToken = await tokenService.issue("site:1", "delete", otherId);

  expect(deleteExecutor.execute(mismatchToken.token, recordId, "post")).rejects.toThrow(
    /Record ID mismatch/,
  );
});
