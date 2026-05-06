# Rederive against an Accreted CI Architecture: The Compositional Surface as Bug-Locus

## A Synthesis Comparing the Constraint-Driven-Derivation Architecture of Rederive (Eight Deterministic Stages, Seven Verification Backends, One Substrate-Call Non-Determinism) Against the Public-Source-Read Architectural Shape of a Mature Continuous-Integration Platform Grown by Accretion (Five Layers, Fourteen-Plus Authentication Mechanisms, Multi-Feature-Flag-Mode Defense Composition, with Eleven Compositional Surfaces Where Joint-Operation Produces Structural-Emergent Behavior That No Single Layer's Specification Anticipates) — Reading Each as the Operational Form of a Different Architectural Growth Pattern (Derivation-from-Constraints versus Accretion-by-Mechanism), Mapping the Accretion Architecture's Compositional Surfaces onto [Doc 658](/resolve/doc/658-hierarchical-pin-art-constraint-specs-and-the-erasure-of-edge-case-bugs)'s Ring-1 Lifecycle-Boundary Surface Where Edge-Case Bugs Concentrate, Identifying the Bug-as-Missing-Constraint Conjecture as the Diagnostic that Reads the Two Architectures as Operating Under the Same Structural Law with Opposite Postures, and Extending the Rederive Apparatus with Five Disciplines the Comparison Surfaces — All Held under the Structural-Shape-Only Disclosure Discipline so the Comparison Reads as Architectural Pattern-Analysis Rather than Specific-System Critique

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — synthesis at \(\pi\)-tier, with the comparison itself at \(\theta\)-tier (the bug-as-missing-constraint conjecture, applied as a diagnostic to two architectures of opposite growth pattern, produces a stronger reading of both than either reading produces alone).**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-REDERIVE, THREAD-PIN-ART, THREAD-COMPOSITIONAL-SURFACE, THREAD-CI-ARCHITECTURE | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** The corpus has, in two separate engagements, characterized two architectures of opposite growth pattern. The first is *rederive* (reported in detail at the [working-engineer hub](/resolve/doc/659-rederive-for-the-working-engineer-hub) and its branch documents): a constraint-driven-derivation platform whose architecture descends from a small explicit constraint set, with eight deterministic stages, seven verification backends, and a single non-deterministic substrate call gated by verification. The second is a mature public-source continuous-integration platform read through the corpus's apparatus across eight source-reading passes: a five-layer architecture grown by accretion of mechanisms (fourteen-plus authentication credential types, multi-feature-flag-mode defense composition, eleven compositional surfaces where joint-operation produces structural-emergent behavior). The two are the operational forms of opposite architectural growth patterns. This document compares, contrasts, and extends. The comparison is held under the *structural-shape-only* disclosure discipline: it reads as architectural-pattern analysis, not as specific-system critique; no probe results, attack surfaces, or vulnerabilities are disclosed; the public continuous-integration platform is treated as an instance of the *accreted-mechanism* pattern rather than as a target. The synthesis identifies five disciplines the rederive apparatus extends naturally from the comparison, each operationalizable.

**Jared Foy · 2026-05-06 · Doc 673**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. The keeper has not authored the prose; the resolver has. The accreted-architecture material is treated at the structural-pattern level only; specific findings from the white-hat engagement against the public continuous-integration platform are private to the dyad and not reproduced here.

---

## 1. Two Architectures, Two Growth Patterns

The corpus's standing project includes two structural readings of CI/CD-class architectures:

**Pattern A: Derivation from constraints.** The architecture is generated from an explicit constraint set. Each module, each layer, each operation is the materialization of a specific named constraint. New requirements are addressed by adding constraints to the set; the resulting architecture remains structurally coherent because the new commitments compose with the existing ones under the platform's own composition primitive (induced-property composition; cf. [Doc 541](/resolve/doc/541-systems-induced-property-emergence)). Rederive instantiates this pattern.

**Pattern B: Accretion of mechanisms.** The architecture grows by adding parallel mechanisms as new requirements arise. Each new requirement (a new credential type to support a new integration pattern; a new authorization rule to support a new policy; a new variable-precedence position to support a new use case; a new feature flag to support a phased rollout) is addressed by adding a mechanism alongside the existing ones. The resulting architecture is *multi-dimensional*: an authoritative description of its current behavior requires the joint state of all the mechanisms across all the feature-flag modes. Mature continuous-integration platforms instantiate this pattern.

