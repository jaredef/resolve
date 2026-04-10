import { ConvexHttpClient } from "convex/browser";
import type {
  ContentAdapter,
  ContentId,
  ContentRow,
  ContentSchema,
  QueryMeta,
  QueryResult,
} from "../../htx-engine/src/contracts/content-adapter";

const SYSTEM_COLUMNS = new Set(["id", "type", "slug", "title", "body", "status", "created_at", "updated_at"]);

interface ConvexAdapterOptions {
  url: string;
  token?: string;
}

export class ConvexAdapter implements ContentAdapter {
  private readonly client: ConvexHttpClient;
  private readonly api: any;

  constructor(options: ConvexAdapterOptions, api: any) {
    this.client = new ConvexHttpClient(options.url);
    if (options.token) {
      this.client.setAuth(options.token);
    }
    this.api = api;
  }

  async query(meta: QueryMeta): Promise<QueryResult> {
    const filters = this.parseWhere(meta.where);

    const result = await this.client.query(this.api.content.filtered, {
      type: meta.type,
      filters: filters.length > 0 ? filters : undefined,
      order: meta.order,
      howmany: meta.howmany != null ? Number(meta.howmany) : undefined,
      offset: meta.offset != null ? Number(meta.offset) : undefined,
    });

    return {
      rows: result.rows.map((row: any) => this.decodeRow(row)),
      total: result.total,
    };
  }

  async find(type: string, id: ContentId): Promise<ContentRow | null> {
    try {
      const row = await this.client.query(this.api.content.getById, { id: String(id) });
      return row ? this.decodeRow(row) : null;
    } catch {
      return null;
    }
  }

  async findBySlug(type: string, slug: string): Promise<ContentRow | null> {
    const row = await this.client.query(this.api.content.getBySlug, { type, slug });
    return row ? this.decodeRow(row) : null;
  }

  async create(type: string, data: Record<string, unknown>): Promise<ContentRow> {
    const { systemFields, metaFields } = this.separateFields(data);
    const slug = String(systemFields.slug ?? this.slugify(String(systemFields.title ?? "")));

    const row = await this.client.mutation(this.api.content.create, {
      type,
      slug,
      title: String(systemFields.title ?? ""),
      body: String(systemFields.body ?? ""),
      status: String(systemFields.status ?? "draft"),
      meta: metaFields,
    });

    return this.decodeRow(row);
  }

  async update(type: string, id: ContentId, data: Record<string, unknown>): Promise<ContentRow> {
    const existing = await this.find(type, id);
    if (!existing) {
      throw new Error(`Record not found: ${type}/${id}`);
    }

    const { systemFields, metaFields } = this.separateFields(data);
    const updateFields: Record<string, unknown> = {};

    if (systemFields.title !== undefined) updateFields.title = String(systemFields.title);
    if (systemFields.slug !== undefined) updateFields.slug = String(systemFields.slug);
    if (systemFields.body !== undefined) updateFields.body = String(systemFields.body);
    if (systemFields.status !== undefined) updateFields.status = String(systemFields.status);

    if (Object.keys(metaFields).length > 0) {
      const existingMeta = (existing as any)._meta ?? {};
      updateFields.meta = { ...existingMeta, ...metaFields };
    }

    const row = await this.client.mutation(this.api.content.update, {
      id: String(id),
      fields: updateFields,
    });

    return this.decodeRow(row);
  }

  async delete(type: string, id: ContentId): Promise<void> {
    await this.client.mutation(this.api.content.remove, { id: String(id) });
  }

  schema(_type: string): ContentSchema | null {
    return null;
  }

  private decodeRow(row: any): ContentRow {
    const meta = row.meta && typeof row.meta === "object" ? row.meta : {};
    return {
      id: row._id,
      type: row.type,
      slug: row.slug,
      title: row.title,
      body: row.body ?? "",
      status: row.status ?? "",
      created_at: row.createdAt ?? "",
      updated_at: row.updatedAt ?? "",
      ...meta,
    };
  }

  private separateFields(data: Record<string, unknown>): {
    systemFields: Record<string, unknown>;
    metaFields: Record<string, unknown>;
  } {
    const systemFields: Record<string, unknown> = {};
    const metaFields: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
      if (SYSTEM_COLUMNS.has(key)) {
        systemFields[key] = value;
      } else {
        metaFields[key] = value;
      }
    }

    return { systemFields, metaFields };
  }

  private parseWhere(where?: string): Array<{ field: string; op: string; value: string }> {
    if (!where) return [];

    return where.split(",").map((condition) => {
      const operators = ["!=", ">=", "<=", ">", "<", "="];
      for (const op of operators) {
        const idx = condition.indexOf(op);
        if (idx !== -1) {
          return {
            field: condition.slice(0, idx).trim(),
            op: op === "=" ? "eq" : op === "!=" ? "neq" : op === ">" ? "gt" : op === "<" ? "lt" : op === ">=" ? "gte" : "lte",
            value: condition.slice(idx + op.length).trim(),
          };
        }
      }
      return { field: condition, op: "eq", value: "" };
    });
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
}
