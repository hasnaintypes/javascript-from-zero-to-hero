// Operators & Type Coercion - Practical Examples

console.log("=== Operators & Type Coercion Demo ===")

// 1. Arithmetic Operators
console.log("\n--- Arithmetic Operators ---")

const a = 15
const b = 4

console.log(`a = ${a}, b = ${b}`)
console.log("Addition (a + b):", a + b) // 19
console.log("Subtraction (a - b):", a - b) // 11
console.log("Multiplication (a * b):", a * b) // 60
console.log("Division (a / b):", a / b) // 3.75
console.log("Modulus (a % b):", a % b) // 3
console.log("Exponentiation (a ** 2):", a ** 2) // 225

// Increment and Decrement
let counter = 5
console.log("\nIncrement/Decrement:")
console.log("Original counter:", counter) // 5
console.log("Pre-increment (++counter):", ++counter) // 6
console.log("Post-increment (counter++):", counter++) // 6, then becomes 7
console.log("Counter after post-increment:", counter) // 7
console.log("Pre-decrement (--counter):", --counter) // 6
console.log("Post-decrement (counter--):", counter--) // 6, then becomes 5
console.log("Final counter:", counter) // 5

// 2. Assignment Operators
console.log("\n--- Assignment Operators ---")

let x = 10
console.log("Initial x:", x)

x += 5 // x = x + 5
console.log("After x += 5:", x) // 15

x -= 3 // x = x - 3
console.log("After x -= 3:", x) // 12

x *= 2 // x = x * 2
console.log("After x *= 2:", x) // 24

x /= 4 // x = x / 4
console.log("After x /= 4:", x) // 6

x %= 4 // x = x % 4
console.log("After x %= 4:", x) // 2

x **= 3 // x = x ** 3
console.log("After x **= 3:", x) // 8

// 3. Comparison Operators
console.log("\n--- Comparison Operators ---")

const num1 = 5
const num2 = "5"
const num3 = 10

console.log(`num1 = ${num1} (${typeof num1})`)
console.log(`num2 = ${num2} (${typeof num2})`)
console.log(`num3 = ${num3} (${typeof num3})`)

// Loose equality (with type coercion)
console.log("num1 == num2:", num1 == num2) // true
console.log("num1 != num3:", num1 != num3) // true

// Strict equality (no type coercion)
console.log("num1 === num2:", num1 === num2) // false
console.log("num1 !== num2:", num1 !== num2) // true

// Relational operators
console.log("num1 > 3:", num1 > 3) // true
console.log("num1 < num3:", num1 < num3) // true
console.log("num1 >= 5:", num1 >= 5) // true
console.log("num1 <= 4:", num1 <= 4) // false

// 4. Logical Operators
console.log("\n--- Logical Operators ---")

const isLoggedIn = true
const hasPermission = false
const isAdmin = true

console.log("isLoggedIn:", isLoggedIn)
console.log("hasPermission:", hasPermission)
console.log("isAdmin:", isAdmin)

// AND operator
console.log("isLoggedIn && hasPermission:", isLoggedIn && hasPermission) // false
console.log("isLoggedIn && isAdmin:", isLoggedIn && isAdmin) // true

// OR operator
console.log("hasPermission || isAdmin:", hasPermission || isAdmin) // true
console.log("hasPermission || false:", hasPermission || false) // false

// NOT operator
console.log("!isLoggedIn:", !isLoggedIn) // false
console.log("!hasPermission:", !hasPermission) // true

// Short-circuit evaluation
const user = null
const userName = user && user.name // Won't error, returns null
console.log("userName (short-circuit):", userName)

const displayName = userName || "Guest"
console.log("displayName (default value):", displayName)

// 5. Ternary Operator
console.log("\n--- Ternary Operator ---")

const age = 20
const canVote = age >= 18 ? "Yes" : "No"
console.log(`Age: ${age}, Can vote: ${canVote}`)

const score = 85
const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F"
console.log(`Score: ${score}, Grade: ${grade}`)

// 6. String Operators
console.log("\n--- String Operators ---")

const firstName = "John"
const lastName = "Doe"
const fullName = firstName + " " + lastName
console.log("Full name:", fullName)

let greeting = "Hello"
greeting += " World"
greeting += "!"
console.log("Greeting:", greeting)

// 7. typeof Operator
console.log("\n--- typeof Operator ---")

console.log("typeof 42:", typeof 42)
console.log("typeof 'Hello':", typeof "Hello")
console.log("typeof true:", typeof true)
console.log("typeof undefined:", typeof undefined)
console.log("typeof null:", typeof null) // "object" - JavaScript quirk!
console.log("typeof {}:", typeof {})
console.log("typeof []:", typeof [])
console.log("typeof function(){}:", typeof (() => {}))

// 8. Type Coercion Examples
console.log("\n--- Type Coercion ---")

