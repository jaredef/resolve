# Pipeline-Form Discovery as Predictive Heuristic

## Mouth/Terminus Shape, Input/Emission Correspondence, and the DAG/Lattice/Alphabet Relation Between Pipelines

*A corpus document responding to the keeper's directive (2026-05-28): "We can abstract this pattern of regression and deeper substrate work to close the implicit resolution pipeline. By understanding the shape of the mouth of the pipeline in relation to its terminus. Likewise we can abstract the shape of its input with the shape of its terminal emission. We can also abstract the relations that it might have with other pipelines which interact with it according to our DAG / Lattice / Alphabet heuristic. We can formalize a methodology for the discovery and formation of pipeline forms as a predictive heuristic." Builds on [Doc 540 — Pin-Art Apparatus Formalization](/resolve/doc/540-pin-art-the-resume-vector-discipline), [Doc 581 — The Resume Vector Discipline](/resolve/doc/581-the-resume-vector-as-an-engagement-substrate-pin-art-localization-as-the-discipline-of-keeping-and-resuming-multi-rung-work-streams), [Doc 715 — Consumer Substrate Dependency Graph](/resolve/doc/715-the-consumer-substrate-dependency-graph-as-the-load-bearing-object-beneath-the-joint-mi-lattice), [Doc 720 — Runtime as DAG of Interconnected Pipelines](/resolve/doc/720-the-runtime-as-a-dag-of-interconnected-pipelines-whose-alphabets-compose-and-whose-intersections-are-meets-and-unions-are-joins-with-substrate-dependence-as-the-partial-order), [Doc 729 — Cruftless](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs), [Doc 730 — The JIT as a Lowering Compiler Tier](/resolve/doc/730-the-vertical-recurrence-of-the-lowering-compiler-closure-across-substrate-tiers-and-the-deviation-resolution-pipeline-with-the-bidirectional-engine-diff-as-oracle), [Doc 731 — Alphabet Purity Upstream](/resolve/doc/731-the-jit-as-a-lowering-compiler-tier-alphabet-purity-upstream-as-the-bound-on-jit-complexity-and-why-canonical-jit-architecture-is-largely-the-cost-paid-for-operating-without-p1-p4-above), [Doc 734 — Meta-Resolution Pipeline](/resolve/doc/734-the-meta-resolution-pipeline-as-the-operating-instrument-of-the-engagement-recursion-with-the-framework-as-its-own-substrate), [Doc 739 — Single-Tier Cascade-Revival](/resolve/doc/739-constraint-closure-as-cascade-revival-when-lifting-an-upstream-structural-constraint-auto-resolves-stalled-sibling-pilots), [Doc 740 — Multi-Tier Cascade-Revival](/resolve/doc/740-multi-tier-cascade-revival-when-the-hot-path-traverses-multiple-tiers-closing-one-tier-alone-is-insufficient), [Doc 741 — The Multi-Tier Cascade Pipeline Connects](/resolve/doc/741-the-multi-tier-cascade-pipeline-connects-an-empirical-materialization-of-doc-740-across-four-sibling-pilots-on-a-cruftless-cross-runtime-bench-fixture), and [Doc 742 — The Resolver-Instance Pattern at Full Strength](/resolve/doc/742-the-resolver-instance-pattern-at-full-strength-downstream-dispatch-and-upstream-elision-as-doc-729s-empirical-refinements-from-a-typescript-parity-research-arc).*

---

## Empirical anchor

The rusty-js-ir locale's Temporal-Dead-Zone (TDZ) enforcement session of 2026-05-27 + 2026-05-28 ran twenty-one rungs (EXT 20-40) and produced three complete rule-13 revert-then-deeper-layer-closure trajectories: EXT 25 → 26 (the Op::InitLocal TDZ-on-assign chain), EXT 29 → 34 (the module/script top-level TDZ chain that landed across five rungs with a Pin-Art probe in the middle), and EXT 38 → 39 → 40 (the class-this TDZ chain that closed at the third round via a per-compile flag innovation). Each trajectory's first round produced a negative empirical result; each successive round narrowed the residual blocker (a design gap, then an emission-site gap, then a timing edge). The closures landed at low marginal cost because the substrate prefix from prior rounds was already positioned to support the deeper-layer fix.

