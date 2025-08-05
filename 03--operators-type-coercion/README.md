# Operators & Type Coercion

## JavaScript Operators

Operators are symbols that perform operations on operands (values and variables).

### 1. Arithmetic Operators

Used for mathematical calculations.

```javascript
let a = 10;
let b = 3;

console.log(a + b);  // 13 (Addition)
console.log(a - b);  // 7  (Subtraction)
console.log(a * b);  // 30 (Multiplication)
console.log(a / b);  // 3.333... (Division)
console.log(a % b);  // 1  (Modulus - remainder)
console.log(a ** b); // 1000 (Exponentiation - ES2016)

// Increment and Decrement
let x = 5;
console.log(++x); // 6 (Pre-increment)
console.log(x++); // 6 (Post-increment, then x becomes 7)
console.log(--x); // 6 (Pre-decrement)
console.log(x--); // 6 (Post-decrement, then x becomes 5)
```

### 2. Assignment Operators

Used to assign values to variables.

```javascript
let x = 10;    // Basic assignment

x += 5;        // x = x + 5  (15)
x -= 3;        // x = x - 3  (12)
x *= 2;        // x = x * 2  (24)
x /= 4;        // x = x / 4  (6)
x %= 4;        // x = x % 4  (2)
x **= 3;       // x = x ** 3 (8)
```

### 3. Comparison Operators

Used to compare values and return boolean results.

```javascript
let a = 5;
let b = "5";

// Equality (with type coercion)
console.log(a == b);   // true (5 == "5")
console.log(a != b);   // false

// Strict equality (no type coercion)
console.log(a === b);  // false (5 !== "5")
console.log(a !== b);  // true

// Relational operators
console.log(a > 3);    // true
console.log(a < 10);   // true
console.log(a >= 5);   // true
console.log(a <= 4);   // false
```

### 4. Logical Operators

Used for logical operations and boolean logic.

```javascript
let a = true;
let b = false;

console.log(a && b);   // false (AND - both must be true)
console.log(a || b);   // true  (OR - at least one must be true)
console.log(!a);       // false (NOT - inverts the boolean)

// Short-circuit evaluation
let user = null;
let name = user && user.name; // undefined (doesn't error)
let defaultName = name || "Guest"; // "Guest"
```

### 5. Ternary Operator

Shorthand for if-else statements.

```javascript
let age = 18;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"

// Nested ternary (use sparingly)
let score = 85;
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
```

### 6. String Operators

```javascript
let firstName = "John";
let lastName = "Doe";

// Concatenation
let fullName = firstName + " " + lastName; // "John Doe"

// Compound assignment
let message = "Hello";
message += " World"; // "Hello World"
```

### 7. typeof Operator

Returns the type of a variable.

```javascript
console.log(typeof 42);        // "number"
console.log(typeof "Hello");   // "string"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (quirk!)
console.log(typeof {});        // "object"
console.log(typeof []);        // "object"
console.log(typeof function(){}); // "function"
```

## Type Coercion

Type coercion is JavaScript's automatic conversion of values from one data type to another.

### Implicit Coercion (Automatic)

JavaScript automatically converts types when needed.

#### String Coercion
```javascript
console.log("5" + 3);      // "53" (number to string)
console.log("Hello" + 1);  // "Hello1"
console.log(true + "!");   // "true!"
```

#### Numeric Coercion
```javascript
console.log("5" - 3);      // 2 (string to number)
console.log("10" * "2");   // 20
console.log("15" / "3");   // 5
console.log("5" % 2);      // 1
console.log(+"123");       // 123 (unary + converts to number)
```

#### Boolean Coercion
```javascript
// Falsy values: false, 0, "", null, undefined, NaN
console.log(Boolean(0));         // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false

// Truthy values: everything else
console.log(Boolean(1));         // true
console.log(Boolean("hello"));   // true
console.log(Boolean([]));        // true
console.log(Boolean({}));        // true
```

### Explicit Coercion (Manual)

You can manually convert types using built-in functions.

```javascript
// To Number
Number("123");      // 123
Number("123.45");   // 123.45
Number("hello");    // NaN
parseInt("123");    // 123
parseInt("123.45"); // 123
parseFloat("123.45"); // 123.45

// To String
String(123);        // "123"
String(true);       // "true"
(123).toString();   // "123"

// To Boolean
Boolean(1);         // true
Boolean(0);         // false
Boolean("");        // false
Boolean("hello");   // true
```

## Comparison Coercion

### == vs ===

```javascript
// == (loose equality) - performs type coercion
console.log(5 == "5");     // true
console.log(true == 1);    // true
console.log(false == 0);   // true
console.log(null == undefined); // true

// === (strict equality) - no type coercion
console.log(5 === "5");    // false
console.log(true === 1);   // false
console.log(false === 0);  // false
console.log(null === undefined); // false
```

### Common Coercion Gotchas

```javascript
// Empty array coercion
console.log([] == false);  // true ([] becomes "", "" becomes 0, 0 == false)
console.log([] == 0);      // true
console.log([] == "");     // true

// Null and undefined
console.log(null == 0);    // false
console.log(null >= 0);    // true (null becomes 0)
console.log(null > 0);     // false

// NaN comparisons
console.log(NaN == NaN);   // false
console.log(NaN === NaN);  // false
```

## Operator Precedence

Operators have different precedence levels (order of execution).

```javascript
let result = 2 + 3 * 4;     // 14 (not 20, because * has higher precedence)
let result2 = (2 + 3) * 4;  // 20 (parentheses override precedence)

// Common precedence (high to low):
// 1. Parentheses ()
// 2. Exponentiation **
// 3. Multiplication *, Division /, Modulus %
// 4. Addition +, Subtraction -
// 5. Comparison <, >, <=, >=
// 6. Equality ==, ===, !=, !==
// 7. Logical AND &&
// 8. Logical OR ||
// 9. Assignment =, +=, -=, etc.
```

## Best Practices

1. **Use === instead of ==** to avoid unexpected coercion
2. **Be explicit with type conversion** when needed
3. **Use parentheses** to make operator precedence clear
4. **Understand falsy values**: `false`, `0`, `""`, `null`, `undefined`, `NaN`
5. **Use logical operators for default values**: `name || "Anonymous"`

## Challenge Questions

1. What's the difference between `==` and `===`?
2. What will `"5" + 3` and `"5" - 3` return? Explain why.
3. List all falsy values in JavaScript.
4. What will `[] == false` return and why?
5. How can you convert a string to a number in three different ways?
6. What's the result of `2 + 3 * 4` and how can you change the order of operations?
```
