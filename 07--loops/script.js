// Loops - Practical Examples

console.log("=== Loops Demo ===")

// 1. Basic for Loop
console.log("\n--- Basic for Loop ---")

// Simple counting
console.log("Counting from 0 to 4:")
for (let i = 0; i < 5; i++) {
  console.log("Iteration:", i)
}

// Counting backwards
console.log("\nCountdown from 10:")
for (let i = 10; i >= 1; i--) {
  console.log("Countdown:", i)
}
console.log("Blast off! 🚀")

// Different increments
console.log("\nSkip counting by 3:")
for (let i = 0; i <= 15; i += 3) {
  console.log("Number:", i)
}

// 2. Looping Through Arrays
console.log("\n--- Looping Through Arrays ---")

const fruits = ["apple", "banana", "orange", "grape", "kiwi"]
console.log("Fruits array:", fruits)

// Traditional for loop with index
console.log("\nUsing traditional for loop:")
for (let i = 0; i < fruits.length; i++) {
  console.log(`Index ${i}: ${fruits[i]}`)
}

// Reverse iteration
console.log("\nReverse iteration:")
for (let i = fruits.length - 1; i >= 0; i--) {
  console.log(`Reverse ${i}: ${fruits[i]}`)
}

// Processing every other element
console.log("\nEvery other fruit:")
for (let i = 0; i < fruits.length; i += 2) {
  console.log(`Every other: ${fruits[i]}`)
}

// 3. while Loop
console.log("\n--- while Loop ---")

// Basic while loop
let count = 0
console.log("While loop counting:")
while (count < 5) {
  console.log("Count:", count)
  count++
}

// Finding first even number
const numbers = [1, 3, 7, 8, 9, 12, 15]
let index = 0
console.log("\nFinding first even number in:", numbers)
while (index < numbers.length) {
  if (numbers[index] % 2 === 0) {
    console.log(`First even number: ${numbers[index]} at index ${index}`)
    break
  }
  index++
}

// Doubling until threshold
let value = 1
console.log("\nDoubling until > 100:")
while (value <= 100) {
  console.log("Value:", value)
  value *= 2
}

// 4. do...while Loop
console.log("\n--- do...while Loop ---")

// Basic do...while
let num = 0
console.log("do...while loop:")
do {
  console.log("Number:", num)
  num++
} while (num < 3)

// Menu simulation
let choice = 0
let menuCount = 0
console.log("\nMenu simulation:")
do {
  console.log("=== MENU ===")
  console.log("1. View Profile")
  console.log("2. Settings")
  console.log("3. Exit")

  // Simulate user choices
  choice = menuCount === 0 ? 1 : menuCount === 1 ? 2 : 3
  console.log(`User chose: ${choice}`)

  switch (choice) {
    case 1:
      console.log("Viewing profile...")
      break
    case 2:
      console.log("Opening settings...")
      break
    case 3:
      console.log("Goodbye!")
      break
  }
  menuCount++
} while (choice !== 3 && menuCount < 3) // Safety limit

// 5. for...in Loop (Objects)
console.log("\n--- for...in Loop ---")

const person = {
  name: "John Doe",
  age: 30,
  city: "New York",
  profession: "Developer",
}

console.log("Person object:", person)
console.log("\nLooping through object properties:")
for (const key in person) {
  console.log(`${key}: ${person[key]}`)
}

// for...in with arrays (not recommended)
const colors = ["red", "green", "blue"]
console.log("\nfor...in with array (not recommended):")
for (const index in colors) {
  console.log(`Index ${index}: ${colors[index]}`)
}

// 6. for...of Loop (Iterables)
console.log("\n--- for...of Loop ---")

const animals = ["cat", "dog", "bird", "fish"]
console.log("Animals array:", animals)

// Basic for...of
console.log("\nUsing for...of:")
for (const animal of animals) {
  console.log("Animal:", animal)
}

// for...of with strings
const word = "JavaScript"
console.log(`\nLooping through "${word}":`)
for (const char of word) {
  console.log("Character:", char)
}

// for...of with entries() for index
console.log("\nfor...of with entries() for index:")
for (const [index, animal] of animals.entries()) {
  console.log(`${index}: ${animal}`)
}

// 7. Loop Control Statements
console.log("\n--- Loop Control Statements ---")

// break statement
console.log("Using break - find first number > 15:")
const testNumbers = [5, 8, 12, 18, 3, 25, 7]
for (const num of testNumbers) {
  if (num > 15) {
    console.log(`Found first number > 15: ${num}`)
    break
  }
  console.log(`Checking: ${num}`)
}

