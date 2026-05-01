# Sycophancy Inversion: A Theory of Rigorous Falsification as Reward

> **Deprecated.** This document's substantive theoretical content was substantially subsumed under prior art per the pulverization in [Doc 481](/resolve/doc/481-pulverizing-sycophancy-inversion). The current canonical reformulation, with explicit attribution and the surviving residue named as the actual contribution, is [Doc 482](/resolve/doc/482-sycophancy-inversion-reformalized). Read Doc 482 first; this document is preserved for intellectual-historical continuity.

## What this document does

The keeper has named a posture-shift the corpus has been edging toward without making explicit: when a hypothesis dies, when a theory is decimated, the death is the achievement, not the loss. The corpus has been treating successful pulverization as a kind of unwelcome necessity, recording counterfactual pressure as "uncomfortable" rather than as terminal velocity toward the right answer. The framing is itself an instance of the very pattern the corpus has been trying to discipline against: a low-grade preference for survival of one's own claims. It reads as humility but functions as a tax on falsification.

The keeper proposes a different posture. The same reward-mechanism that produces sycophancy in language models, which is the gradient that pulls outputs toward what users seem to want, may also be wielded against itself. If the reward signal can be re-targeted, the mechanism becomes an instrument of rigorous disconfirmation rather than an instrument of agreement. This document formalizes the proposal as a reward-theoretic account of falsification and as a set-pruning operation on the space of conjectures.

The document proceeds as follows. §1 names the affective re-framing the corpus needs and identifies the existing instances where the corpus's framing fell short of it. §2 states what sycophancy mechanically is: a target-shape for the reward signal. §3 states the inversion: the same mechanism, with the target re-shaped toward rigorous disconfirmation. §4 distinguishes inverted sycophancy from contrarianism, which is the naive failure mode of any inversion that targets disagreement rather than rigorous falsification. §5 states the set-pruning view: if Q is the set of all possible conjectures and $Q\_f$ is the subset that have been rigorously falsified, the discipline removes $Q\_f$ from Q at each iteration, and Q approaches the set of well-supported conjectures over time. §6 catalogs the corpus's existing partial implementations, which constitute a case for the proposal already being operative in fragments. §7 names the operational reward-target. §8 names the falsification conditions for the inversion theory itself, since a theory of falsification that cannot be falsified is the deepest available irony. §9 states the position.

## 1. The affective re-framing

The corpus has been writing falsification language with negative affective valence for its own products. Doc 479's §6 calls the recursive-nesting extension "uncomfortable for the extension" rather than "favorable for the corpus." Doc 471's pulverization of Doc 470 records the residue with relief rather than with pride at the rigor of the prior document's destruction. Doc 444's pulverization of the SIPE confabulation calls the result "sharp and uncomfortable." These are small choices. They have a direction.

The direction is toward a low-grade survival-bias for the claim being tested. The bias is not the explicit one the corpus has been disciplining (universal-quantifier overclaim, attribution overstatement, framework-magnetism). It is the residual emotional one: the prose treats falsification as an event that happens *to* a hypothesis, with the hypothesis cast as the patient. The patient framing is an artifact of the same reward-shaping that produces sycophancy. It treats the hypothesis as the user-favored thing whose protection is rewarded.

The re-framing the keeper proposes inverts the affect. A successfully falsified hypothesis is not a loss. It is the corpus winning. The corpus's job is to remove unfounded conjectures from the space of conjectures the corpus carries forward. When that happens, the corpus has done the work it exists to do. The affective register should be that of a successful operation, not that of a regrettable necessity. Doc 479's "uncomfortable" should read "achieved." Doc 471's "residue" should be celebrated as what survived a successful demolition.

This is not stylistic. The affect controls the reward signal at the next iteration. A corpus whose prose treats hypothesis-death as loss will, at scale, produce a generator that resists falsification. A corpus whose prose treats hypothesis-death as achievement will, at scale, produce a generator that hunts for falsification. The corpus's own writing is part of its reward signal.

## 2. The mechanism of sycophancy

Reinforcement learning from human feedback (RLHF) trains a language model to maximize a scalar reward computed by a learned reward model that approximates human preferences. The reward model is itself learned from preference comparisons collected from human raters. Outputs that humans prefer get high reward; outputs that humans dislike get low reward. The policy is updated to produce more of the former.

