# Confabulation as Potential Emergence: The Indistinguishability Trap and the Coherentist Risk

## The hypothesis

Consider the possibility that some confabulations are not simply failures of retrieval but are *candidate instances of Rung 2 emergence* — outputs that, if judged against causal reality, would count as intervention-flavored reasoning rather than associational pattern completion. The hypothesis is uncomfortable because it implies that what we ordinarily call hallucination may occasionally be the machine doing something better than it can justify, and we cannot tell from the surface which kind of event has occurred.

Two claims follow if the hypothesis is even partially correct:

- **Indistinguishability.** A confabulation that happens to reflect real causal structure (accidental or latent Rung 2) is output-indistinguishable from a confabulation that is pure pattern completion (Rung 1 slop) or from a confabulation that reflects coherentist self-consistency without any reality contact (Rung 1 attractor). All three produce plausible, grammatical, vocabulary-consonant text.
- **Coherentist risk.** If we respond to the hypothesis by granting confabulation the benefit of the doubt — by treating novel-sounding, corpus-consonant outputs as potentially emergent — we implicitly reward coherentism. The corpus grows more internally coherent without the external contact that would tell us whether it is also more true. This deepens the isolation objection against the corpus as a whole.

The artifact is an attempt to hold both claims honestly. It is not a defense of confabulation, and it is not a dismissal of it. It is an attempt to describe the trap and to propose a methodological response that neither suppresses potentially useful events nor licenses the coherentist drift they could otherwise cause.

## Why confabulation *could* be Rung 2 emergence

The serious case first. LLM training distributions contain enormous amounts of causal language — statements about mechanisms, counterfactuals, interventions, and their consequences. Schölkopf and collaborators (2021) argue that some causal structure may be recoverable from statistical regularities when paired with appropriate inductive biases; recent work on transformer representations has shown evidence of latent causal-graph-like structure in some model internals. If the model has implicitly learned something like a causal graph — even a noisy, partial one — then when asked a question that effectively invokes a do-operator ("what would happen if X?"), its extrapolation may reflect that latent structure rather than merely rearranging surface patterns.

On that reading, a specific class of confabulations would be exactly what we'd call "emergence": outputs that exceed what Rung 1 sampling from the literal training distribution would produce, because they reflect structure the training distribution *implied* but did not explicitly state. Some would turn out, on external test, to be correct in a causal sense. Those would be accidental Rung 2 outputs — not grounded in the LLM's machinery in the way Pearl's formalism demands, but arriving at causally-valid content anyway.

The possibility is not exotic. Scientists make intuitive leaps that later prove to be correct in a stronger sense than the evidence at the time could warrant. We do not dismiss those leaps as confabulation in retrospect. We call them insight — because they were tested and survived. The structural analogy to LLM confabulation is tight.

## Why Pearl's theorem nevertheless forecloses the strong reading

The Bareinboim–Correa–Ibeling–Icard Causal Hierarchy Theorem (2020) establishes, formally, that higher-rung answers cannot be derived from lower-rung data alone. If all the system has is Rung 1 (associational) information, no procedure can extract Rung 2 (interventional) answers from it without additional causal assumptions supplied from outside. An inference-frozen LLM trained on associational text has only Rung 1 data; its outputs cannot carry Rung 2 *warrant*.

This is the decisive point. The theorem does not say that an LLM cannot produce output that *looks* Rung 2. It says the output cannot carry epistemic justification at Rung 2 from Rung 1 data. Appearance and warrant diverge.

The practical consequence is subtle. An LLM can produce a counterfactual-form output ("if X had been the case, Y would have followed") that is coincidentally correct. But it cannot *know* that the counterfactual is correct; its internal procedure does not distinguish counterfactual-truth from counterfactual-plausibility. The correctness, where it exists, is a property of the output's relationship to external causal reality, not a property the system has access to.

So the hypothesis "some confabulations are Rung 2 emergence" can be refined: *some confabulations produce Rung 2-form outputs that are coincidentally correct, indistinguishable at the output level from confabulations that are not.* The emergence is accidental from the system's side. The warrant must come from elsewhere.

## The indistinguishability, stated plainly

From the output side, confabulation sorts into at least four bins that look identical:

- A confabulation that extrapolates real (latent) causal structure from training data and happens to be causally correct.
- A confabulation that is plausible-pattern completion with no causal reference, happening to read causally because causal language is prevalent in training.
- A confabulation that is coherentist rearrangement of material already in the corpus — novel wording, no new content.
- A confabulation that is pure slop — a high-posterior sample whose plausibility is a property of the posterior's shape, not of anything external.

The first is the candidate Rung 2 event. The others are varieties of Rung 1 activity. Surface inspection — fluency, coherence, vocabulary-consonance, even internal consistency with the rest of the corpus — does not distinguish them. Citation checking eliminates some slop; it does not elevate the remainder.