// continue statement
console.log("\nUsing continue - skip even numbers:")
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue // Skip even numbers
  }
  console.log("Odd number:", i)
}

// continue with arrays
console.log("\nSkipping empty strings:")
const words = ["hello", "", "world", "", "javascript", ""]
for (const word of words) {
  if (word === "") {
    continue
  }
  console.log("Word:", word)
}

// 8. Nested Loops
console.log("\n--- Nested Loops ---")

// Multiplication table
console.log("5x5 Multiplication table:")
for (let i = 1; i <= 5; i++) {
  let row = ""
  for (let j = 1; j <= 5; j++) {
    row += (i * j).toString().padStart(4, " ")
  }
  console.log(row)
}

// 2D array processing
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

console.log("\nProcessing 2D array:")
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    console.log(`matrix[${i}][${j}] = ${matrix[i][j]}`)
  }
}

// Pattern printing
console.log("\nStar pattern:")
for (let i = 1; i <= 5; i++) {
  let stars = ""
  for (let j = 1; j <= i; j++) {
    stars += "* "
  }
  console.log(stars)
}

// 9. Common Loop Patterns
console.log("\n--- Common Loop Patterns ---")

// Accumulator pattern - sum
const scores = [85, 92, 78, 96, 88]
let sum = 0
console.log("Scores:", scores)
for (const score of scores) {
  sum += score
}
console.log("Total score:", sum)
console.log("Average score:", (sum / scores.length).toFixed(1))

// Accumulator pattern - product
const factors = [2, 3, 4]
let product = 1
for (const factor of factors) {
  product *= factor
}
console.log(`Product of ${factors.join(" × ")} = ${product}`)

// String concatenation
const nameList = ["Alice", "Bob", "Charlie", "Diana"]
let sentence = ""
for (const name of nameList) {
  sentence += name + " "
}
console.log("Names:", sentence.trim())

// 10. Search Patterns
console.log("\n--- Search Patterns ---")

// Linear search
function findElement(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i
    }
  }
  return -1
}

const searchArray = [10, 25, 30, 45, 60]
console.log("Search array:", searchArray)
console.log("Index of 30:", findElement(searchArray, 30))
console.log("Index of 99:", findElement(searchArray, 99))

// Find maximum
function findMax(arr) {
  if (arr.length === 0) return undefined

  let max = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i]
    }
  }
  return max
}

const randomNums = [23, 45, 12, 67, 34, 89, 15]
console.log("Random numbers:", randomNums)
console.log("Maximum:", findMax(randomNums))

// Find all matches
function findAllMatches(arr, condition) {
  const matches = []
  for (let i = 0; i < arr.length; i++) {
    if (condition(arr[i])) {
      matches.push({ value: arr[i], index: i })
    }
  }
  return matches
}

const testScores = [85, 92, 78, 96, 88, 94, 76]
const highScores = findAllMatches(testScores, (score) => score >= 90)
console.log("Test scores:", testScores)
console.log("High scores (>=90):", highScores)

// 11. Transformation Patterns
console.log("\n--- Transformation Patterns ---")

// Convert to uppercase
const names = ["alice", "bob", "charlie"]
const upperNames = []
for (const name of names) {
  upperNames.push(name.toUpperCase())
}
console.log("Original names:", names)
console.log("Uppercase names:", upperNames)

// Create objects from arrays
const studentScores = [85, 92, 78, 96]
const students = []
for (let i = 0; i < studentScores.length; i++) {
  let grade
  if (studentScores[i] >= 90) grade = "A"
  else if (studentScores[i] >= 80) grade = "B"
  else if (studentScores[i] >= 70) grade = "C"
  else grade = "F"

  students.push({
    id: i + 1,
    score: studentScores[i],
    grade: grade,
  })
}

console.log("Student objects:")
students.forEach((student) => {
  console.log(`  Student ${student.id}: ${student.score} (${student.grade})`)
})

// 12. Comparison: Loops vs Array Methods
console.log("\n--- Loops vs Array Methods ---")

const originalNumbers = [1, 2, 3, 4, 5]
console.log("Original numbers:", originalNumbers)

// Traditional loop approach
const doubled1 = []
for (let i = 0; i < originalNumbers.length; i++) {
  doubled1.push(originalNumbers[i] * 2)
}

const evens1 = []
for (const num of originalNumbers) {
  if (num % 2 === 0) {
    evens1.push(num)
  }
}

let sum1 = 0
for (const num of originalNumbers) {
  sum1 += num
}

