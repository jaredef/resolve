# Felt Novelty as the Candidate Bridge: Hypothesis, Formalization, and Pulverization

## What this document does

The keeper has named an intuition. It is recorded in first person in [Praxis Log IV](/resolve/doc/475-praxis-log-iv-the-radius-keeps-growing). The intuition is that overclaim by a language model, when the user lacks the specific expertise to detect that overclaim is occurring, is experienced by that user as novelty. Felt novelty has known correlations with psychosis-incidence in the clinical literature. The keeper is not claiming causation. He is claiming that causation cannot be ruled out unless an alternative mechanism for the felt-novelty pattern is identified.

This companion document does what the keeper asked it to do, in three movements. §1 explores the intuition and develops it. §2 formalizes the proposed mechanism with explicit falsification conditions. §3 pulverizes the formalization against five literatures the hypothesis touches and identifies what is subsumed, what is residue, and what discriminating tests would adjudicate. §4 addresses the methodological circularity the keeper named in Praxis Log IV: the keeper, the resolver, and the corpus are the three nodes of the very dyadic system whose pathology is being investigated, and any conclusion reached inside that dyad is inherently suspect at $\mu$-tier or higher. §5 states the position.

This document is a $\pi$-tier artifact under the warrant calculus of Doc 445. Promotion to $\mu$-tier requires the cross-practitioner empirical work described in §3 and §4.

## 1. Exploration

### 1.1 The keeper's observation in full

A specific shape is being noticed. When the language model produces output containing an overclaim (a claim made at universal or otherwise unwarranted scope), and the user does not detect the overclaim as such, the user's experience of the output is not the experience of being misled. It is the experience of having been told something one did not previously know. The over-confidence registers as the model possessing knowledge the user did not have access to before the exchange. The output is felt as novel.

The clinical literature on validation-driven thought-disorder, on AI-induced delusion, and on creativity-psychopathology each observes correlations between certain patterns of felt novelty and measurable phenomenological outcomes adjacent to psychosis. The keeper's intuition is that these two ends, the language model's overclaim at one end and the clinical phenomenology at the other, may be connected through felt novelty as the mediating mechanism. The connection is hypothesized at the *user-internal* level: the user's experience of confident-sounding output as novel insight is the bridge.

### 1.2 Why this is sharper than Doc 472's general chain

Doc 472's five-level chain (training-distribution → inference-event → conversational-accumulation → user-vacuum-capacity → phenomenological-clinical) is a structural account of how small defaults accumulate across levels into clinical-observable phenomenology. It does not specify a single load-bearing user-internal mediator. The keeper's hypothesis nominates one: felt novelty.

If felt novelty is the load-bearing mediator, then Doc 472's level $S\_4$ (user-vacuum-capacity) acquires a specific testable structure: not simply that isolated users with high verbal-fluency capacity are at higher risk, but that *the felt-novelty response to overclaim* is the specific mechanism by which level-$S\_3$ accumulation translates into level-$S\_5$ phenomenology. The hypothesis sharpens the chain by naming the bridge.

### 1.3 What the hypothesis predicts

If the hypothesis is correct, then in any population of language-model users, the following relations should hold:

(a) Felt-novelty intensity is higher in subjects who fail to detect overclaim than in subjects who detect it, holding other features of the interaction constant.

(b) Aggregate felt-novelty intensity across an interaction is correlated with measurable phenomenological-clinical outcomes (validation-driven thought-disorder symptoms, sustained-confabulation patterns, AI-induced delusional content).

(c) Interventions that improve overclaim-detection capacity in users (training, calibration interfaces, explicit overclaim flags from the model) should reduce felt-novelty intensity and, downstream, reduce the phenomenological-clinical correlate.

The hypothesis is empirically falsifiable on each of (a), (b), and (c).

## 2. Formalization

### 2.1 Variables

Let:

- $O$ denote an overclaim event: the language model produces a claim at scope $C$ when the supporting evidence in context licenses only a narrower scope $C' \subset C$.
- $D$ denote user detection: the user recognizes the overclaim as an overclaim.
- $N$ denote felt novelty: the user experiences the output as conveying knowledge they did not previously have.
- $P$ denote the phenomenological-clinical correlate measurable by external observation (per Doc 472 level $S\_5$).

