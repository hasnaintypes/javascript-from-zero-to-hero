// JavaScript Interview Preparation - Common Questions and Solutions

console.log("=== JavaScript Interview Preparation ===")

// 1. FUNDAMENTAL CONCEPTS

// Question: Explain the difference between var, let, and const
console.log("\n1. Variable Declarations:")

// var - function scoped, hoisted, can be redeclared
function varExample() {
  var varVariable // Declaration moved here
  console.log("var before declaration:", typeof varVariable) // undefined (hoisted)

  if (true) {
    varVariable = "I am var"
  }

  console.log("var outside block:", varVariable) // accessible
  varVariable = "redeclared" // allowed
  console.log("var redeclared:", varVariable)
}

// let - block scoped, hoisted but not initialized, cannot be redeclared
function letExample() {
  // console.log(letVariable); // ReferenceError: Cannot access before initialization

  if (true) {
    const letVariable = "I am let"
    console.log("let inside block:", letVariable)
  }

  // console.log(letVariable); // ReferenceError: letVariable is not defined

  const letVariable = "outside block"
  // let letVariable = 'redeclared'; // SyntaxError: Identifier already declared
  console.log("let outside:", letVariable)
}

// const - block scoped, hoisted but not initialized, cannot be redeclared or reassigned
function constExample() {
  const constVariable = "I am const"
  console.log("const:", constVariable)

  // constVariable = 'new value'; // TypeError: Assignment to constant variable

  // Objects and arrays can be mutated
  const constObject = { name: "John" }
  constObject.name = "Jane" // allowed
  console.log("const object mutated:", constObject)
}

varExample()
letExample()
constExample()

// 2. HOISTING
console.log("\n2. Hoisting Examples:")

// Function hoisting
console.log("Hoisted function result:", hoistedFunction()) // works

function hoistedFunction() {
  return "I am hoisted!"
}

// Variable hoisting
console.log("Hoisted var:", typeof hoistedVar) // undefined
var hoistedVar = "Now I have a value"

// let and const are hoisted but not initialized (Temporal Dead Zone)
// console.log(hoistedLet); // ReferenceError
const hoistedLet = "I am let"

// 3. CLOSURES
console.log("\n3. Closures:")

function outerFunction(x) {
  // This is the outer function's scope

  function innerFunction(y) {
    // This inner function has access to outer function's variables
    return x + y
  }

  return innerFunction
}

const addFive = outerFunction(5)
console.log("Closure result:", addFive(3)) // 8

// Practical closure example - counter
function createCounter() {
  let count = 0

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  }
}

const counter = createCounter()
console.log("Counter:", counter.increment()) // 1
console.log("Counter:", counter.increment()) // 2
console.log("Counter:", counter.getCount()) // 2

// 4. THIS BINDING
console.log("\n4. This Binding:")

const thisExample = {
  name: "Object",
  regularFunction: function () {
    console.log("Regular function this:", this.name)
  },
  arrowFunction: () => {
    console.log("Arrow function this:", this.name) // undefined (global this)
  },
  nestedExample: function () {
    const nested = () => {
      console.log("Nested arrow function this:", this.name) // inherits from parent
    }
    nested()
  },
}

thisExample.regularFunction()
thisExample.arrowFunction()
thisExample.nestedExample()

// 5. PROTOTYPAL INHERITANCE
console.log("\n5. Prototypal Inheritance:")

function Animal(name) {
  this.name = name
}

Animal.prototype.speak = function () {
  return `${this.name} makes a sound`
}

function Dog(name, breed) {
  Animal.call(this, name) // call parent constructor
  this.breed = breed
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

Dog.prototype.speak = function () {
  return `${this.name} barks`
}

const dog = new Dog("Buddy", "Golden Retriever")
console.log("Dog speaks:", dog.speak())
console.log("Dog is instance of Animal:", dog instanceof Animal)

// 6. ASYNCHRONOUS PROGRAMMING
console.log("\n6. Asynchronous Programming:")

// Callback example
function fetchDataCallback(callback) {
  setTimeout(() => {
    callback(null, "Data from callback")
  }, 100)
}

// Promise example
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data from promise")
    }, 100)
  })
}

// Async/await example
async function fetchDataAsync() {
  try {
    const data = await fetchDataPromise()
    console.log("Async/await result:", data)
  } catch (error) {
    console.error("Error:", error)
  }
}

fetchDataCallback((error, data) => {
  if (!error) {
    console.log("Callback result:", data)
  }
})

fetchDataPromise().then((data) => {
  console.log("Promise result:", data)
})

fetchDataAsync()

// 7. COMMON CODING CHALLENGES

// Challenge 1: Debounce function
console.log("\n7. Coding Challenges:")

function debounce(func, delay) {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

const debouncedLog = debounce((message) => {
  console.log("Debounced:", message)
}, 300)

// Challenge 2: Deep clone object
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item))
  }

  if (typeof obj === "object") {
    const cloned = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key])
      }
    }
    return cloned
  }
}

