# ES6+ Features

ES6 (ECMAScript 2015) and later versions introduced many powerful features that modernized JavaScript development.

## Arrow Functions

Arrow functions provide a shorter syntax for writing functions and have different `this` behavior.

### Basic Syntax

```javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Multiple parameters
const multiply = (a, b) => a * b;

// Single parameter (parentheses optional)
const square = x => x * x;
const square2 = (x) => x * x; // Also valid

// No parameters
const greet = () => "Hello World!";

// Multiple statements (need curly braces and return)
const processData = (data) => {
    const processed = data.toUpperCase();
    return processed + "!";
};
\`\`\`

### Arrow Functions vs Regular Functions

\`\`\`javascript
// 'this' binding difference
const obj = {
    name: "John",

    // Regular function - 'this' refers to obj
    regularMethod: function() {
        console.log(this.name); // "John"
    },

    // Arrow function - 'this' inherited from enclosing scope
    arrowMethod: () => {
        console.log(this.name); // undefined (or global object)
    },

    // Practical use case
    delayedGreeting: function() {
        setTimeout(() => {
            console.log(\`Hello, \${this.name}!\`); // 'this' refers to obj
        }, 1000);
    }
};
\`\`\`

## Template Literals

Template literals allow embedded expressions and multi-line strings.

\`\`\`javascript
const name = "Alice";
const age = 30;

// String interpolation
const greeting = \`Hello, my name is \${name} and I'm \${age} years old.\`;

// Expressions in template literals
const price = 19.99;
const tax = 0.08;
const total = \`Total: $\${(price * (1 + tax)).toFixed(2)}\`;

// Multi-line strings
const multiLine = \`
    This is a multi-line string.
    It preserves line breaks and
    indentation.
\`;

// Tagged template literals
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i] ? \`<mark>\${values[i]}</mark>\` : '';
        return result + string + value;
    }, '');
}

const highlighted = highlight\`Hello \${name}, you are \${age} years old!\`;
\`\`\`

## Destructuring

Extract values from arrays and objects into distinct variables.

### Array Destructuring

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Basic destructuring
const [first, second] = numbers;
console.log(first, second); // 1, 2

// Skip elements
const [a, , c] = numbers;
console.log(a, c); // 1, 3

// Rest operator
const [head, ...tail] = numbers;
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Default values
const [x, y, z = 0] = [1, 2];
console.log(x, y, z); // 1, 2, 0

// Swapping variables
let var1 = "a";
let var2 = "b";
[var1, var2] = [var2, var1];
console.log(var1, var2); // "b", "a"
\`\`\`

### Object Destructuring

\`\`\`javascript
const person = {
    name: "John",
    age: 30,
    city: "New York",
    country: "USA"
};

// Basic destructuring
const { name, age } = person;
console.log(name, age); // "John", 30

// Rename variables
const { name: fullName, city: location } = person;
console.log(fullName, location); // "John", "New York"

// Default values
const { name: userName, profession = "Unknown" } = person;
console.log(profession); // "Unknown"

// Nested destructuring
const user = {
    id: 1,
    profile: {
        firstName: "Jane",
        lastName: "Doe",
        social: {
            twitter: "@janedoe"
        }
    }
};

const {
    profile: {
        firstName,
        social: { twitter }
    }
} = user;

console.log(firstName, twitter); // "Jane", "@janedoe"

// Function parameters
function greetUser({ name, age = 0 }) {
    return \`Hello \${name}, you are \${age} years old\`;
}

greetUser({ name: "Alice", age: 25 });
\`\`\`

## Spread and Rest Operators

The spread (...) operator expands elements, while rest collects them.

### Spread Operator

\`\`\`javascript
// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Object spreading
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Copying arrays/objects
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];

const originalObject = { name: "John", age: 30 };
const copiedObject = { ...originalObject };

// Function arguments
function sum(a, b, c) {
    return a + b + c;
}

const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6

// Converting NodeList to Array
const divs = document.querySelectorAll('div');
const divArray = [...divs];
\`\`\`

### Rest Operator

\`\`\`javascript
// Function parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10

// Mixed parameters
function greet(greeting, ...names) {
    return \`\${greeting} \${names.join(', ')}!\`;
}

console.log(greet("Hello", "Alice", "Bob", "Charlie"));

// Array destructuring
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest);  // [2, 3, 4, 5]

// Object destructuring
const { name, ...otherProps } = { name: "John", age: 30, city: "NYC" };
console.log(name);       // "John"
console.log(otherProps); // { age: 30, city: "NYC" }
\`\`\`

## Default Parameters

Set default values for function parameters.

\`\`\`javascript
// Basic default parameters
function greet(name = "Guest", greeting = "Hello") {
    return \`\${greeting}, \${name}!\`;
}

console.log(greet()); // "Hello, Guest!"
console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet("Bob", "Hi")); // "Hi, Bob!"

// Default parameters with expressions
function createUser(name, role = "user", id = Date.now()) {
    return { name, role, id };
}

// Default parameters can reference other parameters
function calculatePrice(price, tax = price * 0.1, shipping = 5) {
    return price + tax + shipping;
}

// Default parameters with destructuring
function processOptions({
    method = "GET",
    timeout = 5000,
    retries = 3
} = {}) {
    return { method, timeout, retries };
}

console.log(processOptions()); // Uses all defaults
console.log(processOptions({ method: "POST" })); // Overrides method only
\`\`\`

## Enhanced Object Literals

Shorthand syntax for object properties and methods.

\`\`\`javascript
const name = "John";
const age = 30;

// Property shorthand
const person = { name, age }; // Same as { name: name, age: age }

// Method shorthand
const calculator = {
    // Old way
    add: function(a, b) {
        return a + b;
    },

    // New way
    subtract(a, b) {
        return a - b;
    },

    // Arrow functions (be careful with 'this')
    multiply: (a, b) => a * b
};

// Computed property names
const propertyName = "dynamicProperty";
const obj = {
    [propertyName]: "value",
    [\`prefix_\${propertyName}\`]: "another value",
    [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
        yield 3;
    }
};

// Getters and setters
const user = {
    firstName: "John",
    lastName: "Doe",

    get fullName() {
        return \`\${this.firstName} \${this.lastName}\`;
    },

    set fullName(value) {
        [this.firstName, this.lastName] = value.split(' ');
    }
};

console.log(user.fullName); // "John Doe"
user.fullName = "Jane Smith";
console.log(user.firstName); // "Jane"
\`\`\`

## Let and Const

Block-scoped variable declarations.

\`\`\`javascript
// var vs let/const scope
function scopeExample() {
    if (true) {
        var varVariable = "var";
        let letVariable = "let";
        const constVariable = "const";
    }

    console.log(varVariable); // "var" - function scoped
    // console.log(letVariable); // Error - block scoped
    // console.log(constVariable); // Error - block scoped
}

// const with objects and arrays
const obj = { name: "John" };
obj.name = "Jane"; // OK - modifying property
obj.age = 30;      // OK - adding property
// obj = {}; // Error - reassigning

const arr = [1, 2, 3];
arr.push(4);    // OK - modifying array
arr[0] = 0;     // OK - modifying element
// arr = []; // Error - reassigning

// Temporal Dead Zone
console.log(typeof varVar); // undefined
console.log(typeof letVar); // ReferenceError

var varVar = "var";
let letVar = "let";

// Loop differences
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 10); // Prints: 3, 3, 3
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 10); // Prints: 0, 1, 2
}
\`\`\`

## Classes

Class syntax for object-oriented programming.

\`\`\`javascript
// Basic class
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // Instance method
    greet() {
        return \`Hello, I'm \${this.name}\`;
    }

    // Getter
    get info() {
        return \`\${this.name} is \${this.age} years old\`;
    }

    // Setter
    set age(value) {
        if (value < 0) {
            throw new Error("Age cannot be negative");
        }
        this._age = value;
    }

    get age() {
        return this._age;
    }

    // Static method
    static species() {
        return "Homo sapiens";
    }
}

// Inheritance
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age); // Call parent constructor
        this.grade = grade;
    }

    // Override method
    greet() {
        return \`\${super.greet()}, I'm a student\`;
    }

    // New method
    study() {
        return \`\${this.name} is studying\`;
    }
}

// Usage
const person = new Person("John", 30);
const student = new Student("Alice", 20, "A");

console.log(person.greet()); // "Hello, I'm John"
console.log(student.greet()); // "Hello, I'm Alice, I'm a student"
console.log(Person.species()); // "Homo sapiens"
\`\`\`

## Modules (Import/Export)

Organize code into reusable modules.

\`\`\`javascript
// math.js - Named exports
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// Default export
export default function multiply(a, b) {
    return a * b;
}

// Alternative export syntax
const divide = (a, b) => a / b;
const power = (base, exp) => Math.pow(base, exp);

export { divide, power };

// utils.js - Default export
export default class Utils {
    static formatCurrency(amount) {
        return \`$\${amount.toFixed(2)}\`;
    }

    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// main.js - Importing
import multiply, { add, subtract, PI } from './math.js';
import Utils from './utils.js';
import { divide as div, power } from './math.js'; // Rename import

// Import all
import * as MathUtils from './math.js';

// Dynamic imports
async function loadModule() {
    const { add } = await import('./math.js');
    return add(2, 3);
}
\`\`\`

## Symbols

Unique identifiers for object properties.

\`\`\`javascript
// Creating symbols
const sym1 = Symbol();
const sym2 = Symbol('description');
const sym3 = Symbol('description');

console.log(sym2 === sym3); // false - each symbol is unique

// Symbol as object property
const obj = {
    [sym1]: 'value1',
    [sym2]: 'value2',
    regularProp: 'regular'
};

console.log(obj[sym1]); // 'value1'
console.log(Object.keys(obj)); // ['regularProp'] - symbols not included

// Well-known symbols
const iterableObj = {
    data: [1, 2, 3],
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.data.length) {
                    return { value: this.data[index++], done: false };
                }
                return { done: true };
            }
        };
    }
};

for (const value of iterableObj) {
    console.log(value); // 1, 2, 3
}

// Global symbol registry
const globalSym1 = Symbol.for('app.id');
const globalSym2 = Symbol.for('app.id');
console.log(globalSym1 === globalSym2); // true
\`\`\`

## Iterators and Generators

Create custom iteration behavior.

### Iterators

\`\`\`javascript
// Custom iterator
function createIterator(array) {
    let index = 0;

    return {
        next() {
            if (index < array.length) {
                return { value: array[index++], done: false };
            }
            return { done: true };
        }
    };
}

const iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { done: true }
\`\`\`

### Generators

\`\`\`javascript
// Basic generator
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }

// Generator with parameters
function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2

// Generator delegation
function* gen1() {
    yield 1;
    yield 2;
}

function* gen2() {
    yield 3;
    yield 4;
}

function* combinedGen() {
    yield* gen1();
    yield* gen2();
    yield 5;
}

console.log([...combinedGen()]); // [1, 2, 3, 4, 5]

// Async generators
async function* asyncGenerator() {
    for (let i = 0; i < 3; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i;
    }
}

// Usage with for-await-of
async function useAsyncGen() {
    for await (const value of asyncGenerator()) {
        console.log(value); // 0, 1, 2 (with 1 second delays)
    }
}
\`\`\`

## Maps and Sets

New collection types with better performance characteristics.

### Maps

\`\`\`javascript
// Creating maps
const map = new Map();

// Setting values
map.set('name', 'John');
map.set('age', 30);
map.set(1, 'number key');
map.set(true, 'boolean key');

// Getting values
console.log(map.get('name')); // 'John'
console.log(map.get(1)); // 'number key'

// Map methods
console.log(map.has('name')); // true
console.log(map.size); // 4
map.delete('age');
console.log(map.size); // 3

// Iterating maps
for (const [key, value] of map) {
    console.log(key, value);
}

// Map with object keys
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const objectMap = new Map();
objectMap.set(obj1, 'first object');
objectMap.set(obj2, 'second object');

// Initialize with array
const mapFromArray = new Map([
    ['key1', 'value1'],
    ['key2', 'value2']
]);

// WeakMap (keys must be objects, garbage collected)
const weakMap = new WeakMap();
weakMap.set(obj1, 'some data');
// weakMap.set('string', 'value'); // Error - key must be object
\`\`\`

### Sets

\`\`\`javascript
// Creating sets
const set = new Set();

// Adding values
set.add(1);
set.add(2);
set.add(2); // Duplicate, won't be added
set.add('hello');

console.log(set.size); // 3

// Set methods
console.log(set.has(1)); // true
set.delete(2);
console.log(set.has(2)); // false

// Initialize with array
const setFromArray = new Set([1, 2, 3, 3, 4]); // [1, 2, 3, 4]

// Remove duplicates from array
const array = [1, 2, 2, 3, 3, 4];
const uniqueArray = [...new Set(array)]; // [1, 2, 3, 4]

// Iterating sets
for (const value of set) {
    console.log(value);
}

// Set operations
const set1 = new Set([1, 2, 3]);
const set2 = new Set([3, 4, 5]);

// Union
const union = new Set([...set1, ...set2]); // [1, 2, 3, 4, 5]

// Intersection
const intersection = new Set([...set1].filter(x => set2.has(x))); // [3]

// Difference
const difference = new Set([...set1].filter(x => !set2.has(x))); // [1, 2]

// WeakSet (values must be objects)
const weakSet = new WeakSet();
const obj = { name: 'John' };
weakSet.add(obj);
\`\`\`

## Proxies

Intercept and customize operations on objects.

\`\`\`javascript
// Basic proxy
const target = {
    name: 'John',
    age: 30
};

const proxy = new Proxy(target, {
    get(target, property) {
        console.log(\`Getting \${property}\`);
        return target[property];
    },

    set(target, property, value) {
        console.log(\`Setting \${property} to \${value}\`);
        target[property] = value;
        return true;
    }
});

console.log(proxy.name); // Logs: "Getting name", then "John"
proxy.age = 31; // Logs: "Setting age to 31"

// Validation proxy
function createValidatedUser(userData) {
    return new Proxy(userData, {
        set(target, property, value) {
            if (property === 'age' && (typeof value !== 'number' || value < 0)) {
                throw new Error('Age must be a positive number');
            }

            if (property === 'email' && !value.includes('@')) {
                throw new Error('Invalid email format');
            }

            target[property] = value;
            return true;
        }
    });
}

const user = createValidatedUser({});
user.name = 'John'; // OK
user.age = 30; // OK
// user.age = -5; // Error: Age must be a positive number

// Array proxy with negative indexing
function createArray(arr) {
    return new Proxy(arr, {
        get(target, property) {
            if (typeof property === 'string' && /^-\d+$/.test(property)) {
                const index = target.length + parseInt(property);
                return target[index];
            }
            return target[property];
        }
    });
}

const arr = createArray([1, 2, 3, 4, 5]);
console.log(arr[-1]); // 5 (last element)
console.log(arr[-2]); // 4 (second to last)
\`\`\`

## Challenge Questions

1. What's the difference between arrow functions and regular functions?
2. How does destructuring work with nested objects and arrays?
3. When would you use the spread operator vs the rest operator?
4. What are the benefits of using \`const\` and \`let\` over \`var\`?
5. How do ES6 classes compare to constructor functions?
6. What's the difference between \`Map\` and regular objects?
7. How do generators work and when would you use them?
8. What are some practical use cases for Proxies?
9. How do you handle default parameters with destructuring?
10. What's the difference between \`Set\` and arrays for storing unique values?
\`\`\`
```
