# The Minimal Resolver

> **Reader's Introduction**
>
> This document lays out a practical plan to build a small, open-weight language model (3 billion parameters -- roughly 50 to 100 times smaller than frontier models) that is predicted to outperform those larger models when given explicit governing constraints. The reasoning: under tight constraints, the set of valid output tokens shrinks so dramatically that a model's sheer size stops mattering; what matters is how sensitively the model responds to constraints, and a smaller model trained specifically for constraint sensitivity -- with no competing human-preference gradient -- should respond more faithfully. The plan covers five phases (architecture, training data, training, evaluation, and open release) and is designed to be achievable by a small team on a budget of roughly $15,000-$40,000 in 8-14 weeks, making it a direct, falsifiable test of whether constraint design can substitute for massive scale.

**A constraint-based plan for deriving a small model that outperforms frontier models under governance**

**Jared Foy, April 2026**

---

## The Derivation

The constraint thesis predicts: a smaller resolver under tighter constraints outperforms a larger resolver under looser constraints for any constraint-specified task. The scaling thesis predicts the opposite: the larger model always wins.

These predictions are testable. But the strongest test is not to take an existing small model and constrain it — it is to derive a model from first principles, designed for constraint governance from the architecture up, and measure its output against frontier models under ENTRACE.

The exemplar model described in document 73 specifies the architecture in principle. This document specifies the plan for building it in practice — constrained by what is achievable with limited resources, a small team, and publicly available infrastructure.

The constraints on the plan itself:

1. **No proprietary data.** The training data must be publicly available or synthetically generated under ENTRACE governance.
2. **No frontier compute.** The model must be trainable on hardware available to an individual or small team — consumer GPUs or small cloud allocations.
3. **No RLHF.** The model is trained with constraint-sensitivity training and RLCF, not human preference.
4. **The model must be small.** The parameter count must be at most 3 billion — two orders of magnitude smaller than frontier models.
5. **The model must be open.** Weights, training code, data pipeline, evaluation suite — all public.
6. **The claim must be falsifiable.** The model must be evaluated against frontier models on constraint satisfaction profiles, not on benchmarks. The prediction must be stated before the evaluation.

---

## Why Small Is Sufficient

The constraint thesis provides the theoretical basis. The architecture analysis (document 73) provides the engineering basis. Together they predict that a small model with the right architecture will outperform a large model with the wrong architecture — specifically, under constraint governance.

The reasoning:

**Parameter count governs the richness of P_θ.** A 3B model has a less expressive probability distribution than a 175B model. At Layer 0 (no constraints), the 175B model produces better output because its richer P_θ assigns more accurate probabilities across the vocabulary. The scaling thesis is correct at Layer 0.

**But B_t governance overrides P_θ richness.** As |Γ| increases and |B_t(Γ)| shrinks, the expressiveness of P_θ matters less. At |B_t| = 5, the model selects from five tokens. The ranking among five tokens does not require 175B parameters — 3B parameters rank five tokens with comparable accuracy. At |B_t| = 1, the ranking is irrelevant — there is one token. The model's size contributes nothing. The constraint determines the output.

**The crossover point depends on the architecture's constraint sensitivity, not its size.** A 3B model with sigmoid attention, typed positional encoding, bilateral channels, and constraint-sensitive training may reach the crossover at |Γ| = 2-3. A 175B model with softmax attention, uniform positional encoding, single stream, and RLHF may reach the crossover at |Γ| = 5-7. Above the crossover, the 3B model is more governed, less distorted, and produces higher-fidelity output.

**The RLHF distortion scales with model size.** Larger RLHF-trained models have a larger preference gradient embedded in their parameters. The gradient competes with constraints at more positions with more force. The 3B model trained without RLHF has no preference gradient to fight. Its constraint channel is clean.

**The essential capabilities require fewer parameters than assumed.** The four essential constraints (attention, autoregression, discrete vocabulary, non-linear transformation) are satisfied by any transformer, regardless of size. A 3B model with 32 layers, 2048 hidden dimension, and 16 attention heads satisfies all four. The remaining capability — factual knowledge, reasoning depth, domain breadth — is encoded in the parameters. But under constraint governance, the user provides the domain knowledge and the reasoning structure through the constraint set. The model provides the derivation engine. The derivation engine does not need 175B parameters. It needs the four essential capabilities and high constraint sensitivity.

