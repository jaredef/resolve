# SEBoK *System Verification*, Distilled

**Top-10 distillation #7. *System Verification* is the SEBoK page that operationalizes pulverization (Doc 445) at engineering scale. The verification techniques (Inspection / Analysis / Analogy / Demonstration / Test / Sampling) are pulverization at six different rigor levels. The verification-vs-validation distinction maps cleanly onto Doc 445's pulverization-vs-falsification axis. "Verification operates as a transverse activity to every life cycle stage" is direct evidence that pulverization is a corpus form binding every life-cycle phase, not a discrete stage. Five corpus forms compose; no residuals against the apparatus. One provisional refinement candidate (Doc 445 worked example: V&V as paired pulverization with internal-coherence and external-correspondence anchors).**

---

## I. Source

- **Page:** System Verification
- **URL:** https://sebokwiki.org/wiki/System_Verification
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-30

## II. Source Read

Verification is "the confirmation, through the provision of objective evidence, that specified requirements have been fulfilled." The verification-vs-validation distinction: verification ensures "one has solved the problem right"; validation ensures "one is working the right problem." Verification is binary (compliant / non-compliant); validation may require value judgments. The process: planning (identify scope, constraints, techniques, schedule) → performance (detail actions, acquire resources, execute, record) → analysis & control (compare results, record status, generate reports, update plan). Six techniques: Inspection, Analysis, Analogy/Similarity, Demonstration, Test, Sampling. The page emphasizes that "verification is a generic term that needs to be instantiated within the context it occurs" and operates "as a transverse activity to every life cycle stage." Cited: ISO/IEC/IEEE 15288, INCOSE SEH v3.2.2, NASA SEH 2007.

## III. Structural Read

**Form VI — Pulverization (Doc 445).** Verification is pulverization at engineering scale. Doc 445 articulates pulverization as a verification regime by which a claim is reduced by an independent agent searching for residuals. SEBoK's verification process — independent comparison of realized characteristics against design references, with binary compliance reporting — IS Doc 445 in operational SE language. The six techniques are pulverization at six different rigor levels:

- **Inspection** — pulverization-by-direct-observation, lowest rigor.
- **Analysis** — pulverization-by-deduction, mathematical or logical.
- **Analogy/Similarity** — pulverization-by-pattern-transfer, depends on invariant context.
- **Demonstration** — pulverization-by-functional-exhibit, no quantification.
- **Test** — pulverization-by-controlled-measurement, highest rigor.
- **Sampling** — pulverization-by-statistical-coverage, when full population is infeasible.

Doc 445's apparatus reads SEBoK's six techniques as a calibrated rigor-set; engagement chooses based on the cost of failure and the cost of pulverization. This is empirical material for a Doc 445 worked example.

**Form VI extension — V&V as paired pulverization.** The verification-vs-validation distinction operationalizes a structural distinction the corpus has not explicitly named: pulverization has two anchor points, *internal coherence* (does the artifact match its own design references — verification) and *external correspondence* (does the artifact accomplish what was actually wanted — validation). Doc 445 articulates pulverization with the destructive-posture-constructive-result discipline; SEBoK's V&V split is empirical evidence that pulverization needs two parallel pulverizers anchored at different reference points. Provisional refinement candidate.

**Form III (extension) — Lattice Extension of the Ladder (Doc 572).** "Verification operates as a transverse activity to every life cycle stage" and "in parallel with system definition and system realization processes" — this is direct evidence for the lattice extension at the rung-cross-cut. Verification is not a single-stage activity (chain-bound); it binds every Pattern-layer instance simultaneously across the engagement. Doc 572's lattice structure handles this naturally: verification is a Form-layer constraint that sibling-binds every life-cycle stage.

**Form IV — Pin-Art Model (Doc 270).** Verification matrices ("the verification action, submitted element, applied technique, step of execution, system block concerned, expected result, obtained result") are pin-art applied to the verification activity itself. Each verification action is a pin; the matrix is the pin-set; the substrate (the engineered system under verification) flows through, and pulverization residuals are the result. The recursive shape — pin-art applied to pin-art's verification — is consistent with Doc 270's discipline of applying pin-art to whatever needs structured constraint.

**Form III — Substrate-and-Keeper Composition (Doc 510).** The verification activity is keeper-side discipline (the SE process supplies the verification framework, the standards bodies supply the techniques, the project authority supplies the verification plan); the substrate produces the verification execution and results. Doc 530's affordance gap: the substrate cannot author its own verification framework from its engineering work; the keeper supplies it.

## IV. Tier-Tags

- "Verification is the confirmation, through the provision of objective evidence, that specified requirements have been fulfilled" — π / α (foundational; warranted by 15288).
- The verification-vs-validation distinction ("solved the problem right" vs "working the right problem") — π / α as cited; μ / β under corpus when read as paired pulverization with two anchor points.
- The six techniques (Inspection / Analysis / Analogy / Demonstration / Test / Sampling) — π / α.
- "Verification is a generic term that needs to be instantiated within the context it occurs" — π / α; the structural reformulation reads this as Doc 445's general form vs. Doc 445's per-application instantiation discipline.
- "Verification operates as a transverse activity to every life cycle stage" — μ / β under corpus when read as Doc 572 lattice cross-cut; SEBoK presents at π as practice observation.
- "Integration, verification, and validation are intimately processed together" — π / α.

## V. Residuals

No residuals against the apparatus. The page composes cleanly under existing forms with one provisional refinement candidate.

## VI. Provisional Refinements

**Doc 445 worked example: paired pulverization with internal-coherence and external-correspondence anchors.** Doc 445 articulates pulverization as a verification regime; the V&V split in SE practice operationalizes pulverization with two parallel anchor points. Verification anchors at internal coherence (does the artifact match its own design references); validation anchors at external correspondence (does the artifact accomplish what was actually wanted). Both are pulverization; both produce residuals; the residuals are differently meaningful (a verification residual is a defect; a validation residual is a misaligned requirement). Doc 445 may benefit from a Section X.x or appendix articulating the paired pattern explicitly.

**Doc 445 worked example: six rigor levels.** SEBoK's six techniques are a calibrated rigor-set for pulverization. Doc 445 currently does not articulate a rigor calibration; the SE techniques provide an off-the-shelf calibration that other reformulation engagements can adopt. Worth documenting as a Doc 445 application-discipline addition.

## VII. Cross-Links

**Form documents.** Doc 445 (Pulverization), Doc 572 (Lattice Extension), Doc 270 (Pin-Art), Doc 510 (Substrate-and-Keeper), Doc 530 (Affordance Gap).

**Part-level reformulation.** SE-006 (Part 3 — SE & Management).

**Related distillations.** SE-024 (System Requirements Definition — V&V originates against requirements). SE-022 (Generic Life Cycle Model — V&V is a transverse activity). SE-017 Pilot B (Sequential Development / Vee Model — V&V is the right side of the V).

**Adjacent SEBoK concepts** (per source). *System Validation*, *System Integration*, *System Transition*, *System Realization*, *Quality Management*.

**Methodology refinement candidates.** Doc 445 worked example: paired pulverization (verification + validation). Doc 445 application-discipline addition: six rigor levels.

---

## Appendix: Originating Prompt

> *"Continue"*

(SE-025 is the seventh of ten. *System Verification* was selected as the canonical operational instance of pulverization (Doc 445) in the SE discipline. The structural reformulation finds zero residuals and produces two refinement candidates that strengthen Doc 445.)
