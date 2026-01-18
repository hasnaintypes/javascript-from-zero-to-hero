// Week 3: Data Structures - Daily Coding Challenges
// Focus: Stacks, queues, linked lists, trees, graphs

console.log("=== WEEK 3: DATA STRUCTURES ===\n")

// ==========================================
// DAY 15: STACKS IMPLEMENTATION & PROBLEMS
// ==========================================

console.log("DAY 15: Stacks Implementation & Problems")

// Stack Implementation
class Stack {
  constructor() {
    this.items = []
  }

  push(element) {
    this.items.push(element)
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty")
    }
    return this.items.pop()
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty")
    }
    return this.items[this.items.length - 1]
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }

  clear() {
    this.items = []
  }

  toArray() {
    return [...this.items]
  }
}

// Challenge 15.1: Valid Parentheses
function isValidParentheses(s) {
  const stack = new Stack()
  const pairs = {
    ")": "(",
    "}": "{",
    "]": "[",
  }

  for (const char of s) {
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char)
    } else if (char === ")" || char === "}" || char === "]") {
      if (stack.isEmpty() || stack.pop() !== pairs[char]) {
        return false
      }
    }
  }

  return stack.isEmpty()
}

// Challenge 15.2: Evaluate Reverse Polish Notation
function evalRPN(tokens) {
  const stack = new Stack()
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => Math.trunc(a / b),
  }

  for (const token of tokens) {
    if (operators[token]) {
      const b = stack.pop()
      const a = stack.pop()
      stack.push(operators[token](a, b))
    } else {
      stack.push(Number.parseInt(token))
    }
  }

  return stack.pop()
}

// Challenge 15.3: Daily Temperatures
function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0)
  const stack = new Stack() // Store indices

  for (let i = 0; i < temperatures.length; i++) {
    while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
      const index = stack.pop()
      result[index] = i - index
    }
    stack.push(i)
  }

  return result
}

// Test stack problems
console.log("Valid parentheses '()[]{}': ", isValidParentheses("()[]{}"))
console.log("Valid parentheses '([)]': ", isValidParentheses("([)]"))
console.log("RPN evaluation:", evalRPN(["2", "1", "+", "3", "*"]))
console.log("Daily temperatures:", dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))

// ==========================================
// DAY 16: QUEUES IMPLEMENTATION & PROBLEMS
// ==========================================

console.log("\nDAY 16: Queues Implementation & Problems")

// Queue Implementation
class Queue {
  constructor() {
    this.items = []
  }

  enqueue(element) {
    this.items.push(element)
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty")
    }
    return this.items.shift()
  }

  front() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty")
    }
    return this.items[0]
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }

  clear() {
    this.items = []
  }

  toArray() {
    return [...this.items]
  }
}

// Circular Queue Implementation (more efficient)
class CircularQueue {
  constructor(capacity) {
    this.capacity = capacity
    this.items = new Array(capacity)
    this.front = 0
    this.rear = 0
    this.count = 0
  }

  enqueue(element) {
    if (this.isFull()) {
      throw new Error("Queue is full")
    }

    this.items[this.rear] = element
    this.rear = (this.rear + 1) % this.capacity
    this.count++
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty")
    }

    const element = this.items[this.front]
    this.items[this.front] = undefined
    this.front = (this.front + 1) % this.capacity
    this.count--

    return element
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty")
    }
    return this.items[this.front]
  }

  isEmpty() {
    return this.count === 0
  }

  isFull() {
    return this.count === this.capacity
  }

  size() {
    return this.count
  }
}

// Challenge 16.1: Implement Stack using Queues
class StackUsingQueues {
  constructor() {
    this.queue1 = new Queue()
    this.queue2 = new Queue()
  }

  push(x) {
    this.queue1.enqueue(x)
  }

  pop() {
    if (this.queue1.isEmpty()) {
      throw new Error("Stack is empty")
    }

    // Move all elements except last to queue2
    while (this.queue1.size() > 1) {
      this.queue2.enqueue(this.queue1.dequeue())
    }

    const result = (this.queue1.dequeue()[
      // Swap queues
      (this.queue1, this.queue2)
    ] = [this.queue2, this.queue1])

    return result
  }

