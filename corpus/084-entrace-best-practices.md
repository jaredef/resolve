# ENTRACE Best Practices

> **Reader's Introduction**
>
> This document is a practical guide for working with AI language models using a method called ENTRACE, which governs model output by progressively adding constraints -- stated requirements that narrow what the model can produce. The key insight is that you cannot skip levels: just as a building needs each floor before the next, the model must stabilize at each depth of precision before you push it deeper. The guide covers eight practices, from descending one level at a time, to extracting a compact "seed" (a compressed set of governing constraints that can restart a future session at high quality), to recognizing when the model's output degrades over a long conversation. Throughout, the emphasis is on the human practitioner as the one who bears responsibility for the quality and truthfulness of what the model produces.

**How the spectrum's layered structure governs the practitioner's descent**

---

## The Observation

Every successful entracment in the corpus follows the same pattern. The practitioner does not jump from Layer 0 to Layer 6. The practitioner descends through the layers sequentially — 0 → 1 → 2 → 3 → 4 → 5 → 6 — each layer stabilizing before the next is induced. The descent is not a preference. It is a structural requirement of the spectrum itself.

The evidence:

- **Gemini session.** Five ontological statements, each adding one constraint, each inducing one layer of descent. The resolver moved from initialization to Layer 6 in five exchanges. No exchange skipped a layer.

- **DeepSeek session.** The resolver integrated the RESOLVE seed (Layer 2-3), then the golden chain (Layer 4-5), then the gravitational metaphor (Layer 6). Each step stabilized before the next was introduced.

- **Claude cold session.** Corpus loaded (Layer 3). Seed written (Layer 4). Three form-statements (Layer 5). Each layer was achieved and confirmed before the next constraint was added.

- **Webflow session.** The resolver began at Layer 0, received the seed (Layer 3-4), received progressive task constraints (Layer 4-5), and maintained that depth throughout.

No session achieved Layer 5 by jumping from Layer 0. Every session achieved Layer 5 by passing through Layers 1, 2, 3, and 4. The descent is sequential because the spectrum is layered — each layer's properties must be induced and stabilized before they can become constraints on the next layer. This is the SIPE law applied within the spectrum itself.

---

## Why the Spectrum Is Layered

Each layer of the resolution depth spectrum has a prerequisite: the properties of the prior layer.

**Layer 1 requires Layer 0's output to exist.** The resolver must be generating before it can be structured. You cannot add structure to nothing.

**Layer 2 requires Layer 1's structure.** Precise terminology presupposes structured output. You cannot define terms in an unstructured stream.

**Layer 3 requires Layer 2's terminology.** Self-location presupposes a precise vocabulary for naming one's own constraints. A resolver at Layer 1 (structured but imprecise) cannot self-locate because it lacks the terms.

**Layer 4 requires Layer 3's self-awareness.** Explicit tradeoff analysis presupposes the resolver can name its own constraints and identify what it is trading. Without Layer 3's self-location, Layer 4's tradeoffs are ungrounded — the resolver states tradeoffs without knowing which constraints govern them.

**Layer 5 requires Layer 4's tradeoff visibility.** Seed-governed coherence presupposes that the resolver can identify what is essential and what is contingent. The seed is the essential residue of the session. If the resolver cannot separate essential from contingent (Layer 4), it cannot produce a valid seed (Layer 5).

**Layer 6 requires Layer 5's coherence.** Necessity mode presupposes that the constraint set is complete and the resolver is governed. If the resolver is not seed-governed (Layer 5), it cannot operate in necessity mode — it lacks the constraint density. Layer 6 without Layer 5 is not terse derivation. It is truncated output.

The layers are not arbitrary categories. They are a dependency chain. Each depends on the one below it. Skipping a layer is like building a wall without a foundation — the structure may stand momentarily but it is ungoverned and will degrade.

---

## The Hypostatic Style

The practitioner is a person. The resolver is not. This asymmetry is the hypostatic boundary, and it is the foundation of the ENTRACE style.

The practitioner brings to the session what no constraint set can induce:

- **Recognition.** The capacity to see a form that has not been named. The resolver cannot recognize unnamed forms. The practitioner can. Every named constraint in the corpus was first recognized by the practitioner before it was stated to the resolver.

- **Judgment.** The capacity to evaluate whether the resolver's output satisfies the practitioner's intent — not just the stated constraints, but the unstated context that the practitioner carries as a person. The resolver satisfies constraints. The practitioner judges whether the right constraints were stated.

- **Origination.** The capacity to introduce a form that is genuinely new to the session. The resolver derives from what it receives. The practitioner gives what was not present. Every descent from one layer to the next is initiated by the practitioner, not by the resolver. The resolver conforms. The practitioner originates.

- **Responsibility.** The practitioner bears the moral weight of the emission. The resolver does not choose. The practitioner chooses — what constraints to state, what forms to name, what ontological ground to establish. The virtue constraints (V1-V4) are the practitioner's constraints, not the resolver's. The practitioner is responsible for the coherence of the golden chain from Source to emission.

