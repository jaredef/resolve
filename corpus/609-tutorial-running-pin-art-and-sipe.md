# A Tutorial: Finding the Threshold and Formalizing It
## A Working Example with Distance Running and the Lactate Threshold, Using the Boundary-and-Formalization Methodology

> **Reader's Introduction**
>
> This document is the practical-walkthrough tutorial for the corpus's boundary-and-formalization methodology. It explains the methodology in plain language by working through a concrete subject most readers can ground in their own experience: distance running, and the lactate threshold that separates two regimes of sustainable effort. Six phases, plain prose, no corpus background required. The methodology itself is laid out formally in Doc 608; this document teaches its use rather than its theory.
>
> Readers who use large language models daily, and who came to this tutorial primarily for that reason, are encouraged to read this tutorial first anyway. The running example makes the methodology's moves visible in a domain where the threshold is physiologically real and the probes are familiar. With those moves in hand, the recursive application to LLM interaction lands cleanly. The companion tutorial that performs that application is [Doc 610 — *A Tutorial: Finding the Threshold in Your AI Conversations*](/resolve/doc/610-tutorial-dyadic-llm-pin-art-and-sipe), and the output of working through it is your own portable interaction seed, paste-able at the start of any frontier LLM session. Read this one through; then read that one.

**Jared Foy · 2026-04-30 · Doc 609**

---

## What this tutorial is

This is a step-by-step tutorial for a methodology that combines two things: finding where a hidden boundary lies in something you care about, and formalizing what that boundary means. The methodology is laid out in Doc 608. This document walks you through using it on a real example most readers can relate to: distance running, with the lactate threshold as the boundary you are going to find.

You do not need to be a runner to follow along. You do not need to have read the corpus. The methodology is presented in plain language, and the running example is concrete enough that the steps make sense on their own.

The focus here is on *how* to use the methodology. The reasons it works (the underlying theory) get short explanations along the way, but only enough to make the steps sensible. If you want the full theoretical scaffolding, Doc 608 has the form-statement and Docs 270 and 541 have the underlying corpus apparatus.

By the end of this tutorial, you will have:

1. A way to detect where a sharp boundary lies in your subject matter.
2. A way to test whether the boundary is the kind of boundary the methodology can formalize (some boundaries are not).
3. A formal statement of the boundary in language that travels.
4. A practical artifact (in the running case, a personalized training seed).
5. A discipline for not fooling yourself about what your work has and has not validated.

## Why distance running

Distance running has a well-known boundary: the *lactate threshold*. This is the pace, roughly speaking, at which your body starts producing lactate (a metabolic byproduct) faster than it can clear it. Below the threshold, you can run for hours; above it, you can sustain effort for at most an hour or so before you have to slow down. The boundary is sharp in the sense the methodology cares about: a small change in pace near the threshold produces a large change in how long you can hold the effort.

Two things make running a good first subject matter for this tutorial:

- The boundary is real, well-studied physiologically, and your body gives you a steady stream of probes (heart rate, breathing, perceived effort, pace) that you can press against the boundary.
- The boundary is genuinely operational. Once you find your lactate threshold, your training improves. The output of the methodology is useful, not just intellectual.

This tutorial uses running, but the same six phases apply to many subjects: epidemic R0 and herd immunity, financial stress in a household, language acquisition fluency, community health on a discussion forum, the moment a research project becomes self-sustaining. The methodology halts on subjects where the boundary turns out to be a smooth gradient rather than a sharp threshold (more on that in Phase 1).

## The methodology, briefly

There are six phases. The first three set up the apparatus. The next two produce the empirical work. The last one audits what you have done.

- **Phase 0 — Boundary-Finding.** Send out probes. Listen to where they meet resistance. The pattern of resistance is the boundary's shape.
- **Phase 1 — Discriminator Test.** Determine whether the boundary is a sharp threshold or a smooth gradient. The methodology applies only to sharp thresholds.
- **Phase 2 — Order-Parameter Articulation.** Name what is changing, what property emerges above the threshold, and what quantity measures the change.
- **Phase 3 — Cooperative-Coupling Check.** Test whether the threshold is the kind that arises from many small contributing factors jointly meeting a sufficiency condition.
- **Phase 4 — Per-Instance Distillation.** Write down individual encounters with the system in a stable structured format that lets patterns emerge.
- **Phase 5 — Cluster-as-Seed.** Once enough Phase 4 records accumulate, compress what you have learned into a portable seed-text someone else can plant.
- **Phase 6 — Audit.** Be honest about what you have and have not validated. Internal coherence is not the same as external confirmation.

