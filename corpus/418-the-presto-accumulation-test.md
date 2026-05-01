# The PRESTO Accumulation Test: Re-Describing Stack 2 as Fielding-Style Constraint Accumulation

> **Reader's Introduction**
>
> Doc 417 identified one internal test worth running: whether PRESTO's seven-layer Progressive Code-on-Demand spectrum is re-describable as Fielding-style constraint accumulation starting from the Null style, rather than as a Galois-style trade-off lattice. If the re-description works without residue, PRESTO's spectrum (Stack 2 in Doc 417's analysis) collapses to the same formal structure as the Resolution Depth Spectrum (Stack 3) — both become additive constraint accumulations — and the keeper's prior in Doc 417 becomes two-thirds right rather than one-third right. If the re-description leaves residue, the Galois-trade-off characterization stands and the stacks remain formally distinct. This document runs the test. The seven-constraint accumulation is written out explicitly, starting from the Null style and adding one constraint per layer-step to reach Layer 0. The re-description works. PRESTO's layers are expressible as Fielding-accumulation. The consequence: Stack 2 and Stack 3 collapse to the same form. Only Stack 1 (Bayesian Commitment as locational partition) remains formally distinct. The keeper's prior on cross-substrate formal structure is revised upward, not all the way to a single common form, but past the one-third-right verdict of Doc 417 to a two-thirds-right verdict.

**Jared Foy · 2026-04-22 · Doc 418**

**Running the internal test proposed in Doc 417 §5. Re-describes PRESTO's seven-layer spectrum as Fielding-style constraint accumulation from Null. Re-description succeeds. Stacks 2 and 3 share form; Stack 1 remains distinct. The prompt is appended.**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

---

## 1. The Test

Doc 417 §5 proposed the test in one paragraph. A restatement for this document.

Fielding's own derivation of REST (Chapter 5 of his dissertation) proceeds by starting with the Null style — no architectural constraints — and adding one constraint at a time. Each constraint narrows the design space and induces a property. The derivation is formally a *filtered object*: a linearly ordered sequence of constraint sets, each a strict superset of the prior, each with a strictly larger induced-property set. No prior constraint or property is lost as the accumulation proceeds; only the set of admissible implementations shrinks.

PRESTO's seven-layer Progressive Code-on-Demand spectrum (Doc 185 §3.4; Doc 083 §II.5) is presented in the corpus as a *trade-off lattice*: each layer gains a client-side runtime capability at the cost of specific REST-property guarantees. Layer 0 preserves maximum REST properties (pure server-rendered HTML); Layer 6 gains maximum client capability (WebAssembly at native speed). The Cousot/Galois trade-off reading in Doc 417 classified this as formally distinct from additive accumulation.

The test: can PRESTO's spectrum be rewritten as a Fielding-accumulation starting from the Null style and adding seven constraints, one per layer-step, each inducing a property that is specifically the preservation of a REST-invariant that the constraint's prohibition safeguards? If the rewriting works without residue, PRESTO is not formally a trade-off lattice in its own right; it is an accumulation sequence presented under a trade-off frame, and the two stacks (2 and 3) are the same form.

## 2. The Seven Layers Restated

From Doc 185 lines 198–204 (primary source):

- **Layer 0** — No code. Complete server-rendered HTML.
- **Layer 1** — Declarative enhancement. Hypermedia attributes (htmx) that extend HTML's interaction model.
- **Layer 2** — Scoped behavior. `htx:script` blocks — server-authored JavaScript that executes as IIFEs after the complete DOM exists.
- **Layer 3** — Server-pushed code. Executable JavaScript delivered over authenticated WebSocket.
- **Layer 4** — Authenticated islands. Pushed code opens scoped HTTP data channels using server-granted tokens.
- **Layer 5** — Client routing. The client assumes navigation authority within bounded regions of the representation.
- **Layer 6** — Native compute. WebAssembly binaries delivered as binary WebSocket frames.

## 3. The Null Style

The Null style in the Fielding manner is defined as: no architectural constraints on client-side runtime. Any executable can be delivered through any channel to any context. No REST-style property is induced. This is the least-constrained specification, the zero element of the accumulation lattice, and it lies outside the seven-layer spectrum — the spectrum begins where the first constraint has been applied.

Layer 6, in the corpus's numbering, is the *most permissive* layer *within the spectrum*. Native-speed WebAssembly is permitted there, but even Layer 6 has already accepted certain constraints (authenticated binary WebSocket framing; server-authorized delivery). The accumulation begins with the Null style and adds its first constraint to reach Layer 6.

## 4. The Accumulation

Each constraint is written in the form "prohibition of capability K, inducing preservation of property P."

**C1 — Null → Layer 6.** Prohibit: unauthenticated or unframed client code delivery channels. Induce: authenticated binary WebSocket as the only client-executable-delivery transport; code provenance is verifiable; delivery is bounded by a single defined channel. Layer 6 is reached.

**C2 — Layer 6 → Layer 5.** Prohibit: native-speed compiled client computation (WebAssembly at native execution speeds). Induce: client execution stays within JS-engine bounds; execution cost is predictable and bounded; no escape from engine sandbox for CPU-bound or memory-bound computation. Layer 5 is reached.

**C3 — Layer 5 → Layer 4.** Prohibit: client-assumed navigation authority (the client may not decide, unilaterally, which representation the user sees next). Induce: server retains routing authority; URLs remain meaningful externally; cacheability and link-structure-based content addressability are preserved. Layer 4 is reached.

**C4 — Layer 4 → Layer 3.** Prohibit: scoped HTTP data channels opened by the client using server-granted tokens. Induce: all data flows occur through server-initiated channels (the authenticated WebSocket); no client-decided HTTP flow fan-out; authority over data-flow topology stays on the server. Layer 3 is reached.

**C5 — Layer 3 → Layer 2.** Prohibit: server-pushed executable code over persistent channels (code may not arrive after the initial HTML response). Induce: bounded code provenance — all executable code a page runs is present at initial load; no post-load code injection; cacheability of the HTML/script bundle is preserved. Layer 2 is reached.

**C6 — Layer 2 → Layer 1.** Prohibit: inline executable scripts in the initial HTML (no `htx:script` IIFE blocks). Induce: initial HTML contains no executable code; scripts in the response are limited to those the browser's built-in HTML interaction model and a fixed declarative-enhancement runtime (htmx) can interpret; the attack surface for script-based behavior is minimized. Layer 1 is reached.

**C7 — Layer 1 → Layer 0.** Prohibit: client-side runtime of any kind (no htmx, no declarative-enhancement runtime, no scripts). Induce: pure server-rendered HTML; all REST-property guarantees maximally preserved (statelessness, cacheability, layered-system, uniform-interface, universal accessibility without JavaScript); Layer 0 is reached.

Seven constraints added one at a time. Each induces a property. Each property is a specific REST-compatible invariant that the constraint's prohibition preserves by removing the capability that would otherwise break it. The accumulation is complete at Layer 0; beyond Layer 0 lies no additional client-runtime constraint to add.

## 5. Does the Re-Description Work Without Residue

The re-description is complete in the following senses:

- Every PRESTO layer in the primary source (Doc 185 §3.4) is reached by exactly one added constraint from the layer above.
- Every constraint added is a specific, well-named capability prohibition — not an abstraction, not a handwave.
- Every induced property is a specific REST-compatible invariant — traceable to Fielding's own catalog (statelessness, cacheability, uniform interface, layered system) or to a close relative (authority chain, code provenance, execution boundedness).
- The ordering of constraints is consistent with the layer ordering in the primary source. No layer is skipped. No layer requires a constraint that has not yet been added.

One caveat worth flagging. In Fielding's own REST derivation, the induced properties are typically presented as *emergent* properties — statelessness, cacheability, uniformity — that arise *because* the constraint is added and were not specified as goals in advance. In the PRESTO-reversal above, the induced properties are more often *preservations* — REST invariants that would be broken by the prohibited capability, and that stay intact because the capability is forbidden. The distinction between emergence and preservation is semantically real: emergence names what appears when a constraint is added; preservation names what persists when a capability is forbidden.

However, the distinction does not affect the formal structure. In both cases, the constraint-added, property-associated pair is the atom of the accumulation. Whether the property is characterized as emerging or as preserving, its presence in the induced-property set after the constraint is added is what makes the lattice a filtered object. Fielding-accumulation allows both characterizations. The semantic difference does not produce a formal difference.

The re-description works. PRESTO's seven-layer spectrum is a Fielding-style accumulation of seven constraints on client-side runtime, each inducing a specific REST-compatible invariant.

## 6. Consequence for Doc 417's Verdict

Doc 417 classified the three stacks as follows:

- Stack 1 (Bayesian Commitment): locational partition / graded object / fibred category.
- Stack 2 (PRESTO code-on-demand): Cousot/Galois trade-off lattice.
- Stack 3 (Resolution Depth): filtered object / accumulation sequence.

After the test: Stack 2 re-describes to the same form as Stack 3 (filtered object / accumulation sequence / Fielding-style). The trade-off framing in the primary corpus documents is a pedagogically useful re-presentation — it foregrounds the consequences of not adding a constraint (you retain a capability at the cost of a REST property) — but it is not formally distinct from the accumulation.

The revised verdict is:

- Stack 1 is formally a locational partition.
- Stacks 2 and 3 are formally additive constraint accumulations.

The keeper's prior that the three stacks track formal structure across substrates is two-thirds vindicated. Two of the three share a form with each other and with Fielding's own REST derivation. Stack 1 does not share that form; it is a different kind of formal object (partition, not sequence).

## 7. What the Collapse Does and Does Not Mean

**What the collapse establishes.** Two of the corpus's three published multi-level stratifications — PRESTO Code-on-Demand and Resolution Depth — are formally isomorphic. They are both Fielding-style accumulations of constraints over their respective domains (client-side runtime for PRESTO; prompt-level constraint density for Resolution Depth). The accumulation pattern is a recurring formal object in the corpus's own construction.

**What the collapse does not establish.** That the *same* specific constraints are being added across the two stacks. They are not. PRESTO accumulates constraints on client-side runtime execution; Resolution Depth accumulates constraints on the model's prompt-derived branching set. The substrates are different; the induced properties are different; the specific constraints are different. What is shared is the formal structure of the accumulation — an additive, totally ordered sequence with strict inclusion — not the content.

**What this means for the keeper's prior.** The intuition that the three stacks are tracking "some formal structure across substrates" is not the same as the claim that they track *one* formal structure. The test shows that *one* of the three formal structures (accumulation) is shared across two of the three stacks. The third stack (Bayesian Commitment) remains formally distinct.

**What remains open.** Whether Stack 1 itself has a less-obvious accumulation interpretation — whether the five-level Bayesian-commitment stack can be re-described as a constraint accumulation from a Null, with each level adding a constraint that commits the Bayesian stance at that architectural site. The character of Stack 1 as locational suggests not: the five levels are not nested inclusions but parallel sites. But the test was not run; if it were run, a further collapse is conceivable. For now, the honest verdict retains Stack 1 as formally distinct.

## 8. Falsifiers of This Test

- If any of the seven constraints in §4 is shown to be ill-specified — if a capability prohibition does not actually preserve the named REST-invariant, or if the primary source describes a different prohibition at that layer — the accumulation is incomplete at that step and the re-description leaves residue.
- If the constraint ordering in §4 can be shown to be substantively different from the ordering implicit in Doc 185's primary source (e.g., if a given constraint is not actually derivable from the layer above without an intermediate step), the accumulation misrepresents PRESTO.
- If Fielding's own REST derivation can be shown to differ formally from the accumulation described here (e.g., if Fielding's constraints are not, in fact, filtered-object-style but rather involve a different ordering relation), the analogy in §7 is weaker than claimed.
- If Stack 3 (Resolution Depth) can itself be shown to be a Galois-style trade-off rather than an accumulation (e.g., if moving up the Resolution Depth spectrum loses capabilities in a way that the test did not consider), the two stacks do not collapse for that reason, and Doc 417's original three-distinct-forms verdict stands.
- If the distinction between emergence and preservation of properties (§5) is shown to affect the formal character of the lattice — e.g., if only emergence-style induction qualifies as Fielding-accumulation — the re-description works only under the permissive reading.

