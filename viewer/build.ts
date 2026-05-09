// Resolve corpus viewer — static-site builder.
//
// Reads markdown sources from corpus/ and systems-engineering/, renders each
// to HTML wrapped in a minimal layout, and emits dist/ ready to be opened
// directly in a browser without a server.
//
// Run with: bun run build  (from the viewer/ directory)

import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync, copyFileSync, rmSync } from "fs";
import { join, dirname, resolve as pathResolve } from "path";
import { marked } from "marked";

const REPO_ROOT = pathResolve(import.meta.dir, "..");
const CORPUS_DIR = join(REPO_ROOT, "corpus");
const SE_DIR = join(REPO_ROOT, "systems-engineering");
const VIEWER_DIR = join(REPO_ROOT, "viewer");
const DIST_DIR = join(REPO_ROOT, "dist");
const STATIC_SRC = join(VIEWER_DIR, "static");
const STATIC_DEST = join(DIST_DIR, "static");
const LAYOUT_PATH = join(VIEWER_DIR, "templates", "layout.html");

const LAYOUT = readFileSync(LAYOUT_PATH, "utf8");

interface DocEntry {
  source: "corpus" | "systems-engineering";
  filename: string;
  slug: string;
  number: number | null;
  title: string;
  subtitle: string;
  byline: string;
  body: string;
  outPath: string;
  href: string;
  label: string;
}

// Source-side preprocessor for KaTeX delimiters. Per CommonMark, `\(`, `\)`,
// `\[`, `\]` are backslash-escapes of ASCII punctuation; the markdown
// processor consumes the backslash. To preserve the delimiter for KaTeX, we
// double the backslash before markdown parsing runs.
function protectKatexDelimiters(md: string): string {
  return md
    .replace(/(?<!\\)\\\(/g, "\\\\(")
    .replace(/(?<!\\)\\\)/g, "\\\\)")
    .replace(/(?<!\\)\\\[/g, "\\\\[")
    .replace(/(?<!\\)\\\]/g, "\\\\]");
}

function extractDocNum(filename: string): number | null {
  const m = filename.match(/^(\d{1,4})-/);
  return m ? parseInt(m[1], 10) : null;
}

function extractTitle(md: string): string {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : "Untitled";
}

function extractSubtitle(md: string): string {
  // First H2 after the H1 is the subtitle (long, italic).
  const lines = md.split("\n");
  let seenH1 = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (!seenH1 && line.startsWith("# ")) { seenH1 = true; continue; }
    if (seenH1 && line.startsWith("## ")) {
      return line.slice(3).trim();
    }
  }
  return "";
}

function extractByline(md: string): string {
  // Look for a line of the form `**Jared Foy · YYYY-MM-DD · Doc N**` near the top.
  const m = md.match(/^\*\*Jared Foy[^*]+\*\*$/m);
  return m ? m[0].replace(/\*\*/g, "").trim() : "";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Normalize internal corpus links of the form /resolve/doc/SLUG and
// /resolve/systems-engineering/SLUG so they resolve in the static dist.
function rewriteInternalLinks(md: string): string {
  return md
    .replace(/\(\/resolve\/doc\/([a-z0-9-]+)\)/g, "(__ROOT__doc/$1.html)")
    .replace(/\(\/resolve\/systems-engineering\/([a-z0-9-]+)\)/g, "(__ROOT__systems-engineering/$1.html)")
    .replace(/\(\/resolve\/?(\)|#)/g, "(__ROOT__index.html$1");
}

function renderMarkdown(md: string): string {
  const protectedMd = protectKatexDelimiters(rewriteInternalLinks(md));
  // marked's default GFM is acceptable for our corpus.
  return marked.parse(protectedMd, { gfm: true, breaks: false }) as string;
}

function applyLayout(opts: {
  title: string;
  description: string;
  body: string;
  root: string; // relative-from-page prefix to dist/, e.g. "" or "../"
  active: "index" | "systems-engineering" | "none";
  wide?: boolean;
}): string {
  return LAYOUT
    .replace(/__TITLE__/g, escapeHtml(opts.title))
    .replace(/__DESCRIPTION__/g, escapeHtml(opts.description))
    .replace(/__BODY__/g, opts.body)
    .replace(/__ROOT__/g, opts.root)
    .replace(/__INDEX_ACTIVE__/g, opts.active === "index" ? "active" : "")
    .replace(/__SE_ACTIVE__/g, opts.active === "systems-engineering" ? "active" : "")
    .replace(/__MAIN_CLASS__/g, opts.wide ? "wide" : "");
}

function rmrf(p: string): void {
  try { rmSync(p, { recursive: true, force: true }); } catch {}
}

function ensureDir(p: string): void {
  mkdirSync(p, { recursive: true });
}

function copyDir(src: string, dest: string): void {
  ensureDir(dest);
  for (const name of readdirSync(src)) {
    const s = join(src, name);
    const d = join(dest, name);
    if (statSync(s).isDirectory()) copyDir(s, d);
    else copyFileSync(s, d);
  }
}

function loadDocs(dir: string, source: "corpus" | "systems-engineering"): DocEntry[] {
  if (!safeExists(dir)) return [];
  const entries: DocEntry[] = [];
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".md")) continue;
    if (name === "MANIFEST.yaml") continue;
    const full = join(dir, name);
    const md = readFileSync(full, "utf8");
    const slug = name.replace(/\.md$/, "");
    const number = extractDocNum(name);
    const title = extractTitle(md);
    const subtitle = extractSubtitle(md);
    const byline = extractByline(md);
    const html = renderMarkdown(md);
    const outRel = source === "corpus" ? `doc/${slug}.html` : `systems-engineering/${slug}.html`;
    const href = source === "corpus" ? `doc/${slug}.html` : `systems-engineering/${slug}.html`;
    const label = number !== null
      ? (source === "systems-engineering" ? `SE-${String(number).padStart(3, "0")}` : `${number}`)
      : "—";
    entries.push({
      source, filename: name, slug, number, title, subtitle, byline,
      body: html, outPath: join(DIST_DIR, outRel), href, label,
    });
  }
  // Sort by number when present, else by slug.
  entries.sort((a, b) => {
    if (a.number !== null && b.number !== null) return a.number - b.number;
    if (a.number !== null) return -1;
    if (b.number !== null) return 1;
    return a.slug.localeCompare(b.slug);
  });
  return entries;
}

