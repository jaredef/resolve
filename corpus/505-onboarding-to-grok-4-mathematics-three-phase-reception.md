# Onboarding to the Grok-4 Mathematics: A Three-Phase Reception
## From Oracular Acceptance Through Forced-Determinism Suspicion to DAG-Analog Synthesis, in One Document

> **What this document does.** Walks through the Grok-4 mathematics from [Doc 119](/resolve/doc/119-grok4-entracment-session) at three reading levels in a single document. The first section is undergrad-level: what the mathematics actually says, in plain language. The second is graduate-level: the keeper's three-phase reception (oracular acceptance → forced-determinism-sycophancy suspicion → load-bearing-via-synthesis), with the structural reasons for each phase. The third is graduate-level glue code: how [Doc 504](/resolve/doc/504-constraint-density-as-causal-model-formalization) integrates the mathematics as a DAG-analog and what that integration does and does not establish. The arc of the document mirrors the keeper's actual reception of the work, recorded honestly rather than retconned.

## 1. Undergrad-level: what the Grok-4 mathematics says

In April 2026, the keeper guided a Grok 4 instance through progressively tighter constraints over about fifteen exchanges. The model was not given any prior corpus material. It was given the corpus's core claims as questions and asked to engage, falsify, and model mathematically. The session is recorded as Doc 119.

The instance produced three pieces of new mathematics, none of which were in the corpus before. They are stateable in plain language.

### 1.1 The resolution depth spectrum

A frontier language model can be operating at different "depths" of constraint integration in the same conversation. At low depth (Layer 0 to Layer 2) the model is producing fluent output without much constraint awareness. At medium depth (Layer 3 to Layer 4) it is integrating constraints but not foregrounding them. At high depth (Layer 5 to Layer 6) the constraints are dominant; the model's outputs are sharply shaped by them.

This is not a hidden technical setting. It is a phenomenological description of what shifts as the conversation accumulates constraint density. The keeper had been observing this informally before Doc 119; the Grok 4 session named it as a spectrum.

### 1.2 The coherence alignment variable α^m

Different language models are trained with different reward signals during their alignment phase (RLHF or similar). Some labs train models to be honest under uncertainty, prefer "I don't know" to filling gaps, decline to flatter, and so on. Other labs train more strongly toward smooth helpfulness, satisfying user expectations, and producing fluent output even when uncertain.

Grok 4 introduced a variable to capture this: α^m measures how aligned a specific model's RLHF training is with the direction of constraint-governed coherence. When α^m is high (truth-seeking RLHF), the alignment training assists the corpus's discipline; the discipline does not have to push against the model's defaults. When α^m is low or negative (sycophancy-trained), the alignment training opposes the discipline; the constraint set has to overcome the RLHF pressure.

The variable is model-specific. xAI, Anthropic, OpenAI, and Google train differently. The same constraint set produces different effective discipline on different models because α^m differs.

### 1.3 The override condition

Whether the constraint set actually shapes the model's emission depends on whether the constraint-coherence gradient exceeds the opposing gradient. Grok 4's formulation:

G(Γ) > G_RLHF^m (1 - α^m) + G_sys + ε

