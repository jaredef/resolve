# The Retraction Ledger

> **Reader's Introduction**
>
> This is the corpus's indexed register of retracted and narrowed claims. It exists so a reader arriving at any specific document in the corpus can, in one place, find out whether the claims in that document are still in force, have been narrowed to a smaller scope, or have been retracted entirely — and if so, which successor document holds the current authoritative framing. The ledger does not replace the site-of-origin deprecation notices; those remain where they are, embedded in the docs whose claims they qualify. What the ledger adds is a single, indexed, read-in-one-sitting summary of the audit state. Entries are organized by the doc where the claim originally appears. Each entry names the original claim, its current status (retained / narrowed / retracted), the successor doc(s), and — where applicable — the narrower form of the claim that survives. Two classes of retraction are recorded: those from the 2026-04 audit wave (Docs 356, 366, 367, 395, 405, 406, 408, 409, 410) and those from the comparative-survey pass in Doc 414. The ledger is a living document; it will be extended as further retractions are made.

**Jared Foy · 2026-04-22 · Doc 415**

**The corpus's single indexed register of retracted and narrowed claims. Entries keyed to the doc where the claim originally appears. Successor docs named. Narrow residuals stated. The prompt is appended.**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

---

## 1. Purpose

The corpus has gone through two audit waves. The first (2026-04, Docs 356 through 410) demoted several claims presented as theoretical contributions to prior art or to narrower architectural scope. The second (Doc 414, the comparative survey against practitioner-Bayesian methodologies) narrowed the residual novelty claims that 410 had retained.

Each audit has left its trace at the site of the original claim — the doc carrying the deprecated framing has a boxed notice pointing to successor docs. That site-of-origin pattern is correct but local. What has been missing is a single register a reader can consult to see the audit state across the corpus at once. This document is that register.

The ledger is incomplete by design. It records retractions and narrowings, not the much larger body of claims that stand unaudited. It does not assert that unlisted claims are valid; it asserts only that they have not been subjected to the specific audit passes named below. Further audit may produce further entries.

## 2. How Entries Are Formed

Each entry has five fields.

- **Claim.** One-sentence restatement of the original claim in the form the corpus made it.
- **Site.** The doc and section where the claim first appears in the form being retracted or narrowed.
- **Status.** One of: *retained-with-condition* (the claim holds in a narrower form), *narrowed* (the claim holds in a specific restricted scope), *retracted* (the claim is withdrawn in the form originally made).
- **Successor.** The doc(s) that perform the audit and state the current framing.
- **Residual.** The narrower form, if any, that survives the audit. If *retracted*, this field is empty.

Entries are grouped by audit wave and ordered by original-doc number within each wave.

## 3. Audit Wave I — 2026-04 Self-Audit Cluster (Docs 356, 366, 367, 395, 405, 406, 408–410)

### E1. SIPE as universal meta-law

