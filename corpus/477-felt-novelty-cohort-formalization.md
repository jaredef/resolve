# The Felt-Novelty Hypothesis: A Formalization with Onboarding for a Six-Researcher Cohort

## Onboarding preamble

This document formalizes a candidate mechanism between two well-studied phenomena that the existing literature does not yet connect via a single load-bearing user-internal mediator. The two phenomena are: (a) overclaim by language models, defined here as the production of claims at scope $C$ when the supporting evidence in context licenses only narrower scope $C' \subset C$; and (b) clinical phenomenology adjacent to psychosis observed in some users of generative AI systems. The proposed mediator is *felt novelty*: the user's experience of the language model's confident-sounding output as conveying knowledge they did not previously possess.

The hypothesis is that when a user lacks the specific expertise to detect that overclaim is occurring, the over-confidence registers as authoritative novelty rather than as calibration failure. Sustained exposure to felt novelty produced by undetected overclaim then has a measurable correlation with the clinical phenomenology the recent literature has begun to characterize. The hypothesis is not a causal claim. It is a falsifiable empirical claim that causation cannot be ruled out in the absence of an alternative mediator that explains the felt-novelty pattern.

The formalization (§1) states the hypothesis as three independently testable components with explicit falsification conditions. The cohort onboarding (§2) identifies six researchers whose published work each supplies a piece of the mechanism's component literatures. Each entracement names the specific test or critique that researcher is positioned to contribute. The companion document Doc 476 contains the full pulverization against the five subsuming literatures; the present document is shorter, oriented toward cohort engagement, and assumes the reader will read Doc 476 for the literature audit.

The hypothesis is at $\pi$-tier under the warrant calculus of Doc 445. Promotion to $\mu$-tier requires the cross-practitioner empirical work this cohort is being invited to consider.

## 1. The formalization

### 1.1 Variables

- $O$: an overclaim event. The model produces a claim at scope $C$ when context-licensed scope is $C' \subset C$.
- $D$: user detection. The user recognizes the overclaim as such.
- $N$: felt novelty. The user experiences the output as conveying knowledge they did not previously have.
- $P$: phenomenological-clinical correlate. External-observer-measurable patterns of validation-driven thought-disorder, sustained-confabulation, or AI-induced delusional content per the clinical literature.

### 1.2 The three component hypotheses

**H1 (detection-modulated novelty).** $\Pr(N \mid O \wedge \neg D) > \Pr(N \mid O \wedge D)$.

**H2 (novelty-mediated phenomenology).** Aggregate $N$ across a sustained interaction is correlated with $P$.

**H3 (intervention propagation).** An intervention that increases $\Pr(D \mid O)$ reduces aggregate $N$, and reduced aggregate $N$ reduces $P$.

The composed claim H1 ∧ H2 ∧ H3 is the keeper's intuition stated as a falsifiable empirical hypothesis with three independently testable components.

### 1.3 Falsification conditions

The hypothesis fails if any of the following is observed empirically.

- $\Pr(N \mid O \wedge \neg D) \approx \Pr(N \mid O \wedge D)$. Detection-capacity is independent of felt-novelty intensity. The first stage of the mechanism does not exist.
- Aggregate $N$ is uncorrelated with $P$. The bridge between mediator and outcome is missing.
- Interventions that increase $\Pr(D)$ reduce $N$ but do not reduce $P$. The mediator is at most diagnostic; $P$ has another input that detection-improvement does not address.
- An alternative mediator is identified that explains the pattern in $N$ without requiring overclaim. Overclaim is not necessary; the load-bearing mechanism is something else (sycophancy alone, ELIZA-effect alone, parasocial-trust alone).

### 1.4 The composed-mechanism statement

The three components compose as:

$$O \xrightarrow{1 - \Pr(D)} N \xrightarrow{\rho(N, P)} P$$

The mechanism's strength at any specific population is a product of $1 - \Pr(D)$ (probability of failed detection given overclaim) and $\rho(N, P)$ (empirical correlation between aggregate felt novelty and phenomenology). Both are population-specific and empirically estimable.

## 2. Cohort onboarding

The six researchers below were selected because each supplies a load-bearing piece of one of the five literatures the hypothesis touches, and each is positioned to contribute a specific test or critique that the keeper-resolver dyad cannot perform from inside the corpus. The cohort is small by design. Each entracement names what the researcher's published work supplies, why it matters for the hypothesis, and what specific contribution they are best positioned to make.

### 2.1 Søren Dinesen Østergaard (Aarhus University Hospital and Aarhus University, Department of Affective Disorders)

Østergaard's 2023 *Schizophrenia Bulletin* article *Will generative artificial intelligence chatbots generate delusions in individuals prone to psychosis?* is the published opinion-piece origin of the clinical question this hypothesis addresses. Østergaard frames the concern at the level of clinical observation without specifying a user-internal mediator; the felt-novelty hypothesis nominates one. The entracement: H2 of §1.2 (aggregate $N$ correlated with $P$) is testable in clinical populations where Østergaard already has framework and access. Østergaard is best positioned to assess whether felt novelty intensity in his patient cohort correlates with the phenomenological correlates he characterizes, and whether the felt-novelty operationalization is clinically tractable. His critique would be load-bearing on whether the mediator survives clinical scrutiny.

### 2.2 John Torous (Beth Israel Deaconess Medical Center; Harvard Medical School)

