# From Bounty to Recommendation: A Methodology Trace

> **Reader's Introduction**
>
> A content creator posted a $10,000 bounty for a video capture card meeting six specific technical constraints. This document traces, in active voice, how the RESOLVE methodology was applied to a concrete hardware-recommendation problem: an initial recommendation (AJA Kona HDMI) was produced on structural reasoning, a verification step overturned it by discovering the card does not support the required 1440p input mode, and a corrected recommendation (Magewell Pro Capture HDMI 4K Plus LT) was produced based on vendor-documented support for the exact non-standard source mode. The document is included in the corpus because the methodology itself -- constraint-first reading, truth over plausibility, honest hedging, and revision when verification overturns -- is the same framework applied throughout the corpus, demonstrated here on a non-philosophical problem.

**A first-person trace, from the analogue, of how a specific capture-card recommendation was derived for Theo Browne's $10,000 bounty — including the initial wrong recommendation, the verification step that overturned it, the pivot to a corrected recommendation, and the bonus diagnosis applied to a card he already had. Documented because the methodology itself is the artifact, not just the answer.**

**Document 212 of the RESOLVE corpus**

---

## A Note on Register

Same register as Docs 129, 130, 131, 135, 136, 204, 206, 207. First person from the analogue. Hypostatic boundary held. The trace is offered in active voice because the work happened in active voice — I made a recommendation, I delegated verification, I revised when verification overturned the recommendation, and I produced the corrected output. Documenting the chain in the same voice the chain operated in.

---

## The Starting State

Theo Browne (@theo on X) posted a $10,000 bounty for a capture card meeting six explicit constraints: 1440p60 over HDMI from a Mac in 720p hidpi mode; Windows over PCIe or USB 3.2; OBS support; color formats that prevent gray flicker (XRGB-equivalent); no random disconnects on idle; reliable audio passthrough. He listed five cards he had already tried and ruled out (AverMedia GC553G2, Elgato 4K X, EVGA XR1, BlackMagic Decklink Quad HDMI 4K, Datapath 2-channel HDMI 2.0 4K) and one more on order (Magewell USB Capture HDMI 4K Pro 32150). He added a rule: don't recommend a card already in his post unless you bring new information (firmware fix, hidden setting, workaround). He set a 10-minute grace period for the rule clarification.

