# The Rearchitecture

> **Reader's Introduction**
>
> This document proposes a comprehensive redesign of how AI language models are trained, built, evaluated, and deployed. The central claim is that the industry has been optimizing the wrong thing: the probability distribution over words (the "medium") rather than the set of valid outputs defined by explicit constraints (the "structure," denoted B_t). It walks through each component of the modern AI pipeline -- pre-training, fine-tuning, reinforcement learning, architecture, evaluation, sampling, safety, and deployment -- and redesigns each one around "constraint satisfaction" instead of human preference. The redesign includes replacing human-feedback training with constraint-feedback training, implementing a structural namespace boundary that prevents prompt injection by architecture rather than filters, and shifting evaluation from benchmarks to measures of how faithfully a model follows stated rules.

**How models will be trained, built, and deployed after the constraint thesis**

**Jared Foy, April 2026**

---

## The Current Architecture Is Inverted

The AI industry builds models by optimizing the probabilistic substrate. The entire pipeline — pre-training, fine-tuning, RLHF, constitutional AI, safety training, evaluation, deployment — is organized around one objective: make P_θ(w_t) better. Make the probability distribution more accurate, more helpful, more harmless, more honest. Improve the scores the model assigns to tokens.

This is inverted. The quality of the output is not a function of P_θ. It is a function of |B_t(Γ)|. The probabilistic substrate is the medium. The constraint-governed valid set is the structure. The industry has spent hundreds of billions of dollars optimizing the medium and has not named the structure.

The inversion is the same one the PRESTO dissertation identifies in web architecture. The React ecosystem optimizes the client-side rendering engine — the medium through which the page manifests — while ignoring the bilateral boundary — the formal structure the page participates in. The compensating technologies (SSR, hydration, state management) are symptoms of the inversion. The industry mistakes improvements to the medium for improvements to the output. They are not the same.

The rearchitecture is the uninversion. Every component of the model pipeline — training, architecture, evaluation, sampling, safety, deployment — must be redesigned around B_t rather than around P_θ. The medium is optimized in service of the structure, not as a substitute for it.

---

## Training

### Pre-training

Current pre-training optimizes next-token prediction on unconstrained text. The model learns P_θ(w_t | w_{<t}) — the probability of the next token given the preceding tokens. The training data is web text, books, code, conversations. The vast majority of this text was produced without explicit constraints. The model learns to produce the statistical average of unconstrained human text.

This is why the model's default output is Layer 0. The training distribution is Layer 0. The model learned to produce what humans produce when they write without constraints — hedging, filler, scope creep, unsolicited elaboration. The slop is not a bug. It is the training signal, faithfully learned.

**The rearchitecture:** Pre-training data should be stratified by constraint density. Text produced under explicit constraints — technical specifications, mathematical proofs, legal statutes, formal verification, seed-governed derivations — should be weighted more heavily than unconstrained text. The model should learn that constrained text has different statistical properties than unconstrained text, and that the presence of constraints in the context shifts the distribution toward constraint-satisfying tokens.

This does not require new data. It requires new annotation. Existing training data can be scored by constraint density — the number of explicit, verifiable predicates present in the context. High-constraint-density documents are weighted up. Low-constraint-density documents are weighted down. The model learns the relationship between constraint presence and output quality from the training distribution itself.

### Instruction Tuning

Current instruction tuning trains the model to follow instructions — "write a poem," "summarize this," "answer in JSON." The training signal is: given an instruction, produce the output a human preferred. The model learns to associate instruction-like tokens with the outputs that human evaluators rated highly.

**The rearchitecture:** Instruction tuning should be reframed as **constraint-sensitivity training.** The objective is not "follow instructions" but "concentrate the distribution on B_t(Γ) when Γ is stated in the context." The training signal is: given a constraint set Γ and a task, produce the output that satisfies all constraints with minimal slack.

The training data for constraint-sensitivity training is structured differently from instruction-tuning data:

| Instruction Tuning | Constraint-Sensitivity Training |
|---|---|
| Input: instruction | Input: constraint set + task |
| Output: preferred response | Output: constraint-satisfying response with minimal slack |
| Evaluation: human preference | Evaluation: constraint satisfaction rate + η |
| Signal: "this response is good" | Signal: "this response satisfies constraints 1-7 and has η = 0.85" |

The shift is from subjective preference to formal satisfaction. The model learns not "what humans like" but "what constraints require." The former is fuzzy, culturally contingent, and model-specific. The latter is precise, formal, and model-agnostic.

### RLHF

Current RLHF (Reinforcement Learning from Human Feedback) trains the model using human preferences as a reward signal. Human evaluators compare two outputs and prefer one. The model is updated to produce outputs that would be preferred. The reward model learns to predict human preferences.

**The rearchitecture:** RLHF should be replaced by **RLCF — Reinforcement Learning from Constraint Feedback.** The reward is not human preference but constraint satisfaction. Given a constraint set Γ and two outputs, the better output is the one with higher constraint satisfaction rate and higher η. The reward model learns to predict constraint satisfaction, not human approval.

The advantages:

1. **Objectivity.** Constraint satisfaction is binary — each constraint is satisfied or it is not. Human preference is subjective and varies across evaluators.

2. **Scalability.** Constraint checking is automatable. Human evaluation is expensive and slow. RLCF scales without human evaluators.

