// Variables & Data Types - Practical Examples

console.log("=== Variables & Data Types Demo ===")

// 1. Variable Declarations
console.log("\n--- Variable Declarations ---")

// const - for values that won't change
const PI = 3.14159
const COMPANY_NAME = "TechCorp"
console.log("PI:", PI)
console.log("Company:", COMPANY_NAME)

// let - for values that might change
let score = 0
let playerName = "Anonymous"
console.log("Initial score:", score)

// Changing let variables
score = 100
playerName = "John Doe"
console.log("Updated score:", score)
console.log("Player name:", playerName)

// 2. Data Types Examples
console.log("\n--- Data Types ---")

// Numbers
const age = 25
const price = 99.99
const temperature = -5
const infinity = Number.POSITIVE_INFINITY
const notANumber = Number.NaN

console.log("Age:", age, "Type:", typeof age)
console.log("Price:", price, "Type:", typeof price)
console.log("Temperature:", temperature, "Type:", typeof temperature)
console.log("Infinity:", infinity, "Type:", typeof infinity)
console.log("NaN:", notANumber, "Type:", typeof notANumber)

// Strings
const firstName = "John"
const lastName = "Doe"
const fullName = `${firstName} ${lastName}` // Template literal
const multiLine = `This is a
multi-line
string`

console.log("First name:", firstName, "Type:", typeof firstName)
console.log("Full name:", fullName)
console.log("Multi-line:", multiLine)

// Booleans
const isActive = true
const isComplete = false
const isLoggedIn = Boolean(1) // Conversion to boolean

console.log("Is active:", isActive, "Type:", typeof isActive)
console.log("Is complete:", isComplete)
console.log("Is logged in:", isLoggedIn)

// Undefined
let undefinedVar
console.log("Undefined variable:", undefinedVar, "Type:", typeof undefinedVar)

// Null
const emptyValue = null
console.log("Null value:", emptyValue, "Type:", typeof emptyValue) // Note: returns "object"

// Objects
const person = {
  name: "Alice",
  age: 30,
  isStudent: false,
}

const numbers = [1, 2, 3, 4, 5]
const currentDate = new Date()

console.log("Person object:", person, "Type:", typeof person)
console.log("Numbers array:", numbers, "Type:", typeof numbers)
console.log("Date object:", currentDate, "Type:", typeof currentDate)

// 3. Type Conversion Examples
console.log("\n--- Type Conversion ---")

// Implicit conversion
console.log("'5' + 3 =", "5" + 3) // String concatenation
console.log("'5' - 3 =", "5" - 3) // Number subtraction
console.log("'5' * '2' =", "5" * "2") // Number multiplication
console.log("true + 1 =", true + 1) // Boolean to number

// Explicit conversion
const stringNumber = "123"
const convertedNumber = Number(stringNumber)
const parsedInt = Number.parseInt("123.45")
const parsedFloat = Number.parseFloat("123.45")

console.log("Original string:", stringNumber, "Type:", typeof stringNumber)
console.log("Number():", convertedNumber, "Type:", typeof convertedNumber)
console.log("parseInt():", parsedInt, "Type:", typeof parsedInt)
console.log("parseFloat():", parsedFloat, "Type:", typeof parsedFloat)

// String conversion
const numberToString = String(123)
const numberToString2 = (456).toString()

console.log("String(123):", numberToString, "Type:", typeof numberToString)
console.log("(456).toString():", numberToString2, "Type:", typeof numberToString2)

// Boolean conversion
console.log("Boolean(1):", Boolean(1))
console.log("Boolean(0):", Boolean(0))
console.log("Boolean(''):", Boolean(""))
console.log("Boolean('hello'):", Boolean("hello"))
console.log("Boolean(null):", Boolean(null))
console.log("Boolean(undefined):", Boolean(undefined))

// 4. Variable Naming Examples
console.log("\n--- Variable Naming ---")

// Good naming practices
const userAge = 25
const totalPrice = 199.99
const isEmailValid = true
const MAX_ATTEMPTS = 3

// Using different naming conventions
const camelCase = "JavaScript standard"
const snake_case = "Common in other languages"
const UPPER_CASE = "For constants"

console.log("User age:", userAge)
console.log("Total price:", totalPrice)
console.log("Email valid:", isEmailValid)
console.log("Max attempts:", MAX_ATTEMPTS)

// 5. Common Mistakes and Gotchas
console.log("\n--- Common Gotchas ---")

// typeof null returns "object" (JavaScript quirk)
console.log("typeof null:", typeof null) // "object" - this is a known bug!

// NaN is not equal to itself
console.log("NaN === NaN:", Number.NaN === Number.NaN) // false
console.log("Number.isNaN(NaN):", Number.isNaN(Number.NaN)) // true - correct way to check

// Undefined vs null
let undefinedValue
const nullValue = null
console.log("undefined == null:", undefinedValue == nullValue) // true
console.log("undefined === null:", undefinedValue === nullValue) // false

// 6. Practical Examples
console.log("\n--- Practical Examples ---")

// User profile
const USER_ID = 12345
const username = "johndoe"
const email = "john@example.com"
const isVerified = false
const lastLoginDate = null // Not logged in yet
const profileViews = 0

console.log("User Profile:")
console.log("ID:", USER_ID)
console.log("Username:", username)
console.log("Email:", email)
console.log("Verified:", isVerified)
console.log("Last login:", lastLoginDate)
console.log("Profile views:", profileViews)

// Shopping cart
const itemName = "Laptop"
const itemPrice = 999.99
const quantity = 2
const inStock = true
const totalCost = itemPrice * quantity

console.log("\nShopping Cart:")
console.log("Item:", itemName)
console.log("Price: $" + itemPrice)
console.log("Quantity:", quantity)
console.log("In stock:", inStock)
console.log("Total: $" + totalCost)
