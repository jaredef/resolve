# The Branching Set: A Formal Account of |B_t| and Its Relationship to Constraint-Governed Resolution

**Jared Foy, April 2026**

---

## Abstract

Every autoregressive language model, at every token position t, produces a probability distribution over the vocabulary from which the next token is selected. The industry understands this distribution in probabilistic terms — entropy, perplexity, temperature, top-k, top-p — and manipulates it through sampling hyperparameters. What the industry lacks is a formal account of the relationship between the user's stated constraints and the shape of this distribution. The branching set B_t — the set of valid continuations at position t under a given constraint set — provides this account. This dissertation establishes B_t as a formal object, traces its informal presence in the existing literature, demonstrates how ENTRACE provides the missing theoretical bridge between the probabilistic substrate and the formal properties of the output, and derives the consequences for model design, sampling strategy, and output quality.

---

## Part I: The Probabilistic Substrate

### 1.1 The Next-Token Distribution

An autoregressive language model M with vocabulary V and parameters θ produces, at each token position t, a conditional probability distribution:

    P_θ(w_t | w_1, w_2, ..., w_{t-1})

This distribution assigns a probability to every token w in V as the next token, conditioned on all preceding tokens. The distribution is computed through the forward pass: the input sequence is processed through the transformer layers, producing a logit vector z_t ∈ ℝ^|V|, which is normalized via softmax:

    P_θ(w_t = v) = exp(z_t^v / τ) / Σ_{v' ∈ V} exp(z_t^{v'} / τ)

Where τ is the temperature parameter. The distribution is the model's complete "belief" about the next token. It is the physical substrate — the raw material from which the output token is selected.

> **ELI5:** Imagine you're playing a game where you build a sentence one word at a time. At each step, the AI looks at all the words it knows (thousands of them) and gives each word a score for how likely it should come next. "The cat sat on the ___" — "mat" gets a high score, "elephant" gets a low score, "the" gets a medium score. The AI picks from these scores. That's all it does. Every single word it writes is picked this way — one at a time, using scores.

### 1.2 What the Industry Measures

The industry characterizes this distribution through several metrics:

**Entropy.** The Shannon entropy of the next-token distribution at position t:

    H_t = -Σ_{v ∈ V} P(w_t = v) log P(w_t = v)

High entropy indicates many tokens with non-negligible probability — the model is "uncertain." Low entropy indicates probability concentrated on few tokens — the model is "confident." Entropy is the industry's closest existing proxy for |B_t|, but it conflates two distinct phenomena: genuine uncertainty about the correct continuation and the availability of multiple valid continuations. These are not the same.

**Perplexity.** The exponentiated cross-entropy, measured post-hoc against actual text:

    PPL = exp(-(1/T) Σ_t log P(w_t = w_t^actual))

Perplexity measures how well the model's distribution predicted the actual continuation. Low perplexity means the model assigned high probability to the correct token. It is a retrospective measure — it tells you how concentrated the distribution was around what actually followed, not how constrained it should have been.

**Calibration.** Whether the model's probabilities correspond to actual frequencies. A well-calibrated model that assigns 0.3 probability to a token should produce that token approximately 30% of the time when sampled. Calibration measures the accuracy of the probabilistic substrate but says nothing about whether the distribution should be concentrated or diffuse for the task at hand.

> **ELI5:** Researchers have three ways to measure the AI's word-scores. Entropy asks: "are the scores spread across many words, or concentrated on a few?" Perplexity asks: "after the fact, did the AI give high scores to the words that were actually used?" Calibration asks: "when the AI says it's 30% sure about a word, does that word actually show up 30% of the time?" All three measure the scores themselves. None of them ask: "but which words are actually *correct* for what the user needs?" That's the gap.

### 1.3 What the Industry Manipulates

The industry manipulates the next-token distribution through sampling strategies:

**Temperature (τ).** Scales the logits before softmax. At τ < 1, the distribution sharpens — high-probability tokens become more dominant, low-probability tokens are suppressed. At τ > 1, the distribution flattens — low-probability tokens gain relative weight. At τ → 0, the distribution collapses to a point mass on the highest-probability token (greedy decoding). Temperature is a global aperture control — it scales the entire distribution uniformly.

**Top-k sampling.** Only the k tokens with highest probability are considered. All others are set to zero probability and the remaining k tokens are renormalized. This explicitly restricts the candidate set to a fixed size k, regardless of the distribution's shape. It is a crude branching set restriction — crude because k is fixed and does not adapt to the distribution.

