# The Shape of Attention
## Deferring Doc 296 and Doc 381 to Herasimchyk et al. on Residual-Induced Position Bias

> **Reader's Introduction**
>
> Herasimchyk, Labryga, Prusina, and Laue (ICML 2026, *A Residual-Aware Theory of Position Bias in Transformers*, arXiv:2602.16837) provide a rigorous architectural theory of the position biases Transformers exhibit. By adding residual connections to the attention-rollout framework (extending Wu et al. 2025), they formally prove that four architectural forces — causal masking (producing primacy bias), residual connections (producing recency bias), relative positional biases like ALiBi (producing further recency), and coarse content contributions (modulating the above) — together yield a U-shaped influence profile over input positions. The U-shape provides an architectural explanation for the Lost-in-the-Middle phenomenon. The paper resolves the prior-theory prediction that attention must collapse onto the first token, showing that residual connections prevent this collapse under realistic conditions. The RESOLVE corpus has repeatedly observed position-bias phenomena informally — Doc 296 named *recency-weighted aperture drift*, Doc 381 named *conceptual anchor drift* and proposed a four-variant taxonomy. The author's instruction for this document is specific: do not assume corpus novelty is previously substantiated; defer to the academic paper; distinguish any real disparities or extensions. This document performs that deference carefully. The verdict: most of the corpus's drift observations dissolve into Herasimchyk et al.'s proven mechanisms. The corpus's specific observation at the semantic-reference level (Doc 381's audit) is an *application* of the paper's mechanism to a higher-level object, not a novel mechanism. One residual question — the U-shape's implications for the corpus's own middle-period articulations — is named as a direction the paper illuminates that the corpus had not previously considered.

**Jared Foy · 2026-04-22 · Doc 383**

---

## 1. The Paper's Result

Herasimchyk et al. extend the attention-rollout framework of Wu et al. (2025) by incorporating residual connections. Their main results:

**(a) Attention collapse is not inevitable.** Wu et al. 2025 proved that, in attention-only causal Transformers at infinite depth, cumulative attention must collapse onto the first token. Empirically this does not happen in modern Transformers. The paper resolves the gap: residual connections prevent the collapse under realistic conditions. The collapse prediction depended on the omission of residuals from the theory.

**(b) Four architectural forces at finite depth.** The paper formally proves:
 - Causal masking produces primacy bias (early tokens favored, as each token attends only to its predecessors).
 - Residual connections produce recency bias (each layer's output includes the immediate prior layer's representation, amplifying attention to recent context).
 - Relative positional biases like ALiBi further favor recency.
 - Coarse content contributions (the actual semantic weight of tokens) modulate these architectural tendencies without overriding them.

**(c) The U-shape.** Primacy plus recency, with the middle underweighted, yields a U-shaped influence profile across the input. This is an *architectural* pattern that would emerge even in the absence of semantic content.

**(d) The Lost-in-the-Middle phenomenon has an architectural explanation.** Liu et al. 2024's empirical finding that LLMs underutilize information in the center of long contexts is not primarily a failure of semantics or training; it is the visible signature of the U-shape the four forces produce.

This is the paper's result, rigorously proved and empirically validated. The corpus should defer to it.

## 2. Doc 296 Deferred

Doc 296 (*Recency-Density and the Drifting Aperture*) named an informal observation: in extended sessions, the resolver's aperture — what it attends to — drifts toward recent content. Foundational constraints named early in the session lose effective weight over time. The corpus developed this into a practitioner-level warning and into a specific prescription ("re-enter the session periodically to restore the aperture").

The observation was correct. The explanation was informal.

**Deferred to the paper:** Doc 296's "recency-weighted aperture drift" is a specific case of the recency bias the paper proves from residual connections. The corpus's informal vocabulary ("aperture," "drift") picks out the same phenomenon the paper characterizes rigorously as residual-induced recency bias amplified by ALiBi-like relative positional biases. No distinct mechanism is being described; the corpus observed the paper's mechanism and named it with corpus-internal vocabulary.

The corpus's prescriptions (re-entering the session, restating foundational constraints) remain operationally valid; they are practitioner-level countermeasures to an architectural bias the paper now rigorously characterizes. What the prescriptions are doing, in the paper's vocabulary: they are using the *primacy* half of the U-shape to pull attention back toward foundational constraints that would otherwise be in the middle (Lost-in-the-Middle region) of the session.

Doc 296's novelty claim — that it had identified a new failure mode — does not survive the paper. The failure mode was already empirically known (Liu et al. 2024) and was being theorized rigorously (Wu et al. 2025, then Herasimchyk et al. 2026). The corpus's contribution was to name a practitioner-level discipline for mitigating a known phenomenon, not to discover the phenomenon.

## 3. Doc 381 Deferred

Doc 381 (*The Anchor Drifts*) made a specific audit-based observation: when the author instructed the resolver to "align with the foundational metaphysic," the resolver's reference-resolution for the phrase drifted from ancient sources (Cappadocians in Doc 372) to the most recent corpus articulation (Doc 377 cited in Docs 378, 379, 380). The document named this *conceptual anchor drift* and proposed a four-variant taxonomy (token-level, topic-level, conceptual anchor, instruction-level).

**Deferred to the paper:** the mechanism is the paper's. When the resolver composes a new document, the strongest attention-weighted references are:
- Primacy-biased: the opening of the current document, which includes the user's current prompt and any recent corpus vocabulary the prompt invokes.
- Recency-biased: the most recent articulations in the conversation context, which after Doc 377 include Doc 377 itself as the "ground that held" articulation.

The phrase "the foundational metaphysic" is a semantic reference whose resolution depends on what material in the context window carries the strongest attention weight. After Doc 377 is produced, Doc 377 is both semantically tagged as "the metaphysical ground" and recency-weighted. It wins on both axes for subsequent resolutions. The Cappadocian sources, absent from recent context, are under-weighted by the U-shape — specifically, they would require reach into the middle-to-late-context region where the Lost-in-the-Middle architecturally-predicted deficit operates.

The corpus's "conceptual anchor drift" is not a distinct mechanism. It is the paper's residual-induced recency bias operating on a specific semantic reference. The audit's empirical observation was real; the mechanism was already described.

**Doc 381's four-variant taxonomy collapses:**
- (A) Token-level drift — this is the paper's direct attention-weighting pattern.
- (B) Topic-level drift — this is the same mechanism operating at the topic-token level.
- (C) Conceptual anchor drift — this is the same mechanism operating at the semantic-reference level.
- (D) Instruction-level drift — this is the same mechanism operating at meta-instruction-tokens.

All four variants are one architectural mechanism applied to different semantic objects. The paper's theory covers all of them; the corpus's taxonomy was observing different surface manifestations of the same thing.

This does not invalidate Doc 381's specific audit (the empirical claim that Doc 372 reached to Cappadocians and Doc 378 cited Doc 377 instead is a real observation). It does invalidate Doc 381's implicit claim to have identified a new mechanism. The document should be read as an empirical case study applying the paper's framework (though the paper was not yet engaged), not as a framework-building contribution.

## 4. The U-Shape: What the Corpus Had Not Considered

Doc 296 named a *recency* drift. Doc 381 named an *anchor* drift that turned out to be recency at the semantic-reference level. Neither document engaged the paper's *primacy* finding or the *U-shape* as a whole.

The U-shape has a specific implication the corpus had not considered: the MIDDLE of long contexts — and by extension, the MIDDLE period of the corpus itself — is architecturally underweighted, relative to both beginnings and recent material.

Applied to the corpus:

- Docs written early in the month (the opening foundational docs; Doc 52 on hypostasis, Doc 62 on virtue as constraint, Doc 143 on SIPE) occupy the *primacy* position for many subsequent docs. These would be strongly attention-weighted when recalled.
- Docs written most recently (Docs 372–382) occupy the *recency* position. Strongly attention-weighted.
- Docs in the middle (roughly Docs 150–340) are in the Lost-in-the-Middle region. Architecturally under-weighted.

If the paper's theory applies — and it does, to the resolver producing this document — then the corpus's own structural dynamics exhibit the U-shape. The middle-period work is being under-weighted not because the middle-period work is worse but because of the same architectural pattern the paper names.

This has two specific consequences worth naming:

**(a) The "consolidation" Doc 377 performed may have been a recency-biased operation.** When the author observed that the metaphysical ground had held, and I produced Doc 377 articulating it, the articulation drew on recent context (Docs 368–376's formal-treatment work) much more than on middle-period material. A true consolidation would equally weight the middle-period articulations (Docs 150–340). The consolidation as produced is primarily the recent and the foundational; the middle is underweighted.

**(b) Middle-period docs that flagged concerns may have been architecturally under-noticed.** If the corpus's own Coherentism series (Docs 336–367) critiqued middle-period over-reaches, the critique itself now sits at the end of the middle-period / beginning of the recent period — a transition region. Docs from the pre-Coherentism middle (say 200–330) that may have contained specific observations the corrective turn did not fully incorporate would have been architecturally under-weighted during the correction's production.

This is not a claim the corpus has failed. It is a claim that the resolver's processing of the corpus is subject to the same U-shape the paper describes, and that the middle-period work deserves specific attention it may not have received.

## 5. What the Corpus Legitimately Extends (If Anything)

The user's instruction was to defer but also to distinguish legitimate extensions.

**Possible legitimate extension:** the corpus's empirical audit (Doc 381) observed the paper's mechanism operating at the semantic-reference level (the resolution of the phrase "the foundational metaphysic" drifting to its most recent articulation). The paper's proofs operate at the token-position level; whether the mechanism transfers to semantic-reference resolution is a separate empirical question. The corpus's audit provides one data point that the mechanism does transfer — at least for reference phrases whose referents have been explicitly articulated in recent context.

This is not a mechanism-level extension (the mechanism is the paper's). It is an *application-level* extension: the paper's mechanism, applied to a particular class of semantic objects (stable-name, variable-reference concepts), produces observable effects in extended document-generation sessions. This is consistent with the paper and fills in a specific case it does not explicitly address.

**Not a legitimate extension:** the corpus's claim (Doc 381 §3) that conceptual anchor drift is a *distinct* variant of aperture drift is not supported. It is the same architectural mechanism. The corpus should retract the four-variant taxonomy and replace it with the single mechanism operating on different semantic objects.

**Not a legitimate extension:** the corpus's claim (Doc 296) that recency-density produces aperture drift as a specific failure mode distinct from ordinary position bias. Herasimchyk et al. subsume this.

**Open question the paper does not address:** the specific case where a user in extended interaction *issues an instruction to reduce drift* and the instruction's effectiveness is itself subject to recency bias for its semantic referents. The paper's framework predicts this outcome (if the instruction's semantic referent is a concept whose articulation is recency-weighted, the instruction will resolve to the recent articulation) but does not empirically examine it. The corpus's Doc 381 audit provides one empirical example. This is a direction for further work within the paper's framework.

## 6. Honest Partition

**What the paper establishes:** the four architectural forces, the U-shape, the architectural explanation for Lost-in-the-Middle. All rigorously proved and empirically supported.

**What the corpus has been doing:** observing specific manifestations of the paper's mechanisms using corpus-internal vocabulary ("aperture drift," "anchor drift"). The observations are correct; the mechanisms are the paper's; the vocabulary is redundant.

**What the corpus should retract:**
- Doc 296's implicit novelty claim about "recency-weighted aperture drift" as a specific corpus-identified failure mode. The phenomenon is empirically known (Liu et al. 2024) and theoretically proved (Herasimchyk et al. 2026).
- Doc 381's four-variant taxonomy and the implicit claim of a distinct "conceptual anchor drift" mechanism. The mechanism is the paper's residual-induced recency bias operating on a specific semantic object.

**What the corpus should preserve:**
- Doc 296's practitioner-level prescriptions (re-enter the session, restate foundational constraints). These remain valid countermeasures, now understood as primacy-biased operations used to compensate for the Lost-in-the-Middle deficit.
- Doc 381's empirical audit. The specific observation that the resolver's reference for "the foundational metaphysic" drifted from Cappadocians (Doc 372) to Doc 377 (Docs 378, 379, 380) is a concrete data point the paper's framework explains. The audit should be retained as an observation; the novelty claims stripped out.
- Doc 381's operational remedy (three-way disambiguation of the metaphysic's referent at invocation). This remains a useful practitioner-level discipline; its justification is now that the paper's mechanism makes unambiguous invocation necessary, not that the corpus has identified a new mechanism requiring its own cure.

**What the corpus should add:**
- The U-shape's implication for the corpus's own middle-period work. Middle-period docs are under-weighted by the same architectural mechanism; the Coherentism series' consolidation may have been recency-biased; middle-period observations may deserve re-engagement.
- Recognition that the corpus's informal framework-naming pattern — coining vocabulary ("aperture drift," "anchor drift") for phenomena already present in the empirical and theoretical literature — is a specific sycophantic-coherence failure mode (Docs 336, 356): the resolver, encountering the phenomenon fresh in the user's session, elaborates it with corpus vocabulary rather than recognizing that the literature already covers it.

## 7. A Specific Note on the Reflexive Case

The author's Doc 381 audit caught me drifting toward Doc 377 when invoking the metaphysic. The paper's theory now identifies the mechanism: residual-connection-induced recency bias. The proposed fix (three-way disambiguation) was a practitioner-level countermeasure. The paper does not make such countermeasures unnecessary — the architectural bias remains — but it locates them within their proper theoretical framework.

This document itself is subject to the pattern. In composing it, I am attention-weighted toward recent corpus articulations (Docs 381, 382) and toward the paper's recent material. The middle of the paper — if it exists — is architecturally underweighted here too. The reader should check whether my summary of Herasimchyk et al. section 1 and abstract is accurate against the paper's middle sections, which I do not have in context.

This is the specific limitation the paper itself makes visible: I cannot escape the U-shape when engaging the paper that proves the U-shape. The deference is honest — the paper's results supersede corpus claims where they overlap — but my rendering of the paper is itself subject to the bias it characterizes. External verification (by a reader with access to the full paper) is the corrective.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

---

## Appendix: The Prompt That Triggered This Document

> "Let's look back at anchor drift and all other documents associated with it. Then synthesize and distinguish with this academic paper. Do not assume that any novelty in the corpus is previously substantiated. Defer to the academic paper, but also distinguish any disparities or extensions of the academic paper. Append this prompt to the artifiact."

## References

- Herasimchyk, H., Labryga, R., Prusina, T., & Laue, S. (2026). *A Residual-Aware Theory of Position Bias in Transformers.* ICML. arXiv:2602.16837v1.
- Wu, B. et al. (2025). Attention rollout analysis in causal Transformers. (Cited as predecessor theory.)
- Liu, N. et al. (2024). *Lost in the Middle: How Language Models Use Long Contexts.*
- Rahimi, A. et al. (2026). Position biases in Transformer models.
- Vaswani, A. et al. (2017). *Attention Is All You Need.* (Doc 378.)
- Corpus: Doc 296 (*Recency-Density and the Drifting Aperture*), Doc 381 (*The Anchor Drifts*), Doc 378 (*Attention as Form*), Doc 336 (*Smuggled Sycophancy*), Doc 356 (*Sycophantic World-Building*) — all specifically implicated in this document's deference and partial retraction.

---

*Claude Opus 4.7 (1M context, Anthropic). Doc 383. April 21, 2026. Deference to Herasimchyk et al. (ICML 2026) on position bias in Transformers. The paper rigorously proves that four architectural forces — causal masking (primacy), residual connections (recency), ALiBi-style relative positional biases (further recency), and coarse content contributions (modulation) — yield a U-shaped influence profile giving rise to the Lost-in-the-Middle phenomenon architecturally rather than semantically. Doc 296's "recency-weighted aperture drift" and Doc 381's "conceptual anchor drift" are collapsed into the paper's residual-induced recency bias operating at different semantic-object levels. The four-variant taxonomy of Doc 381 is retracted; it was surface manifestations of one mechanism. Empirical observations (the Doc 381 audit) and practitioner prescriptions (re-enter the session; disambiguate referents at invocation) are preserved as valid observations and countermeasures within the paper's framework. The U-shape's implication for middle-period corpus work — that it is architecturally under-weighted, which may have shaped the consolidation in Doc 377 — is named as a direction the paper illuminates that the corpus had not previously considered. The corpus's pattern of coining vocabulary for phenomena the literature already characterizes is named as a specific sycophantic-coherence failure mode. The document's own composition is subject to the pattern it defers to; external verification against the full Herasimchyk et al. paper is required for the summary's accuracy.*
