// Testing & Debugging - Practical Examples

console.log("=== Testing & Debugging Demo ===")

// 1. Simple Testing Framework
console.log("\n--- Simple Testing Framework ---")

// Basic test runner
function test(description, testFn) {
  try {
    testFn()
    console.log(`✓ ${description}`)
    return true
  } catch (error) {
    console.error(`✗ ${description}: ${error.message}`)
    return false
  }
}

// Assertion helpers
function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, but got ${actual}`)
      }
    },
    toEqual(expected) {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`)
      }
    },
    toThrow(expectedError) {
      if (typeof actual !== "function") {
        throw new Error("Expected a function that throws")
      }
      try {
        actual()
        throw new Error("Expected function to throw an error")
      } catch (error) {
        if (expectedError && !error.message.includes(expectedError)) {
          throw new Error(`Expected error containing "${expectedError}", but got "${error.message}"`)
        }
      }
    },
    toBeTruthy() {
      if (!actual) {
        throw new Error(`Expected truthy value, but got ${actual}`)
      }
    },
    toBeFalsy() {
      if (actual) {
        throw new Error(`Expected falsy value, but got ${actual}`)
      }
    },
  }
}

// 2. Functions to Test
console.log("\n--- Functions Under Test ---")

// Math utilities
const mathUtils = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) throw new Error("Division by zero")
    return a / b
  },
  factorial: (n) => {
    if (n < 0) throw new Error("Factorial of negative number")
    if (n === 0 || n === 1) return 1
    return n * mathUtils.factorial(n - 1)
  },
}

// String utilities
const stringUtils = {
  capitalize: (str) => {
    if (!str) return ""
    return str.charAt(0).toUpperCase() + str.slice(1)
  },
  reverse: (str) => {
    if (typeof str !== "string") return ""
    return str.split("").reverse().join("")
  },
  isPalindrome: (str) => {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "")
    return cleaned === cleaned.split("").reverse().join("")
  },
  wordCount: (str) => {
    if (!str) return 0
    return str
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length
  },
}

// Array utilities
const arrayUtils = {
  unique: (arr) => [...new Set(arr)],
  flatten: (arr) => arr.flat(Number.POSITIVE_INFINITY),
  chunk: (arr, size) => {
    const chunks = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  },
  findMax: (arr) => {
    if (arr.length === 0) throw new Error("Array is empty")
    return Math.max(...arr)
  },
}

// 3. Unit Tests
console.log("\n--- Unit Tests ---")

// Test math utilities
test("add function adds two numbers correctly", () => {
  expect(mathUtils.add(2, 3)).toBe(5)
  expect(mathUtils.add(-1, 1)).toBe(0)
  expect(mathUtils.add(0, 0)).toBe(0)
})

test("divide function handles division by zero", () => {
  expect(() => mathUtils.divide(10, 0)).toThrow("Division by zero")
})

test("factorial calculates correctly", () => {
  expect(mathUtils.factorial(0)).toBe(1)
  expect(mathUtils.factorial(1)).toBe(1)
  expect(mathUtils.factorial(5)).toBe(120)
})

test("factorial throws error for negative numbers", () => {
  expect(() => mathUtils.factorial(-1)).toThrow("Factorial of negative number")
})

// Test string utilities
test("capitalize function works correctly", () => {
  expect(stringUtils.capitalize("hello")).toBe("Hello")
  expect(stringUtils.capitalize("")).toBe("")
  expect(stringUtils.capitalize("a")).toBe("A")
})

test("isPalindrome detects palindromes", () => {
  expect(stringUtils.isPalindrome("racecar")).toBeTruthy()
  expect(stringUtils.isPalindrome("A man a plan a canal Panama")).toBeTruthy()
  expect(stringUtils.isPalindrome("hello")).toBeFalsy()
})

test("wordCount counts words correctly", () => {
  expect(stringUtils.wordCount("hello world")).toBe(2)
  expect(stringUtils.wordCount("  hello   world  ")).toBe(2)
  expect(stringUtils.wordCount("")).toBe(0)
})

// Test array utilities
test("unique removes duplicates", () => {
  expect(arrayUtils.unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
  expect(arrayUtils.unique(["a", "b", "a", "c"])).toEqual(["a", "b", "c"])
})

test("chunk splits array into chunks", () => {
  expect(arrayUtils.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  expect(arrayUtils.chunk([1, 2, 3, 4], 2)).toEqual([
    [1, 2],
    [3, 4],
  ])
})

test("findMax throws error for empty array", () => {
  expect(() => arrayUtils.findMax([])).toThrow("Array is empty")
})

// 4. Mock Functions and Testing
console.log("\n--- Mock Functions ---")

// Simple mock implementation
function createMock() {
  const calls = []
  const mock = (...args) => {
    calls.push(args)
    return mock.returnValue
  }

  mock.calls = calls
  mock.returnValue = undefined
  mock.mockReturnValue = (value) => {
    mock.returnValue = value
    return mock
  }
  mock.mockImplementation = (fn) => {
    mock.implementation = fn
    return mock
  }

  return mock
}

// Example of testing with mocks
function processData(data, callback) {
  const processed = data.map((item) => item * 2)
  callback(processed)
  return processed
}

test("processData calls callback with processed data", () => {
  const mockCallback = createMock()
  const inputData = [1, 2, 3]
  const expectedOutput = [2, 4, 6]

  const result = processData(inputData, mockCallback)

  expect(result).toEqual(expectedOutput)
  expect(mockCallback.calls.length).toBe(1)
  expect(mockCallback.calls[0][0]).toEqual(expectedOutput)
})

// 5. Async Testing
console.log("\n--- Async Testing ---")

// Async functions to test
async function fetchUserData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: `User ${id}`, email: `user${id}@example.com` })
      } else {
        reject(new Error("Invalid user ID"))
      }
    }, 100)
  })
}

