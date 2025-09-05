// Calculator tests

// Simple calculator functions to test
function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero")
  }
  return a / b
}

function factorial(n) {
  if (n < 0) return undefined
  if (n === 0 || n === 1) return 1
  return n * factorial(n - 1)
}

// Create test instance
const SimpleTest = require("./SimpleTest") // Declare or import SimpleTest here
const testRunner = new SimpleTest()

// Addition tests
testRunner.test("should add two positive numbers", () => {
  testRunner.expect(add(2, 3)).toBe(5)
})

testRunner.test("should add negative numbers", () => {
  testRunner.expect(add(-2, -3)).toBe(-5)
})

testRunner.test("should add zero", () => {
  testRunner.expect(add(5, 0)).toBe(5)
})

// Subtraction tests
testRunner.test("should subtract numbers correctly", () => {
  testRunner.expect(subtract(10, 3)).toBe(7)
})

testRunner.test("should handle negative results", () => {
  testRunner.expect(subtract(3, 10)).toBe(-7)
})

// Multiplication tests
testRunner.test("should multiply positive numbers", () => {
  testRunner.expect(multiply(4, 5)).toBe(20)
})

testRunner.test("should multiply by zero", () => {
  testRunner.expect(multiply(5, 0)).toBe(0)
})

testRunner.test("should multiply negative numbers", () => {
  testRunner.expect(multiply(-3, -4)).toBe(12)
})

// Division tests
testRunner.test("should divide numbers correctly", () => {
  testRunner.expect(divide(10, 2)).toBe(5)
})

testRunner.test("should handle decimal results", () => {
  testRunner.expect(divide(7, 2)).toBe(3.5)
})

testRunner.test("should throw error for division by zero", () => {
  testRunner.expect(() => divide(5, 0)).toThrow()
})

// Factorial tests
testRunner.test("should calculate factorial of positive number", () => {
  testRunner.expect(factorial(5)).toBe(120)
})

testRunner.test("should return 1 for factorial of 0", () => {
  testRunner.expect(factorial(0)).toBe(1)
})

testRunner.test("should return 1 for factorial of 1", () => {
  testRunner.expect(factorial(1)).toBe(1)
})

testRunner.test("should return undefined for negative numbers", () => {
  testRunner.expect(factorial(-1)).toBe(undefined)
})

// Run all tests
testRunner.run()
