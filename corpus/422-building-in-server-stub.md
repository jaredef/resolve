# Building in SERVER: A Practitioner's Companion (Stub)

> **Reader's Introduction**
>
> This is a stub. It claims the slot in the corpus where a practitioner's companion to the SERVER style (Doc 432) and its seed specification (Doc 250) will eventually live, parallel to Doc 421 (*Building in PRESTO*), which plays the same role for the PRESTO dissertation (Doc 426). The stub names the sections the eventual companion is expected to contain, states the scope, and flags what the document does not yet hold. The practitioner material for SERVER is thinner than for PRESTO at the time of writing — the reference evidence is one C bootstrap resolver (461 lines, zero dependencies) emitting one PRESTO engine (921 lines, zero dependencies) — and a full companion would rehash Doc 432 and Doc 250 rather than add practitioner insight. Filling this stub should wait until the body of SERVER-specific practitioner experience is large enough that a developer reading the companion would encounter guidance they could not derive from Doc 432 and Doc 250 alone.

**Jared Foy · 2026-04-22 · Doc 422**

**Stub. Placeholder for the practitioner's companion to the SERVER style. The prompt is appended.**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

---

## 1. Status

This document is a stub, not a companion. Until filled, the current SERVER material is:

- **[Doc 432 — SERVER: An Architectural Style for Engine Orchestration](/resolve/doc/432-server-an-architectural-style-for-engine-orchestration).** The current canonical dissertation. Five constraints, induced property, composition with PRESTO and REST, conceptual foundations, comprehensive prior art.
- **[Doc 250 — SERVER Seed](/resolve/doc/250-server-seed).** The bootstrap-resolver specification: 8 contracts, 12 orchestration directives, 14-stage bootstrap pipeline, 12 verification tests.
- **[Doc 421 — Building in PRESTO](/resolve/doc/421-building-in-presto-a-practitioners-companion).** The parallel practitioner companion for PRESTO, whose structure this document will eventually follow.

Practitioners building a SERVER-conformant engine today should work from Doc 432 (the style) and Doc 250 (the seed), treating the specific implementation decisions as prescribed by those two documents. Cross-language derivation of a conformant engine has been demonstrated once, in C (461-line bootstrap, 921-line emitted PRESTO engine). Additional derivations in other languages will accumulate the practitioner body this stub is waiting for.

## 2. Expected Sections (When Filled)

The companion is expected to cover the following, in structural parallel to Doc 421.

**§2.1 The developer's mental model at the orchestration level.** Two simultaneous views: the seed-author's view, in which the orchestration seed is a bilateral artifact interleaving orchestration directives with resolver affordances; and the bootstrap-resolver's view, in which the seed is input to a pipeline that emits a runtime graph. The seed-author authors; the bootstrap resolver realizes; the runtime graph executes.

**§2.2 The bootstrap lifecycle.** Three phases parallel to Doc 421 §3 but operating at the orchestration level: declaration (the seed), resolution (the bootstrap pipeline consumes orchestration directives and emits the runtime graph), emergence (the emitted engine runs the PRESTO construction pipeline). The same temporal structure falls out of the same constraint shape, one level up.

**§2.3 Manifest-declared intent versus sandbox-enforced runtime.** The seed's manifest declares what privileges each module claims; the bootstrap sandbox enforces the corresponding prefix of the privilege-constraint accumulation (see Doc 432 §3.3). Practitioner guidance on authoring manifests and understanding what enforcement a given manifest commits to.

**§2.4 Choosing a module-privilege layer.** Practitioner-level framing of Doc 432 §3.3's accumulation. When is Layer 0 (pure functions) the right choice? When is a higher layer warranted? What specifically is being given up when a constraint is refused? This section will parallel Doc 421 §6 (per-layer composability) applied to module privilege rather than to client-side runtime.

**§2.5 Writing a SERVER seed.** Practical guidance on seed authorship: the 8 contracts as sections, the 12 orchestration directives as operations, the 14-stage bootstrap pipeline as structure, the 12 verification tests as acceptance criteria. How a human or resolver moves from a target engine capability to a conformant seed.

**§2.6 Cross-language portability.** What the C reference implementation demonstrates and what a second-language derivation (in progress or planned) is expected to add. The portability claim is that the same seed produces a behaviorally equivalent engine in any conforming language; the evidence bar for that claim is more than one language.

**§2.7 Recursion: the seed that contains its own bootstrap.** The consummation of the orchestration model, as noted in Doc 432 §7: a SERVER seed can contain the bootstrap resolver that consumes it. Practitioner implications — when the seed is self-bootstrapping, the engine's proof-of-construction travels with the seed. This section will be brief; the material is speculative until demonstrated in practice.

## 3. What Is Not Yet in the Stub

- A worked example of authoring a SERVER seed from scratch.
- A second-language derivation of a conformant engine (the existence proof of cross-language portability).
- Practitioner-level diagnostic guidance — what goes wrong when a seed is malformed, what verification-test failures tell you about which orchestration-directive semantics were violated.
- A treatment of the module registry at practitioner depth — what it is to compose adapters, context providers, channel handlers, middleware into a coherent runtime graph.
- The operational implications of the "recursive ambivalence with self-authorizing determinism" property at ops-engineering scale: how a self-authorizing runtime graph interacts with deployment, secret rotation, and multi-tenant isolation.

Each of these items is specifically missing evidence at the time of writing. Each item's absence is not an omission of the companion; it is a reflection of what the corpus has not yet produced.

## 4. Conditions for Filling the Stub

This stub should be replaced with a full companion when at least the following have been accumulated:

- A second conformant engine derivation exists (in a language other than C).
- At least one non-author practitioner has authored a SERVER seed or bootstrap resolver.
- The module-privilege accumulation has been exercised across three or more distinct privilege axes with documented trade-offs, so §2.4's guidance has material to draw on.
- The worked-example material for §2.5 (authoring a seed) has been written at least once against a real target engine capability, with the steps made legible to a reader who was not present for the work.

Filling the stub before these conditions are met would produce a companion that is largely restatement of Doc 432 and Doc 250 — valuable as pedagogy but not warranted as a separate artifact yet.

## 5. Falsifiers of the Stub's Reasoning

- If practitioner demand for a SERVER companion surfaces before the conditions in §4 are met — for example, if a second practitioner attempts to build a SERVER-conformant engine and finds Doc 432 and Doc 250 insufficient — that is evidence that §4's threshold is set too high and the stub should be filled sooner.
- If the C reference engine and the SERVER seed together answer every practitioner question that arises in practice, the stub may never need filling and can be retracted in favor of clearer cross-references from Doc 432 and Doc 250.
- If the structural parallel with Doc 421 turns out not to hold — if SERVER-at-the-practitioner-level does not break down into the same sections PRESTO-at-the-practitioner-level does — the expected-sections list in §2 is wrong and should be revised before the stub is filled.

---

## Appendix: The Prompt That Triggered This Document

> "Create a stub doc for Building in SERVER"
