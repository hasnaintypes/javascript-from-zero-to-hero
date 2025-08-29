// Functions - Practical Examples

console.log("=== Functions Demo ===")

// 1. Function Declarations
console.log("\n--- Function Declarations ---")

// Basic function declaration
function greet(name) {
  return "Hello, " + name + "!"
}

console.log(greet("Alice"))
console.log(greet("Bob"))

// Function with multiple parameters
function calculateArea(width, height) {
  return width * height
}

console.log("Area of 5x3 rectangle:", calculateArea(5, 3))

// Function with conditional logic
function getGrade(score) {
  if (score >= 90) return "A"
  if (score >= 80) return "B"
  if (score >= 70) return "C"
  if (score >= 60) return "D"
  return "F"
}

console.log("Grade for 85:", getGrade(85))
console.log("Grade for 72:", getGrade(72))

// 2. Function Expressions
console.log("\n--- Function Expressions ---")

// Anonymous function expression
const add = (a, b) => a + b

console.log("5 + 3 =", add(5, 3))

// Named function expression (useful for debugging)
const factorial = function fact(n) {
  if (n <= 1) return 1
  return n * fact(n - 1)
}

console.log("Factorial of 5:", factorial(5))

// Function expression in object
const calculator = {
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      return "Cannot divide by zero"
    }
    return a / b
  },
}

console.log("Calculator multiply:", calculator.multiply(4, 7))
console.log("Calculator divide:", calculator.divide(15, 3))

// 3. Arrow Functions
console.log("\n--- Arrow Functions ---")

// Basic arrow function
const square = (x) => x * x
console.log("Square of 6:", square(6))

// Arrow function with multiple parameters
const subtract = (a, b) => a - b
console.log("10 - 4 =", subtract(10, 4))

// Arrow function with no parameters
const getRandomNumber = () => Math.floor(Math.random() * 100)
console.log("Random number:", getRandomNumber())

// Arrow function with block body
const processName = (name) => {
  const processed = name.trim().toLowerCase()
  return processed.charAt(0).toUpperCase() + processed.slice(1)
}

console.log("Processed name:", processName("  JOHN  "))

// Array methods with arrow functions
const numbers = [1, 2, 3, 4, 5]
const doubledNumbers = numbers.map((n) => n * 2)
const evens = numbers.filter((n) => n % 2 === 0)
const sum = numbers.reduce((total, n) => total + n, 0)

console.log("Original numbers:", numbers)
console.log("Doubled:", doubledNumbers)
console.log("Even numbers:", evens)
console.log("Sum:", sum)

// 4. Default Parameters
console.log("\n--- Default Parameters ---")

function createUser(name = "Guest", role = "user", isActive = true) {
  return {
    name: name,
    role: role,
    isActive: isActive,
    createdAt: new Date().toISOString(),
  }
}

console.log("User with all defaults:", createUser())
console.log("User with name only:", createUser("John"))
console.log("User with name and role:", createUser("Alice", "admin"))

// Default parameters with expressions
function greetWithTime(name, timeOfDay = new Date().getHours() < 12 ? "morning" : "afternoon") {
  return `Good ${timeOfDay}, ${name}!`
}

console.log(greetWithTime("Sarah"))

// 5. Rest Parameters
console.log("\n--- Rest Parameters ---")

// Function that accepts any number of arguments
function sumAll(...numbers) {
  return numbers.reduce((total, num) => total + num, 0)
}

console.log("Sum of 1,2,3:", sumAll(1, 2, 3))
console.log("Sum of 1,2,3,4,5:", sumAll(1, 2, 3, 4, 5))
console.log("Sum of no numbers:", sumAll())

// Mixed parameters with rest
function introduce(name, age, ...hobbies) {
  const hobbyText = hobbies.length > 0 ? ` I enjoy: ${hobbies.join(", ")}` : ""
  return `Hi, I'm ${name}, ${age} years old.${hobbyText}`
}

console.log(introduce("John", 25))
console.log(introduce("Alice", 30, "reading", "coding", "hiking"))

// 6. Return Statements
console.log("\n--- Return Statements ---")

// Function with early return
function validateAge(age) {
  if (typeof age !== "number") {
    return { valid: false, message: "Age must be a number" }
  }

  if (age < 0) {
    return { valid: false, message: "Age cannot be negative" }
  }

  if (age > 150) {
    return { valid: false, message: "Age seems unrealistic" }
  }

  return { valid: true, message: "Age is valid" }
}

console.log("Validate age 25:", validateAge(25))
console.log("Validate age -5:", validateAge(-5))
console.log("Validate age 'abc':", validateAge("abc"))

// Function returning object
function createProduct(name, price, category) {
  return {
    id: Math.floor(Math.random() * 1000),
    name: name,
    price: price,
    category: category,
    inStock: true,
    getDisplayName: function () {
      return `${this.name} - $${this.price}`
    },
  }
}

const laptop = createProduct("Gaming Laptop", 1299, "Electronics")
console.log("Product:", laptop)
console.log("Display name:", laptop.getDisplayName())

// 7. Function Scope
console.log("\n--- Function Scope ---")

const globalMessage = "I'm global"

function demonstrateScope() {
  const localMessage = "I'm local"

  console.log("Inside function - global:", globalMessage)
  console.log("Inside function - local:", localMessage)

  // Nested function
  function innerFunction() {
    const innerMessage = "I'm inner"
    console.log("Inner function - global:", globalMessage)
    console.log("Inner function - local:", localMessage)
    console.log("Inner function - inner:", innerMessage)
  }

  innerFunction()
}

demonstrateScope()
console.log("Outside function - global:", globalMessage)
// console.log(localMessage); // This would cause an error

// 8. Higher-Order Functions
console.log("\n--- Higher-Order Functions ---")

