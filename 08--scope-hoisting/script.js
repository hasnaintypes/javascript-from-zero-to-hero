// Scope & Hoisting - Practical Examples

console.log("=== Scope & Hoisting Demo ===")

// 1. Global Scope
console.log("\n--- Global Scope ---")

var globalVar = "I'm a global var"
const globalLet = "I'm a global let"
const globalConst = "I'm a global const"

function testGlobalAccess() {
  console.log("Inside function:")
  console.log("  globalVar:", globalVar)
  console.log("  globalLet:", globalLet)
  console.log("  globalConst:", globalConst)
}

testGlobalAccess()

// 2. Function Scope
console.log("\n--- Function Scope ---")

function demonstrateFunctionScope() {
  var functionVar = "I'm function-scoped"
  const functionLet = "I'm also function-scoped"
  const functionConst = "Me too!"

  console.log("Inside function:")
  console.log("  functionVar:", functionVar)
  console.log("  functionLet:", functionLet)
  console.log("  functionConst:", functionConst)

  // Nested function can access parent scope
  function nestedFunction() {
    console.log("Inside nested function:")
    console.log("  Can access functionVar:", functionVar)
    console.log("  Can access functionLet:", functionLet)
    console.log("  Can access functionConst:", functionConst)
  }

  nestedFunction()
}

demonstrateFunctionScope()

// These would cause errors if uncommented:
// console.log(functionVar); // ReferenceError
// console.log(functionLet); // ReferenceError
// console.log(functionConst); // ReferenceError

// 3. Block Scope
console.log("\n--- Block Scope ---")

function demonstrateBlockScope() {
  console.log("Before block:")

  if (true) {
    var blockVar = "I'm var in block"
    const blockLet = "I'm let in block"
    const blockConst = "I'm const in block"

    console.log("Inside block:")
    console.log("  blockVar:", blockVar)
    console.log("  blockLet:", blockLet)
    console.log("  blockConst:", blockConst)
  }

  console.log("After block:")
  console.log("  blockVar:", blockVar) // var is function-scoped, so accessible
  // console.log("  blockLet:", blockLet); // Error! let is block-scoped
  // console.log("  blockConst:", blockConst); // Error! const is block-scoped

  // Loop block scope
  for (let loopVar = 0; loopVar < 3; loopVar++) {
    // loopVar is block-scoped to this loop
    setTimeout(() => {
      console.log("Loop with let:", loopVar) // Prints 0, 1, 2
    }, 10)
  }

  // Compare with var
  for (var j = 0; j < 3; j++) {
    // j is function-scoped
    setTimeout(() => {
      console.log("Loop with var:", j) // Prints 3, 3, 3
    }, 20)
  }
}

demonstrateBlockScope()

// 4. Lexical Scope and Scope Chain
console.log("\n--- Lexical Scope and Scope Chain ---")

const globalLevel = "Global"

function level1() {
  const level1Var = "Level 1"

  function level2() {
    const level2Var = "Level 2"

    function level3() {
      const level3Var = "Level 3"

      console.log("From level 3:")
      console.log("  level3Var:", level3Var) // Own scope
      console.log("  level2Var:", level2Var) // Parent scope
      console.log("  level1Var:", level1Var) // Grandparent scope
      console.log("  globalLevel:", globalLevel) // Global scope
    }

    level3()
  }

  level2()
}

level1()

// 5. Hoisting Examples
console.log("\n--- Hoisting Examples ---")

// Variable hoisting with var
var myVar // Declaration hoisted to top
console.log("Before declaration, myVar:", typeof myVar) // undefined
myVar = "Hello World"
console.log("After declaration, myVar:", myVar)

// This is how JavaScript interprets the above:
// var myVar; // Declaration hoisted to top
// console.log("Before declaration, myVar:", typeof myVar);
// myVar = "Hello World"; // Assignment stays in place

// let and const hoisting (Temporal Dead Zone)
function demonstrateTDZ() {
  console.log("TDZ demonstration:")

  // These would cause ReferenceError if uncommented:
  // console.log(myLet); // ReferenceError: Cannot access before initialization
  // console.log(myConst); // ReferenceError: Cannot access before initialization

  const myLet = "I'm let"
  const myConst = "I'm const"

  console.log("After declaration:")
  console.log("  myLet:", myLet)
  console.log("  myConst:", myConst)
}

demonstrateTDZ()

// Function hoisting
console.log("\n--- Function Hoisting ---")

// Function declaration - fully hoisted
console.log("Calling hoisted function:")
hoistedFunction() // Works!

function hoistedFunction() {
  console.log("I'm a hoisted function declaration!")
}

// Function expression - not hoisted
console.log("Function expression hoisting:")
// notHoisted(); // TypeError: notHoisted is not a function

var notHoisted = () => {
  console.log("I'm a function expression")
}

notHoisted() // Now it works

// Arrow function - not hoisted
// arrowFunction(); // ReferenceError: Cannot access before initialization