  top() {
    if (this.queue1.isEmpty()) {
      throw new Error("Stack is empty")
    }

    // Move all elements except last to queue2
    while (this.queue1.size() > 1) {
      this.queue2.enqueue(this.queue1.dequeue())
    }

    const result = this.queue1.front()
    this.queue2.enqueue(this.queue1.dequeue())[
      // Swap queues
      (this.queue1, this.queue2)
    ] = [this.queue2, this.queue1]

    return result
  }

  empty() {
    return this.queue1.isEmpty()
  }
}

// Challenge 16.2: Sliding Window Maximum
function maxSlidingWindow(nums, k) {
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

// Test queue problems
const stackFromQueues = new StackUsingQueues()
stackFromQueues.push(1)
stackFromQueues.push(2)
stackFromQueues.push(3)
console.log("Stack from queues - top:", stackFromQueues.top())
console.log("Stack from queues - pop:", stackFromQueues.pop())

console.log("Sliding window maximum:", maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))

// ==========================================
// DAY 17: LINKED LISTS IMPLEMENTATION
// ==========================================

console.log("\nDAY 17: Linked Lists Implementation")

// Node class for linked list
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val
    this.next = next
  }
}

// Singly Linked List Implementation
class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }

  // Add element to the end
  append(val) {
    const newNode = new ListNode(val)

    if (!this.head) {
      this.head = newNode
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = newNode
    }

    this.size++
  }

  // Add element to the beginning
  prepend(val) {
    const newNode = new ListNode(val, this.head)
    this.head = newNode
    this.size++
  }

  // Insert at specific index
  insert(index, val) {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of bounds")
    }

    if (index === 0) {
      this.prepend(val)
      return
    }

    const newNode = new ListNode(val)
    let current = this.head

    for (let i = 0; i < index - 1; i++) {
      current = current.next
    }

    newNode.next = current.next
    current.next = newNode
    this.size++
  }

  // Remove element at index
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds")
    }

    if (index === 0) {
      const removedVal = this.head.val
      this.head = this.head.next
      this.size--
      return removedVal
    }

    let current = this.head
    for (let i = 0; i < index - 1; i++) {
      current = current.next
    }

    const removedVal = current.next.val
    current.next = current.next.next
    this.size--
    return removedVal
  }

  // Find element
  find(val) {
    let current = this.head
    let index = 0

    while (current) {
      if (current.val === val) {
        return index
      }
      current = current.next
      index++
    }

    return -1
  }

  // Get element at index
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds")
    }

    let current = this.head
    for (let i = 0; i < index; i++) {
      current = current.next
    }

    return current.val
  }

  // Convert to array
  toArray() {
    const result = []
    let current = this.head

    while (current) {
      result.push(current.val)
      current = current.next
    }

    return result
  }

  // Get size
  getSize() {
    return this.size
  }

  // Check if empty
  isEmpty() {
    return this.size === 0
  }
}

// Challenge 17.1: Reverse Linked List
function reverseList(head) {
  let prev = null
  let current = head

  while (current) {
    const nextTemp = current.next
    current.next = prev
    prev = current
    current = nextTemp
  }

  return prev
}

// Challenge 17.2: Merge Two Sorted Lists
function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0)
  let current = dummy

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1
      list1 = list1.next
    } else {
      current.next = list2
      list2 = list2.next
    }
    current = current.next
  }

  // Attach remaining nodes
  current.next = list1 || list2

  return dummy.next
}

// Challenge 17.3: Detect Cycle in Linked List
function hasCycle(head) {
  if (!head || !head.next) return false

  let slow = head
  let fast = head.next

  while (fast && fast.next) {
    if (slow === fast) return true

    slow = slow.next
    fast = fast.next.next
  }

  return false
}

// Helper function to create linked list from array
function createLinkedList(arr) {
  if (arr.length === 0) return null

  const head = new ListNode(arr[0])
  let current = head

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i])
    current = current.next
  }

  return head
}

// Helper function to convert linked list to array
function linkedListToArray(head) {
  const result = []
  let current = head

  while (current) {
    result.push(current.val)
    current = current.next
  }

  return result
}

// Test linked list operations
const list = new LinkedList()
list.append(1)
list.append(2)
list.append(3)
list.prepend(0)
console.log("Linked list:", list.toArray())