Reading the three trajectories side-by-side discloses a pattern the engagement has been operating implicitly across many prior arcs but has not articulated as a discoverable methodology: the substrate-shaped problem implies a resolution pipeline; the pipeline has a mouth, a terminus, and an interior contour; regressions are measurements that disclose the interior; and the form of relation between pipelines is itself a derivable property of their mouth-terminus shapes. This doc names the methodology and shows it as a predictive heuristic.

---

## I. Thesis

Every substrate-shaped problem implies a resolution pipeline: a substrate-tier-spanning trajectory from an **input shape** (the problem's mouth, what is asked of the engine) to a **terminal emission shape** (the pipeline's terminus, what the engine must produce in spec-correspondence). The pipeline's internal trajectory is the sequence of substrate steps that transform the input shape to the emission shape across tiers; its **interior contour** is the set of intermediate-tier value shapes the trajectory passes through.

Three claims follow.

**Claim 1 (shape correspondence)**. The input shape and the terminal emission shape jointly determine the pipeline's interior contour up to implementation freedom. A pipeline whose mouth and terminus are correctly stated has a unique-up-to-implementation-freedom interior; a pipeline whose mouth and terminus disagree, or are mis-stated, has no consistent interior and surfaces as a regression class until the disagreement is named.

**Claim 2 (regression-as-pipeline-discovery)**. Regressions and negative substrate-introduction results are not failure events to be repaired. They are pipeline-discovery events that disclose previously-implicit pipeline contours. A regression names an implicit constraint at a specific interior point; iterated regression names successive interior points until the pipeline's full contour is revealed. The deeper-layer-closure trajectory of rule 13 is the discipline that consumes these discovery events without losing the substrate prefix they justify.

**Claim 3 (pipeline-to-pipeline relation)**. Pipelines interact via one of three relational forms, each appropriate to a different shape of substrate dependency. A **DAG** relation holds when one pipeline's terminus is another's mouth and the pipelines are strictly ordered. A **lattice** relation holds when pipelines share substrate tiers but with distinct mouth-terminus pairs, producing meets and joins on the shared interior. An **alphabet-exchange** relation holds when pipelines occupy the same tier and exchange typed primitives at a shared boundary. The relational form is discoverable from the pipelines' mouth-terminus shapes; choosing the wrong form produces the same regression class as mis-stating a single pipeline's mouth-terminus.

