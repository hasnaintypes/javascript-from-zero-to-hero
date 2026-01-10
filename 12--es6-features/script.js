// ES6+ Features - Practical Examples

console.log("=== ES6+ Features Demo ===")

// 1. Arrow Functions
console.log("\n--- Arrow Functions ---")

// Traditional function vs arrow function
function traditionalAdd(a, b) {
  return a + b
}

const arrowAdd = (a, b) => a + b

console.log("Traditional function:", traditionalAdd(5, 3))
console.log("Arrow function:", arrowAdd(5, 3))

// Different arrow function syntaxes
const square = (x) => x * x
const greet = () => "Hello World!"
const processData = (data) => {
  const processed = data.toUpperCase()
  return processed + "!"
}

console.log("Square of 4:", square(4))
console.log("Greeting:", greet())
console.log("Processed data:", processData("hello"))

// 'this' binding difference
const obj = {
  name: "John",

  regularMethod: function () {
    console.log("Regular method 'this':", this.name)
  },

  arrowMethod: () => {
    console.log("Arrow method 'this':", this?.name || "undefined")
  },

  delayedGreeting: function () {
    setTimeout(() => {
      console.log(`Delayed greeting: Hello, ${this.name}!`)
    }, 100)
  },
}

obj.regularMethod()
obj.arrowMethod()
obj.delayedGreeting()

// 2. Template Literals
console.log("\n--- Template Literals ---")

const name = "Alice"
const age = 30
const price = 19.99
const tax = 0.08

// String interpolation
const greeting = `Hello, my name is ${name} and I'm ${age} years old.`
console.log(greeting)

// Expressions in template literals
const total = `Total: $${(price * (1 + tax)).toFixed(2)}`
console.log(total)

// Multi-line strings
const multiLine = `
    This is a multi-line string.
    It preserves line breaks and
    indentation.
`
console.log("Multi-line string:", multiLine)

// Tagged template literals
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i] ? `<mark>${values[i]}</mark>` : ""
    return result + string + value
  }, "")
}

const highlighted = highlight`Hello ${name}, you are ${age} years old!`
console.log("Highlighted:", highlighted)

// 3. Destructuring
console.log("\n--- Destructuring ---")

// Array destructuring
const numbers = [1, 2, 3, 4, 5]
const [first, second, , fourth] = numbers
console.log("Array destructuring:", { first, second, fourth })

// Rest in destructuring
const [head, ...tail] = numbers
console.log("Head:", head, "Tail:", tail)

// Default values
const [x, y, z = 0] = [1, 2]
console.log("With defaults:", { x, y, z })

// Swapping variables
let var1 = "a"
let var2 = "b"
;[var1, var2] = [var2, var1]
console.log("After swapping:", { var1, var2 })

// Object destructuring
const personObj = {
  name: "John",
  age: 30,
  city: "New York",
  country: "USA",
}

const { name: fullName, city: location } = personObj
console.log("Object destructuring:", { fullName, location })

// Nested destructuring
const userObj = {
  id: 1,
  profile: {
    firstName: "Jane",
    lastName: "Doe",
    social: {
      twitter: "@janedoe",
      github: "janedoe",
    },
  },
}

const {
  profile: {
    firstName,
    social: { twitter },
  },
} = userObj

console.log("Nested destructuring:", { firstName, twitter })

// Function parameter destructuring
function greetUser({ name, age = 0 }) {
  return `Hello ${name}, you are ${age} years old`
}

console.log(greetUser({ name: "Alice", age: 25 }))
console.log(greetUser({ name: "Bob" }))

// 4. Spread and Rest Operators
console.log("\n--- Spread and Rest Operators ---")

// Array spreading
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const combined = [...arr1, ...arr2]
console.log("Combined arrays:", combined)

// Object spreading
const obj1Spread = { a: 1, b: 2 }
const obj2Spread = { c: 3, d: 4 }
const merged = { ...obj1Spread, ...obj2Spread, e: 5 }
console.log("Merged objects:", merged)

// Copying arrays and objects
const originalArray = [1, 2, 3]
const copiedArray = [...originalArray]
copiedArray.push(4)
console.log("Original:", originalArray, "Copied:", copiedArray)

const originalObject = { name: "John", age: 30 }
const copiedObject = { ...originalObject, city: "NYC" }
console.log("Original object:", originalObject)
console.log("Copied object:", copiedObject)

// Rest in functions
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0)
}

console.log("Sum of multiple numbers:", sum(1, 2, 3, 4, 5))