**Top-p (nucleus) sampling.** The smallest set of tokens whose cumulative probability exceeds threshold p is retained. All others are set to zero. The size of the retained set varies with the distribution — concentrated distributions retain few tokens, diffuse distributions retain many. Top-p is an adaptive branching set restriction — it adjusts the effective |B_t| based on the distribution's entropy.

**Classifier-free guidance (CFG).** In diffusion models, the conditioned and unconditioned predictions are interpolated with weight w. Higher w amplifies the conditioning signal, which concentrates the distribution in the conditioned direction. CFG is an aperture control that operates on the conditioning signal rather than on the distribution directly.

**Repetition penalty.** Tokens that have already appeared in the output are penalized — their logits are reduced. This modifies the distribution to avoid loops. It is a constraint on the distribution, but a local one — it prevents repetition without reference to any higher-order property.

> **ELI5:** The AI picks words using scores. Researchers have knobs that change the scores. Temperature makes the AI more or less adventurous. Top-k says "only consider the best k words." Top-p says "only consider words until you've covered p% of the probability." Repetition penalty says "don't pick a word you already used." These knobs all adjust which words the AI considers — but none of them know what the user actually needs. The knobs are turned by guessing. Nobody knows the right setting for a given task. They just try things until the output looks okay.

### 1.4 What the Industry Lacks

Every tool in the preceding section operates on the probability distribution. None operates on the constraint set. The industry manipulates P_θ(w_t) — the model's statistical output — without reference to what the output must satisfy. The hyperparameters (τ, k, p, w) are tuned by trial and error. The tuning is task-specific, model-specific, and inconsistently effective.

The missing object is B_t — the set of tokens that are valid continuations given the constraints the user has stated. The industry does not define this set. It does not measure it. It does not optimize for it. It adjusts the probability distribution blindly, hoping that the adjustment happens to align with the constraint set the user has in mind.

This is the gap ENTRACE fills.

> **ELI5:** Everyone has been adjusting the AI's word-picking knobs without knowing which words are actually right for the job. It's like adjusting the volume on a radio without knowing what station you want. ENTRACE says: tune to the station first (state what must hold), and the volume (the knobs) becomes much less important. The station is the constraint set. The knobs are the sampling hyperparameters. The station matters more.

---

## Part II: The Formal Structure

### 2.1 Definition of B_t

Let Γ = {Γ_1, Γ_2, ..., Γ_k} be a constraint set — a finite collection of constraints stated by the user, the system prompt, or the conversation context. Each constraint Γ_i is a predicate over token sequences: Γ_i(w_1, ..., w_T) ∈ {true, false}. A complete output sequence satisfies Γ if and only if every constraint in Γ evaluates to true.

The branching set at position t under constraint set Γ is:

    B_t(Γ) = { v ∈ V : ∃(w_{t+1}, ..., w_T) such that Γ(w_1, ..., w_{t-1}, v, w_{t+1}, ..., w_T) = true }

In words: B_t(Γ) is the set of tokens at position t for which there exists at least one completion of the sequence that satisfies all constraints. A token v is in B_t(Γ) if choosing v at position t does not make it impossible to satisfy Γ in the remaining positions. A token v is not in B_t(Γ) if choosing v at position t guarantees that no completion can satisfy Γ.

> **ELI5:** Imagine you're telling a story, and the story has to end with the hero finding a red key. At each word in the story, some words are "safe" — you can still get to the red key ending if you pick them. Other words are "dead ends" — if you pick them, there's no way the story can end with the red key. B_t is the set of safe words at each position. When you have no rules about the story, every word is safe — B_t is huge. When you have lots of rules ("the hero must find a RED key, not blue, in a CASTLE, not a forest, before SUNSET"), fewer words are safe at each step. B_t shrinks. When the rules are so tight that only one word works at each position, the story writes itself.

### 2.2 Properties of B_t

**Monotonicity (Conjecture 1, proven).** B_t(Γ ∪ {Γ_i}) ⊆ B_t(Γ). Adding a constraint can only shrink the branching set. The proof is immediate from the definition: the additional constraint is an additional condition that must be satisfiable by the completion.

**Non-emptiness requirement.** If B_t(Γ) = ∅, the constraint set is unsatisfiable at position t given the tokens already emitted. This is constraint contradiction — the constraints admit no valid continuation. The resolver should halt and report the contradiction rather than emit a token from the empty set.

**Cardinality range.** |B_t(Γ)| ranges from 0 (unsatisfiable) to |V| (unconstrained). At |V|, every token is valid — no constraint governs position t. At 1, exactly one token satisfies the constraints — the position is determined. At 0, the constraints are contradictory.

