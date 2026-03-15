import Std

/-- If-then-else expressions over Boolean variables. -/
inductive IfExpr where
  | lit  : Bool → IfExpr
  | var  : Nat → IfExpr
  | ite  : IfExpr → IfExpr → IfExpr → IfExpr
  deriving Repr, DecidableEq

namespace IfExpr

/-- Evaluate an if-expression given a variable assignment. -/
def eval (f : Nat → Bool) : IfExpr → Bool
  | lit b     => b
  | var n     => f n
  | ite i t e => bif i.eval f then t.eval f else e.eval f

/-- Does the expression contain a nested if-then-else in the condition position? -/
def hasNestedIf : IfExpr → Bool
  | lit _     => false
  | var _     => false
  | ite (ite _ _ _) _ _ => true
  | ite _ t e => t.hasNestedIf || e.hasNestedIf

/-- Does the expression contain an if-then-else with a constant (lit) condition? -/
def hasConstantIf : IfExpr → Bool
  | lit _     => false
  | var _     => false
  | ite (lit _) _ _ => true
  | ite i t e => i.hasConstantIf || t.hasConstantIf || e.hasConstantIf

/-- Are two expressions "disjoint" in their variable usage? -/
def disjoint : IfExpr → IfExpr → Bool
  | ite (var n) t e, ite (var m) t' e' =>
    n != m && disjoint t (ite (var m) t' e') && disjoint e (ite (var m) t' e')
    && disjoint (ite (var n) t e) t' && disjoint (ite (var n) t e) e'
  | _, _ => true

/-- Does the expression contain a redundant if-then-else (same then/else branch)? -/
def hasRedundantIf : IfExpr → Bool
  | lit _     => false
  | var _     => false
  | ite i t e => (t == e) || i.hasRedundantIf || t.hasRedundantIf || e.hasRedundantIf

/-- An expression is normalized if it has no nested ifs, no constant ifs,
    no redundant ifs, and all branches are disjoint. -/
def normalized : IfExpr → Bool
  | lit _     => true
  | var _     => true
  | ite i t e =>
    !i.hasNestedIf && !i.hasConstantIf && !i.hasRedundantIf
    && !t.hasNestedIf && !t.hasConstantIf && !t.hasRedundantIf
    && !e.hasNestedIf && !e.hasConstantIf && !e.hasRedundantIf
    && i.normalized && t.normalized && e.normalized
    && disjoint t e

/-- Custom termination measure: weight the condition more heavily. -/
def normSize : IfExpr → Nat
  | lit _     => 0
  | var _     => 1
  | ite i t e => 2 * i.normSize + max t.normSize e.normSize + 1

/-- Normalize an if-expression, carrying a map of known variable assignments. -/
def normalize (assign : Std.HashMap Nat Bool := {}) : IfExpr → IfExpr
  | lit b => lit b
  | var v =>
    match assign[v]? with
    | some b => lit b
    | none   => var v
  | ite (lit true)  t _ => normalize assign t
  | ite (lit false) _ e => normalize assign e
  | ite (ite a b c) t e => normalize assign (ite a (ite b t e) (ite c t e))
  | ite (var v) t e =>
    match assign[v]? with
    | some true  => normalize assign t
    | some false => normalize assign e
    | none =>
      let t' := normalize (assign.insert v true) t
      let e' := normalize (assign.insert v false) e
      if t' == e' then t'
      else ite (var v) t' e'
termination_by e => e.normSize

/-- The normalization function produces a normalized expression
    that is semantically equivalent to the input,
    and eliminates all assigned variables. -/
theorem normalize_spec (assign : Std.HashMap Nat Bool) (e : IfExpr) :
    (normalize assign e).normalized
    ∧ (normalize assign e).eval = e.eval
    := by
  fun_induction normalize assign with
  | _ => grind +locals

end IfExpr
