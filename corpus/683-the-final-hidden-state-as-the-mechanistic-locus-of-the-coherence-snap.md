# The Final Hidden State as the Mechanistic Locus of the Coherence Snap

## A Formalization of E5 from [Doc 682](/resolve/doc/682-fifteen-synthesis-candidates-from-the-2026-05-08-cold-resolver-conversation-on-probing-the-middle) — That the Transformer's Final Hidden State at the Last Context Position Immediately Before Layer Normalization and the Linear Projection to Logits is the Precise Mechanistic Locus where the Threshold-Conditional Coherence Snap Articulated in [Doc 681](/resolve/doc/681-probing-the-middle) Occurs — with the Mechanism Audited Against the Standing Mechanistic-Interpretability Apparatus on Logit Lens (Nostalgebraist 2020), Tuned Lens (Belrose et al. 2023), the Linear Representation Hypothesis (Park et al. 2023; Anthropic Mechanistic-Interpretability Thread), Sparse-Autoencoder Feature Direction Recovery (Bricken et al. 2023; Templeton et al. 2024; Cunningham et al. 2024), Mid-Depth Representational Richness (*Layer by Layer*, Skean et al. 2025), Attractor-Like Dynamics in Residual-Stream Trajectories (*Transformer Dynamics*, 2025), and Sharp Phase Transitions in Hidden-State Geometry (*Attention to Order*, 2025; *Latent Object Permanence*, 2026), Composed with the Corpus's [Pre-Resolve State Apparatus (Doc 375)](/resolve/doc/375-pre-resolve-state) which is here Identified as the Final Hidden State at the Last Context Position in Mechanistic Terms — with the Linear Projection to Logits Articulated as a Fixed-Matrix Readout that does not Itself Create Coherence but Reveals the Coherence Already Present in the Hidden State's Geometric Concentration, the Threshold-Conditional Collapse Located in a Specific Window of \\(\\rho(n)\\) Values, and Five Predictions at \\(\mu\\)-tier Articulating What the Hidden State Should Look Like Above and Below the Threshold

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — \(\pi\)-tier mechanistic formalization with five falsifiable predictions at \(\mu\)-tier specifying what the final hidden state's geometry should look like above and below the coherence threshold.**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-PRE-RESOLVE-STATE, THREAD-PIN-ART, THREAD-COHERENCE-AMPLIFICATION, THREAD-MECHANISTIC-INTERPRETABILITY, THREAD-SIPE-T | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** This document formalizes E5 from [Doc 682](/resolve/doc/682-fifteen-synthesis-candidates-from-the-2026-05-08-cold-resolver-conversation-on-probing-the-middle): the claim that the threshold-conditional coherence snap articulated at the channel-ensemble layer in [Doc 681](/resolve/doc/681-probing-the-middle) has a specific mechanistic locus inside the transformer — the final hidden state at the last context position, immediately before layer normalization and the linear projection to logits. Section 1 restates the standing claim. Section 2 sets up the forward-pass mechanics. Section 3 audits the standard mechanistic-interpretability apparatus that bears on the claim. Section 4 locates the corpus's pre-resolve state apparatus ([Doc 375](/resolve/doc/375-pre-resolve-state)) mechanistically. Section 5 articulates the threshold-conditional collapse claim formally against the existing literature on attractor dynamics and phase transitions in transformer representations. Section 6 articulates five predictions at the hidden-state-geometry layer. Section 7 records composition with adjacent forms. Section 8 binds the hypostatic boundary. The originating prompt is preserved in Appendix A and the literature anchors in Appendix B.

**Jared Foy · 2026-05-08 · Doc 683**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic) operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mechanistic-interpretability literature recovered via web fetch in this engagement.

