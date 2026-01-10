// Modules & Imports - Practical Examples

console.log("=== Modules & Imports Demo ===")

// Note: This demo simulates module behavior since we can't use actual ES6 modules in this environment
// In a real application, you would use actual import/export statements

// 1. Simulating Named Exports
console.log("\n--- Named Exports Simulation ---")

// Simulate math.js module
const mathModule = (() => {
  const PI = 3.14159
  const E = 2.71828

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
    if (b === 0) throw new Error("Division by zero")
    return a / b
  }

  const power = (base, exp) => Math.pow(base, exp)
  const sqrt = (num) => Math.sqrt(num)

  // Return public API (simulating named exports)
  return {
    PI,
    E,
    add,
    subtract,
    multiply,
    divide,
    power,
    sqrt,
  }
})()

// Simulate importing named exports
const { add, subtract, PI, E } = mathModule
console.log("Math operations:")
console.log("  add(5, 3):", add(5, 3))
console.log("  subtract(10, 4):", subtract(10, 4))
console.log("  PI:", PI)
console.log("  E:", E)

// 2. Simulating Default Exports
console.log("\n--- Default Exports Simulation ---")

// Simulate logger.js module with default export
const LoggerModule = (() => {
  class Logger {
    constructor(level = "info") {
      this.level = level
      this.levels = { error: 0, warn: 1, info: 2, debug: 3 }
    }

    log(message, level = "info") {
      if (this.shouldLog(level)) {
        console.log(`[${level.toUpperCase()}] ${message}`)
      }
    }

    shouldLog(level) {
      return this.levels[level] <= this.levels[this.level]
    }
  }

  return { default: Logger }
})()

// Simulate default import
const Logger = LoggerModule.default
const logger = new Logger("debug")

console.log("Logger demo:")
logger.log("This is an info message")
logger.log("This is a warning", "warn")
logger.log("This is an error", "error")

// 3. Module Patterns - Singleton
console.log("\n--- Singleton Pattern ---")

const ConfigModule = (() => {
  let instance = null

  class Config {
    constructor() {
      if (instance) {
        return instance
      }

      this.settings = {
        apiUrl: "https://api.example.com",
        timeout: 5000,
        retries: 3,
      }

      instance = this
      return this
    }

    get(key) {
      return this.settings[key]
    }

    set(key, value) {
      this.settings[key] = value
    }
  }

  return { default: new Config() }
})()

// Test singleton
const config1 = ConfigModule.default
const config2 = ConfigModule.default

console.log("Singleton test:")
console.log("  Same instance:", config1 === config2)
console.log("  Initial API URL:", config1.get("apiUrl"))

config1.set("apiUrl", "https://new-api.example.com")
console.log("  Updated API URL from config2:", config2.get("apiUrl"))

// 4. Factory Pattern
console.log("\n--- Factory Pattern ---")

const DatabaseModule = (() => {
  class MySQLDatabase {
    connect() {
      return "Connected to MySQL database"
    }
  }

  class PostgreSQLDatabase {
    connect() {
      return "Connected to PostgreSQL database"
    }
  }

  function createDatabase(type) {
    switch (type) {
      case "mysql":
        return new MySQLDatabase()
      case "postgresql":
        return new PostgreSQLDatabase()
      default:
        throw new Error(`Unsupported database type: ${type}`)
    }
  }

  return { createDatabase }
})()

// Test factory pattern
console.log("Factory pattern test:")
const mysqlDb = DatabaseModule.createDatabase("mysql")
const postgresDb = DatabaseModule.createDatabase("postgresql")

console.log("  MySQL:", mysqlDb.connect())
console.log("  PostgreSQL:", postgresDb.connect())

// 5. Simulating Dynamic Imports
console.log("\n--- Dynamic Imports Simulation ---")

// Simulate dynamic module loading
const moduleRegistry = {
  "charts.js": () => ({
    renderChart: (data) => console.log("Rendering chart with data:", data),
  }),
  "analytics.js": () => ({
    trackEvent: (event, data) => console.log("Tracking event:", event, data),
  }),
}

// Simulate dynamic import function
async function dynamicImport(moduleName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (moduleRegistry[moduleName]) {
        const module = moduleRegistry[moduleName]()
        resolve(module)
      } else {
        reject(new Error(`Module ${moduleName} not found`))
      }
    }, 100)
  })
}

// Test dynamic loading
async function testDynamicLoading() {
  try {
    const chartsModule = await dynamicImport("charts.js")
    chartsModule.renderChart([1, 2, 3, 4, 5])

    const analyticsModule = await dynamicImport("analytics.js")
    analyticsModule.trackEvent("page_view", { page: "/home" })
  } catch (error) {
    console.error("Dynamic loading failed:", error)
  }
}

testDynamicLoading()

console.log("\n=== Module Exercises ===")
console.log("1. Create a utility module with string manipulation functions")
console.log("2. Implement a module that manages application state")
console.log("3. Build a module system for a simple calculator")
console.log("4. Create modules for different API endpoints")
console.log("5. Implement lazy loading for feature modules")
