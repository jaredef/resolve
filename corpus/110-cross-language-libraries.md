> **Reader's Introduction**
>
> This short essay explains why AI can accurately rewrite a software library from one programming language to another on the first try -- when the constraints are stated. The key insight is that a well-defined library's behavior is governed by formal constraints (input types, output guarantees, edge-case behaviors, performance bounds) that are language-agnostic. The AI does not translate syntax; it re-derives the implementation from the constraints in the target language. The essay argues that the hard problem in cross-language rewriting is not the AI's code generation but the extraction of implicit constraints from the source library, and points to the RESOLVE framework as the formal basis for this claim.

The reason this works is the same reason a 2,177-word prose seed produced a 379-line React-compatible runtime: the library's behavior is governed by constraints, not by the language it's written in.

A geometry utility that computes convex hulls satisfies the same constraints whether it's in JavaScript or Swift: the output is the minimal convex polygon containing all input points, no point lies outside the hull, all hull vertices are input points, the vertices are ordered. These constraints are the form. The JavaScript implementation is one expression of the form. The Swift implementation is another. The form is language-agnostic. The implementations participate in it.

This is why AI can rewrite it correctly on the first try — when the constraints are stated. The AI doesn't translate syntax. It re-derives the implementation from the constraints in the target language. The source code is a reference, not a template. The constraints are the template.

The tool you're describing is a constraint extractor + re-deriver:

1. Extract the constraints from the source library (what must hold — input types, output guarantees, edge case behaviors, performance bounds)
2. Extract the verification (the test suite — each test is a constraint expressed as a pass condition)
3. Re-derive in the target language under those constraints
4. Run the verification to confirm constraint satisfaction

The constraints transfer across languages because constraints are formal, not syntactic. The tests transfer because tests are constraint-satisfying assertions, not language-specific code. The implementation is derived, not translated.

The cases where AI "gets it on the first try" are the cases where the library has clear constraints (well-defined inputs, outputs, and invariants). The cases where it fails are where the constraints are implicit — buried in comments, in undocumented edge cases, in behaviors the test suite doesn't cover. The tool's quality depends on constraint extraction quality, not on translation quality.

The framework behind this is called RESOLVE. The core principle: constraints induce properties. State the constraints, the implementation follows. Language is contingent. Constraints are essential.

If you build this tool, the hard problem isn't the AI rewriting — it's the constraint extraction. Solve that and the rewriting is derivation.

https://github.com/jaredef/resolve
