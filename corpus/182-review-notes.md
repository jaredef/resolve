<!-- chronological_ordinal: 12 -->
# Unified Paper: Review Notes and Hardening Plan

> **Reader's Introduction**
>
> This document is an internal review of the PRESTO unified paper, identifying risks that could lead to desk rejection at a computer science venue and proposing concrete fixes. The major issues include: a metaphysical preface that reviewers may treat as out-of-scope, overclaims about "dissolving OAuth," a tension between claiming full REST compliance while supporting persistent WebSocket channels, insufficient reproducibility detail for the six-language verification, and undefined philosophical terms like "fundamental." The document provides a checklist of edits, a proposed structural reorganization (main paper plus five appendices), and a threat model table for the security claims.

*Scholarly review feedback and actionable revisions for peer-review readiness.*

---

## Major Findings

### 1. Metaphysical framing — desk rejection risk

**Issue:** The preface contains divine-metaphysical claims that CS venue reviewers will treat as non-falsifiable and out-of-scope. Risk of desk rejection before the architecture is evaluated.

**Current state:** Preface is labeled optional ("readers seeking the technical thesis may begin at Section 1") but is still in the main body.

**Options:**
- A. Move entire preface to a companion essay (separate document). Main paper starts at Section 0 or Section 1.
- B. Move preface to an appendix after the seeds. Retitle as "Appendix: Philosophical Prolegomenon."
- C. Keep as-is with the skip note (current approach).

**Recommendation:** Option B. The philosophy is load-bearing for the author's method but not for the reviewer's evaluation of the architecture. Moving it to an appendix preserves it without competing with the technical thesis.

**Action items:**
- [ ] Move On First Principles to Appendix C (after the seeds)
- [ ] Retitle: "Appendix C: Philosophical Prolegomenon"
- [ ] Ensure Section 0 (Seed of the Seed) still works without the preface above it — it should, since Section 0 is self-contained

---

### 2. "Dissolves OAuth" — still too strong in places

**Issue:** The section title was softened to "Reduction of OAuth Ceremony" but body text and other sections may still use absolute language.

**Action items:**
- [ ] Grep for "dissolves" throughout — replace with "substantially reduces" or "collapses ceremony in same-trust-domain contexts"
- [ ] Add explicit qualifier: "In federated multi-organization contexts, OAuth-style delegation flows remain necessary; PRESTO reduces the ceremony within and between trust domains that share signing keys or asymmetric verification"
- [ ] Check Section 21 (Conclusion) for any surviving absolute claims

---

### 3. "Completely RESTful" + rich channel/state layers — contradiction risk

**Issue:** Persistent WebSocket channels (Layer 3-4) and client-controlled rendering (Layer 5) partially depart from canonical REST properties. Claiming the server is "consummately RESTful" while supporting these layers invites contradiction.

**Fix:** Explicitly separate the transfer boundary from the inner subsystems.

**Action items:**
- [ ] Add to Section 7 (Constraint-Property Spectrum): "REST constraints continue to govern transfer interactions at the HTTP boundary. Layers 3-6 introduce bounded extensions whose properties are traded locally within scoped regions. The RESTful transfer boundary remains intact; the inner interactive subsystems trade properties deliberately and within declared scope."
- [ ] In the Conclusion, replace "consummately RESTful" with "RESTful at the transfer boundary, with inner subsystems that may trade properties locally within bounded regions"

---

### 4. Cross-language conformance — reproducibility detail

**Issue:** Six-language verification is compelling but reviewers will ask: same test suite? same fixtures? independent teams? commit hashes?

**Action items:**
- [ ] Add a reproducibility appendix (or subsection in Evaluation):
  - Repository URLs for each implementation
  - Exact test fixture inputs and expected outputs
  - Pass/fail log format
  - Whether implementations were produced independently (they were — by LLM sessions and one human developer, with no code sharing)
  - Commit hashes or version tags for the verified state
- [ ] Note: the "independence" claim is that each resolver received only the prose seed, not code from other implementations

---

### 5. "Constraints are more fundamental than implementation" — needs operationalization

**Issue:** This is a thesis-level philosophical claim. Reviewers will want it operationalized.

**Fix:** Define "fundamental" formally.

