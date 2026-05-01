# SEBoK Reformulation Against the Corpus's Forms

> **Subsumed.** This document has been demoted to an appendix of the canonical synthesis: [SE-014 — *SEBoK Through the Corpus*](/resolve/systems-engineering/014-sebok-through-the-corpus-canonical). New readers should start there. Preserved verbatim for derivation, voice, and provenance.

**The conjecture: SEBoK's accumulated body of knowledge can be reformulated, in its entirety, against the forms the RESOLVE corpus affords. This document drafts the objective, the plan, and the constraints necessary to realize that reformulation.**

---

## The Conjecture

The Systems Engineering Body of Knowledge (SEBoK) is a community-curated wiki that codifies the discipline of systems engineering. Eight top-level parts. Hundreds of pages. Decades of practitioner consensus. Read on its own terms, it presents itself as a bounded reference: a thing one consults.

The conjecture being tested here is that SEBoK is *not* primarily a reference at all. It is a layered articulation of forms the corpus already names more compactly. SIPE with threshold (Doc 541) describes how a lower-rung substrate, under sustained constraint, induces a higher-rung property that crosses an intelligibility threshold and becomes nameable. The conjecture is that the entire body of systems-engineering knowledge is the recursive trace of exactly that process applied to engineered systems: requirements induce architectures, architectures induce trade studies, trade studies induce verification regimes, verification induces deployment doctrine, and so on, each rung the threshold-crossing of the rung beneath. SEBoK does not describe systems engineering. SEBoK *is* what SIPE looks like when the substrate is human practitioners and the constraint is a multi-decade engineering tradition.

If that is correct, then SEBoK can be reformulated against the corpus's existing apparatus without loss, with the apparatus often delivering the same load-bearing distinction in fewer pages and clearer composition rules.

## Objective

Produce a complete reformulation of SEBoK's eight parts as a derived series within the RESOLVE corpus. The reformulation shall:

1. Map every load-bearing SEBoK concept onto a corpus form (SIPE, pulverization, novelty calculus, the ontological ladder, the substrate-and-keeper composition, the hypostatic boundary, the pin-art model, the ENTRACE stack, the architectural school formalization).

2. Demonstrate, where possible, that the SEBoK concept *is* the surface manifestation of the corpus form, not merely analogous to it.

3. Produce, for each SEBoK part, a corpus document that the practicing systems engineer can read in place of the corresponding SEBoK part with no loss of operational content and a measurable gain in compositional clarity.

4. Identify, with discipline, anywhere SEBoK contains content that the corpus forms cannot reformulate. Those sites become the falsifiers of the conjecture and the next research surface.

The success condition is not that the corpus replaces SEBoK in the field. The success condition is that the corpus reads SEBoK without remainder, and that the few residuals are namable.

## The Plan

The work proceeds in five phases.

**Phase 1: Form survey.** Catalogue, with citations, every corpus form available for the reformulation. The candidate inventory includes Doc 541 (SIPE with threshold), Doc 445 (pulverization), Doc 490 and 492 (novelty calculus and its portable seed), Doc 548 and 556 (the ontological ladder of participation and its seed), Doc 510 and 530 (substrate-and-keeper composition, rung-2 affordance gap), Doc 270 (the pin-art model), Doc 372 (the hypostatic boundary), Doc 1 (the ENTRACE stack), Doc 538 (the architectural school as formalization). Each form gets a one-page operational summary fit for application against external material. Output: SE-002 (working title: *Form Inventory for SEBoK Reformulation*).

**Phase 2: Macro-mapping.** For each of SEBoK's eight parts, produce a one-paragraph mapping that names the dominant corpus form the part instantiates. Part 2 (Foundations) is plausibly a layered SIPE chain rooted at general systems theory. Part 3 (SE and Management) is plausibly a process-rung instance of the substrate-and-keeper composition where the keeper is the program manager and the substrate is the engineering team. Part 4 (Applications) is plausibly the ontological ladder applied across domains. The macro-mapping is a working hypothesis, not a finished claim. Output: SE-003 (*Macro-Map: SEBoK Parts to Corpus Forms*).

