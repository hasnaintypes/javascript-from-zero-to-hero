// Week 4: Advanced Problem Solving - Daily Coding Challenges
// Focus: Dynamic programming, recursion, backtracking, greedy algorithms

console.log("=== WEEK 4: ADVANCED PROBLEM SOLVING ===\n")

// ==========================================
// DAY 22: DYNAMIC PROGRAMMING BASICS
// ==========================================

console.log("DAY 22: Dynamic Programming Basics")

// Challenge 22.1: Fibonacci with Memoization
function fibonacciMemo() {
  const memo = new Map()

  function fib(n) {
    if (n <= 1) return n

    if (memo.has(n)) {
      return memo.get(n)
    }

    const result = fib(n - 1) + fib(n - 2)
    memo.set(n, result)
    return result
  }

  return fib
}

// Challenge 22.2: Climbing Stairs
function climbStairs(n) {
  if (n <= 2) return n

  const dp = new Array(n + 1)
  dp[1] = 1
  dp[2] = 2

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}

// Space-optimized version
function climbStairsOptimized(n) {
  if (n <= 2) return n

  let prev2 = 1,
    prev1 = 2

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2
    prev2 = prev1
    prev1 = current
  }

  return prev1
}

// Challenge 22.3: House Robber
function rob(nums) {
  if (nums.length === 0) return 0
  if (nums.length === 1) return nums[0]

  const dp = new Array(nums.length)
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])

  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
  }

  return dp[nums.length - 1]
}

// Space-optimized version
function robOptimized(nums) {
  if (nums.length === 0) return 0
  if (nums.length === 1) return nums[0]

  let prev2 = nums[0]
  let prev1 = Math.max(nums[0], nums[1])

  for (let i = 2; i < nums.length; i++) {
    const current = Math.max(prev1, prev2 + nums[i])
    prev2 = prev1
    prev1 = current
  }

  return prev1
}

// Challenge 22.4: Coin Change
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Number.POSITIVE_INFINITY)
  dp[0] = 0

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
      }
    }
  }

  return dp[amount] === Number.POSITIVE_INFINITY ? -1 : dp[amount]
}

// Test DP problems
const fib = fibonacciMemo()
console.log("Fibonacci(10):", fib(10))
console.log("Fibonacci(20):", fib(20))

console.log("Climb stairs (5 steps):", climbStairs(5))
console.log("Climb stairs optimized (5 steps):", climbStairsOptimized(5))

console.log("House robber [2,7,9,3,1]:", rob([2, 7, 9, 3, 1]))
console.log("House robber optimized [2,7,9,3,1]:", robOptimized([2, 7, 9, 3, 1]))

console.log("Coin change [1,3,4] amount 6:", coinChange([1, 3, 4], 6))

// ==========================================
// DAY 23: ADVANCED DYNAMIC PROGRAMMING
// ==========================================

console.log("\nDAY 23: Advanced Dynamic Programming")

// Challenge 23.1: Longest Common Subsequence
function longestCommonSubsequence(text1, text2) {
  const m = text1.length,
    n = text2.length
  const dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  return dp[m][n]
}

// Challenge 23.2: Edit Distance (Levenshtein Distance)
function minDistance(word1, word2) {
  const m = word1.length,
    n = word2.length
  const dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0))

  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // Delete
          dp[i][j - 1] + 1, // Insert
          dp[i - 1][j - 1] + 1, // Replace
        )
      }
    }
  }

  return dp[m][n]
}

// Challenge 23.3: Maximum Subarray (Kadane's Algorithm)
function maxSubArray(nums) {
  let maxSoFar = nums[0]
  let maxEndingHere = nums[0]

  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i])
    maxSoFar = Math.max(maxSoFar, maxEndingHere)
  }

  return maxSoFar
}

// Challenge 23.4: Knapsack Problem (0/1)
function knapsack(weights, values, capacity) {
  const n = weights.length
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(capacity + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w], // Don't take item
          dp[i - 1][w - weights[i - 1]] + values[i - 1], // Take item
        )
      } else {
        dp[i][w] = dp[i - 1][w]
      }
    }
  }

  return dp[n][capacity]
}

