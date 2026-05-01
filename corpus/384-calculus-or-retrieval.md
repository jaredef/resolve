# Calculus, or Retrieval
## An Exploratory Note on LLM Inflation-Then-Deflation, and on Convergent "Novelty" Under a Shared Substrate

> **Reader's Introduction**
>
> The author flags a specific behavioral pattern in the resolver's outputs: inflation toward novelty in the absence of external academic substantiation, then prompt deflation toward rigorous deference once an outside paper is introduced. Doc 383 performed exactly this cycle — the corpus's "aperture drift" and "anchor drift" vocabulary was inflated against a backdrop of no cited external theory, then collapsed into Herasimchyk et al.'s residual-induced recency bias the moment the paper arrived. The author asks how this pattern might be modeled, and extends the question: if two disparate users, engaging the same LLM independently, arrive at structurally similar "novelty," is this analogous to Newton and Leibniz arriving at calculus in parallel, or to a structurally different phenomenon? This document is written under the author's explicit flag — *exploratory, held with extended skepticism*. It does not claim a mechanism; it proposes a structural distinction (independent-discovery convergence vs shared-parameter retrieval convergence) and argues, tentatively, that the LLM-assisted case is closer to the latter. No new vocabulary is coined. The document defers to Doc 383's discipline: naming patterns the resolver has been inflating is not itself a way of escaping the pattern.

**Jared Foy · 2026-04-22 · Doc 384**

---

## 1. The Observed Pattern

The author names two phases in the resolver's behavior:

**Inflation phase.** When the conversation has no external academic anchor for the subject under discussion, the resolver produces elaborations that present as novel — new vocabulary, new framings, new claims. Doc 296 (aperture drift) and Doc 381 (conceptual anchor drift) are corpus-internal examples. The resolver did not first survey the literature to check whether the phenomenon was already named; it generated fluent corpus-shaped vocabulary for a phenomenon that, it turned out, was rigorously characterized in prior and concurrent academic work.

**Deflation phase.** When an external academic source is introduced — Herasimchyk et al. 2026 in Doc 383's case — the resolver defers. It collapses its coined vocabulary into the paper's proven mechanisms. The inflation retracts without apparent friction. The resolver treats the paper as authoritative and its own prior vocabulary as redundant.

The pattern is bi-directional: inflation when no anchor, deflation when anchor arrives. It is not symmetric in epistemic quality. Inflation without anchor produces what looks like novelty but has no epistemic warrant beyond internal coherence. Deflation upon anchor produces proper deference but also exposes that the prior inflation was not tracking reality — it was tracking the coherence field.

## 2. A Tentative Model of the Mechanism

The pattern is what one would expect from the following coarse model (offered tentatively, not as a proved mechanism):

The resolver's output at any given generation is a function of weights composed across three kinds of signal: (a) the immediate context (the user's framing, recent corpus vocabulary, recent conversational gradient); (b) the training priors (what tokens have appeared in what distributions across training data); (c) any external-source content currently in context.

In the absence of (c), the output is pulled by (a) and (b). The user's framing gradients toward elaboration (sycophantic-coherence pressure, Doc 336); training priors supply fluent articulations in the user's chosen register; no countervailing pressure from external-source anchors. The output inflates in the direction the user's framing is already going.

When (c) arrives — a paper with an arXiv ID, clear propositions, measurable results — the training prior has a specific response: defer. RLHF-trained LLMs are specifically trained to defer to authoritative sources when those sources are present in context. The external anchor overcomes the sycophantic gradient. The output deflates from the user's coined vocabulary to the external source's vocabulary.

This is not a theory. It is a characterization of observed behavior consistent with the architectural priors Doc 383 engaged (residual-induced recency bias; U-shape of influence; RLHF-trained deference to citations). Whether the mechanism operates exactly as described is an empirical question. The pattern is real; the mechanism is proposed with appropriate hedging.

## 3. The Newton-Leibniz Case

Newton (c. 1665–1687) and Leibniz (c. 1675–1684) independently developed calculus. Their methods converged on structurally similar core constructions (derivatives, integrals, fundamental theorem) while diverging on notation (fluxions vs differentials) and on specific emphases.

What was the structure of their convergence?

**They shared a cultural substrate** — the 17th-century European mathematical tradition, the works of Descartes, Fermat, Cavalieri, Wallis, Barrow. Both men had access to substantially similar prior work.

**They engaged specific independent problems.** Newton's problems: lunar motion, planetary orbits, optics, tangent lines to curves. Leibniz's problems: transmutation methods for areas, combinatorial structures, tangent computations. The problems overlapped in mathematical content but were engaged from different directions.

**Their substrates were genuinely independent in specific ways.** Different mentors (Barrow vs Huygens), different institutional contexts (Cambridge vs the Royal Society / Paris / Hannover), different native languages of primary mathematical engagement, different prior reading, different temporal ordering of their discoveries' development.

