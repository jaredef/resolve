import type { Module, ModuleRegistry, ContextProvider, HtxRequest } from "@htx/engine";
import type { SQLiteAdapter } from "@htx/adapter-sqlite";
import Database from "bun:sqlite";

class StoreContextProvider implements ContextProvider {
  private readonly adapter: SQLiteAdapter;
  private readonly db: InstanceType<typeof Database>;

  constructor(adapter: SQLiteAdapter, dbPath: string) {
    this.adapter = adapter;
    this.db = new Database(dbPath, { readonly: true });
  }

  resolve(request: HtxRequest): Record<string, unknown> {
    const path = request.path;

    if (!path.startsWith("/store-fast")) {
      return {};
    }

    if (path === "/store-fast") {
      return this.resolveHomePage();
    }

    if (path.startsWith("/store-fast/collections/")) {
      const slug = path.replace("/store-fast/collections/", "").replace(/\/$/, "");
      return this.resolveCollectionPage(slug);
    }

    const pathParts = path.replace("/store-fast/", "").split("/");
    if (pathParts.length === 2) {
      return this.resolveProductPage(pathParts[1]);
    }
    if (pathParts.length === 1 && pathParts[0]) {
      return this.resolveCategoryPage(pathParts[0]);
    }

    return {};
  }

  private decodeRow(row: Record<string, unknown>): Record<string, unknown> {
    const meta = typeof row.meta === "string" && row.meta !== "" ? JSON.parse(row.meta as string) : {};
    const { meta: _, ...rest } = row;
    return { ...rest, ...meta };
  }

  private resolveHomePage(): Record<string, unknown> {
    const collRows = this.db.query("SELECT * FROM content WHERE type = 'store-collection' AND status = 'published' ORDER BY id ASC LIMIT 20").all() as Record<string, unknown>[];
    const collections = collRows.map((row) => {
      const coll = this.decodeRow(row);
      const catRows = this.db.query("SELECT * FROM content WHERE type = 'store-category' AND json_extract(meta, '$.collection_id') = ? ORDER BY id ASC LIMIT 5").all(String(coll.id)) as Record<string, unknown>[];
      return { ...coll, categories: catRows.map((r) => this.decodeRow(r)) };
    });

    const countRow = this.db.query("SELECT COUNT(*) as c FROM content WHERE type = 'store-product'").get() as { c: number };

    return { collections, productCount: countRow.c };
  }

  private resolveCollectionPage(slug: string): Record<string, unknown> {
    const collRow = this.db.query("SELECT * FROM content WHERE type = 'store-collection' AND slug = ?").get(slug) as Record<string, unknown> | null;
    if (!collRow) return { collection: null, categories: [] };
    const collection = this.decodeRow(collRow);

    const catRows = this.db.query("SELECT * FROM content WHERE type = 'store-category' AND json_extract(meta, '$.collection_id') = ? ORDER BY id ASC").all(String(collection.id)) as Record<string, unknown>[];
    const categories = catRows.map((catRow) => {
      const cat = this.decodeRow(catRow);
      const prodRows = this.db.query("SELECT * FROM content WHERE type = 'store-product' AND json_extract(meta, '$.category_id') = ? ORDER BY id ASC LIMIT 6").all(String(cat.id)) as Record<string, unknown>[];
      return { ...cat, products: prodRows.map((r) => this.decodeRow(r)) };
    });

    return {
      collection: { title: String(collection.title ?? ""), summary: String(collection.summary ?? "") },
      categories,
    };
  }

  private resolveCategoryPage(slug: string): Record<string, unknown> {
    const catRow = this.db.query("SELECT * FROM content WHERE type = 'store-category' AND slug = ?").get(slug) as Record<string, unknown> | null;
    if (!catRow) return { category: null, products: [] };
    const category = this.decodeRow(catRow);

    const prodRows = this.db.query("SELECT * FROM content WHERE type = 'store-product' AND json_extract(meta, '$.category_id') = ? ORDER BY id ASC").all(String(category.id)) as Record<string, unknown>[];

    return {
      category: { title: String(category.title ?? ""), summary: String(category.summary ?? ""), slug: String(category.slug ?? "") },
      products: prodRows.map((r) => this.decodeRow(r)),
    };
  }

  private resolveProductPage(slug: string): Record<string, unknown> {
    const prodRow = this.db.query("SELECT * FROM content WHERE type = 'store-product' AND slug = ?").get(slug) as Record<string, unknown> | null;
    if (!prodRow) return { productTitle: "", productPrice: "", productBody: "", related: [] };
    const product = this.decodeRow(prodRow);

    const relatedRows = this.db.query("SELECT * FROM content WHERE type = 'store-product' AND json_extract(meta, '$.category_id') = ? ORDER BY id ASC LIMIT 6").all(String(product.category_id)) as Record<string, unknown>[];

    return {
      product: { title: String(product.title ?? ""), price: String(product.price ?? ""), body: String(product.body ?? ""), slug: String(product.slug ?? "") },
      related: relatedRows.map((r) => this.decodeRow(r)),
    };
  }
}

export class StoreContextModule implements Module {
  private readonly adapter: SQLiteAdapter;
  private readonly dbPath: string;

  constructor(adapter: SQLiteAdapter, dbPath: string) {
    this.adapter = adapter;
    this.dbPath = dbPath;
  }

  name(): string {
    return "store-context";
  }

  boot(registry: ModuleRegistry): void {
    registry.registerContextProvider("store", new StoreContextProvider(this.adapter, this.dbPath));
  }
}
