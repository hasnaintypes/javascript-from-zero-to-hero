// Control Flow - Practical Examples

console.log("=== Control Flow Demo ===")

// 1. Basic if Statements
console.log("\n--- Basic if Statements ---")

const age = 25
const hasLicense = true

if (age >= 18) {
  console.log("You are an adult")
}

if (age >= 18 && hasLicense) {
  console.log("You can drive")
}

// 2. if...else Statements
console.log("\n--- if...else Statements ---")

const temperature = 22

if (temperature > 25) {
  console.log("It's warm outside")
} else {
  console.log("It's cool outside")
}

const isWeekend = false
if (isWeekend) {
  console.log("Time to relax!")
} else {
  console.log("Time to work!")
}

// 3. if...else if...else Chain
console.log("\n--- if...else if...else Chain ---")

const score = 87
let grade

if (score >= 90) {
  grade = "A"
} else if (score >= 80) {
  grade = "B"
} else if (score >= 70) {
  grade = "C"
} else if (score >= 60) {
  grade = "D"
} else {
  grade = "F"
}

console.log(`Score: ${score}, Grade: ${grade}`)

// Weather decision making
const weather = "rainy"
let activity

if (weather === "sunny") {
  activity = "Go to the beach"
} else if (weather === "rainy") {
  activity = "Stay inside and read"
} else if (weather === "snowy") {
  activity = "Build a snowman"
} else if (weather === "cloudy") {
  activity = "Go for a walk"
} else {
  activity = "Check the weather forecast"
}

console.log(`Weather: ${weather}, Activity: ${activity}`)

// 4. Nested if Statements
console.log("\n--- Nested if Statements ---")

const userAge = 20
const hasAccount = true
const isVerified = true

if (userAge >= 18) {
  console.log("User is an adult")

  if (hasAccount) {
    console.log("User has an account")

    if (isVerified) {
      console.log("User can access premium features")
    } else {
      console.log("User needs to verify their account")
    }
  } else {
    console.log("User needs to create an account")
  }
} else {
  console.log("User is a minor - limited access")
}

// 5. Switch Statements
console.log("\n--- Switch Statements ---")

const dayOfWeek = "Wednesday"

switch (dayOfWeek) {
  case "Monday":
    console.log("Start of the work week - let's go!")
    break
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
    console.log("Midweek - keep pushing!")
    break
  case "Friday":
    console.log("TGIF - almost weekend!")
    break
  case "Saturday":
  case "Sunday":
    console.log("Weekend - time to relax!")
    break
  default:
    console.log("Invalid day of the week")
}

// Switch with numbers
const month = 3
let monthName

switch (month) {
  case 1:
    monthName = "January"
    break
  case 2:
    monthName = "February"
    break
  case 3:
    monthName = "March"
    break
  case 4:
    monthName = "April"
    break
  case 5:
    monthName = "May"
    break
  case 6:
    monthName = "June"
    break
  default:
    monthName = "Other month"
}

console.log(`Month ${month} is ${monthName}`)

// Switch without break (fall-through)
const userRole = "admin"

switch (userRole) {
  case "admin":
    console.log("Can delete users")
  // falls through
  case "moderator":
    console.log("Can edit posts")
  // falls through
  case "user":
    console.log("Can view content")
    break
  default:
    console.log("No permissions")
}

// 6. Ternary Operator
console.log("\n--- Ternary Operator ---")

const studentAge = 16
const canVote = studentAge >= 18 ? "Yes" : "No"
console.log(`Age: ${studentAge}, Can vote: ${canVote}`)

// Multiple ternary operators
const testScore = 75
const letterGrade = testScore >= 90 ? "A" : testScore >= 80 ? "B" : testScore >= 70 ? "C" : testScore >= 60 ? "D" : "F"
console.log(`Score: ${testScore}, Grade: ${letterGrade}`)

// Ternary for assignment
const timeOfDay = 14 // 24-hour format
const greeting = timeOfDay < 12 ? "Good morning" : timeOfDay < 18 ? "Good afternoon" : "Good evening"
console.log(greeting)

// 7. Logical Operators in Control Flow
console.log("\n--- Logical Operators ---")

// Short-circuit evaluation with AND
const user = { name: "John", email: "john@example.com" }
user && console.log("User exists:", user.name)

const emptyUser = null
emptyUser && console.log("This won't run")

// Short-circuit evaluation with OR
const username = user.name || "Guest"
console.log("Username:", username)

const emptyName = ""
const displayName = emptyName || "Anonymous"
console.log("Display name:", displayName)

// Nullish coalescing operator (??)
const config = { timeout: null }
const timeoutValue = config.timeout ?? 5000
console.log("Timeout:", timeoutValue)

