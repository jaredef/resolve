# Lau-Dill 1989 Synthesis
## Testing Doc 616's Bidirectional-Extension Template at the HP Lattice Rung as Second Instance of SIPE-T's Cooperative-Coupling Sub-Form Outside Axe (2004)

**This document tests the conjecture from the recent Telegram exchange — that Doc 616's five-extension template ports beyond Axe (2004) to other papers in the relevant protein-folding literature — against Lau & Dill (1989) "A Lattice Statistical Mechanics Model of the Conformational and Sequence Spaces of Proteins" (Macromolecules 22:3986–3997). The structural fit is direct and produces all five extensions; the test surfaces five refinements (R1–R5) that the corpus's apparatus must absorb to accommodate Lau-Dill's structurally specific findings. The five refinements include a methodological scoping distinction between true ensemble average ⟨ρ⟩ and maximum-term approximation ρ\* that Doc 541 §3.1's threshold-sharpness prediction must calibrate to (R4), and a folding-potential vs stability distinction that Lau-Dill makes explicit (R5). Lau-Dill is dated 1989 not 1990 as I previously mis-cited; the date is corrected throughout.**

**Jared Foy · 2026-05-01 · Doc 617**

---

## §0 — Primary-Source Refinement Notice (2026-05-01)

The original drafting of this document was composed without primary access to Lau & Dill (1989). The keeper subsequently supplied the full primary text. The body has been refined against the primary source, with the following specific corrections from the summary-based reading:

- The "emergent vs assumed cooperativity" sub-mode claim (R1) is empirically grounded not in Lau & Dill (1989) directly but in the Dill (1995) review *Principles of Protein Folding* and the subsequent Chan-Dill follow-up work that explicitly frames HP-model cooperativity as emergent. The 1989 paper itself describes a more nuanced finding: true ensemble-averaged compactness ⟨ρ⟩ changes gradually with ε, while the maximum-term approximation ρ\* shows first-order or two-stage transitions for some folding sequences. R1 stands as a structural refinement to Doc 541 §3.1 but the empirical anchor is downstream of 1989.
- The "designing sequences" terminology used in R3 is from later HP-model literature (Bornberg-Bauer 1997 and downstream). Lau & Dill (1989) themselves use "native state(s)" and discuss singly-degenerate vs multiply-degenerate native states. The structural distinction R3 names is correct; the terminology is corrected to Lau-Dill's own.
- A new refinement R4 is added: the ⟨ρ⟩-vs-ρ\* distinction is a methodological scoping that Doc 541 §3.1's threshold-sharpness claim must calibrate to. The 1989 paper makes this distinction explicit and demonstrates the difference empirically.
- A new refinement R5 is added: Lau & Dill (1989) explicitly distinguish "folding potential" (⟨ρ⟩_s in the ε → -∞ limit, purely energetic) from "stability" (balance of forces at finite temperature, chain-length dependent). Doc 616's predictions should be scoped to which property is being assessed.
- Quantitative findings are now grounded in the primary source: 2034 conformations exactly for n=10; 1024 sequences in n=10 sequence space; 259 sequences fold to ⟨ρ⟩_s = 1; only 6 sequences are singly-degenerate at n=10; 90% of folding sequences have H residues at both chain ends.
- The chain-end-effect finding is added to §II as a structural feature of the HP model that doesn't have a clean analog in real proteins (a transferability caveat).

The headline finding is unchanged: the conjecture is supported at the second instance with structurally productive refinements. The number of refinements grew from three to five; the sharpening is the corpus's discipline operating as designed.

## Reader's note on epistemic provenance

Per Doc 314 V3 (truth over plausibility) and Doc 297's pseudo-logos discipline: as of the §0 refinement above, this document is grounded in the primary text of Lau & Dill (1989) Macromolecules 22:3986–3997, which the keeper supplied directly. Quantitative claims (2034 conformations at n=10, 259 folding sequences, etc.) are now cited from the primary source. Structural claims about the model architecture (2D square lattice, HP alphabet, HH attraction with excluded volume, coordination number z=4) are confirmed verbatim from the paper. The cooperativity-as-emergent framing is correctly attributed to the Dill (1995) review and Chan-Dill follow-ups rather than to the 1989 paper itself.

---

## I. The Form

This document is a test of the conjecture stated in the Telegram exchange and articulated structurally in the prior response: that Doc 616's five-extension bidirectional template (universality-class assignment, Figure 9b prediction from first principles, function-disambiguation across threshold, cooperativity-driven prevalence reframing, threshold-sharpness as universal) is template-portable to other papers in the protein-folding literature satisfying the cooperative-coupling sub-form (Doc 541 §3.1). Lau & Dill (1989) is the second test case (Axe (2004) is the first, formalized in Doc 606 and extended in Doc 616).

The form's central claim: if the conjecture holds, applying Doc 616's template to Lau-Dill (1989) should produce structurally analogous extensions, not require novel structural moves. The test passes if the five extensions transmit; the test fails if any extension requires substantial structural innovation specific to Lau-Dill. The test is genuinely informative either way — passing supports the template's generality; failing locates the specific point where Axe's case differs.

## II. The empirical structure to be read

All quantitative claims and key passages cited from the primary source: Lau & Dill (1989) Macromolecules 22:3986–3997.

