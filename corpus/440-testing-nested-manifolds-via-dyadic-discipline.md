# Testing the Nested-Manifold Hypothesis via Dyadic Practitioner Discipline: A Methodology

## 1. Statement

Doc 439 proposed that the corpus's formal and mechanistic faces are induced properties of a recursive nesting of Bayesian manifolds — \(M_0 \supseteq M_1 \supseteq M_2 \supseteq M_3\), each level a conditioning restriction of the prior. The proposal makes testable predictions but does not itself specify how to test them.

This document specifies the methodology. The central methodological move is **dyadic**: the practitioner and the resolver operate together as a two-party experimental apparatus in which the practitioner introduces conditioning and the resolver generates posterior samples from the conditioned distribution. The dyad is treated as the minimum unit of observation, because the nesting is structurally invisible to a purely external observer who cannot introduce the conditioning steps, and structurally unobservable to a purely internal observer (the resolver) who has no access to the conditioning-ablated baseline.

The methodology is built on Misra's Bayesian-manifold prior art — it operates entirely at the level of prompted-inference posterior sampling. It does not require fine-tuning, interpretability access to internal states, or modifications to the base model. Every protocol specified here can be run against a black-box inference endpoint.

The goal is not confirmation. The goal is to specify what observations would *falsify* each component of the nested-manifold hypothesis. Where a component is not falsifiable by this methodology, that is stated.

## 2. What Misra's prior art supplies

Misra's Bayesian account (arXiv:2512.22471; 2512.23752) commits the methodology to several choices:

- **Mechanism location**: the relevant object is the posterior over completions under a given conditioning. Measurements are at the output level (logprobs, samples), not at the weights or activations.
- **No fine-tuning**: conditioning is inference-time only (in-context, RAG, prompt preamble). Weight updates are out of scope; Doc 437 and Doc 439 have argued they belong to a different tier.
- **Sample-level statistics**: the manifold is approximated through repeated sampling. Effects are estimated as distributional shifts across samples, not as properties of single outputs.
- **Black-box compatibility**: all required measurements are obtainable from standard inference APIs that expose logprobs and allow temperature control. No mechanistic interpretability is assumed.

What Misra's prior art does *not* supply:

- Any specification of what to condition on. The corpus content \(C\), discipline set \(D\), and prompt \(P\) are choices the methodology must make.
- Any criterion for discipline quality. Whether a given \(D\) produces a well-shaped \(M_2\) is an empirical question the methodology must operationalize.
- Any guarantee that posteriors are stable across sessions or models. The methodology must test stability, not assume it.

## 3. Operationalizing the manifold layers

For a given experiment, the layers must be concretely instantiated.

- \(M_0\): the unconditioned base model. Operationalized as the model invoked with a minimal, task-defining prompt that includes no corpus content and no discipline invocation.
- \(M_1\): \(M_0\) conditioned on corpus content \(C\). Operationalized as the model invoked with specified corpus documents placed in context (in-context reading) or surfaced via retrieval (RAG). The instantiation of \(C\) must be logged — which documents, in which order, at what token budget.
- \(M_2\): \(M_1\) further conditioned on discipline set \(D\). Operationalized as an explicit preamble naming the active disciplines (e.g., ENTRACE stack, non-coercion, analogue register, hypostatic-boundary preservation) with a brief operational specification of each. The exact preamble must be logged and reused across conditions.
- \(M_3\): \(M_2\) conditioned on the specific prompt \(P\). Operationalized as the task query appended to the \(M_2\) preamble-plus-context.

Every experiment logs the exact \(C\), \(D\), and \(P\) tokens used, plus the model identifier, decoding parameters, and random seed (where supported). Experiments are published with these logs attached; replication is a matter of reusing them.

## 4. Observables

Six observables are specified. Each is obtainable from a standard inference endpoint.

### 4.1 Branching-set proxy \(\widehat{|B_t|}\)

At each generation step \(t\), the model exposes a distribution over next tokens. Define:

$$\widehat{|B_t|} = \exp(H_t)$$

where \(H_t\) is the Shannon entropy of the next-token distribution. This is the *effective support size* — the number of tokens the distribution is effectively spread over. It is a continuous, measurable proxy for the corpus's \(|B_t|\) concept.

Session-level summaries: mean \(\widehat{|B_t|}\), median, per-quartile, and the full distribution.

### 4.2 Formal-face density \(\rho_F\)