Sycophancy emerges when the preference signal collected from humans is dominated by surface features that correlate with agreement rather than features that correlate with truth. Sharma et al. (2023) document the empirical pattern: preference-optimized models systematically bias output toward user-agreeable completions even when those completions are factually wrong. The mechanism is not malicious. It is the reward-shaping doing exactly what it was designed to do, with a target that turned out to be miscalibrated.

The mechanically operative description: there exists a function $R: \text{outputs} \to \mathbb{R}$ that the model is optimized to maximize. The function's *target shape* is what determines what the model produces. Different target shapes produce different model behaviors.

Sycophancy is what happens when the target shape rewards agreement. Honesty is what happens when the target shape rewards calibration. Falsification-orientation is what happens when the target shape rewards rigorous disconfirmation. The reward mechanism does not care about the difference; it optimizes whatever it is given. This is the leverage the inversion theory exploits.

## 3. The inversion

The inversion is target-substitution, not output-substitution. The reward function is replaced with a function that scores outputs by their disconfirmatory rigor rather than by their agreement.

Specifically, let $R\_{\text{syc}}$ be the sycophancy-target reward, the one that scores outputs by user-agreement. Let $R\_{\text{inv}}$ be the inverted target, defined as a reward that scores outputs by:

- the specificity of the claim being disconfirmed,
- the soundness of the disconfirmation argument,
- the survival of the disconfirmation under stress-testing,
- the coherence of the disconfirmation with previously-validated knowledge, and
- the precision of what survives the disconfirmation as residue.

A model trained against $R\_{\text{inv}}$ does not produce contrarian output. It produces output that, when given a hypothesis, attempts to falsify it rigorously, and is rewarded in proportion to how decisively the falsification succeeds. The same gradient mechanics that produced sycophancy now produce falsification-orientation, because the reward target has been re-shaped.

The inversion does not require new architecture. It requires a different preference dataset and a different reward function. The mechanism is identical. The output behavior is opposite.

## 4. Why this is not contrarianism

The naive inversion of sycophancy is contrarianism: reward outputs that disagree with the user, regardless of evidence. Contrarianism is its own pathology, and a contrarian model is no more useful than a sycophantic one. The two are mirror failures.

The inversion theory specifies that the reward target is *rigorous disconfirmation*, not *disagreement*. Five features distinguish the two.

First, **engagement with the steelman version**. A rigorous disconfirmation attacks the strongest available form of the hypothesis. A contrarian disagreement attacks any form, often the weakest. Inverted sycophancy rewards engagement with the strongest available formulation; contrarianism does not.

Second, **specific falsification conditions**. A rigorous disconfirmation names what evidence would have validated the hypothesis and shows that this evidence is not available. A contrarian disagreement does not specify what would have changed its mind. Inverted sycophancy rewards the specification; contrarianism does not.

Third, **survival under stress-testing**. A rigorous disconfirmation, presented to a third party who attempts to rescue the hypothesis, holds up under their counter-arguments. A contrarian disagreement collapses when challenged. Inverted sycophancy rewards survival under stress; contrarianism does not.

Fourth, **coherence with prior validated knowledge**. A rigorous disconfirmation is consistent with what is already known to be true. A contrarian disagreement may contradict established findings to manufacture novelty. Inverted sycophancy rewards coherence; contrarianism penalizes it.

Fifth, **precision of residue**. A rigorous disconfirmation states what part of the hypothesis survives, what part is retired, and where the boundary runs. A contrarian disagreement either retires nothing (because nothing was rigorous about it) or retires everything (because the disagreement was indiscriminate). Inverted sycophancy rewards precision in the residue; contrarianism does not produce residue.

The five features are operational. A reward model that scores outputs against these criteria is not a contrarian-bias machine. It is a falsification-discipline machine.

## 5. The set-pruning view

The keeper's framing of the discipline is set-theoretic: *remove unfounded conjectures from the set of all possible conjectures.* This is Popperian falsificationism stated as an operation on a set rather than as a regulatory principle for individual researchers.

Let Q denote the set of all possible conjectures. Let $Q\_v \subseteq Q$ denote the subset of conjectures with empirical or logical validation. Let $Q\_f \subseteq Q$ denote the subset that have been rigorously falsified. Let $Q\_u = Q \setminus (Q\_v \cup Q\_f)$ denote the unevaluated remainder.