function greetMultiple(greeting, ...names) {
  return `${greeting} ${names.join(", ")}!`
}

console.log(greetMultiple("Hello", "Alice", "Bob", "Charlie"))

// 5. Default Parameters
console.log("\n--- Default Parameters ---")

function createUser(name = "Guest", role = "user", id = Date.now()) {
  return { name, role, id }
}

console.log("Default user:", createUser())
console.log("Partial user:", createUser("Alice"))
console.log("Full user:", createUser("Bob", "admin", 123))

// Default parameters with expressions
function calculatePrice(price, tax = price * 0.1, shipping = 5) {
  return price + tax + shipping
}

console.log("Price calculation:", calculatePrice(100))

// Default parameters with destructuring
function processOptions({ method = "GET", timeout = 5000, retries = 3 } = {}) {
  return { method, timeout, retries }
}

console.log("Default options:", processOptions())
console.log("Custom options:", processOptions({ method: "POST", timeout: 3000 }))

// 6. Enhanced Object Literals
console.log("\n--- Enhanced Object Literals ---")

const propName = "dynamicProperty"
const methodName = "dynamicMethod"

// Property and method shorthand
const calculator = {
  name, // shorthand for name: name
  age, // shorthand for age: age

  // Method shorthand
  add(a, b) {
    return a + b
  },

  subtract(a, b) {
    return a - b
  },

  // Computed property names
  [propName]: "dynamic value",
  [`prefix_${propName}`]: "prefixed value",

  // Computed method names
  [methodName]() {
    return "dynamic method called"
  },
}

console.log("Calculator object:", calculator)
console.log("Dynamic method result:", calculator[methodName]())

// Getters and setters
const userAccount = {
  firstName: "John",
  lastName: "Doe",

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  },

  set fullName(value) {
    ;[this.firstName, this.lastName] = value.split(" ")
  },

  get initials() {
    return `${this.firstName[0]}${this.lastName[0]}`
  },
}

console.log("Full name:", userAccount.fullName)
console.log("Initials:", userAccount.initials)

userAccount.fullName = "Jane Smith"
console.log("After setting full name:", userAccount.firstName, userAccount.lastName)

// 7. Let and Const
console.log("\n--- Let and Const ---")

// Block scope demonstration
function scopeDemo() {
  console.log("Scope demonstration:")

  if (true) {
    var varVariable = "var"
    const letVariable = "let"
    const constVariable = "const"

    console.log("Inside block:", { varVariable, letVariable, constVariable })
  }

  console.log("Outside block - var:", varVariable) // accessible
  // console.log("Outside block - let:", letVariable); // would cause error
  // console.log("Outside block - const:", constVariable); // would cause error
}

scopeDemo()

// Const with objects and arrays
const constObj = { name: "John" }
constObj.name = "Jane" // OK - modifying property
constObj.age = 30 // OK - adding property
console.log("Modified const object:", constObj)

const constArr = [1, 2, 3]
constArr.push(4) // OK - modifying array
constArr[0] = 0 // OK - modifying element
console.log("Modified const array:", constArr)

// Loop differences
console.log("Loop variable behavior:")

// Using let (correct behavior)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log("let loop:", i), 50 + i * 10)
}

// 8. Classes
console.log("\n--- Classes ---")

// Basic class
class Person {
  constructor(name, age) {
    this.name = name
    this._age = age
  }

  // Instance method
  greet() {
    return `Hello, I'm ${this.name}`
  }

  // Getter
  get info() {
    return `${this.name} is ${this._age} years old`
  }

  // Setter with validation
  set age(value) {
    if (value < 0) {
      throw new Error("Age cannot be negative")
    }
    this._age = value
  }

  get age() {
    return this._age
  }

  // Static method
  static species() {
    return "Homo sapiens"
  }
}

// Inheritance
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age) // Call parent constructor
    this.grade = grade
  }

  // Override method
  greet() {
    return `${super.greet()}, I'm a student`
  }

  // New method
  study() {
    return `${this.name} is studying`
  }

  // Getter
  get status() {
    return `Student with grade ${this.grade}`
  }
}

// Usage
const personInstance = new Person("John", 30)
const studentInstance = new Student("Alice", 20, "A")

console.log("Person greeting:", personInstance.greet())
console.log("Person info:", personInstance.info)
console.log("Student greeting:", studentInstance.greet())
console.log("Student studying:", studentInstance.study())
console.log("Student status:", studentInstance.status)
console.log("Species:", Person.species())

// 9. Symbols
console.log("\n--- Symbols ---")

