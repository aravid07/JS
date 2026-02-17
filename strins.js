/*
- string of sequence of utf-16 code units and immutable
- '',"",``(template literals)

accessing charecters:
 const s = 'hello'
 s[0]
 s.charAt(1);

length and immutability:
 - s.length
 - methods return new strings
 let s = 'abc';
 s[0] = 'z'; //no effect
 s = s.replace('a','z'); //produces new string


commonly used methods:
-length
-slice(start, end) — allows negative indexes
-substring(start, end) — swaps args if start > end; negative treated as 0
-indexOf(substr, fromIndex), lastIndexOf
-includes(substr), startsWith(substr), endsWith(substr)
-toLowerCase(), toUpperCase()
-trim(), trimStart(), trimEnd()
-padStart(targetLength, pad), padEnd(...)
-repeat(n)
-concat(...strings)
-split(separator, limit)
-replace(searchValue, replaceValueOrFn)
-replaceAll(searchValue, replaceValue)

slice vs substring vs substr:
-slice supports negative indices and is most flexible.
-substring treats negatives as 0 and swaps if start > end.
-substr(start, length) is legacy and discouraged.

Searching and replacing:
-indexOf/lastIndexOf for positions.
-includes for presence.
-replace supports string or RegExp. When using a string pattern, only first occurrence is replaced. Use regex with /g or replaceAll.
-replace can take a function to compute replacement.

Performance tips:
-For many small concatenations, use array join: arr.join("") is faster than repeated + in some contexts.
-Avoid unnecessary allocations; reuse slices when possible.
*/
// ...existing code...

// ---------- Examples: string usage & manipulation (runnable) ----------

// Accessing characters
console.log('--- Accessing characters ---');
const s = 'hello';
console.log(s[0]);        // 'h'
console.log(s.charAt(1)); // 'e'
console.log(s[10]);       // undefined
console.log(s.charAt(10)); // '' (empty string)

// Length & immutability
console.log('--- Length & immutability ---');
let a = 'abc';
console.log(a.length); // 3
a[0] = 'z';            // no effect
console.log(a);        // 'abc'
a = a.replace('a', 'z'); // returns new string
console.log(a);        // 'zbc'

// slice / substring examples
console.log('--- slice / substring ---');
const x = 'abcdef';
console.log(x.slice(1, 4));   // 'bcd'
console.log(x.slice(-3));     // 'def' (negative supported)
console.log(x.substring(4, 1)); // 'bcd' (args swapped if start > end)

// Searching
console.log('--- searching ---');
const text = 'The quick brown fox jumps over the lazy dog';
console.log(text.indexOf('fox'));     // position of 'fox'
console.log(text.includes('quick'));  // true
console.log(text.startsWith('The'));  // true
console.log(text.endsWith('dog'));    // true

// Replace (string, RegExp, function)
console.log('--- replace ---');
console.log('banana'.replace('a', 'o'));           // 'bonana' (first only)
console.log('banana'.replaceAll('a', 'o'));        // 'bonono' (all occurrences)
console.log('banana'.replace(/a/g, 'o'));          // 'bonono' using regex
console.log(
  'John Doe'.replace(/(\w+)\s+(\w+)/, (_, f, l) => `${l}, ${f}`)
); // 'Doe, John'

// Template literals
console.log('--- template literals ---');
const name = 'Alice';
const greeting = `Hello, ${name}!`;
console.log(greeting); // 'Hello, Alice!'

// Split, repeat, pad
console.log('--- split / repeat / pad ---');
console.log('a,b,c'.split(','));      // ['a','b','c']
console.log('ha'.repeat(3));          // 'hahaha'
console.log('42'.padStart(5, '0'));   // '00042'

// Unicode (code points & iteration)
console.log('--- Unicode / code points ---');
const heart = '💖';
console.log(heart.length);            // 2 (UTF-16 code units)
console.log([...heart].length);       // 1 (actual Unicode character)
console.log(heart.codePointAt(0));    // numeric code point
console.log(String.fromCodePoint(0x1F496)); // '💖'
for (const ch of 'a💖b') console.log('char:', ch); // 'a', '💖', 'b'

// Utility examples

// Capitalize first letter
function capitalize(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}
console.log(capitalize('hello')); // 'Hello'

// Safe truncation respecting code points
function truncate(str, max) {
  const arr = [...str];
  return arr.length > max ? arr.slice(0, max).join('') + '…' : str;
}
console.log(truncate('A long string 💬', 10));

// Replace all case-insensitive (escape special chars in 'find')
function replaceAllCaseInsensitive(str, find, replaceValue) {
  const esc = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return str.replace(new RegExp(esc, 'gi'), replaceValue);
}
console.log(replaceAllCaseInsensitive('Foo foo FOO', 'foo', 'bar')); // 'bar bar bar'

// Notes:
// - Prefer slice over substring for negative indices.
// - Use replaceAll or /g regex for replacing all occurrences.
// - For correct Unicode character handling, iterate with for...of or use the spread operator.