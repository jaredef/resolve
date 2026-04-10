import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { marked } from "marked";

import type { ContentAdapter, ContentId, ContentRow, ContentSchema, QueryMeta, QueryResult } from "@htx/engine";
import { HtxDiagnosticError } from "@htx/engine";

const SYSTEM_COLUMNS = new Set([
  "id",
  "type",
  "slug",
  "title",
  "body",
  "body_html",
  "status",
  "created_at",
  "updated_at",
]);

interface IndexedRow extends ContentRow {
  id: ContentId;
  type: string;
  slug: string;
  title: string;
  body: string;
  body_html: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ParsedFrontMatter {
  attributes: Record<string, unknown>;
  body: string;
}

function escapeLiteralSyntax(html: string): string {
  return html
    .replace(
      /__([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)?)__/g,
      "&#95;&#95;$1&#95;&#95;",
    )
    .replace(/\{\{([\s\S]*?)\}\}/g, "&#123;&#123;$1&#125;&#125;");
}

function formatTimestamp(date: Date): string {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

function normalizeScalar(input: string): unknown {
  const value = input.trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  if (value === "null") {
    return null;
  }

  if (/^-?\d+(?:\.\d+)?$/.test(value)) {
    return Number(value);
  }

  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    if (inner === "") {
      return [];
    }

    return inner.split(",").map((entry) => normalizeScalar(entry.trim()));
  }

  return value;
}

function parseFrontMatter(source: string, filePath: string): ParsedFrontMatter {
  if (!source.startsWith("---\n")) {
    return { attributes: {}, body: source };
  }

  const closingIndex = source.indexOf("\n---\n", 4);
  if (closingIndex === -1) {
    throw new HtxDiagnosticError("Unclosed front matter block.", {
      code: "MARKDOWN_FRONT_MATTER_ERROR",
      stage: "front-matter-parse",
      sourcePath: filePath,
    });
  }

  const frontMatter = source.slice(4, closingIndex);
  const body = source.slice(closingIndex + 5);
  const attributes: Record<string, unknown> = {};

  for (const rawLine of frontMatter.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      throw new HtxDiagnosticError(`Invalid front matter line "${line}". Expected "key: value".`, {
        code: "MARKDOWN_FRONT_MATTER_ERROR",
        stage: "front-matter-parse",
        sourcePath: filePath,
      });
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    if (key === "") {
      throw new HtxDiagnosticError("Front matter keys cannot be empty.", {
        code: "MARKDOWN_FRONT_MATTER_ERROR",
        stage: "front-matter-parse",
        sourcePath: filePath,
      });
    }
    attributes[key] = normalizeScalar(value);
  }

  return { attributes, body };
}

function compareValues(left: unknown, right: unknown): number {
  const leftNumber = Number(left);
  const rightNumber = Number(right);

  if (!Number.isNaN(leftNumber) && !Number.isNaN(rightNumber)) {
    if (leftNumber === rightNumber) {
      return 0;
    }

    return leftNumber > rightNumber ? 1 : -1;
  }

  const leftValue = String(left ?? "");
  const rightValue = String(right ?? "");
  return leftValue.localeCompare(rightValue);
}

function matchesCondition(row: IndexedRow, condition: string): boolean {
  for (const operator of ["!=", ">=", "<=", ">", "<", "="]) {
    const position = condition.indexOf(operator);
    if (position === -1) {
      continue;
    }

    const field = condition.slice(0, position).trim();
    const expected = normalizeScalar(condition.slice(position + operator.length).trim());
    const actual = row[field];
    const comparison = compareValues(actual, expected);

    switch (operator) {
      case "=":
        return comparison === 0;
      case "!=":
        return comparison !== 0;
      case ">":
        return comparison > 0;
      case "<":
        return comparison < 0;
      case ">=":
        return comparison >= 0;
      case "<=":
        return comparison <= 0;
      default:
        return false;
    }
  }

  return true;
}

function sortRows(rows: IndexedRow[], order: string): IndexedRow[] {
  const sorted = [...rows];

  switch (order) {
    case "oldest":
      sorted.sort((left, right) => compareValues(left.created_at, right.created_at));
      break;
    case "alpha":
    case "alphabetical":
      sorted.sort((left, right) => compareValues(left.title, right.title));
      break;
    case "alpha_desc":
      sorted.sort((left, right) => compareValues(right.title, left.title));
      break;
    case "updated":
      sorted.sort((left, right) => compareValues(right.updated_at, left.updated_at));
      break;
    case "newest":
    default:
      sorted.sort((left, right) => compareValues(right.created_at, left.created_at));
      break;
  }

  return sorted;
}

export class MarkdownAdapter implements ContentAdapter {
  private readonly contentRoot: string;
  private readonly rowsByType = new Map<string, IndexedRow[]>();
  private readonly rowsBySlug = new Map<string, Map<string, IndexedRow>>();
  private readonly rowsById = new Map<string, Map<string, IndexedRow>>();

  constructor(contentRoot: string) {
    this.contentRoot = path.resolve(contentRoot);
    this.reload();
  }

