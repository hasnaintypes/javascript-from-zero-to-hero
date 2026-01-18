// Week 1: Fundamentals - Daily Coding Challenges
// Focus: Basic array, string, and object manipulation

console.log("=== WEEK 1: FUNDAMENTALS ===\n")

// ==========================================
// DAY 1: ARRAY BASICS
// ==========================================

console.log("DAY 1: Array Basics")

// Challenge 1.1: Find the largest number in an array
function findLargest(arr) {
  if (arr.length === 0) return null

  let largest = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i]
    }
  }
  return largest
}

// Alternative solutions
const findLargestMath = (arr) => (arr.length === 0 ? null : Math.max(...arr))
const findLargestReduce = (arr) => arr.reduce((max, current) => (current > max ? current : max), arr[0])

// Test cases
const testCases1_1 = [
  { input: [[3, 1, 4, 1, 5, 9, 2, 6]], expected: 9 },
  { input: [[-1, -5, -3]], expected: -1 },
  { input: [[42]], expected: 42 },
  { input: [[]], expected: null },
]

testSolution(findLargest, testCases1_1, "Find Largest Number")

// Challenge 1.2: Remove duplicates from array
function removeDuplicates(arr) {
  const unique = []
  const seen = new Set()

  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item)
      unique.push(item)
    }
  }

  return unique
}

// Alternative solutions
const removeDuplicatesSet = (arr) => [...new Set(arr)]
const removeDuplicatesFilter = (arr) => arr.filter((item, index) => arr.indexOf(item) === index)

const testCases1_2 = [
  { input: [[1, 2, 2, 3, 4, 4, 5]], expected: [1, 2, 3, 4, 5] },
  { input: [["a", "b", "a", "c", "b"]], expected: ["a", "b", "c"] },
  { input: [[1, 1, 1]], expected: [1] },
  { input: [[]], expected: [] },
]

testSolution(removeDuplicates, testCases1_2, "Remove Duplicates")

// ==========================================
// DAY 2: ARRAY MANIPULATION
// ==========================================

console.log("\nDAY 2: Array Manipulation")

// Challenge 2.1: Rotate array to the right by k steps
function rotateArray(arr, k) {
  if (arr.length === 0) return arr

  k = k % arr.length // Handle k > array length

  // Method 1: Using slice
  return arr.slice(-k).concat(arr.slice(0, -k))
}

// Alternative: In-place rotation
function rotateArrayInPlace(arr, k) {
  if (arr.length === 0) return arr

  k = k % arr.length

  // Reverse entire array
  reverse(arr, 0, arr.length - 1)
  // Reverse first k elements
  reverse(arr, 0, k - 1)
  // Reverse remaining elements
  reverse(arr, k, arr.length - 1)

  return arr
}

function reverse(arr, start, end) {
  while (start < end) {
    ;[arr[start], arr[end]] = [arr[end], arr[start]]
    start++
    end--
  }
}

const testCases2_1 = [
  { input: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [5, 6, 7, 1, 2, 3, 4] },
  { input: [[-1, -100, 3, 99], 2], expected: [3, 99, -1, -100] },
  { input: [[1, 2], 3], expected: [2, 1] },
  { input: [[1], 1], expected: [1] },
]

testSolution(rotateArray, testCases2_1, "Rotate Array")

// Challenge 2.2: Find two numbers that sum to target
function twoSum(nums, target) {
  const numMap = new Map()

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]

    if (numMap.has(complement)) {
      return [numMap.get(complement), i]
    }

    numMap.set(nums[i], i)
  }

  return [] // No solution found
}

const testCases2_2 = [
  { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
  { input: [[3, 2, 4], 6], expected: [1, 2] },
  { input: [[3, 3], 6], expected: [0, 1] },
  { input: [[1, 2, 3], 7], expected: [] },
]

testSolution(twoSum, testCases2_2, "Two Sum")

// ==========================================
// DAY 3: STRING BASICS
// ==========================================

console.log("\nDAY 3: String Basics")

// Challenge 3.1: Check if string is palindrome
function isPalindrome(str) {
  // Clean string: remove non-alphanumeric and convert to lowercase
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()

  let left = 0
  let right = cleaned.length - 1

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false
    }
    left++
    right--
  }

  return true
}

// Alternative solutions
const isPalindromeReverse = (str) => {
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
  return cleaned === cleaned.split("").reverse().join("")
}

const testCases3_1 = [
  { input: ["A man, a plan, a canal: Panama"], expected: true },
  { input: ["race a car"], expected: false },
  { input: [""], expected: true },
  { input: ["Madam"], expected: true },
]

testSolution(isPalindrome, testCases3_1, "Is Palindrome")

