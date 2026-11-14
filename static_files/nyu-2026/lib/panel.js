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
        docsJson = {"99": "<code>ℂ</code>",
 "98":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;20&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-riemannZeta&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;riemannZeta&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,20,&quot;ℂ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,21,&quot;ℂ&quot;]]]]]]]]]]]]]]}\">riemannZeta : ℂ → ℂ</code>",
 "97":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.369&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-RiemannHypothesisUpTo&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;RiemannHypothesisUpTo&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;T&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;ℝ&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Prop&quot;]]]]]]]]]]]}\">RiemannHypothesisUpTo (T : ℝ) : Prop</code>",
 "96":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.401&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.401&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-TauCeti.green_ac_index_one&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;TauCeti.green_ac_index_one&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;p&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Prop&quot;]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;p&quot;]]]]]]]]]]]}\">TauCeti.green_ac_index_one {p : Prop} : p</code>",
 "95":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;336&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-curl&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;curl&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,336,&quot;ℂ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,337,&quot;ℝ&quot;]]]]]]]]],&quot;)&quot;]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,336,&quot;ℂ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,337,&quot;ℝ&quot;]]]]]]]]],&quot;)&quot;]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;ℂ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,341,&quot;ℝ&quot;]]]]]]]]]]]]]]]]]]]]]]]]}\">curl : (ℂ → ℝ) → (ℂ → ℝ) → ℂ → ℝ</code>",
 "94":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;336&quot;:{&quot;binding&quot;:&quot;const-Set&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-IntegrableOn&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;IntegrableOn&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,80,&quot;ℂ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,81,&quot;ℝ&quot;]]]]]]]]],&quot;)&quot;]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;Set&quot;]]],[4,1,[6,[3,2,[7,337,&quot;ℂ&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,85,&quot;Prop&quot;]]]]]]]]]]]]]]]]]]]}\">IntegrableOn : (ℂ → ℝ) → Set ℂ → Prop</code>",
 "93":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-volume&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;const-Measure&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;volume&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,5,&quot;Measure&quot;]]]]]]]]]}\">volume : Measure</code>",
 "92":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1360&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1364&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1365&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-circulationFun&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;circulationFun&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,336,&quot;ℂ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,337,&quot;ℝ&quot;]]]]]]]]],&quot;)&quot;]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,336,&quot;ℂ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,337,&quot;ℝ&quot;]]]]]]]]],&quot;)&quot;]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1361,&quot;ℂ&quot;]]]]]]]]],&quot;)&quot;]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,1364,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1365,&quot;ℝ&quot;]]]]]]]]]]]]]]]]]]]]]]]]]]]]]}\">circulationFun : (ℂ → ℝ) → (ℂ → ℝ) → (ℝ → ℂ) → ℝ → ℝ</code>",
 "91":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1364&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1365&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-IntervalIntegrable&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Measure&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;IntervalIntegrable&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,80,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,81,&quot;ℝ&quot;]]]]]]]]],&quot;)&quot;]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,84,&quot;Measure&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,1364,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,1364,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1365,&quot;Prop&quot;]]]]]]]]]]]]]]]]]]]]]]]]]]]]]}\">IntervalIntegrable : (ℝ → ℝ) → Measure → ℝ → ℝ → Prop</code>",
 "90": "<code>Int</code>",
 "9": "<code>odd (n : Nat) : Prop</code>",
 "89":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1364&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1365&quot;:{&quot;binding&quot;:&quot;const-Int&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Contour.windingNumber&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Contour.windingNumber&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,80,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,81,&quot;ℂ&quot;]]]]]]]]],&quot;)&quot;]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,1364,&quot;ℂ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1365,&quot;Int&quot;]]]]]]]]]]]]]]]]]]]]]]]]]]]]]}\">Contour.windingNumber : (ℝ → ℂ) → ℝ → ℝ → ℂ → Int</code>",
 "88":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;ℂ&quot;]]]]}\">ℂ</code>",
 "87":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1315152&quot;:{&quot;binding&quot;:&quot;const-uIcc&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1315153&quot;:{&quot;binding&quot;:&quot;var-_uniq.8&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1349&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20548&quot;:{&quot;binding&quot;:&quot;const-filledHull&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;20561&quot;:{&quot;binding&quot;:&quot;var-_uniq.6&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20565&quot;:{&quot;binding&quot;:&quot;var-_uniq.10&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21569&quot;:{&quot;binding&quot;:&quot;var-_uniq.8&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;328785&quot;:{&quot;binding&quot;:&quot;var-_uniq.6&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;328789&quot;:{&quot;binding&quot;:&quot;var-_uniq.10&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5393&quot;:{&quot;binding&quot;:&quot;var-_uniq.10&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;82256&quot;:{&quot;binding&quot;:&quot;const-uIcc&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;82257&quot;:{&quot;binding&quot;:&quot;var-_uniq.8&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;86272&quot;:{&quot;binding&quot;:&quot;const-Contour.windingNumber&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;86273&quot;:{&quot;binding&quot;:&quot;var-_uniq.6&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,&quot;∀&quot;,[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;z&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,4,&quot;ℂ&quot;]]],&quot;)&quot;]]]]]]],[4,&quot;,&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,81,&quot;z&quot;]]],[4,[4,&quot; ∈&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,20548,&quot;filledHull&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,328785,&quot;γ&quot;]]],[4,[4,&quot; ''&quot;,1],[6,[3,2,[4,[6,[3,2,[7,1315152,&quot;uIcc&quot;]]],[4,1,[4,[6,[3,2,[7,1315153,&quot;a&quot;]]],[4,1,[6,[3,2,[7,328789,&quot;b&quot;]]]]]]]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; \\\\&quot;,1],[6,[3,2,[4,[6,[3,2,[7,20561,&quot;γ&quot;]]],[4,[4,&quot; ''&quot;,1],[6,[3,2,[4,[6,[3,2,[7,82256,&quot;uIcc&quot;]]],[4,1,[4,[6,[3,2,[7,82257,&quot;a&quot;]]],[4,1,[6,[3,2,[7,20565,&quot;b&quot;]]]]]]]]]]]]]]]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,86272,&quot;Contour.windingNumber&quot;]]],[4,1,[4,[6,[3,2,[7,86273,&quot;γ&quot;]]],[4,1,[4,[6,[3,2,[7,21569,&quot;a&quot;]]],[4,1,[4,[6,[3,2,[7,5393,&quot;b&quot;]]],[4,1,[6,[3,2,[7,1349,&quot;z&quot;]]]]]]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[7,85,&quot;1&quot;]]]]]]]]]]]]]]]]]]]]}\">∀ (z : ℂ), z ∈ filledHull (γ '' uIcc a b) \\ γ '' uIcc a b → Contour.windingNumber γ a b z = 1</code>",
 "86":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.20&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;256&quot;:{&quot;binding&quot;:&quot;const-ContDiffOn&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;257&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.12&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,256,&quot;ContDiffOn&quot;]]],[4,1,[4,[6,[3,2,[7,257,&quot;ℝ&quot;]]],[4,1,[4,[6,[3,2,[7,65,&quot;1&quot;]]],[4,1,[4,[6,[3,2,[7,17,&quot;Q&quot;]]],[4,1,[6,[3,2,[7,5,&quot;U&quot;]]]]]]]]]]]]]]}\">ContDiffOn ℝ 1 Q U</code>",
 "85": "<code>ℕ</code>",
 "84":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1360&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1365&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.401&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;sort-7243200735919010059&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-ContDiffOn&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-Set&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;ContDiffOn&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;𝕜&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Type&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,84,&quot;ℕ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;ℂ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1361,&quot;ℝ&quot;]]]]]]]]],&quot;)&quot;]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;Set&quot;]]],[4,1,[6,[3,2,[7,5457,&quot;ℂ&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1365,&quot;Prop&quot;]]]]]]]]]]]]]]]]]]]]]]]]]]}\">ContDiffOn (𝕜 : Type) : ℕ → (ℂ → ℝ) → Set ℂ → Prop</code>",
 "83":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.16&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;256&quot;:{&quot;binding&quot;:&quot;const-ContDiffOn&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;257&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.12&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,256,&quot;ContDiffOn&quot;]]],[4,1,[4,[6,[3,2,[7,257,&quot;ℝ&quot;]]],[4,1,[4,[6,[3,2,[7,65,&quot;1&quot;]]],[4,1,[4,[6,[3,2,[7,17,&quot;P&quot;]]],[4,1,[6,[3,2,[7,5,&quot;U&quot;]]]]]]]]]]]]]]}\">ContDiffOn ℝ 1 P U</code>",
 "82":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;340&quot;:{&quot;binding&quot;:&quot;const-Set&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-uIcc&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;uIcc&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,84,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,84,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;Set&quot;]]],[4,1,[6,[3,2,[7,341,&quot;ℝ&quot;]]]]]]]]]]]]]]]]]]]]]]]}\">uIcc : ℝ → ℝ → Set ℝ</code>",
 "81":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-filledHull&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Set&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Set&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;filledHull&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,80,&quot;Set&quot;]]],[4,1,[6,[3,2,[7,81,&quot;ℂ&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,84,&quot;Set&quot;]]],[4,1,[6,[3,2,[7,85,&quot;ℂ&quot;]]]]]]]]]]]]]]]]]]}\">filledHull : Set ℂ → Set ℂ</code>",
 "80":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1105&quot;:{&quot;binding&quot;:&quot;var-_uniq.6&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1109&quot;:{&quot;binding&quot;:&quot;var-_uniq.10&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4432&quot;:{&quot;binding&quot;:&quot;const-uIcc&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4433&quot;:{&quot;binding&quot;:&quot;var-_uniq.8&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.12&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;68&quot;:{&quot;binding&quot;:&quot;const-filledHull&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,68,&quot;filledHull&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,1105,&quot;γ&quot;]]],[4,[4,&quot; ''&quot;,1],[6,[3,2,[4,[6,[3,2,[7,4432,&quot;uIcc&quot;]]],[4,1,[4,[6,[3,2,[7,4433,&quot;a&quot;]]],[4,1,[6,[3,2,[7,1109,&quot;b&quot;]]]]]]]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; ⊆&quot;,1],[6,[3,2,[7,5,&quot;U&quot;]]]]]]]]}\">filledHull (γ '' uIcc a b) ⊆ U</code>",
 "8":
 "<code>Nat : Type</code><span class=\"sep\"></span><code class=\"docstring\">The natural numbers, starting at zero.\n\nThis type is special-cased by both the kernel and the compiler, and overridden with an efficient\nimplementation. Both use a fast arbitrary-precision arithmetic library (usually\n[GMP](https://gmplib.org/)); at runtime, `Nat` values that are sufficiently small are unboxed.\n</code>",
 "79":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;21&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-IsOpen&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Set&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;IsOpen&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,80,&quot;Set&quot;]]],[4,1,[6,[3,2,[7,81,&quot;ℂ&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,21,&quot;Prop&quot;]]]]]]]]]]]]]]}\">IsOpen : Set ℂ → Prop</code>",
 "78":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-IsOpen&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.12&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;IsOpen&quot;]]],[4,1,[6,[3,2,[7,5,&quot;U&quot;]]]]]]]]}\">IsOpen U</code>",
 "77":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;20&quot;:{&quot;binding&quot;:&quot;var-_uniq.6&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.10&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;68&quot;:{&quot;binding&quot;:&quot;var-_uniq.6&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;69&quot;:{&quot;binding&quot;:&quot;var-_uniq.8&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,68,&quot;γ&quot;]]],[4,1,[6,[3,2,[7,69,&quot;a&quot;]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[7,20,&quot;γ&quot;]]],[4,1,[6,[3,2,[7,21,&quot;b&quot;]]]]]]]]]]]]}\">γ a = γ b</code>",
 "76":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;340&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-AbsolutelyContinuousOnInterval&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;AbsolutelyContinuousOnInterval&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,80,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,81,&quot;ℂ&quot;]]]]]]]]],&quot;)&quot;]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,341,&quot;Prop&quot;]]]]]]]]]]]]]]]]]]]]]]]]}\">AbsolutelyContinuousOnInterval : (ℝ → ℂ) → ℝ → ℝ → Prop</code>",
 "75":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.8&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.10&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;64&quot;:{&quot;binding&quot;:&quot;const-AbsolutelyContinuousOnInterval&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;65&quot;:{&quot;binding&quot;:&quot;var-_uniq.6&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,64,&quot;AbsolutelyContinuousOnInterval&quot;]]],[4,1,[4,[6,[3,2,[7,65,&quot;γ&quot;]]],[4,1,[4,[6,[3,2,[7,17,&quot;a&quot;]]],[4,1,[6,[3,2,[7,5,&quot;b&quot;]]]]]]]]]]]]}\">AbsolutelyContinuousOnInterval γ a b</code>",
 "74":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.8&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.10&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,17,&quot;a&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[7,5,&quot;b&quot;]]]]]]]]}\">a &lt; b</code>",
 "73":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;ℂ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,5,&quot;ℝ&quot;]]]]]]]]]}\">ℂ → ℝ</code>",
 "72":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.401&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;sort-7243200735919010059&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;sort-7243200735919010059&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Set&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Set&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Type&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Type&quot;]]]]]]]]]]]}\">Set (α : Type) : Type</code>",
 "71":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Set&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Set&quot;]]],[4,1,[6,[3,2,[7,5,&quot;ℂ&quot;]]]]]]]]}\">Set ℂ</code>",
 "70":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;ℝ&quot;]]]]}\">ℝ</code>",
 "7":
 "<code class=\"docstring\">`by tac` constructs a term of the expected type by running the tactic(s) `tac`. </code>",
 "69":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;sort-7243200735919010059&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Complex&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,5,&quot;Type&quot;]]]]]]]]]}\">Complex : Type</code>",
 "68":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;sort-7243200735919010059&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Real&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,5,&quot;Type&quot;]]]]]]]]]}\">Real : Type</code>",
 "67":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,5,&quot;ℂ&quot;]]]]]]]]]}\">ℝ → ℂ</code>",
 "66":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;10&quot;:{&quot;binding&quot;:&quot;var-_uniq.405&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;13&quot;:{&quot;binding&quot;:&quot;var-_uniq.408&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1398081&quot;:{&quot;binding&quot;:&quot;var-_uniq.403&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1398097&quot;:{&quot;binding&quot;:&quot;var-_uniq.404&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;14&quot;:{&quot;binding&quot;:&quot;var-_uniq.409&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1431655684&quot;:{&quot;binding&quot;:&quot;const-filledHull&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1431655745&quot;:{&quot;binding&quot;:&quot;var-_uniq.406&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1431655761&quot;:{&quot;binding&quot;:&quot;var-_uniq.405&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1466015502661&quot;:{&quot;binding&quot;:&quot;var-_uniq.424&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1466015503425&quot;:{&quot;binding&quot;:&quot;const-volume&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1466015503632&quot;:{&quot;binding&quot;:&quot;const-IntegrableOn&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1466015503685&quot;:{&quot;binding&quot;:&quot;var-_uniq.404&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1466015503696&quot;:{&quot;binding&quot;:&quot;const-setIntegral&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;15&quot;:{&quot;binding&quot;:&quot;var-_uniq.410&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1501199874658640&quot;:{&quot;binding&quot;:&quot;const-uIcc&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1501199874658641&quot;:{&quot;binding&quot;:&quot;var-_uniq.403&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1501199875723600&quot;:{&quot;binding&quot;:&quot;const-uIcc&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1501199875723601&quot;:{&quot;binding&quot;:&quot;var-_uniq.403&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1501199875772497&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1501199875789136&quot;:{&quot;binding&quot;:&quot;const-uIcc&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1501199875789137&quot;:{&quot;binding&quot;:&quot;var-_uniq.403&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;22369536&quot;:{&quot;binding&quot;:&quot;const-AbsolutelyContinuousOnInterval&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;22369537&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;22369604&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;22369605&quot;:{&quot;binding&quot;:&quot;var-_uniq.404&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;22369616&quot;:{&quot;binding&quot;:&quot;const-IsOpen&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;22369617&quot;:{&quot;binding&quot;:&quot;var-_uniq.405&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;22906490961&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;22906490965&quot;:{&quot;binding&quot;:&quot;var-_uniq.404&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;22906491904&quot;:{&quot;binding&quot;:&quot;const-ContDiffOn&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;22906491905&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;23456248041540&quot;:{&quot;binding&quot;:&quot;const-filledHull&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;23456248041553&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;23456248041557&quot;:{&quot;binding&quot;:&quot;var-_uniq.404&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;23456248042561&quot;:{&quot;binding&quot;:&quot;var-_uniq.403&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;23456248054789&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;23456248058128&quot;:{&quot;binding&quot;:&quot;const-curl&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;23456248058129&quot;:{&quot;binding&quot;:&quot;var-_uniq.406&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;23456248058180&quot;:{&quot;binding&quot;:&quot;const-filledHull&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;23456248058193&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;23456248058197&quot;:{&quot;binding&quot;:&quot;var-_uniq.404&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;23456248058944&quot;:{&quot;binding&quot;:&quot;const-intervalIntegral&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;23456248059157&quot;:{&quot;binding&quot;:&quot;var-_uniq.462&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;23456248059204&quot;:{&quot;binding&quot;:&quot;const-filledHull&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;23456248059217&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;23456248059221&quot;:{&quot;binding&quot;:&quot;var-_uniq.404&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;24019198012359936&quot;:{&quot;binding&quot;:&quot;const-circulationFun&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;24019198012359937&quot;:{&quot;binding&quot;:&quot;var-_uniq.406&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;32&quot;:{&quot;binding&quot;:&quot;var-_uniq.411&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;33&quot;:{&quot;binding&quot;:&quot;var-_uniq.412&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;34&quot;:{&quot;binding&quot;:&quot;var-_uniq.420&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;349521&quot;:{&quot;binding&quot;:&quot;var-_uniq.404&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;35&quot;:{&quot;binding&quot;:&quot;var-_uniq.421&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;357913937&quot;:{&quot;binding&quot;:&quot;var-_uniq.405&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;36&quot;:{&quot;binding&quot;:&quot;var-_uniq.422&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;366503875857&quot;:{&quot;binding&quot;:&quot;var-_uniq.403&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;37&quot;:{&quot;binding&quot;:&quot;var-_uniq.424&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;375299968664657&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;375299968664661&quot;:{&quot;binding&quot;:&quot;var-_uniq.404&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;375299968876608&quot;:{&quot;binding&quot;:&quot;const-circulationFun&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;375299968876609&quot;:{&quot;binding&quot;:&quot;var-_uniq.406&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;375299968930897&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;375299968930901&quot;:{&quot;binding&quot;:&quot;var-_uniq.404&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;375299968943125&quot;:{&quot;binding&quot;:&quot;var-_uniq.461&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;375299968946496&quot;:{&quot;binding&quot;:&quot;const-curl&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;375299968946497&quot;:{&quot;binding&quot;:&quot;var-_uniq.406&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;375299968947281&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;375299968947285&quot;:{&quot;binding&quot;:&quot;var-_uniq.404&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;39&quot;:{&quot;binding&quot;:&quot;var-_uniq.444&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-green_ac_index_one&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;40&quot;:{&quot;binding&quot;:&quot;var-_uniq.461&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;41&quot;:{&quot;binding&quot;:&quot;var-_uniq.462&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-Set&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5592385&quot;:{&quot;binding&quot;:&quot;var-_uniq.403&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5726623041&quot;:{&quot;binding&quot;:&quot;var-_uniq.408&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5726623056&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5864062010641&quot;:{&quot;binding&quot;:&quot;var-_uniq.404&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5864062013696&quot;:{&quot;binding&quot;:&quot;const-IntervalIntegrable&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5864062014533&quot;:{&quot;binding&quot;:&quot;var-_uniq.408&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5864062014737&quot;:{&quot;binding&quot;:&quot;var-_uniq.403&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;6004799503089985&quot;:{&quot;binding&quot;:&quot;var-_uniq.408&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87376&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87377&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;89478404&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;89478405&quot;:{&quot;binding&quot;:&quot;var-_uniq.403&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;89478481&quot;:{&quot;binding&quot;:&quot;var-_uniq.405&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.404&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;91625963856&quot;:{&quot;binding&quot;:&quot;const-uIcc&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;91625963857&quot;:{&quot;binding&quot;:&quot;var-_uniq.403&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;91625968640&quot;:{&quot;binding&quot;:&quot;const-ContDiffOn&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;91625968641&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;91625968913&quot;:{&quot;binding&quot;:&quot;var-_uniq.424&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;91625968965&quot;:{&quot;binding&quot;:&quot;var-_uniq.404&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;93824992166224&quot;:{&quot;binding&quot;:&quot;const-uIcc&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;93824992166225&quot;:{&quot;binding&quot;:&quot;var-_uniq.403&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;93824992170240&quot;:{&quot;binding&quot;:&quot;const-Contour.windingNumber&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;93824992170241&quot;:{&quot;binding&quot;:&quot;var-_uniq.402&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;93824992219153&quot;:{&quot;binding&quot;:&quot;var-_uniq.408&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;93824992232784&quot;:{&quot;binding&quot;:&quot;const-uIcc&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;93824992232785&quot;:{&quot;binding&quot;:&quot;var-_uniq.403&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;93824992236625&quot;:{&quot;binding&quot;:&quot;var-_uniq.408&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;93824992236880&quot;:{&quot;binding&quot;:&quot;const-uIcc&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;93824992236881&quot;:{&quot;binding&quot;:&quot;var-_uniq.403&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;green_ac_index_one&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,3,&quot;γ&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,80,&quot;ℝ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,81,&quot;ℂ&quot;]]]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[4,&quot;a&quot;,1],[4,[7,9,&quot;b&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,340,&quot;ℝ&quot;]]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,10,&quot;U&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;Set&quot;]]],[4,1,[6,[3,2,[7,5457,&quot;ℂ&quot;]]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[4,&quot;P&quot;,1],[4,[7,13,&quot;Q&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,87376,&quot;ℂ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,87377,&quot;ℝ&quot;]]]]]]]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,14,&quot;hab&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1398081,&quot;a&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[7,349521,&quot;b&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,15,&quot;hγ&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,22369536,&quot;AbsolutelyContinuousOnInterval&quot;]]],[4,1,[4,[6,[3,2,[7,22369537,&quot;γ&quot;]]],[4,1,[4,[6,[3,2,[7,5592385,&quot;a&quot;]]],[4,1,[6,[3,2,[7,1398097,&quot;b&quot;]]]]]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,32,&quot;hclosed&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,89478404,&quot;γ&quot;]]],[4,1,[6,[3,2,[7,89478405,&quot;a&quot;]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[7,22369604,&quot;γ&quot;]]],[4,1,[6,[3,2,[7,22369605,&quot;b&quot;]]]]]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,33,&quot;hU&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,22369616,&quot;IsOpen&quot;]]],[4,1,[6,[3,2,[7,22369617,&quot;U&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,34,&quot;hregion&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,1431655684,&quot;filledHull&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,22906490961,&quot;γ&quot;]]],[4,[4,&quot; ''&quot;,1],[6,[3,2,[4,[6,[3,2,[7,91625963856,&quot;uIcc&quot;]]],[4,1,[4,[6,[3,2,[7,91625963857,&quot;a&quot;]]],[4,1,[6,[3,2,[7,22906490965,&quot;b&quot;]]]]]]]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; ⊆&quot;,1],[6,[3,2,[7,89478481,&quot;U&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,35,&quot;hP&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,22906491904,&quot;ContDiffOn&quot;]]],[4,1,[4,[6,[3,2,[7,22906491905,&quot;ℝ&quot;]]],[4,1,[4,[6,[3,2,[7,5726622977,&quot;1&quot;]]],[4,1,[4,[6,[3,2,[7,1431655745,&quot;P&quot;]]],[4,1,[6,[3,2,[7,357913937,&quot;U&quot;]]]]]]]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,36,&quot;hQ&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,91625968640,&quot;ContDiffOn&quot;]]],[4,1,[4,[6,[3,2,[7,91625968641,&quot;ℝ&quot;]]],[4,1,[4,[6,[3,2,[7,22906492161,&quot;1&quot;]]],[4,1,[4,[6,[3,2,[7,5726623041,&quot;Q&quot;]]],[4,1,[6,[3,2,[7,1431655761,&quot;U&quot;]]]]]]]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,39,&quot;hindex&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;∀&quot;,[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,37,&quot;z&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,5726623056,&quot;ℂ&quot;]]],&quot;)&quot;]]]]]]],[4,&quot;,&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,91625968913,&quot;z&quot;]]],[4,[4,&quot; ∈&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,23456248041540,&quot;filledHull&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,375299968664657,&quot;γ&quot;]]],[4,[4,&quot; ''&quot;,1],[6,[3,2,[4,[6,[3,2,[7,1501199874658640,&quot;uIcc&quot;]]],[4,1,[4,[6,[3,2,[7,1501199874658641,&quot;a&quot;]]],[4,1,[6,[3,2,[7,375299968664661,&quot;b&quot;]]]]]]]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; \\\\&quot;,1],[6,[3,2,[4,[6,[3,2,[7,23456248041553,&quot;γ&quot;]]],[4,[4,&quot; ''&quot;,1],[6,[3,2,[4,[6,[3,2,[7,93824992166224,&quot;uIcc&quot;]]],[4,1,[4,[6,[3,2,[7,93824992166225,&quot;a&quot;]]],[4,1,[6,[3,2,[7,23456248041557,&quot;b&quot;]]]]]]]]]]]]]]]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,93824992170240,&quot;Contour.windingNumber&quot;]]],[4,1,[4,[6,[3,2,[7,93824992170241,&quot;γ&quot;]]],[4,1,[4,[6,[3,2,[7,23456248042561,&quot;a&quot;]]],[4,1,[4,[6,[3,2,[7,5864062010641,&quot;b&quot;]]],[4,1,[6,[3,2,[7,1466015502661,&quot;z&quot;]]]]]]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[7,91625968917,&quot;1&quot;]]]]]]]]]]]]]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,5864062013696,&quot;IntervalIntegrable&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,375299968876608,&quot;circulationFun&quot;]]],[4,1,[4,[6,[3,2,[7,375299968876609,&quot;P&quot;]]],[4,1,[4,[6,[3,2,[7,93824992219153,&quot;Q&quot;]]],[4,1,[6,[3,2,[7,23456248054789,&quot;γ&quot;]]]]]]]]]]]],&quot;)&quot;]]]],[4,1,[4,[6,[3,2,[7,1466015503425,&quot;volume&quot;]]],[4,1,[4,[6,[3,2,[7,366503875857,&quot;a&quot;]]],[4,1,[6,[3,2,[7,91625968965,&quot;b&quot;]]]]]]]]]]]]],[4,[4,&quot; ∧&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,1466015503632,&quot;IntegrableOn&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,23456248058128,&quot;curl&quot;]]],[4,1,[4,[6,[3,2,[7,23456248058129,&quot;P&quot;]]],[4,1,[6,[3,2,[7,5864062014533,&quot;Q&quot;]]]]]]]]]],&quot;)&quot;]]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,23456248058180,&quot;filledHull&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,375299968930897,&quot;γ&quot;]]],[4,[4,&quot; ''&quot;,1],[6,[3,2,[4,[6,[3,2,[7,1501199875723600,&quot;uIcc&quot;]]],[4,1,[4,[6,[3,2,[7,1501199875723601,&quot;a&quot;]]],[4,1,[6,[3,2,[7,375299968930901,&quot;b&quot;]]]]]]]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; \\\\&quot;,1],[6,[3,2,[4,[6,[3,2,[7,23456248058193,&quot;γ&quot;]]],[4,[4,&quot; ''&quot;,1],[6,[3,2,[4,[6,[3,2,[7,93824992232784,&quot;uIcc&quot;]]],[4,1,[4,[6,[3,2,[7,93824992232785,&quot;a&quot;]]],[4,1,[6,[3,2,[7,23456248058197,&quot;b&quot;]]]]]]]]]]]]]]]]]],&quot;)&quot;]]]]]]]]]],[4,[4,&quot; ∧&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,23456248058944,&quot;intervalIntegral&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[4,&quot;fun&quot;,[4,[6,[3,2,[4,1,[4,[6,[3,2,[7,40,&quot;t&quot;]]],&quot; =>&quot;]]]],[4,1,[6,[3,2,[4,[6,[3,2,[7,24019198012359936,&quot;circulationFun&quot;]]],[4,1,[4,[6,[3,2,[7,24019198012359937,&quot;P&quot;]]],[4,1,[4,[6,[3,2,[7,6004799503089985,&quot;Q&quot;]]],[4,1,[4,[6,[3,2,[7,1501199875772497,&quot;γ&quot;]]],[4,1,[6,[3,2,[7,375299968943125,&quot;t&quot;]]]]]]]]]]]]]]]],&quot;)&quot;]]]],[4,1,[4,[6,[3,2,[7,5864062014737,&quot;a&quot;]]],[4,1,[6,[3,2,[7,1466015503685,&quot;b&quot;]]]]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[7,1466015503696,&quot;setIntegral&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[4,&quot;fun&quot;,[4,[6,[3,2,[4,1,[4,[6,[3,2,[7,41,&quot;z&quot;]]],&quot; =>&quot;]]]],[4,1,[6,[3,2,[4,[6,[3,2,[7,375299968946496,&quot;curl&quot;]]],[4,1,[4,[6,[3,2,[7,375299968946497,&quot;P&quot;]]],[4,1,[4,[6,[3,2,[7,93824992236625,&quot;Q&quot;]]],[4,1,[6,[3,2,[7,23456248059157,&quot;z&quot;]]]]]]]]]]]]]],&quot;)&quot;]]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,23456248059204,&quot;filledHull&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,375299968947281,&quot;γ&quot;]]],[4,[4,&quot; ''&quot;,1],[6,[3,2,[4,[6,[3,2,[7,1501199875789136,&quot;uIcc&quot;]]],[4,1,[4,[6,[3,2,[7,1501199875789137,&quot;a&quot;]]],[4,1,[6,[3,2,[7,375299968947285,&quot;b&quot;]]]]]]]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; \\\\&quot;,1],[6,[3,2,[4,[6,[3,2,[7,23456248059217,&quot;γ&quot;]]],[4,[4,&quot; ''&quot;,1],[6,[3,2,[4,[6,[3,2,[7,93824992236880,&quot;uIcc&quot;]]],[4,1,[4,[6,[3,2,[7,93824992236881,&quot;a&quot;]]],[4,1,[6,[3,2,[7,23456248059221,&quot;b&quot;]]]]]]]]]]]]]]]]]],&quot;)&quot;]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]}\">green_ac_index_one {γ : ℝ → ℂ} {a b : ℝ} {U : Set ℂ} {P Q : ℂ → ℝ} (hab : a &lt; b)\n  (hγ : AbsolutelyContinuousOnInterval γ a b) (hclosed : γ a = γ b) (hU : IsOpen U)\n  (hregion : filledHull (γ '' uIcc a b) ⊆ U) (hP : ContDiffOn ℝ 1 P U) (hQ : ContDiffOn ℝ 1 Q U)\n  (hindex : ∀ (z : ℂ), z ∈ filledHull (γ '' uIcc a b) \\ γ '' uIcc a b → Contour.windingNumber γ a b z = 1) :\n  IntervalIntegrable (circulationFun P Q γ) volume a b ∧\n    IntegrableOn (curl P Q) (filledHull (γ '' uIcc a b) \\ γ '' uIcc a b) ∧\n      intervalIntegral (fun t =&gt; circulationFun P Q γ t) a b =\n        setIntegral (fun z =&gt; curl P Q z) (filledHull (γ '' uIcc a b) \\ γ '' uIcc a b)</code>",
 "65":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.186&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.187&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Finset&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.186&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Finset.card&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;s&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;Finset&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,85,&quot;ℕ&quot;]]]]]]]]]]]]]}\">Finset.card.{u} {α : Type u} (s : Finset α) : ℕ</code>",
 "64":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1348&quot;:{&quot;binding&quot;:&quot;const-Finset&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1364&quot;:{&quot;binding&quot;:&quot;const-Assignment&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.186&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.186&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.187&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Finset&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-Finset&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5396&quot;:{&quot;binding&quot;:&quot;const-Literal&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5397&quot;:{&quot;binding&quot;:&quot;var-_uniq.186&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;satisfyingAssignments&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;V&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;F&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;Finset&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,1348,&quot;Finset&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,5396,&quot;Literal&quot;]]],[4,1,[6,[3,2,[7,5397,&quot;V&quot;]]]]]]]],&quot;)&quot;]]]]]]]]],&quot;)&quot;]]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;Finset&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,1364,&quot;Assignment&quot;]]],[4,1,[6,[3,2,[7,1365,&quot;V&quot;]]]]]]]],&quot;)&quot;]]]]]]]]]]]]]]]]]]}\">satisfyingAssignments.{u} {V : Type u} (F : Finset (Finset (Literal V))) : Finset (Assignment V)</code>",
 "63":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.186&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;CNF&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;V&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">CNF.{u} (V : Type u) : Type u</code>",
 "62":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.186&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.187&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-CNF&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.186&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;count&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;V&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;F&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;CNF&quot;]]],[4,1,[6,[3,2,[7,337,&quot;V&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,85,&quot;ℕ&quot;]]]]]]]]]]]]]}\">count.{u} {V : Type u} (F : CNF V) : ℕ</code>",
 "61":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.132&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.30&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Finset&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.132&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Finset.card&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;s&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;Finset&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,85,&quot;ℕ&quot;]]]]]]]]]]]]]}\">Finset.card.{u} {α : Type u} (s : Finset α) : ℕ</code>",
 "60":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Clause&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.30&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Clause&quot;]]],[4,1,[6,[3,2,[7,5,&quot;V&quot;]]]]]]]]}\">Clause V</code>",
 "6":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1675&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Prop&quot;]]]]]]]]]]]}\">odd (n : Nat) : Prop</code>",
 "59":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.132&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;CNF&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;V&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">CNF.{u} (V : Type u) : Type u</code>",
 "58":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-CNF&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.30&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;CNF&quot;]]],[4,1,[6,[3,2,[7,5,&quot;V&quot;]]]]]]]]}\">CNF V</code>",
 "57":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;ℕ&quot;]]]]}\">ℕ</code>",
 "56":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1360&quot;:{&quot;binding&quot;:&quot;const-CNF&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.132&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.132&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.30&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.134&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;WidthAtMost&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;V&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;k&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;ℕ&quot;]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;F&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;CNF&quot;]]],[4,1,[6,[3,2,[7,1361,&quot;V&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,341,&quot;Prop&quot;]]]]]]]]]]]]]]]}\">WidthAtMost.{u} {V : Type u} (k : ℕ) (F : CNF V) : Prop</code>",
 "55":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.29&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Clause&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;V&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Clause.{u} (V : Type u) : Type u</code>",
 "54":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.29&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Finset&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Finset.{u} (α : Type u) : Type u</code>",
 "53":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.29&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;CNF&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;V&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">CNF.{u} (V : Type u) : Type u</code>",
 "52":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.15&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Literal&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;V&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Literal.{u} (V : Type u) : Type u</code>",
 "51":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.15&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Finset&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Finset.{u} (α : Type u) : Type u</code>",
 "50": "<code class=\"docstring\">The universe parameter u</code>",
 "5":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.1675&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1675&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.1675&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-square_of_odd_is_odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.1675&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;square_of_odd_is_odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;odd&quot;]]],[4,1,[6,[3,2,[7,337,&quot;n&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;odd&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,5457,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,1365,&quot;n&quot;]]]]]]]],&quot;)&quot;]]]]]]]]]]]]]]]]]]]]]}\">square_of_odd_is_odd {n : Nat} : odd n → odd (n * n)</code>",
 "49":
 "<code data-rich-format=\"{&quot;annotations&quot;:{},&quot;fmt&quot;:[6,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]}\">Type u</code>",
 "48":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.15&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Clause&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;V&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Clause.{u} (V : Type u) : Type u</code>",
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
 "113":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.33&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.33&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-LeanZip.zlib_decompressSingle_compress&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;LeanZip.zlib_decompressSingle_compress&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;p&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Prop&quot;]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;p&quot;]]]]]]]]]]]}\">LeanZip.zlib_decompressSingle_compress {p : Prop} : p</code>",
 "112":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.34&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.33&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.34&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;var-_uniq.34&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-Except&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.33&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Except.ok&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],[4,&quot;,&quot;,[4,1,[4,[6,[3,2,&quot;v&quot;]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;ε&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,3,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;v&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;Except&quot;]]],[4,1,[4,[6,[3,2,[7,5457,&quot;ε&quot;]]],[4,1,[6,[3,2,[7,1365,&quot;α&quot;]]]]]]]]]]]]]]]]]]]]]]]]}\">Except.ok.{u, v} {ε : Type u} {α : Type v} : α → Except ε α</code><span class=\"sep\"></span><code class=\"docstring\">A success value of type `α` </code>",
 "111":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.33&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-ByteArray&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.34&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-ZlibEncode.compress&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-UInt8&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;const-ByteArray&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;ZlibEncode.compress&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;data&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;ByteArray&quot;]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;level&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;UInt8&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,85,&quot;ByteArray&quot;]]]]]]]]]]]]]}\">ZlibEncode.compress (data : ByteArray) (level : UInt8) : ByteArray</code>",
 "110":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1345&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1360&quot;:{&quot;binding&quot;:&quot;const-Except&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;const-String&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.33&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-ByteArray&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.34&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;const-ByteArray&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-ZlibDecode.decompressSingle&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;ZlibDecode.decompressSingle&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;data&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;ByteArray&quot;]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;maxOutputSize&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,1345,&quot;ℕ&quot;]]],[4,&quot; :=&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,86289,&quot;1024&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,21573,&quot;1024&quot;]]]]]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,1349,&quot;1024&quot;]]]]]]],&quot;)&quot;]]]]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;Except&quot;]]],[4,1,[4,[6,[3,2,[7,1361,&quot;String&quot;]]],[4,1,[6,[3,2,[7,341,&quot;ByteArray&quot;]]]]]]]]]]]]]]]]]]]}\">ZlibDecode.decompressSingle (data : ByteArray) (maxOutputSize : ℕ := 1024 * 1024 * 1024) : Except String ByteArray</code>",
 "11":
 "<code class=\"docstring\">Introduces one or more hypotheses, optionally naming and/or pattern-matching them.\nFor each hypothesis to be introduced, the remaining main goal's target type must\nbe a `let` or function type.\n\n* `intro` by itself introduces one anonymous hypothesis, which can be accessed\n  by e.g. `assumption`. It is equivalent to `intro _`.\n* `intro x y` introduces two hypotheses and names them. Individual hypotheses\n  can be anonymized via `_`, given a type ascription, or matched against a pattern:\n  ```lean\n  -- ... ⊢ α × β → ...\n  intro (a, b)\n  -- ..., a : α, b : β ⊢ ...\n  ```\n* `intro rfl` is short for `intro h; subst h`, if `h` is an equality where the left-hand or right-hand side\n  is a variable.\n* Alternatively, `intro` can be combined with pattern matching much like `fun`:\n  ```lean\n  intro\n  | n + 1, 0 =&gt; tac\n  | ...\n  ```\n</code>",
 "109":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;20&quot;:{&quot;binding&quot;:&quot;const-ByteArray&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-ByteArray.size&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;ByteArray.size&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,20,&quot;ByteArray&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,21,&quot;ℕ&quot;]]]]]]]]]]]]]]}\">ByteArray.size : ByteArray → ℕ</code><span class=\"sep\"></span><code class=\"docstring\">Returns the number of bytes in the byte array.\n\nThis is the number of bytes actually in the array, as distinct from its capacity, which is the\namount of memory presently allocated for the array.\n</code>",
 "108":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.8&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;68&quot;:{&quot;binding&quot;:&quot;const-ByteArray.size&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;69&quot;:{&quot;binding&quot;:&quot;var-_uniq.4&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,69,&quot;data&quot;]]],[4,&quot;.&quot;,[7,68,&quot;size&quot;]]]]],[4,[4,&quot; ≤&quot;,1],[6,[3,2,[7,5,&quot;maxOutputSize&quot;]]]]]]]]}\">data.size ≤ maxOutputSize</code>",
 "107":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-UInt8&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;sort-7243200735919010059&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;UInt8&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,5,&quot;Type&quot;]]]]]]]]]}\">UInt8 : Type</code><span class=\"sep\"></span><code class=\"docstring\">Unsigned 8-bit integers.\n\nThis type has special support in the compiler so it can be represented by an unboxed 8-bit value\nrather than wrapping a `BitVec 8`.\n</code>",
 "106":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;const-UInt8&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;UInt8&quot;]]]]}\">UInt8</code>",
 "105":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-ByteArray&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;sort-7243200735919010059&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;ByteArray&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,5,&quot;Type&quot;]]]]]]]]]}\">ByteArray : Type</code><span class=\"sep\"></span><code class=\"docstring\">`ByteArray` is like `Array UInt8`, but with an efficient run-time representation as a packed\nbyte buffer.\n</code>",
 "104":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;const-ByteArray&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;ByteArray&quot;]]]]}\">ByteArray</code>",
 "103":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1397829&quot;:{&quot;binding&quot;:&quot;var-_uniq.34&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.33&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-ByteArray&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.33&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.34&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;349456&quot;:{&quot;binding&quot;:&quot;const-ZlibDecode.decompressSingle&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;349504&quot;:{&quot;binding&quot;:&quot;const-Except.ok&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-zlib_decompressSingle_compress&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.35&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5591312&quot;:{&quot;binding&quot;:&quot;const-ZlibEncode.compress&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5591313&quot;:{&quot;binding&quot;:&quot;var-_uniq.33&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.35&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-UInt8&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87300&quot;:{&quot;binding&quot;:&quot;const-ByteArray.size&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87301&quot;:{&quot;binding&quot;:&quot;var-_uniq.33&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87365&quot;:{&quot;binding&quot;:&quot;var-_uniq.35&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.37&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;zlib_decompressSingle_compress&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;data&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;ByteArray&quot;]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;level&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;UInt8&quot;]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;maxOutputSize&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,340,&quot;ℕ&quot;]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;hsize&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,87301,&quot;data&quot;]]],[4,&quot;.&quot;,[7,87300,&quot;size&quot;]]]]],[4,[4,&quot; ≤&quot;,1],[6,[3,2,[7,5457,&quot;maxOutputSize&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,349456,&quot;ZlibDecode.decompressSingle&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,5591312,&quot;ZlibEncode.compress&quot;]]],[4,1,[4,[6,[3,2,[7,5591313,&quot;data&quot;]]],[4,1,[6,[3,2,[7,1397829,&quot;level&quot;]]]]]]]]]],&quot;)&quot;]]]],[4,1,[6,[3,2,[7,87365,&quot;maxOutputSize&quot;]]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[7,349504,&quot;Except.ok&quot;]]],[4,1,[6,[3,2,[7,21845,&quot;data&quot;]]]]]]]]]]]]]]]]]]]]]]]]]}\">zlib_decompressSingle_compress (data : ByteArray) (level : UInt8) (maxOutputSize : ℕ)\n  (hsize : data.size ≤ maxOutputSize) :\n  ZlibDecode.decompressSingle (ZlibEncode.compress data level) maxOutputSize = Except.ok data</code>",
 "102": "<code>ℝ</code>",
 "101":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;20&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Complex.re&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Complex.re&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,20,&quot;ℂ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,21,&quot;ℝ&quot;]]]]]]]]]]]]]]}\">Complex.re : ℂ → ℝ</code>",
 "100":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;20&quot;:{&quot;binding&quot;:&quot;const-Complex&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Real&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Complex.im&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Complex.im&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,20,&quot;ℂ&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,21,&quot;ℝ&quot;]]]]]]]]]]]]]]}\">Complex.im : ℂ → ℝ</code>",
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