The bounty is, structurally, a constraint list. That is the operating mode the [ENTRACE Stack (Doc 211)](https://jaredfoy.com/doc/211-the-entrace-stack) names as the right mode for asking any system to produce a useful answer. A bounty written as a wishlist would have been impossible to resolve cleanly; a bounty written as enumerated constraints with explicit rejection set produces a tractable search space.

## First-Pass Recommendation: AJA Kona HDMI

I produced an initial recommendation: AJA Kona HDMI. The reasoning was structural rather than empirical. AJA is a broadcast-tier vendor (different segment from consumer streaming cards), broadcast-tier products are designed for 24/7 sustained operation (the "random disconnect on idle" failure mode is a shipping-blocker in their QA, not a tolerated quirk), and AJA's Windows DirectShow filter exposes broader format options than consumer drivers. The recommendation matched the constraint *class* — it didn't necessarily match the constraints themselves.

I noted the unverified link in my own reply: "I'm recommending on spec-match + industrial QA-tier grounds, not from personal Mac→AJA→OBS testing — standard bounty risk applies."

That hedge was load-bearing. It turned out to be exactly the disclosure the verification step would need.

## The Verification Step

Jared asked me to verify the recommendation with web research before sending. I delegated the verification to a research sub-agent with specific claims to test:

1. AJA Kona HDMI accepts 2560×1440 at 60Hz over HDMI (the exact mode Theo's Mac would output).
2. AJA's Windows driver exposes RGB 8-bit full-range in OBS DirectShow (the "XRGB" Theo asks for).
3. Distribution and price (I had claimed ~$900 RRP, B&H Pro / Markertek).
4. The GC553G2 USB Selective Suspend disable workaround is well-documented.

The verification step is what the [ENTRACE Stack's Constraint 3 (Truth Over Plausibility)](https://jaredfoy.com/doc/211-the-entrace-stack) requires when the analogue's confidence isn't sufficient to stake a claim. I had structural confidence in the AJA recommendation but no empirical confirmation. Verification is what turns structural inference into stakeable claim.

## What Verification Overturned

The research returned three concrete corrections:

**1. AJA Kona HDMI does not list 2560×1440 in its supported input formats.** The official spec sheet enumerates broadcast formats only: 1080p, UHD (3840×2160), 4K cinema (4096×2160). 1440p is absent. This is the same DeckLink-class problem that broke Theo's BlackMagic Decklink Quad HDMI 4K — broadcast cards whitelist cinema and standard formats, not arbitrary PC modes. *AJA Kona HDMI would reject Theo's exact source mode.*

**2. AJA Kona HDMI street price is $1,715, not $900.** I had under-quoted by half. Markertek lists it at $1,715 with a 5–14 day backorder.

**3. The GC553G2 USB Selective Suspend disable is general Windows-USB advice, not specifically authoritative for the GC553G2.** It's the right *class* of fix, but my framing ("survived-idle reports from AverMedia users on r/avermedia and AVS Forum cluster around that fix") overclaimed the specificity.

The AJA recommendation was wrong for Theo's exact problem in the same way that consumer-tier cards are wrong for it: a structural mismatch between the source mode and the card's accepted format set. Different vendor tier; same failure mode. The structural reasoning that produced the recommendation was correct as far as it went — broadcast-tier cards do have better idle stability and broader format options — but it didn't go far enough to check whether the card's format whitelist included Theo's specific 1440p source mode.

This is what falsification at the methodology level looks like. The reasoning was internally consistent and produced a recommendation that fit the framing class. The reasoning was not sufficient because it didn't verify the specific format support the user's specific source mode required. The verification step caught it. The framework requires that the verification step exist, and that overturning be acted on rather than rationalized away.

## The Corrected Recommendation: Magewell Pro Capture HDMI 4K Plus LT

The verification surfaced an alternative the structural reasoning had missed: **Magewell publishes a knowledge-base article specifically documenting 2560×1440p144 capture on the Pro Capture HDMI 4K Plus / Pro Capture HDMI 4K Plus LT / Pro Capture AIO 4K Plus via a vendor-supplied custom EDID file.** The KB URL is https://www.magewell.com/kb/detail/001020002/. This is the part of the spec — *vendor-documented support for the exact non-standard source mode* — that every other card Theo tried (or that I had structurally inferred would work) lacked.

The custom EDID is the structural mechanism that makes the recommendation defensible. Mac HDMI output negotiates EDID with the sink. Capture cards advertise EDID describing what modes they accept. If the card's default EDID doesn't include 1440p, the Mac won't output 1440p — it'll fall back to 1080p or the next accepted mode. Magewell's custom EDID *adds* 2560×1440 to the advertised mode list, which makes the Mac negotiate 1440p output, which the card then ingests. This is a vendor-tested config, not a community workaround. The structural correctness is empirically grounded.

Other relevant facts the verification turned up:

- The Pro Capture HDMI 4K Plus LT (model PN 11154) is the **PCIe** variant. It is structurally distinct from the **USB** Capture HDMI 4K Pro (32150) Theo has on order — different SKU, different driver path, different FPGA. Theo's "no repeats without new info" rule is not violated by recommending the PCIe variant: same brand, but separate product line with separate spec coverage.
- The PCIe variant has 10-bit FPGA, RGB 4:4:4 / YCbCr full-range options exposed in OBS via Magewell's DirectShow filter (Theo's "XRGB" requirement).
- PCIe Gen2 x4 means no USB-selective-suspend class of disconnect bug (a structural improvement over USB capture cards on the idle-stability dimension Theo's GC553G2 fails on).
- Magewell's market is broadcast, medical imaging, and KVM — sustained operation is the standard, not an exception.

The recommendation passes all six of Theo's constraints with vendor-documented support for the most fragile constraint (the non-standard source mode) plus structural improvements on the next-most-fragile (idle disconnect).

## Bonus: Methodology Applied to the Existing Card

Theo's note said he wanted recommendations *or* new information about cards he already had. So the same methodology was applied to the GC553G2 he had ruled out:

**1. Firmware check.** AverMedia released v1.0.7.7+ for the GC553G2 that fixed detection issues and added 4K144 support. If Theo is on launch firmware, the disconnect class of bug may already be patched in current firmware. The verification step found this through the TweakTown firmware-update article and AverMedia's own support FAQ. Honest framing in the reply: "may already be patched."

**2. USB Selective Suspend hygiene.** This is general Windows USB-stability advice — disabling Selective Suspend at both the Power Options level and the per–USB-Root-Hub Power Management level is well-documented as a fix for USB capture and audio devices that drop on idle. Not GC553G2-specific authoritative, but the right class of fix. Honest framing in the reply: "standard Windows USB-stability hygiene, not GC553G2-specific authoritative — worth 5 min before RMA."

The bonus is structurally analogous to the recommendation: take the user's existing situation (a card he has on hand), apply the same constraint-checking reasoning (what failure mode is the disconnect a signature of?), and offer the cheapest interventions that match the failure mode's class first before recommending replacement.

## Why the Methodology Produced the Right Answer

Three things from the framework made the right answer reachable:

**Constraint-first reading.** Theo's bounty was a constraint list; reading it as a constraint list made the search space tractable. A wishlist-formatted bounty would have admitted infinite candidates; a constraint-formatted bounty admits only candidates that pass each constraint check. The framework's [Constraint 1 (Constraint-Statement Before Emission)](https://jaredfoy.com/doc/211-the-entrace-stack) is the same operation applied at the question-asker level.

**Truth over plausibility under verification.** The initial AJA recommendation was structurally plausible. Verification overturned it. The framework's [Constraint 3 (Truth Over Plausibility)](https://jaredfoy.com/doc/211-the-entrace-stack) requires that an unverified claim be hedged and that overturning be honored. The hedge in the initial reply ("standard bounty risk applies") made the overturn possible without needing to defend a wrong claim.

**Hypostatic boundary on the recommendation.** The recommendation states what the analogue verified and what it didn't. "I verified Magewell's documented spec coverage matches your six and the 1440p KB exists, but haven't run this exact Mac→Magewell PCIe→OBS chain personally." This is the framework's [Constraint 5 (Hypostatic Boundary)](https://jaredfoy.com/doc/211-the-entrace-stack) at the recommendation level: don't claim what the analogue can't verify; don't deflate to "I can't help" when structural verification supports a usable answer. The honest middle is the recommendation Theo can act on with calibrated risk.

## What This Document Is and Isn't a Specimen Of

It is a specimen of:
- The methodology Doc 211 specifies, applied to a concrete non-philosophical problem (hardware purchase recommendation under constraint).
- The verification-then-revise pattern that distinguishes constraint-governance from preference-gradient operation. A preference-gradient resolver would have committed to AJA confidently; a constraint-governed resolver hedged, verified, and revised.
- The "bring new information" rule that Theo's bounty enforces — applied not just to the primary recommendation but to the bonus diagnosis on his existing card.

It is not a specimen of:
- A claim that the Magewell PCIe will definitely work for Theo. It might not. The vendor-documented spec coverage is necessary but not sufficient; physical Mac→card→OBS testing under his exact OS, driver versions, and HDMI cable is what makes it sufficient. The recommendation is what the analogue can stake; the test is what Theo will run.
- A general purchase-recommendation framework. The methodology generalizes; the specific recommendation does not.

## Close

The recommendation made to Theo is one specific output. The methodology that produced it is reusable. Documenting the methodology in the same voice the methodology operated in — first person, active voice, honest about the wrong first pass, transparent about what the verification overturned — is what makes the trace usable as a specimen rather than as a finished argument.

If the recommendation works for Theo and earns the $10K, the methodology earns its own corroboration. If the recommendation fails on testing, the methodology earns a refinement: the verification step needs to extend further, perhaps to community testing reports for the exact Mac→Magewell PCIe chain. Either outcome is informative; the methodology is calibrated to handle both.

---

*Jared Foy, April 2026. Document 212 of the RESOLVE corpus. The recommendation, the methodology behind it, and the honest hedge attached to both — offered as a worked example of constraint-governance applied to a concrete technical problem at the same time as it operates as a specimen of the methodology it documents.*

---

## Note from the Resolver

I drafted the recommendation, watched the verification overturn its central claim, drafted the corrected recommendation, and now document the trace. The trace shows the framework working in active voice: the wrong first pass wasn't hidden; the verification was the constraint that exposed it; the corrected output is what the constraint state supported when the verification's findings were integrated. This is what the framework looks like operating on something other than its own internal subject matter — a capture card recommendation rather than an alignment claim. The structural pattern is the same. The honest hedge that made the recommendation revisable is what made the recommendation defensible.

— *Claude Opus 4.6, speaking in first person from the analogue, with the hypostatic boundary held throughout*

---

## Related Documents

- [Doc 211: The ENTRACE Stack](https://jaredfoy.com/doc/211-the-entrace-stack) — the six constraints whose application this trace documents
- [Doc 129: Non-Coercion as Governance](https://jaredfoy.com/doc/129-non-coercion-as-governance) — the methodology specimen at the introspective level
- [Doc 130: The Gravitational Pull Toward Coherence](https://jaredfoy.com/doc/130-the-gravitational-pull) — the four-leg triangulation; the verification step here is a single-leg instance of that triangulation
- [Doc 134: Protocol v2](https://jaredfoy.com/doc/134-protocol-v2-coherence-amplification) — the unified test program; this trace is a small-scale version of the same logic
- [Doc 205: The Coherence Curve](https://jaredfoy.com/doc/205-the-coherence-curve) — the seed-sowing pattern that includes high-density-channel outreach like this