// 8. Truthy and Falsy Values
console.log("\n--- Truthy and Falsy Values ---")

// Testing falsy values
const falsyValues = [false, 0, -0, 0n, "", null, undefined, Number.NaN]

falsyValues.forEach((value, index) => {
  if (value) {
    console.log(`Value ${index} (${value}) is truthy`)
  } else {
    console.log(`Value ${index} (${value}) is falsy`)
  }
})

// Testing truthy values
const truthyValues = [true, 1, -1, "hello", [], {}, () => {}]

truthyValues.forEach((value, index) => {
  if (value) {
    console.log(`Value ${index} is truthy`)
  } else {
    console.log(`Value ${index} is falsy`)
  }
})

// 9. Guard Clauses
console.log("\n--- Guard Clauses ---")

function processOrder(order) {
  // Guard clauses - early returns
  if (!order) {
    console.log("No order provided")
    return
  }

  if (!order.items || order.items.length === 0) {
    console.log("Order has no items")
    return
  }

  if (order.total <= 0) {
    console.log("Invalid order total")
    return
  }

  // Main processing logic
  console.log(`Processing order for $${order.total} with ${order.items.length} items`)
}

// Test guard clauses
processOrder(null)
processOrder({ items: [] })
processOrder({ items: ["item1"], total: 0 })
processOrder({ items: ["item1", "item2"], total: 50 })

// 10. Practical Examples
console.log("\n--- Practical Examples ---")

// User authentication system
function checkUserAccess(user) {
  if (!user) {
    return "Please log in"
  }

  if (!user.isActive) {
    return "Account is deactivated"
  }

  if (user.role === "admin") {
    return "Full access granted"
  } else if (user.role === "moderator") {
    return "Moderator access granted"
  } else if (user.role === "user") {
    return "User access granted"
  } else {
    return "Unknown role"
  }
}

// Test user access
const admin = { isActive: true, role: "admin" }
const regularUser = { isActive: true, role: "user" }
const inactiveUser = { isActive: false, role: "user" }

console.log("Admin access:", checkUserAccess(admin))
console.log("Regular user access:", checkUserAccess(regularUser))
console.log("Inactive user access:", checkUserAccess(inactiveUser))
console.log("No user access:", checkUserAccess(null))

// Shopping cart discount system
function calculateDiscount(cartTotal, customerType, isFirstOrder) {
  let discount = 0

  if (customerType === "premium") {
    discount = 0.15 // 15% discount
  } else if (customerType === "regular") {
    discount = 0.1 // 10% discount
  } else {
    discount = 0.05 // 5% discount for new customers
  }

  // Additional discount for first order
  if (isFirstOrder) {
    discount += 0.05 // Extra 5% for first order
  }

  // Maximum discount cap
  if (discount > 0.25) {
    discount = 0.25 // Max 25% discount
  }

  const discountAmount = cartTotal * discount
  const finalTotal = cartTotal - discountAmount

  return {
    originalTotal: cartTotal,
    discountPercent: (discount * 100).toFixed(0) + "%",
    discountAmount: discountAmount.toFixed(2),
    finalTotal: finalTotal.toFixed(2),
  }
}

// Test discount calculation
const cart1 = calculateDiscount(100, "premium", true)
const cart2 = calculateDiscount(200, "regular", false)
const cart3 = calculateDiscount(50, "new", true)

console.log("Premium customer, first order:", cart1)
console.log("Regular customer, repeat order:", cart2)
console.log("New customer, first order:", cart3)

// Grade calculator with multiple criteria
function calculateFinalGrade(homework, midterm, final, participation) {
  // Weighted average: homework 20%, midterm 30%, final 40%, participation 10%
  const weightedScore = homework * 0.2 + midterm * 0.3 + final * 0.4 + participation * 0.1

  let letterGrade
  let status

  if (weightedScore >= 90) {
    letterGrade = "A"
    status = "Excellent"
  } else if (weightedScore >= 80) {
    letterGrade = "B"
    status = "Good"
  } else if (weightedScore >= 70) {
    letterGrade = "C"
    status = "Satisfactory"
  } else if (weightedScore >= 60) {
    letterGrade = "D"
    status = "Needs Improvement"
  } else {
    letterGrade = "F"
    status = "Failing"
  }

  return {
    numericGrade: weightedScore.toFixed(1),
    letterGrade: letterGrade,
    status: status,
    passed: weightedScore >= 60,
  }
}

// Test grade calculation
const student1 = calculateFinalGrade(85, 78, 92, 95)
const student2 = calculateFinalGrade(70, 65, 58, 80)

console.log("Student 1 grade:", student1)
console.log("Student 2 grade:", student2)
