# Progressive Code-on-Demand as Constraint Accumulation: PRESTO Dissertation §3.4 Reformulated for v2

> **Reader's Introduction**
>
> Doc 418 ran the internal test proposed in Doc 417 §5 and found that PRESTO's seven-layer Progressive Code-on-Demand spectrum re-describes without residue to Fielding-style constraint accumulation from the Null style. The v1 dissertation (Doc 185) presents the spectrum under a trade-off framing — each layer "trades specific properties for specific capabilities." That framing is a valid pedagogical shorthand but is not the formally fundamental one; accumulation is. This document extracts §3.4 of the v1 dissertation verbatim for reference, then reformulates it as a Fielding-style accumulation derivation with each constraint and each induced invariant stated explicitly. It closes with notes for a v2-dissertation editor on the ripple effects elsewhere in the document. The reformulation is intended as a drop-in replacement for §3.4 of Doc 185 and as the first artifact toward a v2 PRESTO dissertation.

**Jared Foy · 2026-04-22 · Doc 419**

**Reformulation of PRESTO Dissertation §3.4 (Progressive Code-on-Demand) as Fielding-style constraint accumulation. Basis for a v2 PRESTO dissertation. The prompt is appended.**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

---

## 1. What This Document Is

The v1 PRESTO dissertation (Doc 185) presents the seven-layer Progressive Code-on-Demand spectrum in §3.4 under a trade-off framing: "each layer trades specific properties for specific capabilities." Doc 418 ran a direct test and found that the spectrum re-describes without residue to Fielding-style constraint accumulation from the Null style. The trade-off framing is a pedagogically useful secondary reading; the accumulation framing is the formally fundamental one.

This document does three things. First, it extracts §3.4 of Doc 185 verbatim, so the v1 text and the v2 text stand side by side. Second, it reformulates §3.4 in accumulation form. Third, it notes the ripple effects elsewhere in Doc 185 that a v2 dissertation should address.

The reformulation is a drop-in replacement for §3.4. Other sections of Doc 185 can remain as they are in v2 unless they quote §3.4's trade-off language directly; where they do, corresponding edits are listed in §4 below.

## 2. §3.4 — Verbatim from v1 (Doc 185 lines 192–208)

> ### 3.4 Progressive Code-on-Demand
>
> Fielding identified code-on-demand as REST's optional sixth constraint: the server may extend client functionality by transmitting executable code. The industry explored this option as a binary — either no code (static HTML) or all code (Single Page Application).
>
> PRESTO constrains code-on-demand to a progressive spectrum. Seven layers define increasing degrees of client capability, each requiring specific server-side authorization:
>
> - **Layer 0:** No code. Complete server-rendered HTML.
> - **Layer 1:** Declarative enhancement. Hypermedia attributes (htmx) that extend HTML's interaction model.
> - **Layer 2:** Scoped behavior. `htx:script` blocks — server-authored JavaScript that executes as IIFEs after the complete DOM exists.
> - **Layer 3:** Server-pushed code. Executable JavaScript delivered over authenticated WebSocket.
> - **Layer 4:** Authenticated islands. Pushed code that opens scoped HTTP data channels using server-granted tokens.
> - **Layer 5:** Client routing. The client assumes navigation authority within bounded regions of the representation.
> - **Layer 6:** Native compute. WebAssembly binaries delivered as binary WebSocket frames.
>
> The constraint is not that code-on-demand must be minimal. The constraint is that code-on-demand must be **progressive** — each layer is entered deliberately, by server authorization, with full awareness of the properties traded.
>
> **What this constraint induces:** The developer navigates a design space where every point has known properties. Layer 0 provides maximum REST properties (cacheability, server authority, statelessness, universality). Each successive layer trades specific properties for specific capabilities. The developer chooses their depth. They are never forced to a depth they do not need.

## 3. §3.4 — v2 Reformulation

### 3.4 Progressive Code-on-Demand

Fielding identified code-on-demand as REST's optional sixth constraint: the server may extend client functionality by transmitting executable code. The industry explored this option as a binary — either no code (static HTML) or all code (Single Page Application).

PRESTO's contribution at this level is not to split the binary into a spectrum of options. It is to show that the spectrum is the specific object Fielding's own method produces when his method is applied to the code-on-demand question itself. The seven layers are not arbitrary points along a trade-off curve; they are the seven stages of a constraint accumulation that begins at the Null style — no constraints on client-side runtime — and ends at Layer 0 — full REST-compatible invariant preservation through the exclusion of all client runtime.