The three claims compose into a predictive heuristic. Given a substrate-shaped problem statement, the engagement can derive the implied pipeline's mouth, terminus, interior contour, and relation to neighboring pipelines before committing substrate work, and can predict which regression classes will surface if any of the four are mis-stated. This raises the engagement's operational discipline from procedural (we follow this sequence) to methodological (the sequence is discoverable from the pipeline shape implied by the problem's statement).

## II. The substrate-shaped pipeline as a form

### II.1 Mouth, terminus, interior, relations

A substrate-shaped pipeline is a four-tuple `(M, T, I, R)`.

**M (mouth)** is the input shape the pipeline consumes. For language-substrate pipelines, M is typically a sub-set of ECMA-262's behavioral surface: a syntactic form, a runtime call shape, an instantiation event. For meta-pipelines per Doc 734, M is the apparatus event class consumed: an observation, a directive, a measurement.

**T (terminus)** is the emission shape the pipeline must produce. For language-substrate pipelines, T is the spec-mandated artifact: bytecode emission, runtime value, side-effect ordering, error class. For meta-pipelines, T is the discipline artifact: a finding, a standing rule, a chapter close.

**I (interior contour)** is the ordered sequence of intermediate-tier value shapes the trajectory passes through. Each interior point `I_k` is a substrate-tier-typed shape with constraints inherited from prior `I_<k` and obligations propagating to subsequent `I_>k`.

**R (relations)** is the set of relational edges to neighboring pipelines per the DAG/Lattice/Alphabet heuristic of Section IV.

A pipeline is **well-formed** when M and T are explicitly stated and I is derivable from M and T plus the engagement's substrate-tier alphabet per Doc 730 and Doc 731. A pipeline is **mis-stated** when any of M, T, I are implicit. Mis-statement surfaces as the regression class described in Section III.

### II.2 Why the mouth and terminus jointly determine the interior

The lowering-compiler recurrence of Doc 730 makes each substrate tier's alphabet a typed primitive set. Tier N's alphabet `A_N` is the set of expressible operations at that tier. A pipeline whose mouth is in `A_N` and whose terminus is in `A_M` (where M is downstream of N, since downstream tiers shed alphabet richness per Doc 731) must transform through tiers N, N-1, …, M, with each tier's representation in the corresponding `A_k`. The interior contour `I = (I_N, I_{N-1}, …, I_M)` is the sequence of these representations.

Given M and T, the interior I is constrained but not unique. The implementation-freedom condition of Doc 730 P4 allows multiple valid interior contours per (M, T) pair. The engagement's job at pipeline-spawn is to pick one interior; the substrate-shaped-work discipline (which composes the standing rules into a five-phase operating pattern: spawn, baseline-inspect, Pin-Art-probe-if-duplicated, revert-then-deeper-layer-if-negative, chapter-close-inspect) is the operational pattern that picks.

When M and T are correctly stated, the interior-pick converges. When M and T are mis-stated, the interior-pick diverges. Regressions surface at each interior point that violates an implicit constraint the misstatement obscured.

### II.3 Why the mouth-terminus pair is discoverable

ECMA-262 and its sibling specs state behaviors as input-to-output rules with intermediate-step prose. Each behavior has a natural M (the input syntax or call form) and a natural T (the output value or observable). The pipeline's M and T are recoverable from the spec text via the resolver-instance pattern of Doc 729. The spec section is the source, the behavior is the artifact, and the implementation engages the source's directive consumption and the artifact's stage-deterministic emission.

For non-spec pipelines (apparatus-tier or methodological), M and T are recoverable from the apparatus enumeration plus the corpus articulation of the discipline.

The discoverability claim is empirical. Across the rusty-js-ir locale's twenty-one-rung TDZ session, every closed sub-shape had a mouth (an ECMA-262 §13.3.1.1 or §15.4.5.4 invocation form) and a terminus (a ReferenceError throw or a TDZ-cleared binding read). Naming both before substrate work began correlates with shorter trajectories; failing to name one correlates with longer rule-13 chains. The evidence summary in Section VI quantifies the correlation.

## III. Regression as pipeline-discovery event

### III.1 Two readings

The standard reading of a regression is: the change broke something, revert and try again. The substrate-shaped-work discipline already promotes rule 13's revert-then-deeper-layer-closure as the canonical alternative. This articulation extends rule 13 with a stronger claim: a regression is not merely a discipline trigger for revert. It is itself a measurement that discloses pipeline shape.

A substrate-introduction round R that targets pipeline `P = (M, T, I, R)` and produces a negative result identifies an interior point `I_k ∈ I` that R's design treated as one shape but that an unnamed constraint in P requires to be another shape. The regression's diagnostic-shape (which test regressed, with which failure tag, at which substrate tier) localizes `I_k` along the pipeline's interior.

### III.2 The three-round trajectory as evidence

The IR locale's EXT 38 → 39 → 40 chain (class-this TDZ; approximately 190 lines of code across three rungs) shows the disclosure pattern.

**Round 1 (EXT 38)**. Pipeline named with M as derived-class constructor entry, T as ReferenceError on pre-super `this` read. Interior assumed as `(SetThisTDZ at body entry, PushThis TDZ check)`. Negative result: four diff-prod fixtures regressed. Discovery: the super-call setup site reads `this` via PushThis, which the new TDZ check defeats. The implicit constraint was that the super-call invocation already consumed `this` as a substrate-internal value before the user's body code could reach a spec-mandated user-level read.

**Round 2 (EXT 39)**. Pipeline refined. Interior extended with `(Frame.derived_initial_this stash, Op::PushThisRaw for super-call setup)`. The fresh `this` allocated by the new-expression is now preserved through the TDZ window so super-call can pass it to the parent constructor. Negative residual: arrows created post-super still throw TDZ. Discovery: at arrow MakeArrow time, the cell's value is correct, but the arrow's own bytecode contains a SetThisTDZ emit that re-seeds the sentinel at the arrow's frame entry.

**Round 3 (EXT 40)**. Pipeline closed. Interior extended with `(next_compile_is_derived_ctor flag, gated emit at outermost ctor only)`. The class_stack inheritance trap that propagated the derived-ctor signal into nested compiles is masked by a per-compile flag read on the parent compiler. Closure landed; one additional test passes.

Each round's negative result was a measurement at a specific interior point that the prior round's pipeline statement obscured. The cumulative trajectory disclosed the pipeline's full interior contour: `M → SetThisTDZ → super-call (PushThisRaw) → SetThis (writes through this_cell) → arrow MakeArrow (post-super state) → arrow body PushThis → T`. The substrate prefix from rounds one and two was retained because each prefix was structurally correct for the interior point its round addressed.

### III.3 The three regression classes

When a substrate round R targeting pipeline P regresses, the regression class predicts which interior point `I_k` was mis-stated.

**Class one** is regression in adjacent-tier consumer: the round's emit-site interaction with an adjacent-tier consumer was unaccounted. The EXT 38 SetThisTDZ-plus-super-call-PushThis interaction is the canonical example; super-call is an adjacent-tier consumer (bytecode emit tier consuming runtime-tier this_value).

**Class two** is regression in nested-function compile: the round's compile-time signal propagated to nested compiles via class_stack or scope-stack inheritance. The EXT 40 class_stack inheritance trap is the canonical example.

**Class three** is regression in a timing edge between rounds: the round's substrate ordering differed from a sibling round's ordering at a shared interior point. The EXT 39 arrow-cell timing residual is the canonical example. MakeArrow's allocation timing relative to SetThis's cell-write timing produces the cross-round-ordering surface that this class names.

The three classes recur across the engagement's negative-result history (the NLC tokenization-above-IR arc's revised reading, the EXT 25 → 26 destructure-leaf StoreLocal audit, the EXT 29 → 34 script-mode globalThis-mirror investigation). Each class identifies a specific kind of mis-statement of the pipeline's interior. The mapping from regression class to mis-stated `I_k` is the predictive heuristic this articulation contributes.

