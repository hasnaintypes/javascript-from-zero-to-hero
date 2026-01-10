// Error Handling - Practical Examples

console.log("=== Error Handling Demo ===")

// 1. Basic Try-Catch
console.log("\n--- Basic Try-Catch ---")

function riskyOperation() {
  if (Math.random() > 0.5) {
    throw new Error("Random failure occurred!")
  }
  return "Operation successful!"
}

try {
  const result = riskyOperation()
  console.log("Success:", result)
} catch (error) {
  console.error("Caught error:", error.message)
}

// 2. Try-Catch-Finally
console.log("\n--- Try-Catch-Finally ---")

function processFile(filename) {
  let file = null

  try {
    console.log(`Opening file: ${filename}`)
    file = { name: filename, isOpen: true } // Simulate file opening

    if (filename.includes("error")) {
      throw new Error("File processing failed")
    }

    console.log("File processed successfully")
    return "File data"
  } catch (error) {
    console.error("Error processing file:", error.message)
    return null
  } finally {
    // Always executes
    if (file && file.isOpen) {
      console.log("Closing file:", file.name)
      file.isOpen = false
    }
    console.log("Cleanup completed")
  }
}

processFile("document.txt")
processFile("error-file.txt")

// 3. Custom Error Types
console.log("\n--- Custom Error Types ---")

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

class BusinessLogicError extends Error {
  constructor(message, code, details = {}) {
    super(message)
    this.name = "BusinessLogicError"
    this.code = code
    this.details = details
    this.timestamp = new Date().toISOString()
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      details: this.details,
      timestamp: this.timestamp,
    }
  }
}

function validateUser(user) {
  if (!user) {
    throw new ValidationError("User object is required", "user")
  }

  if (!user.email) {
    throw new ValidationError("Email is required", "email")
  }

  if (!user.email.includes("@")) {
    throw new ValidationError("Invalid email format", "email")
  }

  if (!user.password || user.password.length < 8) {
    throw new ValidationError("Password must be at least 8 characters", "password")
  }
}

// Test validation
const testUsers = [
  null,
  {},
  { email: "invalid-email" },
  { email: "test@example.com", password: "123" },
  { email: "test@example.com", password: "validpassword" },
]

testUsers.forEach((user, index) => {
  try {
    validateUser(user)
    console.log(`User ${index + 1}: Valid`)
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`User ${index + 1}: Validation failed for ${error.field} - ${error.message}`)
    } else {
      console.log(`User ${index + 1}: Unexpected error - ${error.message}`)
    }
  }
})

// 4. Error Handling with Specific Types
console.log("\n--- Handling Specific Error Types ---")

function simulateOperation(type) {
  switch (type) {
    case "validation":
      throw new ValidationError("Invalid input data", "input")
    case "network":
      throw new NetworkError("Connection failed", 500)
    case "business":
      throw new BusinessLogicError("Insufficient funds", "INSUFFICIENT_FUNDS", {
        balance: 100,
        requested: 200,
      })
    case "generic":
      throw new Error("Generic error")
    default:
      return "Success"
  }
}

const errorTypes = ["validation", "network", "business", "generic", "success"]

errorTypes.forEach((type) => {
  try {
    const result = simulateOperation(type)
    console.log(`${type}: ${result}`)
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`${type}: Validation error in field '${error.field}' - ${error.message}`)
    } else if (error instanceof NetworkError) {
      console.log(`${type}: Network error (${error.statusCode}) - ${error.message}`)
    } else if (error instanceof BusinessLogicError) {
      console.log(`${type}: Business logic error (${error.code}) - ${error.message}`)
      console.log("Details:", error.details)
    } else {
      console.log(`${type}: Generic error - ${error.message}`)
    }
  }
})

// 5. Async Error Handling with Promises
console.log("\n--- Async Error Handling with Promises ---")

function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === "error") {
        reject(new Error("User not found"))
      } else if (userId === "network") {
        reject(new NetworkError("Network timeout", 408))
      } else {
        resolve({ id: userId, name: `User ${userId}`, email: `user${userId}@example.com` })
      }
    }, 100)
  })
}

// Promise-based error handling
fetchUserData("123")
  .then((user) => {
    console.log("Promise success:", user)
  })
  .catch((error) => {
    console.error("Promise error:", error.message)
  })

fetchUserData("error")
  .then((user) => {
    console.log("This won't run")
  })
  .catch((error) => {
    console.error("Promise error caught:", error.message)
  })

// 6. Async/Await Error Handling
console.log("\n--- Async/Await Error Handling ---")

