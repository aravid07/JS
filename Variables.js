/*
var - hoisted and intialiazed to undefined, function-scoped, redeclared
let - not hoisted, block scoped, cannot be redeclared but reassigned
const - not hoisted, block scoped, cannot be redclared or reassigned but objects/arrays contents can change.

-let and const gives reference error if hoisted


primitives / reference:
primitives(copied by value):
-number
-string
-boolean
-null
-undefined
-symbol
-bigint

reference(copied by reference):
-functions
-arrays
-objects

quirks:
typeof null === 'object'
typeof [] === 'object'

- to check an array = Array.isArray()

best practices:
-use const by default
-use let for reassign
-keep scope small
-prefer immutable patterns (learn more about this)

*/
// ...existing code...

// ===== var: hoisting, function-scoped, redeclared =====
console.log('var hoisting ->', a); // undefined (declaration hoisted, init undefined)
var a = 10;
function varScopeExample() {
  if (true) {
    var inside = 'visible throughout function';
  }
  console.log('var function scope ->', inside);
}
varScopeExample();
// redeclare allowed
var a = 20;
console.log('var redeclared ->', a);

// ===== let: temporal dead zone (TDZ), block-scoped, reassignable =====
try {
  console.log('let before declaration ->', b); // ReferenceError caught
} catch (e) {
  console.log('let TDZ error ->', e.name);
}
let b = 5;
{
  let blockVar = 'only here';
  console.log('let block scope ->', blockVar);
}
try {
  console.log(blockVar); // ReferenceError caught
} catch (e) {
  console.log('let block error ->', e.name);
}
// reassignment is allowed
let mutable = 1;
mutable = 2;
console.log('let reassigned ->', mutable);

// ===== const: block-scoped, no reassign, but object mutation allowed =====
const PI = 3.14;
try {
  PI = 3.14159; // TypeError caught
} catch (e) {
  console.log('const reassign error ->', e.name);
}
const obj = { x: 1 };
obj.x = 2; // allowed (mutation of referenced value)
console.log('const object mutated ->', obj);

// ===== primitives vs references =====
// primitives (copied by value)
let p1 = 100;
let p2 = p1;
p2 = 200;
console.log('primitives: p1 stays ->', p1, 'p2 ->', p2);

// references (copied by reference)
const r1 = { n: 1 };
const r2 = r1;
r2.n = 99;
console.log('references: r1.n ->', r1.n, 'r2.n ->', r2.n);

// ===== quirks =====
console.log('typeof null ->', typeof null); // "object" (historical)
console.log('typeof [] ->', typeof []);     // "object"
console.log('Array.isArray([]) ->', Array.isArray([])); // true

// ===== best-practice small example =====
const config = { debug: false };
// to change "immutably" create a new object
const newConfig = { ...config, debug: true };
console.log('immutable pattern ->', config, '=>', newConfig);

// ...existing code...