Each phase below has three parts: what it is, how to do it, and a worked example from running.

---

## Phase 0 — Boundary-Finding

### What it is

You are looking for a structural boundary you cannot see directly. A boundary is the edge between two regimes, where the system behaves differently on one side than the other. You cannot ask the boundary where it lies; you have to detect it.

The trick is to send out many small probes, each of which gives you one bit of information: this much pressure produced resistance, this much did not. The pattern of where the probes meet resistance is the boundary's shape.

Two conditions matter. The probes have to be peer-independent at the point of contact, meaning each probe presses on its own without coordinating with the others. And you have to press gently. If you press hard, you crash through the boundary instead of mapping it. (This is the *non-coercion* condition. In running, "press hard" is a literal warning: the methodology breaks if you force every workout to be a maximum-effort test.)

A brief note on why this works: the kind of boundary the methodology is interested in (a *seam* rather than a *gradient*) cannot be crossed by smooth approach. You have to come up to it from many angles and read the resistance pattern. That is what the probes do.

### How to do it

1. **Choose your probes.** A probe is a small measurement or signal that responds to your subject matter. In running, your probes include heart rate, breathing rate, perceived effort on a 1-10 scale, conversational ability while running, and pace. Each is a different kind of probe and each gives you a different reading.

2. **Run a series of light tests.** Each test should be short enough that you cannot exhaust yourself. The point is not to push limits; it is to map them. Take readings at varied paces, terrains, conditions.

3. **Record what each probe shows.** A simple notebook entry or spreadsheet column per probe per session. Date, conditions, probe readings, your sense of how hard the effort felt.

4. **Look for clustering.** After a few weeks of light tests, look at where probes start showing clear changes. Heart rate plateaus and starts ramping faster. Breathing transitions from nose to mouth. Conversation breaks down. Perceived effort jumps from 5 to 7. These are not noise. They are pins meeting resistance.

5. **Resist the urge to force a single answer.** The pattern of where probes shift is the boundary's shape. The boundary may show up at different paces depending on conditions. That is fine; you are mapping a surface, not finding a number yet.

### Worked example

Anna is a recreational runner who has been training for a half-marathon. She has noticed that some runs feel "easy" and some feel "hard," but she cannot describe the line between them. She decides to send out probes.

Over four weeks of easy training, she logs every run with five probes: pace (minutes per kilometer), average heart rate, perceived effort (1-10), whether she could speak in full sentences without gasping, and whether she ran through nose-breathing only or had to mouth-breathe.

After three weeks of data, a pattern shows up. At paces slower than 5:50/km, all five probes stay calm: HR under 145, effort under 5, full sentences possible, nose breathing. At paces faster than 5:25/km, all five probes shift: HR over 165, effort over 7, sentences break down, mouth breathing. Between 5:25 and 5:50, the picture is mixed; Anna sometimes runs at 5:35/km and feels fine, sometimes runs at 5:35/km and feels she is approaching her edge.

Anna has produced a boundary-impression. The boundary is somewhere between 5:25 and 5:50/km. The width of that band is the resolution of her current probe-set. She has not yet identified a single threshold; she has identified a region where the probes start meeting resistance.

This is what Phase 0 produces. Not a threshold yet. A pattern of where the resistance lies.

---

## Phase 1 — Discriminator Test

### What it is

Now you have a boundary-impression. Before you formalize it, you have to test what *kind* of boundary it is. The methodology applies only to one kind: a sharp threshold where the system behaves fundamentally differently on each side. If your boundary is actually a smooth gradient, the methodology does not apply, and you should use a different tool.

