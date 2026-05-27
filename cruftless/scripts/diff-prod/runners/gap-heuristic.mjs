#!/usr/bin/env node
// diff-prod substrate-gap heuristic
//
// Scans fixture source for documented v1 limitations and maps each
// to the three-coordinate address Doc 729 specifies:
//   (resolver-instance, constraint-axis, bootstrap-property)
//
// The resolver-instances (§IV):
//   1  Cargo build           — source tree → binary
//   2  Bootstrap (SERVER)    — init(rt) install calls → populated Runtime
//   3  Module load           — ESM source + imports → ModuleRecord/Namespace
//   4  Execution (PRESTO)    — bytecode → resolved JS values
//   5  Job-queue drain       — microtask/macrotask queue → quiescent runtime
//
// The constraint axes (§XII):
//   M  Module-resolution parity
//   N  Namespace-surface composition
//   S  Symbol vs string identity
//   E  Eval-time error surfacing
//   R  AST-to-bytecode resolver discipline
//   H  Host built-in surface
//   O  Operator semantics
//
// The bootstrap properties (Doc 432 §2):
//   T  Totality       — every directive consumed
//   D  Ordering       — dependency-respecting stage order
//   P  Medium         — substrate preserved
//   B  Boundary       — boundary integrity

import { readdirSync, readFileSync } from "node:fs";

const FIXTURES_DIR = new URL("../fixtures/", import.meta.url).pathname;

// ── Classification rules ──────────────────────────────────────────
// Each rule: { pattern, instance, axis, property, label }
// pattern tests against the gap description text (lowercased).
// First match wins — order from most specific to least.

