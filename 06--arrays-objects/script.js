// Arrays & Objects - Practical Examples

console.log("=== Arrays & Objects Demo ===")

// 1. Creating and Basic Array Operations
console.log("\n--- Creating Arrays ---")

// Different ways to create arrays
const fruits = ["apple", "banana", "orange"]
const numbers = [1, 2, 3, 4, 5]
const mixed = [1, "hello", true, null, { name: "John" }]
const emptyArray = []

console.log("Fruits:", fruits)
console.log("Numbers:", numbers)
console.log("Mixed array:", mixed)
console.log("Empty array:", emptyArray)

// Array constructor
const arrayFromConstructor = new Array(3) // Creates array with 3 empty slots
const arrayWithValues = new Array(1, 2, 3)
console.log("Array from constructor (3 slots):", arrayFromConstructor)
console.log("Array with values:", arrayWithValues)

// Array.of() and Array.from()
const arrayOf = Array.of(1, 2, 3)
const arrayFrom = Array.from("hello")
const arrayFromRange = Array.from({ length: 5 }, (_, i) => i + 1)

console.log("Array.of(1,2,3):", arrayOf)
console.log("Array.from('hello'):", arrayFrom)
console.log("Array from range:", arrayFromRange)

// 2. Accessing and Modifying Arrays
console.log("\n--- Accessing and Modifying Arrays ---")

const colors = ["red", "green", "blue"]
console.log("Original colors:", colors)
console.log("First color:", colors[0])
console.log("Last color:", colors[colors.length - 1])
console.log("Array length:", colors.length)

// Adding elements
colors.push("yellow") // Add to end
colors.unshift("purple") // Add to beginning
console.log("After adding:", colors)

// Removing elements
const lastColor = colors.pop() // Remove from end
const firstColor = colors.shift() // Remove from beginning
console.log("Removed last:", lastColor)
console.log("Removed first:", firstColor)
console.log("After removing:", colors)

// Modifying elements
colors[1] = "orange"
console.log("After modifying index 1:", colors)

// Splice method - add/remove at specific position
const vegetables = ["carrot", "broccoli", "spinach"]
console.log("Original vegetables:", vegetables)

vegetables.splice(1, 0, "tomato") // Insert at index 1
console.log("After inserting tomato:", vegetables)

vegetables.splice(2, 1, "lettuce") // Replace 1 element at index 2
console.log("After replacing:", vegetables)

vegetables.splice(1, 2) // Remove 2 elements starting at index 1
console.log("After removing 2 elements:", vegetables)

// 3. Array Search Methods
console.log("\n--- Array Search Methods ---")

const nums = [1, 2, 3, 4, 5, 3, 6]
console.log("Numbers array:", nums)

console.log("indexOf(3):", nums.indexOf(3)) // First occurrence
console.log("lastIndexOf(3):", nums.lastIndexOf(3)) // Last occurrence
console.log("includes(4):", nums.includes(4)) // Check existence
console.log("includes(10):", nums.includes(10))

// find() and findIndex()
const found = nums.find((num) => num > 4)
const foundIndex = nums.findIndex((num) => num > 4)
console.log("First number > 4:", found)
console.log("Index of first number > 4:", foundIndex)

// 4. Array Iteration Methods
console.log("\n--- Array Iteration Methods ---")

const scores = [85, 92, 78, 96, 88]
console.log("Scores:", scores)

// forEach - execute function for each element
console.log("Scores with grades:")
scores.forEach((score, index) => {
  const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F"
  console.log(`  Score ${index + 1}: ${score} (Grade: ${grade})`)
})

