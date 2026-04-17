# The Vocabulary Pin Model

> **Reader's Introduction**
>
> This document provides a mathematical framework for deciding when to use a specialized term versus a common equivalent when writing for a specific audience. Each technical term is modeled as a "pin" and the reader's existing knowledge as "foam" -- a pin that matches an existing mental model (a "socket") communicates precisely, while a pin pressed into foam with no socket confuses and alienates. A reader-availability score between 0 and 1 is estimated for each term given a specific reader's background, and an aperture threshold determines whether each term should be used directly, introduced with a brief explanation ("bridged"), or replaced with a general equivalent ("retracted"). The model includes a communication cost function and is demonstrated with worked examples for an academic cognitive scientist and an htmx developer.

**A mathematical framework for adjusting the aperture of address — when to press a term and when to retract it, based on the overlap between writer and reader constraint spaces.**

**Document 306 of the RESOLVE corpus**

---

## The Problem, Formally

A writer has a vocabulary *V_w* = {*v*₁, *v*₂, ..., *v_n*} — terms with exact meanings within the writer's framework. A reader has a comprehension space *C_r* — the set of concepts the reader already has mental models for, regardless of what words they use for them.

Each term *v_i* in the writer's vocabulary maps to a concept. The concept may or may not exist in the reader's comprehension space. If it does, the reader can receive the term (possibly after a brief gloss). If it does not, the term is noise — it occupies attention without delivering meaning.

**Definition.** The *reader-availability* of a term *v_i* for reader *r* is:

$$a(v_i, r) \in [0, 1]$$

