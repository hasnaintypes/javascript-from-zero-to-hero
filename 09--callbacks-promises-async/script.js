// Callbacks, Promises & Async/Await - Practical Examples

console.log("=== Callbacks, Promises & Async/Await Demo ===")

// 1. Understanding Synchronous vs Asynchronous
console.log("\n--- Synchronous vs Asynchronous ---")

console.log("=== Synchronous Example ===")
console.log("First")
console.log("Second")
console.log("Third")

console.log("\n=== Asynchronous Example ===")
console.log("First")
setTimeout(() => console.log("Second (delayed)"), 0)
console.log("Third")

// 2. Basic Callbacks
console.log("\n--- Basic Callbacks ---")

function greetUser(name, callback) {
  console.log("Hello " + name)
  callback()
}

function afterGreeting() {
  console.log("Nice to meet you!")
}

console.log("Callback example:")
greetUser("Alice", afterGreeting)

// Callback with parameters
function processData(data, callback) {
  console.log("Processing:", data)
  const result = data.toUpperCase()
  callback(result)
}

processData("hello world", (result) => {
  console.log("Processed result:", result)
})

// 3. Asynchronous Callbacks
console.log("\n--- Asynchronous Callbacks ---")

function fetchUserData(userId, callback) {
  console.log(`Fetching user data for ID: ${userId}...`)

  // Simulate API call with setTimeout
  setTimeout(() => {
    const userData = {
      id: userId,
      name: "John Doe",
      email: "john@example.com",
      age: 30,
    }
    callback(userData)
  }, 1000)
}

console.log("Starting async callback example...")
fetchUserData(123, (user) => {
  console.log("User data received:", user)
})
console.log("This runs immediately (non-blocking)")

// 4. Error Handling with Callbacks
console.log("\n--- Error Handling with Callbacks ---")

function fetchData(url, callback) {
  console.log(`Fetching data from: ${url}`)

  setTimeout(() => {
    if (url.includes("error")) {
      callback(new Error("Failed to fetch data"), null)
    } else {
      callback(null, { data: `Data from ${url}`, timestamp: Date.now() })
    }
  }, 800)
}

// Success case
fetchData("https://api.example.com/users", (error, data) => {
  if (error) {
    console.error("Error:", error.message)
  } else {
    console.log("Success:", data)
  }
})

// Error case
fetchData("https://api.example.com/error", (error, data) => {
  if (error) {
    console.error("Error:", error.message)
  } else {
    console.log("Success:", data)
  }
})

// 5. Callback Hell Example
console.log("\n--- Callback Hell Example ---")

function getUser(userId, callback) {
  setTimeout(() => callback({ id: userId, name: "John" }), 300)
}

function getPosts(userId, callback) {
  setTimeout(() => callback([{ id: 1, title: "Post 1", userId }]), 300)
}

function getComments(postId, callback) {
  setTimeout(() => callback([{ id: 1, text: "Great post!", postId }]), 300)
}

function getLikes(commentId, callback) {
  setTimeout(() => callback([{ userId: 1, commentId }]), 300)
}

console.log("Callback hell example (nested callbacks):")
getUser(1, (user) => {
  console.log("Got user:", user)
  getPosts(user.id, (posts) => {
    console.log("Got posts:", posts)
    getComments(posts[0].id, (comments) => {
      console.log("Got comments:", comments)
      getLikes(comments[0].id, (likes) => {
        console.log("Got likes:", likes)
        console.log("Callback hell complete - notice the deep nesting!")
      })
    })
  })
})

// 6. Basic Promises
console.log("\n--- Basic Promises ---")

// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.3 // 70% chance of success

  setTimeout(() => {
    if (success) {
      resolve("Operation successful!")
    } else {
      reject(new Error("Operation failed!"))
    }
  }, 1000)
})

console.log("Promise example:")
myPromise
  .then((result) => {
    console.log("Promise resolved:", result)
  })
  .catch((error) => {
    console.error("Promise rejected:", error.message)
  })

// Promise that always resolves
const successPromise = Promise.resolve("Immediate success")
successPromise.then((result) => console.log("Immediate resolve:", result))

// Promise that always rejects
const failPromise = Promise.reject(new Error("Immediate failure"))
failPromise.catch((error) => console.log("Immediate reject:", error.message))

// 7. Promise Chaining
console.log("\n--- Promise Chaining ---")

function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: id, name: "Jane Doe" })
    }, 500)
  })
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "My First Post", userId: userId },
        { id: 2, title: "Another Post", userId: userId },
      ])
    }, 500)
  })
}

function fetchComments(postId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: "Great post!", postId: postId },
        { id: 2, text: "Thanks for sharing", postId: postId },
      ])
    }, 500)
  })
}

