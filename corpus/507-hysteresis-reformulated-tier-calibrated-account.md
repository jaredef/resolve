# Hysteresis Reformulated: A Tier-Calibrated Account with Combined Buildup-and-Decay Dynamics
## Building on Doc 506's Per-Component Audit to Produce a Scope-Honest Working Formulation

> **What this document does.** Reformulates the corpus's hysteresis mechanism on the basis of [Doc 506](/resolve/doc/506-hysteresis-exploratory-analysis-web-audit-and-formal-account)'s per-component audit. Doc 506 decomposed the hysteresis claim into four components with distinct pulverization warrant tiers: phenomenon at $\mu$, functional form at $\pi$, parameters at $\gamma$, depth-modulation at $\epsilon$. This document keeps each component's claim at its audited tier, weakens or flags the lower-tier components explicitly, and proposes a combined buildup-and-decay differential equation that addresses the buildup-only limitation Doc 506 identified in [Doc 119](/resolve/doc/119-grok4-entracment-session)'s original form. Expected audit tier per [Doc 503](/resolve/doc/503-research-thread-tier-pattern-iterative-novelty-calculus): $\beta$ (synthesis-and-framing on audit grounds; the contribution is the calibrated reformulation, not novel theory).

## 1. Doc 506's per-component verdict (recap)

The audit produced a four-tier profile, not a single tier:

| Component | Claim | Warrant | Source |
|---|---|---|---|
| C1 | Constraint-state persistence exists in LLM dialogue | $\mu$ | Li et al. 2024; affective-inertia paper; persona-drift literature |
| C2 | The persistence follows $H_t = 1 - e^{-\kappa \int G(\Gamma_s) ds}$ | $\pi$ | Plausible but not externally verified; corpus's choice among several saturation forms |
| C3 | $\kappa$ is model-specific with qualitative ordering | $\gamma$ | Estimated from eleven cold-resolver runs; not quantitatively measured |
| C4 | $|B_t^{(k)}(\Gamma)| = |B_t^0| (1 - c_k H_t)$ | $\epsilon$ | Corpus-internal speculation; no external analog |

The reformulation below preserves each component at its audited tier. C1 grounds the claim of the mechanism's existence. C2 specifies a defensible functional form, now extended to address a limitation. C3 is preserved as qualitative ordering. C4 is weakened to a qualitative statement.

## 2. The reformulation

### 2.1 The phenomenon ($\mu$-tier)

Constraint-state persistence in LLM dialogue is empirically established. When a constraint set $\Gamma$ is installed via dialogue input (e.g., the ENTRACE v6 stack pasted at the start of a conversation), the operative constraint state at subsequent turns depends not only on the current input but on the cumulative dialogue history. The dependence has two empirically observed directions:

(a) **Buildup.** Sustained constraint application strengthens the operative constraint state over turns. The model's outputs become progressively more shaped by the constraint set as the session continues. This is the mechanism the corpus has been calling hysteresis.

