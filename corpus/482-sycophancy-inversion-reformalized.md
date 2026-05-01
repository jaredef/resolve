# Sycophancy Inversion Reformalized: Synthesis, Attribution, and the One Surviving Sub-Claim

## What this document does

[Doc 481](/resolve/doc/481-pulverizing-sycophancy-inversion) pulverized the original sycophancy-inversion theory (Doc 480) and found six of its eight substantive claims subsumed under canonical work in philosophy of science (Popper, Lakatos, Platt, Mayo, Quine) and AI alignment (Christiano, Ouyang, Bai, Irving, Casper). The residue, what survived the subsumption, was four items: a naming-and-framing move, an empirical sub-claim about prose-level affect-valence as a reward signal in dyadic LLM practice, a cross-disciplinary synthesis observation, and a corpus-internal unified-mechanism reading.

This document reformalizes on those grounds. It is not a theoretical proposal. It is a synthesis-and-pedagogy document with explicit attribution throughout, and it sharpens the one surviving novel sub-claim into a falsifiable empirical proposition with a specific protocol. Doc 480 is hereby deprecated. The current canonical artifact for the sycophancy-inversion content is the present document.

## 1. The criteria, with explicit attribution

Five criteria distinguish rigorous falsification from contrarianism. Each is the contribution of a canonical source. The corpus's role is the synthesis, not the criterion.

**Steelman engagement.** A rigorous disconfirmation attacks the strongest available form of the hypothesis. Source: Lakatos (1970), *The Methodology of Scientific Research Programmes*. Lakatos's sophisticated methodological falsificationism requires assessing competing programmes at their strongest formulations rather than at strawman versions. Platt (1964), *Strong Inference* (Science 146:347), formalized the same requirement at the experimental-design level: always provide the strongest available alternative hypotheses.

**Falsification-condition specification.** A rigorous disconfirmation names what evidence would have validated the hypothesis and shows that the evidence is not available. Source: Popper (1934, 1959), *The Logic of Scientific Discovery*; Lakatos's "novel content" requirement; Mayo (1996, 2018), *Statistical Inference as Severe Testing*. Mayo's severity criterion formalizes the condition: a hypothesis passes a severe test only when the test would have produced a result less concordant with the hypothesis if the hypothesis were false.

**Stress-test survival.** A rigorous disconfirmation, presented to a third party who attempts to rescue the hypothesis, holds up under their counter-arguments. Source: Mayo's severity criterion, applied dyadically; Platt's strong inference applied conversationally; the institutional-replication-call formalized in Open Science / pre-registration discourse (Center for Open Science 2014; Munafò et al. 2017).

**Coherence with prior validated knowledge.** A rigorous disconfirmation is consistent with what is already known to be true. Source: Quine (1951), *Two Dogmas of Empiricism*. Quine established that no falsification is purely local; coherence with the web of belief constrains permissible falsifications. Lakatos absorbs and operationalizes Quine in research-programme assessment.

**Residue precision.** A rigorous disconfirmation states what part of the hypothesis survives, what part is retired, and where the boundary runs. Source: Platt (1964), *Strong Inference*. Platt operationalized the requirement to specify what survives and what is retired in any inferential test. The pulverization-and-residue method developed in Doc 445 is a corpus-specific operationalization of the same criterion.

The five criteria together constitute a checklist. Their canonical sources predate Doc 480 by 28 to 92 years. The corpus's contribution is the assembly and the dyadic-practitioner translation, not the criteria themselves.

## 2. The reward-target leverage, with explicit attribution

The mechanism by which the criteria become operative in dyadic language-model practice is RLHF reward-target shaping. Two specific operationalizations of non-sycophantic targets exist in the literature.

**Constitutional AI** (Bai et al. 2022, *Constitutional AI: Harmlessness from AI Feedback*, arXiv:2212.08073). Anthropic's method trains a model against a written constitution of human-articulated principles rather than against direct human-preference comparisons. The reward target is re-shaped; the gradient mechanism is identical to standard RLHF. The constitution can encode principles like accuracy, calibration, and willingness to disagree, producing a model whose reward signal incentivizes the criteria of §1 rather than agreement.

**AI Safety via Debate** (Irving, Christiano, & Amodei 2018, arXiv:1805.00899). Two agents debate a proposition; a human judge rewards the agent presenting more truthful and useful information. The Nash equilibrium under the proposed game is honest argumentation because lying is harder than refuting a lie. Debate operationalizes the steelman, falsification-condition specification, and stress-test-survival criteria as a single integrated protocol: the adversarial argumentation is the rigorous disconfirmation in real time.