console.log("Promise chaining example:")
fetchUser(1)
  .then((user) => {
    console.log("Chained - User:", user)
    return fetchPosts(user.id)
  })
  .then((posts) => {
    console.log("Chained - Posts:", posts)
    return fetchComments(posts[0].id)
  })
  .then((comments) => {
    console.log("Chained - Comments:", comments)
    console.log("Promise chain complete!")
  })
  .catch((error) => {
    console.error("Error in promise chain:", error)
  })

// 8. Promise Utility Methods
console.log("\n--- Promise Utility Methods ---")

// Promise.all - wait for all to resolve
const promise1 = Promise.resolve(3)
const promise2 = new Promise((resolve) => setTimeout(() => resolve("foo"), 1000))
const promise3 = Promise.resolve(42)

console.log("Promise.all example:")
Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log("All promises resolved:", values)
  })
  .catch((error) => {
    console.error("One promise failed:", error)
  })

// Promise.allSettled - wait for all to settle
const mixedPromises = [Promise.resolve("Success 1"), Promise.reject("Error 1"), Promise.resolve("Success 2")]

console.log("Promise.allSettled example:")
Promise.allSettled(mixedPromises).then((results) => {
  console.log("All promises settled:")
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`  Promise ${index} succeeded: ${result.value}`)
    } else {
      console.log(`  Promise ${index} failed: ${result.reason}`)
    }
  })
})

// Promise.race - first to settle wins
const slowPromise = new Promise((resolve) => setTimeout(() => resolve("slow"), 2000))
const fastPromise = new Promise((resolve) => setTimeout(() => resolve("fast"), 1000))

console.log("Promise.race example:")
Promise.race([slowPromise, fastPromise]).then((result) => {
  console.log("First to finish:", result)
})

// 9. Basic Async/Await
console.log("\n--- Basic Async/Await ---")

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function asyncExample() {
  console.log("Async function start")

  await delay(1000)
  console.log("After 1 second")

  await delay(1000)
  console.log("After 2 seconds")

  return "Async function complete!"
}

console.log("Starting async/await example:")
asyncExample().then((result) => {
  console.log("Async result:", result)
})

// 10. Error Handling with Async/Await
console.log("\n--- Error Handling with Async/Await ---")

async function riskyOperation() {
  await delay(500)
  if (Math.random() > 0.5) {
    throw new Error("Random failure occurred!")
  }
  return "Risky operation succeeded!"
}

async function handleRiskyOperation() {
  try {
    console.log("Attempting risky operation...")
    const result = await riskyOperation()
    console.log("Success:", result)
  } catch (error) {
    console.error("Caught error:", error.message)
  } finally {
    console.log("Cleanup completed")
  }
}

handleRiskyOperation()

// 11. Converting Callback Hell to Async/Await
console.log("\n--- Converting Callback Hell to Async/Await ---")

// Promise versions of our callback functions
function getUserPromise(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: userId, name: "Alice" }), 200)
  })
}

function getPostsPromise(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ id: 1, title: "Alice's Post", userId }]), 200)
  })
}

function getCommentsPromise(postId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ id: 1, text: "Nice post!", postId }]), 200)
  })
}

function getLikesPromise(commentId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ userId: 2, commentId }]), 200)
  })
}

async function fetchAllData(userId) {
  try {
    console.log("Fetching all data with async/await...")

    const user = await getUserPromise(userId)
    console.log("User:", user)

    const posts = await getPostsPromise(user.id)
    console.log("Posts:", posts)

    const comments = await getCommentsPromise(posts[0].id)
    console.log("Comments:", comments)

    const likes = await getLikesPromise(comments[0].id)
    console.log("Likes:", likes)

    console.log("All data fetched successfully!")
    return { user, posts, comments, likes }
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

fetchAllData(1)

// 12. Parallel vs Sequential Execution
console.log("\n--- Parallel vs Sequential Execution ---")

async function sequentialFetch() {
  console.log("Sequential fetch started...")
  console.time("Sequential")

  const user1 = await getUserPromise(1)
  const user2 = await getUserPromise(2)
  const user3 = await getUserPromise(3)

  console.timeEnd("Sequential")
  console.log("Sequential results:", [user1, user2, user3])
  return [user1, user2, user3]
}

async function parallelFetch() {
  console.log("Parallel fetch started...")
  console.time("Parallel")

  const [user1, user2, user3] = await Promise.all([getUserPromise(1), getUserPromise(2), getUserPromise(3)])

  console.timeEnd("Parallel")
  console.log("Parallel results:", [user1, user2, user3])
  return [user1, user2, user3]
}

// Run both to compare timing
setTimeout(() => {
  sequentialFetch().then(() => {
    parallelFetch()
  })
}, 2000)

// 13. Real-World API Client Example
console.log("\n--- Real-World API Client ---")

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      console.log(`Making request to: ${url}`)

      // Simulate fetch (since we can't make real HTTP requests in this environment)
      await delay(500)

      // Simulate different responses
      if (endpoint.includes("error")) {
        throw new Error(`HTTP error! status: 404`)
      }

      // Simulate successful response
      const mockData = {
        "/users": [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" },
        ],
        "/posts": [
          { id: 1, title: "First Post", userId: 1 },
          { id: 2, title: "Second Post", userId: 2 },
        ],
      }

      return mockData[endpoint] || { message: "Success", endpoint }
    } catch (error) {
      console.error("API request failed:", error.message)
      throw error
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: "GET" })
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}

