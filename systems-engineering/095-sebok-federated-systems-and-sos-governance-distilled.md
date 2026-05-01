# SEBoK *Federated Systems and Systems of Systems Governance*, Distilled

**Next-40 distillation #53 (Batch 2/5 in the third-batch sweep). *Federated Systems and SoS Governance* has no dedicated SEBoK article; the governance topic is woven through *Systems of Systems (SoS)* (lead Mike Henshaw, Judith Dahmann; Part 4) and surfaces in *The Influence of Project Structure and Governance on SE-PM Relationships* and *Enterprise Systems Engineering*. The four Maier/Dahmann SoS types (directed, acknowledged, collaborative, virtual) form a universal-sibling lattice along the governance-authority axis, ranging from central authority to emergent-only behavior. The seven SoS pain points (with SoS authorities and leadership at the head) are explicit Doc 574 handoff-mode evacuation: governance authority does not transfer cleanly across the constituent-system boundary. The "voluntary cooperation" and "influence and incentives rather than structured control" formulations are precisely the institutional-ground structure that the corpus reads as enterprise-component (Doc 571 §X.5) writ large; SoS governance is enterprise-component-only with no organization-component to fall back on. The virtual SoS case is canonical emergent-only structure (Doc 604). Six forms bind, with handoff-mode evacuation and emergent-only as the load-bearing reads.**

---

## I. Source

- **Page:** Federated Systems and SoS Governance (no dedicated article); treated under Systems of Systems (SoS)
- **URL:** https://sebokwiki.org/wiki/Systems_of_Systems_(SoS)
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-30

## II. Source Read

ISO/IEC/IEEE 21839 defines SoS as a "set of systems or system elements that interact to provide a unique capability that none of the constituent systems can accomplish on its own." Maier (1998) names five characteristics, with operational and managerial independence as the two principal distinguishing features. Four SoS types based on governance and constituent autonomy. *Directed*: central management subordinates component systems to fulfill specific purposes. *Acknowledged*: recognized objectives with designated SoS management, but constituent systems retain independent ownership and funding. *Collaborative*: component systems voluntarily work together with collective decision-making on service provision. *Virtual*: no central authority or agreed-upon purpose; large-scale behavior emerges through relatively invisible mechanisms. Seven critical pain points: (1) SoS authorities (absence of single authority); (2) leadership (requires influence and incentives rather than structured control); (3) constituent systems' perspectives (legacy systems may have limited SoS compatibility); (4) capabilities and requirements misalignment; (5) autonomy, interdependencies, and emergence (independent evolution creates unpredictable behavior); (6) testing, validation, and learning (asynchronous development cycles); (7) SoS principles (limited frameworks for extending systems thinking). Lead authors: Mike Henshaw, Judith Dahmann. Position: Part 4 → Applications of SE.

## III. Structural Read

**Form XII — Handoff-Mode Evacuation (Doc 574), as one load-bearing read.** SoS authorities is canonical Doc 574: governance authority cannot transfer cleanly across the constituent-system boundary. Each constituent system has its own keeper, its own substrate, its own institutional ground; the SoS-level engagement requires authority that no single keeper holds. SEBoK's "absence of single authority" framing is the handoff-mode evacuation pattern made explicit at the SoS rung. Sister to SE-090 disposal handoff-evacuation; the SoS case is the inverse cadence (continuous-without-handoff rather than terminal-handoff).

**Form III (extension) — Emergent-Only Structure (Doc 604), as the second load-bearing read, with the virtual SoS as canonical case.** The four SoS types form a ladder of decreasing authority structure: directed (full authority), acknowledged (partial authority), collaborative (negotiated authority), virtual (no authority, emergent only). The virtual SoS is canonical emergent-only: large-scale behavior arises without any keeper-side rule, without any reconciliation rung, without any explicit composition. This is the cleanest emergent-only instance the third batch surfaces, sister to but stronger than the dispersed-instrument pattern (which has implicit keepers; virtual SoS has no keeper at all).

**Form III — Lattice Extension (Doc 572 Appendix D), twenty-first instance.** The four SoS types are universal-sibling lattice along the governance-authority axis. Each type binds a distinct SoS instance universally; the discriminator is governance-authority structure, not SoS-rung-of-application. The four-element decomposition is the Cluster A twenty-first instance.

**Form X — Institutional Ground (Doc 571 §X.5), with SoS governance as enterprise-component-only.** SoS governance is structurally enterprise-component-only: there is no organization-component (no formal authority) to fall back on. The "influence and incentives rather than structured control" formulation is the enterprise-component made the only mode of governance. This is the inverse of CMMI (SE-093, organization-component-canonical): SoS governance has no organization-component because the SoS-level institutional ground does not exist as a formal locus. The Section X.5 distinction's two components are not equally present at every rung; SoS governance is the canonical asymmetric case.