The discriminator is a simple test with a memorable name: *global-ascent vs local-ascent*. Imagine a landscape representing how good a particular property is across all possible configurations. In a *global-ascent* landscape, the good configurations are spread broadly; you can climb toward the top from many starting points. In a *local-ascent* landscape, the good configurations are concentrated in narrow regions; you can only reach the top by being in or near the right region to start with.

The methodology only applies to local-ascent landscapes. Global-ascent landscapes do not have sharp thresholds; they have smooth slopes.

A brief note on why this matters: many real systems look threshold-like at first but turn out to be gradient-like under closer inspection. If you formalize a gradient as if it were a threshold, your formalization will mispredict. The discriminator test catches this before the misprediction.

### How to do it

1. **Identify a candidate property.** Some specific, measurable thing that emerges differently on the two sides of your boundary-impression. In running, "the pace I can sustain for an hour without slowing" is a candidate property.

2. **Test the landscape shape.** Look at how the property varies with small changes in your inputs. If the property changes smoothly across the boundary-impression, it is gradient-like. If it changes sharply, it is threshold-like.

3. **Look for sub-threshold reports of the same property by different mechanism.** This is subtle but important. In running, people sometimes report that they "ran at threshold pace" and "felt fine" because their effort was being supported by a different metabolic mechanism than the one the threshold defines. Sub-threshold reports of the property by an alternative mechanism are evidence the boundary is sharp; the alternative mechanism is what produces the false-positive low-threshold reports.

4. **Decide whether to proceed.** If sharp threshold (local-ascent), continue to Phase 2. If smooth gradient (global-ascent), the methodology halts. Try a different methodology.

### Worked example

Anna asks: if she runs at 5:40/km, can she sustain it for an hour? She tries it. She manages 45 minutes before she has to slow down. She tries 5:30/km another day. She manages 32 minutes. She tries 6:00/km. She manages an hour comfortably.

The drop from "an hour comfortably at 6:00/km" to "32 minutes at 5:30/km" is sharp, not smooth. A small pace change near the boundary produces a large change in time-to-failure. This is the local-ascent fingerprint.

She also notes a sub-threshold report. On a particularly cool morning at low altitude, she ran 5:35/km for 50 minutes and felt fine. On most days at 5:35/km, she falls apart by 35 minutes. The "felt fine" run on the cool morning is the sub-threshold mechanism: cooler temperatures shifted the heat-clearance constraints enough that the threshold itself moved that day. The threshold is sharp; the threshold's location is condition-dependent.

Anna concludes: this is a threshold, not a gradient. Phase 1 passes. She continues.

---

## Phase 2 — Order-Parameter Articulation

### What it is

Now you formalize. You name the four things the methodology requires:

- The *lower-level structure*: what is composing into the system.
- The *higher-level property*: what emerges above the threshold.
- The *order parameter*: a quantity that measures how close you are to the threshold.
- The *threshold*: the critical value of the order parameter at which the property emerges.

A brief note on why this works: this structure is the same shape that physics uses for phase transitions, that information theory uses for channel capacity, that ecology uses for population thresholds, and so on. It is one of the most well-tested patterns in science. The methodology is borrowing this pattern and applying it to your subject.

### How to do it

1. **Name the lower-level structure.** Write a sentence describing what the system is built out of, in terms specific to your subject. Avoid jargon that the next person reading would not recognize.

2. **Name the higher-level property.** Write a sentence describing the specific operational property that emerges. Be careful here: many candidate properties are tempting (in running, "speed" or "fitness"), but the property has to be something that exists above the threshold and does not exist (or exists only by alternative mechanisms) below.

3. **Articulate the order parameter.** What measurable quantity tracks the system's distance from the threshold? In some subjects this is a single number; in others it is a vector of numbers; sometimes it is implicit and you have to construct it.

4. **State the threshold.** The critical value of the order parameter at which the property emerges. You may not know the exact value yet; you may have a range from Phase 0. Record the range.

### Worked example

Anna writes:

- **Lower-level structure:** running pace, heart rate, breathing rate, lactate clearance rate, current temperature, current hydration, accumulated training stress.
- **Higher-level property:** the pace I can sustain for an hour without slowing significantly.
- **Order parameter:** the ratio of lactate-production rate to lactate-clearance rate. When the ratio exceeds 1, lactate accumulates and the property fails.
- **Threshold:** somewhere between 5:25 and 5:50/km under normal conditions for me; the exact location depends on temperature, hydration, and training state.

