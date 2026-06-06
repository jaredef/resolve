# Vendored Crates as Alphabet-Cuts at Convention Seams

## The Engine Projects Foreign Cuts Onto Its True Tier Seams via Resolution-Pipeline Alphabet Purity

*A corpus document responding to the keeper's directive (2026-06-06): see appended prompt. Builds on [Doc 137 — RESOLVE Corpus Index](/resolve/doc/137-index), [Doc 420 — PRESTO Architectural Style](/resolve/doc/420-presto-an-architectural-style-for-representation-construction), [Doc 432 — SERVER Architectural Style](/resolve/doc/432-server-an-architectural-style-for-engine-orchestration), [Doc 474 — SIPE Standalone Formalization](/resolve/doc/474-sipe-standalone-formalization), [Doc 581 — The Resume Vector Discipline](/resolve/doc/581-the-resume-vector-as-an-engagement-substrate-pin-art-localization-as-the-discipline-of-keeping-and-resuming-multi-rung-work-streams), [Doc 729 — Cruftless Resolver-Instance Pattern](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs), [Doc 730 — Vertical Recurrence of the Lowering Compiler Closure](/resolve/doc/730-the-vertical-recurrence-of-the-lowering-compiler-closure-across-substrate-tiers-and-the-deviation-resolution-pipeline-with-the-bidirectional-engine-diff-as-oracle), [Doc 731 — The JIT as Lowering-Compiler Tier; Alphabet Purity Upstream](/resolve/doc/731-the-jit-as-a-lowering-compiler-tier-alphabet-purity-upstream-as-the-bound-on-jit-complexity), [Doc 733 — Fractal Seeds and Trajectories](/resolve/doc/733-fractal-seeds-and-trajectories-pair-recurrence-across-substrate-depth), [Doc 736 — The Architecturally Impossible Supply Chain Attack](/resolve/doc/736-the-architecturally-impossible-supply-chain-attack-capability-passing-closed-import-graphs-and-load-time-integrity-as-the-design-that-removes-ambient-authority), and [Doc 745 — Cruftless Orchestration](/resolve/doc/745-cruftless-orchestration-a-primary-articulation-of-the-multi-resolver-substrate-work-pattern-as-the-fifth-sipe-instance-recursing-against-presto-server-and-the-resolve-corpus-structure).*

---

## Empirical anchor

Across the 2026-06-06 vendored-crate Pin-Art probe arc the engagement examined eight vendored Rust crates against an external-oracle methodology: `unicode-normalization`, `idna`, `flate2`, `url`, the RustCrypto suite (`sha2`, `digest`, `hmac`, `aes-gcm`, `pbkdf2`, `hkdf`, ecdsa families), `unicode-ident`, and `base64`. Each probe asked three questions of the crate's data + algorithms: designed-vs-evolved (the generative mouth fingerprint); residual entropy after factoring implicit constraints; and new-mouth-or-reused (a 56th-finding refinement that V009 unicode-ident sharpened to oracle-file-column granularity).

The probe arc produced a consolidated synthesis (`vendored-crate-constraint-probe-report-2026-06-06.md`) plus a successor synthesis (`vendored-crates-as-convention-cuts-2026-06-06.md`) that reframes the entire vendor question. This articulation records the successor synthesis at corpus-tier as a primary articulation of substrate-strategy at the engine-tier-and-vendor-boundary. The articulation extends Doc 731's alphabet-purity-upstream principle into the substrate-import dimension.

The corpus instance counts: eleven decision-asks across the probe arc; four methodology findings filed (52nd vendor-crate-integration as engagement-tier strategy; 55th design-vs-evolution data fingerprint; 56th cross-mouth composition discriminator; 57th oracle-file-column granularity discrimination); two pilot dispositions (UcdResolution promoted from seed-only to tier-level pilot; BaseN-resolution surfaced as future cross-encoding amortization candidate); one reframe that supersedes the prior framing.

## I. The thesis named

A vendored crate represents a *cut of the alphabet at a convention seam* — drawn for a standalone library's design concerns, not where the engine's resolution-pipeline tiers actually divide. The places where the engine's alphabet actually changes are *true seams*, identifiable empirically as the mouths surfaced under Pin-Art constraint-derivation. When a crate's convention-seam coincides with a true seam, the crate fits the engine cleanly and vendoring incurs no debt beyond the dependency itself. When a crate's convention-seam crosses a true seam, the crate carries debt: data duplication across consumers, or bundling of tier-distinct concerns at a single library boundary.