  reload(): void {
    this.rowsByType.clear();
    this.rowsBySlug.clear();
    this.rowsById.clear();
    const slugSources = new Map<string, string>();
    const idSources = new Map<string, string>();

    for (const filePath of this.walkMarkdownFiles(this.contentRoot)) {
      const row = this.loadRow(filePath);
      const slugKey = `${row.type}:${row.slug}`;
      const idKey = `${row.type}:${String(row.id)}`;
      const existingSlugSource = slugSources.get(slugKey);
      if (existingSlugSource) {
        throw new HtxDiagnosticError(
          `Duplicate slug "${row.slug}" detected for type "${row.type}".`,
          {
            code: "MARKDOWN_DUPLICATE_SLUG",
            stage: "markdown-index",
            sourcePath: filePath,
            contentType: row.type,
            relatedPaths: [existingSlugSource],
          },
        );
      }

      const existingIdSource = idSources.get(idKey);
      if (existingIdSource) {
        throw new HtxDiagnosticError(
          `Duplicate id "${String(row.id)}" detected for type "${row.type}".`,
          {
            code: "MARKDOWN_DUPLICATE_ID",
            stage: "markdown-index",
            sourcePath: filePath,
            contentType: row.type,
            relatedPaths: [existingIdSource],
          },
        );
      }

      const rows = this.rowsByType.get(row.type) ?? [];
      rows.push(row);
      this.rowsByType.set(row.type, rows);

      const typeSlugMap = this.rowsBySlug.get(row.type) ?? new Map<string, IndexedRow>();
      typeSlugMap.set(row.slug, row);
      this.rowsBySlug.set(row.type, typeSlugMap);

      const typeIdMap = this.rowsById.get(row.type) ?? new Map<string, IndexedRow>();
      typeIdMap.set(String(row.id), row);
      this.rowsById.set(row.type, typeIdMap);
      slugSources.set(slugKey, filePath);
      idSources.set(idKey, filePath);
    }
  }

  query(meta: QueryMeta): QueryResult {
    if (meta.slug) {
      const record = this.findBySlug(meta.type, meta.slug);
      return record ? { rows: [record], total: 1 } : { rows: [], total: 0 };
    }

    const rows = this.rowsByType.get(meta.type) ?? [];
    const filtered = meta.where
      ? rows.filter((row) =>
          meta.where!
            .split(",")
            .map((entry) => entry.trim())
            .filter(Boolean)
            .every((condition) => matchesCondition(row, condition)),
        )
      : rows;

    const sorted = sortRows(filtered, meta.order ?? "newest");
    const total = sorted.length;
    const offset = Number(meta.offset ?? 0);
    const howmany = Number(meta.howmany ?? 20);

    return {
      rows: sorted.slice(offset, offset + howmany),
      total,
    };
  }

  find(type: string, id: ContentId): ContentRow | null {
    return this.rowsById.get(type)?.get(String(id)) ?? null;
  }

  findBySlug(type: string, slug: string): ContentRow | null {
    return this.rowsBySlug.get(type)?.get(slug) ?? null;
  }

  create(_type: string, _data: Record<string, unknown>): ContentRow {
    throw new Error("MarkdownAdapter is read-only. create() is not supported.");
  }

  update(_type: string, _id: ContentId, _data: Record<string, unknown>): ContentRow {
    throw new Error("MarkdownAdapter is read-only. update() is not supported.");
  }

  delete(_type: string, _id: ContentId): void {
    throw new Error("MarkdownAdapter is read-only. delete() is not supported.");
  }

  schema(_type: string): ContentSchema | null {
    return null;
  }

  private walkMarkdownFiles(root: string): string[] {
    if (!path.isAbsolute(root)) {
      return [];
    }

    let stats;
    try {
      stats = statSync(root);
    } catch {
      throw new HtxDiagnosticError(`Markdown content root does not exist: ${root}`, {
        code: "MARKDOWN_CONTENT_ROOT_MISSING",
        stage: "markdown-index",
        sourcePath: root,
      });
    }

    if (!stats.isDirectory()) {
      throw new HtxDiagnosticError(`Markdown content root is not a directory: ${root}`, {
        code: "MARKDOWN_CONTENT_ROOT_INVALID",
        stage: "markdown-index",
        sourcePath: root,
      });
    }

    const files: string[] = [];
    for (const entry of readdirSync(root, { withFileTypes: true })) {
      const fullPath = path.join(root, entry.name);
      if (entry.isDirectory()) {
        files.push(...this.walkMarkdownFiles(fullPath));
        continue;
      }

      if (entry.isFile() && fullPath.endsWith(".md")) {
        files.push(fullPath);
      }
    }

    return files;
  }

  private loadRow(filePath: string): IndexedRow {
    const relativePath = path.relative(this.contentRoot, filePath);
    const segments = relativePath.split(path.sep);
    const type = segments[0] ?? "content";
    const filename = path.basename(filePath, ".md");
    const source = readFileSync(filePath, "utf8");
    const { attributes, body } = parseFrontMatter(source, filePath);
    const stats = statSync(filePath);
    const createdAt =
      typeof attributes.created_at === "string"
        ? attributes.created_at
        : formatTimestamp(stats.birthtimeMs > 0 ? stats.birthtime : stats.mtime);
    const updatedAt =
      typeof attributes.updated_at === "string"
        ? attributes.updated_at
        : formatTimestamp(stats.mtime);
    const slug =
      typeof attributes.slug === "string" && attributes.slug !== ""
        ? attributes.slug
        : filename;
    const id =
      typeof attributes.id === "string" || typeof attributes.id === "number"
        ? attributes.id
        : `${type}:${slug}`;
    const title =
      typeof attributes.title === "string" && attributes.title !== ""
        ? attributes.title
        : slug;
    const status =
      typeof attributes.status === "string" && attributes.status !== ""
        ? attributes.status
        : "draft";
    const bodyHtml = escapeLiteralSyntax(marked.parse(body) as string);

    const row: IndexedRow = {
      ...Object.fromEntries(
        Object.entries(attributes).filter(([key]) => !SYSTEM_COLUMNS.has(key)),
      ),
      id,
      type,
      slug,
      title,
      body,
      body_html: bodyHtml,
      status,
      created_at: createdAt,
      updated_at: updatedAt,
    };

    return row;
  }
}