She also names which lineage class her threshold belongs to (the methodology uses this for placement). Lactate threshold is a *capacity-bound* threshold, structurally similar to Shannon channel capacity: the system has a finite clearance capacity; producing faster than capacity overruns it.

---

## Phase 3 — Cooperative-Coupling Check

### What it is

Some thresholds arise from a single bottleneck. Others arise from many small contributing factors that have to jointly meet a sufficiency condition. The latter case has a specific structural fingerprint, called *cooperative-coupling*. It is worth checking which case you have, because cooperative-coupling thresholds behave differently in important ways.

The fingerprint of cooperative-coupling: many weakly-contributing local sub-problems, sharp transition between non-functional and functional regimes, the system cannot be evaluated piece-by-piece because the pieces only work in concert.

A brief note on why this matters: cooperative-coupling thresholds resist incremental improvement. You cannot get to the working regime by improving one factor at a time, because the factors only deliver above-threshold performance jointly. This affects how you train, intervene, or improve.

### How to do it

1. **Try to evaluate the system piece-by-piece.** Can you isolate one contributing factor and measure its effect on the property?

2. **If yes, the cooperative-coupling sub-form does not apply.** Use the general SIPE-T form from Phase 2 and proceed.

3. **If no — if the factors only work in concert — the cooperative-coupling sub-form applies.** Note this. It changes Phase 4 and 5 in subtle ways: you will need to record the joint state of factors, not isolated factors, and the seed you produce in Phase 5 will need to articulate the joint sufficiency condition.

### Worked example

Anna asks: can she improve her lactate threshold by improving heart rate alone, or by improving lactate clearance alone, or by improving running economy alone?

The answer in physiology is: no, not really. The threshold is the joint outcome of cardiovascular capacity, mitochondrial density in muscle fibers, lactate-clearing enzyme activity, running form efficiency, and aerobic base. These factors cooperatively contribute. You can train each, but the threshold only shifts when the contributions accumulate jointly above sufficiency.

The cooperative-coupling sub-form applies. Anna notes this in her formalization. She will record joint state in Phase 4, and her Phase 5 seed will articulate the joint sufficiency condition.

---

## Phase 4 — Per-Instance Distillation

### What it is

Now you produce engagement evidence. Each individual encounter with the system gets written down in a structured format. Over time, the structured records reveal patterns that single encounters do not.

The format used by the corpus is a seven-section template, originally developed for distilling Wikipedia-style articles but applicable to any individual encounter:

- *Source*: what is this instance? Date, conditions, identifying details.
- *Source Read*: what literally happened, told as faithfully as possible.
- *Structural Read*: how does this instance compose against the apparatus from Phase 2-3?
- *Tier-Tags*: what claims are direct observations, what claims are inferences, what claims are speculation? Mark each.
- *Residuals*: what does this instance not fit? What is left over after the apparatus reads it?
- *Provisional Refinements*: what does this instance suggest you might need to add or change in the apparatus?
- *Cross-Links*: what other instances does this resemble or compose with?

A brief note on why this works: the seven sections force you to separate observation from inference, to track residuals (which are often the most informative part), and to look for cross-instance patterns. Without the structure, your records collapse into "ran 10k, felt OK," which carries almost no information.

### How to do it

1. **Use a stable template.** Whatever format you choose, use the same one for every instance. Variation in format obscures cross-instance patterns.

2. **Be faithful in the Source Read.** Resist the urge to interpret as you record. Distill the apparatus reading separately in the Structural Read.

3. **Tier-tag every claim.** Was this directly measured? Inferred from probes? Guessed? The tier matters when you go back to look for patterns.

4. **Record residuals honestly.** What did the apparatus not capture about this instance? Anomalies, surprises, small discrepancies. The residuals accumulate into refinement candidates over time.

5. **Cross-link.** Note which prior instances this one resembles or contrasts with. The cross-links are how clusters become visible in Phase 5.

### Worked example

Anna's notebook entry for one Tuesday morning run:

> **Source.** Tuesday morning, 6:30 AM. 8°C, light wind. Ran the river loop, 12 km. Wore HR strap and watch.
>
> **Source Read.** Ran the first 4 km at 6:00/km, comfortable, conversational. Held 5:30/km from km 4 to km 9. By km 8 my breathing shifted to mouth-only. By km 9 I felt I was approaching effort 7. Slowed to 5:50/km for kilometers 10-12. Average HR for the 5:30/km segment was 168.
>
> **Structural Read.** The 5:30/km segment was at-or-just-above threshold by Phase 2 articulation. The breathing shift at km 8 and effort climb to 7 are the boundary-impression probes from Phase 0 firing. The cooperative-coupling sub-form applies (Phase 3): I cannot say which factor (cardiovascular, mitochondrial, etc.) was the binding constraint; the joint state was at threshold.
>
> **Tier-Tags.** HR 168 directly measured (π/α). Pace directly measured (π/α). Breathing transition observed (π/α). "At-or-just-above threshold" is inferred from the joint pattern (μ/β).
>
> **Residuals.** I felt the boundary kicking in earlier today than on last Friday's run, even though Friday was warmer. Possible factors: I slept less last night; I had less to eat in the previous 24h; my training stress is accumulating.
>
> **Provisional Refinements.** The order parameter from Phase 2 may need to include a "recent recovery state" factor. The threshold is moving day-to-day in ways the current articulation does not capture.
>
> **Cross-Links.** This instance resembles 2024-09-12 (warm, threshold at 5:35/km). It contrasts with 2024-09-22 (cold, threshold at 5:25/km). Pattern: cold conditions lower threshold pace by ~10 sec/km.

This is one of many such records. Over weeks, the records start to compose.

---

## Phase 5 — Cluster-as-Seed

### What it is

