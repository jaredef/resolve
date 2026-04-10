import { mkdirSync } from "node:fs";
import path from "node:path";

import type { ContentAdapter, ContentRow } from "@htx/engine";
import { SQLiteAdapter } from "@htx/adapter-sqlite";

import { createDogfoodAppConfig } from "./config";
import { DOCUMENTATION_ARTICLES } from "./docs-content";

export interface DocumentationSeedResult {
  created: number;
  updated: number;
  total: number;
}

export function seedDocumentationContent(adapter: ContentAdapter): DocumentationSeedResult {
  let created = 0;
  let updated = 0;

  for (const article of DOCUMENTATION_ARTICLES) {
    const existing = adapter.findBySlug("documentation", article.slug);

    if (existing) {
      adapter.update("documentation", String(existing.id ?? ""), article);
      updated += 1;
    } else {
      adapter.create("documentation", article);
      created += 1;
    }
  }

  return {
    created,
    updated,
    total: DOCUMENTATION_ARTICLES.length,
  };
}

export function seedDocumentationDatabase(databasePath?: string): DocumentationSeedResult {
  const config = createDogfoodAppConfig(
    databasePath ? { databasePath } : {},
  );
  mkdirSync(path.dirname(config.databasePath), { recursive: true });

  const adapter = new SQLiteAdapter(config.databasePath);

  try {
    return seedDocumentationContent(adapter);
  } finally {
    adapter.getDatabase().close(false);
  }
}

if (import.meta.main) {
  const result = seedDocumentationDatabase();
  console.log(
    `Documentation seed complete. Created: ${result.created}, Updated: ${result.updated}, Total: ${result.total}`,
  );
}
