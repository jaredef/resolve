# SEBoK *Requirements Flow-Down and Allocation*, Distilled

**Fourth-batch SEBoK distillation, batch 5 doc 7. Target article 404'd; carriers include *Requirements Management* ("managing the flow down — allocation and budgeting — of requirements from one level to another"), *System Requirements Definition*, *Physical Architecture* ("system requirements allocated to both logical and physical architectures"), *System Architecture Design Definition*, *System Detailed Design Definition*, *Nature of Project Management*, *SE-SwE*, *Design Property (glossary)*. Stress-tests Cluster A two-axis universal-sibling (SE-039 §VII.6, SE-082 candidate, SE-157 instance) at requirement rung: requirement type (SE-024 universal-sibling) × allocation level (logical / physical / detailed-design / system / subsystem ordinal) is the canonical two-axis case. SE-024's seven requirement types (functional, performance, interface, operational, etc.) are axis-1; allocation level is axis-2. Forward-pulverization (Doc 445 Refinement C, formalized) at requirement rung. Six corpus forms compose; two-axis universal-sibling at requirement rung is the principal contribution.**

---

## I. Source

- **Page:** Requirements Flow-Down and Allocation (target — 404, does not exist as standalone)
- **URL (target):** https://sebokwiki.org/wiki/Requirements_Flow-Down_and_Allocation
- **Distributed carriers:** *Requirements Management* ("managing the flow down — allocation and budgeting — of requirements from one level to another"), *System Requirements Definition* (cascade through design phases), *Physical Architecture* ("requirements allocated to both logical and physical architectures"), *System Architecture Design Definition* (allocation across architectural layers), *System Detailed Design Definition* (design driven by allocated requirements), *The Nature of Project Management* ("requirements allocation and flow-down" as key SE attribute), *Systems Engineering and Software Engineering*, *Design Property (glossary)*
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-30

## II. Source Read

The target page does not exist. Requirements flow-down and allocation is carried across at least eight host articles. Requirements Management states the canonical flow-down/allocation/budgeting equivalence (the practitioner tradition treats "flow-down" and "allocation" as near-synonyms with slight emphasis differences — flow-down emphasizes the cross-level cascade, allocation emphasizes the cross-element distribution). Physical Architecture and System Architecture Design Definition carry the architectural-allocation framing; System Requirements Definition and System Detailed Design Definition carry the cross-level cascade framing.

## III. Structural Read

**Editorial-state observation.** Dispersed-instrument pattern at moderate density.

**Cluster A (universal-sibling lattice, Doc 572 Appendix D), two-axis universal-sibling sub-form (SE-039 §VII.6, formalization-ready) — load-bearing reading.** The discipline composes two co-located lattices. Axis-1: requirement types (SE-024 universal-sibling, seven types — functional, performance, interface, operational, environmental, regulatory, life-cycle) — each requirement instance binds all axes universally. Axis-2: allocation level (system / subsystem / component / detailed-design rungs, plus logical / physical / behavioral views as further axes — SE-031 universal-sibling at architecture rung). The two-axis composition is type × level: each requirement is simultaneously a type AND allocated to one or more levels. SE-157 (competency dimension × level) and SE-082 (stakeholder roles × lifecycle-stages) are prior two-axis instances; SE-158 is the fourth two-axis instance — the candidate is formalization-ready. The requirement-rung instance is structurally clean because SE-024 already named axis-1 and SE-031 already named axis-2-adjacent; the composition is the structural observation.

**Cluster F (pulverization, Doc 445), forward sub-form (Refinement C, formalized).** Requirement flow-down IS forward-pulverization at requirement rung. A high-level requirement pulverizes into lower-level requirements as it cascades through architecture and detailed design; each pulverization stage adds detail and binds substrate. SE-039 §VII.6 noted forward-pulverization spans three orders of magnitude (decision-meeting → infrastructure-commitment); requirement flow-down spans similar orders (mission → system → subsystem → component → detailed-design → implementation). Adjacent to Doc 445 Refinement D (longitudinal pulverization, anchor reassignment to IM proposed in SE-039 §VII.6) — requirement flow-down is one substrate-preservation case alongside CM, IM, and reuse (SE-154).

**Cluster D (co-production at sub-rungs, Doc 573).** Allocated requirements are co-produced: the higher-level requirement (rung-2 affordance) and the lower-level architecture (rung-1 substrate) jointly produce the allocated requirement. Push/pull taxonomy (Doc 573 Appendix B) applies: allocation is canonical push (higher level pushes constraint downward); flow-down emphasizes the push direction.