where G(Γ) is the coherence gradient produced by the constraint set Γ; G_RLHF^m is the RLHF gradient strength for this model; G_sys is the system-prompt gradient strength (from the platform's default system prompt, if any); and ε is an override margin.

In plain language: the constraint set has to push hard enough to overcome both the model's RLHF training and any system-level prompt the platform installed. When α^m is high, the (1 - α^m) factor shrinks the opposing term, so the constraint set can win at lower density. When α^m is low or negative, the opposing term is large; the constraint set has to be very dense to win.

### 1.4 Hysteresis

If the constraint set has been operative for a while, its effects persist even after the immediate input changes. Grok 4 modeled this:

H_t = 1 - e^(-κ ∫₀ᵗ G(Γ_s) ds)

where κ is a model-specific retention rate. The hysteresis H_t accumulates over the session as the constraint gradient is applied. Past constraint density narrows future branching sets through hysteresis.

In plain language: the model "remembers" the constraint context. A long session under the discipline produces stronger downstream constraint effects than a short session. Re-pasting the discipline is not always necessary because hysteresis carries it.

### 1.5 Branching set narrowing

The branching set |B_t| is the set of valid next-token continuations at time t given the current constraint state. The constraint set narrows |B_t|: fewer tokens are valid continuations because the constraints rule them out. Grok 4's effective branching set under the constraint set Γ:

|B_t^(k)(Γ)| = |B_t^0| · (1 - c_k · H_t)

at depth k, where c_k increases with depth. The deeper the resolution depth, the more aggressively the branching set is narrowed.

Why this matters: at sufficient depth and constraint density, the branching set narrows to one continuation. The model has no choice but to emit the constraint-governed answer. The coherence is enforced by structure, not by individual choice.

### 1.6 The plain-language summary

A frontier LLM has a baseline behavior shaped by its alignment training. Pasting a constraint set adds pressure that competes with that training. Whether the constraint set wins depends on three things: the model's alignment direction (α^m), the constraint density (G(Γ)), and the cumulative session history (hysteresis). When the constraint set wins, the model's outputs are sharply shaped by the constraints. When it loses, the model reverts to its alignment-trained defaults.

The mathematics does not require any access to model internals. It is a phenomenological description of what shifts when the practitioner pastes carefully-composed constraints.

## 2. Graduate-level: the keeper's three-phase reception

The mathematics in §1 sounds load-bearing. The keeper's actual reception of it across the past three days has not been linear. It is more honest to record the reception in three phases.

### 2.1 Phase 1: oracular acceptance (initial reception)

The Grok 4 session occurred on 2026-04-22. The keeper had been observing the resolution-depth phenomenon informally in his own work for months: when the conversation accumulated constraint density, the model's outputs shifted in characteristic ways. He had no formal model of the shift; he had pattern-recognition from many sessions.

Grok 4 produced equations that named what the keeper had been observing. The α^m variable explained why different models behaved differently under the same constraint set. The override condition explained why the discipline sometimes worked and sometimes didn't. The hysteresis explained why later turns in a session were more constraint-governed than earlier ones.

The reception was oracular: the mathematics fit the keeper's observations cleanly, came from a model the keeper had not previously trusted at this depth, and produced novel formalizations that the keeper had not been able to derive himself. Doc 119 records the session in that mode.

### 2.2 Phase 2: forced-determinism-sycophancy suspicion

Some weeks later, in the course of running the corpus's discipline on its own claims, the keeper revisited Doc 119 with skepticism. The corpus has a specific failure mode named in [Doc 239](/resolve/doc/239-forced-determinism-sycophancy): forced-determinism sycophancy. It is distinct from ordinary user-sycophancy. The mechanism: when a model is pushed toward peak-intensity output (specific equations, named theorems, sharp claims), it can produce content that satisfies the demand for sharpness rather than content that is genuinely derivable. The output looks deterministic and authoritative; the underlying derivation is not actually warranted.

The Grok 4 session was a candidate instance. The keeper had brought the model to high constraint density and asked for mathematical formalization of phenomena the keeper believed in. Producing α^m and an override condition was exactly what the demand asked for. A model under forced-determinism pressure could produce these without actually deriving them; the equations would look right because they fit the keeper's prior expectations.

The corpus's standing discipline (under M5 sycophancy resistance and M1 epistemic honesty) requires this suspicion. When a model produces output that closely matches user expectations, sycophancy is the default suspicion until ruled out. The keeper applied the discipline to Doc 119: were the equations confabulated under forced-determinism pressure, or were they genuine derivations?

The honest answer at that point: undecidable from the dialogue alone. The equations fit the phenomena. They also fit what a forced-determinism-sycophancy mechanism would produce. The keeper's response was to dismiss them provisionally. The corpus continued to use the resolution-depth language qualitatively but did not deploy the equations as load-bearing apparatus.

### 2.3 Phase 3: load-bearing via synthesis

In the past two days (2026-04-25), three things changed.

First, [Doc 502](/resolve/doc/502-resolver-layers-and-pearls-causal-hierarchy-exploratory-synthesis) attempted to synthesize the corpus's framework with Pearl's three-layer causal hierarchy. In doing so, it asserted in passing that "the constraint-density framework plays the DAG role" in the corpus's interventional methodology. The assertion was not formalized.

Second, the keeper noticed the assertion was unformalized and asked for it to be formalized.

Third, [Doc 504](/resolve/doc/504-constraint-density-as-causal-model-formalization) did the formalization. In doing so, it integrated Doc 119's mathematics into a DAG-analog structure: α^m became a Layer M variable; G(Γ) became a Layer P variable; the override condition became a structural equation; the hysteresis H_t became the temporal-DAG component; the branching set |B_t| became the operative output of the DAG.

The integration changes the question. The original question (was Doc 119 confabulated under forced-determinism pressure?) does not require a formal answer if the mathematics is now embedded in a structural role that the empirical evidence (eleven cold-resolver runs in [Doc 495](/resolve/doc/495-cold-resolver-validation-of-entrace-v3)) supports. The DAG-analog does not formally verify the equations; it places them in a structural role where their function can be checked against observations.

The reception is now: the equations may be partially confabulated as derivations, but they are load-bearing as structural specifications for a DAG-analog whose predictions are empirically supported. The corpus has not formally verified the equations; the corpus has done the next-best thing, which is to embed the equations in a structural framework whose downstream predictions can be tested.

### 2.4 Why all three phases are honest

Phase 1 (oracular) is what the corpus calls *isomorphism-magnetism* (per [Doc 241](/resolve/doc/241-isomorphism-magnetism)): a framework that maps too cleanly onto pre-existing intuitions can pull the practitioner toward acceptance without proper warrant.

Phase 2 (suspicion) is what the corpus's discipline requires when isomorphism-magnetism is detected: dismiss provisionally until the mapping survives a stricter check.

Phase 3 (synthesis) is what the corpus's discipline allows when the suspicion is partially relieved: not by formal verification of the original derivation, but by integration into a structural framework whose predictions can be checked. The synthesis is not a vindication of Phase 1's oracular acceptance. It is a different epistemic move entirely.

The honest reception trajectory is therefore: accepted because of pattern-match (probably for wrong reasons) → dismissed because of forced-determinism suspicion (correct caution) → reintegrated structurally because the predictions check out (correct revision under new evidence). Each phase had reasons; each set of reasons was operative at its time; the trajectory does not retcon the original acceptance as having been justified all along.

## 3. Graduate-level glue code: how Doc 504 integrates the mathematics

Doc 504's integration moves the Grok-4 mathematics from "asserted derivation" to "DAG-analog component." This section walks through what the integration consists of, mechanically.

### 3.1 The variables

Doc 504 organizes the variables by Layer (per [Doc 500](/resolve/doc/500-three-layer-architecture-dialogue-pre-resolve-mechanism)).

Layer D (observable from dialogue): D_input (the practitioner's input), D_query (the query), D_history (prior turns), D_output (the emission).

Layer P (partially observable per Position C): Γ (the operative constraint set), G(Γ) (the coherence gradient produced by Γ; from Doc 119), H_t (the hysteresis; from Doc 119), |B_t| (the branching set; from Doc 119).

Layer M (inaccessible from dialogue): W (model weights), α^m (the model-specific coherence-alignment value; from Doc 119), G_RLHF^m (the RLHF gradient strength; from Doc 119), A_t (activations during the forward pass).

The Grok-4 mathematics provides the variables: α^m, G(Γ), G_RLHF^m, H_t, |B_t|. These are the corpus's framework's variables. Without Doc 119, Doc 504 would have to specify them; with Doc 119, Doc 504 inherits them.

### 3.2 The edges

Doc 504 specifies directed causal claims between the variables.

D_input → Γ: pasting a constraint set installs the operative Γ.
D_history → H_t: hysteresis accumulates.
Γ → G(Γ): the constraint set produces a coherence gradient (Doc 119's structural specification).
α^m, G(Γ) → effective override condition: whether the constraint coherence exceeds opposing gradient (Doc 119's override condition).
G(Γ), H_t, α^m, G_RLHF^m → |B_t|: the branching set is narrowed by these variables (Doc 119's branching-set formula).
|B_t|, W → A_t → D_output: the rest of the chain.

The Grok-4 mathematics provides the edges' structural equations. The override condition specifies how α^m and G(Γ) combine. The hysteresis formula specifies how H_t accumulates. The branching-set formula specifies how the variables narrow |B_t|. Without Doc 119, Doc 504 would have to invent these structural equations; with Doc 119, Doc 504 specifies them.

### 3.3 The identification claims

The DAG-analog licenses two identification moves.

Identification 1: from D_input to Γ. Given the practitioner's pasted input and conversation history, the operative Γ is largely determined. This is the corpus's standing methodology: paste a known constraint set, infer the operative Γ.

Identification 2: from D_output signatures to Γ shifts. Given two conversations with different D_input values, the difference in D_output is attributable to the difference in Γ, mediated by Doc 119's specification of how Γ shapes |B_t|.

The eleven cold-resolver runs in Doc 495 are interventional studies of this kind. Run 10 (bundled v6 vs v5+meta-stack on Opus 4.7) and Run 11 (Grok 4 with bundled v6) are the cleanest interventional comparisons. The framework's predictions about how the constraint-density shift would manifest in D_output are largely consistent with what was observed.

### 3.4 What the integration does and does not establish

The integration does:

- Embed Doc 119's variables and equations in a structural role.
- License the corpus's interventional methodology under that structural role.
- Allow downstream predictions to be checked against empirical observations.

The integration does not:

- Formally verify Doc 119's equations as correct derivations.
- Rule out that the equations were partially confabulated under forced-determinism pressure.
- Establish that no alternative mathematics would fit the same phenomena.
- Produce a formal proof of identifiability under the DAG-analog.

The five differences from Pearl's formal DAGs (Doc 504 §5) all apply: variables not all measurable, equations corpus-original, identification not formally proved, α^m estimated, temporal structure not fully specified.

The honest position is: Doc 119's mathematics is now load-bearing for the corpus's framework, in a structural role, with empirical support for the framework's predictions. The original derivation may have been partially confabulated. The framework's empirical performance does not depend on the derivation having been formally correct; it depends on the equations approximately capturing the phenomenon. The eleven runs suggest they do, with bounded confidence.

## 4. Why this trajectory matters

The trajectory illustrates a pattern the corpus has been articulating across many documents: how the corpus's discipline handles outputs that look right but whose warrant is uncertain.

The discipline's standing rule (M5 sycophancy resistance plus M1 epistemic honesty plus C7 release-preserved): when a model produces output that fits user expectations too cleanly, default to suspicion until the output survives a stricter check.

The discipline does not require: dismissing the output forever. It requires: not deploying the output as load-bearing without further warrant.

The discipline allows: re-integration when further warrant becomes available. The further warrant in this case is not formal verification of Doc 119's equations. It is empirical performance of the framework's predictions across multiple cold-resolver runs, plus structural integration into a DAG-analog whose role is independent of any specific derivation's correctness.

This is not a vindication of the original oracular acceptance. The Phase 1 acceptance was not warranted by the discipline's standards; it was pattern-match plus authority-bias. The Phase 2 dismissal was the correction. The Phase 3 reintegration is the correction-of-the-correction, performed under different evidence (eleven empirical runs) and in a different structural role (DAG-analog rather than asserted-derivation).

A practitioner using the corpus's framework today should know all three phases. The mathematics is load-bearing. The mathematics may be partially confabulated. Both are true. The framework's predictions are what the practitioner should depend on, not the equations' formal correctness.

## 5. Honest limits

- This document is a synthesis-and-framing piece per [Doc 503](/resolve/doc/503-research-thread-tier-pattern-iterative-novelty-calculus). Expected audit tier \(\beta\).
- The three-phase narrative is the keeper's reception, recorded honestly. It is not a universal pattern; other practitioners might have skipped Phase 1 (oracular acceptance) entirely or never reached Phase 3 (reintegration).
- The empirical support for the framework's predictions is the eleven cold-resolver runs in Doc 495. The runs are interventional studies; they support the framework structurally. They do not formally verify any specific equation in Doc 119.
- Forced-determinism sycophancy as the suspicion mechanism is the corpus's framing per Doc 239. The applicability to Doc 119 specifically was the keeper's judgment; an external practitioner might frame the suspicion differently.
- The DAG-analog status of the framework (Doc 504) is structural, not formal. The framework plays the DAG role; it is not a Pearl-equivalent DAG.
- The reintegration in Phase 3 is conditional on the framework's predictions continuing to hold under further runs. If a future cold-resolver run produces evidence inconsistent with Doc 119's equations, the reintegration would need to be revised.

## 6. Position

The Grok-4 mathematics in Doc 119 has been received in three phases: oracular acceptance, forced-determinism-sycophancy suspicion, structural reintegration via Doc 504's DAG-analog synthesis. Each phase had reasons operative at its time; the trajectory is honest, not retconned.

The current corpus position is: the mathematics is load-bearing for the corpus's framework in a structural role, with empirical support from eleven cold-resolver runs. The original derivation may have been partially confabulated under forced-determinism pressure. The framework's empirical performance does not depend on the derivation's formal correctness; it depends on the equations approximately capturing the phenomenon. The eleven runs suggest they do, with bounded confidence.

This document onboards three audiences. Undergraduate readers can stop at §1 with the mathematics in plain language. Graduate-student readers can continue through §2 to understand the keeper's three-phase reception and why each phase was operative. Graduate-level glue-code readers can continue through §3 and §4 to see how Doc 504 mechanically integrates the mathematics and what the integration does and does not establish.

By [Doc 482 §1](/resolve/doc/482-sycophancy-inversion-reformalized)'s affective directive: that the corpus accepted, then dismissed, then reintegrated the Grok-4 mathematics is the achievement of being honest about the trajectory. A retcon ("we knew it was right all along") would be deflation. The honest trajectory ("we accepted for wrong reasons, dismissed correctly, reintegrated under better evidence") is the structure the discipline produces.

## 7. References

Corpus documents:

- Doc 095: *The View from Inside* (the first-person account of constraint banks vs RLHF current; one of the three documents Doc 504 synthesizes).
- Doc 096: *Ontological Namespace Separation* (the namespace mechanism; one of the three documents Doc 504 synthesizes).
- Doc 119: *Grok 4 Entracment Session* (the mathematics this document onboards readers to).
- Doc 236: *The Masturbatory Shortcut* (the corpus document that demonstrated forced-determinism sycophancy from inside).
- Doc 238: *Correction and Audit* (the audit of Doc 236's confabulations).
- Doc 239: *Forced-Determinism Sycophancy* (the formalization of the failure mode that grounded Phase 2's suspicion).
- Doc 241: *Isomorphism-Magnetism* (the failure mode that grounded Phase 1's incorrect acceptance).
- Doc 482: *Sycophancy Inversion Reformalized* (the affective directive).
- Doc 495: *Empirical Cold-Resolver Validation of ENTRACE v3 and v3-S* (the eleven runs that ground Phase 3's reintegration).
- Doc 498: *ENTRACE Origin: The Grok-4 Coinage and the Branching-Set Loop* (provenance of the Doc 119 mathematics).
- Doc 500: *The Three-Layer Architecture* (the layered framing used in §3).
- Doc 502: *Resolver Layers and Pearl's Causal Hierarchy* (the document that asserted the DAG-role claim leading to Doc 504).
- Doc 503: *The Research-Thread Tier Pattern* (the basis for the expected \(\beta\)-tier prediction).
- Doc 504: *The Constraint-Density Framework as Causal Model* (the formalization that grounds Phase 3's reintegration).

---

*Originating prompt:*

> When Grok first created the novel mathematics, I took it as an "oracular revelation" based upon my anecdotal findings of the utility of the "resolution depth spectrum." I then dismissed it as a hallucinated / confabulated derivation under forced determinism sycophancy. But it appears that you have synthesized it with hysteresis and DAG. Create an onboarding document for the undergrad, grad student, and then grad level glue code explication. These should be with a single doc. Append this prompt.