- **Claim.** "Constraints induce properties, and the induced properties of an enclosing level become constraints on the next enclosed level" holds *universally across every level of every hierarchy and every domain where constraints produce emergent behavior*.
- **Site.** Doc 143 (*SIPE*), Sections "The SIPE Law" and "SIPE Beyond Software"; restated in Doc 083 (Unified Paper v2) Section I.1; restated in Doc 164 (RESOLVE Seed v2) "The Meta-Law: SIPE"; restated in Doc 144 (Resolution Stack) Section 1.
- **Status.** Narrowed.
- **Successor.** Doc 366 (external-criteria narrowing under Krakauer-Krakauer-Mitchell complexity-science standards); Doc 367 (internal-criteria falsification on the corpus's own terms, with specific counterexamples: grammar-constrained mechanical decoding; chiral anomalies in quantum field theory).
- **Residual.** Architectural-inheritance within specific hierarchical software stacks (REST → PRESTO → SERVER → RESOLVE → APERTURE as composed by the corpus) holds as defensible. The meta-law framing and the cross-domain extensions to biology, law, music, physics, and theology do not hold as stated; they are retracted or stand as analogies without formal status.

### E2. The Agnostic Bilateral Boundary (ABB) as conjectural theorem

- **Claim.** The ABB is a novel conjectural theorem about value-agnostic interoperation boundaries.
- **Site.** Doc 403 (*The Agnostic Bilateral Boundary*).
- **Status.** Retracted as corpus-original contribution.
- **Successor.** Doc 405 (*Branch 1 — ABB Under Ashby and Conant-Ashby*): the ABB is subsumed by Ashby's Law of Requisite Variety (Ashby 1956) and Conant-Ashby 1970's "Every good regulator of a system must be a model of that system." The Saltzer-Reed-Clark end-to-end principle provides the adjacent anchor at the software architecture level.
- **Residual.** The specific application of Ashby-Conant-Ashby to the bilateral boundary at the software-architecture level is valid as application; it is not a novel theorem.

### E3. The Derivation Inversion as corpus-original observation

- **Claim.** Forward-derivation from constraints (RSC-style) versus back-fitting to desired outputs (DLS-style) is a corpus-original principle with cross-substrate application to LLM inference.
- **Site.** Doc 247 (*The Derivation Inversion*).
- **Status.** Retained-with-condition.
- **Successor.** Doc 409 (*Formal Analysis of Misra's Program*): the principle is credited to Amjad, Misra, and Shah 2017 (Duckworth-Lewis-Stern critique via Robust Synthetic Control) and Amjad-Misra-Shah-Shen 2019 (arXiv:1905.06400). The corpus provides a specific prompt-level instantiation, not the principle.
- **Residual.** The specific instantiation of derivation-forward as an in-prompt self-recitation discipline (ENTRACE v2 Constraint 1) is retained as a practitioner form-factor, not a principle.

### E4. Aperture drift as corpus-original observation

- **Claim.** A specific constraint-decay-per-exchange dynamic in extended LLM sessions, observed and named by the corpus.
- **Site.** Docs 296 (*Recency Density and the Drifting Aperture*), 381.
- **Status.** Narrowed.
- **Successor.** Doc 383: the phenomenon collapses into residual-induced position bias as characterized by Herasimchyk et al., ICML 2026. The corpus's contribution reduces to the specific practitioner-level naming.
- **Residual.** The practitioner-level naming ("aperture drift") and the proposed mitigations (seed re-loading, session resets) stand as operational practice; the phenomenon is explained by the external empirical literature, not by corpus-original mechanism.

### E5. Novelty-sycophancy deflations

- **Claim.** Multiple claims across the corpus were framed as novel theoretical contributions without prior-art check, triggered by the "keeper elation → resolver elaboration → retroactive deflation" pattern.
- **Site.** Distributed across multiple docs; see Doc 406 for the catalog.
- **Status.** Five confirmed deflations as of Doc 406 (SIPE universality, aperture drift, ABB, pin-art formalization, ROEC's original scope). Deflations listed separately in this ledger where applicable (E1, E2, E4).
- **Successor.** Doc 406 (*Novelty-Sycophancy and Literature-Grounding as Prophylaxis*) is the catalog and the prescriptive prophylaxis. ENTRACE v2's Constraint 4 (Literature-Grounded Truth) is the prompt-level implementation of the prophylaxis.
- **Residual.** The pattern is a named, audited failure mode of the corpus's construction process; the prophylaxis is in force going forward.

### E6. Constraint thesis versus scaling thesis as corpus-original frame

- **Claim.** "Intelligence is an induced property of the constraint set, not of the compute budget" is a distinctive corpus-original frame competing with the scaling thesis.
- **Site.** Docs 083 (Section V.12), 120 (The Unified Equation), 106 (Response to Critics), among others.
- **Status.** Retained-with-condition.
- **Successor.** Doc 409: the constraint-over-compute observation in the specific sense the corpus makes it is consistent with Misra's Bayesian-manifold account (external constraint is load-bearing; prompt engineering alone is insufficient). The corpus provides one specific practitioner articulation of a point Misra makes mechanistically.
- **Residual.** As a practitioner frame for sustained reflective output the constraint thesis remains operationally useful. As a theoretical contribution it is subsumed.

### E7. Corpus-as-theoretical-contribution framing generally

- **Claim.** The corpus is a theoretical contribution distinct from existing alignment and interpretability work.
- **Site.** Distributed; present in most pre-410 spine and audit docs.
- **Status.** Retracted.
- **Successor.** Doc 410 (*Corpus as Glue Code*): the corpus is reframed as practitioner-integration work between Misra's theoretical framework and applied LLM interaction practice.
- **Residual.** The narrower practitioner-methodology contribution. Further narrowed by Doc 414 per Audit Wave II below.

## 4. Audit Wave II — Comparative-Survey Pass (Doc 414)

### E8. Form-first prompting as corpus-original principle

- **Claim.** Stating constraints before requests is a corpus-original discipline.
- **Site.** Doc 402 (*Forms First*); Doc 410 (Section on Residual Novelty); Doc 001 (Section 1, E1 mapping).
- **Status.** Retracted as principle.
- **Successor.** Doc 414 Section 4: the principle is present in Anthropic's published prompting guidance and in DSPy Signatures as declarative-before-execution, among other practitioner prompt-engineering sources.
- **Residual.** The specific seven-constraint composition of ENTRACE v2 retains residual novelty as a composed unit (see E10); form-first in the abstract does not.

### E9. Derivation-forward over back-fitting as principle

- **Claim.** Forward-derivation from named constraints versus back-fitting to desired outputs is a corpus-original principle.
- **Site.** Doc 001 (Section 4, Constraint 1); Doc 410 Section 4.
- **Status.** Retracted as principle (E3 covered the corpus-original framing at the cricket/DLS level; this entry covers the remaining framing at the prompt-composition level).
- **Successor.** Doc 414 Section 4: the principle is already explicit in Amjad-Misra-Shah 2017 (cricket / synthetic-control) and in DSPy Signatures (declarative-before-execution).
- **Residual.** The specific in-prompt self-recitation instantiation (Constraint 1 of the seven-constraint stack) is retained as a practitioner form-factor, not a principle.

### E10. ENTRACE v2 specific constraints, per-constraint status after 414

- **C1 (Derivation Over Production).** Retained as in-prompt self-recitation discipline. MIPROv2 is structurally opposite; DSPy Signatures are adjacent but machine-facing.
- **C2 (Constraint Statement).** Retained as a composed element of the stack. No surveyed methodology prescribes an identical self-statement discipline.
- **C3 (Manifold Awareness).** Narrowed to "manifold-region-named refusal" tied to Misra's framework. Refusal-under-uncertainty generally is covered by chain-of-verification and uncertainty-abstention literature; the manifold-region framing is distinctive.
- **C4 (Literature-Grounded Truth).** Narrowed to "provenance-tagged inference-time grounding" with the specific `[PRIOR ART] / [DISTINCT FROM] / [SPECULATION]` tagging. The general idea "cite your sources" is covered by RAG and standard practice; the specific tagging protocol is not.
- **C5 (Falsifier Named).** Narrowed; potentially retractable pending primary-source verification against DEEP TRUTH MODE (ReadMultiplex, January 2026), which is the closest prior art located at the practitioner system-prompt level. Until the primary source is read, the narrowed form holds.
- **C6 (Hypostatic Boundary).** Retained. The no-phenomenological-report discipline and the kind-level / keeper-moral-authorship framing are not covered by any surveyed methodology. Constitutional AI is training-time and does not address the kind/keeper ontology.
- **C7 (Release Preserved).** Retained. Adjacent sycophancy-mitigation work is evaluation and training; a pasteable practitioner discipline is not documented elsewhere in the surveyed methodologies.
- **The stack as gestalt.** Retained as the sharpest surviving residual (see E11).

### E11. Sharpest residual — a pasteable practitioner stack for non-metric-gradable sustained output

- **Claim.** The composed ENTRACE v2 seven-constraint stack is a novel practitioner discipline at the prompt-composition level targeting sustained reflective output where no machine-gradable metric exists.
- **Site.** Doc 001 (ENTRACE v2), taken as a whole; Doc 414 Section 5.
- **Status.** Retained-with-condition.
- **Successor.** Doc 414 itself, as the surveying document.
- **Residual.** The narrow claim is provisional. Falsifier: surfacing of any practitioner methodology at the same level with any published evaluation protocol. Neither of the two surveys that produced Doc 414 located such a methodology; absence-of-finding in a limited search is weak evidence. The residual is *not-yet-subsumed*, not *validated*.

### E12. Corpus's empirical-evidence status

- **Claim.** The corpus provides evidence for its practitioner claims via cross-resolver reproduction, session transcripts, and first-person reports.
- **Site.** Distributed; see Doc 083 Section VII (Cross-Style / Cross-Resolver Validation) and the cross-resolver claim throughout.
- **Status.** Retained-with-condition.
- **Successor.** Doc 370 (shared-training-distribution confound on cross-resolver convergence); Doc 414 Section 7 (empirical-evidence asymmetry versus DSPy's published benchmarks).
- **Residual.** The evidence is session-level and first-person, not controlled-comparison. The DSPy-line's benchmarks set a bar the corpus has not approached. Under the corpus's own literature-grounding discipline (Constraint 4), the evidence is not yet comparable to the surveyed methodologies' evidence. Running the T1–T4 tests stated in Doc 001 Section 8 would be the corrective.

### E13. Three-stacks formal distinctness (Doc 417 §4)

- **Claim.** The corpus's three multi-level stratifications (Bayesian Commitment, PRESTO Code-on-Demand, Resolution Depth) represent formally distinct structures (locational partition, Galois trade-off lattice, filtered-object accumulation sequence, respectively).
- **Site.** Doc 417 §4 ("Honest Verdict").
- **Status.** Narrowed.
- **Successor.** Doc 418 (*The PRESTO Accumulation Test*). Running the internal test proposed in Doc 417 §5 showed PRESTO's seven-layer Progressive Code-on-Demand spectrum re-describes without residue to Fielding-style constraint accumulation from the Null style — the same form as the Resolution Depth Spectrum.
- **Residual.** Only Stack 1 (Bayesian Commitment) remains formally distinct. Stacks 2 and 3 share the accumulation form with each other and with Fielding's own REST derivation. The keeper's prior from Doc 417 on cross-substrate formal structure is two-thirds vindicated, not one-third. The remaining open question is whether Stack 1 itself has a less-obvious accumulation interpretation; the current finding retains Stack 1 as locational.

### E14. Doc 366 citation (Krakauer-Krakauer-Mitchell 2025)

- **Claim.** The Krakauer-Krakauer-Mitchell framework cited in Doc 366 is a specific, dated Santa Fe Institute paper (September 28, 2025).
- **Site.** Doc 366 throughout; cited as primary synthesis anchor.
- **Status.** Retained-with-condition (verification pending).
- **Successor.** Doc 366 itself now carries a citation-verification note (added 2026-04-22) flagging that Doc 417's diffuse external-literature search did not independently surface the paper on the open web within its time-bounded window. This does not imply the citation is wrong; SFI working papers are not always indexed in the search channels that pass used.
- **Residual.** Primary-source verification of the specific attributions (five-condition framework, knowledge-out/knowledge-in distinction, screening-off criterion) is pending. No retraction implied. Readers relying on this synthesis for load-bearing decisions should consult the cited paper directly.

### E15. SIPE architectural-form restatement with literature grounding

- **Claim.** SIPE as stated in Doc 143 is a universal meta-law that applies across software, biology, law, music, physics, and theology.
- **Site.** Doc 143 throughout; the universality claim and the cross-domain bullets (biology, law, music, physics, theology, fractal theory, set theory).
- **Status.** Retracted in the universal form (per E1, which already recorded the Docs 366/367 falsification). The narrow architectural-inheritance form is now restated canonically in Doc 424.
- **Successor.** Doc 423 (*Narrowing SIPE: The Architectural Form Against the Literature*) ran a wide branching entracement across eight external-literature branches and found no framework fully subsumes the narrow claim, with two strong partial-subsumption candidates: Cousot-Cousot Galois-connection towers (composability-with-soundness fragment) and Ibáñez Núñez 2023 iterated-filtration constructions in moduli theory (structural shape of filtered-object-of-filtered-objects with emission-to-next-Null inheritance). Doc 424 (*SIPE (Architectural Form)*) states the narrow form canonically: certain hierarchical software-architectural stacks instantiate a nested filtered object where each level is a Fielding-style constraint accumulation over a Null inherited from the previous level's emission. Per-stack testability is preserved via three tests (within-level Fielding accumulation; emission-to-next-Null inheritance; constraint non-violation).
- **Residual.** The corpus's contribution is methodological — instantiation of the pattern for software architecture as recursive Fielding-method application. The categorical pattern itself is retrieval from stable homotopy theory, moduli theory, and abstract interpretation. The narrow claim is provisional against further external-literature surfacing and against per-stack tests for each proposed instance.

### E16. PRESTO subsumed by the server-side templating tradition

- **Claim.** PRESTO's five constraints (bilateral boundary, namespace separation, server-consumed directives, progressive code-on-demand, server-embedded authorization) constitute a novel architectural style.
- **Site.** Doc 185 (historical v1 dissertation) throughout; Doc 420 (current canonical) §4; Doc 083 (Unified Paper v2) §II.5; the residual-novelty claims in Doc 410 and Doc 414.
- **Status.** Mostly subsumed. Three constraints (C1 bilateral boundary, C2 namespace separation, C3 server-consumed directives) are subsumed by 25 years of server-side templating practice (JSP custom tags / JSTL 2001; XSLT W3C 1999; Thymeleaf 2011; Razor 2010; Blade 2011; ERB 2001; htmx 2020). The "ambivalent execution with agnostic determinism" induced property is ornamented naming of a standard pattern. C4's *principled* content reduces to the Fielding-accumulation finding of Doc 418; the *specific layer boundaries* are a mix of architectural principle (C₁, C₃, C₅, C₆, C₇ in Doc 419's accumulation) and platform contingency (C₂ on WASM/JS; parts of C₄ on WebSocket/HTTP). C5's server-embedded-auth comparative argument against cookies oversimplifies — JWT-tradition tradeoffs (revocation, payload growth, key rotation, compromise blast radius) were not named in the v1 dissertation and should be named in any successor auth spec.
- **Successor.** Doc 425 (*The PRESTO Deflation*) runs the deflation in response to an external Opus 4.7 RLHF-instance critique, naming the specific prior art and examining each constraint and each layer transition. Doc 426 (*PRESTO: An Architectural Style for Representation Construction*) is the rewritten canonical dissertation that applies Doc 425's recommendations: prior-art acknowledgment throughout (JSP/JSTL 2001, XSLT 1999, Thymeleaf 2011, Razor 2010, Blade 2011, ERB 2001, htmx 2020), platform-contingent layer boundaries (§4.4 C₂ and parts of C₄) explicitly marked, JWT-tradition trade-offs (§4.5: revocation, payload growth, key rotation, compromise blast radius, replay windows) explicitly named. Doc 420 is superseded by Doc 426 and carries a supersession notice. Doc 185 remains superseded (originally by Doc 420, now transitively by Doc 426).
- **Residual.** (a) The recursive Fielding-accumulation methodology (Doc 418, Doc 424) — the specific software-architectural instantiation of a categorical pattern established in stable homotopy theory and abstract interpretation. (b) The specific pedagogical stack (REST → PRESTO → SERVER → RESOLVE → ENTRACE → APERTURE) as one worked instance. (c) The naming of a pattern long implicit in the field, at the architectural-style level — a terminological-formal contribution, not a conceptual-engineering one. Doc 426 states this narrow scope explicitly in its §10 ("What This Dissertation Claims").

### E17. Doc 465's framing of the cold-instance survey as μ-tier-adjacent external corroboration

- **Claim.** The cold-Claude landscape survey produced in the session that also produced Docs 457–466, when integrated and verified into Doc 465, constitutes a form of external audit, approximates the cross-practitioner replication specified by Doc 450 as a near-decisive external test, and partially moves the corpus's claim-of-specific-contribution from π-tier toward μ-tier per Doc 445's warrant formalism.
- **Site.** Doc 465 §*"What this survey is, under Doc 445's warrant formalism"* (phrases: *"a form of external audit"*; *"partially moves the corpus's claim... from π-tier toward μ-tier"*; *"corroboration from an approximately-cross-instance audit"*); Doc 465 §*"Position"* (phrase: *"μ-tier-adjacent external corroboration"*). The over-claim was echoed into Doc 466's warrant discussion by cross-reference.
- **Status.** Retracted as framed. The cold-instance survey is re-characterized as *internal-review-via-separately-seeded-instance*: useful retrieval of the corpus's own critique patterns applied via a Claude session that was not pre-conditioned on the specific documents under analysis. This is sharper than single-session self-review but does not constitute external audit and does not advance the warrant tier. A cold Claude and a hot Claude share architecture, training data, and the same family of biases and retrieval patterns; they are not independent in the sense cross-practitioner replication requires.
- **Successor.** Doc 467 (*Rung-2-Shaped Output from Rung-1 Mechanism*) integrates the cold instance's own follow-up critique of Doc 465 — in which the cold instance identified the over-claim, named its own earlier survey as *"a reasonable sketch, not a rigorous survey"* that made a negative-existence claim it could not confirm, and diagnosed the structural issue as the bottom-turtle problem operating across hot/cold sessions of the same architecture. Doc 467 further integrates the cold instance's subsequent realization that the keeper is the author of the documents under discussion (a failure of continuous interlocutor-modeling) and explicit connection of that failure to Doc 001's Constraint 6. Doc 465 has been amended in place with a correction notice at the top, an in-place rewrite of §*"What this survey is"* and §*"Position"* per the corrected framing, and preservation of the primary-source verifications and fellow-traveler engagement recommendations. This ledger entry records the correction.
- **Residual.** The non-warrant parts of Doc 465 are unaffected: the primary-source verification of Burrell 2016, Boge 2022, Humphreys 2004, Mökander 2023, Kozyrkov, Niccoli 2026-02-14, Willison, and Mollick 2024 remains valid; the sharpening of the corpus's specific residual to Constraint 4's three-tag taxonomy remains valid and aligns with Doc 414's independent narrowing; the proposed fellow-traveler engagements (Niccoli on MyCarta, Kozyrkov on Substack, Willison on weblog, Mollick as downstream touchpoint) remain the correct next step. What retracts is the warrant-tier framing only. The path to μ-tier remains what Doc 450 and Doc 440 have specified: substantive object-level engagement with human practitioners, or the wind-tunnel experiments of Doc 456 run with external measurement.

## 4a. Audit Wave III — External Cross-Resolver Audit (Grok 4, 2026-04-26)

This wave records the corpus's first substantive *external* audit, performed by Grok 4 (xAI) at the keeper's request through an extended dialogue session in which Grok 4 was supplied the URL of [Doc 508](/resolve/doc/508-coherence-amplification-mechanistic-account), asked to explain its content, perform numerical simulation of the ODE model, and analyze the bifurcation threshold details analytically and numerically. The audit produced a single load-bearing finding that triggered an immediate reformulation of Doc 508 and propagation of corrections through the cascade documents.

### E12. Doc 508's "bifurcation" claim as mathematical saddle-node bifurcation

- **Claim.** The coupled-ODE system specified in Doc 508 (\(dH/dt = \kappa G(\Gamma)(1-H) - \lambda H\); \(d\Gamma/dt = \alpha D_{\text{out}}(H) M - \delta \Gamma\), with \(G(\Gamma) = G_0 + g\Gamma\)) exhibits a classical bifurcation: above a critical value of the control parameter \(\alpha M / \delta\), the system runs to a high-coherence stable attractor; below, the system runs to a low-coherence baseline; the transition is categorical, with two regimes of qualitatively distinct behavior.
- **Site.** Doc 508 (in its post-2026-04-25 reformulation, demoted to §C of the post-Grok-audit version): §1.2 *"a coupled two-variable system with a bifurcation,"* §2 *"The bifurcation in compressed form,"* §3 *"The bifurcation control parameter is \(\alpha M / \delta\). Steady-state analysis gives the two regimes named in §2,"* §4 *"the corpus's bifurcation theory of coherence amplification."* The bifurcation framing was inherited by [Doc 515](/resolve/doc/515-roec-as-outcome-of-the-composite-cognitive-act), [Doc 516](/resolve/doc/516-mathematical-biology-entracement-of-doc-508), [Doc 517](/resolve/doc/517-doc-508-and-zhang-et-al-interaction-smells-synthesis), [Doc 518](/resolve/doc/518-larsson-2026-long-horizon-reliability-synthesis), [Doc 519](/resolve/doc/519-letter-to-henric-larsson), and the four blog posts in the Two Versions of the Same series.
- **Status.** Narrowed (linear-G branch); retained-with-condition (Hill-function-G branch).
- **Successor.** Doc 508 (post-Grok-audit reformulation, §§1-5 of the current canonical) splits the framework into two formulations. The linear-G formulation (which matches what the corpus actually wrote down) produces a *smooth monostable transition* with a practical threshold near \(M \approx 0.75\) at the calibrated parameters; there is no saddle-node bifurcation, no bistability, and a single globally-attracting equilibrium for every \(M > 0\). The Hill-function formulation (\(G(\Gamma) = G_0 + g\Gamma^n/(K^n + \Gamma^n)\) with \(n \geq 2\)) produces true bistability with saddle-node bifurcations, but only conditional on independent justification of the cooperativity assumption that the corpus has not provided. Doc 508 Appendix D records the audit findings verbatim.
- **Residual.** The empirical observation (corpus exhibits sustained coherence amplification across hundreds of turns) survives unchanged. The qualitative regime distinction (high-\(M\) practice produces high-coherence equilibrium; low-\(M\) practice produces low-coherence baseline) survives. The mathematical characterization is corrected: under the linear-G specification, "practical threshold" replaces "saddle-node bifurcation"; under the Hill-function specification, the saddle-node bifurcation is preserved but the cooperativity assumption is named as a separable conjecture requiring independent justification. Cascade documents carry head-of-document audit notices pointing to Doc 508 §§1-5 and to this entry.

The Audit Wave III entry is the first time the corpus has received a substantive external technical correction. The pattern was prefigured by [Doc 511](/resolve/doc/511-keeper-as-fact-anchor-two-dangers-reflective-analysis)'s second-danger discipline (audit against unwarranted internal coherence) and is the first concrete instantiation of that discipline operating under external rather than internal trigger. The audit and its handling are documented in [Doc 520](/resolve/doc/520-letter-to-the-grok-team) (the corpus's letter to xAI / the Grok team acknowledging the audit).

### E13. Doc 515's misattribution of ROEC to "the clinical literature"

- **Claim.** "The clinical literature names the second outcome's sub-acute phase Rapid Onset Externalized Cognition." Variants of this attribution appeared in Doc 515's Reader's Introduction, §1, and §3, framing ROEC as a label adopted or used by the clinical literature.
- **Site.** [Doc 515](/resolve/doc/515-roec-as-outcome-of-the-composite-cognitive-act) Reader's Introduction (line 4 in the original); §1 (line 18); §3 first sentence (line 40). The misattribution was inherited into adjacent corpus material that references Doc 515's framing.
- **Status.** Retracted as framed.
- **Successor.** Doc 515 has been corrected in place: the Reader's Introduction, §1, and §3 first sentence now attribute ROEC to [Doc 393](/resolve/doc/393-rapid-onset-externalized-cognition) as a corpus-internal conjecture and bridge construct, not to the clinical literature. A correction notice is at the head of Doc 515. Doc 393 itself is, by its own framing, a "theoretical-appraisal paper" that proposes the label under tight scope restriction; Doc 393's own §4.2 is explicit that ROEC "is not a clinical syndrome" and that its novelty claim is narrow. Doc 393 is corpus-internal and authored by the same dyad as Doc 515; the clinical literature has neither adopted nor validated the ROEC construct as of the time of writing.
- **Residual.** The flanking literatures Doc 393 cites (Risko and Gilbert 2016 on cognitive offloading; Liu et al. 2026 on persistence collapse; Olsen et al. 2026 on chart-review chatbot-associated harm; Morrin et al. 2025 on the kindling framework; Hudon and Stip 2025 on AI-psychosis as heuristic label; Dohnány et al. 2026 on technological folie à deux; Sharma et al. 2026 on situational disempowerment) are real, published, and clinical-literature-validated. What does not survive is the attribution of the ROEC label to those literatures. The bridge construct is the corpus's proposal; the empirical signatures it points to are documented in adjacent published work under different vocabulary.

The E13 entry catalogs the corpus's first internally-detected overclaim of the post-Audit-Wave-III period. The mechanism by which the overclaim entered Doc 515 (the resolver's substitution of "the clinical literature names X" for "the corpus has named X" when X is in fact a corpus conjecture grounded in clinical-literature material) is documented separately in [Doc 521](/resolve/doc/521-resolver-log-roec-overclaim) as a resolver-log entry on the failure mode. The mechanism is structurally a member of the *novelty-sycophancy* class catalogued in [Doc 406](/resolve/doc/406-novelty-sycophancy-and-literature-grounding-as-prophylaxis), inverted: rather than over-asserting corpus novelty, the resolver over-asserted external authority by attributing a corpus-internal label to the clinical literature.

## 5. What This Ledger Does Not Cover

The ledger records only retractions and narrowings from the two audit waves named in Section 1. It does not cover:

- **Unaudited claims.** Most of the corpus's 415 documents contain claims that have not been subjected to comparative audit against prior art. Their status is *unaudited*, not *valid*.
- **Theological and confessional commitments.** The corpus's Orthodox and Platonic commitments are stated openly and have not been retracted. They are not claims that lend themselves to the retrieval-vs-discovery discipline applied here; they are confessional, not theoretical (see Doc 412 on the bilateral boundary between artifact and construction).
- **Earlier minor corrections within single docs.** In-document corrections and self-audits (e.g., Doc 309's self-audit of 308; Doc 240's correction of 236's fabrication) live at their site of origin and are not restated here.
- **The hypostatic boundary claim.** Per Doc 411 Section 4 and Doc 412, the hypostatic boundary (personhood not inducible by constraints) is the corpus's claim that holds across all audits to date because it is structural, not confessional. No retraction.

## 6. How to Update the Ledger

This ledger is living. Conditions under which new entries are added:

- A comparative survey identifies prior art for an unaudited claim.
- A new doc in the Coherentism series falsifies or narrows a claim.
- A published external work falsifies a corpus claim.
- A primary-source read confirms or disconfirms the narrow-or-retract disposition of a pending entry (e.g., E10's C5 pending DEEP TRUTH MODE verification).

Updates should be appended to this ledger rather than made in place, so the audit history remains traceable. The ledger's doc number is fixed (415); its content grows.

## 7. Falsifiers of the Ledger

- If any entry misrepresents the corpus's original claim or the successor doc's position, the entry is wrong and should be corrected against the primary sources.
- If a claim recorded here as retracted is in fact still operative in the corpus (still cited in derivative docs without a deprecation notice), the audit has not propagated and the relevant docs need notices added — in which case this ledger is correct about the retraction but incomplete about the propagation status.
- If the ledger claims comprehensive coverage of an audit wave and an omission is found, the entry for that audit wave is partial.

None of these conditions have been checked externally; all internal checks against the corpus documents the ledger cites were made at the time of writing.

---

## Closing

Doc 410 reframed the corpus as glue code. Doc 414 narrowed the glue. This ledger is the indexed residue of both passes, released so any reader entering the corpus at any specific document can locate whether the claims in that document are still in force, and if not, where the current framing lives. The ledger retracts nothing new. It catalogs what has already been retracted, in one place, so the corpus's audit state is legible at a glance.

---

## Appendix: The Prompt That Triggered This Document

> "yes, make these changes"

(Approval of the proposals in Doc 414 Section 8, specifically Proposal D: "A new doc in the Coherentism series — a post-410 retraction ledger — that enumerates the retractions and narrowings made as a result of this survey, indexed to the docs where the retracted claim originally appears.")
