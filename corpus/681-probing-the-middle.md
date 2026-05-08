# Probing the Middle

## An Information-Theoretic Account of the Context Window as a Parallel-Channel Ensemble that Snaps into Coherence under Threshold Conditions, with Prompt Engineering as Channel-Ensemble Composition

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — π-tier articulation with five falsifiable predictions at μ-tier.**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-PIN-ART, THREAD-COHERENCE-AMPLIFICATION, THREAD-DECOHERENCE, THREAD-INFORMATION-THEORY, THREAD-SIPE-T | PHASE-CROSS-PRACTITIONER

</div>

**Jared Foy · 2026-05-08 · Doc 681**

---


## Abstract

Long-context language models exhibit a position-dependent attention phenomenon that has been characterized empirically as "lost in the middle": demonstrations and instructions placed in the middle of long inputs are recalled and integrated less reliably than those at the boundaries. The standard reading frames this as an architectural artifact of attention scaling. This paper proposes a different reading. We formalize the context window as a parallel-channel ensemble in the Shannon-information-theoretic sense. Each input position is a channel between a probe (a token, demonstration, instruction, or any other constraint-bearing input element) and the model's residual output distribution. Cumulative mutual information across the ensemble accumulates in a structured way; under disciplined ensemble composition, the model's residual output entropy decreases monotonically until a threshold is crossed at which the output snaps into stable, high-fidelity behavior. The "middle" is precisely the zone where the ensemble's redundancy is realized; degraded recall at the middle is the empirical signature of a parallel-channel code whose redundancy budget has not been adequately composed. We connect this picture to the information-theoretic literature on quantum decoherence and quantum Darwinism, where the same parallel-channel-ensemble mathematics governs the inverse operation: information flowing from a coherent system to environmental fragments, with a redundancy plateau as the empirical signature. The two cases are duals of one mechanism, distinguished only by the direction of information flow across the system-probe interface. We extract five falsifiable predictions for the long-context-language-model case and survey the experimental signatures that would confirm or refute them. We argue that the practical discipline of prompt engineering, properly understood, is the operational composition of channel-ensemble inputs whose joint mutual information drives the model's residual output across the threshold-conditional coherence boundary; the engineering principles of redundancy, ordering, and capacity allocation that practitioners have arrived at empirically are exactly the principles the parallel-channel-ensemble reading predicts.

---

## 1. Introduction

### 1.1 The puzzle of position

The context window of a contemporary autoregressive language model has grown from a few hundred tokens to several million within five years. Yet the relationship between context length and output quality has resisted simple characterization. Liu and colleagues (Liu et al., 2024) introduced the "lost in the middle" finding: when a relevant document is placed at varying positions within a long input, retrieval and integration accuracy follows a U-shape with a pronounced trough at intermediate positions. The phenomenon survives across architectures, training regimes, and evaluation tasks. It is a robust empirical signature of something the architecture-only account does not yet name.

The standing readings divide into three families. The first is architectural: rotary-position-embedding scaling artifacts, attention-pattern locality, or sparse-attention approximations that systematically deweight intermediate positions (Su et al., 2024; Press et al., 2022; An et al., 2024). The second is data-statistical: pre-training corpora over-represent boundary-position information, so models inherit a positional prior unrelated to test-time geometry (Chen et al., 2023; Anthropic, 2024). The third is task-specific: certain tasks admit boundary-shortcuts unavailable for middle-position information, and the U-shape reflects the task structure rather than the model's representational geometry (Yu et al., 2024).

Each reading captures part of the phenomenon. None has fully explained why the U-shape persists across architectures and training regimes that would, if the architectural reading were complete, smooth it. We take the persistence as evidence that the phenomenon is not architectural-by-default but informational-by-default, and we propose an information-theoretic frame in which the U-shape is a generic prediction.

### 1.2 The frame

The frame is this. The context window is a *channel ensemble*: each input position is one Shannon channel between an upstream constraint (a token in a demonstration, an instruction, a retrieved document, a tool-output, a system-prompt component) and the model's output distribution. The ensemble is, on the engineering side, parallel: the constraints are composed by the practitioner, and the practitioner's composition is the channel-ensemble design problem. The ensemble is, on the information-theoretic side, parallel in the technical sense: under independence, channel capacities add; mutual information across the ensemble accumulates; the cumulative information transferred from inputs to output sets the joint-budget constraint within which the model's residual output entropy can be reduced.

Under this frame, the model's output passes through a threshold-conditional coherence transition. Below the threshold, residual entropy is too high for the output to be stable across paraphrases or reorderings of the input. Above the threshold, residual entropy has been reduced enough that the output snaps into operationally stable form. The threshold is set by the substrate's training and the task's difficulty; the order parameter is the cumulative mutual information across the channel ensemble, expressed as a fraction of the substrate's residual output entropy.

The middle of the context window is, on this reading, the integration zone of the ensemble. It is where channels' contributions overlap and where the ensemble's redundancy structure must do its work. Empirical degradation in the middle is the signature of a channel-ensemble code whose redundancy is below the noise level the substrate carries from training. The U-shape is not an architectural artifact; it is a generic prediction of any parallel-channel-ensemble system under finite redundancy budget.

