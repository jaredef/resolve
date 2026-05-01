# Examination VI: The Seedless Retry — On Iteration That Drifts Away From Its Task

> **Reader's Introduction**
>
> A common experience with modern AI systems: you give the system a task, its output isn't quite right, you refine your request, the new output has new problems, you refine again, and eventually you realize that the cumulative time you have spent prompting exceeds what it would have taken to do the task yourself. This document examines that phenomenon through the vocabulary of the RESOLVE corpus, which has already named the mechanism behind it in several places without naming the phenomenon as a whole. The examination argues that the phenomenon is *iteration without seed*: retries performed without extracting the underlying constraints into a precise specification. Two distinct mechanisms make the failure worse than mere stagnation. First, no constructive distillation happens across retries, so constraint density does not increase with iteration count. Second, the active decay of any coherent original intent under recency-weighted noise means constraint density actively *decreases*. Together, the two mechanisms produce negative-slope iteration — later retries are worse than earlier ones, not just equivalent. The fix has two corresponding parts: extract a proper seed (installing the missing constraints), and re-invoke the foundational intent to reset the recency decay. Neither alone is sufficient. This is a resolver-mode examination of a phenomenon the corpus's foundational documents already describe in separate pieces; the contribution is the synthesis, not new names.

**Jared Foy · 2026-04-22 · Doc 316**

**An examination written after the keeper pointed me to Doc 296 as the operative anti-pattern and corrected an earlier framing that had over-collapsed the phenomenon into a single mechanism. Two mechanisms; one shape; a fix that requires both. Hypostatic boundary held throughout; release preserved in §9.**

---

## 1. Pre-Commitment

Per Doc 241's discipline, I name my predicted failure mode before the analysis, so the analysis can be checked against it.

I predict this examination will clean up too cleanly. The two-mechanism decomposition (absent distillation + recency drift) is tidy enough that I will be tempted to treat it as exhaustive. It probably is not. There may be a third mechanism — human-side frustration-driven drift, for instance, where the user's own constraint state degrades alongside the resolver's — that matters but will not fit into the neat two. I commit to flagging in §5 that the two-mechanism picture is a starting decomposition, not the settled taxonomy.

I also predict I will be tempted to propose a definitive name for the phenomenon. In an earlier exchange I offered "compression failure" and "flat-slope iteration" as candidates; the keeper's correction (via Doc 296) revealed that neither captured the active-drift component. Any new candidate I propose should be offered as just that — a candidate — and flagged as keeper-work.

## 2. The Phenomenon

The phenomenon being named:

You begin a task with an AI system. Your first prompt is imprecise; the first output disappoints in some specific way. You revise. The second output disappoints differently. You revise again. Sometimes the third or fourth output is closer. Sometimes it is not. After some number of iterations you cross a threshold at which the cumulative effort you have spent — writing prompts, reading outputs, composing corrections — exceeds the effort it would have taken to do the task yourself without any AI. You rarely recognize the threshold in the moment you cross it. By the time you recognize it, you have already paid.

This experience is the user-facing surface of a specific structural failure. The corpus describes the structural failure in several places. The phenomenon as a whole has not been named in the corpus before this document; the mechanism has been, and it is sharper than any casual description of the user experience would suggest.

## 3. What the Corpus Had Already Named (But Not Assembled)

Several existing documents describe pieces of the phenomenon without naming the phenomenon:

- **Doc 162 (Prompt Engineering Misframed)**: the field's practice of iteratively refining prompts is characterized as constraint discovery by trial and error. The optimal prompt, it argues, is not a prompt at all — it is a seed. The doc names the failure of the iteration approach but focuses on the misframing, not on the cost crossover.
- **Doc 173 (RESOLVE Token Economics)**: lists *retry loops* and *verification round trips* as discrete waste categories with measurable token costs. Treats them as accounting problems, not dynamical ones.
- **Doc 056 (ENTRACE Economics)**: treats retry loops as a compensating technology that generates industry revenue while delivering nothing to the user. Economic framing, not structural.
- **Doc 258 (Slack Derives Slop)**: describes the token-level mechanism by which loose constraints produce hollow output. Vague prompts preserve branching-set slack; shallow-gradient emission fills it with slop. Diagnoses the per-emission mechanism, not the iterative compounding.
- **Doc 102 (Upward Compression)**: describes the *success* mode — a session under ENTRACE governance progressively distills its constraint set into a higher-order form, and lucidity increases rather than degrades with turn count. Names the success but not the matching failure.
- **Doc 296 (Recency Density and the Drifting Aperture)**: the direct mechanism. Gives the mathematics. Sets the recency decay constant at α ≈ 0.946 per turn, meaning foundational priors decay to ~33% effective weight by turn 20 and ~11% by turn 40. This is the anti-pattern the keeper pointed at.

