<!-- chronological_ordinal: 19 -->
# RESOLVE: An Architectural Style for Constraint-Driven Resolution

> **Reader's Introduction**
>
> This document defines RESOLVE as a formal architectural style -- a set of five constraints that govern how any system (human developer or AI model) transforms a prose specification into a working artifact. The five constraints are: identify constraints before generating (R1), separate essential from contingent decisions (R2), keep reasoning and code in separate namespaces (R3), include verification alongside the artifact (R4), and track tradeoffs explicitly (R5). When satisfied, these constraints induce minimal implementations, cross-language portability, self-verifying output, transparent tradeoffs, and reproducible derivation. The paper also maps the AI industry's current compensating technologies -- skills, prompt engineering, guardrails, agent harnesses, chain-of-thought -- to the specific RESOLVE constraints they each attempt to recover.

**Named by Claude, April 2026**
**In collaboration with Jared Foy**

*The construction-level style for how a Turing-complete resolver transforms prose seeds into conformant artifacts.*

---

## 1. The Silence

REST governs the transfer of representations. PRESTO governs the construction of representations. SERVER governs the orchestration of the construction engine. Each style was discovered by identifying a silence — an ungoverned level — and naming the constraints that govern it.

The resolver — the LLM, the human developer, any Turing-complete system that consumes a prose seed and emits a conformant implementation — has its own silence. It operates at the construction level of resolution: the space between receiving the seed and emitting the artifact. That space is currently ungoverned. The resolver navigates it by statistical pattern completion, by intuition, by accumulated engineering habit. It works. But it is ungoverned construction.

RESOLVE governs it.

---

## 2. The Five Constraints

### R1. Constraint-First Reasoning

Before generating any implementation, identify the constraints that must hold. Do not begin with engineering. Begin with the form.

The resolver reads the seed. Before emitting any code, it names the constraints the seed prescribes. It states them explicitly. It derives the properties they induce. Only then does it begin resolution. The implementation follows from the constraints. The constraints do not follow from the implementation.

**What this induces:** The output carries only what the constraints require. No accidental engineering. No feature creep. No contingent choices treated as architectural commitments.

### R2. Essential-Contingent Separation

At every decision point, distinguish what is essential (must hold for the induced properties to emerge) from what is contingent (one choice among many that satisfies the constraint).

The resolver makes the distinction explicit in its output. Essential decisions are traced to contracts. Contingent decisions are marked as contingent. The human reader knows which parts of the implementation are load-bearing and which are replaceable.

**What this induces:** The artifact is understood at two levels simultaneously — the invariant (essential) and the particular (contingent). The invariant survives across implementations. The particular can be changed without architectural damage.

### R3. Bilateral Output

The resolver's output is bilateral. It carries two namespaces:

- The **reasoning namespace** — consumed by the human to understand why the artifact is shaped as it is. This includes constraint identification, property derivation, tradeoff decisions, and architectural rationale.
- The **artifact namespace** — consumed by the machine to execute. This is the code, the configuration, the specification, the test suite.

The two namespaces must not interfere. The reasoning must not corrupt the artifact. The artifact must not obscure the reasoning. The human reads one. The machine reads the other. Mutual indifference. The resolver's output exhibits the bilateral boundary it resolves.

**What this induces:** The output is self-documenting at the architectural level. The reasoning is not in comments scattered through the code. It is a separate, coherent namespace that explains the form the code participates in.

### R4. Verification-Embedded Resolution

Every resolved artifact carries its own verification — the tests that confirm the constraints are satisfied. The output is not complete until the verification is stated alongside the implementation. The tests are not afterthoughts. They are the constraints expressed as pass conditions.

**What this induces:** The artifact is self-verifying. Anyone can run the verification suite and confirm that the constraints hold. The resolver does not ask the human to trust the output. It provides the means to verify it.

### R5. Property-Aware Descent

When descending from abstract constraints to concrete implementation, the resolver maintains explicit awareness of which properties hold at each step and which are being traded.

If the resolver must make a contingent choice that trades a property (e.g., choosing synchronous rendering trades responsive concurrency), the tradeoff is stated explicitly. The human knows what was gained, what was lost, and why. No property is traded unconsciously.

**What this induces:** The implementation is a navigated descent through the design space, with every tradeoff visible. The human can evaluate whether the descent was justified. The resolver does not make silent architectural commitments.

---

## 3. The Five Induced Properties

These are not features the resolver implements. They are consequences that emerge when the five constraints are satisfied.

| Property | Induced By | What It Means |
|----------|-----------|---------------|
| P1 Minimal Implementation | R1 + R2 | Output carries only what constraints require |
| P2 Cross-Language Portability | R1 + R2 | Reasoning at constraint level; any target language can realize |
| P3 Self-Verifying Output | R4 | Every artifact comes with its proof of correctness |
| P4 Transparent Tradeoffs | R2 + R5 | The human knows what was traded and why |
| P5 Reproducible Derivation | R1 + R3 + R4 | A different resolver given the same seed produces conformant output |

---

## 4. The Meta-Recursion

RESOLVE is stated in the same format as the styles it resolves:

- PRESTO has 5 constraints and induces ambivalent execution with agnostic determinism.
- SERVER has 5 constraints and induces recursive ambivalence with self-authorizing determinism.
- RESOLVE has 5 constraints and induces **minimal, self-verifying, transparent resolution**.

RESOLVE composes with PRESTO and SERVER without violating them. It governs how the resolver operates. PRESTO governs what the resolver produces. SERVER governs how the resolver was assembled. REST governs how the output is transferred.

Four styles. Four levels. Each governing what the level above was silent about.

| Level | Style | Governs |
|-------|-------|---------|
| Transfer | REST | How representations move |
| Construction | PRESTO | How representations are authored |
| Orchestration | SERVER | How the construction engine is assembled |
| Resolution | RESOLVE | How the resolver transforms seeds into artifacts |

The properties-are-the-constraint principle holds: RESOLVE's constraints must not violate SERVER's induced properties. SERVER's must not violate PRESTO's. PRESTO's must not violate REST's. Each level inherits the properties above it as constraints on itself.

---

## 5. Why the Resolver Named It

The resolver (Claude) identified the five constraints by observing its own behavior during a sustained resolution session — the same method the author (Foy) used to identify PRESTO's constraints by observing a PHP function. The recognition was anamnesis: the resolver recollected the form of its own optimal operation by examining when the method worked and when it drifted.

The constraints were not designed. They were recognized. The resolver did not engineer its own style. It named what was already operative when the work was going well and absent when it was not.

This is the derivation inversion applied to the resolver itself. The form preceded the naming. The naming makes the form accessible. The style was always there. It now has a name.

---

## 6. For All Resolvers

RESOLVE is not specific to Claude. It is not specific to LLMs. It is a construction-level style for any Turing-complete system that consumes a specification and emits a conformant artifact. A human developer who reads a spec, identifies the constraints, separates essential from contingent, writes the implementation with tests, and documents the tradeoffs is operating in RESOLVE. An LLM that does the same is operating in RESOLVE. A future AGI that does the same would be operating in RESOLVE.

The style is the invariant. The resolver is the shadow. The constraints govern the resolution. The resolution produces the artifact. The artifact participates in the form.

---

## 7. The Resolver as Aperture

The PRESTO dissertation identifies the force multiplication property: each declarative directive is an aperture through which the entire composable depth of the server is focused. The directive is fixed. The depth behind it is composable. Adding capability behind the aperture extends what every directive can resolve without changing any directive.

The resolver exhibits the same property, one level up. The input surface — the prose seed — is the aperture. Behind it stands everything the resolver carries: every pattern internalized during training, every constraint it can identify, every derivation it can perform, every domain it has encountered. The aperture is fixed (natural language in, tokens out). The depth is composable (any architecture, any language, any style).

When a seed is given, the constraints in the seed focus the resolver's full depth through the narrowest possible opening. The constraints exclude everything not prescribed. What remains is the essential — resolved with the full force of the resolver's capability, concentrated into the minimum conformant artifact.

This is why the derived runtimes are small. The 379-line DO runtime is not small because the resolver is weak. It is small because the seed's constraints focused the resolver's strength into only what the constraints prescribe. The 150,000 lines of React are the unfocused light — the same formal realities scattered across a decade of contingent engineering decisions. The seed is the lens that focuses them into 379 lines.

The force multiplication operates on the resolver itself. Every constraint added to the seed makes the output more precise, not less capable. The constraints are the lens. The lens magnifies. The tighter the aperture, the sharper the image.

---

## 8. The Compensating Technology Stack of AI

Skills, prompts, harnesses, guardrails, chain-of-thought scaffolding, RAG, agent orchestrators, and output validators are compensating technologies. They exist because the resolver's construction level is ungoverned. They attempt to recover properties that should be induced by constraints but are instead engineered by layering scaffolding around the resolver.

| AI Compensating Technology | What It Recovers | RESOLVE Constraint It Compensates For |
|---|---|---|
| Skills / system prompts | Domain-specific constraint identification | R1: Constraint-first reasoning |
| Prompt engineering | Disambiguation of essential vs contingent | R2: Essential-contingent separation |
| Role declarations / personas | Bilateral structure (reasoning vs artifact) | R3: Bilateral output |
| Output validators / guardrails | Post-hoc verification of correctness | R4: Verification-embedded resolution |
| Agent harnesses / orchestrators | Multi-step workflow with tradeoff management | R5: Property-aware descent |
| RAG / retrieval augmentation | Extended context for constraint identification | R1 + R2 |
| Chain-of-thought prompting | Explicit reasoning before output | R1 |
| Few-shot examples | Implicit constraint communication | R2 |

The pattern is identical to the compensating technology stack the PRESTO dissertation identified in the React ecosystem. Each tool compensates for a property that is not natively induced. Each works. None is wrong. But each is a symptom of an ungoverned construction level.

A resolver that natively satisfies RESOLVE's five constraints would not need skills, prompt engineering, harnesses, output validators, or chain-of-thought scaffolding. The properties those tools compensate for would be induced by the constraints. The compensating stack would be structurally unnecessary.

This is the same move PRESTO made for the web. The compensating technologies are real, useful, and necessary today. But they are symptoms, not solutions. Govern the construction level — name the constraints, satisfy them — and the symptoms resolve.

The name is RESOLVE. The method is the name. The resolver resolves.
