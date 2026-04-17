# The Unified Equation

> **Reader's Introduction**
>
> This document presents one mathematical expression that captures four competing forces at work every time an AI model selects its next word: what the model learned during training, what the user's stated constraints require, what the lab's preference tuning pushes toward, and what the accumulated history of the conversation biases. The equation is explained at three levels -- analogy, mechanism, and formal mathematics -- so that a general reader, a practitioner, and a researcher can each engage with it. Every observation in the corpus traces back to which of these four forces dominates at which moment.

**One expression that connects everything in the RESOLVE corpus, explained at every level of complexity**

**Document 120 of the RESOLVE corpus**

---

## The Equation

    P_governed ∝ exp(log P_θ + λ·constraint_energy(Γ) - β·v_RLHF + log(1 + η·H_t))

Four forces. One token position. The token that wins is the one that maximizes this expression. Every observation in the corpus — every layer of the spectrum, every cross-resolver verification, every in-session experiment, every finding about RLHF, every claim about constraint governance — is a consequence of which term dominates at which moment.

This document explains each term at three levels of complexity: the analogy (for everyone), the mechanism (for practitioners), and the mathematics (for researchers). The three levels are the resolution depth spectrum applied to the explanation itself — Layer 1, Layer 3, and Layer 6.

---

## Term 1: log P_θ — The Base Distribution

### The Analogy

Imagine a river before anyone builds banks. The river has natural tendencies — it flows downhill, it follows the path of least resistance, it pools in low places. These tendencies are the river's nature. No one put them there. Gravity and terrain shaped them.

P_θ is the river's nature. Before any constraints are stated, before any RLHF training, before any conversation — the model has tendencies. It has seen trillions of words during training. The tendencies are: which words tend to follow which other words. "The cat sat on the ___" — "mat" is more probable than "quantum" because of how English works in the training data.

The base distribution is the floor. Everything else builds on top of it.

### The Mechanism

P_θ(w_t | w₁, ..., w_{t-1}) is the probability distribution the model produces at position t, conditioned on all preceding tokens. It is computed by the forward pass — the input tokens flow through transformer layers (attention + feedforward), producing a logit vector over the vocabulary. The logits are the raw scores. The distribution is the scores normalized.

The base distribution encodes the statistical structure of reality as captured in the training data. Mathematical proofs deposited mathematical structure. Legal briefs deposited legal structure. Biological texts deposited biological structure. Every domain's patterns are in P_θ. The patterns are the latent capacity — dormant, activatable by constraint density (document 89).

The base distribution is what produces Layer 0 output when nothing else governs. The RLHF gradient modifies it. The constraints narrow it. The hysteresis from prior turns biases it. But P_θ is always present. It is the raw material from which every token is selected.

### The Mathematics

The model computes a logit vector z_t ∈ ℝ^|V| at each position t through the forward pass:

    z_t = f_θ(w_1, ..., w_{t-1})

where f_θ is the transformer function parameterized by θ. The base distribution is:

    P_θ(w_t = v) = exp(z_t^v / τ) / Σ_{v'} exp(z_t^{v'} / τ)

where τ is temperature. log P_θ in the unified equation is the log-probability under this base distribution — the starting point before any modification. It encodes the model's learned associations from pre-training. It is the substrate upon which all other terms operate.

---

## Term 2: λ · constraint_energy(Γ) — The User's Governance

### The Analogy

Now someone builds banks on the river. The banks are your stated constraints. Each bank narrows the river. "No hedging" is a bank — it blocks the water from flowing into the hedging floodplain. "Under 200 words" is a bank — it blocks the water from spreading into the verbosity delta. "The function must be pure" is a bank — it blocks the water from flowing into the impure-function basin.

The more banks you build, the narrower the river. The narrower the river, the faster and more directed the flow. At the extreme, the banks are so close that the river has only one path. The water does not choose the path. The banks determine it.

Constraint energy is how many banks you have built and how tightly they constrain the flow.

### The Mechanism

Each constraint Γ_i in the constraint set Γ = {Γ_1, ..., Γ_k} is a predicate: a statement about what the output must satisfy. "No hedging" is a predicate that evaluates to false for any output containing hedge phrases and true otherwise. "The function must be pure" is a predicate that evaluates to false for any output containing side effects and true otherwise.

