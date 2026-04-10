# htxlang Development Log

A chronicle of the iterative specification-implementation loop and the meta-principles that emerge from cross-language verification.

---

## Entry 1: The Discovery Loop

**Date:** April 4, 2026

### What Happened

A PRESTO seed document (1,825 words) was provided to a fresh LLM context with instructions to build a conformant htxlang engine in Go. The agent produced a working engine: 2,173 lines, 22 passing tests, 19.8 MB RSS.

When the Go implementation was cross-referenced against the TypeScript v2 implementation (built manually in the same session), two bugs were discovered in the TypeScript engine:

1. The layout directive (`htx:layout`) was being stripped by the directive-stripping stage before the layout resolver could read it.
2. Content inside `htx:raw` blocks was being stripped by the directive-stripping stage despite being intended as literal output.

The Go agent, reasoning independently from the same seed, made a correct judgment call that the human-written TypeScript implementation had missed: extract the layout directive before stripping.

### The Meta-Principle

Cross-language implementation from a shared specification is a verification mechanism.

Two implementations of the same spec, built independently, will make different judgment calls at ambiguity points. Where one implementation is correct and the other is not, the discrepancy reveals a gap in the specification. Fixing the gap tightens the spec. The tighter spec produces more correct implementations on the next iteration.

This is an iterative loop:

```
Spec → Implementation A (language X)
Spec → Implementation B (language Y)
Compare A and B → find discrepancies
Discrepancies → reveal spec gaps
Fix spec gaps → tighter spec
Tighter spec → more correct implementations
Repeat
```

The loop tightens the specification by distilling it through the language-agnostic space. Implementation details that are language-specific (Go's mutexes, TypeScript's async/await) are filtered out. Implementation decisions that are specification-level (layout directive must survive stripping) are captured and promoted into the spec.

### What Was Tightened

**Specification (htxlang-v1.md):**
- Should add: "The layout directive must be extracted and stored before the directive-stripping stage."
- Should add: "Literal block contents must be protected during directive stripping."
- Should add: "In concurrent runtimes, shared mutable state must be protected from data races."

**Seed (presto-seed.md):**
- The pipeline description should note that layout extraction precedes stripping.
- The rationale section should note that the directive-stripping stage must be aware of blocks that carry literal content.

---

## Entry 2: The Verification Hierarchy

**Date:** April 4, 2026

### Observation

The session produced four layers of specification:

1. **8 Contracts** (what must be true)
2. **Normative Mechanics** (how the contracts operate)
3. **Reference Profile** (recommended implementation choices)
4. **Implementation Specification** (exact algorithms)

Each layer was written top-down: contracts first, then mechanics, then opinions, then algorithms. The Go implementation was the first bottom-up verification: an independent derivation from the seed tested whether the top-down specification was sufficient.

### Finding

The top-down specification was almost sufficient. The Go agent produced a conformant engine. But the cross-reference revealed that two normative requirements were implicit rather than explicit:

1. **Directive stripping must not destroy directives consumed in later stages.** This is a pipeline ordering constraint that was described in principle ("layout wrapping after content resolution") but not made explicit for the stripping stage specifically.

2. **Literal blocks are protected across all stages, not just expression evaluation.** The specification says literal blocks are opaque to expression evaluation (Contract 2, §2.6). It does not say they are opaque to directive stripping. They must be.

### Are the 8 Contracts Sound?

Examining whether the discovered gaps invalidate any of the 8 contracts:

**C1 Document Model:** Sound. The bilateral boundary was correctly defined. Script opacity was correctly specified. The raw block issue is a mechanic within C2, not a C1 failure.

**C2 Resolution:** This is where the gaps live. The resolution contract specifies ordering constraints but does not specify that directive stripping must preserve directives consumed by later stages. The fix is to add a stripping constraint: "Directive stripping MUST NOT remove directives that are consumed by subsequent stages. Implementations MUST extract such directives before the stripping stage."

**C3 Grant Contract:** Sound. Grants materialized correctly in both implementations.

**C4 Mutation Contract:** Sound. Two-phase tokens verified correctly in both implementations.

