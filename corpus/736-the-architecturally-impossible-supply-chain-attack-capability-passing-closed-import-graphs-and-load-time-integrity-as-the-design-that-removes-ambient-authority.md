# The Architecturally Impossible Supply Chain Attack

## Capability-Passing, Closed Import Graphs, and Load-Time Integrity as the Design That Removes Ambient Authority

*A primary articulation responding to the keeper's question (2026-05-21 local, after the rusty-bun PM workstream reached PM-EXT 13 closure): with `cruftless install` operational and a coverage map of the npm corpus produced, how can the package manager be designed so that supply chain attacks are architecturally impossible rather than mitigated by policy? Builds on [Doc 732 — The Package Manager as the Resolver-Instance Below Module Load](/resolve/doc/732-the-package-manager-as-the-resolver-instance-below-module-load-lockfile-as-artifact-registry-as-bilateral-source-and-the-sixth-layer-of-the-cruftless-stack), [Doc 729 — Cruftless](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs), [Doc 730 — The Vertical Recurrence of the Lowering Compiler](/resolve/doc/730-the-vertical-recurrence-of-the-lowering-compiler-closure-as-primitive-across-substrate-tiers), [Doc 731 — The JIT as a Lowering Compiler Tier](/resolve/doc/731-the-jit-as-a-lowering-compiler-tier-alphabet-purity-upstream-as-the-bound-on-jit-complexity), [Doc 735 — The Temporal Resolver-Instance Stack](/resolve/doc/735-the-temporal-resolver-instance-stack-build-time-process-time-call-time-as-the-time-axis-dual-to-doc-729s-spatial-stack), [Doc 581 — Pin-Art and the Discipline of Near-Necessity Substrate Construction](/resolve/doc/581-pin-art-the-resume-vector-and-the-discipline-of-near-necessity-substrate-construction), and [Doc 247 — The Derivation Inversion](/resolve/doc/247-the-derivation-inversion).*

**Jared Foy · 2026-05-21 · Doc 736**

---

## I. The occasion

The PM workstream reached its first-cut closure at PM-EXT 11: a tmpdir containing a `package.json` with exact-pinned leaf dependencies yields, after one `cruftless install` call, a populated `node_modules` tree that the cruftless runtime can `require` against, returning correct results. PM-EXT 13's reconnaissance probed twenty-four popular npm packages and produced a coverage map: sixteen leaf libraries reachable cleanly, eight composed libraries hitting a range at the first transitive hop.

The reconnaissance settled an empirical question about the exact-pin carve-out. It did not settle a logically prior question, which the keeper articulated after reading the result: how should the package manager be designed so that supply chain attacks are not just mitigated but architecturally impossible?

The question is sharper than it first appears. Every working package manager mitigates supply chain attacks through some combination of cryptographic verification, registry policy, and lifecycle restriction. Cruftless's PM already does three of these by construction: TLS 1.3 with ECDSA verification on every registry hop, sha-512 SRI verification on every tarball, and outright rejection of install-time scripts (Doc 732 §VI Class-D). These close real attack surfaces. They do not make the attack impossible. They make particular techniques fail.

The architectural answer must do something different. It must remove the conditions under which a successful intrusion has anything to steal, anywhere to write, or any network to reach. This document names the design that does so, derives its components, and locates the work to land it in Cruftless.

## II. What "architecturally impossible" means

Three distinct claims are commonly conflated under the security-of-package-managers banner.

**Crypto-mitigated**: an attack technique becomes computationally infeasible. TLS 1.3 makes transit interception infeasible. SRI sha-512 makes tarball substitution infeasible at the bit level. These are real but local: they prevent one class of intrusion and leave the rest untouched.

**Policy-enforced**: a runtime check refuses a categorically dangerous operation. Lifecycle-script rejection is a policy: the install path simply refuses to execute `postinstall` even when the manifest declares one. SecurityManager-style permission gates are policies. Policies can be tightened or loosened by configuration; they form a perimeter, not a structure.