async function processUsers(ids) {
  const users = await Promise.all(ids.map((id) => fetchUserData(id)))
  return users.filter((user) => user.id % 2 === 0) // Only even IDs
}

// Async test helper
async function testAsync(description, testFn) {
  try {
    await testFn()
    console.log(`✓ ${description}`)
    return true
  } catch (error) {
    console.error(`✗ ${description}: ${error.message}`)
    return false
  }
}

// Async tests
testAsync("fetchUserData resolves with user data", async () => {
  const user = await fetchUserData(1)
  expect(user).toEqual({ id: 1, name: "User 1", email: "user1@example.com" })
})

testAsync("fetchUserData rejects for invalid ID", async () => {
  try {
    await fetchUserData(-1)
    throw new Error("Expected function to reject")
  } catch (error) {
    expect(error.message).toBe("Invalid user ID")
  }
})

testAsync("processUsers filters even IDs", async () => {
  const result = await processUsers([1, 2, 3, 4])
  expect(result.length).toBe(2)
  expect(result[0].id).toBe(2)
  expect(result[1].id).toBe(4)
})

// 6. Debugging Techniques
console.log("\n--- Debugging Techniques ---")

// Debug utility
function debug(label, value) {
  console.log(`[DEBUG] ${label}:`, value)
}

// Function with debugging
function complexCalculation(numbers) {
  debug("Input numbers", numbers)

  const filtered = numbers.filter((n) => n > 0)
  debug("Filtered positive numbers", filtered)

  const squared = filtered.map((n) => n * n)
  debug("Squared numbers", squared)

  const sum = squared.reduce((acc, n) => acc + n, 0)
  debug("Sum of squares", sum)

  return sum
}

// Test with debugging
const testNumbers = [-2, -1, 0, 1, 2, 3]
const result = complexCalculation(testNumbers)
console.log("Final result:", result)

// Performance debugging
function performanceTest(fn, label, iterations = 1000) {
  console.log(`\n--- Performance Test: ${label} ---`)

  const start = performance.now()

  for (let i = 0; i < iterations; i++) {
    fn()
  }

  const end = performance.now()
  const duration = end - start

  console.log(`Executed ${iterations} times in ${duration.toFixed(2)}ms`)
  console.log(`Average: ${(duration / iterations).toFixed(4)}ms per execution`)
}

// Performance test examples
performanceTest(() => {
  const arr = Array.from({ length: 100 }, (_, i) => i)
  return arr.filter((n) => n % 2 === 0).map((n) => n * 2)
}, "Array operations")

performanceTest(() => {
  return stringUtils.isPalindrome("A man a plan a canal Panama")
}, "Palindrome check")

// 7. Error Handling and Testing
console.log("\n--- Error Handling ---")

// Custom error classes
class ValidationError extends Error {
  constructor(message, field) {
    super(message)
    this.name = "ValidationError"
    this.field = field
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.name = "NetworkError"
    this.statusCode = statusCode
  }
}

// Function that throws custom errors
function validateUser(user) {
  if (!user.email) {
    throw new ValidationError("Email is required", "email")
  }
  if (!user.email.includes("@")) {
    throw new ValidationError("Invalid email format", "email")
  }
  if (!user.name || user.name.length < 2) {
    throw new ValidationError("Name must be at least 2 characters", "name")
  }
  return true
}

// Test error handling
test("validateUser throws ValidationError for missing email", () => {
  expect(() => validateUser({ name: "John" })).toThrow("Email is required")
})

test("validateUser throws ValidationError for invalid email", () => {
  expect(() => validateUser({ name: "John", email: "invalid" })).toThrow("Invalid email format")
})

test("validateUser passes for valid user", () => {
  expect(validateUser({ name: "John", email: "john@example.com" })).toBeTruthy()
})

// 8. Test Suite Summary
console.log("\n--- Test Suite Summary ---")

const totalTests = 0
const passedTests = 0

// Run all tests and collect results
const testResults = [
  // Add all your test results here
  // This is a simplified version for demonstration
]

console.log(`\nTest Results:`)
console.log(`Total tests: ${totalTests}`)
console.log(`Passed: ${passedTests}`)
console.log(`Failed: ${totalTests - passedTests}`)
console.log(`Success rate: ${totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0}%`)

console.log("\n=== Testing Exercises ===")
console.log("1. Write unit tests for a shopping cart class")
console.log("2. Create integration tests for a user authentication system")
console.log("3. Implement mocks for testing API-dependent functions")
console.log("4. Write tests for error conditions and edge cases")
console.log("5. Create performance tests for array manipulation functions")
console.log("6. Practice debugging with console methods and breakpoints")
console.log("7. Write async tests for Promise-based functions")
console.log("8. Create a test suite with setup and teardown")
console.log("9. Implement property-based testing for mathematical functions")
console.log("10. Write tests that verify error messages and types")