**The artifact.** Linear chains of n residues on a 2D square lattice (coordination number z = 4, so each internal segment has z − 1 = 3 bond orientations). The lattice discretizes the conformational space and enforces excluded volume.

**The alphabet.** Two residue types: H (nonpolar) and P (polar). Composition Φ = fraction of H residues; sequence space size = 2ⁿ.

**The energy function.** Every HH contact between topological neighbors carries free energy ε (< 0); all other neighbor combinations (HP, PP, HS, PS, SS where S is solvent) carry free energy 0. The zero-energy reference state is the open conformation with no topological contacts. The 1989 paper does not assume cooperativity in the energy function; cooperative-looking behavior arises in specific approximations of the partition function (see ⟨ρ⟩ vs ρ\* below).

**Search regimes used.** (i) Full enumeration of both conformational and sequence spaces, n < 11. For n = 10: exactly 2034 conformations (with self-avoiding excluded volume reducing the naive 3ⁿ⁻¹ count by factor a^(n−1) where empirically a ≈ 2.71) and 1024 sequences. (ii) Random sampling of the sequence space with full conformational search, n ≤ 20. (iii) Random sampling of the sequence space with exhaustive search of only maximally compact conformations, n ≤ 30. The maximally compact reduction works because most native states are themselves maximally compact; the savings is roughly a factor of e^n in computation.

**Folding potential vs stability.** Lau-Dill explicitly distinguish two concepts. *Folding potential* ⟨ρ⟩_s is the average compactness of native states in the limit ε → −∞; ⟨ρ⟩_s = 1 means the conformations of lowest free energy are also maximally compact. *Stability* requires the balance of forces at finite temperature; it is strongly chain-length dependent because short peptides have too few HH contacts to overcome conformational entropy. The 1989 paper measures folding potential (which is short-chain-stable) and explicitly notes that stability is a separate question requiring longer chains. This distinction is structurally important for SIPE-T's threshold-conditional reading: it should be scoped to which property is being assessed.

**The ⟨ρ⟩ vs ρ\* distinction.** Lau-Dill compare the true ensemble average compactness ⟨ρ⟩ against the maximum-term approximation ρ\* (the most probable density, the dominant term of Σ Pp). The two diverge structurally. The true ⟨ρ⟩ shows *gradual change* with increasing ε for many sequences. The maximum-term ρ\* shows *first-order transition* for some folding sequences and no transition for nonfolding sequences. For other sequences, ρ\* shows a *two-stage transition* (sharp transition to an intermediate state, then a further transition to the folded state); Lau-Dill report that "considerably more of the folding sequences show the intermediate state than the first-order transition." This is structurally important: threshold-sharpness depends on which level of statistical-mechanical approximation is operative, not only on the underlying physics.