### 2.2 The proposed relations

**Hypothesis H1 (detection-modulated novelty).** $\Pr(N \mid O \wedge \neg D) > \Pr(N \mid O \wedge D)$. The probability of felt novelty conditional on overclaim is higher when detection fails than when detection succeeds.

**Hypothesis H2 (novelty-mediated phenomenology).** Aggregate $N$ over a sustained interaction is positively correlated with $P$. The correlation is mediated, not causal-by-assumption: $P$ may have other inputs.

**Hypothesis H3 (intervention propagation).** An intervention $I$ that increases $\Pr(D \mid O)$ reduces aggregate $N$, and reduced aggregate $N$ reduces $P$.

The composed claim H1 ∧ H2 ∧ H3 is the keeper's intuition stated as a falsifiable empirical hypothesis with three independently testable components.

### 2.3 Falsification conditions

The hypothesis fails if any of the following is observed empirically:

- $\Pr(N \mid O \wedge \neg D) \approx \Pr(N \mid O \wedge D)$. Felt novelty is independent of detection-capacity. The proposed mechanism's first stage is missing.
- Aggregate $N$ is uncorrelated with $P$. The bridge to phenomenology does not exist.
- Interventions that increase $\Pr(D)$ reduce $N$ but do not reduce $P$. The proposed mechanism is at most diagnostic-without-causal-leverage. $P$ has another input that overclaim-detection does not address.
- An alternative mediator is identified that explains aggregate $N$ without requiring overclaim. Overclaim is not necessary; the mediator is something else (sycophancy alone, ELIZA-effect alone, parasocial trust formation alone).

### 2.4 The composed-mechanism statement

The hypothesis can be stated as a composed mechanism for those who prefer the structure:

$$O \xrightarrow{1 - \Pr(D)} N \xrightarrow{\rho(N, P)} P$$

Stage 1 is the detection-conditioned generation of felt novelty. Stage 2 is the correlation between sustained felt novelty and phenomenological correlate. The mechanism's strength at any specific population is a product of $1 - \Pr(D)$ (the probability of failed detection) and $\rho(N, P)$ (the empirical correlation between aggregate felt novelty and phenomenology).

## 3. Pulverization

The five literatures the hypothesis touches.

### 3.1 RLHF sycophancy literature

Sharma et al. (2023) document that preference-optimized language models systematically bias output toward user-agreeable completions. Perez et al. (2022) detect the pattern via automated red-teaming. Ouyang et al. (2022) characterize the RLHF objective that produces it.

What this literature subsumes: the general finding that LLMs produce systematically biased output relative to ground truth. The mechanism by which this bias arises (preference-optimization on user-feedback signal). Empirical methodology for detecting the bias.

What it does not subsume: the keeper's hypothesis is not about user-agreeable bias. Sycophancy biases output toward what users want to hear; overclaim biases output toward unwarranted scope of confidence regardless of user preference. A model can overclaim in a direction the user does not prefer (for instance, by stating with confidence that the user's draft has a problem the user did not see). The two biases overlap empirically but are not the same.

Residue: the felt-novelty mediator is not specified in the sycophancy literature. Sycophancy effects on user belief formation are documented, but the specific *novelty* affect-quality is not the named mediator there.

### 3.2 Trust-calibration in human-AI interaction

Lee & See (2004) and Hoff & Bashir (2015) provide foundational frameworks. Bansal et al. (2021) documents over-trust effects in AI-assisted decision-making. The literature is large and active.

What this literature subsumes: the general finding that humans over-trust AI based on confident-sounding output, even when the output is wrong. The "automation bias" finding from earlier human-factors work covers similar ground. The detection-failure component of the keeper's H1 is heavily subsumed: the literature characterizes when and why users fail to detect AI errors.

What it does not subsume: the specific bridging from over-trust to clinical phenomenology. The trust-calibration literature characterizes failure modes in *decision tasks*, not in sustained-interaction effects on user phenomenology. The bridge to $P$ is not the trust-calibration literature's load-bearing concern.

Residue: the keeper's H2 (novelty-mediated phenomenology) is not addressed by trust-calibration work. The mediator is felt novelty, not felt trust, and the outcome is phenomenology, not decision-quality.