const testList = createLinkedList([1, 2, 3, 4, 5])
const reversed = reverseList(testList)
console.log("Reversed list:", linkedListToArray(reversed))

const list1 = createLinkedList([1, 2, 4])
const list2 = createLinkedList([1, 3, 4])
const merged = mergeTwoLists(list1, list2)
console.log("Merged lists:", linkedListToArray(merged))

// ==========================================
// DAY 18: TREES IMPLEMENTATION & TRAVERSAL
// ==========================================

console.log("\nDAY 18: Trees Implementation & Traversal")

// Binary Tree Node
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

// Binary Search Tree Implementation
class BinarySearchTree {
  constructor() {
    this.root = null
  }

  // Insert a value
  insert(val) {
    this.root = this._insertNode(this.root, val)
  }

  _insertNode(node, val) {
    if (!node) {
      return new TreeNode(val)
    }

    if (val < node.val) {
      node.left = this._insertNode(node.left, val)
    } else if (val > node.val) {
      node.right = this._insertNode(node.right, val)
    }

    return node
  }

  // Search for a value
  search(val) {
    return this._searchNode(this.root, val)
  }

  _searchNode(node, val) {
    if (!node || node.val === val) {
      return node
    }

    if (val < node.val) {
      return this._searchNode(node.left, val)
    } else {
      return this._searchNode(node.right, val)
    }
  }

  // Delete a value
  delete(val) {
    this.root = this._deleteNode(this.root, val)
  }

  _deleteNode(node, val) {
    if (!node) return null

    if (val < node.val) {
      node.left = this._deleteNode(node.left, val)
    } else if (val > node.val) {
      node.right = this._deleteNode(node.right, val)
    } else {
      // Node to delete found
      if (!node.left) return node.right
      if (!node.right) return node.left

      // Node has two children
      const minRight = this._findMin(node.right)
      node.val = minRight.val
      node.right = this._deleteNode(node.right, minRight.val)
    }

    return node
  }

  _findMin(node) {
    while (node.left) {
      node = node.left
    }
    return node
  }

  // Tree traversals
  inorderTraversal() {
    const result = []
    this._inorder(this.root, result)
    return result
  }

  _inorder(node, result) {
    if (node) {
      this._inorder(node.left, result)
      result.push(node.val)
      this._inorder(node.right, result)
    }
  }

  preorderTraversal() {
    const result = []
    this._preorder(this.root, result)
    return result
  }

  _preorder(node, result) {
    if (node) {
      result.push(node.val)
      this._preorder(node.left, result)
      this._preorder(node.right, result)
    }
  }

  postorderTraversal() {
    const result = []
    this._postorder(this.root, result)
    return result
  }

  _postorder(node, result) {
    if (node) {
      this._postorder(node.left, result)
      this._postorder(node.right, result)
      result.push(node.val)
    }
  }

  // Level order traversal (BFS)
  levelOrder() {
    if (!this.root) return []

    const result = []
    const queue = [this.root]

    while (queue.length > 0) {
      const levelSize = queue.length
      const currentLevel = []

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift()
        currentLevel.push(node.val)

        if (node.left) queue.push(node.left)
        if (node.right) queue.push(node.right)
      }

      result.push(currentLevel)
    }

    return result
  }

  // Get maximum depth
  maxDepth() {
    return this._getDepth(this.root)
  }

  _getDepth(node) {
    if (!node) return 0

    const leftDepth = this._getDepth(node.left)
    const rightDepth = this._getDepth(node.right)

    return Math.max(leftDepth, rightDepth) + 1
  }

  // Validate BST
  isValidBST() {
    return this._isValid(this.root, null, null)
  }

  _isValid(node, min, max) {
    if (!node) return true

    if ((min !== null && node.val <= min) || (max !== null && node.val >= max)) {
      return false
    }

    return this._isValid(node.left, min, node.val) && this._isValid(node.right, node.val, max)
  }
}

// Challenge 18.1: Maximum Depth of Binary Tree
function maxDepth(root) {
  if (!root) return 0

  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}