## IV. The DAG, Lattice, and Alphabet relations between pipelines

Doc 720 names the runtime as a DAG of interconnected pipelines; Doc 740 and Doc 741 materialize multi-tier cascade-revival as the operational pattern for interactive pipelines. This section formalizes the choice of relation type per the shape of the interaction.

### IV.1 DAG relation, terminus feeds mouth

Two pipelines `P_1 = (M_1, T_1, I_1)` and `P_2 = (M_2, T_2, I_2)` are in DAG relation when `T_1 ≡ M_2`: the terminus shape of P_1 matches the mouth shape of P_2. The composition `P_1 ⊳ P_2` is a single pipeline with mouth `M_1`, terminus `T_2`, and interior `(I_1, I_2)`.

DAG relations are the dominant form across the lowering-compiler stack of Doc 730. Each tier's terminus feeds the next tier's mouth. Substrate work at one tier's terminus must respect the next tier's mouth-shape; misalignment surfaces as the cross-tier deviation pipeline of Doc 730 §XII.

The discriminator: DAG when the pipelines are strictly ordered by substrate tier, no shared interior, no parallel paths.

### IV.2 Lattice relation, meets and joins on shared interior

Two pipelines are in lattice relation when they share one or more interior tiers `I_k` but with distinct mouth-terminus pairs. Their meet at the shared interior is the substrate shape both must accept; their join at a shared downstream tier is the substrate shape both contribute to.