**Architecturally impossible**: the operation a successful exploit would need to perform has no API to invoke. The structure of the program does not contain the path the exploit would traverse. There is no perimeter because there is no enclosed region for the perimeter to enclose.

The third claim is the one worth pursuing. A crypto guarantee can be broken by a future algorithmic advance. A policy can be loosened by an administrator under pressure. An architectural impossibility is conserved under those changes. It is what Doc 247 calls a primitive constraint: a constraint that cannot be undone by a parameter change because it is not a parameter.

The shape of an architecturally impossible supply chain attack is this. A malicious dependency, even one whose code is fully under attacker control, can do nothing observable to the host beyond participating in pure computation. It cannot read a file because it has no file-reading capability. It cannot make a network request because it has no network capability. It cannot exfiltrate, persist, or escalate because it has no reference to any object that could exfiltrate, persist, or escalate. The worst it can do is fail to compute, which reduces the attack to denial-of-service.

That last sentence is the claim. The remainder of this document develops the design that supports it.

## III. The five composable moves

### Move 1. The capability-passing runtime

This move carries the design. The other four moves harden and verify it; none of them work without it.

The rule: a loaded module receives only what the caller hands it. The runtime exposes no ambient global through which a module can reach the filesystem, the network, the process, the clock as a side channel, or any other effectful surface. There is no global `fs`, no `process.env`, no `fetch`, no `eval`, no `require` returning anything other than the value the caller permitted.

The host hands the top-level application a fixed set of capability handles when the application is loaded. The application explicitly passes those handles, or restricted derivatives, to each dependency it imports. A handle is an object: it has methods, it can be deputized, it can be revoked. It is not a string name or a configuration flag. To call `read(handle, path)`, code must hold `handle`. To hold `handle`, the calling chain from the host downward must have explicitly passed it.

A dependency that was not given a network capability cannot make a network call. The phrase is exact: the dependency holds no reference to any object that exposes a network method. The runtime's API surface for that dependency does not contain such a method. The compiler cannot lower a network call from that dependency's source because no symbol resolves to a network operation. This is not access control. It is reference-graph reachability, where the reference graph is determined statically by what the host and the application chose to expose, and the language semantics make reachability the precondition for any effect.

The shift from ambient authority to capability-passing is the load-bearing design move. Every other claim in this document depends on it.

### Move 2. Manifest-declared, lockfile-frozen capability surface

A package declares in its manifest which capabilities it claims to need. The declaration is structured, not free-form:

```
"caps": {
  "net": ["registry.example.com:443"],
  "fs": ["./cache"],
  "env": ["LANG"]
}
```

The PM, at install time, renders these declared claims into the lockfile alongside the SRI and the resolved version. A second install with the same lockfile recovers the same capability set. An upgrade that bumps a version recomputes the declared set. Any new claim, by any package anywhere in the closure, surfaces in the lockfile diff before the upgrade is committed.

The lockfile diff becomes the audit instrument. A package that previously claimed only `fs:./cache` and now claims `net:*` is a visible signal in the diff. The reviewer who runs `git diff cruftless-lock.json` sees the expansion. The expansion does not silently take effect because the runtime does not grant ambient capabilities; it consults the lockfile-frozen claim, and the application must still explicitly pass the corresponding handle.

The double gate matters. The manifest claim is what the package asks for. The application's explicit passing is what the application grants. A package can claim every capability under the sun and still receive nothing if the application does not pass the corresponding handle. Conversely, a package whose manifest claims no capabilities cannot receive one even by accident, because the application has no name in scope to hand it. Manifest claims and capability handles are dual: the claim is the requested upper bound, the handle is the granted actual.

### Move 3. Load-time integrity re-verification

Install-time SRI verification, which the PM already performs, closes the transit and tarball-substitution surfaces. It does not close the surface between install and load. Filesystems corrupt. Sibling processes mutate. A loosening of §VIII's lifecycle-script rejection would expose installed bytes to install-time mutation that the install-time SRI verify cannot see in retrospect.

