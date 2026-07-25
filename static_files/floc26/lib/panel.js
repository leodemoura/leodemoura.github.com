// @ts-check
/* Interactive info panel for Lean code blocks in reveal.js slides. */
(function () {
    "use strict";

    /**
     * @typedef {HTMLElement & { _activeSource: Element | null }} PanelBlock
     * @typedef {HTMLElement & { _richFormatSource: Element | null }} InfoPanel
     */

    /** @type {Record<string, *> | null} */
    var docsJson = null; // fetched once on init

    function init() {
        // Fetch the hover-docs JSON
        docsJson = {"9": "<code>odd (n : Nat) : Prop</code>",
 "8":
 "<code>Nat : Type</code><span class=\"sep\"></span><code class=\"docstring\">The natural numbers, starting at zero.\n\nThis type is special-cased by both the kernel and the compiler, and overridden with an efficient\nimplementation. Both use a fast arbitrary-precision arithmetic library (usually\n[GMP](https://gmplib.org/)); at runtime, `Nat` values that are sufficiently small are unboxed.\n</code>",
 "77":
 "<code>d ^ 2 * (d + d * t - 2 * d * t ^ 2 + d * t ^ 4 + d ^ 2 * t ^ 4) = 0</code>",
 "76": "<code>d * (d + t + d * t) = 0</code>",
 "75":
 "<code>Lean.Grind.IsCharP.{u} (α : Type u) [Semiring α] (p : outParam Nat) : Prop</code><span class=\"sep\"></span><code class=\"docstring\">A ring `α` has characteristic `p` if `OfNat.ofNat x = 0` iff `x % p = 0`.\n\nNote that for `p = 0`, we have `x % p = x`, so this says that `OfNat.ofNat` is injective from `Nat` to `α`.\n\nIn the case of a semiring, we take the stronger condition that\n`OfNat.ofNat x = OfNat.ofNat y` iff `x % p = y % p`.\n</code>",
 "74": "<code>IsCharP α 0</code>",
 "73":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17745&quot;:{&quot;binding&quot;:&quot;var-_uniq.56&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;18105425&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;282961&quot;:{&quot;binding&quot;:&quot;var-_uniq.56&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4369&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4526353&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4526357&quot;:{&quot;binding&quot;:&quot;var-_uniq.56&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4526405&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4526417&quot;:{&quot;binding&quot;:&quot;var-_uniq.56&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;70737&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;70929&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,4369,&quot;d&quot;]]],[4,[4,&quot; ^&quot;,1],[6,[3,2,[7,1093,&quot;2&quot;]]]]]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,4526353,&quot;d&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[4,[6,[3,2,[7,18105425,&quot;d&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,4526357,&quot;t&quot;]]]]]]]]]]],[4,[4,&quot; -&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,18105617,&quot;2&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,4526405,&quot;d&quot;]]]]]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,[6,[3,2,[7,4526417,&quot;t&quot;]]],[4,[4,&quot; ^&quot;,1],[6,[3,2,[7,1131605,&quot;2&quot;]]]]]]]]]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[4,[6,[3,2,[7,70737,&quot;d&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,[6,[3,2,[7,282961,&quot;t&quot;]]],[4,[4,&quot; ^&quot;,1],[6,[3,2,[7,70741,&quot;4&quot;]]]]]]]]]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,70929,&quot;d&quot;]]],[4,[4,&quot; ^&quot;,1],[6,[3,2,[7,17733,&quot;2&quot;]]]]]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,[6,[3,2,[7,17745,&quot;t&quot;]]],[4,[4,&quot; ^&quot;,1],[6,[3,2,[7,4437,&quot;4&quot;]]]]]]]]]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[7,5,&quot;0&quot;]]]]]]]]}\">d ^ 2 * (d + d * t - 2 * d * t ^ 2 + d * t ^ 4 + d ^ 2 * t ^ 4) = 0</code>",
 "72":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1109&quot;:{&quot;binding&quot;:&quot;var-_uniq.56&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;17681&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;273&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4421&quot;:{&quot;binding&quot;:&quot;var-_uniq.56&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4433&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,273,&quot;d&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,17681,&quot;d&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,4421,&quot;t&quot;]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[4,[6,[3,2,[7,4433,&quot;d&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,1109,&quot;t&quot;]]]]]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[7,5,&quot;0&quot;]]]]]]]]}\">d * (d + t + d * t) = 0</code>",
 "71":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;var-_uniq.3&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;α&quot;]]]]}\">α</code>",
 "70":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.14311&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Lean.Grind.NatModule&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.14311&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Lean.Grind.NoNatZeroDivisors&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;[&quot;,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;NatModule&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],&quot;]&quot;]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,85,&quot;Prop&quot;]]]]]]]]]]]]]}\">Lean.Grind.NoNatZeroDivisors.{u} (α : Type u) [NatModule α] : Prop</code><span class=\"sep\"></span><code class=\"docstring\">We say a module has no natural number zero divisors if\n`k ≠ 0` and `k * a = k * b` implies `a = b` (here `k` is a natural number and `a` and `b` are element of the module).\n\nFor a module over the integers this is equivalent to\n`k ≠ 0` and `k * a = 0` implies `a = 0`.\n(See the alternative constructor `NoNatZeroDivisors.mk'`,\nand the theorem `eq_zero_of_mul_eq_zero`.)\n</code>",
 "7":
 "<code class=\"docstring\">`by tac` constructs a term of the expected type by running the tactic(s) `tac`. </code>",
 "69":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1360&quot;:{&quot;binding&quot;:&quot;const-outParam&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.14311&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.14314&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Lean.Grind.Semiring&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.14311&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Lean.Grind.IsCharP&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;[&quot;,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;Semiring&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],&quot;]&quot;]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;p&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;outParam&quot;]]],[4,1,[6,[3,2,[7,1361,&quot;Nat&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,341,&quot;Prop&quot;]]]]]]]]]]]]]]]}\">Lean.Grind.IsCharP.{u} (α : Type u) [Semiring α] (p : outParam Nat) : Prop</code><span class=\"sep\"></span><code class=\"docstring\">A ring `α` has characteristic `p` if `OfNat.ofNat x = 0` iff `x % p = 0`.\n\nNote that for `p = 0`, we have `x % p = x`, so this says that `OfNat.ofNat` is injective from `Nat` to `α`.\n\nIn the case of a semiring, we take the stronger condition that\n`OfNat.ofNat x = OfNat.ofNat y` iff `x % p = y % p`.\n</code>",
 "68":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.14311&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Lean.Grind.CommRing&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Lean.Grind.CommRing.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">A commutative ring, i.e. a ring with commutative multiplication.\n</code>",
 "67":
 "<code class=\"docstring\">`grind` is a tactic inspired by modern SMT solvers. **Picture a virtual whiteboard**:\nevery time grind discovers a new equality, inequality, or logical fact,\nit writes it on the board, groups together terms known to be equal,\nand lets each reasoning engine read from and contribute to the shared workspace.\nThese engines work together to handle equality reasoning, apply known theorems,\npropagate new facts, perform case analysis, and run specialized solvers\nfor domains like linear arithmetic and commutative rings.\n\nSee [the reference manual's chapter on `grind`](https://lean-lang.org/doc/reference/4.33.0-rc1/find/?domain=Verso.Genre.Manual.section&name=grind-tactic) for more information.\n\n`grind` is *not* designed for goals whose search space explodes combinatorially,\nthink large pigeonhole instances, graph‑coloring reductions, high‑order N‑queens boards,\nor a 200‑variable Sudoku encoded as Boolean constraints.  Such encodings require\n thousands (or millions) of case‑splits that overwhelm `grind`’s branching search.\n\nFor **bit‑level or combinatorial problems**, consider using **`bv_decide`**.\n`bv_decide` calls a state‑of‑the‑art SAT solver (CaDiCaL) and then returns a\n*compact, machine‑checkable certificate*.\n\n### Equality reasoning\n\n`grind` uses **congruence closure** to track equalities between terms.\nWhen two terms are known to be equal, congruence closure automatically deduces\nequalities between more complex expressions built from them.\nFor example, if `a = b`, then congruence closure will also conclude that `f a` = `f b`\nfor any function `f`. This forms the foundation for efficient equality reasoning in `grind`.\nHere is an example:\n```\nexample (f : Nat → Nat) (h : a = b) : f (f b) = f (f a) := by\n  grind\n```\n\n### Applying theorems using E-matching\n\nTo apply existing theorems, `grind` uses a technique called **E-matching**,\nwhich finds matches for known theorem patterns while taking equalities into account.\nCombined with congruence closure, E-matching helps `grind` discover\nnon-obvious consequences of theorems and equalities automatically.\n\nConsider the following functions and theorems:\n```\ndef f (a : Nat) : Nat :=\n  a + 1\n\ndef g (a : Nat) : Nat :=\n  a - 1\n\n@[grind =]\ntheorem gf (x : Nat) : g (f x) = x := by\n  simp [f, g]\n```\nThe theorem `gf` asserts that `g (f x) = x` for all natural numbers `x`.\nThe attribute `[grind =]` instructs `grind` to use the left-hand side of the equation,\n`g (f x)`, as a pattern for E-matching.\nSuppose we now have a goal involving:\n```\nexample {a b} (h : f b = a) : g a = b := by\n  grind\n```\nAlthough `g a` is not an instance of the pattern `g (f x)`,\nit becomes one modulo the equation `f b = a`. By substituting `a`\nwith `f b` in `g a`, we obtain the term `g (f b)`,\nwhich matches the pattern `g (f x)` with the assignment `x := b`.\nThus, the theorem `gf` is instantiated with `x := b`,\nand the new equality `g (f b) = b` is asserted.\n`grind` then uses congruence closure to derive the implied equality\n`g a = g (f b)` and completes the proof.\n\nThe pattern used to instantiate theorems affects the effectiveness of `grind`.\nFor example, the pattern `g (f x)` is too restrictive in the following case:\nthe theorem `gf` will not be instantiated because the goal does not even\ncontain the function symbol `g`.\n\n```\nexample (h₁ : f b = a) (h₂ : f c = a) : b = c := by\n  grind\n```\n\nYou can use the command `grind_pattern` to manually select a pattern for a given theorem.\nIn the following example, we instruct `grind` to use `f x` as the pattern,\nallowing it to solve the goal automatically:\n```\ngrind_pattern gf =&gt; f x\n\nexample {a b c} (h₁ : f b = a) (h₂ : f c = a) : b = c := by\n  grind\n```\nYou can enable the option `trace.grind.ematch.instance` to make `grind` print a\ntrace message for each theorem instance it generates.\n\nYou can also specify a **multi-pattern** to control when `grind` should apply a theorem.\nA multi-pattern requires that all specified patterns are matched in the current context\nbefore the theorem is applied. This is useful for theorems such as transitivity rules,\nwhere multiple premises must be simultaneously present for the rule to apply.\nThe following example demonstrates this feature using a transitivity axiom for a binary relation `R`:\n```\nopaque R : Int → Int → Prop\naxiom Rtrans {x y z : Int} : R x y → R y z → R x z\n\ngrind_pattern Rtrans =&gt; R x y, R y z\n\nexample {a b c d} : R a b → R b c → R c d → R a d := by\n  grind\n```\nBy specifying the multi-pattern `R x y, R y z`, we instruct `grind` to\ninstantiate `Rtrans` only when both `R x y` and `R y z` are available in the context.\nIn the example, `grind` applies `Rtrans` to derive `R a c` from `R a b` and `R b c`,\nand can then repeat the same reasoning to deduce `R a d` from `R a c` and `R c d`.\n\nInstead of using `grind_pattern` to explicitly specify a pattern,\nyou can use the `@[grind]` attribute or one of its variants, which will use a heuristic to\ngenerate a (multi-)pattern. The complete list is available in the reference manual. The main ones are:\n\n- `@[grind →]` will select a multi-pattern from the hypotheses of the theorem (i.e. it will use the theorem for forwards reasoning).\n  In more detail, it will traverse the hypotheses of the theorem from left-to-right, and each time it encounters a minimal indexable\n  (i.e. has a constant as its head) subexpression which \"covers\" (i.e. fixes the value of) an argument which was not\n  previously covered, it will add that subexpression as a pattern, until all arguments have been covered.\n- `@[grind ←]` will select a multi-pattern from the conclusion of theorem (i.e. it will use the theorem for backwards reasoning).\n  This may fail if not all the arguments to the theorem appear in the conclusion.\n- `@[grind]` will traverse the conclusion and then the hypotheses left-to-right, adding patterns as they increase the coverage,\n  stopping when all arguments are covered.\n- `@[grind =]` checks that the conclusion of the theorem is an equality, and then uses the left-hand-side of the equality as a pattern.\n  This may fail if not all of the arguments appear in the left-hand-side.\n\nHere is the previous example again but using the attribute `[grind →]`\n```\nopaque R : Int → Int → Prop\n@[grind →] axiom Rtrans {x y z : Int} : R x y → R y z → R x z\n\nexample {a b c d} : R a b → R b c → R c d → R a d := by\n  grind\n```\n\nTo control theorem instantiation and avoid generating an unbounded number of instances,\n`grind` uses a generation counter. Terms in the original goal are assigned generation zero.\nWhen `grind` applies a theorem using terms of generation `≤ n`, any new terms it creates\nare assigned generation `n + 1`. This limits how far the tactic explores when applying\ntheorems and helps prevent an excessive number of instantiations.\n\n#### Key options:\n- `grind (ematch := &lt;num&gt;)` controls the number of E-matching rounds.\n- `grind [&lt;name&gt;, ...]` instructs `grind` to use the declaration `name` during E-matching.\n- `grind only [&lt;name&gt;, ...]` is like `grind [&lt;name&gt;, ...]` but does not use theorems tagged with `@[grind]`.\n- `grind (gen := &lt;num&gt;)` sets the maximum generation.\n\n### Linear integer arithmetic (`lia`)\n\n`grind` can solve goals that reduce to **linear integer arithmetic (LIA)** using an\nintegrated decision procedure called **`lia`**.  It understands\n\n* equalities   `p = 0`\n* inequalities  `p ≤ 0`\n* disequalities `p ≠ 0`\n* divisibility  `d ∣ p`\n\nThe solver incrementally assigns integer values to variables; when a partial\nassignment violates a constraint it adds a new, implied constraint and retries.\nThis *model-based* search is **complete for LIA**.\n\n#### Key options:\n\n* `grind -lia` disable the solver (useful for debugging)\n* `grind +qlia` accept rational models (shrinks the search space but is incomplete for ℤ)\n* `grind (liaSteps := n)` cap the number of steps performed by the model search (the solver becomes incomplete when the threshold is reached)\n\n#### Examples:\n\n```\n-- Even + even is never odd.\nexample {x y : Int} : 2 * x + 4 * y ≠ 5 := by\n  grind\n\n-- Mixing equalities and inequalities.\nexample {x y : Int} :\n    2 * x + 3 * y = 0 → 1 ≤ x → y &lt; 1 := by\n  grind\n\n-- Reasoning with divisibility.\nexample (a b : Int) :\n    2 ∣ a + 1 → 2 ∣ b + a → ¬ 2 ∣ b + 2 * a := by\n  grind\n\nexample (x y : Int) :\n    27 ≤ 11*x + 13*y →\n    11*x + 13*y ≤ 45 →\n    -10 ≤ 7*x - 9*y →\n    7*x - 9*y ≤ 4 → False := by\n  grind\n\n-- Types that implement the `ToInt` type-class.\nexample (a b c : UInt64)\n    : a ≤ 2 → b ≤ 3 → c - a - b = 0 → c ≤ 5 := by\n  grind\n```\n\n### Algebraic solver (`ring`)\n\n`grind` ships with an algebraic solver nick-named **`ring`** for goals that can\nbe phrased as polynomial equations (or disequations) over commutative rings,\nsemirings, or fields.\n\n*Works out of the box*\nAll core numeric types and relevant Mathlib types already provide the required\ntype-class instances, so the solver is ready to use in most developments.\n\nWhat it can decide:\n\n* equalities of the form `p = q`\n* disequalities `p ≠ q`\n* basic reasoning under field inverses (`a / b := a * b⁻¹`)\n* goals that mix ring facts with other `grind` engines\n\n#### Key options:\n\n* `grind -ring` turn the solver off (useful when debugging)\n* `grind (ringSteps := n)` cap the number of steps performed by this procedure.\n\n#### Examples\n\n```\nopen Lean Grind\n\nexample [CommRing α] (x : α) : (x + 1) * (x - 1) = x^2 - 1 := by\n  grind\n\n-- Characteristic 256 means 16 * 16 = 0.\nexample [CommRing α] [IsCharP α 256] (x : α) :\n    (x + 16) * (x - 16) = x^2 := by\n  grind\n\n-- Works on built-in rings such as `UInt8`.\nexample (x : UInt8) : (x + 16) * (x - 16) = x^2 := by\n  grind\n\nexample [CommRing α] (a b c : α) :\n    a + b + c = 3 →\n    a^2 + b^2 + c^2 = 5 →\n    a^3 + b^3 + c^3 = 7 →\n    a^4 + b^4 = 9 - c^4 := by\n  grind\n\nexample [Field α] [NoNatZeroDivisors α] (a : α) :\n    1 / a + 1 / (2 * a) = 3 / (2 * a) := by\n  grind\n```\n\n### Other options\n\n- `grind (splits := &lt;num&gt;)` caps the *depth* of the search tree.  Once a branch performs `num` splits\n  `grind` stops splitting further in that branch.\n- `grind -splitIte` disables case splitting on if-then-else expressions.\n- `grind -splitMatch` disables case splitting on `match` expressions.\n- `grind +splitImp` instructs `grind` to split on any hypothesis `A → B` whose antecedent `A` is **propositional**.\n- `grind -linarith` disables the linear arithmetic solver for (ordered) modules and rings.\n\n### Additional Examples\n\n```\nexample {a b} {as bs : List α} : (as ++ bs ++ [b]).getLastD a = b := by\n  grind\n\nexample (x : BitVec (w+1)) : (BitVec.cons x.msb (x.setWidth w)) = x := by\n  grind\n\nexample (as : Array α) (lo hi i j : Nat) :\n    lo ≤ i → i &lt; j → j ≤ hi → j &lt; as.size → min lo (as.size - 1) ≤ i := by\n  grind\n```\n</code>",
 "66":
 "<code>Ne.{u} {α : Sort u} (a b : α) : Prop</code><span class=\"sep\"></span><code class=\"docstring\">`a ≠ b`, or `Ne a b` is defined as `¬ (a = b)` or `a = b → False`,\nand asserts that `a` and `b` are not equal.\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `≠` in identifiers is `ne`.</code>",
 "65":
 "<code>HSub.hSub.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HSub α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a - b` computes the difference of `a` and `b`.\nThe meaning of this notation is type-dependent.\n* For natural numbers, this operator saturates at 0: `a - b = 0` when `a ≤ b`. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `-` in identifiers is `sub` (when used as a binary operator).</code>",
 "64":
 "<code>HPow.hPow.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HPow α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a ^ b` computes `a` to the power of `b`.\nThe meaning of this notation is type-dependent. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `^` in identifiers is `pow`.</code>",
 "63": "<code>α → Nat</code>",
 "62":
 "<code>Lean.Grind.NoNatZeroDivisors.{u} (α : Type u) [NatModule α] : Prop</code><span class=\"sep\"></span><code class=\"docstring\">We say a module has no natural number zero divisors if\n`k ≠ 0` and `k * a = k * b` implies `a = b` (here `k` is a natural number and `a` and `b` are element of the module).\n\nFor a module over the integers this is equivalent to\n`k ≠ 0` and `k * a = 0` implies `a = 0`.\n(See the alternative constructor `NoNatZeroDivisors.mk'`,\nand the theorem `eq_zero_of_mul_eq_zero`.)\n</code>",
 "61": "<code>NoNatZeroDivisors α</code>",
 "60":
 "<code>Lean.Grind.CommRing.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">A commutative ring, i.e. a ring with commutative multiplication.\n</code>",
 "6":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1675&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Prop&quot;]]]]]]]]]]]}\">odd (n : Nat) : Prop</code>",
 "59": "<code>CommRing α</code>",
 "58":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;var-_uniq.5&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,5,&quot;Nat&quot;]]]]]]]]]}\">α → Nat</code>",
 "57":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;var-_uniq.5&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;α&quot;]]]]}\">α</code>",
 "56":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.10417&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Lean.Grind.NatModule&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.10417&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Lean.Grind.NoNatZeroDivisors&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;[&quot;,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;NatModule&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],&quot;]&quot;]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,85,&quot;Prop&quot;]]]]]]]]]]]]]}\">Lean.Grind.NoNatZeroDivisors.{u} (α : Type u) [NatModule α] : Prop</code><span class=\"sep\"></span><code class=\"docstring\">We say a module has no natural number zero divisors if\n`k ≠ 0` and `k * a = k * b` implies `a = b` (here `k` is a natural number and `a` and `b` are element of the module).\n\nFor a module over the integers this is equivalent to\n`k ≠ 0` and `k * a = 0` implies `a = 0`.\n(See the alternative constructor `NoNatZeroDivisors.mk'`,\nand the theorem `eq_zero_of_mul_eq_zero`.)\n</code>",
 "55":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.10417&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Lean.Grind.CommRing&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Lean.Grind.CommRing.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">A commutative ring, i.e. a ring with commutative multiplication.\n</code>",
 "54":
 "<code class=\"docstring\">`decide` attempts to prove the main goal (with target type `p`) by synthesizing an instance of `Decidable p`\nand then reducing that instance to evaluate the truth value of `p`.\nIf it reduces to `isTrue h`, then `h` is a proof of `p` that closes the goal.\n\nThe target is not allowed to contain local variables or metavariables.\nIf there are local variables, you can first try using the `revert` tactic with these local variables to move them into the target,\nor you can use the `+revert` option, described below.\n\nOptions:\n- `decide +revert` begins by reverting local variables that the target depends on,\n  after cleaning up the local context of irrelevant variables.\n  A variable is *relevant* if it appears in the target, if it appears in a relevant variable,\n  or if it is a proposition that refers to a relevant variable.\n- `decide +kernel` uses kernel for reduction instead of the elaborator.\n  It has two key properties: (1) since it uses the kernel, it ignores transparency and can unfold everything,\n  and (2) it reduces the `Decidable` instance only once instead of twice.\n- `decide +native` uses the native code compiler (`#eval`) to evaluate the `Decidable` instance,\n  admitting the result via an axiom.\n  This can be significantly more efficient than using reduction, but it is at the cost of increasing the size\n  of the trusted code base.\n  Namely, it depends on the correctness of the Lean compiler and all definitions with an `@[implemented_by]` attribute.\n  Like with `+kernel`, the `Decidable` instance is evaluated only once.\n\nLimitation: In the default mode or `+kernel` mode, since `decide` uses reduction to evaluate the term,\n`Decidable` instances defined by well-founded recursion might not work because evaluating them requires reducing proofs.\nReduction can also get stuck on `Decidable` instances with `Eq.rec` terms.\nThese can appear in instances defined using tactics (such as `rw` and `simp`).\nTo avoid this, create such instances using definitions such as `decidable_of_iff` instead.\n\n## Examples\n\nProving inequalities:\n```lean\nexample : 2 + 2 ≠ 5 := by decide\n```\n\nTrying to prove a false proposition:\n```lean\nexample : 1 ≠ 1 := by decide\n/-\ntactic 'decide' proved that the proposition\n  1 ≠ 1\nis false\n-/\n```\n\nTrying to prove a proposition whose `Decidable` instance fails to reduce\n```lean\nopaque unknownProp : Prop\n\nopen scoped Classical in\nexample : unknownProp := by decide\n/-\ntactic 'decide' failed for proposition\n  unknownProp\nsince its 'Decidable' instance reduced to\n  Classical.choice ⋯\nrather than to the 'isTrue' constructor.\n-/\n```\n\n## Properties and relations\n\nFor equality goals for types with decidable equality, usually `rfl` can be used in place of `decide`.\n```lean\nexample : 1 + 1 = 2 := by decide\nexample : 1 + 1 = 2 := by rfl\n```\n</code>",
 "53": "<code>Solution.large : Nat</code>",
 "52":
 "<code>LT.lt.{u} {α : Type u} [self : LT α] : α → α → Prop</code><span class=\"sep\"></span><code class=\"docstring\">The less-than relation: `x &lt; y` \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `&lt;` in identifiers is `lt`.</code>",
 "51":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;21&quot;:{&quot;binding&quot;:&quot;const-Solution.large&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Solution.large_lt&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Solution.large_lt&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,81,&quot;37&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[7,21,&quot;large&quot;]]]]]]]]]]]]]}\">Solution.large_lt : 37 &lt; large</code>",
 "50":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Solution.large&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Solution.large&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,5,&quot;Nat&quot;]]]]]]]]]}\">Solution.large : Nat</code>",
 "5":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.1675&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1675&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.1675&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-square_of_odd_is_odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.1675&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;square_of_odd_is_odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;odd&quot;]]],[4,1,[6,[3,2,[7,337,&quot;n&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;odd&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,5457,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,1365,&quot;n&quot;]]]]]]]],&quot;)&quot;]]]]]]]]]]]]]]]]]]]]]}\">square_of_odd_is_odd {n : Nat} : odd n → odd (n * n)</code>",
 "49":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;21&quot;:{&quot;binding&quot;:&quot;const-large&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-large_lt&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;large_lt&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,81,&quot;37&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[7,21,&quot;large&quot;]]]]]]]]]]]]]}\">large_lt : 37 &lt; large</code>",
 "48":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-large&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;large&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,5,&quot;Nat&quot;]]]]]]]]]}\">large : Nat</code>",
 "47":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.4159&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.4159&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;var-_uniq.4159&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;reverse&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;List&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;List&quot;]]],[4,1,[6,[3,2,[7,341,&quot;α&quot;]]]]]]]]]]]]]]]]]]]]}\">reverse.{u_1} {α : Type u_1} : List α → List α</code>",
 "46":
 "<code class=\"docstring\">`#eval e` evaluates the expression `e` by compiling it and running the compiled code. It then\nprints the resulting value.\n\n* The command attempts to use `ToExpr`, `Repr`, or `ToString` instances to print the result.\n* If `e` is a monadic value of type `m ty`, then the command tries to adapt the monad `m`\n  to one of the monads that `#eval` supports, which include `IO`, `CoreM`, `MetaM`, `TermElabM`, and `CommandElabM`.\n  Users can define `MonadEval` instances to extend the list of supported monads.\n\nThe `#eval` command gracefully degrades in capability depending on what is imported.\nImporting the `Lean.Elab.Command` module provides full capabilities.\n\nDue to unsoundness, `#eval` refuses to evaluate expressions that depend on `sorry`, even indirectly,\nsince the presence of `sorry` can lead to runtime instability and crashes.\nThis check can be overridden with the `#eval! e` command.\n\nOptions:\n* If `eval.pp` is true (default: true) then tries to use `ToExpr` instances to make use of the\n  usual pretty printer. Otherwise, only tries using `Repr` and `ToString` instances.\n* If `eval.type` is true (default: false) then pretty prints the type of the evaluated value.\n* If `eval.derive.repr` is true (default: true) then attempts to auto-derive a `Repr` instance\n  when there is no other way to print the result.\n\nSee also: `#reduce e` for evaluation by term reduction.\n</code>",
 "45":
 "<code>List.cons.{u} {α : Type u} (head : α) (tail : List α) : List α</code><span class=\"sep\"></span><code class=\"docstring\">The list whose first element is `head`, where `tail` is the rest of the list.\nUsually written `head :: tail`.\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `::` in identifiers is `cons`.\n\n * The recommended spelling of `[a]` in identifiers is `singleton`.</code>",
 "44": "<code>reverse (xs ++ ys) = reverse ys ++ reverse xs</code>",
 "43": "<code>α</code>",
 "42":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1105&quot;:{&quot;binding&quot;:&quot;var-_uniq.622&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1296&quot;:{&quot;binding&quot;:&quot;const-reverse&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;272&quot;:{&quot;binding&quot;:&quot;const-reverse&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;277&quot;:{&quot;binding&quot;:&quot;var-_uniq.386&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;325&quot;:{&quot;binding&quot;:&quot;var-_uniq.386&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-reverse&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;var-_uniq.622&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,272,&quot;reverse&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,1105,&quot;xs&quot;]]],[4,[4,&quot; ++&quot;,1],[6,[3,2,[7,277,&quot;ys&quot;]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,1296,&quot;reverse&quot;]]],[4,1,[6,[3,2,[7,325,&quot;ys&quot;]]]]]]],[4,[4,&quot; ++&quot;,1],[6,[3,2,[4,[6,[3,2,[7,336,&quot;reverse&quot;]]],[4,1,[6,[3,2,[7,85,&quot;xs&quot;]]]]]]]]]]]]]]]]}\">reverse (xs ++ ys) = reverse ys ++ reverse xs</code>",
 "41":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;var-_uniq.466&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;α&quot;]]]]}\">α</code>",
 "40":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1360&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.707&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1364&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.707&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.707&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.708&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.709&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;var-_uniq.707&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;List.cons&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;head&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;α&quot;]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;tail&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;List&quot;]]],[4,1,[6,[3,2,[7,1361,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,1364,&quot;List&quot;]]],[4,1,[6,[3,2,[7,1365,&quot;α&quot;]]]]]]]]]]]]]]]]]]]}\">List.cons.{u} {α : Type u} (head : α) (tail : List α) : List α</code><span class=\"sep\"></span><code class=\"docstring\">The list whose first element is `head`, where `tail` is the rest of the list.\nUsually written `head :: tail`.\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `::` in identifiers is `cons`.\n\n * The recommended spelling of `[a]` in identifiers is `singleton`.</code>",
 "4": "<code>Nat</code>",
 "39":
 "<code>List.nil.{u} {α : Type u} : List α</code><span class=\"sep\"></span><code class=\"docstring\">The empty list, usually written `[]`. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `[]` in identifiers is `nil`.</code>",
 "38":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.703&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;var-_uniq.703&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;List.nil&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,84,&quot;List&quot;]]],[4,1,[6,[3,2,[7,85,&quot;α&quot;]]]]]]]]]]]]]]]}\">List.nil.{u} {α : Type u} : List α</code><span class=\"sep\"></span><code class=\"docstring\">The empty list, usually written `[]`. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `[]` in identifiers is `nil`.</code>",
 "37":
 "<code class=\"docstring\">After `with`, there is an optional tactic that runs on all branches, and\nthen a list of alternatives.\n</code>",
 "36":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.466&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;List&quot;]]],[4,1,[6,[3,2,[7,5,&quot;α&quot;]]]]]]]]}\">List α</code>",
 "35":
 "<code class=\"docstring\">Assuming `x` is a variable in the local context with an inductive type,\n`induction x` applies induction on `x` to the main goal,\nproducing one goal for each constructor of the inductive type,\nin which the target is replaced by a general instance of that constructor\nand an inductive hypothesis is added for each recursive argument to the constructor.\nIf the type of an element in the local context depends on `x`,\nthat element is reverted and reintroduced afterward,\nso that the inductive hypothesis incorporates that hypothesis as well.\n\nFor example, given `n : Nat` and a goal with a hypothesis `h : P n` and target `Q n`,\n`induction n` produces one goal with hypothesis `h : P 0` and target `Q 0`,\nand one goal with hypotheses `h : P (Nat.succ a)` and `ih₁ : P a → Q a` and target `Q (Nat.succ a)`.\nHere the names `a` and `ih₁` are chosen automatically and are not accessible.\nYou can use `with` to provide the variables names for each constructor.\n- `induction e`, where `e` is an expression instead of a variable,\n  generalizes `e` in the goal, and then performs induction on the resulting variable.\n- `induction e using r` allows the user to specify the principle of induction that should be used.\n  Here `r` should be a term whose result type must be of the form `C t`,\n  where `C` is a bound variable and `t` is a (possibly empty) sequence of bound variables\n- `induction e generalizing z₁ ... zₙ`, where `z₁ ... zₙ` are variables in the local context,\n  generalizes over `z₁ ... zₙ` before applying the induction but then introduces them in each goal.\n  In other words, the net effect is that each inductive hypothesis is generalized.\n- Given `x : Nat`, `induction x with | zero =&gt; tac₁ | succ x' ih =&gt; tac₂`\n  uses tactic `tac₁` for the `zero` case, and `tac₂` for the `succ` case.\n</code>",
 "34":
 "<code>HAppend.hAppend.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HAppend α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a ++ b` is the result of concatenation of `a` and `b`, usually read \"append\".\nThe meaning of this notation is type-dependent. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `++` in identifiers is `append`.</code>",
 "33": "<code>reverse.{u_1} {α : Type u_1} : List α → List α</code>",
 "32":
 "<code>List.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">Linked lists: ordered lists, in which each element has a reference to the next element.\n\nMost operations on linked lists take time proportional to the length of the list, because each\nelement must be traversed to find the next element.\n\n`List α` is isomorphic to `Array α`, but they are useful for different things:\n* `List α` is easier for reasoning, and `Array α` is modeled as a wrapper around `List α`.\n* `List α` works well as a persistent data structure, when many copies of the tail are shared. When\n  the value is not shared, `Array α` will have better performance because it can do destructive\n  updates.\n</code>",
 "31": "<code>List α</code>",
 "30":
 "<code class=\"docstring\">A type universe. `Type ≡ Type 0`, `Type u ≡ Sort (u + 1)`. </code>",
 "3":
 "<code class=\"docstring\">The universe of propositions. `Prop ≡ Sort 0`.\n\nEvery proposition is propositionally equal to either `True` or `False`. </code>",
 "29": "<code>Type u_1</code>",
 "28":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.701&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.701&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;var-_uniq.701&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;reverse&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;List&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;List&quot;]]],[4,1,[6,[3,2,[7,341,&quot;α&quot;]]]]]]]]]]]]]]]]]]]]}\">reverse.{u_1} {α : Type u_1} : List α → List α</code>",
 "27":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.701&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;List&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">List.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">Linked lists: ordered lists, in which each element has a reference to the next element.\n\nMost operations on linked lists take time proportional to the length of the list, because each\nelement must be traversed to find the next element.\n\n`List α` is isomorphic to `Array α`, but they are useful for different things:\n* `List α` is easier for reasoning, and `Array α` is modeled as a wrapper around `List α`.\n* `List α` works well as a persistent data structure, when many copies of the tail are shared. When\n  the value is not shared, `Array α` will have better performance because it can do destructive\n  updates.\n</code>",
 "26":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.380&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;List&quot;]]],[4,1,[6,[3,2,[7,5,&quot;α&quot;]]]]]]]]}\">List α</code>",
 "25":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1360&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.701&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.701&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.702&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;349265&quot;:{&quot;binding&quot;:&quot;var-_uniq.702&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;349456&quot;:{&quot;binding&quot;:&quot;const-reverse&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.703&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87312&quot;:{&quot;binding&quot;:&quot;const-reverse&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87317&quot;:{&quot;binding&quot;:&quot;var-_uniq.703&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87365&quot;:{&quot;binding&quot;:&quot;var-_uniq.703&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87376&quot;:{&quot;binding&quot;:&quot;const-reverse&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;reverse_append&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[4,&quot;xs&quot;,1],[4,[7,8,&quot;ys&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;List&quot;]]],[4,1,[6,[3,2,[7,1361,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,87312,&quot;reverse&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,349265,&quot;xs&quot;]]],[4,[4,&quot; ++&quot;,1],[6,[3,2,[7,87317,&quot;ys&quot;]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,349456,&quot;reverse&quot;]]],[4,1,[6,[3,2,[7,87365,&quot;ys&quot;]]]]]]],[4,[4,&quot; ++&quot;,1],[6,[3,2,[4,[6,[3,2,[7,87376,&quot;reverse&quot;]]],[4,1,[6,[3,2,[7,21845,&quot;xs&quot;]]]]]]]]]]]]]]]]]]]]]]]]]}\">reverse_append.{u_1} {α : Type u_1} (xs ys : List α) : reverse (xs ++ ys) = reverse ys ++ reverse xs</code>",
 "24":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.15&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;List&quot;]]],[4,1,[6,[3,2,[7,5,&quot;α&quot;]]]]]]]]}\">List α</code>",
 "23":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;var-_uniq.15&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;α&quot;]]]]}\">α</code>",
 "22":
 "<code data-rich-format=\"{&quot;annotations&quot;:{},&quot;fmt&quot;:[6,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]]]}\">Type u_1</code>",
 "21":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.216&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;List&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">List.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">Linked lists: ordered lists, in which each element has a reference to the next element.\n\nMost operations on linked lists take time proportional to the length of the list, because each\nelement must be traversed to find the next element.\n\n`List α` is isomorphic to `Array α`, but they are useful for different things:\n* `List α` is easier for reasoning, and `Array α` is modeled as a wrapper around `List α`.\n* `List α` works well as a persistent data structure, when many copies of the tail are shared. When\n  the value is not shared, `Array α` will have better performance because it can do destructive\n  updates.\n</code>",
 "20":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.216&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.216&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;var-_uniq.216&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;reverse&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;List&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;List&quot;]]],[4,1,[6,[3,2,[7,341,&quot;α&quot;]]]]]]]]]]]]]]]]]]]]}\">reverse.{u_1} {α : Type u_1} : List α → List α</code>",
 "2":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;sort-7243200735919010059&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,5,&quot;Type&quot;]]]]]]]]]}\">Nat : Type</code><span class=\"sep\"></span><code class=\"docstring\">The natural numbers, starting at zero.\n\nThis type is special-cased by both the kernel and the compiler, and overridden with an efficient\nimplementation. Both use a fast arbitrary-precision arithmetic library (usually\n[GMP](https://gmplib.org/)); at runtime, `Nat` values that are sufficiently small are unboxed.\n</code>",
 "19":
 "<code class=\"docstring\">`lia` solves linear integer arithmetic goals.\n\nIt is a implemented as a thin wrapper around the `grind` tactic, enabling only the `lia` solver.\nPlease use `grind` instead if you need additional capabilities.\n</code>",
 "18":
 "<code class=\"docstring\">`exists e₁, e₂, ...` is shorthand for `refine ⟨e₁, e₂, ...⟩; try trivial`.\nIt is useful for existential goals.\n</code>",
 "17":
 "<code>Exists.{u} {α : Sort u} (p : α → Prop) : Prop</code><span class=\"sep\"></span><code class=\"docstring\">Existential quantification. If `p : α → Prop` is a predicate, then `∃ x : α, p x`\nasserts that there is some `x` of type `α` such that `p x` holds.\nTo create an existential proof, use the `exists` tactic,\nor the anonymous constructor notation `⟨x, h⟩`.\nTo unpack an existential, use `cases h` where `h` is a proof of `∃ x : α, p x`,\nor `let ⟨x, hx⟩ := h` where `.\n\nBecause Lean has proof irrelevance, any two proofs of an existential are\ndefinitionally equal. One consequence of this is that it is impossible to recover the\nwitness of an existential from the mere fact of its existence.\nFor example, the following does not compile:\n```\nexample (h : ∃ x : Nat, x = x) : Nat :=\n  let ⟨x, _⟩ := h  -- fail, because the goal is `Nat : Type`\n  x\n```\nThe error message `recursor 'Exists.casesOn' can only eliminate into Prop` means\nthat this only works when the current goal is another proposition:\n```\nexample (h : ∃ x : Nat, x = x) : True :=\n  let ⟨x, _⟩ := h  -- ok, because the goal is `True : Prop`\n  trivial\n```\n</code>",
 "16":
 "<code class=\"docstring\">The `simp` tactic uses lemmas and hypotheses to simplify the main goal target or\nnon-dependent hypotheses. It has many variants:\n- `simp` simplifies the main goal target using lemmas tagged with the attribute `[simp]`.\n- `simp [h₁, h₂, ..., hₙ]` simplifies the main goal target using the lemmas tagged\n  with the attribute `[simp]` and the given `hᵢ`'s, where the `hᵢ`'s are expressions.-\n- If an `hᵢ` is a defined constant `f`, then `f` is unfolded. If `f` has equational lemmas associated\n  with it (and is not a projection or a `reducible` definition), these are used to rewrite with `f`.\n- `simp [*]` simplifies the main goal target using the lemmas tagged with the\n  attribute `[simp]` and all hypotheses.\n- `simp only [h₁, h₂, ..., hₙ]` is like `simp [h₁, h₂, ..., hₙ]` but does not use `[simp]` lemmas.\n- `simp [-id₁, ..., -idₙ]` simplifies the main goal target using the lemmas tagged\n  with the attribute `[simp]`, but removes the ones named `idᵢ`.\n- `simp at h₁ h₂ ... hₙ` simplifies the hypotheses `h₁ : T₁` ... `hₙ : Tₙ`. If\n  the target or another hypothesis depends on `hᵢ`, a new simplified hypothesis\n  `hᵢ` is introduced, but the old one remains in the local context.\n- `simp at *` simplifies all the hypotheses and the target.\n- `simp [*] at *` simplifies target and all (propositional) hypotheses using the\n  other hypotheses.\n</code>",
 "15":
 "<code>HAdd.hAdd.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HAdd α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a + b` computes the sum of `a` and `b`.\nThe meaning of this notation is type-dependent. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `+` in identifiers is `add`.</code>",
 "14":
 "<code>Eq.{u_1} {α : Sort u_1} : α → α → Prop</code><span class=\"sep\"></span><code class=\"docstring\">The equality relation. It has one introduction rule, `Eq.refl`.\nWe use `a = b` as notation for `Eq a b`.\nA fundamental property of equality is that it is an equivalence relation.\n```\nvariable (α : Type) (a b c d : α)\nvariable (hab : a = b) (hcb : c = b) (hcd : c = d)\n\nexample : a = d :=\n  Eq.trans (Eq.trans hab (Eq.symm hcb)) hcd\n```\nEquality is much more than an equivalence relation, however. It has the important property that every assertion\nrespects the equivalence, in the sense that we can substitute equal expressions without changing the truth value.\nThat is, given `h1 : a = b` and `h2 : p a`, we can construct a proof for `p b` using substitution: `Eq.subst h1 h2`.\nExample:\n```\nexample (α : Type) (a b : α) (p : α → Prop)\n        (h1 : a = b) (h2 : p a) : p b :=\n  Eq.subst h1 h2\n\nexample (α : Type) (a b : α) (p : α → Prop)\n    (h1 : a = b) (h2 : p a) : p b :=\n  h1 ▸ h2\n```\nThe triangle in the second presentation is a macro built on top of `Eq.subst` and `Eq.symm`, and you can enter it by typing `\\t`.\nFor more information: [Equality](https://lean-lang.org/theorem_proving_in_lean4/quantifiers_and_equality.html#equality)\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `=` in identifiers is `eq`.</code>",
 "13": "<code>n = 2 * k₁ + 1</code>",
 "12":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.182&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;325&quot;:{&quot;binding&quot;:&quot;var-_uniq.211&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,17,&quot;n&quot;]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,1297,&quot;2&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,325,&quot;k₁&quot;]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,21,&quot;1&quot;]]]]]]]]]]]]}\">n = 2 * k₁ + 1</code>",
 "11":
 "<code class=\"docstring\">Introduces one or more hypotheses, optionally naming and/or pattern-matching them.\nFor each hypothesis to be introduced, the remaining main goal's target type must\nbe a `let` or function type.\n\n* `intro` by itself introduces one anonymous hypothesis, which can be accessed\n  by e.g. `assumption`. It is equivalent to `intro _`.\n* `intro x y` introduces two hypotheses and names them. Individual hypotheses\n  can be anonymized via `_`, given a type ascription, or matched against a pattern:\n  ```lean\n  -- ... ⊢ α × β → ...\n  intro (a, b)\n  -- ..., a : α, b : β ⊢ ...\n  ```\n* `intro rfl` is short for `intro h; subst h`, if `h` is an equality where the left-hand or right-hand side\n  is a variable.\n* Alternatively, `intro` can be combined with pattern matching much like `fun`:\n  ```lean\n  intro\n  | n + 1, 0 =&gt; tac\n  | ...\n  ```\n</code>",
 "10":
 "<code>HMul.hMul.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HMul α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a * b` computes the product of `a` and `b`.\nThe meaning of this notation is type-dependent. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `*` in identifiers is `mul`.</code>",
 "1":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;Nat&quot;]]]]}\">Nat</code>",
 "0":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.138&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Prop&quot;]]]]]]]]]]]}\">odd (n : Nat) : Prop</code>"};

        document.querySelectorAll(".code-with-panel").forEach(setupBlock);

        Reveal.on("fragmentshown", onFragmentShown);
        Reveal.on("fragmenthidden", onFragmentHidden);
        Reveal.on("slidechanged", onSlideChanged);
        Reveal.on("resize", function () {
            document.querySelectorAll(".code-with-panel").forEach(function (el) {
                redrawFocusOutline(/** @type {PanelBlock} */ (el));
            });
        });
    }

    // ---- Per-block setup ----

    /** @param {Element} blockEl */
    function setupBlock(blockEl) {
        var block = /** @type {PanelBlock} */ (blockEl);
        var codeEl = /** @type {Element} */ (block.querySelector("code.hl.lean.block"));
        var panel = /** @type {InfoPanel} */ (block.querySelector(".info-panel"));
        if (!block.querySelector("code.hl.lean.block") || !block.querySelector(".info-panel"))
            return;

        block._activeSource = null;

        // Click handler on code element
        codeEl.addEventListener("click", function (e) {
            var chain = findClickableChain(/** @type {Element} */ (e.target), codeEl);
            var chosen = cycleClickable(block, chain);
            if (chosen) {
                clearHoverPreview(codeEl);
                updatePanel(panel, chosen, block);
            }
        });

        // Hover preview — show what would be selected on click
        codeEl.addEventListener("mouseover", function (e) {
            var chain = findClickableChain(/** @type {Element} */ (e.target), codeEl);
            var chosen = cycleClickable(block, chain);
            if (chosen && chosen !== block._activeSource) {
                clearHoverPreview(codeEl);
                chosen.classList.add("panel-hover");
                drawElementOutline(codeEl, chosen, "panel-outline-hover");
            } else {
                clearHoverPreview(codeEl);
            }
        });
        /** @type {HTMLElement} */ (codeEl).addEventListener("mouseout", function (e) {
            if (!e.relatedTarget || !codeEl.contains(/** @type {Node} */ (e.relatedTarget))) {
                clearHoverPreview(codeEl);
            }
        });

        // Binding highlighting — works across code and panel
        /** @param {Event} e */
        function onBindingOver(e) {
            var tok = /** @type {Element} */ (e.target).closest(".token[data-binding]");
            if (!tok) return;
            var binding = tok.getAttribute("data-binding");
            if (!binding) return;
            var sel = '.token[data-binding="' + binding + '"]';
            codeEl.querySelectorAll(sel).forEach(function (t) {
                t.classList.add("binding-hl");
            });
            panel.querySelectorAll(sel).forEach(function (t) {
                t.classList.add("binding-hl");
            });
        }
        /** @param {Event} e */
        function onBindingOut(e) {
            var tok = /** @type {Element} */ (e.target).closest(".token[data-binding]");
            if (!tok) return;
            codeEl.querySelectorAll(".token.binding-hl").forEach(function (t) {
                t.classList.remove("binding-hl");
            });
            panel.querySelectorAll(".token.binding-hl").forEach(function (t) {
                t.classList.remove("binding-hl");
            });
        }
        codeEl.addEventListener("mouseover", onBindingOver);
        codeEl.addEventListener("mouseout", onBindingOut);
        panel.addEventListener("mouseover", onBindingOver);
        panel.addEventListener("mouseout", onBindingOut);

        // Divider drag
        var divider = block.querySelector(".panel-divider");
        if (divider) setupDividerDrag(block, /** @type {HTMLElement} */ (divider));

        // ResizeObserver for reflowing rich format content and redrawing the
        // focus outline (the code may rewrap when the divider moves)
        if (typeof ResizeObserver !== "undefined") {
            /** @type {ReturnType<typeof setTimeout> | null} */
            var reflowTimer = null;
            var observer = new ResizeObserver(function () {
                if (reflowTimer) clearTimeout(reflowTimer);
                reflowTimer = setTimeout(function () {
                    reflowPanel(panel);
                    redrawFocusOutline(block);
                }, 100);
            });
            observer.observe(panel);
            observer.observe(codeEl);
        }
    }

    /** @param {Element} codeEl */
    function clearHoverPreview(codeEl) {
        codeEl.querySelectorAll(".panel-hover").forEach(function (el) {
            el.classList.remove("panel-hover");
        });
        setOutlinePath(codeEl, "panel-outline-hover", "");
    }

    // ---- Focus/hover outline overlay ----
    //
    // CSS `outline` on an inline element that wraps across lines is drawn as a
    // separate closed box per line fragment in Firefox and Safari (only
    // Chromium merges the fragments). To get one contiguous border in every
    // browser we draw it ourselves: merge the element's client rects (one per
    // line) into a single staircase polygon and stroke it in an SVG overlay.

    var SVG_NS = "http://www.w3.org/2000/svg";

    /**
     * Get (or create) the outline overlay for a code block, with one path for
     * the focused element and one for the hover preview.
     * @param {Element} codeEl
     * @return {SVGSVGElement}
     */
    function ensureOutlineSvg(codeEl) {
        var existing = codeEl.querySelector(":scope > svg.panel-outline-svg");
        if (existing) return /** @type {SVGSVGElement} */ (existing);
        var svg = /** @type {SVGSVGElement} */ (document.createElementNS(SVG_NS, "svg"));
        svg.setAttribute("class", "panel-outline-svg");
        svg.setAttribute("aria-hidden", "true");
        ["panel-outline-focus", "panel-outline-hover"].forEach(function (cls) {
            var path = document.createElementNS(SVG_NS, "path");
            path.setAttribute("class", cls);
            svg.appendChild(path);
        });
        codeEl.appendChild(svg);
        return svg;
    }

    /**
     * @param {Element} codeEl
     * @param {string} cls
     * @param {string} d
     */
    function setOutlinePath(codeEl, cls, d) {
        var svg = ensureOutlineSvg(codeEl);
        var path = svg.querySelector("." + cls);
        if (path) path.setAttribute("d", d);
    }

    /**
     * Merge an element's client rects into one rect per line.
     * @param {Element} el
     * @return {Array<{left: number, right: number, top: number, bottom: number}>}
     */
    function lineRects(el) {
        /** @type {Array<{left: number, right: number, top: number, bottom: number}>} */
        var lines = [];
        var rects = el.getClientRects();
        for (var i = 0; i < rects.length; i++) {
            var r = rects[i];
            if (r.width === 0 || r.height === 0) continue;
            var merged = false;
            for (var j = 0; j < lines.length; j++) {
                var ln = lines[j];
                // Same line if the vertical ranges mostly overlap
                var overlap = Math.min(ln.bottom, r.bottom) - Math.max(ln.top, r.top);
                if (overlap > 0.5 * Math.min(ln.bottom - ln.top, r.height)) {
                    ln.left = Math.min(ln.left, r.left);
                    ln.right = Math.max(ln.right, r.right);
                    ln.top = Math.min(ln.top, r.top);
                    ln.bottom = Math.max(ln.bottom, r.bottom);
                    merged = true;
                    break;
                }
            }
            if (!merged) lines.push({ left: r.left, right: r.right, top: r.top, bottom: r.bottom });
        }
        lines.sort(function (a, b) {
            return a.top - b.top;
        });
        return lines;
    }

    /**
     * Draw a single contiguous outline around all line fragments of `el`,
     * into the overlay path identified by `cls` ("" for el === null clears it).
     * @param {Element} codeEl
     * @param {Element | null} el
     * @param {string} cls
     */
    function drawElementOutline(codeEl, el, cls) {
        if (!el) {
            setOutlinePath(codeEl, cls, "");
            return;
        }
        var lines = lineRects(el);
        if (lines.length === 0) {
            setOutlinePath(codeEl, cls, "");
            return;
        }

        // Coordinates are computed relative to the SVG overlay itself, and
        // divided by the reveal.js zoom so they live in element-space pixels.
        var svg = ensureOutlineSvg(codeEl);
        var origin = svg.getBoundingClientRect();
        var scale =
            codeEl.getBoundingClientRect().width /
                /** @type {HTMLElement} */ (codeEl).offsetWidth || 1;
        var pad = 2; // outline offset, in element-space pixels

        /** @param {number} x */
        function relX(x) {
            return (x - origin.left) / scale;
        }
        /** @param {number} y */
        function relY(y) {
            return (y - origin.top) / scale;
        }

        var n = lines.length;
        // Vertical boundaries between consecutive lines, so adjacent fragments
        // share an edge instead of leaving a gap or double border.
        /** @type {number[]} */
        var bounds = [];
        for (var i = 0; i < n - 1; i++) {
            bounds.push(relY((lines[i].bottom + lines[i + 1].top) / 2));
        }

        /** @type {Array<{x: number, y: number}>} */
        var pts = [];
        /**
         * @param {number} x
         * @param {number} y
         */
        function pt(x, y) {
            // Skip zero-length jogs (e.g. consecutive lines with equal edges)
            var last = pts[pts.length - 1];
            if (last && Math.abs(last.x - x) < 0.5 && Math.abs(last.y - y) < 0.5) return;
            pts.push({ x: x, y: y });
        }

        // Clockwise: across the top, down the right side (jogging at each line
        // boundary), back across the bottom, and up the left side.
        pt(relX(lines[0].left) - pad, relY(lines[0].top) - pad);
        pt(relX(lines[0].right) + pad, relY(lines[0].top) - pad);
        for (var i = 0; i < n - 1; i++) {
            pt(relX(lines[i].right) + pad, bounds[i]);
            pt(relX(lines[i + 1].right) + pad, bounds[i]);
        }
        pt(relX(lines[n - 1].right) + pad, relY(lines[n - 1].bottom) + pad);
        pt(relX(lines[n - 1].left) - pad, relY(lines[n - 1].bottom) + pad);
        for (var i = n - 1; i > 0; i--) {
            pt(relX(lines[i].left) - pad, bounds[i - 1]);
            pt(relX(lines[i - 1].left) - pad, bounds[i - 1]);
        }

        setOutlinePath(codeEl, cls, roundedPathFrom(pts, 4));
    }

    /**
     * Build an SVG path for a closed polygon, rounding each corner with a
     * quadratic curve of the given radius (clamped to half of each adjacent
     * segment so short jogs stay well-formed).
     * @param {Array<{x: number, y: number}>} pts
     * @param {number} radius
     * @return {string}
     */
    function roundedPathFrom(pts, radius) {
        var n = pts.length;
        if (n < 3) return "";
        /** @type {string[]} */
        var parts = [];
        for (var i = 0; i < n; i++) {
            var prev = pts[(i + n - 1) % n];
            var cur = pts[i];
            var next = pts[(i + 1) % n];
            var inLen = Math.hypot(cur.x - prev.x, cur.y - prev.y);
            var outLen = Math.hypot(next.x - cur.x, next.y - cur.y);
            if (inLen === 0 || outLen === 0) {
                parts.push((i === 0 ? "M" : "L") + cur.x.toFixed(2) + " " + cur.y.toFixed(2));
                continue;
            }
            var r = Math.min(radius, inLen / 2, outLen / 2);
            // Corner start: back off along the incoming edge; corner end:
            // advance along the outgoing edge.
            var sx = cur.x + ((prev.x - cur.x) / inLen) * r;
            var sy = cur.y + ((prev.y - cur.y) / inLen) * r;
            var ex = cur.x + ((next.x - cur.x) / outLen) * r;
            var ey = cur.y + ((next.y - cur.y) / outLen) * r;
            parts.push(
                (i === 0 ? "M" : "L") + sx.toFixed(2) + " " + sy.toFixed(2),
                "Q" +
                    cur.x.toFixed(2) +
                    " " +
                    cur.y.toFixed(2) +
                    " " +
                    ex.toFixed(2) +
                    " " +
                    ey.toFixed(2),
            );
        }
        return parts.join(" ") + " Z";
    }

    /**
     * Redraw the focus outline of a block (e.g. after a resize or rewrap).
     * @param {PanelBlock} block
     */
    function redrawFocusOutline(block) {
        var codeEl = block.querySelector("code.hl.lean.block");
        if (!codeEl) return;
        drawElementOutline(codeEl, block._activeSource, "panel-outline-focus");
    }

    // ---- Clickable element discovery ----

    /**
     * @param {Element} el
     * @return {boolean}
     */
    function isClickable(el) {
        return (
            el.classList.contains("tactic") ||
            el.classList.contains("has-info") ||
            el.hasAttribute("data-verso-hover")
        );
    }

    /**
     * Collect clickable ancestors from target up to codeEl, outermost first.
     * @param {Element} target
     * @param {Element} codeEl
     * @return {Element[]}
     */
    function findClickableChain(target, codeEl) {
        /** @type {Element[]} */
        var chain = [];
        /** @type {Element | null} */
        var el = target;
        while (el && el !== codeEl) {
            if (isClickable(el)) chain.push(el);
            el = el.parentElement;
        }
        chain.reverse(); // outermost first
        return chain;
    }

    /**
     * Pick which element to select: outermost if nothing active in this chain,
     * otherwise cycle inward from the active element toward the click target.
     * @param {PanelBlock} block
     * @param {Element[]} chain
     * @return {Element | null}
     */
    function cycleClickable(block, chain) {
        if (chain.length === 0) return null;
        var active = block._activeSource;
        var idx = active ? chain.indexOf(active) : -1;
        if (idx >= 0 && idx < chain.length - 1) {
            return chain[idx + 1];
        }
        return chain[0];
    }

    // ---- Panel update ----

    /**
     * @param {InfoPanel} panel
     * @param {Element} el
     * @param {PanelBlock} block
     */
    function updatePanel(panel, el, block) {
        // Clear previous focus
        var codeEl = block.querySelector("code.hl.lean.block");
        if (codeEl) {
            codeEl.querySelectorAll(".panel-focus").forEach(function (f) {
                f.classList.remove("panel-focus");
            });
        }

        block._activeSource = el;
        el.classList.add("panel-focus");
        if (codeEl) drawElementOutline(codeEl, el, "panel-outline-focus");

        // Store the source element for reflow on resize
        panel._richFormatSource = null;

        /** @type {string | null} */
        var html = "";

        if (el.classList.contains("tactic")) {
            // `:scope >` restricts to this tactic's _own_ state. A tactic with nested child tactics
            // (e.g. a multi-step `rw`) holds its own `.tactic-state` as a direct child, after the
            // nested tactics. Each child has its own `.tactic-state`. It's important to avoid
            // selecting one of them by accident.
            var ts = el.querySelector(":scope > .tactic-state");
            if (ts) {
                var richFmt = ts.getAttribute("data-rich-format");
                if (richFmt && typeof goalsToHtml === "function") {
                    panel._richFormatSource = ts;
                    try {
                        var goalsData = JSON.parse(richFmt);
                        var result = goalsToHtml(goalsData);
                        // Pass 1: insert structural HTML so table layout computes cell widths
                        panel.innerHTML = '<span class="hl lean">' + result.html + "</span>";
                        // Pass 2: measure actual .type cell widths and format expressions
                        var measurer = getPanelMeasurer(panel);
                        fillReflowedSpans(panel, result.formats, measurer);
                        html = null; // already set innerHTML
                    } catch (e) {
                        html = '<span class="hl lean">' + ts.innerHTML + "</span>";
                        panel._richFormatSource = null;
                    }
                } else {
                    html = '<span class="hl lean">' + ts.innerHTML + "</span>";
                }
            }
        } else if (el.classList.contains("has-info")) {
            // `:scope >` ensures that nested info isn't chosen instead of this element's info.
            var msgs = el.querySelector(":scope > .hover-info.messages");
            if (msgs) html = '<span class="hl lean">' + msgs.innerHTML + "</span>";
        } else if (el.hasAttribute("data-verso-hover")) {
            var id = el.getAttribute("data-verso-hover");
            html = lookupHoverDoc(id);
        }

        if (html !== null) panel.innerHTML = html;

        // Check for reflowable signature format data in hover content
        var sigCode = panel.querySelector("code[data-rich-format]");
        if (sigCode && typeof formatToHtml === "function") {
            try {
                var fmtData = JSON.parse(sigCode.getAttribute("data-rich-format") || "{}");
                panel._richFormatSource = sigCode;
                var measurer = getPanelMeasurer(panel);
                var width =
                    panel.clientWidth -
                    parseFloat(getComputedStyle(panel).paddingLeft || "0") -
                    parseFloat(getComputedStyle(panel).paddingRight || "0");
                var rendered = formatToHtml(fmtData.fmt, fmtData.annotations, width, measurer);
                sigCode.innerHTML = '<span class="reflowed">' + rendered + "</span>";
            } catch (e) {
                // Fall back to plain text signature on error
                panel._richFormatSource = null;
            }
        }

        // Render docstrings with marked
        if (typeof marked !== "undefined") {
            var m = /** @type {typeof marked} */ (marked);
            panel.querySelectorAll(".docstring").forEach(function (ds) {
                ds.innerHTML = /** @type {string} */ (m.parse(ds.textContent || ""));
            });
        }
    }

    /**
     * Create a DOM measurer for text and element width measurement.
     * @param {HTMLElement} panel
     * @return {DOMMeasurer}
     */
    function getPanelMeasurer(panel) {
        return createDOMMeasurer(panel);
    }

    /**
     * Reflow the panel's rich format content at current width.
     * @param {InfoPanel} panel
     */
    function reflowPanel(panel) {
        var source = panel._richFormatSource;
        if (!source) return;
        var richFmt = source.getAttribute("data-rich-format");
        if (!richFmt) return;
        try {
            var parsed = JSON.parse(richFmt);
            // Detect whether this is goal data (array) or signature format data (has "fmt" key)
            if (Array.isArray(parsed) && typeof goalsToHtml === "function") {
                var result = goalsToHtml(parsed);
                panel.innerHTML = '<span class="hl lean">' + result.html + "</span>";
                var measurer = getPanelMeasurer(panel);
                fillReflowedSpans(panel, result.formats, measurer);
            } else if (parsed.fmt && typeof formatToHtml === "function") {
                var measurer = getPanelMeasurer(panel);
                var width =
                    panel.clientWidth -
                    parseFloat(getComputedStyle(panel).paddingLeft || "0") -
                    parseFloat(getComputedStyle(panel).paddingRight || "0");
                source.innerHTML =
                    '<span class="reflowed">' +
                    formatToHtml(parsed.fmt, parsed.annotations, width, measurer) +
                    "</span>";
            }
        } catch (e) {
            // Fall back to pre-rendered HTML on error
        }
    }

    /**
     * @param {string | null} id
     * @return {string}
     */
    function lookupHoverDoc(id) {
        if (!docsJson || !id) return "";
        var entry = docsJson[id];
        if (!entry) return "";
        // entry is the HTML string from verso hover data
        if (typeof entry === "string") {
            return '<span class="hl lean">' + entry + "</span>";
        }
        // Could be an object with .hover field
        if (entry.hover) {
            return '<span class="hl lean">' + entry.hover + "</span>";
        }
        return "";
    }

    // ---- Fragment automation ----

    /** @param {{ fragment: HTMLElement }} evt */
    function onFragmentShown(evt) {
        var frag = evt.fragment;
        if (!frag || !frag.classList.contains("slide-click-only")) return;

        var block = /** @type {PanelBlock | null} */ (frag.closest(".code-with-panel"));
        if (!block) return;

        var panel = /** @type {InfoPanel | null} */ (block.querySelector(".info-panel"));
        if (!panel) return;

        // Find the clickable element targeted by this fragment
        var target = frag.querySelector(".tactic, .has-info, [data-verso-hover]");
        if (target) updatePanel(panel, target, block);
    }

    /** @param {{ fragment: HTMLElement }} evt */
    function onFragmentHidden(evt) {
        var frag = evt.fragment;
        if (!frag || !frag.classList.contains("slide-click-only")) return;

        var block = /** @type {PanelBlock | null} */ (frag.closest(".code-with-panel"));
        if (!block) return;

        syncPanelToLastVisible(block);
    }

    function onSlideChanged() {
        var slide = Reveal.getCurrentSlide();
        if (!slide) return;
        slide.querySelectorAll(".code-with-panel").forEach(function (el) {
            syncPanelToLastVisible(/** @type {PanelBlock} */ (el));
        });
    }

    /** @param {PanelBlock} block */
    function syncPanelToLastVisible(block) {
        var panel = /** @type {InfoPanel | null} */ (block.querySelector(".info-panel"));
        if (!panel) return;

        // Find the last visible slide-click-only fragment
        var frags = block.querySelectorAll(".fragment.slide-click-only.visible");
        if (frags.length > 0) {
            var last = frags[frags.length - 1];
            var target = last.querySelector(".tactic, .has-info, [data-verso-hover]");
            if (target) {
                updatePanel(panel, target, block);
                return;
            }
        }

        // No visible fragments — clear panel
        var codeEl = block.querySelector("code.hl.lean.block");
        if (codeEl) {
            codeEl.querySelectorAll(".panel-focus").forEach(function (f) {
                f.classList.remove("panel-focus");
            });
            drawElementOutline(codeEl, null, "panel-outline-focus");
        }
        block._activeSource = null;
        panel.innerHTML = "";
    }

    // ---- Divider drag ----

    /**
     * @param {HTMLElement} block
     * @param {HTMLElement} divider
     */
    function setupDividerDrag(block, divider) {
        var dragging = false;

        divider.addEventListener("mousedown", function (e) {
            e.preventDefault();
            dragging = true;
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
        });

        document.addEventListener("mousemove", function (e) {
            if (!dragging) return;
            var rect = block.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var pct = x / rect.width;

            if (pct > 0.95) {
                // Collapse panel
                block.classList.add("panel-collapsed");
            } else {
                block.classList.remove("panel-collapsed");
                var codeFr = Math.max(0.2, Math.min(0.9, pct));
                var panelFr = 1 - codeFr;
                block.style.setProperty("--code-ratio", codeFr + "fr");
                block.style.setProperty("--panel-ratio", panelFr + "fr");
            }
        });

        document.addEventListener("mouseup", function () {
            if (!dragging) return;
            dragging = false;
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        });
    }

    // ---- Entry point ----
    Reveal.on("ready", init);
})();
