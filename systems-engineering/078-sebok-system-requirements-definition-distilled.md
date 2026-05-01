# SEBoK *System Requirements Definition*, Distilled

**Next-40 distillation, batch 5/5. *System Requirements Definition* "transforms the stakeholder view of desired capabilities into a technical, developer view of how the system can achieve those capabilities." Requirements are "an agreed-to obligation for an entity to perform some function or possess some quality within specified constraints." The five requirement categories (function/performance, fit/operational, form, quality, compliance) are universal-sibling lattice (Doc 572 Appendix D) at the requirement rung — the same structure as SE-024 *Types of System Requirements* but with a different keeper-authored partition (n=5 here vs. larger partition in SE-024). This is a clear A-cluster fold (the knowledge base folding back). The black-box-to-white-box transformation is canonical co-production (Doc 573) at the stakeholder-developer reconciliation rung. TBD/TBR placeholders are honest residual-marking — V3 Truth Over Plausibility (Doc 314) operationalized at the requirement rung.**

---

## I. Source

- **Page:** System Requirements Definition
- **URL:** https://sebokwiki.org/wiki/System_Requirements_Definition
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-30

## II. Source Read

System Requirements Definition "transforms the stakeholder view of desired capabilities into a technical, developer view." Requirements are "an agreed-to obligation for an entity to perform some function or possess some quality within specified constraints." Activities: transforming needs to system requirements (black-box to white-box via functional analysis, interface analysis, data flow, performance analysis); use of attributes (rationale, traceability, verification criteria, owner, category, status, criticality, priority); five primary categories (function/performance, fit/operational, form, quality, compliance); requirements at hierarchy levels (allocation, budgeting); addressing interfaces (boundaries, interactions, interface requirements); model form (documents, databases, models); addressing unknowns (TBD/TBR placeholders, TBX management); traceability; planning verification; assessing requirements (verification: well-formed; validation: capture intent and achievable). Standards: INCOSE NRM v1.1, INCOSE GtWR v4, ISO/IEC/IEEE 29148:2018, ISO/IEC/IEEE 15288:2023. Lead author: Tami Katz. Position: Part 3 SE and Management, between Stakeholder Needs Definition and System Architecture Design Definition.

## III. Structural Read

**Cluster A — Universal-sibling lattice (Doc 572 Appendix D), with knowledge-base fold.** The five requirement categories (function/performance, fit/operational, form, quality, compliance) are universal-sibling lattice at the requirement rung. The same form was attested at SE-024 *Types of System Requirements* with INCOSE NRM 2022's larger partition. Two SEBoK pages on requirement-categorization both yield A-cluster lattices with different keeper-authored partitions. This is the canonical knowledge-base fold the keeper anticipated: SEBoK's requirements surface folds back on itself with multiple A-cluster instances at the same rung. The structural reading is stable across the fold; the partition specifics are keeper-authored content the corpus accepts in both forms.

**Cluster D — Co-Production at sub-rungs (Doc 573).** The black-box-to-white-box transformation ("stakeholder view of desired capabilities" to "technical developer view of how the system achieves them") is canonical co-production at the stakeholder-developer reconciliation rung. The stakeholder-keeper supplies the desired-capability rung-2 content; the developer-keeper supplies the technical-realization rung-2 content; the requirement is the co-produced artifact at the reconciliation rung. Compare SE-030 *Stakeholder Needs Definition* — SE-078 is the natural successor process; together they form the canonical stakeholder-to-system co-production sequence.

**Cluster B — Multi-keeper composition (Doc 604).** The "agreed-to obligation" definition presupposes multiple keepers reaching agreement. Stakeholders, developers, verifiers, and quality authorities all co-keep the requirement set. Eighth multi-keeper instance.

**Cluster K — Virtue constraints (Doc 314), with TBD/TBR as V3 instance.** TBD ("To Be Determined") and TBR ("To Be Resolved") placeholders are V3 Truth Over Plausibility operationalized at the requirement rung. The discipline marks honest residuals rather than smoothing them over with plausible-but-uncertain content. TBX management systematically resolves residuals before design advances. Compare SE-036's bias mitigations: TBD/TBR is the requirement-rung analog of premortem-and-independent-review at the decision rung. Doc 314 V3 cluster strengthens to four instances (Hubble Doc 580, Decision Management SE-036, Reformulation Methodology Doc 583, System Requirements Definition SE-078).