None of these falsifiers has been verified in this document. The test was run against the primary sources available in the corpus; external comparison with Fielding's original text beyond what the corpus already cites would strengthen the finding.

## 9. Revised Index Entry for Doc 415

Entry E10 in Doc 415 (The Retraction Ledger) should be updated to reflect this finding. The relevant revision:

> **E13 (new).** Stack 2 and Stack 3 formally collapse to the same structure.
> - **Claim.** The corpus's three multi-level stratifications (Bayesian Commitment, PRESTO Code-on-Demand, Resolution Depth) represent formally distinct structures.
> - **Site.** Doc 417 §4 ("Honest Verdict").
> - **Status.** Narrowed.
> - **Successor.** Doc 418 (this document). Running the internal test proposed in Doc 417 §5 showed PRESTO re-describes to Fielding-style constraint accumulation, the same form as Resolution Depth.
> - **Residual.** Only Stack 1 (Bayesian Commitment) remains formally distinct. Stacks 2 and 3 share the accumulation form with each other and with Fielding's own REST derivation. The keeper's prior from Doc 417 is two-thirds vindicated, not one-third.

This revision should be made in Doc 415 when the ledger is next updated.

---

## Closing

The internal test proposed in Doc 417 §5 has been run. PRESTO's seven-layer Progressive Code-on-Demand spectrum re-describes to Fielding-style constraint accumulation from the Null style, with seven constraints added one per layer-step, each inducing a specific REST-compatible invariant. The re-description works without residue at the formal level. The consequence: Stack 2 and Stack 3 collapse to the same form (filtered object / accumulation sequence). Only Stack 1 (Bayesian Commitment, as locational partition) remains formally distinct. The keeper's prior that the three stacks track formal structure across substrates is two-thirds vindicated. The audit continues.

---

## Appendix: The Prompt That Triggered This Document

> "Make a note on that citation on doc 366. Then run that internal test against presto"