// Challenge 3.2: Count character frequency
function charFrequency(str) {
  const frequency = {}

  for (const char of str.toLowerCase()) {
    if (char.match(/[a-z]/)) {
      // Only count letters
      frequency[char] = (frequency[char] || 0) + 1
    }
  }

  return frequency
}

// Alternative using Map
function charFrequencyMap(str) {
  const frequency = new Map()

  for (const char of str.toLowerCase()) {
    if (char.match(/[a-z]/)) {
      frequency.set(char, (frequency.get(char) || 0) + 1)
    }
  }

  return Object.fromEntries(frequency)
}

const testCases3_2 = [
  { input: ["hello"], expected: { h: 1, e: 1, l: 2, o: 1 } },
  { input: ["Hello World!"], expected: { h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 } },
  { input: [""], expected: {} },
  { input: ["aaa"], expected: { a: 3 } },
]

testSolution(charFrequency, testCases3_2, "Character Frequency")

// ==========================================
// DAY 4: STRING MANIPULATION
// ==========================================

console.log("\nDAY 4: String Manipulation")

// Challenge 4.1: Reverse words in a string
function reverseWords(str) {
  return str.trim().split(/\s+/).reverse().join(" ")
}

// Alternative: Manual approach
function reverseWordsManual(str) {
  const words = []
  let currentWord = ""

  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      if (currentWord) {
        words.push(currentWord)
        currentWord = ""
      }
    } else {
      currentWord += str[i]
    }
  }

  if (currentWord) words.push(currentWord)

  return words.reverse().join(" ")
}

const testCases4_1 = [
  { input: ["the sky is blue"], expected: "blue is sky the" },
  { input: ["  hello world  "], expected: "world hello" },
  { input: ["a good   example"], expected: "example good a" },
  { input: [""], expected: "" },
]

testSolution(reverseWords, testCases4_1, "Reverse Words")

// Challenge 4.2: Check if strings are anagrams
function areAnagrams(str1, str2) {
  // Clean and normalize strings
  const clean1 = str1.replace(/[^a-zA-Z]/g, "").toLowerCase()
  const clean2 = str2.replace(/[^a-zA-Z]/g, "").toLowerCase()

  if (clean1.length !== clean2.length) return false

  // Count character frequencies
  const freq1 = {}
  const freq2 = {}

  for (const char of clean1) {
    freq1[char] = (freq1[char] || 0) + 1
  }

  for (const char of clean2) {
    freq2[char] = (freq2[char] || 0) + 1
  }

  // Compare frequencies
  for (const char in freq1) {
    if (freq1[char] !== freq2[char]) return false
  }

  return true
}

// Alternative: Sort approach
const areAnagramsSort = (str1, str2) => {
  const clean1 = str1.replace(/[^a-zA-Z]/g, "").toLowerCase()
  const clean2 = str2.replace(/[^a-zA-Z]/g, "").toLowerCase()

  return clean1.split("").sort().join("") === clean2.split("").sort().join("")
}

const testCases4_2 = [
  { input: ["listen", "silent"], expected: true },
  { input: ["elbow", "below"], expected: true },
  { input: ["hello", "bello"], expected: false },
  { input: ["A gentleman", "Elegant man"], expected: true },
]

testSolution(areAnagrams, testCases4_2, "Are Anagrams")

// ==========================================
// DAY 5: OBJECT MANIPULATION
// ==========================================

console.log("\nDAY 5: Object Manipulation")

// Challenge 5.1: Deep clone an object
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item))
  }

  if (typeof obj === "object") {
    const cloned = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key])
      }
    }
    return cloned
  }
}

// Test deep clone
const originalObj = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Anytown",
  },
  hobbies: ["reading", "coding"],
}

const clonedObj = deepClone(originalObj)
clonedObj.address.city = "New City"
clonedObj.hobbies.push("gaming")

console.log("Original city:", originalObj.address.city) // Should remain "Anytown"
console.log("Cloned city:", clonedObj.address.city) // Should be "New City"

// Challenge 5.2: Merge objects deeply
function deepMerge(target, source) {
  const result = { ...target }

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === "object" && source[key] !== null && !Array.isArray(source[key])) {
        result[key] = deepMerge(result[key] || {}, source[key])
      } else {
        result[key] = source[key]
      }
    }
  }

  return result
}

const obj1 = { a: 1, b: { c: 2, d: 3 } }
const obj2 = { b: { d: 4, e: 5 }, f: 6 }
const merged = deepMerge(obj1, obj2)

console.log("Merged object:", merged)
// Expected: { a: 1, b: { c: 2, d: 4, e: 5 }, f: 6 }

// ==========================================
// DAY 6: DATA TRANSFORMATION
// ==========================================