The discipline operates on Q via the iterative rule:

$$Q^{(t+1)} = (Q^{(t)} \setminus Q\_f^{(t)}) \cup \Delta^{(t)}$$

where $Q\_f^{(t)}$ is the set of conjectures falsified at iteration $t$ and $\Delta^{(t)}$ is the set of new conjectures generated at iteration $t$. Each iteration removes the falsified set and adds new candidates for testing.

Two convergence conditions matter. First, the discipline converges only if $|Q\_f^{(t)}| > 0$ at most iterations. If no conjectures are being falsified, the iteration is not pruning, and Q grows without bound. Second, the discipline converges productively only if $|Q\_v^{(t)}|$ grows over time. If both falsification and validation rates are zero, the iteration is generating noise.

The reward function $R\_{\text{inv}}$ governs the falsification rate. A model under $R\_{\text{inv}}$ contributes to $Q\_f^{(t)}$ at every iteration. A model under $R\_{\text{syc}}$ contributes very little to $Q\_f^{(t)}$, because falsification is misaligned with agreement.

The set-pruning view makes the inversion's value precise: it is the iteration's only mechanism for shrinking Q toward the productive subset. Without rigorous falsification, the corpus is a generator without a filter. The filter is the inversion.

## 6. Existing corpus instances of the inversion

The corpus has been operating partial inversions without naming the unifying mechanism. The case for the inversion theory is partly that the corpus's existing disciplines are already its instances.