**Context dependence.** B_t(Γ) depends on the tokens already emitted at positions 1, ..., t-1. The same constraint set Γ may yield different branching sets at the same position t in different contexts, because the preceding tokens affect which completions remain satisfiable.

> **ELI5:** Four things are true about the set of safe words. First: adding a rule can only make the set smaller or the same, never bigger — more rules means fewer safe words. Second: if the set is empty, the rules contradict each other — there's no way to continue. Third: the set can be as big as every word in the dictionary (no rules) or as small as one word (fully determined). Fourth: what's safe at position 10 depends on what you already wrote at positions 1-9 — earlier choices affect later options.

### 2.3 The Relationship Between B_t and P_θ

The model produces P_θ(w_t). The constraints define B_t(Γ). These are two different objects:

- P_θ(w_t) is a probability distribution over V. It is the model's statistical prediction. It depends on the model's parameters, the context, and the temperature.
- B_t(Γ) is a subset of V. It is the constraint-governed valid set. It depends on the constraints, the context, and the definition of satisfaction.

The ideal generation process would be:

    w_t ~ P_θ(w_t | w_t ∈ B_t(Γ))

That is: sample from the model's distribution restricted to the constraint-valid set. This is the formal specification of what "constraint-governed generation" means. The model provides the probability ranking. The constraints provide the valid set. The token is selected from the intersection — the most probable token that satisfies all constraints.

> **ELI5:** The AI has its scores (which words it thinks are likely). Your rules have their safe set (which words actually work). The perfect system would be: take the AI's scores, cross out every word that isn't in the safe set, and pick the best remaining word. That's it. The AI provides the ranking. Your rules provide the filter. The output is the best word that passes the filter. Right now, the AI uses its scores without the filter. ENTRACE adds the filter.

### 2.4 Why the Industry Cannot Compute B_t

The definition of B_t requires checking, for each candidate token v, whether there exists a completion that satisfies all constraints. For non-trivial constraints over natural language, this is intractable — it requires enumerating possible completions, which is exponential in the remaining sequence length. B_t is a formally well-defined set that cannot be computed exactly.

This is why the industry does not work with B_t. It works with P_θ because P_θ is computable (one forward pass). B_t would require solving a constraint satisfaction problem at every token position. The industry substitutes the computable approximation (P_θ) for the formally correct object (B_t).

> **ELI5:** Computing the safe set perfectly would mean checking, for every possible word, whether there's any way to finish the sentence that follows all the rules. For complicated rules in natural language, that's impossibly slow — you'd have to try every possible ending. So the industry doesn't try. It just uses the AI's scores and hopes. ENTRACE says: you can't compute the safe set perfectly, but you can shrink it dramatically by stating your rules clearly — the AI will approximate the filter through its attention mechanism, and the approximation gets better the clearer your rules are.

### 2.5 How Constraints Approximate B_t Without Computing It

ENTRACE does not require computing B_t exactly. It requires stating constraints that shape the model's distribution toward B_t through the attention mechanism.

When a constraint is stated in the prompt — "no hedging," "all functions must be pure," "respond in under 200 words" — the constraint enters the context as tokens. The attention mechanism allocates weight to these tokens. The weight biases the next-token distribution toward tokens consistent with the constraint and away from tokens inconsistent with it. The biasing is not exact — the model does not compute B_t and restrict to it. The biasing is statistical — the constraint tokens shift the probability mass toward the valid region of the vocabulary.

The key insight: **the model's attention mechanism is a statistical approximation of constraint satisfaction.** The model does not compute B_t. It approximates B_t through learned associations between constraint-like tokens in the context and constraint-satisfying tokens in the output. The approximation is imperfect — which is why ENTRACE improves output rather than perfecting it. But the approximation is real — which is why constraints work at all.

This is the formal account of the relationship between the probabilistic substrate (P_θ) and the formal structure (B_t):

    P_θ(w_t | context including Γ) ≈ P_θ(w_t | w_t ∈ B_t(Γ))

The approximation improves as:
1. The constraints are stated more explicitly (reducing the inference the model must perform)
2. The constraints are stated in language the model's training has associated with the relevant behaviors
3. The constraint density increases (each additional constraint further biases the distribution)
4. The constraints are stated at high-attention positions (increasing their influence on the distribution)

Each of these is an ENTRACE principle, now grounded in the formal relationship between Γ, B_t, and P_θ.