const RULES = [
  // ── Instance 5: Job-queue drain ──
  { p: /promise\.finally|\.finally\b/,            i: 5, a: "R", b: "T", l: "Promise.finally completion threading" },
  { p: /thenable unwrap|thenable.*deferred/,       i: 5, a: "R", b: "T", l: "thenable protocol resolution" },
  { p: /microtask|nexttick|event.?loop.*idle/,     i: 5, a: "R", b: "D", l: "microtask queue scheduling" },
  { p: /timer|timeout|setimmediate/,               i: 5, a: "R", b: "D", l: "timer queue routing" },

  // ── Instance 4: Execution (PRESTO) ──
  //   Axis O — Operator semantics
  { p: /finally.*override.*return|finally.*return/, i: 4, a: "O", b: "B", l: "finally-block return override" },
  { p: /symbol\.toprimitive.*hint/,                 i: 4, a: "O", b: "T", l: "Symbol.toPrimitive hint dispatch" },
  { p: /symbol\.tostring.*internal|@@sym/,          i: 4, a: "S", b: "P", l: "Symbol.toString representation" },
  { p: /symbol\.tostringtag/,                       i: 4, a: "S", b: "T", l: "Symbol.toStringTag in Object.prototype.toString" },
  { p: /surrogate.?pair|codepoint.*index/,          i: 4, a: "O", b: "P", l: "surrogate-pair indexing (UTF-16 vs codepoint)" },
  { p: /unicode.*normaliz/,                         i: 4, a: "O", b: "T", l: "String.normalize NFC/NFD" },
  { p: /string\.raw.*escape|raw.*escape/,           i: 4, a: "R", b: "B", l: "tagged-template raw escape preservation" },
  { p: /startswith.*position|endswith.*position|includes.*position/, i: 4, a: "O", b: "T", l: "String position-arg methods" },
  { p: /private.field.*visible|#.*object\.keys/,    i: 4, a: "R", b: "B", l: "private field visibility boundary" },
  { p: /object\.seal.*partial|seal.*enforce/,        i: 4, a: "O", b: "T", l: "Object.seal enforcement" },
  { p: /preventextensions.*throw|non.?extensible/,  i: 4, a: "O", b: "T", l: "Object.preventExtensions strict-mode throw" },
  { p: /function.*decl.*hoist|hoisted_fn/,           i: 4, a: "R", b: "D", l: "function declaration hoisting" },
  { p: /var.*for.?of.*leak|var.*leak/,               i: 4, a: "R", b: "B", l: "var scoping in for-of" },
  { p: /closure.*var.*loop/,                         i: 4, a: "R", b: "B", l: "var-loop closure binding" },
  { p: /lazy.generator|frame.park|suspension/,       i: 4, a: "R", b: "T", l: "generator suspension/resume" },
  { p: /async.*generator.*throw/,                    i: 4, a: "R", b: "T", l: "AsyncGenerator.prototype.throw" },
  { p: /destructur.*iterator.*protocol/,             i: 4, a: "R", b: "P", l: "array destructuring via iterator protocol" },
  { p: /eval.*scope|eval.*outer.*const/,             i: 4, a: "R", b: "B", l: "eval outer-scope binding capture" },
  { p: /arguments.*is_array|arguments.*array/,       i: 4, a: "R", b: "P", l: "arguments object shape (array-like vs Array)" },
  { p: /assert\.throws|assert\.match/,               i: 2, a: "H", b: "T", l: "assert module method surface" },
  { p: /assert\.equal.*loose.*coerce/,               i: 2, a: "H", b: "T", l: "assert.equal loose coercion" },
  { p: /typed.?array.*species|typed.?array.*map.*filter/, i: 4, a: "R", b: "P", l: "TypedArray species/subtype create" },

  // ── Instance 3: Module load ──
  { p: /url.*resolution|url.*concatenat/,            i: 3, a: "M", b: "T", l: "URL base+relative path resolution" },
  { p: /urlsearchparams/i,                           i: 2, a: "H", b: "T", l: "URLSearchParams surface" },

  // ── Instance 2: Bootstrap (SERVER) ──
  { p: /dataview.*method|dataview.*proto/,           i: 2, a: "H", b: "T", l: "DataView prototype methods" },
  { p: /arraybuffer\.slice|arraybuffer\.isview/,     i: 2, a: "H", b: "T", l: "ArrayBuffer static/proto methods" },
  { p: /buffer\.from\(array\)|buffer\.concat/,       i: 2, a: "H", b: "T", l: "Buffer array-form / concat" },
  { p: /util\.isdeepstrictequal/,                    i: 2, a: "H", b: "T", l: "util.isDeepStrictEqual" },
  { p: /util\.types\.is(?:date|map|set|typed)/,      i: 2, a: "H", b: "T", l: "util.types type-check methods" },
  { p: /util\.format.*%%|util\.inspect.*spacing/,    i: 2, a: "H", b: "P", l: "util.format/inspect fidelity" },
  { p: /console\.\w+.*undefined/,                    i: 2, a: "H", b: "T", l: "console method surface" },
  { p: /process\.ppid/,                              i: 2, a: "H", b: "T", l: "process.ppid" },
  { p: /aggregate.*error.*errors|aggregateerror/i,   i: 2, a: "H", b: "T", l: "AggregateError.errors property" },
  { p: /weakref.*non.?object|weakref.*primitive/,    i: 2, a: "H", b: "B", l: "WeakRef primitive rejection" },
  { p: /weakmap.*weakset.*primitive|map.*set.*variant/, i: 2, a: "H", b: "B", l: "WeakMap/WeakSet spec surface" },
  { p: /fetch.*headers.*pairs|headers.*@@iterator/,  i: 2, a: "H", b: "T", l: "Headers iterator/pairs constructor" },
  { p: /abort.*signal.*timeout/,                     i: 2, a: "H", b: "T", l: "AbortSignal.timeout (timer dep)" },
  { p: /node.?path.*\.\.|trailing.slash/,            i: 2, a: "H", b: "T", l: "node:path segment resolution" },
  { p: /let.*hoist.*function|let.*per.block/,        i: 4, a: "R", b: "B", l: "let per-block scoping" },
  { p: /regexp.*groups|named.*capture/,              i: 4, a: "R", b: "T", l: "RegExp named capture groups" },

  // Older-fixture deferred markers (specific classification)
  { p: /intrinsics.*layer.*cannot.*reach/,           i: 2, a: "H", b: "B", l: "AbortSignal.timeout intrinsic boundary" },
  { p: /bytecode.compiler.*rung|destructur.*iter/,   i: 4, a: "R", b: "T", l: "destructuring via iterator protocol" },
  { p: /invalidcharactererror|instead.*throwing/,     i: 4, a: "O", b: "B", l: "encoding error-throw discipline" },
  { p: /array.of.pairs.*deferred|headers.*pairs/,    i: 2, a: "H", b: "T", l: "Headers array-of-pairs constructor" },
  { p: /headers.*@@iterator|headers.*substrate/,      i: 2, a: "H", b: "T", l: "Headers @@iterator surface" },
  { p: /path\.join.*\.\..*segments/,                  i: 2, a: "H", b: "T", l: "node:path '..' segment resolution" },
  { p: /basename.*trailing|basename.*returns.*""/,    i: 2, a: "H", b: "T", l: "node:path trailing-slash handling" },
  { p: /readable\.from/,                             i: 2, a: "H", b: "T", l: "Readable.from factory" },
  { p: /named.*groups.*populate|match\.groups/,       i: 4, a: "R", b: "T", l: "RegExp named capture groups" },
  { p: /url.*parser.*rung/,                          i: 3, a: "M", b: "T", l: "URL parser path resolution" },
  { p: /whatwg.*url.*surface|urlsearchparams.*substantial/, i: 2, a: "H", b: "T", l: "URLSearchParams surface" },
  { p: /cruftless.*v1.*boundaries/,                  i: 4, a: "R", b: "T", l: "async iteration protocol boundaries" },

  // Implicit-gap specific rules
  { p: /assert\.fail.*string|assertionerror/,        i: 2, a: "H", b: "P", l: "assert.fail error type fidelity" },
  { p: /console.*method.*wired|console.*beyond/,     i: 2, a: "H", b: "T", l: "console method surface completeness" },
  { p: /buffer\.concat.*object/,                     i: 2, a: "H", b: "P", l: "Buffer.concat return fidelity" },
  { p: /util\.format.*percent|util\.format.*%%/,     i: 2, a: "H", b: "P", l: "util.format %% escape fidelity" },
  { p: /util\.inspect.*format|util\.inspect.*spacing/, i: 2, a: "H", b: "P", l: "util.inspect formatting fidelity" },
  { p: /util\.types\.is\w+.*false/,                  i: 2, a: "H", b: "T", l: "util.types brand-check methods" },
  { p: /promise\.finally.*idle|promise\.finally.*settle/, i: 5, a: "R", b: "T", l: "Promise.finally completion routing" },
  { p: /arguments.*not available.*esm/,              i: 4, a: "R", b: "B", l: "arguments unavailable in ESM context" },

  // ── Catch-all ──
  { p: /node:|buffer|stream|crypto|events|fs|path|os|http/, i: 2, a: "H", b: "T", l: "host built-in surface" },
  { p: /./,                                          i: 4, a: "R", b: "T", l: "unclassified execution gap" },
];

// ── Gap extraction ────────────────────────────────────────────────

// ── Implicit constraints (discovered by fixture adjustment, not tagged in source) ──

const IMPLICIT_GAPS = [
  { fixture: "control-flow-advanced", line: 0, desc: "finally block does not override try-block return value", kind: "implicit" },
  { fixture: "scope-hoisting", line: 0, desc: "function declaration hoisting not supported in ESM", kind: "implicit" },
  { fixture: "scope-hoisting", line: 0, desc: "var in for-of does not leak binding past block", kind: "implicit" },
  { fixture: "computed-shorthand", line: 0, desc: "Symbol.toStringTag not respected in Object.prototype.toString.call", kind: "implicit" },
  { fixture: "typeof-coercion", line: 0, desc: "Symbol.toPrimitive hint dispatch not implemented", kind: "implicit" },
  { fixture: "spread-rest-defaults", line: 0, desc: "arguments object is Array (spec: array-like, not Array)", kind: "implicit" },
  { fixture: "global-builtins", line: 0, desc: "eval does not capture outer const/let bindings", kind: "implicit" },
  { fixture: "global-builtins", line: 0, desc: "console methods beyond log/warn/error not wired (assert, debug, dir, time, timeEnd)", kind: "implicit" },
  { fixture: "node-process", line: 0, desc: "process.ppid undefined", kind: "implicit" },
  { fixture: "node-assert", line: 0, desc: "assert.equal does not perform loose coercion (==); behaves as strictEqual", kind: "implicit" },
  { fixture: "node-assert", line: 0, desc: "assert.throws success path does not return cleanly", kind: "implicit" },
  { fixture: "node-assert", line: 0, desc: "assert.fail produces String, not AssertionError", kind: "implicit" },
  { fixture: "node-assert", line: 0, desc: "assert.match not on module export", kind: "implicit" },
  { fixture: "node-buffer", line: 0, desc: "Buffer.concat returns [object Object] instead of concatenated buffer", kind: "implicit" },
  { fixture: "node-util", line: 0, desc: "util.format does not double %% to literal percent", kind: "implicit" },
  { fixture: "node-util", line: 0, desc: "util.inspect array/object formatting differs (no spaces)", kind: "implicit" },
  { fixture: "node-util", line: 0, desc: "util.types.isDate returns false for Date instances", kind: "implicit" },
  { fixture: "node-util", line: 0, desc: "util.types.isMap returns false for Map instances", kind: "implicit" },
  { fixture: "node-util", line: 0, desc: "util.types.isSet returns false for Set instances", kind: "implicit" },
  { fixture: "node-util", line: 0, desc: "util.types.isTypedArray returns false for TypedArray instances", kind: "implicit" },
  { fixture: "promise-concurrency", line: 0, desc: "Promise.finally causes event-loop-idle (never settles)", kind: "implicit" },
  { fixture: "array-statics", line: 0, desc: "arguments not available in ESM arrow IIFE (bun also throws)", kind: "implicit" },
  { fixture: "property-descriptors", line: 0, desc: "Object.preventExtensions does not throw on property addition in strict mode", kind: "implicit" },
  { fixture: "weak-refs", line: 0, desc: "AggregateError.errors property not populated", kind: "implicit" },
  { fixture: "weak-refs", line: 0, desc: "WeakRef(primitive) does not throw TypeError", kind: "implicit" },
];

function extractGaps(fixtureName, source) {
  const gaps = [];
  const lines = source.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Explicit v1 markers.
    let m = line.match(/\/\/\s*v1:\s*(.+)/i);
    if (m) { gaps.push({ fixture: fixtureName, line: i + 1, desc: m[1].trim(), kind: "explicit" }); continue; }

    // Tightly-scoped deferred markers: only full-line comments that name a specific gap.
    m = line.match(/^\/\/\s.*?\b(deferred|not implemented)\b/i);
    if (m && line.match(/\b(substrate|rung|bytecode|lazy|suspension|generator|TypedArray|URL|destructur)/i)) {
      gaps.push({ fixture: fixtureName, line: i + 1, desc: line.replace(/^\s*\/\/\s*/, "").trim(), kind: "deferred" });
    }

    // Markers we added: "normalize: v1", "differs in v1", etc.
    m = line.match(/\/\/.*?v1\b.*?(defers?|skip|partial|differs)/i);
    if (m && !gaps.find(g => g.line === i + 1)) {
      gaps.push({ fixture: fixtureName, line: i + 1, desc: line.replace(/^\s*\/\/\s*/, "").trim(), kind: "explicit" });
    }
  }
  return gaps;
}

