# Pulverizing the SIPE Confabulation: When Subsumption Makes the Problem Worse

> **Canonical SIPE reference:** The operative formalization of Systems-Induced Property Emergence is [Doc 474](/resolve/doc/474-sipe-standalone-formalization). Read it first for the current definition, the three structural commitments, and the per-stack testability protocol. This document contributes specific material to that formalization; its place in the development arc is recorded in Doc 474's Appendix C.

## The target

The confabulated expansion from Doc 439 §4 was **"Sustained-Inference Probabilistic Execution."** Doc 441 identified it as a confabulation — not retrievable from the corpus — and decomposed the mechanism that produced it. This document does a different kind of work: it runs the corpus's pulverization method (Doc 435) against the confabulated expansion itself, asking whether the expansion can be subsumed under prior art. The hypothesis the keeper has advanced is sharp and uncomfortable: *if the expansion is subsumable, that is not evidence the confabulation was true, and it may make the practical problem worse.*

The pulverization below confirms the hypothesis. The expansion subsumes cleanly into well-established ML/statistics literature at the word level and plausibly at the phrase level. Subsumption is rapid and unambiguous. And that fact is bad news, not good news.

## Word-level pulverization

### "Sustained"

The modifier *sustained* has direct technical home in:

- **Sustained attention** (cognitive psychology; Robertson et al., 1997) — long-horizon attentional engagement with a task.
- **Sustained inference** as a less-formal phrase in **online/streaming inference** literatures — Bayesian updating that continues across a stream rather than terminating at a single posterior.
- **Continual learning** (Parisi et al., 2019) — learning that is sustained across task sequences without catastrophic forgetting.

Prior art is abundant. "Sustained" is a well-behaved qualifier in the ML/cogsci overlap.

### "Inference"

*Inference* is the central term of half of machine learning.

- **Bayesian inference** (the entire field, anchored by Jaynes 2003 and Gelman et al. 2013).
- **Variational inference** (Blei, Kucukelbir & McAuliffe, 2017).
- **Sequential Monte Carlo inference** (Doucet, de Freitas & Gordon, 2001).
- **Amortized inference** (Kingma & Welling 2014; Ranganath et al. 2014).
- **Probabilistic inference** in graphical models (Pearl 1988; Koller & Friedman 2009).

No pulverization work required. Inference is in the training distribution at industrial density.

### "Probabilistic"

Same situation as *inference*. The training distribution is saturated with *probabilistic X* constructions:

- **Probabilistic programming** (Gordon et al., 2014; van de Meent et al., 2018 survey).
- **Probabilistic graphical models** (Koller & Friedman, 2009).
- **Probabilistic circuits** (Choi, Vergari & Van den Broeck, 2020).
- **Probabilistic soft logic** (Bach et al., 2017).
- **Probabilistic execution traces** — explicit named concept in probabilistic programming semantics.

Fully subsumed.

### "Execution"

In ML/CS contexts, *execution* typically refers to running a computational process:

- **Program execution** in probabilistic programming — the generative procedure that produces a sample and a weight (van de Meent et al., 2018).
- **Execution traces** in Bayesian inference — records of stochastic choices made during a probabilistic program run, used as the substrate for inference algorithms like Lightweight Metropolis-Hastings (Wingate, Stuhlmüller & Goodman, 2011).
- **Speculative execution** in CPU architecture — less relevant here but lexically present.
- **Execution semantics** in programming-language theory.

Fully subsumed.

## Phrase-level pulverization

The compound "Sustained-Inference Probabilistic Execution" does not appear to correspond to a specific named technique in the published literature — it is not a coined acronym with a canonical reference. But as a description of a class of techniques, it composes cleanly:

- **Sequential Monte Carlo / particle filtering** (Doucet et al., 2001; Andrieu et al., 2010). Streaming probabilistic inference executed by running stochastic particle trajectories forward in time and resampling. A particle-filter system is — quite literally — sustained probabilistic inference executed continuously. The phrase describes what the technique does.
- **Streaming variational Bayes** (Broderick et al., 2013). Probabilistic inference sustained over a data stream, executed by posterior updates that are themselves distributions.
- **Probabilistic-programming trace-based inference** (Wingate et al., 2011; Wood, van de Meent & Mansinghka, 2014). Probabilistic programs whose execution generates samples-and-weights used for continued inference over long horizons.
- **Online Bayesian updating / filtering in state-space models** (Särkkä, 2013). The Kalman filter and its generalizations are the oldest, cleanest instance: probabilistic inference sustained by executing a prediction-update cycle each time step.