**The Null style.** Before any PRESTO constraint is applied: no architectural limitation on client-side runtime. Any executable may be delivered through any channel to any context. No REST-compatible invariant is guaranteed. The Null style lies outside the spectrum; the spectrum begins when the first constraint is applied.

**The accumulation.** Each layer is reached by adding one constraint to the layer above it. Each constraint is a specific capability prohibition. Each constraint induces a specific REST-compatible invariant that the prohibition preserves. The derivation proceeds from Null to Layer 0 in seven steps.

**C₁ — Null → Layer 6.** Prohibit: unauthenticated or unframed client code delivery channels. Induce: authenticated binary WebSocket framing as the only client-executable-delivery transport. *At Layer 6:* native-speed computation (WebAssembly binaries) is permitted, but delivery is bounded; code provenance is verifiable; the client does not execute code from a channel the server has not authorized.

**C₂ — Layer 6 → Layer 5.** Prohibit: native-speed compiled computation. Induce: client execution stays within JavaScript-engine sandbox bounds; compute cost is predictable; no escape-hatch into CPU-bound or memory-bound native execution. *At Layer 5:* client routing within bounded regions of the representation is permitted.

**C₃ — Layer 5 → Layer 4.** Prohibit: client-assumed navigation authority. Induce: the server retains authority over URL-to-representation mapping; URLs remain meaningful externally; cacheability and link-structure-based content addressability are preserved. *At Layer 4:* authenticated islands — pushed code opening scoped HTTP data channels using server-granted tokens — are permitted.

**C₄ — Layer 4 → Layer 3.** Prohibit: client-opened scoped HTTP data channels. Induce: data flow occurs through server-initiated channels (the authenticated WebSocket); no client-decided HTTP fan-out; authority over data-flow topology remains with the server. *At Layer 3:* server-pushed executable code over the authenticated WebSocket is permitted.

**C₅ — Layer 3 → Layer 2.** Prohibit: server-pushed executable code after the initial load. Induce: code provenance is bounded to the initial HTML response; cacheability of the HTML/script bundle is preserved; no post-load code injection. *At Layer 2:* `htx:script` IIFE blocks authored in the initial HTML are permitted.

**C₆ — Layer 2 → Layer 1.** Prohibit: inline executable scripts in the initial HTML. Induce: the initial HTML contains no executable code; scripts the page depends on are limited to the fixed declarative-enhancement runtime (htmx) and what the browser's built-in HTML interaction model interprets. *At Layer 1:* declarative hypermedia attributes are permitted.

**C₇ — Layer 1 → Layer 0.** Prohibit: client-side runtime of any kind. Induce: pure server-rendered HTML; every REST-compatible invariant maximally preserved — statelessness, cacheability, layered-system, uniform-interface, universal accessibility without JavaScript. *At Layer 0:* no client runtime is delivered.

**What this constraint-set induces.** Progressive code-on-demand in PRESTO is not a trade-off spectrum; it is an accumulation spectrum. The developer choosing a layer is choosing which prefix of the seven-constraint sequence to commit to — Layer 0 is the full accumulation, Layer 6 is the single-constraint minimum, any layer in between is the partial prefix ending at that step. The filtered-object structure is identical to the one Fielding's own REST derivation produces in Chapter 5 of his dissertation, where REST's six constraints are accumulated from the Null style in the same manner.

The trade-off framing — each layer "trades specific properties for specific capabilities" — remains a valid pedagogical shorthand for the same structure viewed from the developer's side. When the developer refuses to move from Layer n to Layer n-1 (i.e., refuses to add the next constraint), the capability that constraint would have prohibited is retained, and the REST-compatible invariant the constraint would have induced is not guaranteed. The "trade-off" is the practitioner-side reading of the accumulation: each constraint added costs the capability it prohibits; each constraint refused costs the invariant it would have induced. The underlying form is constraint accumulation; the practitioner feels it as trade-off.

Each layer has known properties because each layer has a known constraint count and a known induced-invariant set. The developer navigates a formally specified design space — not a continuous curve, not an arbitrary enumeration, but a filtered object with seven deliberate steps, each reversible by dropping exactly one constraint, each producing exactly one REST-compatible invariant.

## 4. Ripple Effects — Notes for the v2 Dissertation Editor