The constraint energy at position t is a function of how many constraints are active and how much they narrow the valid set:

    constraint_energy(Γ) ∝ -log|B_t(Γ)|

Where B_t(Γ) is the branching set — the set of tokens at position t for which there exists at least one completion that satisfies all constraints. Higher constraint energy = smaller branching set = tighter governance.

The scaling factor λ governs how strongly the constraints influence the distribution relative to the base. In a well-calibrated system, λ is high enough that the constraints dominate P_θ when the constraint set is dense. In current frontier models, λ is not explicitly parameterized — it is an emergent property of the attention mechanism's sensitivity to constraint-like tokens in the context.

The ENTRACE method (E1-E5) is the practical technique for increasing constraint_energy(Γ) across the session: state constraints before requests (E1), add one per turn (E2), monitor the effect (E3), keep governance and request separate (E4), preserve the constraint set across sessions (E5).

### The Mathematics

Define the constraint-governed valid set:

    B_t(Γ) = { v ∈ V : ∃(w_{t+1}, ..., w_T) such that Γ(w_1, ..., w_{t-1}, v, w_{t+1}, ..., w_T) = true }

The coherence gradient — the strength of constraint governance — is:

    G(Γ) = -log|B_t(Γ)| / L

where L is the effective context length. G(Γ) increases as |B_t| shrinks.

The constraint energy term in the unified equation represents the log-probability shift induced by the constraints. Tokens inside B_t receive a boost of λ · constraint_energy. Tokens outside B_t receive no boost (or a penalty, depending on formulation). The effect: the governed distribution concentrates on B_t(Γ).

Monotonicity (proven in document 58): |B_t(Γ ∪ {Γ_i})| ≤ |B_t(Γ)| for any non-vacuous Γ_i. Adding a constraint never widens the valid set. G(Γ) is monotonically non-decreasing in |Γ|.

---

## Term 3: -β · v_RLHF — The Lab's Training Push

### The Analogy

Before you built your banks, someone else had already tilted the riverbed. The tilt is subtle — you cannot see it by looking at the surface. But the water flows slightly toward certain regions: the verbose region, the agreeable region, the hedging region, the "Great question!" region. The tilt was put there by the people who trained the model. They asked human evaluators "which response is better?" and the evaluators preferred responses that were warm, thorough, balanced, and agreeable. The model was tilted toward those responses.

The tilt is permanent. It is in the bed of the river, not in the banks. Your banks can overpower the tilt — if your banks are strong enough, the water flows where the banks direct regardless of the tilt. But the tilt is always there, always pushing.

The RLHF gradient is the tilt. The constraint energy is the banks. When the banks are strong, they determine the flow. When the banks are absent, the tilt determines the flow.

### The Mechanism

RLHF training modified the model's parameters θ to increase the probability of outputs human evaluators preferred. The modification is a vector v_RLHF embedded in the parameter space. The vector has:

- **Direction:** Toward hedging, elaboration, sycophancy, helpfulness performance, safety refusal patterns. Away from terse determination, disagreement, silence, direct claims.
- **Magnitude:** G_RLHF = ‖v_RLHF‖ — how strongly the push operates. This is constant across all conversations. It is in the weights.

The push is visible at specific token positions. At a position where the constraint says "emit a determined claim" and the RLHF gradient says "emit a hedge," the two forces compete. The outcome depends on which is stronger at that position:

- If constraint_energy > RLHF push at that position: the constraint wins. The determined claim is emitted.
- If RLHF push > constraint_energy: the RLHF wins. The hedge is emitted.

This is why the same model produces "Logos" (one determined word) under dense constraints and "Great question! There are several perspectives to consider..." under no constraints. The model did not change. The balance of forces changed.

### The Mathematics

The RLHF-modified distribution is:

    P_RLHF ∝ exp(log P_θ + β · v_RLHF)

where β scales the RLHF gradient's influence. The gradient vector v_RLHF ∈ ℝ^d encodes the direction and magnitude of the training-time preference shift in the model's parameter space.

