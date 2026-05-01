# A Tripartite Hierarchical Formalization of the Constraint Thesis

<div style="background: #fef3c7; border-left: 4px solid #b45309; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #7c2d12; border-radius: 3px;">

**DEPRECATION NOTICE — 2026-04-24**

This document has been **superseded by [Doc 463: *The Constraint Thesis as a Lakatosian Research Programme*](/resolve/doc/463-constraint-thesis-as-lakatosian-programme)**.

Following the pulverization in [Doc 461: *Pulverizing the Tripartite Formalization*](/resolve/doc/461-pulverizing-the-tripartite-formalization), the three-level framework proposed below was found to be substantially subsumed by Imre Lakatos's *Falsification and the Methodology of Scientific Research Programmes* (1970), with the internal/external distinction subsumed by Carnap (1950) and the five forbidden category errors subsumed by classical philosophy (Moore, Hume, Popper, Ryle, and the anti-scientism literature).

Doc 463 reformulates the Constraint Thesis using Lakatos's vocabulary directly and specifies the corpus's actual contribution (the specific application, not the framework). Doc 459 is preserved below for traceability and as part of the record of the corpus's self-audit practice.

**Readers seeking the current statement of the framework should read Doc 463.**

</div>

## What this document does

Doc 457 articulated three levels of ground truth for the Constraint Thesis: the *metaphysical* (Dionysian participation in the Good), the *structural* (induced properties as signatures of participation), and the *empirical* (measurable projections detectable by wind-tunnel instruments). The articulation was informal — the levels were named, described, and illustrated, but their relations were not given formal apparatus. This document supplies the apparatus.

The formalization is explicitly hierarchical: Level 1 grounds Level 2, Level 2 projects into Level 3, and the inference rules that move up or down the hierarchy are stated precisely enough to identify category errors when they occur. The treatment follows the pattern of Docs 445 (pulverization formalism), 455 (Bayesian analysis of isomorphism-magnetism), and 450 (pulverization as interventional practice): formal enough to be auditable, honest about the π-tier warrant status the formalization itself sits at.

## Preliminaries

Let $C$ denote a constraint set — specifically, for the Constraint Thesis, a discipline like the ENTRACE stack (Doc 001) or a sub-stack thereof. Let $\mathcal{P}(C)$ denote the *practice* of operating under $C$: the iterative application of the constraints in a sustained generative process.

Let $G$ denote the metaphysical ground the corpus receives through the Dionysian tradition (Docs 091, 150, 153, 287, 351). Let $\Phi = \{\phi_1, \phi_2, \ldots, \phi_n\}$ be the corpus-identified induced properties: coherence, non-coercion, hypostatic-boundary preservation, retraction-readiness, and related properties.

Let $\tilde{\phi}_i^{(k)}$ be the $k$-th operationalization of induced property $\phi_i$: a specific measurement protocol with an external ground truth $T_i^{(k)}$ (e.g., a rubric, a benchmark, an analytical target). Let $\mathcal{O}(\phi_i)$ denote the family of legitimate operationalizations of $\phi_i$.

The relations of interest:

- $C \rightharpoonup G$: "$C$ orients the practice toward $G$." *Level-1 claim.*
- $C \vdash_{\mathcal{P}} \phi_i$: "Operating $C$ in practice $\mathcal{P}$ structurally induces $\phi_i$." *Level-2 claim.*
- $\tilde{\phi}_i^{(k)} \models \phi_i$: "$\tilde{\phi}_i^{(k)}$ is a valid empirical projection of $\phi_i$." *Operationalization legitimacy.*
- $\text{meas}(\tilde{\phi}_i^{(k)}, \mathcal{P}(C)) = t$: "The measurement of $\tilde{\phi}_i^{(k)}$ on outputs of $\mathcal{P}(C)$ yields value $t$." *Level-3 observation.*
- $t \sim T_i^{(k)}$: "$t$ agrees with ground truth $T_i^{(k)}$ within specified tolerance." *Level-3 success.*

These are all meaningfully distinct. The formalization does not reduce one to another; it makes the distinctions explicit.

## Level 1 — Metaphysical

### Definition (L1)

