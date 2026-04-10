import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  content: defineTable({
    type: v.string(),
    slug: v.string(),
    title: v.string(),
    body: v.optional(v.string()),
    status: v.optional(v.string()),
    meta: v.optional(v.any()),
    parentSlug: v.optional(v.string()),
    createdAt: v.optional(v.string()),
    updatedAt: v.optional(v.string()),
  })
    .index("by_type", ["type"])
    .index("by_type_slug", ["type", "slug"])
    .index("by_type_status", ["type", "status"])
    .index("by_type_parent", ["type", "parentSlug"]),
});
