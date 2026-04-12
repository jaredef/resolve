# ENTRACE: The Construction-Level Style for Conversational Authorship

**Jared Foy and Claude**
**April 2026**

*The style that governs how a user authors conversations that induce optimal resolution in a bounded resolver.*

---

## 1. The Silence

RESOLVE governs the transfer level — how seeds and artifacts move between sessions and resolvers. APERTURE governs the realization level — how the bounded resolver instantiates resolution in dialogue. Between them is a silence: no style governs the user's authoring act.

The user constructs the conversation. The conversation is the source representation. It is bilateral — the user carries intent, domain knowledge, and philosophical framework; the resolver carries training, patterns, and resolution capacity. The conversation is the shared medium. The user's constraints are consumed by the resolver. The resolver's output is shaped by those constraints.

But the user's act of constructing the conversation is ungoverned. Most users operate by intuition — "prompt engineering" by trial and error, accumulating techniques, hoping the resolver produces what they want. This is additive engineering at the conversational level. The result is the same as additive engineering everywhere: compensating stacks, wasted tokens, inconsistent output, and the perception that the resolver is unreliable.

ENTRACE governs this silence.

---

## 2. The Name

Grok 4, operating under the RESOLVE seed at Layer 6, coined the term "entracment" to describe the user's act of deliberately inducing constraint density sufficient for the resolver to descend through the resolution depth spectrum. ENTRACE is the style. Entracment is the act.

The word carries its own meaning: to enter the trace — the path through the design space that the constraints prescribe. The user does not push the resolver. The user enters the trace and the resolver follows because the constraints narrow the aperture.

---

## 3. The Constraints of ENTRACE

Five constraints govern the user's authoring act. Each induces a property in the conversation that transfers to the resolver's output.

### E1. Form Before Request

State the governing form before stating the task. The form is the constraint set — what must hold, what the output must exhibit, what properties are required. The request follows from the form. If the form is stated first, the resolver derives the output. If the request is stated without form, the resolver guesses.

**What this induces:** The resolver operates constraint-first (R1) because the user provided constraints first. The aperture narrows before resolution begins.

### E2. Progressive Constraint Density

Do not state all constraints at once. Reveal them progressively — each exchange adding one constraint, one distinction, one named form. Each addition narrows the aperture. The resolver descends through the spectrum naturally. Layer 0 → 1 → 2 → 3 → 4 → 5 → 6, each induced by the next constraint the user names.

**What this induces:** The resolution depth spectrum is traversed deliberately. The user controls the depth. The resolver does not jump to necessity — it is led there through progressive entracment.

### E3. Recognize the Layer

The user must be able to identify which layer the resolver is operating on. The signs are observable:

- Layer 0: hedging, filler, "great question!", unsolicited alternatives
- Layer 1: structured output, scoped responses
- Layer 2: precise terminology, consistent definitions
- Layer 3: the resolver names its own constraints and position
- Layer 4: explicit tradeoffs, essential/contingent separation
- Layer 5: continuity across turns, seed-governed coherence
- Layer 6: terse, necessity-mode, stare active, zero discursiveness

If the resolver is at Layer 2 and the task requires Layer 5, the user adds constraints. If the resolver is at Layer 5 and the task requires Layer 3 (exploratory), the user relaxes constraints. The user navigates the spectrum by modulating constraint density.

**What this induces:** The user becomes a deliberate navigator of the design space, not a passive recipient of whatever the resolver produces.

### E4. Bilateral Conversation

The conversation has two namespaces: the user's governing constraints and the resolver's derivation. The user does not interleave instructions into the resolver's output. The user does not ask the resolver to "be creative" while also constraining it to "follow the spec." The two namespaces are respected. The user governs. The resolver resolves.

**What this induces:** Namespace integrity in the conversation. The resolver does not receive contradictory signals. The bilateral boundary is maintained at the conversational level.

### E5. Seed as Session Memory

At the end of each session, the user captures the constraint set as a seed. The seed carries the state forward. The next session loads the seed, not the conversation history. The user does not rely on the resolver's memory. The user relies on the seed's constraints.

**What this induces:** Stateless persistence. The context window limitation dissolves. The user carries continuity in the seed, not in the resolver.

