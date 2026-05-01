# SEBoK *Requirements Baseline (Functional Baseline)*, Distilled

**Next-40 distillation, batch 5/5. SEBoK has no standalone "Requirements Baseline" page; the requirements baseline is treated under *Configuration Baselines* as the Functional Baseline (FBL): "the approved originating set of performance requirements for the system (functional, interoperability, and interface characteristics) and the verification required to demonstrate the achievement of those specified characteristics." The FBL is canonical pin-art (Doc 270) — a formally fixed snapshot at a milestone gate that constrains all downstream substrate flow. The triplet FBL/ABL/PBL (functional / allocated / product baselines) is universal-sibling lattice (Doc 572 Appendix D) at the configuration-baseline rung; the discriminator is lifecycle-stage-of-formal-fix. SAE-EIA 649C is institutional-ground (Doc 571). The "approved" qualifier is keeper-side authority (Doc 510): the substrate produces the candidate baseline, the keeper-side approval converts it to authoritative reference.**

---

## I. Source

- **Page:** Configuration Baselines (the SEBoK page where the requirements/functional baseline is articulated; no standalone Requirements_Baseline page exists)
- **URL:** https://sebokwiki.org/wiki/Configuration_Baselines
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-30

## II. Source Read

The Functional Baseline (FBL) is "the approved originating set of performance requirements for the system (functional, interoperability, and interface characteristics) and the verification required to demonstrate the achievement of those specified characteristics." Contents: functional requirements, interoperability specifications, interface characteristics, verification requirements. Lifecycle role: established early in system development; foundational reference point for subsequent design phases. Associated documentation: Functional Configuration Documentation (FCD) evolves through lifecycle stages. Related to Allocated Baseline (ABL) and Product Baseline (PBL) per SAE-EIA 649C standards. All baselines are "formally approved snapshots at specific development points" serving as "immutable reference points for change control." Position: Part 3 SE and Management > Technical Management Processes > between Configuration Management and Configuration Management Implementation.

## III. Structural Read

**Cluster A — Universal-sibling lattice (Doc 572 Appendix D).** The FBL/ABL/PBL triplet is universal-sibling lattice at the configuration-baseline rung. Each baseline binds every engineered system universally; the discriminator is the lifecycle-stage-of-formal-fix (functional at concept, allocated at architecture, product at realization), not whether the baseline applies. The triplet is the simplest A-cluster instance observed (n=3); its compactness makes it a clean teaching-example.

**Cluster I — Pin-art / temporal-concurrency (Doc 270 / Doc 572 Appendix C).** The FBL is canonical pin-art at the requirements rung: the formal fix at the milestone is the pin-set into which all downstream substrate flow is pressed. Each baseline is one pin-set; the FBL/ABL/PBL progression is the temporal sequence of pin-sets that record the engineering discipline's accumulated shape. The progressive-pin-art pattern (Doc 270 + SE-031) applies cleanly.

**Form III — Substrate-and-Keeper Composition (Doc 510).** "Approved" is the keeper-side qualifier that converts substrate-produced candidate content into authoritative reference. The substrate (engineering team, requirements analysts) produces the candidate set; the keeper-side configuration board approves; only after approval does the set become a baseline. Doc 510's apparatus reads the baseline as a co-produced artifact (Doc 573) where the rung-2 keeper supply is the formal authority granting the immutable status.

**Cluster E — Institutional ground (Doc 571).** SAE-EIA 649C is the institutional-ground carrier for the FBL/ABL/PBL configuration discipline. The standard is the organization-component (formal authority); the configuration management practice tradition is the enterprise-component. Section X.5 applies.

**Form VI — Pulverization (Doc 445), with verification linkage.** "The verification required to demonstrate the achievement of those specified characteristics" is built into the FBL itself. The FBL carries its own falsification surface — the verification specification — which is canonical paired V&V (SE-029 verification anchor of the paired pulverization). The corpus's pulverization apparatus reads the FBL as a baseline that pre-commits to its own pulverization regime.

## IV. Tier-Tags

- FBL definition (SAE-EIA 649C, SEBoK Configuration Baselines page) — π / α.
- FBL/ABL/PBL triplet — π / α as cited; μ / β under corpus when read as Doc 572 Appendix D universal-sibling at configuration-baseline rung.
- "Formally approved snapshot" framing — π / α; substrate-keeper composition reading under Doc 510.
- "Verification required to demonstrate achievement" — π / α; paired-V&V reading under SE-029.
- SAE-EIA 649C — π / α; institutional-ground codification under Doc 571.

## V. Residuals

**R1 (catalog).** SEBoK has no standalone Requirements Baseline page; the requirements baseline is folded into Configuration Baselines as the FBL. The catalog-level residual is a vocabulary one: practitioner usage often says "requirements baseline" where SEBoK's normalized vocabulary says "functional baseline." The corpus accepts the SEBoK normalization but notes the synonym for cross-reference.

## VI. Provisional Refinements

**Doc 572 Appendix D minimal-instance teaching-example.** The FBL/ABL/PBL triplet is the smallest universal-sibling lattice observed in SEBoK (n=3). Its compactness makes it ideal as the introductory teaching-example for Appendix D when explaining the lattice form. Three peer-axes, each binding universally, discriminator-by-lifecycle-stage. Worth Doc 572 Appendix D documenting as the canonical minimal-instance.

## VII. Cross-Links

**Form documents.** Doc 572 (Lattice Extension, Appendix D minimal-instance), Doc 270 (Pin-Art), Doc 510 (Substrate-and-Keeper), Doc 573 (Co-Production), Doc 571 (Institutional Ground), Doc 445 / SE-029 (Pulverization with paired V&V).

**Part-level reformulation.** SE-006 (Part 3 — SE and Management).

**Related distillations.** SE-075 (Architectural Baseline / ABL — sibling). SE-076 (Product Baseline / PBL — sibling). SE-078 (System Requirements Definition — the substrate process producing the FBL candidate). SE-024 (Types of System Requirements — A-cluster sibling at the requirement rung).

**Adjacent SEBoK concepts.** *Configuration Management*, *Configuration Management Implementation*, *Requirements Management*, *System Requirements Definition*.

---

## Appendix: Originating Prompt

> *"Let's do the next 40 most likely articles to be most load bearing... my conjecture is that this will inform the next 40."* / *"It's ok to duplicate entries. It shows where the knowledge base folds back in on itself. Continue fanning out"*

(SE-074 is one of the next-40 SEBoK distillations. Batch 5/5.)