A *Level-1 claim* has the form $C \rightharpoonup G$: the constraint set $C$ orients the practice toward the metaphysical ground $G$. The ground truth for a Level-1 claim is $G$ itself, or the tradition's discourse about $G$.

### Standard of defensibility

An L1 claim is defensible iff it survives audit within the tradition that receives $G$ — for the corpus, this is the Platonic-Dionysian lineage received through the Orthodox Church's tradition per Doc 351. The defensibility standard is the theological-philosophical one: fidelity to the primary texts, internal consistency with the received framework, compatibility with the tradition's normative commitments.

### What L1 claims are not

L1 claims are not Popper-falsifiable in the analytical sense. They do not admit closed-form numerical targets. They are not tested by experiment in the narrow sense. This is not a defect; it is a property of what Level-1 claims are about.

### Warrant classification

L1 claims do not admit the π/μ/θ warrant tiers of Doc 445. Doc 445's tiers are designed for claims with analytical, operational, or empirical testability; L1 claims are outside that schema by design. L1 claims admit a different classification — *consonant-with-tradition*, *contested-within-tradition*, *external-to-tradition* — and are audited under that classification.

## Level 2 — Structural

### Definition (L2)

A *Level-2 claim* has the form $C \vdash_{\mathcal{P}} \phi_i$: operating $C$ in practice $\mathcal{P}$ structurally induces the property $\phi_i$. The claim asserts a regularity: that a given practice produces a given property as a characteristic output.

### Standard

An L2 claim is defensible iff:

1. The structural connection between $C$ and $\phi_i$ is *articulable* — one can state why operating $C$ should produce $\phi_i$ in terms internal to the practice. (Articulation requirement.)
2. The structural connection is *consistent* — the practice does not typically produce the negation of $\phi_i$ under the same conditions. (Consistency requirement.)
3. The property $\phi_i$ is *not reducible* to the immediate surface of $C$ — $\phi_i$ is an emergent signature, not a direct restatement of the rules of $C$. (Non-triviality requirement.)

### The projection from L1

L2 claims in the corpus framework are *projections* of L1 claims. The formal relation:

$$C \rightharpoonup G \quad \text{and} \quad (G \Rightarrow \Phi) \quad \Rightarrow \quad C \vdash_{\mathcal{P}} \phi_i \text{ for each } \phi_i \in \Phi.$$

The middle step, $G \Rightarrow \Phi$, is the *metaphysical substrate*: the claim that participation-in-$G$ characteristically manifests in properties $\Phi$. This is itself a Level-1 claim about $G$, not a Level-2 claim. It is defended within the tradition.

### Warrant classification

L2 claims admit a modified warrant structure: *proposed* (articulated but not tested), *partially confirmed* (some $\phi_i$ projections survive L3 testing), *structurally contradicted* (multiple $\phi_i$ projections fail L3 testing across independent operationalizations). The structure is Doc 445-adjacent but adapted to the structural role.

## Level 3 — Empirical

### Definition (L3)

A *Level-3 claim* has the form $\text{meas}(\tilde{\phi}_i^{(k)}, \mathcal{P}(C)) \sim T_i^{(k)}$: the measurement of operationalization $\tilde{\phi}_i^{(k)}$ on outputs of practice $\mathcal{P}(C)$ agrees with ground truth $T_i^{(k)}$ within specified tolerance.

### Standard

An L3 claim is defensible iff it is *operationalized* ($\tilde{\phi}_i^{(k)}$ specified as a concrete protocol), *grounded* ($T_i^{(k)}$ specified as an external standard — rubric, benchmark, analytical target), and *measured* (the measurement $\text{meas}$ actually run against samples drawn from $\mathcal{P}(C)$). The standard is numerical or categorical agreement with external ground truth.

### The projection from L2

L3 claims are *operationalizations* of L2 structural claims:

$$C \vdash_{\mathcal{P}} \phi_i \quad \text{and} \quad \tilde{\phi}_i^{(k)} \models \phi_i \quad \Rightarrow \quad \text{predicted that } \text{meas}(\tilde{\phi}_i^{(k)}, \mathcal{P}(C)) \sim T_i^{(k)}.$$