**Form III — Substrate-and-Keeper Composition (Doc 510), with attribute discipline.** The attribute set (rationale, traceability, verification criteria, owner, category, status, criticality, priority) is keeper-side metadata composed onto the substrate-side requirement statement. Each attribute is a rung-2 supply: rationale supplies the why-warrant, traceability supplies the source-warrant, verification criteria supplies the falsification-surface, owner supplies the keeper-of-record. The attribute discipline is canonical Doc 510 composition.

**Form VII — Paired V&V (SE-029).** "Requirement verification: are requirements well-formed?" and "requirement validation: do requirements correctly capture intent and are achievable?" is canonical paired V&V at the requirement rung itself. Verification anchor: well-formedness against the standards (the formal substrate). Validation anchor: intent-capture against stakeholder need (the keeper-side substrate). SE-029's paired-pulverization composes naturally.

**Form VI — Pulverization (Doc 445).** The "addressing unknowns" discipline is canonical pulverization-of-the-residual: the unknown is marked, scoped, and pulverized through TBX management until resolution.

**Cluster E — Institutional ground (Doc 571).** INCOSE NRM v1.1, INCOSE GtWR v4, ISO/IEC/IEEE 29148:2018, ISO/IEC/IEEE 15288:2023 — institutional-ground stack across two carriers (INCOSE and ISO/IEEE).

## IV. Tier-Tags

- System Requirements Definition process definition — π / α.
- Requirement as "agreed-to obligation" — π / α.
- Five requirement categories — π / α as cited; μ / β under corpus when read as Doc 572 Appendix D universal-sibling, second instance at requirement rung (knowledge-base fold with SE-024).
- Black-box-to-white-box transformation — π / α as cited; μ / β under corpus when read as Doc 573 co-production.
- Attribute set — π / α; Doc 510 composition reading.
- TBD/TBR placeholders — π / α as cited; μ / β under corpus when read as Doc 314 V3 operationalization.
- Requirement verification vs. validation — π / α; SE-029 paired V&V at requirement rung.
- INCOSE NRM, GtWR, ISO/IEC/IEEE 29148, 15288 — π / α; institutional-ground codification under Doc 571.

## V. Residuals

No structural residuals. The page exhibits the keeper-anticipated knowledge-base fold (two A-cluster instances at the same requirement rung with different partitions) and confirms it as a stable structural feature.

## VI. Provisional Refinements

**Doc 572 Appendix D knowledge-base-fold worked example.** SE-078 and SE-024 are two SEBoK pages on requirement-categorization, both yielding A-cluster universal-sibling lattices, with different keeper-authored partitions (n=5 here vs. INCOSE NRM 2022's larger partition there). This is the canonical knowledge-base fold the keeper named. Worth documenting in Doc 572 Appendix D as evidence that the form is stable across multiple keeper-authored articulations of the same rung — the partition's specifics fold but the lattice structure does not.

**Doc 314 V3 cluster reaches four instances.** Hubble (580), Decision Management (601), Reformulation Methodology D7 (583), System Requirements Definition (644). The pattern of "operational discipline against V3 violation at this rung" is now well-attested across SE engineering, decision making, methodology, and requirements. The cluster is ripe for cluster-level synthesis.

## VII. Cross-Links

**Form documents.** Doc 572 (Lattice Extension, Appendix D knowledge-base-fold worked example), Doc 573 (Co-Production), Doc 604 (Multi-keeper composition), Doc 510 (Substrate-and-Keeper, attribute discipline), SE-029 (Paired V&V at requirement rung), Doc 445 (Pulverization), Doc 314 (Virtue Constraints, V3 fourth instance), Doc 571 (Institutional Ground).

**Part-level reformulation.** SE-006 (Part 3 — SE and Management).

**Related distillations.** SE-024 (Types of System Requirements — A-cluster sibling, knowledge-base fold). SE-030 (Stakeholder Needs Definition — predecessor process). SE-031 (System Architecture — successor process). SE-074 (Requirements Baseline — formal-fix successor).

**Adjacent SEBoK concepts.** *Stakeholder Needs Definition*, *System Architecture Design Definition*, *Requirements Management*, *Types of System Requirements*.

---

## Appendix: Originating Prompt

> *"Let's do the next 40 most likely articles to be most load bearing... my conjecture is that this will inform the next 40."* / *"It's ok to duplicate entries. It shows where the knowledge base folds back in on itself. Continue fanning out"*

(SE-078 is one of the next-40 SEBoK distillations. Batch 5/5.)