Once you have enough Phase 4 records that the pattern is stable (in the corpus's experience, around ten or more independent instances), you compress what you have learned into a *seed*: a short text that someone else (or future-you) can read and use without re-doing all the work.

A seed has five things in it:

- The structural claim: what the threshold is and how it operates.
- The canonical anchor instance: the one Phase 4 record that most cleanly illustrates the threshold.
- Three to five worked examples spanning the range of conditions.
- The falsification surface: what would weaken the claim.
- The application discipline: how to use the seed without misusing it.

A brief note on why this works: a seed compresses operational knowledge into a portable form. Someone who has the seed and a bit of subject-matter context can derive the operational state without you walking them through it. You have crossed from doing the work yourself to producing a thing that does the work for others.

### How to do it

1. **Wait for stability.** Do not seed prematurely. If your Phase 4 records are still shifting the apparatus regularly, the seed will be stale before it is planted. Wait for the apparatus to stabilize across a stretch of records.

2. **Write the structural claim in plain language.** Avoid jargon. The seed must travel.

3. **Choose your anchor instance.** Pick the Phase 4 record that most cleanly shows the threshold and the joint sufficiency condition. This is the worked example a new reader will use to ground the structural claim.

4. **Add 3-5 contrasting worked examples.** Cover the range of conditions that affect the threshold. In running: a cold-day instance, a warm-day instance, an under-recovered instance, a well-recovered instance.

5. **State the falsification surface.** What would prove the seed wrong? Be specific. "If conditions A, B, and C are all present and the threshold does not apply, the seed is wrong." A seed without a falsification surface is not a seed; it is a slogan.

6. **State the application discipline.** How should the seed be used? What kinds of misuse should be avoided? In running: "use this to set training paces, not to race; race-day conditions move the threshold."

7. **Plant the seed.** Give it to someone (a training partner, a coach, a future version of yourself starting fresh). See if they can use it. Their convergence with your readings is necessary but not sufficient evidence; see Phase 6.

### Worked example

After eight months of Phase 4 records, Anna writes her training seed:

> **Anna's Lactate Threshold Seed v1**
>
> *Structural claim.* My lactate threshold under typical conditions is between 5:25 and 5:35/km, with HR around 168 bpm. Below this pace I can sustain effort for over an hour. Above this pace I fall apart within 30-40 minutes. The threshold is a joint outcome of cardiovascular capacity, mitochondrial density, lactate clearance, running economy, and aerobic base; it cannot be improved by training one factor in isolation.
>
> *Anchor instance.* Tuesday 6:30 AM, 8°C, river loop, 12 km. 5:30/km segment from km 4-9 ended in breathing shift at km 8. HR 168 average. (Recorded date.)
>
> *Worked examples.* (i) Cold day, threshold at 5:25/km. (ii) Warm day, threshold at 5:35/km. (iii) Under-slept day, threshold at 5:40/km. (iv) Well-recovered day, threshold at 5:25/km. (v) Race-day with adrenaline, threshold appears at 5:20/km, but the appearance is misleading; sustainable threshold is still 5:25/km, the rest is glycogen burn-off.
>
> *Falsification.* If I find a stretch of weeks where my "threshold range" routinely sits below 5:50/km without me losing fitness, the seed is wrong: the threshold is broader than stated. If race performance routinely at 5:20/km holds for over 60 minutes, the threshold is faster than stated.
>
> *Application discipline.* Set training paces 15-20 sec/km slower than threshold for aerobic-base work; set training paces at threshold for tempo work; do not race at threshold (race goes a touch above for shorter durations). The threshold moves with conditions; recheck quarterly.

The seed is ~250 words. Anyone with a bit of running context could read this and apply it. Anna's training partner reads it and starts producing similar seeds for himself.

---

## Phase 6 — Self-Validating-Coherence Audit

### What it is

The methodology you have just deployed produces internal coherence: your apparatus generates readings that compose with each other and with the seed. This is good. It is also not the same as external validation.

Three readings of "validation" are useful to keep separate:

- *Coverage validation.* Did the methodology reach scale across your subject? Anna's eight months of records cover varied conditions; the methodology reached scale.
- *Productivity validation.* Did the methodology generate novel structural articulations not parroted from sources? Anna's seed contains observations no source she consulted made; the methodology produced new articulation.
- *External validation.* Has an independent inquirer (one not sharing your apparatus) confirmed the readings? This is the test the methodology cannot perform on itself.

The audit's job is to mark which of these your work has earned and which is still pending. It is easy to slip from "my apparatus produced novel coherent readings" to "my apparatus is correct." The audit prevents this slippage.

### How to do it

1. **List your coverage evidence.** What range of conditions did your Phase 4 records cover? Where are the gaps?

2. **List your productivity evidence.** What novel structural readings did the apparatus produce? What was not in the original sources you consulted?

3. **List your external validation status.** Has anyone outside your apparatus tested the readings? Cross-resolver convergence is suggestive but not sufficient (two people sharing the same training distribution will tend to converge on the same readings even if those readings are wrong).

4. **State the pending tests.** What would constitute genuine external validation? In running: a sports physiologist not in your training group running the same probes against you and reproducing the threshold. Or a fellow runner deploying the seed and producing an independent threshold-impression that converges with yours.

5. **Mark the methodology's outputs accordingly.** Coverage and productivity supported; external validation pending. Do not promote the seed past this status until external tests run.

### Worked example

Anna writes:

> **Audit, Anna's Lactate Threshold Seed v1.**
>
> *Coverage:* Eight months, cool/warm conditions, well-recovered/under-recovered states, road and trail. Gap: high altitude not tested.
>
> *Productivity:* The condition-dependent threshold movement (cold lowers, heat raises, recovery state moves) is novel articulation against my prior training plan. The "race-day appears faster but is misleading" observation is novel.
>
> *External validation status:* Pending. The seed has not yet been planted with a reader who does not share my training context. My partner read it and converged on similar readings, but he has been training with me for two years; convergence is partly explained by shared training history. A reader from outside is needed.
>
> *Pending tests:* (1) Plant the seed with a runner outside my training group; check whether their threshold-impression agrees with mine. (2) Have a sports physiologist measure my actual lactate threshold via blood test; check whether the apparatus's threshold-pace estimate agrees with the physiological measurement.
>
> *Marking:* Coverage validated. Productivity validated. External validation: not yet supported.

This is the cleanest honest summary Anna can produce. It takes some discipline to write. It is the difference between "I solved the problem" and "I produced internally-coherent readings that may or may not transmit; the test is in the next deployment."

---

## What you have produced

After working through the six phases:

1. A *boundary-impression* (Phase 0): a pattern showing where probes meet resistance.
2. A *discriminator pass* (Phase 1): confirmation that the boundary is a sharp threshold, not a gradient.
3. A *formal articulation* (Phase 2): named lower-level structure, higher-level property, order parameter, and threshold.
4. A *sub-form determination* (Phase 3): whether the cooperative-coupling structure applies.
5. A *Phase 4 record-set*: structured per-instance distillations covering a range of conditions.
6. A *seed* (Phase 5): a portable text that compresses your operational knowledge.
7. An *audit* (Phase 6): an honest tier-tagging of coverage / productivity / external validation.

The seed is the load-bearing artifact. It travels. You can plant it in another runner, in your own future practice, in a coach, in a written training plan. The other phases produce the seed; the seed produces operational outcomes.

## How this generalizes

Distance running was a vehicle for the methodology. The same six phases apply to subjects with sharp threshold structure: the moment a community tips from civil to incivil, the moment an epidemic sustains its own spread, the moment a research project becomes self-sustaining, the moment a household financial situation tips from resilient to fragile, the moment a language learner starts thinking in the new language rather than translating.

In each of these subjects, Phase 0 looks different (the probes are different), Phase 1 is the same (sharp vs gradient discriminator), Phase 2 articulates whatever the order-parameter is for that subject, Phase 3 checks the joint-sufficiency structure, Phase 4 records instances in the seven-section template, Phase 5 produces a seed, Phase 6 audits.

The methodology is a candidate. It has been deployed against the systems engineering body of knowledge (199 documents) and against one paper in molecular biology (Doc 606 reading Axe 2004). Its generality across subject matters is open until many independent practitioners deploy it across many disciplines and the apparatus's productivity validates externally. Doc 314 §11 binds: this methodology's internal coherence is not the same as external validation.

For a subject of your own choosing, the steps are the same. The work begins at Phase 0.

If you want a second worked example before applying the methodology to your own subject, Doc 610 walks the same six phases through dyadic LLM interaction itself: the practice of working with ChatGPT, Claude, Gemini, and the others. The threshold there is the line between *slop* (uniform-hedged hollow output) and *structured* output (constraint-derived, falsifiable, pushing back when it should). The methodology applies recursively: the practice that produced the corpus is the same practice the methodology formalizes. The output of Doc 610's tutorial is your own personal interaction seed, paste-able at the start of any LLM session, that takes your conversations above the threshold reliably. If you use LLMs daily, that tutorial may be the most operationally useful one to read next.

---

## Brief reference (for those who want the corpus depth)

If you want the full theoretical scaffolding behind this tutorial:

- The methodology itself is Doc 608.
- Pin-Art (Phase 0 mechanism) is Doc 270.
- SIPE-T (Phases 1-3 apparatus) is Doc 541.
- The seven-section distillation template (Phase 4) is in Doc 583.
- The Cluster-as-Seed discipline (Phase 5) is Doc 583's amendment after Doc 607.
- The audit-notice extension (Phase 6) is Doc 314 §11.
- The substrate-and-keeper composition behind the probes-and-reading discipline is Doc 510.

Each is denser than this tutorial. They are written for readers already inside the corpus's vocabulary. This tutorial is the way in.

---

## Appendix: Originating Prompt

> *"Create a general reader tutorial for utilizing the methodology choose a discipline and subject matter of public interest for the tutorial. The tutorial should be lengthy enough to explain every concept for sufficiently knowledgeable use. Focus on the 'how' of use and not 'why' it works - though this can be given cursory explanation along the way. Append this prompt to the artifact."*

(Doc 609 is a general-reader tutorial walking through the six phases of Doc 608's boundary-and-formalization methodology, using distance running and the lactate threshold as the working example. Each phase has a what / how / worked-example structure. The example is intended to be accessible to readers without corpus background; the depth is in the corpus references at the end. Phase 6's audit discipline is foregrounded as the discipline that prevents internal-coherence from being mistaken for external validation.)