// String coercion (+ operator)
console.log("'5' + 3:", "5" + 3) // "53"
console.log("'Hello' + 1:", "Hello" + 1) // "Hello1"
console.log("true + '!':", true + "!") // "true!"
console.log("5 + '3':", 5 + "3") // "53"

// Numeric coercion (other operators)
console.log("'5' - 3:", "5" - 3) // 2
console.log("'10' * '2':", "10" * "2") // 20
console.log("'15' / '3':", "15" / "3") // 5
console.log("'5' % 2:", "5" % 2) // 1
console.log("+'123':", +"123") // 123 (unary + converts to number)

// Boolean coercion
console.log("\n--- Boolean Coercion ---")

// Falsy values
console.log("Boolean(false):", Boolean(false)) // false
console.log("Boolean(0):", Boolean(0)) // false
console.log("Boolean(''):", Boolean("")) // false
console.log("Boolean(null):", Boolean(null)) // false
console.log("Boolean(undefined):", Boolean(undefined)) // false
console.log("Boolean(NaN):", Boolean(Number.NaN)) // false

// Truthy values
console.log("Boolean(1):", Boolean(1)) // true
console.log("Boolean('hello'):", Boolean("hello")) // true
console.log("Boolean([]):", Boolean([])) // true
console.log("Boolean({}):", Boolean({})) // true
console.log("Boolean(-1):", Boolean(-1)) // true

// 9. Explicit Type Conversion
console.log("\n--- Explicit Type Conversion ---")

// To Number
console.log("Number('123'):", Number("123")) // 123
console.log("Number('123.45'):", Number("123.45")) // 123.45
console.log("Number('hello'):", Number("hello")) // NaN
console.log("parseInt('123'):", Number.parseInt("123")) // 123
console.log("parseInt('123.45'):", Number.parseInt("123.45")) // 123
console.log("parseFloat('123.45'):", Number.parseFloat("123.45")) // 123.45

// To String
console.log("String(123):", String(123)) // "123"
console.log("String(true):", String(true)) // "true"
console.log("(123).toString():", (123).toString()) // "123"

// 10. Comparison Coercion Gotchas
console.log("\n--- Comparison Gotchas ---")

console.log("5 == '5':", 5 == "5") // true
console.log("5 === '5':", 5 === "5") // false
console.log("true == 1:", true == 1) // true
console.log("true === 1:", true === 1) // false
console.log("false == 0:", false == 0) // true
console.log("null == undefined:", null == undefined) // true
console.log("null === undefined:", null === undefined) // false

// Array coercion gotchas
console.log("[] == false:", [] == false) // true
console.log("[] == 0:", [] == 0) // true
console.log("[] == '':", [] == "") // true

// Null comparison gotchas
console.log("null == 0:", null == 0) // false
console.log("null >= 0:", null >= 0) // true (null becomes 0)
console.log("null > 0:", null > 0) // false

// NaN comparisons
console.log("NaN == NaN:", Number.NaN == Number.NaN) // false
console.log("NaN === NaN:", Number.NaN === Number.NaN) // false
console.log("Number.isNaN(NaN):", Number.isNaN(Number.NaN)) // true

// 11. Operator Precedence
console.log("\n--- Operator Precedence ---")

console.log("2 + 3 * 4:", 2 + 3 * 4) // 14 (not 20)
console.log("(2 + 3) * 4:", (2 + 3) * 4) // 20
console.log("2 ** 3 ** 2:", 2 ** (3 ** 2)) // 512 (not 64, right-associative)
console.log("(2 ** 3) ** 2:", (2 ** 3) ** 2) // 64

// 12. Practical Examples
console.log("\n--- Practical Examples ---")

// Form validation
const email = "user@example.com"
const password = "123456"
const isValidEmail = email.includes("@") && email.includes(".")
const isValidPassword = password.length >= 6
const canLogin = isValidEmail && isValidPassword

console.log("Email valid:", isValidEmail)
console.log("Password valid:", isValidPassword)
console.log("Can login:", canLogin)

// Shopping cart calculation
const itemPrice = 29.99
const quantity = 3
const taxRate = 0.08
const subtotal = itemPrice * quantity
const tax = subtotal * taxRate
const total = subtotal + tax

console.log(`Item price: $${itemPrice}`)
console.log(`Quantity: ${quantity}`)
console.log(`Subtotal: $${subtotal.toFixed(2)}`)
console.log(`Tax: $${tax.toFixed(2)}`)
console.log(`Total: $${total.toFixed(2)}`)

// User status
const userAge = 25
const hasAccount = true
const isPremium = false
const status = hasAccount ? (isPremium ? "Premium User" : "Regular User") : "Guest"
const accessLevel = userAge >= 18 ? "Full Access" : "Limited Access"

console.log(`User status: ${status}`)
console.log(`Access level: ${accessLevel}`)
