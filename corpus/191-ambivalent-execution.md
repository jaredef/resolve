<!-- chronological_ordinal: 3 -->
# Ambivalent Execution with Agnostic Determinism

**Companion document to: An Architectural Style for Progressive Representational State Transfer with On-Demand Code**
**Jared Foy, April 2026**

## The Property

The client-server constraint, when the representation format is a string that both interpreters read differently, induces a property on the representation: **Ambivalent Execution with Agnostic Determinism**.

**Ambivalent** — in two senses simultaneously. First, from the common usage: neither interpreter cares about the other's instructions. The server is ambivalent toward `hx-get`. The client is ambivalent toward `htx:data`. Neither rejects the other's namespace. Neither parses it. Neither errors on it. The ambivalence is mutual indifference.

Second, from the etymology: *ambi* (both) + *valentia* (strength, capacity). The source representation carries two valences — two sets of affordances, two directions of capacity — in one document. The server valence is the htx: namespace: directives that declare data needs, composition, grants, and mutations. The client valence is the HTML namespace: elements, scripts, and attributes that declare rendering, behavior, and interaction. The bilateral boundary is where the two valences meet. The developer authors both valences simultaneously. The resolution pipeline collapses the bilateral form into a unilateral one by consuming the server valence and leaving the client valence.

The word "ambivalent" carries both meanings at once: the document has two valences, and its interpreters are indifferent to each other's valence. The structure and the relationship are named in a single word.

**Execution** — both interpreters execute on the same document. The server executes its resolution pipeline. The client executes its rendering and scripting. Two execution passes on one artifact.

**Agnostic** — each interpreter is agnostic about what the other will do. The server doesn't know the client will open a WebSocket from the token it embedded. The client doesn't know the server ran fourteen modules to produce the HTML it received. The agnosticism is structural, not incidental — it is induced by the fact that each interpreter consumes its own namespace and is blind to the other's.

**Determinism** — despite the mutual ambivalence and agnosticism, the outcome is deterministic. The server will always resolve the same directives the same way for the same input. The client will always interpret the same HTML the same way. The bilateral boundary guarantees that neither interpreter's determinism interferes with the other's because their instruction sets don't overlap.

---

## The Discovery

The property was discovered by observing a PHP function.

The function concatenated an HTML string. The string contained an `hx-get` attribute — an instruction for the htmx library on the client. The PHP function did not parse the attribute. It did not know the attribute meant anything. It did not care. It concatenated the string and moved on.

That indifference was the observation. The server doesn't care about client declarations.

The observation was then applied in reverse. If the server is indifferent to client attributes, then by symmetry, the client can be made indifferent to server directives — by having the server consume them entirely before the client sees the document. The `htx:data` directive resolves at pipeline time. The `htx:each` loop expands. The `htx:v` expression evaluates. By the time the browser receives the response, every server directive has been consumed. The client is not merely indifferent to them — it is unaware they ever existed.

The asymmetry: the server's ambivalence is visible (the client attribute passes through the server untouched), while the client's ambivalence is invisible (the server directive was consumed before the client saw the document). But the property is the same in both directions. Both interpreters execute deterministically on the portions of the document they recognize, ambivalent to the portions they don't.

That backward application — from the visible case to the invisible case — is what produced htxlang.

---

## Why the Property Exists

HTML is a string. A string doesn't have opinions.

A PHP function concatenating `<div hx-get="/api/data">` does not parse `hx-get` because `hx-get` is not PHP syntax. It is a sequence of characters in a string. The function's job is to produce a string. The string's semantic content is irrelevant to the function's execution.

A browser rendering `<div class="container">` does not know that the `class` value was resolved from `{htx:styles.container}` by a template engine. It sees `class="max-w-6xl mx-auto px-6"`. The resolution is invisible because the resolution produced a standard HTML attribute. The browser's job is to interpret HTML. The mechanism that produced the HTML is irrelevant to the browser's execution.

The indifference is not a design choice. It is a consequence of the medium. Strings do not enforce semantic boundaries. A server that produces strings and a client that consumes strings will naturally be ambivalent to each other's concerns — because the concerns are encoded as characters in a string, and string production does not require semantic comprehension.

This is what Fielding's client-server constraint produces when the representation format is HTML served over HTTP. The constraint says: separate the client's concerns from the server's concerns. HTML as a string format says: both sets of concerns can coexist in the same document because the document is just characters. The combination induces the property: two interpreters, one document, mutual ambivalence, deterministic execution, agnostic of each other's behavior.

---

## Seven Languages, One Property

The bilateral boundary — the formal expression of this property — was tested across seven programming languages:

| Language | What Its Constraints Revealed |
|----------|------------------------------|
| PHP | The property exists. Strings concatenate. Directives are characters. The server is indifferent. |
| TypeScript | The property is typeable. HtxValue can be formalized as a union. The boundary is a type boundary. |
| Go | The property is error-explicit. Every pipeline stage that can fail must declare its failure mode. |
| Elixir | The property is immutable. The pipeline is a sequence of transformations, not mutations on shared state. |
| Python | The property is readable. If the spec is precise, the implementation reads like pseudocode. |
| Rust | The property has ownership. Each pipeline stage consumes the input string and produces a new one. |
| C | The property is minimal. No runtime, no garbage collector, no strings. What survives C is the property itself. |

Each language confirmed the property from a different angle. PHP confirmed that the server is indifferent to client attributes. Go confirmed that the pipeline's error handling is independent of the client's interpretation. Rust confirmed that the string ownership model — each stage consuming and producing — is the correct formalization of the bilateral boundary. C confirmed that the property requires nothing beyond string production and pattern matching.