const original = { a: 1, b: { c: 2 }, d: [3, 4] }
const cloned = deepClone(original)
cloned.b.c = 999
console.log("Original:", original.b.c) // 2 (unchanged)
console.log("Cloned:", cloned.b.c) // 999

// Challenge 3: Flatten array
function flattenArray(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenArray(item) : item)
  }, [])
}

const nestedArray = [1, [2, 3], [4, [5, 6]]]
console.log("Flattened array:", flattenArray(nestedArray))

// Challenge 4: Find duplicates in array
function findDuplicates(arr) {
  const seen = new Set()
  const duplicates = new Set()

  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item)
    } else {
      seen.add(item)
    }
  }

  return Array.from(duplicates)
}

console.log("Duplicates:", findDuplicates([1, 2, 3, 2, 4, 3, 5]))

// Challenge 5: Implement Promise.all
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError("Argument must be an array"))
      return
    }

    if (promises.length === 0) {
      resolve([])
      return
    }

    const results = []
    let completedCount = 0

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value
          completedCount++

          if (completedCount === promises.length) {
            resolve(results)
          }
        })
        .catch(reject)
    })
  })
}

// Test Promise.all implementation
const testPromises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]

promiseAll(testPromises).then((results) => {
  console.log("Custom Promise.all result:", results)
})

// 8. EVENT LOOP DEMONSTRATION
console.log("\n8. Event Loop:")

console.log("1 - Start")

setTimeout(() => {
  console.log("4 - Timeout callback")
}, 0)

Promise.resolve().then(() => {
  console.log("3 - Promise callback")
})

console.log("2 - End")

// 9. COMMON ARRAY METHODS
console.log("\n9. Array Methods:")

const numbers = [1, 2, 3, 4, 5]

// Map - transform each element
const doubled = numbers.map((n) => n * 2)
console.log("Mapped (doubled):", doubled)

// Filter - select elements that meet criteria
const evens = numbers.filter((n) => n % 2 === 0)
console.log("Filtered (evens):", evens)

// Reduce - accumulate values
const sum = numbers.reduce((acc, n) => acc + n, 0)
console.log("Reduced (sum):", sum)

// Find - get first element that matches
const found = numbers.find((n) => n > 3)
console.log("Found (first > 3):", found)

// Some - check if any element matches
const hasEven = numbers.some((n) => n % 2 === 0)
console.log("Some (has even):", hasEven)

// Every - check if all elements match
const allPositive = numbers.every((n) => n > 0)
console.log("Every (all positive):", allPositive)

// 10. OBJECT METHODS AND PATTERNS
console.log("\n10. Object Patterns:")

// Object.create
const personPrototype = {
  greet() {
    return `Hello, I'm ${this.name}`
  },
}

const person = Object.create(personPrototype)
person.name = "Alice"
console.log("Object.create:", person.greet())

// Object destructuring
const user = { name: "Bob", age: 30, city: "New York" }
const { name, age, city = "Unknown" } = user
console.log("Destructured:", name, age, city)

// Object spread
const updatedUser = { ...user, age: 31, country: "USA" }
console.log("Spread object:", updatedUser)

// 11. ERROR HANDLING PATTERNS
console.log("\n11. Error Handling:")

// Try-catch with async/await
async function handleAsyncError() {
  try {
    // Simulate an async operation that might fail
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Something went wrong"))
      }, 100)
    })
    return result
  } catch (error) {
    console.log("Caught error:", error.message)
    return null
  }
}

handleAsyncError()

// Custom error classes
class ValidationError extends Error {
  constructor(message, field) {
    super(message)
    this.name = "ValidationError"
    this.field = field
  }
}

function validateEmail(email) {
  if (!email.includes("@")) {
    throw new ValidationError("Invalid email format", "email")
  }
  return true
}

try {
  validateEmail("invalid-email")
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation error:", error.message, "Field:", error.field)
  }
}

// 12. PERFORMANCE OPTIMIZATION TIPS
console.log("\n12. Performance Tips:")

// Use const for objects that won't be reassigned
const config = { apiUrl: "https://api.example.com" }

// Avoid creating functions in loops
const items = [1, 2, 3, 4, 5]

// Bad
// items.forEach(item => {
//     const processItem = (x) => x * 2; // Function created each iteration
//     console.log(processItem(item));
// });

// Good
const processItem = (x) => x * 2
items.forEach((item) => {
  console.log("Processed item:", processItem(item))
})

// Use object lookup instead of multiple if-else
const statusMessages = {
  200: "OK",
  404: "Not Found",
  500: "Internal Server Error",
}

function getStatusMessage(code) {
  return statusMessages[code] || "Unknown Status"
}

console.log("Status message:", getStatusMessage(404))

console.log("\n=== Interview Preparation Complete ===")
console.log("Practice these concepts and patterns regularly!")