// Challenge 18.2: Same Tree
function isSameTree(p, q) {
  if (!p && !q) return true
  if (!p || !q) return false

  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

// Challenge 18.3: Symmetric Tree
function isSymmetric(root) {
  if (!root) return true

  function isMirror(left, right) {
    if (!left && !right) return true
    if (!left || !right) return false

    return left.val === right.val && isMirror(left.left, right.right) && isMirror(left.right, right.left)
  }

  return isMirror(root.left, root.right)
}

// Test BST operations
const bst = new BinarySearchTree()
const values = [5, 3, 7, 2, 4, 6, 8]
values.forEach((val) => bst.insert(val))

console.log("BST Inorder:", bst.inorderTraversal())
console.log("BST Preorder:", bst.preorderTraversal())
console.log("BST Postorder:", bst.postorderTraversal())
console.log("BST Level order:", bst.levelOrder())
console.log("BST Max depth:", bst.maxDepth())
console.log("Is valid BST:", bst.isValidBST())

// ==========================================
// DAY 19: GRAPH TRAVERSAL (BFS/DFS)
// ==========================================

console.log("\nDAY 19: Graph Traversal (BFS/DFS)")

// Graph Implementation (Adjacency List)
class Graph {
  constructor() {
    this.adjacencyList = new Map()
  }

  // Add vertex
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, [])
    }
  }

  // Add edge
  addEdge(vertex1, vertex2) {
    this.addVertex(vertex1)
    this.addVertex(vertex2)

    this.adjacencyList.get(vertex1).push(vertex2)
    this.adjacencyList.get(vertex2).push(vertex1) // Undirected graph
  }

  // Remove edge
  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList.has(vertex1)) {
      this.adjacencyList.set(
        vertex1,
        this.adjacencyList.get(vertex1).filter((v) => v !== vertex2),
      )
    }

    if (this.adjacencyList.has(vertex2)) {
      this.adjacencyList.set(
        vertex2,
        this.adjacencyList.get(vertex2).filter((v) => v !== vertex1),
      )
    }
  }

  // Remove vertex
  removeVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) return

    // Remove all edges to this vertex
    for (const adjacentVertex of this.adjacencyList.get(vertex)) {
      this.removeEdge(vertex, adjacentVertex)
    }

    // Remove the vertex
    this.adjacencyList.delete(vertex)
  }

  // Depth-First Search (DFS) - Recursive
  dfsRecursive(startVertex) {
    const result = []
    const visited = new Set()

    const dfs = (vertex) => {
      if (!vertex) return

      visited.add(vertex)
      result.push(vertex)

      for (const neighbor of this.adjacencyList.get(vertex) || []) {
        if (!visited.has(neighbor)) {
          dfs(neighbor)
        }
      }
    }

    dfs(startVertex)
    return result
  }

  // Depth-First Search (DFS) - Iterative
  dfsIterative(startVertex) {
    const result = []
    const visited = new Set()
    const stack = [startVertex]

    while (stack.length > 0) {
      const vertex = stack.pop()

      if (!visited.has(vertex)) {
        visited.add(vertex)
        result.push(vertex)

        // Add neighbors to stack (in reverse order for consistent traversal)
        const neighbors = this.adjacencyList.get(vertex) || []
        for (let i = neighbors.length - 1; i >= 0; i--) {
          if (!visited.has(neighbors[i])) {
            stack.push(neighbors[i])
          }
        }
      }
    }

    return result
  }

  // Breadth-First Search (BFS)
  bfs(startVertex) {
    const result = []
    const visited = new Set()
    const queue = [startVertex]

    visited.add(startVertex)

    while (queue.length > 0) {
      const vertex = queue.shift()
      result.push(vertex)

      for (const neighbor of this.adjacencyList.get(vertex) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          queue.push(neighbor)
        }
      }
    }

    return result
  }

  // Find shortest path between two vertices (BFS)
  shortestPath(startVertex, endVertex) {
    if (startVertex === endVertex) return [startVertex]

    const visited = new Set()
    const queue = [[startVertex]]
    visited.add(startVertex)

    while (queue.length > 0) {
      const path = queue.shift()
      const vertex = path[path.length - 1]

      for (const neighbor of this.adjacencyList.get(vertex) || []) {
        if (!visited.has(neighbor)) {
          const newPath = [...path, neighbor]

          if (neighbor === endVertex) {
            return newPath
          }

          visited.add(neighbor)
          queue.push(newPath)
        }
      }
    }

    return null // No path found
  }

  // Check if graph is connected
  isConnected() {
    const vertices = Array.from(this.adjacencyList.keys())
    if (vertices.length === 0) return true

    const visited = this.dfsRecursive(vertices[0])
    return visited.length === vertices.length
  }

  // Detect cycle in undirected graph
  hasCycle() {
    const visited = new Set()

    const dfs = (vertex, parent) => {
      visited.add(vertex)

      for (const neighbor of this.adjacencyList.get(vertex) || []) {
        if (!visited.has(neighbor)) {
          if (dfs(neighbor, vertex)) return true
        } else if (neighbor !== parent) {
          return true // Back edge found
        }
      }

      return false
    }

    for (const vertex of this.adjacencyList.keys()) {
      if (!visited.has(vertex)) {
        if (dfs(vertex, null)) return true
      }
    }

    return false
  }

  // Get all vertices
  getVertices() {
    return Array.from(this.adjacencyList.keys())
  }

  // Get neighbors of a vertex
  getNeighbors(vertex) {
    return this.adjacencyList.get(vertex) || []
  }

  // Display graph
  display() {
    for (const [vertex, neighbors] of this.adjacencyList) {
      console.log(`${vertex} -> ${neighbors.join(", ")}`)
    }
  }
}

