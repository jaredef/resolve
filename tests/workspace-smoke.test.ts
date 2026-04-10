import { expect, test } from "bun:test";

import { markdownAdapterPackageName } from "@htx/adapter-markdown";
import { sqliteAdapterPackageName } from "@htx/adapter-sqlite";
import { cliPackageName } from "@htx/cli";
import { enginePackageName } from "@htx/engine";
import { createHypermediaAppPackageName } from "create-hypermedia-app";

test("workspace packages resolve from their public entrypoints", () => {
  expect(enginePackageName).toBe("@htx/engine");
  expect(markdownAdapterPackageName).toBe("@htx/adapter-markdown");
  expect(sqliteAdapterPackageName).toBe("@htx/adapter-sqlite");
  expect(cliPackageName).toBe("@htx/cli");
  expect(createHypermediaAppPackageName).toBe("create-hypermedia-app");
});
