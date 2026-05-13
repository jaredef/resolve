# Stubs as Named Cuts
## The Three-Projection Tracker and the Stub-Alphabet Stability Conjecture

*A corpus document responding to the keeper's observation (2026-05-13): "We need to develop a stub tracker. How best can these be identified, recorded, and managed. How does the DAG / lattice / alphabet inform that methodology." Builds on [Doc 714 sub-§4.b (the layer-floor cut-location framework)](/resolve/doc/714-the-rusty-bun-engagement-read-through-the-lattice-extension-basin-expansion-at-the-l2m-saturation-point) and [Doc 715 §X–§XI (the consumer-substrate DAG as load-bearing object)](/resolve/doc/715-the-consumer-substrate-dependency-graph-as-the-load-bearing-object-beneath-the-joint-mi-lattice).*

**Jared Foy · 2026-05-13 · Doc 716**

---

## I. The occasion

After the 2026-05-13 day's substrate sweep — morning's cooperative-loop reactor work + afternoon's basket coverage — the rusty-bun engagement entered the empirical consolidation regime predicted by [Doc 715 §X.b/d](/resolve/doc/715-the-consumer-substrate-dependency-graph-as-the-load-bearing-object-beneath-the-joint-mi-lattice#x-consolidation-amendment). The substrate ranker (host/tools/substrate-rank.sh) showed zero unwired substrate nodes against a 548-package broader sample. The engagement's productive work pivoted from substrate-introduction to consolidation.

In that pivoted regime, the apparatus's open question shifts. We are no longer asking "what substrate is missing." We are asking "what surface is *present-but-partial*, and what does the partial-ness mean for downstream consumers." That class of substrate nodes — surface exists, semantics simulated — is the **stub** class. The engagement has accumulated dozens of them over its development: node:sqlite, node:inspector, node:cluster, node:worker_threads, fs.watchFile, Bun.SQLite, signal handlers as no-op stubs (before signalfd landed), AES keypair generation deferral, HTTP/2, WebAssembly, Bun.bundle, etc. They are not absent surfaces. They are *cuts*: explicit decisions to stop digging deeper at a substrate node and accept the consumer-visible divergence below the cut.

The keeper named this object. It needs apparatus-grade treatment, not ad-hoc comments scattered through the codebase. This document develops the structural reading: stubs are *named cuts* in the lattice; their classification factors through Doc 715's three projections; the methodology for managing them follows directly from the projections.

## II. The object