// Creating symbols
const sym1 = Symbol()
const sym2 = Symbol("description")
const sym3 = Symbol("description")

console.log("Symbols are unique:", sym2 === sym3) // false

// Symbol as object property
const symbolObj = {
  [sym1]: "value1",
  [sym2]: "value2",
  regularProp: "regular",
}

console.log("Symbol property:", symbolObj[sym1])
console.log("Object keys (no symbols):", Object.keys(symbolObj))
console.log("Object symbols:", Object.getOwnPropertySymbols(symbolObj))

// Well-known symbols - making object iterable
const iterableObj = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false }
        }
        return { done: true }
      },
    }
  },
}

console.log("Iterating custom object:")
for (const value of iterableObj) {
  console.log("  Value:", value)
}

// Global symbol registry
const globalSym1 = Symbol.for("app.id")
const globalSym2 = Symbol.for("app.id")
console.log("Global symbols are equal:", globalSym1 === globalSym2) // true

// 10. Generators
console.log("\n--- Generators ---")

// Basic generator
function* numberGenerator() {
  console.log("Generator started")
  yield 1
  console.log("After first yield")
  yield 2
  console.log("After second yield")
  yield 3
  console.log("Generator finished")
}

const gen = numberGenerator()
console.log("Generator next calls:")
console.log("1:", gen.next())
console.log("2:", gen.next())
console.log("3:", gen.next())
console.log("4:", gen.next())

// Fibonacci generator
function* fibonacci() {
  let a = 0,
    b = 1
  while (true) {
    yield a
    ;[a, b] = [b, a + b]
  }
}

const fib = fibonacci()
console.log("Fibonacci sequence:")
for (let i = 0; i < 10; i++) {
  console.log(`  F(${i}):`, fib.next().value)
}

// Generator with parameters
function* parameterGenerator() {
  const first = yield "First yield"
  console.log("Received:", first)
  const second = yield "Second yield"
  console.log("Received:", second)
  return "Done"
}

const paramGen = parameterGenerator()
console.log("Parameter generator:")
console.log("1:", paramGen.next())
console.log("2:", paramGen.next("Hello"))
console.log("3:", paramGen.next("World"))

// Generator delegation
function* gen1() {
  yield 1
  yield 2
}

function* gen2() {
  yield 3
  yield 4
}

function* combinedGen() {
  yield* gen1()
  yield* gen2()
  yield 5
}

console.log("Combined generator:", [...combinedGen()])

// 11. Maps and Sets
console.log("\n--- Maps and Sets ---")

// Maps
const map = new Map()
map.set("name", "John")
map.set("age", 30)
map.set(1, "number key")
map.set(true, "boolean key")

console.log("Map operations:")
console.log("  Get name:", map.get("name"))
console.log("  Has age:", map.has("age"))
console.log("  Map size:", map.size)

// Map with object keys
const objKey1 = { id: 1 }
const objKey2 = { id: 2 }
const objectMap = new Map()
objectMap.set(objKey1, "first object")
objectMap.set(objKey2, "second object")

console.log("Object as key:", objectMap.get(objKey1))

// Iterating maps
console.log("Map iteration:")
for (const [key, value] of map) {
  console.log(`  ${key}: ${value}`)
}

// Initialize map from array
const mapFromArray = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
])
console.log("Map from array:", mapFromArray)

// Sets
const set = new Set()
set.add(1)
set.add(2)
set.add(2) // Duplicate, won't be added
set.add("hello")

console.log("Set operations:")
console.log("  Set size:", set.size)
console.log("  Has 1:", set.has(1))
console.log("  Has 3:", set.has(3))

// Remove duplicates from array
const arrayWithDuplicates = [1, 2, 2, 3, 3, 4, 1]
const uniqueArray = [...new Set(arrayWithDuplicates)]
console.log("Remove duplicates:", uniqueArray)

// Set operations
const set1 = new Set([1, 2, 3])
const set2 = new Set([3, 4, 5])

const union = new Set([...set1, ...set2])
const intersection = new Set([...set1].filter((x) => set2.has(x)))
const difference = new Set([...set1].filter((x) => !set2.has(x)))

console.log("Set operations:")
console.log("  Union:", [...union])
console.log("  Intersection:", [...intersection])
console.log("  Difference:", [...difference])

// 12. Proxies
console.log("\n--- Proxies ---")

// Basic proxy
const target = {
  name: "John",
  age: 30,
}

const proxy = new Proxy(target, {
  get(target, property) {
    console.log(`Getting ${property}`)
    return target[property]
  },

  set(target, property, value) {
    console.log(`Setting ${property} to ${value}`)
    target[property] = value
    return true
  },
})