console.log("\nDAY 6: Data Transformation")

// Challenge 6.1: Group array of objects by property
function groupBy(array, key) {
  return array.reduce((groups, item) => {
    const group = item[key]
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {})
}

const people = [
  { name: "Alice", age: 25, department: "Engineering" },
  { name: "Bob", age: 30, department: "Marketing" },
  { name: "Charlie", age: 25, department: "Engineering" },
  { name: "Diana", age: 28, department: "Marketing" },
]

const groupedByDept = groupBy(people, "department")
const groupedByAge = groupBy(people, "age")

console.log("Grouped by department:", groupedByDept)
console.log("Grouped by age:", groupedByAge)

// Challenge 6.2: Flatten nested array
function flattenArray(arr) {
  const result = []

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item))
    } else {
      result.push(item)
    }
  }

  return result
}

// Alternative using reduce
const flattenArrayReduce = (arr) => {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenArrayReduce(item) : item)
  }, [])
}

const nestedArray = [1, [2, 3], [4, [5, 6]], 7]
console.log("Flattened array:", flattenArray(nestedArray))

// ==========================================
// DAY 7: WEEKLY REVIEW & MINI PROJECT
// ==========================================

console.log("\nDAY 7: Weekly Review & Mini Project")

// Mini Project: Simple Data Processor
class DataProcessor {
  constructor() {
    this.data = []
  }

  // Add data with validation
  addData(item) {
    if (typeof item === "object" && item !== null) {
      this.data.push({ ...item, id: Date.now() + Math.random() })
      return true
    }
    return false
  }

  // Remove duplicates based on a key
  removeDuplicates(key) {
    const seen = new Set()
    this.data = this.data.filter((item) => {
      if (seen.has(item[key])) {
        return false
      }
      seen.add(item[key])
      return true
    })
    return this
  }

  // Filter data based on condition
  filter(predicate) {
    this.data = this.data.filter(predicate)
    return this
  }

  // Sort data by key
  sortBy(key, ascending = true) {
    this.data.sort((a, b) => {
      if (ascending) {
        return a[key] > b[key] ? 1 : -1
      } else {
        return a[key] < b[key] ? 1 : -1
      }
    })
    return this
  }

  // Group data by key
  groupBy(key) {
    return groupBy(this.data, key)
  }

  // Get statistics
  getStats() {
    return {
      count: this.data.length,
      keys: this.data.length > 0 ? Object.keys(this.data[0]) : [],
      sample: this.data.slice(0, 3),
    }
  }

  // Export data
  export() {
    return [...this.data]
  }
}

// Test the DataProcessor
const processor = new DataProcessor()

// Add sample data
const sampleData = [
  { name: "Alice", score: 85, subject: "Math" },
  { name: "Bob", score: 92, subject: "Science" },
  { name: "Alice", score: 78, subject: "English" },
  { name: "Charlie", score: 88, subject: "Math" },
  { name: "Bob", score: 85, subject: "Math" },
]

sampleData.forEach((item) => processor.addData(item))

console.log("Initial data stats:", processor.getStats())

// Process data
const mathStudents = processor
  .filter((item) => item.subject === "Math")
  .sortBy("score", false)
  .export()

console.log("Math students (sorted by score):", mathStudents)

// Group by subject
processor.data = [...sampleData.map((item) => ({ ...item, id: Math.random() }))]
const groupedBySubject = processor.groupBy("subject")
console.log("Grouped by subject:", groupedBySubject)

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Test runner function
function testSolution(func, testCases, description) {
  console.log(`\n--- Testing: ${description} ---`)

  let passed = 0
  const total = testCases.length

  testCases.forEach((testCase, index) => {
    const { input, expected } = testCase
    try {
      const result = func(...input)
      const isEqual = JSON.stringify(result) === JSON.stringify(expected)

      if (isEqual) {
        console.log(`✅ Test ${index + 1}: PASS`)
        passed++
      } else {
        console.log(`❌ Test ${index + 1}: FAIL`)
        console.log(`   Input: ${JSON.stringify(input)}`)
        console.log(`   Expected: ${JSON.stringify(expected)}`)
        console.log(`   Got: ${JSON.stringify(result)}`)
      }
    } catch (error) {
      console.log(`❌ Test ${index + 1}: ERROR - ${error.message}`)
    }
  })

  console.log(`Results: ${passed}/${total} tests passed`)
  return passed === total
}

console.log("\n=== WEEK 1 COMPLETE! ===")
console.log("🎉 Congratulations on completing your first week of daily challenges!")
console.log("📈 You've practiced: Arrays, Strings, Objects, and Data Transformation")
console.log("🚀 Ready for Week 2? Let's dive into intermediate algorithms!")
