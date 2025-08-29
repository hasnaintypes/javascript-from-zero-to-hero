# Functions

Functions are reusable blocks of code that perform specific tasks. They are fundamental building blocks in JavaScript programming.

## What are Functions?

Functions are:
- **Reusable**: Write once, use many times
- **Modular**: Break complex problems into smaller pieces
- **Organized**: Keep code clean and structured
- **Testable**: Easy to test individual pieces of functionality

## Function Declaration

The traditional way to create functions.

\`\`\`javascript
function functionName(parameters) {
    // function body
    return value; // optional
}

// Example
function greet(name) {
    return "Hello, " + name + "!";
}

let message = greet("John"); // "Hello, John!"
\`\`\`

### Function Declaration Characteristics:
- **Hoisted**: Can be called before declaration
- **Named**: Always has a name
- **Block scoped** in strict mode

## Function Expression

Assigning a function to a variable.

\`\`\`javascript
const functionName = function(parameters) {
    // function body
    return value;
};

// Example
const add = function(a, b) {
    return a + b;
};

let result = add(5, 3); // 8
\`\`\`

### Function Expression Characteristics:
- **Not hoisted**: Cannot be called before declaration
- **Can be anonymous**: No function name required
- **Treated like variables**: Can be passed around

## Arrow Functions (ES6)

Shorter syntax for writing functions.

\`\`\`javascript
// Basic syntax
const functionName = (parameters) => {
    return value;
};

// Single parameter (parentheses optional)
const square = x => x * x;

// Multiple parameters
const multiply = (a, b) => a * b;

// No parameters
const sayHello = () => "Hello!";

// Multiple statements
const processData = (data) => {
    let processed = data.toUpperCase();
    return processed + "!";
};
\`\`\`

### Arrow Function Characteristics:
- **Shorter syntax**: More concise
- **Implicit return**: Single expressions return automatically
- **No \`this\` binding**: Inherits \`this\` from parent scope
- **Cannot be constructors**: Can't use with \`new\`

## Parameters and Arguments

### Parameters vs Arguments
- **Parameters**: Variables in function definition
- **Arguments**: Actual values passed to function

\`\`\`javascript
function greet(name, age) { // name and age are parameters
    return \`Hello \${name}, you are \${age} years old\`;
}

greet("John", 25); // "John" and 25 are arguments
\`\`\`

### Default Parameters (ES6)

\`\`\`javascript
function greet(name = "Guest", greeting = "Hello") {
    return \`\${greeting}, \${name}!\`;
}

console.log(greet());           // "Hello, Guest!"
console.log(greet("John"));     // "Hello, John!"
console.log(greet("Alice", "Hi")); // "Hi, Alice!"
\`\`\`

### Rest Parameters (ES6)

Collect multiple arguments into an array.

\`\`\`javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Mixed parameters
function introduce(name, age, ...hobbies) {
    return \`I'm \${name}, \${age} years old. I like: \${hobbies.join(", ")}\`;
}

console.log(introduce("John", 25, "reading", "coding", "gaming"));
\`\`\`

## Return Statement

Functions can return values using the \`return\` statement.

\`\`\`javascript
function add(a, b) {
    return a + b; // Returns the sum
}

function processUser(user) {
    if (!user) {
        return null; // Early return
    }
    
    return {
        name: user.name.toUpperCase(),
        email: user.email.toLowerCase()
    };
}

// Function without explicit return
function logMessage(message) {
    console.log(message);
    // Implicitly returns undefined
}
\`\`\`

## Function Scope

Variables declared inside functions are only accessible within that function.

\`\`\`javascript
let globalVar = "I'm global";

function myFunction() {
    let localVar = "I'm local";
    console.log(globalVar); // Can access global
    console.log(localVar);  // Can access local
}

myFunction();
// console.log(localVar); // Error! localVar is not defined

// Nested functions
function outer() {
    let outerVar = "outer";
    
    function inner() {
        let innerVar = "inner";
        console.log(outerVar); // Can access outer scope
        console.log(innerVar); // Can access own scope
    }
    
    inner();
    // console.log(innerVar); // Error! Can't access inner scope
}
\`\`\`

## Higher-Order Functions

Functions that take other functions as arguments or return functions.

\`\`\`javascript
// Function that takes another function as argument
function processArray(arr, callback) {
    let result = [];
    for (let item of arr) {
        result.push(callback(item));
    }
    return result;
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Function that returns another function
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(4)); // 12
\`\`\`

## Immediately Invoked Function Expression (IIFE)

Functions that execute immediately when defined.

\`\`\`javascript
// Basic IIFE
(function() {
    console.log("This runs immediately!");
})();

// IIFE with parameters
(function(name) {
    console.log("Hello, " + name);
})("World");

// Arrow function IIFE
(() => {
    console.log("Arrow IIFE");
})();

// IIFE for module pattern
const myModule = (function() {
    let privateVar = "I'm private";
    
    return {
        publicMethod: function() {
            return privateVar;
        }
    };
})();

console.log(myModule.publicMethod()); // "I'm private"
\`\`\`

## Function Methods

Functions are objects and have built-in methods.

\`\`\`javascript
function greet(greeting, punctuation) {
    return greeting + ", " + this.name + punctuation;
}

const person = { name: "John" };

// call() - invoke function with specific 'this'
console.log(greet.call(person, "Hello", "!")); // "Hello, John!"

// apply() - like call() but arguments as array
console.log(greet.apply(person, ["Hi", "?"])); // "Hi, John?"

// bind() - create new function with bound 'this'
const boundGreet = greet.bind(person);
console.log(boundGreet("Hey", ".")); // "Hey, John."
\`\`\`

## Common Function Patterns

### 1. Callback Functions
\`\`\`javascript
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: "John" };
        callback(data);
    }, 1000);
}

fetchData(function(data) {
    console.log("Received:", data);
});
\`\`\`

### 2. Factory Functions
\`\`\`javascript
function createUser(name, email) {
    return {
        name: name,
        email: email,
        greet: function() {
            return "Hello, I'm " + this.name;
        }
    };
}

const user1 = createUser("John", "john@example.com");
console.log(user1.greet()); // "Hello, I'm John"
\`\`\`

### 3. Recursive Functions
\`\`\`javascript
function factorial(n) {
    if (n <= 1) {
        return 1; // Base case
    }
    return n * factorial(n - 1); // Recursive case
}

console.log(factorial(5)); // 120

function countdown(num) {
    console.log(num);
    if (num > 0) {
        countdown(num - 1);
    }
}

countdown(3); // 3, 2, 1, 0
\`\`\`

## Best Practices

### 1. Use Descriptive Names
\`\`\`javascript
// Bad
function calc(x, y) { return x * y; }

// Good
function calculateArea(width, height) { return width * height; }
\`\`\`

### 2. Keep Functions Small
\`\`\`javascript
// Each function should do one thing well
function validateEmail(email) {
    return email.includes("@") && email.includes(".");
}

function formatUserName(firstName, lastName) {
    return \`\${firstName} \${lastName}\`.trim();
}
\`\`\`

### 3. Use Pure Functions When Possible
\`\`\`javascript
// Pure function - same input always gives same output, no side effects
function add(a, b) {
    return a + b;
}

// Impure function - depends on external state
let counter = 0;
function increment() {
    counter++; // Side effect
    return counter;
}
\`\`\`

### 4. Handle Edge Cases
\`\`\`javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

function getFirstElement(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return undefined;
    }
    return arr[0];
}
\`\`\`

## Function Declaration vs Expression vs Arrow

| Feature | Declaration | Expression | Arrow |
|---------|-------------|------------|-------|
| Hoisting | Yes | No | No |
| \`this\` binding | Yes | Yes | No (inherits) |
| \`arguments\` object | Yes | Yes | No |
| Constructor | Yes | Yes | No |
| Syntax | Verbose | Medium | Concise |

## Challenge Questions

1. What's the difference between function declarations and function expressions?
2. When would you use an arrow function vs a regular function?
3. What are default parameters and how do you use them?
4. Explain what a higher-order function is with an example.
5. What is function hoisting and which types of functions are hoisted?
6. Create a function that takes any number of arguments and returns their average.
7. What's the difference between \`call()\`, \`apply()\`, and \`bind()\`?
8. Write a recursive function to calculate the sum of numbers from 1 to n.
\`\`\`
