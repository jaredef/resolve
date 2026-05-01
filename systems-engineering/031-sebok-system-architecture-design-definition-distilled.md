# SEBoK *System Architecture Design Definition*, Distilled

**Top-20 distillation #13. *System Architecture Design Definition* is the SEBoK page where Doc 572 lattice composition meets the SE design discipline most directly. The "multiple views of the system design features" pattern (per ISO/IEC/IEEE 42010) is canonical lattice composition: each view is a Form-layer constraint binding the same Pattern-layer instance through a different aspect. The five sequential activities (project overview → requirements → functional → logical → physical) are pin-art at the architecture rung. The Authoritative Source of Truth (ASoT) claim is keeper-side connection structure (Doc 510). Five corpus forms compose; one residual on the digital ASoT claim that engages SE-028's Digital Engineering distillation.**

---

## I. Source

- **Page:** System Architecture Design Definition
- **URL:** https://sebokwiki.org/wiki/System_Architecture_Design_Definition
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-30

## II. Source Read

System architecture design definition establishes how "system behavior and structure characteristics in accordance with derived requirements" are defined to ensure "system elements operate together... to satisfy Stakeholder needs." Distinguished from detailed design: architecture defines logical (Platform Independent) and physical (Platform Specific) configuration items with allocated functions and interfaces; detailed design provides lower-level implementation specifics. Multiple views address stakeholder concerns per ISO/IEC/IEEE 42010. Five sequential activities: project overview → requirements definition → functional architecture → logical architecture → physical architecture. The digital system design model provides an Authoritative Source of Truth (ASoT) repository with traceability throughout hierarchical decomposition. Standards: ISO/IEC/IEEE 15288 (Architecture Definition process), ISO/IEC/IEEE 42010 (Architecture Description), OMG SysML v1.7/v2.

## III. Structural Read

**Form III (extension) — Lattice Extension of the Ladder (Doc 572), with Appendix D universal-sibling at the architecture rung.** "Multiple views of the system design features" per ISO/IEC/IEEE 42010 is canonical lattice composition. Each view (functional, logical, physical, behavioral, requirements-traceability, interface) is a Form-layer constraint binding the same Pattern-layer instance through a different aspect. This is structurally identical to SE-024's requirement-types case (Doc 572 Appendix D universal-sibling): all views apply universally to every architecture; the discriminator is aspect, not rung-of-application. ISO 42010 names the framework SEBoK applies; the corpus reads ISO 42010 as standardized lattice composition for architecture.

**Form IV — Pin-Art Model (Doc 270).** The five sequential activities (project overview → requirements → functional → logical → physical) are pin-art at progressive levels of specification. Each activity adds a pin-set; the substrate (the architecture in development) flows through; the result at each step is a more constrained shape. The progression from logical to physical is the canonical Platform-Independent → Platform-Specific transformation pattern.

**Form III — Substrate-and-Keeper Composition (Doc 510).** The ASoT (Authoritative Source of Truth) repository is keeper-supplied connection structure at maximum density. Doc 510's apparatus reads the ASoT as the keeper's discipline of maintaining one canonical artifact set against which the substrate's outputs are reconciled. Without an ASoT, traceability degrades and the substrate-keeper composition breaks at the artifact-coordination rung. Doc 530's affordance gap holds: the substrate (the engineering team) cannot author canonical-artifact-coordination structure from its own engineering work; the keeper (the SE process, the configuration management discipline, the model-based tooling) supplies it.

**Form XI — Co-Production at Sub-Rungs (Doc 573).** "Multiple views... to address each stakeholder's viewpoint and concerns" is co-production at the views rung. Each stakeholder co-produces the view appropriate to their concern with the SE keeper; the views together compose the architecture description. Doc 573's apparatus reads each view as a co-produced artifact between a specific stakeholder class and the SE keeper.

**Form VII — Novelty Calculus (Doc 490), with strategy-import drift confirmation.** The page's reference to digital ASoT echoes SE-028's Digital Engineering distillation. The "Authoritative Source of Truth" framing carries some of the same anticipatory-voice import from MBSE / digital-engineering sources; tier-tag discipline reads "ASoT digital repository" as μ for established-MBSE practice and θ for the broader digital-thread aspirational claim. The page's voice is more careful than SE-028's because the ASoT is a concrete repository rather than a strategic vision.

## IV. Tier-Tags

- Architecture-vs-detailed-design distinction (logical PIM / physical PSM) — π / α (well-cited; ISO 42010, SysML).
- Multiple views per ISO 42010 — π / α as cited; μ / β under corpus when read as Doc 572 Appendix D universal-sibling lattice at the architecture rung.
- Five sequential activities (overview → requirements → functional → logical → physical) — π / α; μ / β under corpus when read as Doc 270 progressive pin-art.
- ASoT digital repository with traceability — μ / β under corpus (a substantial keeper-side claim with partial empirical support; SEBoK presents at π).
- Requirements traceable to stakeholder needs throughout hierarchical decomposition — π / α.

## V. Residuals

The "ASoT digital repository" claim shares the strategy-import drift pattern SE-028 named for Digital Engineering. The corpus reads the ASoT as a structural claim about keeper-side artifact coordination (which composes under Doc 510) but with an anticipatory tier on its full operational realization (which echoes the digital-thread promise from SE-028). Logged as a tier-tag residual rather than a structural residual; Doc 490's discipline of explicit warrant tagging applies.

The page's "model-based approach" framing is consistent with SE-028's MBSE-as-DE-subset claim; the two pages compose naturally as views of the same evolving methodology.

## VI. Provisional Refinements

No new refinement candidates unique to this distillation. The page provides confirmation of:

- Doc 572 Appendix D universal-sibling lattice (architecture views as the empirical instance).
- Doc 510 keeper-supplied connection structure (ASoT as the densest case).
- Doc 270 progressive pin-art (the five sequential activities).
- Doc 573 stakeholder-view co-production.

The form's apparatus is operative across the page without strain.

## VII. Cross-Links

**Form documents.** Doc 572 (Lattice Extension, with Appendix D universal-sibling), Doc 270 (Pin-Art), Doc 510 (Substrate-and-Keeper), Doc 573 (Co-Production), Doc 490 (Novelty Calculus).

**Part-level reformulation.** SE-006 (Part 3 — SE & Management).

**Related distillations.** SE-024 (System Requirements Definition — predecessor process; requirement types as the universal-sibling worked example). SE-028 (Digital Engineering — ASoT shares the digital-thread strategy-import). SE-032 (System Integration — successor in the realization chain).

**Adjacent SEBoK concepts** (per source). *System Requirements Definition*, *System Detailed Design Definition*, *Functional Architecture*, *Logical Architecture*, *Physical Architecture*.

---

## Appendix: Originating Prompt

> *"Continue with next 10"*

(SE-031 is the thirteenth of twenty. *System Architecture Design Definition* was selected as the canonical operational instance of Doc 572 Appendix D universal-sibling lattice at the SE architecture rung. The structural reformulation finds the page composes cleanly with one tier-tag residual on the ASoT claim.)
