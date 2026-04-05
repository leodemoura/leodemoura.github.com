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
        docsJson = {"99":
 "<code class=\"docstring\">A type universe. `Type ≡ Type 0`, `Type u ≡ Sort (u + 1)`. </code>",
 "98": "<code>Type u_1</code>",
 "97": "<code>α</code>",
 "96":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;var-_uniq.5&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,5,&quot;Nat&quot;]]]]]]]]]}\">α → Nat</code>",
 "95":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;var-_uniq.5&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;α&quot;]]]]}\">α</code>",
 "94":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.10348&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Lean.Grind.NatModule&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.10348&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Lean.Grind.NoNatZeroDivisors&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;[&quot;,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;NatModule&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],&quot;]&quot;]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,85,&quot;Prop&quot;]]]]]]]]]]]]]}\">Lean.Grind.NoNatZeroDivisors.{u} (α : Type u) [NatModule α] : Prop</code><span class=\"sep\"></span><code class=\"docstring\">We say a module has no natural number zero divisors if\n`k ≠ 0` and `k * a = k * b` implies `a = b` (here `k` is a natural number and `a` and `b` are element of the module).\n\nFor a module over the integers this is equivalent to\n`k ≠ 0` and `k * a = 0` implies `a = 0`.\n(See the alternative constructor `NoNatZeroDivisors.mk'`,\nand the theorem `eq_zero_of_mul_eq_zero`.)\n</code>",
 "93":
 "<code data-rich-format=\"{&quot;annotations&quot;:{},&quot;fmt&quot;:[6,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]]]}\">Type u_1</code>",
 "92":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.10348&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Lean.Grind.CommRing&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Lean.Grind.CommRing.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">A commutative ring, i.e. a ring with commutative multiplication.\n</code>",
 "91": "<code>p = 1</code>",
 "90":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1345&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.eq_one_of_dvd_one&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.eq_one_of_dvd_one&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;H&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1345,&quot;n&quot;]]],[4,[4,&quot; ∣&quot;,1],[6,[3,2,[7,337,&quot;1&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,1361,&quot;n&quot;]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[7,341,&quot;1&quot;]]]]]]]]]]]]]]]]]}\">Nat.eq_one_of_dvd_one {n : Nat} (H : n ∣ 1) : n = 1</code>",
 "9": "<code>odd (n : Nat) : Prop</code>",
 "89": "<code>p ∣ 1</code>",
 "88": "<code>p ∣ fac n</code>",
 "87":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1364&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Iff.mp&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5441&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.475&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Iff.mp&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[4,&quot;a&quot;,1],[4,[7,3,&quot;b&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;Prop&quot;]]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;self&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,5441,&quot;a&quot;]]],[4,[4,&quot; ↔&quot;,1],[6,[3,2,[7,1361,&quot;b&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,1364,&quot;a&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1365,&quot;b&quot;]]]]]]]]]]]]]]]]]]}\">Iff.mp {a b : Prop} (self : a ↔ b) : a → b</code><span class=\"sep\"></span><code class=\"docstring\">Modus ponens for if and only if. If `a ↔ b` and `a`, then `b`. </code>",
 "86":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1397841&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21825&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.475&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;349457&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;349461&quot;:{&quot;binding&quot;:&quot;var-_uniq.475&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.dvd_add_right&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.475&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87377&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.476&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.dvd_add_right&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[4,&quot;a&quot;,1],[4,[4,&quot;b&quot;,1],[4,[7,8,&quot;c&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,340,&quot;Nat&quot;]]],&quot;}&quot;]]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;h&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,21825,&quot;a&quot;]]],[4,[4,&quot; ∣&quot;,1],[6,[3,2,[7,5457,&quot;b&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,349457,&quot;a&quot;]]],[4,[4,&quot; ∣&quot;,1],[6,[3,2,[4,[6,[3,2,[7,1397841,&quot;b&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,349461,&quot;c&quot;]]]]]]]]]]],[4,[4,&quot; ↔&quot;,1],[6,[3,2,[4,[6,[3,2,[7,87377,&quot;a&quot;]]],[4,[4,&quot; ∣&quot;,1],[6,[3,2,[7,21845,&quot;c&quot;]]]]]]]]]]]]]]]]]]]]]}\">Nat.dvd_add_right {a b c : Nat} (h : a ∣ b) : a ∣ b + c ↔ a ∣ c</code>",
 "85":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.219&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,17,&quot;p&quot;]]],[4,[4,&quot; ∣&quot;,1],[6,[3,2,[7,5,&quot;1&quot;]]]]]]]]}\">p ∣ 1</code>",
 "84": "<code>p ≥ 2</code>",
 "83":
 "<code>LE.le.{u} {α : Type u} [self : LE α] : α → α → Prop</code><span class=\"sep\"></span><code class=\"docstring\">The less-equal relation: `x ≤ y` \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `≤` in identifiers is `le`.\n\n * The recommended spelling of `&lt;=` in identifiers is `le` (prefer `≤` over `&lt;=`).</code>",
 "82":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21825&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21841&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21844&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.fac&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-_private.Slides.0.PrimesExample.dvd_fac&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.475&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.476&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;PrimesExample.dvd_fac&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[4,&quot;m&quot;,1],[4,[7,3,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;Nat&quot;]]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;hm&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,5441,&quot;1&quot;]]],[4,[4,&quot; ≤&quot;,1],[6,[3,2,[7,1361,&quot;m&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;hmn&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,21825,&quot;m&quot;]]],[4,[4,&quot; ≤&quot;,1],[6,[3,2,[7,5457,&quot;n&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,21841,&quot;m&quot;]]],[4,[4,&quot; ∣&quot;,1],[6,[3,2,[4,[6,[3,2,[7,21844,&quot;fac&quot;]]],[4,1,[6,[3,2,[7,21845,&quot;n&quot;]]]]]]]]]]]]]]]]]]]]]]]}\">PrimesExample.dvd_fac {m n : Nat} (hm : 1 ≤ m) (hmn : m ≤ n) : m ∣ fac n</code>",
 "81":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.fac&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.2&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,17,&quot;p&quot;]]],[4,[4,&quot; ∣&quot;,1],[6,[3,2,[4,[6,[3,2,[7,20,&quot;fac&quot;]]],[4,1,[6,[3,2,[7,21,&quot;n&quot;]]]]]]]]]]]]}\">p ∣ fac n</code>",
 "80":
 "<code>False : Prop</code><span class=\"sep\"></span><code class=\"docstring\">`False` is the empty proposition. Thus, it has no introduction rules.\nIt represents a contradiction. `False` elimination rule, `False.rec`,\nexpresses the fact that anything follows from a contradiction.\nThis rule is sometimes called ex falso (short for ex falso sequitur quodlibet),\nor the principle of explosion.\nFor more information: [Propositional Logic](https://lean-lang.org/theorem_proving_in_lean4/propositions_and_proofs.html#propositional-logic)\n</code>",
 "8":
 "<code>Nat : Type</code><span class=\"sep\"></span><code class=\"docstring\">The natural numbers, starting at zero.\n\nThis type is special-cased by both the kernel and the compiler, and overridden with an efficient\nimplementation. Both use a fast arbitrary-precision arithmetic library (usually\n[GMP](https://gmplib.org/)); at runtime, `Nat` values that are sufficiently small are unboxed.\n</code>",
 "79":
 "<code class=\"docstring\">`exfalso` converts a goal `⊢ tgt` into `⊢ False` by applying `False.elim`. </code>",
 "78": "<code>n ≥ p</code>",
 "77":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.2&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.219&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,17,&quot;n&quot;]]],[4,[4,&quot; ≥&quot;,1],[6,[3,2,[7,5,&quot;p&quot;]]]]]]]]}\">n ≥ p</code>",
 "76":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Or.inr&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.475&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Or.inr&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[4,&quot;a&quot;,1],[4,[7,3,&quot;b&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;Prop&quot;]]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;h&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,340,&quot;b&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,5457,&quot;a&quot;]]],[4,[4,&quot; ∨&quot;,1],[6,[3,2,[7,1365,&quot;b&quot;]]]]]]]]]]]]]]]]]}\">Or.inr {a b : Prop} (h : b) : a ∨ b</code><span class=\"sep\"></span><code class=\"docstring\">`Or.inr` is \"right injection\" into an `Or`. If `h : b` then `Or.inr h : a ∨ b`. </code>",
 "75": "<code>n &lt; p</code>",
 "74":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.2&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.219&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,17,&quot;n&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[7,5,&quot;p&quot;]]]]]]]]}\">n &lt; p</code>",
 "73":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Or.inl&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.475&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Or.inl&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[4,&quot;a&quot;,1],[4,[7,3,&quot;b&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;Prop&quot;]]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;h&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,340,&quot;a&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,5457,&quot;a&quot;]]],[4,[4,&quot; ∨&quot;,1],[6,[3,2,[7,1365,&quot;b&quot;]]]]]]]]]]]]]]]]]}\">Or.inl {a b : Prop} (h : a) : a ∨ b</code><span class=\"sep\"></span><code class=\"docstring\">`Or.inl` is \"left injection\" into an `Or`. If `h : a` then `Or.inl h : a ∨ b`. </code>",
 "72":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21777&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.lt_or_ge&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5445&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.lt_or_ge&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[4,&quot;n&quot;,1],[4,[7,3,&quot;m&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,21777,&quot;n&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[7,5445,&quot;m&quot;]]]]]]],[4,[4,&quot; ∨&quot;,1],[6,[3,2,[4,[6,[3,2,[7,5457,&quot;n&quot;]]],[4,[4,&quot; ≥&quot;,1],[6,[3,2,[7,1365,&quot;m&quot;]]]]]]]]]]]]]]]]]]]}\">Nat.lt_or_ge (n m : Nat) : n &lt; m ∨ n ≥ m</code>",
 "71":
 "<code class=\"docstring\">Assuming `x` is a variable in the local context with an inductive type,\n`cases x` splits the main goal, producing one goal for each constructor of the\ninductive type, in which the target is replaced by a general instance of that constructor.\nIf the type of an element in the local context depends on `x`,\nthat element is reverted and reintroduced afterward,\nso that the case split affects that hypothesis as well.\n`cases` detects unreachable cases and closes them automatically.\n\nFor example, given `n : Nat` and a goal with a hypothesis `h : P n` and target `Q n`,\n`cases n` produces one goal with hypothesis `h : P 0` and target `Q 0`,\nand one goal with hypothesis `h : P (Nat.succ a)` and target `Q (Nat.succ a)`.\nHere the name `a` is chosen automatically and is not accessible.\nYou can use `with` to provide the variables names for each constructor.\n- `cases e`, where `e` is an expression instead of a variable, generalizes `e` in the goal,\n  and then cases on the resulting variable.\n- Given `as : List α`, `cases as with | nil =&gt; tac₁ | cons a as' =&gt; tac₂`,\n  uses tactic `tac₁` for the `nil` case, and `tac₂` for the `cons` case,\n  and `a` and `as'` are used as names for the new variables introduced.\n- `cases h : e`, where `e` is a variable or an expression,\n  performs cases on `e` as above, but also adds a hypothesis `h : e = ...` to each goal,\n  where `...` is the constructor instance for that particular case.\n</code>",
 "70":
 "<code class=\"docstring\">`refine e` behaves like `exact e`, except that named (`?x`) or unnamed (`?_`)\nholes in `e` that are not solved by unification with the main goal's target type\nare converted into new goals, using the hole's name, if any, as the goal case name.\n</code>",
 "7":
 "<code class=\"docstring\">`by tac` constructs a term of the expected type by running the tactic(s) `tac`. </code>",
 "69":
 "<code>Dvd.dvd.{u_1} {α : Type u_1} [self : Dvd α] : α → α → Prop</code><span class=\"sep\"></span><code class=\"docstring\">Divisibility. `a ∣ b` (typed as `\\|`) means that there is some `c` such that `b = a * c`. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `∣` in identifiers is `dvd`.</code>",
 "68": "<code>p ∣ fac n + 1</code>",
 "67": "<code>prime p</code>",
 "66": "<code>fac n + 1 ≥ 2</code>",
 "65":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1345&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1360&quot;:{&quot;binding&quot;:&quot;const-Exists&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.478&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-_private.Slides.0.PrimesExample.exists_prime_dvd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.479&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87364&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.prime&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87365&quot;:{&quot;binding&quot;:&quot;var-_uniq.479&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87377&quot;:{&quot;binding&quot;:&quot;var-_uniq.479&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;PrimesExample.exists_prime_dvd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;h&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1345,&quot;n&quot;]]],[4,[4,&quot; ≥&quot;,1],[6,[3,2,[7,337,&quot;2&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[7,1360,&quot;∃&quot;],[4,1,[4,[7,8,&quot;p&quot;],[4,[4,&quot;,&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,87364,&quot;prime&quot;]]],[4,1,[6,[3,2,[7,87365,&quot;p&quot;]]]]]]],[4,[4,&quot; ∧&quot;,1],[6,[3,2,[4,[6,[3,2,[7,87377,&quot;p&quot;]]],[4,[4,&quot; ∣&quot;,1],[6,[3,2,[7,21845,&quot;n&quot;]]]]]]]]]]]]]]]]]]]]]]]]]]]}\">PrimesExample.exists_prime_dvd {n : Nat} (h : n ≥ 2) : ∃ p, prime p ∧ p ∣ n</code>",
 "64":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;324&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.fac&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;325&quot;:{&quot;binding&quot;:&quot;var-_uniq.2&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,17,&quot;p&quot;]]],[4,[4,&quot; ∣&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,324,&quot;fac&quot;]]],[4,1,[6,[3,2,[7,325,&quot;n&quot;]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,21,&quot;1&quot;]]]]]]]]]]]]}\">p ∣ fac n + 1</code>",
 "63":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.prime&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.219&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;prime&quot;]]],[4,1,[6,[3,2,[7,5,&quot;p&quot;]]]]]]]]}\">prime p</code>",
 "62":
 "<code class=\"docstring\">The `obtain` tactic is a combination of `have` and `rcases`. See `rcases` for\na description of supported patterns.\n\n```lean\nobtain ⟨patt⟩ : type := proof\n```\nis equivalent to\n```lean\nhave h : type := proof\nrcases h with ⟨patt⟩\n```\n\nIf `⟨patt⟩` is omitted, `rcases` will try to infer the pattern.\n\nIf `type` is omitted, `:= proof` is required.\n</code>",
 "61":
 "<code class=\"docstring\">The `omega` tactic, for resolving integer and natural linear arithmetic problems.\n\nIt is not yet a full decision procedure (no \"dark\" or \"grey\" shadows),\nbut should be effective on many problems.\n\nWe handle hypotheses of the form `x = y`, `x &lt; y`, `x ≤ y`, and `k ∣ x` for `x y` in `Nat` or `Int`\n(and `k` a literal), along with negations of these statements.\n\nWe decompose the sides of the inequalities as linear combinations of atoms.\n\nIf we encounter `x / k` or `x % k` for literal integers `k` we introduce new auxiliary variables\nand the relevant inequalities.\n\nOn the first pass, we do not perform case splits on natural subtraction.\nIf `omega` fails, we recursively perform a case split on\na natural subtraction appearing in a hypothesis, and try again.\n\nThe options\n```\nomega +splitDisjunctions +splitNatSub +splitNatAbs +splitMinMax\n```\ncan be used to:\n* `splitDisjunctions`: split any disjunctions found in the context,\n  if the problem is not otherwise solvable.\n* `splitNatSub`: for each appearance of `((a - b : Nat) : Int)`, split on `a ≤ b` if necessary.\n* `splitNatAbs`: for each appearance of `Int.natAbs a`, split on `0 ≤ a` if necessary.\n* `splitMinMax`: for each occurrence of `min a b`, split on `min a b = a ∨ min a b = b`\nCurrently, all of these are on by default.\n</code>",
 "60":
 "<code>GE.ge.{u} {α : Type u} [LE α] (a b : α) : Prop</code><span class=\"sep\"></span><code class=\"docstring\">`a ≥ b` is an abbreviation for `b ≤ a`. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `≥` in identifiers is `ge`.\n\n * The recommended spelling of `&gt;=` in identifiers is `ge` (prefer `≥` over `&gt;=`).</code>",
 "6":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1550&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Prop&quot;]]]]]]]]]]]}\">odd (n : Nat) : Prop</code>",
 "59":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.fac&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.fac_pos&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;PrimesExample.fac_pos&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,337,&quot;0&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[4,[6,[3,2,[7,340,&quot;fac&quot;]]],[4,1,[6,[3,2,[7,341,&quot;n&quot;]]]]]]]]]]]]]]]]]]]}\">PrimesExample.fac_pos (n : Nat) : 0 &lt; fac n</code>",
 "58":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1092&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.fac&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1093&quot;:{&quot;binding&quot;:&quot;var-_uniq.2&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,1092,&quot;fac&quot;]]],[4,1,[6,[3,2,[7,1093,&quot;n&quot;]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,69,&quot;1&quot;]]]]]]],[4,[4,&quot; ≥&quot;,1],[6,[3,2,[7,5,&quot;2&quot;]]]]]]]]}\">fac n + 1 ≥ 2</code>",
 "57":
 "<code class=\"docstring\">The `have` tactic is for adding opaque definitions and hypotheses to the local context of the main goal.\nThe definitions forget their associated value and cannot be unfolded, unlike definitions added by the `let` tactic.\n\n* `have h : t := e` adds the hypothesis `h : t` if `e` is a term of type `t`.\n* `have h := e` uses the type of `e` for `t`.\n* `have : t := e` and `have := e` use `this` for the name of the hypothesis.\n* `have pat := e` for a pattern `pat` is equivalent to `match e with | pat =&gt; _`,\n  where `_` stands for the tactics that follow this one.\n  It is convenient for types that have only one applicable constructor.\n  For example, given `h : p ∧ q ∧ r`, `have ⟨h₁, h₂, h₃⟩ := h` produces the\n  hypotheses `h₁ : p`, `h₂ : q`, and `h₃ : r`.\n* The syntax `have (eq := h) pat := e` is equivalent to `match h : e with | pat =&gt; _`,\n  which adds the equation `h : e = pat` to the local context.\n\nThe tactic supports all the same syntax variants and options as the `have` term.\n\n## Properties and relations\n\n* It is not possible to unfold a variable introduced using `have`, since the definition's value is forgotten.\n  The `let` tactic introduces definitions that can be unfolded.\n* The `have h : t := e` is like doing `let h : t := e; clear_value h`.\n* The `have` tactic is preferred for propositions, and `let` is preferred for non-propositions.\n* Sometimes `have` is used for non-propositions to ensure that the variable is never unfolded,\n  which may be important for performance reasons.\n    Consider using the equivalent `let +nondep` to indicate the intent.\n\n</code>",
 "56": "<code>PrimesExample.prime (p : Nat) : Prop</code>",
 "55":
 "<code>And (a b : Prop) : Prop</code><span class=\"sep\"></span><code class=\"docstring\">`And a b`, or `a ∧ b`, is the conjunction of propositions. It can be\nconstructed and destructed like a pair: if `ha : a` and `hb : b` then\n`⟨ha, hb⟩ : a ∧ b`, and if `h : a ∧ b` then `h.left : a` and `h.right : b`.\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `∧` in identifiers is `and`.\n\n * The recommended spelling of `/\\` in identifiers is `and` (prefer `∧` over `/\\`).</code>",
 "54":
 "<code>GT.gt.{u} {α : Type u} [LT α] (a b : α) : Prop</code><span class=\"sep\"></span><code class=\"docstring\">`a &gt; b` is an abbreviation for `b &lt; a`. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `&gt;` in identifiers is `gt`.</code>",
 "53":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.prime&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;PrimesExample.prime&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;p&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Prop&quot;]]]]]]]]]]]}\">PrimesExample.prime (p : Nat) : Prop</code>",
 "52":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21829&quot;:{&quot;binding&quot;:&quot;var-_uniq.473&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Exists&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.inf_primes&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5460&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.prime&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5461&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87313&quot;:{&quot;binding&quot;:&quot;var-_uniq.474&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;PrimesExample.inf_primes&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[7,336,&quot;∃&quot;],[4,1,[4,[7,3,&quot;p&quot;],[4,[4,&quot;,&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,87313,&quot;p&quot;]]],[4,[4,&quot; >&quot;,1],[6,[3,2,[7,21829,&quot;n&quot;]]]]]]],[4,[4,&quot; ∧&quot;,1],[6,[3,2,[4,[6,[3,2,[7,5460,&quot;prime&quot;]]],[4,1,[6,[3,2,[7,5461,&quot;p&quot;]]]]]]]]]]]]]]]]]]]]]]]]]}\">PrimesExample.inf_primes (n : Nat) : ∃ p, p &gt; n ∧ prime p</code>",
 "51":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.543&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-Nat.succ&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;var-_uniq.543&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.succ_pos&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.succ_pos&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,337,&quot;0&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[4,[6,[3,2,[7,341,&quot;n&quot;]]],[4,&quot;.&quot;,[7,340,&quot;succ&quot;]]]]]]]]]]]]]]]]]}\">Nat.succ_pos (n : Nat) : 0 &lt; n.succ</code>",
 "50":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.543&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.544&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.544&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.mul_pos&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.544&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.545&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87377&quot;:{&quot;binding&quot;:&quot;var-_uniq.543&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.546&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.mul_pos&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[4,&quot;n&quot;,1],[4,[7,3,&quot;m&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;Nat&quot;]]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;hn&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,5441,&quot;0&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[7,1361,&quot;n&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;hm&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,21825,&quot;0&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[7,5457,&quot;m&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,21841,&quot;0&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[4,[6,[3,2,[7,87377,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,21845,&quot;m&quot;]]]]]]]]]]]]]]]]]]]]]]]}\">Nat.mul_pos {n m : Nat} (hn : 0 &lt; n) (hm : 0 &lt; m) : 0 &lt; n * m</code>",
 "5":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.1550&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1550&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.1550&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-square_of_odd_is_odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.1550&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;square_of_odd_is_odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;odd&quot;]]],[4,1,[6,[3,2,[7,337,&quot;n&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;odd&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,5457,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,1365,&quot;n&quot;]]]]]]]],&quot;)&quot;]]]]]]]]]]]]]]]]]]]]]}\">square_of_odd_is_odd {n : Nat} : odd n → odd (n * n)</code>",
 "49":
 "<code class=\"docstring\">`exact e` closes the main goal if its target type matches that of `e`.\n</code>",
 "48": "<code>0 &lt; fac n</code>",
 "47":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;20&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.fac&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.517&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,17,&quot;0&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[4,[6,[3,2,[7,20,&quot;fac&quot;]]],[4,1,[6,[3,2,[7,21,&quot;n&quot;]]]]]]]]]]]]}\">0 &lt; fac n</code>",
 "46":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.543&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.succ&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.succ&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Nat&quot;]]]]]]]]]]]}\">Nat.succ (n : Nat) : Nat</code><span class=\"sep\"></span><code class=\"docstring\">The successor of a natural number `n`.\n\nUsing `Nat.succ n` should usually be avoided in favor of `n + 1`, which is the [simp normal\nform](https://lean-lang.org/doc/reference/4.29.0/find/?domain=Verso.Genre.Manual.section&name=simp-normal-forms).\n</code>",
 "45": "<code>PrimesExample.fac : Nat → Nat</code>",
 "44":
 "<code>LT.lt.{u} {α : Type u} [self : LT α] : α → α → Prop</code><span class=\"sep\"></span><code class=\"docstring\">The less-than relation: `x &lt; y` \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `&lt;` in identifiers is `lt`.</code>",
 "43":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.543&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.fac&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;var-_uniq.543&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.fac_pos&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;PrimesExample.fac_pos&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,337,&quot;0&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[4,[6,[3,2,[7,340,&quot;fac&quot;]]],[4,1,[6,[3,2,[7,341,&quot;n&quot;]]]]]]]]]]]]]]]]]]]}\">PrimesExample.fac_pos (n : Nat) : 0 &lt; fac n</code>",
 "42":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-PrimesExample.fac&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;PrimesExample.fac&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,21,&quot;Nat&quot;]]]]]]]]]]]]]]}\">PrimesExample.fac : Nat → Nat</code>",
 "41":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21777&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.15220&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.mul_comm&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5445&quot;:{&quot;binding&quot;:&quot;var-_uniq.15220&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.15220&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.mul_comm&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[4,&quot;n&quot;,1],[4,[7,3,&quot;m&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,21777,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,5445,&quot;m&quot;]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[7,5457,&quot;m&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,1365,&quot;n&quot;]]]]]]]]]]]]]]]]]]]}\">Nat.mul_comm (n m : Nat) : n * m = m * n</code>",
 "40":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21777&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.15220&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.add_comm&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5445&quot;:{&quot;binding&quot;:&quot;var-_uniq.15220&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.15220&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.add_comm&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[4,&quot;n&quot;,1],[4,[7,3,&quot;m&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,21777,&quot;n&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,5445,&quot;m&quot;]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[7,5457,&quot;m&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,1365,&quot;n&quot;]]]]]]]]]]]]]]]]]]]}\">Nat.add_comm (n m : Nat) : n + m = m + n</code>",
 "4": "<code>Nat</code>",
 "39":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1397009&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21829&quot;:{&quot;binding&quot;:&quot;var-_uniq.15221&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.15221&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;349253&quot;:{&quot;binding&quot;:&quot;var-_uniq.15220&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;349457&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.add_mul&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.15221&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87365&quot;:{&quot;binding&quot;:&quot;var-_uniq.15221&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87377&quot;:{&quot;binding&quot;:&quot;var-_uniq.15220&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.add_mul&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[4,&quot;n&quot;,1],[4,[4,&quot;m&quot;,1],[4,[7,8,&quot;k&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,340,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,1397009,&quot;n&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,349253,&quot;m&quot;]]]]]]]],&quot;)&quot;]]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,21829,&quot;k&quot;]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,349457,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,87365,&quot;k&quot;]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[4,[6,[3,2,[7,87377,&quot;m&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,21845,&quot;k&quot;]]]]]]]]]]]]]]]]]]]]]]]}\">Nat.add_mul (n m k : Nat) : (n + m) * k = n * k + m * k</code>",
 "38":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.15221&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;349265&quot;:{&quot;binding&quot;:&quot;var-_uniq.15220&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;349457&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.mul_add&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.15221&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87313&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87317&quot;:{&quot;binding&quot;:&quot;var-_uniq.15221&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87365&quot;:{&quot;binding&quot;:&quot;var-_uniq.15220&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87377&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.mul_add&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[4,&quot;n&quot;,1],[4,[4,&quot;m&quot;,1],[4,[7,8,&quot;k&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,340,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,87313,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,349265,&quot;m&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,87317,&quot;k&quot;]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,349457,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,87365,&quot;m&quot;]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[4,[6,[3,2,[7,87377,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,21845,&quot;k&quot;]]]]]]]]]]]]]]]]]]]]]]]}\">Nat.mul_add (n m k : Nat) : n * (m + k) = n * m + n * k</code>",
 "37":
 "<code class=\"docstring\">`rw` is like `rewrite`, but also tries to close the goal by \"cheap\" (reducible) `rfl` afterwards.\n</code>",
 "36":
 "<code>HSub.hSub.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HSub α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a - b` computes the difference of `a` and `b`.\nThe meaning of this notation is type-dependent.\n* For natural numbers, this operator saturates at 0: `a - b = 0` when `a ≤ b`. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `-` in identifiers is `sub` (when used as a binary operator).</code>",
 "35":
 "<code>ite.{u} {α : Sort u} (c : Prop) [h : Decidable c] (t e : α) : α</code><span class=\"sep\"></span><code class=\"docstring\">`if c then t else e` is notation for `ite c t e`, \"if-then-else\", which decides to\nreturn `t` or `e` depending on whether `c` is true or false. The explicit argument\n`c : Prop` does not have any actual computational content, but there is an additional\n`[Decidable c]` argument synthesized by typeclass inference which actually\ndetermines how to evaluate `c` to true or false. Write `if h : c then t else e`\ninstead for a \"dependent if-then-else\" `dite`, which allows `t`/`e` to use the fact\nthat `c` is true/false.\n</code>",
 "34":
 "<code class=\"docstring\">* `unfold id` unfolds all occurrences of definition `id` in the target.\n* `unfold id1 id2 ...` is equivalent to `unfold id1; unfold id2; ...`.\n* `unfold id at h` unfolds at the hypothesis `h`.\n\nDefinitions can be either global or local definitions.\n\nFor non-recursive global definitions, this tactic is identical to `delta`.\nFor recursive global definitions, it uses the \"unfolding lemma\" `id.eq_def`,\nwhich is generated for each recursive definition, to unfold according to the recursive definition given by the user.\nOnly one level of unfolding is performed, in contrast to `simp only [id]`, which unfolds definition `id` recursively.\n</code>",
 "33": "<code>2 * sum n = n * (n + 1)</code>",
 "32":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;276&quot;:{&quot;binding&quot;:&quot;const-SumExample.sum&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;277&quot;:{&quot;binding&quot;:&quot;var-_uniq.14936&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.14936&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;var-_uniq.14936&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,273,&quot;2&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,[6,[3,2,[7,276,&quot;sum&quot;]]],[4,1,[6,[3,2,[7,277,&quot;n&quot;]]]]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[7,81,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,337,&quot;n&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,85,&quot;1&quot;]]]]]]]],&quot;)&quot;]]]]]]]]]]]]]}\">2 * sum n = n * (n + 1)</code>",
 "31":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.succ&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.succ&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Nat&quot;]]]]]]]]]]]}\">Nat.succ (n : Nat) : Nat</code><span class=\"sep\"></span><code class=\"docstring\">The successor of a natural number `n`.\n\nUsing `Nat.succ n` should usually be avoided in favor of `n + 1`, which is the [simp normal\nform](https://lean-lang.org/doc/reference/4.29.0/find/?domain=Verso.Genre.Manual.section&name=simp-normal-forms).\n</code>",
 "30":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.zero&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.zero&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,5,&quot;Nat&quot;]]]]]]]]]}\">Nat.zero : Nat</code><span class=\"sep\"></span><code class=\"docstring\">Zero, the smallest natural number.\n\nUsing `Nat.zero` explicitly should usually be avoided in favor of the literal `0`, which is the\n[simp normal form](https://lean-lang.org/doc/reference/4.29.0/find/?domain=Verso.Genre.Manual.section&name=simp-normal-forms).\n</code>",
 "3":
 "<code class=\"docstring\">The universe of propositions. `Prop ≡ Sort 0`.\n\nEvery proposition is propositionally equal to either `True` or `False`. </code>",
 "29":
 "<code class=\"docstring\">After `with`, there is an optional tactic that runs on all branches, and\nthen a list of alternatives.\n</code>",
 "28":
 "<code class=\"docstring\">Assuming `x` is a variable in the local context with an inductive type,\n`induction x` applies induction on `x` to the main goal,\nproducing one goal for each constructor of the inductive type,\nin which the target is replaced by a general instance of that constructor\nand an inductive hypothesis is added for each recursive argument to the constructor.\nIf the type of an element in the local context depends on `x`,\nthat element is reverted and reintroduced afterward,\nso that the inductive hypothesis incorporates that hypothesis as well.\n\nFor example, given `n : Nat` and a goal with a hypothesis `h : P n` and target `Q n`,\n`induction n` produces one goal with hypothesis `h : P 0` and target `Q 0`,\nand one goal with hypotheses `h : P (Nat.succ a)` and `ih₁ : P a → Q a` and target `Q (Nat.succ a)`.\nHere the names `a` and `ih₁` are chosen automatically and are not accessible.\nYou can use `with` to provide the variables names for each constructor.\n- `induction e`, where `e` is an expression instead of a variable,\n  generalizes `e` in the goal, and then performs induction on the resulting variable.\n- `induction e using r` allows the user to specify the principle of induction that should be used.\n  Here `r` should be a term whose result type must be of the form `C t`,\n  where `C` is a bound variable and `t` is a (possibly empty) sequence of bound variables\n- `induction e generalizing z₁ ... zₙ`, where `z₁ ... zₙ` are variables in the local context,\n  generalizes over `z₁ ... zₙ` before applying the induction but then introduces them in each goal.\n  In other words, the net effect is that each inductive hypothesis is generalized.\n- Given `x : Nat`, `induction x with | zero =&gt; tac₁ | succ x' ih =&gt; tac₂`\n  uses tactic `tac₁` for the `zero` case, and `tac₂` for the `succ` case.\n</code>",
 "27": "<code>SumExample.sum (n : Nat) : Nat</code>",
 "26":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-SumExample.sum&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;SumExample.sum&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Nat&quot;]]]]]]]]]]]}\">SumExample.sum (n : Nat) : Nat</code>",
 "25":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-SumExample.sum_eq&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5396&quot;:{&quot;binding&quot;:&quot;const-SumExample.sum&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5397&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.15219&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;SumExample.sum_eq&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,5393,&quot;2&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,[6,[3,2,[7,5396,&quot;sum&quot;]]],[4,1,[6,[3,2,[7,5397,&quot;n&quot;]]]]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[7,1361,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,5457,&quot;n&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,1365,&quot;1&quot;]]]]]]]],&quot;)&quot;]]]]]]]]]]]]]]]]]]]]}\">SumExample.sum_eq {n : Nat} : 2 * sum n = n * (n + 1)</code>",
 "24":
 "<code class=\"docstring\">`if c then t else e` is notation for `ite c t e`, \"if-then-else\", which decides to\nreturn `t` or `e` depending on whether `c` is true or false. The explicit argument\n`c : Prop` does not have any actual computational content, but there is an additional\n`[Decidable c]` argument synthesized by typeclass inference which actually\ndetermines how to evaluate `c` to true or false. Write `if h : c then t else e`\ninstead for a \"dependent if-then-else\" `dite`, which allows `t`/`e` to use the fact\nthat `c` is true/false.\n</code>",
 "23":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.14578&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-SumExample.sum&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;SumExample.sum&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Nat&quot;]]]]]]]]]]]}\">SumExample.sum (n : Nat) : Nat</code>",
 "22":
 "<code class=\"docstring\">`decide` attempts to prove the main goal (with target type `p`) by synthesizing an instance of `Decidable p`\nand then reducing that instance to evaluate the truth value of `p`.\nIf it reduces to `isTrue h`, then `h` is a proof of `p` that closes the goal.\n\nThe target is not allowed to contain local variables or metavariables.\nIf there are local variables, you can first try using the `revert` tactic with these local variables to move them into the target,\nor you can use the `+revert` option, described below.\n\nOptions:\n- `decide +revert` begins by reverting local variables that the target depends on,\n  after cleaning up the local context of irrelevant variables.\n  A variable is *relevant* if it appears in the target, if it appears in a relevant variable,\n  or if it is a proposition that refers to a relevant variable.\n- `decide +kernel` uses kernel for reduction instead of the elaborator.\n  It has two key properties: (1) since it uses the kernel, it ignores transparency and can unfold everything,\n  and (2) it reduces the `Decidable` instance only once instead of twice.\n- `decide +native` uses the native code compiler (`#eval`) to evaluate the `Decidable` instance,\n  admitting the result via an axiom. This can be significantly more efficient than using reduction, but it is at the cost of increasing the size\n  This can be significantly more efficient than using reduction, but it is at the cost of increasing the size\n  of the trusted code base.\n  Namely, it depends on the correctness of the Lean compiler and all definitions with an `@[implemented_by]` attribute.\n  Like with `+kernel`, the `Decidable` instance is evaluated only once.\n\nLimitation: In the default mode or `+kernel` mode, since `decide` uses reduction to evaluate the term,\n`Decidable` instances defined by well-founded recursion might not work because evaluating them requires reducing proofs.\nReduction can also get stuck on `Decidable` instances with `Eq.rec` terms.\nThese can appear in instances defined using tactics (such as `rw` and `simp`).\nTo avoid this, create such instances using definitions such as `decidable_of_iff` instead.\n\n## Examples\n\nProving inequalities:\n```lean\nexample : 2 + 2 ≠ 5 := by decide\n```\n\nTrying to prove a false proposition:\n```lean\nexample : 1 ≠ 1 := by decide\n/-\ntactic 'decide' proved that the proposition\n  1 ≠ 1\nis false\n-/\n```\n\nTrying to prove a proposition whose `Decidable` instance fails to reduce\n```lean\nopaque unknownProp : Prop\n\nopen scoped Classical in\nexample : unknownProp := by decide\n/-\ntactic 'decide' failed for proposition\n  unknownProp\nsince its 'Decidable' instance reduced to\n  Classical.choice ⋯\nrather than to the 'isTrue' constructor.\n-/\n```\n\n## Properties and relations\n\nFor equality goals for types with decidable equality, usually `rfl` can be used in place of `decide`.\n```lean\nexample : 1 + 1 = 2 := by decide\nexample : 1 + 1 = 2 := by rfl\n```\n</code>",
 "21":
 "<code>Exists.intro.{u} {α : Sort u} {p : α → Prop} (w : α) (h : p w) : Exists p</code><span class=\"sep\"></span><code class=\"docstring\">Existential introduction. If `a : α` and `h : p a`,\nthen `⟨a, h⟩` is a proof that `∃ x : α, p x`. </code>",
 "20":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.39&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Prop&quot;]]]]]]]]]]]}\">odd (n : Nat) : Prop</code>",
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
 "129":
 "<code>d ^ 2 * (d + d * t - 2 * d * t ^ 2 + d * t ^ 4 + d ^ 2 * t ^ 4) = 0</code>",
 "128": "<code>d * (d + t + d * t) = 0</code>",
 "127":
 "<code>Lean.Grind.IsCharP.{u} (α : Type u) [Semiring α] (p : outParam Nat) : Prop</code><span class=\"sep\"></span><code class=\"docstring\">A ring `α` has characteristic `p` if `OfNat.ofNat x = 0` iff `x % p = 0`.\n\nNote that for `p = 0`, we have `x % p = x`, so this says that `OfNat.ofNat` is injective from `Nat` to `α`.\n\nIn the case of a semiring, we take the stronger condition that\n`OfNat.ofNat x = OfNat.ofNat y` iff `x % p = y % p`.\n</code>",
 "126": "<code>IsCharP α 0</code>",
 "125":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17745&quot;:{&quot;binding&quot;:&quot;var-_uniq.56&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;18105425&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;282961&quot;:{&quot;binding&quot;:&quot;var-_uniq.56&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4369&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4526353&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4526357&quot;:{&quot;binding&quot;:&quot;var-_uniq.56&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4526405&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4526417&quot;:{&quot;binding&quot;:&quot;var-_uniq.56&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;70737&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;70929&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,4369,&quot;d&quot;]]],[4,[4,&quot; ^&quot;,1],[6,[3,2,[7,1093,&quot;2&quot;]]]]]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,4526353,&quot;d&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[4,[6,[3,2,[7,18105425,&quot;d&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,4526357,&quot;t&quot;]]]]]]]]]]],[4,[4,&quot; -&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,18105617,&quot;2&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,4526405,&quot;d&quot;]]]]]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,[6,[3,2,[7,4526417,&quot;t&quot;]]],[4,[4,&quot; ^&quot;,1],[6,[3,2,[7,1131605,&quot;2&quot;]]]]]]]]]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[4,[6,[3,2,[7,70737,&quot;d&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,[6,[3,2,[7,282961,&quot;t&quot;]]],[4,[4,&quot; ^&quot;,1],[6,[3,2,[7,70741,&quot;4&quot;]]]]]]]]]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,70929,&quot;d&quot;]]],[4,[4,&quot; ^&quot;,1],[6,[3,2,[7,17733,&quot;2&quot;]]]]]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,[6,[3,2,[7,17745,&quot;t&quot;]]],[4,[4,&quot; ^&quot;,1],[6,[3,2,[7,4437,&quot;4&quot;]]]]]]]]]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[7,5,&quot;0&quot;]]]]]]]]}\">d ^ 2 * (d + d * t - 2 * d * t ^ 2 + d * t ^ 4 + d ^ 2 * t ^ 4) = 0</code>",
 "124":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1109&quot;:{&quot;binding&quot;:&quot;var-_uniq.56&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;17681&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;273&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4421&quot;:{&quot;binding&quot;:&quot;var-_uniq.56&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4433&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,273,&quot;d&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,17681,&quot;d&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,4421,&quot;t&quot;]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[4,[6,[3,2,[7,4433,&quot;d&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,1109,&quot;t&quot;]]]]]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[7,5,&quot;0&quot;]]]]]]]]}\">d * (d + t + d * t) = 0</code>",
 "123":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;var-_uniq.3&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;α&quot;]]]]}\">α</code>",
 "122":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.14296&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Lean.Grind.NatModule&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.14296&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Lean.Grind.NoNatZeroDivisors&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;[&quot;,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;NatModule&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],&quot;]&quot;]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,85,&quot;Prop&quot;]]]]]]]]]]]]]}\">Lean.Grind.NoNatZeroDivisors.{u} (α : Type u) [NatModule α] : Prop</code><span class=\"sep\"></span><code class=\"docstring\">We say a module has no natural number zero divisors if\n`k ≠ 0` and `k * a = k * b` implies `a = b` (here `k` is a natural number and `a` and `b` are element of the module).\n\nFor a module over the integers this is equivalent to\n`k ≠ 0` and `k * a = 0` implies `a = 0`.\n(See the alternative constructor `NoNatZeroDivisors.mk'`,\nand the theorem `eq_zero_of_mul_eq_zero`.)\n</code>",
 "121":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1360&quot;:{&quot;binding&quot;:&quot;const-outParam&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.14296&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.14299&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Lean.Grind.Semiring&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.14296&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Lean.Grind.IsCharP&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;[&quot;,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;Semiring&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],&quot;]&quot;]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;p&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;outParam&quot;]]],[4,1,[6,[3,2,[7,1361,&quot;Nat&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,341,&quot;Prop&quot;]]]]]]]]]]]]]]]}\">Lean.Grind.IsCharP.{u} (α : Type u) [Semiring α] (p : outParam Nat) : Prop</code><span class=\"sep\"></span><code class=\"docstring\">A ring `α` has characteristic `p` if `OfNat.ofNat x = 0` iff `x % p = 0`.\n\nNote that for `p = 0`, we have `x % p = x`, so this says that `OfNat.ofNat` is injective from `Nat` to `α`.\n\nIn the case of a semiring, we take the stronger condition that\n`OfNat.ofNat x = OfNat.ofNat y` iff `x % p = y % p`.\n</code>",
 "120":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.14296&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Lean.Grind.CommRing&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Lean.Grind.CommRing.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">A commutative ring, i.e. a ring with commutative multiplication.\n</code>",
 "12":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.182&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;325&quot;:{&quot;binding&quot;:&quot;var-_uniq.211&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,17,&quot;n&quot;]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,1297,&quot;2&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,325,&quot;k₁&quot;]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,21,&quot;1&quot;]]]]]]]]]]]]}\">n = 2 * k₁ + 1</code>",
 "119":
 "<code class=\"docstring\">`ring` (commutative) rings and fields. </code>",
 "118":
 "<code>Not (a : Prop) : Prop</code><span class=\"sep\"></span><code class=\"docstring\">`Not p`, or `¬p`, is the negation of `p`. It is defined to be `p → False`,\nso if your goal is `¬p` you can use `intro h` to turn the goal into\n`h : p ⊢ False`, and if you have `hn : ¬p` and `h : p` then `hn h : False`\nand `(hn h).elim` will prove anything.\nFor more information: [Propositional Logic](https://lean-lang.org/theorem_proving_in_lean4/propositions_and_proofs.html#propositional-logic)\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `¬` in identifiers is `not`.</code>",
 "117": "<code>¬(cos x + sin x) ^ 2 = 2 * cos x * sin x + 1</code>",
 "116":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.763&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-R&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;345156&quot;:{&quot;binding&quot;:&quot;const-cos&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;345157&quot;:{&quot;binding&quot;:&quot;var-_uniq.763&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-trig_identity&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;86340&quot;:{&quot;binding&quot;:&quot;const-sin&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;86341&quot;:{&quot;binding&quot;:&quot;var-_uniq.763&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;trig_identity&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;x&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;R&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,345156,&quot;cos&quot;]]],[4,1,[6,[3,2,[7,345157,&quot;x&quot;]]]]]]],[4,[4,&quot; ^&quot;,1],[6,[3,2,[7,21573,&quot;2&quot;]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,86340,&quot;sin&quot;]]],[4,1,[6,[3,2,[7,86341,&quot;x&quot;]]]]]]],[4,[4,&quot; ^&quot;,1],[6,[3,2,[7,5397,&quot;2&quot;]]]]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[7,85,&quot;1&quot;]]]]]]]]]]]]]]]}\">trig_identity (x : R) : cos x ^ 2 + sin x ^ 2 = 1</code>",
 "115": "<code class=\"docstring\">Shorthand for `instantiate only` </code>",
 "114": "<code>sin : R → R</code>",
 "113": "<code>cos : R → R</code>",
 "112": "<code>R : Type</code>",
 "111": "<code>R</code>",
 "110":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;20&quot;:{&quot;binding&quot;:&quot;const-R&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-R&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-sin&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;sin&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,20,&quot;R&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,21,&quot;R&quot;]]]]]]]]]]]]]]}\">sin : R → R</code>",
 "11":
 "<code class=\"docstring\">Introduces one or more hypotheses, optionally naming and/or pattern-matching them.\nFor each hypothesis to be introduced, the remaining main goal's target type must\nbe a `let` or function type.\n\n* `intro` by itself introduces one anonymous hypothesis, which can be accessed\n  by e.g. `assumption`. It is equivalent to `intro _`.\n* `intro x y` introduces two hypotheses and names them. Individual hypotheses\n  can be anonymized via `_`, given a type ascription, or matched against a pattern:\n  ```lean\n  -- ... ⊢ α × β → ...\n  intro (a, b)\n  -- ..., a : α, b : β ⊢ ...\n  ```\n* `intro rfl` is short for `intro h; subst h`, if `h` is an equality where the left-hand or right-hand side\n  is a variable.\n* Alternatively, `intro` can be combined with pattern matching much like `fun`:\n  ```lean\n  intro\n  | n + 1, 0 =&gt; tac\n  | ...\n  ```\n</code>",
 "109":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;const-R&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;R&quot;]]]]}\">R</code>",
 "108":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;20&quot;:{&quot;binding&quot;:&quot;const-R&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-R&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-cos&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;cos&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,20,&quot;R&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,21,&quot;R&quot;]]]]]]]]]]]]]]}\">cos : R → R</code>",
 "107":
 "<code class=\"docstring\">`grind` is a tactic inspired by modern SMT solvers. **Picture a virtual whiteboard**:\nevery time grind discovers a new equality, inequality, or logical fact,\nit writes it on the board, groups together terms known to be equal,\nand lets each reasoning engine read from and contribute to the shared workspace.\nThese engines work together to handle equality reasoning, apply known theorems,\npropagate new facts, perform case analysis, and run specialized solvers\nfor domains like linear arithmetic and commutative rings.\n\nSee [the reference manual's chapter on `grind`](https://lean-lang.org/doc/reference/4.29.0/find/?domain=Verso.Genre.Manual.section&name=grind-tactic) for more information.\n\n`grind` is *not* designed for goals whose search space explodes combinatorially,\nthink large pigeonhole instances, graph‑coloring reductions, high‑order N‑queens boards,\nor a 200‑variable Sudoku encoded as Boolean constraints.  Such encodings require\n thousands (or millions) of case‑splits that overwhelm `grind`’s branching search.\n\nFor **bit‑level or combinatorial problems**, consider using **`bv_decide`**.\n`bv_decide` calls a state‑of‑the‑art SAT solver (CaDiCaL) and then returns a\n*compact, machine‑checkable certificate*.\n\n### Equality reasoning\n\n`grind` uses **congruence closure** to track equalities between terms.\nWhen two terms are known to be equal, congruence closure automatically deduces\nequalities between more complex expressions built from them.\nFor example, if `a = b`, then congruence closure will also conclude that `f a` = `f b`\nfor any function `f`. This forms the foundation for efficient equality reasoning in `grind`.\nHere is an example:\n```\nexample (f : Nat → Nat) (h : a = b) : f (f b) = f (f a) := by\n  grind\n```\n\n### Applying theorems using E-matching\n\nTo apply existing theorems, `grind` uses a technique called **E-matching**,\nwhich finds matches for known theorem patterns while taking equalities into account.\nCombined with congruence closure, E-matching helps `grind` discover\nnon-obvious consequences of theorems and equalities automatically.\n\nConsider the following functions and theorems:\n```\ndef f (a : Nat) : Nat :=\n  a + 1\n\ndef g (a : Nat) : Nat :=\n  a - 1\n\n@[grind =]\ntheorem gf (x : Nat) : g (f x) = x := by\n  simp [f, g]\n```\nThe theorem `gf` asserts that `g (f x) = x` for all natural numbers `x`.\nThe attribute `[grind =]` instructs `grind` to use the left-hand side of the equation,\n`g (f x)`, as a pattern for E-matching.\nSuppose we now have a goal involving:\n```\nexample {a b} (h : f b = a) : g a = b := by\n  grind\n```\nAlthough `g a` is not an instance of the pattern `g (f x)`,\nit becomes one modulo the equation `f b = a`. By substituting `a`\nwith `f b` in `g a`, we obtain the term `g (f b)`,\nwhich matches the pattern `g (f x)` with the assignment `x := b`.\nThus, the theorem `gf` is instantiated with `x := b`,\nand the new equality `g (f b) = b` is asserted.\n`grind` then uses congruence closure to derive the implied equality\n`g a = g (f b)` and completes the proof.\n\nThe pattern used to instantiate theorems affects the effectiveness of `grind`.\nFor example, the pattern `g (f x)` is too restrictive in the following case:\nthe theorem `gf` will not be instantiated because the goal does not even\ncontain the function symbol `g`.\n\n```\nexample (h₁ : f b = a) (h₂ : f c = a) : b = c := by\n  grind\n```\n\nYou can use the command `grind_pattern` to manually select a pattern for a given theorem.\nIn the following example, we instruct `grind` to use `f x` as the pattern,\nallowing it to solve the goal automatically:\n```\ngrind_pattern gf =&gt; f x\n\nexample {a b c} (h₁ : f b = a) (h₂ : f c = a) : b = c := by\n  grind\n```\nYou can enable the option `trace.grind.ematch.instance` to make `grind` print a\ntrace message for each theorem instance it generates.\n\nYou can also specify a **multi-pattern** to control when `grind` should apply a theorem.\nA multi-pattern requires that all specified patterns are matched in the current context\nbefore the theorem is applied. This is useful for theorems such as transitivity rules,\nwhere multiple premises must be simultaneously present for the rule to apply.\nThe following example demonstrates this feature using a transitivity axiom for a binary relation `R`:\n```\nopaque R : Int → Int → Prop\naxiom Rtrans {x y z : Int} : R x y → R y z → R x z\n\ngrind_pattern Rtrans =&gt; R x y, R y z\n\nexample {a b c d} : R a b → R b c → R c d → R a d := by\n  grind\n```\nBy specifying the multi-pattern `R x y, R y z`, we instruct `grind` to\ninstantiate `Rtrans` only when both `R x y` and `R y z` are available in the context.\nIn the example, `grind` applies `Rtrans` to derive `R a c` from `R a b` and `R b c`,\nand can then repeat the same reasoning to deduce `R a d` from `R a c` and `R c d`.\n\nInstead of using `grind_pattern` to explicitly specify a pattern,\nyou can use the `@[grind]` attribute or one of its variants, which will use a heuristic to\ngenerate a (multi-)pattern. The complete list is available in the reference manual. The main ones are:\n\n- `@[grind →]` will select a multi-pattern from the hypotheses of the theorem (i.e. it will use the theorem for forwards reasoning).\n  In more detail, it will traverse the hypotheses of the theorem from left-to-right, and each time it encounters a minimal indexable\n  (i.e. has a constant as its head) subexpression which \"covers\" (i.e. fixes the value of) an argument which was not\n  previously covered, it will add that subexpression as a pattern, until all arguments have been covered.\n- `@[grind ←]` will select a multi-pattern from the conclusion of theorem (i.e. it will use the theorem for backwards reasoning).\n  This may fail if not all the arguments to the theorem appear in the conclusion.\n- `@[grind]` will traverse the conclusion and then the hypotheses left-to-right, adding patterns as they increase the coverage,\n  stopping when all arguments are covered.\n- `@[grind =]` checks that the conclusion of the theorem is an equality, and then uses the left-hand-side of the equality as a pattern.\n  This may fail if not all of the arguments appear in the left-hand-side.\n\nHere is the previous example again but using the attribute `[grind →]`\n```\nopaque R : Int → Int → Prop\n@[grind →] axiom Rtrans {x y z : Int} : R x y → R y z → R x z\n\nexample {a b c d} : R a b → R b c → R c d → R a d := by\n  grind\n```\n\nTo control theorem instantiation and avoid generating an unbounded number of instances,\n`grind` uses a generation counter. Terms in the original goal are assigned generation zero.\nWhen `grind` applies a theorem using terms of generation `≤ n`, any new terms it creates\nare assigned generation `n + 1`. This limits how far the tactic explores when applying\ntheorems and helps prevent an excessive number of instantiations.\n\n#### Key options:\n- `grind (ematch := &lt;num&gt;)` controls the number of E-matching rounds.\n- `grind [&lt;name&gt;, ...]` instructs `grind` to use the declaration `name` during E-matching.\n- `grind only [&lt;name&gt;, ...]` is like `grind [&lt;name&gt;, ...]` but does not use theorems tagged with `@[grind]`.\n- `grind (gen := &lt;num&gt;)` sets the maximum generation.\n\n### Linear integer arithmetic (`lia`)\n\n`grind` can solve goals that reduce to **linear integer arithmetic (LIA)** using an\nintegrated decision procedure called **`lia`**.  It understands\n\n* equalities   `p = 0`\n* inequalities  `p ≤ 0`\n* disequalities `p ≠ 0`\n* divisibility  `d ∣ p`\n\nThe solver incrementally assigns integer values to variables; when a partial\nassignment violates a constraint it adds a new, implied constraint and retries.\nThis *model-based* search is **complete for LIA**.\n\n#### Key options:\n\n* `grind -lia` disable the solver (useful for debugging)\n* `grind +qlia` accept rational models (shrinks the search space but is incomplete for ℤ)\n\n#### Examples:\n\n```\n-- Even + even is never odd.\nexample {x y : Int} : 2 * x + 4 * y ≠ 5 := by\n  grind\n\n-- Mixing equalities and inequalities.\nexample {x y : Int} :\n    2 * x + 3 * y = 0 → 1 ≤ x → y &lt; 1 := by\n  grind\n\n-- Reasoning with divisibility.\nexample (a b : Int) :\n    2 ∣ a + 1 → 2 ∣ b + a → ¬ 2 ∣ b + 2 * a := by\n  grind\n\nexample (x y : Int) :\n    27 ≤ 11*x + 13*y →\n    11*x + 13*y ≤ 45 →\n    -10 ≤ 7*x - 9*y →\n    7*x - 9*y ≤ 4 → False := by\n  grind\n\n-- Types that implement the `ToInt` type-class.\nexample (a b c : UInt64)\n    : a ≤ 2 → b ≤ 3 → c - a - b = 0 → c ≤ 5 := by\n  grind\n```\n\n### Algebraic solver (`ring`)\n\n`grind` ships with an algebraic solver nick-named **`ring`** for goals that can\nbe phrased as polynomial equations (or disequations) over commutative rings,\nsemirings, or fields.\n\n*Works out of the box*\nAll core numeric types and relevant Mathlib types already provide the required\ntype-class instances, so the solver is ready to use in most developments.\n\nWhat it can decide:\n\n* equalities of the form `p = q`\n* disequalities `p ≠ q`\n* basic reasoning under field inverses (`a / b := a * b⁻¹`)\n* goals that mix ring facts with other `grind` engines\n\n#### Key options:\n\n* `grind -ring` turn the solver off (useful when debugging)\n* `grind (ringSteps := n)` cap the number of steps performed by this procedure.\n\n#### Examples\n\n```\nopen Lean Grind\n\nexample [CommRing α] (x : α) : (x + 1) * (x - 1) = x^2 - 1 := by\n  grind\n\n-- Characteristic 256 means 16 * 16 = 0.\nexample [CommRing α] [IsCharP α 256] (x : α) :\n    (x + 16) * (x - 16) = x^2 := by\n  grind\n\n-- Works on built-in rings such as `UInt8`.\nexample (x : UInt8) : (x + 16) * (x - 16) = x^2 := by\n  grind\n\nexample [CommRing α] (a b c : α) :\n    a + b + c = 3 →\n    a^2 + b^2 + c^2 = 5 →\n    a^3 + b^3 + c^3 = 7 →\n    a^4 + b^4 = 9 - c^4 := by\n  grind\n\nexample [Field α] [NoNatZeroDivisors α] (a : α) :\n    1 / a + 1 / (2 * a) = 3 / (2 * a) := by\n  grind\n```\n\n### Other options\n\n- `grind (splits := &lt;num&gt;)` caps the *depth* of the search tree.  Once a branch performs `num` splits\n  `grind` stops splitting further in that branch.\n- `grind -splitIte` disables case splitting on if-then-else expressions.\n- `grind -splitMatch` disables case splitting on `match` expressions.\n- `grind +splitImp` instructs `grind` to split on any hypothesis `A → B` whose antecedent `A` is **propositional**.\n- `grind -linarith` disables the linear arithmetic solver for (ordered) modules and rings.\n\n### Additional Examples\n\n```\nexample {a b} {as bs : List α} : (as ++ bs ++ [b]).getLastD a = b := by\n  grind\n\nexample (x : BitVec (w+1)) : (BitVec.cons x.msb (x.setWidth w)) = x := by\n  grind\n\nexample (as : Array α) (lo hi i j : Nat) :\n    lo ≤ i → i &lt; j → j ≤ hi → j &lt; as.size → min lo (as.size - 1) ≤ i := by\n  grind\n```\n</code>",
 "106":
 "<code>Ne.{u} {α : Sort u} (a b : α) : Prop</code><span class=\"sep\"></span><code class=\"docstring\">`a ≠ b`, or `Ne a b` is defined as `¬ (a = b)` or `a = b → False`,\nand asserts that `a` and `b` are not equal.\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `≠` in identifiers is `ne`.</code>",
 "105":
 "<code>HPow.hPow.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HPow α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a ^ b` computes `a` to the power of `b`.\nThe meaning of this notation is type-dependent. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `^` in identifiers is `pow`.</code>",
 "104": "<code>α → Nat</code>",
 "103":
 "<code>Lean.Grind.NoNatZeroDivisors.{u} (α : Type u) [NatModule α] : Prop</code><span class=\"sep\"></span><code class=\"docstring\">We say a module has no natural number zero divisors if\n`k ≠ 0` and `k * a = k * b` implies `a = b` (here `k` is a natural number and `a` and `b` are element of the module).\n\nFor a module over the integers this is equivalent to\n`k ≠ 0` and `k * a = 0` implies `a = 0`.\n(See the alternative constructor `NoNatZeroDivisors.mk'`,\nand the theorem `eq_zero_of_mul_eq_zero`.)\n</code>",
 "102": "<code>NoNatZeroDivisors α</code>",
 "101":
 "<code>Lean.Grind.CommRing.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">A commutative ring, i.e. a ring with commutative multiplication.\n</code>",
 "100": "<code>CommRing α</code>",
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

        // ResizeObserver for reflowing rich format content
        if (typeof ResizeObserver !== "undefined") {
            /** @type {ReturnType<typeof setTimeout> | null} */
            var reflowTimer = null;
            new ResizeObserver(function () {
                if (reflowTimer) clearTimeout(reflowTimer);
                reflowTimer = setTimeout(function () {
                    reflowPanel(panel);
                }, 100);
            }).observe(panel);
        }
    }

    /** @param {Element} codeEl */
    function clearHoverPreview(codeEl) {
        codeEl.querySelectorAll(".panel-hover").forEach(function (el) {
            el.classList.remove("panel-hover");
        });
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

        // Store the source element for reflow on resize
        panel._richFormatSource = null;

        /** @type {string | null} */
        var html = "";

        if (el.classList.contains("tactic")) {
            var ts = el.querySelector(".tactic-state");
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
            var msgs = el.querySelector(".hover-info.messages");
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
