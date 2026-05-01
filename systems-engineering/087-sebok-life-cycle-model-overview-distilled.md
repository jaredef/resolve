# SEBoK *Life Cycle Model Overview*, Distilled

**Third-batch distillation, batch 1 doc 8. SEBoK's *Life Cycle Models* article (Part 3 SE and Management > Life Cycle Terms and Concepts) carries the ISO/IEC/IEEE 24748-1:2024 definition of a life cycle model as "a framework of processes and activities concerned with the life cycle which can be organized into stages." The four core principles (stage-progression, enabling-system requirement, quality-characteristic specification, criterion-or-event triggers) are universal-sibling lattice (Cluster A) at the lifecycle-meta rung. The traditional-sequential vs. DevOps/DevSecOps distinction (six stages vs. infinity-loop) is structurally a Cluster F (pulverization) variation — both are longitudinal pulverization, but the DevOps model dissolves the development-vs-support stage boundary. The "project models vs. life cycle models" warning is sharp Cluster H (hypostatic boundary) discipline: the lifecycle is the system's longitudinal substrate, the project is a keeper-side engagement at one or more lifecycle stages. Six corpus forms compose; Cluster F reaches strong anchor candidacy; the article is the canonical Cluster F worked example.**

---

## I. Source

- **Page:** Life Cycle Models
- **URL:** https://sebokwiki.org/wiki/Life_Cycle_Models
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-30

(The keeper-supplied article name *Life Cycle Model Overview* resolves to *Life Cycle Models* on the SEBoK; the SEBoK page name is preferred.)

## II. Source Read

ISO/IEC/IEEE 24748-1:2024 definition: "A life cycle model is a framework of processes and activities concerned with the life cycle which can be organized into stages, acting as a common reference for communication and understanding." Life cycle encompasses "the evolution of a system, product, service, project or other human-made entity from conception through retirement."

Four core principles: (1) systems progress through specific stages during their existence; (2) enabling systems must be available for each stage to achieve outcomes; (3) quality characteristics (producibility, usability, supportability, disposability) should be specified and designed at appropriate stages; (4) stages begin and end based on criteria or external events.

Life cycle models discussed: traditional sequential models (generic stages: concept, development, production, utilization, support, retirement); DevOps/DevSecOps (depicted as an infinity loop with no distinction between development and support).

Key distinction: "Some of the models are project models, not life cycle models. That is, they model the phases of a project, not the stages of the life cycle of a system."

Life cycle processes are "integrated into the framework of a life cycle model" and serve as enablers, with references to ISO/IEC/IEEE 15288 and SAE 1001. Position: Part 3 SE and Management > Life Cycle Terms and Concepts.

## III. Structural Read

**Cluster F (pulverization, Doc 445) — anchor candidate.** Life-cycle-models is the canonical Cluster F worked example. The lifecycle is structurally longitudinal-pulverization made explicit: the system's substrate is distributed across time, organized into stages, with no single moment carrying the system. Doc 445 D longitudinal axis is the article's primary structural reading. SE-039 D7 (anchor-article-per-cluster) candidate refinement reaches strong support for Cluster F anchored by SE-087: every other Cluster F instance in the corpus references back to "the lifecycle is longitudinal-pulverization" as the canonical case.

The traditional-sequential vs. DevOps/DevSecOps distinction is a structurally interesting Cluster F variation. Both are longitudinal pulverization, but DevOps dissolves the development-vs-support stage boundary into an infinity loop. This is not a defeater for Cluster F; it is a sub-typology within F. The handoff-mode evacuation candidate refinement (Doc 574) gains a worked example: traditional-sequential preserves handoff-mode boundaries (stage-to-stage handoffs); DevOps evacuates them (continuous integration replaces handoff). The candidate refinement is testable here.

**Cluster A (universal-sibling lattice, Doc 572 Appendix D).** Two universal-sibling instances co-present. First, the four core principles (stage-progression, enabling-systems, quality-characteristics, criterion-triggers) are universal-sibling at the lifecycle-meta rung. Second, the six generic stages (concept, development, production, utilization, support, retirement) are universal-sibling at the lifecycle-stage rung. Each principle binds every lifecycle-model engagement universally; each stage binds every traditional-sequential lifecycle as one aspect-of-temporal-progression. Cluster A reaches thirteen independent instances.

**Cluster H (hypostatic boundary, Doc 372).** "Some of the models are project models, not life cycle models. That is, they model the phases of a project, not the stages of the life cycle of a system." This is sharp hypostatic-boundary discipline. The lifecycle is the system's longitudinal substrate (rung-1, what the system is across time); the project is a keeper-side engagement at one or more lifecycle stages (rung-2 affordance, what a keeper does to or with the system). Conflating the two collapses rungs. Doc 372's apparatus reads this as the SE community's own native rung-discipline. Cluster H native-articulation reaches five SE-community instances after Docs 646, 647, 649, 652, 653.