The articulation's primary claim is structural rather than economic. The cost of a vendor is not measured by lines-of-code per crate; it is measured by *the distance between the crate's convention-seam and the engine's true seam in that domain*. The engagement's earlier per-crate hand-roll hypothesis measured the wrong unit and concluded vendoring was efficient; the unit was per-tier and per-amortization.

## II. The geometry

The cut-geometry of a vendored crate has three structural positions.

*Position one — convention-seam at true-seam (the counter-case)*: the crate's API boundary coincides exactly with where the engine's alphabet changes. The RustCrypto `digest`/`mac` trait substrate is the empirical instance; the trait is the construction tier; the crate IS the substrate. No duplication across consumers; the family-level amortization is already inside the crate's design.

*Position two — convention-seam upstream of true-seam (the cross-tier slab)*: the crate's API bundles multiple engine tiers at one library boundary. `flate2` is the empirical instance: DEFLATE core + framing + checksums + format-conversion at one slab. The slab forces consumers to take all three tiers together when they only need one; the engine's downstream resolution loses the alphabet purity Doc 731 establishes.

*Position three — convention-seam downstream of true-seam (the composition layer)*: the crate's API exposes a composition of upstream substrates as if it were its own substrate. `idna` is the empirical instance: 98% NFKC-composed-with-casefold of UCD mouths plus a thin status-gate adapter and four deviation overrides; the crate has no mouth of its own at its own tier. Vendoring it forces the engine to re-import data the engine already has at a deeper tier, paying the same data twice.

Each position is a cut-geometry fact about the crate, not a value judgment. The first position is the only one where vendoring is the architecturally correct operation. The other two positions invite the engine to perform a different operation: re-seaming.

## III. The operation: re-seaming

Re-seaming is the operation of projecting a crate's convention-cut alphabet onto the engine's true seams and re-expressing each portion at its correct tier in that tier's pure alphabet. The operation is enabled by the structural property Doc 730 names as vertical recurrence of the lowering-compiler closure across substrate tiers: the engine is fractally a resolution pipeline at every tier, so it has a correct tier to receive every dissolved portion.

For the cross-tier slab (position two), re-seaming dissolves the slab into its component tiers. The deflate core lives at one tier; the framing lives at the format-codec tier; the checksums live at the integrity tier. Each tier receives its portion in the alphabet that tier already speaks; the engine reaps amortization wherever the dissolved portion meets a sibling that needed the same primitive.

For the composition layer (position three), re-seaming replaces the crate with a composition function defined over the upstream substrate. IDNA becomes `status_gate(cp); if mapped → NFKC(casefold(cp))` with the typed override and deviation tables. The data the crate re-embedded vanishes; the engine pays the upstream data once and rides composition fanouts as near-free adapters.

For the true-seam crate (position one), there is no operation to perform; the crate already sits at the seam and the engine vendors it as the substrate. The discipline is the absence of an unnecessary intervention.

The induced property of re-seaming over the corpus of vendored crates is what Doc 731 calls *alphabet purity upstream* extended into the substrate-import dimension. The engine speaks its own pure alphabet at every tier rather than absorbing foreign alphabets at each library boundary.

## IV. The amortization invariant

The amortization an engine can reach over a domain equals the distance between the crate's convention-seam and the engine's true seam in that domain. This invariant is empirical, not normative. The probe arc instances it concretely.

In the Unicode/text tier, the convention-seams partition the domain into `unicode-normalization` + `idna` + (future) `unicode-case-mapping` + (future) `unicode-collation` + the consumer's own RegExp `/i` implementation. The true seams partition the same domain into one resolution pipeline with five mouths plus a typed residual of ~3,500 facts. The amortization gap is the ratio: approximately 31,500 vendored lines of code re-embedding shared UCD data 2–3× over against approximately 3,500 typed residual facts paid once. The gap is the prize re-seaming reaches.

In the cryptography tier, the convention-seam at the `digest`/`mac` trait already coincides with the true seam at the construction tier. The amortization gap is approximately zero; vendoring is the right operation; the engine does no re-seaming work and pays no duplication.