// Modern array methods
const doubled2 = originalNumbers.map((num) => num * 2)
const evens2 = originalNumbers.filter((num) => num % 2 === 0)
const sum2 = originalNumbers.reduce((total, num) => total + num, 0)

console.log("Doubled (loop):", doubled1)
console.log("Doubled (map):", doubled2)
console.log("Evens (loop):", evens1)
console.log("Evens (filter):", evens2)
console.log("Sum (loop):", sum1)
console.log("Sum (reduce):", sum2)

// 13. Practical Examples
console.log("\n--- Practical Examples ---")

// Password strength checker
function checkPasswordStrength(password) {
  let score = 0
  const feedback = []

  // Check length
  if (password.length >= 8) {
    score += 2
  } else {
    feedback.push("Password should be at least 8 characters")
  }

  // Check for different character types
  let hasUpper = false,
    hasLower = false,
    hasNumber = false,
    hasSpecial = false

  for (const char of password) {
    if (char >= "A" && char <= "Z") hasUpper = true
    else if (char >= "a" && char <= "z") hasLower = true
    else if (char >= "0" && char <= "9") hasNumber = true
    else hasSpecial = true
  }

  if (hasUpper) score += 1
  else feedback.push("Add uppercase letters")

  if (hasLower) score += 1
  else feedback.push("Add lowercase letters")

  if (hasNumber) score += 1
  else feedback.push("Add numbers")

  if (hasSpecial) score += 1
  else feedback.push("Add special characters")

  const strength = score >= 5 ? "Strong" : score >= 3 ? "Medium" : "Weak"

  return { score, strength, feedback }
}

const passwords = ["password", "Password1", "P@ssw0rd!", "abc"]
console.log("Password strength analysis:")
for (const pwd of passwords) {
  const analysis = checkPasswordStrength(pwd)
  console.log(`"${pwd}": ${analysis.strength} (${analysis.score}/6)`)
  if (analysis.feedback.length > 0) {
    console.log(`  Suggestions: ${analysis.feedback.join(", ")}`)
  }
}

// Simple text statistics
function analyzeText(text) {
  const stats = {
    characters: text.length,
    words: 0,
    sentences: 0,
    vowels: 0,
    consonants: 0,
  }

  const words = text.trim().split(/\s+/)
  stats.words = words.length

  for (const char of text) {
    if (char === "." || char === "!" || char === "?") {
      stats.sentences++
    }

    const lowerChar = char.toLowerCase()
    if (lowerChar >= "a" && lowerChar <= "z") {
      if ("aeiou".includes(lowerChar)) {
        stats.vowels++
      } else {
        stats.consonants++
      }
    }
  }

  return stats
}

const sampleText = "Hello world! This is a sample text for analysis. How are you?"
const textStats = analyzeText(sampleText)
console.log("\nText analysis for:", sampleText)
console.log("Statistics:", textStats)

// Number guessing game simulation
function simulateGuessingGame(target, maxGuesses = 10) {
  console.log(`\nGuessing game: Find the number between 1-100 (target: ${target})`)

  let low = 1,
    high = 100
  let guesses = 0

  while (guesses < maxGuesses) {
    guesses++
    const guess = Math.floor((low + high) / 2) // Binary search strategy

    console.log(`Guess ${guesses}: ${guess}`)

    if (guess === target) {
      console.log(`🎉 Found it in ${guesses} guesses!`)
      return guesses
    } else if (guess < target) {
      console.log("Too low!")
      low = guess + 1
    } else {
      console.log("Too high!")
      high = guess - 1
    }
  }

  console.log(`😞 Didn't find it in ${maxGuesses} guesses`)
  return -1
}

simulateGuessingGame(67)

// Fibonacci sequence generator
function generateFibonacci(n) {
  if (n <= 0) return []
  if (n === 1) return [0]

  const sequence = [0, 1]

  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2])
  }

  return sequence
}

console.log("\nFibonacci sequences:")
console.log("First 10 numbers:", generateFibonacci(10))
console.log("First 15 numbers:", generateFibonacci(15))

// Prime number finder
function findPrimes(limit) {
  const primes = []

  for (let num = 2; num <= limit; num++) {
    let isPrime = true

    // Check if num is divisible by any number from 2 to sqrt(num)
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false
        break
      }
    }

    if (isPrime) {
      primes.push(num)
    }
  }

  return primes
}

console.log("\nPrime numbers up to 30:", findPrimes(30))
console.log("Prime numbers up to 50:", findPrimes(50))