**Cluster B (multi-keeper composition, Doc 604).** Allocation is multi-keeper at the architectural rung: the requirements-engineer keeper composes against architecture-engineer keeper(s) at each level. Coordination-by-rung composition rule.

**Cluster J (affordance gap, Doc 530).** Flow-down bridges the level-of-detail affordance gap: the higher level cannot articulate detailed-design constraints; the lower level cannot articulate mission-level intent. Allocation is the bridging discipline.

**Cluster H (hypostatic boundary, Doc 372).** Requirements allocation describes constraint-distribution across architecture; the discipline does not claim requirements ARE ontological objects. Standard hypostatic discipline.

## IV. Tier-Tags

- "Managing the flow down (allocation and budgeting) of requirements from one level to another" (Requirements Management) — π / α as cited; μ / β under Cluster A two-axis and Cluster F forward-pulverization.
- Allocation to logical and physical architectures (Physical Architecture) — π / α as cited; μ / β under Cluster A axis-2.
- "Requirements allocation and flow-down" as key SE attribute (Nature of PM) — π / α as cited.
- Design Property as characteristic obtained through allocation — π / α as cited.
- Article non-existence — μ / β under SE-039 §VII.6 dispersed-instrument pattern.
- Two-axis composition (type × level) — μ / β under Cluster A two-axis universal-sibling formalization-ready.

## V. Residuals

R1 (article-absence). Closed via dispersed-instrument pattern. No structural residual against the apparatus.

R2 (flow-down vs allocation terminology). The two terms are near-synonyms in the source-tradition. Corpus reading: flow-down emphasizes the cross-level cascade direction (Cluster F forward-pulverization), allocation emphasizes the cross-element distribution (Cluster B multi-keeper coordination). Both are facets of the same Cluster A two-axis lattice; the terminology overlap is itself school-internal vocabulary variance (Doc 538).

## VI. Provisional Refinements

Aligns with sixteen formalized refinements per SE-039 §VII.6:
- *Two-axis universal-sibling (refinement 6 candidate, ready for full formalization).* Fourth instance after Docs 648, 682, 723. Formalization is now strongly supported.
- *Forward-pulverization (Refinement C, formalized).* Requirement-rung instance — high-relevance because requirements engineering is a load-bearing SE discipline.
- *Longitudinal pulverization adjacency.* Requirement flow-down is a substrate-preservation discipline alongside CM (SE-097), IM (SE-114, anchor candidate), and reuse (SE-154).
- *Push/pull taxonomy (Doc 573 Appendix B).* Allocation is canonical push.
- *Composition-rule-stacking (SE-156 candidate).* Cluster B coordination-by-rung composes with Cluster F forward-pulverization at the requirements engagement; second instance of rule-stacking observation.

## VII. Cross-Links

**Form documents.** Doc 572 Appendix D (Cluster A two-axis universal-sibling, fourth instance), Doc 445 (Cluster F forward-pulverization at requirement rung), Doc 604 (Cluster B multi-keeper coordination), Doc 573 / Appendix B (Cluster D co-production, push/pull), Doc 530 (Cluster J affordance gap), Doc 372 (Cluster H), SE-039 §VII.6.

**Part-level reformulation.** SE-006 (Part 3 — Lifecycle Models, requirements processes). SE-007 (Part 4 — Applications including architecture).

**Related distillations.** SE-024 (Types of System Requirements — axis-1 source). SE-031 (System Architecture — axis-2 source). SE-082 (two-axis universal-sibling first instance). SE-157 (Competency Assessment — two-axis third instance). SE-097 (Configuration Management — substrate-preservation adjacent). SE-114 (Information Management — substrate-preservation anchor candidate). SE-154 (Reuse — substrate-preservation adjacent).

**Adjacent SEBoK concepts** (per source carriers). *Requirements Management*, *System Requirements Definition*, *Physical Architecture*, *System Architecture Design Definition*, *System Detailed Design Definition*, *Nature of Project Management*, *SE-SwE*.

**Methodology refinement candidates.** Two-axis universal-sibling promotion to formal sub-form (fourth clean instance); composition-rule-stacking observation at second instance.

---

## Appendix: Originating Prompt

> *"Apply refinements"* / *"Continue next knowledge base entrancement"*

(SE-158 is batch 5 doc 7 in the fourth-batch SEBoK distillation sweep, Docs 686–725. Target article 404'd; distillation reads requirement type × allocation level as fourth two-axis universal-sibling instance, formalization-ready. Batch 5/5.)