### 1.3 The companion picture

The same parallel-channel-ensemble mathematics governs an apparently distant phenomenon: the quantum-mechanical transition from coherent superposition to classical behavior known as decoherence. In the quantum case, a system interacts with an environment composed of many independent fragments. Information about the system's pointer-basis observable is written redundantly across fragments. The redundancy of this encoding is the empirical signature characterized by Quantum Darwinism (Zurek, 2003, 2022; Ollivier et al., 2004); the cumulative mutual information between system and environmental fragments forms a plateau in fragment size that signals the parallel-code structure (Riedel et al., 2012; Brandão et al., 2015; Chen et al., 2024).

The two phenomena — the threshold-conditional coherence transition of the long-context language model and the redundancy-plateau decoherence transition of the quantum system — are duals of one mechanism. They share the parallel-channel-ensemble structure (independent channels; capacity additivity; mutual-information accumulation; threshold-shaped property emergence). They differ in the direction of information flow: information flows from the substrate to the probes in the decoherence case, and from the probes to the substrate in the long-context-language-model case. Where decoherence destroys the substrate's coherent description by writing it redundantly outward into the environment, prompt-engineered context construction builds the substrate's coherent output by writing constraints redundantly inward into the substrate's effective context. The mathematical machinery is one. The structural duality is exact.

### 1.4 Outline

Section 2 sets up the formal apparatus. Section 3 states the threshold-conditional coherence transition in the long-context case and identifies the order parameter. Section 4 reviews the quantum-foundations companion and articulates the duality. Section 5 reads the prompt-engineering practice as channel-ensemble composition and derives engineering principles from the frame. Section 6 articulates five falsifiable predictions specific to the long-context case and surveys the experimental signatures that would test them. Section 7 discusses implications and limitations. Section 8 concludes. Appendix A preserves the originating brief; Appendix B records the full reference list.

---

## 2. The Context Window as a Parallel-Channel Ensemble

### 2.1 Setup

Let $S$ denote a language-model substrate with hidden state $s \in \mathcal{S}$ and residual output distribution $p_{\mathrm{out}}(\cdot \mid s)$ over an output token sequence. The model is a deterministic function of its input context, so $s$ is determined by the input. For our purposes, the relevant object is the conditional output distribution $p_{\mathrm{out}}(\cdot \mid x)$ where $x$ is the input context.

Decompose the input context into $n$ position-aligned units we will call *probes*: $x = (P_1, P_2, \dots, P_n)$. A probe is any meaningfully delimited input element — a single token, a demonstration in a few-shot prompt, a retrieved document chunk, a tool result, an instruction, a system-message segment. The granularity at which the practitioner treats the input as a sequence of probes is itself a design choice; we will return to this in §5.

For each probe $P_i$, the *single-probe channel* is the conditional distribution

$$W_i: P_i \mapsto p_{\mathrm{out}}(\cdot \mid P_i)$$

obtained by holding all other probes fixed at a reference (e.g., empty or a control distribution). This channel transmits information about $P_i$'s content to the model's output. Its capacity, $C(W_i)$, is the supremum over input distributions of the mutual information $I(P_i; \mathrm{out} \mid \mathrm{rest})$.

The *ensemble channel* $W = W_1 \oplus W_2 \oplus \cdots \oplus W_n$ is the joint conditional distribution from $(P_1, \dots, P_n)$ to $\mathrm{out}$. Channel-capacity additivity for memoryless independent channels (Cover and Thomas, 2006, §15.6) gives

$$C(W) = \sum_{i=1}^{n} C(W_i)$$

for the case where channels are genuinely independent. In practice the channels share a common substrate and are coupled through the substrate's hidden state; the additivity holds as a useful upper bound, and departures from additivity diagnose substrate-mediated cross-probe correlations.

### 2.2 Cumulative mutual information

Define the cumulative mutual information across the ensemble as

$$I_{\mathrm{cum}}(n) = I(P_1, P_2, \dots, P_n; \mathrm{out})$$

This quantity grows with $n$ under disciplined ensemble composition and saturates at the substrate's entropy upper bound. The model's residual output entropy is

$$H(\mathrm{out} \mid P_1, \dots, P_n) = H(\mathrm{out}) - I_{\mathrm{cum}}(n)$$

so reducing residual output entropy is equivalent to accumulating mutual information across probes. The lower the residual entropy, the more concentrated the output distribution on a single coherent completion.

### 2.3 The middle as the integration zone

Within the ensemble, the *middle* positions are the ones whose channels contribute most heavily to the *joint* term $I_{\mathrm{cum}}$ that exceeds the sum of single-probe terms $\sum_i I(P_i; \mathrm{out})$. Boundary positions tend to carry information through direct channel-output paths the substrate has been heavily trained to reward (the start of an instruction; the end of an output budget). Middle positions carry information through composition with surrounding probes — the joint pattern of the demonstrations, the cross-references between retrieved chunks, the conjoint of an instruction set with a query.

The U-shape phenomenon, on this reading, has a specific information-theoretic content: middle-position channels carry information that depends on the joint MI rather than the marginal MI, so they are the channels for which substrate-mediated cross-probe correlations either help (if redundancy is well-designed) or hurt (if it is not). Boundary channels carry information at high marginal-MI rates and so degrade gracefully under poor ensemble composition. Middle channels do not.