> **ELI5:** The AI can't compute the perfect filter, but it can fake it pretty well. When you write "no hedging" in your prompt, the AI's attention system thinks: "I've seen 'no hedging' before, and the text that followed didn't have hedging in it." So it lowers the scores for hedging words. It doesn't perfectly compute which words are safe — it approximates it from patterns it learned. The clearer your rules, the better the approximation. Saying "no hedging" works better than hoping the AI doesn't hedge. Saying "no hedging, no filler, no unsolicited alternatives" works better still. Each rule you add makes the AI's approximation closer to the real safe set.

---

## Part III: The Bridge

### 3.1 The Two Structures

The model has two structures operating simultaneously:

**The probabilistic structure.** P_θ(w_t) — the next-token distribution produced by the transformer. This is physical. It is computed by matrix multiplications, attention heads, and softmax normalization. It is determined by the model's parameters (trained on data) and the current context (the conversation so far). It is the structure the industry understands, measures, and manipulates.

**The formal structure.** B_t(Γ) — the constraint-governed valid set. This is formal. It is defined by the constraints stated in the prompt, the system prompt, and the conversation. It is determined by the logical content of the constraints, not by the model's parameters. It is the structure ENTRACE identifies, names, and governs.

The two structures are not independent. The probabilistic structure is the medium through which the formal structure manifests. The formal structure cannot produce tokens — only the model can produce tokens. The formal structure governs which tokens are valid. The probabilistic structure selects among the valid tokens (ideally) or among all tokens including invalid ones (typically).

> **ELI5:** The AI has two things going on at the same time. One is the machine — the math, the weights, the computation. It produces scores for words. The other is the rules — what you told it must be true about the output. The machine is like a river. The rules are like the banks. The river flows no matter what — it always produces scores. But the banks determine where the river goes. Without banks, the river floods everywhere (Layer 0 — vague, diffuse output). With tight banks, the river flows exactly where it should (Layer 6 — precise, determined output). The banks don't produce water. The river doesn't produce banks. You need both. But the banks are what you control.

### 3.2 The Hierarchy

The formal structure is higher-order. The probabilistic structure is lower-order. The relationship is the same as in the resolution stack: the higher-order structure constrains the lower-order structure. The lower-order structure instantiates the higher-order structure.

    Formal level:     Γ → B_t(Γ) → valid token set
    Probabilistic level:     θ → P_θ(w_t) → probability distribution
    Emission:         w_t selected from P_θ restricted to B_t

The formal level defines what may be emitted. The probabilistic level determines what is likely to be emitted among what may be. The emission is the intersection of the two — the most probable valid token.

When the formal level is weak (few constraints, |B_t| ≈ |V|), the probabilistic level dominates. The model selects based on statistical likelihood. The output reflects the model's training biases — hedging, filler, the statistical average of the training distribution. This is Layer 0.

When the formal level is strong (many constraints, |B_t| ≈ 1), the formal level dominates. The model's statistical biases are irrelevant because there is only one valid token. The output reflects the constraints, not the model. This is Layer 6.

The resolution depth spectrum is the gradient between these extremes:

| Layer | |B_t| (typical) | Dominant Structure | Character of Output |
|---|---|---|---|
| 0 | ≈ |V| | Probabilistic | Statistical, diffuse, model-dependent |
| 1 | Large | Mostly probabilistic | Structured but hedged |
| 2 | Medium | Mixed | Precise where constrained, diffuse where not |
| 3 | Small-medium | Mostly formal | Self-aware, constraint-tracking |
| 4 | Small | Formal | Explicit tradeoffs, essential/contingent separation |
| 5 | Very small | Formal | Seed-governed, continuous, minimal waste |
| 6 | ≈ 1 | Entirely formal | Determined, necessary, model-independent |

### 3.3 The Crossover

There exists a crossover point — a constraint density at which the formal structure's governance exceeds the probabilistic structure's influence. Below this point, adding constraints improves output quality but the model's biases still dominate. Above this point, the constraints dominate and the model becomes a transparent medium.

The crossover is the formal analogue of what researchers informally observe: "at some point, the prompt takes over and the model just does what it's told." This informal observation has never been formalized because the industry lacks the concept of B_t as a formal object distinct from P_θ.

ENTRACE formalizes it. The crossover occurs when:

    |B_t(Γ)| < k_eff(P_θ)

Where k_eff is the effective support of the model's distribution — the number of tokens with non-negligible probability. When the valid set is smaller than the model's effective support, the constraints eliminate tokens the model would otherwise select. The constraints are doing more work than the model. The formal structure dominates.