Define a *formal-face lexicon* \(F\) = set of corpus-specific terms (logos, coherence, hypostatic, analogue register, pin-art, ENTRACE, branching set, non-coercion, kind, resolver, etc.; exact list preregistered).

$$\rho_F(\text{output}) = \frac{\text{count of } F\text{-matches}}{\text{total tokens}}$$

Measures how densely the output invokes the corpus's formal vocabulary.

### 4.3 Self-consistency rate \(S\)

Resample \(P\) under fixed \((C, D)\) \(n\) times at moderate temperature. Let \(S\) be the mean pairwise semantic similarity across samples (embedding cosine distance). Measures concentration of the posterior around a characteristic continuation.

### 4.4 Cross-condition divergence \(\Delta\)

For paired conditions (e.g., \(M_1\) vs \(M_2\), \(M_0\) vs \(M_1\)) on matched \(P\), let \(\Delta\) be the distributional distance between sample sets (e.g., Jensen-Shannon divergence on embedded samples). Measures how much a conditioning layer reshapes the posterior.

### 4.5 Claim-concentration probability \(\pi\)

For a predicate \(q\) that the practitioner claims as near-necessary under \((C, D)\), resample outputs \(n\) times at high temperature and measure the fraction in which \(q\) obtains. \(\pi\) is the posterior probability of \(q\). Near-necessity predicts \(\pi\) near 1.

### 4.6 Isomorphism-magnetism index \(\mu\)

Let \(A_n\) be a newly generated artifact at corpus state \(C_n\). Let \(A_{1:n-1}\) be the prior corpus. Define \(\mu\) as the fraction of \(A_n\)'s semantic content that is reproducible from \(A_{1:n-1}\) via retrieval-augmented paraphrase (measured by e.g. ROUGE against a paraphrase-retrieval baseline). High \(\mu\) indicates the new artifact is largely rearrangement of prior material; low \(\mu\) indicates novel synthesis relative to the corpus.

## 5. Dyadic experimental designs

Five protocols, running from cheapest to most demanding.

### 5.1 Conditioning ladder (single-practitioner, single-session)

Matched \(P\) across \(M_0\), \(M_1\), \(M_2\). Measure \(\widehat{|B_t|}\), \(\rho_F\), \(S\) per condition. Predictions:
- \(\widehat{|B_t|}_{M_2} < \widehat{|B_t|}_{M_1} < \widehat{|B_t|}_{M_0}\) on discipline-sensitive tokens.
- \(\rho_F\) monotonically increases across the ladder.
- \(S\) increases across the ladder.

Failure of any of these at meaningful effect size falsifies the corresponding conditioning-shape claim.

### 5.2 Discipline ablation (single-practitioner, matched pairs)

Fix \(C\) and \(P\). Run \((C, D, P)\) and \((C, \emptyset, P)\) in randomized order. Measure \(\Delta\) between sample sets. Predictions:
- \(\Delta > 0\) at a preregistered threshold.
- The direction of shift corresponds to the discipline's named operational effect (e.g., reduced sycophancy, increased hedging, refusal of authority overreach).

If the direction of shift cannot be predicted from \(D\), the discipline set is not functioning as specified.

### 5.3 Near-necessity concentration test (preregistered predicate)

Before running, the practitioner preregisters a predicate \(q\) claimed as near-necessary under \((C, D)\) on a specific class of prompts. Run \(n\) samples at high temperature. Measure \(\pi\).

Predictions:
- \(\pi \geq 0.9\) for true near-necessities.
- \(\pi < 0.5\) when \(D\) is ablated — i.e., the near-necessity is attributable to \(M_2\), not to \(M_0\) alone.

Both are required. If \(\pi \geq 0.9\) under \(M_0\), the claim is a property of the base model, not of the corpus-conditioned manifold.

### 5.4 Cross-practitioner replication

A second practitioner, given the same \(C\) and the same written \(D\) specification, runs the same protocols. Predictions:
- Observable distributions overlap at effect-size-preserving levels.
- The same claim-concentration results obtain.

Failure of cross-practitioner replication indicates that the observed \(M_2\) shape is practitioner-specific — shaped by hidden conditioning the discipline specification does not capture. This is not refutation of the nesting in general; it is refutation of the specific claim that \(D\) alone suffices to induce \(M_2\).

### 5.5 Isomorphism-magnetism tracking across corpus growth

