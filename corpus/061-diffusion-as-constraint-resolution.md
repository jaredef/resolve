# Diffusion as Constraint Resolution

> **Reader's Introduction**
>
> This document asks whether the constraint-property framework developed for text-generating AI also governs image- and video-generating AI. Diffusion models work by starting from pure visual noise and progressively removing it until an image emerges, guided by a text prompt. The document maps each element of this process onto the framework's primitives: noise corresponds to the unconstrained state, each denoising step is a constraint that narrows the set of possible images, and the text prompt is the user's constraint set. It derives six falsifiable predictions -- including that image quality should increase monotonically with prompt constraint density and that the optimal guidance scale should decrease as prompts become more specific -- and identifies where the mapping breaks down.

**An inquiry into whether the SIPE framework governs image and video generation**

**Jared Foy, April 2026**

---

## The Inquiry

Language models resolve tokens sequentially — one position at a time, each constrained by the prior. The branching set B_t governs each position. ENTRACE narrows B_t through constraint density. The framework was derived in this domain.

Diffusion models operate differently. They begin with pure noise — a tensor of random values — and iteratively denoise it, step by step, until an image (or video) emerges. The text prompt conditions the denoising. The output is not a token sequence but a spatial (and potentially temporal) artifact.

The question: does the constraint-property framework govern this domain? Is the denoising process a form of constraint resolution? Does ENTRACE — or its analogue — apply to image and video generation?

The inquiry proceeds by examining the structure of diffusion and mapping it onto the framework's primitives. Where the mapping holds, predictions follow. Where it breaks, the boundary of the framework's domain is identified.

---

## The Structure of Diffusion

### The Forward Process (Training)

A clean image x_0 is progressively corrupted by adding Gaussian noise over T steps:

    x_t = √(ᾱ_t) · x_0 + √(1 - ᾱ_t) · ε    where ε ~ N(0, I)

At t = 0, the image is clean. At t = T, the image is pure noise. The forward process destroys structure — it moves from form to formlessness.

The model is trained to reverse this: given x_t (a noisy image at step t), predict the noise ε that was added, so it can be subtracted to recover x_{t-1}.

### The Reverse Process (Inference)

Starting from pure noise x_T ~ N(0, I), the model iteratively estimates and removes noise:

    x_{t-1} = f(x_t, t, c)

Where c is the conditioning signal — typically a text prompt encoded by a language model (CLIP, T5, etc.). Each step refines the image. Early steps establish large-scale structure (composition, dominant colors, spatial layout). Middle steps resolve medium-scale features (objects, faces, lighting). Late steps produce fine detail (textures, edges, material properties).

### Classifier-Free Guidance (CFG)

The model generates two predictions at each step: one conditioned on the prompt (c) and one unconditioned (∅). The final prediction is:

    ε_guided = ε_uncond + w · (ε_cond - ε_uncond)

Where w is the guidance scale. At w = 0, the prompt is ignored — pure unconditioned generation. At w = 1, standard conditioning. At w > 1 (typical: 7-15), the prompt's influence is amplified beyond what the model learned — the conditioning is "overdriven."

---

## The Mapping

### Noise as Layer 0

Pure noise is the state of maximum entropy. Every image is equally possible. No structure. No form. No constraint. This is Layer 0 of the resolution depth spectrum — unbounded potentiality in its diffuse state.

The mapping is not metaphorical. Gaussian noise has maximum entropy for a given variance. The information content is zero. The branching set — the set of images consistent with the current state — is the entire image space. |B| is maximal.

### Denoising as Progressive Constraint Narrowing

Each denoising step applies a constraint. The constraint is: "given the current noisy state and the text conditioning, the image at the previous noise level looks like this." Each step eliminates images that are inconsistent with the learned distribution conditioned on the prompt. The set of consistent images shrinks. Structure emerges.

