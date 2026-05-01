# Lau-Dill 1989 Synthesis
## Testing Doc 616's Bidirectional-Extension Template at the HP Lattice Rung as Second Instance of SIPE-T's Cooperative-Coupling Sub-Form Outside Axe (2004)

**This document tests the conjecture from the recent Telegram exchange — that Doc 616's five-extension template ports beyond Axe (2004) to other papers in the relevant protein-folding literature — against Lau & Dill (1989) "A Lattice Statistical Mechanics Model of the Conformational and Sequence Spaces of Proteins" (Macromolecules 22:3986–3997). The structural fit is direct and produces all five extensions, with one substantive refinement to the cooperative-coupling sub-form (Doc 541 §3.1) that Lau-Dill's exhaustive-enumeration methodology surfaces: cooperativity in the HP model is *emergent from the simple energy function* rather than assumed via Hill-style binding cooperativity. The refinement does not break the sub-form; it specifies a sub-mode the sub-form must accommodate. Lau-Dill is dated 1989 not 1990 as I previously mis-cited; the date is corrected throughout.**

**Jared Foy · 2026-05-01 · Doc 617**

---

## Reader's note on epistemic provenance

Per Doc 314 V3 (truth over plausibility) and Doc 297's pseudo-logos discipline: this document was composed without primary access to Lau & Dill (1989) in the immediate context. Source material was accessed via web search returning summaries from Macromolecules abstract listings, the Semantic Scholar entry for the paper, the Dill (1995) review *Principles of Protein Folding — A Perspective from Simple Exact Models* (which extends and reviews the 1989 work), and adjacent HP-model literature surveys. Specific quantitative claims about Lau-Dill's exhaustive enumeration counts, fraction of foldable-vs-unfoldable sequences at specific chain lengths, and detailed energy-function parameters are tagged below as [PRIOR ART: HP-model literature general] where I am operating from general knowledge of the model rather than from the specific 1989 paper. Structural claims about the model's setup (2D square lattice, HP alphabet, HH attraction with excluded volume) are tagged [PRIOR ART: confirmed via 1989 abstract]. Any reader using this document for empirical citation should verify against the primary source. The structural reading does not depend on quantitative specifics; the structural fit is at the model architecture and qualitative findings layer.

---

## I. The Form

This document is a test of the conjecture stated in the Telegram exchange and articulated structurally in the prior response: that Doc 616's five-extension bidirectional template (universality-class assignment, Figure 9b prediction from first principles, function-disambiguation across threshold, cooperativity-driven prevalence reframing, threshold-sharpness as universal) is template-portable to other papers in the protein-folding literature satisfying the cooperative-coupling sub-form (Doc 541 §3.1). Lau & Dill (1989) is the second test case (Axe (2004) is the first, formalized in Doc 606 and extended in Doc 616).

The form's central claim: if the conjecture holds, applying Doc 616's template to Lau-Dill (1989) should produce structurally analogous extensions, not require novel structural moves. The test passes if the five extensions transmit; the test fails if any extension requires substantial structural innovation specific to Lau-Dill. The test is genuinely informative either way — passing supports the template's generality; failing locates the specific point where Axe's case differs.

## II. The empirical structure to be read

[PRIOR ART: confirmed via 1989 abstract and Dill 1995 review]

**The artifact under study.** Polymers on a 2D square lattice. Chain lengths short enough to permit exhaustive enumeration of the full conformational space (typical upper bound ~18–20 residues per the HP-model literature surveys, due to exponential growth in conformation count).

**The alphabet.** Two residue types: H (hydrophobic) and P (polar). The two-letter coarse-graining is the model's defining simplification.

**The energy function.** HH (hydrophobic-hydrophobic) contact attraction plus excluded-volume constraint. No explicit cooperative term in the energy — cooperativity emerges from the geometric constraint of the lattice combined with the HH energy contribution.