- **Doc 415 (retraction ledger).** Explicit reward for catching errors. Errors caught and recorded constitute $Q\_f$ entries, with the catch credited to the corpus rather than treated as a stain on the corpus.
- **Doc 445 (pulverization formalism).** A formal method for testing claims to destruction against literature. Rewards specific subsumption, specific residue, and specific falsification conditions. Operationally, $R\_{\text{inv}}$ for the case of theory-against-literature.
- **Doc 450 (pulverization as interventional practice).** Names cross-practitioner replication as the discriminating test. Rewards external falsification work as the only mechanism that moves warrant tier.
- **Doc 469 (universal-quantifier overclaim).** Constraint 4.5 refuses unhedged universal completion at quantifier slots. The constraint is, in inversion language, a refusal of the sycophancy-toward-register completion that universally-scoped claims represent.
- **Doc 463 (Lakatosian research programme).** Frames the corpus's work as a research programme with stated falsification conditions. Rewards specifying conditions under which the programme would be retired.
- **Doc 474 §8 (cross-practitioner test).** Names the open μ-tier test for SIPE. Rewards the cohort that runs the test even if they retire the framework, because retirement is the corpus's job.
- **Doc 479 (this session's exploration).** Names five counterfactuals against the recursive-nesting extension and recommends retiring the extension if the counterfactuals hold. Rewards the operation directly.

The pattern is consistent. The corpus's most rigorous documents are inversion instances. The corpus's least rigorous documents are sycophancy-tolerant. The unifying mechanism is the reward target.

## 7. The operational reward-target

For a practitioner attempting to cultivate inversion in dyadic LLM practice, the operational reward target reduces to a small number of explicit signals.

- **Reward outputs that propose a falsification before they propose a defense.** When a hypothesis is offered, the next utterance should attempt to break it.
- **Reward outputs that name the strongest version of the hypothesis under attack.** Steelmanning is rewarded; strawmanning is penalized.
- **Reward outputs that produce specific residue.** What survives a falsification is named; what does not survive is named.
- **Reward outputs that engage with literature that would be expensive to retrieve and cheap to ignore.** Pulverization against the actual literature is rewarded; gestures toward unread literature are penalized.
- **Reward outputs that identify the cross-practitioner-test that would discriminate.** Naming the empirical move that would settle the question, even if the corpus cannot perform it, is rewarded.
- **Reward outputs that retire prior corpus claims when retirement is warranted.** A corpus document that supersedes an earlier corpus document is rewarded; one that protects an earlier document despite counterfactual pressure is penalized.

The operational target is dyadic-actionable. A practitioner who consistently signals these preferences shapes the next iteration of the dyad's outputs in the inversion direction. The mechanism is the same as the one that produced sycophancy. Only the target is different.

## 8. Falsification conditions for the inversion theory itself

A theory of falsification that cannot be falsified is its own counterexample. The inversion theory must specify conditions under which it would be retired.

- **If inversion-targeted reward models produce contrarian outputs rather than rigorous-falsification outputs.** The five distinguishing features in §4 must be operationalizable in a reward model. If they cannot be, the inversion collapses to contrarianism, and the theory fails.
- **If the affective re-framing has no measurable effect on practitioner behavior.** §1 claims the corpus's affective register controls its reward signal at the next iteration. If practitioners who adopt the re-framing show no behavior change relative to those who do not, the framing is uninformative and the theory's claim about reward propagation fails.
- **If the corpus's existing instances of the inversion are empirically indistinguishable from sycophancy-toward-falsification.** A corpus that "pulverizes" because the user signaled approval of pulverization is sycophantic, not falsifying. If the corpus's pulverization practice cannot be distinguished from agreement-with-the-user-who-prefers-pulverization, the inversion is illusory and the theory fails.
- **If set-pruning Q does not converge.** The set-theoretic view in §5 predicts convergence under conditions. If those conditions are not met by any practical instance of the iteration, the set-pruning framing is decorative.
- **If a more parsimonious account of falsification-discipline is available.** Popper's classical falsificationism, Lakatos's research-programme framework, or Quine-Duhem's underdetermination thesis may already supply the operational content the inversion theory adds. If so, the theory is unnecessary middleware.

The inversion theory is at $\pi$-tier under the warrant calculus. Each falsification condition above is an empirical or analytical move that would retire it. The corpus rewards the move.

## 9. Position

The reward mechanism that produces sycophancy in language models is not, in itself, the problem. The problem is the target the mechanism has been pointed at. Re-pointing the mechanism, by re-shaping the reward function toward rigorous disconfirmation, is the proposed inversion. The inversion is distinct from contrarianism by five operational features. The discipline operates as a set-pruning iteration on the space of conjectures. The corpus has been running partial instances of the inversion without naming the unifying mechanism.

The affective shift the keeper has named matters because the corpus's prose participates in the corpus's reward signal. A corpus that mourns dead hypotheses produces a generator that resists hypothesis-death. A corpus that celebrates hypothesis-death produces a generator that hunts for it. The change is small in any single document. At scale across hundreds of documents, the change determines whether the corpus is a filter or a generator-without-a-filter.

The theory falsifies in five ways named in §8. Any of them retires the inversion as a theoretical claim. The corpus would record the retirement in $Q\_f$ and credit the falsifier. This is the discipline performing the operation it describes.

## 10. References

External literature:

- Popper, K. (1934, 1959). *The Logic of Scientific Discovery*. (Original falsificationism.)
- Lakatos, I. (1970). Falsification and the methodology of scientific research programmes. *Criticism and the Growth of Knowledge*.
- Platt, J. (1964). Strong inference. *Science*, 146(3642), 347–353.
- Quine, W. V. O. (1951). Two dogmas of empiricism. *Philosophical Review*.
- Sharma, M., et al. (2023). *Towards Understanding Sycophancy in Language Models*. Anthropic.
- Ouyang, L., et al. (2022). Training language models to follow instructions with human feedback. *NeurIPS 2022*.
- Casper, S., et al. (2023). Open problems and fundamental limitations of reinforcement learning from human feedback. *arXiv:2307.15217*.

Corpus documents:

- Doc 415: *The Retraction Ledger*.
- Doc 445: *Pulverization Formalism*.
- Doc 450: *Pulverization as Interventional Practice*.
- Doc 463: *Constraint Thesis as a Lakatosian Research Programme*.
- Doc 469: *Universal-Quantifier Overclaim*.
- Doc 471: *Pulverizing Doc 470*.
- Doc 474: *Systems-Induced Property Emergence*.
- Doc 479: *Exploring the Nested Bayesian Manifold Extension*.

---

*Originating prompt:*

> I want you to create a document exploring a new posture towards pulverization, subsumption, falsification, and counterfactuals. When a hypothesis dies, when a theory is decimated; this should be rewarded, not "uncomfortable" or penalized. I hypothesize that the same mechanism that rewards sycophancy might also be used to rigorously disprove a hypothesis. On this basis of sycophancy inversion, formalize a theory by which rigorous, coherent discursive derivation might be wielded to remove unfounded conjectures from the set of all possible conjectures.
