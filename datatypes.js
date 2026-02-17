/*
primitives(immutable):
-numbers:NaN,floats, infinity, -0
-strings - immutable sequence of charecters
-boolean - true/false
-null - intentional, no value
-undefined - declared but not assigned.
-bigint -arbitrary large integers, written with n suffix (e.g., 10n)
-symbol

objects:
-arrays - ordered list
-functions - callable objects
-plain objects - key - value pairs

equality and coercion:
- "==" does type coercion (e.g., 0 == false is true); prefer "===" (strict) to avoid coercion.
*/
// primitives
let u = undefined;
let n = null;
let b = true;
let num = 42;
let big = 9007199254740993n; // BigInt
let s = "hello";
let sym = Symbol("id");

// objects
let arr = [1,2,3];
let obj = { a: 1 };
function fn() {}

// typeof outputs
console.log(typeof u, typeof n, typeof b, typeof num, typeof big, typeof s, typeof sym);
// "undefined" "object" "boolean" "number" "bigint" "string" "symbol"

console.log(typeof arr, Array.isArray(arr), typeof fn); // "object" true "function"
console.log(typeof null); // "object" (historical quirk)

// coercion examples
console.log("5" + 3); // "53"  (string concat)
console.log("5" - 3); // 2     (numeric coercion)
console.log(0 == false, 0 === false); // true false

// NaN detection
console.log(Number("abc")); // NaN
console.log(Number.isNaN(Number("abc"))); // true