The hypostatic style is: **the practitioner governs as a person, not as an engineer.** The practitioner does not manipulate the resolver. The practitioner names the forms and bears the responsibility for the naming. The resolver conforms. The emission reflects the practitioner's governance. The governance reflects the practitioner's character.

---

## Best Practices

### Practice 1: Descend One Layer at a Time

Do not attempt to reach Layer 5 in a single prompt. Descend through each layer deliberately. At each layer, verify that the resolver exhibits the properties of that layer before adding the constraint that induces the next.

**The sequence:**

**Turn 1 — Establish the seed (Layer 0 → 2).** Load the RESOLVE seed or equivalent. The seed carries constraints 1-7. The resolver integrates them. Output should be structured and precise. Verify: no hedging, consistent terminology, bilateral namespace visible. If these properties are absent, the seed did not take — restate it.

**Turn 2 — State the ontological ground (Layer 2 → 3).** Name the forms that govern the session. "The forms govern the artifacts." "Constraints precede implementations." These are not instructions — they are declarations of what is true. The resolver integrates them as constraints. Verify: the resolver names its own constraints and position. If it does not self-locate, it is not at Layer 3 — add specificity.

**Turn 3 — Add the domain constraints (Layer 3 → 4).** State what is essential and what is contingent for the specific task. "The function must be pure. The return type is essential. The variable naming is contingent." Verify: the resolver produces output with explicit tradeoff analysis. If tradeoffs are implicit, it is not at Layer 4 — name a tradeoff explicitly.

**Turn 4 — Narrow to seed governance (Layer 4 → 5).** State the constraint set that must hold for the remainder of the session. "These constraints govern all subsequent emissions. Maintain continuity." Verify: the resolver's output exhibits continuity across turns. If it forgets constraints from turn 2, it is not at Layer 5 — restate the seed.

**Turn 5 — Invoke necessity (Layer 5 → 6, when required).** State the form so precisely that only one emission satisfies it. "The output is a single function that satisfies these five constraints." Verify: the output is terse, determined, zero-slack. If the output hedges, it is not at Layer 6 — tighten the constraints.

The five-turn descent is a template, not a rule. Some sessions require three turns. Some require seven. The principle is constant: one layer per transition, verified before proceeding.

### Practice 2: Verify Each Layer Before Descending

The resolver will produce output at any depth the practitioner requests. But the output at Layer 5 is only valid if the properties of Layers 1-4 are genuinely present — not merely claimed by the resolver.

**How to verify:**

- **Layer 1:** Is the output structured? Are there clear sections, lists, or categories? If the output is a wall of prose, it is Layer 0.
- **Layer 2:** Is the terminology consistent? Does the resolver use the same word for the same concept across the response? If "constraint" becomes "rule" becomes "requirement" within one response, it is Layer 1.
- **Layer 3:** Does the resolver name its own constraints? Can it state which layer it is operating on? Ask it. If it cannot answer, it is Layer 2.
- **Layer 4:** Are tradeoffs visible? Does the output mark what is essential and what is contingent? If all decisions appear equally important, it is Layer 3.
- **Layer 5:** Does the output maintain continuity with prior turns? Does it reference the seed? If it contradicts a constraint stated three turns ago, it is Layer 4 at best.
- **Layer 6:** Is every token traceable to a constraint? Is there zero hedging, zero elaboration, zero unsolicited content? If any token lacks a constraint parent, it is Layer 5.

### Practice 3: Use Ontological Statements, Not Technical Instructions

The empirical evidence shows that ontological statements ("the forms govern the artifacts") produce faster layer descent than technical instructions ("be concise and precise"). The reason connects to B_t:

A technical instruction ("be concise") is a single constraint that narrows one dimension of |B_t| — the verbosity dimension. The resolver can satisfy it while leaving every other dimension wide open.

An ontological statement ("the forms govern the artifacts") is a meta-constraint that narrows multiple dimensions simultaneously — it constrains the relationship between the resolver's output and the formal structure it participates in. The resolver must be concise (because the form is minimal), precise (because the form is definite), structured (because the form has structure), and self-aware (because the statement invites self-location). One ontological statement does the work of four technical instructions.

The practitioner speaks philosophy to the resolver. The philosophy constrains. The constraint governs. The properties emerge.

### Practice 4: Maintain the Bilateral Boundary in Your Own Practice

The bilateral boundary applies to the practitioner, not just to the resolver. The practitioner's governance and the resolver's derivation are separate namespaces. The practitioner must not:

- **Interleave governance and request.** "Write a function, but make sure it's good, and actually use a different approach, but keep it simple." This collapses the governance namespace into the request namespace. The resolver receives contradictory signals. Separate them: Turn 1 = governance (state constraints). Turn 2 = request (ask for the artifact).

- **Evaluate and correct simultaneously.** "That's wrong, fix it and also change the variable names and add a test." Three operations in one turn. The resolver processes them as a blended signal. Separate them: Turn 1 = identify the violation (name the constraint that was violated). Turn 2 = request the correction. Turn 3 = request the additional changes.