const arrowFunction = () => {
  console.log("I'm an arrow function")
}

arrowFunction() // Works

// 6. Closures
console.log("\n--- Closures ---")

// Basic closure
function createCounter() {
  let count = 0

  return () => {
    count++
    return count
  }
}

const counter1 = createCounter()
const counter2 = createCounter()

console.log("Counter 1:")
console.log("  First call:", counter1()) // 1
console.log("  Second call:", counter1()) // 2
console.log("  Third call:", counter1()) // 3

console.log("Counter 2 (independent):")
console.log("  First call:", counter2()) // 1
console.log("  Second call:", counter2()) // 2

// Closure with parameters
function createMultiplier(multiplier) {
  return (number) => number * multiplier
}

const double = createMultiplier(2)
const triple = createMultiplier(3)
const quadruple = createMultiplier(4)

console.log("Multiplier functions:")
console.log("  double(5):", double(5)) // 10
console.log("  triple(5):", triple(5)) // 15
console.log("  quadruple(5):", quadruple(5)) // 20

// 7. Practical Closure Examples
console.log("\n--- Practical Closure Examples ---")

// Bank account with private balance
function createBankAccount(initialBalance) {
  let balance = initialBalance
  const transactionHistory = []

  function addTransaction(type, amount) {
    transactionHistory.push({
      type: type,
      amount: amount,
      balance: balance,
      timestamp: new Date().toISOString(),
    })
  }

  return {
    deposit: (amount) => {
      if (amount > 0) {
        balance += amount
        addTransaction("deposit", amount)
        console.log(`Deposited $${amount}. New balance: $${balance}`)
        return balance
      } else {
        console.log("Deposit amount must be positive")
        return balance
      }
    },

    withdraw: (amount) => {
      if (amount > 0 && amount <= balance) {
        balance -= amount
        addTransaction("withdrawal", amount)
        console.log(`Withdrew $${amount}. New balance: $${balance}`)
        return balance
      } else if (amount > balance) {
        console.log("Insufficient funds")
        return balance
      } else {
        console.log("Withdrawal amount must be positive")
        return balance
      }
    },

    getBalance: () => balance,

    getHistory: () => {
      return [...transactionHistory] // Return copy to prevent mutation
    },
  }
}

const account = createBankAccount(1000)
console.log("Bank account demo:")
account.deposit(500)
account.withdraw(200)
account.withdraw(2000) // Should fail
console.log("Final balance:", account.getBalance())
console.log("Transaction history:", account.getHistory())

// Configuration manager
function createConfig() {
  const config = {}

  return {
    set: (key, value) => {
      config[key] = value
      console.log(`Config set: ${key} = ${value}`)
    },

    get: (key) => config[key],

    getAll: () => {
      return { ...config } // Return copy
    },

    has: (key) => key in config,

    remove: (key) => {
      if (key in config) {
        delete config[key]
        console.log(`Config removed: ${key}`)
        return true
      }
      return false
    },
  }
}

const appConfig = createConfig()
console.log("\nConfiguration manager demo:")
appConfig.set("theme", "dark")
appConfig.set("language", "en")
appConfig.set("notifications", true)
console.log("Theme:", appConfig.get("theme"))
console.log("All config:", appConfig.getAll())
appConfig.remove("notifications")
console.log("Has notifications:", appConfig.has("notifications"))

// 8. Common Scope Issues and Solutions
console.log("\n--- Common Scope Issues ---")

// Loop closure problem
console.log("Loop closure problem:")

// Problem with var
console.log("With var (problematic):")
for (var k = 0; k < 3; k++) {
  setTimeout(() => {
    console.log("  var loop:", k) // Prints 3, 3, 3
  }, 50)
}

// Solution 1: Use let
console.log("With let (solution 1):")
for (let loopVar = 0; loopVar < 3; loopVar++) {
  setTimeout(() => {
    console.log("  let loop:", loopVar) // Prints 0, 1, 2
  }, 100)
}

// Solution 2: Use closure
console.log("With closure (solution 2):")
for (var l = 0; l < 3; l++) {
  ;((index) => {
    setTimeout(() => {
      console.log("  closure loop:", index) // Prints 0, 1, 2
    }, 150)
  })(l)
}

// Variable shadowing
console.log("\nVariable shadowing:")
const name = "Global Name"

function demonstrateShadowing() {
  const name = "Function Name" // Shadows global name

  console.log("In function:", name)

  if (true) {
    const name = "Block Name" // Shadows function name
    console.log("In block:", name)
  }

  console.log("Back in function:", name)
}

demonstrateShadowing()
console.log("In global:", name)

// 9. Module Pattern
console.log("\n--- Module Pattern ---")

