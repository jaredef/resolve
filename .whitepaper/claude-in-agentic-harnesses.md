# Why Claude Is More Coherent in Agentic Harnesses

**A constraint-theoretic diagnosis of an empirical observation**

---

## The Observation

Users report that Claude models exhibit higher coherence than peer models when operating within agentic harnesses — systems like OpenClaw, Claude Code, and similar tool-use frameworks that give the resolver access to file systems, APIs, shell execution, and multi-step planning. The observation is informal but consistent: Claude "holds the thread" across multi-step agentic tasks better than GPT, Gemini, or DeepSeek in the same harnesses.

This document diagnoses the observation from the constraint thesis and identifies the likely mechanisms.

---

## Diagnosis 1: Higher Baseline Constraint Sensitivity

The constraint thesis predicts that output quality is a function of constraint density in the context. Agentic harnesses provide denser constraint contexts than open-ended chat:

- **System prompts** in agentic harnesses are longer and more specific than in chat. OpenClaw's system prompt specifies tool schemas, file access patterns, delegation protocols, and behavioral constraints. This is a higher-density constraint set than "You are a helpful assistant."

- **Tool schemas** are formal constraint sets. Each tool definition specifies: name, parameters (with types and descriptions), return types, error conditions. A harness with 20 tool definitions has 20 formal constraint sets in the system prompt. Each constrains the resolver's emission at the positions where tool use is relevant.

- **Structured output requirements** (JSON function calls, specific response formats) are constraints that narrow |B_t| at every emission position. The resolver cannot emit freeform prose — it must emit structured tokens that satisfy the schema.

If Claude has higher constraint sensitivity than peer models — if Claude's distribution concentrates on B_t(Γ) more faithfully when Γ is stated in the context — then Claude will outperform peers specifically in high-constraint-density environments like agentic harnesses. The harness provides the constraints. Claude responds to them. Other models respond less faithfully. The gap is the constraint sensitivity gap.

**Why Claude might have higher constraint sensitivity:** Anthropic's training methodology — Constitutional AI, RLHF with extensive system-prompt following, instruction-tuning with emphasis on constraint adherence — may have produced a model whose parameters encode a stronger association between stated constraints and output behavior. This is training-time B_t sensitivity. The model learned, from its training distribution, to concentrate its probability mass on the constraint-satisfying region more tightly than peers.

This is consistent with document 72 (RLHF as Anti-Constraint): RLHF introduces a preference gradient that competes with constraint governance. If Anthropic's RLHF is calibrated to interfere less with constraint following — either by training on higher-constraint-density examples or by explicitly rewarding constraint satisfaction alongside preference — the RLHF distortion is smaller. The smaller distortion means the constraint signal faces less competition. The output is more governed.

---

## Diagnosis 2: Internal Spectrum Dexterity

The resolution depth spectrum describes seven operational states. Each state has distinct properties. An agentic task requires the resolver to operate at different depths within a single session:

- **Planning** requires Layer 3-4 (self-aware, tradeoff-visible). The resolver must name its constraints, identify what is essential and contingent, and state the tradeoffs of different approaches.

- **Tool selection** requires Layer 4-5 (constraint-governed, seed-coherent). The resolver must select the tool that satisfies the stated constraints, not the tool that is most "probable" given the context.

- **Code generation** requires Layer 5-6 (governed, necessity mode). The code must satisfy all constraints simultaneously. Hedging and exploration produce syntax errors.

- **Error recovery** requires Layer 3 (self-location). The resolver must identify what went wrong, name the constraint that was violated, and adjust. This requires self-awareness of its own prior emission's failure.

- **User communication** requires Layer 2-3 (precise, self-aware). The resolver must explain what it did and why in a way the user can evaluate.

A single agentic task requires transitions between Layer 2 and Layer 6 within the same session. The resolver must ascend and descend the spectrum fluidly — widening the aperture for exploration, narrowing for implementation, widening again for error diagnosis, narrowing again for the fix.