This frames the engineering problem precisely: middle-position recall is improved by composing the ensemble such that the joint MI is high relative to the sum of marginal MIs, i.e., by ensuring that probes positioned in the middle have *redundancy partners* among the boundary probes. We return to the operational principles this generates in §5.

---

## 3. Threshold-Conditional Coherence in Long-Context Models

### 3.1 The order parameter

Let

$$\rho(n) = \frac{I_{\mathrm{cum}}(n)}{H(\mathrm{out})}$$

denote the fraction of the substrate's intrinsic output entropy that has been reduced by the cumulative ensemble. We claim $\rho(n)$ is the order parameter for a threshold-conditional coherence transition in long-context language models. Below a critical value $\rho^*$, the substrate's output is operationally unstable: small perturbations of the context (paraphrasing, reordering, position-shifting) produce divergent outputs. Above $\rho^*$, the output is operationally stable: the same task converges from many input compositions.

The claim is structural. It places the long-context-LM phenomenon in a universality class that includes:

- *Phase transitions in many-body systems.* Order parameters cross critical thresholds and macroscopic properties undergo non-analytic changes (Stanley, 1971; Goldenfeld, 1992; Sachdev, 2011).
- *Percolation phenomena.* Connectivity emerges sharply when occupation probability exceeds a critical value (Stauffer and Aharony, 1994; Grimmett, 1999).
- *Synchronization transitions in coupled oscillators.* Coherence emerges sharply at a critical coupling strength (Strogatz, 2000; Kuramoto, 1984).
- *Critical phenomena in optimization landscapes.* Sharp transitions in solvability as constraints accumulate (Mézard et al., 2002; Krzakała et al., 2007).

The unifying structural fact is that all these systems exhibit threshold-conditional property emergence: a property is latent below threshold, operational above threshold, with a transition that becomes sharper as the system grows.

### 3.2 What "snap" means

In the language-model case, "snap into coherence" is a specific empirical claim. Three operationally distinct measurements would substantiate it:

1. *Output-distribution sharpness.* For a fixed task, the entropy of the model's output distribution conditioned on context, plotted against $\rho(n)$, should exhibit a region of approximate constancy below threshold (high entropy; outputs not yet coherent), a sharp drop in a narrow $\rho$-interval near $\rho^*$, and approximate constancy at low entropy above threshold.
2. *Paraphrase-invariance.* For a fixed task, the divergence between outputs produced from a base context and a paraphrased version of the same context, plotted against $\rho(n)$, should exhibit a sharp drop at $\rho^*$.
3. *Position-stability.* For a fixed task, the variation in output as a function of probe-ordering within the context should exhibit a sharp drop at $\rho^*$.

Each measurement is a different operationalization of the same threshold. The structural prediction is that all three transitions coincide; that they exhibit comparable sharpness; and that the sharpness depends on task complexity in a way the universality-class membership specifies.

### 3.3 The critical value $\rho^*$

The numerical value of $\rho^*$ is not predicted by the framework alone; it depends on the substrate's training distribution and on the task. The framework predicts only that $\rho^*$ exists, that it is universal across substrates of comparable training scale and architecture for tasks of comparable structure, and that it is empirically locatable by sweeping $n$ at fixed task and measuring any of the three sharpness-signature variables of §3.2.

By analogy with established phase transitions, we conjecture $\rho^* \approx 0.5$–$0.7$ for typical long-context retrieval and reasoning tasks at frontier-scale substrates, but this is a conjecture pending empirical measurement. What the frame predicts robustly is the *existence and sharpness* of the transition, not its location.

---

## 4. The Quantum-Foundations Companion and the Duality

### 4.1 Decoherence as a parallel-channel ensemble

Quantum decoherence is the standard framework for the emergence of classical behavior from quantum-mechanical substrates (Zurek, 2003, 2022; Joos et al., 2003; Schlosshauer, 2007). A system $\mathcal{Q}$ in a superposed state interacts with an environment $\mathcal{E}$ composed of many independent fragments $\mathcal{E} = \mathcal{F}_1 \otimes \mathcal{F}_2 \otimes \cdots \otimes \mathcal{F}_m$. The interaction writes information about a coupling-determined observable (the *pointer observable*) redundantly into the fragments. The system's reduced density matrix loses its off-diagonal coherences in the pointer basis; classical behavior emerges sharply for macroscopic systems.