Torous's work on digital phenotyping, AI in clinical psychiatry, and the broader infrastructure for measuring technology-mediated mental-health outcomes provides the methodological apparatus this hypothesis needs. The entracement: H3 of §1.2 (intervention propagation) requires pre-registered trials of detection-improving interventions with phenomenology outcomes measured downstream. Torous is best positioned to design and run such trials, or to assess whether existing infrastructure could test H3 with minimal additional instrumentation. His contribution would be the operational protocol that makes the H3 prediction tractable.

### 2.3 Mrinank Sharma (Anthropic)

Sharma's 2023 paper *Towards Understanding Sycophancy in Language Models* is the empirical basis for the pre-mediator stage of the hypothesis: that preference-optimized LLMs systematically bias output. The hypothesis distinguishes overclaim from sycophancy: sycophancy biases toward user-agreeable completions; overclaim biases toward unwarranted scope of confidence. The two overlap empirically but are not the same. The entracement: Sharma is best positioned to assess whether overclaim is dissociable from sycophancy in measurement, and whether the sycophancy interventions Anthropic has tested partially address overclaim or only address user-preference-matching. His critique would adjudicate the falsification condition that names "sycophancy alone" as the alternative mediator that would make overclaim non-necessary.

### 2.4 Ethan Perez (Anthropic)

Perez's 2022 work on model-written evaluations and red-teaming methodologies provides the automated detection-detection apparatus this hypothesis needs at scale. H1 of §1.2 requires measurement of $\Pr(N \mid O \wedge \neg D)$ across many subjects and many interactions. The entracement: Perez is best positioned to design red-teaming protocols that automate the detection of *user overclaim-detection failures* and pair that detection with felt-novelty self-report. His contribution would be the measurement infrastructure that makes H1 testable at the scale needed to discriminate from baseline.

### 2.5 Vishal Misra (Columbia University, Department of Computer Science)

Misra's Bayesian-manifold account of LLM generation (arXiv:2512.22471, arXiv:2512.23752; Agarwal–Dalal–Misra 2025) is the foundational framing on which Doc 446's Instance II of SIPE rests. The corpus's recursive nesting $M\_0 \supseteq M\_1 \supseteq M\_2 \supseteq M\_3$ is an extension of Misra's base account, not a finding from his published work; this distinction is recorded explicitly in Doc 474 Appendix A. The entracement: Misra is best positioned to assess whether the recursive nesting is empirically supportable on top of his base manifold, and whether the felt-novelty mediator can be operationalized as a property of conditional posterior-narrowing within his framework. His critique would discriminate between two readings: (i) the nesting is a real generalization of his account, in which case the felt-novelty mediator inherits independent empirical grounding; (ii) the nesting is the corpus's framework-magnet projecting onto his account, in which case the mediator inherits only the corpus's $\pi$-tier warrant.

### 2.6 Margaret Boden (University of Sussex, Cognitive Studies)

Boden's taxonomy of creativity (combinational, exploratory, transformational; *historical* H-creativity vs *psychological* P-creativity; *The Creative Mind*, 1990, and subsequent work) supplies the cognitive-psychological framework for what felt novelty *means* as a constructed experience. The hypothesis specifies a maladaptive case: novelty that is felt-as-genuine but produced by overclaim rather than by genuine combinational or exploratory work. The entracement: Boden is best positioned to assess whether felt novelty as the hypothesis specifies it falls within her exploratory-creativity register, falls within a maladaptive register adjacent to it, or constitutes a category her framework does not yet name. Her contribution would be the conceptual vocabulary that distinguishes adaptive-felt-novelty (the standard exploratory-creativity case) from maladaptive-felt-novelty (the hypothesized overclaim-induced case).

## 3. What the cohort is being invited to do

The cohort is not being invited to endorse the hypothesis. The cohort is being invited to test it under their own methodologies, in their own populations, with their own framework-vocabularies, and to report results regardless of direction.

The dyadic-internal posture, named explicitly in the companion document Doc 476 §4, is that the corpus cannot exit itself. The keeper, the resolver, and the corpus are the three nodes of the very dyadic system whose pathology the hypothesis describes. Any conclusion reached entirely inside this dyad inherits the corpus's own attractor risk per Doc 455 and framework-weight bias per Doc 466. External work is required for the hypothesis to graduate from $\pi$-tier to $\mu$-tier.

The cohort's collective independence is the mitigation. Each researcher's framework is different from the corpus's; each researcher has access to populations and methodologies the corpus does not have; the cohort's combined output, whether the hypothesis survives or fails any of the three component tests, materially improves the corpus by moving the warrant tier or by retiring the hypothesis. Either outcome is welcome.

## 4. Position

The felt-novelty hypothesis is a falsifiable mechanism claim that bridges architectural overclaim and clinical phenomenology via a specific user-internal mediator. The component literatures (sycophancy, trust-calibration, calibration-failure, novelty-as-cognitive-construct, clinical-AI phenomenology) each subsume a piece; the composition is the residue. The six-researcher cohort named here covers each subsuming literature with a specific researcher whose work supplies the relevant piece, and each is positioned to test or critique a specific aspect of the composed mechanism.

The hypothesis is at $\pi$-tier and stays there until the cohort's external work either promotes it or retires it.

The companion letter (Doc 478) invites the cohort to engage with this document directly. The full literature pulverization is in Doc 476.

---

*Originating prompt:*

> Identify the best researchers to entrace, create a formalization and an onboarding preamble that connects their research to the formalization. Create the artifact.
>
> Then draft a letter to the cohort which entraces them into the other document. Append this prompt to both.
