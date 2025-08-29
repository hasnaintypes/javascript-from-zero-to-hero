# Control Flow

Control flow determines the order in which code statements are executed. JavaScript provides several control structures to manage program flow.

## Conditional Statements

### 1. if Statement

Executes code if a condition is true.

```javascript
let age = 18;

if (age >= 18) {
    console.log("You are an adult");
}
```

### 2. if...else Statement

Executes one block if condition is true, another if false.

```javascript
let temperature = 25;

if (temperature > 30) {
    console.log("It's hot outside");
} else {
    console.log("It's not too hot");
}
```

### 3. if...else if...else Statement

Tests multiple conditions in sequence.

```javascript
let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else if (score >= 60) {
    console.log("Grade: D");
} else {
    console.log("Grade: F");
}
```

### 4. Nested if Statements

if statements inside other if statements.

```javascript
let weather = "sunny";
let temperature = 25;

if (weather === "sunny") {
    if (temperature > 20) {
        console.log("Perfect day for a picnic!");
    } else {
        console.log("Sunny but a bit cold");
    }
} else {
    console.log("Not ideal weather");
}
```

## Switch Statement

Tests a variable against multiple values.

```javascript
let day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of the work week");
        break;
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
        console.log("Midweek");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Invalid day");
}
```

### Switch vs if...else

**Use switch when:**
- Testing one variable against multiple exact values
- You have many conditions to check
- Values are simple (strings, numbers, booleans)

**Use if...else when:**
- Testing complex conditions
- Using comparison operators (>, <, >=, etc.)
- Conditions involve multiple variables

## Ternary Operator (Conditional Operator)

Shorthand for simple if...else statements.

```javascript
// Basic syntax: condition ? valueIfTrue : valueIfFalse

let age = 20;
let status = age >= 18 ? "Adult" : "Minor";

// Equivalent to:
let status2;
if (age >= 18) {
    status2 = "Adult";
} else {
    status2 = "Minor";
}

// Nested ternary (use sparingly)
let score = 85;
let grade = score >= 90 ? "A" : 
           score >= 80 ? "B" : 
           score >= 70 ? "C" : "F";
```

## Logical Operators in Control Flow

### Short-Circuit Evaluation

```javascript
// AND (&&) - stops at first falsy value
let user = { name: "John" };
user && console.log(user.name); // Only runs if user exists

// OR (||) - stops at first truthy value
let username = user.name || "Guest";

// Nullish coalescing (??) - ES2020
let config = null;
let timeout = config?.timeout ?? 5000; // 5000 if config is null/undefined
```

### Guard Clauses

Early returns to avoid deep nesting.

```javascript
function processUser(user) {
    // Guard clauses
    if (!user) {
        console.log("No user provided");
        return;
    }
    
    if (!user.email) {
        console.log("User has no email");
        return;
    }
    
    if (user.age < 18) {
        console.log("User is too young");
        return;
    }
    
    // Main logic here
    console.log("Processing user:", user.name);
}
```

## Truthy and Falsy Values

Understanding what JavaScript considers true or false in conditions.

### Falsy Values (6 total)
```javascript
if (false) { }      // false
if (0) { }          // 0
if (-0) { }         // -0
if (0n) { }         // BigInt 0
if ("") { }         // empty string
if (null) { }       // null
if (undefined) { }  // undefined
if (NaN) { }        // NaN
```

### Truthy Values
Everything else is truthy:
```javascript
if (true) { }       // true
if (1) { }          // any non-zero number
if ("hello") { }    // any non-empty string
if ([]) { }         // empty array (object)
if ({}) { }         // empty object
if (function(){}) { } // function
```

## Best Practices

### 1. Use Strict Equality
```javascript
// Good
if (status === "active") { }

// Avoid
if (status == "active") { }
```

### 2. Avoid Deep Nesting
```javascript
// Bad - deep nesting
if (user) {
    if (user.isActive) {
        if (user.hasPermission) {
            // do something
        }
    }
}

// Good - guard clauses
if (!user) return;
if (!user.isActive) return;
if (!user.hasPermission) return;
// do something
```

### 3. Use Descriptive Conditions
```javascript
// Bad
if (user.age >= 18 && user.hasLicense && user.hasInsurance) { }

// Good
const canDrive = user.age >= 18 && user.hasLicense && user.hasInsurance;
if (canDrive) { }
```

### 4. Consider Switch for Multiple Values
```javascript
// When checking multiple exact values, switch is cleaner
switch (userRole) {
    case "admin":
    case "moderator":
        return "full-access";
    case "user":
        return "limited-access";
    default:
        return "no-access";
}
```

## Common Patterns

### 1. Default Values
```javascript
function greet(name) {
    name = name || "Guest";
    // or with nullish coalescing
    name = name ?? "Guest";
    console.log("Hello, " + name);
}
```

### 2. Feature Detection
```javascript
if (typeof localStorage !== "undefined") {
    // Use localStorage
} else {
    // Fallback for older browsers
}
```

### 3. Error Handling
```javascript
function divide(a, b) {
    if (b === 0) {
        console.error("Cannot divide by zero");
        return null;
    }
    return a / b;
}
```

## Challenge Questions

1. What's the difference between `==` and `===` in conditional statements?
2. List all falsy values in JavaScript.
3. When should you use `switch` instead of `if...else`?
4. What is short-circuit evaluation and how does it work with `&&` and `||`?
5. Rewrite this nested if statement using guard clauses:
   ```javascript
   if (user) {
       if (user.isLoggedIn) {
           if (user.hasPermission) {
               console.log("Access granted");
           }
       }
   }
   ```
6. What's the difference between `||` and `??` operators?
```