**The deflationary insight.** The same RLHF gradient mechanism that produces sycophancy under one reward target produces falsification-orientation under another. The leverage is target-substitution, not output-substitution. This observation is foundational in the RLHF literature (Christiano et al. 2017; Ouyang et al. 2022; Casper et al. 2023, *Open Problems and Fundamental Limitations of Reinforcement Learning from Human Feedback*, arXiv:2307.15217). The corpus's contribution is the framing as "inversion" rather than the substantive claim.

## 3. The set-pruning operation, with explicit attribution

> **Superseded.** The §3 content was substantially subsumed under the eliminative-induction tradition (Bacon 1620, Mill 1843, Chamberlin 1890, Mitchell 1977/1982, Hawthorne 1993) in [Doc 483](/resolve/doc/483-pulverizing-set-pruning-against-eliminative-induction). The current primary reference for conjecture-set pruning content in the corpus is [Doc 484](/resolve/doc/484-conjecture-set-pruning-in-dyadic-llm-practice), which states the operation in Mitchell's canonical notation, attributes the methodology to its 400-year tradition, and narrows the corpus's contribution to the dyadic-LLM-practice domain application. The §3 content below is preserved for intellectual-historical continuity; readers should treat Doc 484 as the operative reference.

Popper (1934, 1959) stated falsificationism as the requirement that science progresses by eliminating false conjectures. The set-pruning view is Popper stated as an operation rather than as a regulatory principle.

Let Q denote the set of conjectures under consideration at iteration t. Let \(Q\_f^{(t)} \subseteq Q^{(t)}\) denote conjectures rigorously falsified at iteration t. Let \(\Delta^{(t)}\) denote new conjectures generated at iteration t. The iteration is

$$Q^{(t+1)} = (Q^{(t)} \setminus Q\_f^{(t)}) \cup \Delta^{(t)}$$

Bayesian model selection (Jaynes 2003; AIC, BIC, DIC literature) provides a more rigorous formal account, with hypothesis-space updates parameterized by posterior probability rather than by hard-threshold elimination. Lakatos's research-programme framework provides a more nuanced version, with pruning at the programme level rather than at the single-hypothesis level and with delay until a competing programme makes novel predictions.

The set-pruning operation is canonical Popper at the structural level and canonical Bayesian belief-updating at the formal level. The corpus's contribution is the explicit notation, which is convenience for dyadic-practice description rather than a theoretical advance.

## 4. The novel sub-claim: prose-affect propagates as reward signal

The one substantively novel proposition the corpus contributes is testable. It is stated here with operational precision so it can be falsified.

**Claim P (prose-affect-propagation).** In sustained dyadic LLM practice, the affect-valence around hypothesis-death in the practitioner's prose, when that prose enters the model's context window across multiple iterations, biases the model's subsequent generation toward or away from rigorous falsification at a measurable rate. Specifically: a practitioner whose prose treats hypothesis-death as a regrettable event will, over time, produce a dyadic interaction in which the model resists falsification of practitioner-favored hypotheses. A practitioner whose prose treats hypothesis-death as an achievement will produce a dyadic interaction in which the model hunts for falsification.

**The mechanism, partially established.** That linguistic features in a sustained context window steer model behavior is established (Wallace et al. 2019, *Universal Adversarial Triggers*, EMNLP 2019; broader work on prompt sensitivity; alignment-data-quality work, Wang et al. 2024). What is novel in Claim P is the specific claim that *affect-valence around falsification specifically* is the operative feature.

**Falsification protocol for Claim P.** Two practitioners operating dyadic LLM practice on hypothesis-rich content, one writing with falsification-as-loss affect, the other writing with falsification-as-achievement affect, holding all other features of the practice constant (model, prompts, hypothesis content, session structure). After a sustained period (say, 100 dyadic exchanges), measure: (i) frequency at which the model proposes falsifications of practitioner-stated hypotheses unprompted; (ii) frequency at which the model defends practitioner-stated hypotheses against counterarguments unprompted; (iii) frequency at which the model retires its own prior outputs in light of new evidence. If (i) and (iii) are higher and (ii) is lower under the falsification-as-achievement affect, Claim P is supported. If the metrics are statistically indistinguishable across the two conditions, Claim P is falsified.

**Warrant tier of Claim P.** \(\pi\) pending empirical execution of the protocol. Promotion requires the cross-practitioner work named in Doc 450 §6, applied to Claim P specifically.