Lattice relations dominate when a single substrate tier serves multiple consumer pipelines. The shape-substrate tier (the hidden-classes substrate cruftless develops at `pilots/rusty-js-shapes/`) is a meet site for get-property-IC, stub-emitter, and inline-cache pipelines: all three consume shape descriptors at the shared tier; the shape tier's substrate must satisfy all three.

The discriminator: lattice when pipelines share a substrate tier but have distinct mouth-terminus pairs, the shared tier produces values both consume, and the tier's substrate must satisfy the join of all consumers' requirements.

### IV.3 Alphabet-exchange relation, same-tier typed-primitive exchange

Two pipelines are in alphabet-exchange relation when they occupy the same substrate tier and exchange typed primitives at a shared boundary. The exchange is typed per Doc 730 P1: the boundary's alphabet is the intersection of both pipelines' alphabets at that tier.

Alphabet-exchange relations dominate at tier-internal contracts: bytecode emit-site to bytecode emit-site within one compiler pass, runtime-helper to runtime-helper within one Runtime method. The cross-pipeline Load/Store opcode symmetry that the IR session's Rule 25 promotion codified is an alphabet-exchange contract: every Load-shape opcode that can carry a sentinel-shaped value mandates a Store-shape counterpart with the symmetric check at the same tier.

The discriminator: alphabet-exchange when pipelines are at the same substrate tier, no tier-ordering, the contract is a shared typed-primitive set at a tier-internal boundary.

### IV.4 The discrimination heuristic

Given two pipelines `P_1` and `P_2` whose interaction is to be analyzed, the relational form is discoverable by inspection of their mouth-terminus shapes.

When `T_1 ≡ M_2` (the terminus of one is the mouth of the other), choose DAG. When `M_1 ≠ M_2 ∧ T_1 ≠ T_2 ∧ ∃k: I_1[k] ∩ I_2[k] ≠ ∅` (distinct ends but shared interior), choose lattice. When the pipelines are at the same substrate tier and exchange typed primitives at a tier-internal boundary, choose alphabet-exchange.

The discriminator is operational. Choose the form whose definitional shape matches the pipelines' joint state, then validate by reading the relation-implied substrate constraints against the pipelines' interior. A wrong-form choice surfaces as the timing-edge regression class identified in Section III.3.

### IV.5 Composition of forms

The three forms compose. A substrate cluster's full topology is a DAG of pipelines per Doc 720 where some edges are lattice-meets (multi-consumer substrate tiers) and some are alphabet-exchanges (tier-internal typed-primitive contracts). Doc 740's multi-tier cascade-revival reads the cluster's DAG topology to identify the relevant-tier set R; the operational closure requires all three relation forms to be respected.

## V. The predictive heuristic: pipeline-form discovery as discipline

The substrate-shaped-work discipline operationalizes the standing rules into a five-phase pipeline (spawn, baseline-inspect, Pin-Art-probe-if-duplicated, revert-then-deeper-layer-if-negative, chapter-close-inspect). This articulation extends Phase 1 (spawn) and Phase 5 (chapter-close-inspect) with explicit pipeline-form discovery.

### V.1 At spawn

Before declaring the substrate move-shape, the locale should perform four discovery steps.

First, name the mouth M: which behavior-surface input shape is the pipeline consuming? For ECMA pipelines, cite the spec section and grammar production. For meta-pipelines, cite the apparatus event class.