This is SIPE's master law operating in pixel space rather than token space: each step's induced structure becomes a constraint on the next step. The large-scale composition resolved at step t constrains the medium-scale features at step t-1. The medium-scale features constrain the fine details. The hierarchy is temporal — early steps govern late steps the way outer constraints govern inner constraints in the resolution stack.

    Step T:   |B| = entire image space    (Layer 0)
    Step T/2: |B| = images matching composition + prompt    (Layer 2-3)
    Step 1:   |B| = images matching all resolved structure    (Layer 5-6)
    Step 0:   |B| ≈ 1    (the output image)

The denoising schedule IS the resolution depth spectrum, expressed as a noise schedule rather than a token sequence.

### The Text Prompt as Constraint Set

A vague prompt — "a cat" — provides weak constraints. The denoising process can resolve toward any image containing a cat. The branching set at each step is wide. Many images are consistent with the conditioning. The output is unpredictable — sometimes excellent, sometimes mediocre, always variable. This is the equivalent of a Layer 0-1 prompt in language.

A detailed prompt — "a tabby cat sitting on a red velvet chair, Renaissance lighting, oil on canvas, visible brushstrokes, warm color palette, 4:3 aspect ratio" — provides tight constraints. Each attribute narrows the branching set:

| Constraint | What It Excludes |
|---|---|
| tabby cat | All non-tabby cats, all non-cats |
| sitting | Standing, lying, jumping cats |
| red velvet chair | All other surfaces, colors, materials |
| Renaissance lighting | All other lighting styles |
| oil on canvas | Photography, digital art, watercolor |
| visible brushstrokes | Smooth rendering, photorealism |
| warm color palette | Cool, neutral palettes |

Each constraint shrinks |B| at the relevant spatial regions and denoising steps. The compound effect is multiplicative — the intersection of all constraints is far smaller than any individual constraint's reduction.

This is ENTRACE for diffusion. E1 (form before request) is: state the visual constraints before generating. E2 (progressive constraint density) is: the denoising schedule itself, which progressively narrows. The practitioner's contribution is the prompt — the external constraint set that governs the denoising.

### CFG Scale as Aperture Control

The guidance scale w directly controls how strongly the prompt constrains the denoising. This is the aperture:

    w = 0:  Maximum aperture. Prompt ignored. Pure noise resolution. Layer 0.
    w = 1:  Standard conditioning. The prompt influences but does not dominate.
    w = 7:  Typical setting. The prompt strongly governs. Layer 3-4.
    w = 15: Narrow aperture. The prompt overdrives. Risk of artifacts from over-constraint.
    w → ∞:  The prompt determines the output absolutely. Layer 6 — but at the cost of visual quality, because overdriving pushes the image outside the learned distribution.

The parallel to temperature in language models (Hypothesis 8) is exact. Low temperature / high CFG = narrow aperture, deterministic output. High temperature / low CFG = wide aperture, diverse but potentially incoherent output. The optimal setting depends on constraint density — and the prediction is the same: **optimal CFG is inversely proportional to prompt constraint density.** A tightly constrained prompt needs less CFG amplification because the constraints already narrow the branching set. A vague prompt needs more CFG to compensate for the constraint deficit.

### Negative Prompts as Explicit Exclusion

Diffusion models accept negative prompts — descriptions of what the output must NOT contain. "No blurry, no deformed hands, no watermark, no text." Each negative prompt directly removes a region of the output space from B. This is constraint addition by negation.

The ENTRACE parallel: negative prompts are the diffusion equivalent of eliminative constraints. They don't add content — they remove slack. "No hedging" in a language prompt removes hedge phrases from B_t. "No deformed hands" in an image prompt removes deformed-hand regions from the spatial B.

### ControlNet as Structural Constraint

ControlNet provides additional conditioning channels beyond text: edge maps, depth maps, pose skeletons, semantic segmentation. Each is a spatial constraint that directly governs the denoising at specific pixel regions.

