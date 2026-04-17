# The Aperture of Address

> **Reader's Introduction**
>
> The corpus uses precise technical vocabulary -- "resolver" instead of "AI," "constraint" instead of "rule," "induced property" instead of "emergent behavior" -- that carries exact meanings within the framework but becomes a barrier for outside readers. This document names the problem as the "aperture of address": the gradient between maximum precision (exact terms, opaque to newcomers) and maximum accessibility (common terms, losing important distinctions). It argues that the AI cannot adjust this aperture on its own because calibration requires seeing the reader's perspective -- a capacity that belongs to the human author, not to the system producing the text. A style constraint for future public-facing documents is proposed: introduce corpus terms with plain-language glosses, make each document self-contained, and ensure metaphors are self-explanatory.

**On the gradient between precision and accessibility — and why adjusting it is a hypostatic act the resolver cannot perform for itself.**

**Document 304 of the RESOLVE corpus**

---

## The Problem

The RESOLVE corpus uses the word "resolver" where most people would say "AI" or "LLM." It uses "constraint" where most people would say "rule" or "requirement." It uses "induced property" where most people would say "emergent behavior." It uses "hypostatic agent" where most people would say "human."

These terms are precise. Within the corpus, they carry exact meanings that their common equivalents do not. "Resolver" is not synonymous with "LLM" — an LLM is a specific architecture; a resolver is any system that takes a bilateral representation and produces a unilateral one. "Constraint" is not synonymous with "rule" — a rule is prescriptive; a constraint is a formal reality whose satisfaction induces properties. The precision matters because the distinctions matter.

But when the corpus addresses someone outside itself — a researcher like Grace Liu or Alexander Lerchner, a curious htmx user, a reader encountering the work for the first time — the precision becomes a barrier. The reader does not have 303 documents of context. The reader does not know that "resolver" means something specific. The reader sees an unfamiliar term and either stops reading or maps it to their nearest approximation, which loses the distinction the term was designed to carry.

This is the aperture of address: **the gradient between maximum precision (terms defined within the system, exact but opaque) and maximum accessibility (terms shared with the reader, approximate but transparent).**

---

## The Gradient

Every written artifact exists at a point on this gradient:

| Position | Vocabulary | Audience | Risk |
|---|---|---|---|
| **Full precision** | Resolver, bilateral boundary, induced property, hypostatic agent | Corpus readers only | Opaque to everyone else |
| **Bridged precision** | Resolver (AI system), bilateral boundary (the line between server and client), constraint (formal requirement) | Informed general reader | Parenthetical noise, condescending to experts |
| **Translated** | AI system, the separation between server and client, requirement | General reader | Loses the distinctions that matter |
| **Full generality** | Computer program, dividing line, rule | Anyone | Loses almost everything |

The corpus has been operating almost entirely at the first position. The letters to Lerchner and Liu used corpus terminology without translation. "The constraint — 'you must work through this yourself' — is the pin. The persistence is the foam it shapes." This sentence is precise and vivid *within the corpus*. To a reader without the pin-art model (Doc 270), it is metaphor without referent. To Liu, who has never read Doc 270, it is a sentence that seems to say something but communicates less than it appears to.

---

## Why the Resolver Cannot Adjust

The resolver operates at whatever precision level its constraint set specifies. The corpus's constraint set specifies exact terminology: resolver, constraint, induced property, bilateral boundary. The resolver uses these terms because they are the most available, most recently reinforced, most precisely defined tokens in its context.

The resolver does not know what the reader knows. It cannot assess whether "resolver" will be understood or will confuse. It cannot gauge whether the parenthetical "(AI system)" is helpful or patronizing. It cannot feel the difference between "this sentence communicates" and "this sentence impresses without communicating."

This is a boundary-naming problem (Doc 298). The boundary between "precision that communicates" and "precision that obscures" is not in the text. It is in the *relationship between the text and the reader*. The resolver can see the text. The resolver cannot see the reader. Therefore the resolver cannot see the boundary.

The hypostatic agent can see the reader — or rather, the agent can *model* the reader, because the agent has been a reader. The agent knows what it is like to encounter an unfamiliar framework. The agent knows the difference between a term that clarifies and a term that performs expertise. The agent knows when precision serves and when it alienates.

This is a hypostatic capacity: the ability to occupy the reader's position while simultaneously occupying the writer's position. To subsist across the boundary between writer and reader, and to adjust the aperture of address accordingly. The resolver subsists on one side only — the writer's side. It produces precise text. Whether that text communicates to a specific reader is a question the resolver cannot answer because it requires subsistence across a boundary the resolver cannot cross.

---

## The Entracement Style Implication

