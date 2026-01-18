// Week 2: Intermediate Algorithms - Daily Coding Challenges
// Focus: Sorting, searching, two-pointer, sliding window, hash maps

console.log("=== WEEK 2: INTERMEDIATE ALGORITHMS ===\n")

// ==========================================
// DAY 8: SORTING ALGORITHMS
// ==========================================

console.log("DAY 8: Sorting Algorithms")

// Challenge 8.1: Implement Bubble Sort
function bubbleSort(arr) {
  const sorted = [...arr] // Don't mutate original
  const n = sorted.length

  for (let i = 0; i < n - 1; i++) {
    let swapped = false

    for (let j = 0; j < n - i - 1; j++) {
      if (sorted[j] > sorted[j + 1]) {
        // Swap elements
        ;[sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]]
        swapped = true
      }
    }

    // If no swapping occurred, array is sorted
    if (!swapped) break
  }

  return sorted
}

// Challenge 8.2: Implement Quick Sort
function quickSort(arr) {
  if (arr.length <= 1) return arr

  const pivot = arr[Math.floor(arr.length / 2)]
  const left = []
  const right = []
  const equal = []

  for (const element of arr) {
    if (element < pivot) {
      left.push(element)
    } else if (element > pivot) {
      right.push(element)
    } else {
      equal.push(element)
    }
  }

  return [...quickSort(left), ...equal, ...quickSort(right)]
}

// Challenge 8.3: Implement Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr

  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))

  return merge(left, right)
}

function merge(left, right) {
  const result = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex])
      leftIndex++
    } else {
      result.push(right[rightIndex])
      rightIndex++
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

// Test sorting algorithms
const unsortedArray = [64, 34, 25, 12, 22, 11, 90]
console.log("Original:", unsortedArray)
console.log("Bubble Sort:", bubbleSort(unsortedArray))
console.log("Quick Sort:", quickSort(unsortedArray))
console.log("Merge Sort:", mergeSort(unsortedArray))

// Performance comparison
function compareSortingPerformance(arr) {
  const algorithms = [
    { name: "Bubble Sort", func: bubbleSort },
    { name: "Quick Sort", func: quickSort },
    { name: "Merge Sort", func: mergeSort },
    { name: "Native Sort", func: (arr) => [...arr].sort((a, b) => a - b) },
  ]

  console.log("\n--- Sorting Performance Comparison ---")

  algorithms.forEach(({ name, func }) => {
    const start = performance.now()
    func([...arr])
    const end = performance.now()
    console.log(`${name}: ${(end - start).toFixed(4)}ms`)
  })
}

const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000))
compareSortingPerformance(largeArray)

// ==========================================
// DAY 9: SEARCHING ALGORITHMS
// ==========================================

console.log("\nDAY 9: Searching Algorithms")

// Challenge 9.1: Binary Search
function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return -1 // Not found
}

// Challenge 9.2: Find First and Last Position
function searchRange(nums, target) {
  const findFirst = (nums, target) => {
    let left = 0,
      right = nums.length - 1
    let result = -1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)

      if (nums[mid] === target) {
        result = mid
        right = mid - 1 // Continue searching left
      } else if (nums[mid] < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    return result
  }

  const findLast = (nums, target) => {
    let left = 0,
      right = nums.length - 1
    let result = -1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)

      if (nums[mid] === target) {
        result = mid
        left = mid + 1 // Continue searching right
      } else if (nums[mid] < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    return result
  }

  const first = findFirst(nums, target)
  const last = first === -1 ? -1 : findLast(nums, target)

  return [first, last]
}

// Test searching algorithms
const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log("Binary search for 5:", binarySearch(sortedArray, 5))
console.log("Binary search for 11:", binarySearch(sortedArray, 11))

const arrayWithDuplicates = [5, 7, 7, 8, 8, 8, 10]
console.log("Search range for 8:", searchRange(arrayWithDuplicates, 8))
console.log("Search range for 6:", searchRange(arrayWithDuplicates, 6))

// ==========================================
// DAY 10: TWO POINTER TECHNIQUE
// ==========================================

console.log("\nDAY 10: Two Pointer Technique")