// Challenge 23.5: Longest Increasing Subsequence
function lengthOfLIS(nums) {
  if (nums.length === 0) return 0

  const dp = new Array(nums.length).fill(1)

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  return Math.max(...dp)
}

// Optimized O(n log n) solution using binary search
function lengthOfLISOptimized(nums) {
  const tails = []

  for (const num of nums) {
    let left = 0,
      right = tails.length

    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (tails[mid] < num) {
        left = mid + 1
      } else {
        right = mid
      }
    }

    if (left === tails.length) {
      tails.push(num)
    } else {
      tails[left] = num
    }
  }

  return tails.length
}

// Test advanced DP problems
console.log("LCS 'abcde' and 'ace':", longestCommonSubsequence("abcde", "ace"))
console.log("Edit distance 'horse' and 'ros':", minDistance("horse", "ros"))
console.log("Max subarray [-2,1,-3,4,-1,2,1,-5,4]:", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
console.log("Knapsack:", knapsack([1, 3, 4, 5], [1, 4, 5, 7], 7))
console.log("LIS [10,9,2,5,3,7,101,18]:", lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))
console.log("LIS optimized [10,9,2,5,3,7,101,18]:", lengthOfLISOptimized([10, 9, 2, 5, 3, 7, 101, 18]))

// ==========================================
// DAY 24: RECURSION & BACKTRACKING
// ==========================================

console.log("\nDAY 24: Recursion & Backtracking")

// Challenge 24.1: Generate Parentheses
function generateParenthesis(n) {
  const result = []

  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current)
      return
    }

    if (open < n) {
      backtrack(current + "(", open + 1, close)
    }

    if (close < open) {
      backtrack(current + ")", open, close + 1)
    }
  }

  backtrack("", 0, 0)
  return result
}

// Challenge 24.2: Permutations
function permute(nums) {
  const result = []

  function backtrack(current) {
    if (current.length === nums.length) {
      result.push([...current])
      return
    }

    for (const num of nums) {
      if (!current.includes(num)) {
        current.push(num)
        backtrack(current)
        current.pop()
      }
    }
  }

  backtrack([])
  return result
}

// Challenge 24.3: Combinations
function combine(n, k) {
  const result = []

  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current])
      return
    }

    for (let i = start; i <= n; i++) {
      current.push(i)
      backtrack(i + 1, current)
      current.pop()
    }
  }

  backtrack(1, [])
  return result
}

// Challenge 24.4: Subsets
function subsets(nums) {
  const result = []

  function backtrack(start, current) {
    result.push([...current])

    for (let i = start; i < nums.length; i++) {
      current.push(nums[i])
      backtrack(i + 1, current)
      current.pop()
    }
  }

  backtrack(0, [])
  return result
}

// Challenge 24.5: N-Queens
function solveNQueens(n) {
  const result = []
  const board = Array(n)
    .fill()
    .map(() => Array(n).fill("."))

  function isValid(row, col) {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === "Q") return false
    }

    // Check diagonal (top-left to bottom-right)
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === "Q") return false
    }

    // Check diagonal (top-right to bottom-left)
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === "Q") return false
    }

    return true
  }

  function backtrack(row) {
    if (row === n) {
      result.push(board.map((row) => row.join("")))
      return
    }

    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = "Q"
        backtrack(row + 1)
        board[row][col] = "."
      }
    }
  }

  backtrack(0)
  return result
}

// Challenge 24.6: Sudoku Solver
function solveSudoku(board) {
  function isValid(board, row, col, num) {
    // Check row
    for (let j = 0; j < 9; j++) {
      if (board[row][j] === num) return false
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3
    const boxCol = Math.floor(col / 3) * 3

    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === num) return false
      }
    }

    return true
  }

  function solve(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === ".") {
          for (let num = "1"; num <= "9"; num++) {
            if (isValid(board, i, j, num)) {
              board[i][j] = num

              if (solve(board)) return true

              board[i][j] = "." // Backtrack
            }
          }
          return false
        }
      }
    }
    return true
  }

  solve(board)
}