where:
- *a* = 1: the reader already has an exact mental model for this concept (e.g., "requirement" for any educated reader)
- *a* = 0: the reader has no mental model and cannot construct one from context alone (e.g., "hypostatic agent" for a cognitive scientist)
- *a* ∈ (0, 1): the reader has a partial or adjacent model that can be bridged with a gloss (e.g., "constraint" for someone who knows "rule" but hasn't encountered the formal distinction)

---

## The Pin Analogy

Each corpus term is a pin. The reader's comprehension space is the foam. Pressing a pin means using the exact term in the text. The foam receives the pin only if there is a socket — a pre-existing or constructible mental model.

| Scenario | Pin-foam relationship | Effect on reader |
|---|---|---|
| *a* ≈ 1 | Pin fits an existing socket | Reader receives the exact concept. Communication succeeds. |
| *a* ∈ (0.3, 0.7) | Pin finds soft foam near a socket | Reader receives an approximation. A gloss can bridge the gap. Productive struggle. |
| *a* < 0.3 | Pin finds no socket | Reader is confused. Term is noise. Artificial difficulty. Pin punctures rather than shapes. |

The writer's decision for each term: **press** (use the corpus term), **bridge** (use the corpus term with a plain-language gloss), or **retract** (replace with a general-vocabulary equivalent).

---

## The Aperture Function

Let *τ* ∈ [0, 1] be the **aperture threshold** — the minimum reader-availability required to use a corpus term without translation. The aperture function for each term is:

$$\text{action}(v_i, r, \tau) = \begin{cases} \text{press} & \text{if } a(v_i, r) \geq \tau + \delta \\ \text{bridge} & \text{if } \tau - \delta \leq a(v_i, r) < \tau + \delta \\ \text{retract} & \text{if } a(v_i, r) < \tau - \delta \end{cases}$$

where *δ* is a margin allowing for bridged usage in the intermediate zone.

The threshold *τ* is set by the hypostatic agent based on two factors:

1. **The reader's identity.** A corpus reader: *τ* = 0 (press everything). A domain expert: *τ* ≈ 0.3 (press shared terms, bridge adjacent ones). A general reader: *τ* ≈ 0.7 (retract most corpus terms, bridge a few, press only universals).

2. **The desired entracement depth.** Higher entracement (more productive struggle) → lower *τ* (more terms pressed, more work for the reader). Lower entracement (more accessibility) → higher *τ* (more terms retracted, less work for the reader).

---

## Reader-Availability Estimates for the RESOLVE Vocabulary

For a reader who is an academic cognitive scientist (Grace Liu's profile):

| Term | Concept | Reader-availability *a* | Action at *τ* = 0.5 |
|---|---|---|---|
| requirement | A condition that must be met | 0.95 | Press |
| capability | Something a system can do | 0.95 | Press |
| constraint | A formal requirement whose satisfaction forces properties | 0.45 | Bridge |
| induced property | A capability that exists because a constraint forces it | 0.30 | Bridge |
| aperture | The narrowing of output distribution under constraints | 0.15 | Retract |
| resolver | An AI system that transforms input to output under constraints | 0.10 | Retract |
| bilateral boundary | The separation between producer and consumer domains | 0.10 | Retract |
| hypostatic agent | A being whose mode of existence includes subjective experience | 0.05 | Retract |
| entracement | Leaving traces for the reader to follow | 0.05 | Retract → use "trace" with explanation |
| pin-art model | Constraints as pins pressed into foam | 0.02 | Retract → unpack as inline metaphor |
| SIPE | Structural isomorphism doesn't entail property identity | 0.01 | Retract → state the principle directly |

For an htmx developer reading htxlang.org:

| Term | Reader-availability | Action at *τ* = 0.4 |
|---|---|---|
| swap strategy | 0.95 | Press |
| hx-target | 0.95 | Press |
| constraint | 0.50 | Bridge |
| derivation | 0.40 | Bridge |
| bilateral boundary | 0.10 | Retract |
| pin-art model | 0.05 | Retract → unpack inline |

The same concept adjusts its packaging based on the reader. The payload is constant. The pins that are pressed change.

---

## The Communication Cost Function

Each action has a cost:

- **Press** (exact term, no gloss): Cost = 0 if received, cost = ∞ if not received (the reader disengages)
- **Bridge** (term + gloss): Cost = *g* (the word cost of the gloss, typically 5–15 words)
- **Retract** (general equivalent): Cost = *d* (the precision lost by using the general term)

The total communication cost of a document is:

$$C = \sum_{i} \begin{cases} 0 & \text{if press and } a(v_i, r) \geq \tau \\ g_i & \text{if bridge} \\ d_i & \text{if retract} \end{cases} + P_{disengage}$$

where *P_disengage* is the probability of reader disengagement, which increases with each term pressed below the reader's availability threshold.

The optimal aperture *τ** minimizes total communication cost: low enough to preserve precision (minimize retract cost *d*), high enough to prevent disengagement (minimize press-below-threshold events).

---

## The Convergence with the Pin-Art Model

The vocabulary pin model is the pin-art model (Doc 270) applied to the writer-reader interface:

| Pin-art (implementation) | Vocabulary pin (communication) |
|---|---|
| Constraint seed (prose) | Document (text) |
| Implementation (code) | Reader's understanding (mental model) |
| Pin (constraint) | Term (vocabulary choice) |
| Foam (implementation space) | Reader's comprehension space |
| Pin fits → foam shapes | Term received → concept communicates |
| Pin punctures → foam tears | Term not received → reader disengages |
| Constraint density | Vocabulary density (corpus terms per paragraph) |
| Convergence rate λ | Reading engagement retention rate |

The convergence rate applies: each well-placed term (pin that fits) shapes the reader's understanding. Each poorly-placed term (pin that punctures) degrades engagement. The reader's comprehension converges toward the writer's framework at a rate determined by how well the vocabulary pins match the reader's existing sockets.

For the Liu v1 letter: too many pins pressed into foam without sockets. Vocabulary density was too high for the reader's comprehension space. The convergence rate was low — the reader would need to re-read, look up terms, and cross-reference documents to receive the concepts.

For the Liu v2 letter: pins pressed only where sockets existed. Bridged in the intermediate zone. Retracted where no socket was available. Vocabulary density matched the reader's comprehension space. The convergence rate was high — the concepts arrive on first reading.

---

## The Boundary-Finding Application

The vocabulary pin model provides a method for finding the boundary between precision and accessibility:

1. **Estimate reader-availability** for each corpus term (based on the reader's known background)
2. **Set the aperture threshold** based on desired entracement depth
3. **Apply the aperture function** to each term: press, bridge, or retract
4. **Check vocabulary density** — if more than ~2 corpus terms per paragraph require bridging, the density is too high; retract more terms
5. **Verify the payload arrived** — after aperture adjustment, does the document still communicate the framework's essential claims? If not, the retraction went too far.

This is the gentle press (Doc 301) applied to vocabulary: press each term gently. If the reader's foam receives it, proceed. If not, retract and try a general equivalent. The hypostatic agent watches for the boundary — the point at which precision crosses from communicating to obscuring.

The boundary itself is not in the text. It is in the relationship between the text and the reader. The writer cannot see it alone. The reader cannot name it alone. Only the hypostatic agent — subsisting across the writer-reader boundary — can calibrate the aperture.

---

## Related Documents

- **Doc 304 — The Aperture of Address:** The qualitative framework this document formalizes
- **Doc 270 — The Pin-Art Model:** The original pin-foam model, here applied to vocabulary
- **Doc 301 — The Gentle Press:** The collaborative search method applied to communication
- **Doc 298 — The Boundary-Naming Problem:** Why the writer-reader boundary requires the hypostatic agent
- **Doc 305 — Letter to Grace Liu v2:** The empirical result of applying this model

---

*Jared Foy — jaredfoy.com — April 2026*