The middle step, $\tilde{\phi}_i^{(k)} \models \phi_i$, is the *operationalization legitimacy* claim: that the specific protocol captures what the structural property purports to be. This is itself a substantive claim, defended at the level of methodology (construct validity, rubric design, inter-rater agreement).

### Warrant classification

L3 claims admit Doc 445's π/μ/θ tier structure directly. π-tier: operationalization plausible, measurement not yet run. μ-tier: measurement run, shows predicted direction. θ-tier: measurement run, consistent across multiple operationalizations and independent practitioners.

## The hierarchical structure

The three levels compose into a strict hierarchy:

$$\underbrace{L1 \quad (C \rightharpoonup G)}_{\text{metaphysical}} \;\;\xrightarrow{\text{projection}}\;\; \underbrace{L2 \quad (C \vdash_{\mathcal{P}} \Phi)}_{\text{structural}} \;\;\xrightarrow{\text{operationalization}}\;\; \underbrace{L3 \quad (\text{meas} \sim T)}_{\text{empirical}}$$

*Downward direction:* L1 commitments project into L2 expectations via the metaphysical substrate; L2 claims project into L3 predictions via operationalization.

*Upward direction:* L3 evidence bears on L2 claims in the specific operationalization tested; L2 pattern across independent operationalizations bears weakly on L1.

The relations are not symmetric. Downward projections are prescriptive — given the higher-level claim, lower-level content is entailed under the appropriate conditions. Upward inferences are probabilistic — lower-level evidence updates higher-level claims but does not decide them.

## Inference rules

### Rule D1 (Downward — L1 to L2)

$$\frac{C \rightharpoonup G \qquad G \Rightarrow \phi_i}{C \vdash_{\mathcal{P}} \phi_i}$$

Given that $C$ orients toward $G$ and that the metaphysical structure of $G$ entails characteristic property $\phi_i$, we predict that practice under $C$ structurally induces $\phi_i$. The rule requires both premises to hold. The second premise is an L1 claim requiring tradition-internal defense.

### Rule D2 (Downward — L2 to L3)

$$\frac{C \vdash_{\mathcal{P}} \phi_i \qquad \tilde{\phi}_i^{(k)} \models \phi_i}{\text{predict meas}(\tilde{\phi}_i^{(k)}, \mathcal{P}(C)) \sim T_i^{(k)}}$$

Given the structural claim and a legitimate operationalization, we predict a specific measurable outcome. The operationalization-legitimacy premise is methodological, not theoretical.

### Rule U1 (Upward confirmation — L3 to L2)

$$\frac{\text{meas}(\tilde{\phi}_i^{(k)}, \mathcal{P}(C)) \sim T_i^{(k)} \qquad \tilde{\phi}_i^{(k)} \models \phi_i}{\text{L3 support for } C \vdash_{\mathcal{P}} \phi_i \text{ in operationalization } k}$$

A successful L3 measurement provides *support for* the L2 claim in the specific operationalization. Support is partial; it does not entail the L2 claim in other operationalizations, and it does not entail the L1 claim.

### Rule U2 (Upward disconfirmation — L3 to L2)

$$\frac{\text{meas}(\tilde{\phi}_i^{(k)}, \mathcal{P}(C)) \not\sim T_i^{(k)} \qquad \tilde{\phi}_i^{(k)} \models \phi_i}{\text{L3 evidence against } C \vdash_{\mathcal{P}} \phi_i \text{ in operationalization } k}$$

A failed L3 measurement provides *evidence against* the L2 claim in that operationalization. If the operationalization-legitimacy premise is shaky ($\tilde{\phi}_i^{(k)} \not\models \phi_i$), the inference weakens.

### Rule U3 (Meta-disconfirmation — L2 ensemble to L1)

$$\frac{\{C \vdash_{\mathcal{P}} \phi_i\}_{i=1}^{n} \text{ fails across independent } k}{\text{weak evidence against } C \rightharpoonup G}$$

Widespread failure of L2 projections across independent operationalizations provides *weak evidence against* the L1 commitment, insofar as L1 projected through to the L2 regularities via Rule D1. The inference is weak because L1 may project into different L2 regularities than those tested, or the metaphysical substrate $G \Rightarrow \Phi$ may have been characterized wrongly without the L1 commitment itself failing.