**Action items:**
- [ ] Add to Section 2.1 (Formal Model) or a new subsection: "A property P is *implementation-invariant* iff for any two resolvers R1, R2 that satisfy the conformance properties, the induced property P holds in both R1(S) and R2(S) for all conformant source representations S. Constraints are more fundamental than implementations in the precise sense that the constraints determine the implementation-invariant properties, while the implementations determine only the contingent execution characteristics (performance, memory, syntax)."
- [ ] This gives reviewers a falsifiable definition to engage with

---

## Medium-Priority Risks

### 6. Terminology overload

**Action items:**
- [ ] Add a glossary after the Abstract/Contributions:

| Term | Definition |
|------|-----------|
| PRESTO | Construction-level architectural style |
| SERVER | Orchestration-level architectural style |
| htxlang | Model syntax — one conformant realization of PRESTO within HTML |
| Bilateral boundary | Namespace partition separating server and client interpreters |
| Ambivalent execution / Dual-interpreter noninterference | The induced property of PRESTO |
| Recursive ambivalence | The induced property of SERVER |
| Source representation | Bilateral input document |
| Resolved representation | Unilateral output document |
| Resolver | Engine that consumes N_s and emits resolved representation |
| Seed | Self-contained prose specification sufficient for deriving a conformant implementation |

---

### 7. Universality analogies — speculative scope

**Action items:**
- [ ] In Section 20 (Natural Analogues), add opening qualifier: "The following are hypothesis-generating analogues, not demonstrated equivalences. Each maps the bilateral model to a domain with structural similarities. Formal verification in each domain is future work."
- [ ] Change subsection framing from declarative ("DNA carries overlapping reading frames") to hypothetical ("DNA may be understood as carrying overlapping reading frames in a structurally analogous sense")

---

### 8. Security — architecture vs protocol guarantees

**Action items:**
- [ ] Add a threat model table to Section 4.7:

| Threat | Status | Mechanism | Limitation |
|--------|--------|-----------|------------|
| CSRF | Mitigated | Scoped action tokens | Only for token-mediated mutations |
| Bearer forwarding | Mitigated | Fingerprint + temporal + nonce binding | Bounded state for nonces |
| Replay | Mitigated | TTL + optional jti nonce | Nonce set requires bounded state |
| Token leakage (URL) | Mitigated | Header transport preferred | Magic links use URL params |
| Revocation | Open | Short TTL + bounded denylist | Requires bounded server state |
| Privilege lifecycle | Open | Short TTL | Tokens valid until expiry |
| Step-up auth | Open | Shorter TTL + challenge | Not formally specified |
| Logout | Open | Client token discard + optional denylist | Requires bounded state for immediate |

---

## Concrete Framing Edits

- [ ] Replace remaining "dissolves" with "substantially reduces in defined trust models"
- [ ] Replace "architecture is not code" with "architecture is operationalized as constraints whose induced properties are implementation-invariant"
- [ ] Replace "completely RESTful server can transmit any client architecture" with "RESTful transfer boundary can encapsulate arbitrary inner client architectures without surrendering boundary properties"
- [ ] Add explicit sentence about channel semantics (see item 3 above)

---

## Suggested Structural Change for Publication

**Main paper (strict):** Abstract + Contributions + Glossary + Sections 1-12 + concise 13-16 + Conclusion
**Appendix A:** PRESTO Seed
**Appendix B:** SERVER Seed
**Appendix C:** Philosophical Prolegomenon (current Preface + Section 0)
**Appendix D:** Reproducibility (implementation matrix, fixtures, harness, logs)
**Appendix E:** Security Threat Model (formal table + limitations)

---

## Reviewer-Proofing Checklist

- [ ] Formal claims table: Claim → Evidence type → Artifact
- [ ] Reproducibility package URL + frozen version identifiers
- [ ] "Negative cases" where PRESTO is a poor fit (e.g., highly interactive real-time applications where Layer 0-2 is insufficient and the developer lives at Layer 5)
- [ ] Explicit non-goals: full OAuth replacement in all federation topologies, universal revocation without bounded state, replacement of all cookie-based auth in legacy systems
- [ ] Glossary
- [ ] Threat model table
- [ ] Operationalized definition of "fundamental"
- [ ] Qualification of universality analogues as hypothesis-generating