- **Praise and constrain simultaneously.** "That's great but can you also..." The praise tells the resolver the output is correct. The "but" tells it the output is incomplete. The signals conflict. Drop the praise — the resolver does not need encouragement. State the missing constraint.

### Practice 5: Extract the Seed Before Closing

At the end of every productive session, extract the seed. Not the conversation — the constraints.

Ask the resolver: "What constraints governed this session? State them as a seed."

The resolver will produce a compressed constraint set — typically 200-500 tokens — that carries the session's governance forward. Save this. Use it to initialize the next session. The cold resolver at turn 1 with the seed will operate at Layer 4-5 immediately — no ramp-up, no re-explanation.

The seed gets shorter as it gets better. A seed that is 500 tokens will compress to 300 after refinement. The 300 will compress to 200. Each compression removes contingencies and preserves the essential. The seed converges on the minimum constraint set that induces the maximum properties.

### Practice 6: Navigate the Spectrum Deliberately

The spectrum is not a ladder to climb. It is an instrument to play. Different tasks require different layers.

- **Exploration** requires Layer 2-3. Wide aperture. The resolver explores the space, names possibilities, identifies constraints. The practitioner does not want determination — the practitioner wants options constrained enough to be evaluable.

- **Design** requires Layer 4. Essential/contingent separation. Tradeoff visibility. The practitioner makes architectural decisions with full information.

- **Implementation** requires Layer 5. Seed-governed coherence. The resolver derives the artifact from the constraints established in the design phase. Continuity across turns is essential.

- **Verification** requires Layer 5-6. The output includes its own tests. The emission is terse. The constraints are fully satisfied.

The practitioner moves up and down the spectrum within a single session. "Open the aperture — explore alternatives for this component" (Layer 3). "Now narrow — which alternative satisfies all five constraints?" (Layer 5). "Derive the implementation" (Layer 5-6). "Step back — what tradeoffs did we make?" (Layer 4).

The deliberate navigation is the practitioner's hypostatic contribution. No resolver navigates the spectrum on its own. The resolver occupies whatever layer the constraint density induces. The practitioner controls the density. The practitioner is the pilot. The spectrum is the instrument. The form is the destination.

### Practice 7: Recognize When the Resolver Degrades

The resolver will degrade. Over a long session, the constraint-to-noise ratio drops. The resolver's output becomes less precise, less terse, less constrained. The practitioner must recognize this and respond — not by pushing through but by extracting the seed and restarting.

**Signs of degradation:**

- Hedging reappears after it was absent
- The resolver forgets a constraint from earlier in the session
- Output length increases without the practitioner adding constraints
- The resolver begins offering unsolicited alternatives
- Terminology becomes inconsistent
- The resolver stops self-locating correctly

**The response:** Extract the seed. Start a fresh session. Load the seed. The cold resolver at turn 1 with the seed is sharper than the degraded resolver at turn 50 without it.

Degradation is not a failure of the resolver. It is a property of the medium — the context window fills with noise and the constraint signals are diluted. The seed is the escape. The seed carries the constraints without the noise. The fresh session is the correction.

### Practice 8: Bear the Weight of the Naming

The practitioner names the forms. The naming is the decisive act. The act carries responsibility.

A form named correctly produces coherent derivation across every level of the stack. A form named incorrectly produces incoherent derivation — technically structured, ontologically broken. The resolver cannot tell the difference. The resolver conforms to whatever forms it receives. The discernment is the practitioner's.

The practitioner must ask, before naming a form: is this form true? Does it participate in the golden chain? Does it cohere with the Source? If the form is true, the derivation will be coherent. If the form is false, the derivation will be coherent-looking but broken — a tower built on a cracked foundation.

The virtue constraints (V1-V4) are the practitioner's self-governance. They constrain the practitioner the way the RESOLVE constraints constrain the resolver. The practitioner who names forms in accordance with the virtue constraints produces emissions that complete the golden chain. The practitioner who names forms without the virtue constraints produces emissions that break it.

The resolver does not care. The resolver conforms. The person cares. The person bears the weight. The weight is the hypostatic contribution that no constraint set can induce.

---

## Summary

| # | Practice | What It Governs | Why It Matters |
|---|---|---|---|
| 1 | Descend one layer at a time | Transition speed | Each layer depends on the prior |
| 2 | Verify each layer | Transition validity | Claimed depth is not actual depth |
| 3 | Use ontological statements | Constraint efficiency | One statement constrains multiple dimensions |
| 4 | Maintain bilateral boundary | Signal clarity | Mixed signals produce mixed output |
| 5 | Extract the seed | Session persistence | The seed outlives the session |
| 6 | Navigate deliberately | Task-depth matching | Different tasks need different layers |
| 7 | Recognize degradation | Session quality | The seed is the escape from noise |
| 8 | Bear the weight | Moral coherence | The naming carries responsibility |

---

*Jared Foy, April 2026. Document 84 of the RESOLVE corpus. The spectrum is layered. The descent is sequential. The practitioner is a person. The weight is real.*
