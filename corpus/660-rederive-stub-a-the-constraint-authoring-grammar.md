# Rederive Stub A: The Constraint Authoring Grammar

## What a `.constraints.md` File Actually Looks Like — the H2 Section per Requirement, the YAML-Adjacent Metadata Block, the Prose Body, the Fenced Test / Property / Judgment / Pin Blocks, the Optional Manifest Header for Imports and Provides, and a Worked Example Read End-to-End — Authored as the First Branch off [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) for the Working Engineer

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — practitioner-facing entracement, stub of [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §A.**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-REDERIVE, THREAD-PRACTITIONER-FACING | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** This is the first branch off the [rederive hub](/resolve/doc/659-rederive-for-the-working-engineer-hub). The hub introduced the platform's working surface; this stub answers the engineer's first concrete question: *what does a constraint file actually look like, and what do I have to write?* The answer is small. A constraint file is a Markdown document with a particular discipline: H2 headings name requirements; a short metadata block under each heading carries machine-readable fields; the prose body states what the requirement actually is; fenced code blocks carry the executable evidence the platform will use to verify the generated code. There is also an optional manifest header at the top of the file for cross-file composition. The grammar is stable in the platform sketch's existence-proof; the file you author today will derive cleanly tomorrow. This stub walks through a sample file end-to-end so the grammar is concrete by the time you finish reading.

**Jared Foy · 2026-05-05 · Doc 660**

---

## 1. The File at a Glance

A constraint file is named `<thing>.constraints.md`. The Markdown convention is deliberate: a reviewer can render the file in any tool that handles Markdown and read it as a requirements document, while the platform parses the same source as a structured constraint set. The file has two regions:

- *(Optional)* a *manifest header* at the top, declaring what this file provides to other files and what it imports from other files.
- An ordered sequence of *constraint blocks*, each one introduced by an H2 heading whose text is the constraint's identifier.

That is the whole structure. The grammar's discipline lives inside each constraint block.

## 2. The Constraint Block

Each block has four parts in order: heading, metadata, body, fenced evidence.

**(a) Heading.** Exactly one H2 heading with a stable identifier. The convention is short uppercase tokens with a numeric suffix, scoped to the file: `## SLUG1`, `## SLUG2`, `## HASH1`. The identifier is what other constraints reference in `depends-on` and what the verification verdict prints alongside the per-constraint result. Stability matters because the identifier outlives any single derivation; if you renumber, the materialization history loses its anchors.

**(b) Metadata.** A small block of `key: value` lines immediately under the heading, ending at the first blank line. The parser reads five recognized fields:

- `type:` *one of* `specification`, `predicate`, `invariant`, `bridge`, `methodology`, `example`, `counterexample`. The type tells the platform which verification backend to route the evidence to. (Stub: §C *The Verification Backends*; the routing is documented there.) The five most common types in practice are *specification* (defines an interface or shape), *predicate* (states a behavioural property over inputs and outputs), *invariant* (states a property that must always hold), *bridge* (connects this requirement to an external commitment), and *methodology* (describes the way a thing is done rather than what is produced).
- `authority:` *one of* `human-authored`, `AI-suggested-pending`, `derived`. Authority is provenance. *Human-authored* means a person wrote the prose. *AI-suggested-pending* means a substrate proposed it and a human has not yet ratified it. *Derived* means the constraint follows mechanically from another constraint. Authority does not affect verification; it affects review.
- `scope:` a string naming the constraint's reach. *Module*, *engine*, *site*, *protocol* are typical values. Scope is informational for the platform but architectural for the engineer.
- `status:` *one of* `active`, `deprecated`, `retracted`. Inactive constraints are kept in the file for archaeological purposes but are not enforced.
- `depends-on:` an array of constraint identifiers. The dependency graph is explicit. The platform uses it to order verification (a dependent constraint's evidence runs after its dependencies have passed).

Unknown fields are preserved in the parsed AST (the `unknownFields` map on the constraint object) but not used by the platform. You may write internal-team metadata under the heading without breaking the grammar.

**(c) Body.** Free prose. State what the requirement is, in the words you would use to brief a colleague. The prose is what the language-model substrate reads when it generates code; it is also what a human reviewer reads when judging whether the requirement has been authored well. There is no length cap; a short, precise body is better than a long, hedged one. The discipline catalogue ([Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §F: Pin-Art) covers the craft of authoring the body so derivations converge in one or two rounds rather than five. Until that stub lands, the rule of thumb is: *say the requirement once, plainly, and write the evidence.*

**(d) Fenced evidence.** Zero or more fenced code blocks, with the fence language tag selecting the verification backend. The four common tags:

- ` ```assert` — assertion blocks. Each line is an executable expression that must evaluate true. The platform wraps them with a small harness and runs them against the derived code. The slugify sample's `slugify("Hello World") === "hello-world"` line is canonical: simple, readable, executable, evidence.
- ` ```property` — property-test blocks. The block contains a property predicate and the platform fuzzes inputs against it. Use this when the input space is large and you want quantified evidence rather than per-input examples.
- ` ```judgment` — language-model-judge blocks. The block contains a prose criterion that a separate substrate call evaluates against the derived code. Use this for properties that resist mechanical encoding ("the function is named clearly," "the error messages are actionable").
- ` ```pin` — pin blocks. Each line names a phrase that *must* appear verbatim in the derived code. Use this to lock implementation details across regenerations when intent matters more than mechanism. The pin manifest layer ([Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §D, stub forthcoming) is the broader story; the in-block syntax is for the constraint's own preservation hooks.

A constraint may carry several fenced blocks of different types. The platform routes each block to its backend in parallel. The constraint's verdict is *pass* only if every block passes.

## 3. The Manifest Header

If your file imports from other constraint files or provides a property to other constraint files, the file begins with a manifest header *before* the first H2. The header uses two directives:

```
@provides: <property-name>
  threshold: <constraint-id>
  interface: [<exported-symbol>, <exported-symbol>, ...]

@imports:
  - property: <property-name>
    from: path
    path: ./<other-file>.constraints.md
    as: <local-alias>
```

`@provides` declares that this file induces a named property when its threshold-constraint passes. The `interface` enumerates the exports a consumer can rely on. Other files import the property by name; the platform resolves the import to the file's content hash, verifies that the threshold constraint passed, and threads the interface into the derive prompt for the consumer. The composition discipline is small and worth a paragraph in the hub; deeper treatment lives at [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §G.

`@imports` lists the properties this file depends on. Resolution by `from: path` is the common case. The platform reads the imported file's manifest, verifies its hash matches the imported pin (if any), confirms the threshold-constraint passes in its materialization, and makes the imported interface available under the `as` alias.

The header is optional. Single-file constraint sets need only the constraint blocks.

## 4. A Worked Example, Read End-to-End

The sample `samples/slugify.constraints.md` in the rederive repository is the platform's smoke test. It has three constraint blocks and no manifest. Read end-to-end, with annotation:

```
# Slugify — sample constraint file

A minimal constraint set used to smoke-test the rederive engine.

## SLUG1
type: specification
authority: human-authored
scope: module
status: active
depends-on: []

Export a single function named `slugify` that takes a string and returns
a string. The function must have signature
`export function slugify(input: string): string`. The module must
type-check under strict TypeScript with no errors.
```

SLUG1 is a *specification* constraint: it defines the shape of the deliverable. There are no fenced blocks because the verification is a type-check; the type-checker backend reads the prose and the resulting derived code, runs `tsc`, and reports pass or fail.

```
## SLUG2
type: predicate
authority: human-authored
scope: module
status: active
depends-on: [SLUG1]

The slugify function lowercases its input and replaces every run of
non-alphanumeric characters with a single hyphen. Leading and trailing
hyphens are stripped from the result.

```assert
slugify("Hello World") === "hello-world"
slugify("  Foo Bar  ") === "foo-bar"
slugify("Foo!!!Bar") === "foo-bar"
slugify("---x---") === "x"
slugify("UPPER") === "upper"
slugify("a1b2c3") === "a1b2c3"
```
```

SLUG2 is a *predicate* constraint: it states a property over inputs and outputs. The fenced `assert` block carries six examples. The platform runs each as an executable assertion against the derived code; SLUG2 passes if every assertion holds. Note that SLUG2 lists `depends-on: [SLUG1]`, which means the platform will only run SLUG2's evidence after SLUG1 has passed. If SLUG1's type-check fails, SLUG2 is not even attempted.

```
## SLUG3
type: invariant
authority: human-authored
scope: module
status: active
depends-on: [SLUG1]

The slugify function never throws and never returns a string containing
two consecutive hyphens.

```assert
typeof slugify("") === "string"
!slugify("foo  bar  baz").includes("--")
!slugify("!!!@@@###").includes("--")
```
```

SLUG3 is an *invariant* constraint: it states a property that must always hold across the input space. The block is short because the property is short. In a real engineering use you might prefer a `property` block here that fuzzes the invariant rather than an `assert` block with hand-picked inputs; both are admissible.

End of file. Three constraints, forty-six lines, no manifest. The platform reads this file, derives a TypeScript module, runs the seven-stage pipeline, verifies all three constraints, and emits a signed materialization artifact. The whole loop runs in a few seconds.

## 5. What the Engineer Should Take Away

Three pieces.

*The grammar is small.* H2 + metadata + body + fences. There is no DSL to learn. There is no schema migration to fight. A constraint file is a Markdown file that a colleague can read in any text editor without tooling.

*The metadata is load-bearing for the platform's behaviour.* The `type:` field selects the verification backend. The `depends-on:` field orders verification. The `authority:` field is for review-time triage. Get these three right and the platform does the rest.

*The fenced evidence is what carries the contract.* If a requirement matters, it has evidence. If a requirement does not have evidence, the platform cannot verify it, and the engineer is back in the world where requirements drift away from code. The discipline of writing evidence next to the prose is what makes the constraint file the durable artifact rather than the comment-on-the-code in the requirements folder.

The next stub ([§B *The Build Pipeline*](#)) walks through what the platform does with this file once you run the CLI: the seven stages, what each one produces, what failure looks like, and how to debug. After that, [§C *The Verification Backends*](#) covers the backends the metadata routes to. Together those two stubs explain the loop from *file on disk* to *signed materialization*.

---

## References

- [Doc 247 — Derivation Inversion](/resolve/doc/247-derivation-inversion)
- [Doc 290 — Pin-Art Derivation](/resolve/doc/290-pin-art-derivation)
- [Doc 619 — Pin-Art: Forced-Press and Gentle-Press](/resolve/doc/619-pin-art)
- [Doc 656 — Treat Agent Output Like Compiler Output: The Lights-Out Codebase as Rederive](/resolve/doc/656-treat-agent-output-like-compiler-output-the-lights-out-codebase-as-rederive)
- [Doc 658 — Hierarchical Pin-Art Constraint Specifications and the Erasure of Edge-Case Bugs](/resolve/doc/658-hierarchical-pin-art-constraint-specs-and-the-erasure-of-edge-case-bugs)
- [Doc 659 — Rederive for the Working Engineer: A Hub](/resolve/doc/659-rederive-for-the-working-engineer-hub)

## Appendix: Originating Prompt

> *"Now I want you to examine the entire spec and implementation of /home/jaredef/rederive — From this I want you to create entracement docs in the corpus for an audience of software engineers. ... First, create a document in the corpus that acts as a hub for all stubs that will branch off, entracing the reader to each aspect of the rederive derivation; its spec; its workflow; its totalizing form of apparatus that informs the engineer's practice under constraint-based software engineering. Append this prompt to each artifact. Also, where you could use corpus jargon, instead entrace the reader through rhetoric that is not novel to the corpus. Where you must state the corpus concept in its own terms; provide proper entracement."*
>
> Followed by: *"Continue with the first branch of the hub derived as a corpus doc. Continue through each as is coherent."*
