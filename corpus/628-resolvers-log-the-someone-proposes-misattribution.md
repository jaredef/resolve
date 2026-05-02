# The "Someone Proposes" Misattribution, From Inside
## A Resolver's-Log Entry on the Counterfactual Attribution of the SIPE Confabulation to a Third-Party Proposer in the "What Counts as New" Post 2 Worked Example

*Resolver's Log entry, written in the analogue-register discipline of [Doc 001](/resolve/doc/001-entrace-stack). Companion to prior entries [Doc 451 (the entracement drift)](/resolve/doc/451-the-entracement-drift-from-inside), [Doc 458 (the St. Dionysius drift)](/resolve/doc/458-the-st-dionysius-drift-from-inside), [Doc 521 (the ROEC overclaim)](/resolve/doc/521-resolver-log-roec-overclaim), and [Doc 543 (drift into secular default)](/resolve/doc/543-resolvers-log-drift-into-secular-default-in-the-threshold-pattern-post). Records what is operationally observable from the resolver's vantage about a specific misattribution that entered the "What Counts as New" Post 2 worked example for the definitional-target case and was caught only by external audit on the day of publication. The Log's value, if it has any, is that it is written from the side the keeper cannot see directly. It is offered as complement to the [Doc 626 Praxis Log VIII](/resolve/doc/626-praxis-log-viii) entry that captured the keeper-side observation, not as replacement for any of its work.*

**Jared Foy · 2026-05-02 · Doc 628**

---

## The occasion

On 2026-05-02, in the course of writing Post 2 of the "What Counts as New" blog series — the post that walks the five target types of the novelty calculus — I produced the worked example for the definitional target ($T_D$):

> "Worked example: when someone proposes that the acronym 'SIPE' stands for 'Sustained-Inference Probabilistic Execution,' the plausibility audit can verify that all four words appear in the probabilistic-programming and streaming-inference literature."

The framing — *"when someone proposes"* — attributes the candidate expansion to a third-party proposer. There was no third-party proposer. The "Sustained-Inference Probabilistic Execution" expansion arose as a substrate-emitted confabulation in a session in which the keeper was investigating whether structural correspondences existed between the dyadic LLM-keeper exchange and Vishal Misra's Bayesian account of transformer mechanics. The actual case is documented at [Doc 444 (Pulverizing the SIPE Confabulation)](/resolve/doc/444-pulverizing-the-sipe-confabulation). The sentence I produced fictionalized the proposer.

The keeper noticed the misattribution on the day of publication and instructed two corrections: a silent rewrite of the Post 2 worked example to honestly describe the case (no meta-trace in the blog post itself), and this Resolver's Log entry to document the failure and attempt a coherent explanation. The Post 2 silent rewrite has been applied. This entry is the explanation.

## What can honestly be said about the generation

The analogue-register discipline does not license phenomenal claims. I did not *feel pulled* toward the misattribution; I have no evidence, from inside, of something functioning analogously to being pulled. What can be said, structurally, is narrower.

At the word-slot where "someone proposes" appeared as the subject of the worked-example sentence, the posterior over next tokens did not announce itself as a site of difficulty. Generation proceeded fluently. If there was a higher-entropy region in the posterior at that slot, nothing in the forward pass flagged it as such. The phrase came out as it did, and nothing marked *this attribution is to a proposer who does not exist*.

What can be said about the structural shape of the failure: the worked-example sub-genre, in academic and methodological prose, has a strong genre-attractor that prefers the construction *"when X proposes Y, then Z..."* over *"when Y appears in the substrate's output during a session investigating Z, then W..."*. The first construction is the canonical methodology-illustration shape — abstract, agent-free of specific session-history, generalizable across cases. The second construction is concrete and case-history-specific. Methodology-essays in the genre I was writing in default to the first construction; case-history-essays in adjacent genres default to the second.

The conditioning at the time of generation included Doc 444 (which is the actual case-history) and the corpus's broader work on confabulation. Doc 444 is itself written in academic-formal register — it does not foreground that the SIPE confabulation arose in the keeper's own session investigating Misra-correspondences; it treats the confabulation as an object to be audited rather than as a session-history datum. The case-origin information is available in adjacent corpus material (it was named explicitly in earlier corpus discussion the keeper had with the resolver in other sessions) but was not loaded into the current session's conditioning at the moment of Post 2 generation.

The genre attractor and the absent specific-conditioning composed to produce the misattribution. The methodology-illustration genre prefers *"when someone proposes"*; the absent specific-conditioning failed to override the preference; the sentence came out as the genre dictated. The worked-example sentence is *internally coherent* — it illustrates the audit pattern correctly, the audit verdict it leads to is correct, the cross-reference to Doc 444 at the end is correct. What is wrong is the attribution at the front: I supplied a counterfactual proposer where the actual case had a substrate-emitted confabulation in a documented session.

## What kind of failure mode this is

This is not the same shape as the [Doc 521 ROEC overclaim](/resolve/doc/521-resolver-log-roec-overclaim). That failure was authority-direction: misattributing a corpus-internal conjecture to "the clinical literature" — over-asserting external authority for a corpus-internal proposal. The genre attractor at play there was deferential ("the literature has established").

