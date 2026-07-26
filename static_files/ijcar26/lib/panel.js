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
        docsJson = {"9": "<code>Type u_1</code>",
 "81":
 "<code>Int : Type</code><span class=\"sep\"></span><code class=\"docstring\">The integers.\n\nThis type is special-cased by the compiler and overridden with an efficient implementation. The\nruntime has a special representation for `Int` that stores “small” signed numbers directly, while\nlarger numbers use a fast arbitrary-precision arithmetic library (usually\n[GMP](https://gmplib.org/)). A “small number” is an integer that can be encoded with one fewer bits\nthan the platform's pointer size (i.e. 63 bits on 64-bit architectures and 31 bits on 32-bit\narchitectures).\n</code>",
 "80":
 "<code>Array.size_set.{u} {α : Type u} {xs : Array α} {i : Nat} {v : α} (h : i &lt; xs.size) : (xs.set i v h).size = xs.size</code>",
 "8":
 "<code class=\"docstring\">`by tac` constructs a term of the expected type by running the tactic(s) `tac`. </code>",
 "79":
 "<code>Array.eq_empty_of_size_eq_zero.{u_1} {α✝ : Type u_1} {xs : Array α✝} (h : xs.size = 0) : xs = #[]</code>",
 "78":
 "<code>Array.getElem_set.{u_1} {α : Type u_1} {xs : Array α} {i : Nat} (h' : i &lt; xs.size) {v : α} {j : Nat}\n  (h : j &lt; (xs.set i v h').size) : (xs.set i v h')[j] = if i = j then v else xs[j]</code>",
 "77":
 "<code>NatCast.natCast.{u} {R : Type u} [self : NatCast R] : Nat → R</code><span class=\"sep\"></span><code class=\"docstring\">The canonical map `Nat → R`. </code>",
 "76":
 "<code>ite.{u} {α : Sort u} (c : Prop) [h : Decidable c] (t e : α) : α</code><span class=\"sep\"></span><code class=\"docstring\">`if c then t else e` is notation for `ite c t e`, \"if-then-else\", which decides to\nreturn `t` or `e` depending on whether `c` is true or false. The explicit argument\n`c : Prop` does not have any actual computational content, but there is an additional\n`[Decidable c]` argument synthesized by typeclass inference which actually\ndetermines how to evaluate `c` to true or false. Write `if h : c then t else e`\ninstead for a \"dependent if-then-else\" `dite`, which allows `t`/`e` to use the fact\nthat `c` is true/false.\n</code>",
 "75":
 "<code>LE.le.{u} {α : Type u} [self : LE α] : α → α → Prop</code><span class=\"sep\"></span><code class=\"docstring\">The less-equal relation: `x ≤ y` \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `≤` in identifiers is `le`.</code>",
 "74": "<code>i = j</code>",
 "73": "<code>¬bs[j] = as[j]</code>",
 "72":
 "<code>GetElem.getElem.{u, v, w} {coll : Type u} {idx : Type v} {elem : outParam (Type w)}\n  {valid : outParam (coll → idx → Prop)} [self : GetElem coll idx elem valid] (xs : coll) (i : idx) (h : valid xs i) :\n  elem</code><span class=\"sep\"></span><code class=\"docstring\">The syntax `arr[i]` gets the `i`'th element of the collection `arr`. If there\nare proof side conditions to the application, they will be automatically\ninferred by the `get_elem_tactic` tactic.\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `xs[i]` in identifiers is `getElem`.\n\n * The recommended spelling of `xs[i]'h` in identifiers is `getElem`.</code>",
 "71": "<code>j &lt; as.size</code>",
 "70": "<code>j &lt; bs.size</code>",
 "7": "<code>Nat</code>",
 "69":
 "<code>Array.set.{u_1} {α : Type u_1} (xs : Array α) (i : Nat) (v : α) (h : i &lt; xs.size := by get_elem_tactic) : Array α</code><span class=\"sep\"></span><code class=\"docstring\">Replaces the element at a given index in an array.\n\nNo bounds check is performed, but the function requires a proof that the index is in bounds. This\nproof can usually be omitted, and will be synthesized automatically.\n\nThe array is modified in-place if there are no other references to it.\n\nExamples:\n* `#[0, 1, 2].set 1 5 = #[0, 5, 2]`\n* `#[\"orange\", \"apple\"].set 1 \"grape\" = #[\"orange\", \"grape\"]`\n</code>",
 "68": "<code>bs = as.set i v h₁</code>",
 "67":
 "<code>Array.size.{u} {α : Type u} (a : Array α) : Nat</code><span class=\"sep\"></span><code class=\"docstring\">Gets the number of elements stored in an array.\n\nThis is a cached value, so it is `O(1)` to access. The space allocated for an array, referred to as\nits _capacity_, is at least as large as its size, but may be larger. The capacity of an array is an\ninternal detail that's not observable by Lean code.\n</code>",
 "66":
 "<code>LT.lt.{u} {α : Type u} [self : LT α] : α → α → Prop</code><span class=\"sep\"></span><code class=\"docstring\">The less-than relation: `x &lt; y` \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `&lt;` in identifiers is `lt`.</code>",
 "65": "<code>i &lt; as.size</code>",
 "64":
 "<code>Array.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">`Array α` is the type of [dynamic arrays](https://en.wikipedia.org/wiki/Dynamic_array) with elements\nfrom `α`. This type has special support in the runtime.\n\nArrays perform best when unshared. As long as there is never more than one reference to an array,\nall updates will be performed _destructively_. This results in performance comparable to mutable\narrays in imperative programming languages.\n\nAn array has a size and a capacity. The size is the number of elements present in the array, while\nthe capacity is the amount of memory currently allocated for elements. The size is accessible via\n`Array.size`, but the capacity is not observable from Lean code. `Array.emptyWithCapacity n` creates\nan array which is equal to `#[]`, but internally allocates an array of capacity `n`. When the size\nexceeds the capacity, allocation is required to grow the array.\n\nFrom the point of view of proofs, `Array α` is just a wrapper around `List α`.\n</code>",
 "63": "<code>Array α</code>",
 "62":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.47&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.50&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Array.size&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,17,&quot;j&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[4,[6,[3,2,[7,21,&quot;as&quot;]]],[4,&quot;.&quot;,[7,80,&quot;size&quot;]]]]]]]]]]}\">j &lt; as.size</code>",
 "61":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.47&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.53&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Array.size&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,17,&quot;j&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[4,[6,[3,2,[7,21,&quot;bs&quot;]]],[4,&quot;.&quot;,[7,80,&quot;size&quot;]]]]]]]]]]}\">j &lt; bs.size</code>",
 "60":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;10&quot;:{&quot;binding&quot;:&quot;var-_uniq.570&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1364&quot;:{&quot;binding&quot;:&quot;var-_uniq.564&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1397777&quot;:{&quot;binding&quot;:&quot;var-_uniq.566&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1397781&quot;:{&quot;binding&quot;:&quot;var-_uniq.565&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.564&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21844&quot;:{&quot;binding&quot;:&quot;const-Array&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.564&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.565&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Array&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.564&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5591120&quot;:{&quot;binding&quot;:&quot;const-Array.size&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.566&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.567&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Array.set&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;xs&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;Array&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;i&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,340,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;v&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,1364,&quot;α&quot;]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,10,&quot;h&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1397777,&quot;i&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[4,[6,[3,2,[7,1397781,&quot;xs&quot;]]],[4,&quot;.&quot;,[7,5591120,&quot;size&quot;]]]]]]]]],[4,&quot; :=&quot;,[4,&quot; by&quot;,[4,1,[4,[6,[3,2,&quot;get_elem_tactic&quot;]],&quot;)&quot;]]]]]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,21844,&quot;Array&quot;]]],[4,1,[6,[3,2,[7,21845,&quot;α&quot;]]]]]]]]]]]]]]]]]]]]]]]}\">Array.set.{u_1} {α : Type u_1} (xs : Array α) (i : Nat) (v : α) (h : i &lt; xs.size := by get_elem_tactic) : Array α</code><span class=\"sep\"></span><code class=\"docstring\">Replaces the element at a given index in an array.\n\nNo bounds check is performed, but the function requires a proof that the index is in bounds. This\nproof can usually be omitted, and will be synthesized automatically.\n\nThe array is modified in-place if there are no other references to it.\n\nExamples:\n* `#[0, 1, 2].set 1 5 = #[0, 5, 2]`\n* `#[\"orange\", \"apple\"].set 1 \"grape\" = #[\"orange\", \"grape\"]`\n</code>",
 "6": "<code>α</code>",
 "59":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1281&quot;:{&quot;binding&quot;:&quot;var-_uniq.50&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.53&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.70&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;321&quot;:{&quot;binding&quot;:&quot;var-_uniq.60&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5120&quot;:{&quot;binding&quot;:&quot;const-Array.set&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;var-_uniq.58&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,17,&quot;bs&quot;]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,1281,&quot;as&quot;]]],[4,&quot;.&quot;,[7,5120,&quot;set&quot;]]]]],[4,1,[4,[6,[3,2,[7,321,&quot;i&quot;]]],[4,1,[4,[6,[3,2,[7,81,&quot;v&quot;]]],[4,1,[6,[3,2,[7,21,&quot;h₁&quot;]]]]]]]]]]]]]]]]}\">bs = as.set i v h₁</code>",
 "58":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.564&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.565&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Array&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.564&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Array.size&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;a&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;Array&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,85,&quot;Nat&quot;]]]]]]]]]]]]]}\">Array.size.{u} {α : Type u} (a : Array α) : Nat</code><span class=\"sep\"></span><code class=\"docstring\">Gets the number of elements stored in an array.\n\nThis is a cached value, so it is `O(1)` to access. The space allocated for an array, referred to as\nits _capacity_, is at least as large as its size, but may be larger. The capacity of an array is an\ninternal detail that's not observable by Lean code.\n</code>",
 "57":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.60&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.50&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Array.size&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,17,&quot;i&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[4,[6,[3,2,[7,21,&quot;as&quot;]]],[4,&quot;.&quot;,[7,80,&quot;size&quot;]]]]]]]]]]}\">i &lt; as.size</code>",
 "56":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.564&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Array&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Array.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">`Array α` is the type of [dynamic arrays](https://en.wikipedia.org/wiki/Dynamic_array) with elements\nfrom `α`. This type has special support in the runtime.\n\nArrays perform best when unshared. As long as there is never more than one reference to an array,\nall updates will be performed _destructively_. This results in performance comparable to mutable\narrays in imperative programming languages.\n\nAn array has a size and a capacity. The size is the number of elements present in the array, while\nthe capacity is the amount of memory currently allocated for elements. The size is accessible via\n`Array.size`, but the capacity is not observable from Lean code. `Array.emptyWithCapacity n` creates\nan array which is equal to `#[]`, but internally allocates an array of capacity `n`. When the size\nexceeds the capacity, allocation is required to grow the array.\n\nFrom the point of view of proofs, `Array α` is just a wrapper around `List α`.\n</code>",
 "55":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Array&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.5&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Array&quot;]]],[4,1,[6,[3,2,[7,5,&quot;α&quot;]]]]]]]]}\">Array α</code>",
 "54":
 "<code class=\"docstring\">`grind?` takes the same arguments as `grind`, but reports an equivalent call to `grind only`\nthat would be sufficient to close the goal. This is useful for reducing the size of the `grind`\ntheorems in a local invocation.\n</code>",
 "53":
 "<code class=\"docstring\">`ring` (commutative) rings and fields. </code>",
 "52":
 "<code>False : Prop</code><span class=\"sep\"></span><code class=\"docstring\">`False` is the empty proposition. Thus, it has no introduction rules.\nIt represents a contradiction. `False` elimination rule, `False.rec`,\nexpresses the fact that anything follows from a contradiction.\nThis rule is sometimes called ex falso (short for ex falso sequitur quodlibet),\nor the principle of explosion.\nFor more information: [Propositional Logic](https://lean-lang.org/theorem_proving_in_lean4/propositions_and_proofs.html#propositional-logic)\n</code>",
 "51":
 "<code>Not (a : Prop) : Prop</code><span class=\"sep\"></span><code class=\"docstring\">`Not p`, or `¬p`, is the negation of `p`. It is defined to be `p → False`,\nso if your goal is `¬p` you can use `intro h` to turn the goal into\n`h : p ⊢ False`, and if you have `hn : ¬p` and `h : p` then `hn h : False`\nand `(hn h).elim` will prove anything.\nFor more information: [Propositional Logic](https://lean-lang.org/theorem_proving_in_lean4/propositions_and_proofs.html#propositional-logic)\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `¬` in identifiers is `not`.</code>",
 "50": "<code>¬(cos x + sin x) ^ 2 = 2 * cos x * sin x + 1</code>",
 "5":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;sort-7243200735919010059&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,5,&quot;Type&quot;]]]]]]]]]}\">Nat : Type</code><span class=\"sep\"></span><code class=\"docstring\">The natural numbers, starting at zero.\n\nThis type is special-cased by both the kernel and the compiler, and overridden with an efficient\nimplementation. Both use a fast arbitrary-precision arithmetic library (usually\n[GMP](https://gmplib.org/)); at runtime, `Nat` values that are sufficiently small are unboxed.\n</code>",
 "49":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.819&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-R&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;345156&quot;:{&quot;binding&quot;:&quot;const-cos&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;345157&quot;:{&quot;binding&quot;:&quot;var-_uniq.819&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-trig_identity&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;86340&quot;:{&quot;binding&quot;:&quot;const-sin&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;86341&quot;:{&quot;binding&quot;:&quot;var-_uniq.819&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;trig_identity&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;x&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;R&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,345156,&quot;cos&quot;]]],[4,1,[6,[3,2,[7,345157,&quot;x&quot;]]]]]]],[4,[4,&quot; ^&quot;,1],[6,[3,2,[7,21573,&quot;2&quot;]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,86340,&quot;sin&quot;]]],[4,1,[6,[3,2,[7,86341,&quot;x&quot;]]]]]]],[4,[4,&quot; ^&quot;,1],[6,[3,2,[7,5397,&quot;2&quot;]]]]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[7,85,&quot;1&quot;]]]]]]]]]]]]]]]}\">trig_identity (x : R) : cos x ^ 2 + sin x ^ 2 = 1</code>",
 "48":
 "<code class=\"docstring\">Instantiates theorems using E-matching.\nThe `approx` modifier is just a marker for users to easily identify automatically generated `instantiate` tactics\nthat may have redundant arguments.\n</code>",
 "47": "<code>sin : R → R</code>",
 "46": "<code>cos : R → R</code>",
 "45": "<code>R : Type</code>",
 "44": "<code>R</code>",
 "43":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;20&quot;:{&quot;binding&quot;:&quot;const-R&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-R&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-sin&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;sin&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,20,&quot;R&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,21,&quot;R&quot;]]]]]]]]]]]]]]}\">sin : R → R</code>",
 "42":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;const-R&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;R&quot;]]]]}\">R</code>",
 "41":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;20&quot;:{&quot;binding&quot;:&quot;const-R&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-R&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-cos&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;cos&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,20,&quot;R&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,21,&quot;R&quot;]]]]]]]]]]]]]]}\">cos : R → R</code>",
 "40":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.462&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-g&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;g&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Nat&quot;]]]]]]]]]]]}\">g (n : Nat) : Nat</code>",
 "4":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;var-_uniq.5&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,5,&quot;Nat&quot;]]]]]]]]]}\">α → Nat</code>",
 "39":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.462&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-f&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;f&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Nat&quot;]]]]]]]]]]]}\">f (n : Nat) : Nat</code>",
 "38":
 "<code class=\"docstring\">The `omega` tactic, for resolving integer and natural linear arithmetic problems.\n\nIt is not yet a full decision procedure (no \"dark\" or \"grey\" shadows),\nbut should be effective on many problems.\n\nWe handle hypotheses of the form `x = y`, `x &lt; y`, `x ≤ y`, and `k ∣ x` for `x y` in `Nat` or `Int`\n(and `k` a literal), along with negations of these statements.\n\nWe decompose the sides of the inequalities as linear combinations of atoms.\n\nIf we encounter `x / k` or `x % k` for literal integers `k` we introduce new auxiliary variables\nand the relevant inequalities.\n\nOn the first pass, we do not perform case splits on natural subtraction.\nIf `omega` fails, we recursively perform a case split on\na natural subtraction appearing in a hypothesis, and try again.\n\nThe options\n```\nomega +splitDisjunctions +splitNatSub +splitNatAbs +splitMinMax\n```\ncan be used to:\n* `splitDisjunctions`: split any disjunctions found in the context,\n  if the problem is not otherwise solvable.\n* `splitNatSub`: for each appearance of `((a - b : Nat) : Int)`, split on `a ≤ b` if necessary.\n* `splitNatAbs`: for each appearance of `Int.natAbs a`, split on `0 ≤ a` if necessary.\n* `splitMinMax`: for each occurrence of `min a b`, split on `min a b = a ∨ min a b = b`\nCurrently, all of these are on by default.\n</code>",
 "37":
 "<code>HDiv.hDiv.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HDiv α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a / b` computes the result of dividing `a` by `b`.\nThe meaning of this notation is type-dependent.\n* For most types like `Nat`, `Int`, `Rat`, `Real`, `a / 0` is defined to be `0`.\n* For `Nat`, `a / b` rounds downwards.\n* For `Int`, `a / b` rounds downwards if `b` is positive or upwards if `b` is negative.\n  It is implemented as `Int.ediv`, the unique function satisfying\n  `a % b + b * (a / b) = a` and `0 ≤ a % b &lt; natAbs b` for `b ≠ 0`.\n  Other rounding conventions are available using the functions\n  `Int.fdiv` (floor rounding) and `Int.tdiv` (truncation rounding).\n* For `Float`, `a / 0` follows the IEEE 754 semantics for division,\n  usually resulting in `inf` or `nan`. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `/` in identifiers is `div`.</code>",
 "36":
 "<code class=\"docstring\">* `unfold id` unfolds all occurrences of definition `id` in the target.\n* `unfold id1 id2 ...` is equivalent to `unfold id1; unfold id2; ...`.\n* `unfold id at h` unfolds at the hypothesis `h`.\n\nDefinitions can be either global or local definitions.\n\nFor non-recursive global definitions, this tactic is identical to `delta`.\nFor recursive global definitions, it uses the \"unfolding lemma\" `id.eq_def`,\nwhich is generated for each recursive definition, to unfold according to the recursive definition given by the user.\nOnly one level of unfolding is performed, in contrast to `simp only [id]`, which unfolds definition `id` recursively.\n</code>",
 "35": "<code>g (n : Nat) : Nat</code>",
 "34": "<code>f (n : Nat) : Nat</code>",
 "33":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.389&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-g&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;g&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Nat&quot;]]]]]]]]]]]}\">g (n : Nat) : Nat</code>",
 "32":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.389&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-f&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;f&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Nat&quot;]]]]]]]]]]]}\">f (n : Nat) : Nat</code>",
 "31":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1348&quot;:{&quot;binding&quot;:&quot;const-f&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.389&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-fg&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5396&quot;:{&quot;binding&quot;:&quot;const-g&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5397&quot;:{&quot;binding&quot;:&quot;var-_uniq.389&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;var-_uniq.389&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;fg&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;x&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,1348,&quot;f&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,5396,&quot;g&quot;]]],[4,1,[6,[3,2,[7,5397,&quot;x&quot;]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[7,85,&quot;x&quot;]]]]]]]]]]]]]]]}\">fg {x : Nat} : f (g x) = x</code>",
 "30":
 "<code class=\"docstring\">Marks a theorem or definition for use by the `grind` tactic.\n\nAn optional modifier (e.g. `=`, `→`, `←`, `cases`, `intro`, `ext`, `inj`, etc.)\ncontrols how `grind` uses the declaration:\n* whether it is applied forwards, backwards, or both,\n* whether equalities are used on the left, right, or both sides,\n* whether case-splits, constructors, extensionality, or injectivity are applied,\n* or whether custom instantiation patterns are used.\n\nSee the individual modifier docstrings for details.\n</code>",
 "3":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;var-_uniq.5&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;α&quot;]]]]}\">α</code>",
 "29":
 "<code>HOr.hOr.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HOr α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a ||| b` computes the bitwise OR of `a` and `b`.\nThe meaning of this notation is type-dependent. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `|||` in identifiers is `or`.</code>",
 "28":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;Nat&quot;]]]]}\">Nat</code>",
 "27":
 "<code>HMul.hMul.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HMul α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a * b` computes the product of `a` and `b`.\nThe meaning of this notation is type-dependent. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `*` in identifiers is `mul`.</code>",
 "26":
 "<code>BitVec (w : Nat) : Type</code><span class=\"sep\"></span><code class=\"docstring\">A bitvector of the specified width.\n\nThis is represented as the underlying `Nat` number in both the runtime\nand the kernel, inheriting all the special support for `Nat`.\n</code>",
 "25": "<code>BitVec 8</code>",
 "24":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.824&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;sort-7243200735919010059&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-BitVec&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;BitVec&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;w&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Type&quot;]]]]]]]]]]]}\">BitVec (w : Nat) : Type</code><span class=\"sep\"></span><code class=\"docstring\">A bitvector of the specified width.\n\nThis is represented as the underlying `Nat` number in both the runtime\nand the kernel, inheriting all the special support for `Nat`.\n</code>",
 "23":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-BitVec&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;BitVec&quot;]]],[4,1,[6,[3,2,[7,5,&quot;8&quot;]]]]]]]]}\">BitVec 8</code>",
 "22":
 "<code class=\"docstring\">`grind` is a tactic inspired by modern SMT solvers. **Picture a virtual whiteboard**:\nevery time grind discovers a new equality, inequality, or logical fact,\nit writes it on the board, groups together terms known to be equal,\nand lets each reasoning engine read from and contribute to the shared workspace.\nThese engines work together to handle equality reasoning, apply known theorems,\npropagate new facts, perform case analysis, and run specialized solvers\nfor domains like linear arithmetic and commutative rings.\n\nSee [the reference manual's chapter on `grind`](https://lean-lang.org/doc/reference/4.33.0-rc1/find/?domain=Verso.Genre.Manual.section&name=grind-tactic) for more information.\n\n`grind` is *not* designed for goals whose search space explodes combinatorially,\nthink large pigeonhole instances, graph‑coloring reductions, high‑order N‑queens boards,\nor a 200‑variable Sudoku encoded as Boolean constraints.  Such encodings require\n thousands (or millions) of case‑splits that overwhelm `grind`’s branching search.\n\nFor **bit‑level or combinatorial problems**, consider using **`bv_decide`**.\n`bv_decide` calls a state‑of‑the‑art SAT solver (CaDiCaL) and then returns a\n*compact, machine‑checkable certificate*.\n\n### Equality reasoning\n\n`grind` uses **congruence closure** to track equalities between terms.\nWhen two terms are known to be equal, congruence closure automatically deduces\nequalities between more complex expressions built from them.\nFor example, if `a = b`, then congruence closure will also conclude that `f a` = `f b`\nfor any function `f`. This forms the foundation for efficient equality reasoning in `grind`.\nHere is an example:\n```\nexample (f : Nat → Nat) (h : a = b) : f (f b) = f (f a) := by\n  grind\n```\n\n### Applying theorems using E-matching\n\nTo apply existing theorems, `grind` uses a technique called **E-matching**,\nwhich finds matches for known theorem patterns while taking equalities into account.\nCombined with congruence closure, E-matching helps `grind` discover\nnon-obvious consequences of theorems and equalities automatically.\n\nConsider the following functions and theorems:\n```\ndef f (a : Nat) : Nat :=\n  a + 1\n\ndef g (a : Nat) : Nat :=\n  a - 1\n\n@[grind =]\ntheorem gf (x : Nat) : g (f x) = x := by\n  simp [f, g]\n```\nThe theorem `gf` asserts that `g (f x) = x` for all natural numbers `x`.\nThe attribute `[grind =]` instructs `grind` to use the left-hand side of the equation,\n`g (f x)`, as a pattern for E-matching.\nSuppose we now have a goal involving:\n```\nexample {a b} (h : f b = a) : g a = b := by\n  grind\n```\nAlthough `g a` is not an instance of the pattern `g (f x)`,\nit becomes one modulo the equation `f b = a`. By substituting `a`\nwith `f b` in `g a`, we obtain the term `g (f b)`,\nwhich matches the pattern `g (f x)` with the assignment `x := b`.\nThus, the theorem `gf` is instantiated with `x := b`,\nand the new equality `g (f b) = b` is asserted.\n`grind` then uses congruence closure to derive the implied equality\n`g a = g (f b)` and completes the proof.\n\nThe pattern used to instantiate theorems affects the effectiveness of `grind`.\nFor example, the pattern `g (f x)` is too restrictive in the following case:\nthe theorem `gf` will not be instantiated because the goal does not even\ncontain the function symbol `g`.\n\n```\nexample (h₁ : f b = a) (h₂ : f c = a) : b = c := by\n  grind\n```\n\nYou can use the command `grind_pattern` to manually select a pattern for a given theorem.\nIn the following example, we instruct `grind` to use `f x` as the pattern,\nallowing it to solve the goal automatically:\n```\ngrind_pattern gf =&gt; f x\n\nexample {a b c} (h₁ : f b = a) (h₂ : f c = a) : b = c := by\n  grind\n```\nYou can enable the option `trace.grind.ematch.instance` to make `grind` print a\ntrace message for each theorem instance it generates.\n\nYou can also specify a **multi-pattern** to control when `grind` should apply a theorem.\nA multi-pattern requires that all specified patterns are matched in the current context\nbefore the theorem is applied. This is useful for theorems such as transitivity rules,\nwhere multiple premises must be simultaneously present for the rule to apply.\nThe following example demonstrates this feature using a transitivity axiom for a binary relation `R`:\n```\nopaque R : Int → Int → Prop\naxiom Rtrans {x y z : Int} : R x y → R y z → R x z\n\ngrind_pattern Rtrans =&gt; R x y, R y z\n\nexample {a b c d} : R a b → R b c → R c d → R a d := by\n  grind\n```\nBy specifying the multi-pattern `R x y, R y z`, we instruct `grind` to\ninstantiate `Rtrans` only when both `R x y` and `R y z` are available in the context.\nIn the example, `grind` applies `Rtrans` to derive `R a c` from `R a b` and `R b c`,\nand can then repeat the same reasoning to deduce `R a d` from `R a c` and `R c d`.\n\nInstead of using `grind_pattern` to explicitly specify a pattern,\nyou can use the `@[grind]` attribute or one of its variants, which will use a heuristic to\ngenerate a (multi-)pattern. The complete list is available in the reference manual. The main ones are:\n\n- `@[grind →]` will select a multi-pattern from the hypotheses of the theorem (i.e. it will use the theorem for forwards reasoning).\n  In more detail, it will traverse the hypotheses of the theorem from left-to-right, and each time it encounters a minimal indexable\n  (i.e. has a constant as its head) subexpression which \"covers\" (i.e. fixes the value of) an argument which was not\n  previously covered, it will add that subexpression as a pattern, until all arguments have been covered.\n- `@[grind ←]` will select a multi-pattern from the conclusion of theorem (i.e. it will use the theorem for backwards reasoning).\n  This may fail if not all the arguments to the theorem appear in the conclusion.\n- `@[grind]` will traverse the conclusion and then the hypotheses left-to-right, adding patterns as they increase the coverage,\n  stopping when all arguments are covered.\n- `@[grind =]` checks that the conclusion of the theorem is an equality, and then uses the left-hand-side of the equality as a pattern.\n  This may fail if not all of the arguments appear in the left-hand-side.\n\nHere is the previous example again but using the attribute `[grind →]`\n```\nopaque R : Int → Int → Prop\n@[grind →] axiom Rtrans {x y z : Int} : R x y → R y z → R x z\n\nexample {a b c d} : R a b → R b c → R c d → R a d := by\n  grind\n```\n\nTo control theorem instantiation and avoid generating an unbounded number of instances,\n`grind` uses a generation counter. Terms in the original goal are assigned generation zero.\nWhen `grind` applies a theorem using terms of generation `≤ n`, any new terms it creates\nare assigned generation `n + 1`. This limits how far the tactic explores when applying\ntheorems and helps prevent an excessive number of instantiations.\n\n#### Key options:\n- `grind (ematch := &lt;num&gt;)` controls the number of E-matching rounds.\n- `grind [&lt;name&gt;, ...]` instructs `grind` to use the declaration `name` during E-matching.\n- `grind only [&lt;name&gt;, ...]` is like `grind [&lt;name&gt;, ...]` but does not use theorems tagged with `@[grind]`.\n- `grind (gen := &lt;num&gt;)` sets the maximum generation.\n\n### Linear integer arithmetic (`lia`)\n\n`grind` can solve goals that reduce to **linear integer arithmetic (LIA)** using an\nintegrated decision procedure called **`lia`**.  It understands\n\n* equalities   `p = 0`\n* inequalities  `p ≤ 0`\n* disequalities `p ≠ 0`\n* divisibility  `d ∣ p`\n\nThe solver incrementally assigns integer values to variables; when a partial\nassignment violates a constraint it adds a new, implied constraint and retries.\nThis *model-based* search is **complete for LIA**.\n\n#### Key options:\n\n* `grind -lia` disable the solver (useful for debugging)\n* `grind +qlia` accept rational models (shrinks the search space but is incomplete for ℤ)\n* `grind (liaSteps := n)` cap the number of steps performed by the model search (the solver becomes incomplete when the threshold is reached)\n\n#### Examples:\n\n```\n-- Even + even is never odd.\nexample {x y : Int} : 2 * x + 4 * y ≠ 5 := by\n  grind\n\n-- Mixing equalities and inequalities.\nexample {x y : Int} :\n    2 * x + 3 * y = 0 → 1 ≤ x → y &lt; 1 := by\n  grind\n\n-- Reasoning with divisibility.\nexample (a b : Int) :\n    2 ∣ a + 1 → 2 ∣ b + a → ¬ 2 ∣ b + 2 * a := by\n  grind\n\nexample (x y : Int) :\n    27 ≤ 11*x + 13*y →\n    11*x + 13*y ≤ 45 →\n    -10 ≤ 7*x - 9*y →\n    7*x - 9*y ≤ 4 → False := by\n  grind\n\n-- Types that implement the `ToInt` type-class.\nexample (a b c : UInt64)\n    : a ≤ 2 → b ≤ 3 → c - a - b = 0 → c ≤ 5 := by\n  grind\n```\n\n### Algebraic solver (`ring`)\n\n`grind` ships with an algebraic solver nick-named **`ring`** for goals that can\nbe phrased as polynomial equations (or disequations) over commutative rings,\nsemirings, or fields.\n\n*Works out of the box*\nAll core numeric types and relevant Mathlib types already provide the required\ntype-class instances, so the solver is ready to use in most developments.\n\nWhat it can decide:\n\n* equalities of the form `p = q`\n* disequalities `p ≠ q`\n* basic reasoning under field inverses (`a / b := a * b⁻¹`)\n* goals that mix ring facts with other `grind` engines\n\n#### Key options:\n\n* `grind -ring` turn the solver off (useful when debugging)\n* `grind (ringSteps := n)` cap the number of steps performed by this procedure.\n\n#### Examples\n\n```\nopen Lean Grind\n\nexample [CommRing α] (x : α) : (x + 1) * (x - 1) = x^2 - 1 := by\n  grind\n\n-- Characteristic 256 means 16 * 16 = 0.\nexample [CommRing α] [IsCharP α 256] (x : α) :\n    (x + 16) * (x - 16) = x^2 := by\n  grind\n\n-- Works on built-in rings such as `UInt8`.\nexample (x : UInt8) : (x + 16) * (x - 16) = x^2 := by\n  grind\n\nexample [CommRing α] (a b c : α) :\n    a + b + c = 3 →\n    a^2 + b^2 + c^2 = 5 →\n    a^3 + b^3 + c^3 = 7 →\n    a^4 + b^4 = 9 - c^4 := by\n  grind\n\nexample [Field α] [NoNatZeroDivisors α] (a : α) :\n    1 / a + 1 / (2 * a) = 3 / (2 * a) := by\n  grind\n```\n\n### Other options\n\n- `grind (splits := &lt;num&gt;)` caps the *depth* of the search tree.  Once a branch performs `num` splits\n  `grind` stops splitting further in that branch.\n- `grind -splitIte` disables case splitting on if-then-else expressions.\n- `grind -splitMatch` disables case splitting on `match` expressions.\n- `grind +splitImp` instructs `grind` to split on any hypothesis `A → B` whose antecedent `A` is **propositional**.\n- `grind -linarith` disables the linear arithmetic solver for (ordered) modules and rings.\n\n### Additional Examples\n\n```\nexample {a b} {as bs : List α} : (as ++ bs ++ [b]).getLastD a = b := by\n  grind\n\nexample (x : BitVec (w+1)) : (BitVec.cons x.msb (x.setWidth w)) = x := by\n  grind\n\nexample (as : Array α) (lo hi i j : Nat) :\n    lo ≤ i → i &lt; j → j ≤ hi → j &lt; as.size → min lo (as.size - 1) ≤ i := by\n  grind\n```\n</code>",
 "21":
 "<code>Ne.{u} {α : Sort u} (a b : α) : Prop</code><span class=\"sep\"></span><code class=\"docstring\">`a ≠ b`, or `Ne a b` is defined as `¬ (a = b)` or `a = b → False`,\nand asserts that `a` and `b` are not equal.\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `≠` in identifiers is `ne`.</code>",
 "20":
 "<code>HSub.hSub.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HSub α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a - b` computes the difference of `a` and `b`.\nThe meaning of this notation is type-dependent.\n* For natural numbers, this operator saturates at 0: `a - b = 0` when `a ≤ b`. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `-` in identifiers is `sub` (when used as a binary operator).</code>",
 "2":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.10417&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Lean.Grind.NatModule&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.10417&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Lean.Grind.NoNatZeroDivisors&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;[&quot;,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;NatModule&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],&quot;]&quot;]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,85,&quot;Prop&quot;]]]]]]]]]]]]]}\">Lean.Grind.NoNatZeroDivisors.{u} (α : Type u) [NatModule α] : Prop</code><span class=\"sep\"></span><code class=\"docstring\">We say a module has no natural number zero divisors if\n`k ≠ 0` and `k * a = k * b` implies `a = b` (here `k` is a natural number and `a` and `b` are element of the module).\n\nFor a module over the integers this is equivalent to\n`k ≠ 0` and `k * a = 0` implies `a = 0`.\n(See the alternative constructor `NoNatZeroDivisors.mk'`,\nand the theorem `eq_zero_of_mul_eq_zero`.)\n</code>",
 "19":
 "<code>HPow.hPow.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HPow α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a ^ b` computes `a` to the power of `b`.\nThe meaning of this notation is type-dependent. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `^` in identifiers is `pow`.</code>",
 "18":
 "<code>Eq.{u_1} {α : Sort u_1} : α → α → Prop</code><span class=\"sep\"></span><code class=\"docstring\">The equality relation. It has one introduction rule, `Eq.refl`.\nWe use `a = b` as notation for `Eq a b`.\nA fundamental property of equality is that it is an equivalence relation.\n```\nvariable (α : Type) (a b c d : α)\nvariable (hab : a = b) (hcb : c = b) (hcd : c = d)\n\nexample : a = d :=\n  Eq.trans (Eq.trans hab (Eq.symm hcb)) hcd\n```\nEquality is much more than an equivalence relation, however. It has the important property that every assertion\nrespects the equivalence, in the sense that we can substitute equal expressions without changing the truth value.\nThat is, given `h1 : a = b` and `h2 : p a`, we can construct a proof for `p b` using substitution: `Eq.subst h1 h2`.\nExample:\n```\nexample (α : Type) (a b : α) (p : α → Prop)\n        (h1 : a = b) (h2 : p a) : p b :=\n  Eq.subst h1 h2\n\nexample (α : Type) (a b : α) (p : α → Prop)\n    (h1 : a = b) (h2 : p a) : p b :=\n  h1 ▸ h2\n```\nThe triangle in the second presentation is a macro built on top of `Eq.subst` and `Eq.symm`, and you can enter it by typing `\\t`.\nFor more information: [Equality](https://lean-lang.org/theorem_proving_in_lean4/quantifiers_and_equality.html#equality)\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `=` in identifiers is `eq`.</code>",
 "17":
 "<code>HAdd.hAdd.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HAdd α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a + b` computes the sum of `a` and `b`.\nThe meaning of this notation is type-dependent. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `+` in identifiers is `add`.</code>",
 "16":
 "<code>Nat : Type</code><span class=\"sep\"></span><code class=\"docstring\">The natural numbers, starting at zero.\n\nThis type is special-cased by both the kernel and the compiler, and overridden with an efficient\nimplementation. Both use a fast arbitrary-precision arithmetic library (usually\n[GMP](https://gmplib.org/)); at runtime, `Nat` values that are sufficiently small are unboxed.\n</code>",
 "15": "<code>α → Nat</code>",
 "14":
 "<code>Lean.Grind.NoNatZeroDivisors.{u} (α : Type u) [NatModule α] : Prop</code><span class=\"sep\"></span><code class=\"docstring\">We say a module has no natural number zero divisors if\n`k ≠ 0` and `k * a = k * b` implies `a = b` (here `k` is a natural number and `a` and `b` are element of the module).\n\nFor a module over the integers this is equivalent to\n`k ≠ 0` and `k * a = 0` implies `a = 0`.\n(See the alternative constructor `NoNatZeroDivisors.mk'`,\nand the theorem `eq_zero_of_mul_eq_zero`.)\n</code>",
 "13": "<code>NoNatZeroDivisors α</code>",
 "12":
 "<code>Lean.Grind.CommRing.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">A commutative ring, i.e. a ring with commutative multiplication.\n</code>",
 "11": "<code>CommRing α</code>",
 "10":
 "<code class=\"docstring\">A type universe. `Type ≡ Type 0`, `Type u ≡ Sort (u + 1)`. </code>",
 "1":
 "<code data-rich-format=\"{&quot;annotations&quot;:{},&quot;fmt&quot;:[6,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]]]}\">Type u_1</code>",
 "0":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.10417&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Lean.Grind.CommRing&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Lean.Grind.CommRing.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">A commutative ring, i.e. a ring with commutative multiplication.\n</code>"};

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