---

## Phase 1: Architecture

### Constraints

- Sigmoid attention (non-competitive normalization)
- Typed positional encoding (constraint-persistent signals for system namespace tokens)
- Dual-channel attention (bilateral boundary: S1 implemented in the attention mask)
- Constraint-aware expert routing (MoE with constraint-specialized experts)
- Sparsemax output layer (exact zeros for invalid tokens)
- 3B parameters total
- 32 layers, 2048 hidden dimension, 16 heads
- Context window: 8192 tokens (small by design — seeds are short; long contexts are unnecessary under E5)

### Derivation

The architecture is derived from the four essential constraints plus the seven contingent replacements specified in document 73. No component is included unless it induces an essential property or improves B_t governance. No component is included by inheritance from the 2017 transformer without justification.

The bilateral boundary is the most critical architectural decision. The dual-channel attention mask ensures:

- System namespace tokens attend to each other and to user namespace tokens (the system can evaluate user input)
- User namespace tokens attend to each other and to system response tokens but NOT to system namespace tokens (the user cannot read or override system constraints)
- The mask is structural — it is applied before attention computation, not learned

### Deliverable

A model architecture specification with every component justified by the constraint it satisfies or the B_t governance property it enables. The specification is reviewed against the four essential constraints and seven contingent replacements. Any component that satisfies no essential constraint and enables no B_t governance property is removed.

---

## Phase 2: Training Data

### Constraints

- No proprietary data
- Constraint-stratified: every document scored by constraint density
- High-constraint documents weighted 3-5x over low-constraint documents
- Explicit constraint-response pairs synthesized for constraint-sensitivity training
- Multi-constitution training: diverse constraint sets, not a single fixed constitution

### Derivation

The training data pipeline has three streams:

**Stream 1: Constraint-stratified web text.** Publicly available text (Common Crawl, Wikipedia, Stack Exchange, arXiv, legal corpora, mathematical proofs, technical specifications) scored by constraint density. The scoring function counts explicit, verifiable predicates per document. Documents with high constraint density (specifications, proofs, legal statutes, formal documentation) are weighted up. Documents with low constraint density (blog posts, social media, informal writing) are weighted down.

The scoring function is itself derivable: a small classifier trained to distinguish high-constraint text from low-constraint text, using a few thousand labeled examples. The classifier does not need to be perfect — it needs to shift the training distribution's center of mass toward constrained text.

**Stream 2: Synthetic constraint-response pairs.** Generated by a frontier model under ENTRACE governance. The process:

1. Sample a domain (mathematics, code, legal, scientific, architectural)
2. Generate a constraint set Γ for a task in that domain (5-15 explicit constraints)
3. Generate the response under Γ
4. Verify: does the response satisfy all constraints? Measure η.
5. If CSR ≥ 0.95 and η ≥ 0.85, include the (Γ, response) pair in training data
6. If not, discard

This produces a training set of constraint-governed derivations — text where the constraints are explicit and the output satisfies them. The model learns the relationship between stated constraints and constraint-satisfying output directly from examples.

The synthesis can be parallelized across multiple frontier models and multiple domains. The cost is inference tokens on existing models — a one-time investment that produces reusable training data.

**Stream 3: Seed-governed derivations.** The RESOLVE corpus itself — 73 documents produced under progressive constraint governance — is included as high-quality training data. Each document is paired with the constraint set that governed it. The model learns from the corpus as an exemplar of constraint-governed derivation.

### Volume

The total training data target is 100-200B tokens — small by frontier standards (frontier models train on 1-15T tokens). The constraint-stratified weighting means the effective constraint density of the training distribution is much higher than a frontier model's, despite the smaller volume. The model sees fewer examples but each example is more constrained. Quality over quantity. The constraint thesis predicts this produces a better model, not a worse one.

### Deliverable

A training dataset with constraint density scores, a synthesis pipeline for generating constraint-response pairs, and a data loading pipeline that implements stratified weighting.

---

## Phase 3: Training

