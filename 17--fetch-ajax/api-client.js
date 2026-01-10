// API Client - Comprehensive fetch wrapper

class APIClient {
  constructor(baseURL = "", defaultOptions = {}) {
    this.baseURL = baseURL
    this.defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
      ...defaultOptions,
    }
  }

  // Create request with timeout
  createRequestWithTimeout(url, options) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || this.defaultOptions.timeout)

    const requestOptions = {
      ...this.defaultOptions,
      ...options,
      signal: controller.signal,
    }

    const request = fetch(url, requestOptions).finally(() => clearTimeout(timeoutId))

    return request
  }

  // Handle response
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.text()
      throw new APIError(`HTTP ${response.status}: ${response.statusText}`, response.status, errorData)
    }

    const contentType = response.headers.get("content-type")

    if (contentType && contentType.includes("application/json")) {
      return await response.json()
    } else if (contentType && contentType.includes("text/")) {
      return await response.text()
    } else {
      return await response.blob()
    }
  }

  // GET request
  async get(endpoint, options = {}) {
    try {
      const url = this.baseURL + endpoint
      const response = await this.createRequestWithTimeout(url, {
        method: "GET",
        ...options,
      })

      return await this.handleResponse(response)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // POST request
  async post(endpoint, data = null, options = {}) {
    try {
      const url = this.baseURL + endpoint
      const requestOptions = {
        method: "POST",
        ...options,
      }

      if (data) {
        if (data instanceof FormData) {
          // Don't set Content-Type for FormData, let browser set it
          delete requestOptions.headers["Content-Type"]
          requestOptions.body = data
        } else {
          requestOptions.body = JSON.stringify(data)
        }
      }

      const response = await this.createRequestWithTimeout(url, requestOptions)
      return await this.handleResponse(response)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // PUT request
  async put(endpoint, data = null, options = {}) {
    try {
      const url = this.baseURL + endpoint
      const response = await this.createRequestWithTimeout(url, {
        method: "PUT",
        body: data ? JSON.stringify(data) : null,
        ...options,
      })

      return await this.handleResponse(response)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // DELETE request
  async delete(endpoint, options = {}) {
    try {
      const url = this.baseURL + endpoint
      const response = await this.createRequestWithTimeout(url, {
        method: "DELETE",
        ...options,
      })

      return await this.handleResponse(response)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Handle errors
  handleError(error) {
    if (error.name === "AbortError") {
      return new APIError("Request timeout", 408, "Request was aborted due to timeout")
    }

    if (error instanceof APIError) {
      return error
    }

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return new APIError("Network error", 0, "Failed to fetch - check your internet connection")
    }

    return new APIError("Unknown error", 0, error.message)
  }

  // Utility method for query parameters
  buildQueryString(params) {
    const searchParams = new URLSearchParams()

    Object.keys(params).forEach((key) => {
      const value = params[key]
      if (value !== null && value !== undefined) {
        searchParams.append(key, value.toString())
      }
    })

    return searchParams.toString()
  }

  // GET with query parameters
  async getWithParams(endpoint, params = {}, options = {}) {
    const queryString = this.buildQueryString(params)
    const url = queryString ? `${endpoint}?${queryString}` : endpoint
    return this.get(url, options)
  }
}

// Custom error class
class APIError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = "APIError"
    this.status = status
    this.data = data
  }
}

// Demo usage with JSONPlaceholder API
console.log("=== Fetch API Demo ===")

const api = new APIClient("https://jsonplaceholder.typicode.com")

async function demoAPIOperations() {
  try {
    console.log("1. Fetching posts...")
    const posts = await api.get("/posts")
    console.log(`Fetched ${posts.length} posts`)
    console.log("First post:", posts[0])

    console.log("\n2. Fetching single post...")
    const post = await api.get("/posts/1")
    console.log("Post 1:", post)

    console.log("\n3. Creating new post...")
    const newPost = await api.post("/posts", {
      title: "My New Post",
      body: "This is the content of my new post",
      userId: 1,
    })
    console.log("Created post:", newPost)

    console.log("\n4. Updating post...")
    const updatedPost = await api.put("/posts/1", {
      id: 1,
      title: "Updated Post Title",
      body: "Updated post content",
      userId: 1,
    })
    console.log("Updated post:", updatedPost)

    console.log("\n5. Fetching with query parameters...")
    const userPosts = await api.getWithParams("/posts", { userId: 1 })
    console.log(`User 1 has ${userPosts.length} posts`)

    console.log("\n6. Deleting post...")
    await api.delete("/posts/1")
    console.log("Post deleted successfully")
  } catch (error) {
    console.error("API Error:", error.message)
    if (error instanceof APIError) {
      console.error("Status:", error.status)
      console.error("Data:", error.data)
    }
  }
}

// Advanced fetch examples
async function advancedFetchExamples() {
  console.log("\n=== Advanced Fetch Examples ===")

  // 1. Fetch with custom headers
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      headers: {
        Authorization: "Bearer your-token-here",
        "X-Custom-Header": "custom-value",
      },
    })

    const data = await response.json()
    console.log("Fetch with custom headers:", data.title)
  } catch (error) {
    console.error("Custom headers error:", error)
  }

  // 2. Fetch with FormData (file upload simulation)
  try {
    const formData = new FormData()
    formData.append("title", "Form Data Post")
    formData.append("content", "This post was sent using FormData")

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: formData,
    })

    const result = await response.json()
    console.log("FormData post result:", result)
  } catch (error) {
    console.error("FormData error:", error)
  }

  // 3. Parallel requests
  try {
    console.log("Making parallel requests...")
    const [users, posts, comments] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json()),
      fetch("https://jsonplaceholder.typicode.com/posts").then((r) => r.json()),
      fetch("https://jsonplaceholder.typicode.com/comments").then((r) => r.json()),
    ])

    console.log(`Parallel fetch results: ${users.length} users, ${posts.length} posts, ${comments.length} comments`)
  } catch (error) {
    console.error("Parallel requests error:", error)
  }

  // 4. Request with retry logic
  async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let i = 0; i <= maxRetries; i++) {
      try {
        const response = await fetch(url, options)
        if (response.ok) {
          return response
        }
        throw new Error(`HTTP ${response.status}`)
      } catch (error) {
        if (i === maxRetries) {
          throw error
        }
        console.log(`Retry ${i + 1}/${maxRetries} after error:`, error.message)
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1))) // Exponential backoff
      }
    }
  }

  try {
    const response = await fetchWithRetry("https://jsonplaceholder.typicode.com/posts/1")
    const data = await response.json()
    console.log("Retry fetch successful:", data.title)
  } catch (error) {
    console.error("Retry fetch failed:", error)
  }
}