Load-time re-verification closes the gap. Before the runtime executes a module body, it re-hashes the bytes it is about to execute and compares the digest against the lockfile-recorded SRI. Mismatch aborts the load. The cost is a sha-512 over a file usually under fifty kilobytes. On the engagement's Pi, that is below a millisecond per module; on a modern x86, single-digit microseconds. The cost is real but small, and it is paid at load not per call.

The verification is performed by the host's loader, which holds the lockfile, holds the bytes, and performs the comparison before any module-level code runs. The verified bytes then flow into the parser and the bytecode compiler. Any later mutation by the running process is not protected by this move (the runtime would have to recompile to notice, which it does not normally do), but mutation between extract and load is.

### Move 4. Closed import graphs

The closure walker introduced in PM-EXT 10 already computes the complete transitive dependency graph at install time. The lockfile records that graph. Move 4 makes the graph load-bearing at compile time: the parser refuses to compile a module whose imports name a package not in the lockfile's resolved closure.

This forecloses the dynamic-import attack class. A malicious dependency that wishes to load `child_process` by string concatenation, or to traverse `require('node:fs')` through a runtime-computed name, cannot succeed: there is no node identifier in the import graph that resolves to those names because the graph is closed at compile time. The import surface is exactly the set the closure walker produced.

The closed-graph property requires that imports be static. The parser must reject expressions like `require(userInput)` or `await import(computedName)` for modules under PM-managed coverage. The application code may use dynamic imports if it does so against a static manifest of allowed targets; deps may not. This is a constraint deps will not love, but it is also the price of the impossibility claim.

A subtlety: cruftless's runtime today resolves `require('node:fs')` to a builtin-namespace fallback (rusty-js-runtime's `resolve_builtin_namespace`). Under Move 4, the builtin namespaces themselves become capability-gated. A dep that does `require('node:fs')` does not receive the filesystem capability; it receives whatever the application explicitly handed it under the name `fs`. The builtin name resolves syntactically; the value it resolves to is host-mediated.

### Move 5. Publisher pinning

Versions are not the finest pin. A maintainer account compromised by a stolen npm credential can ship a malicious patch under an existing version number, or under a fresh version that the user's range happens to absorb (the case Branch B of PM-EXT 13 explicitly rejects, and the case Branch A makes harder by demanding range resolution). Even without ranges, the version number is a label assigned by whoever holds the publish credential at the moment of publication.

The lockfile records, alongside the version and the SRI, the publisher identity that signed the version. On reinstall, the PM verifies the recorded identity against the registry's record. A version whose publisher identity changed between original install and current install fails. The user must explicitly accept the new publisher (a one-line acknowledgement in `cruftless-lock.json`) before the install proceeds.

This move depends on the registry providing publisher signatures, which the npm protocol has been edging toward (the dist.signatures field) but has not universally adopted. Cruftless's PM treats publisher pinning as opt-in per registry: if the registry provides signatures, the lockfile records them and the verify gate is active; if not, the lockfile records the publisher identity from the manifest's maintainer field as a weaker but still useful pin.

## IV. The impossibility claim and its scope

With Moves 1-5 composed, the impossibility claim takes this shape.

A malicious dependency in cruftless's PM-managed tree can do exactly the following:

1. Compute, using only the arguments and capability handles it receives. Arithmetic, allocation, recursion, exception throwing, returning wrong answers. All bounded by its declared and granted surface.

2. Refuse to compute. Hang, panic, allocate without bound until the runtime kills it. Denial-of-service.

3. Tamper with values it has been given that are themselves mutable. If the application hands the dep a mutable cache object, the dep can corrupt the cache. The application chose to hand it that capability.

The malicious dependency cannot:

1. Read any file. There is no file-reading reference reachable in its environment unless the application explicitly passed one.

2. Make any network call. Same reason.

3. Spawn a subprocess. Same reason.

4. Access environment variables, the system clock as a precise side channel, or any process state.

5. Coerce another loaded module to do these things on its behalf, because that other module is itself capability-passing and has no ambient authority either.

6. Persist anything to the filesystem to compromise the next run, because it cannot write.