// Challenge 19.1: Number of Islands (2D Grid DFS)
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0

  const rows = grid.length
  const cols = grid[0].length
  let count = 0

  const dfs = (row, col) => {
    if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === "0") {
      return
    }

    grid[row][col] = "0" // Mark as visited

    // Explore all 4 directions
    dfs(row + 1, col)
    dfs(row - 1, col)
    dfs(row, col + 1)
    dfs(row, col - 1)
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "1") {
        count++
        dfs(row, col)
      }
    }
  }

  return count
}

// Challenge 19.2: Course Schedule (Topological Sort)
function canFinish(numCourses, prerequisites) {
  const graph = new Map()
  const inDegree = new Array(numCourses).fill(0)

  // Build graph and calculate in-degrees
  for (const [course, prereq] of prerequisites) {
    if (!graph.has(prereq)) {
      graph.set(prereq, [])
    }
    graph.get(prereq).push(course)
    inDegree[course]++
  }

  // Find courses with no prerequisites
  const queue = []
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i)
    }
  }

  let completed = 0

  while (queue.length > 0) {
    const course = queue.shift()
    completed++

    // Process dependent courses
    for (const dependent of graph.get(course) || []) {
      inDegree[dependent]--
      if (inDegree[dependent] === 0) {
        queue.push(dependent)
      }
    }
  }

  return completed === numCourses
}

// Test graph operations
const graph = new Graph()

// Add vertices and edges
const vertices = ["A", "B", "C", "D", "E", "F"]
vertices.forEach((v) => graph.addVertex(v))

graph.addEdge("A", "B")
graph.addEdge("A", "C")
graph.addEdge("B", "D")
graph.addEdge("C", "E")
graph.addEdge("D", "E")
graph.addEdge("D", "F")
graph.addEdge("E", "F")

console.log("Graph structure:")
graph.display()

console.log("DFS Recursive from A:", graph.dfsRecursive("A"))
console.log("DFS Iterative from A:", graph.dfsIterative("A"))
console.log("BFS from A:", graph.bfs("A"))
console.log("Shortest path A to F:", graph.shortestPath("A", "F"))
console.log("Is connected:", graph.isConnected())
console.log("Has cycle:", graph.hasCycle())

// Test island counting
const islandGrid = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"],
]
console.log("Number of islands:", numIslands(islandGrid))

// Test course scheduling
console.log("Can finish courses:", canFinish(2, [[1, 0]]))
console.log(
  "Can finish courses (cycle):",
  canFinish(2, [
    [1, 0],
    [0, 1],
  ]),
)

// ==========================================
// DAY 20: ADVANCED TREE PROBLEMS
// ==========================================

console.log("\nDAY 20: Advanced Tree Problems")

// Challenge 20.1: Lowest Common Ancestor
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) {
    return root
  }

  const left = lowestCommonAncestor(root.left, p, q)
  const right = lowestCommonAncestor(root.right, p, q)

  if (left && right) return root
  return left || right
}

