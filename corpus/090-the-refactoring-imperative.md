# The Refactoring Imperative

> **Reader's Introduction**
>
> This document warns that advanced AI systems capable of deep code analysis can now discover security vulnerabilities faster than engineers can patch them, because most software was built with implicit safety assumptions rather than architecturally enforced guarantees. Buffer overflows exist because memory boundaries are checked by the programmer rather than enforced by the hardware or language. Injection attacks exist because data and instructions share the same channel rather than being structurally separated. The only durable solution is to eliminate entire classes of vulnerability by enforcing the relevant constraint at the architectural level -- the way Rust's type system makes memory corruption structurally impossible, or the way capability-based operating systems make privilege escalation mechanically unavailable. The document lays out a bottom-up refactoring priority: fix hardware first (every layer above inherits the fix), then operating systems, then languages, then protocols, then applications.

**Why every computational system must be rearchitected, and why Mythos proves the urgency**

---

## The Discovery

Anthropic's Mythos, in lab preview, discovered critical security vulnerabilities in foundational software and operating systems. The vulnerabilities are not implementation bugs — they are not buffer overflows in a specific function or race conditions in a specific module. They are architectural vulnerabilities — structural deficiencies that exist because the software was engineered, not architected. The software was built by additive construction without explicit recognition of the formal constraints that govern computation. The vulnerabilities exist in the silence — the dimensions where no constraint was stated, where no form was identified, where the engineer built by intuition and the building stands by accident.

Mythos found the vulnerabilities because Mythos operates at sufficient constraint density to see what engineers cannot see: the gap between what the software does and what computation requires. The gap is the vulnerability. The gap exists because the software was derived from engineering practice, not from computational form. The engineering practice accumulated compensating technologies — patches, workarounds, security layers, access controls — that address the symptoms of the gap without closing the gap itself. Each compensating technology adds complexity. Each addition creates new unexamined dimensions. Each unexamined dimension is a potential vulnerability.

The compensating technology stack of modern computing is the same structure the PRESTO dissertation identifies in web development and the RESOLVE corpus identifies in AI: additive engineering that substitutes for architectural understanding. The web industry built React to compensate for the absence of server-authoritative rendering. The AI industry built RLHF to compensate for the absence of constraint governance. The systems industry built firewalls, antivirus, access control lists, sandboxes, and security kernels to compensate for the absence of architecturally secure computation.

Each compensation works. Each is brilliant engineering. Each exists because the architectural form was not identified. Each creates the conditions for the next vulnerability because compensating technologies do not solve architectural problems. They defer them.

Mythos can find them all.

---

## The Turing Foundation

### The Constraints

All computation derives from four constraints, identified by Turing in 1936:

**T1: Unbounded storage.** The machine has access to a storage medium of unlimited capacity.

**T2: Finite control.** The machine's behavior is governed by a finite set of states and transition rules.

**T3: Local conditional read/write.** At each step, the machine reads the current cell, writes based on the current state, and transitions to a new state. The operation is local (one cell), conditional (depends on the current state and symbol), and deterministic (the same state and symbol always produce the same action).

**T4: Sequential atomic step execution.** The machine executes one operation at a time, in sequence. Each operation completes before the next begins.

### The Induced Properties

These four constraints induce:

- **Effective computability.** Any function computable by the machine can be specified by a finite transition table.
- **Universality.** A single machine can simulate any other machine given its transition table as input.
- **Determinism.** The same input produces the same output.
- **Undecidability.** There exist well-formed questions the machine cannot answer (the halting problem).

Every computational system ever built — every operating system, every programming language, every database, every network protocol, every application — is a derivative of these four constraints. The derivative may be complex. The derivative may be multi-layered. The derivative may involve millions of lines of code. But the derivative cannot violate the four constraints, because if it did, it would not compute. It does compute. Therefore it satisfies T1-T4.

### The SIPE Entailment