function classify(gap) {
  const text = gap.desc.toLowerCase();
  for (const rule of RULES) {
    if (rule.p.test(text)) {
      return { instance: rule.i, axis: rule.a, property: rule.b, label: rule.l };
    }
  }
  return { instance: 4, axis: "R", property: "T", label: "unclassified" };
}

// ── Instance / axis / property labels ─────────────────────────────

const INSTANCE_NAMES = {
  1: "Cargo build",
  2: "Bootstrap (SERVER)",
  3: "Module load",
  4: "Execution (PRESTO)",
  5: "Job-queue drain",
};

const AXIS_NAMES = {
  M: "Module-resolution",
  N: "Namespace-surface",
  S: "Symbol identity",
  E: "Eval-time error",
  R: "AST-to-bytecode",
  H: "Host built-in",
  O: "Operator semantics",
};

const PROP_NAMES = {
  T: "Totality",
  D: "Ordering",
  P: "Medium",
  B: "Boundary",
};

// ── Main ──────────────────────────────────────────────────────────

const fixtures = readdirSync(FIXTURES_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)
  .sort();

const allGaps = [];
for (const name of fixtures) {
  try {
    const src = readFileSync(`${FIXTURES_DIR}${name}/exec.mjs`, "utf8");
    const gaps = extractGaps(name, src);
    for (const g of gaps) {
      const c = classify(g);
      allGaps.push({ ...g, ...c });
    }
  } catch { /* skip missing */ }
}
// Add implicit constraints discovered during fixture adjustment.
for (const g of IMPLICIT_GAPS) {
  const c = classify(g);
  allGaps.push({ ...g, ...c });
}