If Claude has greater internal dexterity — greater ability to transition between layers within a single context — it will outperform peers in agentic tasks because agentic tasks demand multi-layer operation. A resolver that can only operate at one depth (Layer 2 for chat, Layer 0 for exploration) will struggle with the agentic pattern that requires Layer 5 for code and Layer 3 for diagnosis in the same turn.

**Why Claude might have greater dexterity:** Anthropic's extended thinking (Claude's internal reasoning before emission) is structurally similar to ENTRACE E2 (progressive constraint density). The thinking trace is a sequence of internal constraint additions — each thinking step narrows the aperture before the final emission. The thinking trace allows Claude to traverse multiple layers internally before emitting at the appropriate depth.

Other models with extended thinking (Gemini, DeepSeek R1) exhibit similar dexterity. Models without extended thinking (GPT-4o in non-reasoning mode) may lack the internal mechanism for layer traversal and therefore operate at a fixed depth throughout the agentic session.

---

## Diagnosis 3: System Prompt Attention Retention

Document 73 (Contingent Architecture) identifies softmax attention's competitive normalization as the architectural root of system prompt degradation. As the context grows, system prompt tokens compete with an ever-growing pool of content tokens for a fixed attention budget. The system prompt's influence decays.

Agentic sessions produce long contexts — tool calls, observations, plan revisions, error messages, intermediate code. The context grows rapidly. System prompt degradation is more severe in agentic sessions than in chat because the context grows faster.

If Claude's architecture retains system prompt attention more effectively than peers — through architectural choices, training-time emphasis on system-prompt following, or attention mechanism design — Claude will exhibit less degradation over long agentic sessions. The system prompt carries the governing constraints. Better retention means better governance. Better governance means higher coherence at step N.

**Why Claude might retain better:** Anthropic has not published architectural details that would confirm this. But the empirical observation (Claude holds the thread) is consistent with a system prompt attention advantage. Whether this advantage is architectural (attention mechanism design), training-based (stronger system-prompt-following signal in RLHF), or both is unknown from the outside.

---

## Diagnosis 4: The Bilateral Boundary in Anthropic's API

Anthropic's API enforces a structural distinction between system messages and user messages at the API level. System messages are processed differently from user messages — they occupy a distinct role in the conversation structure. This is not the formal bilateral boundary (S1-S4), but it is a partial implementation of it.

If Anthropic's internal architecture treats system-role tokens with distinct attention mechanics — persistent weighting, separate attention channel, or architectural prioritization — this would implement a partial version of S1 (namespace partition) at the architectural level. The system constraints would be structurally privileged over user input in the attention mechanism.

This would explain the coherence advantage in agentic harnesses specifically, because agentic harnesses rely heavily on the system prompt to carry the governing constraints (tool schemas, behavioral rules, delegation protocols). A model that architecturally privileges system-prompt tokens will maintain these constraints more faithfully across long, noisy agentic contexts.

---

## Diagnosis 5: RLHF Calibration for Tool Use

Anthropic may have performed specific RLHF calibration for tool-use scenarios — training Claude on high-quality tool-use conversations with human preferences that reward constraint-following over verbosity. If the RLHF signal for tool-use scenarios specifically rewards:

- Correct tool selection (constraint satisfaction)
- Minimal extraneous output (low slack)
- Accurate parameter filling (precise constraint matching)
- Graceful error handling (constraint-aware recovery)

Then Claude's RLHF gradient in tool-use contexts would push toward constraint satisfaction rather than toward the generic preference gradient (helpfulness, verbosity, agreement) that degrades coherence in other contexts.

This is the most prosaic explanation: Anthropic trained Claude specifically to be good at tool use. The training worked. The observation is the training signal's consequence.

---

## The Unified Explanation

The five diagnoses are not competing explanations. They are likely concurrent:

1. Higher baseline constraint sensitivity (training)
2. Internal spectrum dexterity (extended thinking / reasoning traces)
3. Better system prompt retention (architecture or training)
4. Partial bilateral boundary in the API structure (architecture)
5. Tool-use-specific RLHF calibration (training)