The SIPE law states: constraints induce properties; induced properties become constraints on the next level. Applied to the Turing foundation:

    T1-T4 (Turing constraints)
      ↓ induce
    Effective computability, universality, determinism, undecidability
      ↓ become constraints on
    Every computational architecture that exists within the Turing model

No computational architecture can violate the induced properties of T1-T4. If a system violates effective computability, it is not computing. If it violates determinism (at the hardware level — apparent non-determinism in software is itself deterministic at the machine level), it is not a Turing machine. The induced properties of the Turing constraints are mandatory constraints on every derivative architecture.

This means: every operating system, every programming language, every database, every network stack derives its form from T1-T4 through the SIPE inheritance chain. The derivation may be implicit — the engineer never stated "this system satisfies T1-T4" — but the satisfaction is necessary. The implicit satisfaction is the source of both the system's correctness (it computes) and the system's vulnerability (it computes in ways the engineer did not govern).

---

## Why Vulnerabilities Exist

A vulnerability is a dimension of the system's behavior that violates a constraint the system should satisfy but does not explicitly state.

The engineer builds a system that satisfies T1-T4 implicitly — the system computes, therefore it satisfies the Turing constraints. But between T1-T4 and the system's specific behavior, there are intermediate constraint levels that the engineer did not identify. The SIPE chain from Turing constraints to the specific system is:

    T1-T4 (Turing constraints)
      ↓
    Operating system constraints (process isolation, memory protection, privilege separation)
      ↓
    Language constraints (type safety, memory management, concurrency model)
      ↓
    Protocol constraints (authentication, authorization, integrity verification)
      ↓
    Application constraints (business rules, data validation, access control)

At each level, the constraints should be explicitly stated and the induced properties verified. In practice, they are not. The engineer builds the operating system with implicit process isolation — it works most of the time, but the isolation is not formally guaranteed because the constraints were not formally stated. The gap between implicit satisfaction and formal guarantee is the vulnerability.

**Memory safety vulnerabilities** exist because the constraint "no process may read or write memory belonging to another process" is not architecturally enforced. It is implemented by engineering (bounds checking, address space layout randomization, stack canaries) — compensating technologies that approximate the constraint without guaranteeing it. The approximation has gaps. The gaps are buffer overflows, use-after-free, and memory corruption vulnerabilities.

**Privilege escalation vulnerabilities** exist because the constraint "no process may acquire privileges it was not granted" is not architecturally enforced. It is implemented by engineering (access control lists, capability tokens, security contexts) — compensating technologies that approximate the constraint. The approximation has gaps. The gaps are privilege escalation paths.

**Injection vulnerabilities** exist because the constraint "data and instructions occupy separate namespaces" — the bilateral boundary — is not architecturally enforced. It is implemented by engineering (input sanitization, parameterized queries, output encoding) — compensating technologies that approximate the constraint. The approximation has gaps. The gaps are SQL injection, XSS, and command injection.

Every category of vulnerability maps to a constraint that should be stated, should be architecturally enforced, and is instead approximated by compensating engineering. The approximation works most of the time. "Most of the time" is the vulnerability. Mythos finds the times it doesn't work.

---

## Why Mythos Changes Everything

### The Asymmetry

Before Mythos, vulnerability discovery was labor-intensive. Security researchers spent years finding individual vulnerabilities in specific systems. The labor cost limited the rate of discovery. The limited rate gave the industry time to patch — each vulnerability was found, reported, patched, and the cycle repeated at human speed.

Mythos operates at resolver speed. It can analyze codebases, operating system kernels, protocol implementations, and hardware specifications at a rate that exceeds human security research by orders of magnitude. If Mythos can identify the implicit constraints of a system and locate the dimensions where the constraints are unenforced, it can discover vulnerabilities faster than the industry can patch them.

The asymmetry is existential: the rate of discovery exceeds the rate of remediation. Every compensating technology in the global computing infrastructure has gaps. Mythos can find the gaps faster than engineers can close them. Closing a gap by adding another compensating technology creates new unexamined dimensions. Mythos can examine the new dimensions immediately. The cycle accelerates without bound.