// Challenge 20.2: Binary Tree Right Side View
function rightSideView(root) {
  if (!root) return []

  const result = []
  const queue = [root]

  while (queue.length > 0) {
    const levelSize = queue.length

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()

      // Add the rightmost node of each level
      if (i === levelSize - 1) {
        result.push(node.val)
      }

      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
  }

  return result
}

// Challenge 20.3: Serialize and Deserialize Binary Tree
class Codec {
  // Serialize tree to string
  serialize(root) {
    const result = []

    const preorder = (node) => {
      if (!node) {
        result.push("null")
        return
      }

      result.push(node.val.toString())
      preorder(node.left)
      preorder(node.right)
    }

    preorder(root)
    return result.join(",")
  }

  // Deserialize string to tree
  deserialize(data) {
    const values = data.split(",")
    let index = 0

    const buildTree = () => {
      if (index >= values.length || values[index] === "null") {
        index++
        return null
      }

      const node = new TreeNode(Number.parseInt(values[index]))
      index++

      node.left = buildTree()
      node.right = buildTree()

      return node
    }

    return buildTree()
  }
}

// Challenge 20.4: Path Sum III
function pathSum(root, targetSum) {
  if (!root) return 0

  let count = 0

  const dfs = (node, currentSum) => {
    if (!node) return

    currentSum += node.val

    if (currentSum === targetSum) {
      count++
    }

    dfs(node.left, currentSum)
    dfs(node.right, currentSum)
  }

  const traverse = (node) => {
    if (!node) return

    dfs(node, 0) // Start new path from current node
    traverse(node.left) // Continue to left subtree
    traverse(node.right) // Continue to right subtree
  }

  traverse(root)
  return count
}

// Test advanced tree problems
const testTree = new TreeNode(3)
testTree.left = new TreeNode(5)
testTree.right = new TreeNode(1)
testTree.left.left = new TreeNode(6)
testTree.left.right = new TreeNode(2)
testTree.right.left = new TreeNode(0)
testTree.right.right = new TreeNode(8)
testTree.left.right.left = new TreeNode(7)
testTree.left.right.right = new TreeNode(4)

console.log("Right side view:", rightSideView(testTree))

const codec = new Codec()
const serialized = codec.serialize(testTree)
console.log("Serialized tree:", serialized)
const deserialized = codec.deserialize(serialized)
console.log("Deserialized tree (inorder):", bst.inorderTraversal.call({ root: deserialized }))

// ==========================================
// DAY 21: WEEKLY REVIEW & COMPLEX IMPLEMENTATIONS
// ==========================================

console.log("\nDAY 21: Weekly Review & Complex Implementations")

// Advanced Data Structure: Trie (Prefix Tree)
class TrieNode {
  constructor() {
    this.children = new Map()
    this.isEndOfWord = false
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode()
  }

  // Insert word
  insert(word) {
    let current = this.root

    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode())
      }
      current = current.children.get(char)
    }

    current.isEndOfWord = true
  }

  // Search for word
  search(word) {
    let current = this.root

    for (const char of word) {
      if (!current.children.has(char)) {
        return false
      }
      current = current.children.get(char)
    }

    return current.isEndOfWord
  }

  // Check if any word starts with prefix
  startsWith(prefix) {
    let current = this.root

    for (const char of prefix) {
      if (!current.children.has(char)) {
        return false
      }
      current = current.children.get(char)
    }

    return true
  }

  // Get all words with given prefix
  getWordsWithPrefix(prefix) {
    let current = this.root

    // Navigate to prefix end
    for (const char of prefix) {
      if (!current.children.has(char)) {
        return []
      }
      current = current.children.get(char)
    }

    // Collect all words from this point
    const words = []

    const dfs = (node, currentWord) => {
      if (node.isEndOfWord) {
        words.push(prefix + currentWord)
      }

      for (const [char, childNode] of node.children) {
        dfs(childNode, currentWord + char)
      }
    }

    dfs(current, "")
    return words
  }

  // Delete word
  delete(word) {
    const deleteHelper = (node, word, index) => {
      if (index === word.length) {
        if (!node.isEndOfWord) return false

        node.isEndOfWord = false
        return node.children.size === 0
      }

      const char = word[index]
      const childNode = node.children.get(char)

      if (!childNode) return false

      const shouldDeleteChild = deleteHelper(childNode, word, index + 1)

      if (shouldDeleteChild) {
        node.children.delete(char)
        return node.children.size === 0 && !node.isEndOfWord
      }

      return false
    }

    deleteHelper(this.root, word, 0)
  }
}