async function fetchUserDataAsync(userId) {
  try {
    const user = await fetchUserData(userId)
    console.log("Async success:", user)
    return user
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error("Network error in async function:", error.message, "Status:", error.statusCode)
    } else {
      console.error("Async error:", error.message)
    }
    throw error // Re-throw if needed
  }
}

// Test async error handling
async function testAsyncErrors() {
  try {
    await fetchUserDataAsync("456")
    await fetchUserDataAsync("network")
  } catch (error) {
    console.log("Final catch:", error.message)
  }
}

testAsyncErrors()

// 7. Multiple Async Operations
console.log("\n--- Multiple Async Operations ---")

async function fetchAllUserData(userId) {
  try {
    // Parallel requests
    const [user, posts, comments] = await Promise.all([
      fetchUserData(userId),
      fetchUserData(`${userId}-posts`),
      fetchUserData(`${userId}-comments`),
    ])

    console.log("All data fetched successfully:", { user, posts, comments })
    return { user, posts, comments }
  } catch (error) {
    console.error("Failed to fetch all data:", error.message)

    // Fallback: try to fetch data individually
    try {
      console.log("Trying fallback approach...")
      const user = await fetchUserData(userId)
      const posts = await fetchUserData(`${userId}-posts`).catch(() => [])
      const comments = await fetchUserData(`${userId}-comments`).catch(() => [])

      console.log("Fallback successful:", { user, posts, comments })
      return { user, posts, comments }
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError.message)
      throw new Error("Failed to fetch user data even with fallback")
    }
  }
}

// Test multiple async operations
setTimeout(() => {
  fetchAllUserData("789")
}, 500)

// 8. Retry Logic
console.log("\n--- Retry Logic ---")

async function retryOperation(operation, maxRetries = 3, delay = 1000) {
  let lastError

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries}`)
      return await operation()
    } catch (error) {
      lastError = error
      console.log(`Attempt ${attempt} failed: ${error.message}`)

      if (attempt === maxRetries) {
        throw new Error(`Operation failed after ${maxRetries} attempts: ${error.message}`)
      }

      console.log(`Retrying in ${delay}ms...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
      delay *= 2 // Exponential backoff
    }
  }
}

// Unreliable operation for testing
function unreliableOperation() {
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.7) {
      reject(new Error("Random failure"))
    } else {
      resolve("Operation succeeded!")
    }
  })
}

// Test retry logic
setTimeout(async () => {
  try {
    const result = await retryOperation(unreliableOperation, 3, 500)
    console.log("Retry result:", result)
  } catch (error) {
    console.error("All retry attempts failed:", error.message)
  }
}, 1000)

// 9. Circuit Breaker Pattern
console.log("\n--- Circuit Breaker Pattern ---")

class CircuitBreaker {
  constructor(threshold = 3, timeout = 5000) {
    this.threshold = threshold
    this.timeout = timeout
    this.failureCount = 0
    this.lastFailureTime = null
    this.state = "CLOSED" // CLOSED, OPEN, HALF_OPEN
  }

  async execute(operation) {
    if (this.state === "OPEN") {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = "HALF_OPEN"
        console.log("Circuit breaker: HALF_OPEN - trying operation")
      } else {
        throw new Error("Circuit breaker is OPEN - operation blocked")
      }
    }

    try {
      const result = await operation()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  onSuccess() {
    this.failureCount = 0
    this.state = "CLOSED"
    console.log("Circuit breaker: CLOSED - operation successful")
  }

  onFailure() {
    this.failureCount++
    this.lastFailureTime = Date.now()

    if (this.failureCount >= this.threshold) {
      this.state = "OPEN"
      console.log(`Circuit breaker: OPEN - ${this.failureCount} failures reached threshold`)
    }
  }

  getState() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      threshold: this.threshold,
    }
  }
}

// Test circuit breaker
const circuitBreaker = new CircuitBreaker(2, 3000)

function flakyService() {
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.8) {
      reject(new Error("Service unavailable"))
    } else {
      resolve("Service response")
    }
  })
}