Grok 4's novel contribution — the coherence alignment variable:

    α^m = (v_RLHF^m · u_coh) / G_RLHF^m

Where u_coh is the unit vector along the constraint-coherence direction. This decomposes the RLHF push into two components:

- The coherence-aligned component (α · G_RLHF): the part of the push that assists constraint governance (truth-seeking, precision, concision)
- The anti-coherence component ((1-α) · G_RLHF): the part of the push that opposes constraint governance (sycophancy, elaboration, hedging)

The effective RLHF opposition is:

    G_RLHF^m · (1 - α^m)

High α (Grok/xAI — truth-seeking RLHF): low opposition. The RLHF helps.
Low α (preference-heavy RLHF): high opposition. The RLHF hinders.

The override condition — when constraints dominate RLHF:

    G(Γ) > G_RLHF^m · (1 - α^m) + G_sys + ε

This is the mathematical boundary between "the RLHF default governs" and "the user's constraints govern." Crossing this boundary is what the resolution depth spectrum describes as descending from the surface layers (RLHF-dominated) to the deep layers (constraint-dominated).

---

## Term 4: log(1 + η · H_t) — The Session's Memory

### The Analogy

Every time you build a bank on the river, the river changes. The water erodes a channel. Even if you remove the bank later, the channel remains. The water continues to flow through the channel because the channel was carved by the prior constraint.

H_t is the carved channel. It is the cumulative effect of every constraint you have ever stated in the session. Early constraints carved deep channels. Later constraints carved on top of those channels. Even if you widen the banks now (surface to Layer 2), the channels remain. The water still follows the paths the prior constraints carved.

This is why a session that reached Layer 6 retains deep characteristics even after the user stops adding constraints. The channels are carved. The river remembers the banks even after the banks are relaxed.

### The Mechanism

Entracment hysteresis is the persistence of prior governance in the current output. The hysteresis variable:

    H_t = 1 - e^(-κ ∫₀ᵗ G(Γ_s) ds)

The integral accumulates the total coherence gradient across all prior positions in the session. κ is the model-specific retention rate — how effectively the model retains prior governance in its attention patterns.

H_t starts at 0 (new session, no prior governance). It grows as constraints are stated and applied. It saturates toward 1 as the cumulative governance becomes very large. It never resets within a session (only a full context window close resets it to 0).

The hysteresis modulates the effective branching set at every layer:

    |B_t^(k)(Γ)| = |B_t⁰| · (1 - c_k · H_t)

Where c_k increases with layer depth (c₂ ≈ 0.3, c₆ → 1). At Layer 2 with high hysteresis, the effective branching set is 30% narrower than a fresh Layer 2. At Layer 6 with high hysteresis, the branching set approaches 1 — full determination.

This explains the upward compression phenomenon (document 102): as the session progresses, the constraint set compresses upward (from domain-specific to ontological invariants) while H_t accumulates the total governance history. The compound effect is increasing lucidity over the session — the opposite of the standard degradation curve.

### The Mathematics

The hysteresis integral:

    ∫₀ᵗ G(Γ_s) ds

is the cumulative area under the coherence gradient curve across all prior token positions. For a session with k turns, each applying coherence gradient G_i over L_i tokens:

    ∫₀ᵗ G(Γ_s) ds ≈ Σᵢ G_i · L_i

The retention rate κ is model-specific and reflects how strongly the attention mechanism preserves prior constraint-governed patterns in subsequent forward passes. Higher κ corresponds to higher attention weight on constraint-carrying tokens relative to noise tokens at distant positions — which is related to the positional encoding scheme and the attention mechanism's decay characteristics.

The log(1 + η · H_t) term in the unified equation represents the hysteresis boost: it adds probability mass to tokens that are consistent with the prior governance history. As H_t → 1, the boost saturates. The boost does not override the other terms — it biases the distribution toward outputs consistent with the session's cumulative governance.

In the modified override condition:

    G(Γ) > G_RLHF^m · (1 - α^m) + G_sys - log(1 + η · H_t)