The reformulation above is self-contained within §3.4. Other sections of the v1 dissertation that reference the spectrum or its properties will need corresponding adjustments in v2. Specific locations and suggested edits follow.

**Reader's Introduction (v1 Doc 185, near line 6).** The current wording — "a seven-layer constraint-property spectrum where each layer of code-on-demand trades specific REST properties for specific client capabilities" — should be updated to: "a seven-layer constraint accumulation in which each layer is reached by adding one specific capability prohibition to the layer above, inducing one specific REST-compatible invariant." Length is preserved; framing is corrected.

**§3 introductory framing.** Any language in the opening paragraphs of §3 that presents PRESTO's construction-level constraints as a "trade-off between REST properties and client capabilities" should be revised to present them as "a constraint accumulation on client-side runtime that preserves REST-compatible invariants in direct proportion to the count of constraints applied." The trade-off reading can be retained as a parenthetical secondary framing.

**§5 / §4 (*The Induced Property*).** The argument that PRESTO's constraints induce the property "ambivalent execution with agnostic determinism" is unaffected by the reformulation. The induced-property structure at that section is independent of whether the code-on-demand spectrum is presented as accumulation or trade-off. No edits required to the induced-property derivation itself.

**Abstract and marketing materials (outside the dissertation).** The pitch-deck, one-pager, and external communications that describe the spectrum in trade-off language are outside the v2-dissertation scope but should be updated separately for terminological consistency. These are not required for v2 to ship.

**Doc 083 (*Unified Paper v2*) Section II.5.** Contains the same trade-off framing as v1 §3.4. An identical reformulation to §3 above should be applied there if the unified paper is updated in parallel.

**Doc 144 (*Resolution Stack*) Section 4.2.** Mentions PRESTO's induced property and composes it with other stack levels. The composition argument is unaffected; no edit required unless the chapter's introduction is rewritten.

## 5. What the Reformulation Preserves

Three substantive claims from v1 survive unchanged in v2:

1. The seven-layer spectrum itself — the specific cut points Layer 0 through Layer 6 — is retained.
2. The operational insight that "the developer navigates a design space where every point has known properties" is retained, with the formal ground strengthened (the points are known because the accumulated constraint set at each layer is known).
3. The constraint that code-on-demand be "progressive" is retained, now with a specific formal meaning: progression is constraint addition in a totally ordered sequence, not arbitrary jumps between distinct capability configurations.

## 6. What the Reformulation Changes

Two specific things change:

1. The primary framing is accumulation, not trade-off. The trade-off framing becomes a secondary practitioner-side reading of the same structure.
2. The induced property at each layer is named specifically as a REST-compatible invariant that the corresponding constraint preserves (e.g., "cacheability of the HTML/script bundle" for C₅; "server authority over URL-to-representation mapping" for C₃). The v1 text's "maximum REST properties" at Layer 0 is made granular — it is the accumulation of seven specific invariants, not a single bulk designation.

## 7. Falsifiers

- If the accumulation of C₁ through C₇ is shown to produce a layer the primary-source enumeration does not recognize — for instance, if C₂ is found to collapse Layer 5 into Layer 4 when applied, or if C₅ can be applied before C₄ without structural difference — the accumulation ordering is wrong and the reformulation requires revision.
- If any of the seven induced-invariant statements is found to misrepresent a REST-compatible property, that clause must be narrowed to match.
- If the v1 dissertation's other sections reference the trade-off framing in ways not enumerated in §4 above, those references are unresolved ripples and should be located before v2 ships.
- If the formal equivalence between PRESTO accumulation and Fielding's REST accumulation is itself contested — for instance, if a categorical distinction between the two derivations emerges on closer analysis — Doc 418's collapse conclusion narrows and this reformulation's "identical to Fielding's own method" language requires softening.

---

## Closing

The reformulation above is the drop-in replacement for §3.4 of Doc 185. It expresses PRESTO's Progressive Code-on-Demand spectrum in the formally fundamental framing — constraint accumulation from the Null style — while retaining the trade-off framing as a valid pedagogical secondary reading. It is the first artifact toward a v2 PRESTO dissertation. Additional v2 work (consistent updates to the Reader's Introduction, §3's opening framing, and any parallel unified-paper edits) is scoped in §4 above as concrete next steps for the editor.

---

## Appendix: The Prompt That Triggered This Document

> "Let's extract from the PRESTO dissertation this specific concerned section and reformulate it according to our new findings. Then create a new artifact. It will be the basis for a v2 PRESTO dissertation"