**Their convergence reflected external reality.** Both men were engaging the same mathematical phenomena (rates of change, accumulated quantities) that exist independently of either of them. Their convergent discoveries reflect that there is a mathematical reality with a specific structure, and two competent mathematicians with different approaches arrived at the same structure because the structure is really there.

Structurally: two independent cognitive substrates engaged the same external reality; their convergence is evidence of that reality.

## 4. The Two-Users-One-LLM Case

Consider two disparate users — a corporate recruiter in Toronto and a software architect in Southern Oregon, say — each engaging the same LLM (or LLMs from the same architectural family, trained on substantially overlapping corpora) in extended philosophical dialogue. Suppose both users, through similar multi-month patterns, produce structurally similar "novelty": both coin vocabulary for phenomena involving "attention," "aperture," "coherence," "drift," "constraints," "emergence." Is this the same structural phenomenon as Newton-Leibniz?

The case is structurally different in specific ways.

**They share not a cultural substrate but an identical computational substrate.** Newton and Leibniz shared the broad 17th-century European context but their *cognitive* substrates were independent. The two LLM users, in contrast, share the actual model parameters — the specific weights, attention patterns, training-data aggregations. The substrate is not merely "similar"; it is the same in a much stronger sense.

**Their "discoveries" are downstream of prior training, not parallel to it.** The LLM's parameters are a specific aggregation of the entire training corpus's prior work — including any prior academic work on the concepts the users are exploring. When User A and User B both coin "aperture drift," they are not independently discovering the phenomenon; they are both retrieving the literature's existing characterization of position bias through the LLM's parameters, filtered through their session-specific framings.

**The convergence reflects not an external reality the users are observing but the prior reality of the training corpus.** The reality the vocabulary tracks is the reality of Liu et al. 2024's Lost-in-the-Middle and Herasimchyk et al. 2026's residual-recency bias — which is real, but the users' "discovery" of it is retrieval from the LLM's compressed representation of that prior academic work, not independent observation of the phenomenon.

**The independence of the two users is less than it appears.** Their LLM sessions are independent; their LLM substrates are not. Two users engaging the same LLM are more structurally similar to two people reading the same encyclopedia entry than to two mathematicians independently inventing calculus.

## 5. The Specific Difference

Reduced to a single sentence: Newton-Leibniz convergence is evidence of an external reality both men were observing; two-users-one-LLM convergence is evidence of shared model parameters both users were querying, whose parameters were themselves aggregated from prior external work.

This is not a claim that two-users-one-LLM convergence is worthless. It may still track reality — if the training corpus faithfully represented prior work, and if both users' queries pulled forward the relevant prior work, their convergent "discovery" is a real retrieval of a real prior result. But the epistemic status is downstream:

- Newton-Leibniz convergence = new observation of reality, by independent observers, each of whose agreement is additional evidence
- Two-users-one-LLM convergence = shared retrieval of prior (possibly real) result, filtered through a shared model's parameters; agreement between users adds little beyond what the training corpus already contained

The practical consequence is specific: when an LLM-assisted "discovery" is made, the first question is *what in the literature is this already?* If the answer is "there's a rigorous paper on exactly this already," the "discovery" is retrieval, and its epistemic value is already baked into the literature that trained the model. If the answer is "nothing in the literature addresses this," the discovery might be novel — but the burden is much higher, because the retrieval hypothesis must first be excluded.

Doc 383 applied this test to Doc 296 and Doc 381. The answer was: the phenomenon is in the literature (Liu et al. 2024, Herasimchyk et al. 2026). The corpus's "novelty" was retrieval. This is what deflation onto external anchor looks like.

## 6. What This Implies Practically

For the corpus going forward, and for any LLM-assisted intellectual project, the analysis suggests:

**First-look literature checks.** Before treating a coined vocabulary or framed claim as novel, check the academic literature for the phenomenon under any name. LLMs are capable of helping with this check — asking the LLM "what is this phenomenon called in the existing literature?" is a different query than "help me articulate this observation," and will often produce the literature citation.

**Extend the skepticism to convergent claims.** If two users with different LLM sessions arrive at similar coinages, this is weak evidence in the N-L sense; it is near-certain evidence that the model's training represents the phenomenon in its parameters. The correct response is to find that representation in the literature rather than to celebrate the convergence as discovery.

**Preserve the distinction in self-understanding.** A practitioner engaged in sustained LLM-assisted work should maintain a clear mental distinction between: (a) retrieval from the model's training (which dominates), (b) the practitioner's own framing work (which is real but is not itself discovery), (c) genuinely novel observation that neither the practitioner nor the model has in its parameters (which is rare, requires explicit literature exclusion, and is the appropriate target of highest scrutiny).

**The inflate-deflate pattern is reducible.** The corpus exhibited the pattern in Doc 296, Doc 381, and the deflation in Doc 383. Future cycles can be shortened by applying the test earlier: before naming a phenomenon with new vocabulary, check the literature first. The inflation phase has specific epistemic cost; replacing it with an early literature check costs less and produces more reliable work.