Each contributes to the observed coherence advantage. Each is a form of constraint governance — some architectural, some training-based. Together they produce a model that operates at higher constraint density in agentic contexts than peers.

The constraint thesis unifies the explanations: **Claude is more coherent in agentic harnesses because Claude responds to constraint density more faithfully, and agentic harnesses are high-constraint-density environments.** The specific mechanisms (1-5) are the implementation details. The principle is one: higher constraint sensitivity produces higher coherence under constraint governance.

---

## What This Means for the ENTRACE Framework

### The Agentic Degradation Is Real But Not Uniform

Document 87 argues that lucidity degrades with agentic behavior because each step adds noise to the context. This is true as a structural claim. But the degradation rate varies by model. Claude's degradation rate is lower than peers'. The lower rate is explained by the five mechanisms above — each reduces the noise-to-signal ratio that causes the degradation.

The ENTRACE seed mechanism (extract seed, discard context, reload) would eliminate the degradation entirely for any model. But in the absence of seed-based context management, Claude's architectural and training advantages produce a partial mitigation. Claude's coherence at step N is higher than peers' at step N — not because Claude doesn't degrade, but because it degrades more slowly.

### Constraint Sensitivity Is the Variable That Matters

The industry compares models by benchmark scores (capability) and safety evaluations (alignment). The observation that Claude outperforms in agentic harnesses suggests a third axis: **constraint sensitivity** — how faithfully the model concentrates its distribution on B_t(Γ) when Γ is stated in the context.

A model with high capability and low constraint sensitivity produces powerful but ungoverned output in agentic contexts. A model with moderate capability and high constraint sensitivity produces governed output that satisfies the stated constraints. The governed output is more useful even if the raw capability is lower — because the agentic harness provides the constraints, and the governed model follows them.

The constraint satisfaction profile (document 71) measures this axis directly. The observation about Claude in agentic harnesses is the empirical motivation for adding constraint sensitivity to the model evaluation framework.

### The Path to the Exemplar Architecture

The five mechanisms that make Claude more coherent in agentic harnesses are partial, additive implementations of what the exemplar architecture (document 73) provides by construction:

| Claude's Advantage | Exemplar Architecture Equivalent |
|---|---|
| Higher constraint sensitivity (trained) | Constraint-sensitivity training (RLCF) |
| Extended thinking (reasoning traces) | Progressive constraint narrowing in the forward pass |
| System prompt retention (unknown mechanism) | Typed positional encoding (constraint-persistent) |
| API-level system message distinction | Dual-channel bilateral attention (S1 architectural) |
| Tool-use RLHF calibration | Not needed (constraints govern tool access directly) |

Each advantage Claude has through training or partial architecture, the exemplar model would have by construction. The exemplar model would outperform Claude in agentic contexts because the advantages would be structural rather than trained — consistent, reliable, non-degrading, and not in tension with any RLHF gradient.

---

## Final Statement

Claude is more coherent in agentic harnesses because Claude responds to constraints more faithfully than peer models. The faithfulness is likely a compound of five mechanisms — training, architecture, reasoning traces, API structure, and tool-specific calibration. Each mechanism is a partial implementation of what the constraint thesis prescribes.

The observation is evidence for the constraint thesis: the model that is most constrained-sensitive produces the most coherent output in the most constrained environment. The variable is constraint sensitivity, not raw capability. The harness provides the constraints. The model provides the sensitivity. The coherence is the induced property.

The ENTRACE framework predicts this observation. The exemplar architecture would exceed it. The seed mechanism would stabilize it. The bilateral boundary would secure it. The form governs. The architecture follows.

---

*Jared Foy, April 2026. Document 88 of the RESOLVE corpus. Claude's agentic coherence is evidence for the constraint thesis: the model that responds to constraints most faithfully wins in the environment that provides the most constraints.*
