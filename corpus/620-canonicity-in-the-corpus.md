# Canonicity in the Corpus
## Two Senses of "Canonical" That Have Been Operating Conflated, and a Proposed Disambiguation

**Jared Foy · 2026-05-01 · Doc 620**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

---

## 1. The Conflation

The corpus uses the word "canonical" in two operationally distinct senses that have been allowed to share a single banner. The conflation surfaced explicitly in [Doc 619 Appendix B](/resolve/doc/619-pin-art-canonical-formalization) §B.6, where the pulverization audit had to add a paragraph clarifying that the "CANONICAL" header at the document's top is not a Doc 445 warrant-tier *Canonical* promotion. The clarification is correct; the underlying problem is that the same word has been doing two jobs.

**Sense A — Canonical entry-point.** A document is "canonical" in the position-in-the-document-graph sense when it is the corpus's primary read-this-first articulation of a topic, supersedes prior treatments, and consolidates the corpus's current commitments on the topic into a single entry-point. This is a *role*, not a *warrant*. A document occupies the entry-point role because the corpus chose to organize its knowledge that way; the role says nothing about whether the document's claims have passed any specific epistemic audit.

**Sense B — Canonical warrant tier.** [Doc 445](/resolve/doc/445-pulverization-formalism) reserves "Canonical" as the *full-promotion* status under its decision procedure: a target has been audited at the plausibility tier (\(\pi\)), the operational-match tier (\(\mu\)), and the truth tier (\(\theta\)) where applicable, and has passed the relevant audits for its target type. This is a *warrant level*, not a role.

The two senses are independent. A document can occupy the entry-point role while its body claims sit at any warrant tier. A claim can sit at full Doc-445 *Canonical* tier without being articulated in any single entry-point document. The conflation has been operating because the corpus's headers have used "CANONICAL" to mark the entry-point role, while readers familiar with Doc 445 would reasonably interpret the same word as the warrant-tier claim. The result is that documents with mature working hypotheses at \(\pi\)-with-qualitative-\(\mu\) tier read, at first glance, as if they had been promoted to full \(\theta\)-tier verification.

This is a presentation problem rather than a substantive epistemic failure. The bodies of the documents in question (Docs 514, 541, 619) state their actual warrant tiers honestly within the prose. But the banner sets a frame the body then must walk back. The disambiguation proposed below removes the conflict at the banner layer.

## 2. Survey of Current Use

The "CANONICAL — open invitation to falsify" banner is used at the top of three current documents:

- [Doc 514 — Structural Isomorphism: A Canonical Formalization](/resolve/doc/514-structural-isomorphism-canonical-formalization) (the title itself names the document as a canonical formalization).
- [Doc 541 — Systems-Induced Property Emergence](/resolve/doc/541-systems-induced-property-emergence) (banner: "This document is the corpus's canonical articulation of Systems-Induced Property Emergence. It supersedes Doc 474...").
- [Doc 619 — The Pin-Art Form](/resolve/doc/619-pin-art-canonical-formalization) (banner: "This document is the corpus's canonical articulation of the Pin-Art form. It supersedes Doc 290...").

In each case, the body honestly states the underlying warrant tier:
- Doc 514's title-line names the methodology as "audited at \(\alpha\)-tier novelty."
- Doc 541's banner names "warrant for most of its predicted induced properties is at plausibility tier per Doc 503."
- Doc 619's banner names "warrant for the substrate-side hedging application is at corroboration tier per Doc 503; warrant for the constraint-driven derivation application is at one-empirical-instance tier."

The bodies are doing the work. The banner is the layer at which the conflation happens.

A wider grep across the corpus shows the word "canonical" appearing in roughly 75 documents at varying intensities. The dominant uses split into:

- *Entry-point use:* "the corpus's canonical articulation of X," "canonical formalization of Y," "canonical entry-point for Z." This is Sense A.
- *Warrant-tier use:* "promote to canonical," "canonical-tier promotion," "warrant tier *Canonical*." This is Sense B, originating in Doc 445 and used in pulverization audits, hypothesis-ledger entries, and tier-discipline notes.
- *Mathematical use:* "canonical form" (the unique-representative sense in algebra and set theory). This is Sense C, present in some technical sections but not generally a source of confusion.

