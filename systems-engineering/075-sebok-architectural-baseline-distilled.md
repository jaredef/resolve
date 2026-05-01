# SEBoK *Architectural Baseline (Allocated Baseline)*, Distilled

**Next-40 distillation, batch 5/5. SEBoK has no standalone "Architectural Baseline" page; the architectural baseline is treated under *Configuration Baselines* as the Allocated Baseline (ABL): the allocation of requirements to major system elements at lower configuration item levels, defining expected functionality and performance for each component. The ABL is the second pin-set in the FBL/ABL/PBL progressive pin-art sequence (Doc 270 + SE-031 progressive pattern). The allocation operation is canonical co-production at sub-rungs (Doc 573): the architecture-keeper composes with each component-keeper to produce the allocated requirement set per element. The ABL exhibits multi-keeper composition (Doc 604) at the component-allocation reconciliation rung; rule is subordination-by-domain. SAE-EIA 649C continues as institutional-ground carrier.**

---

## I. Source

- **Page:** Configuration Baselines (the SEBoK page where the architectural/allocated baseline is articulated; no standalone Architectural_Baseline or Allocated_Baseline page exists)
- **URL:** https://sebokwiki.org/wiki/Configuration_Baselines
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-30

## II. Source Read

The Allocated Baseline (ABL) represents "the 'allocation' of requirements to major system elements at lower configuration item levels, defining expected functionality and performance for each component." Contents: allocation of requirements to system components, functional assignments, performance expectations, component-level specifications. Lifecycle role: reference point following functional baseline establishment; guides detailed design of individual components. Associated documentation: Allocated Configuration Documentation (ACD) details specific configurations of individual system elements derived from overall system requirements. Position: same as FBL — Configuration Baselines page within Part 3 Technical Management Processes.

## III. Structural Read

**Cluster A — Universal-sibling lattice (Doc 572 Appendix D), middle position.** The ABL is the second axis in the FBL/ABL/PBL triplet. Each axis binds universally; the discriminator is lifecycle-stage-of-formal-fix. The ABL's specific aspect is allocation-after-architecture-decomposition. The triplet's compactness as a teaching-example (per SE-074's refinement candidate) holds.

**Cluster D — Co-Production at sub-rungs (Doc 573).** Allocation is canonical co-production. The architecture-keeper specifies the component decomposition; each component-keeper (the SME or sub-team responsible for that element) co-produces the allocated requirement set with the architecture-keeper. Doc 573's apparatus reads the ABL as a layered co-production artifact: rung-N system requirement composes with rung-(N+1) component allocation to produce the per-element requirement set. The push/pull taxonomy (Doc 573 Appendix B) applies: allocation can be push-direction (architecture pushing requirements down) or pull-direction (component pulling requirements up via interface negotiation).

**Cluster B — Multi-keeper composition (Doc 604).** The ABL is the formal fix-point where the architecture-keeper's decomposition meets each component-keeper's component-substrate. The reconciliation rung is the ABL itself; the rule is subordination-by-domain (each component-keeper owns its element's requirement allocation, subordinated to the architecture-keeper's decomposition). Seventh multi-keeper instance.

**Cluster I — Pin-art / temporal-concurrency (Doc 270, progressive-pin-art).** The FBL → ABL → PBL sequence is the progressive-pin-art pattern named in SE-031. The FBL is the requirement pin-set; the ABL is the allocation pin-set; the PBL is the realized-product pin-set. Each successor pin-set is constrained by its predecessor and adds resolution. The architectural-baseline rung is the middle pin-set where the substrate's flow is most actively shaped.

**Form III — Substrate-and-Keeper Composition (Doc 510), with the allocation move.** Allocation itself is a keeper-side rung-2 supply: the substrate (component-design teams) cannot produce the allocated requirement set without architecture-keeper authority deciding which requirements go to which component. The ABL is the artifact in which this rung-2 supply is materialized.

**Cluster E — Institutional ground (Doc 571).** SAE-EIA 649C carries the ABL as part of the configuration baseline triplet. Same institutional layer as FBL.

## IV. Tier-Tags

- ABL definition (SAE-EIA 649C, SEBoK Configuration Baselines page) — π / α.
- Allocation-of-requirements-to-components — π / α as cited; μ / β under corpus when read as Doc 573 co-production at the architecture-component rung.
- ABL as middle baseline — π / α; progressive-pin-art reading under Doc 270 + SE-031.
- ACD (Allocated Configuration Documentation) — π / α; institutional artifact form.
- Subordination-by-domain rule — μ / β under corpus when reading the ABL multi-keeper structure (Doc 604).

## V. Residuals

**R1 (catalog).** Same catalog residual as SE-074: no standalone Architectural_Baseline page; the architectural baseline is folded into Configuration Baselines as the ABL. The "architectural baseline" vocabulary is practitioner-common; SEBoK's normalized vocabulary uses "allocated baseline." Synonym noted.

## VI. Provisional Refinements

**Doc 573 push/pull taxonomy worked example: requirements allocation.** Doc 573 Appendix B distinguishes push-direction co-production (the keeper proposes, the substrate refines) from pull-direction (the substrate requests, the keeper supplies). Requirements allocation in the ABL exhibits both directions: architecture pushes requirements down to components; components pull interface specifications up to architecture. Worth documenting as a worked example showing both push and pull in a single canonical SE artifact.

## VII. Cross-Links

**Form documents.** Doc 572 (Lattice Extension, Appendix D, A-cluster middle position), Doc 573 (Co-Production, push/pull taxonomy worked example candidate), Doc 604 (Multi-keeper composition, subordination-by-domain rule), Doc 270 / SE-031 (Progressive pin-art), Doc 510 (Substrate-and-Keeper), Doc 571 (Institutional Ground).

**Part-level reformulation.** SE-006 (Part 3 — SE and Management).

**Related distillations.** SE-074 (Requirements Baseline / FBL — predecessor in the triplet). SE-076 (Product Baseline / PBL — successor in the triplet). SE-031 (System Architecture — the substrate process producing the ABL candidate; A-cluster instance at architecture rung).

**Adjacent SEBoK concepts.** *Configuration Management*, *System Architecture Design Definition*, *System Requirements Definition*.

---

## Appendix: Originating Prompt

> *"Let's do the next 40 most likely articles to be most load bearing... my conjecture is that this will inform the next 40."* / *"It's ok to duplicate entries. It shows where the knowledge base folds back in on itself. Continue fanning out"*

(SE-075 is one of the next-40 SEBoK distillations. Batch 5/5.)