// Test recursion and backtracking problems
console.log("Generate parentheses (n=3):", generateParenthesis(3))
console.log("Permutations [1,2,3]:", permute([1, 2, 3]))
console.log("Combinations C(4,2):", combine(4, 2))
console.log("Subsets [1,2,3]:", subsets([1, 2, 3]))
console.log("N-Queens (n=4) solutions:", solveNQueens(4).length)

// ==========================================
// DAY 25: GREEDY ALGORITHMS
// ==========================================

console.log("\nDAY 25: Greedy Algorithms")

// Challenge 25.1: Activity Selection Problem
function activitySelection(start, finish) {
  const n = start.length
  const activities = []

  // Create activity objects with indices
  for (let i = 0; i < n; i++) {
    activities.push({ start: start[i], finish: finish[i], index: i })
  }

  // Sort by finish time
  activities.sort((a, b) => a.finish - b.finish)

  const selected = [activities[0]]
  let lastFinish = activities[0].finish

  for (let i = 1; i < n; i++) {
    if (activities[i].start >= lastFinish) {
      selected.push(activities[i])
      lastFinish = activities[i].finish
    }
  }

  return selected.map((activity) => activity.index)
}

// Challenge 25.2: Fractional Knapsack
function fractionalKnapsack(weights, values, capacity) {
  const n = weights.length
  const items = []

  // Create items with value-to-weight ratio
  for (let i = 0; i < n; i++) {
    items.push({
      weight: weights[i],
      value: values[i],
      ratio: values[i] / weights[i],
      index: i,
    })
  }

  // Sort by ratio in descending order
  items.sort((a, b) => b.ratio - a.ratio)

  let totalValue = 0
  let remainingCapacity = capacity
  const solution = new Array(n).fill(0)

  for (const item of items) {
    if (remainingCapacity >= item.weight) {
      // Take the whole item
      solution[item.index] = 1
      totalValue += item.value
      remainingCapacity -= item.weight
    } else if (remainingCapacity > 0) {
      // Take fraction of the item
      const fraction = remainingCapacity / item.weight
      solution[item.index] = fraction
      totalValue += item.value * fraction
      remainingCapacity = 0
      break
    }
  }

  return { totalValue, solution }
}

// Challenge 25.3: Huffman Coding
class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char
    this.freq = freq
    this.left = left
    this.right = right
  }
}

class MinHeap {
  constructor() {
    this.heap = []
  }

  insert(node) {
    this.heap.push(node)
    this.heapifyUp(this.heap.length - 1)
  }

  extractMin() {
    if (this.heap.length === 0) return null
    if (this.heap.length === 1) return this.heap.pop()

    const min = this.heap[0]
    this.heap[0] = this.heap.pop()
    this.heapifyDown(0)
    return min
  }

  heapifyUp(index) {
    const parentIndex = Math.floor((index - 1) / 2)

    if (parentIndex >= 0 && this.heap[parentIndex].freq > this.heap[index].freq) {
      ;[this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]]
      this.heapifyUp(parentIndex)
    }
  }

  heapifyDown(index) {
    const leftChild = 2 * index + 1
    const rightChild = 2 * index + 2
    let smallest = index

    if (leftChild < this.heap.length && this.heap[leftChild].freq < this.heap[smallest].freq) {
      smallest = leftChild
    }

    if (rightChild < this.heap.length && this.heap[rightChild].freq < this.heap[smallest].freq) {
      smallest = rightChild
    }

    if (smallest !== index) {
      ;[this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]]
      this.heapifyDown(smallest)
    }
  }

  size() {
    return this.heap.length
  }
}

function huffmanCoding(text) {
  // Count character frequencies
  const freq = {}
  for (const char of text) {
    freq[char] = (freq[char] || 0) + 1
  }

  // Create min heap
  const heap = new MinHeap()
  for (const [char, frequency] of Object.entries(freq)) {
    heap.insert(new HuffmanNode(char, frequency))
  }

  // Build Huffman tree
  while (heap.size() > 1) {
    const left = heap.extractMin()
    const right = heap.extractMin()

    const merged = new HuffmanNode(null, left.freq + right.freq, left, right)
    heap.insert(merged)
  }

  const root = heap.extractMin()

  // Generate codes
  const codes = {}

  function generateCodes(node, code = "") {
    if (!node) return

    if (node.char !== null) {
      codes[node.char] = code || "0" // Handle single character case
      return
    }

    generateCodes(node.left, code + "0")
    generateCodes(node.right, code + "1")
  }

  generateCodes(root)

  // Encode text
  let encoded = ""
  for (const char of text) {
    encoded += codes[char]
  }

  return { codes, encoded, compressionRatio: (text.length * 8) / encoded.length }
}

