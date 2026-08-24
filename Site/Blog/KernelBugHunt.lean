import VersoBlog
import Site.Categories
open Verso Genre Blog

set_option linter.verso.markup.emph false

#doc (Post) "Postmortem for the Kernel Soundness Bug Hunt" =>
%%%
authors := ["Leonardo de Moura"]
date := {year := 2026, month := 8, day := 24}
categories := [Site.blog]
%%%

This is a follow-up to [Postmortem for Kernel Soundness Bug #14576](https://leodemoura.github.io/blog/2026-8-1-postmortem-for-kernel-soundness-bug-14576/). We describe the kernel soundness bug hunt using [OpenAI](https://openai.com/) internal models, the new bugs found, and the actions the [Lean FRO](https://lean-lang.org/fro/) is taking to increase trust.

We are deeply grateful for all the help provided by Daniel Selsam at OpenAI. Daniel used OpenAI internal models to discover new soundness issues in the official Lean kernel and runtime. The collaboration with Daniel started on July 30 and was concluded on August 20, when the internal AI reported it could not find additional issues. Some of the bugs found by the OpenAI internal model have already been reported in the previous postmortem, but we repeat them here to ensure this document is self-contained.

The chapter [Validating a Lean Proof](https://lean-lang.org/doc/reference/latest/ValidatingProofs/#validating-proofs) from the Lean Reference Manual explains how potentially adversarial developments should be checked. `lake build` does not protect users from adversarial proofs that try, for example, to corrupt memory using Lean extensions. The gold standard is [`comparator`](https://github.com/leanprover/comparator) and external checkers when you want to protect against a seriously malicious proof that compromises how Lean interprets a theorem statement or the user's system. We consider AI-generated proofs a potential source of malicious proofs.

On August 11, we wrote a [document](https://hackmd.io/Tu2Z97xHSQilI7b91HQfAw) to assist the OpenAI internal model and other groups trying to find additional bugs in Lean kernels. This document was included in the prompt provided to the AI agents. It explains how to use tools such as `comparator` and external checkers, and instructs the agents not to spend time trying to corrupt memory by misusing Lean APIs or using `unsafe` code blocks, since these exploits are all caught when the proof is exported and rechecked. `comparator` was built to address this kind of exploit. We updated the document twice, on August 15 and 18, to describe additional exploits that are caught by `comparator` (e.g., an invalid prelude), and to explain that the 32-bit version is no longer supported. None of the groups using publicly available models reported any bugs.

At the end of the bug hunt, the OpenAI internal model focused on bugs in the Lean runtime. It found two very clever exploits. First, it found a way to overflow the reference counter of a Lean object used by the kernel, corrupt the memory, and then prove `False`. Second, it figured out that the official Lean distribution for Linux was not using the latest [GMP](https://gmplib.org/) v6.3.0, but v6.1.2, which contains a known bug, and crafted a proof of `False` exploiting this bug.

On August 21, we released Lean [v4.33.1](https://github.com/leanprover/lean4/releases/tag/v4.33.1) with bug fixes for all issues found during the kernel bug hunt.

# New Soundness Bugs

In this section, we cover pull requests (PRs) that fixed soundness bugs in the official kernel code. The OpenAI internal model managed to exploit all of them to get the official kernel to accept a proof of `False`. While fixing the issues, we also checked whether [`nanoda`](https://github.com/ammkrn/nanoda_lib) and [`ind-models`](https://github.com/nomeata/lean-inductive-models) (see below) rejected the bogus proofs.

- [#14613: fix: recognize sorts as Prop up to universe normalization](https://github.com/leanprover/lean4/pull/14613). Both `nanoda` and `ind-models` rejected the bogus proof.

- [#14616 fix: reject declarations naming the kernel's \_nested auxiliary types](https://github.com/leanprover/lean4/pull/14616). Both `nanoda` and `ind-models` rejected the bogus proof.

- [#14806 fix: make kernel is\_def\_eq caching order-independent](https://github.com/leanprover/lean4/pull/14806). Both `nanoda` and `ind-models` rejected the bogus proofs.

- [#14807 fix: make the kernel is\_prop check require a sort](https://github.com/leanprover/lean4/pull/14807) and [#14843 fix: apply #14807 fix to inductive.h](https://github.com/leanprover/lean4/pull/14843). These two PRs fix the implementation of the function that decides whether a type is a proposition. The bogus proof was accepted by `nanoda`. [`lean4lean`](https://github.com/digama0/lean4lean) mirrors the implementation of the main kernel, but it does not have this bug, since its `isProp` [already used ensureSortCore](https://github.com/digama0/lean4lean/blob/e0e3f6bcccb840cb0ea6f11c2b274ada93a12e00/Lean4Lean/TypeChecker.lean#L224-L230). `ind-models` rejected the bogus proof.

# Runtime Soundness

In this section, we cover PRs that fixed bugs in the Lean runtime that were exploited by the OpenAI internal model to construct proofs of `False` that are accepted by the official kernel. Both bogus proofs are rejected by `nanoda`, and any other external checker not based on the Lean runtime.

- [#14838 fix: freeze objects when their reference count overflows](https://github.com/leanprover/lean4/pull/14838). Previously, forcing a very large number of references to a single object wrapped the counter and corrupted the object's state; the object is now frozen (treated as persistent) and simply never freed, following the "sticky" approach used by the [Koka](https://github.com/koka-lang/koka) programming language.

- [#14833 fix: require GMP 6.3.0](https://github.com/leanprover/lean4/pull/14833). This is not really a bug in our source code. However, our Linux CI was constructing Lean binaries using GMP v6.1.2 for libc compatibility purposes, which contained a bug that could be exploited to construct a proof of `False`.

# Other bugs

The following PRs do not fix soundness bugs. Some of them were exploits that were caught by our gold standard, but could also have been caught earlier.

- [#14607 fix: missing check\_no\_metavar\_no\_fvar checks at inductive.cpp](https://github.com/leanprover/lean4/pull/14607). This one was caught when we tried to export the exploit.

- [#14608 fix: check universe parameters in mutual definitions](https://github.com/leanprover/lean4/pull/14608). This is a bug, but not a soundness bug.

- [#14609 fix: mark exported stubs of partial definitions as unsafe](https://github.com/leanprover/lean4/pull/14609). This one was also caught when we tried to export the exploit.

- [#14615 fix: decide inductive predicates up to universe normalization](https://github.com/leanprover/lean4/pull/14615). This is a bug, but not a soundness bug. The official kernel was rejecting a valid inductive declaration.

- [#14849 fix: bound the size of Nat numerals computed by the kernel](https://github.com/leanprover/lean4/pull/14849). This hardening was motivated by adversarial testing performed by Daniel Selsam (OpenAI) using internal AI systems. We implemented it after we merged the PR that ensures Lean is built using GMP v6.3.0 in our CI. While using Lean built with GMP v6.1.2, the OpenAI internal model managed to construct a proof that built a numeral that consumed several gigabytes and exploited another bug in GMP v6.1.2. We discussed the situation with the model, and it suggested we keep the kernel's arithmetic comfortably within the range where GMP is well exercised. We could not rule out the possibility that there are other, similar exploits based on GMP 6.3.0.

# New tags on GitHub

We have added two new tags for marking pull requests and issues.

- `soundness`: a bug in the logic of the official Lean kernel that allows users to prove `False`.

- `runtime-soundness`: a bug in the Lean runtime that can be exploited to corrupt memory and prove `False`.

# Next steps

## `lake check`

Starting with Lean v4.35.0, we will include the command `lake check`. This command will export and recheck the project using `lean4checker`. We are planning to include the `nanoda`, `lean-inductive-models`, and `lean4lean` kernels in the official Lean distribution. We are also considering adding some of the new kernels derived from `nanoda`. The command `lake check nanoda` will export and recheck the project using `nanoda`.

The command `lake check --paranoid` will export and recheck the project using all kernels distributed with Lean. We are considering adding support for additional kernels installed by users. We will also include `comparator` in the Lean distribution.

## Arbitrary precision arithmetic

The official kernel requires an arbitrary-precision arithmetic package. We can currently compile Lean using two different packages: GMP and [mpn](https://github.com/leanprover/lean4/blob/master/src/runtime/mpn.cpp). GMP is the GNU Multiple Precision arithmetic library, and mpn is a similar, simpler library built by Christoph Wintersteiger for [Z3](https://github.com/z3prover/z3). We are planning to ship Lean with two versions of `lean4checker`: one compiled using GMP and another using mpn. We are also planning to implement a simple and verified arbitrary-precision arithmetic package and use it to implement a version of `lean4checker` without any dependency on external arithmetic packages.

## `lean-inductive-models`

Motivated by the soundness bug discussed in the previous post-mortem, [Joachim Breitner](https://www.joachim-breitner.de) (Lean FRO) developed the [`lean-inductive-models`](https://github.com/nomeata/lean-inductive-models) checker. It extends an existing checker (the official Lean kernel by default) with a preprocessing step that proves that an inductive type, including its recursors and reduction rules, can be modelled from first principles. This catches a large class of potential implementation bugs in the kernel's handling of inductives.

This way, `lean-inductive-models` also addresses a concern raised on social media and in public discussions: whether the theory behind Lean's inductive types is fully understood. The same derivation demonstrates that the constructions Lean uses are well understood. The soundness bugs in this area were implementation mistakes, not gaps in the theory. `lean-inductive-models` is in the [Lean Kernel Arena](https://arena.lean-lang.org/) as [`ind-models`](https://arena.lean-lang.org/checker/ind-models/).

## Verified kernels

We want to see fully verified kernels for Lean, such as `lean4lean`. We emphasize `lean4lean` does not need to mirror the official kernel line by line to be valuable. Mirroring couples every kernel change to the proof effort and slows both sides down. The `lean4lean` developers are free to diverge from our implementation wherever that makes the proof simpler or faster to finish.

We will also support other verified kernels for Lean. We remark that verified kernels implemented in Lean are not immune to bugs in the Lean runtime. The OpenAI internal model managed to construct a proof of `False` by exploiting bugs in the reference counter management and GMP. After we have a verified kernel, we believe the simplest solution to address this kind of vulnerability is to ask an AI to (auto)-translate the verified kernel into a different programming language and run both versions. Once we have additional tooling for verifying low-level programs, we can also address this issue by verifying the Lean runtime.

## Searching for bugs in other Lean kernels

The hunt was mainly focused on the official kernel. We are planning to extend it to most of the Lean kernels available in the [Lean Kernel Arena](https://arena.lean-lang.org/). We see two strategies.

- The AI model writes the bogus proofs directly in the [Lean export format](https://github.com/leanprover/lean4export).

- It keeps using Lean as a frontend for constructing the bogus proofs, and uses `set_option debug.skipKernelTC true` to bypass the official kernel (or a new `set_option` that allows selecting alternative kernels).

# Acknowledgments

I am grateful to [Joachim Breitner](https://www.joachim-breitner.de/), [Kim Morrison](https://kim-em.github.io/), and [Sebastian Ullrich](https://sebasti.a.nullri.ch/) for their revisions and suggestions on this post.
