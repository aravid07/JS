// ...existing code...

/*
  Quick reference: Arrays and Objects in JavaScripts
*/

/* ========== ARRAYS ========== */

// Creation
const empty = [];
const nums = [1, 2, 3];
const mixed = [1, 'two', true, { id: 1 }];

// Access & properties
console.log(nums[0]);        // 1
console.log(nums.length);    // 3
console.log(Array.isArray(nums)); // true

// Mutating methods
nums.push(4);    // [1,2,3,4]
nums.pop();      // [1,2,3]
nums.splice(1, 1); // remove 1 element at index 1 -> [1,3]

// Non-mutating / functional methods
const doubled = nums.map(n => n * 2); // [2,6]
const evens = nums.filter(n => n % 2 === 0);
const sum = nums.reduce((acc, n) => acc + n, 0);

// Search
const found = nums.find(n => n > 1); // first matching element
const hasTwo = nums.includes(2);
const idx = nums.indexOf(2);

// Iteration
for (const v of nums) console.log('for..of', v);
nums.forEach((v, i) => console.log('forEach', i, v));

// References and copying
const ref = nums;            // same array (reference)
ref[0] = 99;
console.log(nums[0]);        // 99 (shows reference behavior)

const shallowCopy = [...nums];      // shallow copy of array
const sliceCopy = nums.slice();     // shallow copy

// Nested arrays (multi-dimensional)
const matrix = [
  [1, 2],
  [3, 4]
];
console.log(matrix[1][0]); // 3

/* ========== OBJECTS ========== */

// Creation
const emptyObj = {};
const person = { name: 'A', age: 30 };

// Access
console.log(person.name);      // dot notation
console.log(person['age']);    // bracket notation (needed for dynamic keys)

// Dynamic / computed keys
const key = 'score';
const player = { id: 1, [key]: 100 }; // { id:1, score:100 }

// Add / update / delete
person.city = 'NY';
person.age = 31;
delete person.city;

// Existence checks
console.log('name' in person);            // true
console.log(person.hasOwnProperty('city')); // false if deleted

// Methods and "this"
const obj = {
  x: 10,
  getX() { return this.x; } // this refers to obj when called as obj.getX()
};
console.log(obj.getX()); // 10

// Prototype example
const proto = { greet() { return 'hi'; } };
const child = Object.create(proto);
child.a = 1;
console.log(child.greet()); // 'hi' from prototype chain

// Iteration and utilities
console.log(Object.keys(person));    // ['name','age']
console.log(Object.values(person));  // ['A',31]
console.log(Object.entries(person)); // [['name','A'], ['age',31]]

for (const k in person) {
  if (Object.prototype.hasOwnProperty.call(person, k)) {
    console.log('own key', k, person[k]);
  }
}

// Shallow copy / merge
const copyObj = { ...person };                   // shallow copy
const merged = Object.assign({}, person, { id: 5 });

// Sealing / freezing
const sealed = Object.seal({ a: 1 });
// sealed.b = 2; // ignored in non-strict mode
const frozen = Object.freeze({ c: 3 });
// frozen.c = 4; // no effect

// Deep cloning (modern)
function deepClone(value) {
  // Use structuredClone when available (Node 17+/browsers)
  if (typeof structuredClone === 'function') return structuredClone(value);
  // Fallback (note: loses functions, symbol props, Dates, Maps, Sets)
  return JSON.parse(JSON.stringify(value));
}

const complex = { a: 1, nested: { b: 2 } };
const deep = deepClone(complex);
deep.nested.b = 99;
console.log(complex.nested.b); // 2 (original unaffected)

// Equality: objects and arrays are reference-equal only
console.log({} === {}); // false
console.log([] === []); // false

/* ========== IMMUTABLE UPDATE PATTERNS ========== */

// Arrays: create a new array instead of mutating
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // [1,2,3,4]

// Objects: create a new object when updating
const user = { name: 'A', age: 30 };
const updated = { ...user, age: 31 }; // new object, original unchanged

/* ========== NOTES / BEST PRACTICES ==========
 - Use const for bindings; it prevents reassignment but allows mutating contents.
 - Use Array.isArray to check arrays.
 - Prefer non-mutating methods when you need immutable updates (map/filter, spread).
 - Use structuredClone for reliable deep copies when available; otherwise use tested libraries (lodash).
 - Objects are unordered for most operations; use arrays when order matters.
*/


// Basic
const nums = [1, 2, 3];
const [a, b, c] = nums; // a=1, b=2, c=3

// Skip
const [first, , third] = nums; // first=1, third=3

// Default value
const [x = 10, y = 20] = [5]; // x=5, y=20

// Rest
const [head, ...tail] = [1, 2, 3, 4]; // head=1, tail=[2,3,4]

// Nested
const nested = [1, [2, 3]];
const [one, [two, three]] = nested; // two=2

// Swap values
let p = 1, q = 2;
[p, q] = [q, p]; // p=2, q=1

// From function return
function getPair() { return [42, 'ok']; }
const [num, status] = getPair();