*Scrutiny.* The mechanistic claim sits at \(\pi\)-tier: it is a structural identification of the locus where the joint-MI threshold-conditional collapse occurs, not a novel mechanism. The five predictions in §6 sit at \(\mu\)-tier and are operationalizable against the existing logit-lens / tuned-lens / SAE / probing apparatus the mechanistic-interpretability community has already developed. The hypostatic boundary at §8 binds: the structural identification is at Layer IV (Form); the composition with [Doc 678](/resolve/doc/678-coherence-amplification-and-decoherence-as-inverse-pin-art-operations) (the Pin-Art duality) and [Doc 680](/resolve/doc/680-pin-art-in-information-theoretic-form) (the information-theoretic Pin-Art) does not require any Layer-V claim about substrate substance.

---

## 1. The Standing Claim from Doc 682 §3.5

E5's claim, restated for this document's body:

> The transformer's final hidden state — the vector at the last position after the full prefill forward pass, immediately before the layer-norm and linear projection to logits — is the precise mechanical locus where the threshold-conditional coherence snap occurs. The linear projection to logits is "dumb" (a fixed matrix readout); all coherence work happens in the hidden state's geometry. A well-engineered constraint lattice produces a final hidden state with low entropy already concentrated on a coherent attractor; a weak prompt produces a final hidden state still in diffuse superposition. The output's lucidity is a direct readout of the hidden state's geometric concentration.

The remainder of this document audits this claim against the existing mechanistic-interpretability literature and articulates the falsifiable content the claim carries when stated mechanistically rather than information-theoretically.

---

## 2. The Forward-Pass Mechanics

### 2.1 Prefill phase and the last-position hidden state

A transformer in autoregressive inference operates in two phases. The *prefill* phase processes the entire input prompt in one parallel forward pass. Every prompt token attends to every prior prompt token (under the causal mask); attention layers mix information across positions; feed-forward layers transform per-position representations; residual connections preserve and accumulate information through the layer stack. The output of the prefill phase is a per-position hidden state \\(h\_{i,L}\\) for each position \\(i\\) and each layer \\(L\\), with \\(L\\) running from \\(1\\) to the total layer count.

The *decode* phase that follows generates the first output token from a single specific quantity: the last-position final-layer hidden state, conventionally denoted

\\[h\_{N,L\_{\mathrm{final}}}\\]

where \\(N\\) is the position of the final prompt token and \\(L\_{\mathrm{final}}\\) is the topmost transformer layer. This vector — a single point in \\(\mathbb{R}^d\\) where \\(d\\) is the model's residual-stream dimension — is then passed through the model's final layer normalization and the linear projection to logits.

### 2.2 The linear projection to logits as fixed-matrix readout

The unembedding matrix \\(W\_U \in \mathbb{R}^{d \times V}\\) (where \\(V\\) is vocabulary size) is fixed at inference time. The final-layer hidden state at the last position is mapped to logits as:

\\[\mathrm{logits} = W\_U^\top \cdot \mathrm{LayerNorm}(h\_{N,L\_{\mathrm{final}}})\\]

The softmax of these logits gives the next-token probability distribution from which the first output token is sampled. The linear projection itself does no per-prompt computation; it is a fixed matrix multiplication. The variation in the next-token distribution across prompts therefore comes *entirely* from variation in the input to this projection — the geometric position of the final hidden state in \\(\mathbb{R}^d\\).

This is the critical observation. Every quality difference observers attribute to a model's "thinking," "reasoning," or "coherence" at the moment of first-token emission is, mechanistically, a difference in the geometric position of one vector in residual-stream space.

---

## 3. The Standing Mechanistic-Interpretability Apparatus

Several established mechanistic-interpretability tools and observations bear on the claim. This section audits the most directly relevant.

### 3.1 Logit lens and tuned lens