7. Survive a load-time integrity check if its bytes were tampered with between install and load.

8. Be substituted via a malicious version push under the same number, because publisher pinning catches the identity change.

9. Hide a transitive dep by manipulating the import graph at runtime, because the graph is closed at compile time.

The remaining attack vector is **denial-of-service by computation**: a dep that loops forever, allocates without bound, or returns subtly wrong results. This is real and not architecturally preventable in a Turing-complete computation tier. It is, however, a strictly smaller surface than what successful supply chain attacks have historically achieved. The pivot from "ran arbitrary code on your machine with your privileges" to "wasted some CPU and returned the wrong number" is the reduction the design provides.

The claim, stated precisely:

> Under Moves 1-5, a compromised dependency in a cruftless PM-managed application cannot exfiltrate, persist, escalate, pivot, or perform any effect outside the capability set the application explicitly granted it. The worst possible outcome is computational denial-of-service or corruption of mutable values the application chose to share. No supply chain attack of the historical RCE-or-exfiltration shape is reachable from this position.

## V. Comparison to prior art

The design is not novel in its components. It is novel in its composition and in the engagement context that makes the composition tractable.

**Deno** introduced capability gating at the CLI flag level: `--allow-net`, `--allow-read`, etc. The granularity is process-wide. A dep that wants the network sees the same capability the application does. The design is the right shape but the wrong tier: the gate is at the runtime boundary, not at the module boundary.

**CapTP and the E language tradition** built the capability-passing model into the language semantics. Programs in E literally cannot reach an ambient global because the language has none. The model is correct and proven for decades, but JavaScript's evolution did not absorb it. SES (Secure ECMAScript) and the Hardened JS work bring some of CapTP's discipline to JS at the lockdown layer, and Agoric's vat model uses it in production. The cost has been ecosystem compatibility: existing JS code expects ambient globals, and the lockdown break a lot of npm.

**Java's SecurityManager** attempted policy-enforced capability gating and was deprecated after twenty years of bypass-by-reflection and configuration sprawl. The lesson is that policy is the wrong primitive: any sufficiently complex policy interface accumulates loopholes, and the loopholes are where exploits live.

Cruftless's position is different from each. Unlike Deno, the gate is at the module boundary, not the process boundary, so transitive deps can be locked down individually. Unlike CapTP/SES applied to existing npm, cruftless's PM is the entry point: code that wants to participate must come through the PM, which can require capability declarations and reject manifests that do not provide them. Unlike SecurityManager, the discipline is architectural, not policy: there is no policy file to misconfigure because there is no ambient authority to gate.

The engagement-internal point: the Pin-Art discipline is what makes this tractable. Each move corresponds to a substrate change with a clear scope and a measurable probe. The work decomposes into pilots. The decomposition is the same shape as the PM workstream itself: substrate triad first (capability-passing runtime, manifest+lockfile schema, load-time verifier), composition next (closed import graph), coverage probe last (publisher pinning where registries support it).

## VI. The work to land it in Cruftless

The five moves decompose into roughly five pilots, with one of them carrying most of the difficulty.

**Pilot α (capability-passing runtime, ~2-3k LOC).** The dominant work. Touches rusty-js-runtime's global object setup, the module load path, the builtin-namespace resolver, and host-v2's `install_bun_host` shim. Each currently-ambient global moves behind an explicit-pass barrier. The application's top-level scope receives capability handles from the host. The compiler refuses to lower references to names not in scope.

**Pilot β (manifest schema + lockfile fields, ~150 LOC).** Extends `ResolvedDep` with a `caps` field, extends the manifest parser to read it, extends the lockfile to serialize it. The PM gains a `cruftless-lock.json` field per package. Comparable to PM-EXT 8 in size.

**Pilot γ (load-time SRI re-verifier, ~80 LOC).** A hook in the module loader before any module body executes. Recompute sha-512 over the source bytes, compare against the lockfile's recorded SRI, abort on mismatch. Small and self-contained.