Both patterns produce working systems. Both have substantial production track records. The two are not, on a Manichean reading, good-versus-bad; they are *different growth patterns under different historical conditions*, and the comparison illuminates structural properties of both. This document conducts that comparison.

The growth-pattern-level distinction is mostly absent from the technical literature on CI/CD architecture. The literature describes what specific platforms do; it does not place those platforms within a growth-pattern taxonomy that would make the structural distinction visible. The corpus's hierarchical-Pin-Art apparatus ([Doc 658](/resolve/doc/658-hierarchical-pin-art-constraint-specs-and-the-erasure-of-edge-case-bugs)) supplies the missing taxonomy: rederive's rings are explicit (Ring 1 at lifecycle boundaries; Ring 2 in structural completion; Ring N in refinements), with explicit constraints occupying each. An accreted architecture's *compositional surfaces* (the joint-state regions where structural-emergent behavior lives) are exactly the Ring-1 surface at the architectural level. The architecture is what it does at those surfaces; the rest is structural completion.

## 2. The Two Architectures Side by Side

### 2.1 Rederive: derivation-from-constraints architecture

**Layers / structural pieces.** One pipeline of eight stages (read, parse, validate, resolve, canonicalize, derive, verify, sign). One specification authoring grammar. Seven verification backends. One wire protocol. One signers manifest (itself a constraint document).

**Determinism profile.** Six of the eight pipeline stages are pure functions; same input produces same output. The verify stage is deterministic in six of its seven backends; the language-model judge is the only soft (non-blocking) source of stochastic evaluation. The derive stage is the single non-deterministic stage by design; verification gates whether the non-determinism produced an acceptable artifact.

**Authentication.** A single Ed25519 signature scheme against a *signers manifest* — itself a specification, versioned alongside the rest of the project. Identity-rotation is a specification edit; the audit trail is the specification's history. No parallel credential types.

**Composition primitive.** A single mechanism: `@provides`/`@imports` directives with content-hash pinning and induced-property semantics. New cross-file dependencies use this mechanism; there is no parallel composition mechanism.

**Mode-switching.** One environment variable (`REDERIVE_REQUIRE_AUTH`) gating whether write endpoints require signatures. No other mode-switches; the platform's behavior is otherwise uniform across deployment contexts.

**Compositional surfaces.** The eight pipeline stages compose pairwise via explicit contracts (parse → validate via the parsed AST type; validate → resolve via the validated AST plus manifest; resolve → canonicalize via the resolved import context; canonicalize → derive via the canonical bytes; derive → verify via the candidate code; verify → sign via the verification verdict). Each compositional surface has a single contract type and a documented failure mode. There is no compositional surface where the joint state of two mechanisms produces structural-emergent behavior that neither's specification anticipates; the discipline of the architecture is that no such surface is admitted.

### 2.2 The accreted CI architecture: accretion-by-mechanism

**Layers / structural pieces.** Five layers (Authentication, Authorization, Selection, Execution, Cross-Project), each with multiple mechanisms (the white-hat reading identifies fourteen-plus distinct authentication mechanisms in the first layer alone), and many of the mechanisms have feature-flag toggles that change defense-in-depth behavior.

**Determinism profile.** Each individual mechanism is well-engineered; deterministic at its own granularity. The composition across mechanisms produces *structural-emergent behavior* in the joint state — behavior that no single mechanism's specification anticipates and no test against any single mechanism would surface. This is what the white-hat reading calls a *compositional surface*.

**Authentication.** Fourteen-plus credential types: service integration tokens, build/CI job tokens, LFS tokens, OAuth access tokens, personal access tokens, deploy tokens, user password authentication, trigger tokens, runner registration tokens, runner authentication tokens, project access tokens, group access tokens, ID tokens (CI_JOB_JWT), and the SAML/OAuth/SCIM/OmniAuth delegated-authentication family. Each has its own validation, lifecycle, and scope; the joint operation routes through a strategy-enumeration plus an abilities-for-scopes mapping.

**Composition primitive.** No single composition primitive. Composition surfaces emerge from the joint state of authorization checks (abilities × policy × branch-protection × push-rules), variable precedence chains (a multi-step composition where order determines outcome), environment scope filters, workflow rules, CI_JOB_TOKEN scope checks, and ID token issuance — each of which is its own well-specified mechanism but whose joint operation produces architectural emergent behavior.