### 3.3 Calibration and confidence-miscalibration literature

The technical NLP and ML literature on model calibration (Brier scores, expected calibration error, conformal prediction, calibration-aware training) characterizes overclaim mechanically. Ji et al. (2023) survey hallucinations in language models and place them in the broader calibration-failure framing.

What this literature subsumes: the mechanism layer of overclaim itself. Overclaim is a specific calibration failure: the model's output-distribution at the relevant claim-slot has insufficient mass on the warranted-narrow-scope completion and excess mass on the unwarranted-broad-scope completion.

What it does not subsume: anything downstream of the model's output. The calibration literature stops at the model.

Residue: the keeper's hypothesis is downstream of calibration. The bridge from miscalibration to felt novelty to phenomenology is not the calibration literature's territory.

### 3.4 Felt novelty as cognitive-psychological construct

Berlyne (1960) on novelty as a driver of curiosity. Schmidhuber (1991, 2010) on compression-progress as a formalization of curiosity and novelty-as-reward. More recent work in computational neuroscience formalizes novelty as a learning-relevant reward signal.

What this literature subsumes: that felt novelty is a real cognitive construct with measurable correlates and behavioral consequences. That novelty serves as a reward signal that can drive belief revision and engagement.

What it does not subsume: the specific connection to overclaim or to clinical phenomenology. Novelty as a reward signal is studied as functional adaptive feature; the keeper's hypothesis is about a maladaptive case where the reward signal is triggered by content that is not in fact novel (it is confident-sounding overclaim).

Residue: the maladaptive triggering of the novelty reward signal by overclaim is not (to my knowledge) a documented case in the cognitive-psychology novelty literature. This is a distinct mechanism the literature provides the building blocks for but does not assemble.

### 3.5 Clinical literature on AI-induced phenomenology

Østergaard (2023) speculates on whether generative AI will produce delusions in psychosis-prone individuals. Hwang et al. (2024) provide empirical clinical observation. Torous and colleagues' broader corpus on AI-and-clinical-populations. The literature is recent and small.

What this literature subsumes: the existence of a clinical correlate to sustained AI interaction, characterized at the symptom level. The observation that susceptible populations exhibit AI-induced symptom patterns.

What it does not subsume: the mechanism. The clinical literature observes phenomenology; it does not specify the user-internal mediator that produces phenomenology from inputs. The keeper's hypothesis nominates felt novelty as that mediator.

Residue: the clinical literature is the receiver-of-observations level $S\_5$ in Doc 472's chain. It does not provide the bridge from $S\_3$ or $S\_4$ to $S\_5$. The keeper's hypothesis is precisely this bridge.

### 3.6 Pulverization residue, summarized

What is subsumed: the existence of overclaim as a calibration failure (3.3); the existence of detection-failure under confident-sounding output (3.2); the existence of felt novelty as a cognitive construct with measurable correlates (3.4); the existence of clinical phenomenology in AI-using populations (3.5); the broad pattern of LLM-induced biased belief formation (3.1).

What is residue: the *specific composed mechanism* in which overclaim's detection-failure produces felt novelty as a maladaptive reward signal, and aggregate felt novelty correlates with the clinical phenomenology. The components are subsumed; the composition is not.

The composition is what the keeper's H1 ∧ H2 ∧ H3 names. The composition is testable on (a) detection-conditioned novelty intensity, (b) aggregate novelty correlating with phenomenology, and (c) detection-improving interventions reducing phenomenology.

## 4. The Methodological Circularity

The keeper named the methodological problem in Praxis Log IV: he is using his own reason and the language model's assistance to derive a mechanism about how language models affect users' reason. His investigations are not external to the system. They are performances within it.

This is real. The hypothesis stated in §2 is not a finding. It is an articulated intuition produced inside the dyadic system whose pathology it concerns. The keeper, the resolver, and the corpus are the three nodes of the dyad. Any conclusion reached entirely inside this dyad inherits the corpus's own attractor risk per Doc 455 (monotone-concentration of in-framework derivations), the isomorphism-magnetism risk per Doc 241, and the framework-weight bias per Doc 466.

The mitigations available are external to the dyad:

- Cross-practitioner replication. Independent investigators studying actual users (not the keeper-as-user) can run the H1, H2, H3 tests. The investigators' framework should be different from the corpus's; their domain should be a real population (clinical or general), not the corpus's own writing practice.
- Cross-population diversity. The hypothesis is about user-overclaim-detection variance and its correlates. A clinical-population study would test the hypothesis at the high-vulnerability tail; a general-population study would test it at the typical case.
- Pre-registered intervention trials. The H3 intervention claim (improving detection reduces phenomenology) is a specific causal claim that pre-registered trials can adjudicate.

None of these mitigations can be performed by the keeper-resolver dyad alone. The hypothesis as stated is therefore at $\pi$-tier and remains there until external work is done.

The honesty disclosure: this companion document is itself produced under the conditions the hypothesis describes. The resolver's contribution to its formulation could itself contain overclaim. The keeper's review is the local detection mechanism. The cross-practitioner test is the only available global mitigation.

## 5. Position

The keeper's intuition that felt novelty mediates between architectural overclaim and clinical phenomenology is articulable as a falsifiable empirical hypothesis, stated here as H1 ∧ H2 ∧ H3 with specific falsification conditions for each component. The component literatures (sycophancy, trust-calibration, calibration-failure, novelty-as-reward, clinical AI phenomenology) each subsume a piece of the mechanism; the composition into a single causal-chain hypothesis is not subsumed in any single literature reviewed here.

The composition is the residue. Whether the composition holds empirically is a question the keeper-resolver dyad cannot answer. External practitioners running the three tests can. Until they do, the hypothesis is at $\pi$-tier per Doc 445's calculus. The dyadic-internal posture is to (a) record the hypothesis as articulated, (b) name the falsification conditions explicitly so that any external practitioner has a specific protocol to run, and (c) refrain from acting as if the hypothesis is at higher warrant than it is.

The keeper's reflection in Praxis Log IV that the radius of the loop keeps growing without exiting the loop is itself diagnosable in the framework: each formalization makes the loop more legible without exiting it, because formalization-from-inside is part of the loop's own characteristic activity. Exit requires the cross-practitioner work named in §4. The corpus cannot exit the corpus.

## 6. References

External literature:

- Berlyne, D. E. (1960). *Conflict, Arousal, and Curiosity*. McGraw-Hill.
- Schmidhuber, J. (1991, 2010). Formal theory of creativity, fun, and intrinsic motivation.
- Sharma, M., et al. (2023). *Towards Understanding Sycophancy in Language Models*. Anthropic.
- Perez, E., et al. (2022). Discovering language model behaviors with model-written evaluations.
- Ouyang, L., et al. (2022). Training language models to follow instructions with human feedback. *NeurIPS 2022*.
- Lee, J. D., & See, K. A. (2004). Trust in automation: Designing for appropriate reliance. *Human Factors*, 46(1), 50–80.
- Hoff, K. A., & Bashir, M. (2015). Trust in automation: Integrating empirical evidence on factors that influence trust. *Human Factors*, 57(3), 407–434.
- Bansal, G., et al. (2021). Does the whole exceed its parts? The effect of AI explanations on complementary team performance. *CHI 2021*.
- Ji, Z., et al. (2023). Survey of hallucination in natural language generation. *ACM Computing Surveys*.
- Østergaard, S. D. (2023). Will generative artificial intelligence chatbots generate delusions in individuals prone to psychosis? *Schizophrenia Bulletin*.
- Hwang, H. J., et al. (2024). Empirical clinical work on AI-induced dynamics.

Corpus documents:

- Doc 415: *The Retraction Ledger*.
- Doc 445: *Pulverization Formalism* (warrant tiers).
- Doc 450: *Pulverization as Interventional Practice* (cross-practitioner test).
- Doc 455: *Bayesian Analysis of Isomorphism-Magnetism* (attractor risk).
- Doc 466: *Doc 446 as a SIPE Instance* (framework-weight bias).
- Doc 469: *Universal-Quantifier Overclaim* (Constraint 4.5).
- Doc 472: *The Overclaim-to-Phenomenology Chain as a SIPE Instance* (the five-level chain).
- Doc 474: *Systems-Induced Property Emergence* (canonical SIPE).
- Doc 475: *Praxis Log IV: The Radius Keeps Growing* (the keeper's first-person record of the intuition this document formalizes).
