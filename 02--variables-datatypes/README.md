# Variables & Data Types

## Variables in JavaScript

Variables are containers that store data values. Think of them as labeled boxes where you can put different types of information.

### Variable Declaration Keywords

#### 1. `var` (Old way - avoid in modern code)
```javascript
var name = "John";
var age = 25;
```

#### 2. `let` (Modern way - for changeable values)
```javascript
let score = 100;
score = 150; // Can be changed
```

#### 3. `const` (Modern way - for constants)
```javascript
const PI = 3.14159;
// PI = 3.14; // Error! Cannot reassign
```

### Variable Naming Rules

1. **Must start with**: letter, `$`, or `_`
2. **Can contain**: letters, numbers, `$`, `_`
3. **Cannot use**: JavaScript keywords (`if`, `for`, `function`, etc.)
4. **Case sensitive**: `myVar` ≠ `myvar`

#### Good Examples:
```javascript
let firstName = "John";
let age2 = 25;
let $price = 99.99;
let _private = "secret";
```

#### Bad Examples:
```javascript
let 2age = 25;        // Cannot start with number
let first-name = "John"; // Cannot use hyphen
let class = "Math";   // Cannot use keywords
```

## Data Types in JavaScript

JavaScript has **8 data types**: 7 primitive + 1 non-primitive (object).

### Primitive Data Types

#### 1. Number
Represents both integers and floating-point numbers.

```javascript
let age = 25;           // Integer
let price = 99.99;      // Float
let negative = -10;     // Negative
let infinity = Infinity; // Special number value
let notANumber = NaN;   // "Not a Number"
```

#### 2. String
Text data enclosed in quotes.

```javascript
let name = "John";        // Double quotes
let city = 'New York';    // Single quotes
let message = `Hello ${name}`; // Template literals (backticks)
```

#### 3. Boolean
True or false values.

```javascript
let isActive = true;
let isComplete = false;
let isLoggedIn = Boolean(1); // true
```

#### 4. Undefined
Variable declared but not assigned a value.

```javascript
let x;
console.log(x); // undefined
```

#### 5. Null
Intentional absence of value.

```javascript
let data = null; // Explicitly empty
```

#### 6. Symbol (ES6)
Unique identifier (advanced topic).

```javascript
let sym = Symbol('id');
```

#### 7. BigInt (ES2020)
For very large integers.

```javascript
let bigNumber = 123456789012345678901234567890n;
```

### Non-Primitive Data Type

#### 8. Object
Complex data type that can hold multiple values.

```javascript
let person = {
    name: "John",
    age: 30,
    isStudent: false
};

let numbers = [1, 2, 3, 4, 5]; // Array is also an object
let today = new Date();        // Date is also an object
```

## Type Checking

Use the `typeof` operator to check data types:

```javascript
console.log(typeof 42);        // "number"
console.log(typeof "Hello");   // "string"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (this is a known quirk!)
console.log(typeof {});        // "object"
console.log(typeof []);        // "object"
```

## Type Conversion

### Implicit Conversion (Automatic)
```javascript
let result = "5" + 3;    // "53" (number becomes string)
let result2 = "5" - 3;   // 2 (string becomes number)
let result3 = "5" * "2"; // 10 (both become numbers)
```

### Explicit Conversion (Manual)
```javascript
// To Number
let num1 = Number("123");    // 123
let num2 = parseInt("123");  // 123
let num3 = parseFloat("123.45"); // 123.45

// To String
let str1 = String(123);      // "123"
let str2 = (123).toString(); // "123"

// To Boolean
let bool1 = Boolean(1);      // true
let bool2 = Boolean(0);      // false
let bool3 = Boolean("");     // false
let bool4 = Boolean("hello"); // true
```

## Best Practices

1. **Use `const` by default**, `let` when you need to reassign
2. **Avoid `var`** in modern JavaScript
3. **Use descriptive variable names**: `userAge` instead of `a`
4. **Use camelCase**: `firstName`, `totalPrice`
5. **Initialize variables** when declaring them when possible

## Challenge Questions

1. What's the difference between `let`, `const`, and `var`?
2. What will `typeof null` return and why is this considered a JavaScript quirk?
3. Convert the string "123.45" to a number using two different methods.
4. Create variables for a person's name, age, and whether they're a student using appropriate data types.
5. What's the difference between `undefined` and `null`?
```