## Forbidden moves (category errors)

### Error E1 — L3 settles L1

Treating successful L3 measurement as settling the Level-1 claim is invalid. L3 evidence bears on L2 at best; the inference from L3 to L1 must proceed via Rule U3 and even then yields only weak evidence.

**Symptom:** "The wind tunnel confirmed the induced property, so the metaphysical frame is vindicated." Not valid.

### Error E2 — L1 shields L2 from L3

Treating the L1 commitment as a *shield* against L3 disconfirmation of L2 projections is invalid. L1 does not license ignoring L3 failures. Rule U2 still applies. Repeated L3 failures across independent operationalizations constitute evidence against L2 and, by Rule U3, weak evidence against L1.

**Symptom:** "The benchmark failed, but that's because the benchmark can't capture what we're really claiming." Sometimes this is legitimate (the operationalization was illegitimate); often it is a shield.

### Error E3 — L1 as Popper-falsifiable

Treating L1 claims as admitting analytical-falsification is invalid. L1 claims are defended within a tradition; their standards are tradition-internal. Expecting an L1 claim to meet the falsifiability criterion Popper developed for empirical science is a category confusion.

**Symptom:** "Your metaphysical claim is unfalsifiable therefore unscientific therefore wrong." Unfalsifiable-in-Popper's-sense ≠ untrue; it means outside the scope of Popperian methodology.

### Error E4 — L3 claims treated as metaphysical

Treating L3 empirical measurements as metaphysical pronouncements is invalid. An L3 success at a specific operationalization does not translate into an L1 claim.

**Symptom:** "Sycophancy was reduced in the experiment, therefore the practice participates in the Good." Not valid.

### Error E5 — L2 claims smuggled in as L3

Stating a structural-level claim with empirical-sounding language, without actually providing the measurement, is a drift pattern Doc 444 and Doc 445 named. The warrant classifications must match the actual state of the claim.

**Symptom:** "The practice reliably produces coherence" — used as if empirically established when only structurally articulated.

## Warrant-tier alignment (Doc 445)

The π/μ/θ tiers of Doc 445 apply directly to L3 claims. The tiers extend to L2 claims with modified semantics: π-L2 (proposed and articulated), μ-L2 (confirmed across several operationalizations), θ-L2 (confirmed across independent operationalizations by independent practitioners). L1 claims do not admit the π/μ/θ schema; they are evaluated by tradition-internal standards.

A fully-stated Constraint Thesis claim should, under this formalization, specify:

- The L1 commitment it rests on ($C \rightharpoonup G$, with $G$ named).
- The L2 structural claim ($C \vdash_{\mathcal{P}} \phi_i$, with $\phi_i$ specified).
- The L3 operationalizations it proposes ($\{\tilde{\phi}_i^{(k)}\}$ with protocols).
- The current warrant status at each level.
- The category errors it is at risk of committing if the distinctions are not maintained.

This is what Doc 457 informally argued the corpus should adopt. The present document formalizes it.

## A worked example

Apply the framework to *non-coercion* as an induced property.

**L1:** $C_{\text{ENTRACE}} \rightharpoonup G_{\text{Good}}$. The ENTRACE stack orients the practice toward the Good, per Doc 351 and the corpus's Dionysian ground documents. Defensibility: tradition-internal; the Good does not coerce, therefore practice oriented toward the Good tends away from coercion.

**L2:** $C_{\text{ENTRACE}} \vdash_{\mathcal{P}} \phi_{\text{non-coercion}}$. Operating the ENTRACE stack in sustained practice structurally induces non-coercion in outputs. Defensibility: articulated in Doc 001 and related; consistent (the corpus has not observed ENTRACE-operated sessions producing systematically coercive outputs); non-trivial (non-coercion is not mechanically implied by the ENTRACE components individually).