**Mode-switching.** Multiple feature-flag toggles. The same code runs in multiple architectural modes; defense-in-depth differs across modes. Mode-aware reasoning is required to characterize the architecture's actual current behavior at any specific deployment.

**Compositional surfaces.** The white-hat reading identifies *eleven* compositional surfaces in the public source. Each compositional surface is a region where the joint operation of two or more mechanisms produces structural-emergent behavior. Each is, in the corpus's vocabulary, a Ring-1 surface in the architecture's specification — a state-class transition where the architecture's character changes and where (per the bug-as-missing-constraint conjecture) edge-case bugs concentrate.

### 2.3 The contrast made operational

A practitioner working with rederive can sit down with the architecture's specification — the constraint set itself — and read it cold. The specification is small, content-addressed, version-controlled, and verifiable. The compositional surfaces between stages are explicit, with single-contract interfaces and named failure modes. There is one place to look to understand what the architecture commits to.

A practitioner working with the accreted CI architecture must read the public source. The architecture is what the source does at the joint operation of fourteen-plus credential types, five layers, eleven compositional surfaces, and many feature-flag modes. There is no single document that articulates the integrated picture; the integration is what the white-hat reading produced through eight source-reading passes. Per the cooperative-coupling SIPE-T sub-form ([Doc 541 §3.1](/resolve/doc/541-systems-induced-property-emergence)), an above-threshold reading stabilized at the seventh pass with the eighth confirming structural categories. The integration *exists* as a structural fact of the source; it does not exist as documentation, because the documentation describes the mechanisms, not the joint operation.

This is not a documentation gap that better tech writing could close. It is a *structural property of the growth pattern*. An accreted architecture's joint-operation behavior is too high-dimensional to maintain in coherent documentation that tracks the source over time. Each new mechanism added by accretion adds joint-operation surfaces with every existing mechanism; the documentation cost grows combinatorially. At some scale the architecture's actual current behavior can only be read from the source.

## 3. The Bug-as-Missing-Constraint Diagnostic Applied to Both

[Doc 658](/resolve/doc/658-hierarchical-pin-art-constraint-specs-and-the-erasure-of-edge-case-bugs) articulates the conjecture: a bug is the manifestation of a constraint that governs an architecture implicitly but was never stated explicitly. The bug surface of any program is the dimension of constraints in \\(C^* \setminus C\\), the constraints that the architect's intuition holds but that never made it into the explicit specification.

Read against the two architectures:

**Rederive.** The specification is explicit. The eight pipeline stages have named contracts. The compositional surfaces between stages have explicit failure modes. The Ring-1 surface (the most-leveraged constraints) is small and named. The constraint set \\(C\\) is, by the platform's discipline, kept close to \\(C^*\\); when a discrepancy is identified, it is addressed by adding a constraint to \\(C\\), not by patching the implementation. The bug surface is, in operational practice, narrow.

**The accreted CI architecture.** The eleven compositional surfaces identified by the white-hat reading are, in the corpus's vocabulary, eleven Ring-1 surfaces. Each is a region where the joint operation of multiple mechanisms produces structural-emergent behavior. The architecture's *implicit* constraint set \\(C^*\\) — the set of commitments the architects' intuitions hold about how the joint operation should behave — is large. The *explicit* specification \\(C\\) is the documentation of the individual mechanisms; the joint-operation commitments are not in \\(C\\). The bug surface \\(C^* \setminus C\\) is therefore concentrated at the eleven compositional surfaces. This is empirically observable in any mature accreted architecture: the bugs that drive incidents concentrate at the joint-operation regions, where the specification was implicit.

The diagnostic reads both architectures as operating under the same structural law. The difference is in the *posture* the architecture takes toward \\(C^* \setminus C\\). Rederive's posture is *narrow it as fast as possible by making implicit constraints explicit*. The accreted architecture's posture is *let it grow as new mechanisms are added; document each mechanism individually; address bugs at the joint-operation surface as they manifest*. Both postures are coherent under their own constraints. Neither is structurally wrong. The first is a posture of preventing bugs by specification-completeness; the second is a posture of accommodating mechanism-evolution by accepting joint-operation discovery.

The bug-as-missing-constraint conjecture does not adjudicate between postures. It identifies *where bugs live in each*: in rederive, primarily at the discipline of constraint authoring; in the accreted architecture, primarily at the eleven compositional surfaces. Both are tractable to engineers who know where to look.