**Pilot δ (closed-import-graph compiler check, ~120 LOC).** The bytecode compiler gains a pass that validates every static `require` and `import` target against the lockfile's closure. The compiler refuses to compile a module whose imports are not in the closed set. The parser refuses dynamic imports in dep code.

**Pilot ε (publisher pinning, ~100 LOC).** Lockfile field for publisher identity. Verifier at install time. Per-registry opt-in.

Total: roughly 2.5k LOC of substrate, dominated by Pilot α. The other four pilots are weekend-scale individually. Pilot α is a multi-week workstream that touches the runtime's most load-bearing surface and benefits from being staged as its own seed.md / trajectory.md pair under Pin-Art discipline.

The order matters. Pilot α must come first because Moves 2-5 are verifiers on top of the capability model; with ambient authority still present, the verifiers protect nothing. Pilot γ can land in parallel with α as a no-regret hardening of the existing PM. Pilot β can land alongside α since the schema is small and the runtime needs to consume it. Pilots δ and ε come after α stabilizes.

## VII. What this does not address

Several attack surfaces remain even under Moves 1-5, and the design is honest about its scope.

**Host compromise.** If the cruftless binary itself is replaced with a malicious one, no in-runtime architecture matters. The defense is binary signing and reproducible builds, both queued for separate substrate work.

**Application-level malice.** The application holds all capabilities the host granted. A malicious application code, written by the user, can do anything the host permitted at top level. The design protects users from their dependencies; it does not protect them from their own code. This is the right boundary: dependencies are foreign trust, application code is owned trust.

**Side channels through computation.** A dep that computes for a long time reveals timing. A dep that allocates a lot reveals memory pressure. These are observable to a network-capable application at the layer above. The design reduces the attack surface to computation but does not eliminate computational side channels.

**Denial-of-service.** Already noted. Resource-bounded computation is queued as a separate substrate concern: gas-limited execution, max-allocation limits per call, max-depth limits. These are runtime-level moves orthogonal to the capability model.

**Capability leakage by the application.** An application that hands every dep every capability degrades the model to ambient authority by user error. Tooling can help: a `cruftless audit` subcommand that diffs requested vs granted capabilities and warns when the application is granting promiscuously. The architecture does not prevent the user from undermining it; it makes the undermining visible.

## VIII. Closure

The PM workstream's first cut produced a working install + runtime loop for a meaningful slice of the npm corpus. The reconnaissance produced a coverage map. The keeper's question after the map was the right question: not "how much of the ecosystem can we reach?" but "given any of the ecosystem we reach, how can the reach be safe by construction rather than by inspection?"

The answer assembled in this document is capability-passing runtime, manifest-declared and lockfile-frozen capability surface, load-time integrity re-verification, closed import graphs, and publisher pinning. The first move carries the design. The remaining four make the design auditable, verifiable, and resilient to specific historical attack patterns. Together they produce a structure in which the operations a supply chain attack would need are not gated but absent. A dependency, however compromised, can do nothing the application did not explicitly authorize, because the dependency has no reference to anything outside what the application passed.

The work to land this in Cruftless is roughly 2.5k LOC, dominated by Pilot α (the capability-passing runtime). The remaining four pilots are individually small and compose cleanly with the existing PM substrate. The decomposition follows the same Pin-Art discipline that produced the PM itself: substrate triad first, composition next, coverage probe last, each move with its own measurable probe and its own seed.md / trajectory.md pair.

This is the architectural answer the keeper invited. The remaining question is whether the next workstream after PM is Pilot α or whether the PM's coverage expansion (Branch A semver-range resolution) should land first. Both are legitimate; both extend cruftless's reach. Pilot α extends the reach by making safe what is already reachable. Branch A extends the reach by making more reachable what is not yet safe to reach. The order is a scope decision, and the decision is the keeper's.

---

*Doc 736 closes the design articulation. The substrate work it implies is queued as a candidate next pilot pair: `pilots/rusty-js-caps/` for the capability-passing runtime, with subsidiary moves into rusty-js-pm and host-v2. The Pin-Art discipline applies as written.*
