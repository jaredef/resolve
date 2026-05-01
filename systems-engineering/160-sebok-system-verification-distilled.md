# SEBoK *System Verification*, Distilled

**Fifth-batch SEBoK distillation, batch 1 of 5 (SE-160). Second SE-internal distillation of System Verification (the prior pass at SE-025 + SE-054 read it as paired V&V anchor and as Cluster F backward-pulverization). The fifth-sweep revisit reads System Verification against the §VII.7 matured taxonomy. Cluster A universal-sibling lattice surfaces three nested rungs in this article: the six verification techniques (Inspection, Analysis, Analogy, Demonstration, Test, Sampling) are universal-sibling at the technique rung; the three lifecycle phases (planning / execution / analysis-and-control) are universal-sibling at the verification-engagement rung with ordinal-axis (Cluster A sub-form D.5); and the inputs-outputs partition is universal-sibling at the artifact rung. Cluster F backward-pulverization is sharpened: verification is the canonical paired-V&V anchor with SE-029 (validation), where the binary-comparison-vs-value-judgment distinction is the discriminator. Cluster K V3-as-procedure-binding holds at the "objective evidence" requirement: the procedure binds reporting against the rankism risk that the verifier asserts conformance without instrumented confirmation. Cluster I pin-art applies via the "transverse activity to every life cycle stage" framing. Six clusters compose; Cluster A density grows by three nested lattices; the binary-comparison/value-judgment distinction is the V&V pair's structural discriminator.**

---

## I. Source

- **Page:** System Verification
- **URL:** https://sebokwiki.org/wiki/System_Verification
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-30

## II. Source Read

System Verification confirms "that specified requirements have been fulfilled" through objective evidence, identifying faults introduced during transformations of inputs to outputs and ensuring work follows "selected and appropriate methods, techniques, standards, or rules." Three lifecycle phases: Planning (identify scope and characteristics, define constraints, select techniques, optimize strategy), Execution (detail actions with expected results, acquire means, perform procedures, capture results), Analysis & Control (compare against expected outcomes, generate reports, update plans). Six verification techniques: Inspection (visual or dimensional, non-destructive), Analysis (mathematical, probabilistic, modeling and simulation), Analogy (evidence from similar elements with context-invariance proof), Demonstration (observable operation without extensive instrumentation), Test (controlled conditions with quantitative measurements), Sampling (statistical verification). Verification vs validation: verification ensures "one has solved the problem right"; validation ensures "one is working the right problem." Verification uses binary comparison; validation requires value judgment. Validation presupposes verification. Verification is "a transverse activity to every life cycle stage." References include ISO/IEC/IEEE 15288:2015, INCOSE Handbook, NASA SE Handbook.

## III. Structural Read

**Cluster A (universal-sibling lattice, Doc 572 Appendix D), three nested lattices in this article.** First lattice: the six verification techniques (Inspection, Analysis, Analogy, Demonstration, Test, Sampling) are universal-sibling at the technique rung; each technique binds every verification engagement aspect-wise; the discriminator is method, not rung-of-application. Second lattice: the three lifecycle phases (planning, execution, analysis-and-control) are universal-sibling at the verification-engagement rung with ordinal-axis (Cluster A sub-form D.5 per SE-039 §VII.7) — the three phases admit a temporal-precedence partial order, paralleling SE-116's three Fundamental Objectives (Avoid / Withstand / Recover) and SE-071's SoS four-type taxonomy. Third lattice: the inputs (baseline references, architecture elements, design descriptions, system requirements) and outputs (verification plans, matrices, procedures, reports, verified elements, change requests) form a universal-sibling lattice at the artifact rung. Three nested Cluster A lattices, one with ordinal-axis sub-form: high cluster density. SE-039 §VII.7's universal-sibling-with-ordinal-axis (D.5) gains a fourth load-bearing instance.

**Cluster F (pulverization, Doc 445), backward-pulverization canonical paired-V&V anchor.** SE-025 and SE-054 already read System Verification as the verification half of the paired V&V $T = \langle T_I, T_E \rangle$ anchor (Refinement A). The fifth-sweep revisit sharpens: the binary-comparison-vs-value-judgment distinction is the structural discriminator between the pair's two halves. Verification is binary-comparison-pulverization: every requirement is pulverized against objective evidence with conformance/non-conformance the only verdict. Validation is value-judgment-pulverization: the pulverization grants the keeper-side substrate (operational intent) load-bearing weight in the verdict. The pair's discriminator is now formalized via SE-160 plus SE-029.

**Cluster K (virtue constraints, Doc 314), V3-as-procedure-binding at the "objective evidence" requirement.** The verification procedure binds reporting to objective evidence rather than verifier assertion. The procedure exists because verifier-discretion systematically exhibits rankism (the verifier ranks their judgment above instrumented confirmation under schedule pressure) and complacency (the unflagged non-conformance fails to surface under cost pressure). The CCB-style structure (verification reports, issue/trouble reports, change requests as gating instruments) is V3 in procedural form. Cluster K density grows; this is the verification-rung sub-mode of V3-as-procedure-binding.