**Form III — Substrate-and-Keeper Composition with Multi-Keeper (Doc 510 / Doc 604), tenth instance, with negotiation-by-priority rule canonical for collaborative SoS.** Each SoS composes multiple keepers (constituent system owners, SoS manager if any, end-user authorities, regulators). Doc 604's three composition rules map onto the four SoS types: directed = subordination-by-domain (SoS manager subordinates constituents); acknowledged = coordination-by-rung (SoS manager coordinates with independently-owned constituents); collaborative = negotiation-by-priority (constituents negotiate); virtual = no rule (emergent-only). This is the cleanest mapping of Doc 604's three rules to a single article's four-case decomposition; worth recording as a Doc 604 worked example.

**Form V — Hypostatic Boundary (Doc 372), at the SoS-versus-constituent boundary.** The SoS is not a system in the same sense its constituents are; the hypostatic boundary holds. SEBoK's "unique capability that none of the constituent systems can accomplish on its own" formulation is exactly the corpus's hypostatic-boundary at a different rung: the SoS-level capability is real without the SoS being a system in the constituent-system sense.

## IV. Tier-Tags

- SoS definition (ISO/IEC/IEEE 21839) — π / α.
- Maier (1998) five characteristics — π / α.
- Four SoS types (directed, acknowledged, collaborative, virtual) — π / α as cited; μ / β under corpus as Cluster A twenty-first.
- Seven pain points — π / α as cited; μ / β under corpus as Doc 574 handoff-mode evacuation at the SoS rung.
- "Influence and incentives rather than structured control" — π / α as cited; μ / β under corpus as Doc 571 §X.5 enterprise-component-only.
- Virtual SoS as emergent-only — π / α as cited; μ / β under corpus as Doc 604 emergent-only canonical case.

## V. Residuals

SEBoK's treatment of governance is woven into the SoS article rather than dedicated; the dedicated-article residual is the same dispersed-instrument pattern flagged at SE-088, SE-092, SE-094. Fourth dispersed-instrument instance.

Doc 604's three composition rules map onto only three of the four SoS types; the virtual case is emergent-only and falls outside Doc 604's named rules. The corpus reads this as a Doc 604 boundary condition rather than a residual; emergent-only is a structural sibling to the three rules, not a fourth rule.

## VI. Provisional Refinements

**Doc 604 worked example: SoS-types-as-composition-rule-instances.** The four SoS types map onto Doc 604's three rules plus the emergent-only sibling structure. This is the cleanest single-article instantiation of Doc 604 observed; worth recording as the canonical worked example.

**Doc 571 §X.5 asymmetric-component refinement.** The canonical X.5 case has both components present and inter-related. SoS governance is enterprise-component-only (no organization-component); CMMI is organization-component-canonical. The two components are not equally present at every rung; the §X.5 framework needs an asymmetric-component sub-structure to read these cases.**

**Dispersed-instrument cluster reaches fourth instance (WBS, lessons-learned, KM, SoS-governance). Cluster J (or successor) is well past three-instance synthesis threshold; cluster-formalization is overdue.**

**Doc 574 handoff-mode evacuation at the SoS rung as the continuous-without-handoff cadence. SE-090 surfaced three cadences (terminal, parallel, phased); SE-095 supplies a fourth: continuous-without-handoff (the handoff never occurs because the authority structure does not exist to do it). Worth recording as the fourth Doc 574 cadence.**

## VII. Cross-Links

**Form documents.** Doc 574 (Handoff-Mode Evacuation, fourth cadence: continuous-without-handoff), Doc 604 (Emergent-Only canonical case; three rules + emergent-only worked example), Doc 572 (Lattice Extension, Appendix D twenty-first), Doc 571 (Institutional Ground §X.5, asymmetric-component refinement), Doc 510 / Doc 604 (Multi-keeper composition, tenth instance), Doc 372 (Hypostatic Boundary, SoS-versus-constituent), SE-039 D7 (anchor-article inverse, fourth dispersed-instrument).

**Part-level reformulation.** SE-007 (Part 4 — Applications of SE).

**Related distillations.** SE-088 (WBS — first dispersed-instrument). SE-092 (Lessons Learned — second dispersed-instrument). SE-094 (KM — third dispersed-instrument). SE-090 (Decommissioning — sister Doc 574 cadence-instance).

**Adjacent SEBoK concepts** (per source). *Architecting Approaches for Systems of Systems*, *Systems Engineering for Systems of Systems*, *Enterprise Systems Engineering*, *The Influence of Project Structure and Governance*.

**Methodology refinement candidates.** Doc 604 SoS-types worked example; Doc 571 §X.5 asymmetric-component refinement; dispersed-instrument cluster formalization (four instances now); Doc 574 fourth cadence (continuous-without-handoff).

---

## Appendix: Originating Prompt

> *"Apply refinements; report back for next 40"* / *"Continue"*

(SE-095 is one of the third-batch SEBoK distillations. Batch 2/5.)
