import type { Module, ModuleRegistry } from "@htx/engine";
import { BaseContextProvider } from "@htx/engine";
import type { ProviderRouteMap } from "@htx/engine";
import { SQLiteAdapter } from "@htx/adapter-sqlite";
import Database from "bun:sqlite";

class DocsContextProvider extends BaseContextProvider {
  private readonly db: InstanceType<typeof Database>;

  constructor(dbPath: string) {
    super();
    this.db = new Database(dbPath, { readonly: true });
  }

  routes(): ProviderRouteMap {
    return {
      "/docs": () => this.resolveIndex(),
      "/docs/:slug": (params) => this.resolveDoc(params.slug),
    };
  }

  private resolveIndex(): Record<string, unknown> {
    // Single query — get ALL published docs, group in JS
    const rows = this.db.query(
      "SELECT slug, title, meta FROM content WHERE type = 'documentation' AND status = 'published' ORDER BY id ASC"
    ).all() as Array<{ slug: string; title: string; meta: string }>;

    const sections: Record<string, Array<{ slug: string; title: string; summary: string }>> = {};

    for (const row of rows) {
      const meta = typeof row.meta === "string" ? JSON.parse(row.meta) : {};
      const section = meta.section ?? "other";
      if (!sections[section]) sections[section] = [];
      sections[section].push({
        slug: row.slug,
        title: row.title,
        summary: meta.summary ?? "",
      });
    }

    return {
      total: rows.length,
      sections,
      gettingStarted: sections["getting-started"] ?? [],
      coreConcepts: sections["core-concepts"] ?? [],
      realTime: sections["real-time"] ?? [],
      buildingPages: sections["building-pages"] ?? [],
      engineInternals: sections["engine-internals"] ?? [],
      guides: sections["guides"] ?? [],
      operations: sections["operations"] ?? [],
      apiReference: sections["api-reference"] ?? [],
      adapters: sections["adapters"] ?? [],
    };
  }

  private resolveDoc(slug: string): Record<string, unknown> {
    const row = this.db.query(
      "SELECT slug, title, body, meta FROM content WHERE type = 'documentation' AND slug = ? AND status = 'published'"
    ).get(slug) as { slug: string; title: string; body: string; meta: string } | null;

    if (!row) return { doc: null };

    const meta = typeof row.meta === "string" ? JSON.parse(row.meta) : {};

    return {
      doc: {
        slug: row.slug,
        title: row.title,
        body: row.body,
        body_html: meta.body_html ?? "",
        summary: meta.summary ?? "",
        section: meta.section ?? "",
      },
    };
  }
}

export class DocsContextModule implements Module {
  private readonly dbPath: string;

  constructor(dbPath: string) {
    this.dbPath = dbPath;
  }

  name(): string {
    return "docs-context";
  }

  boot(registry: ModuleRegistry): void {
    registry.registerContextProvider("docs", new DocsContextProvider(this.dbPath));
  }
}
