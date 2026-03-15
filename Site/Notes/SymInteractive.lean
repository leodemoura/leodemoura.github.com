import VersoBlog
import Site.Categories
open Verso Genre Blog

#doc (Post) "sym => : interactive mode for scalable verification" =>
%%%
authors := ["Leonardo de Moura"]
date := {year := 2026, month := 3, day := 13}
categories := [Site.notes]
%%%

We are building `sym =>`, a new interactive tactic mode for writing scalable verification proofs in Lean. It extends `grind`'s interactive mode with tactics from the `Sym` framework — our infrastructure for symbolic manipulation that achieves linear scaling on verification tasks where traditional approaches break down.

The motivation comes directly from users. Some of our users are using Lean for large-scale software verification: crypto libraries, verified compilers, and program verification tools. They need to process thousands of symbolic steps efficiently, and they need to do it interactively — not just through programmatic APIs. The `Sym` framework already solves the performance problem. In benchmarks proposed by Andres Erbsen, `SymM` processes 4000+ monadic actions in under a second, where other systems can't handle 20. The missing piece was interactive access to this machinery.

`sym =>` enters a proof mode backed by both `GrindM` and `Sym`. Unlike the standalone `grind` tactic, it doesn't eagerly introduce hypotheses or apply by-contradiction — you control what gets introduced and when. New tactics include `Sym` versions of `intro`, `apply`, and `simp`. The `simp` tactic uses a two-tier cache: a persistent cache for context-independent rewrites that survives across invocations, and a transient cache for results that depend on the local context. This is what makes `repeat (simp; apply step)` loops scale linearly instead of quadratically. You also get fine-grained control over hypothesis internalization into the E-graph via `internalize`, and can invoke `grind`'s full arsenal — E-matching, linear arithmetic, case splits — exactly when you want.

This work is in progress. We are landing it in a series of PRs: core `sym =>` mode with `intro`/`apply`, then `simp` with caching, then `Sym.simp` attributes, then `internalize` tactics. If you are working on verification in Lean and want to try early builds.
