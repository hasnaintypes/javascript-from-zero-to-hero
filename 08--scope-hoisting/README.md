# Scope & Hoisting

Understanding scope and hoisting is crucial for writing predictable JavaScript code and avoiding common bugs.

## What is Scope?

Scope determines where variables and functions can be accessed in your code. It's like the "visibility" of variables.

### Types of Scope

#### 1. Global Scope
Variables declared outside any function or block have global scope.

```javascript
var globalVar = "I'm global";
let globalLet = "I'm also global";
const globalConst = "Me too!";

function anyFunction() {
    console.log(globalVar); // Accessible
    console.log(globalLet); // Accessible
    console.log(globalConst); // Accessible
}
```

#### 2. Function Scope
Variables declared inside a function are only accessible within that function.

```javascript
function myFunction() {
    var functionScoped = "Only inside function";
    let alsoFunctionScoped = "Me too";
    
    console.log(functionScoped); // Works
}

myFunction();
// console.log(functionScoped); // Error! Not accessible outside
```

#### 3. Block Scope (ES6)
Variables declared with `let` and `const` inside a block `{}` are block-scoped.

```javascript
if (true) {
    var varVariable = "I'm var";
    let letVariable = "I'm let";
    const constVariable = "I'm const";
}

console.log(varVariable); // Works - var is function-scoped
// console.log(letVariable); // Error! - let is block-scoped
// console.log(constVariable); // Error! - const is block-scoped
```

## Lexical Scope

JavaScript uses lexical (static) scoping - inner functions have access to variables in their outer scope.

```javascript
function outerFunction() {
    let outerVariable = "I'm outer";
    
    function innerFunction() {
        let innerVariable = "I'm inner";
        console.log(outerVariable); // Can access outer variable
        console.log(innerVariable); // Can access own variable
    }
    
    innerFunction();
    // console.log(innerVariable); // Error! Can't access inner variable
}

outerFunction();
```

### Scope Chain

When JavaScript looks for a variable, it searches up the scope chain.

```javascript
let global = "global";

function level1() {
    let level1Var = "level1";
    
    function level2() {
        let level2Var = "level2";
        
        function level3() {
            let level3Var = "level3";
            
            // Can access all variables up the chain
            console.log(level3Var); // Own scope
            console.log(level2Var); // Parent scope
            console.log(level1Var); // Grandparent scope
            console.log(global);    // Global scope
        }
        
        level3();
    }
    
    level2();
}

level1();
```

## Hoisting

Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation.

### Variable Hoisting

#### var Hoisting
```javascript
console.log(myVar); // undefined (not error!)
var myVar = "Hello";
console.log(myVar); // "Hello"

// This is how JavaScript interprets it:
// var myVar; // Declaration hoisted
// console.log(myVar); // undefined
// myVar = "Hello"; // Assignment stays in place
```

#### let and const Hoisting
```javascript
// console.log(myLet); // ReferenceError! Temporal Dead Zone
let myLet = "Hello";

// console.log(myConst); // ReferenceError! Temporal Dead Zone
const myConst = "World";
```

### Function Hoisting

#### Function Declarations
Function declarations are fully hoisted.

```javascript
sayHello(); // Works! Prints "Hello"

function sayHello() {
    console.log("Hello");
}
```

#### Function Expressions
Function expressions are not hoisted.

```javascript
// sayGoodbye(); // TypeError! sayGoodbye is not a function

var sayGoodbye = function() {
    console.log("Goodbye");
};

sayGoodbye(); // Now it works
```

#### Arrow Functions
Arrow functions are not hoisted.

```javascript
// greet(); // ReferenceError! Cannot access before initialization

const greet = () => {
    console.log("Greetings");
};

greet(); // Works
```

## Temporal Dead Zone (TDZ)

The period between entering scope and variable declaration where the variable cannot be accessed.

```javascript
function example() {
    // TDZ starts here for 'myLet'
    
    console.log(typeof myVar); // "undefined"
    // console.log(typeof myLet); // ReferenceError!
    
    var myVar = 1;
    let myLet = 2; // TDZ ends here for 'myLet'
    
    console.log(myLet); // 2
}
```

## Closures