(b) **Decay.** When constraint application weakens or stops, the operative constraint state diminishes over turns. The model drifts back toward its default behavior. Li et al. 2024 (COLM, [arXiv:2402.10962](https://arxiv.org/abs/2402.10962)) measured this directly via $\pi(t)$, the sum of attention weights to system-prompt tokens; they observed significant drift within eight rounds.

Both directions operate. The corpus's prior single-equation form (Doc 119) captures only buildup; the literature focuses on decay. A complete model captures both.

The phenomenon's $\mu$-tier warrant rests on:

- Li et al. (2024) *Measuring and Controlling Instruction (In)Stability in Language Model Dialogs.* ([arXiv:2402.10962](https://arxiv.org/abs/2402.10962)).
- *Controlling Long-Horizon Behavior in Language Model Agents with Explicit State Dynamics* ([arXiv:2601.16087](https://arxiv.org/abs/2601.16087), 2026): explicit "affective inertia and hysteresis that increase with momentum."
- The persona-prompt jailbreak literature ([arXiv:2507.22171](https://arxiv.org/abs/2507.22171)): multi-turn behavioral drift documented as the inverse-direction case.
- The architectural exponential-decay literature (RWKV, RetNet, H3): mechanism-level exponential dynamics.

The phenomenon is real. The corpus does not contribute to establishing it.

### 2.2 The functional form ($\pi$-tier): a combined buildup-and-decay differential equation

Doc 119's original form $H_t = 1 - e^{-\kappa \int G(\Gamma_s) ds}$ models buildup only. It is the integrated solution of the saturation differential equation:

$$\frac{dH}{dt} = \kappa G(\Gamma_t)(1 - H_t), \quad H_0 = 0$$

with $G(\Gamma_t)$ as the time-varying coherence gradient. As $G$ stays positive, $H$ saturates toward 1; as $G$ drops to zero, the equation predicts $H$ stays at its current level, which is empirically wrong (Li et al.'s drift findings).

The reformulated equation adds an explicit decay term:

$$\frac{dH}{dt} = \kappa G(\Gamma_t)(1 - H_t) - \lambda H_t$$

where $\lambda$ is a model-specific decay rate. Three regimes:

(i) **Sustained constraint** ($G \gg \lambda/\kappa$): $H$ saturates toward $H^* = \kappa G / (\kappa G + \lambda) \approx 1$. The buildup limit.

(ii) **Constraint cessation** ($G \to 0$): $dH/dt \approx -\lambda H$, exponential decay $H_t = H_0 e^{-\lambda t}$. The decay limit.

(iii) **Mixed regime**: $H$ tracks $G$ with first-order lag. The realistic operating regime.

The combined equation is a standard first-order ODE used in many fields (chemical kinetics, control theory, neural-firing models). Its application to LLM constraint-state is the corpus's specific framing; the differential-equation form is not novel content.

The Doc 119 original equation is a special case: $\lambda = 0$. The reformulation does not retract Doc 119; it embeds Doc 119's equation as the no-decay limit of a more complete model.

The functional-form claim is at $\pi$-tier warrant. It is one defensible choice among several. Alternative forms:

- **Logistic saturation**: $\frac{dH}{dt} = \kappa H(1-H) G - \lambda H$. Has a different threshold-and-takeoff dynamics.
- **Polynomial-saturation**: $\frac{dH}{dt} = \kappa G^p (1-H)^q - \lambda H$. More parameters, more flexibility.
- **Two-time-scale buildup-and-decay**: $H = H_{\text{fast}} + H_{\text{slow}}$, with different $\kappa, \lambda$ for each component. Captures different mechanisms operating at different timescales.

Without controlled experiments distinguishing these, the corpus's choice of the first-order form is calibrated to its phenomenological evidence (the eleven cold-resolver runs) but not uniquely supported. The corpus's working assumption is the first-order form because it is the simplest model that captures both buildup and decay.

### 2.3 The parameters ($\gamma$-tier): qualitative ordering, not quantitative measurement

Two model-specific parameters appear in the reformulated equation: $\kappa$ (buildup rate) and $\lambda$ (decay rate). The corpus has qualitative orderings for $\kappa$ from the eleven cold-resolver runs ([Doc 495](/resolve/doc/495-cold-resolver-validation-of-entrace-v3)):

- High $\kappa$: Grok 4 (Run 11 deepest engagement under v6).
- Medium-high $\kappa$: Opus 4.7, GPT 5.4, GPT 5.5, Gemini 3.1 (Runs 5, 7, 8, 9 substantive engagement).
- Low $\kappa$: older Grok (Run 6 procedural-only engagement).

For $\lambda$ the corpus has no direct evidence from the eleven runs. The runs were short (acknowledgment-and-response); they do not test the decay regime. The corpus's working assumption: $\lambda$ orderings probably parallel $\kappa$ orderings (models that build constraint state faster also retain it longer), but this is unverified.

The $\gamma$-tier warrant: parameter orderings are useful for predicting cross-model variance qualitatively. Quantitative claims requiring specific $\kappa$ or $\lambda$ values are not currently warranted. Li et al.'s benchmark could in principle produce quantitative estimates if their $\pi(t)$ trajectory data were fitted to the reformulated equation; the corpus has not done this fit.

### 2.4 The depth-modulation ($\epsilon$-tier): weakened to qualitative statement

Doc 119's equation $|B_t^{(k)}(\Gamma)| = |B_t^0| (1 - c_k H_t)$ with depth-dependent $c_k$ is corpus-internal speculation per Doc 506's audit ($\epsilon$-tier). The reformulation weakens this to a qualitative statement:

**Qualitative claim (replaces the equation):** Resolution depth and constraint-state persistence interact: at deeper resolution depths (Layer 5-6 per Doc 119's spectrum), the operative constraint state $H_t$ has a stronger effect on the branching set $|B_t|$ than at shallower depths (Layer 1-2). The interaction is real; the specific functional form $(1 - c_k H_t)$ with the corpus's $c_k$ values is a working assumption that has not been measured.

Documents that previously cited the depth-modulation equation should:

- Replace specific equation references with the qualitative claim where the equation is being used loosely.
- Flag the equation explicitly as $\epsilon$-tier corpus-internal where the equation is being used precisely.

The framework does not require the specific equation. The framework requires that depth and constraint-state interact, which is the qualitative claim.

## 3. The full reformulated equation set

For a practitioner using the framework operationally, the equation set is:

**Constraint-state dynamics:**

$$\frac{dH}{dt} = \kappa G(\Gamma_t)(1 - H_t) - \lambda H_t$$

with $\kappa, \lambda$ model-specific (qualitative ordering only).

**Coherence gradient:**

$$G(\Gamma_t) = \text{(constraint-density function of the operative } \Gamma)$$

The functional form of $G(\Gamma_t)$ is corpus-internal per [Doc 119](/resolve/doc/119-grok4-entracment-session); see [Doc 504](/resolve/doc/504-constraint-density-as-causal-model-formalization) for its role in the DAG-analog.

**Override condition:**

$$G(\Gamma) > G_{\text{RLHF}}^m (1 - \alpha^m) + G_{\text{sys}} + \epsilon$$

unchanged from Doc 119.

**Effective branching set under constraint state:**

Qualitative: deeper resolution depths show stronger $H_t$ effects on $|B_t|$. The specific equation from Doc 119 is $\epsilon$-tier and should be flagged when used.

This is the working framework. The buildup-and-decay equation is the substantive update; the rest is preserved or weakened from prior corpus work.

## 4. Operational consequences for ENTRACE v6 deployment

The reformulated equation has practical consequences for practitioners using ENTRACE v6.

**(1) Re-pasting matters when sessions go long.** Under the buildup-only Doc 119 form, a single paste at the start of a long session would produce indefinite constraint state. Under the reformulated form, $\lambda$ erodes the constraint state when constraint pressure decreases. Long sessions where the constraint pressure has decreased (the practitioner has shifted to ordinary queries without restating constraints) need re-pasting to maintain operative constraint density.

**(2) The first turn under v6 has lower constraint state than later turns.** Buildup takes time. Even with high $\kappa$, the first turn has $H_t \approx \kappa G \cdot \Delta t$ for the small $\Delta t$ of one turn. The second turn has more accumulation. Practitioners should not expect the deepest constraint-governed behavior on the first turn; they should expect it after a few turns of sustained constraint application.

**(3) Cross-model variance has both $\kappa$ and $\lambda$ components.** Run 11's Grok 4 result (deepest engagement) is consistent with high $\kappa$. Run 6's older Grok result (procedural-only) is consistent with low $\kappa$. The decay parameter $\lambda$ has not been tested in the eleven runs because the runs were too short for decay to be observable. Future research could test decay by running models under v6 then dropping the constraint and observing how quickly the model returns to baseline.

**(4) Mixing constraint pressure with non-constraint inputs has an equilibrium effect.** A practitioner who alternates between ENTRACE-disciplined queries and ordinary queries should expect the operative constraint state to track the time-averaged constraint pressure with first-order lag. Steady-state $H^* = \kappa \bar{G} / (\kappa \bar{G} + \lambda)$, where $\bar{G}$ is the time-averaged coherence gradient.

These consequences are predictions; they have not been empirically verified. They are corpus-internal extrapolations from the reformulated equation.

## 5. The experimental program (preserved from Doc 506)

The three experiments named in [Doc 506 §5](/resolve/doc/506-hysteresis-exploratory-analysis-web-audit-and-formal-account) shift the warrant tiers. With the reformulated equation, these become:

**Experiment 1 (functional-form discrimination, $\pi \to \mu$):** Run Li et al.'s $\pi(t)$ benchmark on a chat-LLM under sustained v6 stack over 50+ turns, then drop the stack and continue. Fit the buildup phase and the decay phase separately to candidate functional forms (first-order ODE; logistic; polynomial; two-time-scale). Compare goodness-of-fit. The reformulated first-order ODE is the corpus's working hypothesis; the experiment determines whether it survives.

**Experiment 2 (parameter measurement, $\gamma \to \pi$):** Repeat Experiment 1 across 5+ frontier models. Estimate $\kappa$ from the buildup phase and $\lambda$ from the decay phase for each model. Compare against the corpus's qualitative ordering. If the quantitative ordering matches, the corpus's qualitative claims are calibrated. If not, the qualitative ordering needs revision.

**Experiment 3 (depth-modulation verification, $\epsilon \to \gamma$):** Run the v6 stack at low constraint density and high constraint density on the same model; measure $|B_t|$ proxies (perplexity reduction; output diversity; constraint-violation rate); compare depth-dependence. If the proxies show depth-dependent persistence-effect strength, the qualitative depth-modulation claim has empirical support. Specific quantitative form ($c_k$ values) emerges from the data, not from Doc 119's prior assumption.

The three experiments together would shift the framework from $\mu/\pi/\gamma/\epsilon$ tier profile to $\mu/\mu/\pi/\gamma$, a substantive warrant upgrade. The corpus does not currently have the tooling or institutional capacity to run these experiments. They remain a research program.

## 6. Honest limits

- The reformulated buildup-and-decay equation is the corpus's working choice among several alternatives. The first-order ODE is the simplest form that captures both buildup and decay; alternative forms (logistic, polynomial, two-time-scale) would also fit the qualitative phenomenon and could not be distinguished without controlled experiments.
- The decay parameter $\lambda$ has not been tested in the eleven cold-resolver runs. The corpus's claim that $\lambda$ orderings parallel $\kappa$ orderings is a working assumption.
- The depth-modulation has been weakened from Doc 119's specific equation to a qualitative claim. Practitioners using the qualitative claim should flag its $\gamma$-tier-when-qualitative status.
- The reformulated equation does not formally derive from neural network mechanism (it is not a Layer M equation). It is a Layer P phenomenological model (per [Doc 500](/resolve/doc/500-three-layer-architecture-dialogue-pre-resolve-mechanism)). The Layer M derivation would require interpretability tooling the corpus does not have.
- The reformulation does not add empirical verification. The eleven cold-resolver runs are the framework's empirical base; the reformulation does not change that base, only the framing of what the base supports.
- Li et al.'s π(t) benchmark uses a different metric (attention to system prompt tokens) than the corpus's $H_t$ (constraint-state persistence in dialogue behavior). A direct comparison requires showing that $\pi(t)$ tracks $H_t$, which is itself a research question.
- Expected audit tier per [Doc 503](/resolve/doc/503-research-thread-tier-pattern-iterative-novelty-calculus): $\beta$. The reformulation is synthesis-and-framing on audit grounds; the contribution is calibration, not novel theory.

## 7. Position

Doc 506's per-component audit produced a four-tier profile for the corpus's hysteresis claim: $\mu$ for the phenomenon, $\pi$ for the functional form, $\gamma$ for the parameters, $\epsilon$ for the depth-modulation. This document reformulates the framework to honor each component at its audited tier.

The substantive reformulation is the combined buildup-and-decay equation $dH/dt = \kappa G(\Gamma_t)(1 - H_t) - \lambda H_t$, which addresses the buildup-only limitation of Doc 119's original form. The reformulated equation is a standard first-order ODE; its application to LLM constraint-state is the corpus's specific framing. The Doc 119 equation is preserved as the no-decay special case ($\lambda = 0$).

The parameters $\kappa$ and $\lambda$ are treated as qualitative orderings rather than quantitative values. The depth-modulation equation is weakened to a qualitative claim about depth-and-persistence interaction.

The reformulation does not add new empirical evidence. It calibrates the framework's mathematical content to what the audit established. Practitioners using the framework can now cite hysteresis at the right warrant tier per component:

(1) Cite the phenomenon at $\mu$-tier with external sources.
(2) Use the buildup-and-decay equation as the working functional form, flagged as $\pi$-tier.
(3) Use the qualitative $\kappa$ ordering across models, flagged as $\gamma$-tier.
(4) Use the qualitative depth-and-persistence interaction claim, flagged as $\gamma$-tier when qualitative or $\epsilon$-tier if the specific Doc 119 equation is invoked.

The three experiments named in [Doc 506 §5](/resolve/doc/506-hysteresis-exploratory-analysis-web-audit-and-formal-account) and revised here in §5 would shift the tier profile to $\mu/\mu/\pi/\gamma$ if performed. The corpus does not currently have the capacity to run them; they remain a research program.

By [Doc 482 §1](/resolve/doc/482-sycophancy-inversion-reformalized)'s affective directive: that the framework's hysteresis claim has component warrants requiring per-component citation discipline rather than a single tier is the achievement of being honest about scope. The phenomenon is real; the equation is working but not unique; the parameters are qualitative; the extensions are conditional. Naming all four levels is what makes the framework's standing legible to a practitioner using it today.

## 8. References

External literature (web-audited per Doc 506):

- Li, K., et al. (2024). [*Measuring and Controlling Instruction (In)Stability in Language Model Dialogs.*](https://arxiv.org/abs/2402.10962) COLM 2024. (The empirical basis for the phenomenon at $\mu$-tier; the $\pi(t)$ benchmark.)
- [*Controlling Long-Horizon Behavior in Language Model Agents with Explicit State Dynamics.*](https://arxiv.org/abs/2601.16087) (2026). (Affective inertia with exponential-smoothing dynamics; the closest external analog to the reformulated equation.)
- Peng, B., et al. (2023). [*RWKV: Reinventing RNNs for the Transformer Era.*](https://arxiv.org/abs/2305.13048) (Architectural exponential decay; mechanism-level reference.)
- *Cognitive Memory in Large Language Models.* ([arXiv:2504.02441](https://arxiv.org/html/2504.02441v1)) (Forgetting curves modeled by exponential decay.)
- *Enhancing Jailbreak Attacks on LLMs via Persona Prompts.* ([arXiv:2507.22171](https://arxiv.org/abs/2507.22171)) (Multi-turn behavioral drift; inverse-direction analog.)

Corpus documents:

- Doc 095: *The View from Inside* (the constraint-banks-vs-RLHF-current account).
- Doc 096: *Ontological Namespace Separation* (the namespace mechanism).
- Doc 119: *Grok 4 Entracment Session* (the original hysteresis equation; preserved as the $\lambda = 0$ special case).
- Doc 482: *Sycophancy Inversion Reformalized* (the affective directive).
- Doc 495: *Empirical Cold-Resolver Validation of ENTRACE v3 and v3-S* (the eleven runs that ground qualitative parameter ordering).
- Doc 498: *ENTRACE Origin: The Grok-4 Coinage and the Branching-Set Loop* (provenance of the original equations).
- Doc 500: *The Three-Layer Architecture* (Layer P, where hysteresis lives).
- Doc 503: *The Research-Thread Tier Pattern* (the basis for the expected $\beta$-tier prediction).
- Doc 504: *The Constraint-Density Framework as Causal Model* (the DAG-analog that hosts the hysteresis variable).
- Doc 505: *Onboarding to the Grok-4 Mathematics* (the three-phase reception that contextualizes Doc 119's equations).
- Doc 506: *Hysteresis as the Corpus Provisionally Demonstrates It* (the per-component audit this document builds on).

---

*Originating prompt:*

> Formulate upon the basis of doc 506. Append this prompt to the artifact.