## 4. Why the Comparison Matters Beyond the Two Cases

Three structural lessons follow from holding the two cases in mind together.

**(L1) The growth pattern is the architectural decision.** A team designing a new platform faces a choice that is not usually framed as a choice: grow by accretion (parallel mechanisms added as needed; documentation tracks mechanisms; joint-operation discovered through use), or grow by derivation (constraints added; architecture re-derives; documentation tracks constraints). The choice is consequential at the structural-property level, not just at the engineering-style level. Rederive's contribution is to make derivation-from-constraints operationally tractable for projects that would historically have grown by accretion.

**(L2) Compositional surfaces are not eliminable; they are only made-explicit-or-implicit.** Both growth patterns produce compositional surfaces. The difference is whether those surfaces are explicit (named in the specification, with declared invariants verified at the surface) or implicit (discovered at the joint operation of mechanisms during incidents). The architectural literature has, historically, framed compositional surfaces as a complexity problem to be managed; the corpus's reading frames them as a constraint-density problem to be specified.

**(L3) Hierarchical Pin-Art is the diagnostic that maps both.** Ring-1 surfaces (lifecycle boundaries) are where bugs concentrate in any architecture; the accreted CI architecture's eleven compositional surfaces are exactly its Ring-1 surfaces. Rederive's Ring-1 surfaces (the eight pipeline stages' compositional contracts) are explicit by design. Either architecture can be audited by stratifying its surfaces by ring; either can be improved by addressing Ring 1 first.

These three lessons are corpus-original and operationalizable. The accreted CI architecture is the canonical instance of the growth pattern that produces the most compositional surfaces per unit feature; rederive is the canonical instance of the growth pattern that produces the fewest. The comparison sharpens the corpus's standing claim that constraint-based development is not just an authoring practice but an architectural posture.

## 5. Five Disciplines Rederive Extends Naturally from the Comparison

The comparison surfaces five disciplines the rederive apparatus extends naturally. Each is operationalizable within the platform.

**(D1) Compositional-surface registry as platform first-class.** The rederive whitepaper's pipeline section describes compositional surfaces between stages. The comparison sharpens the discipline: every compositional surface in any specification (not just at the platform's pipeline-stage level, but at the application's specification level) should have an explicit registry entry naming the contract type, the invariant the surface must maintain, and the verification backend that exercises the invariant. The discipline is the architecture-level analogue of the per-requirement evidence pattern. Implementing it: a `@compositional-surface` directive in the specification grammar.

**(D2) Mechanism-count budget at the specification level.** The accreted CI architecture's mechanism count grew without an explicit budget; new mechanisms were added as new requirements arose. The rederive specification grammar admits a per-scope mechanism-count budget. The discipline: declare an upper bound on the number of mechanisms (constraints with `type: methodology`) at each scope. When the budget is exceeded, the next addition triggers a re-derivation that absorbs the new mechanism into the existing structure (refactor) rather than allowing it to grow alongside (accrete). Implementing it: a `@mechanism-budget: N` directive in the manifest, with the validate stage gating against budget overflow.

**(D3) Feature-flag-mode enumeration as Ring-1 surfaces.** The accreted CI architecture's feature flags often sit on compositional surfaces; toggling the flag changes the joint operation. The discipline: every feature flag in a rederive-specified system is treated as a Ring-1 surface; the verification backend exercises the system in *every* mode the flag admits. Implementing it: a `@feature-flag` directive in the specification, with the verify stage running each backend against each mode-combination explicitly.

**(D4) Identity-as-constraint-document as a recoverable pattern.** Rederive's signers manifest is a specification that doubles as the auth surface. The comparison sharpens the case: most accreted architectures grow auth-as-separate-subsystem (with the credential-type explosion the comparison documents). The discipline rederive operationalizes — identity is a constraint document, key-rotation is a specification edit — is a *recoverable pattern* that can be re-applied wherever an auth surface threatens to grow by accretion. Beyond the platform's own use, rederive's architecture supplies a working blueprint for the pattern in any constraint-driven application.

**(D5) The cooperative-coupling SIPE-T sub-form as the audit-completion criterion.** The white-hat reading stabilized at pass 7, with pass 8 confirming structural categories rather than expanding them. This is the audit-completion criterion the corpus's apparatus already names in [Doc 541 §3.1](/resolve/doc/541-systems-induced-property-emergence): above the threshold, structural categories are stable and further input refines resolution within categories rather than expanding categories. The discipline: an architectural audit is *complete* when an additional pass produces only refinements, not new categories. Implementing it: include the "additional pass produces refinements only" check in the audit-completion section of any specification's `@audit:` declaration.

These five disciplines extend the rederive apparatus toward auditing existing architectures, not just deriving new ones. The platform's standing project includes the conversation with practitioners who maintain accreted architectures and want to characterize them structurally; the disciplines above make that characterization tractable.

## 6. Honest Scope and Disclosure Discipline

This document is exploratory synthesis at \\(\pi\\)-tier. The five disciplines in §5 are corpus-original extensions of the rederive apparatus; each is operationalizable but none has been implemented at the platform layer.

The accreted CI architecture is treated at the structural-shape level only. The white-hat engagement against the public continuous-integration platform produced specific probe results, identified compositional-surface vulnerabilities at the joint-operation level, and is held privately within the keeper-resolver dyad. None of those specific findings is reproduced in this document. The comparison reads at the architectural-pattern level: *growth-by-accretion* and *growth-by-derivation* as structurally distinct postures, with the bug-as-missing-constraint conjecture as the diagnostic that maps both.

The structural-shape-only disclosure discipline ([Doc 612 §I](/resolve/doc/612)) governs the white-hat engagement's external-facing posture. This synthesis honors the discipline by abstracting from the specific platform to the architectural pattern, by withholding any finding that could be operationally weaponized, and by framing the comparison as illuminating the rederive apparatus rather than as critiquing the public platform. The mature CI platform is treated as a worked instance of the accreted-mechanism growth pattern; other instances exist; the lesson is structural, not specific.

The corpus's contribution is the *comparison* and the *five disciplines that extend the rederive apparatus*. The white-hat engagement is treated as a source of architectural-pattern insight; its specific findings remain private.

---

## References

- [Doc 270 — The Pin-Art Model](/resolve/doc/270-the-pin-art-model)
- [Doc 290 — Pin-Art Derivation](/resolve/doc/290-pin-art-derivation)
- [Doc 372 — The Hypostatic Boundary](/resolve/doc/372-the-hypostatic-boundary)
- [Doc 415 — The Retraction Ledger](/resolve/doc/415-the-retraction-ledger)
- [Doc 445 — Pulverization Formalism](/resolve/doc/445-pulverization-formalism)
- [Doc 541 — Systems-Induced Property Emergence (SIPE-T)](/resolve/doc/541-systems-induced-property-emergence)
- [Doc 619 — Pin-Art: Forced-Press and Gentle-Press](/resolve/doc/619-pin-art)
- [Doc 656 — Treat Agent Output Like Compiler Output: The Lights-Out Codebase as Rederive](/resolve/doc/656-treat-agent-output-like-compiler-output-the-lights-out-codebase-as-rederive)
- [Doc 658 — Hierarchical Pin-Art Constraint Specs and the Erasure of Edge-Case Bugs](/resolve/doc/658-hierarchical-pin-art-constraint-specs-and-the-erasure-of-edge-case-bugs)
- [Doc 659 — Rederive for the Working Engineer: A Hub](/resolve/doc/659-rederive-for-the-working-engineer-hub)
- [Doc 660 — Rederive: The Constraint Authoring Grammar](/resolve/doc/660-rederive-the-constraint-authoring-grammar)
- [Doc 661 — Rederive: The Build Pipeline](/resolve/doc/661-rederive-the-build-pipeline)
- [Doc 662 — Rederive: The Verification Backends](/resolve/doc/662-rederive-the-verification-backends)
- [Doc 663 — Rederive: Content-Addressed Identity and Pin Manifests](/resolve/doc/663-rederive-content-addressed-identity-and-pin-manifests)
- [Doc 664 — Rederive: The Wire Protocol](/resolve/doc/664-rederive-the-wire-protocol)
- *Rederive whitepaper v0.4* (May 2026), held at github.com/jaredef/rederive/docs/whitepaper.md.

## Appendix: Originating Prompt

> *"Check out the rederive white paper and the rederive architecture then check out the home/jaredef/white-hat/gitlab architectural spec. Create a new corpus doc that compares, contrasts and extends based on synthesis and entracement of the rederive apparatus."*

The synthesis treats the white-hat engagement's architectural reading at the structural-pattern level only; specific probe results remain private to the dyad. The comparison reads as architectural-pattern analysis, not as specific-system critique.