Define a **stub** in G (the consumer–substrate dependency graph from Doc 715 §II) as: a substrate node v whose surface (the set of out-edges from v to v's consumers, accessed by `typeof`, property lookup, function call signatures, or shape checks) is preserved, but whose semantic content (the in-edges from v to deeper substrate nodes) is replaced with one of three stand-in behaviors. The consumer's view of v's edges-out is unchanged; the substrate's view of v's edges-in is short-circuited.

Three stand-in behaviors observed across the engagement's accumulated stubs:

**(K1) Throw-on-use.** The surface property is present and callable; calling it throws an explicit "not implemented" error. Consumer code that defensively wraps the call in try/catch passes; consumer code that depends on success fails loudly. Example: `node:sqlite.DatabaseSync` throws on construct. The stub satisfies shape-detection (`typeof DatabaseSync === "function"`) but fails any actual invocation.

**(K2) No-op return.** The surface property is present and callable; calling it returns a benign sentinel (null, undefined, false, an empty array, the input chunk). Consumer code that doesn't check the return value proceeds without error; consumer code that branches on the return may take an unexpected branch but doesn't fail. Example: `node:cluster.fork()` returns null in rusty-bun-host because the runtime is single-process; consumers reading `cluster.isMaster === true` proceed correctly.

**(K3) Hardcoded-sentinel.** The surface property is present and callable; calling it returns a fixed value chosen to be plausibly correct for the most common consumer query. Consumer code that exercises corner cases (locale-aware pluralization, less-common pattern matching) sees the sentinel and fails to differentiate. Example: `Intl.PluralRules.select()` returns "other" for inputs it doesn't know. The stub is correct for English's most common path but breaks plural-rule discrimination in any locale where the answer isn't "other."

The three are exhaustive of the engagement's empirical record. The stub-alphabet stability conjecture (developed in §V below) says they are *structurally* exhaustive — any future stub the apparatus introduces falls into K1, K2, or K3, never a fourth kind.

## III. The DAG projection — which stub matters

Per [Doc 715 §X.a](/resolve/doc/715-the-consumer-substrate-dependency-graph-as-the-load-bearing-object-beneath-the-joint-mi-lattice#x-consolidation-amendment), the substrate-node in-degree distribution is heavy-tailed. A stub at a head-of-distribution node (Buffer, Stream, fs, Intl, EventEmitter) blocks many transitive consumers; a stub at a tail-of-distribution node (node:inspector, node:sqlite) blocks few. The transitive in-degree is computable from a dependency-graph snapshot (the substrate-rank.sh tool already exposes it for the engagement's fixture sample).

Stub priority = transitive-in-degree × cut-depth-of-consumer-impact. The first factor is the DAG's measurement; the second is the lattice's (§IV). Together they rank stubs.

The DAG framing also explains *which stubs the apparatus introduced and why*. The engagement's stub-record is biased toward (a) head-of-distribution nodes where the apparatus needed shape-completeness to retire consumers (every basket round) and (b) tail-of-distribution nodes where the consumer-corpus pull was negligible (node:inspector). Mid-distribution stubs are rare because consumers either retire free (no stub needed) or block hard (substrate widening required). Stubs are a *managed-cut tactic*, not a default.

## IV. The lattice projection — which rung the cut sits at

Per [Doc 714 sub-§4.b (the layer-floor framework)](/resolve/doc/714-the-rusty-bun-engagement-read-through-the-lattice-extension-basin-expansion-at-the-l2m-saturation-point), the engagement names a per-stratum cut. The L0–L6 hierarchy is: L0 parse → L1 module-loader → L2 platform-builtin → L3 API-shape → L4 idiom → L5 semantic → L6 timing.

A stub at node v sits at the lattice rung *at which v's substrate is cut*. K1 stubs (throw-on-use) cut at L5 (semantics): L3 shape is satisfied (the function exists, is callable, has arity), L5 semantics is absent (it throws). K2 stubs (no-op return) cut at L4 (idiom): L3 + L5 both satisfied superficially (the function returns *something* plausible), but L4 idiomatic patterns may misroute (a consumer assuming cluster.fork() returns a worker that emits 'online' will hang). K3 stubs (hardcoded-sentinel) cut at L5 with a different shape: L5 semantics is *defined* but constant; consumers that exercise the value-discriminating capability fail.

The rung-of-cut is the apparatus's recordable choice. It is the answer to "how deep did we go before stopping" at this node. The deeper the cut, the more consumers retire by transit; the shallower, the fewer false-positive retirements. The tracker records this per stub.

The rung-of-cut interacts with the DAG projection: a high-in-degree node with a shallow cut (K1 throw at L5) retires many consumers as long as they don't exercise L5; a high-in-degree node with a deep cut (full implementation through L5) retires every consumer at the cost of substrate-introduction work. The cut choice is the apparatus's trade between work and consumer coverage at that node.

## V. The alphabet projection — the stub-kind stability conjecture

Per [Doc 715 sub-§4.a (alphabet stability) + §X.b](/resolve/doc/715-the-consumer-substrate-dependency-graph-as-the-load-bearing-object-beneath-the-joint-mi-lattice), the engagement's per-stratum alphabets are finite and stable across consumer accretion. Stubs introduce a *new* stratum the apparatus catalogue had implicit but not named: the **cut-character stratum**. Its alphabet is the three kinds K1, K2, K3.

The conjecture this document proposes: the cut-character alphabet is bounded with cardinality three. Any new stub the apparatus introduces in any Pin-Art engagement — runtime-derivation, ecosystem-port, language-port, anything — factors cleanly into K1, K2, or K3. A fourth stub kind would represent a genuinely new way to "preserve surface while simulating semantics" that the three above don't cover; the conjecture is that no such fourth exists.

Three falsifier surfaces:

- **(F1) Throw-on-some-args.** Half-throw-half-execute is K1 conditional on input, not a new kind. Records as K1 with a "conditional" annotation.
- **(F2) Delegate-to-another-substrate.** Stub forwards to a different node's implementation (e.g., node:fs.watchFile delegates to inotify). This is *not a stub* — it's a real implementation at the delegate site. Records as full, not stub.
- **(F3) Apparatus-defined-default-with-callback-injection.** Stub allows consumer to inject the semantics. The consumer's injection is the real semantics; the stub is the inert apparatus-side shim. Records as K2 with a "delegating" annotation.

If a fourth genuinely-distinct cut-character emerges across enough engagements, the alphabet grows. The conjecture's test is corpus accretion: as more Pin-Art engagements catalogue stubs, the cardinality-three claim either holds or breaks.

## VI. The methodology

The tracker becomes an apparatus artifact with three operational outputs.

**Output 1 — Ranked stub-priority list.** For each stub, compute (transitive in-degree at this substrate node) × (count of known consumers exercising it). The head of the distribution is the next closure target. The tail is the deferral set, with explicit re-open conditions tied to consumer-corpus changes.

**Output 2 — Per-cut-rung audit.** Across all stubs, count how many cut at each L-rung (L3, L4, L5, etc.). The distribution tells the apparatus where it is letting consumer-coverage be coarse. If L5 is heavy, the apparatus has prioritized shape-completeness over semantic correctness — a deliberate choice that may bind on the next consumer-corpus extension.

**Output 3 — Stub-alphabet stability check.** Count K1 / K2 / K3 instances. Flag if a candidate fourth kind emerges. The check is the falsifier for §V's conjecture.

The detector tool (host/tools/stub-list.sh) walks the codebase for the syntactic signatures of K1/K2/K3 (throw-not-implemented / return-sentinel / return-hardcoded-value). The catalogue (host/tools/stub-catalog.json or equivalent) records per-stub: substrate node, cut rung, kind, in-degree from sample, known consumers exercising, re-open priority.

Apparatus discipline: when introducing a new stub, the implementer adds a marker comment that the detector parses. When recording a basin boundary that references a stub, the boundary record links to the catalogue entry. Re-running the detector + catalogue cross-reference is a per-session refresh.

The cost is bounded — one-time tooling + per-stub-introduction one-line comment. The benefit is that the apparatus's *cut-state* is now legible: a future maintainer looking at any substrate node can read its stub-state, see what cut was chosen, see which consumers depend on the cut, and decide whether the cut still binds.

## VII. What this changes for the apparatus

The tracker turns the engagement's accumulated implicit cut-decisions into an explicit ledger. Three concrete operational shifts:

1. **The substrate-rank.sh tool (Doc 715 §X.a operationalization) gains a second column.** The ranker today reports `[WIRED]` vs `[OPEN]`. With the stub catalogue, `[WIRED]` decomposes into `[WIRED-full]`, `[WIRED-K1]`, `[WIRED-K2]`, `[WIRED-K3]`. The apparatus now sees the difference between "implemented" and "stubbed" at the rank level.

2. **Basin boundaries get linked to the stubs they would close.** Each E.NN basin (per Doc 715 §XI.g's three-class taxonomy) is annotated with: *which stub(s) would need to upgrade to close this basin*. Reading the basin record forward, the apparatus sees the dependency chain from boundary to stub to substrate-widening.

3. **The stub-alphabet stability conjecture (§V) becomes a falsification target.** Each new engagement using Pin-Art catalogues its stubs by kind. If across N engagements the alphabet remains K1/K2/K3, the conjecture strengthens. If a fourth kind appears, the alphabet refines. The corpus accretes evidence.

## VIII. Honest scope

Three caveats on the structural reading.

**(a) Cut characterization isn't always clean.** Some apparatus surfaces are partial in ways that don't fit cleanly into K1/K2/K3. The engagement's `Bun.password` was a K1 stub before the Argon2id implementation landed; mid-implementation it had a path that handled MD5 fallback (K2) and threw on Argon2id (K1). The catalogue should accept *composite* annotations for surfaces with multiple methods at different cut depths.

**(b) "Surface preservation" is fuzzy.** A K1 stub that throws "not implemented" is shape-preserving for `typeof` and property-existence checks, but a consumer that reads `.length` or `.prototype.toString` on the throwing function may get a deeper-shape mismatch. The catalogue records the cut at the consumer-facing semantics (call return), not the full prototype chain.

**(c) Engagement-internal vs cross-engagement scope.** The conjecture of §V applies cross-engagement (any Pin-Art runtime, any ecosystem port). Single-engagement validation isn't sufficient to confirm; the stability claim accretes across the corpus over time.

## IX. Closing

Stubs are explicit cuts in the lattice. Their classification factors through Doc 715's three projections: DAG (which stub matters by in-degree), lattice (which rung the cut sits at), alphabet (which of three kinds the cut takes). The tracker methodology follows directly: detect via syntactic signatures, record in a catalogue keyed by substrate node, rank by leverage, audit per rung, falsify the alphabet's cardinality across engagements.

The corpus contribution is to name the object (the stub catalogue) and the conjecture (stub-alphabet stability at cardinality three). Building the tool is downstream work the engagement can do at its leisure. The structural framing is now in place to support it.