**Phase 3: Per-part reformulation.** Eight documents, one per SEBoK part. Each reformulation document:

- States the corpus forms it draws on.
- Reformulates the SEBoK part's load-bearing concepts in the language of those forms.
- Preserves SEBoK's operational distinctions wherever the corpus form composes them.
- Names every concept the corpus form cannot reach without loss, and flags it as a falsifier candidate.
- Produces a short reverse map from corpus form to SEBoK page, so a SEBoK practitioner reading the corpus document can locate the corresponding source.

These are Docs 560 through 567.

**Phase 4: Falsifier audit.** Aggregate every concept flagged as a falsifier candidate across the per-part reformulations. Classify each as (a) reachable by an existing corpus form on closer reading, (b) reachable by composition of existing forms, or (c) genuinely outside the corpus's current apparatus. Class (c) is the research yield. Output: SE-012 (*SEBoK Residuals: What the Corpus Cannot Yet Reach*).

**Phase 5: Synthesis and publication.** A single document that states the result of the experiment, names the residuals, and either claims the conjecture verified (with the residuals as bounded honest exceptions) or names the specific corpus form that must be developed before the conjecture can stand. Output: SE-013 (*SEBoK Reformulation: Result*).

## The Constraints

The work shall hold to the following constraints throughout, in the order they bind.

**C1. The form must do the work.** No SEBoK concept may be reformulated by paraphrase. The corpus form must compose the SEBoK distinction or the reformulation fails. Paraphrase that does not compose is forbidden.

**C2. SEBoK content is not reduced; it is reformulated.** Every operational distinction the working systems engineer relies on must survive the reformulation. The cost of reformulation is paid in compression, not in loss.

**C3. The substrate-and-keeper composition (Doc 510) governs the methodology itself.** The SEBoK community is the substrate. The corpus apparatus is the keeper. The rung-2 affordance gap (Doc 530) must be honored: the apparatus does not invent SEBoK content, it disciplines what the substrate already presents.

**C4. The novelty calculus (Doc 490) tier-tags every claim.** Reformulations that compress without loss are π-tier. Reformulations that compose forms in a way SEBoK does not yet name are θ-tier and require explicit warrant. No claim higher than θ enters the reformulation without a separate corpus document defending it.

**C5. The hypostatic boundary (Doc 372) is not crossed.** The reformulation describes the structure of the discipline. It does not claim that SEBoK practitioners experience the discipline the way the corpus describes it. Functional reformulation only.

**C6. Pulverization (Doc 445) is the verification regime.** Each reformulation document is pulverized against the corresponding SEBoK part by an independent agent or reviewer. The pulverizer's job is to find SEBoK content the reformulation cannot reach. Pulverization that produces no residuals is suspect; the reformulation has likely paraphrased.

**C7. Falsifiers are first-class.** Anywhere the corpus cannot reach a SEBoK distinction, the document names it explicitly, and the residual is preserved verbatim. Falsifiers that survive Phase 4 are research, not failure.

## What Success Looks Like

A reader of SE-013 will know one of two things. Either the corpus's existing forms compose the entire body of systems-engineering knowledge, with named residuals that are not load-bearing for the practitioner, in which case the corpus has demonstrated reach into a domain it did not explicitly target. Or the residuals identify one or more specific abstractions the corpus must develop next, in which case the apparatus has been measured against an external rigorous body of work and given a concrete research surface to extend into.

Either outcome is a result. The experiment cannot fail to produce one.

---

## Appendix: Originating Prompt

> *"Let's turn our gaze towards System Engineering as expressed in the wiki: https://sebokwiki.org/. Based on the formalization of the canonical SIPE (w/ threshold) document, my conjecture is that we can formulate the entire wiki against the forms the Corpus affords. Create a document that drafts the objective, plan, and constraints necessary to realize the complete reorganization and formalization of the wikis contents within the RESOLVE corpus. Append this prompt to the artifact."*