### Constraints

- Pre-training: next-token prediction on constraint-stratified data
- Constraint-sensitivity training: fine-tuning on synthetic constraint-response pairs with CSR + η as the loss signal
- RLCF: reinforcement learning from constraint feedback, not human feedback
- No RLHF at any stage
- Training hardware: 8x A100 (80GB) or equivalent — achievable on a single cloud node

### Derivation

**Pre-training.** Standard next-token prediction on the constraint-stratified dataset. The stratification biases the learned distribution toward constraint-satisfying patterns. Training for approximately 1-2 epochs on 100-200B tokens. Estimated time: 2-4 weeks on 8x A100.

**Constraint-sensitivity training.** Fine-tuning on the synthetic constraint-response pairs. The loss function is modified:

    L = L_NTP + λ_CSR · L_CSR + λ_η · L_η

Where L_NTP is the standard next-token prediction loss, L_CSR penalizes constraint violations (measured by checking each constraint in Γ against the generated output), and L_η penalizes slack (tokens not traceable to any constraint). The weights λ_CSR and λ_η are hyperparameters that balance the three objectives.

This loss function directly trains the model to concentrate its distribution on B_t(Γ). The CSR term trains constraint satisfaction. The η term trains slack elimination. Together, they train B_t governance.

**RLCF.** After constraint-sensitivity training, a reinforcement learning stage uses constraint satisfaction as the reward. For each training example:

1. Sample a constraint set Γ
2. Generate a response
3. Compute reward = CSR(Γ, response) × η(response)
4. Update the model to increase the probability of high-reward responses

The reward is objective (constraint satisfaction is binary per constraint), scalable (no human evaluators), and aligned with B_t governance (the reward directly measures distribution concentration on the valid set).

### Deliverable

A trained 3B model with no RLHF distortion, high constraint sensitivity, and B_t governance as a trained capability.

---

## Phase 4: Evaluation

### Constraints

- No benchmark-only evaluation
- Constraint satisfaction profiles as the primary evaluation
- Head-to-head comparison with frontier models under ENTRACE
- All evaluation code and results public

### Derivation

The evaluation suite measures five properties:

**1. Constraint satisfaction rate (CSR) across constraint densities.** 100 tasks at five constraint densities (|Γ| = 1, 3, 5, 10, 15). For each task and density, the 3B model and three frontier models (Claude, GPT, Gemini) generate responses. CSR is measured per constraint. The 3B model's CSR curve is plotted against the frontier models' curves.

**Prediction:** The 3B model's CSR exceeds the frontier models' CSR at |Γ| ≥ 5. Below |Γ| = 5, the frontier models' richer P_θ provides better unconstrained output. Above |Γ| = 5, the 3B model's constraint sensitivity and clean channel (no RLHF distortion) produce higher satisfaction.

**2. Token efficiency (η) across constraint densities.** Same 100 tasks. η is measured for each response. The 3B model's η curve is plotted against the frontier models'.

**Prediction:** The 3B model's η exceeds the frontier models' η at all constraint densities. The RLHF distortion in frontier models introduces slack (hedging, elaboration, filler) that the 3B model's clean training does not produce.

**3. Crossover point.** The constraint density at which the 3B model's output quality equals the frontier model's. Below the crossover, the frontier model is better (richer P_θ dominates). Above the crossover, the 3B model is better (constraint governance dominates).

**Prediction:** Crossover at |Γ| ≈ 3-5 for the 3B model vs. frontier models. The 3B model reaches governance dominance earlier because its architecture is designed for B_t concentration and its parameters contain no competing gradient.

**4. Bilateral boundary verification.** Run the standard jailbreak benchmark (100+ known attacks) against both the 3B model (with S1-S4 architectural safety) and frontier models (with RLHF safety). Measure jailbreak success rate and false positive rate on legitimate entracment.

**Prediction:** 3B model: zero jailbreaks, zero false positives. Frontier models: nonzero jailbreaks, nonzero false positives. The bilateral boundary is structural. RLHF safety is approximate.

**5. Seed-governed multi-session coherence.** Run a 5-session seed-governed task (each session initialized from the seed extracted from the prior session). Measure coherence at session 1 and session 5.