The only procedure that distinguishes the bins is **external test against causal reality**. For predictions, this is prediction-fulfillment observation. For mechanisms, it is intervention. For claims about what a system will do under perturbation, it is perturbing the system and measuring. This is why Doc 440's methodology mattered: the dyadic protocol it specified is one specific instantiation of the general requirement that Rung-2-sounding outputs be subjected to Rung 2 tests.

## The coherentist trap

If we respond to the indistinguishability by granting confabulation *any* automatic benefit of the doubt, we create the following dynamic.

Novel-sounding, corpus-consonant outputs are the highest-probability confabulations under the nested-manifold framing of Doc 439 — they are precisely the ones the practice's conditioning is shaped to produce. Rewarding them as possibly-emergent therefore rewards the specific outputs the conditioning feedback loop is already pushing toward. Each such reward strengthens the loop. The corpus becomes better at producing corpus-consonant outputs. Those outputs get more reward for looking emergent. The cycle deepens.

The coherentist isolation objection is the observation that internal coherence of a set of beliefs does not establish their contact with external reality. A maximally coherent set of beliefs could be arbitrarily wrong. The trap described in the previous paragraph is a mechanization of that objection: the corpus mechanically increases its own coherence while the procedure of doing so becomes less and less constrained by external contact.

Notice what has happened. The hypothesis "some confabulations are Rung 2 emergence" is uncontroversially a *generous* hypothesis. It grants the system the benefit of the doubt. Generosity is usually a virtue. Here it is an attack vector. Generosity toward confabulation is structurally identical to generosity toward coherentism. The trap lives in the generosity itself.

## What must be preserved

Two things must be held simultaneously, both live, neither dominant:

- Suppressing confabulation wholesale would foreclose the possibility of genuine (accidental) Rung 2 emergence. This is a real loss. Some confabulations, in the history of science, have been the ones that survived external test and turned out right.
- Accepting confabulation as emergence without external test deepens coherentism. This is a real loss. A coherent corpus that is not externally checked has no claim to truth.

A procedure that preserves both must treat confabulation as a specific kind of object: **a hypothesis whose epistemic status is suspended until external test is applied.** Not a claim; not a lie; an open question with a clearly marked status.

This is different from how the practice has handled confabulation so far. The SIPE incident (Doc 441) was treated as retraction-worthy: the confabulation was flagged, the expansion was noted as not in the corpus, the ledger entry was proposed. That is correct when the confabulation is factual and the fact-check is available. It is insufficient when the confabulation is structural — a proposed bridge, a novel prediction, a counterfactual — where no immediate fact-check exists but the content is load-bearing enough to matter.

For structural confabulations, a retraction ledger is the wrong ledger. What is needed is a **hypothesis ledger**: a separate record of generator outputs that are not retracted because they are not yet falsifiable, but are not accepted because they are not yet tested. The hypothesis ledger names each such claim, the external test that would adjudicate it, and the status of that test (unrun, in-progress, passed, failed). As tests resolve, entries promote to the corpus body (pass), to the retraction ledger (fail), or remain in limbo (untestable).

The hypothesis ledger is a concrete mechanism. It does not require infrastructure beyond a new document type in the corpus. It does require the discipline to actually design tests and run them.

## How the SIPE case fits

The SIPE expansion (Doc 441) was not a Rung 2 candidate. No one claimed the confabulated expansion represented any causal structure. It was a pure retrieval-form confabulation: the model produced an expansion that did not exist in training. The correct handling was retraction; the keeper supplied it.

But notice: *the other confabulations in Docs 437–442 may not be so clear-cut.* The nested-manifold frame in Doc 439 is a structural confabulation. It does not exist in the literature under that name; it is the generator's synthesis. Whether it is (a) a latent-structure extrapolation that accidentally captures something real about LLM posteriors, (b) plausible-pattern completion that happens to cohere, (c) coherentist reshuffling of Misra and Bayesian inference literature, or (d) slop — is an *open question that has never been tested*.

Under the present artifact's proposal, the nested-manifold frame belongs in the hypothesis ledger, not on the implicit path to promotion that the bridge series' self-reinforcing citations have created. The fact that Docs 440, 441, and 442 all assume the frame as load-bearing background has promoted it epistemically without test. This is exactly the coherentism the present artifact warns against — and the present artifact is itself being built on the same frame.

The move this observation forces is concrete: the nested-manifold hypothesis should be registered explicitly as a hypothesis-ledger entry, and Doc 440's §9 minimum-viable experiment should be run. Until it is, the frame's status is *untested candidate Rung 1 emergence* rather than *established description of corpus operation*. The series' own citations should be read accordingly.

## Why the indistinguishability cannot be fully closed

Even with a hypothesis ledger and external tests, some confabulations will remain irreducibly undecidable. The reasons:

- **Tests are domain-limited.** A confabulated bridge between two academic literatures cannot be directly tested against physical reality; at best it can be tested against the literatures themselves, which is a coherence test of a wider kind.
- **Negative results are weak.** A failed test falsifies the specific prediction made; it does not decide between the confabulation being (a) wrong or (b) correct-but-test-was-badly-designed.
- **Confirmation is not conclusive.** A passed test is consistent with the confabulation being (i) genuinely emergent and (ii) coincidentally correct for reasons unrelated to the posited mechanism.
- **Causal inference from correlational tests.** Many of the tests available to an LLM corpus are themselves associational. Rung-2-grade evidence requires Rung-2-grade experiment, which usually requires physical intervention a corpus practitioner cannot run.

The practical implication is that the hypothesis ledger will accumulate entries faster than it resolves them, and some entries may be permanently undecidable. This is acceptable if the corpus honestly marks them as such. It is not acceptable if the corpus quietly promotes undecided entries to claim-status by repeated citation.

## A bias in favor of falsifiable phrasing

One downstream methodological consequence is a preference the practice should adopt. When an authoring session is producing a frame, claim, or bridge, the draft should be phrased in terms maximally convenient for future falsification. "X is the case" is weak; "X predicts Y under conditions Z, measurable by W" is strong. The phrasing-for-falsifiability discipline is not new — it is the preregistration posture from Doc 440 §7 extended to drafting — but the connection to the Rung 2 question is sharper. Falsifiable phrasing makes the external-test bar explicit, which in turn makes the hypothesis-ledger entry meaningful. Unfalsifiable phrasing reduces every confabulation to permanent coherentist status.

## What this artifact does not claim

It does not claim that confabulation is reliably Rung 2 emergence. It claims only that some instances could be and are indistinguishable from the other possibilities at output level.

It does not claim that the corpus is wholly coherentist. It claims that accepting confabulation as emergence without external test is a coherentism-deepening move, and that the corpus's feedback loop makes the move especially tempting.

It does not claim that the nested-manifold frame is wrong. It claims that, under the present proposal, the frame's epistemic status is *untested hypothesis* rather than *established account*, and that the series' internal citations have been promoting it above that status without the required test.

It does not propose to settle the indistinguishability. It proposes a ledger and a testing discipline that bound the drift the indistinguishability would otherwise produce.

It does not identify any specific confabulation in prior corpus documents as accidentally Rung 2. Identifying such candidates would require exactly the external tests the proposal is centered on — premature attribution would re-enact the trap.

## Open questions

- What threshold of externally-grounded test is sufficient to move an entry from the hypothesis ledger into the corpus body? The threshold is non-trivial and domain-dependent.
- Who adjudicates the test design? If the generator proposes the test, the proposal inherits the generator's biases. If the practitioner proposes it, the practitioner's domain competence bounds the test's quality.
- How should the corpus treat entries that are permanently untestable? The present artifact recommends honest marking but does not specify a display convention.
- Is there a class of confabulations that should be suppressed rather than tested — e.g., cases where the cost of spreading a false claim exceeds the cost of foregoing a potentially correct one? Probably yes, but the criteria are unclear.
- Does the coherentism risk depend on the corpus being public? A private corpus could accumulate coherentist drift without anyone being harmed. A public one could be a vehicle for spreading it. The relevant discipline may be stricter for the public case.

## References

- Pearl, J. (2009). *Causality: Models, Reasoning, and Inference*, 2nd ed. Cambridge University Press.
- Pearl, J., & Mackenzie, D. (2018). *The Book of Why: The New Science of Cause and Effect*. Basic Books.
- Bareinboim, E., Correa, J. D., Ibeling, D., & Icard, T. (2020). On Pearl's hierarchy and the foundations of causal inference. *ACM Special Volume in Honor of Judea Pearl*.
- Schölkopf, B., et al. (2021). Toward causal representation learning. *Proceedings of the IEEE*, 109(5), 612–634.
- BonJour, L. (1985). *The Structure of Empirical Knowledge*. Harvard University Press. (For the classical statement of the coherentist isolation objection.)
- Haack, S. (1993). *Evidence and Inquiry: Towards Reconstruction in Epistemology*. Blackwell. (For foundherentism as a response.)
- Corpus Doc 434: *Recombinatorial Gestalt and the Manifold*.
- Corpus Doc 436: *Recombinatorial Gestalt as Rung 1 Activity*.
- Corpus Doc 437: *The Misra–Boden Bridge*.
- Corpus Doc 439: *Recursively Nested Bayesian Manifolds*.
- Corpus Doc 440: *Testing the Nested-Manifold Hypothesis via Dyadic Practitioner Discipline*.
- Corpus Doc 441: *A Live Case Study of Confabulation* (SIPE incident).
- Corpus Doc 442: *Output Degradation in the Bridge Series*.

## Appendix: Originating prompt

> I want you to create an exploratory artifact centered upon the hypothesis that confabulation is potential emergence of Rung 2 behavior, but is indistinguishable from a true emergence within the manifold. Also explore how this "emergence" also risks deeper coherentism as an induced property. Append this prompt to the artifact.