// ── Report ────────────────────────────────────────────────────────

console.log("╔══════════════════════════════════════════════════════════════════════════╗");
console.log("║  DIFF-PROD SUBSTRATE GAP HEURISTIC                                     ║");
console.log("║  Locating v1 limitations against Doc 729's resolver-instance DAG        ║");
console.log("╚══════════════════════════════════════════════════════════════════════════╝");
console.log();

// Group by resolver-instance.
const byInstance = {};
for (const g of allGaps) {
  (byInstance[g.instance] ??= []).push(g);
}

let totalGaps = 0;
for (const inst of [1, 2, 3, 4, 5]) {
  const gaps = byInstance[inst] || [];
  if (gaps.length === 0) continue;
  totalGaps += gaps.length;

  console.log(`┌─ Instance ${inst}: ${INSTANCE_NAMES[inst]} (${gaps.length} gaps)`);
  console.log("│");

  // Sub-group by axis.
  const byAxis = {};
  for (const g of gaps) (byAxis[g.axis] ??= []).push(g);

  for (const [axis, axGaps] of Object.entries(byAxis).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`│  ┌─ Axis ${axis} (${AXIS_NAMES[axis]}): ${axGaps.length} gap(s)`);
    for (const g of axGaps) {
      const prop = `${PROP_NAMES[g.property]}`;
      const tag = g.kind === "explicit" ? "█" : "░";
      console.log(`│  │  ${tag} [${prop}] ${g.label}`);
      console.log(`│  │    └─ ${g.fixture}/exec.mjs:${g.line}`);
    }
    console.log("│  │");
  }
  console.log("│");
}