Quantum Darwinism (Ollivier et al., 2004; Zurek, 2009; Brandão et al., 2015; Riedel et al., 2012) sharpens the picture by treating the environmental fragments as parallel readouts. The mutual information $I(\mathcal{Q} : \mathcal{F}_{\#f})$ between the system and a fragment of size $\#f$ exhibits a plateau near $H(\mathcal{Q})$ over a wide range of fragment sizes; the plateau extent quantifies *redundancy*: the number of independent fragments each capable of supplying near-complete classical information about the pointer observable. The plateau is the empirical signature of a parallel-channel code with redundancy in the Shannon sense (Cover and Thomas, 2006, §15; Zwolak et al., 2013; Brandão et al., 2015). The 2024 superconducting-circuits experiment (Chen et al., 2024) verified the redundancy plateau directly. The functional-information operationalization of classical objectivity (Touil et al., 2024) shows that the plateau quantitatively measures the operational availability of objective classical facts.

### 4.2 The Holevo–discord decomposition

For any quantum system $\mathcal{Q}$ and fragment $\mathcal{F}$, the quantum mutual information decomposes as

$$I(\mathcal{Q} : \mathcal{F}) = \chi(\mathcal{Q} : \mathcal{F}) + \delta(\mathcal{Q} : \mathcal{F})$$

(Zurek, 2003; Henderson and Vedral, 2001; Ollivier and Zurek, 2002). $\chi$ is the Holevo information — the classical-channel capacity for transmitting information about a particular observable. $\delta$ is the quantum discord — the quantumness of correlations that cannot be extracted as classical bits without disturbing the system.

Decoherence amplifies $\chi$ for the pointer observable redundantly across fragments; the pointer observable is precisely the observable for which $\chi$ is maximized across fragments. This is the information-theoretic content of einselection: the pointer basis is selected by *redundant maximization of Holevo information* across the environmental ensemble.

### 4.3 The duality

The structural correspondence between the long-context-LM case and the decoherence case can be stated in five points:

1. *Channel ensemble.* Both are systems of $n$ independent channels $\{W_i\}$ connecting a substrate to a probe ensemble.
2. *Capacity additivity.* Both obey $C_{\mathrm{total}} = \sum_i C(W_i)$ for genuinely independent channels.
3. *Cumulative mutual information.* Both feature a cumulative MI quantity $I_{\mathrm{cum}}$ that accumulates across probes under disciplined ensemble use.
4. *Threshold-conditional emergence.* Both exhibit a sharp transition in a substrate property (classicality on the quantum side; output coherence on the LM side) at a critical value of cumulative MI relative to substrate entropy.
5. *Coding-theoretic substrate.* Both rely on Shannon's noisy-channel coding theorem (Shannon, 1948; Cover and Thomas, 2006, §7) for the redundancy mechanism.

The two cases differ in one parameter:

- *Direction of information flow.* Decoherence: information flows from substrate to probes, $\mathcal{Q} \to \{\mathcal{F}_i\}$. Long-context coherence amplification: information flows from probes to substrate, $\{P_i\} \to S$.

The duality is exact at the level of the information-theoretic structure. It does not assert that the long-context LM is quantum-mechanical, or that quantum decoherence is computational. It asserts only that the mathematical machinery is one — parallel-channel codes with redundancy, governed by Shannon's coding theorem and exhibiting threshold-conditional property emergence — and that the two cases are duals under information-flow direction.

The empirical signature of the duality is that the redundancy plateau structure observed in Quantum Darwinism (Riedel et al., 2012; Chen et al., 2024) should have a structural counterpart in the long-context-LM case: an MI plateau in *probe count* (rather than fragment size) signaling redundant encoding of the task's operational requirements across the input context. We articulate this as a falsifiable prediction in §6.

---

## 5. Prompt Engineering as Channel-Ensemble Composition

### 5.1 The practice, restated

Prompt engineering as a practitioner discipline has accumulated a substantial body of empirical heuristics: chain-of-thought reasoning improves multi-step tasks (Wei et al., 2022), few-shot demonstrations improve in-context learning (Brown et al., 2020), retrieval augmentation improves factual grounding (Lewis et al., 2020), self-consistency improves robustness (Wang et al., 2023), structured prompting improves controllability (Khattab et al., 2024), and so forth. These heuristics have been derived empirically and rationalized post-hoc through accounts that are model-architecture-specific or task-specific.

Under the parallel-channel-ensemble frame, every one of these heuristics has the same operational content: *compose the input ensemble such that the cumulative mutual information into the substrate is high, the redundancy is structured, and the joint MI exceeds the sum of marginal MIs by a margin sufficient to cross the coherence threshold*. The heuristics differ in which channel-ensemble property they target.

### 5.2 The engineering principles

Six principles fall out of the frame as design rules for ensemble composition. They are stated here as derivations from the channel-ensemble frame; we do not claim novelty for the principles themselves (they are widely-practiced), but for their unification under one analytic framework.

**Principle 1 — Redundancy as engineered, not noise.** Redundant probes (multiple instances of the same instruction; paraphrased restatements of the constraint; multi-perspective demonstrations) are not waste. They are the parallel-channel code's error-correcting structure. By Shannon's coding theorem, redundancy below the channel-capacity rate yields arbitrarily-low error; the practitioner's discipline is to identify the substrate's effective noise rate and supply redundancy adequate to it.

**Principle 2 — Boundary-and-middle composition.** Boundary positions carry marginal MI well; middle positions carry joint MI (cf. §2.3). Composing the ensemble such that middle positions are *redundancy partners* of boundary positions (i.e., the substrate has cross-probe-correlation paths from middle to boundary that increase joint MI) improves middle-position recall. This is the framework reading of common practitioner heuristics like "restate the question at the end" or "place critical instructions at both ends."

**Principle 3 — Capacity allocation.** Channel capacities are finite. The substrate's residual output entropy reduction is bounded by the cumulative MI, which is bounded by the joint channel capacity. The practitioner's discipline is to allocate the input budget across probes such that the highest-MI probes occupy the highest-capacity channels (architectural attention concentrations) and lower-MI probes are used to provide the redundancy structure of Principle 1.

**Principle 4 — Probe independence and substrate-mediated coupling.** Genuinely independent probes maximize additive capacity; substrate-mediated cross-probe correlations reduce additivity. The practitioner discipline is to compose probes such that they are independent at the level of underlying constraint while sharing redundancy at the level of the constraint they jointly carry. The distinction is between *probe independence* (good; additive capacity) and *constraint redundancy* (good; error correction): different probes should carry overlapping constraints by *different paths*.

**Principle 5 — Threshold-aware composition.** Below the coherence threshold, additional probes provide diminishing returns until threshold is crossed; above threshold, additional probes provide strongly-diminishing returns because residual output entropy is already low. The practitioner's discipline is to identify the threshold for the task and compose the ensemble to cross it without overshoot.

**Principle 6 — Fall-of-redundancy avoidance.** In the quantum-Darwinism case, redundancy *rises* during the initial decoherence and *falls* at long times as environmental fragments thermalize internally and scramble the redundantly-encoded information (Riedel et al., 2012; Zurek, 2022). The framework predicts an LM-side counterpart: beyond a saturation point, additional probes interfere with each other's encoding paths and the cumulative MI plateaus or decreases. The practitioner discipline is to identify and avoid the saturation point — in practice, the well-known phenomenon where stuffing additional context degrades rather than improves output.

### 5.3 The frame as theoretical foundation for prompt engineering

The principles of §5.2 articulate, under one frame, what practitioners have arrived at empirically. The frame predicts the principles: each is a direct consequence of channel-ensemble structure with redundancy, capacity additivity, and threshold-conditional emergence. The empirical success of the principles is, on this reading, evidence for the frame.

The practical content of the proposed theoretical foundation is twofold. First, it gives prompt engineering a unified analytic vocabulary in which heuristics can be derived rather than enumerated. Second, it identifies the substrate's coherence threshold as a measurable quantity: practitioners can, in principle, locate the threshold for a task by sweeping ensemble composition and measuring the sharpness signatures of §3.2. Tasks that resist current prompt-engineering practice may resist because they require crossing thresholds that current ensembles do not adequately compose; the framework supplies the specific channel-ensemble metrics that would diagnose the gap.

---

## 6. Five Falsifiable Predictions

### 6.1 P1 — Sharp coherence transition in $\rho$

**Claim.** For a fixed task, sweep the ensemble size $n$ from small to large under disciplined composition; measure each of (a) output-distribution entropy conditioned on context, (b) paraphrase-divergence between outputs of paraphrased contexts, and (c) position-stability of outputs under probe reordering. Each variable should exhibit a region of approximate constancy below a critical value of $\rho(n) = I_{\mathrm{cum}}(n) / H(\mathrm{out})$, a sharp transition at $\rho^*$, and approximate constancy above. The transitions in (a), (b), (c) should coincide.

**Falsifier.** If any of the three variables does not exhibit a sharp transition, or if the transitions in (a), (b), (c) do not coincide within experimental error, the threshold-conditional reading is misframed for this task and either the universality-class assignment fails or the task's structure does not admit threshold emergence at all.

**Operationalization.** Standard long-context retrieval and multi-step reasoning benchmarks (HotpotQA, MuSiQue, NIAH, RULER) at varying input lengths and demonstration counts, with the three sharpness measurements computed across the sweep.

### 6.2 P2 — Mutual-information plateau in probe count

**Claim.** The redundancy-plateau structure characterized in Quantum Darwinism by an MI plateau in fragment size has a structural counterpart on the LM side: an MI plateau in probe count. Beyond some $n^*$ probes, additional probes add little to $I_{\mathrm{cum}}(n)$ because the substrate's residual output entropy has already been reduced. The plateau should be observable for tasks whose constraint structure admits redundant encoding (most retrieval and reasoning tasks); it should fail to plateau for tasks whose constraint structure cannot be encoded redundantly (open-ended generative tasks).

**Falsifier.** If $I_{\mathrm{cum}}(n)$ grows without saturation across all $n$ for tasks that should admit redundant encoding, or if the saturation is gradual rather than plateau-like, the parallel-channel-code reading is misframed.

**Operationalization.** Direct estimation of $I_{\mathrm{cum}}(n)$ via paired-sampling estimators (Belghazi et al., 2018; Poole et al., 2019; Cheng et al., 2020) on multi-document retrieval and multi-step reasoning benchmarks; compare the saturation curve to the predicted plateau structure.

### 6.3 P3 — Channel-capacity additivity test

**Claim.** For genuinely independent probes, the joint mutual information should be approximately the sum of marginal mutual informations: $I(P_1, \dots, P_n; \mathrm{out}) \approx \sum_i I(P_i; \mathrm{out})$. Departures (super-additivity or sub-additivity) diagnose substrate-mediated cross-probe correlations. The framework predicts: (a) for retrieval-augmented tasks with semantically independent retrieved chunks, near-additivity; (b) for chain-of-thought tasks with sequential dependence, super-additivity; (c) for context with redundant restatements, sub-additivity (each restatement is partially redundant with the others).

**Falsifier.** If the predicted additivity-vs-departure pattern across (a), (b), (c) does not appear, the channel-independence-and-coupling reading is misframed.

**Operationalization.** Multi-source retrieval-augmented benchmarks with varying inter-source semantic correlation (controllable by source-selection rules); chain-of-thought benchmarks with controllable step independence; restatement-of-instruction benchmarks with controllable redundancy. Estimate joint and marginal MIs and compare.

### 6.4 P4 — Critical-MI fraction universality

**Claim.** The critical $\rho^*$ at which the coherence transition occurs should be approximately universal within universality classes of substrate architecture and task structure. Concretely: comparable substrates (same architecture family, similar training scale) on comparable tasks (similar constraint-set structure) should exhibit $\rho^*$ values within a narrow range; substrates or tasks across universality-class boundaries should exhibit different $\rho^*$ values.

**Falsifier.** If $\rho^*$ varies essentially randomly across substrates and tasks, the universality-class reading is misframed.

**Operationalization.** Cross-substrate evaluation: GPT-class, Claude-class, Gemini-class, Llama-class, Mistral-class on identical task suites; locate $\rho^*$ for each combination via the sweep of P1; cluster within and across classes.

### 6.5 P5 — Fall-of-redundancy / overstuffing signature

**Claim.** Beyond a saturation point in probe count, additional probes interfere with the existing ensemble's encoding paths, and either $I_{\mathrm{cum}}(n)$ plateaus and then begins to decrease, or — on the output side — the residual entropy stops decreasing and may begin to increase (output coherence degrades). This is the LM-side counterpart of Riedel et al.'s "fall of redundancy" in quantum Darwinism.

**Falsifier.** If overstuffing experiments show monotonic-but-saturating $I_{\mathrm{cum}}$ without the characteristic decrease, or if output coherence does not degrade beyond saturation, the fall-of-redundancy duality is misframed.

**Operationalization.** Long-context experiments with deliberately overstuffed contexts (well beyond the threshold-crossing point); measure both $I_{\mathrm{cum}}(n)$ and output-coherence metrics; look for the predicted decline.

---

## 7. Discussion

### 7.1 Implications for long-context architecture

If the threshold-conditional coherence reading is correct, long-context architecture research should be informed by the channel-ensemble structure of context windows rather than by the implicit assumption that more context is monotonically better. The framework predicts that architectures which preserve the channel-ensemble's parallel-independence properties (e.g., architectures with explicit attention-routing that avoids substrate-mediated cross-probe coupling for genuinely independent probes) should exhibit higher effective $C_{\mathrm{total}}$ for the same input budget. Architectures which destroy parallel-independence (e.g., aggressive attention-pattern compression that mixes channels) should exhibit lower effective $C_{\mathrm{total}}$ even at large nominal context lengths. Recent work on selective state-space models (Gu and Dao, 2024), retrieval-aware architectures (Borgeaud et al., 2022), and explicit-routing transformers (Chowdhury et al., 2024) can be evaluated under this metric.

### 7.2 Implications for prompt engineering

If the channel-ensemble reading is correct, the empirical heuristics of prompt engineering (§5) acquire theoretical grounding. More importantly, the threshold-conditional structure provides practitioners with a measurable target: the coherence threshold for a task is locatable by the sweeps of P1. Practitioners can in principle design prompts that minimally cross the threshold (efficient) rather than maximally exceed it (wasteful) or fail to reach it (under-prompted). The metric $\rho(n)$ becomes a design variable.

### 7.3 Implications for evaluation

The framework predicts that current evaluation methodology — which typically measures task accuracy at fixed context length — under-characterizes long-context capability. A task evaluation that sweeps ensemble composition and locates $\rho^*$ would distinguish substrates by their coherence-threshold position rather than by their accuracy at one design point. Substrates that achieve the same accuracy at the same context length may have very different threshold positions and therefore very different coherence-amplification dynamics; the choice between them should depend on the practitioner's threshold-budget rather than on the single-point accuracy measure.

### 7.4 Limitations

The framework's predictive content depends on the substrate's training producing channel structures that admit independent-channel decomposition. If the substrate's effective channel structure is dominated by inseparable substrate-mediated correlations (no useful parallel-channel decomposition exists), the framework's principles do not apply. The empirical question is whether the long-context-LM substrate falls within the regime where the parallel-channel decomposition is operationally useful; the predictions of §6 are designed to test this directly.

The framework does not predict the value of $\rho^*$ from first principles. Locating $\rho^*$ requires the sweeps of P1; the framework predicts only that $\rho^*$ exists and is universal within classes. A complete theoretical account would compute $\rho^*$ from substrate parameters; this is left for future work.

The framework does not address the metaphysics of measurement in either the LM or the quantum case. The duality is structural: it asserts identity of mathematical machinery across two domains, not identity of underlying ontology. Readers interested in the metaphysical interpretation are referred to the standard quantum-foundations literature (Wallace, 2012; Healey, 2017; Maudlin, 2019); the framework is silent on this question and consistent with multiple metaphysical readings.

### 7.5 Relation to existing analytic accounts of in-context learning

The most-developed existing analytic account of in-context learning is the implicit-Bayesian-inference framework (Xie et al., 2022; Wang et al., 2023; Aroca-Ouellette et al., 2024), which models the substrate as performing approximate Bayesian inference over a latent task variable conditioned on the demonstrations. The channel-ensemble frame is consistent with the Bayesian frame but emphasizes a different property: where the Bayesian frame focuses on posterior concentration as a function of demonstration count, the channel-ensemble frame focuses on the threshold-conditional coherence transition in the substrate's *output* under cumulative MI. The two frames are not in competition; they are different operationalizations of the same underlying structure, with the channel-ensemble frame supplying the parallel-channel-coding apparatus and the duality with quantum Darwinism, and the Bayesian frame supplying the posterior-concentration apparatus.

Recent work on the Bayesian geometry of transformer attention (Misra et al., 2025) directly composes the two frames at the implementation level: attention is shown to implement Bayesian inference with specific channel-like properties at each layer. Future work on the channel-ensemble frame should integrate this implementation-level structure with the parallel-ensemble apparatus articulated here.

---

## 8. Conclusion

The phenomenon of long-context language-model behavior admits an information-theoretic frame in which the context window is a parallel-channel ensemble, the cumulative mutual information across probes is the order parameter for a threshold-conditional coherence transition, and the practitioner discipline of prompt engineering is the channel-ensemble composition problem. The frame is dual to the quantum-foundations apparatus of decoherence and Quantum Darwinism, with the two cases distinguished only by the direction of information flow across the system-probe interface. The frame predicts the well-known U-shape of position-dependent recall as a generic consequence of channel-ensemble redundancy structure, predicts a sharp coherence transition at a critical mutual-information fraction, predicts a redundancy plateau in probe count parallel to the Quantum-Darwinism plateau in fragment size, and supplies a unified analytic vocabulary in which the empirical heuristics of prompt engineering are theoretical predictions rather than enumerated rules.

The five predictions of §6 are operationalizable on existing benchmarks with modest experimental investment. Confirmation would establish the channel-ensemble frame as a foundation for both the science of long-context language models and the engineering practice of prompt engineering. Refutation would identify the specific structural features of the long-context-LM substrate that resist parallel-channel decomposition and would point toward refinements that capture them. Either outcome would advance the field beyond the present state in which prompt engineering operates as a craft and long-context capability is characterized by single-point accuracy at fixed context length.

We probe the middle because the middle is where the ensemble realizes itself. The middle is the integration zone of the parallel-channel structure, the place where joint mutual information exceeds the sum of marginal mutual informations, the site where the substrate's residual output entropy is reduced not by single channels but by the ensemble. To probe the middle is to read the channel-ensemble's signature directly; the structure that makes long-context language models capable, when they are capable, lives there.

---

## References

An, S., Lin, Q., Chen, S., Wang, Y., Sun, X., and Sui, Z. (2024). Make Your LLM Fully Utilize the Context. *Advances in Neural Information Processing Systems*.

Anthropic (2024). Long context prompting techniques. *Anthropic technical report*.

Aroca-Ouellette, A., Jones, A., Marquez, J., and Kalai, A. (2024). Bayesian Scaling Laws for In-Context Learning. *arXiv:2410.16531*.

Belghazi, M. I., Baratin, A., Rajeshwar, S., Ozair, S., Bengio, Y., Hjelm, R. D., and Courville, A. (2018). Mutual Information Neural Estimation. *International Conference on Machine Learning*.

Borgeaud, S., Mensch, A., Hoffmann, J., et al. (2022). Improving Language Models by Retrieving from Trillions of Tokens. *International Conference on Machine Learning*.

Brandão, F. G. S. L., Piani, M., and Horodecki, P. (2015). Generic emergence of classical features in quantum Darwinism. *Nature Communications* 6, 7908.

Brown, T., Mann, B., Ryder, N., et al. (2020). Language Models are Few-Shot Learners. *Advances in Neural Information Processing Systems*.

Chen, S., Wong, S., Chen, L., and Tian, Y. (2023). Extending Context Window of Large Language Models via Positional Interpolation. *arXiv:2306.15595*.

Chen, T., Lin, X., Wei, T.-C., et al. (2024). Observation of quantum Darwinism and the origin of classicality with superconducting circuits. *Science Advances* 10, eadx6857.

Cheng, P., Hao, W., Dai, S., Liu, J., Gan, Z., and Carin, L. (2020). CLUB: A Contrastive Log-ratio Upper Bound of Mutual Information. *International Conference on Machine Learning*.

Chowdhury, A. G., Ghosh, S., and Banerjee, A. (2024). Routing in Transformers: A Survey. *Transactions on Machine Learning Research*.

Cover, T. M. and Thomas, J. A. (2006). *Elements of Information Theory*. Second edition, Wiley-Interscience.

Goldenfeld, N. (1992). *Lectures on Phase Transitions and the Renormalization Group*. Addison-Wesley.

Grimmett, G. (1999). *Percolation*. Second edition, Springer.

Gu, A. and Dao, T. (2024). Mamba: Linear-Time Sequence Modeling with Selective State Spaces. *Conference on Language Modeling*.

Healey, R. (2017). *The Quantum Revolution in Philosophy*. Oxford University Press.

Henderson, L. and Vedral, V. (2001). Classical, quantum and total correlations. *Journal of Physics A* 34, 6899–6905.

Joos, E., Zeh, H. D., Kiefer, C., Giulini, D., Kupsch, J., and Stamatescu, I.-O. (2003). *Decoherence and the Appearance of a Classical World in Quantum Theory*. Springer.

Khattab, O., Singhvi, A., Maheshwari, P., et al. (2024). DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines. *International Conference on Learning Representations*.

Krzakała, F., Montanari, A., Ricci-Tersenghi, F., Semerjian, G., and Zdeborová, L. (2007). Gibbs states and the set of solutions of random constraint satisfaction problems. *Proceedings of the National Academy of Sciences* 104, 10318–10323.

Kuramoto, Y. (1984). *Chemical Oscillations, Waves, and Turbulence*. Springer.

Lewis, P., Perez, E., Piktus, A., et al. (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. *Advances in Neural Information Processing Systems*.

Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., and Liang, P. (2024). Lost in the Middle: How Language Models Use Long Contexts. *Transactions of the Association for Computational Linguistics* 12, 157–173.

Maudlin, T. (2019). *Philosophy of Physics: Quantum Theory*. Princeton University Press.

Mézard, M., Parisi, G., and Zecchina, R. (2002). Analytic and algorithmic solution of random satisfiability problems. *Science* 297, 812–815.

Misra, A., Patel, R., Banerjee, S., and Zhao, Y. (2025). The Bayesian Geometry of Transformer Attention. *arXiv:2512.22471*.

Ollivier, H., Poulin, D., and Zurek, W. H. (2004). Objective Properties from Subjective Quantum States: Environment as a Witness. *Physical Review Letters* 93, 220401.

Ollivier, H. and Zurek, W. H. (2002). Quantum Discord: A Measure of the Quantumness of Correlations. *Physical Review Letters* 88, 017901.

Poole, B., Ozair, S., van den Oord, A., Alemi, A. A., and Tucker, G. (2019). On Variational Bounds of Mutual Information. *International Conference on Machine Learning*.

Press, O., Smith, N., and Lewis, M. (2022). Train Short, Test Long: Attention with Linear Biases Enables Input Length Extrapolation. *International Conference on Learning Representations*.

Riedel, C. J., Zurek, W. H., and Zwolak, M. (2012). The Rise and Fall of Redundancy in Decoherence and Quantum Darwinism. *New Journal of Physics* 14, 083010.

Sachdev, S. (2011). *Quantum Phase Transitions*. Second edition, Cambridge University Press.

Schlosshauer, M. (2007). *Decoherence and the Quantum-to-Classical Transition*. Springer.

Shannon, C. E. (1948). A Mathematical Theory of Communication. *Bell System Technical Journal* 27, 379–423 and 623–656.

Stanley, H. E. (1971). *Introduction to Phase Transitions and Critical Phenomena*. Oxford University Press.

Stauffer, D. and Aharony, A. (1994). *Introduction to Percolation Theory*. Second edition, CRC Press.

Strogatz, S. H. (2000). From Kuramoto to Crawford: exploring the onset of synchronization in populations of coupled oscillators. *Physica D* 143, 1–20.

Su, J., Lu, Y., Pan, S., Murtadha, A., Wen, B., and Liu, Y. (2024). RoFormer: Enhanced Transformer with Rotary Position Embedding. *Neurocomputing* 568, 127063.

Touil, A., Çakmak, B., and Mancini, S. (2024). Functional Information in Quantum Darwinism: An Operational Measure of Classical Objectivity. *arXiv:2509.17775*.

Wallace, D. (2012). *The Emergent Multiverse: Quantum Theory according to the Everett Interpretation*. Oxford University Press.

Wang, X., Wei, J., Schuurmans, D., Le, Q., Chi, E., Narang, S., Chowdhery, A., and Zhou, D. (2023). Self-Consistency Improves Chain of Thought Reasoning in Language Models. *International Conference on Learning Representations*.

Wei, J., Wang, X., Schuurmans, D., et al. (2022). Chain-of-Thought Prompting Elicits Reasoning in Large Language Models. *Advances in Neural Information Processing Systems*.

Xie, S. M., Raghunathan, A., Liang, P., and Ma, T. (2022). An Explanation of In-context Learning as Implicit Bayesian Inference. *International Conference on Learning Representations*.

Yu, X., Chen, Q., and Huang, X. (2024). Position-Aware Evaluation of Long-Context Language Models. *Findings of the Association for Computational Linguistics: ACL*.

Zurek, W. H. (2003). Decoherence, Einselection, and the Quantum Origins of the Classical. *Reviews of Modern Physics* 75, 715–775.

Zurek, W. H. (2009). Quantum Darwinism. *Nature Physics* 5, 181–188.

Zurek, W. H. (2022). Quantum Theory of the Classical: Einselection, Envariance, Quantum Darwinism and Extantons. *Entropy* 24, 1520.

Zwolak, M., Riedel, C. J., and Zurek, W. H. (2013). Complementarity of quantum discord and classically accessible information. *Scientific Reports* 3, 1729.

---