**C5 Extension Contract:** Sound. The Go sandbox (interface satisfaction) and the TypeScript sandbox (proxy pattern) both enforce manifests. The concurrency note is Go-specific, not a contract-level issue.

**C6 Channel Contract:** Sound. Token validation with scope enforcement works identically in both.

**C7 Delivery Contract:** Not tested in Go (no topology compilation). Contract is sound in principle.

**C8 Security Contract:** The raw block stripping issue has security implications: if directive-like content in raw blocks is stripped, the resolved representation differs from the developer's intent. This is a C8 issue: "A conformant engine MUST NOT transform content the developer declared as literal." Add to §9.1.

### Contract Amendments

**C2 Resolution, §3.11 Directive Stripping (amended):**
> Directive stripping MUST NOT remove directives that are consumed by subsequent stages. The layout directive, if present, MUST be extracted and stored before stripping occurs. Literal blocks (htx:raw) MUST be protected during stripping; their contents MUST NOT be modified or removed by the stripping stage.

**C8 Security, §9.1 Security Through Absence (amended):**
> Content that the developer declared as literal (inside raw blocks) MUST NOT be transformed, stripped, or modified by any resolution stage. The literal declaration is the developer's assertion that the content is intentional. Violating this assertion would alter the resolved representation in ways the developer did not intend.

---

## Entry 3: The Tightening Effect

**Date:** April 4, 2026

### Observation

The iterative loop produced measurable tightening:

| Metric | Before Go Cross-Reference | After |
|--------|--------------------------|-------|
| Spec gaps discovered | 0 (assumed complete) | 3 |
| Contract amendments | 0 | 2 (C2, C8) |
| TS v2 bugs found | 0 (tests passing) | 2 |
| Seed improvements identified | 0 | 4 |

All 33 TypeScript tests passed before and after the fixes. The tests did not cover the discovered edge cases. This means:

1. **Tests are necessary but insufficient.** Passing tests do not prove the implementation is correct. They prove the tested behaviors are correct. The untested behaviors (layout directive in the presence of directive stripping, raw blocks with directive-like content) were wrong.

2. **Cross-language verification catches what tests miss.** The Go agent, reasoning from the specification, made the correct judgment call at the ambiguity point. The TypeScript implementation, built by the same session that wrote the spec, inherited the spec's implicit assumptions and therefore could not see the gap.

3. **Independent derivation is a more powerful verification tool than unit testing.** A test verifies a specific behavior. An independent derivation verifies the entire specification's sufficiency for producing correct behavior.

### The Development Loop (Formalized)

```
1. Write specification
2. Build implementation A (human + AI, language X)
3. Build implementation B (AI agent from seed, language Y)
4. Cross-reference A and B
5. Discrepancies → spec gaps, implementation bugs
6. Amend specification
7. Fix implementations
8. Update seed with tightened spec
9. Repeat with language Z
```

Each iteration through a new target language tightens the spec further. The spec converges toward completeness through the act of being independently implemented. This is the same convergence mechanism that made HTTP robust: multiple independent implementations revealed gaps in the specification, which were closed, which made the next implementation more correct.

### Implication for the PRESTO Style

The development loop is itself an emergent property of the specification architecture. By separating style from specification from implementation, we created the conditions for cross-verification. If the specification were coupled to a single implementation (as most frameworks are), cross-language verification would be impossible. The separation is not just good architecture. It is the mechanism by which the architecture improves.

---

## Entry 4: Open Questions

1. **How many languages are needed to reach spec convergence?** Two implementations (TypeScript + Go) found 3 gaps. Will a third (Rust? Python?) find more? Is there a point of diminishing returns?

2. **Should the seed be updated automatically from cross-reference findings?** Currently the loop is manual: analyze Go output, find gaps, update seed. Could the analysis itself be automated?

3. **Can conformance tests be generated from the cross-reference?** The two bugs found were not covered by existing tests. The cross-reference identified the specific scenarios. Can those scenarios be automatically converted to test cases?

4. **Does the development loop apply to the PRESTO style itself, not just the specification?** If two independent specifications were derived from the PRESTO white paper, would their cross-reference tighten the style?
