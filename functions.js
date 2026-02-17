/*
-A reusable block of code that can accept inputs (parameters), perform work, and optionally return a value.
-Functions are first-class values: they can be assigned to variables, passed as arguments, and returned from other functions

Function declaration:
function add(a, b) {
    return a + b;
}

Function expression (anonymous assigned to a variable):
const add = function(a, b) {
    return a + b;
};

Named function expression:
const factorial = function fact(n) {
    return n <= 1 ? 1 : n * fact(n - 1);
};

Arrow function (ES6+):
const add = (a, b) => a + b;

IIFE (immediately-invoked function expression):
(function() {  run once })();

Parameters, arguments, and returns:
Default parameters: function f(a = 1) { ... }
Rest parameter: function f(...rest) {  rest is an array  }
arguments object: available in non-arrow functions; holds passed args (not in arrow functions).
return finishes execution and provides a value; absence of return yields undefined.


Scope, closures, and 'this':
Functions create their own lexical scope for variables declared inside.
A closure is a function that captures variables from an outer scope:
function makeCounter() {
    let count = 0;
    return function() { return ++count; };
}
const c = makeCounter();

'this' differs by how the function is called:
Method call: obj.method() -> this is obj
Function call: func() -> in strict mode undefined, otherwise global
call/apply/bind override this
Arrow functions do not have their own this; they use lexical this.

Function declaration vs function expression — differences and when to use:
Hoisting
Function declarations are hoisted: the entire function is available before its place in code.
// works because declaration is hoisted
console.log(square(3)); // 9
function square(x) { return x * x; }

Function expressions assigned to let/const are not available before the assignment (temporal dead zone). Using var gives an undefined 
value until assignment.
// Error: cannot access 'mul' before initialization (if const/let)
console.log(mul(2,3)); 
const mul = function(a,b){ return a*b; };

// With var:
console.log(mul); // undefined
var mul = function(a,b){ return a*b; };

Name and stack traces
Declarations always have a name.
Named function expressions give a name useful in stack traces and recursion; anonymous expressions may show inferred names in modern engines.


Readability and control:
Declarations are fine for top-level / module-level functions.
Expressions (const/let) allow predictable initialization and immutability (const), and are preferred for functional patterns, exports, 
and when you want to treat functions like values.

Temporal behaviour and ordering:
Declarations let you call a function before its textual definition.
Expressions make execution order explicit — you can’t use them until they’re assigned.
// Declaration (hoisted)
console.log(decl(2)); // 4
function decl(n) { return n * 2; }

// Expression with const (not hoisted for use)
console.log(expr(2)); // ReferenceError: Cannot access 'expr' before initialization
const expr = function(n) { return n * 2; };

Arrow functions: concise and lexical this; not suitable as methods or constructors.
Generators: function* gen() { yield 1; }
Higher-order functions: functions that take/return functions (map, filter, reduce).
Prefer const + arrow or named function expressions for predictable behavior in modern code; use function declarations when hoisting or nicer top-level organization is desired.

Quick checklist:
Need to call before definition → function declaration.
Need lexical this or shorter syntax → arrow function.
Want immutable binding and clearer initialization → const function expression.
Need recursion with local name → named function expression or declaration.

 */
// ...existing code...

// --- Practical examples ---
// Hoisted function declaration (call before definition)
console.log('decl before:', decl(2)); // works because decl is hoisted
function decl(n) { return n * 2; }

// Function expression with const (not available before initialization)
try {
    console.log('expr before:', expr(2)); // ReferenceError in strict/ES modules
} catch (e) {
    console.log('expr before error:', e.message);
}
const expr = function(n) { return n * 2; };
console.log('expr after:', expr(2));

// Arrow function and lexical `this`
const obj = {
    v: 42,
    method: function() {
        console.log('method this.v:', this.v); // 42
        const arrow = () => console.log('arrow inside method this.v:', this.v); // uses same `this`
        arrow();
    },
    arrowMethod: () => console.log('arrowMethod this (lexical at creation):', this) // not bound to obj
};
obj.method();
obj.arrowMethod();

// Closure example (state preserved)
function makeCounter() {
    let count = 0;
    return function() { return ++count; };
}
const c = makeCounter();
console.log('counter:', c(), c());

// Default parameters and rest parameter
function greet(name = 'Guest', ...msgs) {
    console.log(`Hello ${name}`, msgs.length ? `| Messages: ${msgs.join(' | ')}` : '');
}
greet();
greet('Aravind', 'Welcome', 'Have fun');

// IIFE (runs once immediately)
(function() {
    console.log('IIFE ran');
})();

// Named function expression (useful for recursion / stack traces)
const factorial = function fact(n) {
    return n <= 1 ? 1 : n * fact(n - 1);
};
console.log('factorial(5):', factorial(5));

// Higher-order function example (map + arrow)
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
console.log('doubled:', doubled);

// ...existing code...