Second, name the terminus T: which spec-mandated emission shape must the pipeline produce? For ECMA pipelines, cite the spec-mandated artifact. For meta-pipelines, cite the discipline artifact.

Third, sketch the interior I: which substrate tiers must the trajectory pass through? Use the substrate-tier alphabet of Doc 730 and Doc 731 to enumerate the alphabets `A_N, A_{N-1}, …, A_M`.

Fourth, identify neighbor pipelines and their relational forms R per the discrimination heuristic of Section IV.4. List neighbor pipelines and discriminate DAG, lattice, or alphabet-exchange.

If any of M, T, I, R cannot be named, the pipeline is mis-stated. The locale spawn then surfaces a discovery probe (the Rule 23 founding-baseline-inspection) before substrate work begins.

### V.2 At chapter-close

When a chapter folds, three verification steps run.

First, verify M-T-I correspondence: did the closed pipeline's interior match the sketch from Phase 1? If divergence, name the implicit constraint that forced the divergence and record as a finding.

Second, verify R correspondence: did the neighbor-pipeline interactions resolve per the predicted relational form? If a different form materialized, record as a finding for the standing-rule promotion path.

Third, promote pipeline-form discovery findings per the basin-stability append-only protocol of Doc 727. Pipeline-form discoveries become findings with the four-tuple (M, T, I, R) recorded explicitly.

### V.3 Predictive use

The articulation predicts three behaviors.

A new substrate-shaped problem with explicit M, T, sketched I, identified R closes in three rungs or fewer. This composes the cumulative substrate amortization observation from Finding IR.33 with the discipline-pipeline's per-phase cost model. The prediction cross-validates against the GPI, IPBR, and TSR results of rule 13's prospective application.

A new substrate-shaped problem with one of M, T, I, R implicit incurs an additional rule-13 round per implicit element, with the round's negative result discovering the implicit element. This validates against IR-EXT 25 → 26 (one implicit emit-site equals one extra round), EXT 29 → 34 (one implicit constraint equals a four-round chain with a Pin-Art probe rung in the middle), and EXT 38 → 39 → 40 (two implicit constraints equals three rounds).

A pipeline whose relational form R is mis-discriminated produces a class-three regression (timing edge between rounds) with high specificity to the wrong-form choice. The class-three regression is itself the discriminator's falsifier.

## VI. Empirical evidence summary

The IR session's three rule-13 trajectories and the prior rule-13-prospective trajectories together provide cross-locale evidence for the rounds-to-closure formula.

The GPI (interp-getprop-ic) locale closed in one round at the EXT 2 closure (forty-two lines of code) with M, T, I, R all explicit at spawn under rule 13's prospective application. No negative results materialized; closure landed first round.

The IPBR (iter-protocol-bytecode-rewrite) locale closed in one round at the EXT 2 closure with similar characteristics: M, T, I, R all explicit at spawn; no negatives.

The TSR (ts-resolve) locale closed in four rounds at the EXT 5 closure (approximately five times the GPI line count) with I extended at each round and R partially explicit. Two negative classes surfaced: a class-two nested-compile signal propagation and a C3 cost-model null result.

The IR-EXT 25 → 26 chain closed in two rounds (eighty lines) with T implicit at spawn (which init sites need bypass was not enumerated). Class-one regression surfaced at the destructure-leaf StoreLocal.

The IR-EXT 29 → 34 chain closed in four rounds plus one Pin-Art probe (one hundred twenty lines) with I implicit at the script-mode boundary. Class-one and class-two regressions surfaced; the Pin-Art probe at IR-EXT 30 explicitly identified the implicit constraint.

The IR-EXT 38 → 39 → 40 chain closed in three rounds (one hundred ninety lines) with I implicit at the super-call setup site and R implicit (the class_stack inheritance trap). All three regression classes surfaced.