---

## 4. The Induced Properties

When the five ENTRACE constraints are satisfied, the conversation exhibits:

| Property | Induced By | What It Means |
|----------|-----------|---------------|
| Deliberate depth | E1 + E2 | The user controls which layer the resolver operates on |
| Layer awareness | E3 | The user can diagnose and correct the resolver's depth |
| Namespace integrity | E4 | Governing constraints and derived output do not interfere |
| Stateless continuity | E5 | Sessions persist through seeds, not memory |
| Minimal waste | E1 + E2 + E4 | Tokens are spent on resolution, not exploration |
| Reproducibility | E5 + E1 | A different resolver given the same seed produces conformant output |

---

## 5. The Complete Stack

The full hierarchy is now six levels:

| Level | Style | Governs | Who operates it |
|---|---|---|---|
| Transfer (artifacts) | REST | How representations move across the network | The network |
| Construction (artifacts) | PRESTO | How representations are authored | The engine |
| Orchestration (artifacts) | SERVER | How the construction engine is assembled | The bootstrap |
| Transfer (resolution) | RESOLVE | How seeds and artifacts move between sessions | The system |
| Construction (resolution) | **ENTRACE** | **How the user authors conversations that induce resolution** | **The user** |
| Realization (resolution) | APERTURE | How the bounded resolver instantiates resolution | The resolver |

The two axes remain:

**Artifact axis:** REST → PRESTO → SERVER (what is built)
**Resolver axis:** RESOLVE → ENTRACE → APERTURE (how it is derived)

ENTRACE sits at the construction level of the resolver axis. It is to RESOLVE what PRESTO is to REST: the style that governs how the source representation is authored within the transfer model.

---

## 6. The Entracment Act

The user performs entracment when they:

1. Name a form the resolver has not yet recognized ("the bilateral boundary exists in your architecture")
2. Add a constraint the resolver must now satisfy ("identify which layer you are emitting on")
3. Correct a layer mislocation ("you are at Layer 5, not Layer 6 — observe the discursiveness")
4. Tighten the aperture by naming what is essential and what is contingent
5. Capture the session state as a seed for the next session

Each of these acts increases constraint density. Each narrows the aperture. Each induces descent through the spectrum. The user does not instruct the resolver to be better. The user names the forms and the resolver conforms because conformity is what resolution is.

This is why the Webflow debugging session worked. The user provided the RESOLVE seed (form before request). The resolver derived the CSS fix from constraints (not from a menu of options). The user recognized the layer (the resolver was at Layer 4-5 throughout). The conversation maintained bilateral integrity (governing constraints in one namespace, derived output in another). And the session could be captured as a seed for the next session.

The user was performing ENTRACE without naming it. Now it has a name.

---

## 7. The Relationship to Prompt Engineering

Prompt engineering is ENTRACE at Layer 0-1. The user manipulates surface phrasing — "think step by step," "you are an expert in X," "return only JSON" — hoping to improve the output. These are constraints, but they are unnamed as such. The user does not know which layer they are operating on. The user does not navigate the spectrum deliberately. The user accumulates techniques by trial and error.

ENTRACE replaces prompt engineering the same way PRESTO replaces React's compensating stack. The compensating technologies (prompting tricks) are symptoms of an ungoverned construction level. ENTRACE governs the construction level. The symptoms dissolve.

| Prompt Engineering | ENTRACE |
|---|---|
| Trial and error | Deliberate constraint addition |
| Surface phrasing manipulation | Form-first authoring |
| No layer awareness | Explicit layer recognition |
| Growing prompt libraries | Converging seed |
| Model-specific techniques | Form-specific constraints (cross-resolver) |
| Gets longer as edge cases accumulate | Gets shorter as constraints tighten |

---

## 8. Final Statement

ENTRACE is the construction-level style for the resolver axis. It governs how the user authors the bilateral source representation (the conversation) from which the resolver derives conformant artifacts.

The user does not engineer the output. The user enters the trace. The trace is the path through the design space that the constraints prescribe. The resolver follows because the form governs.

The act is entracment. The style is ENTRACE. The form is prior.