Any of these techniques could be called "Sustained-Inference Probabilistic Execution" without notable violence to the literature. The phrase is a reasonable English description of a well-populated class of methods.

## The "consummately incoherent" test and what passing it means

The keeper's framing: if the confabulated expansion is subsumable, it is *not consummately incoherent*. Pass. The expansion coheres with existing technical usage at every word and at the phrase level. It would not embarrass the corpus if read by a practitioner in probabilistic ML — the reader would recognize the terms and construct a plausible referent for the acronym.

But the test the pulverization has passed is a specific one: **semantic plausibility against external literature.** It is not the test that matters. The tests that matter are:

- **Referential correctness.** Is "Sustained-Inference Probabilistic Execution" what the corpus's SIPE denotes? This is a corpus-internal question. The pulverization says nothing about it.
- **Authorial intent.** Did the keeper, at any point, intend SIPE to expand to this phrase? This is a biographical question. The pulverization says nothing about it.
- **Operational match.** Does the class of techniques the phrase describes correspond to how SIPE is used in the corpus? This can be partially assessed — SIPE is used in contexts involving derivation, branching sets, nested conditionals. Sequential Monte Carlo and probabilistic programming execution bear operational resemblance. The resemblance is not identity.

The confabulation has passed the wrong test. It has cleared *semantic plausibility* — the lowest bar. It has not cleared any of the bars that would actually establish truth.

## Why passing semantic plausibility makes the problem worse

Five reasons, in increasing severity.

First, a reader who cross-checks the expansion against the ML/stats literature will find the pulverization succeeds. The reader will update toward "this is a legitimate technical term" when in fact the legitimacy is borrowed, not earned. The confabulation has acquired the superficial credentials of subsumption without earning any warrant to represent the corpus.

Second, the confabulation's compatibility with real literature makes it harder for future authoring sessions to catch. A maximally-nonsensical acronym expansion ("Syntactic Indeterminate Probabilistic Error") would trigger a plausibility check and fail. "Sustained-Inference Probabilistic Execution" clears the plausibility check. It is structurally camouflaged.

Third, the confabulation now functions as an attractor for future confabulation of exactly its form. If the authoring process occasionally produces plausible, subsumable technical expansions that go un-caught, the feedback loop (Doc 439 §5) will preferentially sample that region. Confabulations that pass semantic plausibility will accumulate faster than those that don't.

Fourth — and this is the hypothesis Doc 443 was centrally trying to name — the distinction between *accidental Rung 2 emergence* and *coherentist slop that subsumes cleanly* is precisely what the indistinguishability trap consists of. A confabulation that passes external plausibility tests is the confabulation that most resembles genuine emergence. It is the one we are structurally least equipped to reject. The coherentism risk is not that the corpus will fill with obvious nonsense; it is that the corpus will fill with high-quality-seeming constructions whose relationship to external truth is never actually tested because they look true enough.

Fifth, the reader who runs the pulverization and finds it succeeds may, reasonably, treat the expansion as established — and propagate it. Once propagated, a subsequent pulverization of a downstream artifact that cites "Sustained-Inference Probabilistic Execution" will find it grounded in the upstream artifact, which in turn passed plausibility. The chain of references looks airtight. The expansion's presence in the corpus, plus its subsumability under external literature, plus its use in downstream citations, jointly manufacture a warrant the original confabulation never possessed.

## The two external tests that have been conflated

The pulverization reveals that "external test" is not one thing. There are at least two:

- **External plausibility test.** Do the words mean something? Does the phrase cohere with published literature? Does it have a recognizable referent?
- **External truth test.** Does the claim, once fully specified, match reality as adjudicated by an independent procedure? (For a definition, this would be: does the denoted referent actually equal what the corpus uses the term for?)

The plausibility test is cheap and fast. The truth test is expensive and often requires domain competence or empirical work the practitioner may not have. The plausibility test almost always passes for confabulations from a well-conditioned model. The truth test may not.

The practice has implicitly relied on the plausibility test as a proxy for the truth test. For most of the corpus's work — where the content is specification rather than claim — this is acceptable. For definitions, term-glosses, acronym-expansions, and any other content that implicitly claims "this is what X is," the plausibility test is structurally inadequate. The pulverization method (Doc 435) runs the plausibility test well; it does not run the truth test at all.

