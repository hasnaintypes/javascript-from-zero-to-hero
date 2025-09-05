# Loops

Loops allow you to execute code repeatedly. JavaScript provides several types of loops for different scenarios.

## for Loop

The most common loop, ideal when you know how many times to iterate.

### Basic for Loop

\`\`\`javascript
// Syntax: for (initialization; condition; increment)
for (let i = 0; i < 5; i++) {
    console.log("Iteration:", i);
}

// Counting backwards
for (let i = 10; i >= 1; i--) {
    console.log("Countdown:", i);
}

// Different increments
for (let i = 0; i <= 20; i += 5) {
    console.log("Skip by 5:", i);
}
\`\`\`

### Looping Through Arrays

\`\`\`javascript
let fruits = ["apple", "banana", "orange", "grape"];

// Traditional for loop
for (let i = 0; i < fruits.length; i++) {
    console.log(\`Index \${i}: \${fruits[i]}\`);
}

// Reverse iteration
for (let i = fruits.length - 1; i >= 0; i--) {
    console.log(\`Reverse \${i}: \${fruits[i]}\`);
}
\`\`\`

## while Loop

Executes while a condition is true. Good when you don't know the exact number of iterations.

\`\`\`javascript
let count = 0;
while (count < 5) {
    console.log("Count:", count);
    count++; // Don't forget to increment!
}

// Reading user input (conceptual example)
let userInput = "";
while (userInput !== "quit") {
    // userInput = prompt("Enter 'quit' to exit:");
    console.log("User entered:", userInput);
    break; // Break to avoid infinite loop in this example
}

// Finding first even number
let numbers = [1, 3, 7, 8, 9, 12];
let i = 0;
while (i < numbers.length) {
    if (numbers[i] % 2 === 0) {
        console.log("First even number:", numbers[i]);
        break;
    }
    i++;
}
\`\`\`

## do...while Loop

Executes at least once, then continues while condition is true.

\`\`\`javascript
let num = 0;
do {
    console.log("Number:", num);
    num++;
} while (num < 3);

// Menu system example
let choice;
do {
    console.log("1. Option A");
    console.log("2. Option B");
    console.log("3. Exit");
    choice = 3; // Simulating user choice
    console.log("You chose:", choice);
} while (choice !== 3);
\`\`\`

## for...in Loop

Iterates over enumerable properties of an object.

\`\`\`javascript
let person = {
    name: "John",
    age: 30,
    city: "New York"
};

// Loop through object properties
for (let key in person) {
    console.log(\`\${key}: \${person[key]}\`);
}

// With arrays (not recommended - use for...of instead)
let colors = ["red", "green", "blue"];
for (let index in colors) {
    console.log(\`Index \${index}: \${colors[index]}\`);
}
\`\`\`

## for...of Loop (ES6)

Iterates over iterable objects (arrays, strings, etc.).

\`\`\`javascript
let fruits = ["apple", "banana", "orange"];

// Loop through array values
for (let fruit of fruits) {
    console.log("Fruit:", fruit);
}

// Loop through string characters
let word = "hello";
for (let char of word) {
    console.log("Character:", char);
}

// With index using entries()
for (let [index, fruit] of fruits.entries()) {
    console.log(\`\${index}: \${fruit}\`);
}
\`\`\`

## Loop Control Statements

### break Statement

Exits the loop immediately.

\`\`\`javascript
// Find first number greater than 10
let numbers = [5, 8, 12, 3, 15, 7];
for (let num of numbers) {
    if (num > 10) {
        console.log("Found number greater than 10:", num);
        break; //  Exit loop
    }
}

// Break from nested loops
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            console.log("Breaking from nested loop");
            break outer; // Break from outer loop
        }
        console.log(\`i: \${i}, j: \${j}\`);
    }
}
\`\`\`

### continue Statement

Skips the current iteration and continues with the next.

\`\`\`javascript
// Skip even numbers
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        continue; // Skip even numbers
    }
    console.log("Odd number:", i);
}

// Skip empty strings
let words = ["hello", "", "world", "", "javascript"];
for (let word of words) {
    if (word === "") {
        continue; // Skip empty strings
    }
    console.log("Word:", word);
}
\`\`\`

## Nested Loops

Loops inside other loops.

\`\`\`javascript
// Multiplication table
for (let i = 1; i <= 5; i++) {
    let row = "";
    for (let j = 1; j <= 5; j++) {
        row += (i * j).toString().padStart(3, " ");
    }
    console.log(row);
}

// 2D array processing
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
        console.log(\`matrix[\${i}][\${j}] = \${matrix[i][j]}\`);
    }
}
\`\`\`

## Array Methods vs Loops

Modern JavaScript provides array methods that are often better than traditional loops.

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5];

// Traditional for loop
let doubled1 = [];
for (let i = 0; i < numbers.length; i++) {
    doubled1.push(numbers[i] * 2);
}

// Modern approach with map()
let doubled2 = numbers.map(num => num * 2);

// Traditional loop for filtering
let evens1 = [];
for (let num of numbers) {
    if (num % 2 === 0) {
        evens1.push(num);
    }
}

// Modern approach with filter()
let evens2 = numbers.filter(num => num % 2 === 0);

// Traditional loop for sum
let sum1 = 0;
for (let num of numbers) {
    sum1 += num;
}

// Modern approach with reduce()
let sum2 = numbers.reduce((total, num) => total + num, 0);
\`\`\`

## Common Loop Patterns

### 1. Accumulator Pattern
\`\`\`javascript
// Sum of array
let numbers = [1, 2, 3, 4, 5];
let sum = 0;
for (let num of numbers) {
    sum += num;
}

// Product of array
let product = 1;
for (let num of numbers) {
    product *= num;
}

// Concatenate strings
let words = ["Hello", "World", "JavaScript"];
let sentence = "";
for (let word of words) {
    sentence += word + " ";
}
\`\`\`

### 2. Search Pattern
\`\`\`javascript
// Linear search
function findElement(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Not found
}

// Find maximum
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
\`\`\`

### 3. Transformation Pattern
\`\`\`javascript
// Convert array of strings to uppercase
let names = ["alice", "bob", "charlie"];
let upperNames = [];
for (let name of names) {
    upperNames.push(name.toUpperCase());
}

// Create array of objects
let scores = [85, 92, 78];
let students = [];
for (let i = 0; i < scores.length; i++) {
    students.push({
        id: i + 1,
        score: scores[i],
        grade: scores[i] >= 90 ? "A" : scores[i] >= 80 ? "B" : "C"
    });
}
\`\`\`

## Performance Considerations

### 1. Cache Array Length
\`\`\`javascript
let arr = [1, 2, 3, 4, 5];

// Less efficient - length calculated each iteration
for (let i = 0; i < arr.length; i++) {
    // process arr[i]
}

// More efficient - length cached
for (let i = 0, len = arr.length; i < len; i++) {
    // process arr[i]
}
\`\`\`

### 2. Choose Right Loop Type
\`\`\`javascript
// for...of is generally fastest for arrays
for (let item of array) { }

// forEach is readable but slower
array.forEach(item => { });

// Traditional for loop gives most control
for (let i = 0; i < array.length; i++) { }
\`\`\`

## Infinite Loops (Avoid These!)

\`\`\`javascript
// Infinite while loop - missing increment
let i = 0;
while (i < 10) {
    console.log(i);
    // i++; // Forgot to increment!
}

// Infinite for loop - wrong condition
for (let i = 0; i >= 0; i++) {
    console.log(i);
    // Will never be false!
}

// How to break out of infinite loops:
// - Use break statement
// - Fix the condition
// - Ensure counter is modified correctly
\`\`\`

## Best Practices

### 1. Use Descriptive Variable Names
\`\`\`javascript
// Bad
for (let i = 0; i < arr.length; i++) { }

// Good
for (let index = 0; index < students.length; index++) { }
for (let student of students) { }
\`\`\`

### 2. Prefer Modern Array Methods
\`\`\`javascript
// Instead of loops, use:
array.forEach()  // for side effects
array.map()      // for transformation
array.filter()   // for selection
array.reduce()   // for accumulation
array.find()     // for searching
\`\`\`

### 3. Avoid Deep Nesting
\`\`\`javascript
// Bad - deep nesting
for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
        for (let k = 0; k < arr3.length; k++) {
            // too deep!
        }
    }
}

// Better - extract to functions
function processInnerLoop(arr3) {
    for (let item of arr3) {
        // process item
    }
}
\`\`\`

### 4. Use Early Returns/Breaks
\`\`\`javascript
// Find first match and exit early
for (let item of items) {
    if (item.matches(criteria)) {
        return item; // Exit early
    }
}
\`\`\`

## Challenge Questions

1. What's the difference between \`for...in\` and \`for...of\` loops?
2. When would you use a \`while\` loop instead of a \`for\` loop?
3. How do you break out of a nested loop?
4. What's the difference between \`break\` and \`continue\`?
5. Write a loop to find the second largest number in an array.
6. Create a function that uses loops to reverse a string without using built-in methods.
7. How can you avoid infinite loops?
8. When should you use traditional loops vs array methods like \`map()\` and \`filter()\`?
\`\`\`