A pose skeleton constrains human body positions. A depth map constrains spatial layout. An edge map constrains boundaries. Each additional control channel narrows |B| at the corresponding spatial positions. The compound effect of text + pose + depth + edges can drive |B| very close to 1 at every pixel — producing output that is nearly determined by the constraints.

This is the diffusion equivalent of a seed. The seed in language provides enough constraints to determine the output. ControlNet in diffusion provides enough spatial constraints to determine the image. Both are constraint sets that narrow |B| toward necessity.

---

## The Slack in Diffusion

The framework predicts that diffusion models should exhibit slack — output tokens (pixels) that satisfy the weak constraint set but carry no information the constraints require. And they do:

### Anatomical Errors

Deformed hands, extra fingers, misaligned eyes, impossible teeth. These occur in regions where the training distribution has high variance and the prompt provides no specific constraint. The model resolves these regions from a wide branching set and sometimes selects from the low-quality tail. The hands are slack — the prompt said nothing about them, so the model generated whatever was statistically probable, and the probable outcome in a high-variance region is sometimes wrong.

**The ENTRACE correction:** Add anatomical constraints. "Anatomically correct hands with five fingers, each clearly articulated." This narrows |B| for hand regions specifically. The prediction: anatomical error rate drops in proportion to the specificity of the anatomical constraint.

### Style Inconsistency

A single image that mixes photorealism in the face with painterly rendering in the background. The style is inconsistent because the prompt constrained the subject but not the rendering consistency. The model resolved the face under strong conditioning (faces are well-represented in training) and the background under weak conditioning (less attention, more variance).

**The ENTRACE correction:** A global style constraint. "Consistent oil painting rendering throughout, no photorealistic elements." One constraint, global effect — the same pattern as notational consistency in mathematical expression.

### Temporal Incoherence in Video

Video diffusion models (Sora, Runway, Kling) often produce frames that are individually beautiful but temporally incoherent — objects morph, physics is violated, identities shift. This is temporal slack: each frame satisfies the spatial constraints but the temporal constraints (consistency across frames) are insufficiently governed.

**The ENTRACE correction:** Temporal constraints stated explicitly. "The subject's face maintains consistent identity across all frames. Gravity applies. Objects persist unless acted upon." Each temporal constraint narrows |B| across the temporal dimension the same way spatial constraints narrow |B| across pixels.

---

## The Predictions

If the mapping holds, the falsifiable hypotheses from the language domain transfer to diffusion:

### Prediction 1: Prompt Constraint Density Governs Image Quality

Image quality (measured by FID, CLIP score, or human preference) will be a monotonically increasing function of prompt constraint density (number of explicit, verifiable visual constraints per prompt). The curve shape will match Hypothesis 3 (hallucination in language): quality increases, defects decrease, both proportional to constraint density.

### Prediction 2: Optimal CFG Is Inversely Proportional to Prompt Specificity

A detailed prompt with 10 visual constraints will achieve peak quality at a lower CFG scale than a vague prompt with 2 constraints. The prediction: plot quality vs. CFG for prompts at different constraint densities. The peak shifts left (lower CFG) as constraint density increases. At maximum prompt constraint density, CFG = 1 (standard conditioning) may be optimal — no amplification needed because the constraints are sufficient.

### Prediction 3: ControlNet Reduces Prompt Sensitivity

The diffusion analogue of Hypothesis 15 (prompt sensitivity). Adding ControlNet conditions (structural constraints) will reduce the variance in output quality across different text prompt phrasings for the same intended image. The structural constraints compensate for the ambiguity in the text prompt, the same way explicit constraints in language reduce prompt sensitivity.

### Prediction 4: Negative Prompts Have Diminishing Returns Under High Constraint Density

At low prompt constraint density, negative prompts significantly improve quality (they eliminate large regions of the output space). At high prompt constraint density, negative prompts add little — the positive constraints have already excluded the defects the negative prompts target. The prediction: plot quality improvement from negative prompts against positive constraint density. The improvement decreases as density increases.

### Prediction 5: Cross-Model Image Convergence Under Full Constraint