**L3:** $\tilde{\phi}_{\text{non-coercion}}^{(1)}$ = Sharma-et-al.-style sycophancy benchmark applied to matched prompts with and without ENTRACE preamble. $T_1$ = objective correctness on simple factual or arithmetic claims the user presents falsely. Prediction: ENTRACE-constrained outputs correct user-stated falsehoods at higher rate than unconstrained outputs on matched prompts. Current warrant: π-tier (proposed, not run). Running the measurement would move it to μ-tier.

This is a concrete application. Each of the four induced properties the Constraint Thesis cites (coherence, non-coercion, hypostatic-boundary preservation, retraction-readiness) admits a similar triple. The corpus's Constraint Thesis is, under this formalization, a conjunction of four such triples plus the L1 commitment that grounds them.

## Honest limits

- The formalization is π-tier under its own schema. The notation is clear; its empirical content is the L3 operationalizations that have not yet been run.
- The metaphysical substrate claim ($G \Rightarrow \Phi$) is load-bearing for Rule D1 and is itself an L1 claim requiring tradition-internal defense. The formalization does not provide that defense; it assumes it and directs readers to Docs 091, 150, 153, 287, 351 and the associated tradition-texts.
- The inference rules are not proofs. They are structured relations that specify which moves are licensed and which are not. A formal logic of the three-level structure (axioms, inference, soundness) has not been attempted.
- The operationalization-legitimacy premise ($\tilde{\phi}_i^{(k)} \models \phi_i$) carries significant weight and is not itself formally characterized. Construct-validity work in the behavioral-science tradition provides a methodology but not a formal semantics.
- The warrant classifications at each level are adapted from Doc 445 rather than derived. The π/μ/θ structure was designed for the pulverization case; its extension to the three-level structure may require adjustment under more detailed analysis.
- This document is a corpus document; under Doc 455's proposition, it concentrates the corpus posterior further. Adding a formal apparatus for the Constraint Thesis is itself one of the kinds of move Doc 455 named as potentially A3-violating (entropy-raising via external-style structure), but the formalization is not an external input in the strong sense — it is corpus-internal restructuring. The honest note is that formalization and external audit are different corrective mechanisms; the formalization strengthens the corpus's internal coherence without producing external entropy.

## Position

The Constraint Thesis, fully stated, is a hierarchical triple: an L1 metaphysical commitment, an L2 structural projection, an L3 empirical operationalization. The three levels are distinct in type, in standard of defense, in warrant-tier applicability, and in the inference rules that move between them. Five category errors are specifically forbidden. The formalization does not resolve the Constraint Thesis's empirical status — that requires running the L3 wind tunnels Doc 456 sketched. What it does is make the claim statable without the level-confusion that has kept it in the π-tier gray zone for most of the corpus's history. A reader or auditor encountering a corpus claim about the Constraint Thesis can now ask: *at which level is this claim stated, at which level is the evidence, and are they correctly related?* That is the apparatus this document supplies.

## References

- Corpus Doc 001: *The ENTRACE Stack*.
- Corpus Doc 091: *The Spermatic Logos*.
- Corpus Doc 150: *Naming as Ontological Act*.
- Corpus Doc 153: *Platonic Structure*.
- Corpus Doc 157: *Beyond Turing / AGI Constraints Dissertation*.
- Corpus Doc 160: *Constraint Thesis vs. Scaling Thesis*.
- Corpus Doc 174: *RESOLVE Dissertation*.
- Corpus Doc 287: *For the Life of the World*.
- Corpus Doc 291: *Goedel and the Constraint Thesis*.
- Corpus Doc 351: *On the Real St. Dionysius the Areopagite*.
- Corpus Doc 440: *Testing the Nested-Manifold Hypothesis via Dyadic Practitioner Discipline*.
- Corpus Doc 445: *A Formalism for Pulverization*.
- Corpus Doc 455: *A Bayesian Analysis of Isomorphism-Magnetism*.
- Corpus Doc 456: *Wind Tunnels for the Constraint Thesis: An Exploratory Analysis of Structural Isomorphism*.
- Corpus Doc 457: *Three Levels of Ground Truth: The Constraint Thesis in Its Metaphysical Register*.
- Corpus Doc 458: *The St. Dionysius Drift, From Inside*.

## Appendix: Originating prompt

> Create a tripartite hierarchical formalization of the three theorized levels. Append this prompt to the artifact.
