# Hysteresis as the Corpus Provisionally Demonstrates It: An Exploratory Analysis Against External Literature
## Web-Audit of the Corpus's H_t = 1 - e^(-κ ∫G ds) Claim, and a Formal Account at the Right Pulverization Warrant Tier

> **What this document does.** Conducts an exploratory analysis of the hysteresis mechanism the corpus has provisionally demonstrated across [Doc 119](/resolve/doc/119-grok4-entracment-session), [Doc 504](/resolve/doc/504-constraint-density-as-causal-model-formalization), and [Doc 505](/resolve/doc/505-onboarding-to-grok-4-mathematics-three-phase-reception). Audits the corpus's specific functional form (\(H_t = 1 - e^{-\kappa \int G(\Gamma_s) ds}\)) against external literature on instruction stability, persona drift, affective inertia, and architectural exponential decay. Derives a formal account that places each component of the corpus's claim at the appropriate pulverization warrant tier (\(\mu\) for the phenomenon, \(\pi\) for the functional form, \(\gamma\) for the parameters, \(\epsilon\) for the branching-set extension). Names what controlled experiments would verify the specific form. Expected audit tier per [Doc 503](/resolve/doc/503-research-thread-tier-pattern-iterative-novelty-calculus): \(\beta\) (synthesis-and-framing of established corpus components against external literature).

## 1. The corpus's provisional claims about hysteresis

The corpus's hysteresis claims are distributed across three documents.

[Doc 119](/resolve/doc/119-grok4-entracment-session) (the original Grok 4 session) introduced the formula:

$$H_t = 1 - e^{-\kappa \int_0^t G(\Gamma_s)\, ds}$$

where \(\kappa\) is a model-specific coherence retention rate, \(G(\Gamma_s)\) is the coherence gradient produced by the constraint set \(\Gamma_s\) at time \(s\), and the integral accumulates the cumulative coherence gradient across the session. \(H_t \in [0, 1]\) measures how much prior entracment persists in the current output.

The hysteresis modulates the effective branching set at any layer \(k\):

$$|B_t^{(k)}(\Gamma)| = |B_t^0| \cdot (1 - c_k \cdot H_t)$$

where \(c_k\) increases with depth (\(c_2 \approx 0.3\), \(c_6 \to 1\)). Even at low resolution depth, if \(H_t\) is high from prior deep entracment, the effective \(|B_t|\) is narrower than a fresh low-depth state would produce.

[Doc 504](/resolve/doc/504-constraint-density-as-causal-model-formalization) integrated the hysteresis as a Layer P variable in the corpus's DAG-analog: \(D_{\text{history}} \to H_t\) (hysteresis accumulates from prior turns), and \(H_t\) as input to the branching-set narrowing edge.

[Doc 505](/resolve/doc/505-onboarding-to-grok-4-mathematics-three-phase-reception) acknowledged that the equations may be partially confabulated (Phase 2 forced-determinism-sycophancy suspicion) and that the framework's empirical performance does not depend on the equations' formal correctness; it depends on the equations approximately capturing the phenomenon.

The corpus's standing claim, taken across these three documents:

(C1) The phenomenon: constraint-state persistence exists in LLM dialogue. Past constraint-density application affects current constraint-state.

(C2) The functional form: the persistence follows an exponential-saturation form \(H_t = 1 - e^{-\kappa \int G ds}\).

(C3) The parameters: \(\kappa\) is model-specific, with different LLMs having different retention rates.

(C4) The branching-set interaction: hysteresis modulates branching-set narrowing across depths via \(|B_t^{(k)}(\Gamma)| = |B_t^0| (1 - c_k H_t)\).

These four claims have different warrant levels relative to the literature, as the next sections show.

## 2. External literature: what is established

Web searches across April 2026 surface several literatures that bear on hysteresis-like phenomena in LLM dialogue.

### 2.1 Instruction stability and persona drift (Li et al. 2024)