const Calculator = (() => {
  // Private variables
  let result = 0
  let history = []

  // Private methods
  function addToHistory(operation, value, newResult) {
    history.push({
      operation: operation,
      value: value,
      result: newResult,
      timestamp: new Date().toISOString(),
    })
  }

  function validateNumber(value) {
    return typeof value === "number" && !isNaN(value)
  }

  // Public API
  return {
    add: function (value) {
      if (!validateNumber(value)) {
        console.log("Invalid number for addition")
        return this
      }
      result += value
      addToHistory("add", value, result)
      return this // Enable chaining
    },

    subtract: function (value) {
      if (!validateNumber(value)) {
        console.log("Invalid number for subtraction")
        return this
      }
      result -= value
      addToHistory("subtract", value, result)
      return this
    },

    multiply: function (value) {
      if (!validateNumber(value)) {
        console.log("Invalid number for multiplication")
        return this
      }
      result *= value
      addToHistory("multiply", value, result)
      return this
    },

    divide: function (value) {
      if (!validateNumber(value)) {
        console.log("Invalid number for division")
        return this
      }
      if (value === 0) {
        console.log("Cannot divide by zero")
        return this
      }
      result /= value
      addToHistory("divide", value, result)
      return this
    },

    getResult: () => result,

    getHistory: () => {
      return [...history] // Return copy
    },

    reset: function () {
      result = 0
      history = []
      console.log("Calculator reset")
      return this
    },

    showResult: function () {
      console.log("Current result:", result)
      return this
    },
  }
})()

console.log("Calculator module demo:")
Calculator.add(10).multiply(2).subtract(5).divide(3).showResult()

console.log("Calculator history:")
Calculator.getHistory().forEach((entry, index) => {
  console.log(`  ${index + 1}. ${entry.operation} ${entry.value} = ${entry.result}`)
})

Calculator.reset().add(100).multiply(0.5).showResult()

// 10. Advanced Closure Patterns
console.log("\n--- Advanced Closure Patterns ---")

// Memoization using closures
function createMemoizedFunction(fn) {
  const cache = {}

  return function (...args) {
    const key = JSON.stringify(args)

    if (key in cache) {
      console.log("Cache hit for:", args)
      return cache[key]
    }

    console.log("Computing for:", args)
    const result = fn.apply(this, args)
    cache[key] = result
    return result
  }
}

// Expensive function to memoize
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

const memoizedFibonacci = createMemoizedFunction(fibonacci)

console.log("Memoized fibonacci demo:")
console.log("fib(10):", memoizedFibonacci(10))
console.log("fib(10) again:", memoizedFibonacci(10)) // Should use cache
console.log("fib(11):", memoizedFibonacci(11))

// Event emitter using closures
function createEventEmitter() {
  const events = {}

  return {
    on: (event, callback) => {
      if (!events[event]) {
        events[event] = []
      }
      events[event].push(callback)
      console.log(`Listener added for event: ${event}`)
    },

    emit: function (event, ...args) {
      if (events[event]) {
        console.log(`Emitting event: ${event}`)
        events[event].forEach((callback) => {
          callback.apply(this, args)
        })
      } else {
        console.log(`No listeners for event: ${event}`)
      }
    },

    off: (event, callback) => {
      if (events[event]) {
        const index = events[event].indexOf(callback)
        if (index > -1) {
          events[event].splice(index, 1)
          console.log(`Listener removed for event: ${event}`)
        }
      }
    },

    listEvents: () => Object.keys(events),
  }
}

const emitter = createEventEmitter()

// Add event listeners
emitter.on("user-login", (username) => {
  console.log(`User logged in: ${username}`)
})

emitter.on("user-login", (username) => {
  console.log(`Welcome back, ${username}!`)
})

emitter.on("user-logout", (username) => {
  console.log(`User logged out: ${username}`)
})

console.log("Event emitter demo:")
console.log("Available events:", emitter.listEvents())
emitter.emit("user-login", "john_doe")
emitter.emit("user-logout", "john_doe")
emitter.emit("non-existent-event")

// 11. Debugging Scope Issues
console.log("\n--- Debugging Scope Issues ---")

function debugScopeExample() {
  const outerVar = "I'm in outer scope"

  function innerFunction() {
    const innerVar = "I'm in inner scope"

    // Use console.log to inspect scope
    console.log("Debug - Outer variable:", outerVar)
    console.log("Debug - Inner variable:", innerVar)

    // You can also use debugger statement (uncomment to use)
    // debugger; // This will pause execution in browser dev tools

    return {
      outer: outerVar,
      inner: innerVar,
    }
  }

  return innerFunction()
}

const scopeDebugResult = debugScopeExample()
console.log("Scope debug result:", scopeDebugResult)

// Strict mode example
function strictModeExample() {
  try {
    // This would throw an error in strict mode
    // undeclaredVariable = "This will cause an error";
    console.log("Strict mode: No undeclared variables allowed")
  } catch (error) {
    console.log("Strict mode error:", error.message)
  }

  const declaredVariable = "This is fine in strict mode"
  console.log("Declared variable:", declaredVariable)
}

strictModeExample()

console.log("\n=== End of Scope & Hoisting Demo ===")