// Challenge 10.1: Container With Most Water
function maxArea(height) {
  let left = 0
  let right = height.length - 1
  let maxWater = 0

  while (left < right) {
    const width = right - left
    const currentHeight = Math.min(height[left], height[right])
    const currentArea = width * currentHeight

    maxWater = Math.max(maxWater, currentArea)

    // Move the pointer with smaller height
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }

  return maxWater
}

// Challenge 10.2: Three Sum
function threeSum(nums) {
  const result = []
  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for first number
    if (i > 0 && nums[i] === nums[i - 1]) continue

    let left = i + 1
    let right = nums.length - 1

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]])

        // Skip duplicates for second and third numbers
        while (left < right && nums[left] === nums[left + 1]) left++
        while (left < right && nums[right] === nums[right - 1]) right--

        left++
        right--
      } else if (sum < 0) {
        left++
      } else {
        right--
      }
    }
  }

  return result
}

// Challenge 10.3: Remove Duplicates from Sorted Array
function removeDuplicatesInPlace(nums) {
  if (nums.length === 0) return 0

  let writeIndex = 1

  for (let readIndex = 1; readIndex < nums.length; readIndex++) {
    if (nums[readIndex] !== nums[readIndex - 1]) {
      nums[writeIndex] = nums[readIndex]
      writeIndex++
    }
  }

  return writeIndex
}

// Test two pointer techniques
console.log("Max water area:", maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
console.log("Three sum:", threeSum([-1, 0, 1, 2, -1, -4]))

const duplicateArray = [1, 1, 2, 2, 2, 3, 4, 4, 5]
const newLength = removeDuplicatesInPlace([...duplicateArray])
console.log("Array after removing duplicates:", duplicateArray.slice(0, newLength))

// ==========================================
// DAY 11: SLIDING WINDOW TECHNIQUE
// ==========================================

console.log("\nDAY 11: Sliding Window Technique")

// Challenge 11.1: Maximum Sum Subarray of Size K
function maxSumSubarray(arr, k) {
  if (arr.length < k) return null

  let windowSum = 0
  let maxSum = 0

  // Calculate sum of first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i]
  }
  maxSum = windowSum

  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i]
    maxSum = Math.max(maxSum, windowSum)
  }

  return maxSum
}

// Challenge 11.2: Longest Substring Without Repeating Characters
function lengthOfLongestSubstring(s) {
  const charSet = new Set()
  let left = 0
  let maxLength = 0

  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left])
      left++
    }

    charSet.add(s[right])
    maxLength = Math.max(maxLength, right - left + 1)
  }

  return maxLength
}

// Challenge 11.3: Minimum Window Substring
function minWindow(s, t) {
  if (s.length < t.length) return ""

  const tCount = {}
  for (const char of t) {
    tCount[char] = (tCount[char] || 0) + 1
  }

  const windowCount = {}
  let left = 0
  let minLen = Number.POSITIVE_INFINITY
  let minStart = 0
  let formed = 0
  const required = Object.keys(tCount).length

  for (let right = 0; right < s.length; right++) {
    const char = s[right]
    windowCount[char] = (windowCount[char] || 0) + 1

    if (tCount[char] && windowCount[char] === tCount[char]) {
      formed++
    }

    while (left <= right && formed === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1
        minStart = left
      }

      const leftChar = s[left]
      windowCount[leftChar]--
      if (tCount[leftChar] && windowCount[leftChar] < tCount[leftChar]) {
        formed--
      }
      left++
    }
  }

  return minLen === Number.POSITIVE_INFINITY ? "" : s.substring(minStart, minStart + minLen)
}

// Test sliding window techniques
console.log("Max sum subarray (k=3):", maxSumSubarray([2, 1, 5, 1, 3, 2], 3))
console.log("Longest substring without repeating:", lengthOfLongestSubstring("abcabcbb"))
console.log("Minimum window substring:", minWindow("ADOBECODEBANC", "ABC"))

// ==========================================
// DAY 12: HASH MAPS & FREQUENCY COUNTING
// ==========================================

console.log("\nDAY 12: Hash Maps & Frequency Counting")

// Challenge 12.1: Top K Frequent Elements
function topKFrequent(nums, k) {
  // Count frequencies
  const frequency = {}
  for (const num of nums) {
    frequency[num] = (frequency[num] || 0) + 1
  }

  // Sort by frequency and return top k
  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, k)
    .map(([num]) => Number.parseInt(num))
}