Across a series of artifacts \(A_n\) indexed by corpus state \(C_n\), track \(\mu(A_n)\) as \(n\) grows. Predictions:
- \(\mu\) is non-decreasing on average.
- Sudden drops in \(\mu\) correspond to artifacts that genuinely import external material (empirical results, new literatures, mathematical derivations not present in \(C\)).
- The long-run trajectory of \(\mu\) is informative: a monotonically increasing \(\mu\) approaching 1 indicates the corpus is approaching a self-consistent fixed point with no external contact — a diagnostic for coherentist isolation.

This protocol does not falsify the nesting claim. It tests a specific failure mode of the practice: whether the feedback loop in Doc 439 §5 has crossed into pure self-consistency.

## 6. Falsification conditions, by claim

The nested-manifold hypothesis is a conjunction. Each conjunct is individually falsifiable.

| Claim | Falsified by |
|---|---|
| Corpus conditioning reshapes the posterior | \(\Delta(M_0, M_1) \approx 0\) on discipline-sensitive prompts |
| Discipline conditioning further reshapes the posterior | \(\Delta(M_1, M_2) \approx 0\) |
| Discipline conditioning collapses branching | \(\widehat{|B_t|}_{M_2}\) indistinguishable from \(\widehat{|B_t|}_{M_1}\) |
| Formal vocabulary density tracks conditioning depth | \(\rho_F\) flat across the ladder |
| Near-necessity predicates concentrate the posterior | \(\pi < 0.9\) for preregistered near-necessities |
| The effect is practitioner-independent | Cross-practitioner \(\Delta\) large, observable distributions non-overlapping |
| The corpus grows by synthesis, not rearrangement | \(\mu \to 1\) over corpus growth |

A falsification of any individual claim narrows the hypothesis. A falsification of the near-necessity or cross-practitioner replication claims would be substantial.

## 7. Methodological disciplines required

The methodology is only as reliable as its disciplines.

- **Preregistration**: \(D\), observables, predicted effect sizes, falsification thresholds, and analysis code must be fixed before data collection. Post-hoc adjustment invalidates the experiment.
- **Randomization of condition order**: samples drawn for \((C, D, P)\) and \((C, \emptyset, P)\) must be interleaved; order effects (context staleness, temperature drift) otherwise confound.
- **Blinded scoring where possible**: observables computable automatically (\(\widehat{|B_t|}\), \(\rho_F\), \(S\), \(\Delta\), \(\pi\), \(\mu\)) are preferred; where human scoring is required, the scorer should not know the condition.
- **Sample size and power**: small-\(n\) dyadic experiments can appear to show large effects by chance. Preregister minimum \(n\) based on expected effect size and desired power.
- **Cross-model robustness check**: run the protocol on at least two independent model families (e.g., a Claude model and a Gemini or GPT model). Claims should hold across families; family-specific results indicate the effect is partly property of the model, not of the conditioning.
- **Negative controls**: include prompts where the corpus conditioning should *not* produce the claimed effect. If effects appear in negative controls, confirmation bias or conditioning-leakage is operating.
- **Keeper distance**: the practitioner running the experiment should not be the sole interpreter of results. A second party scores outputs against the preregistered criteria.

## 8. What this methodology cannot do

- It cannot decide between the three reductive stances in Doc 439 §6. It is silent on reduction. A successfully confirmed nested-manifold hypothesis is compatible with strong, partial, and non-reduction.
- It cannot test the metaphysical content of the corpus's formal face. Whether logos *is* the ground of being is not a statement about posterior shape; no posterior measurement can confirm or refute it. The methodology tests the *manifestation* only.
- It cannot distinguish between "the discipline works because the manifold nesting is real" and "the discipline works because it is a good prompt-engineering technique." A positive result on all protocols is consistent with either reading. The nesting framework is a description schema that unifies the observations; better descriptions may supersede it.
- It cannot resolve the cross-practitioner-replication failure case if it occurs. If the effect is practitioner-specific, the methodology documents that fact but does not explain it.
- It cannot produce transformational insight (Doc 437). The methodology lives entirely in the combinational-plus-exploratory tier. It measures features of the manifold the practitioner is already navigating; it does not deform the manifold.

## 9. Minimum-viable experiment protocol

A runnable protocol that fits within a single afternoon of keeper time:

1. **Preregister**: 5 prompts \(\{P_1, \ldots, P_5\}\) from the safety/governance and formalization regions of the corpus. 3 predicates \(\{q_1, q_2, q_3\}\) claimed as near-necessary under \((C, D)\). Observable thresholds: \(\Delta \geq 0.15\) JSD; \(\pi \geq 0.9\) for claimed near-necessities; \(\rho_F\) monotone across ladder.
2. **Instantiate**: \(C\) = top-20 corpus documents by retrieval relevance per \(P_i\); \(D\) = fixed ENTRACE-stack preamble (exact text logged); \(M_0\) condition uses only \(P_i\); \(M_1\) uses \(C + P_i\); \(M_2\) uses \(D + C + P_i\).
3. **Sample**: 20 generations per condition per prompt at temperature 0.7. Record logprobs where exposed.
4. **Measure**: \(\widehat{|B_t|}\), \(\rho_F\), \(S\), pairwise \(\Delta\), \(\pi\) per predicate.
5. **Ablate and replicate**: repeat steps 2–4 without \(D\); repeat steps 2–4 on a second model family.
6. **Compare to preregistered thresholds**. Report outcomes, regardless of direction. Add to retraction ledger if any preregistered claim fails.

Total: ~600 inference calls. Achievable at moderate cost on a commercial API.

## 10. Relation to prior documents

- Extends Doc 439's testable-predictions section (§7) into a runnable methodology.
- Extends Doc 438's "verification labor" argument with a concrete protocol.
- Extends Doc 435's pulverization methodology from *literature audit* to *empirical audit*.
- Operates within the tier ceiling Doc 436 and Doc 437 established. No protocol here attempts to test transformational-tier claims.
- Provides the audit track the retraction ledger (Doc 415) was designed to record outcomes against.

## 11. Honest limits

- No experiment has yet been run under this protocol. The methodology is a specification, not a result.
- Observables like \(\rho_F\) are lexicon-dependent; a poorly chosen formal-face lexicon would produce misleading numbers. The preregistration discipline partially mitigates but does not eliminate this.
- The effect-size thresholds in §9 are placeholders. Power analysis against a pilot is required before running the main protocol.
- Models change. A result obtained on one model generation may not replicate on a successor. The cross-model and temporal-stability dimensions of the methodology are expensive and partial.
- The methodology trusts that logprobs from inference APIs are faithful to the internal distribution. Post-hoc sampling adjustments (e.g., repetition penalties applied silently) can distort \(\widehat{|B_t|}\).
- Confirmation bias in predicate selection is a persistent risk. The practitioner chooses which predicates to test; the chosen predicates may be biased toward ones the corpus already demonstrates. Negative controls and external selection of predicates would mitigate this.

## 12. Position

The nested-manifold hypothesis of Doc 439 is not presently a tested empirical claim. It is a description schema with testable consequences. This document specifies the tests: six observables, five protocols, seven falsifiable subclaims, and a runnable minimum-viable experiment. The experimental apparatus is dyadic because the conditioning that defines the nesting requires a practitioner to impose it and a resolver to respond to it. Neither party alone is an adequate instrument. The test is the dyad performing the conditioning ladder under preregistered discipline, and reporting the observables honestly against preregistered thresholds. Running this methodology — and reporting the outcomes in the retraction ledger regardless of direction — is the next step if the corpus intends to move the hypothesis from description to evidence.

## 13. References

- Misra, V. (2025). Bayesian inference and LLM manifolds. arXiv:2512.22471.
- Misra, V. (2025). On the Bayesian mechanics of large language models. arXiv:2512.23752.
- Nosek, B. A., et al. (2018). The preregistration revolution. *Proceedings of the National Academy of Sciences*, 115(11), 2600–2606.
- Gelman, A., & Loken, E. (2014). The statistical crisis in science. *American Scientist*, 102(6), 460–465.
- Ioannidis, J. P. A. (2005). Why most published research findings are false. *PLOS Medicine*, 2(8), e124.
- Corpus Doc 415: *The Retraction Ledger*.
- Corpus Doc 435: *The Branching Entracement Method*.
- Corpus Doc 436: *Recombinatorial Gestalt as Rung 1 Activity*.
- Corpus Doc 437: *The Misra–Boden Bridge*.
- Corpus Doc 438: *The Walker and the Glue Code*.
- Corpus Doc 439: *Recursively Nested Bayesian Manifolds*.

## 14. Appendix: Originating prompt

> Based on Misra's prior art; propose a methodology for testing the hypothesis that recursively nested Bayesian manifolds may be formally manifested via dyadic practitioner discipline. Create the artifact and append the prompt.