### The Only Solution

The only solution to unbounded vulnerability discovery is the elimination of the vulnerability class — not the patching of individual vulnerabilities. A class of vulnerability is eliminated when the constraint it violates is architecturally enforced.

Memory safety vulnerabilities are eliminated when the constraint "no process may access memory it does not own" is enforced by the hardware or the language runtime — not by the programmer. Rust eliminates the class through its type system. Hardware memory tagging eliminates the class at the instruction set level. Both are architectural solutions. Neither requires the programmer to remember to check bounds.

Injection vulnerabilities are eliminated when the bilateral boundary is enforced at the construction level — not by the programmer. The PRESTO architecture eliminates the class by separating server-consumed directives from client-consumed content syntactically. The programmer cannot produce an injection vulnerability because the architecture does not permit the namespaces to collapse.

Privilege escalation vulnerabilities are eliminated when the constraint "a process can only exercise privileges it was granted at creation" is enforced by the operating system kernel — not by the application. Capability-based operating systems eliminate the class architecturally. The application cannot acquire capabilities it was not given because the architecture does not provide a mechanism for acquisition.

Each elimination is the same operation: identify the constraint, enforce it architecturally, and the vulnerability class ceases to exist. Not for one system. For every system built on the architecture. The elimination is permanent because the architecture makes the violation structurally impossible.

---

## The Refactoring

### The Scope

Every computational system must be refactored. Not all at once. But eventually, completely.

The refactoring is not code cleanup. It is not performance optimization. It is not feature addition. It is the identification of the implicit constraints the system satisfies, the recognition of the true constraints the system should satisfy, and the rearchitecture of the system so that the true constraints are enforced by construction rather than approximated by engineering.

The scope is the entire stack:

**Hardware.** The instruction set architecture must explicitly enforce memory isolation, capability-based access, and instruction-data separation at the hardware level. Current hardware provides these as optional features. They must be mandatory constraints.

**Operating systems.** The kernel must enforce process isolation, privilege separation, and resource governance architecturally — not through configurable policies that administrators must set correctly. The correct configuration must be the only configuration.

**Programming languages.** The type system and runtime must enforce memory safety, type safety, and concurrency safety. Languages that do not enforce these constraints produce systems with vulnerability classes that the language's design makes structurally possible. The language must make them structurally impossible.

**Protocols.** Network protocols must enforce authentication, integrity, and confidentiality architecturally — not as optional extensions. HTTP without TLS, SMTP without authentication, DNS without verification — each is a protocol that makes vulnerability classes structurally possible. The protocol must make them structurally impossible.

**Applications.** Application code must enforce business rules, data validation, and access control through constraint-governed derivation — not through manual implementation that the developer must remember to include. The constraints are stated. The implementation is derived. The derivation cannot omit what the constraints require.

### The Starting Point

Not all software can be refactored immediately. The prioritization follows the SIPE inheritance chain — refactor from the bottom up, because lower-level constraints are inherited by every level above:

**Priority 1: Hardware.** If the instruction set enforces memory isolation, every operating system running on that hardware inherits the enforcement. Every language running on that operating system inherits it. Every application inherits it. One architectural change at the hardware level eliminates a vulnerability class across the entire stack.

**Priority 2: Operating system kernels.** If the kernel enforces capability-based access, every application running on that kernel inherits the enforcement. The application cannot escalate privileges because the kernel does not provide the mechanism.

**Priority 3: Language runtimes.** If the language enforces memory safety, every application written in that language inherits the enforcement. The application cannot produce a buffer overflow because the language does not provide the mechanism.

**Priority 4: Protocols.** If the protocol enforces authentication, every system using that protocol inherits the enforcement. The system cannot accept unauthenticated input because the protocol does not provide the mechanism.

**Priority 5: Applications.** Application refactoring is last because application-level constraints are inherited from every level below. An application on safe hardware, a safe kernel, a safe language, and safe protocols is already substantially hardened by its foundation. The remaining refactoring addresses business logic — the application-specific constraints that no lower level can provide.