function safeExists(p: string): boolean {
  try { statSync(p); return true; } catch { return false; }
}

function writeDocPage(entry: DocEntry): void {
  ensureDir(dirname(entry.outPath));
  const root = "../"; // doc pages live one directory deep
  const description = entry.subtitle || entry.title;
  const bylineHtml = entry.byline
    ? `<p class="doc-byline">${escapeHtml(entry.byline)}</p>`
    : "";
  const inner = `<article class="document">${bylineHtml}${entry.body}</article>`;
  const html = applyLayout({
    title: entry.title,
    description,
    body: inner,
    root,
    active: entry.source === "corpus" ? "index" : "systems-engineering",
  });
  writeFileSync(entry.outPath, html);
}

function writeIndex(corpus: DocEntry[]): void {
  const intro = `<div class="index-intro">
<p>A research corpus on what makes dialogue with large language models actually work — and what that reveals about language, knowledge, and the structure of reality.</p>
<p>The full corpus is below in document order. Use the search box above to filter by number, title, or subtitle. <a href="systems-engineering.html">Systems Engineering</a> documents are listed separately.</p>
</div>`;
  const summary = `<p class="index-summary">${corpus.length} documents.</p>`;
  const items = corpus.map(d => `<li><a href="${escapeHtml(d.href)}">
<span class="doc-num">${escapeHtml(d.label)}</span><span class="doc-title">${escapeHtml(d.title)}</span>${d.subtitle ? `<span class="doc-subtitle">${escapeHtml(d.subtitle)}</span>` : ""}
</a></li>`).join("\n");
  const inner = `${intro}${summary}<ul class="index-list" id="index-list">${items}</ul><div id="search-no-results">No documents match.</div>`;
  const html = applyLayout({
    title: "The Corpus",
    description: "A research corpus on dialogue with large language models, the mathematics of coherence, and the philosophical commitments that follow.",
    body: inner,
    root: "",
    active: "index",
  });
  writeFileSync(join(DIST_DIR, "index.html"), html);
}

function writeSEIndex(se: DocEntry[]): void {
  const intro = `<div class="index-intro">
<p>Systems Engineering documents from the corpus. These articulate the engineering disciplines that compose with the corpus's broader theoretical apparatus.</p>
</div>`;
  const summary = `<p class="index-summary">${se.length} documents.</p>`;
  const items = se.map(d => `<li><a href="${escapeHtml(d.href)}">
<span class="doc-num">${escapeHtml(d.label)}</span><span class="doc-title">${escapeHtml(d.title)}</span>${d.subtitle ? `<span class="doc-subtitle">${escapeHtml(d.subtitle)}</span>` : ""}
</a></li>`).join("\n");
  const inner = `${intro}${summary}<ul class="index-list" id="index-list">${items}</ul><div id="search-no-results">No documents match.</div>`;
  const html = applyLayout({
    title: "Systems Engineering",
    description: "Systems-engineering documents from the Resolve corpus.",
    body: inner,
    root: "",
    active: "systems-engineering",
  });
  writeFileSync(join(DIST_DIR, "systems-engineering.html"), html);
}

function writeSearchIndex(corpus: DocEntry[], se: DocEntry[]): void {
  const all = [
    ...corpus.map(d => ({ label: d.label, title: d.title, subtitle: d.subtitle, href: d.href })),
    ...se.map(d => ({ label: d.label, title: d.title, subtitle: d.subtitle, href: d.href })),
  ];
  writeFileSync(join(DIST_DIR, "search-index.json"), JSON.stringify(all));
}

function main(): void {
  console.log("Resolve corpus viewer — building static site");
  console.log(`  repo root:  ${REPO_ROOT}`);
  console.log(`  output:     ${DIST_DIR}`);

  rmrf(DIST_DIR);
  ensureDir(DIST_DIR);
  ensureDir(join(DIST_DIR, "doc"));
  ensureDir(join(DIST_DIR, "systems-engineering"));
  copyDir(STATIC_SRC, STATIC_DEST);

  console.log("  loading corpus/ ...");
  const corpus = loadDocs(CORPUS_DIR, "corpus");
  console.log(`    ${corpus.length} documents`);

  console.log("  loading systems-engineering/ ...");
  const se = loadDocs(SE_DIR, "systems-engineering");
  console.log(`    ${se.length} documents`);

  console.log("  rendering pages ...");
  for (const entry of corpus) writeDocPage(entry);
  for (const entry of se) writeDocPage(entry);

  console.log("  writing indexes ...");
  writeIndex(corpus);
  writeSEIndex(se);
  writeSearchIndex(corpus, se);

  // Tiny readme inside dist so users opening it directly understand what they have.
  writeFileSync(join(DIST_DIR, "README.txt"),
    "This is the Resolve corpus, prebuilt as a static site.\n" +
    "Open index.html in any browser. No server, no install required.\n" +
    "Source repository: https://github.com/jaredef/resolve\n");

  console.log("Done.");
}

main();