async function testCircuitBreaker() {
  for (let i = 1; i <= 8; i++) {
    try {
      console.log(`\nTest ${i}:`)
      const result = await circuitBreaker.execute(flakyService)
      console.log("Success:", result)
    } catch (error) {
      console.error("Error:", error.message)
    }
    console.log("Circuit breaker state:", circuitBreaker.getState())

    // Wait a bit between tests
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
}

setTimeout(() => {
  testCircuitBreaker()
}, 2000)

// 10. Error Boundary Pattern
console.log("\n--- Error Boundary Pattern ---")

class ErrorBoundary {
  constructor() {
    this.errors = []
    this.errorHandlers = []
  }

  // Wrap a function with error handling
  wrap(fn, context = "Unknown") {
    return (...args) => {
      try {
        const result = fn.apply(this, args)

        // Handle promises
        if (result && typeof result.catch === "function") {
          return result.catch((error) => {
            this.handleError(error, context)
            throw error
          })
        }

        return result
      } catch (error) {
        this.handleError(error, context)
        throw error
      }
    }
  }

  // Handle errors
  handleError(error, context) {
    const errorInfo = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    }

    this.errors.push(errorInfo)

    // Notify error handlers
    this.errorHandlers.forEach((handler) => {
      try {
        handler(errorInfo)
      } catch (handlerError) {
        console.error("Error in error handler:", handlerError)
      }
    })
  }

  // Add error handler
  onError(handler) {
    this.errorHandlers.push(handler)
  }

  // Get error history
  getErrors() {
    return [...this.errors]
  }

  // Clear errors
  clearErrors() {
    this.errors = []
  }
}

// Usage
const errorBoundary = new ErrorBoundary()

// Add error handler
errorBoundary.onError((errorInfo) => {
  console.log("Error boundary caught:", errorInfo.error.message, "in context:", errorInfo.context)
})

// Wrap functions
const safeCalculate = errorBoundary.wrap((a, b, operation) => {
  switch (operation) {
    case "add":
      return a + b
    case "subtract":
      return a - b
    case "multiply":
      return a * b
    case "divide":
      if (b === 0) throw new Error("Division by zero")
      return a / b
    default:
      throw new Error("Unknown operation")
  }
}, "Calculator")

// Test error boundary
console.log("Safe calculation results:")
console.log("5 + 3 =", safeCalculate(5, 3, "add"))
console.log("10 - 4 =", safeCalculate(10, 4, "subtract"))

try {
  console.log("10 / 0 =", safeCalculate(10, 0, "divide"))
} catch (error) {
  console.log("Division by zero caught")
}

try {
  console.log("5 unknown 3 =", safeCalculate(5, 3, "unknown"))
} catch (error) {
  console.log("Unknown operation caught")
}

// 11. Logging System
console.log("\n--- Logging System ---")

class Logger {
  constructor(level = "info") {
    this.level = level
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    }
    this.logs = []
  }

  log(level, message, data = {}) {
    if (this.levels[level] <= this.levels[this.level]) {
      const timestamp = new Date().toISOString()
      const logEntry = {
        timestamp,
        level,
        message,
        data,
      }

      this.logs.push(logEntry)

      const consoleMethod = console[level] || console.log
      consoleMethod(`[${timestamp}] ${level.toUpperCase()}: ${message}`, data)

      // Send critical errors to monitoring service
      if (level === "error") {
        this.sendToMonitoring(logEntry)
      }
    }
  }

  error(message, data) {
    this.log("error", message, data)
  }

  warn(message, data) {
    this.log("warn", message, data)
  }

  info(message, data) {
    this.log("info", message, data)
  }

  debug(message, data) {
    this.log("debug", message, data)
  }

  sendToMonitoring(logEntry) {
    // Simulate sending to monitoring service
    console.log("📊 Sent to monitoring service:", logEntry.message)
  }

  getLogs(level = null) {
    if (level) {
      return this.logs.filter((log) => log.level === level)
    }
    return [...this.logs]
  }

  clearLogs() {
    this.logs = []
  }
}

const logger = new Logger("debug")

// Test logging
logger.info("Application started")
logger.debug("Debug information", { userId: 123, action: "login" })
logger.warn("This is a warning", { reason: "deprecated_api" })
logger.error("Critical error occurred", {
  error: "Database connection failed",
  stack: "Error stack trace...",
  userId: 456,
})

// 12. Graceful Degradation
console.log("\n--- Graceful Degradation ---")

async function enhancedUserExperience() {
  try {
    // Try to load enhanced features
    console.log("Loading enhanced features...")
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.6) {
          resolve("Enhanced features loaded")
        } else {
          reject(new Error("Enhanced features failed to load"))
        }
      }, 200)
    })
    return "Enhanced experience"
  } catch (error) {
    logger.warn("Enhanced features failed, falling back to basic", {
      error: error.message,
    })

    // Gracefully degrade to basic functionality
    return "Basic experience"
  }
}

async function loadUserProfile(userId) {
  let profile = {}

  try {
    // Try to get full profile
    console.log("Loading full profile...")
    profile = await fetchUserData(userId)
    profile.type = "full"
  } catch (error) {
    logger.warn("Failed to load full profile, trying basic profile", {
      userId,
      error: error.message,
    })

    try {
      // Fallback to basic profile
      console.log("Loading basic profile...")
      profile = {
        id: userId,
        name: `User ${userId}`,
        type: "basic",
      }
    } catch (basicError) {
      logger.error("Failed to load even basic profile", {
        userId,
        error: basicError.message,
      })

      // Final fallback
      profile = {
        id: userId,
        name: "Unknown User",
        avatar: "/default-avatar.png",
        type: "default",
      }
    }
  }

  return profile
}

