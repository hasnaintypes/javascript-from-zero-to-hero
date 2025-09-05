# Fetch API & AJAX

## Learning Objectives
- Understand HTTP requests and responses
- Master the Fetch API
- Handle asynchronous operations
- Work with JSON data
- Implement error handling for network requests

## Topics Covered

### 1. HTTP Basics
- HTTP methods (GET, POST, PUT, DELETE)
- Status codes (200, 404, 500, etc.)
- Headers and content types
- Request and response structure

### 2. Fetch API
\`\`\`javascript
// Basic GET request
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// POST request with data
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'John', email: 'john@example.com' })
})
.then(response => response.json())
.then(data => console.log(data));
\`\`\`

### 3. Async/Await with Fetch
\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
\`\`\`

### 4. Error Handling
- Network errors
- HTTP error status codes
- JSON parsing errors
- Timeout handling

## Exercises
1. Build a weather app using a public API
2. Create a user management system with CRUD operations
3. Implement search functionality with debouncing
4. Build a news reader app

## Best Practices
- Always handle errors
- Check response status
- Use appropriate HTTP methods
- Implement loading states
- Add request timeouts
- Cache responses when appropriate
\`\`\`

\`\`\`


\`\`\`


\`\`\`
