import type { Module, ModuleRegistry, ContextProvider, HtxRequest } from "@htx/engine";
import { ConvexHttpClient } from "convex/browser";

type FilterEntry = { field: string; op: string; value: string };

class ConvexStoreContextProvider implements ContextProvider {
  private readonly client: ConvexHttpClient;
  private readonly api: any;

  constructor(client: ConvexHttpClient, api: any) {
    this.client = client;
    this.api = api;
  }

  async resolve(request: HtxRequest): Promise<Record<string, unknown>> {
    const clean = request.path.replace(/\/$/, "");
    if (!clean.startsWith("/htx-faster")) return {};

    if (clean === "/htx-faster") return this.resolveHomePage();
    if (clean.startsWith("/htx-faster/collections/")) {
      return this.resolveCollectionPage(clean.slice("/htx-faster/collections/".length));
    }

    const parts = clean.slice("/htx-faster/".length).split("/");
    if (parts.length === 2) return this.resolveProductPage(parts[1]);
    if (parts.length === 1 && parts[0]) return this.resolveCategoryPage(parts[0]);

    return {};
  }

  private decodeRow(row: any): Record<string, unknown> {
    const meta = row.meta && typeof row.meta === "object" ? row.meta : {};
    return {
      id: row._id,
      slug: row.slug,
      title: row.title,
      body: row.body ?? "",
      status: row.status ?? "",
      ...meta,
    };
  }

  private async query(type: string, filters?: FilterEntry[], howmany?: number) {
    return this.client.query(this.api.content.filtered, {
      type,
      filters: filters?.length ? filters : undefined,
      howmany,
    });
  }

  private async resolveHomePage(): Promise<Record<string, unknown>> {
    const [collections, categories] = await Promise.all([
      this.query("fp-collection", [{ field: "status", op: "eq", value: "published" }], 99),
      this.query("fp-category", [{ field: "status", op: "eq", value: "published" }], 100),
    ]);

    const decodedCats = categories.rows.map((r: any) => this.decodeRow(r));
    const decodedColls = collections.rows.map((r: any) => {
      const coll = this.decodeRow(r);
      return {
        ...coll,
        categories: decodedCats.filter((c: any) => c.collection_slug === coll.slug).slice(0, 5),
      };
    });

    return { collections: decodedColls };
  }

  private async resolveCollectionPage(slug: string): Promise<Record<string, unknown>> {
    const [collResult, catResult] = await Promise.all([
      this.query("fp-collection", [{ field: "slug", op: "eq", value: slug }], 1),
      this.query("fp-category", [{ field: "collection_slug", op: "eq", value: slug }], 30),
    ]);

    if (!collResult.rows.length) return { collection: null, categories: [] };
    const collection = this.decodeRow(collResult.rows[0]);

    return {
      collection: { title: String(collection.title ?? ""), summary: String(collection.summary ?? "") },
      categories: catResult.rows.map((r: any) => this.decodeRow(r)),
    };
  }

  private async resolveCategoryPage(slug: string): Promise<Record<string, unknown>> {
    // Both queries fire in parallel — one round-trip window
    const [catResult, prodResult] = await Promise.all([
      this.query("fp-category", [{ field: "slug", op: "eq", value: slug }], 1),
      this.query("fp-product", [{ field: "category_slug", op: "eq", value: slug }]),
    ]);

    const category = catResult.rows.length ? this.decodeRow(catResult.rows[0]) : null;

    return {
      category: category
        ? { title: String(category.title ?? ""), summary: String(category.summary ?? ""), slug: String(category.slug ?? "") }
        : null,
      products: prodResult.rows.map((r: any) => this.decodeRow(r)),
    };
  }

  private async resolveProductPage(slug: string): Promise<Record<string, unknown>> {
    const prodResult = await this.query("fp-product", [{ field: "slug", op: "eq", value: slug }], 1);
    if (!prodResult.rows.length) return { product: null, related: [] };
    const product = this.decodeRow(prodResult.rows[0]);

    const relatedResult = await this.query(
      "fp-product",
      [{ field: "category_slug", op: "eq", value: String(product.category_slug ?? "") }],
      7,
    );

    return {
      product: {
        title: String(product.title ?? ""),
        price: String(product.price ?? ""),
        body: String(product.body ?? ""),
        slug: String(product.slug ?? ""),
      },
      related: relatedResult.rows.map((r: any) => this.decodeRow(r)).filter((r: any) => r.slug !== slug),
    };
  }
}

export class ConvexStoreContextModule implements Module {
  private readonly client: ConvexHttpClient;
  private readonly api: any;

  constructor(convexUrl: string, api: any, token?: string) {
    this.client = new ConvexHttpClient(convexUrl);
    if (token) this.client.setAuth(token);
    this.api = api;
  }

  name(): string {
    return "convex-store-context";
  }

  boot(registry: ModuleRegistry): void {
    registry.registerContextProvider("fp", new ConvexStoreContextProvider(this.client, this.api));
  }
}
