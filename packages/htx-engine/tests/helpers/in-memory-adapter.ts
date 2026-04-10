import type {
  ContentAdapter,
  ContentId,
  ContentRow,
  ContentSchema,
  QueryMeta,
  QueryResult,
} from "../../src";

export class InMemoryAdapter implements ContentAdapter {
  private readonly store: Record<string, ContentRow[]> = {};
  private nextId = 1;

  query(meta: QueryMeta): QueryResult {
    const type = meta.type ?? "";

    if (meta.slug) {
      const record = this.findBySlug(type, meta.slug);
      return record ? { rows: [record], total: 1 } : { rows: [], total: 0 };
    }

    let rows = [...(this.store[type] ?? [])];

    if (meta.where) {
      rows = this.applyWhere(rows, meta.where);
    }

    const order = meta.order ?? "oldest";
    rows.sort((a, b) => {
      const aTime = Date.parse(String(a.created_at ?? "2000-01-01"));
      const bTime = Date.parse(String(b.created_at ?? "2000-01-01"));
      return order === "newest" ? bTime - aTime : aTime - bTime;
    });

    const total = rows.length;
    const offset = Number(meta.offset ?? 0);
    const limit = Number(meta.howmany ?? 50);
    rows = rows.slice(offset, offset + limit);

    if (meta.fields) {
      const fields = meta.fields.split(",").map((field) => field.trim());
      fields.push("id", "type");
      rows = rows.map((row) =>
        Object.fromEntries(Object.entries(row).filter(([key]) => fields.includes(key))),
      );
    }

    return { rows, total };
  }

  find(type: string, id: ContentId): ContentRow | null {
    for (const record of this.store[type] ?? []) {
      if (String(record.id) === String(id)) {
        return record;
      }
    }
    return null;
  }

  findBySlug(type: string, slug: string): ContentRow | null {
    for (const record of this.store[type] ?? []) {
      if ((record.slug ?? "") === slug) {
        return record;
      }
    }
    return null;
  }

  create(type: string, data: Record<string, unknown>): ContentRow {
    const record: ContentRow = {
      ...data,
      id: this.nextId++,
      type,
      created_at: data.created_at ?? new Date().toISOString().slice(0, 19).replace("T", " "),
      updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    if (record.slug === undefined && record.title !== undefined) {
      record.slug = String(record.title).trim().replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    }

    if (!this.store[type]) {
      this.store[type] = [];
    }
    this.store[type].push(record);
    return record;
  }

  update(type: string, id: ContentId, data: Record<string, unknown>): ContentRow {
    const rows = this.store[type];
    if (!rows) {
      throw new Error(`Record not found: ${type}#${String(id)}`);
    }

    for (let index = 0; index < rows.length; index += 1) {
      if (String(rows[index].id) === String(id)) {
        rows[index] = {
          ...rows[index],
          ...data,
          updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        };
        return rows[index];
      }
    }

    throw new Error(`Record not found: ${type}#${String(id)}`);
  }

  delete(type: string, id: ContentId): void {
    if (!this.store[type]) {
      return;
    }
    this.store[type] = this.store[type].filter((record) => String(record.id) !== String(id));
  }

  schema(_type: string): ContentSchema | null {
    return null;
  }

  seed(type: string, records: Array<Record<string, unknown>>): void {
    for (const record of records) {
      this.create(type, record);
    }
  }

  reset(): void {
    for (const key of Object.keys(this.store)) {
      delete this.store[key];
    }
    this.nextId = 1;
  }

  private applyWhere(rows: ContentRow[], where: string): ContentRow[] {
    const conditions = where.split(",").map((condition) => condition.trim());

    return rows.filter((row) => {
      for (const condition of conditions) {
        if (condition.includes("!=")) {
          const [field, value] = condition.split("!=", 2).map((part) => part.trim());
          if ((row[field] ?? "") === value) {
            return false;
          }
          continue;
        }

        if (condition.includes(">=")) {
          const [field, value] = condition.split(">=", 2).map((part) => part.trim());
          if (Number(row[field] ?? 0) < Number(value)) {
            return false;
          }
          continue;
        }

        if (condition.includes("<=")) {
          const [field, value] = condition.split("<=", 2).map((part) => part.trim());
          if (Number(row[field] ?? 0) > Number(value)) {
            return false;
          }
          continue;
        }

        if (condition.includes("=")) {
          const [field, value] = condition.split("=", 2).map((part) => part.trim());
          if ((row[field] ?? "") !== value) {
            return false;
          }
        }
      }

      return true;
    });
  }
}
