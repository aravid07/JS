/*
for (classic):
-General-purpose numeric loop.
-Good when you need an index.

// for loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

while:
-Runs while condition is true. Check before each iteration.
let n = 0;
while (n < 5) {
    console.log(n);
    n++;
}

do...while:
-Executes body once, then checks condition (guarantees at least one execution).
let x = 0;
do {
    console.log(x);
    x++;
} while (x < 1);

for...of:
-Iterates over iterable values (arrays, strings, Maps, Sets, generator results).
-Preferred for arrays when you need values, not indices.
const arr = ['a','b','c'];
for (const value of arr) {
    console.log(value);
}

for...in:
-Iterates enumerable property keys of an object (or array indices as strings).
-Use carefully: it also enumerates prototype properties and non-numeric keys.
const obj = {a:1, b:2};
for (const key in obj) {
    console.log(key, obj[key]);
}

When iterating object own keys, prefer Object.keys / Object.entries:
for (const [k, v] of Object.entries(obj)) {
    console.log(k, v);
}

Array iteration methods (not syntactic loops):
-Methods like forEach, map, filter, reduce are often clearer and functional.
-forEach cannot be broken out of with break (use a for loop if you need early exit).
[1,2,3].forEach(x => console.log(x));

Common pitfalls and tips:
-Infinite loop risk: ensure loop condition eventually becomes false.
-Mutating array length while iterating can skip items; iterate backwards if removing elements:
for (let i = arr.length - 1; i >= 0; i--) {
    if (shouldRemove(arr[i])) arr.splice(i, 1);
}
-for...in on arrays: it yields string indices and includes inherited keys; prefer for/for...of/Object.keys.
-Performance: modern engines optimize well; prefer readability unless you have measurable hot-path needs.
-Async inside loops: avoid forEach with async/await; use for...of if awaiting each iteration.
const m = new Map([['a',1],['b',2]]);
for (const [k,v] of m) console.log(k, v);
for (const ch of "hi") console.log(ch);

Choosing which loop:
-Need index or mutate sequence: classic for.
-Need values only: for...of or forEach (if no early exit).
-Enumerate object properties: for...in (with caution) or Object.keys/entries + for...of.
-Need at least one run: do...while.
*/

// ...existing code...

// --- Practical examples appended below ---

// 1) classic for (index)
for (let i = 0; i < 5; i++) {
    console.log('for i =', i);
}

// 2) while (pre-check)
let n = 0;
while (n < 3) {
    console.log('while n =', n);
    n++;
}

// 3) do...while (runs at least once)
let x = 5;
do {
    console.log('do...while x =', x);
    x--;
} while (x > 5); // condition false, but body already ran once

// 4) for...of (iterates values)
const arr = ['a', 'b', 'c'];
for (const value of arr) {
    console.log('for...of value =', value);
}

// 5) for...in (iterates enumerable keys) - use carefully with objects
const obj = { a: 1, b: 2 };
for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        console.log('for...in', key, obj[key]);
    }
}
// Preferred: Object.entries + for...of to get own keys/values
for (const [k, v] of Object.entries(obj)) {
    console.log('Object.entries', k, v);
}

// 6) Array iteration methods
[1, 2, 3].forEach(x => console.log('forEach', x));
const squared = [1, 2, 3].map(x => x * x);
console.log('map ->', squared);

// 7) Removing items while iterating — iterate backwards to avoid skipping
const items = [0, 1, 2, 3, 4];
for (let i = items.length - 1; i >= 0; i--) {
    if (items[i] % 2 === 0) items.splice(i, 1); // remove even numbers
}
console.log('after removing evens ->', items);

// 8) Async and loops: don't use forEach with async/await if you need sequential awaits
async function asyncExamples() {
    // bad: forEach won't await the async callback
    console.log('forEach with async callbacks (not awaited):');
    [10, 20, 30].forEach(async (val) => {
        await new Promise(r => setTimeout(r, 50));
        console.log('forEach async:', val);
    });

    // good: use for...of to await each iteration sequentially
    console.log('for...of with await (sequential):');
    for (const val of [10, 20, 30]) {
        await new Promise(r => setTimeout(r, 50));
        console.log('for...of async:', val);
    }
}
asyncExamples().catch(console.error);

// 9) Iterating Map and string
const m = new Map([['k1', 1], ['k2', 2]]);
for (const [k, v] of m) console.log('Map entry', k, v);
for (const ch of 'hi') console.log('char', ch);

// End of examples
// ...existing code...