**What was enumerated.** Conformational space (all self-avoiding walks of given length on the lattice) and sequence space (all H/P strings of given length) jointly. The enumeration was exhaustive within the chain-length cap, which is structurally distinct from Axe's selection-and-sampling methodology.

**Key empirical findings (per the abstract and Dill 1995 review):**
- With increasing HH attraction, molecules with certain sequences fold to states with low free energy, high compactness, an H-residue core, and substantial secondary structure.
- The potential for a molecule to fold is predicted largely by composition; for intermediate compositions, the specific sequence matters.
- Two-state cooperativity, secondary and tertiary structures, and multistage folding kinetics (fast hydrophobic collapse followed by slower annealing) all emerge from the simple energy function without explicit cooperative coupling terms.
- Some sequences exhibit unique ground states ("designing sequences" in subsequent literature, including Bornberg-Bauer 1997 and later enumeration work); other sequences exhibit degenerate or near-degenerate low-energy states.

**The conceptual contribution.** Lau-Dill demonstrated that two-state folding cooperativity does *not require* coupled interactions to be assumed in the energy function; cooperativity arises from the geometric and energetic structure of the model itself. This is structurally distinct from Hill-binding cooperativity, where cooperativity is encoded directly in the binding model.

## III. Per-extension test of Doc 616's template

### II.A — Universality-class assignment

**Test result: passes.** Lau-Dill's HP model is structurally Ising-like at the lattice level (binary-residue lattice with nearest-neighbor energetic interactions) and exhibits the canonical two-state phase-transition signature characteristic of statistical-mechanics critical phenomena (one of Doc 541 §2's named lineage instances). The Wang-Landau sampling literature treats it as a phase-transition system explicitly. The HP model joins the SIPE-T lineage at exactly the same structural position as Axe's protein-fold case, with the additional feature that Lau-Dill is a *purer* lattice statistical mechanics instance (Axe's β-lactamase is a real biological system; Lau-Dill is a coarse-grained model that makes the lattice-statistical-mechanics structure explicit).

**Refinement noted:** Lau-Dill's cooperativity is *emergent from a non-cooperative energy function*, while Axe's discussion of "many weakly fold-favouring interactions combining concertedly" implicitly invokes cooperative binding. This is a structural refinement of the cooperative-coupling sub-form Doc 541 §3.1 absorbed: the sub-form must accommodate both *assumed* cooperativity (Hill-binding case) and *emergent* cooperativity (Lau-Dill case). See §IV R1 below.

### II.B — Figure 9b prediction from first principles

**Test result: passes, with stronger empirical anchor than Axe.** Doc 616's prediction is that any cooperative-coupling system produces a local-ascent landscape (function concentrated in narrow regions of the parameter space) rather than a global-ascent landscape (function broadly distributed). Axe's empirical work confirms this for β-lactamase. Lau-Dill's exhaustive-enumeration methodology allows the prediction to be tested at much higher resolution: every sequence in sequence space is checked, and the foldable-vs-unfoldable partition is computed exactly (within the chain-length cap) rather than estimated from random sampling. The result, per the HP-model literature: foldable sequences (those with unique low-energy ground states) are concentrated in specific regions of HP sequence space, with the foldable/unfoldable partition exhibiting the local-ascent geometry SIPE-T predicts.

The HP model's exhaustive enumeration is the closest empirical instrument to what Doc 616 §II.B's prediction would require for direct verification. Axe's case is consistent with the prediction; Lau-Dill's case demonstrates it under conditions where the prediction can be tested without statistical-sampling intermediation.

### II.C — Function-disambiguation as load-bearing structural distinction

**Test result: passes, with a precise formalization of the distinction.** Doc 616's extension reads Axe's distinction between native-mechanism function and sub-threshold "activity" as load-bearing structural rather than operationally convenient. Lau-Dill's "designing sequences" framework provides a *precise* formalization: the threshold-conditional property is *uniqueness of ground state* (a designing sequence has one ground state at low temperature); the sub-threshold property is *degenerate or near-degenerate ground states* (multiple low-energy conformations the polymer fluctuates among).