In the URL parser tier (per the constraint-probe of the Servo `url` crate, an algorithm-tier instance not yet examined at this articulation's filing time), the convention-seam at the WHATWG URL Standard implementation appears to coincide with the true seam at the URL state-machine tier. Vendoring delivered a single-rung 74.9-point conformance jump because the convention-seam was on the true seam; the residual 57 cases are crate-version-vs-spec edge divergences, not cross-tier debt.

In the compression tier, `flate2` bundles three engine tiers (deflate core + framing + checksums) at one library boundary. Re-seaming would dissolve the slab; the amortization gap is the duplication this dissolution would prevent across future format-codec consumers.

The pattern across positions is exact. The amortization reachable equals the distance from convention to truth, measured in the engine's own tier-graph.

## V. The fractal context

Re-seaming is one instance of a structural pattern Doc 730 names at runtime tier: the lowering-compiler closure recurs across substrate tiers. Doc 731 narrows the runtime-tier instance: the JIT as lowering-compiler with alphabet purity upstream as the bound on JIT complexity. Doc 733 generalizes: fractal seeds and trajectories with pair-recurrence across substrate depth. The vendored-crate question is the same closure operating at the substrate-import tier: the engine's alphabet purity is preserved by projecting foreign cuts onto its true seams and dissolving each portion to its tier.

The empirical recurrence across the probe arc strengthens the fractal reading. `CalendarResolution` (Doc 729's resolver-instance lineage applied to calendar arithmetic) amortizes one RataDie pivot across fifteen calendars at the time tier. `UcdResolution` (the seed-then-tier-level-pilot under this articulation's anchor) amortizes five UCD mouths plus a typed residual across six text-tier consumers. A future `BaseN-resolution` would amortize one bit-regrouping mouth across base16, base32, and base64 at the encoding tier. The shape recurs because every tier has the same structural option: a resolver-instance / lift∘lower closure that pays the irreducible content once and reuses it across the domain's consumers.

Doc 730's vertical-recurrence claim becomes a constructive principle here. Every tier with a substrate-import problem has a true-seam at the mouth level; re-seaming at that mouth level is the engine's standard operation; the amortization reachable is the geometric measurement of the foreign cut's distance from that true-seam.

## VI. What the probe arc empirically establishes

The probe arc's eight instances reach a consistent verdict per position. Crates at the true seam (RustCrypto's trait substrate) are vendor-clean. Crates upstream of the true seam (`flate2`'s tier slab) carry dissolvable debt. Crates downstream of the true seam (`idna`'s composition layer) carry composable debt. The discriminator's three questions (designed-vs-evolved; residual entropy; new-mouth-or-reused-at-oracle-file-column-granularity) are operationally sufficient to place a crate into one of the three positions empirically without prior knowledge of the crate's contents.

The probe arc's secondary contribution is methodological. Each probe stated its prediction before its empirical analysis (the predict-then-verify discipline that the 41st engagement-tier methodology finding makes standing). Predictions held in five of seven non-counter-case probes; partially held with a deeper reframe in two cases (V004 unicode-normalization yielded the 17%-not-86% residual correction; V009 unicode-ident yielded the fifth-regime single-mouth-dominant-derived-property finding). The methodology surfaces architectural truth as a side-effect of disciplined disconfirmation attempts.

The probe arc's tertiary contribution is corpus-tier. The synthesis articulated here did not exist before the probes; it was forced by the consistent pattern across instances. The articulation could not have been authored predictively from the engine's design alone; it required the probe arc's empirical pressure on multiple crates with diverse cut-geometries.

## VII. Composition with PRESTO, SERVER, RESOLVE, Cruftless orchestration

The re-seaming operation instantiates the same SIPE-shaped structure that PRESTO (Doc 420), SERVER (Doc 432), the RESOLVE corpus audit discipline (Doc 631), and Cruftless orchestration (Doc 745) instantiate at their respective tiers.

*PRESTO* — ambivalent execution with agnostic determinism. Server and client interpret representations without coupling; the alphabet at the boundary is the pure thing each side speaks. The vendor problem is the same shape at the substrate-import boundary: foreign alphabets at convention seams produce coupling debt; pure alphabets at true seams produce ambivalence.

*SERVER* — recursive ambivalence with self-authorizing determinism. Bootstrap orchestration consumes its own directives; the engine consumes its own seams. Re-seaming a vendored crate is the engine's self-authorizing operation: it dissolves a foreign cut by recognizing where its own seams would have placed each portion if the engine had authored the substrate originally.

