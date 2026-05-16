# Feature-Set Prediction

## Static Substrate-Need Mapping from Source

By Jared Foy. Originally published at [jaredfoy.com](https://jaredfoy.com).

## I. The occasion

The rusty-bun engagement closed roughly fifty substrate moves over two days against a 71-package value-exercise probe. Each closing followed the same rhythm: a package fails, the trace surfaces a tag chain, the chain names a missing feature, a single ECMA spec section gets implemented, the package lifts, the next package's failure surfaces a different missing feature. By the fortieth closing the rhythm had become a discipline. By the fiftieth it had become predictive.

The keeper named what was surfacing: *"my conjecture is that we can predict which engine feature is required for any number of npm packages."*

The conjecture is a claim about direction. The route-(b) diagnostic protocol ([Doc 721](/resolve/doc/721-the-cross-pipeline-diagnostic-protocol-locating-the-top-of-a-substrate-widenings-alphabet-by-walking-the-engines-dag)) reads *backward*: from observed failure to required feature. The conjecture asserts that the same map can be read *forward*: from source code to required-feature-set, without ever running the code.

This document formalizes the conjecture. The claim is general: **for any apparatus built under Pin-Art, the bidirectional substrate↔parity traceability ([Doc 714](/resolve/doc/714-the-rusty-bun-engagement-read-through-the-lattice-extension-basin-expansion-at-the-l2m-saturation-point) §VI Consequence 14) supports static prediction of substrate requirements from source. The forward direction is the testable form of the backward-direction discipline.**

## II. The recognition

Three claims, in order from operational to structural.

**Claim 1 (operational).** Every package failure observed in the engagement terminated at a specific ECMA-262 or Node API feature. None terminated at "vague semantic confusion" or "unknown behavior." The set of features ever encountered is finite and bounded by the spec surface a corpus package actually exercises.

**Claim 2 (compositional).** A package's source is a static description of which features it requires. The AST reveals every property access, every method call, every regex pattern, every new-expression, every spread, every iteration. The set of feature sites is countable from source alone, before execution. Mapping each site to its spec feature requirement is mechanical.

**Claim 3 (structural).** Substrate need is therefore not a runtime discovery. It is a forward-readable function of source. The backward-reading discipline that produced fifty closings in two days was reading the same map the forward direction would, only later. The apparatus's bidirectional traceability property is what makes both directions read off the same structure.

The three claims form a hierarchy. Claim 1 is testable by sampling closings; we have fifty samples. Claim 2 is testable by writing the static analyzer; the engagement provides the ground truth. Claim 3 is the structural reading; it is testable only when the forward and backward readings produce the same feature set for the same package.

## III. The structure that supports prediction

[Doc 714](/resolve/doc/714-the-rusty-bun-engagement-read-through-the-lattice-extension-basin-expansion-at-the-l2m-saturation-point) §VI Consequence 14 named bidirectional substrate↔parity traceability as the load-bearing Pin-Art property. The forward direction read: substrate moves correspond predictably to which packages lift. The backward direction read: when a package fails, the failure's trace localizes which substrate is missing.

The bidirectionality was demonstrated as a property of the apparatus once Pin-Art was applied to its construction. The two directions read off the same structural map because the apparatus's pipeline-DAG topology ([Doc 720](/resolve/doc/720-the-rusty-bun-runtime-as-a-dag-of-interconnected-pipelines-sipe-t-topology-over-the-engine-substrate)) is the same in both readings.

The third reading, which this document names, is *forward without execution*. It is also a property of the same map. The source AST is itself a description of which DAG paths the package will exercise. The DAG paths are countable. The features each path requires are countable. The intersection of "features the package needs" with "features the engine provides" predicts pass-or-fail, and the difference predicts where.

The semiotic frame Doc 723 named applies here too. The source AST is a set of signs. Their interpretation is layer-indexed by the apparatus DAG. Reading the source forward means reading those signs in the topology's interpretive frame, the same frame that the route-(b) trace reads when it walks backward from a failure.

## IV. The shape of a feature-set predictor

The operational form is a static analyzer with three stages.

**Stage 1: AST walk.** Walk the source of an npm package. At each AST node, emit a "feature site" record. A property access `obj.foo` emits a GetProp site. A method call `obj.bar(args)` emits a CallMethod site with the method name and argc. A `new Cls(...)` emits a Construct site. A regex literal emits a RegExp site with the pattern. A spread emits an iterator site. The walk is mechanical and bounded by the AST grammar.

**Stage 2: Feature mapping.** Each feature site maps to one or more ECMA-262 / WHATWG / Node spec features the engine must support. `String.prototype.substr` is a feature. `Array.prototype.reverse` is a feature. Named capture groups in regex are a feature. The mapping is a finite table indexed by site shape and identifier. The corpus articulations of closings produced by the engagement *are* this table, populated entry by entry.

**Stage 3: Set intersection.** The engine's current capability set is also enumerable: every implemented prototype method, every supported regex feature, every native built-in. The package's required feature set minus the engine's provided set predicts which packages will fail, and the residue names which features close which packages. The prediction is forward.

The third stage is what makes the prediction testable. Run the analyzer against a fresh npm package. Predict pass-or-fail. Run the package under the engine. The prediction's match-or-mismatch is a corpus-grade test of the bidirectional traceability claim.

## V. The boundedness condition

A predictor of this shape is possible only when the feature space is bounded. Three boundedness conditions hold for the npm corpus the engagement targets.

**B1: Spec finiteness.** ECMA-262, WHATWG Encoding / URL / Streams, and Node's API surface are finite documents. The number of distinct feature sites a package can exercise is finite, bounded by the documented spec surface.

**B2: Empirical cluster.** In fifty closings, the feature surface actually touched by the 119-package corpus collapsed to roughly two-hundred to four-hundred distinct features. Most packages reuse the same features. The empirical cluster is small.

**B3: AST recoverability.** Every npm package targeted is JavaScript source, AST-parseable. A static analyzer can walk every package without runtime execution. The walk is finite and decidable.

The three conditions support the operational possibility of the predictor. A corpus with unbounded feature space, infinite empirical cluster, or unparseable source would fail one of the conditions and the predictor would not exist.

## VI. The Pin-Art reading

The Pin-Art apparatus produces a derivation chain ([Doc 581](/resolve/doc/581-pin-art-the-resume-vector-and-the-discipline-of-near-necessity-substrate-construction)). Each substrate move is a derivation from a named contingency. The chain is auditable. The route-(b) trace ([Doc 721](/resolve/doc/721-the-cross-pipeline-diagnostic-protocol-locating-the-top-of-a-substrate-widenings-alphabet-by-walking-the-engines-dag)) walks the chain backward from a failure to locate the next derivation site.

The feature-set predictor is the forward-walking instrument over the same chain. Each AST feature site is a node in the chain whose backward-walk would terminate at the same substrate the predictor names forward. The Pin-Art property that supports both directions is the *traceability of the derivation chain itself*. Once the apparatus is built to keep that traceability, both readings are available; once one direction is exercised as discipline, the other becomes a testable prediction.

The recognition therefore is not "we should also build a predictor." The recognition is that the predictor was implicit in the apparatus the whole time. The discipline of fifty backward-walks was reading the same map a single forward-walk would read once. The forward direction is cheaper.

## VII. Application

Three applications follow.

**A1: Pre-flight feature check.** Before adding a new package to the corpus, run the predictor on its source. Report the required-feature delta from the engine's current capability set. The delta is the substrate move-set needed before the package will pass. No execution required.

**A2: Engagement planning.** When choosing which package to target next, sort by predicted feature-delta. Smaller deltas close first. Larger deltas reveal multi-feature dependencies that should be sequenced. The engagement's pace becomes a function of the predicted graph, not of trial-and-error.

**A3: Spec coverage map.** The union of feature sites across the corpus produces a spec coverage map. The map names which sections of ECMA-262 the corpus actually exercises and which are dead surface. The engine's implementation work is sortable by coverage frequency. The Pin-Art "near-necessity" criterion becomes literal: a feature is near-necessary in proportion to its coverage count.

The three applications convert the conjecture into operating instruments per [Doc 722](/resolve/doc/722-named-recognitions-as-operating-instruments-the-reflexive-structure-of-corpus-articulations). The conjecture, once named, ceases to be a conjecture and becomes a workflow shift.

## VIII. The relation to prior articulations

This document sits in a sequence.

[Doc 714](/resolve/doc/714-the-rusty-bun-engagement-read-through-the-lattice-extension-basin-expansion-at-the-l2m-saturation-point) §VI Consequence 14 named bidirectional substrate↔parity traceability as a Pin-Art property.

[Doc 720](/resolve/doc/720-the-rusty-bun-runtime-as-a-dag-of-interconnected-pipelines-sipe-t-topology-over-the-engine-substrate) named the engine's DAG topology.

[Doc 721](/resolve/doc/721-the-cross-pipeline-diagnostic-protocol-locating-the-top-of-a-substrate-widenings-alphabet-by-walking-the-engines-dag) named the backward-walking protocol over that DAG.

[Doc 722](/resolve/doc/722-named-recognitions-as-operating-instruments-the-reflexive-structure-of-corpus-articulations) named that articulations become operating instruments once formalized.

[Doc 723](/resolve/doc/723-diagnostic-tags-as-semiotic-signs-layer-indexed-interpretation-in-pipeline-dag-topologies) named that diagnostic tags are semiotic signs requiring layer-indexed interpretation.

This document (724) names the forward-walking instrument that completes the bidirectional reading Doc 714 named. It does not propose new mechanism. It names that the mechanism Doc 714 named as a property is also a workflow once the forward direction is exercised.

## IX. The testable prediction

The forward predictor admits one immediate test. Take the 71-package value-exercise probe currently sitting at 64/71 pass. Run the predictor on each remaining seven failing packages. Report the predicted feature set required to lift each. Compare against the backward-walking traces already gathered for the same packages.

If the prediction's feature set matches the trace's feature set for at least five of the seven, the bidirectional reading is empirically confirmed at this scale. If it matches all seven, the predictor is operational and ready for the wider corpus.

The test is finite, bounded, and within reach of one engagement session. The conjecture stops being a conjecture at that point.

— Jared Foy