// map - transform each element
const doubled = scores.map((score) => score * 2)
const grades = scores.map((score) => (score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F"))
console.log("Doubled scores:", doubled)
console.log("Letter grades:", grades)

// filter - select elements that pass test
const highScores = scores.filter((score) => score >= 90)
const passingScores = scores.filter((score) => score >= 70)
console.log("High scores (>=90):", highScores)
console.log("Passing scores (>=70):", passingScores)

// reduce - reduce to single value
const totalScore = scores.reduce((sum, score) => sum + score, 0)
const averageScore = totalScore / scores.length
const maxScore = scores.reduce((max, score) => (score > max ? score : max), 0)

console.log("Total score:", totalScore)
console.log("Average score:", averageScore.toFixed(1))
console.log("Max score:", maxScore)

// some and every
const hasHighScore = scores.some((score) => score >= 95)
const allPassing = scores.every((score) => score >= 70)
console.log("Has score >= 95:", hasHighScore)
console.log("All scores >= 70:", allPassing)

// 5. Array Sorting and Other Methods
console.log("\n--- Array Sorting and Other Methods ---")

const animals = ["elephant", "ant", "zebra", "bear"]
console.log("Original animals:", animals)

// Sort alphabetically
const sortedAnimals = [...animals].sort() // Create copy before sorting
console.log("Sorted animals:", sortedAnimals)

// Sort numbers properly
const randomNumbers = [10, 5, 40, 25, 1000, 1]
const sortedNumbers = [...randomNumbers].sort((a, b) => a - b)
console.log("Random numbers:", randomNumbers)
console.log("Sorted numbers:", sortedNumbers)

// Reverse
const reversedAnimals = [...animals].reverse()
console.log("Reversed animals:", reversedAnimals)

// Slice - extract portion
const someAnimals = animals.slice(1, 3)
console.log("Animals slice(1,3):", someAnimals)

// Concat - join arrays
const moreAnimals = animals.concat(["lion", "tiger"])
console.log("Concatenated animals:", moreAnimals)

// Join - convert to string
const animalString = animals.join(", ")
console.log("Animals as string:", animalString)

// 6. Creating and Accessing Objects
console.log("\n--- Creating and Accessing Objects ---")

// Object literal
const person = {
  name: "John Doe",
  age: 30,
  city: "New York",
  isEmployed: true,
  "favorite-color": "blue", // Property with hyphen
}

console.log("Person object:", person)

// Accessing properties
console.log("Name (dot notation):", person.name)
console.log("Age (bracket notation):", person["age"])
console.log("Favorite color:", person["favorite-color"])

// Dynamic property access
const property = "city"
console.log("Dynamic access:", person[property])

// 7. Modifying Objects
console.log("\n--- Modifying Objects ---")

const user = {
  username: "johndoe",
  email: "john@example.com",
}

console.log("Original user:", user)

// Add properties
user.firstName = "John"
user["lastName"] = "Doe"
user.isActive = true

console.log("After adding properties:", user)

// Modify properties
user.email = "john.doe@example.com"
user["username"] = "john_doe"

console.log("After modifying:", user)

// Delete properties
delete user.isActive
console.log("After deleting isActive:", user)

// 8. Object Methods
console.log("\n--- Object Methods ---")

const calculator = {
  result: 0,

  add: function (num) {
    this.result += num
    return this // Enable method chaining
  },

  subtract: function (num) {
    this.result -= num
    return this
  },

  multiply: function (num) {
    this.result *= num
    return this
  },

  divide: function (num) {
    if (num !== 0) {
      this.result /= num
    } else {
      console.log("Cannot divide by zero")
    }
    return this
  },

  getValue: function () {
    return this.result
  },

  reset: function () {
    this.result = 0
    return this
  },
}

// Method chaining
const result = calculator.add(10).multiply(2).subtract(5).getValue()
console.log("Calculator result:", result)

calculator.reset().add(100).divide(4).multiply(3)
console.log("New calculation:", calculator.getValue())

// 9. Object Destructuring
console.log("\n--- Object Destructuring ---")

const employee = {
  id: 1,
  name: "Alice Johnson",
  position: "Developer",
  salary: 75000,
  department: "Engineering",
  contact: {
    email: "alice@company.com",
    phone: "555-1234",
  },
}

// Basic destructuring
const { name, position, salary } = employee
console.log(`${name} is a ${position} earning $${salary}`)

// Rename variables
const { name: fullName, position: jobTitle } = employee
console.log(`Employee: ${fullName}, Job: ${jobTitle}`)

// Default values
const { name: empName, bonus = 0 } = employee
console.log(`${empName} has a bonus of $${bonus}`)

// Nested destructuring
const {
  contact: { email, phone },
} = employee
console.log(`Contact: ${email}, ${phone}`)

// 10. Object Methods and Properties
console.log("\n--- Object Methods and Properties ---")

const product = {
  id: 101,
  name: "Laptop",
  price: 999,
  category: "Electronics",
}

// Object.keys() - get property names
console.log("Object keys:", Object.keys(product))

// Object.values() - get property values
console.log("Object values:", Object.values(product))

// Object.entries() - get key-value pairs
console.log("Object entries:", Object.entries(product))

// hasOwnProperty() - check if property exists
console.log("Has 'name' property:", product.hasOwnProperty("name"))
console.log("Has 'description' property:", product.hasOwnProperty("description"))

// in operator
console.log("'price' in product:", "price" in product)
console.log("'toString' in product:", "toString" in product) // Inherited

// Object.assign() - copy/merge objects
const productCopy = Object.assign({}, product)
const extendedProduct = Object.assign({}, product, {
  description: "High-performance laptop",
  inStock: true,
})

console.log("Product copy:", productCopy)
console.log("Extended product:", extendedProduct)

// 11. Arrays of Objects
console.log("\n--- Arrays of Objects ---")

const students = [
  { id: 1, name: "Alice", grade: 85, subject: "Math" },
  { id: 2, name: "Bob", grade: 92, subject: "Science" },
  { id: 3, name: "Charlie", grade: 78, subject: "Math" },
  { id: 4, name: "Diana", grade: 96, subject: "Science" },
  { id: 5, name: "Eve", grade: 88, subject: "English" },
]

console.log("All students:", students)

// Find student by name
const alice = students.find((student) => student.name === "Alice")
console.log("Found Alice:", alice)

// Filter students by subject
const mathStudents = students.filter((student) => student.subject === "Math")
console.log("Math students:", mathStudents)

// Get all grades
const allGrades = students.map((student) => student.grade)
console.log("All grades:", allGrades)

// Calculate average grade
const averageGrade = allGrades.reduce((sum, grade) => sum + grade, 0) / allGrades.length
console.log("Average grade:", averageGrade.toFixed(1))

// Sort by grade (descending)
const sortedByGrade = [...students].sort((a, b) => b.grade - a.grade)
console.log("Students sorted by grade:")
sortedByGrade.forEach((student) => {
  console.log(`  ${student.name}: ${student.grade}`)
})

// Group by subject
const groupedBySubject = students.reduce((groups, student) => {
  const subject = student.subject
  if (!groups[subject]) {
    groups[subject] = []
  }
  groups[subject].push(student)
  return groups
}, {})

console.log("Students grouped by subject:", groupedBySubject)

// 12. Nested Data Structures
console.log("\n--- Nested Data Structures ---")

const company = {
  name: "TechCorp",
  founded: 2010,
  headquarters: "San Francisco",
  departments: [
    {
      name: "Engineering",
      budget: 2000000,
      employees: [
        { name: "John", role: "Senior Developer", salary: 90000, skills: ["JavaScript", "Python", "React"] },
        { name: "Jane", role: "Junior Developer", salary: 60000, skills: ["HTML", "CSS", "JavaScript"] },
        { name: "Mike", role: "DevOps Engineer", salary: 85000, skills: ["AWS", "Docker", "Kubernetes"] },
      ],
    },
    {
      name: "Marketing",
      budget: 500000,
      employees: [
        { name: "Sarah", role: "Marketing Manager", salary: 75000, skills: ["SEO", "Content Marketing", "Analytics"] },
        {
          name: "Tom",
          role: "Social Media Specialist",
          salary: 45000,
          skills: ["Social Media", "Content Creation", "Photography"],
        },
      ],
    },
    {
      name: "Sales",
      budget: 800000,
      employees: [
        { name: "Lisa", role: "Sales Director", salary: 95000, skills: ["B2B Sales", "Negotiation", "CRM"] },
        {
          name: "David",
          role: "Account Executive",
          salary: 65000,
          skills: ["Client Relations", "Presentations", "Salesforce"],
        },
      ],
    },
  ],
}

console.log("Company structure:", company)

// Access nested data
console.log("First department:", company.departments[0].name)
console.log("First employee in Engineering:", company.departments[0].employees[0].name)

// Get all employees across departments
const allEmployees = company.departments.flatMap((dept) => dept.employees)
console.log("Total employees:", allEmployees.length)

// Calculate total salary expense
const totalSalary = allEmployees.reduce((total, emp) => total + emp.salary, 0)
console.log("Total salary expense:", totalSalary.toLocaleString())

// Find employees by skill
const javascriptDevelopers = allEmployees.filter((emp) => emp.skills.includes("JavaScript"))
console.log("JavaScript developers:")
javascriptDevelopers.forEach((dev) => {
  console.log(`  ${dev.name} - ${dev.role}`)
})

// Department statistics
console.log("Department statistics:")
company.departments.forEach((dept) => {
  const avgSalary = dept.employees.reduce((sum, emp) => sum + emp.salary, 0) / dept.employees.length
  console.log(`  ${dept.name}: ${dept.employees.length} employees, avg salary: $${avgSalary.toLocaleString()}`)
})

// 13. Practical Examples
console.log("\n--- Practical Examples ---")

// Shopping cart implementation
function createShoppingCart() {
  let items = []

  return {
    addItem: (product, quantity = 1) => {
      const existingItem = items.find((item) => item.product.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        items.push({ product, quantity })
      }

      console.log(`Added ${quantity}x ${product.name} to cart`)
    },

    removeItem: (productId) => {
      const index = items.findIndex((item) => item.product.id === productId)
      if (index !== -1) {
        const removed = items.splice(index, 1)[0]
        console.log(`Removed ${removed.product.name} from cart`)
      }
    },

    updateQuantity: (productId, newQuantity) => {
      const item = items.find((item) => item.product.id === productId)
      if (item) {
        item.quantity = newQuantity
        console.log(`Updated ${item.product.name} quantity to ${newQuantity}`)
      }
    },

    getItems: () => {
      return [...items] // Return copy
    },

    getTotal: () =>
      items.reduce((total, item) => {
        return total + item.product.price * item.quantity
      }, 0),

    getItemCount: () => items.reduce((count, item) => count + item.quantity, 0),

    clear: () => {
      items = []
      console.log("Cart cleared")
    },
  }
}

// Test shopping cart
const cart = createShoppingCart()

const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Keyboard", price: 75 },
]

cart.addItem(products[0], 1)
cart.addItem(products[1], 2)
cart.addItem(products[2], 1)

console.log("Cart items:", cart.getItems())
console.log("Cart total: $" + cart.getTotal())
console.log("Item count:", cart.getItemCount())

cart.updateQuantity(2, 1)
console.log("Updated cart total: $" + cart.getTotal())

// Library management system
const library = {
  books: [
    { id: 1, title: "JavaScript: The Good Parts", author: "Douglas Crockford", year: 2008, available: true },
    { id: 2, title: "Clean Code", author: "Robert Martin", year: 2008, available: true },
    { id: 3, title: "The Pragmatic Programmer", author: "Andy Hunt", year: 1999, available: false },
    { id: 4, title: "You Don't Know JS", author: "Kyle Simpson", year: 2014, available: true },
  ],

  members: [
    { id: 1, name: "Alice Johnson", borrowedBooks: [] },
    { id: 2, name: "Bob Smith", borrowedBooks: [3] },
    { id: 3, name: "Charlie Brown", borrowedBooks: [] },
  ],

  findBookById: function (id) {
    return this.books.find((book) => book.id === id)
  },

  findMemberById: function (id) {
    return this.members.find((member) => member.id === id)
  },

  borrowBook: function (memberId, bookId) {
    const member = this.findMemberById(memberId)
    const book = this.findBookById(bookId)

    if (!member) {
      console.log("Member not found")
      return false
    }

    if (!book) {
      console.log("Book not found")
      return false
    }

    if (!book.available) {
      console.log("Book is not available")
      return false
    }

    book.available = false
    member.borrowedBooks.push(bookId)
    console.log(`${member.name} borrowed "${book.title}"`)
    return true
  },

  returnBook: function (memberId, bookId) {
    const member = this.findMemberById(memberId)
    const book = this.findBookById(bookId)

    if (!member || !book) {
      console.log("Member or book not found")
      return false
    }

    const bookIndex = member.borrowedBooks.indexOf(bookId)
    if (bookIndex === -1) {
      console.log("Member hasn't borrowed this book")
      return false
    }

    book.available = true
    member.borrowedBooks.splice(bookIndex, 1)
    console.log(`${member.name} returned "${book.title}"`)
    return true
  },

  getAvailableBooks: function () {
    return this.books.filter((book) => book.available)
  },

  getMemberBorrowedBooks: function (memberId) {
    const member = this.findMemberById(memberId)
    if (!member) return []

    return member.borrowedBooks.map((bookId) => this.findBookById(bookId))
  },
}

console.log("Library system demo:")
console.log(
  "Available books:",
  library.getAvailableBooks().map((book) => book.title),
)

library.borrowBook(1, 1) // Alice borrows JavaScript book
library.borrowBook(1, 2) // Alice borrows Clean Code
library.borrowBook(2, 1) // Bob tries to borrow already borrowed book

console.log(
  "Alice's borrowed books:",
  library.getMemberBorrowedBooks(1).map((book) => book.title),
)
console.log(
  "Available books after borrowing:",
  library.getAvailableBooks().map((book) => book.title),
)

library.returnBook(1, 1) // Alice returns JavaScript book
console.log(
  "Available books after return:",
  library.getAvailableBooks().map((book) => book.title),
)