async function apiClientExample() {
  const api = new ApiClient("https://jsonplaceholder.typicode.com")

  try {
    console.log("API Client example:")

    const users = await api.get("/users")
    console.log("Users:", users)

    const posts = await api.get("/posts")
    console.log("Posts:", posts)

    const newPost = await api.post("/posts", {
      title: "My New Post",
      body: "This is the content",
      userId: 1,
    })
    console.log("New post created:", newPost)
  } catch (error) {
    console.error("API example failed:", error.message)
  }
}

setTimeout(() => apiClientExample(), 3000)

// 14. Retry Logic
console.log("\n--- Retry Logic ---")

async function retry(fn, maxAttempts = 3, delay = 1000) {
  let lastError

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxAttempts}`)
      return await fn()
    } catch (error) {
      lastError = error
      console.log(`Attempt ${attempt} failed: ${error.message}`)

      if (attempt < maxAttempts) {
        console.log(`Retrying in ${delay}ms...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
        delay *= 2 // Exponential backoff
      }
    }
  }

  throw lastError
}

async function unreliableOperation() {
  await delay(200)
  if (Math.random() < 0.7) {
    throw new Error("Random failure")
  }
  return "Operation succeeded!"
}

setTimeout(async () => {
  console.log("Retry logic example:")
  try {
    const result = await retry(unreliableOperation, 3, 500)
    console.log("Final result:", result)
  } catch (error) {
    console.error("All attempts failed:", error.message)
  }
}, 4000)

// 15. Timeout Wrapper
console.log("\n--- Timeout Wrapper ---")

function withTimeout(promise, timeoutMs) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeoutMs}ms`))
    }, timeoutMs)
  })

  return Promise.race([promise, timeout])
}

async function slowOperation() {
  await delay(3000)
  return "Finally done!"
}

setTimeout(async () => {
  console.log("Timeout wrapper example:")
  try {
    const result = await withTimeout(slowOperation(), 2000)
    console.log("Result:", result)
  } catch (error) {
    console.error("Timeout error:", error.message)
  }
}, 5000)

// 16. Advanced Promise Patterns
console.log("\n--- Advanced Promise Patterns ---")

// Promise queue for rate limiting
class PromiseQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  async add(promiseFunction) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        promiseFunction,
        resolve,
        reject,
      })
      this.process()
    })
  }

  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return
    }

    this.running++
    const { promiseFunction, resolve, reject } = this.queue.shift()

    try {
      const result = await promiseFunction()
      resolve(result)
    } catch (error) {
      reject(error)
    } finally {
      this.running--
      this.process()
    }
  }
}

// Usage example
const queue = new PromiseQueue(2) // Max 2 concurrent operations

async function simulateApiCall(id) {
  console.log(`Starting API call ${id}`)
  await delay(1000)
  console.log(`Completed API call ${id}`)
  return `Result ${id}`
}

setTimeout(async () => {
  console.log("Promise queue example:")

  const promises = []
  for (let i = 1; i <= 5; i++) {
    promises.push(queue.add(() => simulateApiCall(i)))
  }

  const results = await Promise.all(promises)
  console.log("Queue results:", results)
}, 6000)

// Debounced promise function
function debouncePromise(fn, delay) {
  let timeoutId
  let latestResolve
  let latestReject

  return function (...args) {
    return new Promise((resolve, reject) => {
      latestResolve = resolve
      latestReject = reject

      clearTimeout(timeoutId)
      timeoutId = setTimeout(async () => {
        try {
          const result = await fn.apply(this, args)
          latestResolve(result)
        } catch (error) {
          latestReject(error)
        }
      }, delay)
    })
  }
}

const debouncedSearch = debouncePromise(async (query) => {
  console.log(`Searching for: ${query}`)
  await delay(500)
  return `Results for "${query}"`
}, 300)

setTimeout(async () => {
  console.log("Debounced promise example:")

  // These calls will be debounced
  debouncedSearch("a")
  debouncedSearch("ab")
  const result = await debouncedSearch("abc")
  console.log("Debounced result:", result)
}, 7000)

console.log("\n=== End of Callbacks, Promises & Async/Await Demo ===")