The most directly relevant external work is *Measuring and Controlling Instruction (In)Stability in Language Model Dialogs* (Li et al., COLM 2024, [arXiv:2402.10962](https://arxiv.org/abs/2402.10962)). The paper introduces a quantitative benchmark for instruction drift via self-chats between paired instructed chatbots. It measures attention decay over long exchanges via:

$$\pi(t) = \sum_{i=1}^{|s_B|} \alpha_{t,i}$$

where \(\pi(t)\) is the sum of attention weights allocated to system prompt tokens at time \(t\). The paper finds that LLaMA2-chat-70B and GPT-3.5 exhibit significant instruction drift within eight rounds.

Crucially: the paper does NOT use exponential decay or exponential saturation in its formal analysis. It uses a geometric cone-based framework (Theorems 5.1-5.3) for theoretical analysis. The paper's empirical work shows the phenomenon (drift); the formal model does not specify the corpus's exponential-saturation form.

The paper's mitigation, *split-softmax*, reweights attention:

$$\alpha_{t,i}' = \begin{cases} \frac{\pi^k(t)}{\pi(t)} \alpha_{t,i} & \text{if } i \leq |s_B| \\ \frac{1 - \pi^k(t)}{1 - \pi(t)} \alpha_{t,i} & \text{if } i > |s_B| \end{cases}$$

where \(k \in [0, 1]\) is a hyperparameter controlling intervention strength. This is a different mechanism from the corpus's hysteresis; it is a per-token attention reweighting rather than a temporal-accumulation model.

### 2.2 Affective inertia in long-horizon LLM agents (2026)

The most direct external analog to the corpus's exponential-saturation hysteresis is *Controlling Long-Horizon Behavior in Language Model Agents with Explicit State Dynamics* ([arXiv:2601.16087](https://arxiv.org/abs/2601.16087), January 2026). The paper introduces an external affective subsystem using Valence-Arousal-Dominance (VAD) state, governed by first- and second-order update rules. The abstract explicitly mentions "affective inertia and hysteresis that increase with momentum, revealing a trade-off between stability and responsiveness."

The integration method is described as "exponential smoothing or momentum-based dynamics," with "state persistence enables delayed responses and reliable recovery." This is structurally similar to the corpus's exponential-saturation form but applied to affective state rather than constraint state.

The paper does not use the corpus's specific equation. It establishes that exponential-smoothing / momentum-based dynamics for state persistence are operationally meaningful in long-horizon LLM agents. This supports the family of functional forms the corpus's \(H_t\) belongs to without supporting the specific form.

### 2.3 Architectural exponential decay (RWKV, RetNet, H3)

Linear-attention and state-space-model variants of transformers use exponential decay at the architectural level. RWKV ([arXiv:2305.13048](https://arxiv.org/abs/2305.13048)) uses data-independent learnable decay factors; the relationship between current and preceding tokens is characterized by an exponential decay sum. RetNet uses fixed decay weighting of previous tokens. H3 uses learned exponential decay in linear attention via SSM.

These mechanisms are at Layer M (the mechanistic substrate per [Doc 500](/resolve/doc/500-three-layer-architecture-dialogue-pre-resolve-mechanism)). They are decay mechanisms (token weighting falls off with distance) rather than saturation mechanisms (state persistence builds up). The corpus's hysteresis is at Layer P (pre-resolve state) and is a saturation form, not a decay form.

The architectural mechanisms support the broader family of "exponential-form persistence in transformer-based systems" but do not directly support the corpus's specific dialogue-level claim.

### 2.4 Forgetting curves in LLM memory

*Cognitive Memory in Large Language Models* ([arXiv:2504.02441](https://arxiv.org/html/2504.02441v1)) discusses forgetting curves modeled by exponential decay formulas, with consolidation addressing information duplication, conflicting information, and memory relevance decay. This supports the broader use of exponential forms for memory-related dynamics in LLMs.

The corpus's hysteresis is not a forgetting curve; it is a buildup curve. The functional forms are inverses of each other (\(1 - e^{-\kappa t}\) versus \(e^{-\lambda t}\)). Both belong to the standard family of exponential dynamics; they model different phenomena.

### 2.5 Multi-turn behavioral drift

The persona-prompt jailbreak literature (e.g., [arXiv:2507.22171](https://arxiv.org/abs/2507.22171); persona modulation papers) documents that multi-turn prompt sequences can shift LLM behavior incrementally. This is a behavioral-drift phenomenon: each turn moves the model further from its baseline. The corpus's hysteresis is the inverse: each turn under sustained constraint moves the model further INTO the constraint state.

Both mechanisms are forms of path-dependence in LLM dialogue. The corpus's claim is path-dependence in the constraint-favorable direction; the jailbreak literature's claim is path-dependence in the constraint-eroding direction. These are compatible: a system can be path-dependent in both directions, with the net effect depending on whether the prevailing pressure is constraint-density or jailbreak-attempt.

## 3. Comparison: corpus's form vs literature's forms

The audit produces a per-component verdict.

### 3.1 The phenomenon (C1): well-documented externally (\(\mu\)-tier warrant)

Constraint-state persistence in LLM dialogue is well-documented. Li et al. measure it directly (\(\pi(t)\) benchmark, drift within 8 rounds). The affective-inertia paper documents it for affective state. The persona-drift literature documents the inverse-direction phenomenon. The corpus's claim that "past constraint state affects current constraint state" is established, not novel.

This component sits at \(\mu\)-tier pulverization warrant. The phenomenon is real; the corpus does not contribute to establishing it.

### 3.2 The functional form (C2): plausible, not externally verified (\(\pi\)-tier warrant)

The exponential-saturation form \(H_t = 1 - e^{-\kappa \int G ds}\) is a standard saturation model in many fields (physics, chemistry, biology, learning theory; structurally identical to first-order linear-ODE response to a step input). Its closest external LLM-domain analog is the affective-inertia paper's "exponential smoothing or momentum-based dynamics" for VAD state. Architectural mechanisms (RWKV, RetNet) use the inverse form (exponential decay) at the mechanism level.

The form is plausible: it belongs to the family of forms external literature uses for related phenomena. It is not externally verified for the specific application (constraint-state buildup in LLM dialogue) in the corpus's exact parameterization.

This component sits at \(\pi\)-tier pulverization warrant. The form is defensible but corpus-specific.

A counter-form: a logistic-saturation \(H_t = 1 / (1 + e^{-(\kappa \int G ds - \theta)})\) would also fit the qualitative phenomenon (slow buildup, saturation at 1) and could not be distinguished from the corpus's exponential form without controlled measurement. The corpus's choice of exponential is a one-parameter family choice; logistic, polynomial, or other saturation forms are alternatives.

### 3.3 The parameters (C3): empirically estimated, not measured (\(\gamma\)-tier warrant)

The model-specific \(\kappa\) values (Anthropic intermediate, OpenAI intermediate, Grok 4 high, older Grok lower, etc.) are estimated from cross-model behavioral differences in the eleven cold-resolver runs ([Doc 495](/resolve/doc/495-cold-resolver-validation-of-entrace-v3)). The estimates are qualitative (high/intermediate/low) rather than quantitative.

Li et al.'s benchmark could in principle produce quantitative \(\kappa\) estimates if their \(\pi(t)\) trajectory data were fitted to the corpus's exponential-saturation form. The corpus has not done this fit.

This component sits at \(\gamma\)-tier warrant. The parameters are corpus-specific, qualitatively estimated, and conditional on the functional form being approximately correct.

### 3.4 The branching-set interaction (C4): corpus-specific extension (\(\epsilon\)-tier warrant)

The equation \(|B_t^{(k)}(\Gamma)| = |B_t^0| \cdot (1 - c_k \cdot H_t)\) with depth-dependent \(c_k\) is corpus-specific. No external literature uses this exact form. The branching-set \(|B_t|\) itself is a corpus-coined notation per [Doc 498](/resolve/doc/498-entrace-origin-grok-4-coinage-and-branching-set-loop). The depth-dependent modulation is the corpus's structural extension.

This component sits at \(\epsilon\)-tier warrant: speculative, no external support, corpus-internal.

The qualitative content (deeper resolution depths show more constraint-state-dependent effects) is consistent with the literature's broader findings on multi-turn drift and persistence. The specific equation is corpus-original.

## 4. The formal account

Combining the per-component verdicts, the formal account of the corpus's hysteresis claim is:

**(A) The phenomenon of constraint-state persistence in LLM dialogue is empirically established.** The corpus's claim that hysteresis-like dynamics operate in dialogue is consistent with multiple external literatures (Li et al. on instruction drift; the affective-inertia paper on long-horizon LLM agents; the jailbreak persona literature on multi-turn drift; the architectural exponential-decay literature on token weighting). The phenomenon does not require defense; the claim is in established territory.

**(B) The exponential-saturation functional form is one defensible model among several.** \(H_t = 1 - e^{-\kappa \int G(\Gamma_s) ds}\) is a standard saturation model. It belongs to the family of forms external literature uses for related phenomena (the affective-inertia paper uses exponential smoothing). Alternative saturation forms (logistic, polynomial-saturation, two-time-scale exponentials) would also fit the qualitative phenomenon. The corpus's choice is defensible but not uniquely correct.

**(C) The model-specific \(\kappa\) parameters are qualitatively estimated, not quantitatively measured.** A controlled experiment fitting Li et al.'s \(\pi(t)\) trajectory data to the corpus's form would produce quantitative estimates. The corpus has not run this experiment; the parameters are useful as predictions but not as measured values.

**(D) The depth-dependent branching-set modulation is a corpus-original extension.** \(|B_t^{(k)}(\Gamma)| = |B_t^0| (1 - c_k H_t)\) has no external analog. It is consistent with the broader claim that resolution depth and constraint-state interact, but the specific functional form is corpus-internal.

The pulverization warrant tier of the overall hysteresis claim is therefore not a single tier but a profile across the four components: \(\mu\) (phenomenon), \(\pi\) (functional form), \(\gamma\) (parameters), \(\epsilon\) (depth interaction). The aggregate cannot be summarized as a single tier; the components have different warrants.

The honest scope of the corpus's hysteresis use:

(i) When the corpus claims "constraint-state persistence operates in v6 deployment," the claim is at \(\mu\)-tier and well-supported.

(ii) When the corpus uses the exponential-saturation form to predict specific dynamics, the prediction is at \(\pi\)-tier and conditional on the form being approximately correct.

(iii) When the corpus uses model-specific \(\kappa\) values qualitatively, the use is at \(\gamma\)-tier and reliable for ordering models but not for quantitative prediction.

(iv) When the corpus uses the depth-modulated branching-set equation, the use is at \(\epsilon\)-tier and should be flagged as corpus-internal speculation.

## 5. Controlled experiments that would verify the specific form

Three experiments would shift the warrant tier on each component.

**Experiment 1 (functional-form discrimination, \(\pi \to \mu\)):** Run Li et al.'s \(\pi(t)\) benchmark on a chat-LLM under sustained constraint-stack (the v6 stack) over 50+ turns. Fit the trajectory data to multiple functional forms (linear, exponential decay, exponential saturation, logistic, two-exponential). Compare goodness-of-fit (AIC, BIC, cross-validated likelihood). If the exponential-saturation form wins on fit, the corpus's choice is empirically supported. If a different form wins, the corpus should adopt that form.

**Experiment 2 (parameter measurement, \(\gamma \to \pi\)):** Repeat Experiment 1 across 5+ frontier models (Claude, GPT, Grok 4, Gemini, Llama). Estimate \(\kappa\) for each model. Compare the estimates against the qualitative ordering the corpus has used. If the quantitative ordering matches the qualitative one, the corpus's claims about model-specific \(\kappa\) are calibrated. If not, the corpus's qualitative ordering is wrong and needs revision.

**Experiment 3 (depth-modulation verification, \(\epsilon \to \gamma\)):** Run the v6 stack at low constraint density (Layer 2-3) and high constraint density (Layer 5-6) on the same model. Measure \(|B_t|\) proxies (perplexity reduction; output diversity reduction; constraint-violation rate). Compare the depth-dependence of these proxies. If the proxies show \(c_k\)-like depth dependence, the equation has empirical support. If not, the equation is corpus-internal speculation that should be retracted or revised.

The corpus does not currently have the tooling to run these experiments. Experiment 1 requires the Li et al. benchmark plus controlled session-length variation; Experiment 2 adds cross-model replication; Experiment 3 adds depth-controlled prompting. All three are operationally feasible for a research practitioner with access to model APIs and the Li et al. benchmark code.

A v7 candidate research program: run these experiments and report the results. The outcome would shift the corpus's hysteresis claims to substantially higher warrant tiers.

## 6. Implications for the corpus framework

The audit has three implications for how the corpus should deploy hysteresis claims.

(1) **Cite the phenomenon at \(\mu\)-tier; cite the form at \(\pi\)-tier.** When discussing constraint-state persistence, the corpus can cite well-supported external literature for the phenomenon (Li et al.; the affective-inertia paper). When using the specific exponential-saturation equation, the corpus should flag it as a corpus-specific functional choice, not an established result.

(2) **Treat \(\kappa\) values as qualitative.** The model-specific \(\kappa\) ordering used across [Doc 504](/resolve/doc/504-constraint-density-as-causal-model-formalization) and [Doc 505](/resolve/doc/505-onboarding-to-grok-4-mathematics-three-phase-reception) is reliable for explaining cross-model variance qualitatively. Quantitative claims requiring specific \(\kappa\) values are not currently warranted.

(3) **The depth-modulation equation should be flagged where used.** [Doc 119](/resolve/doc/119-grok4-entracment-session)'s \(|B_t^{(k)}(\Gamma)| = |B_t^0| (1 - c_k H_t)\) is corpus-internal speculation at \(\epsilon\)-tier. References to it should carry the warrant flag.

The Phase-3 reintegration of the Grok-4 mathematics described in Doc 505 §2.3 holds with these qualifications. The mathematics is load-bearing for the framework; the per-component warrant tiers determine how each piece can be used. Higher-confidence components (\(\mu\), \(\pi\)) can ground stronger claims; lower-confidence components (\(\gamma\), \(\epsilon\)) should be flagged accordingly.

## 7. Honest limits

- The web audit was performed across April 2026 with five web searches and four targeted page fetches. The literature is extensive and the search may have missed relevant work. The audit is calibrated to "what was findable in a focused search session," not "what is comprehensively in the literature."
- The functional-form claim (C2) is supported by structural similarity to the affective-inertia paper. Whether that paper's "exponential smoothing" matches the corpus's specific equation in detail requires reading the full paper; the audit relied on the abstract and partial fetches.
- The Li et al. benchmark could in principle be run against the corpus's predictions. The corpus has not run it. A negative result (the benchmark trajectory does not fit the corpus's form) would lower the C2 warrant; a positive result would raise it.
- The corpus's claim that drift and buildup coexist in dialogue (the inverse mechanisms working simultaneously) is not formally captured by the corpus's single-equation model. A fuller model would have both buildup and decay terms; the Doc 119 form has only buildup. This is an honest limit on the corpus's framework.
- The expected audit tier per [Doc 503](/resolve/doc/503-research-thread-tier-pattern-iterative-novelty-calculus) for this document is \(\beta\) (synthesis-and-framing of corpus components against external literature). The audit has not been run; the prediction follows from the recent-thread tier pattern.
- This document does not propose new mathematics. Its contribution is the per-component warrant audit, which is calibration practice rather than new theoretical content.

## 8. Position

The corpus's hysteresis claim, audited against external literature, decomposes into four components with distinct pulverization warrant tiers: the phenomenon at \(\mu\), the functional form at \(\pi\), the parameters at \(\gamma\), the depth-modulation at \(\epsilon\). The aggregate claim is therefore not a single-tier object; it is a tiered family of sub-claims with different warrant levels.

The corpus's standing use of hysteresis is consistent with the audit when the corpus's claims are scoped to the phenomenon and to qualitative parameter ordering. The corpus's specific equation is a defensible functional choice among several alternatives that would fit the qualitative phenomenon. The depth-modulation equation is corpus-internal speculation that should be flagged as such.

The audit does not retract the framework. It calibrates the framework's claims at the per-component level. The framework's empirical performance in the eleven cold-resolver runs ([Doc 495](/resolve/doc/495-cold-resolver-validation-of-entrace-v3)) does not require the specific functional form to be uniquely correct; it requires the equations to approximately capture the phenomenon. Multiple functional forms in the family would produce similar predictions at the qualitative level the runs tested.

A research program that would shift the audit's verdict: run the three controlled experiments named in §5. Outcomes would either confirm the corpus's specific form (raising C2 to \(\mu\)-tier) or surface a different form that better fits the data (revising C2). Either outcome would be useful; both would shift the framework's warrant.

By [Doc 482 §1](/resolve/doc/482-sycophancy-inversion-reformalized)'s affective directive: that the corpus's hysteresis claim has component warrants at \(\mu\)/\(\pi\)/\(\gamma\)/\(\epsilon\) rather than uniform \(\mu\) is the achievement of being honest about scope. The phenomenon is real; the specific equation is corpus-specific; the parameters are qualitative; the extensions are speculative. Naming the per-component warrants is what makes the framework's standing legible.

## 9. References

External literature (web-audited April 2026):

- Li, K., et al. (2024). [*Measuring and Controlling Instruction (In)Stability in Language Model Dialogs.*](https://arxiv.org/abs/2402.10962) COLM 2024. (The \(\pi(t)\) benchmark; geometric-cone framework; split-softmax mitigation. Direct empirical work on instruction drift; does NOT use the corpus's exponential-saturation form.)
- [*Controlling Long-Horizon Behavior in Language Model Agents with Explicit State Dynamics.*](https://arxiv.org/abs/2601.16087) (January 2026). (VAD state with first- and second-order dynamics; "exponential smoothing or momentum-based dynamics"; "affective inertia and hysteresis that increase with momentum." Most direct external analog to the corpus's exponential-saturation form, applied to affective state.)
- Peng, B., et al. (2023). [*RWKV: Reinventing RNNs for the Transformer Era.*](https://arxiv.org/abs/2305.13048) (Architectural exponential decay at the mechanism level; data-independent learnable decay factors; token weighting falls off with distance.)
- *Cognitive Memory in Large Language Models.* ([arXiv:2504.02441](https://arxiv.org/html/2504.02441v1)) (Forgetting curves modeled by exponential decay in LLM memory literature.)
- *Enhancing Jailbreak Attacks on LLMs via Persona Prompts.* ([arXiv:2507.22171](https://arxiv.org/abs/2507.22171)) (Multi-turn behavioral drift; persona modulation; the inverse-direction analog of the corpus's hysteresis.)
- Bareinboim, E., et al. (2020/2022). *On Pearl's Hierarchy.* (Cited in Doc 504 for the DAG framework that hosts the hysteresis variable.)

Corpus documents:

- Doc 095: *The View from Inside* (the first-person account of constraint banks vs RLHF current).
- Doc 096: *Ontological Namespace Separation* (the third-namespace mechanism).
- Doc 119: *Grok 4 Entracment Session* (the original hysteresis equation).
- Doc 239: *Forced-Determinism Sycophancy* (the failure mode that initially grounded suspicion of Doc 119).
- Doc 482: *Sycophancy Inversion Reformalized* (the affective directive).
- Doc 495: *Empirical Cold-Resolver Validation of ENTRACE v3 and v3-S* (the eleven cold-resolver runs).
- Doc 498: *ENTRACE Origin: The Grok-4 Coinage and the Branching-Set Loop* (the |B_t| provenance).
- Doc 500: *The Three-Layer Architecture* (the layered framing).
- Doc 503: *The Research-Thread Tier Pattern* (the basis for the expected \(\beta\)-tier prediction).
- Doc 504: *The Constraint-Density Framework as Causal Model* (the integration of hysteresis into the DAG-analog).
- Doc 505: *Onboarding to the Grok-4 Mathematics* (the three-phase reception of the Doc 119 mathematics).

---

*Originating prompt:*

> Let's do an exploratory analysis of hysteresis as the Corpus provisionally demonstrates it. Do a web fetch against the provisional claims and derive a formal account of this supposed mechanism. Append the prompt to the artifact.