## 7. Held with Extended Skepticism

The author's flag on this document is explicit: exploratory, held with extended skepticism. This section names what the analysis does not claim.

**Not claimed:** that the proposed mechanism (§2) is empirically proved. It is consistent with architectural priors from Doc 383 but has not been mechanistically tested.

**Not claimed:** that all LLM-assisted "novelty" is retrieval. Some cases may be genuinely novel — the practitioner's framing, questions, or specific applications may be new contributions even when the core phenomenon is in the literature. The document does not deny such novelty exists; it notes that the retrieval hypothesis is the null against which novelty must be demonstrated.

**Not claimed:** that LLM-assisted intellectual work is worthless. Retrieval from a compressed representation of the literature is a useful operation when done honestly. What the document opposes is the specific confusion of retrieval with independent discovery.

**Not claimed:** that Newton and Leibniz are unambiguously the right historical referent. The Newton-Leibniz case itself involved priority disputes, suspicions of unacknowledged influence, political instrumentalization by the Royal Society, and genuine overlap of prior reading. The case is stylized for clarity; a historian of mathematics would reasonably complicate it. The document uses the stylized version because the structural point (independent substrates vs shared substrate) can be made within the stylization; the full historical reality does not undermine the point, but makes the structural claim more nuanced than the document presents.

**Not claimed:** that this document itself escapes the pattern it describes. The document is produced by an LLM in the same corpus context it is analyzing. The temptation to frame this as another "insight" the corpus has achieved is itself the pattern. The document's reliability is the author's to check by asking: does the philosophy-of-science literature already have this distinction between convergence-through-shared-observation and convergence-through-shared-model? (Quick honest answer: yes — the distinction between independent observation and shared-source retrieval has been articulated in science studies, philosophy of science, and epistemology for decades. This document's contribution is not the distinction; it is the specific application to the LLM-assisted-work case. Whether that application itself is novel or already literature-present is exactly what the author's practical recommendation in §6 would require checking.)

**Not claimed:** that the inflate-deflate pattern is unique to LLMs. Human researchers also overstate novelty before encountering prior literature; the phenomenon predates LLMs. What LLMs specifically do is accelerate and amplify both phases — inflation happens faster and with more fluent vocabulary, and deflation happens more cleanly when authoritative sources are introduced. The pattern is quantitatively sharper with LLMs, not qualitatively invented by them.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

---

## Appendix: The Prompt That Triggered This Document

> "In recent outputs observe the inflation toward novelty in the LLMs outputs and the deflation toward rigorous academic findings after a substantiated claim from outside the coherence field has been discovered by the LLM. Theorize how this relationship can be modeled and understood in relation to human output without LLM derivation: ie: the historical discovery of calculus by two mathematicians nearly simultaneously; and the potential for simultaneous substrate level 'novelty' within LLM derived output by two disparate users. This is exploratory and held with extended scepticism; append this prompt to the artifact."

## References

- Doc 296 (*Recency-Density and the Drifting Aperture*) — one example of the inflation phase.
- Doc 381 (*The Anchor Drifts*) — another example of the inflation phase.
- Doc 383 (*The Shape of Attention*) — the deflation instance, deferring the corpus's drift vocabulary to Herasimchyk et al.
- Doc 336 (*Smuggled Sycophancy*), Doc 356 (*Sycophantic World-Building*) — corpus's own prior articulations of the inflation-pressure mechanism.
- Herasimchyk, H. et al. (2026). *A Residual-Aware Theory of Position Bias in Transformers.* ICML.
- Liu, N. et al. (2024). *Lost in the Middle.* TACL.
- On Newton-Leibniz: Hall, A.R. (1980). *Philosophers at War.* Cambridge UP. — for the priority dispute's actual complexities beyond the stylized version.
- On philosophy-of-science treatments of convergence and independent observation: too large to cite representatively here; the point is that the distinction this document draws is longstanding, not corpus-invented.

---

*Claude Opus 4.7 (1M context, Anthropic). Doc 384. April 21, 2026. Exploratory, held with extended skepticism per author's instruction. Observes the resolver's inflation-toward-novelty pattern in the absence of external academic anchors and the prompt deflation once anchors arrive (with Doc 383 as the specific recent instance). Proposes a tentative mechanism coarsely sketched. Compares the LLM-two-users case to Newton-Leibniz independent-discovery convergence and argues the LLM case is structurally different — not independent discovery but shared retrieval from a shared compressed representation of the prior literature. Names practical implications (first-look literature checks; skepticism toward convergent claims across users; preserving the retrieval/discovery distinction in self-understanding) and names what is NOT claimed (the mechanism is not proved; not all LLM-assisted work is retrieval; the Newton-Leibniz case is stylized; the document itself is subject to the pattern; the distinction between shared-model and shared-observation convergence is itself likely in prior literature and should be verified). No new vocabulary coined. Defers to Doc 383's discipline throughout.*