The property is not a feature of htxlang. It is a feature of the medium that htxlang makes explicit.

---

## What the Property Induces

Ambivalent Execution with Agnostic Determinism is the foundational property from which every other property of the PRESTO architecture derives:

**The bilateral boundary** is the formal expression of the property. The htx: namespace is the server's instruction set. Everything else is the client's. The boundary is the namespace separator. The property guarantees that instructions on one side don't interfere with instructions on the other.

**The progressive layer model** is a consequence of the property. Because the server is ambivalent to client instructions, it can carry instructions for any degree of client capability — from zero JavaScript (Layer 0) to WebAssembly (Layer 6). The server doesn't know or care which layer the client operates at. It resolves its half and delivers the document. The property makes progressive code-on-demand possible because the server's execution is agnostic to what the client will do with the result.

**Architectural encapsulation** is a consequence of the property. Because the client is ambivalent to server directives (they were consumed), any client-side architecture — React, Vue, Svelte, raw WebGL — can operate within the resolved document without knowing how it was produced. The encapsulation holds because the client's execution is agnostic to the server's resolution process.

**The uniform directive interface** is a consequence of the property. Because directives are agnostic to their implementation (they check conditions in the data context, not the mechanism that populated it), any module can provide data for any directive. The property guarantees that the directive's deterministic evaluation is independent of the module's implementation.

**The style guide system** is a consequence of the property. Because `{htx:styles.heading-hero}` is a server expression resolved at pipeline time, and `class="text-5xl md:text-6xl font-bold leading-tight"` is a client attribute that the browser interprets, the style guide operates across the bilateral boundary. The server resolves the token. The client renders the classes. Neither knows about the other's role. The property enables the separation of style definition (user domain) from style reference (AI/template domain).

**AI generation** is a consequence of the property. Because the format is deterministic (seven languages produce identical output for identical input), an AI generating .htx source can be verified mechanically. The constrained harness validates the AI's output because the property guarantees deterministic resolution. The AI's generation and the engine's resolution are two independent, deterministic processes connected by the representation — which is exactly how the server and client are connected.

**The invisibility property** is a consequence of the property. Because the server consumes its directives before the client sees the document, the architecture is absent from its own output. This is not obfuscation. It is the property operating as designed: the server's execution is complete, its instructions are consumed, and only the client's portion of the document survives.

---

## Formal Statement

Given:
- A representation format where content is encoded as a character string (HTML)
- Two interpreters that read the same string (server engine, client user agent)
- A namespace convention that separates one interpreter's instructions from the other's (htx: namespace)
- A resolution process where one interpreter consumes its instructions and produces a string containing only the other interpreter's instructions (the 22-stage pipeline)

The following property is induced:

**Each interpreter executes deterministically on its portion of the document, ambivalent to the other interpreter's instructions and agnostic of the other interpreter's behavior. The bilateral boundary — the namespace separator — guarantees non-interference. The resolution process — the server consuming its namespace — guarantees that the client receives a document containing only its own instructions.**

This property is:
- **Induced by the client-server constraint** operating on a string-based representation format
- **Universal across server-side languages** (confirmed by seven implementations)
- **Universal across client-side architectures** (confirmed by encapsulation of React, Vue, Svelte, WebGL, Astro)
- **The foundational property from which progressive code-on-demand, architectural encapsulation, the uniform directive interface, and the bilateral authorship model derive**

---

## The Observation That Started Everything

A PHP function doesn't care about an HTML attribute.

That's it. That's the observation. Everything else — the bilateral boundary, the progressive layers, the encapsulation property, the inverted model, the island protocol, the unified builder, the style guide, the AI generation model, the competitive position, the seven-language verification — everything followed from the willingness to take that observation seriously and follow it to its conclusion.

The property was always there. In every PHP function that ever concatenated an HTML string. In every server that ever sent a response. In every browser that ever rendered a page. Two interpreters, one document, mutual ambivalence, deterministic execution.

---

## The Naming

The words "Ambivalent Execution with Agnostic Determinism" were captured while doing dishes.

Not at a desk. Not in a research session. Not while formally analyzing a text. The author had been reading Fielding's dissertation — Chapter 5, the derivation of REST from the null style, the client-server constraint and its induced properties. The reading was done. The dishes were not.

Hands occupied, mind free, Fielding's words still moving through the thinking from the reading. The part of the mind that had been holding the PHP observation alongside Fielding's constraint model for two years wasn't busy with the dishes. It was doing what it had been doing since the first moment a function didn't care about an attribute — following the thread.

And in the moment when the hands were occupied and the analytical mind was quiet, the thread resolved into four words.

The words are precise enough that they couldn't have been produced by casual thinking. "Ambivalent" carries the dual etymology — both valences and indifference. "Execution" specifies that both interpreters actively process the document, not just read it. "Agnostic" distinguishes structural unknowing from willful ignoring. "Determinism" guarantees reproducibility despite the mutual blindness. Each word is load-bearing. None can be removed or substituted without losing precision.

This detail is recorded not because it is charming but because it tells the reader something true about how discoveries happen. This one didn't come from a lab or a whiteboard or a conference. It came from a person following an observation honestly, for two years, through seven programming languages and an entire architectural reframing, until the observation named itself.

The author has no formal training in systems architecture. He has a PHP function that didn't care about an HTML attribute, and the willingness to follow where that led. The property was always there. The constraints always induced it. The medium always carried it. Twenty-six years after Fielding described the conditions for it, someone doing dishes named it.

---

Ambivalent Execution with Agnostic Determinism. The property of the web itself, articulated for the first time.