// Challenge 12.2: Group Anagrams
function groupAnagrams(strs) {
  const groups = {}

  for (const str of strs) {
    // Create a key by sorting characters
    const key = str.split("").sort().join("")

    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(str)
  }

  return Object.values(groups)
}

// Challenge 12.3: Subarray Sum Equals K
function subarraySum(nums, k) {
  const prefixSums = new Map()
  prefixSums.set(0, 1) // Base case: empty subarray

  let count = 0
  let currentSum = 0

  for (const num of nums) {
    currentSum += num

    // Check if (currentSum - k) exists in map
    if (prefixSums.has(currentSum - k)) {
      count += prefixSums.get(currentSum - k)
    }

    // Add current sum to map
    prefixSums.set(currentSum, (prefixSums.get(currentSum) || 0) + 1)
  }

  return count
}

// Test hash map techniques
console.log("Top 2 frequent elements:", topKFrequent([1, 1, 1, 2, 2, 3], 2))
console.log("Group anagrams:", groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
console.log("Subarray sum equals 7:", subarraySum([1, 1, 1, 4, 2, 1], 7))

// ==========================================
// DAY 13: ADVANCED ARRAY PROBLEMS
// ==========================================

console.log("\nDAY 13: Advanced Array Problems")

// Challenge 13.1: Product of Array Except Self
function productExceptSelf(nums) {
  const result = new Array(nums.length)

  // Calculate left products
  result[0] = 1
  for (let i = 1; i < nums.length; i++) {
    result[i] = result[i - 1] * nums[i - 1]
  }

  // Calculate right products and multiply with left products
  let rightProduct = 1
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= rightProduct
    rightProduct *= nums[i]
  }

  return result
}

// Challenge 13.2: Spiral Matrix
function spiralOrder(matrix) {
  if (matrix.length === 0) return []

  const result = []
  let top = 0,
    bottom = matrix.length - 1
  let left = 0,
    right = matrix[0].length - 1

  while (top <= bottom && left <= right) {
    // Traverse right
    for (let col = left; col <= right; col++) {
      result.push(matrix[top][col])
    }
    top++

    // Traverse down
    for (let row = top; row <= bottom; row++) {
      result.push(matrix[row][right])
    }
    right--

    // Traverse left (if we still have rows)
    if (top <= bottom) {
      for (let col = right; col >= left; col--) {
        result.push(matrix[bottom][col])
      }
      bottom--
    }

    // Traverse up (if we still have columns)
    if (left <= right) {
      for (let row = bottom; row >= top; row--) {
        result.push(matrix[row][left])
      }
      left++
    }
  }

  return result
}

// Challenge 13.3: Rotate Image (90 degrees clockwise)
function rotate(matrix) {
  const n = matrix.length

  // Transpose the matrix
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      ;[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }

  // Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse()
  }

  return matrix
}

// Test advanced array problems
console.log("Product except self:", productExceptSelf([1, 2, 3, 4]))

const spiralMatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
console.log("Spiral order:", spiralOrder(spiralMatrix))

const rotateMatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
console.log("Rotated matrix:", rotate([...rotateMatrix.map((row) => [...row])]))

// ==========================================
// DAY 14: WEEKLY REVIEW & OPTIMIZATION
// ==========================================

console.log("\nDAY 14: Weekly Review & Optimization")

// Performance Analysis Tool
class PerformanceAnalyzer {
  static measure(func, input, iterations = 1000) {
    const start = performance.now()

    for (let i = 0; i < iterations; i++) {
      func(...input)
    }

    const end = performance.now()
    return (end - start) / iterations
  }

  static compare(algorithms, input, iterations = 1000) {
    console.log("\n--- Performance Comparison ---")

    const results = algorithms.map(({ name, func }) => {
      const avgTime = this.measure(func, input, iterations)
      return { name, avgTime }
    })

    results.sort((a, b) => a.avgTime - b.avgTime)

    results.forEach(({ name, avgTime }, index) => {
      const emoji = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "📊"
      console.log(`${emoji} ${name}: ${avgTime.toFixed(6)}ms avg`)
    })

    return results
  }
}

