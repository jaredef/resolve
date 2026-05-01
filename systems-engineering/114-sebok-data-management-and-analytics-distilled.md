# SEBoK *Data Management and Analytics for Systems Engineering*, Distilled

**Third-batch SEBoK distillation, batch 5 doc 3. SEBoK's *Information Management* page (Part 3, Technical Management Processes) is the canonical carrier for data management and analytics in SE; no standalone "Data Management and Analytics" page exists. ISO/IEC/IEEE 15288 supplies the IM-process definition: "generate, obtain, confirm, transform, retain, retrieve, disseminate, and dispose of information." The Prepare/Perform partition is Cluster A at the IM-activity rung; the eight verbs of the 15288 definition are a second Cluster A at the information-handling-aspect rung. The longitudinal dimension is the page's structural center: information must be "managed across its entire lifecycle from creation through disposal." This is the canonical **longitudinal-pulverization** worked example (SE-039 §VII.5 candidate Refinement D for Doc 445): Information Management preserves the pulverization-substrate across time, structurally distinct from backward (SE-029) and forward (SE-035) pulverization. Three-carrier institutional robustness clean: ISO/IEC/IEEE 15288 + GEIA-STD-927B + DAMA-DMBOK as three independent carriers. Six clusters compose; longitudinal-pulverization Refinement D candidate gains canonical anchor at this article.**

---

## I. Source

- **Page:** Information Management
- **URL:** https://sebokwiki.org/wiki/Information_Management
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-30

## II. Source Read

Information management "helps teams access and manage information over its lifecycle, ensuring that the information is relevant, complete, verified, protected, distributed and managed." ISO/IEC/IEEE 15288's IM process aims to "generate, obtain, confirm, transform, retain, retrieve, disseminate, and dispose of information to designated stakeholders" (eight verbs). Two major process partitions: Prepare for Information Management (define scope, define approach, develop IM plan) and Perform Information Management (collect, organize and categorize, analyze and transform data into insights, distribute, protect, manage end-of-life and obsolescence). Analytics is named explicitly: the IM system must support "analysis of data to transform it into information" and "reporting of results per appropriate context for decisions." Pain points: missing metadata, undefined data dictionaries, absent lifecycle workflows, inadequate security classifications, access obsolescence. Standards: ISO/IEC/IEEE 15288, 15289, 27001; GEIA-STD-927B (Data Management); MIL-STD-963C; NIST SP 800-160v1r1; DAMA-DMBOK (Data Management Body of Knowledge). Position: Part 3 Technical Management Processes, between Configuration Management Implementation and Quality Management.

## III. Structural Read

**Cluster A (universal-sibling lattice, Doc 572 Appendix D), at the IM-activity rung.** Prepare/Perform is a binary universal-sibling partition; both bind every IM engagement universally. The eight ISO 15288 verbs (generate, obtain, confirm, transform, retain, retrieve, disseminate, dispose) form a second universal-sibling lattice at the information-handling-aspect rung — each verb binds every information item across its life. Two co-located Cluster A lattices, paralleling the System Security pattern (SE-112).

**Cluster F (pulverization, Doc 445), with longitudinal direction as canonical worked example for the Refinement D candidate.** Per SE-039 §VII.5 the candidate Refinement D (longitudinal-pulverization, surfaced at Configuration Management) names the pulverization-substrate-preservation across time as structurally distinct from backward (against accumulated literature) and forward (premortem) pulverization. Information Management is the cleaner anchor: the entire discipline is the longitudinal preservation of the substrate across the life cycle. Configuration Management is one specific application; Information Management is the general case. Refinement D should anchor here, with CM as a sub-instance.

The IM page's pain points (missing metadata, undefined dictionaries, absent lifecycle workflows, access obsolescence) are systematic forward-pulverization at the IM-engagement rung; the longitudinal-preservation discipline is the substrate against which forward-pulverization operates. Cluster F gains both a forward-pulverization instance and the canonical longitudinal-pulverization anchor.

**Cluster E (institutional ground, Doc 571), three-carrier robustness clean.** ISO/IEC/IEEE 15288 + GEIA-STD-927B + DAMA-DMBOK is the cleanest three-carrier instance after SE-063 Measurement (PSM + GQM + ISO 15939). The three carriers are independent (international standard / industry-consortium standard / professional-body knowledge body); they articulate the same discipline. SE-039 §VII.5 three-carrier robustness sub-observation gains a third instance and is now load-bearing.