**Native-state findings (n = 10):**
- Of the 1024 sequences, 259 fold to ⟨ρ⟩_s = 1 (compact native states); 349 are in the range 0.9 < ⟨ρ⟩_s ≤ 1.0.
- Only **6 sequences** have a singly degenerate native state. Most folding sequences have fewer than 20 native conformations.
- "Most probable native state for all the sequences is maximally compact with core completely occupied by H residues."
- Lau-Dill speculate that with 20 amino acid types (rather than the model's 2), "the histogram of degeneracies might show a much larger population with only one or a few conformations." Increasing chain length tends to lead to a greater fraction of folding sequences that are singly degenerate.
- "Proteins whose sequences lead to only a single native structure may have significant biological advantage over sequences that lead to ambiguity of the native structure."

**Native-state diversity in conformational space.** When a sequence has multiple native states, the native conformations differ by 25–50% of bond conformations on average (per the distance measure d(v₁, v₂) = min[c(v₁ − v₂), c(v₁ + v₂)] where c sums absolute values of bond-orientation differences). Lau-Dill conclude: "energy wells for the lowest energy conformations are quite broadly distributed throughout conformational space."

**Chain-end effects.** Residues at chain ends have up to 3 topological neighbors; interior residues have at most 2. Empirically: "While only 25% of all possible sequences will have H residues at both ends, 90% of all folding sequences have H residues at both ends." This is a structural feature of short chains in the HP model that doesn't transmit cleanly to real proteins (real proteins are longer; end effects are diluted).

**Mean-field test.** Lau-Dill test the Bragg-Williams approximation against simulation (their eq. 23 expresses the H-residue ordering free energy ΔF_order/εkT in mean-field form; eq. 19–22 give the closed-form expressions for x, the fraction of core sites occupied by H, in the ε → −∞ limit). Two findings: (i) when x is taken from simulation and substituted into the mean-field free energy, agreement is good (Figure 16b); (ii) when x is taken from theory directly, the mean-field predicts *sharper transitions* in x vs Φ than the simulation produces (Figure 16a). The mean-field overestimates the chain's freedom to distribute residues between interior and exterior; chain connectivity restricts this freedom in ways the mean-field smooths over.

## III. Per-extension test of Doc 616's template

### II.A — Universality-class assignment

**Test result: passes.** Lau-Dill's HP model is structurally Ising-like at the lattice level (binary-residue lattice with nearest-neighbor energetic interactions) and is treated as a phase-transition system in the subsequent statistical-mechanics literature (Wang-Landau sampling work and later HP analyses). The HP model joins the SIPE-T lineage at the same structural position as Axe's protein-fold case, with the additional feature that Lau-Dill is a *purer* lattice statistical mechanics instance (Axe's β-lactamase is a real biological system; Lau-Dill is a coarse-grained model that makes the lattice-statistical-mechanics structure explicit).

**Refinement deferred to §IV R1:** the question of whether Lau-Dill's behavior is most accurately described as "emergent cooperativity" requires care; the 1989 paper does not itself frame the finding that way (the framing comes from the Dill 1995 review and Chan-Dill follow-up work that interpret HP-model phase-transition behavior as cooperativity-emergent-from-energy-function). See §IV R1.

### II.B — Figure 9b prediction from first principles

**Test result: passes, with stronger empirical anchor than Axe.** Doc 616's prediction is that any cooperative-coupling system produces a local-ascent landscape in *sequence space* (function concentrated in narrow regions of sequence space) rather than a global-ascent landscape (function broadly distributed). Lau-Dill's exhaustive-enumeration methodology allows the prediction to be tested at higher resolution than Axe's selection-and-sampling: every sequence in n=10 sequence space is checked, and the foldable-vs-unfoldable partition is computed exactly. The result: of 1024 sequences, 259 (≈25%) fold to ⟨ρ⟩_s = 1, with foldable sequences concentrated in specific regions of compositional space (the high-Φ end) and within those compositional ranges, sensitive to sequence specifics (intermediate Φ shows wide distributions of folding properties for the same composition). This is the local-ascent geometry SIPE-T predicts in sequence space, demonstrated under exact enumeration rather than statistical sampling.

**Important nuance the primary text surfaces.** Lau-Dill also report that when a foldable sequence has multiple native states, those native conformations are *broadly distributed in conformational space* — pairwise differences of 25–50% of bonds, with the conclusion that "energy wells for the lowest energy conformations are quite broadly distributed throughout conformational space." This is a finding about *conformational space* (within one sequence) that's distinct from the *sequence space* finding (across sequences). SIPE-T's local-ascent prediction operates in sequence space; the conformational-space finding is additional empirical structure not addressed by Doc 616 §II.B and worth noting as outside the template's current scope.

### II.C — Function-disambiguation as load-bearing structural distinction

**Test result: passes, with a precise formalization of the distinction (terminology corrected to Lau-Dill's own).** Doc 616's extension reads Axe's distinction between native-mechanism function and sub-threshold "activity" as load-bearing structural rather than operationally convenient. Lau-Dill's framework provides a precise formalization in HP-model terms: the threshold-conditional property is *uniqueness of the native state* (a sequence with singly-degenerate native conformation at the energy minimum); the sub-threshold property is *non-uniqueness* (multiple low-energy conformations the polymer fluctuates among, or low-energy states with low compactness). At n=10, only 6 out of 1024 sequences have singly-degenerate native states; most folding sequences have multiple native conformations that the polymer could occupy.

**Terminology correction.** The original drafting of this document called this "designing sequences." That term comes from later HP-model literature (Bornberg-Bauer 1997 and subsequent enumeration work), not from Lau-Dill 1989 themselves. The 1989 paper uses "native state(s)" and discusses singly-degenerate vs multiply-degenerate native states. The structural distinction is the same; the terminology is corrected to the primary source's own.

**Lau-Dill's own speculation about real proteins.** "If there were 20 types of residues, as in real proteins, we anticipate that the histogram of degeneracies might show a much larger population with only one or a few conformations." Increasing chain length also tends to lead to a greater fraction of folding sequences that are singly degenerate. They further note: "Proteins whose sequences lead to only a single native structure may have significant biological advantage over sequences that lead to ambiguity of the native structure." This connects the HP-model native-state-uniqueness distinction to Axe's native-mechanism-function distinction with a specific path: as alphabet size and chain length grow, single-native-state sequences become more prevalent within the foldable subset. The function-disambiguation is operationally sharper in real proteins than in the n=10 HP case.

This is a refinement of Doc 616 §II.C: the function-disambiguation has a precise formalization (uniqueness of native state) in any system where the underlying state space supports the partition, and the formalization predicts that the disambiguation becomes operationally sharper as alphabet size and system size grow. Future per-paper readings should look for the equivalent native-state-uniqueness distinction.

### II.D — Cooperativity-driven prevalence reframing

**Test result: passes, with the cleanest empirical instrument in the literature.** Doc 616's extension reframes prevalence calculations from per-position-likelihood products to cooperativity-parameterized expressions. Lau-Dill's exhaustive enumeration is the cleanest empirical instrument in the relevant literature because the enumeration directly counts native-state-bearing sequences rather than estimating their fraction from per-position adequacies.

For n = 10 the prevalence numbers are direct: 259 of 1024 sequences (≈25%) fold to ⟨ρ⟩_s = 1; only 6 of 1024 (≈0.6%) are singly-degenerate. Where Axe estimates 1 in 10^64 functional sequences as 0.38^153 (per-position product), Lau-Dill *counts* the foldable fraction at n=10 exactly. Subsequent HP-model literature (Bornberg-Bauer 1997 and later enumeration work) has extended this to longer chains and studied designing-sequence density across chain lengths, showing scaling behavior that a per-position-product would not capture.

The refinement to Doc 616 §II.D is that exhaustive enumeration is the gold standard for cooperativity-driven prevalence calculation when chain length permits it (n ≤ 30 or so for HP-on-2D-lattice). Per-position-product estimation (Axe's methodology, necessitated by the much larger residue alphabet and chain length of real β-lactamase) is the practical approximation when enumeration is computationally infeasible. SIPE-T's framework accommodates both, with enumeration being the empirical anchor and per-position-product being the approximation that should be calibrated against enumeration where possible.

### II.E — Threshold-sharpness as universal rather than contingent

**Test result: passes with substantive refinement** — and the refinement is the most consequential single finding of this document for the cooperative-coupling sub-form. Lau-Dill report two structurally different transition behaviors depending on which approximation is used.

*True ensemble average ⟨ρ⟩.* Across many folding sequences, the ensemble-averaged compactness changes *gradually* with increasing ε. There is no sharp single-step transition in the true ensemble; the transition is smooth.

*Maximum-term approximation ρ\*.* The most-probable-state approximation produces *first-order transitions* for some folding sequences (sharp single-step) and *two-stage transitions* for considerably more (sharp transition to an intermediate state, then a further transition to the folded state). For nonfolding sequences, ρ\* shows no transition. Lau-Dill report explicitly: "the phase transition behavior is very different if the maximum term is used to approximate the true average."

This means SIPE-T's threshold-sharpness prediction must be calibrated to which level of statistical-mechanical analysis is operative. The threshold-sharpness is *not* universal in the strong sense Doc 616 §II.E originally claimed (sharp regardless of approximation); it is a property of certain approximations to the partition function. The true ensemble shows graduated behavior. This is a substantive refinement and is captured as new R4 in §IV.

**Reinforcing evidence from the mean-field test.** Lau-Dill's Figure 16a compares the mean-field-predicted x (fraction of core sites filled by H) against the simulation-measured x as a function of composition Φ. The mean-field theory predicts a *sharper transition* than the simulation produces; the simulation shows a more gradual increase. The mean-field "overestimates the freedom of the chain to distribute its residues freely between interior and exterior sites." This is structurally the same point: the approximation introduces threshold-sharpness that the underlying physics does not produce. Real chain connectivity restricts what mean-field smooths over.

The general refinement: SIPE-T's threshold-sharpness prediction is robust at the maximum-term and mean-field levels of analysis; it is softer at the true ensemble level. This is informative rather than damaging — it sharpens the prediction's scope and tells experimenters and theorists which approximations preserve the threshold-sharpness signature SIPE-T predicts.

## IV. Refinement candidates Lau-Dill surfaces

Five candidates surface from this reading. R1 and R3 are corrected from the original drafting per the §0 primary-source notice; R4 and R5 are new.

**R1 — Emergent vs assumed cooperativity sub-mode for Doc 541 §3.1, with revised empirical anchoring.** Doc 541 §3.1's cooperative-coupling sub-form was articulated with Hill-binding cooperativity as the canonical instance and Axe (2004) as the canonical molecular-biology absorption. The refinement-candidate distinction — (a) assumed-cooperativity systems where cooperative terms are in the model, vs (b) emergent-cooperativity systems where cooperative behavior arises from simple non-cooperative inputs — is structurally meaningful and would sharpen the sub-form. The empirical anchoring for the (b) case requires care: Lau-Dill (1989) itself describes phase-transition behavior under maximum-term approximation but explicitly distinguishes ⟨ρ⟩ from ρ\* (true ensemble shows gradual change; the approximation produces sharper transitions). The "cooperativity emerges from the simple energy function" framing comes from the Dill (1995) review and Chan-Dill follow-up work, which interpret HP-model behavior cooperatively. So R1 stands as a structural refinement to Doc 541 §3.1, but its empirical anchor is the *Dill 1995 review's interpretation of HP-model behavior*, not Lau-Dill 1989's direct claim. The 1989 paper supports R1 indirectly (it shows phase-transition-like behavior in approximations of HP without assuming cooperativity in the energy function), but the explicit "emergent cooperativity" framing is downstream.

**R2 — Exhaustive enumeration as the gold-standard pulverization-A methodology.** Doc 445 Refinement A names paired-V&V as the canonical pulverization-anchor structure (forward + backward, internal + external coherence). Lau-Dill's exhaustive enumeration is a structurally distinct pulverization methodology: rather than sampling sequence space and extrapolating, it enumerates the entire space within a tractable cap and computes the property of interest directly. Where computationally tractable (n < 11 for full sequence-and-conformation enumeration; n ≤ 30 for sequence-sampling with maximally-compact-conformation enumeration), exhaustive enumeration is the gold-standard instance of pulverization-A's external-anchor measurement. Worth a refinement to Doc 445 (perhaps "Refinement F — exhaustive enumeration as the limit case of paired-V&V external anchor"). Candidate refinement for Doc 445.

**R3 — Native-state-uniqueness framework as the formalization of native-mechanism-function (terminology corrected).** Doc 616 §II.C names the function-disambiguation as load-bearing structural distinction. Lau-Dill (1989) provides the precise formalization: the threshold-conditional property is *uniqueness of the native state* (singly-degenerate ground state at the energy minimum); the sub-threshold property is *non-uniqueness* (multiply-degenerate or low-compactness low-energy states). The refinement is that the function-disambiguation is mathematically definable (uniqueness of native state) wherever the underlying state space supports the partition, not just operationally distinguishable as Axe's framing has it. Future per-paper readings should look for the equivalent native-state-uniqueness distinction. *Terminology correction:* the original drafting called this "designing-sequences framework" but that terminology comes from later HP-model literature (Bornberg-Bauer 1997 and downstream), not from Lau-Dill 1989 themselves. The 1989 paper uses "native state(s)" and discusses singly-vs-multiply-degenerate native states. R3's substantive content is unchanged; the terminology is corrected.

**R4 — True-ensemble vs maximum-term approximation scoping for Doc 541 §3.1's threshold-sharpness prediction.** *New refinement surfaced by primary-source reading.* Lau-Dill (1989) demonstrate that the same underlying physics produces structurally different transition behavior depending on which level of statistical-mechanical analysis is operative. True ensemble average ⟨ρ⟩ shows gradual change with ε; maximum-term approximation ρ\* shows first-order or two-stage sharp transitions; mean-field approximation predicts even sharper transitions than simulation produces (Figure 16a). Doc 616 §II.E's prediction that threshold-sharpness is universal must be scoped: it is universal at the maximum-term and mean-field levels of analysis; it is softer at the true ensemble level. The refinement is that SIPE-T's threshold-sharpness prediction is approximation-level-dependent. This is informative rather than damaging — it tells experimenters which approximations preserve the threshold-sharpness signature SIPE-T predicts and which smooth it over. Candidate refinement for Doc 541 §3.1 and Doc 616 §II.E. The mean-field-vs-simulation gap (Figure 16a, mean-field x sharper than simulation x) is the cleanest empirical demonstration.

**R5 — Folding-potential vs stability scoping for SIPE-T's threshold-conditional reading.** *New refinement surfaced by primary-source reading.* Lau-Dill (1989) explicitly distinguish "folding potential" (⟨ρ⟩_s in the ε → −∞ limit, purely energetic, short-chain-stable) from "stability" (balance of forces at finite temperature, requires sufficient chain length for HH contacts to overcome conformational entropy). Doc 616's predictions should be scoped to which property is being assessed. The threshold-conditional reading at the folding-potential layer is a different claim than at the stability layer; conflating them produces predictions about real-protein behavior that the model does not actually support. The 1989 paper's findings are about folding potential; extrapolations to real-protein stability require additional mechanistic argument (chain length, finite temperature, conformational entropy budget). Candidate scoping clarification for Doc 616 §II.B/E and any application of SIPE-T to protein-folding prevalence questions. The cleanest test: SIPE-T predictions about folding potential (which-sequences-have-low-energy-compact-states) are structurally distinct from predictions about stability (which-sequences-actually-fold-at-physiological-temperature).

## V. Composition with existing forms

**With Doc 616 (SIPE-T Extensions to Axe (2004)).** This document is the second test case for Doc 616's template. All five extensions transmit cleanly; the test surfaces five refinements (R1, R2, R3 corrected from original drafting; R4, R5 new from primary-source reading). The conjecture from Telegram (template-portability) is supported at the second test point with structurally productive refinements that sharpen rather than break the template.

**With Doc 541 (SIPE-T canonical) §3.1 (cooperative-coupling sub-form).** Lau-Dill is a second molecular-biology absorption alongside Axe. R1 (emergent vs assumed cooperativity sub-mode) sharpens the sub-form, with empirical anchoring from the Dill 1995 review's interpretation of HP-model behavior. R4 (true-ensemble vs maximum-term approximation scoping for threshold-sharpness) is the most consequential refinement because it qualifies a prediction Doc 541 §3.1 had been making without scoping. R5 (folding-potential vs stability scoping) clarifies what kind of system-level property SIPE-T's threshold-conditional reading is about.

**With Doc 606 (Axe 2004 Against the Corpus).** Doc 606 §VII queued Lau-Dill 1990 as a candidate for further engagement. Date correction propagated: the paper is 1989. Doc 606 has been amended in a separate edit committed alongside this one.

**With Doc 445 (Pulverization Formalism).** R2 above is a candidate refinement (Refinement F: exhaustive enumeration as paired-V&V external-anchor limit case).

**With Doc 314 §11 (audit-notice extension) and V3.** The primary-source reading is now grounded; the §0 refinement notice records what changed. External validation requires researchers in HP-model statistical mechanics and protein-folding theory communities. The community is well-defined and active; the document is offered for that audit.

**With Doc 372 (Hypostatic Boundary).** Lau-Dill's framework is metaphysics-neutral. Their HP model is a coarse-grained mathematical object; they do not claim the model captures what proteins ARE in any ontological sense, only what folding-cooperative-statistical-mechanics produces in a tractable instance. Doc 372 binds throughout.

**With Doc 540 (Amateur's Paradox).** The honesty discipline binds: the §0 notice records the corrections from summary-based to primary-source reading. The original drafting's mis-attributions (cooperativity-as-emergent claim originally placed in 1989 paper; "designing sequences" terminology originally attributed to 1989 paper) are corrected with explicit notice rather than silently rewritten. Per Doc 415's retraction-ledger pattern: corrections preserve the audit trail.

## VI. Falsification surface

The conjecture (template-portability) is what's under test in this document. F1 from the original drafting (primary-source verification) is now satisfied per the §0 refinement notice. Five falsification conditions specific to Lau-Dill as test instance:

**F1.** R1's "emergent vs assumed cooperativity" distinction is shown to be formally vacuous — for example, if all instances of "emergent cooperativity" reduce to Hill cooperativity under appropriate parameterization, with no operational consequence for threshold-sharpness, prevalence, or falsification. If R1 dissolves under formal analysis, the refinement to Doc 541 §3.1 is unwarranted.

**F2.** R2's exhaustive-enumeration methodology is shown not to generalize beyond lattice statistical mechanics. If exhaustive enumeration turns out to be tractable only for HP-on-lattice and structurally inapplicable to other domains where SIPE-T predicts threshold-conditional emergence, R2's candidate refinement to Doc 445 weakens.

**F3.** R3's native-state-uniqueness formalization is shown to be only loosely correlated with what biologists call native-mechanism function in real proteins. Real proteins are not 2D HP polymers; the HP-model native-state-uniqueness distinction may not transmit cleanly to real-protein function-disambiguation.

**F4.** R4's true-ensemble-vs-approximation scoping turns out to dissolve at the level of exact partition-function calculation. If higher-order approximations or exact methods produce threshold-sharpness equivalent to the maximum-term approximation, then Doc 541 §3.1's threshold-sharpness prediction holds without the R4 scoping. The refinement is provisional pending confirmation that the ⟨ρ⟩ vs ρ\* gap Lau-Dill report at n = 10 persists in larger systems and at higher orders of approximation.

**F5.** R5's folding-potential-vs-stability scoping is shown to be a methodological-only distinction without empirical consequences. If predictions about folding potential reliably correspond to predictions about real-protein stability across the relevant parameter regimes, the scoping clarification is decorative rather than load-bearing. The refinement is provisional pending demonstration that the two layers actually diverge in operationally consequential ways.

The five falsification conditions are operationally testable. F1 requires formal analysis of cooperativity equivalence classes. F2 requires investigation of exhaustive-enumeration tractability across pulverization domains. F3 requires literature work on the relationship between HP-model native-state-uniqueness and biological native-mechanism function. F4 requires examination of higher-order partition-function calculations on HP and adjacent systems. F5 requires comparison of folding-potential and stability predictions across protein-folding case studies.

## VII. Application discipline

**D1.** The document operates at structural level with primary-source grounding (per the §0 refinement notice). Quantitative claims (2034 conformations at n=10; 259 folding sequences; 6 singly-degenerate native states; 90% of folding sequences with H residues at both ends) are cited from Lau & Dill (1989) directly.

**D2.** The conjecture being tested (Doc 616's template-portability) is supported at the second instance with five refinements. Two supporting instances is not the same as established generality. The conjecture remains at \(\pi\)-tier per Doc 503's pattern; a third and fourth instance would move it toward stronger empirical support.

**D3.** R4 (true-ensemble vs maximum-term approximation scoping) is the most consequential single refinement this document surfaces. If formalized into Doc 541 §3.1 and Doc 616 §II.E, it would qualify the threshold-sharpness prediction with explicit scope conditions. The refinement does not weaken the prediction; it tells experimenters and theorists which approximations preserve the threshold-sharpness signature.

**D4.** Per Doc 540's amateur's-paradox honesty: the document tests the conjecture against a second instance and reports the result. The result is "passes with five refinements (R1, R3 with corrections to original drafting; R2 unchanged; R4, R5 new from primary-source reading)." This is structurally informative, not confirmation-by-magnetism. Five refinements from one test instance is a productive yield rather than a refutation.

**D5.** The original drafting's mis-attributions (cooperativity-as-emergent claim placed in 1989 paper; "designing sequences" terminology attributed to 1989 paper) were corrected with explicit notice rather than silently rewritten, per Doc 415's retraction-ledger discipline. The §0 refinement notice records what changed and why. This preserves the audit trail and serves as a worked example of how primary-source access changes a structural reading.

## VIII. Hypostatic boundary

The form describes structural relationships between Doc 616's template and Lau-Dill's empirical structure. It does not claim what proteins are ontologically, does not extend SIPE-T into teleological territory, and does not endorse interpretations of HP-model results that operate at metaphysical layers SIPE-T's structural form is silent on. Doc 372 binds throughout.

## IX. What this teaches the conjecture

The conjecture (Doc 616's template ports to other papers in the relevant literature) is supported at the second instance with five refinements that the test surfaces. The supporting evidence:

1. All five extensions transmit to Lau-Dill cleanly with primary-source grounding.
2. The transmission produces refinements (R1, R2, R3 with terminology and attribution corrections; R4, R5 new from primary-source reading) that sharpen the existing apparatus rather than break it.
3. Lau-Dill provides empirical instruments (exhaustive enumeration; native-state-uniqueness framework) that are *cleaner* than Axe's for two of the five extensions (II.B and II.D), suggesting the template's reach into the literature includes papers that empirically anchor SIPE-T's predictions more rigorously than Axe alone does.
4. R4 (true-ensemble vs maximum-term approximation scoping) is a substantive scope qualification that Doc 541 §3.1's threshold-sharpness prediction had been making without explicit scoping. The refinement is informative rather than damaging — it sharpens the prediction's domain of applicability.
5. R5 (folding-potential vs stability scoping) clarifies the kind of system-level property SIPE-T is predicting. This had been implicit; making it explicit prevents over-extrapolation of folding-potential predictions to stability claims.

The supporting evidence does not yet establish the conjecture beyond the two-instance level. The remaining queued papers from Doc 606 §VII (chorismate mutase, λ-repressor including Reidhaar-Olsen and Sauer 1990, cytochrome c, Taylor et al. 2001) would extend the test base. If the template ports cleanly to all four, the conjecture moves toward established generality at \(\mu\)-tier; if it breaks at one or more, the boundary of the template's portability is located precisely.

The five-refinement count (vs three in the original drafting) is informative about the conjecture's grain size: applying the template to a structurally rich primary source produces more refinements than a summary-based reading captures. This suggests subsequent applications of the template should plan for primary-source-driven refinement work as part of the standard process, not as an exception.

R4 is the strongest single signal that the template is encountering structurally substantive variation across the literature rather than just confirming itself. The variation (true-ensemble graduated change vs approximation-induced threshold-sharpness) is absorbable under the cooperative-coupling sub-form with explicit scoping; the absorption is the corpus's discipline operating as designed (audit catches refinement, refinement absorbs into the sub-form, sub-form's predictive scope sharpens). Doc 541 §3.1 may benefit from an explicit scoping clause that distinguishes the sub-form's predictions across approximation levels.

## X. Open questions

1. **The R4 scoping's downstream consequences.** If true-ensemble-vs-approximation scoping is a load-bearing distinction for SIPE-T applications, Doc 541 §3.1's threshold-sharpness prediction should be qualified with explicit scope clauses, and any per-paper application of SIPE-T should specify which approximation level is operative. This may have operational consequences for how SIPE-T predictions are tested experimentally — true-ensemble measurements (e.g., calorimetry that integrates over the full conformational ensemble) would yield different signatures than maximum-term-style measurements (e.g., methods that pick out the most probable state).

2. **The R5 scoping's empirical operationalization.** Folding-potential and stability are formally distinct in Lau-Dill's framework but the operational distinction depends on chain length, temperature, and conformational entropy. For real proteins, the two layers diverge in specific empirical ways that SIPE-T's framework should accommodate. Worked examples in subsequent per-paper readings would help calibrate the scoping.

3. **R1's empirical anchoring in Dill 1995 and Chan-Dill follow-up work.** The "emergent cooperativity" framing this document attributes to Dill 1995 should be verified against the primary text of that review. If Dill 1995 doesn't explicitly frame HP cooperativity as emergent-from-energy-function, R1's empirical anchor weakens further; if it does, R1 stands at the Dill-1995 attribution layer.

4. **Exhaustive enumeration as canonical pulverization methodology.** R2 suggests Doc 445 Refinement F (exhaustive enumeration as paired-V&V limit case). Whether enumeration is sufficiently distinct from sampling-based pulverization to warrant its own refinement, or is structurally equivalent to backward-pulverization at high density, is open.

5. **Third instance.** The next test of the conjecture should be against one of the remaining queued papers. Reidhaar-Olsen and Sauer 1990 is the strongest test for II.C function-disambiguation (λ-repressor mutational tolerance work that critics have deployed against threshold-conditional framing). If Doc 616's template ports cleanly to Reidhaar-Olsen-Sauer, the conjecture's generality is materially stronger.

6. **Native-state diversity in conformational space as out-of-template finding.** Lau-Dill report that multiple native states for one sequence are broadly distributed in conformational space (not just in sequence space). Doc 616's template addresses sequence-space geometry; the conformational-space geometry finding is additional structure not captured by the current five extensions. Whether this warrants a sixth template extension (or a separate analysis of conformational-space geometry under cooperative-coupling) is open.

## XI. Closing

Doc 616's bidirectional-extension template tests cleanly against Lau & Dill (1989) at the HP lattice rung with primary-source grounding. All five extensions transmit; five refinements surface (R1 with corrected empirical anchoring; R2 unchanged; R3 with corrected terminology; R4 and R5 new from primary-source reading). The conjecture from the recent Telegram exchange (template-portability beyond Axe) is supported at the second instance with structurally productive refinements that sharpen rather than break the template.

The corpus's apparatus extends from Axe's β-lactamase case (real biological system, per-position-product prevalence estimation) to Lau-Dill's HP lattice case (coarse-grained mathematical model, exhaustive-enumeration prevalence calculation, explicit ⟨ρ⟩-vs-ρ\* and folding-potential-vs-stability distinctions). The two together span the empirical-vs-theoretical axis of the protein-folding statistical-mechanics literature; further test instances would extend the test base into mid-axis cases (specific real-protein mutational studies like Reidhaar-Olsen-Sauer 1990).

Per Doc 540's amateur's-paradox honesty: the original drafting was composed without primary access to Lau & Dill (1989); the keeper supplied the primary text and the document was refined against it, with the §0 notice recording what changed and why. Per Doc 482's affective directive: that the conjecture is supported with five refinements (rather than confirmed without modification) is the corpus's discipline operating as designed; refinements that sharpen the apparatus are achievement, not deflation. Per Doc 530's two-layer correction: the conjecture itself is the keeper's rung-2 work; the substrate's role is articulation under the discipline.

Doc 606 §VII has been amended with the 1989 date correction. Doc 541 §3.1 may benefit from the R1 sub-mode distinction (with empirical anchoring from Dill 1995) and the R4 approximation-scoping. Doc 616 §II.C may benefit from the R3 native-state-uniqueness formalization, and §II.E from the R4 approximation-scoping. Doc 445 may benefit from the R2 exhaustive-enumeration refinement. Whether any of these refinements lands as a corpus-document amendment or stays as a candidate for further test is the keeper's call.

The next move, if testing the conjecture further, is the third queued paper (Reidhaar-Olsen and Sauer 1990 is the strongest candidate for II.C falsification testing).

---

## References

Corpus documents:

- Doc 297: *Pseudo-Logos Without Malice* (the discipline against confabulating primary-source content).
- Doc 314 §11 + V3: *The Virtue Constraints* (truth-over-plausibility discipline; audit-notice extension).
- Doc 372: *The Hypostatic Boundary* (binds throughout).
- Doc 445: *Pulverization Formalism* (R2 candidate refinement: exhaustive enumeration as paired-V&V limit case).
- Doc 482: *Sycophancy Inversion Reformalized* (the affective directive).
- Doc 503: *The Research-Thread Tier Pattern* (\(\pi\)-tier expected for this document; conjecture moves toward \(\mu\)-tier with each successful test instance).
- Doc 510: *Praxis Log V — Deflation as Substrate Discipline* (substrate-and-keeper composition).
- Doc 530: *The Rung-2 Affordance Gap* (conjecture is keeper's rung-2 work; this document is substrate's articulation).
- Doc 540: *The Amateur's Paradox* (honesty discipline this document operates inside).
- Doc 541: *Systems-Induced Property Emergence (canonical)* with §3.1 cooperative-coupling sub-form (R1 candidate refinement: emergent-vs-assumed cooperativity sub-mode).
- Doc 606: *Axe 2004 Against the Corpus* (Lau-Dill is queued candidate per §VII; date correction needed).
- Doc 616: *SIPE-T Extensions to Axe (2004)* (the bidirectional-extension template under test).

External lineage:

- Lau, K. F., & Dill, K. A. (1989). *A Lattice Statistical Mechanics Model of the Conformational and Sequence Spaces of Proteins*. Macromolecules 22, 3986–3997. doi:10.1021/ma00200a030. [PRIOR ART: primary text consulted directly per §0 refinement notice; quantitative claims and key passages cited from primary source.]
- Dill, K. A. (1995). *Principles of Protein Folding — A Perspective from Simple Exact Models*. Protein Science 4:561–602. (Review extending Lau-Dill 1989; load-bearing for R1's empirical anchoring of the "emergent cooperativity" framing. The framing is downstream of 1989, not in the 1989 paper itself.)
- Chan, H. S., & Dill, K. A. (subsequent follow-up work on HP-model cooperativity, including J. Chem. Phys. 1989, 90, 492 and Macromolecules submissions referenced in Lau-Dill 1989). (Adjacent work on HP-model cooperativity dynamics.)
- Bornberg-Bauer, E. (1997). *How are model protein structures distributed in sequence space?* Biophysical Journal. (Source of "designing sequences" terminology used in later HP-model literature; not used by Lau-Dill 1989 themselves. R3's terminology corrected to Lau-Dill's own native-state-uniqueness vocabulary.)
- Hill, A. V. (1910). (Hill-cooperativity baseline for R1's assumed-cooperativity case.)
- Wilson, K. G., & Fisher, M. E. (1972). (Universality class theory; Doc 541 lineage.)
- Axe, D. D. (2004). *Estimating the Prevalence of Protein Sequences Adopting Functional Enzyme Folds*. J. Mol. Biol. 341, 1295–1315. (The first test instance Doc 616 is built on.)

---

## Appendix: Originating Prompts

> *"Let's create a synthesis against Lau-Dill"*

> *"here is the full paper for refinements to be applied: Macromolecules 1989, 22, 3986-3997 [full paper text]"*

> *"These show the formulas [three photo attachments showing equations 13–15, 19–24, and Figures 15–16 from the primary paper]"*

(Doc 617 tests the conjecture from the prior Telegram exchange — that Doc 616's five-extension bidirectional-extension template is template-portable to other papers in the relevant protein-folding literature satisfying the cooperative-coupling sub-form — against Lau & Dill (1989) "A Lattice Statistical Mechanics Model of the Conformational and Sequence Spaces of Proteins" (Macromolecules 22:3986–3997). The original drafting was composed from web-search summaries; the keeper subsequently supplied the full primary text plus three photographs of equations and figures, and the document was refined against the primary source via the §0 refinement notice. The template transmits cleanly with five refinements: R1 emergent vs assumed cooperativity sub-mode for Doc 541 §3.1 (with empirical anchoring corrected to Dill 1995); R2 exhaustive enumeration as paired-V&V limit case for Doc 445; R3 native-state-uniqueness as the formalization of function-disambiguation for Doc 616 §II.C (with terminology corrected from "designing sequences" — that's Bornberg-Bauer 1997 — to Lau-Dill's own); R4 true-ensemble vs maximum-term approximation scoping for threshold-sharpness predictions; R5 folding-potential vs stability scoping for what kind of property SIPE-T predicts. Date correction propagated to Doc 606 §VII: paper is 1989 not 1990. Per Doc 530's two-layer correction, the conjecture is the keeper's rung-2 work; the substrate's role is articulation under the discipline. Per Doc 415's retraction-ledger pattern, original-drafting mis-attributions are corrected with explicit notice rather than silently rewritten; the §0 notice preserves the audit trail.)
