// Simple testing framework

class SimpleTest {
  constructor() {
    this.tests = []
    this.passed = 0
    this.failed = 0
  }

  test(description, testFunction) {
    this.tests.push({ description, testFunction })
  }

  expect(actual) {
    return {
      toBe: (expected) => {
        if (actual !== expected) {
          throw new Error(`Expected ${expected}, but got ${actual}`)
        }
      },
      toEqual: (expected) => {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`)
        }
      },
      toBeTruthy: () => {
        if (!actual) {
          throw new Error(`Expected truthy value, but got ${actual}`)
        }
      },
      toBeFalsy: () => {
        if (actual) {
          throw new Error(`Expected falsy value, but got ${actual}`)
        }
      },
      toThrow: () => {
        let threw = false
        try {
          actual()
        } catch (error) {
          threw = true
        }
        if (!threw) {
          throw new Error("Expected function to throw an error")
        }
      },
    }
  }

  run() {
    console.log("🧪 Running Tests...\n")

    this.tests.forEach(({ description, testFunction }) => {
      try {
        testFunction()
        console.log(`✅ ${description}`)
        this.passed++
      } catch (error) {
        console.log(`❌ ${description}`)
        console.log(`   Error: ${error.message}\n`)
        this.failed++
      }
    })

    console.log(`\n📊 Test Results:`)
    console.log(`   Passed: ${this.passed}`)
    console.log(`   Failed: ${this.failed}`)
    console.log(`   Total: ${this.tests.length}`)

    if (this.failed === 0) {
      console.log("🎉 All tests passed!")
    }
  }
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = SimpleTest
}