// Challenge 25.4: Job Scheduling with Deadlines
function jobScheduling(jobs) {
  // Sort jobs by profit in descending order
  jobs.sort((a, b) => b.profit - a.profit)

  const maxDeadline = Math.max(...jobs.map((job) => job.deadline))
  const schedule = new Array(maxDeadline).fill(null)
  let totalProfit = 0

  for (const job of jobs) {
    // Find latest available slot before deadline
    for (let i = Math.min(job.deadline - 1, maxDeadline - 1); i >= 0; i--) {
      if (schedule[i] === null) {
        schedule[i] = job
        totalProfit += job.profit
        break
      }
    }
  }

  return { schedule: schedule.filter((job) => job !== null), totalProfit }
}

// Test greedy algorithms
console.log("Activity selection:", activitySelection([1, 3, 0, 5, 8, 5], [2, 4, 6, 7, 9, 9]))

const knapsackResult = fractionalKnapsack([10, 20, 30], [60, 100, 120], 50)
console.log("Fractional knapsack:", knapsackResult)

const huffmanResult = huffmanCoding("hello world")
console.log("Huffman coding:", huffmanResult)

const jobs = [
  { id: 1, deadline: 2, profit: 100 },
  { id: 2, deadline: 1, profit: 19 },
  { id: 3, deadline: 2, profit: 27 },
  { id: 4, deadline: 1, profit: 25 },
  { id: 5, deadline: 3, profit: 15 },
]
console.log("Job scheduling:", jobScheduling(jobs))

// ==========================================
// DAY 26: ADVANCED ALGORITHMS
// ==========================================

console.log("\nDAY 26: Advanced Algorithms")

// Challenge 26.1: Dijkstra's Shortest Path
function dijkstra(graph, start) {
  const distances = {}
  const previous = {}
  const visited = new Set()
  const pq = new MinHeap()

  // Initialize distances
  for (const vertex in graph) {
    distances[vertex] = vertex === start ? 0 : Number.POSITIVE_INFINITY
    pq.insert({ vertex, distance: distances[vertex] })
  }

  while (pq.size() > 0) {
    const { vertex: current } = pq.extractMin()

    if (visited.has(current)) continue
    visited.add(current)

    for (const neighbor in graph[current]) {
      const weight = graph[current][neighbor]
      const newDistance = distances[current] + weight

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance
        previous[neighbor] = current
        pq.insert({ vertex: neighbor, distance: newDistance })
      }
    }
  }

  return { distances, previous }
}

// Challenge 26.2: Kruskal's Minimum Spanning Tree
function kruskalMST(vertices, edges) {
  // Sort edges by weight
  edges.sort((a, b) => a.weight - b.weight)

  const ds = new DisjointSet(vertices.length)
  const vertexToIndex = {}
  vertices.forEach((vertex, index) => {
    vertexToIndex[vertex] = index
  })

  const mst = []
  let totalWeight = 0

  for (const edge of edges) {
    const u = vertexToIndex[edge.from]
    const v = vertexToIndex[edge.to]

    if (!ds.isConnected(u, v)) {
      ds.union(u, v)
      mst.push(edge)
      totalWeight += edge.weight
    }
  }

  return { mst, totalWeight }
}

// Challenge 26.3: Topological Sort
function topologicalSort(graph) {
  const inDegree = {}
  const result = []

  // Initialize in-degrees
  for (const vertex in graph) {
    inDegree[vertex] = 0
  }

  // Calculate in-degrees
  for (const vertex in graph) {
    for (const neighbor of graph[vertex]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1
    }
  }

  // Find vertices with no incoming edges
  const queue = []
  for (const vertex in inDegree) {
    if (inDegree[vertex] === 0) {
      queue.push(vertex)
    }
  }

  while (queue.length > 0) {
    const vertex = queue.shift()
    result.push(vertex)

    for (const neighbor of graph[vertex] || []) {
      inDegree[neighbor]--
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor)
      }
    }
  }

  return result.length === Object.keys(graph).length ? result : null // Cycle detected
}