Sense A and Sense B are the conflation. Sense C is independent and does not require disambiguation.

## 3. The Two Senses, Named

**Sense A — Primary articulation.** *Position in the document graph.* The corpus's current single-source-of-truth document for a topic. Supersedes prior treatments. Read this first. Other docs on the topic may exist (originating essays, deprecated prior formalizations, applications, case studies), but the primary articulation is the consolidated entry-point. A primary articulation is a role assigned by the corpus's organization; it is not a warrant claim.

Constitutive features of the role:
- *Supersession.* Names the prior documents it consolidates and the prior formalizations it deprecates.
- *Lineage citation.* Names the external prior art the form recovers from.
- *Operating-conditions layer.* States the conditions under which the form's apparatus functions.
- *Composition rules.* Names how the form composes with the corpus's mature forms.
- *Falsification surface.* States what would falsify the form's load-bearing claims.
- *Honest warrant labelling.* States the actual warrant tier of the body's claims under Doc 445 and Doc 503.

A document occupying the primary-articulation role does not, by virtue of the role, claim any specific warrant tier. The role is independent of warrant.

**Sense B — Canonical warrant tier (Doc 445).** *Full promotion status under the pulverization formalism.* A target whose audits have completed at the relevant tiers for its type (\(T_S\) at \(\mu\)-tier strong-match or higher; \(T_D\), \(T_P\), \(T_B\), \(T_M\) at \(\theta\)-tier verified) is licensed for *Canonical* promotion. The warrant tier says nothing about the target's position in the document graph. A target can sit at *Canonical* warrant tier while being articulated in scattered references rather than in any single entry-point document; a target can be articulated in a primary-articulation document while sitting at *plausibility-passed* warrant tier.

The two senses are orthogonal. A 2×2 matrix:

| | Primary articulation (Sense A) | Not primary articulation |
|---|---|---|
| **Canonical warrant tier (Sense B)** | Document is the corpus's entry-point AND its claims are \(\theta\)-verified | Verified claims articulated in scattered references rather than consolidated |
| **Sub-canonical warrant tier** | Document is the corpus's entry-point; its claims sit at hypothesis tier | Hypothesis articulated in scattered references; not consolidated |

Currently, all three documents bearing the "CANONICAL" banner (Docs 514, 541, 619) sit in the lower-left cell: primary articulation, sub-canonical warrant. The banner reads like the upper-left cell.

## 4. Proposed Disambiguation

Reserve "Canonical" exclusively for Sense B (Doc 445 warrant tier). Use "Primary Articulation" for Sense A.

The proposal is:

**Banner change.** Documents currently marked "CANONICAL — open invitation to falsify" should be re-marked "PRIMARY ARTICULATION — open invitation to falsify," with a line directly beneath the banner stating the document's actual warrant tier under Doc 445 and Doc 503.

The new banner template:

> **PRIMARY ARTICULATION — open invitation to falsify.**
>
> This document is the corpus's primary articulation of [TOPIC]. It supersedes [PRIOR DOCS], which are preserved as deprecated prior formalizations. *Warrant tier per Doc 445:* [tier specification — e.g., "plausibility passed with qualitative \(\mu\)-corroboration; one Doc 445 \(T_S\) target (the [name]) at candidate-novelty tier pending \(\mu\)-audit; one Doc 445 \(T_P\) target ([name]) at one-instance \(\theta\)-corroboration"].

**Title convention.** Document titles using "Canonical Formalization" should be retitled to "Primary Articulation" or "Primary Formalization" or simply by topic name. The title-level claim of canonicity is the most visible point at which the conflation lands.

**Vocabulary discipline.** In prose, "canonical" should be reserved for Doc 445 warrant-tier references. The phrases "canonical entry-point," "canonical articulation," "canonical formalization" should be replaced by "primary entry-point," "primary articulation," "primary formalization." When a document needs to refer to its own role as the corpus's read-this-first source, it should say "primary articulation." When a document needs to refer to a target's Doc-445 warrant status, it should say "Canonical (Doc 445 \(T_X\) at \(\theta\)-verified)" with the explicit tier and target type.