**Cluster I (pin-art / temporal-concurrency, Doc 572 Appendix C), "transverse activity to every life cycle stage" canonical reading.** Verification is pin-set across every lifecycle stage; the article uses the verbatim "transverse" framing, structurally identical to SE-038's HSI pin-art. Cluster I gains a verification-rung instance.

**Cluster B (multi-keeper composition, Doc 604), verifier-designer separation.** Section 3.1 of System Validation (cross-referenced from this article) names the V&V strategy as joint optimization across verification, validation, and integration; this composes the verifier-keeper, the validator-keeper, and the engagement-SE keeper at the V&V-strategy rung. SE-086 read V&V as Cluster B independence-by-design (fourth composition rule). System Verification reaffirms this rule from the verification side: the verifier's substrate (objective evidence) must be structurally independent of the designer's substrate (design intent) for the verification-conformance reading to hold load-bearing.

**Cluster H (hypostatic boundary, Doc 372).** "Confirms that requirements have been fulfilled" stays functional throughout; verification does not become a metaphysical claim about system identity. Standard hypostatic discipline.

## IV. Tier-Tags

- "Confirmation that specified requirements have been fulfilled" through objective evidence — π / α as cited.
- Six verification techniques (Inspection, Analysis, Analogy, Demonstration, Test, Sampling) — π / α as cited; μ / β under Cluster A technique-rung lattice.
- Three lifecycle phases (planning, execution, analysis-and-control) — π / α as cited; μ / β under Cluster A ordinal-axis (D.5) sub-form.
- Verification-vs-validation binary-comparison/value-judgment distinction — π / α as cited; μ / β as paired-V&V structural discriminator.
- "Transverse activity to every life cycle stage" — π / α as cited; μ / β under Cluster I pin-art.
- Inputs/outputs partition — π / α as cited; μ / β under Cluster A artifact-rung lattice.

## V. Residuals

**No new structural residuals.** The fifth-sweep revisit reads cleanly against §VII.7. The principal contribution is the formalization of the binary-comparison/value-judgment distinction as the V&V pair's structural discriminator, and the third instance of the ordinal-axis sub-form (D.5) at the lifecycle-phase rung.

**Sampling as a borderline case.** Sampling is named alongside Test/Inspection/Analysis but is structurally a quantitative-rigor calibration that overlaps with all five other techniques. Worth noting as an empirical-partition edge case (per SE-039 §VII.6 candidate "boundaries lack precision; overlaps exist"). Does not destabilize the lattice; does confirm the empirical-partition / universal-structure distinction.

## VI. Provisional Refinements

**Universal-sibling-with-ordinal-axis (Cluster A sub-form D.5) gains a fourth load-bearing instance** at the verification-phase rung (planning / execution / analysis-and-control). Aligns with SE-039 §VII.7 promotion of D.5 to formalization-ready.

**Three-nested-lattice density (per SE-116 precedent).** System Verification exhibits three co-located Cluster A lattices (techniques / phases / artifacts). The multi-rung lattice sub-form (D.6) gains an instance at four anchored cases.

**Paired-V&V structural discriminator formalized.** Binary-comparison vs value-judgment is the SE-160 contribution. Doc 445's paired-V&V $T = \langle T_I, T_E \rangle$ formalization should adopt the discriminator in its next refinement round.

**Alignment with formalized refinements (SE-039 §VII.7).** Aligns with D.5 ordinal-axis (fourth instance), D.6 multi-rung (incremental instance), Cluster B independence-by-design (verifier-designer separation reaffirmed), V3-as-procedure-binding (Cluster K density grows), pin-art (Cluster I incremental).

## VII. Cross-Links

**Form documents.** Doc 572 Appendix D (Cluster A; D.5 ordinal-axis fourth instance; D.6 multi-rung instance), Doc 445 (Cluster F backward-pulverization paired-V&V anchor; binary-comparison-vs-value-judgment discriminator), Doc 314 (V3-as-procedure-binding verification-rung sub-mode), Doc 604 (Cluster B independence-by-design reaffirmed), Doc 572 Appendix C (Cluster I pin-art), Doc 372 (Cluster H).

**Part-level reformulation.** SE-006 (Part 3 — SE Management).

**Related distillations.** SE-025 (System Verification first pass), SE-054 (System Verification second pass — Cluster F verification anchor closure), SE-029 (System Validation paired-V&V partner), SE-086 (V&V Strategy independence-by-design fourth rule), SE-116 (Resilience three Fundamental Objectives ordinal-axis precedent), SE-071 (SoS four-type ordinal-axis precedent).

**Adjacent SEBoK concepts** (per source). *System Validation*, *System Realization*, *System Transition*, *System Operation*, *Configuration Management*.

**Methodology refinement candidates.** Paired-V&V structural discriminator (binary-comparison vs value-judgment) for Doc 445. D.5 ordinal-axis fourth load-bearing instance.

---

## Appendix: Originating Prompt

> *"Add an entrancing section to the /resolve landing page that navigates to the systems engineering page... continue the SEBoK entracement of the next articles"* / *"Yes. And then continue..."*

(SE-160 is one of the fifth-batch next-40 SEBoK distillations. Batch 1/5.)