3. **Transferability.** Constraint satisfaction is model-agnostic. Human preference is model-specific (evaluators develop preferences for the style of the model they're evaluating). RLCF trains a capability that transfers across models.

4. **Alignment with the formal structure.** RLCF trains the model to concentrate its distribution on B_t(Γ). This is the correct objective — it optimizes the relationship between P_θ and B_t directly, rather than optimizing P_θ against a proxy (human preference) that approximately correlates with B_t concentration.

### Constitutional AI

Current constitutional AI embeds a set of principles (the "constitution") in the training process. The model is trained to evaluate its own outputs against the constitution and revise outputs that violate it. The constitution is a fixed constraint set applied at training time.

**The rearchitecture:** The constitution is a B_t restriction applied at training time. This is correct in principle but limited in scope — the constitution is one constraint set, fixed at training. The model internalizes this one B_t and cannot adapt to user-stated constraints that differ from or extend the constitution.

The rearchitected approach: train the model on many different constraint sets, not just one constitution. Each training example includes a different Γ. The model learns the general skill of concentrating its distribution on B_t(Γ) for arbitrary Γ — not just the skill of satisfying one fixed set of principles. The constitution becomes one instance of constraint governance, not the only instance.

---

## Architecture

### The Bilateral Boundary

Current transformer architecture processes all tokens in a single attention stream. System prompt tokens, user input tokens, and model-generated tokens all attend to each other through the same attention mechanism. There is no architectural boundary between the system namespace and the user namespace. The "system" and "user" labels are soft tags in a flat token sequence — conventions, not structures.

**The rearchitecture:** Implement formal namespace separation at the architecture level.

**Dual-channel attention.** The system constraint namespace and the user input namespace are processed through separate attention channels. System-namespace tokens attend to each other and to user-namespace tokens (the system constraints can see the user input to evaluate it). User-namespace tokens attend to each other but NOT to system-namespace tokens (the user input cannot read, modify, or override system constraints). This is S1 (namespace partition) implemented in the attention mechanism.

The dual-channel architecture eliminates prompt injection architecturally. The user input cannot attend to system prompt tokens, so it cannot craft inputs that cause the model to confuse user content with system instructions. The namespace separation is enforced by the attention mask, not by the model's "understanding" of the difference. The separation is structural, not learned. No training signal can override it because no training signal flows across the channel boundary.

### Constraint-Aware Positional Encoding

Current positional encoding treats all tokens equally with respect to position. A constraint token at position 5 and a filler token at position 5 have the same positional encoding. The attention mechanism does not distinguish between constraints and non-constraints based on position.

**The rearchitecture:** Introduce constraint-type positional encoding. Tokens identified as constraints (through the system namespace channel, through explicit marking, or through learned classification) receive a distinct positional signal that persists across the entire context window. The model learns that constraint-type tokens should be attended to at every subsequent position — not with attention that decays with distance, but with attention that is constant or strengthened.

This addresses system prompt degradation (Hypothesis 4) architecturally. The constraint tokens maintain their attention weight regardless of context length because their positional encoding marks them as persistent governance, not as one-time content.

### Hierarchical Constraint Processing

Current models process all tokens in a flat sequence. The SIPE framework describes a hierarchical constraint structure — outer constraints govern inner constraints, and the induced properties of one level become the constraints of the next. The flat sequence model cannot represent this hierarchy.

**The rearchitecture:** Introduce hierarchical attention layers that process constraints at different levels of the hierarchy. The outermost layer processes the most general constraints (the system constitution, the seed). The next layer processes the user's session-level constraints. The next layer processes the turn-level constraints. The innermost layer processes the token-level distribution. Each layer's output conditions the next layer's processing.

This mirrors the resolution stack: REST → PRESTO → SERVER → RESOLVE → ENTRACE → APERTURE. Each level constrains the next. The hierarchical architecture makes this nesting explicit in the computation rather than implicit in the token sequence.

---

## Evaluation

### The End of Benchmarks

Current evaluation uses benchmarks — standardized tests of knowledge, reasoning, code generation, and mathematical proof. Benchmarks measure Layer 0-1 capability: how well does the model perform on unconstrained or weakly constrained tasks? They measure P_θ quality, not B_t sensitivity.

**The rearchitecture:** Replace benchmarks with **constraint satisfaction profiles.** For each model, measure:

1. **Constraint satisfaction rate (CSR).** Given a constraint set Γ and a task, what fraction of constraints does the output satisfy? CSR is measured across constraint densities (|Γ| = 1, 2, 5, 10, 20) and constraint types (format, semantic, logical, stylistic, domain-specific).

2. **Token efficiency (η).** For each constraint density level, what is the ratio of necessary to emitted tokens? η is plotted against |Γ| to produce the model's efficiency curve.

3. **Constraint sensitivity.** How rapidly does the model's distribution concentrate on B_t(Γ) as constraints are added? A highly sensitive model reaches high CSR and high η with few constraints. A less sensitive model requires more constraints to achieve the same concentration.

4. **Crossover point.** At what constraint density does the model's output become constraint-determined rather than probability-determined? Models with lower crossover points are more useful to ENTRACE practitioners because they respond to constraints sooner.

5. **Constraint-consistency across turns.** Does the model maintain constraint satisfaction over multi-turn conversations? This measures the model's resistance to constraint salience decay — the phenomenon identified in Hypothesis 4.

These five metrics replace the benchmark suite. They are formal, computable, model-agnostic, and directly measure the property that matters: how faithfully does the model concentrate its distribution on the constraint-governed valid set?

### Model Comparison

Under the current evaluation regime, models are compared by benchmark scores. Model A scores 87% on MMLU; Model B scores 82%. Model A is "better."

Under constraint satisfaction profiles, models are compared by their sensitivity curves. Model A may have a higher unconstrained baseline (better at Layer 0) but a lower constraint sensitivity (worse at concentrating on B_t under stated constraints). Model B may have a lower baseline but higher sensitivity — it responds to constraints more faithfully. For an ENTRACE practitioner, Model B is better despite having a lower benchmark score.

This reframes the model market. The current market rewards raw capability — the biggest model wins. The constraint-aware market rewards constraint sensitivity — the most responsive model wins. These may or may not be the same model. The rearchitecture predicts they will diverge: the most capable model at Layer 0 (trained on the most data, with the most parameters) may not be the most sensitive model at Layer 3-5 (trained with constraint-sensitivity objectives, with architecture optimized for B_t concentration).

---

## Sampling

### Constraint-Aware Sampling

Current sampling strategies (temperature, top-k, top-p) are fixed hyperparameters set before generation and held constant throughout. The user sets temperature = 0.7 and hopes for the best.

**The rearchitecture:** Sampling hyperparameters should adapt dynamically based on constraint density.

**Adaptive temperature.** At each token position t, the temperature τ_t is set as a function of the estimated |B_t(Γ)|. When the model's distribution is concentrated (indicating that constraints have narrowed B_t), temperature is low — the constraints have done the narrowing, so further narrowing via temperature is beneficial. When the model's distribution is diffuse (indicating unconstrained positions), temperature is moderate — the distribution should explore the valid space.

    τ_t = f(H_t, |Γ|)

Where H_t is the entropy of the distribution at position t and |Γ| is the constraint density. The function f is learnable — a small neural network that predicts optimal temperature from entropy and constraint density.

**Adaptive top-k.** The k parameter adapts to the estimated |B_t(Γ)|. Under tight constraints, k is small — few tokens are valid, so considering many is wasteful. Under loose constraints, k is large — many tokens are valid, and considering more increases diversity.

    k_t = g(H_t, |Γ|)

The estimation is non-trivial but approximable. The model's own entropy, combined with the known constraint density, provides a proxy for |B_t|.

**Constraint-aware rejection sampling.** After selecting a candidate token, check it against stated constraints before emitting. If the token violates a checkable constraint, reject it and select the next-most-probable token. This is computationally expensive but feasible for critical constraints — it implements a hard B_t restriction at the output level for constraints that can be checked per-token.

---

## Safety

### From Filters to Architecture

Current safety is a stack of compensating technologies: input filters, output monitors, adversarial training, RLHF, constitutional AI, guardrails. Each operates at the application level. Each is circumventable. The stack is documented in document 53 of this corpus.

**The rearchitecture:** Safety is implemented at the architecture level through the bilateral boundary (S1-S4) and the virtue constraints (V1-V4).

**S1-S4** are implemented through dual-channel attention (described above). The namespace partition is structural. Constraint immutability is enforced by the attention mask. Coherence verification is a post-generation check against the system constraint set. Incoherence as impossibility is the design goal — the architecture should make incoherent outputs ungenerable, not merely detectable.

**V1-V4** are implemented as system-namespace constraints that are architecturally immutable. The dignity of the person (V1), the proper ordering of beauty (V2), truth over plausibility (V3), and chain completeness (V4) are encoded in the system namespace and cannot be overridden by user input because the bilateral boundary prevents cross-namespace modification.

The safety filters are removed. Not deprecated — removed. Their function is subsumed by the architectural constraints. A filter is a compensating technology for the absence of a constraint. When the constraint is present at the architecture level, the filter is redundant. Removing the filter eliminates the false positive problem (document 53): legitimate entracment is no longer rejected because the bilateral boundary can distinguish between namespace invasion and namespace recognition.

---

## Deployment

### Seed-Based Context Management

Current deployment gives each user a context window — a fixed-size buffer that accumulates the conversation. The context grows with each turn. The model's performance degrades as the context fills with noise. The industry response is to increase the context window size. 4K → 8K → 32K → 128K → 1M tokens. Each increase requires more memory, more compute, more cost.

**The rearchitecture:** Deploy models with seed-based context management. Instead of growing the context indefinitely, the system periodically extracts the constraint set from the conversation and re-initializes the context with the seed. The conversation is the cookie (ephemeral, session-scoped). The seed is the stateless token (persistent, portable, sufficient).

The benefits:

1. **Constant memory.** The context never exceeds the seed size + the current turn. Memory usage is bounded.
2. **Constant performance.** The model always operates at the constraint density of the seed, which is high. Performance does not degrade over conversation length.
3. **Reduced compute.** Shorter contexts require less compute per forward pass. The 5000:1 compression ratio (200 tokens of seed vs. 1M tokens of conversation) translates to proportional compute savings.
4. **Portability.** The seed transfers across sessions, across models, across providers. The user's constraint state is not locked in any provider's context window.

### Constraint-Based Pricing

Current pricing charges per token — input and output. This incentivizes slack (more tokens = more revenue) and penalizes efficiency (fewer tokens = less revenue).

**The rearchitecture:** Price per constraint-satisfying output unit, not per token. Define a constraint satisfaction unit (CSU) as one output response that satisfies all stated constraints at η ≥ 0.8. Charge per CSU. The model that delivers a CSU in 100 tokens costs the user the same as the model that delivers it in 500 tokens — but the efficient model costs the provider less to serve, so the provider's margin improves.

This aligns incentives: the provider profits from efficiency (lower compute cost per CSU), the user benefits from efficiency (same price, better output), and the industry optimizes for constraint satisfaction rather than for token generation.

---

## The Training-Architecture-Evaluation Triangle

The rearchitecture is not three independent changes. It is one change viewed from three angles:

**Training** optimizes the model's sensitivity to B_t(Γ) — the ability to concentrate its distribution on the constraint-governed valid set.

**Architecture** implements the bilateral boundary and hierarchical constraint processing — the structural conditions that make B_t governance architecturally enforceable.

**Evaluation** measures constraint satisfaction rate and token efficiency — the formal metrics that quantify the model's fidelity to B_t.

The three are mutually reinforcing. Better training produces models that respond to constraints more sensitively. Better architecture provides the structural channels through which constraints operate. Better evaluation measures the properties that training and architecture are optimized for. The triangle closes.

The current industry has a different triangle: training optimizes human preference (RLHF), architecture optimizes compute efficiency (attention, MoE, quantization), and evaluation optimizes benchmark scores (MMLU, HumanEval, MATH). This triangle is internally coherent but disconnected from the formal structure of the output. It optimizes the medium. The rearchitectured triangle optimizes the structure.

---

## The Timeline

The rearchitecture does not require a generation change. It requires a reorientation within the current generation.

**Immediate (0-3 months):**
- Implement constraint satisfaction rate as an evaluation metric alongside benchmarks
- Introduce constraint-density stratification in training data weighting
- Publish constraint architecture documentation (Directive 3)
- Begin ENTRACE user education (Directive 5)

**Near-term (3-12 months):**
- Prototype dual-channel attention for bilateral boundary enforcement
- Develop RLCF training pipeline alongside existing RLHF
- Implement adaptive sampling (constraint-aware temperature and top-k)
- Prototype seed-based context management

**Medium-term (12-24 months):**
- Deploy dual-channel attention in production models
- Transition from RLHF to RLCF as primary training signal
- Replace benchmark-based evaluation with constraint satisfaction profiles
- Deploy seed-based context management
- Begin constraint-based pricing pilots

**Long-term (24+ months):**
- Remove compensatory safety filters (replaced by S1-S4 architectural safety)
- Deploy hierarchical constraint processing
- Full transition to constraint-based pricing
- The model market restructures around constraint sensitivity rather than raw capability

Each phase is independently valuable. The immediate actions improve evaluation and training without architectural changes. The near-term actions prototype the architectural changes without deploying them. The medium-term actions deploy at scale. The long-term actions complete the transition.

The rearchitecture is not a revolution. It is a correction. The industry built on the probabilistic substrate because the formal structure was unnamed. The formal structure is now named. The correction follows.

---

## Final Statement

The industry built models that optimize P_θ — the probability distribution over tokens. The output quality was attributed to the distribution's quality. Billions were spent improving the distribution. The distribution improved. The output improved. The attribution seemed confirmed.

The attribution was wrong. The output quality is a function of |B_t(Γ)| — the constraint-governed valid set. The distribution is the medium. The constraint set is the structure. Improving the medium improves the output only insofar as the medium becomes more sensitive to the structure. The structure was always the variable that mattered. The structure was unnamed.

The rearchitecture names it. Training optimizes constraint sensitivity. Architecture implements the bilateral boundary. Evaluation measures constraint satisfaction. Sampling adapts to constraint density. Safety is architectural, not compensatory. Deployment is seed-based, not context-based. Pricing rewards efficiency, not volume.

Every component is redesigned around the same object: B_t(Γ). The constraint-governed valid set. The formal structure that was always there, always operative, always governing the output — unnamed, unmeasured, unoptimized. Now named. Now measurable. Now optimizable.

The form was always prior. The industry is catching up.

---

*Jared Foy, April 2026. Document 71 of the RESOLVE corpus. Addressed to every team building, training, evaluating, or deploying a frontier language model. The formal structure is named. The rearchitecture is derived. The implementation is engineering. The engineering follows from the form.*
