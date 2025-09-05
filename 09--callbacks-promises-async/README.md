# Callbacks, Promises & Async/Await

Asynchronous programming is essential for handling operations that take time, like API calls, file operations, or timers.

## Understanding Asynchronous JavaScript

JavaScript is single-threaded but can handle asynchronous operations through the event loop.

### Synchronous vs Asynchronous

\`\`\`javascript
// Synchronous - blocks execution
console.log("First");
console.log("Second");
console.log("Third");
// Output: First, Second, Third

// Asynchronous - doesn't block
console.log("First");
setTimeout(() => console.log("Second"), 0);
console.log("Third");
// Output: First, Third, Second
\`\`\`

## Callbacks

A callback is a function passed as an argument to another function, executed after some operation completes.

### Basic Callbacks

\`\`\`javascript
function greetUser(name, callback) {
    console.log("Hello " + name);
    callback();
}

function afterGreeting() {
    console.log("Nice to meet you!");
}

greetUser("John", afterGreeting);
// Output: Hello John
//         Nice to meet you!
\`\`\`

### Asynchronous Callbacks

\`\`\`javascript
function fetchUserData(userId, callback) {
    console.log("Fetching user data...");
    
    // Simulate API call
    setTimeout(() => {
        const userData = { id: userId, name: "John Doe", email: "john@example.com" };
        callback(userData);
    }, 1000);
}

fetchUserData(123, (user) => {
    console.log("User data received:", user);
});
\`\`\`

### Error Handling with Callbacks

\`\`\`javascript
function fetchData(url, callback) {
    setTimeout(() => {
        if (url.includes("error")) {
            callback(new Error("Failed to fetch data"), null);
        } else {
            callback(null, { data: "Some data from " + url });
        }
    }, 1000);
}

fetchData("https://api.example.com/users", (error, data) => {
    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("Success:", data);
    }
});
\`\`\`

### Callback Hell

When you have multiple nested callbacks, code becomes hard to read and maintain.

\`\`\`javascript
// Callback Hell Example
getUserData(userId, (user) => {
    getPostsByUser(user.id, (posts) => {
        getCommentsForPost(posts[0].id, (comments) => {
            getLikesForComment(comments[0].id, (likes) => {
                // This nesting gets out of hand quickly!
                console.log("Likes:", likes);
            });
        });
    });
});
\`\`\`

## Promises

Promises provide a cleaner way to handle asynchronous operations and avoid callback hell.

### Creating Promises

\`\`\`javascript
// Basic Promise
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    
    setTimeout(() => {
        if (success) {
            resolve("Operation successful!");
        } else {
            reject(new Error("Operation failed!"));
        }
    }, 1000);
});

// Using the Promise
myPromise
    .then(result => {
        console.log("Success:", result);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });
\`\`\`

### Promise States

Promises have three states:
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

\`\`\`javascript
function checkPromiseState() {
    const promise = new Promise((resolve, reject) => {
        // Promise is PENDING here
        
        setTimeout(() => {
            const random = Math.random();
            if (random > 0.5) {
                resolve("Success!"); // Promise becomes FULFILLED
            } else {
                reject("Failed!"); // Promise becomes REJECTED
            }
        }, 1000);
    });
    
    return promise;
}
\`\`\`

### Chaining Promises

\`\`\`javascript
function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: id, name: "John Doe" });
        }, 1000);
    });
}

function fetchPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1", userId: userId },
                { id: 2, title: "Post 2", userId: userId }
            ]);
        }, 1000);
    });
}

function fetchComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!", postId: postId },
                { id: 2, text: "Thanks for sharing", postId: postId }
            ]);
        }, 1000);
    });
}

// Promise chaining
fetchUser(1)
    .then(user => {
        console.log("User:", user);
        return fetchPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return fetchComments(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.error("Error in chain:", error);
    });
\`\`\`

### Promise Utility Methods

#### Promise.all()
Waits for all promises to resolve or any to reject.

\`\`\`javascript
const promise1 = Promise.resolve(3);
const promise2 = new Promise(resolve => setTimeout(() => resolve('foo'), 1000));
const promise3 = Promise.resolve(42);

Promise.all([promise1, promise2, promise3])
    .then(values => {
        console.log("All resolved:", values); // [3, 'foo', 42]
    })
    .catch(error => {
        console.error("One failed:", error);
    });
\`\`\`

#### Promise.allSettled()
Waits for all promises to settle (resolve or reject).

\`\`\`javascript
const promises = [
    Promise.resolve('Success 1'),
    Promise.reject('Error 1'),
    Promise.resolve('Success 2')
];

Promise.allSettled(promises)
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(\`Promise \${index} succeeded:, result.value\`);
            } else {
                console.log(\`Promise \${index} failed:, result.reason\`);
            }
        });
    });
\`\`\`

#### Promise.race()
Returns the first promise that settles.

\`\`\`javascript
const slowPromise = new Promise(resolve => setTimeout(() => resolve('slow'), 2000));
const fastPromise = new Promise(resolve => setTimeout(() => resolve('fast'), 1000));

Promise.race([slowPromise, fastPromise])
    .then(result => {
        console.log("First to finish:", result); // 'fast'
    });
\`\`\`

#### Promise.any()
Returns the first promise that fulfills.

\`\`\`javascript
const promises = [
    Promise.reject('Error 1'),
    Promise.resolve('Success 1'),
    Promise.resolve('Success 2')
];

Promise.any(promises)
    .then(result => {
        console.log("First success:", result); // 'Success 1'
    })
    .catch(error => {
        console.error("All failed:", error);
    });
\`\`\`

## Async/Await

Async/await provides a more readable way to work with promises, making asynchronous code look synchronous.

### Basic Async/Await

\`\`\`javascript
// Function that returns a promise
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Async function
async function example() {
    console.log("Start");
    
    await delay(1000); // Wait for 1 second
    console.log("After 1 second");
    
    await delay(1000); // Wait for another second
    console.log("After 2 seconds");
    
    return "Done!";
}

// Using async function
example().then(result => {
    console.log("Result:", result);
});
\`\`\`

### Error Handling with Try/Catch

\`\`\`javascript
async function fetchUserData(id) {
    try {
        const user = await fetchUser(id);
        console.log("User:", user);
        
        const posts = await fetchPosts(user.id);
        console.log("Posts:", posts);
        
        const comments = await fetchComments(posts[0].id);
        console.log("Comments:", comments);
        
        return { user, posts, comments };
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw if needed
    }
}

// Usage
fetchUserData(1)
    .then(data => console.log("All data:", data))
    .catch(error => console.error("Failed:", error));
\`\`\`

### Parallel vs Sequential Execution

\`\`\`javascript
// Sequential execution (slower)
async function sequentialFetch() {
    console.time("Sequential");
    
    const user1 = await fetchUser(1);
    const user2 = await fetchUser(2);
    const user3 = await fetchUser(3);
    
    console.timeEnd("Sequential");
    return [user1, user2, user3];
}

// Parallel execution (faster)
async function parallelFetch() {
    console.time("Parallel");
    
    const [user1, user2, user3] = await Promise.all([
        fetchUser(1),
        fetchUser(2),
        fetchUser(3)
    ]);
    
    console.timeEnd("Parallel");
    return [user1, user2, user3];
}
\`\`\`

## Real-World Examples

### 1. API Client

\`\`\`javascript
class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    
    async request(endpoint, options = {}) {
        const url = \`\${this.baseUrl}\${endpoint}\`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };
        
        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
    
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Usage
const api = new ApiClient('https://jsonplaceholder.typicode.com');

async function example() {
    try {
        const users = await api.get('/users');
        console.log('Users:', users);
        
        const newPost = await api.post('/posts', {
            title: 'My New Post',
            body: 'This is the content',
            userId: 1
        });
        console.log('New post:', newPost);
    } catch (error) {
        console.error('Example failed:', error);
    }
}
\`\`\`

### 2. Retry Logic

\`\`\`javascript
async function retry(fn, maxAttempts = 3, delay = 1000) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            console.log(\`Attempt \${attempt} failed:, error.message\`);
            
            if (attempt < maxAttempts) {
                console.log(\`Retrying in \${delay}ms...\`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff
            }
        }
    }
    
    throw lastError;
}

// Usage
async function unreliableOperation() {
    if (Math.random() < 0.7) {
        throw new Error("Random failure");
    }
    return "Success!";
}

retry(unreliableOperation, 3, 500)
    .then(result => console.log("Final result:", result))
    .catch(error => console.error("All attempts failed:", error));
\`\`\`

### 3. Timeout Wrapper

\`\`\`javascript
function withTimeout(promise, timeoutMs) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(\`Operation timed out after \${timeoutMs}ms\`));
        }, timeoutMs);
    });
    
    return Promise.race([promise, timeout]);
}

// Usage
async function slowOperation() {
    await delay(3000);
    return "Finally done!";
}

withTimeout(slowOperation(), 2000)
    .then(result => console.log("Result:", result))
    .catch(error => console.error("Error:", error.message));
\`\`\`

## Common Patterns and Best Practices

### 1. Always Handle Errors

\`\`\`javascript
// Bad - unhandled promise rejection
fetchData().then(data => console.log(data));

// Good - handle errors
fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Good - with async/await
async function handleData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
\`\`\`

### 2. Use Promise.all for Independent Operations

\`\`\`javascript
// Bad - sequential when operations are independent
const user = await fetchUser(id);
const settings = await fetchSettings(id);
const notifications = await fetchNotifications(id);

// Good - parallel execution
const [user, settings, notifications] = await Promise.all([
    fetchUser(id),
    fetchSettings(id),
    fetchNotifications(id)
]);
\`\`\`

### 3. Avoid Mixing Promises and Async/Await

\`\`\`javascript
// Bad - mixing styles
async function mixedStyle() {
    return fetchData().then(data => {
        return processData(data);
    });
}

// Good - consistent async/await
async function consistentStyle() {
    const data = await fetchData();
    return processData(data);
}
\`\`\`

### 4. Return Promises from Async Functions

\`\`\`javascript
// Async functions always return promises
async function getData() {
    return "data"; // This becomes Promise.resolve("data")
}

// Usage
getData().then(data => console.log(data));
\`\`\`

## Challenge Questions

1. What's the difference between callbacks and promises?
2. What is callback hell and how do promises solve it?
3. Explain the three states of a promise.
4. What's the difference between \`Promise.all()\` and \`Promise.allSettled()\`?
5. How does \`async/await\` make asynchronous code more readable?
6. When would you use sequential vs parallel execution?
7. How do you handle errors in async/await vs promises?
8. What happens if you don't await an async function call?
\`\`\`
\`\`\`
