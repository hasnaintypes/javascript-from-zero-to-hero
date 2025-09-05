// main.js - Main application file demonstrating module usage

// Named imports
import { PI, add, multiply, factorial } from "./math.js"
import { UserManager, validateEmail } from "./user.js"

// Default import
import MathCalculator from "./math.js"

// Import all as namespace
import * as MathUtils from "./math.js"

console.log("=== Module Imports Demo ===")

// Using named imports
console.log("PI:", PI)
console.log("5 + 3 =", add(5, 3))
console.log("4 * 6 =", multiply(4, 6))
console.log("5! =", factorial(5))

// Using default import
const calculator = new MathCalculator()
console.log("Calculator add:", calculator.calculate("add", 10, 5))
console.log("Calculator multiply:", calculator.calculate("multiply", 3, 4))
console.log("Calculator history:", calculator.getHistory())

// Using namespace import
console.log("Using namespace - E:", MathUtils.E)
console.log("Using namespace - power:", MathUtils.power(2, 3))

// User management demo
const userManager = new UserManager()

// Add users
const user1 = userManager.addUser("John Doe", "john@example.com", 30)
const user2 = userManager.addUser("Jane Smith", "jane@example.com", 25)

console.log("All users:", userManager.getAllUsers())

// Validate email
console.log("Valid email test:", validateEmail("test@example.com"))
console.log("Invalid email test:", validateEmail("invalid-email"))

// Dynamic import example
async function loadUtilities() {
  try {
    // This would work in a real module environment
    console.log("Dynamic import would load modules here")

    // Simulated dynamic import
    const dynamicModule = {
      formatCurrency: (amount) => `$${amount.toFixed(2)}`,
      formatDate: (date) => date.toLocaleDateString(),
    }

    console.log("Formatted currency:", dynamicModule.formatCurrency(123.456))
    console.log("Formatted date:", dynamicModule.formatDate(new Date()))
  } catch (error) {
    console.error("Failed to load module:", error)
  }
}

loadUtilities()