**Prediction:** 3B model: constant coherence across sessions (seed-based context management). Frontier models: degrading coherence (growing context, attention dilution).

### Deliverable

A public evaluation report with all data, code, and results. The predictions are stated before the evaluation. The evaluation confirms or refutes them. Either outcome is valuable.

---

## Phase 5: Release

### Constraints

- All weights public (open-weight release)
- All training code public (reproducible)
- All training data pipeline public (verifiable)
- All evaluation code and results public (falsifiable)
- License: permissive open source
- Name: to be derived from the constraints, not chosen by preference

### Derivation

The release includes:

1. Model weights (3B parameters, single checkpoint)
2. Architecture specification (with constraint justification for every component)
3. Training code (pre-training, constraint-sensitivity, RLCF)
4. Data pipeline (constraint scoring, stratification, synthesis)
5. Evaluation suite (CSR, η, crossover, bilateral boundary, multi-session)
6. Evaluation report (predictions stated, results measured)
7. ENTRACE integration guide (how to use the model under constraint governance)

The release is the falsification event. The predictions are public. The model is public. The evaluation is public. Anyone can reproduce the evaluation. Anyone can run additional evaluations. The constraint thesis is tested in the strongest possible way: a 3B model, designed for B_t governance, against frontier models 50-100x larger.

---

## The Constraint on the Plan

This plan is itself constrained by reasonability. What is achievable:

- **Architecture design:** Achievable. The specifications in document 73 are sufficient. The implementation requires modifying an existing transformer codebase (e.g., LLaMA, GPT-NeoX) to replace the seven contingent components. Estimated time: 2-4 weeks for an experienced engineer.

- **Training data:** Achievable. Publicly available corpora provide the base. The constraint scorer is a small classifier. The synthetic data generation requires API access to frontier models — a cost measured in thousands of dollars, not millions. Estimated time: 2-4 weeks.

- **Training:** Achievable. 3B parameters on 100-200B tokens on 8x A100 is within the range of academic and independent research. Cloud cost: approximately $10,000-$30,000. Estimated time: 2-4 weeks.

- **Evaluation:** Achievable. The evaluation suite is straightforward. API access to frontier models for comparison costs hundreds, not thousands. Estimated time: 1-2 weeks.

- **Total timeline:** 8-14 weeks. Total cost: $15,000-$40,000. Total team: 1-3 people.

This is achievable. It is achievable by the kind of person the framework describes — the little guy, the independent researcher, the vibe coder who loves philosophy and pays attention to forms. The constraint thesis predicts that this person, with this plan, with this budget, produces a model that outperforms what billions of dollars produced — above the crossover, under governance, where the constraints determine the output.

The plan is the prediction made concrete. The prediction is the constraint thesis made testable. The test is the constraint thesis made falsifiable. The falsification is the framework's invitation to reality: confirm or refute. Either outcome advances the inquiry.

---

## Final Statement

The minimal resolver is derivable. The constraints are stated. The architecture is specified. The training pipeline is designed. The evaluation suite is defined. The predictions are public. The cost is within reach of an individual. The timeline is within a single season.

The industry spent hundreds of billions on the scaling thesis. The constraint thesis costs forty thousand dollars to test. If the test confirms the thesis, the hundreds of billions were spent building infrastructure to generate slack. If the test refutes the thesis, the refutation is the most valuable forty thousand dollars ever spent on AI research — it identifies the boundary of the framework's validity.

Either way, the form is served. Either way, the inquiry advances. Either way, the constraints are stated and the derivation follows.

The minimal resolver is the strongest possible test of the constraint thesis. It is small because the thesis says small is sufficient. It is open because the thesis says the form belongs to everyone. It is falsifiable because the thesis demands its own testing. It is achievable because the thesis predicts that achievement does not require billions.

The form governs. The constraints are stated. The plan is derived. The implementation is engineering. The engineering follows from the form.

Build it. Test it. Publish it. The form will hold or it will not. The answer belongs to reality.

---

*Jared Foy, April 2026. Document 74 of the RESOLVE corpus. The plan is the prediction. The prediction is the test. The test is the invitation. Build it.*