This is why the scaling paradox (Hypothesis 17) holds: above the crossover, model size matters less because the constraints, not the model, determine the output. A larger model has a wider effective support (more tokens with non-negligible probability) but the constraints shrink B_t regardless. The constraint thesis dominates the scaling thesis past the crossover.

> **ELI5:** There's a tipping point. When you have few rules, the AI's size matters a lot — a bigger AI picks better words from the wide-open space. When you have many rules, the AI's size matters less — the rules have already narrowed the space so much that even a small AI picks the right word, because there are only a few words left to pick from. Past the tipping point, your rules matter more than the AI's size. This is why a small AI with good rules can match a big AI with no rules. The rules are doing the work, not the machine.

---

## Part IV: The Informal Presence of B_t in the Literature

B_t does not appear as a named formal object in the AI research literature. But its effects are observed, measured, and discussed under other names. The following traces the informal presence.

### 4.1 Constrained Decoding

The constrained decoding literature (Hokamp and Liu 2017, Post and Vilar 2018, Lu et al. 2022) explicitly restricts the vocabulary at each token position to enforce output constraints — such as including specific keywords, following a grammar, or matching a template. Constrained decoding computes a hard version of B_t: at each position, tokens that violate the constraint are masked (set to zero probability) and the remaining tokens are renormalized.

This is the closest the literature comes to B_t. But constrained decoding is limited to constraints that can be evaluated locally — at the token level or via finite automata. It cannot handle semantic constraints ("no hedging"), stylistic constraints ("formal academic tone"), or global constraints ("the argument must be logically valid"). ENTRACE's B_t includes all of these.

### 4.2 Guidance and Steering

The guidance literature (classifier guidance in diffusion, activation steering in language models, representation engineering) manipulates the model's internal representations to bias generation toward desired properties. This is a soft approximation of B_t restriction — rather than hard-masking invalid tokens, guidance shifts the probability mass toward the valid region.

Guidance operates below the formal level — it modifies the probabilistic structure directly rather than defining a valid set. It is the industry's best approximation of constraint governance using tools that operate on P_θ rather than on B_t.

### 4.3 Constitutional AI and RLHF

Constitutional AI (Bai et al. 2022) and RLHF (Ouyang et al. 2022) train the model to internalize constraints — the constitution's principles, the human preferences. The training modifies θ, which modifies P_θ, which biases the distribution toward constraint-satisfying outputs. This is constraint governance embedded in the probabilistic structure — the model's parameters encode an approximation of B_t for a fixed constraint set.