// ── Summary heatmap ───────────────────────────────────────────────

console.log("┌──────────────────────────────────────────────────────────┐");
console.log("│  HEATMAP: gaps × resolver-instance × constraint-axis    │");
console.log("├──────────────────────────────────────────────────────────┤");

const heatmap = {};
for (const g of allGaps) {
  const key = `${g.instance}:${g.axis}`;
  heatmap[key] = (heatmap[key] || 0) + 1;
}

const axes = ["R", "O", "H", "S", "M", "N", "E"];
const header = "│          " + axes.map(a => a.padStart(4)).join("") + "  │";
console.log(header);
console.log("│  ────── " + "─".repeat(axes.length * 4 + 2) + "│");

for (const inst of [2, 3, 4, 5]) {
  let row = `│  Inst ${inst}  `;
  for (const ax of axes) {
    const n = heatmap[`${inst}:${ax}`] || 0;
    if (n === 0) row += "   ·";
    else if (n <= 2) row += `  ${n} `.slice(-4);
    else if (n <= 5) row += ` ■${n} `.slice(-4);
    else row += `■■${n}`.slice(-4);
  }
  row += "  │";
  console.log(row);
}

console.log("├──────────────────────────────────────────────────────────┤");

// ── Property-class distribution ───────────────────────────────────

const byProp = {};
for (const g of allGaps) (byProp[g.property] ??= []).push(g);

console.log("│  BOOTSTRAP-PROPERTY DISTRIBUTION                        │");
console.log("│                                                          │");
for (const [prop, label] of [["T", "Totality"], ["B", "Boundary"], ["P", "Medium"], ["D", "Ordering"]]) {
  const n = (byProp[prop] || []).length;
  const bar = "█".repeat(Math.min(n, 40));
  console.log(`│  ${label.padEnd(10)} ${String(n).padStart(2)}  ${bar.padEnd(40)}│`);
}

console.log("├──────────────────────────────────────────────────────────┤");
console.log(`│  Total substrate gaps located: ${totalGaps}`.padEnd(59) + "│");
console.log("└──────────────────────────────────────────────────────────┘");