A closure is when an inner function has access to variables from its outer function even after the outer function has returned.

```javascript
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// 'count' is still accessible through closure
```

### Practical Closure Examples

#### 1. Data Privacy
```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance;
    
    return {
        deposit: function(amount) {
            balance += amount;
            return balance;
        },
        withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
                return balance;
            } else {
                return "Insufficient funds";
            }
        },
        getBalance: function() {
            return balance;
        }
    };
}

const account = createBankAccount(100);
console.log(account.deposit(50)); // 150
console.log(account.withdraw(30)); // 120
// console.log(balance); // Error! balance is private
```

#### 2. Function Factories
```javascript
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

## Common Scope Issues

### 1. Loop Variable Problem
```javascript
// Problem with var
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // Prints 3, 3, 3
    }, 100);
}

// Solution with let
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // Prints 0, 1, 2
    }, 100);
}

// Solution with closure
for (var i = 0; i < 3; i++) {
    (function(index) {
        setTimeout(function() {
            console.log(index); // Prints 0, 1, 2
        }, 100);
    })(i);
}
```

### 2. Variable Shadowing
```javascript
let name = "Global";

function example() {
    let name = "Function"; // Shadows global name
    
    if (true) {
        let name = "Block"; // Shadows function name
        console.log(name); // "Block"
    }
    
    console.log(name); // "Function"
}

example();
console.log(name); // "Global"
```

## Best Practices

### 1. Use let and const Instead of var
```javascript
// Bad
var name = "John";
var age = 30;

// Good
const name = "John";
let age = 30;
```

### 2. Declare Variables at the Top
```javascript
function example() {
    // Declare all variables at the top
    let result;
    let temp;
    let isValid = false;
    
    // Function logic here
    if (someCondition) {
        result = processData();
    }
    
    return result;
}
```

### 3. Avoid Global Variables
```javascript
// Bad - polluting global scope
var userName = "John";
var userAge = 30;

// Good - use modules or namespaces
const UserModule = {
    name: "John",
    age: 30,
    getName: function() {
        return this.name;
    }
};
```

### 4. Use IIFE for Initialization
```javascript
// Immediately Invoked Function Expression
(function() {
    // Initialization code here
    let config = loadConfiguration();
    setupApplication(config);
})();
```

## Module Pattern

Using closures to create modules with private and public methods.

```javascript
const Calculator = (function() {
    // Private variables
    let result = 0;
    let history = [];
    
    // Private methods
    function addToHistory(operation, value) {
        history.push(`${operation} ${value} = ${result}`);
    }
    
    // Public API
    return {
        add: function(value) {
            result += value;
            addToHistory("add", value);
            return this;
        },
        
        subtract: function(value) {
            result -= value;
            addToHistory("subtract", value);
            return this;
        },
        
        multiply: function(value) {
            result *= value;
            addToHistory("multiply", value);
            return this;
        },
        
        getResult: function() {
            return result;
        },
        
        getHistory: function() {
            return [...history]; // Return copy
        },
        
        reset: function() {
            result = 0;
            history = [];
            return this;
        }
    };
})();

// Usage
Calculator.add(10).multiply(2).subtract(5);
console.log(Calculator.getResult()); // 15
console.log(Calculator.getHistory());
```

## Debugging Scope Issues

### 1. Use Console and Debugger
```javascript
function debugScope() {
    let outerVar = "outer";
    
    function inner() {
        let innerVar = "inner";
        debugger; // Pause here to inspect scope
        console.log("Outer:", outerVar);
        console.log("Inner:", innerVar);
    }
    
    inner();
}
```

### 2. Use Strict Mode
```javascript
"use strict";

function example() {
    // undeclaredVar = "This will throw an error in strict mode";
    let declaredVar = "This is fine";
}
```

## Challenge Questions

1. What's the difference between function scope and block scope?
2. Explain what hoisting is and how it works differently for `var`, `let`, and `const`.
3. What is the Temporal Dead Zone?
4. How do closures work and why are they useful?
5. What's the difference between function declarations and function expressions in terms of hoisting?
6. How would you fix the classic loop closure problem?
7. What is variable shadowing and how can it cause issues?
8. Explain the scope chain and how JavaScript resolves variable names.
```
```