**Cluster B (multi-keeper composition, Doc 604), at the IM-engagement rung.** The IM engagement composes information owners, information consumers, information custodians (security/protection), and information disposers (end-of-life). The IM planner is the reconciliation rung; rule is coordination-by-rung. Cluster B gains another instance.

**Cluster D (co-production at sub-rungs, Doc 573), at the analytics rung.** "Analyze and transform data into reportable insights" is co-production between data-substrate (raw data) and analyst-keeper (analytical method). Decision-relevant information is jointly authored; insight is not a substrate-given. Cluster D gains an analytics-specific instance.

**Cluster H (hypostatic boundary, Doc 372).** "Information" vs. "data" distinction in the IM page brushes ontological territory but stays functional: information is data plus context for decisions. SEBoK's voice keeps the framing operational; Doc 372 holds.

## IV. Tier-Tags

- IM definition (SEBoK paraphrase of ISO/IEC/IEEE 15288) — π / α.
- ISO 15288 eight-verb IM process — π / α as cited; μ / β under Doc 572 Appendix D at information-handling-aspect rung.
- Prepare/Perform partition — π / α as cited; μ / β under Doc 572 Appendix D at IM-activity rung.
- Five pain points — π / α as cited; μ / β under Doc 445 Refinement C forward-pulverization.
- Lifecycle preservation theme — π / α; μ / β under candidate Doc 445 Refinement D longitudinal-pulverization (canonical anchor).
- Three-carrier robustness (ISO 15288 + GEIA-STD-927B + DAMA-DMBOK) — μ / β under Doc 571 §X.5 three-carrier sub-observation.

## V. Residuals

**Longitudinal-pulverization Refinement D anchor candidate.** Per SE-039 §VII.5 the candidate surfaced at Configuration Management; this article is structurally a stronger anchor (CM is a special case of IM). When Refinement D is formalized, the canonical worked example should be Information Management, with Configuration Management as the sub-instance. The relationship: IM preserves the substrate; CM preserves a specific sub-substrate (configuration items) within IM's general discipline.

**Analytics-as-co-production residual.** The IM page treats analytics functionally (transform data into reportable insights). A dedicated analytics article would likely densify Cluster D significantly. The non-existence of a standalone *Data Analytics* page is another Cluster E migration signal.

## VI. Provisional Refinements

**Refinement D anchor reassignment.** The longitudinal-pulverization Refinement D candidate (SE-039 §VII.5, surfaced at Configuration Management) should anchor at Information Management. Configuration Management is the sub-substrate-preservation case; Information Management is the general substrate-preservation case. The Refinement D formalization in Doc 445 should name Information Management as canonical and CM as instance.

**Three-carrier robustness sub-observation now load-bearing.** Three independent SEBoK pages exhibit three-carrier institutional ground (SE-063 Measurement, SE-112 System Security, SE-114 Information Management). The pattern is robust enough for explicit Doc 571 §X.5 sub-formalization.

**Two co-located Cluster A lattices recurring pattern.** SE-112 System Security and SE-114 Information Management both exhibit two co-located Cluster A lattices at distinct rungs. This is becoming a recurring SEBoK editorial pattern (rich pages exhibit nested lattices). Cluster A synthesis should treat the multi-rung-lattice case as a first-class structural type.

## VII. Cross-Links

**Form documents.** Doc 572 Appendix D (universal-sibling, two co-located lattices), Doc 445 (pulverization, longitudinal-direction Refinement D anchor candidate), Doc 571 §X.5 (three-carrier robustness), Doc 604 (multi-keeper composition), Doc 573 (co-production, analytics).

**Part-level reformulation.** SE-006 (Part 3 SE and Management).

**Related distillations.** SE-063 (Measurement, three-carrier precedent). Configuration Management distillation (longitudinal-pulverization first surfacing, per SE-039 §VII.5; this article supersedes as canonical anchor). SE-112 (System Security, two co-located lattices precedent).

**Adjacent SEBoK concepts** (per source). *Configuration Management*, *Quality Management*, *Requirements Management*, *Decision Management*.

**Methodology refinement candidates.** Refinement D anchor at IM, with CM as instance. Three-carrier sub-formalization in Doc 571 §X.5. Multi-rung-lattice as first-class Cluster A type.

---

## Appendix: Originating Prompt

> *"Apply refinements; report back for next 40"* / *"Continue"*

(SE-114 is one of the third-batch SEBoK distillations. Batch 5/5. Source is Information Management; longitudinal-pulverization Refinement D candidate anchors here, displacing Configuration Management as canonical instance.)
