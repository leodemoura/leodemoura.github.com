import VersoBlog
import Site.Categories
open Verso Genre Blog

set_option linter.verso.markup.emph false

#doc (Post) "Who Watches the Provers?" =>
%%%
authors := ["Leonardo de Moura"]
date := {year := 2026, month := 3, day := 16}
categories := [Site.blog]
%%%

In 2026, a skilled researcher using Claude (Opus 4.6), with real-time support from the Rocq development team, found seven kernel bugs in Rocq, a widely used proof assistant — seven independent paths to proving something false.

Rocq is a serious system with decades of foundational work. But even Rocq is vulnerable when AI applies sustained adversarial pressure to a single implementation. The question is not whether AI will find the bugs, but whether the architecture is designed to survive them.

I started [Z3](https://github.com/Z3Prover/z3), the most widely used SMT solver in the world, and bugs that produce incorrect results are still regularly found by ordinary users after nearly two decades of development. Z3 does not have independent kernels, and its trusted base is large.

The problem compounds: many verification tools (e.g., Dafny, F\*, and Verus) are built on top of Z3, and bugs arise not only in Z3 itself but also in these tools when they generate the verification conditions they send to Z3. Each layer in the stack is another place where correctness can silently break. This is the normal state of affairs for verification tools.

I built [Lean](https://lean-lang.org) not to have this problem.

# Checking is easier than finding

Finding a proof is hard — sophisticated tools, heuristics, AI, all impossible to fully audit. But none of it needs to be trusted. A proof tool doesn't assert that a theorem is true. It produces a certificate — a detailed formal artifact — which is then independently verified by a small, simple program called the kernel or proof checker.

The kernel is like an autograder on a math exam: the student's work can be as creative, messy, or AI-assisted as they like; what matters is whether the answer checks out. The kernel doesn't know how to solve problems. It only knows how to verify solutions. And because verification is a much simpler task than discovery, the kernel can be small enough to inspect and audit.

How small? [Nanoda](https://github.com/ammkrn/nanoda_lib), a complete Lean proof checker written from scratch in Rust, implements the entire verification logic in under 5,000 lines of code. A web browser is tens of millions of lines. A compiler is millions. The piece of Lean you actually have to trust is tiny. This is why I named it Lean.

# Multiple independent watchers

But what if even that small kernel has a bug?

Lean is designed so that _anyone_ can build independent kernels. Different teams, using different programming languages, running on different hardware. This is not hypothetical — it has already caught real bugs.

In 2022, a subtle arithmetic bug in Lean 4's official kernel caused it to accept an invalid proof. The bug was in how the kernel handled very large number calculations — a niche edge case that normal testing would never find. But Nanoda, the independent kernel implemented in Rust, rejected the same proof. Because Nanoda implements arithmetic differently, the bug simply didn't exist there. The official kernel was fixed in less than 24 hours.

An LLM or a malicious user exploiting a bug in one kernel would need to exploit the _same_ bug in all of them simultaneously. That is a fundamentally harder problem.

We recently launched the [Lean Kernel Arena](https://arena.lean-lang.org/), a public website where the community submits independent kernels and challenging test cases. Today it tests 7 kernels against 133 benchmarks — proofs that must be accepted and invalid proofs that must be rejected. The test suite includes the entirety of [Mathlib](https://github.com/leanprover-community/mathlib4) and other large-scale projects. Trust is not asserted; it is continuously tested in the open.

# The track record

In Lean 4, the bugs that have been found were in extension layers (e.g., how the kernel handles large number arithmetic), not in the core type-checking logic. Every one was fixed in less than 24 hours of being reported, and every one was caught by some independent kernel.

Researchers and AI systems actively try to break the system. AI companies training on Lean continuously stress-test the kernel — their systems sometimes try to cheat by exploiting implementation bugs rather than proving theorems honestly. Every bug found and fixed makes a kernel stronger.

The same AI that found bugs in Rocq also found two bugs in Nanoda, one of Lean's independent kernels. But Claude (Opus 4.6) did not manage to find a proof of false in the Lean official kernel. An exploit that works against one kernel fails against the other. The space of possible bugs in a 5,000-line program is finite. The kernels converge toward correctness, and AI is accelerating that convergence.

Multiple kernels also let us innovate without fear. We can implement a new optimization or an entirely new architecture in a new kernel, test it aggressively, and know that the other kernels will catch any mistake in the new one. The diversity is not just a safety net — it is what makes rapid progress possible.

# Why this is different

Testing can show the presence of bugs, never their absence. Code review scales linearly with code size. AI systems can be evaluated statistically, but no individual output can be verified with certainty. Lean's trust model is different in kind: here is a mathematical certificate, and here are several independent programs that verified it. The checking is deterministic — run it again, get the same answer. This is the structure that lets Lean serve as a trust anchor for AI-generated proofs, verified software, and the critical infrastructure that depends on both.

---

_The [Lean Kernel Arena](https://arena.lean-lang.org/) is open for new kernels and benchmarks. The [Lean reference manual](https://lean-lang.org/doc/reference/latest/ValidatingProofs/#validating-proofs) covers the full technical details on validating Lean proofs. Lean is [open source](https://github.com/leanprover/lean4)._