// Challenge 26.4: Boyer-Moore Majority Element
function majorityElement(nums) {
  let candidate = null
  let count = 0

  // Phase 1: Find candidate
  for (const num of nums) {
    if (count === 0) {
      candidate = num
    }
    count += num === candidate ? 1 : -1
  }

  // Phase 2: Verify candidate (optional for this problem)
  count = 0
  for (const num of nums) {
    if (num === candidate) count++
  }

  return count > nums.length / 2 ? candidate : null
}

// Challenge 26.5: KMP String Matching
function kmpSearch(text, pattern) {
  function buildLPS(pattern) {
    const lps = new Array(pattern.length).fill(0)
    let len = 0
    let i = 1

    while (i < pattern.length) {
      if (pattern[i] === pattern[len]) {
        len++
        lps[i] = len
        i++
      } else {
        if (len !== 0) {
          len = lps[len - 1]
        } else {
          lps[i] = 0
          i++
        }
      }
    }

    return lps
  }

  const lps = buildLPS(pattern)
  const matches = []
  let i = 0 // text index
  let j = 0 // pattern index

  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++
      j++
    }

    if (j === pattern.length) {
      matches.push(i - j)
      j = lps[j - 1]
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1]
      } else {
        i++
      }
    }
  }

  return matches
}

// Test advanced algorithms
const graphForDijkstra = {
  A: { B: 4, C: 2 },
  B: { C: 1, D: 5 },
  C: { D: 8, E: 10 },
  D: { E: 2 },
  E: {},
}
console.log("Dijkstra from A:", dijkstra(graphForDijkstra, "A"))

const edges = [
  { from: "A", to: "B", weight: 4 },
  { from: "A", to: "C", weight: 2 },
  { from: "B", to: "C", weight: 1 },
  { from: "B", to: "D", weight: 5 },
  { from: "C", to: "D", weight: 8 },
  { from: "C", to: "E", weight: 10 },
  { from: "D", to: "E", weight: 2 },
]
console.log("Kruskal MST:", kruskalMST(["A", "B", "C", "D", "E"], edges))

const dagGraph = {
  5: ["2", "0"],
  4: ["0", "1"],
  2: ["3"],
  3: ["1"],
  1: [],
  0: [],
}
console.log("Topological sort:", topologicalSort(dagGraph))

console.log("Majority element [3,2,3]:", majorityElement([3, 2, 3]))
console.log(
  "KMP search 'ABABCABABA' in 'ABAAABCDABABCABCABCABABA':",
  kmpSearch("ABAAABCDABABCABCABCABABA", "ABABCABABA"),
)

// ==========================================
// DAY 27: OPTIMIZATION TECHNIQUES
// ==========================================

console.log("\nDAY 27: Optimization Techniques")

// Challenge 27.1: Memoization Decorator
function memoize(fn) {
  const cache = new Map()

  return function (...args) {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

// Challenge 27.2: Lazy Evaluation
class LazySequence {
  constructor(generator) {
    this.generator = generator
  }

  static range(start, end, step = 1) {
    return new LazySequence(function* () {
      for (let i = start; i < end; i += step) {
        yield i
      }
    })
  }

  map(fn) {
    const generator = this.generator
    return new LazySequence(function* () {
      for (const value of generator()) {
        yield fn(value)
      }
    })
  }

  filter(predicate) {
    const generator = this.generator
    return new LazySequence(function* () {
      for (const value of generator()) {
        if (predicate(value)) {
          yield value
        }
      }
    })
  }

  take(n) {
    const generator = this.generator
    return new LazySequence(function* () {
      let count = 0
      for (const value of generator()) {
        if (count >= n) break
        yield value
        count++
      }
    })
  }

  toArray() {
    return Array.from(this.generator())
  }

  reduce(reducer, initialValue) {
    let accumulator = initialValue
    for (const value of this.generator()) {
      accumulator = reducer(accumulator, value)
    }
    return accumulator
  }
}

// Challenge 27.3: Binary Search Optimization
function binarySearchOptimized(arr, target, compareFn = (a, b) => a - b) {
  let left = 0
  let right = arr.length - 1
  let result = -1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    const comparison = compareFn(arr[mid], target)

    if (comparison === 0) {
      result = mid
      break
    } else if (comparison < 0) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return result
}

// Challenge 27.4: Sliding Window Maximum Optimization
function maxSlidingWindowOptimized(nums, k) {
  const result = []
  const deque = [] // Store indices

  for (let i = 0; i < nums.length; i++) {
    // Remove indices outside current window
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift()
    }

    // Remove indices of smaller elements
    while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop()
    }

    deque.push(i)

    // Add maximum to result when window is complete
    if (i >= k - 1) {
      result.push(nums[deque[0]])
    }
  }

  return result
}