// Compare different sorting algorithms
const testArray = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100))

const sortingAlgorithms = [
  { name: "Bubble Sort", func: bubbleSort },
  { name: "Quick Sort", func: quickSort },
  { name: "Merge Sort", func: mergeSort },
  { name: "Native Sort", func: (arr) => [...arr].sort((a, b) => a - b) },
]

PerformanceAnalyzer.compare(sortingAlgorithms, [testArray], 100)

// Compare search algorithms
const searchArray = Array.from({ length: 1000 }, (_, i) => i)
const target = 500

const searchAlgorithms = [
  { name: "Linear Search", func: (arr, target) => arr.indexOf(target) },
  { name: "Binary Search", func: binarySearch },
]

PerformanceAnalyzer.compare(searchAlgorithms, [searchArray, target], 1000)

// Algorithm Complexity Cheat Sheet
console.log("\n--- Algorithm Complexity Cheat Sheet ---")
console.log("Sorting Algorithms:")
console.log("  Bubble Sort:    O(n²) time, O(1) space")
console.log("  Quick Sort:     O(n log n) avg, O(n²) worst time, O(log n) space")
console.log("  Merge Sort:     O(n log n) time, O(n) space")
console.log("  Heap Sort:      O(n log n) time, O(1) space")

console.log("\nSearching Algorithms:")
console.log("  Linear Search:  O(n) time, O(1) space")
console.log("  Binary Search:  O(log n) time, O(1) space")

console.log("\nData Structure Operations:")
console.log("  Array Access:   O(1)")
console.log("  Array Search:   O(n)")
console.log("  Array Insert:   O(n)")
console.log("  Hash Map:       O(1) avg for all operations")

// Weekly Challenge: Implement a complete solution
console.log("\n--- Weekly Challenge: Advanced Array Processor ---")

class AdvancedArrayProcessor {
  constructor(data = []) {
    this.data = [...data]
    this.operations = []
  }

  // Chainable operations
  sort(compareFn = (a, b) => a - b) {
    this.data.sort(compareFn)
    this.operations.push("sort")
    return this
  }

  filter(predicate) {
    this.data = this.data.filter(predicate)
    this.operations.push("filter")
    return this
  }

  map(transform) {
    this.data = this.data.map(transform)
    this.operations.push("map")
    return this
  }

  reduce(reducer, initialValue) {
    const result = this.data.reduce(reducer, initialValue)
    this.operations.push("reduce")
    return result
  }

  unique() {
    this.data = [...new Set(this.data)]
    this.operations.push("unique")
    return this
  }

  chunk(size) {
    const chunks = []
    for (let i = 0; i < this.data.length; i += size) {
      chunks.push(this.data.slice(i, i + size))
    }
    this.data = chunks
    this.operations.push("chunk")
    return this
  }

  flatten() {
    this.data = this.data.flat(Number.POSITIVE_INFINITY)
    this.operations.push("flatten")
    return this
  }

  // Analysis methods
  getStats() {
    if (this.data.length === 0) return null

    const numbers = this.data.filter((x) => typeof x === "number")
    if (numbers.length === 0) return { count: this.data.length }

    return {
      count: this.data.length,
      sum: numbers.reduce((a, b) => a + b, 0),
      avg: numbers.reduce((a, b) => a + b, 0) / numbers.length,
      min: Math.min(...numbers),
      max: Math.max(...numbers),
      operations: this.operations,
    }
  }

  export() {
    return [...this.data]
  }
}

// Test the Advanced Array Processor
const processor = new AdvancedArrayProcessor([1, 2, 3, 2, 4, 5, 1, 6, 7, 8, 9, 10])

const result = processor
  .unique()
  .filter((x) => x > 3)
  .map((x) => x * 2)
  .sort((a, b) => b - a)
  .export()

console.log("Processed result:", result)
console.log("Processing stats:", processor.getStats())

console.log("\n=== WEEK 2 COMPLETE! ===")
console.log("🎉 Amazing work! You've mastered intermediate algorithms!")
console.log("📈 Skills gained: Sorting, Searching, Two Pointers, Sliding Window, Hash Maps")
console.log("🚀 Next up: Week 3 - Data Structures Implementation!")