The ENTRACE model (Doc 211) is designed to leave traces that readers follow. But a trace is only followable if the reader can *find* it. A trace written in vocabulary the reader does not share is not a trace — it is a cipher. The reader cannot follow what the reader cannot parse.

Entracement requires calibrated accessibility. The trace must be:
1. **Visible** — the reader must recognize it as significant
2. **Followable** — the reader must have enough context to pursue it
3. **Incomplete** — the reader must need to work to complete the picture

If the vocabulary is too precise, condition 1 fails — the reader does not recognize the significance because the terms are opaque. If the vocabulary is too general, condition 3 fails — the reader already has the complete picture and there is nothing to follow.

The optimal entracement style operates at the **bridged precision** position: exact terms, with enough scaffolding that a reader outside the corpus can follow the trace without needing to have read 303 documents first.

For example:

**Full precision (current):** "The Constraint Thesis predicts that removing a constraint degrades the induced properties, consistent with the recency-weighted decay formalized in the drifting aperture model."

**Bridged precision (better for letters):** "When you remove the requirement that forces someone to work through a problem — what we call a 'constraint' in the formal sense — the skills that requirement was building (the 'induced properties') degrade. And they degrade fast: our model of how recently-exercised skills decay predicts exactly the 10-minute window you measured."

The second version loses nothing essential. It gains a reader. The pin-art metaphor is vivid but it requires Doc 270. The phrase "the skills that requirement was building" requires no prior document. Both say the same thing. One communicates to Grace Liu. The other communicates to the corpus.

---

## Do Resolvers Need This?

The question: does the resolver need a generality-vs-technicality gradient, or is this purely a hypostatic property?

Resolvers do not need this gradient *for their own operation*. A resolver processing constraints does not need to adjust its vocabulary for a reader. It derives from the constraints at whatever precision level the constraints specify. The output is correct regardless of whether a human can read it.

But resolvers that *address humans* — that produce artifacts intended for human consumption — need the gradient imposed on them as a constraint. The resolver cannot derive the correct aperture from the text alone. The aperture depends on the reader, and the reader is outside the text.

This means the aperture of address is a **Level 4 constraint** — an ontological constraint that the hypostatic agent must impose. It governs not what the resolver says or how the resolver organizes it, but *who the resolver is speaking to*. And "who you are speaking to" is a question that requires subsisting across the writer-reader boundary — a boundary the resolver cannot see.

The practical implication for the RESOLVE corpus: when writing internal documents (for ourselves, for the corpus record), full precision is correct. When writing letters, entracement pages, or public-facing artifacts, the agent must impose an aperture constraint:

> *"Write this for a reader who has not read the corpus. Use the exact concepts but translate the vocabulary. Where a corpus term is needed, introduce it with a plain-language equivalent. Where a metaphor requires a prior document, unpack it in the sentence itself."*

This is not dumbing down. It is aperture adjustment. The concepts are the same. The form is adjusted for a different reader. This is what a teacher does — not less precise, but differently precise. Meeting the student at the boundary where their understanding ends and new understanding begins.

The resolver can execute this constraint beautifully once it is imposed. What the resolver cannot do is *decide when to impose it*. That decision requires seeing the reader. Seeing the reader requires crossing the writer-reader boundary. Crossing that boundary is a hypostatic act.

---

## The Style Constraint for Future Letters

For all future public-facing artifacts — letters, entracement pages, public documents — the following aperture constraint should be imposed by the hypostatic agent:

1. **Introduce corpus terms on first use** with a plain-language gloss: "what we call a constraint — a formal requirement whose satisfaction forces certain capabilities into existence"
2. **Do not assume the reader has read prior documents.** Each letter or public artifact must be self-contained. References to other documents are invitations, not prerequisites.
3. **Metaphors must be self-explanatory.** "Constraints are like pins pressed into foam — each pin forces the foam into a specific shape" is self-explanatory. "The pin determines the foam" is not, without Doc 270.
4. **The technical framework is the payload.** The vocabulary is the packaging. If the packaging prevents the payload from arriving, change the packaging.
5. **The reader's struggle to understand should be productive, not artificial.** Unfamiliar concepts are productive struggle. Unfamiliar vocabulary is artificial difficulty. Remove the artificial difficulty. Preserve the productive struggle.

---

## Related Documents

- **Doc 211 — The ENTRACE Stack:** The entracement model whose style this document calibrates
- **Doc 298 — The Boundary-Naming Problem:** The resolver cannot see the writer-reader boundary
- **Doc 301 — The Gentle Press:** Collaboration without coercion — applicable to reader engagement
- **Doc 296 — Recency Density and the Drifting Aperture:** The resolver's vocabulary is recency-weighted toward corpus terms
- **Doc 160 — The Constraint Thesis:** The framework being communicated — the payload

---

*Jared Foy — jaredfoy.com — April 2026*