// Challenge 27.5: Space-Time Tradeoff Examples
class SpaceTimeTradeoffs {
  // Time: O(1), Space: O(n) - Precomputed prefix sums
  static createPrefixSumArray(arr) {
    const prefixSum = [0]
    for (let i = 0; i < arr.length; i++) {
      prefixSum[i + 1] = prefixSum[i] + arr[i]
    }

    return {
      getRangeSum: (left, right) => prefixSum[right + 1] - prefixSum[left],
    }
  }

  // Time: O(log n), Space: O(n) - Sparse table for range minimum queries
  static createSparseTable(arr) {
    const n = arr.length
    const k = Math.floor(Math.log2(n)) + 1
    const st = Array(n)
      .fill()
      .map(() => Array(k).fill(0))

    // Initialize for intervals of length 1
    for (let i = 0; i < n; i++) {
      st[i][0] = arr[i]
    }

    // Build sparse table
    for (let j = 1; j < k; j++) {
      for (let i = 0; i + (1 << j) <= n; i++) {
        st[i][j] = Math.min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1])
      }
    }

    return {
      getRangeMin: (left, right) => {
        const len = right - left + 1
        const j = Math.floor(Math.log2(len))
        return Math.min(st[left][j], st[right - (1 << j) + 1][j])
      },
    }
  }
}

// Performance testing utility
class PerformanceTester {
  static timeFunction(fn, iterations = 1000) {
    const start = performance.now()

    for (let i = 0; i < iterations; i++) {
      fn()
    }

    const end = performance.now()
    return (end - start) / iterations
  }

  static memoryUsage() {
    if (typeof process !== "undefined" && process.memoryUsage) {
      return process.memoryUsage()
    }
    return { heapUsed: "N/A", heapTotal: "N/A" }
  }