// Advanced Data Structure: Disjoint Set (Union-Find)
class DisjointSet {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i)
    this.rank = new Array(size).fill(0)
    this.components = size
  }

  // Find with path compression
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]) // Path compression
    }
    return this.parent[x]
  }

  // Union by rank
  union(x, y) {
    const rootX = this.find(x)
    const rootY = this.find(y)

    if (rootX === rootY) return false

    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX
    } else {
      this.parent[rootY] = rootX
      this.rank[rootX]++
    }

    this.components--
    return true
  }

  // Check if connected
  isConnected(x, y) {
    return this.find(x) === this.find(y)
  }

  // Get number of components
  getComponents() {
    return this.components
  }
}

// Complex Problem: Design Twitter
class Twitter {
  constructor() {
    this.tweets = [] // [userId, tweetId, timestamp]
    this.following = new Map() // userId -> Set of followeeIds
    this.tweetId = 0
  }

  postTweet(userId, tweetId) {
    this.tweets.push([userId, tweetId, this.tweetId++])
  }

  getNewsFeed(userId) {
    const followees = this.following.get(userId) || new Set()
    followees.add(userId) // Include own tweets

    const relevantTweets = this.tweets
      .filter(([tweetUserId]) => followees.has(tweetUserId))
      .sort((a, b) => b[2] - a[2]) // Sort by timestamp descending
      .slice(0, 10) // Get most recent 10
      .map(([, tweetId]) => tweetId)

    return relevantTweets
  }

  follow(followerId, followeeId) {
    if (!this.following.has(followerId)) {
      this.following.set(followerId, new Set())
    }
    this.following.get(followerId).add(followeeId)
  }

  unfollow(followerId, followeeId) {
    if (this.following.has(followerId)) {
      this.following.get(followerId).delete(followeeId)
    }
  }
}

// Test advanced data structures
console.log("--- Testing Trie ---")
const trie = new Trie()
const words = ["apple", "app", "apricot", "banana", "band", "bandana"]
words.forEach((word) => trie.insert(word))

console.log("Search 'app':", trie.search("app"))
console.log("Search 'apple':", trie.search("apple"))
console.log("Starts with 'app':", trie.startsWith("app"))
console.log("Words with prefix 'ban':", trie.getWordsWithPrefix("ban"))

console.log("--- Testing Disjoint Set ---")
const ds = new DisjointSet(5)
console.log("Initial components:", ds.getComponents())
ds.union(0, 1)
ds.union(2, 3)
console.log("After unions:", ds.getComponents())
console.log("0 and 1 connected:", ds.isConnected(0, 1))
console.log("0 and 2 connected:", ds.isConnected(0, 2))

console.log("--- Testing Twitter Design ---")
const twitter = new Twitter()
twitter.postTweet(1, 5)
twitter.postTweet(1, 3)
twitter.postTweet(2, 6)
twitter.follow(1, 2)
console.log("User 1 news feed:", twitter.getNewsFeed(1))

// Data Structure Performance Summary
console.log("\n--- Data Structure Performance Summary ---")
console.log("Array:")
console.log("  Access: O(1), Search: O(n), Insert: O(n), Delete: O(n)")
console.log("Linked List:")
console.log("  Access: O(n), Search: O(n), Insert: O(1), Delete: O(1)")
console.log("Stack/Queue:")
console.log("  Push/Pop/Enqueue/Dequeue: O(1)")
console.log("Binary Search Tree:")
console.log("  Search/Insert/Delete: O(log n) avg, O(n) worst")
console.log("Hash Table:")
console.log("  Search/Insert/Delete: O(1) avg, O(n) worst")
console.log("Trie:")
console.log("  Search/Insert/Delete: O(m) where m is key length")
console.log("Disjoint Set:")
console.log("  Find/Union: O(α(n)) amortized (nearly constant)")

console.log("\n=== WEEK 3 COMPLETE! ===")
console.log("🎉 Outstanding! You've mastered data structures!")
console.log("📈 Skills gained: Stacks, Queues, Linked Lists, Trees, Graphs, Tries")
console.log("🚀 Final week ahead: Advanced Problem Solving!")