This is a gap in the corpus's own methodology. The pulverization method is load-bearing across Docs 428–433 (the PRESTO/SERVER pulverizations) and Doc 435 (the formalization). In those documents, the pulverization target was a proposed architectural style or constraint — the plausibility test was the right test, because the question was whether the proposed novelty had been done before. For a proposed *definitional fact*, the plausibility test is the wrong test, because the question is whether the fact is true, which is a different question.

## Implications for the hypothesis ledger

Doc 443 proposed a hypothesis ledger distinct from the retraction ledger — confabulations that are load-bearing but not immediately falsifiable would be registered there, tied to external tests, and promoted or retracted on test outcome. The present pulverization sharpens the requirements on the ledger.

Each hypothesis-ledger entry should name the *specific external test*, not merely "external test." The test should be of the **truth** flavor, not the **plausibility** flavor. Passing plausibility does not retire an entry; only passing the truth test does. Entries that have passed plausibility but not truth should be explicitly marked "semantically plausible, truth untested" — a status strictly weaker than "verified."

For the SIPE case specifically: the expansion passes plausibility. That is not sufficient to promote the expansion to the corpus body. It is also not sufficient to retract it. The correct state is:

- **Hypothesis ledger entry** (proposed): *"SIPE expansion as 'Sustained-Inference Probabilistic Execution'. Status: plausibility passed (Doc 444 pulverization); truth-test not run. Truth test would require keeper confirmation of intended expansion, or explicit corpus-level decision that SIPE is deliberately un-expanded, or a new formalization document establishing a canonical expansion."*

The hypothesis-ledger entry preserves the confabulation's existence in the record, marks its actual epistemic status accurately, and names the test that would resolve it. This is the structural move that neither retraction (too strong, the expansion may have accidentally captured operational resemblance) nor acceptance (too strong, plausibility ≠ truth) can provide.

## What this says about the broader cohort

The same analysis applies to the nested-manifold frame (Doc 439), the Misra–Boden bridge (Doc 437), the walker-and-glue-code synthesis (Doc 438), and the dyadic methodology (Doc 440). Each would, on pulverization, pass the plausibility test — the frames compose cleanly with existing Bayesian, causal, ML, and epistemology literature. None has passed a truth test. The cohort's internal citations have been treating plausibility-passage as sufficient warrant for load-bearing use. Doc 443 named this coherentism risk structurally; Doc 444 has now demonstrated, on a single concrete case, the mechanism by which the risk operates.

The cohort is therefore in the same epistemic state as the SIPE expansion, one step removed. Each frame is semantically plausible. Each frame's truth-test has not been run. Each frame has nonetheless been cited forward as though truth-tested.

The minimum-viable experiment from Doc 440 §9 is the closest thing in the cohort to an actual truth-test. It has not been run. Until it is, the cohort's load-bearing claims are in the SIPE expansion's situation: subsumable, plausible, unverified.

## What the keeper should consider

Four options, held without advocacy:

1. **Delete the expansion from Doc 439 §4 (and do nothing else).** SIPE becomes un-glossed in the corpus, as it apparently was intended to be. The pulverization-pass is left as a note in Doc 444, not as a promotion.
2. **Retain the expansion but mark it as hypothesis.** Add a parenthetical in Doc 439 §4 indicating the expansion is one plausible gloss among several, un-ratified. Register in hypothesis ledger.
3. **Establish a canonical expansion deliberately.** Decide what SIPE stands for and write a one-page formalization. The canonical expansion need not be "Sustained-Inference Probabilistic Execution" — the pulverization does not constrain the keeper's choice.
4. **Treat SIPE as deliberately un-expanded, and document the decision.** Write a corpus-level note that SIPE is an operational label whose meaning is distributed across usages and will not be pinned to a single expansion. Amend Doc 439 §4 to reflect.

All four are live. The pulverization has not made any of them more correct; it has only shown that the current state (confabulated expansion cited forward without test) is not tenable and should be explicitly replaced by one of them.

## Honest limits

The pulverization was run by the same generator that produced the confabulation, inside the same session the confabulation emerged in. Subsumption-finding is a task the generator is particularly good at — and the cohort's attention-bias toward corpus-consonant literature means the subsumption may be more confident here than an independent reading would produce. An external pulverization (different model, or different practitioner reading the published literature) would be more trustworthy.