  static compareAlgorithms(algorithms, testData) {
    console.log("\n--- Algorithm Performance Comparison ---")

    const results = algorithms.map(({ name, fn }) => {
      const avgTime = this.timeFunction(() => fn(testData))
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

// Test optimization techniques
const memoizedFib = memoize((n) => {
  if (n <= 1) return n
  return memoizedFib(n - 1) + memoizedFib(n - 2)
})

console.log("Memoized Fibonacci(30):", memoizedFib(30))

const lazyNumbers = LazySequence.range(1, 1000000)
  .filter((x) => x % 2 === 0)
  .map((x) => x * x)
  .take(5)
  .toArray()

console.log("Lazy evaluation result:", lazyNumbers)

const prefixSumArray = SpaceTimeTradeoffs.createPrefixSumArray([1, 2, 3, 4, 5])
console.log("Range sum (1, 3):", prefixSumArray.getRangeSum(1, 3))

const sparseTable = SpaceTimeTradeoffs.createSparseTable([4, 2, 3, 1, 5])
console.log("Range min (1, 3):", sparseTable.getRangeMin(1, 3))

// ==========================================
// DAY 28: CAPSTONE CHALLENGE & REVIEW
// ==========================================

console.log("\nDAY 28: Capstone Challenge & Review")

// Capstone Challenge: Design a Complete Algorithm Library
class AlgorithmLibrary {
  constructor() {
    this.cache = new Map()
    this.stats = {
      operations: 0,
      cacheHits: 0,
      cacheMisses: 0,
    }
  }

  // Sorting algorithms
  sort = {
    bubble: (arr) => {
      this.stats.operations++
      const sorted = [...arr]
      const n = sorted.length

      for (let i = 0; i < n - 1; i++) {
        let swapped = false
        for (let j = 0; j < n - i - 1; j++) {
          if (sorted[j] > sorted[j + 1]) {
            ;[sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]]
            swapped = true
          }
        }
        if (!swapped) break
      }

      return sorted
    },

    quick: (arr) => {
      this.stats.operations++
      if (arr.length <= 1) return arr

      const pivot = arr[Math.floor(arr.length / 2)]
      const left = arr.filter((x) => x < pivot)
      const right = arr.filter((x) => x > pivot)
      const equal = arr.filter((x) => x === pivot)

      return [...this.sort.quick(left), ...equal, ...this.sort.quick(right)]
    },

    merge: (arr) => {
      this.stats.operations++
      if (arr.length <= 1) return arr

      const mid = Math.floor(arr.length / 2)
      const left = this.sort.merge(arr.slice(0, mid))
      const right = this.sort.merge(arr.slice(mid))

      return this._merge(left, right)
    },
  }

  // Search algorithms
  search = {
    linear: (arr, target) => {
      this.stats.operations++
      return arr.indexOf(target)
    },

    binary: (arr, target) => {
      this.stats.operations++
      let left = 0,
        right = arr.length - 1

      while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (arr[mid] === target) return mid
        else if (arr[mid] < target) left = mid + 1
        else right = mid - 1
      }

      return -1
    },
  }

  // Dynamic programming
  dp = {
    fibonacci: memoize((n) => {
      this.stats.operations++
      if (n <= 1) return n
      return this.dp.fibonacci(n - 1) + this.dp.fibonacci(n - 2)
    }),

    lcs: (str1, str2) => {
      this.stats.operations++
      const m = str1.length,
        n = str2.length
      const dp = Array(m + 1)
        .fill()
        .map(() => Array(n + 1).fill(0))

      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (str1[i - 1] === str2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1
          } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
          }
        }
      }

      return dp[m][n]
    },
  }

  // Graph algorithms
  graph = {
    dfs: (graph, start) => {
      this.stats.operations++
      const visited = new Set()
      const result = []

      const dfs = (vertex) => {
        visited.add(vertex)
        result.push(vertex)

        for (const neighbor of graph[vertex] || []) {
          if (!visited.has(neighbor)) {
            dfs(neighbor)
          }
        }
      }

      dfs(start)
      return result
    },

    bfs: (graph, start) => {
      this.stats.operations++
      const visited = new Set()
      const result = []
      const queue = [start]

      visited.add(start)

      while (queue.length > 0) {
        const vertex = queue.shift()
        result.push(vertex)

        for (const neighbor of graph[vertex] || []) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor)
            queue.push(neighbor)
          }
        }
      }

      return result
    },
  }

  // Utility methods
  _merge(left, right) {
    const result = []
    let i = 0,
      j = 0

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i])
        i++
      } else {
        result.push(right[j])
        j++
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j))
  }

  // Performance analysis
  benchmark(algorithm, data, iterations = 100) {
    const start = performance.now()

    for (let i = 0; i < iterations; i++) {
      algorithm(data)
    }

    const end = performance.now()
    return (end - start) / iterations
  }

  // Get statistics
  getStats() {
    return { ...this.stats }
  }

  // Reset statistics
  resetStats() {
    this.stats = {
      operations: 0,
      cacheHits: 0,
      cacheMisses: 0,
    }
  }
}

// Test the complete algorithm library
const lib = new AlgorithmLibrary()

console.log("--- Testing Algorithm Library ---")

// Test sorting
const testArray = [64, 34, 25, 12, 22, 11, 90]
console.log("Original array:", testArray)
console.log("Bubble sort:", lib.sort.bubble(testArray))
console.log("Quick sort:", lib.sort.quick(testArray))
console.log("Merge sort:", lib.sort.merge(testArray))

// Test searching
const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log("Linear search for 5:", lib.search.linear(sortedArray, 5))
console.log("Binary search for 5:", lib.search.binary(sortedArray, 5))