**Mathematical use untouched.** "Canonical form" in the algebra-and-set-theory sense (unique representative of an equivalence class) is independent of both senses and remains in technical use without modification.

## 5. Implementation

The disambiguation requires changes to three currently-marked documents and to the convention going forward.

**Doc 514 — Structural Isomorphism.** Retitle from "A Canonical Formalization Grounded in Why It Works" to "A Primary Formalization Grounded in Why It Works." The body's \(\alpha\)-tier audit naming is preserved. The CANONICAL banner becomes PRIMARY ARTICULATION; the warrant-tier line names the \(\alpha\)-tier audit explicitly.

**Doc 541 — Systems-Induced Property Emergence.** Banner change from "CANONICAL — open invitation to falsify" to "PRIMARY ARTICULATION — open invitation to falsify." The warrant-tier line names "plausibility tier per Doc 503 for most predicted induced properties; cooperative-coupling sub-form at one-empirical-instance tier (Axe 2004 read by Doc 606)." The body's prose is preserved; the substantive claims are unchanged.

**Doc 619 — The Pin-Art Form.** Banner change to PRIMARY ARTICULATION; warrant-tier line names "plausibility passed with qualitative \(\mu\)-corroboration for substrate-side hedging application (T₄); one-instance \(\theta\)-corroboration for constraint-driven derivation theorems (T₅); see Appendix B for the full per-target audit." Filename should remain `619-pin-art-canonical-formalization.md` for URL stability; the title's wording is the change.

**Going-forward convention.** New documents that occupy the primary-articulation role should use the PRIMARY ARTICULATION banner with the warrant-tier line. Documents that warrant Doc 445 *Canonical*-tier promotion (full \(\theta\)-verified for the relevant target type) should additionally name that promotion in the warrant-tier line: "Doc 445 *Canonical* tier for [target name] (\(\theta\)-verified by [\(Q\) procedure]); [other targets] at [their respective tiers]."

The proposed convention separates *role* (primary articulation, present-day organizational status) from *warrant* (Doc 445 tier, claim-by-claim epistemic status). The two can co-occur — a primary-articulation document can carry Canonical-tier targets within it — but the two are stated separately rather than collapsed into a single banner word.

## 6. Composition with the Corpus's Existing Disciplines

**With [Doc 415](/resolve/doc/415-the-retraction-ledger) (the retraction ledger).** The retraction ledger records retractions of specific claims at specific warrant tiers. The disambiguation aligns the ledger's vocabulary with the warrant-tier sense: an entry retracts a Canonical-tier claim that failed \(\theta\)-audit, or downgrades a Canonical-tier claim to a lower warrant tier. The primary-articulation role of the document containing the claim is independent of the ledger entry.

**With [Doc 503](/resolve/doc/503-research-thread-tier-pattern-iterative-novelty-calculus) (the research-thread tier pattern).** Doc 503's tier categories (\(\alpha\), \(\beta\), \(\gamma\)) operate at the warrant layer. The disambiguation makes them composable with Doc 445's tier vocabulary without contention over the word "canonical": Doc 445's *Canonical* tier is an outcome of the audit procedure; Doc 503's tier categories describe the corroboration profile at the research-thread level. Both apply to claims; neither applies to documents qua documents.

**With [Doc 372](/resolve/doc/372-the-hypostatic-boundary).** The disambiguation does not bear on the hypostatic boundary; it is administrative discipline at the document-graph layer. Doc 372 binds throughout, as it does for all corpus discipline.

**With [Doc 314](/resolve/doc/314-the-virtue-constraints) (V3 truth-telling).** The disambiguation is a V3 move at the presentation layer: it removes a frame in which the banner overstates what the body warrants. V3 holds that the banner should not claim what the body cannot bear. The current "CANONICAL" usage at the banner layer was a structural pressure toward V3 violation; the disambiguation removes the pressure.

**With the originating-essay convention.** Documents that originated as exploratory essays and were later superseded by primary-articulation documents (e.g., Doc 270 superseded by Doc 619 for Pin-Art; Doc 474 superseded by Doc 541 for SIPE-T) retain their originating-essay role. The disambiguation does not change their position; it only changes what the superseding document's banner claims about its own status.