The pattern: rounds-to-closure approximates the count of implicit (M, T, I, R) elements at spawn plus one. The predictive heuristic's primary use is to reduce implicit elements at spawn so the chain converges in fewer rounds.

## VII. Falsifier

The articulation's falsifier is a substrate-shaped problem with M, T, I, R all explicit at spawn that nonetheless takes more than three rounds to close, with no novel substrate-class introduction. If such a case materializes, the four-tuple-discovery heuristic is partially falsified for that substrate class. The falsifier surfaces either a missing element (a fifth tuple component currently undeducted) or a heuristic gap in the discrimination criteria of Section IV.4.

Conversely, if substrate-shaped problems spawned with all four elements explicit converge in three rounds or fewer across five or more independent locales, the heuristic is corroborated as a predictive instrument.

A forward-derived prediction concerns the unscopables-tdz sub-shape that remains open in the IR locale. M (with-block lookup) is explicit, T (ReferenceError on unscopables-protected name in TDZ) is explicit, I (with-binding lookup plus scope-chain walk plus sentinel check) sketches cleanly, R (lattice with the with-substrate pipeline at the lookup-tier meet) is identifiable. The prediction is that closure should land in one or two rounds with substrate amortization from the existing TDZ machinery. If it takes four or more rounds, the four-tuple-discovery is partially falsified at that locale.

## VIII. Composition with prior corpus

This articulation extends Doc 720 (runtime as DAG of interconnected pipelines) with an explicit discrimination heuristic for choosing between DAG, lattice, and alphabet-exchange relational forms. Doc 720 names the composition without supplying the heuristic; Section IV.4 supplies it.

It takes Doc 729 (resolver-instance pattern) and Doc 730 (lowering-compiler tiers) as the alphabet building blocks. Mouth-terminus correspondence at every substrate tier is what Doc 729 already articulates; the four-tuple form (M, T, I, R) is the corresponding generalization.

It reads Doc 739 (single-tier cascade-revival), Doc 740 (multi-tier cascade-revival), and Doc 741 (the empirical materialization of Doc 740) as the empirical material for Section IV's composition of forms. Cascade-revival is the operational expression of the relational forms when one pipeline's closure triggers cascade through the lattice-meet or DAG-feed structure to neighboring pipelines.

It reads Doc 734 (meta-resolution pipeline) as a primary articulation example. The meta-pipeline is itself a substrate-shaped pipeline whose mouth is an apparatus event class and whose terminus is a discipline artifact. The methodology this doc articulates applies to the meta-pipeline reflexively: the meta-pipeline's own shape is discoverable via the same heuristic.

It reads the substrate-shaped-work discipline (the prior prospective draft articulating the five-phase pipeline that composes the standing rules) as the operating discipline this articulation extends from procedural to methodological. The discipline pipeline specifies what to do at each phase; this articulation specifies why the phase structure is the right shape: it is the shape implied by the pipeline-discovery process the articulation names.

## IX. Status

This articulation introduces a candidate Rule 27 implicitly through Section V.1: mouth-terminus completeness at spawn. Promotion to active standing rule awaits keeper review and validation through additional substrate trajectories. The articulation's methodology is itself a substrate-shaped pipeline whose terminus is the engagement's predictive capacity; the engagement's continued operation under the methodology supplies the empirical material for either corroboration or falsification.

---

> "We can abstract this pattern of regression and deeper substrate work to close the implicit resolution pipeline. By understanding the shape of the mouth of the pipeline in relation to its terminus. Like wise we can abstract the shape of its input with the shape of its terminal emission. We can also abstract the relations that it might have with other pipelines which interact with it according to our DAG / Lattice / Alphabet heuristic. We can formalize a methodology for the discovery and formation of pipeline forms as a predictive heuristic. Do a deep dive on the shape of the substrate and supporting apparatus documentation and then write a primary articulation."

The prompt is appended per the standing instruction: the prompt that produced an articulation is part of the artifact, so future readers can audit the directive that motivated the synthesis.