// Cache implementation
class CachedAPIClient extends APIClient {
  constructor(baseURL, defaultOptions = {}) {
    super(baseURL, defaultOptions)
    this.cache = new Map()
    this.cacheTimeout = 5 * 60 * 1000 // 5 minutes
  }

  getCacheKey(url, options) {
    return `${url}_${JSON.stringify(options)}`
  }

  async get(endpoint, options = {}) {
    const cacheKey = this.getCacheKey(this.baseURL + endpoint, options)
    const cached = this.cache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log("Returning cached data for:", endpoint)
      return cached.data
    }

    const data = await super.get(endpoint, options)
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    })

    return data
  }

  clearCache() {
    this.cache.clear()
  }
}

// Demo cached API
async function demoCachedAPI() {
  console.log("\n=== Cached API Demo ===")

  const cachedAPI = new CachedAPIClient("https://jsonplaceholder.typicode.com")

  // First request - will fetch from server
  console.log("First request (from server):")
  const data1 = await cachedAPI.get("/posts/1")
  console.log("Title:", data1.title)

  // Second request - will use cache
  console.log("\nSecond request (from cache):")
  const data2 = await cachedAPI.get("/posts/1")
  console.log("Title:", data2.title)
}

// Run all demos
async function runAllDemos() {
  await demoAPIOperations()
  await advancedFetchExamples()
  await demoCachedAPI()
}

runAllDemos().catch(console.error)