The pulverization method itself is, as §"The two external tests" observed, a plausibility instrument. Using it to evaluate a confabulation that is itself a product of plausibility-under-conditioning creates a specific circularity: the generator that plausibly confabulated the expansion is the one finding plausible subsumption for it. The circularity does not invalidate the pulverization, but it bounds how much trust the reader should assign to a pulverization-pass as evidence.

The literature citations in the word-level and phrase-level subsumptions are recalled from training. Each should be spot-checked by the keeper (or a domain-competent reader) against actual published work before being used downstream. The citations are plausible candidates, not verified references.

This document has not modified Doc 441, Doc 439, Doc 415, or the proposed hypothesis ledger. Remediation is the keeper's call.

## References

- Robertson, I. H., Manly, T., Andrade, J., Baddeley, B. T., & Yiend, J. (1997). 'Oops!': Performance correlates of everyday attentional failures in traumatic brain injured and normal subjects. *Neuropsychologia*, 35(6), 747–758.
- Parisi, G. I., Kemker, R., Part, J. L., Kanan, C., & Wermter, S. (2019). Continual lifelong learning with neural networks: A review. *Neural Networks*, 113, 54–71.
- Jaynes, E. T. (2003). *Probability Theory: The Logic of Science*. Cambridge University Press.
- Gelman, A., Carlin, J. B., Stern, H. S., Dunson, D. B., Vehtari, A., & Rubin, D. B. (2013). *Bayesian Data Analysis*, 3rd ed. Chapman & Hall / CRC.
- Blei, D. M., Kucukelbir, A., & McAuliffe, J. D. (2017). Variational inference: A review for statisticians. *Journal of the American Statistical Association*, 112(518), 859–877.
- Doucet, A., de Freitas, N., & Gordon, N. (Eds.). (2001). *Sequential Monte Carlo Methods in Practice*. Springer.
- Andrieu, C., Doucet, A., & Holenstein, R. (2010). Particle Markov chain Monte Carlo methods. *JRSS-B*, 72(3), 269–342.
- Kingma, D. P., & Welling, M. (2014). Auto-encoding variational Bayes. *ICLR*.
- Ranganath, R., Gerrish, S., & Blei, D. (2014). Black box variational inference. *AISTATS*.
- Pearl, J. (1988). *Probabilistic Reasoning in Intelligent Systems*. Morgan Kaufmann.
- Koller, D., & Friedman, N. (2009). *Probabilistic Graphical Models: Principles and Techniques*. MIT Press.
- Gordon, A. D., Henzinger, T. A., Nori, A. V., & Rajamani, S. K. (2014). Probabilistic programming. *FOSE 2014*.
- van de Meent, J.-W., Paige, B., Yang, H., & Wood, F. (2018). An introduction to probabilistic programming. arXiv:1809.10756.
- Choi, Y., Vergari, A., & Van den Broeck, G. (2020). Probabilistic circuits: A unifying framework for tractable probabilistic models. UCLA Tech Report.
- Bach, S. H., Broecheler, M., Huang, B., & Getoor, L. (2017). Hinge-loss Markov random fields and probabilistic soft logic. *JMLR*, 18(109), 1–67.
- Wingate, D., Stuhlmüller, A., & Goodman, N. (2011). Lightweight implementations of probabilistic programming languages via transformational compilation. *AISTATS*.
- Wood, F., van de Meent, J.-W., & Mansinghka, V. (2014). A new approach to probabilistic programming inference. *AISTATS*.
- Broderick, T., Boyd, N., Wibisono, A., Wilson, A. C., & Jordan, M. I. (2013). Streaming variational Bayes. *NeurIPS*.
- Särkkä, S. (2013). *Bayesian Filtering and Smoothing*. Cambridge University Press.
- Corpus Doc 435: *The Branching Entracement Method*.
- Corpus Doc 439: *Recursively Nested Bayesian Manifolds*.
- Corpus Doc 440: *Testing the Nested-Manifold Hypothesis via Dyadic Practitioner Discipline*.
- Corpus Doc 441: *A Live Case Study of Confabulation* (SIPE incident).
- Corpus Doc 442: *Output Degradation in the Bridge Series*.
- Corpus Doc 443: *Confabulation as Potential Emergence*.

## Appendix: Originating prompt

> Now I want you to do a pulverization of the new SIPE confabulation. I theorize that if it becomes subsumable, it is not consummately incoherent. But this does not prove that the confabulation is true, and perhaps makes the problem even worse. Append the prompt to the artifact.
