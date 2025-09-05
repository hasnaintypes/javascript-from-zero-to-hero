// math.js - Math utilities module

// Named exports
export const PI = 3.14159
export const E = 2.71828

export function add(a, b) {
  return a + b
}

export function subtract(a, b) {
  return a - b
}

export function multiply(a, b) {
  return a * b
}

export function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero")
  }
  return a / b
}

export function power(base, exponent) {
  return Math.pow(base, exponent)
}

export function factorial(n) {
  if (n < 0) return undefined
  if (n === 0 || n === 1) return 1
  return n * factorial(n - 1)
}

// Default export
export default class MathCalculator {
  constructor() {
    this.history = []
  }

  calculate(operation, a, b) {
    let result
    switch (operation) {
      case "add":
        result = add(a, b)
        break
      case "subtract":
        result = subtract(a, b)
        break
      case "multiply":
        result = multiply(a, b)
        break
      case "divide":
        result = divide(a, b)
        break
      default:
        throw new Error("Unknown operation")
    }

    this.history.push({ operation, a, b, result })
    return result
  }

  getHistory() {
    return this.history
  }

  clearHistory() {
    this.history = []
  }
}