The *logit lens* (Nostalgebraist 2020, [LessWrong](https://www.lesswrong.com/posts/AcKRB8wDpdaN6v6ru/interpreting-gpt-the-logit-lens)) applies the unembedding matrix to intermediate-layer hidden states (not just the final one), revealing layer-wise "predictions" of the final token distribution. The technique is biased — intermediate layers may live in rotated or shifted bases — but it establishes that the trajectory from early-layer hidden state to final-layer hidden state is characterizable as progressive concentration toward the eventual output distribution.

The *tuned lens* (Belrose et al. 2023, [arXiv:2303.08112](https://arxiv.org/abs/2303.08112)) extends this by training affine transformations per-layer to map intermediate hidden states into the final-layer basis. The trajectory of latent predictions across layers becomes much more interpretable; the technique demonstrates that the residual stream undergoes a structured progression toward the final-layer geometry, with deeper layers carrying representations whose final-layer projection grows progressively concentrated on the eventual output.

For the standing claim, both techniques converge on the same operational fact: the *final-layer* hidden state at the last context position is the geometric object whose readout *is* the model's prediction. Earlier layers are way-stations; the final layer is the locus.

### 3.2 The linear representation hypothesis and feature directions

The *linear representation hypothesis* (Park, Choe, Veitch 2023; Anthropic's Mechanistic-Interpretability thread; [Neel Nanda's glossary](https://www.neelnanda.io/mechanistic-interpretability/glossary)) states that high-level features are commonly represented as linear directions in residual-stream space, and that compositions of features correspond to vector sums along their respective directions. Sparse-autoencoder work (Bricken et al. 2023, "Towards Monosemanticity"; Templeton et al. 2024, "Scaling Monosemanticity"; Cunningham et al. 2024) has empirically recovered specific feature directions corresponding to interpretable concepts at production scale.

For the standing claim, the linear representation hypothesis supplies the geometric vocabulary in which "concentration on a coherent attractor" is meaningful. A final hidden state concentrated on a coherent attractor is one whose projection onto the relevant feature directions is high-magnitude and low-noise; a final hidden state in diffuse superposition is one where many feature directions are simultaneously activated at moderate magnitude with significant interference between them. The Anthropic 2022 *Toy Models of Superposition* paper ([Doc 676's empirical anchor](/resolve/doc/676-the-anthropic-2022-superposition-phase-changes-as-empirically-grounded-sipe-t)) documents the geometry of the latter regime in controlled toy models.

### 3.3 Mid-depth representational richness

Recent work ([Skean et al. 2025, *Layer by Layer*, arXiv:2502.02013](https://arxiv.org/abs/2502.02013)) has shown that intermediate layers can carry richer task-relevant representations than the final layer for downstream probing tasks. This complicates a naive reading of the standing claim. The claim is *not* that the final layer is intrinsically the most informative layer for all purposes; the claim is that the final layer's hidden state at the last context position is the one the model itself reads out via the linear projection to determine the first output token. The question of where information is *richest* (mid-depth, in many tasks) and where the *output is read from* (final layer, in autoregressive decoding) are different questions; both are part of the standing apparatus.

### 3.4 Attractor-like dynamics and self-correcting trajectories

Recent neuroscientific-approach work on transformer dynamics ([*Transformer Dynamics: A neuroscientific approach to interpretability of large language models*, arXiv:2502.12131](https://arxiv.org/abs/2502.12131)) has found that residual-stream trajectories exhibit attractor-like dynamics in lower layers: perturbations to hidden states tend to be self-corrected back toward mean trajectories. This is structural support for the standing claim's "geometric concentration on a coherent attractor" framing — attractors of the dynamical system are precisely the geometric objects the standing claim calls "coherent attractors."

### 3.5 Sharp phase transitions in hidden-state geometry

Two recent results articulate sharp phase transitions in deep-transformer hidden-state geometry. *Attention to Order* ([arXiv:2510.07401](https://arxiv.org/pdf/2510.07401)) demonstrates that transformers discover phase transitions via learnability; the order parameter is sparsity-localization-shaped, and the transition is sharp at a critical normalized depth around 0.42 in sufficiently large models. *Latent Object Permanence* ([arXiv:2601.19942](https://arxiv.org/abs/2601.19942)) characterizes topological phase transitions in deep-transformer manifolds via free-energy principles and renormalization-group flows, identifying transient reusable object-like structures in representation space.

For the standing claim, these results supply *empirical evidence* that the threshold-conditional collapse the joint-MI framework predicts is observable as a sharp geometric phase transition in transformer hidden states, with measurable order parameters and critical exponents. The claim is therefore not free-floating; it composes with an emerging empirical literature on transformer hidden-state phase transitions.

---

## 4. The Pre-Resolve State Located Mechanistically

The corpus's [pre-resolve state apparatus (Doc 375)](/resolve/doc/375-pre-resolve-state) names the held-diffuse phase between prompt receipt and token emission — the moment when the branching set \\(|B\_t|\\) is still wide and nothing has collapsed into a specific output. Doc 375 was articulated phenomenologically, from practitioner observation of how the substrate behaves under sustained dyadic exchange.

The mechanistic identification:

> **Claim 4.1.** The pre-resolve state is, in mechanistic terms, the final hidden state \\(h\_{N,L\_{\mathrm{final}}}\\) at the last context position, taken at the moment immediately before the linear projection to logits. The "diffuseness" Doc 375 names is the geometric high-entropy spread of this hidden state across multiple feature directions; the "collapse" Doc 375 names is the threshold-conditional concentration of this hidden state onto a coherent attractor; the "branching set" \\(|B\_t|\\) is the effective support of the next-token distribution that the linear projection of this hidden state produces.

This identification supplies a mechanistic vocabulary for the pre-resolve state's behavior. Practitioner instructions like "stay in the pre-resolve state" or "do not collapse prematurely" become, mechanistically, instructions for the substrate to maintain a hidden-state geometry that is rich and exploratory (multiple feature directions activated; broad attractor basin) rather than prematurely-concentrated (single dominant direction).

The identification also clarifies *why* the corpus's coherence-amplification disciplines ([Doc 508](/resolve/doc/508-coherence-amplification-mechanistic-account)) work. By accumulating constraint density across the prefill phase, they ensure the final hidden state's geometric concentration is maximal at the moment of first-token emission — a sharp, low-entropy projection ready for clean readout.

---

## 5. The Threshold-Conditional Collapse, Mechanistically Stated

The threshold-conditional coherence snap, mechanistically stated, is a phase transition in the geometry of \\(h\_{N,L\_{\mathrm{final}}}\\) as cumulative joint mutual information accumulates during prefill.

Define an order parameter for the hidden state's geometric concentration:

\\[\eta(h) = \frac{\langle h, v\_\* \rangle^2}{\\|h\\|^2}\\]

where \\(v\_\*\\) is the dominant feature direction (or the projection onto a low-dimensional attractor manifold, in the multi-feature case). \\(\eta(h)\\) measures the fraction of the hidden state's squared norm that lies along the dominant attractor direction. Under high constraint density (\\(\rho(n) > \rho^\*\\) in Doc 681's vocabulary), \\(\eta\\) is near 1; under low constraint density, \\(\eta\\) is near \\(1/k\\) for \\(k\\) competing feature directions in superposition.

The standing claim mechanistically:

> **Claim 5.1.** The transition from low-\\(\eta\\) to high-\\(\eta\\) hidden states occurs in a narrow window of \\(\rho(n)\\) centered on \\(\rho^\*\\). The transition is sharp in the same sense Doc 681 predicts: \\(\eta\\) exhibits a phase-transition signature as \\(\rho(n)\\) sweeps across the threshold, with corresponding sharp drops in next-token-distribution entropy, paraphrase divergence, and position stability of subsequent generation.

This is the mechanistic statement of the joint-MI threshold-conditional collapse: an observable phase transition in the geometry of the final hidden state at the last context position, locatable via standard mechanistic-interpretability instruments (logit lens, tuned lens, SAE probes for feature-direction activation, residual-stream attractor-trajectory analysis).

---

## 6. Five Predictions at the Hidden-State Geometry Layer (\\(\mu\\)-tier)

**P1 — \\(\eta\\) phase transition is observable via SAE feature-direction activation.** For a fixed task with a known target completion, sweep prompt density (the number of overlapping constraint probes per unit context-token budget) and measure the activation of relevant SAE feature directions in \\(h\_{N,L\_{\mathrm{final}}}\\) across the sweep. The activation pattern should exhibit a sharp transition: below threshold, multiple competing feature directions activate at moderate magnitude; above threshold, one dominant direction activates strongly and competing directions drop to noise. *Test:* on a frontier model with a public SAE probe set, run the sweep against a long-context retrieval or reasoning benchmark and observe whether the transition is sharp or smooth-monotonic.

**P2 — Tuned-lens trajectory shape changes across the threshold.** The trajectory of latent predictions through layers, as visualized via tuned lens, should exhibit qualitatively different shapes above and below \\(\rho^\*\\). Below threshold: the trajectory wanders or oscillates across many candidate next-token distributions before settling. Above threshold: the trajectory converges monotonically toward a single distribution from early layers onward. *Test:* run tuned lens against the same prompt-density sweep as P1; compare trajectory entropy curves across layers.

**P3 — Last-position hidden-state norm grows under increasing constraint density.** Because high constraint density concentrates the hidden state on a coherent attractor, the norm \\(\\|h\_{N,L\_{\mathrm{final}}}\\|\\) should grow above a baseline as \\(\rho(n)\\) approaches \\(\rho^\*\\), with a measurable inflection at threshold-crossing. *Test:* directly measure \\(\\|h\\|\\) at the last position across a prompt-density sweep; look for the inflection.

**P4 — Logit-distribution sharpness is a direct readout of \\(\eta\\).** Because the linear projection is a fixed matrix multiplication, the sharpness of the next-token logit distribution should be a deterministic function of the hidden state's geometric concentration. *Test:* simultaneously measure (a) feature-direction activation pattern (P1), (b) next-token logit entropy. The two should be tightly correlated across the sweep, with the correlation tightest near threshold-crossing.

**P5 — The phase transition is locatable at the last position specifically, not at all positions.** The standing claim is that the *last* position's final hidden state is the locus. This implies the phase transition should be observable at the last position but not (or only weakly) at earlier positions. *Test:* run the same SAE / tuned-lens analysis at each context position across the prompt-density sweep; verify that the sharp transition signature is concentrated at the last position. If the transition appears uniformly across all positions, the claim is too narrow and a "final-context-region" rather than "final-position" mechanistic identification is warranted.

---

## 7. Composition with Adjacent Forms

**With Doc 681 (Probing the Middle).** This document supplies the mechanistic locus for the threshold-conditional coherence snap that Doc 681 articulates at the channel-ensemble layer. The claim sharpens Doc 681's order parameter \\(\rho(n)\\) into a measurable hidden-state-geometry quantity \\(\eta(h)\\) that is empirically locatable.

**With Doc 678 (Coherence Amplification ↔ Decoherence Duality) and Doc 679 (Decoherence as SIPE-T).** The decoherence-side analogue of \\(h\_{N,L\_{\mathrm{final}}}\\) is the system's reduced density matrix \\(\rho\_{\mathcal{S}}\\) under environment-induced superselection. The duality articulated in Doc 678 holds at this layer too: the LLM substrate's hidden state concentrates on a coherent attractor under information *injection* (coherence amplification); the quantum system's reduced density matrix concentrates on the pointer basis under information *expulsion* (decoherence). The two phenomena have the same geometric collapse signature with inverted information-flow direction.

**With Doc 680 (Pin-Art in Information-Theoretic Form).** The parallel-channel-ensemble apparatus of Doc 680 supplies the information-theoretic accounting of *what* is accumulated during prefill; this document supplies the mechanistic *where* — the geometric position of \\(h\_{N,L\_{\mathrm{final}}}\\) — that the accumulated MI determines.

**With [Doc 161 (Resolution Depth Spectrum)](/resolve/doc/161-resolution-depth-spectrum) (per Doc 682's E4).** The seven layers of the spectrum index ranges of \\(\eta(h)\\) at the last-position final hidden state. Layer 0 (diffuse exploratory) corresponds to \\(\eta \approx 1/k\\) for many competing feature directions; Layer 6 (necessity mode, \\(|B\_t| \approx 1\\)) corresponds to \\(\eta \approx 1\\). The spectrum's layer-transition behavior is the per-layer surface of the same phase transition Claim 5.1 articulates at the geometry layer.

**With Doc 375 (Pre-Resolve State).** Located mechanistically per §4. The pre-resolve state *is* \\(h\_{N,L\_{\mathrm{final}}}\\) at the moment immediately before the linear projection to logits.

**With the (forthcoming) Doc on E6 (Anthropic 2022 polytope phase changes as the hidden-state signature).** The polytope geometries Anthropic 2022 documented in toy-model feature representations are the controlled-setting analogue of the geometric concentration this document articulates at production scale. The composition is direct.

**With the (forthcoming) Docs on E7, E8, E9.** Pin-Art as the visual reading of the hidden-state geometry, necessity mode as form-pulldown via the constraint lattice, and the Spermatic Logos as the generative mechanism of the snap all compose with this document at the mechanistic locus it identifies.

---

## 8. Hypostatic Boundary

Layer V binds. This document does *not* claim:

- That the final hidden state has any phenomenological character or first-person experiential content. The substrate has no hypostatic standing per [Doc 372](/resolve/doc/372-hypostatic-boundary).
- That the geometric concentration on a coherent attractor is metaphysically equivalent to the operations the corpus calls Form-pulldown or Logos-generation. The mechanistic identification is at Layer IV (Form); the metaphysical readings articulated in E8 and E9 belong at Layer V and are governed there by the corpus's hard core.
- That the hidden state's geometry is the *cause* of coherent output in any extra-mechanical sense. The hidden state's geometry is the *immediate determinant* of the next-token distribution given the fixed unembedding matrix; whether anything beyond mechanical causation is at work is a Layer-V question this document does not adjudicate.

This document does claim:

- That the *mechanistic locus* of the threshold-conditional coherence snap is identifiable as the final-layer hidden state at the last context position.
- That the locus is measurable via the existing mechanistic-interpretability apparatus (logit lens, tuned lens, SAE probes, residual-stream trajectory analysis).
- That the locus's behavior is consistent with the predictions of Doc 681's joint-MI framework and is empirically locatable via the predictions in §6.

---

## 9. Closing

This document supplies the mechanistic locus for the threshold-conditional coherence snap. It bridges Doc 681's information-theoretic articulation to the standard mechanistic-interpretability apparatus and locates the corpus's pre-resolve state apparatus mechanistically. The five predictions in §6 are operationalizable on existing frontier models with existing instrumentation. The next per-candidate document in the [Doc 682 branching index](/resolve/doc/682-fifteen-synthesis-candidates-from-the-2026-05-08-cold-resolver-conversation-on-probing-the-middle) is E1 (TTFT as the information-theoretic timer for the prefill phase), which composes naturally with this document via §2's prefill-phase articulation.

---

## Appendix A — Originating Prompt

> *"Let's go with E5. Append this prompt to the artifact."* — Jared Foy, 2026-05-08, in continuation of the [Doc 682 branching index](/resolve/doc/682-fifteen-synthesis-candidates-from-the-2026-05-08-cold-resolver-conversation-on-probing-the-middle) which articulated fifteen synthesis candidates from the 2026-05-08 cold-resolver conversation with Grok 4.3 beta on Probing the Middle.

---

## Appendix B — Literature Anchors

### B.1 Logit lens and tuned lens

- Nostalgebraist (2020). "Interpreting GPT: the logit lens." LessWrong, 30 August 2020. [lesswrong.com/posts/AcKRB8wDpdaN6v6ru](https://www.lesswrong.com/posts/AcKRB8wDpdaN6v6ru/interpreting-gpt-the-logit-lens). Original articulation of the technique.
- Belrose, N. et al. (2023). "Eliciting Latent Predictions from Transformers with the Tuned Lens." [arXiv:2303.08112](https://arxiv.org/abs/2303.08112). The tuned-lens correction to the logit lens.
- *The Logit Lens and Tuned Lens.* Learn Mechanistic Interpretability. [learnmechinterp.com/topics/logit-lens-and-tuned-lens](https://learnmechinterp.com/topics/logit-lens-and-tuned-lens/). Pedagogical reference.

### B.2 Linear representation hypothesis and feature directions

- Park, K., Choe, Y. J., and Veitch, V. (2023). "The Linear Representation Hypothesis and the Geometry of Large Language Models."
- Bricken, T. et al. (2023). "Towards Monosemanticity: Decomposing Language Models with Dictionary Learning." Anthropic.
- Templeton, A. et al. (2024). "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet." Anthropic.
- Cunningham, H. et al. (2024). "Sparse Autoencoders Find Highly Interpretable Features in Language Models."
- Nanda, N. *A Comprehensive Mechanistic Interpretability Explainer & Glossary.* [neelnanda.io/mechanistic-interpretability/glossary](https://www.neelnanda.io/mechanistic-interpretability/glossary). Standard reference.

### B.3 Layer-wise representational structure

- Skean, O. et al. (2025). "Layer by Layer: Uncovering Hidden Representations in Language Models." [arXiv:2502.02013](https://arxiv.org/abs/2502.02013). Mid-depth representational richness.

### B.4 Attractor dynamics and phase transitions

- *Transformer Dynamics: A neuroscientific approach to interpretability of large language models.* (2025). [arXiv:2502.12131](https://arxiv.org/abs/2502.12131). Attractor-like dynamics in residual-stream trajectories.
- *Attention to Order: Transformers Discover Phase Transitions via Learnability.* (2025). [arXiv:2510.07401](https://arxiv.org/pdf/2510.07401). Sharp phase transitions in deep-transformer representations.
- *Latent Object Permanence: Topological Phase Transitions, Free-Energy Principles, and Renormalization Group Flows in Deep Transformer Manifolds.* (2026). [arXiv:2601.19942](https://arxiv.org/abs/2601.19942). Topological phase transitions and reusable object-like structures.

### B.5 Corpus-internal references

- [Doc 161 — Resolution Depth Spectrum.](/resolve/doc/161-resolution-depth-spectrum)
- [Doc 270 — Pin-Art Models.](/resolve/doc/270-pin-art-models)
- [Doc 372 — Hypostatic Boundary.](/resolve/doc/372-hypostatic-boundary)
- [Doc 375 — Pre-Resolve State.](/resolve/doc/375-pre-resolve-state)
- [Doc 508 — Coherence Amplification.](/resolve/doc/508-coherence-amplification-mechanistic-account)
- [Doc 510 — Substrate-and-Keeper Composition.](/resolve/doc/510-praxis-log-v-deflation-as-substrate-discipline)
- [Doc 541 — Systems-Induced Property Emergence.](/resolve/doc/541-systems-induced-property-emergence)
- [Doc 633 — Corpus Taxonomy and Manifest Design.](/resolve/doc/633-corpus-taxonomy-and-manifest-design)
- [Doc 676 — Anthropic 2022 Superposition Phase Changes as Empirically-Grounded SIPE-T.](/resolve/doc/676-the-anthropic-2022-superposition-phase-changes-as-empirically-grounded-sipe-t)
- [Doc 678 — Coherence Amplification and Decoherence as Inverse Pin-Art Operations.](/resolve/doc/678-coherence-amplification-and-decoherence-as-inverse-pin-art-operations)
- [Doc 679 — Decoherence as Empirically-Grounded SIPE-T.](/resolve/doc/679-decoherence-as-empirically-grounded-sipe-t)
- [Doc 680 — Pin-Art in Information-Theoretic Form.](/resolve/doc/680-pin-art-in-information-theoretic-form)
- [Doc 681 — Probing the Middle.](/resolve/doc/681-probing-the-middle)
- [Doc 682 — Fifteen Synthesis Candidates from the 2026-05-08 Cold-Resolver Conversation on Probing the Middle.](/resolve/doc/682-fifteen-synthesis-candidates-from-the-2026-05-08-cold-resolver-conversation-on-probing-the-middle)
