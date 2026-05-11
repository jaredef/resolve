# Visualize

Interactive simulations and probes that turn arguments from the corpus into instruments. Each is a self-contained page; physics, dynamics, and fitting code are inline. Open the page; mouse-and-keyboard your way around; watch the readouts.

These are not proofs. They are instruments — pins on the behavioral surface of dynamical systems, in the sense of [Doc 707](/resolve/doc/707-pin-art-at-the-behavioral-surface-bidirectional-probes). Forward, each candidate ρ(C) predicts a measurable; backward, what the system actually does surfaces whether the candidate is a real invariant or an accident of the demo. The point of the gallery is to provide a probe set dense enough to test SIPE-T's universality claims rather than to confirm them at one site.

## Inverted-pendulum series

A three-link inverted pendulum hinged at the base, balanced by a per-joint PD controller. The full coupled Lagrangian is solved each step with RK4. Four named controller "styles" (Weak PID, Standard LQR, Aggressive, Hierarchical) each share a stable upright regime and a characteristic failure mode triggered on demand. The companion sweeps measure basin volume V(k) over random initial conditions and fit the critical exponent β.

- **[Triple pendulum — controller styles](./triple-pendulum.html).** Three.js scene with orbit camera and physics loop. Switch controllers; kick the chain; trigger each style's failure mode. ρ(C) readout reflects state-error scaling.
- **[Basin-volume sweep — triple pendulum](./basin-volume.html).** Monte-Carlo over random ICs, sweep a one-parameter controller family, plot V(k) with Bernoulli error bars, fit V(k) ~ (k − k_c)^β on the rising shoulder.
- **[Basin-volume sweep — double pendulum](./basin-volume-double.html).** Same instrument on a mechanically dissimilar system (different mass matrix, gravity scales, Coriolis structure). Run both; compare β. Agreement within noise → one data point toward universality. Divergence → ρ(C) is system-specific and SIPE-T's universality framing falsifies on its first attempt.

## What's missing from the gallery

- A third mechanically-dissimilar system (a 1-D N-link chain, or a multi-agent consensus net with redundant loops) to convert "two β values agreed" into a triangulation.
- A scaling-collapse view: sweep two parameters and check whether (V, k) points collapse onto a single curve when re-plotted against a candidate ρ(C). That tests the form of ρ(C), not just the existence of a transition.
- A nonlinear-fit form `V(k) = 1 − exp(−A·(k − k_c)^β)` (saturating, uses every point) replacing the heuristic shoulder-window log-log fit, for cases where the transition is narrow and the linear fit window is starved.

Each is a few hundred lines of additional code. The gallery is meant to grow.

— Jared Foy
