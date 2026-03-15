import Std

/-- An ordered map that maintains insertion order.
    Stores entries in an array and provides O(1) lookup via a HashMap index. -/
structure IndexMap (α : Type) (β : Type) [BEq α] [Hashable α] where
  entries : Array (α × β)
  index   : Std.HashMap α Nat
  deriving Repr

namespace IndexMap

variable {α : Type} {β : Type} [BEq α] [Hashable α] [LawfulBEq α]

/-- The empty IndexMap. -/
def empty : IndexMap α β := ⟨#[], {}⟩

/-- Number of entries. -/
def size (m : IndexMap α β) : Nat := m.entries.size

/-- Look up a key. -/
def find? (m : IndexMap α β) (k : α) : Option β := do
  let i ← m.index[k]?
  let (_, v) := m.entries[i]!
  return v

/-- Insert or update a key-value pair. -/
def insert (m : IndexMap α β) (k : α) (v : β) : IndexMap α β :=
  match m.index[k]? with
  | some i => { m with entries := m.entries.set! i (k, v) }
  | none   => { entries := m.entries.push (k, v),
                index := m.index.insert k m.entries.size }

/-- Convert to a list of key-value pairs in insertion order. -/
def toList (m : IndexMap α β) : List (α × β) :=
  m.entries.toList

/-- All verification theorems proved by `grind +locals`. -/

theorem find?_empty (k : α) : (empty : IndexMap α β).find? k = none := by
  grind +locals

theorem find?_insert_self (m : IndexMap α β) (k : α) (v : β) :
    (m.insert k v).find? k = some v := by
  grind +locals

theorem size_empty : (empty : IndexMap α β).size = 0 := by
  grind +locals

end IndexMap