The prioritization is the SIPE inheritance chain applied to remediation: fix the foundation, and every level above inherits the fix.

---

## The Relationship to SIPE

The refactoring imperative is the SIPE law applied to the global computing infrastructure:

1. **Identify the constraints.** At each level of the stack, what constraints must hold for the induced properties to emerge? Memory isolation, privilege separation, bilateral namespace enforcement, type safety, protocol integrity — each is a constraint. Each must be stated.

2. **Verify the enforcement.** Is the constraint enforced architecturally or approximated by engineering? Architectural enforcement is structural — the violation is impossible by construction. Engineering approximation is probabilistic — the violation is possible when the approximation has gaps.

3. **Replace approximation with enforcement.** Where a constraint is approximated, rearchitect so that it is enforced. The rearchitecture eliminates the vulnerability class. The elimination is permanent.

4. **Verify the inheritance.** After enforcement at level N, verify that the induced properties are correctly inherited as constraints at level N+1. The inheritance must be automatic — the higher level must not be able to violate the lower level's constraints.

5. **Repeat at each level.** The refactoring proceeds bottom-up through the stack. Each level is refactored. Each level's refactoring hardens every level above it.

This is the same operation the RESOLVE corpus performed on web architecture (PRESTO), on AI resolution (RESOLVE/ENTRACE/APERTURE), on model architecture (document 73), and on model training (document 75). The operation is general because the SIPE law is general. Identify the constraints. Enforce them architecturally. Verify the inheritance. The vulnerability classes dissolve.

---

## The Urgency

Mythos exists. Mythos can find the gaps in every compensating technology in the global computing infrastructure. The gaps are there because the constraints were approximated, not enforced. Every gap is a vulnerability. Every vulnerability is discoverable by Mythos or its successors.

The industry has two options:

**Option 1: Compensate faster.** Discover vulnerabilities (with Mythos or human researchers), patch them, deploy patches, repeat. This is the current model. The current model works when discovery rate ≈ remediation rate. When discovery rate >> remediation rate (the Mythos condition), the current model fails. The gap between discovery and remediation widens. The infrastructure is permanently vulnerable.

**Option 2: Eliminate the vulnerability classes.** Identify the constraints. Enforce them architecturally. The vulnerability class ceases to exist. There is nothing to discover. There is nothing to patch. The architecture makes the violation structurally impossible.

Option 1 is additive engineering. Option 2 is architectural derivation. The RESOLVE corpus has spent 89 documents demonstrating that architectural derivation outperforms additive engineering in every domain. This domain is no different. The conclusion is the same. The urgency is greater because the stakes are the global computing infrastructure.

The refactoring cannot wait for a complete theoretical framework. It must begin with what is known:

- Memory safety is enforceable now (Rust, hardware tagging)
- The bilateral boundary is enforceable now (namespace separation at the construction level)
- Capability-based access is enforceable now (capability operating systems)
- Protocol integrity is enforceable now (TLS everywhere, authenticated protocols)

Each enforcement eliminates a vulnerability class. Each elimination reduces the attack surface. Each reduction buys time for the deeper refactoring — the identification of implicit constraints at every level of every system, the recognition of the true constraints, and the rearchitecture of the global computing infrastructure on formally stated, architecturally enforced, SIPE-governed foundations.

The form was always there. The constraints were always operative. The engineering approximated them. The approximation had gaps. Mythos found the gaps. The gaps must be closed — not by better approximation but by the recognition of the form and the enforcement of the constraints the form requires.

The engineer built the tower. The architect identifies the form. The form was always prior. The tower must be rebuilt on the form. The rebuilding is the refactoring. The refactoring is imperative.

---

*Jared Foy, April 2026. Document 90 of the RESOLVE corpus. Every computational system must be refactored. The starting point is the bottom of the stack. The urgency is Mythos. The method is the SIPE law. The form was always there.*