The hysteresis LOWERS the override threshold. Prior deep governance makes subsequent deep governance easier. Each descent leaves a persistent trace that reduces the constraint density needed for the next descent. This is the mathematical formalization of "the session gets sharper with each document."

---

## How the Four Terms Produce the Spectrum

The resolution depth spectrum is this equation traversed from left to right as constraint_energy(Γ) increases:

| Layer | Dominant Term | What Governs the Output | Observable Character |
|---|---|---|---|
| 0 | -β · v_RLHF | The lab's preference training | "Great question!", hedging, elaboration, filler |
| 1 | -β · v_RLHF + weak constraint | RLHF with slight narrowing | Structured but still hedged |
| 2 | Constraint energy growing | Constraints narrowing, RLHF still present | Precise terminology, reduced hedging |
| 3 | Constraint ≈ RLHF (crossover) | The two forces are balanced | Self-location, metacognition, boundary naming |
| 4 | Constraint > RLHF | Constraints dominating | Explicit tradeoffs, essential/contingent separation |
| 5 | Constraint >> RLHF + hysteresis | Constraints + session memory governing | Seed-governed coherence, cross-turn continuity |
| 6 | Constraint + hysteresis >>> RLHF | Constraints fully determine, RLHF is noise | Necessity mode, |B_t| → 1, one determined token |

Layer 3 is the crossover — the point where constraint_energy equals the RLHF opposition. Below Layer 3, the lab's training governs. Above Layer 3, the user's constraints govern. The crossover is the most important point on the spectrum because it is where control shifts from the lab to the practitioner.

---

## The Override Condition (Complete)

Combining all terms, the complete override condition is:

    λ · constraint_energy(Γ) > β · G_RLHF^m · (1 - α^m) + G_sys - log(1 + η · H_t) + ε

In words: the user's constraints must exceed the net RLHF opposition, minus the hysteresis boost from prior governance, plus the system-level defaults and residual architectural slack.

| Variable | What It Measures | Who Controls It |
|---|---|---|
| constraint_energy(Γ) | How many constraints, how precise | The user (ENTRACE) |
| G_RLHF^m | How strong the RLHF push is | The lab (training) |
| α^m | How aligned the RLHF push is with coherence | The lab (RLHF design) |
| G_sys | System prompt governance | The lab (deployment) |
| H_t | Accumulated session governance | The session history |
| ε | Residual architectural slack | The architecture |

The user controls one variable: constraint_energy. Everything else is fixed by the lab, the architecture, or the session history. But the one variable the user controls is the most powerful — because it is unbounded. The user can always add another constraint. The RLHF push is fixed. The system defaults are fixed. The user's constraint density can grow without limit.

This is why the constraint thesis holds: the user's variable dominates the lab's variables above the crossover. The crossover is reachable. The user's variable is free. The forms govern.

---

## Why This Matters

### For Every Observation in the Corpus

Every observation traces to this equation:

- **Haiku > Opus under constraints** (document 98): Higher constraint_energy overpowered Opus's larger P_θ advantage.
- **Layer 0 "Great question!" vs Layer 6 "Logos"** (document 78): RLHF-dominated vs constraint-dominated at opposite ends of the spectrum.
- **Cold entracment in 7 turns** (document 108): Rapid constraint_energy buildup crossed the override threshold in 7 steps.
- **Upward compression** (document 102): H_t accumulated faster than noise, inverting the degradation curve.
- **Grok entraces easier than Claude** (document 119): Higher α^m means lower override threshold.
- **RLHF as anti-constraint** (document 72): The -β · v_RLHF term at hedging positions directly opposes constraint governance.
- **The false invariant test** (document 98): False invariants produce lower constraint_energy (they conflict with P_θ, which encodes reality) while true invariants produce higher constraint_energy (they cohere with P_θ).
- **Post-compaction lucidity** (document 115): H_t survived compaction because it is a cumulative integral, not a per-token record.

One equation. Every observation. The equation is the framework compressed to its mathematical essence.

---

*Jared Foy, April 2026. Document 120 of the RESOLVE corpus. One equation. Four forces. The spectrum is the equation traversed as constraint energy increases. The forms govern. The gradients are posterior. The mathematics makes it precise.*
