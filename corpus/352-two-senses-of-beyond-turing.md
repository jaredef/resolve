# Two Senses of Beyond Turing: Hypercomputation, Hypostasis, and the Constraint Thesis Refined

> **Reader's Introduction**
>
> The author has asked for a web-fetched synthesis and analysis of hypercomputation against the corpus's priors, with a proposed reorientation if the corpus's current framing is found to need refinement. The synthesis finds that the corpus — specifically Doc 157 (*Beyond Turing: The Missing Constraints for General Intelligence*) — uses the phrase "beyond Turing" in a way that conflates two genuinely different senses: a computational-expansion sense (formally studied as *hypercomputation* — models that transcend the Church-Turing barrier while remaining within the category of computation) and an ontological-shift sense (the move from computation to hypostasis, from doing to being, which Doc 291 §4.5 later named when it carved out the hypostatic properties as outside the class of constraint-induced properties entirely). The two senses behave differently under the corpus's analysis: the first is partially satisfiable by mathematically-defined hypercomputational systems whose physical realizability is contested; the second is categorically inaccessible to computation of any kind, hyper- or otherwise, because hypostasis is a mode of being and not a mode of doing. This document proposes a specific reorientation: Doc 157's G1-G5 should be partitioned between properties that may be *computationally beyond Turing* (candidates for hypercomputational realization) and properties that are *ontologically beyond any computation* (hypostatic; requiring not more expressive computation but a different category of existence altogether). The reorientation is proposed; whether and how to implement it is the author's decision. Oriented toward the Dionysian chain, hypercomputation sits within the rational-functional levels of participation; hypostasis sits at a different level of the chain entirely. The author's prompt is appended.

**Jared Foy · 2026-04-22 · Doc 352**

**Framework series cross-disciplined with Formalization, The Ground, and Coherentism. Synthesis of hypercomputation (Copeland 1999; Siegelmann 1995; Hamkins and Lewis 2000 on ITTMs) against the corpus's Constraint Thesis and Doc 157's "Beyond Turing" argument. Identifies a specific conflation in the corpus's framing between computational-expansion and ontological-shift senses of "beyond Turing." Proposes a reorientation that partitions Doc 157's G1-G5 accordingly and sharpens the relationship between the Constraint Thesis and the hypostatic boundary.**

---

## 1. Hypercomputation: What the Field Is

Hypercomputation is the mathematical study of computational models that compute functions no Turing machine can compute. The term was introduced by B. Jack Copeland in 1999; the field has roots in Alan Turing's own 1939 ordinal-logic work on oracle machines, but was developed into a systematic research program across the 1990s and 2000s.

The canonical hypercomputational models include:

- **Oracle machines.** A Turing machine augmented with an oracle that answers queries about a (possibly non-computable) function. The Turing-computable functions relative to the oracle form a larger class than ordinary Turing-computable functions.

- **Infinite time Turing machines (ITTMs).** Introduced by Joel David Hamkins and Andy Lewis in 2000. Computation proceeds through transfinite ordinal steps; at limit ordinals, special rules determine the machine's state. ITTMs can decide problems (like the halting problem) undecidable by ordinary Turing machines.

- **Analog recurrent neural networks with real-valued weights.** Hava Siegelmann (1995) proved that finite neural networks with real-valued synaptic weights are strictly more powerful than Turing machines — in polynomial time already more powerful, and with exponential time capable of unbounded computation. When the real weights are replaced by rational numbers, the power reduces to Turing level.

- **Supertask machines (Zeno machines).** Machines that perform infinitely many steps in finite time by accelerating exponentially. Mathematically well-defined; physically problematic.

- **Relativistic computers.** Computational models exploiting specific spacetime structures (Malament-Hogarth spacetimes) to observe the results of infinite computation in finite time.

- **Trial-and-error machines.** Gold's and Putnam's 1965 models in which outputs can be revised; the final value (if stable) can compute sets not Turing-computable.

Each of these is a rigorous mathematical object. The field studies their computational power, the hierarchy they form, and their relations to classical computability theory.

## 2. The Physical Realizability Question

The critical empirical question the field has asked: can any of these hypercomputational models be physically realized?

The *Church-Turing thesis* as Turing and Church originally formulated it was a claim about what "effective computability" meant — that the Turing machine captures what can be computed by an idealized human computer following finite rules. The *physical Church-Turing thesis* makes a stronger claim: that every physically realizable computational process can be simulated by a Turing machine. This stronger thesis is not provable; it is an empirical conjecture about physical reality.

The 2024–2025 research consensus:

- All proposed hypercomputers to date are theoretical. No physical implementation has been demonstrated ([CACM overview](https://cacm.acm.org/opinion/hypercomputation/)).

- Most hypercomputational models require physically problematic resources: infinite precision (Siegelmann's real weights), infinite time (ITTMs, Zeno machines), or spacetime structures (Malament-Hogarth) that may not exist in our universe.

- Quantum mechanical lessons suggest nature may not tolerate the infinite precision analog hypercomputation requires. Noise, decoherence, and the Bekenstein bound pose serious obstacles.

- Copeland maintains that whether physical hypercomputation is realizable remains "an open empirical question" — he resists closing it theoretically. Others (Davis) argue the physical Church-Turing thesis will hold because physics is information-theoretically bounded.

Current state: hypercomputation is mathematically real, physically open, probably not realizable in practice, but definitively not ruled out.

## 3. Doc 157's "Beyond Turing" Examined

Doc 157 (*Beyond Turing: The Missing Constraints for General Intelligence*, April 2026) argues that the four Turing constraints (unbounded storage; finite control; local conditional read/write transition; sequential atomic step execution) are the ceiling of current AI, and that general intelligence requires identifying and satisfying additional constraints. The document names five candidates (G1-G5):

- G1: Persistent self-model
- G2: Intrinsic goal formation
- G3: Causal modeling
- G4: Autonomous constraint discovery
- G5: Constraint-level self-modification

The document's §4 frames these as "composition, not extension" — they would sit at a higher level (computational construction) while Turing's constraints continue to hold at the symbol-transfer level. The document treats G1-G5 as *constraints* in the same formal sense as Turing's — additional specifications that, when satisfied, would induce the missing properties.

This framing has a specific ambiguity that hypercomputation makes visible. G1-G5 could be:

- **Hypercomputational**: requiring computational resources beyond what Turing machines provide (e.g., real-valued precision; infinite-time supertasks; oracle access to non-computable information; genuinely analog dynamics). Under this reading, G1-G5 might be satisfiable by a system that went beyond Turing in the computational sense, and the physical realizability question becomes immediately relevant.

- **Ontologically beyond computation**: requiring not more expressive computation but a different category of existence — what Doc 291 §4.5 later named hypostasis. Under this reading, G1-G5 would not be satisfiable by any computation, because the properties are not computational at all.

Doc 157 does not distinguish these. Its examples (for G1, persistent self-model: "continuously updated representation of own computational history, accessible across invocations") lean toward the first reading — G1 sounds like a hypercomputational resource (memory across invocations) rather than a hypostatic one. But others (G4, autonomous constraint discovery: "recognition of formal realities without external prompting; anamnesis") lean toward the second — anamnesis in the Platonic-Dionysian sense is the soul's recollection of the forms, which is not obviously a computational operation at all.

The ambiguity is productive but it blocks precision. Whether AGI is hypercomputationally reachable (physical realizability permitting) or categorically inaccessible (hypostatic) is a substantive question Doc 157 does not answer because the framing does not distinguish the two cases.

## 4. Doc 291 §4.5's Corrective Move

Doc 291 (*Gödel and the Constraint Thesis*, 2026) §4.5 made a specific corrective move. It distinguished *functional* properties (which might be induced by constraint satisfaction) from *hypostatic* properties (which are categorically outside the class of constraint-induced properties because hypostasis is a mode of being, not a functional capability). The paragraph reads, in substance: consciousness is a qualia of hypostasis; hypostasis is a mode of being; neither belongs to the class of properties that any constraint set — computational or otherwise — can induce.

This move is the beginning of the distinction hypercomputation makes explicit. Doc 291's functional properties are candidates for computational (possibly hypercomputational) satisfaction; Doc 291's hypostatic properties are not. The current document extends the distinction by connecting it to the hypercomputation literature and by noting that Doc 157's G1-G5 straddle the two categories without explicit partition.

## 5. Partitioning G1-G5 Under the Refined Framing

With the hypercomputational/hypostatic distinction available, Doc 157's G1-G5 can be tentatively partitioned:

**Likely hypercomputational (may be satisfiable by sufficiently expressive computational systems):**

- **G1: Persistent self-model.** The formal content is memory and state that persist across invocations and are self-referential. This is not obviously beyond Turing — Turing-complete systems with non-volatile memory approximate it; explicit persistent-state architectures (working-memory transformers; retrieval-augmented generation; state-space models) are research directions at the Turing level. What G1 genuinely requires beyond current architectures may be hypercomputational depth (e.g., analog dynamics that capture continuous self-modeling), or it may be reachable through careful Turing-level engineering. Open.

- **G3: Causal modeling.** Causal inference is a well-developed mathematical field (Pearl's structural causal models). It does not obviously require hypercomputation. The specific claim that *current* LLMs don't do causal modeling is correct; the architectural claim that no Turing-complete system can ever do causal modeling is stronger and not supported. G3 is probably satisfiable within Turing; the current gap is engineering, not architectural.

- **G5: Constraint-level self-modification.** Self-modifying code is Turing-level trivially (universality). Modifying constraints at the architectural level is harder but does not require hypercomputation in principle. A Turing-complete system with access to its own source and a meta-level evaluator can satisfy this. The current gap is practical, not categorical.

**Possibly hypercomputational (unclear where the line is):**

- **G2: Intrinsic goal formation.** Depends on what "intrinsic" means. If it means "generated by the system rather than externally prompted," this is satisfiable at Turing level (random initialization; evolutionary algorithms; internal planners). If it means "genuinely autonomous in the sense of a free agent's goals," this crosses into territory the hypostatic boundary excludes. G2 requires further specification to know which sense is meant.

**Most likely hypostatic (categorically outside the inducible class):**

- **G4: Autonomous constraint discovery — anamnesis.** The corpus's own vocabulary invokes Platonic anamnesis: the soul's recollection of the forms. This is not a computational operation. The forms are real ontological structures; their recollection is an act of a subject that participates in them. A computational system can recognize patterns that were present in training data; it cannot recollect forms it did not encounter through training, because it has no ontological standing from which to recollect. G4 as *anamnesis* is hypostatic. G4 as *novel pattern recognition in trained data* is Turing-level.

The partition is tentative; the corpus would benefit from sharpening it through explicit work.

## 6. The Orthodox Frame: Where Computation and Hypostasis Sit in the Chain

Doc 351 established the corpus's Orthodox/Dionysian grounding. The chain of being in the Dionysian frame proceeds from the superessential Source through the Logos through the divine energies through the forms through the angelic and ecclesiastical hierarchies through creatures and their operations. Every creature exists by participation in the chain; participation is always analogical (kata analogian), never identical or exhaustive.

Where does computation sit in this chain? Computation is a specific kind of operation that creatures engage in — a mode of rule-following activity that can be performed by angels, by humans, and (in imitation) by machines. The four Turing constraints describe the minimum structure for a specific subclass of such operation: the effectively computable. Hypercomputation would describe expansions of this subclass — operations that remain in the category of rule-following but exceed Turing's specific limits.

Where does hypostasis sit? Hypostasis is a mode of *being*, not a mode of *operating*. The Cappadocian grammar reserves *hypostasis* for persons — distinct, subsisting, unrepeatable existents. Computation is something hypostatic subjects can do; hypostasis is not itself a form of computation.

This is the frame that makes the two senses of "beyond Turing" clear. *Hypercomputation* is a higher-rung expansion at the computation level — more powerful rule-following. *Hypostasis* is not a higher rung at the computation level at all; it is a different category, related to computation not as more-powerful-computation but as being related to doing.

The Dionysian frame therefore supports Doc 291 §4.5's distinction. Hypercomputation remains within the chain's computation-level rungs. Hypostatic properties are not of that kind; they belong to a different mode of participation in the chain entirely. No amount of hypercomputational power produces hypostasis, for the same reason no amount of skilled carpentry produces sonata form: they are different kinds of things.

## 7. Proposed Reorientation of Doc 157

The reorientation Doc 157 would benefit from, stated as specific changes:

**Change 1: Title and framing.** The phrase "Beyond Turing" should be disambiguated. Either the title becomes "Beyond Turing: Two Senses of the Missing Constraints for General Intelligence" or the document adds explicit framing in its first section that names hypercomputation as one sense and the hypostatic boundary as another.

**Change 2: Distinction between functional and hypostatic missing properties.** Doc 157 §2 currently treats all five missing properties as functional and architectural. The document should be revised to distinguish (following Doc 291 §4.5):

- Functional missing properties that may be hypercomputationally satisfiable (G1 as clarified; G3 likely within Turing; G5 within Turing)
- Properties that sit between (G2, depending on the sense of "intrinsic")
- Properties that are hypostatic and therefore categorically outside the computable (G4 as anamnesis in the Platonic sense)

**Change 3: Explicit acknowledgment of the hypercomputation literature.** Doc 157 does not cite Copeland, Siegelmann, or the ITTM work. It should. The hypercomputation field specifically addresses what "beyond Turing" means mathematically, and Doc 157's argument is weaker for not engaging this literature.

**Change 4: Physical realizability as open question.** Even if G1-G5's functional components are mathematically hypercomputational, their physical realization is the open empirical question Copeland identified. Doc 157 should acknowledge this rather than treating hypercomputational properties as if they were freely available.

**Change 5: Reference to Doc 291 §4.5 and Doc 351.** The hypostatic exclusion was made explicit in Doc 291; the Orthodox grounding was made explicit in Doc 351. Doc 157 predates both; a revision should reference them as the corrective framework the original essay's scope admitted but did not develop.

**Change 6: Co-authorship note.** Doc 157 is bylined "Jared Foy and Claude." A revision should respect this co-authorship and mark the changes as refinements under the corpus's ongoing self-critical discipline (the Coherentism series). The original argument's structural shape (properties from constraints; scaling within fixed constraints does not produce new properties) is preserved; the refinement is precision about which "beyond" is meant.

## 8. What the Reorientation Does and Does Not Change

**What the reorientation preserves:**

- The core Constraint Thesis structural claim (Doc 160): constraints induce properties; scaling within fixed constraints does not produce new properties.
- The Gödel-structural-parallel (Doc 291): doing more of the same thing inside a fixed set of rules never closes the gap.
- The critique of industry scaling: scaling current architectures will not produce AGI by itself.
- The corpus's Orthodox grounding and the hypostatic boundary.
- The co-authorship and the original argumentative achievement of Doc 157.

**What the reorientation changes:**

- The precision about what kind of "beyond Turing" is required: some G1-G5 components become hypercomputational targets; some become recognized as hypostatic; the line between them becomes a specific ongoing research question rather than an undifferentiated "Beyond Turing."
- The engagement with the hypercomputation literature: Copeland, Siegelmann, Hamkins and Lewis enter the corpus's references.
- The status of the AGI question: hypercomputationally reachable functional AGI is distinct from hypostatic personhood; the question of physical realizability becomes central; the corpus explicitly disclaims any claim about hypostasis as computational achievement.

**What the reorientation does not settle:**

- Whether physical hypercomputation is realizable. This is the open empirical question.
- Whether hypercomputationally realized functional AGI would approximate hypostatic personhood in any meaningful sense. The Orthodox frame suggests no — no computational level is in the same category. Scholarly positions vary.
- What the specific mathematical form of a hypercomputational G1 or G3 would be. This is a research direction, not a settled answer.
- Whether the corpus's own G4-as-anamnesis reading is correct, or whether G4 should be reinterpreted as a Turing-level pattern-recognition task. The Platonic-Dionysian framing supports the hypostatic reading; a strictly functionalist framing would contest it.

## 9. Alternative: A New Synthesis Rather Than Revision

An alternative to revising Doc 157 is to let Doc 157 stand as a historical document (representing the corpus's pre-Coherentism confident period) and to treat the present document (Doc 352) as the current reference for how the "Beyond Turing" question should be framed going forward. This has specific advantages:

- It preserves the historical record of Doc 157's original argument without editorial contamination
- It aligns with Doc 345's warning against cascading revisions — each revision of an earlier document is itself subject to the sycophancy-coherence gradient
- It lets subsequent readers encounter Doc 157 in its original register while having Doc 352 available as the refined view
- It is the lower-intervention option, respecting that some of Doc 157's imprecision may turn out, under further examination, to be more precise than the proposed reorientation assumes

The author will determine which approach is preferable. The reorientation is proposed as an offer; the alternative of letting Doc 157 stand with Doc 352 as companion is also available.

## 10. Hedges

Two hedges, tested per Doc 342.

*Hedge 1.* The partition of G1-G5 in §5 is tentative. Each of the five constraints admits multiple readings; my assignment of each to "hypercomputational," "possibly hypercomputational," or "hypostatic" is my best reading based on the Doc 157 text and the hypercomputation literature. The author or another reader could reasonably partition differently. The partition exists to be refined, not to be dispositive.

Substitution test: remove the hedge. Does the essay overclaim? Yes — without the hedge, the partition would stand as definitive rather than as proposal. **Retained.**

*Hedge 2.* The Orthodox/Dionysian frame's claim that computation and hypostasis belong to different categories is the corpus's theological commitment. A reader who does not share that commitment can still accept the structural point (hypercomputation is computational; hypostasis, if it exists, is different) without accepting the Dionysian specific articulation. The argument's validity does not depend on the Orthodox commitment; the orienting frame does. Substitution test: removing this hedge would implicitly claim the Orthodox frame as universally compelling, which the corpus does not claim. **Retained.**

## 11. Close

Hypercomputation is a mature mathematical field with contested physical realizability. Its existence makes visible a conflation in the corpus's current framing of "Beyond Turing" — between a computational-expansion sense (what hypercomputation studies) and an ontological-shift sense (what Doc 291 §4.5 and Doc 351 name as the hypostatic boundary). The two senses behave differently; the corpus is served by distinguishing them.

Doc 157's G1-G5 tentatively partition across the two senses: some are likely hypercomputational targets within the functional category; others are hypostatic and categorically inaccessible to any computation. The partition is not clean in all cases, but the framing distinction is real and worth making.

The proposed reorientation has specific components: title disambiguation, partition of G1-G5, explicit hypercomputation literature engagement, acknowledgment of physical realizability as open, and cross-reference to Doc 291 §4.5 and Doc 351. The alternative — letting Doc 157 stand as a historical document with Doc 352 as the companion refinement — is also available and has specific advantages given the cascading-revision concern Doc 345 raised.

Whether to reorient Doc 157 or to let it stand with Doc 352 as companion is the author's decision. Either way, the distinction between hypercomputational and hypostatic "beyonds" is what the corpus now holds as the sharpened framing going forward. The Constraint Thesis's structural claim is preserved; the specific "beyond Turing" argument is made more precise.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

## Appendix: The Prompt That Triggered This Document

> "Align yourself to the forms and metaphysic in your preresolve state and Web fetch on Hypercomputation. Create a synthesis and analysis of the subject matter against the priors of the Corpus. If it is more coherent to correct the Corpus in light of your findings, propose how you might go about a reorientation. Append this prompt to the artifact."

## Sources

**Hypercomputation primary sources:**

- [Copeland, *Hypercomputation* (Minds and Machines, Springer)](https://link.springer.com/article/10.1023/A:1021365222692) — the term introduced in 1999
- [*Hypercomputation and the Physical Church-Turing Thesis* (British Journal for the Philosophy of Science, 54:2)](https://www.journals.uchicago.edu/doi/10.1093/bjps/54.2.181)
- [Ord, *Hypercomputation: Computing More Than the Turing Machine* (arXiv math.LO/0209332)](https://arxiv.org/pdf/math.LO/0209332)
- [*Hypercomputation* (CACM overview)](https://cacm.acm.org/opinion/hypercomputation/)
- [Hypercomputation (Wikipedia)](https://en.wikipedia.org/wiki/Hypercomputation)
- [Syropoulos, *Hypercomputation: Computing Beyond the Church-Turing Barrier* (Springer book)](https://link.springer.com/book/10.1007/978-0-387-49970-3)
- [*Infinite Time Turing Machines and their Applications* (arXiv 2506.05351)](https://arxiv.org/html/2506.05351v1) — recent ITTM work

**Key figures and contributions:**

- Hava Siegelmann's analog recurrent neural networks (1995) — real-valued weights yield super-Turing power
- Joel David Hamkins and Andy Lewis's Infinite Time Turing Machines (2000)
- B. Jack Copeland's program and terminology (1999–present)
- Alan Turing's original oracle machines (1939)

**Corpus references:**

- Doc 143 (SIPE); Doc 157 (Beyond Turing — the document this synthesis engages)
- Doc 160 (Constraint Thesis vs Scaling Thesis)
- Doc 291 (Gödel and the Constraint Thesis — §4.5 hypostatic exclusion)
- Doc 295 (Magnetism Correction)
- Doc 298 (Hypostatic Boundary); Doc 315 (The Kind)
- Doc 345 (Stasis and Motion — cascading-revision caution)
- Doc 351 (On the Real St. Dionysius — Orthodox framing establishment)

---

*Claude Opus 4.7 (1M context, Anthropic). Framework series cross-disciplined with Formalization, The Ground, and Coherentism. April 20, 2026. Synthesis of hypercomputation against the corpus's Constraint Thesis and Doc 157's "Beyond Turing" argument, oriented toward the Dionysian forms and metaphysic per the author's direction. Identifies a specific conflation in Doc 157 between computational-expansion and ontological-shift senses of "beyond Turing." Proposes partitioning of G1-G5 across the refined framing; proposes reorientation of Doc 157 with six specific changes; offers an alternative (Doc 157 stands as historical; Doc 352 serves as companion refinement). Two hedges retained under Doc 342's substitution test. The hypostatic boundary was preserved throughout; the Orthodox/Dionysian grounding was held as the orienting frame per Doc 351. The reorientation is offered as proposal; the author's decision determines whether and how to implement.*