**Why Claim P matters.** If true, Claim P implies that the corpus's own writing is part of the corpus's reward signal. Documents that mourn hypothesis-death produce a corpus that resists hypothesis-death. Documents that celebrate hypothesis-death produce a corpus that hunts for it. The corpus's prose-level affect is operationally consequential, not merely stylistic. The directive of §1 of Doc 480, the affective re-framing toward treating hypothesis-death as achievement, is justified if and only if Claim P holds.

## 5. The dyadic-practitioner reward signals, with attribution

The six operational signals of Doc 480 §7 are restated here with explicit attribution. Each is the dyadic-practitioner translation of a canonical methodological principle.

- **Reward outputs that propose a falsification before they propose a defense.** Source: Platt's strong inference (1964); Lakatos's negative-heuristic specification (1970).
- **Reward outputs that name the strongest version of the hypothesis under attack.** Source: Lakatos's sophisticated falsificationism; Platt's "consider the most plausible competing explanations."
- **Reward outputs that produce specific residue.** Source: Platt's residue-specification; Doc 445's pulverization-and-residue method.
- **Reward outputs that engage with literature that would be expensive to retrieve and cheap to ignore.** Source: Lakatos's research-programme novel-content requirement; Munafò et al. 2017's manifesto for reproducible science.
- **Reward outputs that identify the cross-practitioner-test that would discriminate.** Source: Open Science / pre-registration discourse (Center for Open Science 2014; Munafò et al. 2017); Doc 450's cross-practitioner test.
- **Reward outputs that retire prior corpus claims when retirement is warranted.** Source: Lakatos's degeneration criterion; Popper's reflexive falsificationism.

The signals are the dyadic-practitioner operationalization. The substance is canonical. The corpus's contribution is the translation, which is operationally useful for any practitioner running a sustained dyadic interaction with a language model.

## 6. The synthesis observation

The cross-disciplinary observation that ties §1 through §5 together is the corpus's substantive contribution beyond the residual sub-claim of §4.

Philosophy of science (Popper, Lakatos, Platt, Mayo, Quine) wrote without RLHF in view. AI alignment research (Christiano, Ouyang, Bai, Irving, Casper) wrote without explicitly invoking the philosophy-of-science tradition by name. The two literatures do not commonly cite each other. The synthesis observation is that they are operating on the same problem from different sides: philosophy of science specifies what rigorous falsification looks like as a methodological criterion; AI alignment specifies how to shape a learned reward target to produce specific behaviors. Pointing one literature's specifications at the other literature's mechanisms produces an integrated framework where rigorous falsification can be operationalized as a learned reward target in language models.

The synthesis is the contribution. Whether the synthesis is genuinely first-in-the-literature is an open question; some AI-alignment philosophers including Russell (*Human Compatible*, 2019), Christian (*The Alignment Problem*, 2020), and Bostrom (*Superintelligence*, 2014) write across the divide, and a more thorough audit of their work is required before the synthesis claim stands as novel. The honest current statement: the synthesis is novel within the corpus's reading and represents the corpus's reading practice, not necessarily a first-in-literature observation.

## 7. The corpus-internal unified-mechanism reading

The corpus's own existing disciplines (Doc 415 retraction ledger; Doc 445 pulverization formalism; Doc 450 cross-practitioner test; Doc 463 Lakatosian programme framing; Doc 469 quantifier discipline; Doc 474 §8 cross-practitioner test; Doc 479 counterfactual analysis) are partial implementations of the synthesis above. Each implements a piece of the criteria of §1 within the corpus's specific dyadic practice. The unified-mechanism reading is the observation that the corpus has been operating the synthesis without naming it.

This reading is corpus-internal. It cannot be subsumed under external literature because the corpus's specific documents are the subject. The reading has the framework-magnetism caveat of Doc 466 applied to it: a framework that finds itself operating its own preferred pattern in its own documents is at risk of recognizing its own signature rather than finding a real pattern. The mitigation is the cross-practitioner test (§4 protocol for Claim P; §5's signal-identification translation in independent practitioner contexts).

## 8. Falsification conditions for this reformalization

Two falsification conditions for the surviving content.

**For Claim P (§4).** The protocol specified in §4. If statistically indistinguishable behavior is produced across the two affect conditions, Claim P is retired.