console.log("Proxy operations:")
console.log("  Name:", proxy.name)
proxy.age = 31

// Validation proxy
function createValidatedUser(userData) {
  return new Proxy(userData, {
    set(target, property, value) {
      if (property === "age" && (typeof value !== "number" || value < 0)) {
        throw new Error("Age must be a positive number")
      }

      if (property === "email" && !value.includes("@")) {
        throw new Error("Invalid email format")
      }

      target[property] = value
      return true
    },
  })
}

const validatedUser = createValidatedUser({})
validatedUser.name = "John" // OK
validatedUser.age = 30 // OK
validatedUser.email = "john@example.com" // OK

console.log("Validated user:", validatedUser)

try {
  validatedUser.age = -5 // This will throw an error
} catch (error) {
  console.log("Validation error:", error.message)
}

// Array proxy with negative indexing
function createArray(arr) {
  return new Proxy(arr, {
    get(target, property) {
      if (typeof property === "string" && /^-\d+$/.test(property)) {
        const index = target.length + Number.parseInt(property)
        return target[index]
      }
      return target[property]
    },
  })
}

const proxyArray = createArray([1, 2, 3, 4, 5])
console.log("Negative indexing:")
console.log("  Last element ([-1]):", proxyArray[-1])
console.log("  Second to last ([-2]):", proxyArray[-2])

// 13. Practical Examples
console.log("\n--- Practical Examples ---")

// Modern class with all ES6+ features
class ModernUser {
  static #userCount = 0
  #privateData = new Map()

  constructor({ name, email, age = 18 } = {}) {
    this.name = name
    this.email = email
    this.age = age
    this.#privateData.set("id", ++ModernUser.#userCount)
    this.#privateData.set("created", new Date())
  }

  get id() {
    return this.#privateData.get("id")
  }

  get created() {
    return this.#privateData.get("created")
  }

  get profile() {
    return `${this.name} (${this.email})`
  }

  // Generator method
  *getInfo() {
    yield `Name: ${this.name}`
    yield `Email: ${this.email}`
    yield `Age: ${this.age}`
    yield `ID: ${this.id}`
    yield `Created: ${this.created.toLocaleDateString()}`
  }

  // Async method
  async fetchAdditionalData() {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 100))
    return { preferences: ["coding", "reading"], status: "active" }
  }

  static getUserCount() {
    return ModernUser.#userCount
  }
}

// Usage
const modernUser = new ModernUser({
  name: "Alice Johnson",
  email: "alice@example.com",
  age: 28,
})

console.log("Modern user profile:", modernUser.profile)
console.log("User info:")
for (const info of modernUser.getInfo()) {
  console.log("  " + info)
}

// Async usage
modernUser.fetchAdditionalData().then((data) => {
  console.log("Additional data:", data)
})

console.log("Total users created:", ModernUser.getUserCount())

// Advanced destructuring and spreading example
const apiResponse = {
  data: {
    users: [
      { id: 1, name: "John", role: "admin", active: true },
      { id: 2, name: "Jane", role: "user", active: false },
      { id: 3, name: "Bob", role: "user", active: true },
    ],
    meta: {
      total: 3,
      page: 1,
      limit: 10,
    },
  },
  status: "success",
}

// Extract and transform data
const {
  data: { users, meta },
  status,
} = apiResponse

const activeUsers = users
  .filter(({ active }) => active)
  .map(({ id, name, role }) => ({ id, name, role, status: "online" }))

console.log("API processing:")
console.log("  Status:", status)
console.log("  Meta:", meta)
console.log("  Active users:", activeUsers)

// Template literal with complex logic
const createEmailTemplate = (user, { subject, urgent = false } = {}) => `
<!DOCTYPE html>
<html>
<head>
    <title>${subject || "Default Subject"}</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; ${urgent ? "border: 2px solid red;" : ""}">
        <h1 ${urgent ? 'style="color: red;"' : ""}>
            ${urgent ? "URGENT: " : ""}${subject}
        </h1>
        <p>Dear ${user.name},</p>
        <p>This email was generated at ${new Date().toLocaleString()}</p>
        <p>Your account status: ${user.active ? "Active" : "Inactive"}</p>
    </div>
</body>
</html>
`

const emailHtml = createEmailTemplate(
  { name: "John Doe", active: true },
  { subject: "Welcome to our platform", urgent: false },
)

console.log("Generated email template length:", emailHtml.length)

console.log("\n=== End of ES6+ Features Demo ===")