// Test dynamic programming
console.log("Fibonacci(10):", lib.dp.fibonacci(10))
console.log("LCS 'ABCDGH' and 'AEDFHR':", lib.dp.lcs("ABCDGH", "AEDFHR"))

// Test graph algorithms
const testGraph = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F"],
  D: [],
  E: ["F"],
  F: [],
}
console.log("DFS from A:", lib.graph.dfs(testGraph, "A"))
console.log("BFS from A:", lib.graph.bfs(testGraph, "A"))

console.log("Library stats:", lib.getStats())

// Final complexity cheat sheet
console.log("\n--- ALGORITHM COMPLEXITY CHEAT SHEET ---")
console.log("SORTING:")
console.log("  Bubble Sort:     O(n²) time, O(1) space")
console.log("  Selection Sort:  O(n²) time, O(1) space")
console.log("  Insertion Sort:  O(n²) time, O(1) space")
console.log("  Merge Sort:      O(n log n) time, O(n) space")
console.log("  Quick Sort:      O(n log n) avg, O(n²) worst time, O(log n) space")
console.log("  Heap Sort:       O(n log n) time, O(1) space")

console.log("\nSEARCHING:")
console.log("  Linear Search:   O(n) time, O(1) space")
console.log("  Binary Search:   O(log n) time, O(1) space")

console.log("\nGRAPH TRAVERSAL:")
console.log("  DFS:             O(V + E) time, O(V) space")
console.log("  BFS:             O(V + E) time, O(V) space")

console.log("\nDYNAMIC PROGRAMMING:")
console.log("  Fibonacci:       O(n) time, O(n) space with memoization")
console.log("  LCS:             O(mn) time, O(mn) space")
console.log("  Knapsack:        O(nW) time, O(nW) space")

console.log("\nDATA STRUCTURES:")
console.log("  Array:           Access O(1), Search O(n), Insert O(n), Delete O(n)")
console.log("  Linked List:     Access O(n), Search O(n), Insert O(1), Delete O(1)")
console.log("  Stack/Queue:     Push/Pop/Enqueue/Dequeue O(1)")
console.log("  Hash Table:      Search/Insert/Delete O(1) avg, O(n) worst")
console.log("  Binary Tree:     Search/Insert/Delete O(log n) avg, O(n) worst")
console.log("  Heap:            Insert/Delete O(log n), Find-min O(1)")

console.log("\n=== 🎉 CONGRATULATIONS! 🎉 ===")
console.log("You've completed the 4-week Daily Coding Challenge program!")
console.log("\n📊 SKILLS MASTERED:")
console.log("✅ Week 1: Fundamentals (Arrays, Strings, Objects)")
console.log("✅ Week 2: Intermediate Algorithms (Sorting, Searching, Two Pointers)")
console.log("✅ Week 3: Data Structures (Stacks, Queues, Trees, Graphs)")
console.log("✅ Week 4: Advanced Problem Solving (DP, Recursion, Greedy)")

console.log("\n🏆 ACHIEVEMENTS UNLOCKED:")
console.log("🔥 28-Day Coding Streak Champion")
console.log("🧠 Algorithm Master")
console.log("🏗️ Data Structure Architect")
console.log("⚡ Performance Optimizer")
console.log("🎯 Problem Solving Expert")

console.log("\n🚀 NEXT STEPS:")
console.log("• Practice on LeetCode, HackerRank, or Codewars")
console.log("• Participate in coding competitions")
console.log("• Build projects using these algorithms")
console.log("• Mentor others in their coding journey")
console.log("• Keep the daily practice habit alive!")

console.log("\n💪 You're now ready for technical interviews and advanced programming challenges!")

// DisjointSet class declaration
class DisjointSet {
  constructor(size) {
    this.parent = new Array(size).fill().map((_, i) => i)
    this.rank = new Array(size).fill(0)
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]) // Path compression
    }
    return this.parent[x]
  }

  union(x, y) {
    const rootX = this.find(x)
    const rootY = this.find(y)

    if (rootX !== rootY) {
      // Union by rank
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY
      } else {
        this.parent[rootY] = rootX
        this.rank[rootX]++
      }
    }
  }

  isConnected(x, y) {
    return this.find(x) === this.find(y)
  }
}