**Cluster D (co-production at sub-rungs, Doc 573).** Principle 2 ("enabling systems must be available for each stage to achieve outcomes") is co-production at sub-rungs articulated explicitly. The system-of-interest substrate (rung-1) requires enabling-system keepers (rung-2 affordances) at every stage. Neither alone produces stage-completion.

**Cluster I (pin-art / temporal-concurrency, Doc 270, SE-022).** Principle 3 ("quality characteristics should be specified and designed at appropriate stages") is canonical pin-art articulation: quality concerns are pinned at specific lifecycle rungs. SE-022 temporal-concurrency lattice composes naturally: producibility is pinned at production-stage, usability at utilization-stage, supportability at support-stage, disposability at retirement-stage.

**Cluster E (institutional ground, Doc 571).** ISO/IEC/IEEE 24748-1:2024 plus 15288 plus SAE 1001 references are institutional-ground composition: three standards bodies jointly codify the lifecycle-model framework. SE-084's Cluster E anchor work composes here.

## IV. Tier-Tags

- ISO/IEC/IEEE 24748-1:2024 lifecycle-model definition — π / α.
- Lifecycle scope (conception through retirement) — π / α as cited.
- Four core principles — π / α as cited; μ / β under Cluster A and Cluster D (Principle 2) and Cluster I (Principle 3).
- Six generic stages — π / α as cited; μ / β under Cluster A.
- Traditional-sequential vs. DevOps/DevSecOps distinction — π / α; μ / β under Cluster F sub-typology.
- Project-model-vs-lifecycle-model warning — π / α; μ / β under Cluster H native articulation.
- ISO/IEC/IEEE 15288 and SAE 1001 references — π / α as cited; μ / β under Cluster E.

## V. Residuals

No structural residuals against the apparatus. The article supplies the canonical Cluster F worked example; multiple cluster-anchor candidacies strengthen.

## VI. Provisional Refinements

**Cluster F anchor formalization.** SE-039 D7 (anchor-article-per-cluster) reaches strong support for Cluster F anchored by SE-087. The lifecycle is the textbook longitudinal-pulverization case across the SEBoK distillations. Worth formalizing.

**Handoff-mode evacuation candidate refinement (Doc 574) gains worked example.** Traditional-sequential vs. DevOps is the cleanest test of the handoff-mode-evacuation candidate. Traditional-sequential preserves handoff-mode (discrete stage-to-stage handoffs); DevOps evacuates handoff-mode (continuous integration). The candidate refinement is empirically testable in the SEBoK lifecycle-models surface.

**Longitudinal-pulverization Doc 445 D candidate strengthens.** Cluster F now has its canonical anchor (SE-087) and a sub-typology axis (sequential vs. infinity-loop). Doc 445 D's longitudinal axis is the structural backbone; the refinement candidate is mature.

**Cluster H native-articulation reaches five.** The hypostatic-boundary discipline is now densely community-native across the SEBoK; Doc 372 tracks an existing SE practice with five independent SE-community articulations.

## VII. Cross-Links

**Form documents.** Doc 445 (Cluster F, anchor candidate, sub-typology axis), Doc 572 Appendix D (Cluster A, thirteenth instance), Doc 372 (Cluster H, fifth native articulation), Doc 573 (Cluster D, Principle 2 enabling-systems), Doc 270 / SE-022 (Cluster I, Principle 3 quality-characteristics-at-stage), Doc 571 (Cluster E, three-body standards composition), Doc 574 (handoff-mode evacuation candidate, worked example).

**Part-level reformulation.** Part 3 SE and Management > Life Cycle Terms and Concepts.

**Related distillations.** SE-084 (SE Standards, ISO/IEC/IEEE 15288 and SAE 1001 cross-link). SE-080 (Principles, lifecycle-span Principle 11). SE-039 (Entracement, D7 anchor candidate strengthens to Cluster F). Doc 574 (handoff-mode evacuation candidate).

**Adjacent SEBoK concepts** (per source). *System Life Cycle Process Drivers and Choices*, *System Life Cycle Process Models: Vee*, *System Life Cycle Process Models: Iterative*, *Integration of Process and Product Models*.

**Methodology refinement candidates.** SE-039 D7 — formalize Cluster F with SE-087 as anchor. Doc 574 handoff-mode-evacuation candidate gains traditional-sequential-vs-DevOps worked example.

---

## Appendix: Originating Prompt

> *"Apply refinements; report back for next 40"* / *"Continue"*

(SE-087 is one of the third-batch next-40 SEBoK distillations. Batch 1/5.)