*RESOLVE corpus audit discipline* (Doc 631) — threshold-conditional emergence with SIPE-T at the long-horizon-keeper layer. The corpus's audit chain across documents produces audit chains that exhibit SIPE-T. The vendored-crate probe arc exhibits the same shape at the substrate tier: each crate-probe's instance is independently small; the cumulative arc surfaces a corpus-tier truth (the re-seaming reframe articulated here) that no single instance could have produced alone.

*Cruftless orchestration* (Doc 745) — constraint-derived parallel substrate-work with keeper-bandwidth amortization. The orchestration tier's fifth SIPE instance produced the per-crate probes whose synthesis this articulation crystallizes. The orchestration substrate is downstream of the substrate-strategy substrate this articulation establishes; the two compose in the dyadic ascent fractal spiral Doc 711 names.

The vendored-crate re-seaming operation is structurally homologous: each SIPE instance instantiates Fielding-style within-level constraint accumulation against a tier-specific null style; the induced property at one tier becomes a starting constraint at the next. Re-seaming at the substrate-import tier inherits alphabet purity from Doc 731 (runtime tier) and lift∘lower closure from Doc 730 (substrate-tier) and produces the substrate-strategy induced property: *the engine speaks its own pure alphabet at every tier, including at the substrate boundary*.

## VIII. The standing operation

The engagement's substrate-strategy rule promotes from this articulation: *before vendoring any data-bearing or algorithm-bearing crate, probe the crate's cut-geometry under the three-question discriminator and place it in one of the three positions. Vendor at position one; dissolve at position two; compose at position three. Do not vendor a crate whose convention-seam crosses a true seam without first running the dissolution.*

The standing operation absorbs the prior hand-roll hypothesis. The hand-roll hypothesis was the right operation framed at the wrong unit. The right unit is the engine's tier-graph, not the crate-graph. Re-seaming is the operation that respects the engine's tier-graph; it dissolves convention-cuts into the engine's natural tier portions. The hand-roll is then an automatic consequence of the dissolution at any tier where the dissolved portion is small.

The standing operation also absorbs the conformance-first priority. Re-seaming is an identity / independence / amortization investment, not a conformance gain. A crate at position two or three may be sitting vendored at the engine's current conformance plateau; the engagement may decide to defer re-seaming until conformance-tier pressure permits. The articulation does not require immediate dissolution of every position-two-or-three crate; it requires that the cut-geometry be known and the dissolution path be designed before the engine accumulates more cross-cuts that compound the convention-debt.

## IX. The prediction record

The articulation makes one falsifiable prediction at corpus tier: every further vendored crate the engagement probes will fall into one of the three positions, and the amortization gap will quantify cut-geometry distance from convention-seam to true-seam. If a crate is found whose cut-geometry resists all three positions — neither at true seam, nor upstream of it, nor downstream of it — the articulation is incomplete and the position-set needs extension.

The prediction is operational: the constraint-probe is a seam-finder. Each new probe either places the crate (vindicating the articulation) or extends the position-set (improving it). Either outcome is methodology-positive. The articulation does not require the position-set to stay at three; it requires that the operation of projecting foreign cuts onto true seams remain the engine's standard substrate-import discipline.

## X. Status

This articulation establishes vendored-crate re-seaming as the standing substrate-import operation for the Cruftless engine. Promotion to confirmed-instance status awaits the test-set of further crate probes (the engagement has approximately ten more ledger entries V010–V017 plus future imports awaiting probe) and the cross-practitioner replication tier per the SIPE Test 4 standard. The 2026-06-06 probe arc supplies the operational-match-tier evidence with eight crates probed and a consistent verdict per position. Cross-practitioner replication remains open.

The articulation's primary use is operational: every future vendor decision passes through the discriminator; every crate at position two or three is named in the apparatus-tier vendored-crate ledger as a re-seaming candidate; the engagement carries the cut-geometry of its substrate-import set as a first-class apparatus property.

---

> "Read free-agent's new synthesis — `vendored-crates-as-convention-cuts-2026-06-06.md`. PROFOUND reframe of the entire vendor question. Authorize α / β / γ?" → "Gamma"

The prompt is appended per the standing instruction: the prompt that produced an articulation is part of the artifact, so future readers can audit the directive that motivated the synthesis.