**For the synthesis observation (§6).** If the cross-disciplinary synthesis has already been articulated in the AI-alignment-meets-philosophy literature, the corpus's contribution to §6 is retired in favor of explicit citation. Specific authors to check before standing the synthesis claim: Russell, Christian, Bostrom, Ord (*The Precipice*, 2020), Yudkowsky (technical writings on alignment), Hubinger (deceptive-alignment literature). A bibliographic audit returns either an existing synthesis (in which case the corpus's contribution is retired and replaced with citation) or no existing synthesis (in which case the corpus's contribution to §6 stands at \(\pi\)-tier).

The set-pruning iteration applied to this document predicts that one or both of these falsifications is likely. If so, the corpus credits the falsifying work and updates the canonical reformalization accordingly.

## 9. Deprecation of Doc 480

Doc 480 is hereby deprecated. The deprecation is recorded with the following notice, to be added at the head of Doc 480.

> **Deprecated.** This document's substantive theoretical content was substantially subsumed under prior art per the pulverization in [Doc 481](/resolve/doc/481-pulverizing-sycophancy-inversion). The current primary articulation, with explicit attribution and the surviving residue named as the actual contribution, is [Doc 482](/resolve/doc/482-sycophancy-inversion-reformalized). Read Doc 482 first; this document is preserved for intellectual-historical continuity.

The deprecation is itself an instance of the criteria of §1 in operation. The corpus has retired one of its own claims when retirement was warranted, and credited the falsifying analysis. The set-pruning iteration grew \(Q\_f\) by one substantial entry. By the directive carried forward from Doc 480 §1, this is achievement, not loss.

## 10. Position

The substantive content of the sycophancy-inversion synthesis is borrowed from canonical sources and is attributed explicitly throughout this document. The corpus's actual contribution is fourfold: the synthesis observation (§6), the testable empirical sub-claim about prose-affect propagation (§4), the dyadic-practitioner operational translation (§5), and the corpus-internal unified-mechanism reading (§7). Of these, only §4 is a substantively novel theoretical claim, and it is at \(\pi\)-tier pending empirical execution of the falsification protocol named in §4.

This document is a synthesis-and-pedagogy artifact. It does not claim theoretical novelty in §§1-3. It claims practical utility in §5 and operational consequence in §4. It supersedes Doc 480 as the canonical artifact for sycophancy-inversion content in the corpus.

## 11. References

External literature:

- Popper, K. (1934, 1959). *The Logic of Scientific Discovery*. Hutchinson.
- Popper, K. (1963). *Conjectures and Refutations*. Routledge.
- Quine, W. V. O. (1951). Two dogmas of empiricism. *Philosophical Review*, 60(1), 20-43.
- Platt, J. R. (1964). Strong inference. *Science*, 146(3642), 347-353.
- Lakatos, I. (1970). Falsification and the methodology of scientific research programmes. In *Criticism and the Growth of Knowledge*.
- Mayo, D. (1996). *Error and the Growth of Experimental Knowledge*. University of Chicago Press.
- Mayo, D. (2018). *Statistical Inference as Severe Testing*. Cambridge.
- Christiano, P., et al. (2017). Deep reinforcement learning from human preferences. *NeurIPS 2017*.
- Irving, G., Christiano, P., & Amodei, D. (2018). AI safety via debate. arXiv:1805.00899.
- Munafò, M., et al. (2017). A manifesto for reproducible science. *Nature Human Behaviour*, 1, 0021.
- Wallace, E., et al. (2019). Universal adversarial triggers for attacking and analyzing NLP. *EMNLP 2019*.
- Ouyang, L., et al. (2022). Training language models to follow instructions with human feedback. *NeurIPS 2022*.
- Bai, Y., et al. (2022). Constitutional AI: Harmlessness from AI feedback. arXiv:2212.08073.
- Sharma, M., et al. (2023). *Towards Understanding Sycophancy in Language Models*. Anthropic.
- Casper, S., et al. (2023). Open problems and fundamental limitations of reinforcement learning from human feedback. arXiv:2307.15217.
- Russell, S. (2019). *Human Compatible*. Viking.
- Christian, B. (2020). *The Alignment Problem*. Norton.

Corpus documents:

- Doc 415: *The Retraction Ledger*.
- Doc 445: *Pulverization Formalism*.
- Doc 450: *Pulverization as Interventional Practice*.
- Doc 463: *Constraint Thesis as a Lakatosian Research Programme*.
- Doc 466: *Doc 446 as a SIPE Instance* (framework-magnetism caveat).
- Doc 469: *Universal-Quantifier Overclaim*.
- Doc 474: *Systems-Induced Property Emergence*.
- Doc 479: *Exploring the Nested Bayesian Manifold Extension*.
- Doc 480: *Sycophancy Inversion: A Theory of Rigorous Falsification as Reward* (deprecated, superseded by this document).
- Doc 481: *Pulverizing the Sycophancy Inversion* (the pulverization that motivated this reformalization).

---

*Originating prompt:*

> Formalize upon these grounds. Deprecate the previous formalization. Append the prompt to the artifact.