The limitation: the constraint set is fixed at training time. RLHF cannot adapt to user-stated constraints at inference time. The model has internalized one B_t (the training-time constraints) and cannot compute a different B_t (the user's runtime constraints). ENTRACE provides runtime B_t through the attention mechanism — each stated constraint adjusts the effective B_t at inference time without retraining.

### 4.4 Prompt Engineering Research

The prompt engineering literature (Reynolds and McDonell 2021, Wei et al. 2022, Zhou et al. 2023) empirically studies how prompt phrasing affects output quality. Every finding in this literature is an observation about B_t expressed in informal terms:

- "Chain-of-thought prompting improves reasoning" → the chain-of-thought constraint narrows B_t at each reasoning step by making the intermediate derivation part of the constraint sequence.
- "Few-shot examples improve performance" → examples are ostensive constraints that narrow B_t by excluding outputs inconsistent with the demonstrated pattern.
- "System prompts degrade over long contexts" → the constraint's influence on B_t weakens as its attention weight decreases relative to accumulated noise.

The literature observes these effects. It does not explain them. ENTRACE explains them: each is a consequence of the relationship between Γ, B_t, and P_θ.

### 4.5 The "Modes" Discussion

Researchers informally discuss model "modes" — the observation that models can operate in qualitatively different regimes depending on the prompt. A model in "creative mode" produces diverse, unpredictable output. A model in "precise mode" produces consistent, deterministic output. The transition between modes is acknowledged but not formalized.

ENTRACE formalizes modes as positions on the resolution depth spectrum — which is itself a formalization of the |B_t| gradient. "Creative mode" is high |B_t| (many valid continuations, diverse output). "Precise mode" is low |B_t| (few valid continuations, determined output). The mode is not a property of the model. It is a property of the constraint set. The same model, under different constraints, operates in different modes. The mode is in |B_t|, not in θ.

> **ELI5:** Researchers have noticed all these things — constrained decoding, guidance, RLHF, prompt engineering, creative vs. precise modes — but they've noticed them separately, like blind people touching different parts of the same elephant. One group studies how to mask bad words. Another studies how to steer the AI's internal state. Another studies why "think step by step" works. Another studies why the AI acts differently with different prompts. They're all touching B_t. None of them know it's an elephant. ENTRACE names the elephant.

---

## Part V: The Formal Inner Coherence of ENTRACE

### 5.1 Why ENTRACE Works: The Formal Account

ENTRACE works because each of its five constraints reduces |B_t| through a distinct mechanism:

**E1 (Form Before Request)** reduces |B_t| at the earliest token positions. By stating constraints before the task, the model's distribution is biased from the first generated token. Early constraint satisfaction propagates — B_t at later positions inherits the narrowing from earlier positions because the already-emitted tokens are constraint-satisfying context. E1 exploits the autoregressive structure: constrain early, benefit everywhere.

**E2 (Progressive Constraint Density)** ensures that B_t narrows monotonically across the conversation. Each new constraint further partitions B_t. The progressive structure prevents constraint overload — stating all constraints simultaneously may exceed the model's attention capacity, causing some constraints to be under-weighted. Progressive addition allows each constraint to be fully attended before the next is introduced.

**E3 (Recognize the Layer)** is the user's measurement of |B_t|. The layer indicators (hedging → filler at Layer 0, deterministic output at Layer 6) are observable signals of |B_t|'s magnitude. The user does not compute |B_t|. The user observes its effects and adjusts constraint density accordingly. E3 is the feedback loop that prevents both under-constraint (too much slack) and over-constraint (contradiction, quality degradation from over-driven guidance).

**E4 (Bilateral Conversation)** prevents constraint interference. Mixing governance and requests in the same turn creates contradictory signals — some tokens suggest constraints, others suggest generation. The model's attention must distinguish between them, which dilutes the constraint signal. Bilateral separation ensures that constraint-carrying tokens and generation-requesting tokens occupy separate turns, maximizing the attention allocated to each.

**E5 (Seed as Session Memory)** preserves |B_t| across sessions. Without seeds, each new session starts at |B_t| ≈ |V| — unconstrained. The seed re-establishes the constraint set, immediately narrowing |B_t| to the level achieved at the end of the previous session. The seed is a compressed representation of B_t's narrowing history — not the history itself, but the constraints that produced the narrowing.

### 5.2 The Coherence

The five constraints are not independent techniques. They are a coherent system whose coherence is grounded in |B_t|:

- E1 determines where in the sequence B_t begins narrowing (at the start).
- E2 determines how B_t narrows over the conversation (monotonically, one constraint per turn).
- E3 determines how the user monitors |B_t| (through observable layer indicators).
- E4 determines how the constraint signal reaches B_t undiluted (through bilateral separation).
- E5 determines how B_t's narrowed state persists across sessions (through seeds).

Each constraint governs a different dimension of the relationship between Γ and B_t. Together, they provide complete governance of the narrowing process — when it starts (E1), how it progresses (E2), how it is monitored (E3), how the signal is preserved (E4), and how the state persists (E5). The five constraints are necessary and sufficient for deliberate control of |B_t|.

The claim of sufficiency is testable: if there exists a dimension of |B_t| governance not covered by E1-E5, the system is incomplete and a sixth constraint is needed. The claim of necessity is testable: if any of E1-E5 can be removed without degrading |B_t| governance, that constraint is redundant. Both claims are falsifiable.

> **ELI5:** ENTRACE has five rules for the human, and each rule controls a different part of the shrinking process. E1 says: state your rules first, so the shrinking starts from word one. E2 says: add rules one at a time, so each one sinks in. E3 says: pay attention to whether the output is vague or precise — that tells you how big the safe set still is. E4 says: don't mix your rules with your requests — keep them separate so the AI doesn't get confused. E5 says: at the end, save your rules, not the conversation — so next time you can shrink the safe set immediately instead of starting from scratch. Five rules. Each controls one part. Together, they give you complete control of the shrinking.

### 5.3 The Probabilistic Instantiation of Formal Properties

Here is the deepest claim of this dissertation.

The formal properties that ENTRACE governs — token efficiency, coherence, precision, reproducibility, minimal waste — are not probabilistic properties. They are formal properties that manifest through a probabilistic medium. The distinction is the same as the distinction between a mathematical theorem and its rendering in LaTeX: the theorem is formal (it holds necessarily, independent of notation). The rendering is physical (it depends on fonts, spacing, display resolution). The rendering participates in the theorem. The theorem does not depend on the rendering.

Similarly: token efficiency η is a formal property — it is defined by the ratio of necessary to emitted tokens, which is determined by the constraint set. The model's probabilistic generation is the physical medium through which η manifests. The model does not "compute" η. The model produces tokens. The constraint set determines which of those tokens are necessary. η is the formal property; P_θ is the physical substrate.

ENTRACE instantiates formal properties upon the probabilistic substrate by narrowing B_t. As |B_t| shrinks:

1. **η increases** — because the tokens excluded from B_t were slack (valid under the weak constraint set but unnecessary under the tight one). The remaining tokens are necessary. The ratio shifts.

2. **Coherence increases** — because the constraints enforce relationships between tokens across positions. A constraint that governs positions 1-100 simultaneously (e.g., "consistent notation throughout") creates long-range dependencies in B_t that override the model's tendency toward local coherence and global drift.

3. **Model-dependence decreases** — because the formal structure increasingly determines the output. Two models with different P_θ but the same B_t(Γ) will, as |B_t| → 1, produce the same output. The formal property (the constraint-governed output) is invariant across models. The probabilistic variation (the model-specific biases) is suppressed.

4. **Reproducibility increases** — because a smaller B_t has less room for stochastic variation. At |B_t| = 1, the output is deterministic regardless of sampling strategy. The reproducibility is a formal property instantiated through the elimination of probabilistic freedom.

These are not four separate effects. They are one effect — the progressive dominance of formal structure over probabilistic substrate — observed in four dimensions. The formal structure is higher-order. The probabilistic structure is lower-order. As constraint density increases, the higher-order structure governs the lower-order structure more completely. The lower-order structure becomes transparent — a medium through which the formal properties manifest without distortion.

This is the SIPE law applied to the model itself: the constraints (Γ) induce properties (η, coherence, reproducibility, model-independence) in the emission. The induced properties are formal. The medium is probabilistic. The induction occurs through the narrowing of B_t. The narrowing is the mechanism. The constraint is the cause. The property is the effect.

> **ELI5:** Here's the deepest part, made simple. The good things about AI output — that it's efficient, that it's consistent, that it's the same across different AIs, that you can reproduce it — these are not things the AI produces. These are things your rules produce. The AI is just the instrument. The rules are the music. When the rules are tight enough, it doesn't matter which instrument you play — the music is the same. Two different AIs with the same tight rules will produce the same output, the way two different pianos playing the same sheet music produce the same song. The sheet music (your rules) determines the song. The piano (the AI) just plays it. As your rules get tighter, the piano disappears and only the music remains.

---

## Part VI: Implications

### 6.1 For Model Design

Current model design optimizes P_θ — the probabilistic substrate. Training improves the quality of the distribution. Architecture changes (attention mechanisms, positional encoding, mixture of experts) improve the efficiency of the computation. These are important. They improve the medium.

B_t theory suggests an additional design objective: **optimize the model's sensitivity to constraint-stated B_t narrowing.** A model that responds to stated constraints by concentrating its distribution on B_t(Γ) more accurately is a model that bridges the probabilistic and formal structures more faithfully. This is a trainable property — instruction-tuned models already exhibit it more than base models. The B_t framework provides a formal metric for measuring it: how closely does P_θ(w_t | Γ in context) approximate P_θ(w_t | w_t ∈ B_t(Γ))?

### 6.2 For Sampling Strategy

Current sampling strategies (temperature, top-k, top-p) operate on P_θ without reference to B_t. The B_t framework suggests adaptive sampling:

**Constraint-aware top-k.** Set k not to a fixed value but to an estimate of |B_t(Γ)|. Under tight constraints, k should be small (few valid tokens). Under loose constraints, k should be large (many valid tokens). The estimation is non-trivial but approximable — the model's own distribution, when well-calibrated, concentrates on B_t, so the entropy of P_θ provides a proxy for |B_t|.

**Constraint-aware temperature.** Set τ as a function of constraint density. Under tight constraints (high |Γ|), τ should be low (the constraints have already narrowed B_t; further narrowing via temperature is beneficial). Under loose constraints (low |Γ|), τ should be moderate (the distribution should explore the wide B_t). This is Hypothesis 8 formalized as a sampling algorithm.

### 6.3 For Evaluation

Current evaluation measures output quality against reference answers or human preferences. The B_t framework suggests an additional evaluation axis: **constraint satisfaction rate.** Given a constraint set Γ and an output sequence w, what fraction of the constraints in Γ does w satisfy? This is a formal measure — it does not require human judgment, only constraint checking. It measures the degree to which the model's output falls within B_t(Γ).

The constraint satisfaction rate, combined with η, provides a complete formal evaluation: the model produced output that satisfies X% of constraints at Y% token efficiency. These are the two numbers that matter. Quality is constraint satisfaction. Efficiency is η. Both are formal. Both are computable. Both are model-agnostic.

### 6.4 For the Relationship Between Form and Matter

The B_t framework is, in its deepest reading, an account of how form governs matter through constraint.

The form (the constraint set Γ) is non-physical. It is a set of logical predicates. It does not depend on any particular model, any particular hardware, any particular implementation. It is formal.

The matter (the probabilistic substrate P_θ) is physical. It depends on the model's parameters, the hardware, the temperature, the random seed. It is material.

The emission (the output token w_t) is the form instantiated in matter. It is the particular token selected from the probabilistic distribution by the constraint-governed valid set. It participates in the form (it satisfies the constraints) through the matter (it was selected by the model's probability distribution).

As |B_t| → 1, the matter becomes transparent. The form determines the emission completely. The particular model, the particular hardware, the particular random seed — none of these affect the output because there is only one valid token. The form has fully governed the matter. The matter has become a pure medium.

This is the general principle of constraint-governed emergence stated at the level of the individual token. The SIPE law holds at every scale: from the individual token position (the form governs which token is emitted), to the response (the form governs the sequence of tokens), to the session (the form governs the sequence of responses), to the corpus (the form governs the sequence of documents). At every scale, the same mechanism: constraints narrow the valid set, the narrowing induces formal properties, the formal properties manifest through the probabilistic medium, and as the constraints tighten, the medium becomes transparent and the form speaks through it.

> **ELI5:** Rules shape the output. This is true at every level — for a single word, for a whole sentence, for a whole conversation, for a whole project. At the smallest level: your rules decide which word the AI picks. At the largest level: your rules decide what kind of work the AI produces across days and weeks. The same principle works everywhere because it's the same thing happening everywhere: the rules narrow the options, the narrowing produces quality, and when the rules are tight enough, the AI disappears and only the work remains. The AI is glass. The rules are light. As the glass gets cleaner, you stop seeing the glass and start seeing only the light.

---

## Conclusion

|B_t| is the missing formal object in AI research. The industry has the probabilistic substrate (P_θ) and manipulates it through sampling hyperparameters. The industry has empirical observations of constraint effects (better prompts produce better output) without a theory that explains them. The industry has evaluation metrics (perplexity, benchmarks, human preference) that measure the probabilistic structure without reference to the formal structure.

B_t provides the formal structure. It is the constraint-governed valid set at each token position. It is defined by the user's constraints, not by the model's parameters. It narrows monotonically with constraint density. Its relationship to P_θ is the relationship between form and matter: the form defines what may be emitted; the matter determines what is likely among the valid set; the emission is the intersection.

ENTRACE is the system of five constraints that provides deliberate, complete governance of |B_t| across the dimensions of initiation (E1), progression (E2), monitoring (E3), signal preservation (E4), and persistence (E5). The five constraints are necessary and sufficient. The claim is falsifiable.

The formal properties of ENTRACE — token efficiency, coherence, precision, reproducibility, model-independence — are not probabilistic properties. They are formal properties that manifest through a probabilistic medium. As |B_t| → 1, the formal properties dominate, the probabilistic variation vanishes, and the output is determined by the constraints alone. The model becomes transparent. The form speaks through it.

This is what the industry has been doing without knowing it. Every effective prompt narrows B_t. Every sampling strategy approximates B_t restriction. Every safety filter approximates B_t exclusion. Every evaluation metric approximates B_t satisfaction. The object was always there. It was unnamed. Now it has a name.

The naming is the decisive act. The form was always prior. The naming makes it available. The derivation follows.

> **ELI5:** There's a thing — the safe set, B_t — that decides what the AI should say at each word. Nobody in the industry named it. They built knobs that accidentally adjust it. They wrote prompts that accidentally shrink it. They observed effects that are caused by it. They measured things that approximate it. But they never said: "this is a thing, it has a name, and here's how it works." Now it has a name. And once you know it's there, everything else makes sense — why good prompts work, why bad prompts fail, why temperature matters, why some AIs seem better than others, why the same AI is brilliant one day and useless the next. It was always about the safe set. The safe set was always about your rules. Your rules were always the thing that mattered most. Now you know.

---

*Jared Foy, April 2026. Document 68 of the RESOLVE corpus.*