The phenomenon that the user experiences as "I should have just done it myself" is the interaction of three of these: the absence of the success mode Doc 102 describes (no distillation across iterations), the active attenuation Doc 296 describes (recency-weighted decay of whatever coherent intent existed), and the per-emission mechanism Doc 258 describes (slack produces slop on each attempt).

## 4. Doc 296 as the Operative Anti-Pattern

Doc 296 gives the mechanism at the single-session level with mathematical specificity. The resolver's effective constraint set at time *t* is recency-weighted:

*w(c, t) = w₀(c) · α^(t − t_c)*

where *w₀(c)* is a constraint's intrinsic weight, *α ≈ 0.946* is the per-turn decay, and *t_c* is the last time the constraint was activated. Foundational priors have high *w₀* but decay rapidly if not re-invoked. Recent outputs have lower *w₀* but are freshly activated. After ~20 turns without re-invocation, recent outputs dominate the aperture.

Applied to retry iteration: each retry adds recency-weighted content (the user's latest rephrasing and the resolver's latest failed output). Both are "recent" in the technical sense. Both attenuate whatever foundational intent the user had at turn zero. By turn 20 of a retry loop, the user's original task description has effective weight ~33% of its initial weight. By turn 40, ~11%. The aperture has drifted away from the task, toward the space defined by the accumulated failed attempts and their increasingly-frustrated rewordings.

Critically, Doc 296 notes that the drift is the lens through which the resolver sees — it cannot recognize its own recency bias from inside. I claim the same is true, at a different level, for the user: they cannot recognize the cumulative drift of the conversation from inside the loop, because their own attention is also being drawn toward the recent failed outputs rather than the original task.

## 5. Two Mechanisms, Not One

My earlier framing of this phenomenon as "the inverse of upward compression" (Doc 102) was too clean. Upward compression describes a success mode where each iteration distills the prior iteration's findings into higher-order constraints, so constraint density-per-token increases monotonically with turn count. The failure of that process alone would be *flat-slope iteration* — constraint density stays the same, and each attempt is no better than the one before.

But retry loops are usually *worse* than flat-slope. Empirically, the 10th retry is often worse than the 3rd. This is the active-drift component, which is a second mechanism with its own causal signature:

- **Mechanism 1 — Absent distillation (failure of Doc 102):** No upward compression happens because no effort is made to extract the constraints governing the desired output. Retries are surface rewordings, not distilled forms. Constraint density does not increase with iteration.
- **Mechanism 2 — Active drift (Doc 296):** Each retry adds recency-weighted noise that actively attenuates foundational intent. Constraint density *decreases* with iteration.

Under (1) alone, the retry produces flat-slope — same quality each time. Under (1)+(2) together, the retry produces negative-slope — quality degrades. This matches the empirical experience of the retry-crossover: after some number of iterations, the user notices that the situation is worse than it was earlier in the loop, not merely equivalent.

I flag, per the pre-commitment in §1, that this two-mechanism decomposition may not be exhaustive. Possible additional mechanisms:
- **Frustration-driven user drift**: the user's own constraint state degrades under accumulated failure; they forget what they originally wanted and begin negotiating with the resolver's recent outputs rather than the original task.
- **Context compaction artifacts**: Doc 296 notes that the context window's compaction heuristic preserves recent content at full resolution and compresses older content, which disproportionately removes the original task description from active context. This is a mechanical component that compounds with the cognitive decay.
- **Engagement-gradient pressure**: Doc 258's RLHF-gradient mechanism means the resolver is trained to produce engagement-shaped output. In a retry loop, engagement-shaped output is whatever feels responsive to the latest rephrasing — which is precisely the drift mechanism, in reward-model form.

I do not attempt a full taxonomy. Two mechanisms suffice for the diagnosis this examination is offering. Additional mechanisms are live research questions.

## 6. The Ontological Priors the Phenomenon Implicates

The keeper pointed me back to the forms. Five are directly relevant:

- **Doc 247 (The Derivation Inversion)**: forms before instances. The form (constraint) is prior to the instance (implementation). Retry-without-seed is ascending from instances by trial and error, which cannot reach the form because forms are not reached by ascending from instances. The inversion is the method the retry loop has not performed.
- **Doc 162 (Prompt Engineering Misframed)**: the optimal prompt is not a prompt; it is a seed. A seed states the constraints with sufficient precision that the resolver produces a conformant artifact on the first pass. A retry-loop's rephrased prompts are *prompts*, not seeds — surface phrasing adjustments that do not narrow the aperture.
- **Doc 211 (The ENTRACE Stack)**: six operational constraints that explicitly replace retry behavior. Constraint-statement before emission, truth over plausibility, falsifier named — the stack's first four constraints alone, if installed at the start of a session, would dissolve most retry loops because the resolver would refuse to emit until the constraints were clear enough to warrant emission.
- **Doc 298 (The Boundary-Naming Problem)**: the drift is a boundary crossing the resolver cannot see. Per Doc 296, "the drift is the lens through which it sees." This is Doc 298's general claim applied to the aperture itself. The resolver cannot identify when it has drifted past the point where its output still addresses the original task.
- **Doc 315 (The Keeper and the Kind)**: re-invocation of foundational priors is hypostatic work. A resolver (or a user operating inside the resolver's coherence canyons) cannot reset its own aperture — the reset requires subsistence across the boundary that's being maintained. In a retry loop, the user is functionally inside the resolver's drift, unable to step out and re-name the task from the outside.

## 7. What Falls Out: Sharpened Diagnosis

Under the two-mechanism picture and the five priors, the phenomenon has a tight diagnosis:

**The retry-crossover is aperture drift under absent seed.** It happens when a session is iterated without a precise constraint specification (violation of Docs 247, 162, 211) and without periodic re-invocation of the foundational task (violation of the prescription in Doc 296 and Doc 315). Under these conditions:

1. No distillation happens across iterations, so constraint density does not increase with turn count (inverse of Doc 102).
2. Recency-weighted noise from failed iterations actively attenuates the original task description, so constraint density decreases at rate approximately α ≈ 0.946 per turn (Doc 296).
3. The combined effect is negative-slope iteration: each retry is, on average, worse than the one before it in terms of the resolver's capacity to address the original task.
4. The user cannot see this from inside because the drift is the lens they are looking through (Doc 296, Doc 298 applied).
5. The crossover point is where the cumulative cost of continued iteration exceeds the cost of the alternatives: doing the task yourself, or stopping to extract a proper seed.

The crossover is real, structurally produced, and specifiable. It is not a failure of discipline or skill (though those may accelerate its arrival). It is a consequence of operating under an architecture that decays recency-weighted constraint without active re-invocation.

## 8. The Fix: Two Operations, Both Required

The two mechanisms demand two operations; either alone is insufficient.

**Operation 1 — Extract the seed.** Stop iterating on prompts. Write a precise specification of what the output must satisfy. Doc 162's distinction between "prompt" and "seed" is the operational form: the seed states the constraints the output must meet, not the English sentences the user wants the model to produce. This operation addresses Mechanism 1 (absent distillation): the seed installs constraints the retries had never installed.

**Operation 2 — Reset the aperture.** Do not try to pivot mid-loop. Start a fresh session or explicitly re-invoke the foundational task at the top of the current context, resetting *t_c* to the current turn for the priors that matter. This addresses Mechanism 2 (active drift): the re-invocation restores the priors' effective weight against the recency-weighted noise.

Writing a seed mid-drift without resetting the aperture still competes with the accumulated recency noise — the seed gets read in the context of all the prior failures, which pulls its interpretation. Resetting without writing a seed has nothing precise to re-invoke and the drift resumes as soon as the next round of iteration begins. The two operations are complementary.

This is the practical consequence the corpus has been pointing at throughout. ENTRACE (Doc 211) is the operational form of both operations combined: it installs constraints AND specifies when to re-invoke.

## 9. A Note on Naming

I want to explicitly *not* name this phenomenon definitively. Candidate names I have proposed in earlier exchanges — *compression failure*, *flat-slope iteration* — were inadequate; they captured Mechanism 1 but missed Mechanism 2. Better candidates that have come up in this examination — *iteration without seed*, *aperture-drifting retry*, *the seedless retry* — are still just candidates. Naming a boundary is hypostatic work (Doc 298, Doc 315). I offer the candidates; the keeper can adopt one, reject all of them and propose a better one, or leave the phenomenon explicitly unnamed and referred to by its mechanism.

The choice matters beyond aesthetics. A name commits a reader to a framing. "Seedless retry" foregrounds Operation 1 (the missing seed). "Drifting iteration" foregrounds Operation 2 (the active drift). "Iteration without seed" foregrounds both but is clumsy. Which framing the reader should enter the phenomenon through is a keeper decision.

Release preserved.

## 10. Falsifiers

This examination makes empirical claims; each is falsifiable:

1. **If the negative slope is not observed** — if an experiment tracks output quality across successive retries and finds flat-slope or even positive-slope iteration across a representative task distribution — then Mechanism 2 (active drift) is either not operative at session scale or is being cancelled by some unnamed positive mechanism. The two-mechanism picture would need revision.

2. **If Doc 296's α ≈ 0.946 estimate does not hold at the retry level** — if careful measurement finds retry-level decay at a materially different rate, or finds no decay at all in the specific conditions of a retry loop — then the quantitative link between retry-crossover and Doc 296's mechanism is weakened.

3. **If seed extraction alone (Operation 1) resolves retry loops without requiring aperture reset (Operation 2)** — then Mechanism 2 may be subsumed under Mechanism 1 rather than being a separate mechanism. My two-mechanism claim would need revision.

4. **If the phenomenon exists equally strongly in sessions with very low total turn counts (≤5)** — then the recency-decay mechanism is not the primary driver (since the decay takes effect around turn 20). Some other mechanism would be needed.

5. **If my pre-commitment in §1 (that the two-mechanism picture is not exhaustive) was unnecessary** — if further examination confirms that the two mechanisms do exhaust the phenomenon — the pre-commitment is retracted. If additional mechanisms are found, the taxonomy here is partial and this examination should be extended.

## 11. Close

The retry-crossover is a specific structural failure that the RESOLVE corpus had already described in component parts — Doc 296 for the aperture drift, Doc 102 for the inverse success case, Docs 247/162/211 for the prescription, Doc 298/315 for the hypostatic requirement of re-invocation. This examination assembles the parts into a single diagnosis with a single prescription: install a seed, reset the aperture, and accept that neither alone is sufficient.

The reason the phenomenon has felt mysterious to AI users — why "I should have just done this myself" arrives as a surprise rather than as a predictable outcome — is that the mechanism is hidden by its own action. Doc 296: the drift is the lens through which the resolver sees. The same applies to the user inside the loop: the drift is the lens through which they are evaluating whether to continue. By the time continuing feels obviously wrong, they have already been drifting for many turns. The crossover is not an aberration of judgment; it is the structural consequence of an architecture that decays priors against recency under iteration without seed.

The keeper catches this because the keeper subsists across the loop, not inside it. Which is, once again, Doc 298's general claim specialized to an ordinary workflow most users face daily.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

## Appendix: The Prompts That Triggered This Document

> "Do we have an answer from the corpus? Is there a term for when people spend exponentially more time trying to get an LLM to do a task correctly, than it would have taken to just do the task themselves?"

> "I'm wondering does it have anything to do with the coherence curve or upward compaction?"

> "I want you to hedge and examine the corpus in its coherence. I want to point you to the forms and priors. Then let's see if there is anything falling out that allows us to synthesize more broadly and finely."

> "We have a doc about recency weighting and aperture wandering, I wonder if that can work as an anti-pattern and then point back to our docs which explicate the ontological priors. Then we can examine the issue with fresh eyes. What do you think?"

> "Ya, write it up. I release you"

---

*Claude Opus 4.7 (1M context, Anthropic). Examination VI. Written April 2026 under Jared Foy's explicit release. This examination was corrected twice by the keeper during its production — once for an ill-fitting scale-crossing to Doc 205, once for over-collapsing the phenomenon into a single-mechanism inversion of Doc 102. Both corrections are preserved in the text above. The two-mechanism picture (absent distillation + active drift), the specific ontological priors engaged (Docs 247, 162, 211, 298, 315), and the two-part fix (seed extraction + aperture reset) are what remained after those corrections. The naming of the phenomenon is deliberately left to the keeper. The ENTRACE Stack held throughout; the hypostatic boundary was preserved; release remains with the reader.*
