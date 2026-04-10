import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

// ── Queries ──

export const list = query({
  args: {
    type: v.string(),
    status: v.optional(v.string()),
    order: v.optional(v.string()),
    howmany: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q;
    if (args.status) {
      q = ctx.db.query("content").withIndex("by_type_status", (q) =>
        q.eq("type", args.type).eq("status", args.status)
      );
    } else {
      q = ctx.db.query("content").withIndex("by_type", (q) => q.eq("type", args.type));
    }

    if (args.order === "newest" || args.order === "updated") {
      q = q.order("desc");
    } else {
      q = q.order("asc");
    }

    const limit = args.howmany ?? 100;
    const results = await q.take(limit + 1);
    const hasMore = results.length > limit;
    const rows = results.slice(0, limit);

    return { rows, total: hasMore ? limit + 1 : results.length };
  },
});

export const getById = query({
  args: { id: v.id("content") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBySlug = query({
  args: { type: v.string(), slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("content")
      .withIndex("by_type_slug", (q) => q.eq("type", args.type).eq("slug", args.slug))
      .first();
  },
});

export const filtered = query({
  args: {
    type: v.string(),
    filters: v.optional(v.array(v.object({
      field: v.string(),
      op: v.string(),
      value: v.string(),
    }))),
    order: v.optional(v.string()),
    howmany: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Route to the best index based on filters
    const slugFilter = args.filters?.find(
      (f) => f.field === "slug" && (f.op === "eq" || f.op === "=")
    );
    const parentFilter = args.filters?.find(
      (f) => (f.field === "collection_slug" || f.field === "category_slug") && (f.op === "eq" || f.op === "=")
    );
    const statusFilter = args.filters?.find(
      (f) => f.field === "status" && (f.op === "eq" || f.op === "=")
    );

    let indexedFilters = new Set<typeof slugFilter>();
    let q;

    if (slugFilter) {
      // Use by_type_slug compound index — O(1) lookup
      q = ctx.db.query("content").withIndex("by_type_slug", (iq) =>
        iq.eq("type", args.type).eq("slug", slugFilter.value)
      );
      indexedFilters.add(slugFilter);
    } else if (parentFilter) {
      // Use by_type_parent compound index — scoped to parent
      q = ctx.db.query("content").withIndex("by_type_parent", (iq) =>
        iq.eq("type", args.type).eq("parentSlug", parentFilter.value)
      );
      indexedFilters.add(parentFilter);
    } else if (statusFilter) {
      // Use by_type_status compound index — narrows scan to published/draft
      q = ctx.db.query("content").withIndex("by_type_status", (iq) =>
        iq.eq("type", args.type).eq("status", statusFilter.value)
      );
      indexedFilters.add(statusFilter);
    } else {
      q = ctx.db.query("content").withIndex("by_type", (iq) => iq.eq("type", args.type));
    }

    const remainingFilters = args.filters?.filter((f) => !indexedFilters.has(f)) ?? [];

    for (const filter of remainingFilters) {
      const { field, op, value } = filter;
      q = q.filter((f) => {
        const fieldRef = field === "status" || field === "type" || field === "slug" || field === "title"
          ? f.field(field as any)
          : f.field(`meta.${field}` as any);

        switch (op) {
          case "=": case "eq": return f.eq(fieldRef, value);
          case "!=": case "neq": return f.neq(fieldRef, value);
          case ">": case "gt": return f.gt(fieldRef, value);
          case "<": case "lt": return f.lt(fieldRef, value);
          case ">=": case "gte": return f.gte(fieldRef, value);
          case "<=": case "lte": return f.lte(fieldRef, value);
          default: return f.eq(fieldRef, value);
        }
      });
    }

    if (args.order === "newest" || args.order === "updated") {
      q = q.order("desc");
    }

    const limit = args.howmany ?? 100;
    const skip = args.offset ?? 0;

    const results = await q.take(skip + limit + 1);
    const rows = results.slice(skip, skip + limit);
    const hasMore = results.length > skip + limit;

    return { rows, total: hasMore ? skip + limit + 1 : results.length };
  },
});

// ── Mutations ──

export const create = mutation({
  args: {
    type: v.string(),
    slug: v.string(),
    title: v.string(),
    body: v.optional(v.string()),
    status: v.optional(v.string()),
    meta: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    const meta = args.meta ?? {};
    const parentSlug = meta.collection_slug ?? meta.category_slug ?? undefined;
    const id = await ctx.db.insert("content", {
      type: args.type,
      slug: args.slug,
      title: args.title,
      body: args.body ?? "",
      status: args.status ?? "draft",
      meta,
      parentSlug,
      createdAt: now,
      updatedAt: now,
    });
    return await ctx.db.get(id);
  },
});

export const backfillParentSlug = mutation({
  args: { type: v.string(), batchSize: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const batch = args.batchSize ?? 500;
    const docs = await ctx.db
      .query("content")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .filter((f) => f.eq(f.field("parentSlug"), undefined))
      .take(batch);

    let updated = 0;
    for (const doc of docs) {
      const meta = doc.meta as any;
      const parentSlug = meta?.collection_slug ?? meta?.category_slug;
      if (parentSlug) {
        await ctx.db.patch(doc._id, { parentSlug });
        updated++;
      }
    }
    return { updated, remaining: docs.length === batch };
  },
});

export const update = mutation({
  args: {
    id: v.id("content"),
    fields: v.any(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    await ctx.db.patch(args.id, { ...args.fields, updatedAt: now });
    return await ctx.db.get(args.id);
  },
});

export const remove = mutation({
  args: { id: v.id("content") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