// Function that takes another function as parameter
function processArray(arr, operation) {
  const result = []
  for (const item of arr) {
    result.push(operation(item))
  }
  return result
}

const nums = [1, 2, 3, 4, 5]
const squared = processArray(nums, (x) => x * x)
const doubledArray = processArray(nums, (x) => x * 2)

console.log("Original:", nums)
console.log("Squared:", squared)
console.log("Doubled:", doubledArray)

// Function that returns another function
function createMultiplier(factor) {
  return (number) => number * factor
}

const multiplyBy3 = createMultiplier(3)
const multiplyBy10 = createMultiplier(10)

console.log("5 * 3 =", multiplyBy3(5))
console.log("7 * 10 =", multiplyBy10(7))

// Function for creating validators
function createValidator(minLength) {
  return (input) => input.length >= minLength
}

const validatePassword = createValidator(8)
const validateUsername = createValidator(3)

console.log("Password 'abc123' valid:", validatePassword("abc123"))
console.log("Password 'strongpassword' valid:", validatePassword("strongpassword"))
console.log("Username 'jo' valid:", validateUsername("jo"))
console.log("Username 'john' valid:", validateUsername("john"))

// 9. IIFE (Immediately Invoked Function Expression)
console.log("\n--- IIFE ---")

// Basic IIFE
;(() => {
  console.log("This IIFE runs immediately!")
})()

// IIFE with parameters
;((name, age) => {
  console.log(`IIFE says: Hello ${name}, you are ${age} years old`)
})("John", 30)

// IIFE for creating modules
const mathModule = (() => {
  const pi = 3.14159

  return {
    circleArea: (radius) => pi * radius * radius,
    circleCircumference: (radius) => 2 * pi * radius,
  }
})()

console.log("Circle area (r=5):", mathModule.circleArea(5))
console.log("Circle circumference (r=5):", mathModule.circleCircumference(5))

// 10. Recursive Functions
console.log("\n--- Recursive Functions ---")

// Factorial function
function factorialRecursive(n) {
  if (n <= 1) {
    return 1 // Base case
  }
  return n * factorialRecursive(n - 1) // Recursive case
}

console.log("Factorial of 5:", factorialRecursive(5))
console.log("Factorial of 0:", factorialRecursive(0))

// Fibonacci sequence
function fibonacci(n) {
  if (n <= 1) {
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}

console.log("Fibonacci sequence (first 8 numbers):")
for (let i = 0; i < 8; i++) {
  console.log(`F(${i}) = ${fibonacci(i)}`)
}

// Countdown function
function countdown(num) {
  console.log(num)
  if (num > 0) {
    countdown(num - 1)
  } else {
    console.log("Blast off! 🚀")
  }
}

console.log("Countdown from 5:")
countdown(5)

// 11. Practical Examples
console.log("\n--- Practical Examples ---")

// Email validator
function isValidEmail(email) {
  if (typeof email !== "string") return false
  if (email.length === 0) return false
  if (!email.includes("@")) return false
  if (!email.includes(".")) return false

  const parts = email.split("@")
  if (parts.length !== 2) return false
  if (parts[0].length === 0 || parts[1].length === 0) return false

  return true
}

const emails = ["test@example.com", "invalid-email", "user@domain", "@domain.com"]
emails.forEach((email) => {
  console.log(`${email}: ${isValidEmail(email) ? "Valid" : "Invalid"}`)
})

// Shopping cart functions
function createShoppingCart() {
  let items = []

  return {
    addItem: (name, price, quantity = 1) => {
      items.push({ name, price, quantity })
      console.log(`Added ${quantity}x ${name} at $${price} each`)
    },

    removeItem: (name) => {
      const index = items.findIndex((item) => item.name === name)
      if (index !== -1) {
        const removed = items.splice(index, 1)[0]
        console.log(`Removed ${removed.name} from cart`)
      } else {
        console.log(`${name} not found in cart`)
      }
    },

    getTotal: () => items.reduce((total, item) => total + item.price * item.quantity, 0),

    getItems: () => {
      return [...items] // Return copy of items
    },

    clear: () => {
      items = []
      console.log("Cart cleared")
    },
  }
}

const cart = createShoppingCart()
cart.addItem("Laptop", 999, 1)
cart.addItem("Mouse", 25, 2)
cart.addItem("Keyboard", 75, 1)

console.log("Cart items:", cart.getItems())
console.log("Cart total: $" + cart.getTotal())

cart.removeItem("Mouse")
console.log("Cart total after removal: $" + cart.getTotal())

// Temperature converter
const temperatureConverter = {
  celsiusToFahrenheit: (celsius) => (celsius * 9) / 5 + 32,

  fahrenheitToCelsius: (fahrenheit) => ((fahrenheit - 32) * 5) / 9,

  celsiusToKelvin: (celsius) => celsius + 273.15,

  kelvinToCelsius: (kelvin) => kelvin - 273.15,
}

console.log("Temperature conversions:")
console.log("25°C to Fahrenheit:", temperatureConverter.celsiusToFahrenheit(25).toFixed(1) + "°F")
console.log("77°F to Celsius:", temperatureConverter.fahrenheitToCelsius(77).toFixed(1) + "°C")
console.log("0°C to Kelvin:", temperatureConverter.celsiusToKelvin(0).toFixed(1) + "K")

// Password generator
function generatePassword(length = 12, includeSymbols = true) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz"
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

  let charset = lowercase + uppercase + numbers
  if (includeSymbols) {
    charset += symbols
  }

  let password = ""
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  return password
}

console.log("Generated passwords:")
console.log("12 chars with symbols:", generatePassword())
console.log("8 chars without symbols:", generatePassword(8, false))
console.log("16 chars with symbols:", generatePassword(16))