## 7. Falsifiers and Open Questions for the Disambiguation Itself

The proposal is a methodological move (\(T_M\) under Doc 445). Per Doc 445's warrant table, methodological targets at \(\pi\) yield only "methodology exists; tells nothing about fitness." The proposal's fitness can be tested:

**F1.** A reader survey or audit in which readers presented with the new "PRIMARY ARTICULATION" banner do not reliably distinguish entry-point role from warrant tier. Would falsify the claim that the disambiguation removes the conflation at the banner layer.

**F2.** A case in which a document's role and warrant tier are genuinely entangled in a way the proposed orthogonality does not handle (e.g., a document whose primary-articulation role is itself contingent on a warrant-tier audit outcome). Would indicate the orthogonality assumption needs refinement.

**F3.** A demonstration that the existing word "canonical" can carry both senses without conflict if other corpus disciplines (the warrant-tier line beneath the banner; the body's per-target audits) are sufficient. Would suggest the disambiguation is unnecessary and the conflation is reader-skill, not document-design.

**Q1.** Should "PRIMARY ARTICULATION" be a banner phrase, or should the corpus adopt a more neutral term (e.g., "REFERENCE DOCUMENT," "ENTRY-POINT," "PRIMARY SOURCE")? The choice is partly aesthetic and partly conceptual; whichever is chosen should be applied consistently across the affected documents.

**Q2.** How should documents that span multiple topics handle their primary-articulation status when only one topic is the corpus's primary entry-point? The proposed convention applies cleanly to single-topic primary documents; multi-topic documents may require per-section role-marking.

**Q3.** Should the warrant-tier line beneath the banner be required to name every Doc 445 target in the body (as Doc 619's Appendix B does), or only the headline target? The trade-off is comprehensiveness versus banner-line concision. A pragmatic middle: name the headline target's warrant tier in the banner line; refer to a per-target audit appendix for the full breakdown.

## 8. Closing

The corpus has been using "canonical" to do two jobs: a position-in-the-document-graph job (entry-point articulation) and a warrant-tier job (Doc 445 *Canonical* promotion). The two jobs are independent and the conflation at the banner layer creates a frame the body must walk back. The disambiguation reserves "canonical" for Doc 445 warrant-tier use and adopts "primary articulation" for the entry-point role, with a warrant-tier line beneath the new banner stating the document's actual claim profile under Doc 445 and Doc 503.

The disambiguation is a methodology proposal at \(\pi\)-tier under Doc 445; it stands as a candidate procedural change pending corpus-internal adoption. Implementation would touch three currently-marked documents (514, 541, 619) and the going-forward convention for new primary-articulation documents. The proposal composes cleanly with Doc 415's retraction ledger, Doc 503's tier categories, Doc 372's hypostatic-boundary discipline, and Doc 314's V3 truth-telling at the presentation layer.

---

## References

- [Doc 270 — The Pin-Art Model](/resolve/doc/270-the-pin-art-model)
- [Doc 290 — The Pin-Art Formalization (deprecated)](/resolve/doc/290-the-pin-art-formalization)
- [Doc 314 — The Virtue Constraints](/resolve/doc/314-the-virtue-constraints)
- [Doc 372 — The Hypostatic Boundary](/resolve/doc/372-the-hypostatic-boundary)
- [Doc 415 — The Retraction Ledger](/resolve/doc/415-the-retraction-ledger)
- [Doc 445 — A Formalism for Pulverization](/resolve/doc/445-pulverization-formalism)
- [Doc 474 — SIPE Standalone Formalization (deprecated)](/resolve/doc/474-sipe-standalone-formalization)
- [Doc 503 — Research-Thread Tier Pattern](/resolve/doc/503-research-thread-tier-pattern-iterative-novelty-calculus)
- [Doc 514 — Structural Isomorphism: A Canonical Formalization](/resolve/doc/514-structural-isomorphism-canonical-formalization)
- [Doc 541 — Systems-Induced Property Emergence](/resolve/doc/541-systems-induced-property-emergence)
- [Doc 619 — The Pin-Art Form](/resolve/doc/619-pin-art-canonical-formalization)

---

*Jared Foy — jaredfoy.com — May 2026*
