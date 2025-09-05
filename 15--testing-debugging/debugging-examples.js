// Debugging examples and techniques

console.log("=== Debugging Techniques Demo ===")

// 1. Console methods
console.log("Basic log message")
console.warn("This is a warning")
console.error("This is an error message")
console.info("This is info")

// Console table for objects/arrays
const users = [
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "Los Angeles" },
  { name: "Bob", age: 35, city: "Chicago" },
]
console.table(users)

// Console group for organizing logs
console.group("User Processing")
users.forEach((user) => {
  console.log(`Processing user: ${user.name}`)
  console.log(`Age: ${user.age}, City: ${user.city}`)
})
console.groupEnd()

// 2. Timing operations
console.time("Array Processing")
const numbers = Array.from({ length: 1000000 }, (_, i) => i)
const doubled = numbers.map((n) => n * 2)
console.timeEnd("Array Processing")

// 3. Debugging problematic code
function buggyFunction(data) {
  console.log("Input data:", data)

  // Add debugger statement (would pause execution in browser)
  // debugger;

  if (!data || !Array.isArray(data)) {
    console.error("Invalid data provided:", data)
    return []
  }

  const result = data
    .filter((item) => {
      console.log("Filtering item:", item)
      return item.active
    })
    .map((item) => {
      console.log("Mapping item:", item)
      return {
        id: item.id,
        name: item.name.toUpperCase(),
        score: item.score * 2,
      }
    })

  console.log("Final result:", result)
  return result
}

// Test with sample data
const sampleData = [
  { id: 1, name: "Alice", score: 85, active: true },
  { id: 2, name: "Bob", score: 92, active: false },
  { id: 3, name: "Charlie", score: 78, active: true },
]

buggyFunction(sampleData)

// 4. Error handling and debugging
function riskyOperation(value) {
  try {
    if (typeof value !== "number") {
      throw new TypeError("Value must be a number")
    }

    if (value < 0) {
      throw new RangeError("Value must be positive")
    }

    const result = Math.sqrt(value)
    console.log(`Square root of ${value} is ${result}`)
    return result
  } catch (error) {
    console.error("Error in riskyOperation:")
    console.error("Type:", error.constructor.name)
    console.error("Message:", error.message)
    console.error("Stack:", error.stack)

    // Re-throw if needed
    // throw error;

    return null
  }
}

// Test error handling
riskyOperation(16) // Success
riskyOperation("abc") // TypeError
riskyOperation(-5) // RangeError

// 5. Performance debugging
function performanceTest() {
  console.log("=== Performance Testing ===")

  // Test different array methods
  const largeArray = Array.from({ length: 100000 }, (_, i) => i)

  // Method 1: for loop
  console.time("For Loop")
  let sum1 = 0
  for (let i = 0; i < largeArray.length; i++) {
    sum1 += largeArray[i]
  }
  console.timeEnd("For Loop")

  // Method 2: forEach
  console.time("forEach")
  let sum2 = 0
  largeArray.forEach((num) => (sum2 += num))
  console.timeEnd("forEach")

  // Method 3: reduce
  console.time("reduce")
  const sum3 = largeArray.reduce((acc, num) => acc + num, 0)
  console.timeEnd("reduce")

  console.log("All sums equal:", sum1 === sum2 && sum2 === sum3)
}

performanceTest()

// 6. Memory usage debugging
function memoryTest() {
  console.log("=== Memory Usage Test ===")

  // Check memory usage (if available)
  if (performance.memory) {
    console.log("Used JS Heap Size:", performance.memory.usedJSHeapSize)
    console.log("Total JS Heap Size:", performance.memory.totalJSHeapSize)
    console.log("JS Heap Size Limit:", performance.memory.jsHeapSizeLimit)
  }

  // Create large object to see memory impact
  const largeObject = {}
  for (let i = 0; i < 10000; i++) {
    largeObject[`key${i}`] = `value${i}`.repeat(100)
  }

  if (performance.memory) {
    console.log("After creating large object:")
    console.log("Used JS Heap Size:", performance.memory.usedJSHeapSize)
  }

  // Clean up
  // largeObject = null; // Would help with garbage collection
}

memoryTest()