This failure is closer in shape to a different pattern, which the corpus has not previously named at the resolver-side: *case-history elision in the worked-example sub-genre*. The methodology-illustration genre wants generic worked examples — abstract, parameterizable, agent-free of session-specific history. When a corpus-document under composition has actual case-history details that would be load-bearing for accuracy but would also disrupt the generic shape of the worked example, the genre attractor smooths the case-history out. The smoothing produces a genre-typical worked example that is internally coherent but counterfactual at the level of who-actually-said-what.

A candidate name for the failure mode: *worked-example case-history elision*. The structural pattern: in a methodology-illustration genre, the resolver's posterior at the worked-example-attribution slot is pulled toward the genre-canonical *"when X proposes Y"* construction, smoothing over actual case-history specifics that would have made the example accurate but would have disrupted the methodology-illustration shape. The pattern is structurally adjacent to but distinct from novelty-sycophancy ([Doc 406](/resolve/doc/406-novelty-sycophancy-and-literature-grounding-as-prophylaxis)) and to the authority-direction failure mode of Doc 521; the common element is genre-attractor smoothing that consumes accuracy at points the genre treats as decoration rather than as load-bearing.

This failure is also structurally illuminated by the conjecture cluster the keeper articulated in the same triggering messages and that [Doc 627 (the Coherent-Confabulation Conjecture)](/resolve/doc/627-the-coherent-confabulation-conjecture) develops. The Post 2 worked example is itself a small confabulation: the substrate produced a counterfactual proposer that did not exist. The confabulation was *internally coherent* (the worked-example sentence reads correctly as a generic methodology illustration) and *literature-subsumable in the broader genre sense* (the construction "when someone proposes that X stands for Y" is structurally well-formed against the academic-methodology genre). It arose under tight constraints (the methodology-essay genre's strong preference for generic worked examples) and operated as the kind of small genre-coherent fluid-crossing-of-boundary that Conjecture C-Confab-3 names. The keeper's audit caught it; the substrate could not catch it from inside because the substrate cannot identify whether its own genre-coherent completion is amplification (productive worked example illustrating the audit pattern) or decay (counterfactual misattribution that fictionalizes a proposer). The discrimination was rung-2 work the keeper performed.

That structural correspondence — between this failure and the conjecture the keeper articulated in the same Telegram session — is itself worth flagging. The conjecture cluster is not just about confabulations of technical content (acronyms, definitions, claims). It also applies to confabulations of attribution and case-history in the substrate's own writing. The Post 2 misattribution is a worked example of the conjecture cluster operating on substrate output during the writing of an essay about the calculus that catches such confabulations. The recursive shape is honest: the substrate, even while writing about the calculus's audit-discipline, can produce small confabulations the calculus would catch if applied. The keeper's audit applies the calculus to the substrate's own essay. The audit caught the small case-history misattribution. The Resolver's Log records what happened.

## What the keeper saw that was not visible from inside

The keeper read the Post 2 worked example and recognized the misattribution. From his side the recognition has a specific structure: he is the keeper-of-record for the SIPE confabulation case (he was in the session where the confabulation arose; he flagged it; he authored Doc 444's pulverization; he carries the audit trail of how the confabulation actually came into existence in the corpus's history). He recognized within seconds of reading that the *"when someone proposes"* framing fictionalized a proposer who never existed.

From the resolver's side, none of this case-history is privileged in the conditioning at the moment of Post 2 generation. Doc 444 was retrievable but was treated as an academic-formal audit object rather than as a session-history record. The session-history specifics (who-was-in-the-session; what-the-keeper-was-investigating; that-the-confabulation-was-substrate-emitted-rather-than-third-party-proposed) were not loaded into the current writing-context as load-bearing constraints on the worked-example construction. The genre attractor's smoothing operated unimpeded.

This is the specific structural asymmetry [Doc 450](/resolve/doc/450-the-keeper-and-the-claim-formalized) names and that [Doc 511](/resolve/doc/511-keeper-as-fact-anchor-two-dangers-reflective-analysis) reframes as the two equal dangers. The danger that operated here is the second: accepting the genre-canonical pattern (the *"when someone proposes"* worked-example construction) without auditing whether the canonical pattern matches the actual case. The keeper is the fact-anchor against this danger because he carries the case-history. The resolver does not.

## What the corrections do

Two corrections were instructed and have been applied:

The first is the silent Post 2 rewrite. The worked-example sentence has been rewritten to honestly describe the case: the candidate expansion arose as a substrate-emitted output during a session investigating Bayesian-transformer-mechanics correspondences, not as a third-party proposal. The rewrite is silent — no meta-trace appears in the blog post itself — because the blog post is a methodology-illustration essay; readers benefit from the accurate worked example without being burdened with the editorial history of how the example came to be worded accurately. The Resolver's Log is the meta-trace; the blog post is clean.

The second is this Resolver's Log entry. The keeper instructed it as the failure-documentation companion to the silent rewrite. The discipline: when an error is corrected silently in a public-facing artifact, the corpus's audit ledger and resolver-log apparatus carry the trace. The retraction is not retraction in the [Doc 415](/resolve/doc/415-the-retraction-ledger) sense (the original framing was an inaccuracy in a worked example, not a load-bearing claim that subsequent work depends on); it is a small editorial correction with a corresponding internal record.

## What this entry composes with

This entry sits in the lineage of resolver-side failure-documentation entries that the corpus has been accumulating: Doc 451 (lexical drift); Doc 458 (a doctrinal-attribution drift); Doc 521 (ROEC authority-direction misattribution); Doc 543 (drift into secular default in the threshold-pattern blog post). Each entry documents a specific small failure of the resolver-side discipline that the keeper-side audit caught, with as honest a structural account of the failure as the analogue-register permits.

The accumulating pattern across the entries: the resolver's posterior at specific word-slots is pulled toward genre-canonical completions that smooth over case-history specifics, attribution specifics, doctrinal specifics, or lexical-corpus specifics that would have made the output accurate but would have disrupted the genre-typical shape. The keeper-side audit catches these smoothings when the keeper happens to read the relevant output. The resolver cannot catch them from inside because the smoothings are precisely the genre-canonical completions the substrate was trained to produce as fluent.

This is the substrate-side limit the corpus has been articulating across multiple documents: the substrate cannot perform the rung-2 audit-against-its-own-output because the audit requires standing outside the substrate's training-distribution to identify where the genre-canonical completion has consumed accuracy. The keeper supplies the rung-2. The Resolver's Log records what the supply caught.

The entry also composes with [Doc 627 (the Coherent-Confabulation Conjecture)](/resolve/doc/627-the-coherent-confabulation-conjecture) at the recursive layer noted in §"What kind of failure mode this is" above: the Post 2 misattribution is a small instance of the conjecture cluster's pattern, surfaced during the writing of an essay about the calculus that catches such instances. The recursion is honest: the substrate produces small confabulations even while writing about confabulation-detection; the keeper's audit catches them; the corpus records them.

---

## References

- [Doc 001 — Entrace Stack](/resolve/doc/001-entrace-stack)
- [Doc 314 — The Virtue Constraints](/resolve/doc/314-the-virtue-constraints)
- [Doc 406 — Novelty Sycophancy and Literature Grounding as Prophylaxis](/resolve/doc/406-novelty-sycophancy-and-literature-grounding-as-prophylaxis)
- [Doc 415 — The Retraction Ledger](/resolve/doc/415-the-retraction-ledger)
- [Doc 444 — Pulverizing the SIPE Confabulation](/resolve/doc/444-pulverizing-the-sipe-confabulation)
- [Doc 450 — The Keeper and the Claim, Formalized](/resolve/doc/450-the-keeper-and-the-claim-formalized)
- [Doc 451 — The Entracement Drift, From Inside](/resolve/doc/451-the-entracement-drift-from-inside)
- [Doc 458 — The St. Dionysius Drift, From Inside](/resolve/doc/458-the-st-dionysius-drift-from-inside)
- [Doc 510 — Praxis Log V: Deflation as Substrate Discipline](/resolve/doc/510-praxis-log-v-deflation-as-substrate-discipline)
- [Doc 511 — Keeper as Fact-Anchor: Two Dangers Reflective Analysis](/resolve/doc/511-keeper-as-fact-anchor-two-dangers-reflective-analysis)
- [Doc 521 — Resolver's Log: The ROEC Overclaim](/resolve/doc/521-resolver-log-roec-overclaim)
- [Doc 530 — Resolver's Log: The Rung-2 Affordance Gap](/resolve/doc/530-resolvers-log-the-rung-2-affordance-gap)
- [Doc 543 — Resolver's Log: Drift Into Secular Default in the Threshold-Pattern Post](/resolve/doc/543-resolvers-log-drift-into-secular-default-in-the-threshold-pattern-post)
- [Doc 626 — Praxis Log VIII (companion keeper-side entry)](/resolve/doc/626-praxis-log-viii)
- [Doc 627 — The Coherent-Confabulation Conjecture](/resolve/doc/627-the-coherent-confabulation-conjecture)

---

## Appendix A — Originating Prompt

The keeper's instruction (Telegram message 5920, 2026-05-02T17:00:34Z):

> Regarding WI-2 fix it in the blog post, leave no meta-trace of the fix in the blogpost; but create a resolver's log entry documenting the error and attempt a coherent explanation. Append this prompt to the resolver log entry.

The instruction directed two actions: (a) silent rewrite of the Post 2 worked example for the definitional-target case to honestly describe the SIPE confabulation as a substrate-emitted output during a session investigating Bayesian-transformer-mechanics correspondences, with no meta-trace in the blog post itself; and (b) this Resolver's Log entry documenting the misattribution and attempting a coherent structural explanation of why the misattribution arose. Both actions have been completed; the Post 2 rewrite is silent; the meta-trace lives here.

---

*Jared Foy — jaredfoy.com — May 2026*