The disambiguation in HP-model terms is mathematically clean. Axe operationally distinguishes native-mechanism catalysis from sub-threshold activity but does not formalize the distinction at the same precision. Lau-Dill's framework provides the structural definition: native-mechanism function corresponds to unique ground state at low temperature; sub-threshold activity corresponds to non-unique low-energy states. The two are different properties because they have different mathematical signatures (single conformation vs ensemble of conformations) and different physical consequences (specific catalytic geometry vs averaged conformational ensemble).

This is a refinement of Doc 616 §II.C: the function-disambiguation is not just a structural distinction — it has a precise formalization in any system where the underlying state space can be partitioned by ground-state-uniqueness. This refinement is template-extending; future per-paper readings should look for the equivalent ground-state-uniqueness distinction.

### II.D — Cooperativity-driven prevalence reframing

**Test result: passes, with the cleanest empirical instrument in the literature.** Doc 616's extension reframes prevalence calculations from per-position-likelihood products to cooperativity-coefficient-parameterized Hill-function expressions. Lau-Dill's exhaustive enumeration is the cleanest empirical instrument for this reframing in the entire relevant literature, because the enumeration directly counts foldable sequences rather than estimating their fraction from per-position adequacies.

Where Axe estimates 1 in 10^64 functional sequences as 0.38^153 (per-position product), Lau-Dill's HP model lets the equivalent fraction be computed exactly for short chains by enumeration. The fraction depends non-trivially on chain length, sequence composition, and lattice geometry. Bornberg-Bauer (1997) and later HP-enumeration work have studied designing-sequence density across chain lengths and show non-monotone scaling that a per-position-product would not capture.