// Test graceful degradation
setTimeout(async () => {
  const experience = await enhancedUserExperience()
  console.log("User experience:", experience)

  const profile = await loadUserProfile("test-user")
  console.log("User profile:", profile)
}, 3000)

// 13. Global Error Handling
console.log("\n--- Global Error Handling ---")

// Simulate global error handlers (these would normally be at the top level)
function setupGlobalErrorHandling() {
  // Handle unhandled promise rejections
  const originalHandler = window.onunhandledrejection
  window.onunhandledrejection = function (event) {
    console.error("🚨 Unhandled promise rejection:", event.reason)
    logger.error("Unhandled promise rejection", {
      reason: event.reason?.message || event.reason,
      stack: event.reason?.stack,
    })

    // Prevent default browser behavior
    event.preventDefault()

    // Call original handler if it exists
    if (originalHandler) {
      originalHandler.call(this, event)
    }
  }

  // Handle uncaught exceptions
  const originalErrorHandler = window.onerror
  window.onerror = function (message, filename, lineno, colno, error) {
    console.error("🚨 Uncaught error:", message)
    logger.error("Uncaught error", {
      message,
      filename,
      lineno,
      colno,
      error: error?.message,
      stack: error?.stack,
    })

    // Call original handler if it exists
    if (originalErrorHandler) {
      return originalErrorHandler.call(this, message, filename, lineno, colno, error)
    }

    return false
  }
}

setupGlobalErrorHandling()

// Test global error handling
setTimeout(() => {
  // Create an unhandled promise rejection
  Promise.reject(new Error("This is an unhandled promise rejection"))

  // Create an uncaught error
  setTimeout(() => {
    throw new Error("This is an uncaught error")
  }, 100)
}, 4000)

// 14. Error Recovery Strategies
console.log("\n--- Error Recovery Strategies ---")

class ErrorRecoveryService {
  constructor() {
    this.recoveryStrategies = new Map()
    this.fallbackData = new Map()
  }

  // Register recovery strategy for specific error types
  registerStrategy(errorType, strategy) {
    this.recoveryStrategies.set(errorType, strategy)
  }

  // Register fallback data
  registerFallback(key, data) {
    this.fallbackData.set(key, data)
  }

  // Attempt to recover from error
  async recover(error, context) {
    const strategy = this.recoveryStrategies.get(error.constructor.name)

    if (strategy) {
      try {
        return await strategy(error, context)
      } catch (recoveryError) {
        logger.error("Recovery strategy failed", {
          originalError: error.message,
          recoveryError: recoveryError.message,
          context,
        })
      }
    }

    // Use fallback data if available
    if (context.fallbackKey && this.fallbackData.has(context.fallbackKey)) {
      logger.info("Using fallback data", { key: context.fallbackKey })
      return this.fallbackData.get(context.fallbackKey)
    }

    throw error
  }
}

// Setup recovery service
const recoveryService = new ErrorRecoveryService()

// Register strategies
recoveryService.registerStrategy("NetworkError", async (error, context) => {
  logger.info("Attempting network error recovery")
  // Try alternative endpoint or cached data
  return { recovered: true, data: "cached data" }
})

recoveryService.registerStrategy("ValidationError", async (error, context) => {
  logger.info("Attempting validation error recovery")
  // Provide default values or sanitized input
  return { recovered: true, data: "default values" }
})

// Register fallback data
recoveryService.registerFallback("user-profile", {
  id: "default",
  name: "Guest User",
  avatar: "/default-avatar.png",
})

// Test error recovery
async function testErrorRecovery() {
  const testCases = [
    {
      error: new NetworkError("Connection timeout", 408),
      context: { operation: "fetch-data" },
    },
    {
      error: new ValidationError("Invalid email", "email"),
      context: { operation: "validate-user" },
    },
    {
      error: new Error("Unknown error"),
      context: { operation: "unknown", fallbackKey: "user-profile" },
    },
  ]

  for (const testCase of testCases) {
    try {
      const result = await recoveryService.recover(testCase.error, testCase.context)
      console.log("Recovery successful:", result)
    } catch (error) {
      console.log("Recovery failed:", error.message)
    }
  }
}

setTimeout(() => {
  testErrorRecovery()
}, 5000)

console.log("\n=== End of Error Handling Demo ===")