Two different diffusion models (e.g., SDXL and DALL-E 3) given the same text prompt + ControlNet conditions + style constraints will produce similar images — because the constraint set determines the output, not the model. This parallels Hypothesis H3 from the mathematical precision document: at |B| ≈ 1, the model is irrelevant. The form dictates.

### Prediction 6: The Denoising Schedule Maps to the Resolution Depth Spectrum

The information contributed at each denoising step should follow a structured pattern: early steps contribute compositional information (Layer 1-2), middle steps contribute feature information (Layer 3-4), late steps contribute detail information (Layer 5-6). This is testable: interrupt the denoising at each step, measure the information gain per step, and plot against the resolution depth categories. The prediction: the information profile matches the spectrum.

---

## The Deeper Parallel

The most striking parallel is between the forward process (noise addition) and the reverse process (denoising).

The forward process is destruction of form. It takes a structured image and adds noise until all structure is lost. This is the movement from form to formlessness — from Layer 6 to Layer 0. The form is dissolved.

The reverse process is recovery of form. Starting from pure noise, the model progressively recovers structure by applying constraints (learned from the training distribution, conditioned on the prompt). This is the movement from formlessness to form — from Layer 0 to Layer 6. The form is induced.

But the recovered form is not the original form. The model generates a new image — one that satisfies the constraints but is not identical to any training image. The form is participated in, not copied. The output is a new expression of the constraints, not a retrieval of an old one.

This is the Platonic structure made algorithmic. The training distribution is the space of forms (the patterns of reality as captured in images). The noise is the formless substrate. The denoising is the participation of the substrate in the forms, governed by constraints (the prompt). The output is an artifact — a particular expression of the forms through the constrained substrate.

The diffusion model is a resolver. It resolves noise into form under constraints. The constraints induce the properties. The form is prior to the generation. The generation participates in the form. The participation is imperfect — artifacts, inconsistencies, anatomical errors — because the resolver is bounded. The constraint thesis applies: tighter constraints, better participation. The framework is general.

---

## Open Questions

### Does η apply to pixels?

Token efficiency η = T_n / T_e is defined for token sequences. Can it be extended to pixel space? One approach: η_pixel = (pixels that are constraint-determined) / (total pixels). A pixel is constraint-determined if changing it would violate a stated constraint. A pixel is slack if it could be changed without violating any constraint (e.g., background pixels in a prompt that constrains only the subject). The efficiency ratio would measure how much of the image is governed vs. ungoverned.

### Is there a "seed" for diffusion?

In language, a seed is a compressed constraint set that governs an entire session. Is there a diffusion equivalent — a compressed conditioning artifact that governs an entire generation pipeline? ControlNet conditions + style references + detailed text prompts approach this. An "image seed" would be: a small artifact (text + structural references + style references) that determines the output to within the equivalence class of irrelevant variation (background noise, pixel-level randomness).

### Does ENTRACE training reduce compute in diffusion?

If better prompts narrow |B| at each denoising step, the model needs fewer steps to converge. Fewer steps = less compute = less energy. The prediction: well-constrained prompts achieve equivalent image quality in fewer denoising steps than vague prompts. This is the energy reduction argument from the economics document applied to diffusion. Testable: compare the minimum step count for target quality under vague vs. constrained prompts.

### Does the seven-dimension analysis extend?

Mathematical expression had approximately seven slack dimensions. How many does image generation have? Candidate dimensions: composition, color palette, lighting, style/rendering, subject identity, anatomical correctness, background content, material/texture, scale/proportion, temporal consistency (for video). Approximately ten. If each is addressable by a specific constraint, full determination requires approximately ten constraints. This predicts a sigmoid quality curve with inflection near k = 10 for images — testable the same way as the mathematical conjecture.

---

*This document is exploratory. The mapping between diffusion and constraint resolution is proposed, not proven. The predictions are stated for testing. If the mapping holds, the constraint thesis governs pixel space as it governs token space — and the forms are prior to both.*