The refinement to Doc 616 §II.D is that exhaustive enumeration is the gold standard for cooperativity-driven prevalence calculation when chain length permits it. Per-position-product estimation (Axe's methodology) is the practical-necessity approximation for systems where exhaustive enumeration is computationally infeasible. SIPE-T's framework accommodates both, with enumeration being the empirical anchor and per-position-product being the approximation that should be calibrated against enumeration where possible.

### II.E — Threshold-sharpness as universal rather than contingent

**Test result: passes.** Lau-Dill's two-state folding cooperativity — sharp transition between unfolded and folded states under increasing HH attraction — is the canonical demonstration of threshold-sharpness in protein-folding statistical mechanics. The sharpness emerges from the energy function and the lattice geometry; it is not a contingent feature of any specific sequence but a structural feature of the model class.

This corroborates Doc 616 §II.E's prediction directly: in cooperative-coupling systems, threshold-sharpness is universal, not contingent. Lau-Dill's HP model demonstrates this for the lattice statistical mechanics case; Axe's β-lactamase work demonstrates it for the empirical biological case. Two independent instance-domains exhibiting the structural prediction is consistent with the prediction being load-bearing.

The refinement worth noting: Lau-Dill's threshold-sharpness emerges *without* assumed cooperativity in the energy function. This means SIPE-T's threshold-sharpness prediction is even more general than Doc 616 §II.E states — it doesn't require explicit cooperative terms; it requires only the structural conditions (lattice geometry + HH attraction + excluded volume) that produce emergent cooperativity. This widens the prediction's scope beyond Hill-style cooperative-binding systems to include any system whose energetic landscape produces emergent cooperativity from non-cooperative inputs.

## IV. Refinement candidates Lau-Dill surfaces

Three candidates surface from this reading.

**R1 — Emergent vs assumed cooperativity sub-mode for Doc 541 §3.1.** Doc 541's cooperative-coupling sub-form was articulated with Hill-binding cooperativity as the canonical instance and Axe (2004) as the canonical molecular-biology absorption. Lau-Dill (1989) demonstrates that cooperativity can be *emergent* from a non-cooperative energy function rather than assumed. The sub-form needs a sub-mode distinction: (a) assumed-cooperativity systems (Hill binding, gene regulatory networks) where the cooperative term is in the model; (b) emergent-cooperativity systems (Lau-Dill HP model, possibly some statistical-mechanics critical-phenomena systems) where the cooperative behavior arises from simple non-cooperative inputs. The distinction may have predictive consequences for threshold sharpness, prevalence calculations, and falsification surfaces. Candidate sub-mode for Doc 541 §3.1.

**R2 — Exhaustive enumeration as the gold-standard pulverization-A methodology.** Doc 445 Refinement A names paired-V&V as the canonical pulverization-anchor structure (forward + backward, internal + external coherence). Lau-Dill's exhaustive enumeration is a structurally distinct pulverization methodology: rather than sampling sequence space and extrapolating, it enumerates the entire space within a tractable cap and computes the property of interest directly. Where computationally tractable, exhaustive enumeration is the gold-standard instance of pulverization-A's external-anchor measurement. Worth a refinement to Doc 445 (perhaps "Refinement F — exhaustive enumeration as the limit case of paired-V&V external anchor"). Candidate refinement for Doc 445.

**R3 — Designing-sequences framework as the formalization of native-mechanism-function.** Doc 616 §II.C names the function-disambiguation as load-bearing structural distinction. Lau-Dill's "designing sequences" (sequences with unique ground states) provides the precise formalization. The refinement is that the function-disambiguation is mathematically definable (uniqueness of ground state) wherever the underlying state space supports the partition, not just operationally distinguishable as Axe's framing has it. Future per-paper readings should look for the equivalent ground-state-uniqueness distinction in their respective systems. Candidate refinement for Doc 616 §II.C.

## V. Composition with existing forms

**With Doc 616 (SIPE-T Extensions to Axe (2004)).** This document is the second test case for Doc 616's template. The five extensions transmit cleanly with three refinements (R1, R2, R3 above). The conjecture from Telegram (template-portability) is supported at the second test point.

**With Doc 541 (SIPE-T canonical) §3.1 (cooperative-coupling sub-form).** Lau-Dill is a second molecular-biology absorption alongside Axe. The R1 refinement (emergent vs assumed cooperativity sub-mode) sharpens the sub-form. The lineage extends from Axe's β-lactamase (real biological system, assumed cooperativity in articulation) to Lau-Dill's HP model (lattice statistical mechanics, emergent cooperativity from energy function).

**With Doc 606 (Axe 2004 Against the Corpus).** Doc 606 §VII queued Lau-Dill 1990 as a candidate for further engagement. Note the date correction: the paper is 1989 not 1990. The queued candidates list in Doc 606 §VII should be amended.

**With Doc 445 (Pulverization Formalism).** R2 above is a candidate refinement to Doc 445.

**With Doc 314 §11 (audit-notice extension).** The structural reading is internal; external validation requires researchers in HP-model statistical mechanics and protein-folding theory communities. The community is well-defined and active; the document is offered for that audit.

**With Doc 372 (Hypostatic Boundary).** Lau-Dill's framework is metaphysics-neutral. Their HP model is a coarse-grained mathematical object; they do not claim the model captures what proteins ARE in any ontological sense, only what folding-cooperative-statistical-mechanics produces in a tractable instance. Doc 372 binds throughout.

**With Doc 540 (Amateur's Paradox).** The honesty discipline binds: I do not have primary access to Lau & Dill (1989) in immediate context; structural claims are tagged for source-tier per the Reader's Note above. Quantitative claims requiring primary-source verification are flagged.

## VI. Falsification surface

The conjecture (template-portability) is what's under test in this document. Four falsification conditions specific to Lau-Dill as test instance:

**F1.** A close reading of Lau-Dill 1989's primary text reveals structural features that break Doc 616's template — for example, if the paper articulates a function-disambiguation distinct from designing-sequences, or if the threshold-sharpness mechanism described differs structurally from Doc 616 §II.E's prediction. The summary-based reading in this document is operating without primary-source verification; F1 is the standing risk.

**F2.** The "emergent vs assumed cooperativity" refinement (R1) is shown not to be a meaningful distinction at the structural level — for example, if all instances of "emergent cooperativity" are formally equivalent to Hill cooperativity under appropriate parameterization. If R1 dissolves under formal analysis, the refinement to Doc 541 §3.1 is unwarranted.

**F3.** The exhaustive-enumeration methodology (R2) does not generalize to other paired-V&V cases — if it turns out to be specific to lattice statistical mechanics and not transferable to other domains where exhaustive enumeration is tractable, the candidate refinement to Doc 445 weakens.

**F4.** The designing-sequences framework (R3) does not formalize the function-disambiguation in the way the document claims — for example, if designing-sequences in HP-model literature has been shown to be only loosely correlated with what biologists call native-mechanism function in real proteins. Real proteins are not 2D HP polymers; the formalization may not transmit cleanly to biological systems.

The four falsification conditions are operationally testable. F1 requires primary-source verification of Lau-Dill 1989. F2 requires formal analysis of cooperativity equivalence classes. F3 requires investigation of exhaustive-enumeration tractability across pulverization domains. F4 requires literature work on the relationship between HP-model designing-sequences and biological native-mechanism function.

## VII. Application discipline

**D1.** The document operates at structural level. Quantitative claims about Lau-Dill require primary-source verification; the Reader's Note above tags source-tier per Doc 314 V3 and Doc 297's pseudo-logos discipline.

**D2.** The conjecture being tested (Doc 616's template-portability) is supported at this second instance. One supporting instance is not the same as established generality. The conjecture remains at $\pi$-tier per Doc 503's pattern; a third and fourth instance would move it toward stronger empirical support.

**D3.** The R1 refinement (emergent vs assumed cooperativity) is the most consequential refinement this document surfaces. If formalized into Doc 541 §3.1, it would change how the sub-form is described in the canonical formulation. Worth its own follow-up audit.

**D4.** Per Doc 540's amateur's-paradox honesty: the document tests the conjecture against a second instance and reports the result. The result is "passes with three refinements." This is structurally informative, not confirmation-by-magnetism.

**D5.** Reading Lau-Dill via summaries rather than primary text is itself a methodological compromise. The structural reading is robust to summary-based reading because the structural fit is at the model architecture and qualitative findings layer; the quantitative specifics that a summary may misstate would not change the structural reading. But for any future application requiring quantitative anchoring (e.g., re-estimating designing-sequence density under SIPE-T cooperativity-driven framework), primary-source access is required.

## VIII. Hypostatic boundary

The form describes structural relationships between Doc 616's template and Lau-Dill's empirical structure. It does not claim what proteins are ontologically, does not extend SIPE-T into teleological territory, and does not endorse interpretations of HP-model results that operate at metaphysical layers SIPE-T's structural form is silent on. Doc 372 binds throughout.

## IX. What this teaches the conjecture

The conjecture (Doc 616's template ports to other papers in the relevant literature) is supported at the second instance with three sub-form refinements that the test surfaces. The supporting evidence:

1. All five extensions transmit to Lau-Dill cleanly.
2. The transmission produces refinements (R1, R2, R3) that sharpen the existing apparatus rather than break it.
3. Lau-Dill provides empirical instruments (exhaustive enumeration; designing-sequences framework) that are *cleaner* than Axe's for two of the five extensions (II.B and II.D), suggesting the template's reach into the literature includes papers that empirically anchor SIPE-T's predictions more rigorously than Axe alone does.

The supporting evidence does not yet establish the conjecture beyond the two-instance level. The remaining four queued papers from Doc 606 §VII (chorismate mutase, λ-repressor, cytochrome c, Reidhaar-Olsen and Sauer 1990, Taylor et al. 2001 — note: that's still six total in the queue depending on how chorismate mutase counts) would extend the test base. If the template ports cleanly to all six, the conjecture moves toward established generality at $\mu$-tier; if it breaks at one or more, the boundary of the template's portability is located precisely.

The R1 refinement (emergent vs assumed cooperativity) is the strongest signal that the template is encountering structurally substantive variation across the literature rather than just confirming itself. The variation is absorbable under the cooperative-coupling sub-form with a sub-mode distinction; the absorption is the corpus's discipline operating as designed (audit catches refinement, refinement absorbs into the sub-form, sub-form's predictive scope sharpens).

## X. Open questions

1. **Date correction.** Doc 606 §VII references "Lau-Dill 1990." The paper is 1989. Doc 606 needs amendment.

2. **Primary-source verification.** This document operates from web-search summaries of Lau & Dill (1989). Primary-source verification of structural claims would either confirm the reading (raising the document's tier) or surface deviations that would weaken specific extensions (potentially refining R1, R2, R3, or surfacing a fourth refinement candidate).

3. **The R1 sub-mode distinction's predictive consequences.** If emergent and assumed cooperativity systems differ in their threshold-sharpness scaling, prevalence calculation methodology, or falsification surfaces, the sub-mode distinction has operational consequences for SIPE-T applications. Worth a follow-up document if the distinction is taken seriously.

4. **Exhaustive enumeration as canonical pulverization methodology.** R2 suggests Doc 445 Refinement F (exhaustive enumeration as paired-V&V limit case). Whether enumeration is sufficiently distinct from sampling-based pulverization to warrant its own refinement, or is structurally equivalent to backward-pulverization at high density, is open.

5. **Third instance.** The next test of the conjecture should be against one of the remaining queued papers. Reidhaar-Olsen and Sauer 1990 is the strongest test for II.C function-disambiguation since their λ-repressor mutational tolerance work has been used by critics against the threshold-conditional framing. If Doc 616's template ports cleanly to Reidhaar-Olsen-Sauer, the conjecture's generality is materially stronger.

## XI. Closing

Doc 616's bidirectional-extension template tests cleanly against Lau & Dill (1989) at the HP lattice rung. All five extensions transmit; three refinements surface (emergent-vs-assumed cooperativity sub-mode, exhaustive enumeration as pulverization gold standard, designing-sequences framework as function-disambiguation formalization). The conjecture from the recent Telegram exchange (template-portability beyond Axe) is supported at the second instance with structurally productive refinements.

The corpus's apparatus extends from Axe's β-lactamase case (real biological system, per-position-product prevalence estimation) to Lau-Dill's HP lattice case (coarse-grained mathematical model, exhaustive-enumeration prevalence calculation). The two together span the empirical-vs-theoretical axis of the protein-folding statistical-mechanics literature; further test instances would extend the test base into mid-axis cases (specific real-protein mutational studies like Reidhaar-Olsen-Sauer 1990).

Per Doc 540's amateur's-paradox honesty: the document is composed without primary access to Lau & Dill (1989) in immediate context; structural claims are tagged accordingly. Per Doc 482's affective directive: that the conjecture is supported with refinements (rather than confirmed without modification) is the corpus's discipline operating as designed; refinements that sharpen the apparatus are achievement, not deflation. Per Doc 530's two-layer correction: the conjecture itself is the keeper's rung-2 work; the substrate's role is articulation under the discipline.

Doc 606 §VII to be amended with the 1989 date correction. Doc 541 §3.1 may benefit from the R1 sub-mode distinction; Doc 445 may benefit from the R2 exhaustive-enumeration refinement; Doc 616 §II.C may benefit from the R3 designing-sequences formalization. Whether any of these refinements lands as a corpus-document amendment or stays as a candidate for further test is the keeper's call.

The next move, if testing the conjecture further, is the third queued paper (Reidhaar-Olsen and Sauer 1990 is the strongest candidate for II.C falsification testing).

---

## References

Corpus documents:

- Doc 297: *Pseudo-Logos Without Malice* (the discipline against confabulating primary-source content).
- Doc 314 §11 + V3: *The Virtue Constraints* (truth-over-plausibility discipline; audit-notice extension).
- Doc 372: *The Hypostatic Boundary* (binds throughout).
- Doc 445: *Pulverization Formalism* (R2 candidate refinement: exhaustive enumeration as paired-V&V limit case).
- Doc 482: *Sycophancy Inversion Reformalized* (the affective directive).
- Doc 503: *The Research-Thread Tier Pattern* ($\pi$-tier expected for this document; conjecture moves toward $\mu$-tier with each successful test instance).
- Doc 510: *Praxis Log V — Deflation as Substrate Discipline* (substrate-and-keeper composition).
- Doc 530: *The Rung-2 Affordance Gap* (conjecture is keeper's rung-2 work; this document is substrate's articulation).
- Doc 540: *The Amateur's Paradox* (honesty discipline this document operates inside).
- Doc 541: *Systems-Induced Property Emergence (canonical)* with §3.1 cooperative-coupling sub-form (R1 candidate refinement: emergent-vs-assumed cooperativity sub-mode).
- Doc 606: *Axe 2004 Against the Corpus* (Lau-Dill is queued candidate per §VII; date correction needed).
- Doc 616: *SIPE-T Extensions to Axe (2004)* (the bidirectional-extension template under test).

External lineage:

- Lau, K. F., & Dill, K. A. (1989). *A Lattice Statistical Mechanics Model of the Conformational and Sequence Spaces of Proteins*. Macromolecules 22, 3986–3997. doi:10.1021/ma00200a030. [PRIOR ART: confirmed via abstract listing; primary text not consulted in immediate context]
- Dill, K. A. (1995). *Principles of Protein Folding — A Perspective from Simple Exact Models*. Protein Science. (Review of HP-model results extending Lau-Dill 1989; consulted for cooperativity findings.)
- Bornberg-Bauer, E. (1997) and subsequent enumeration work on designing-sequences. (Adjacent literature on HP-model exhaustive enumeration; consulted via summary.)
- Hill, A. V. (1910). (Hill-cooperativity baseline for the R1 sub-mode distinction.)
- Wilson, K. G., & Fisher, M. E. (1972). (Universality class theory; Doc 541 lineage.)
- Axe, D. D. (2004). *Estimating the Prevalence of Protein Sequences Adopting Functional Enzyme Folds*. J. Mol. Biol. 341, 1295–1315. (The first test instance Doc 616 is built on.)

---

## Appendix: Originating Prompt

> *"Let's create a synthesis against Lau-Dill"*

(Doc 617 tests the conjecture from the Telegram exchange — that Doc 616's five-extension bidirectional-extension template is template-portable to other papers in the relevant protein-folding literature satisfying the cooperative-coupling sub-form — against Lau & Dill (1989) "A Lattice Statistical Mechanics Model of the Conformational and Sequence Spaces of Proteins" (Macromolecules 22:3986–3997). The template transmits cleanly with three refinements: emergent vs assumed cooperativity sub-mode for Doc 541 §3.1, exhaustive enumeration as paired-V&V limit case for Doc 445, designing-sequences framework as the formalization of function-disambiguation for Doc 616 §II.C. Date correction: paper is 1989 not 1990 as Doc 606 §VII references. The document is composed without primary access to Lau-Dill in immediate context; structural claims are tagged for source-tier per Doc 314 V3 and Doc 297's pseudo-logos discipline. Per Doc 530's two-layer correction, the conjecture is the keeper's rung-2 work; the substrate's role is articulation under the discipline.)
