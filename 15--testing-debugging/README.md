# Testing & Debugging JavaScript

Testing and debugging are essential skills for writing reliable JavaScript applications. This section covers various testing approaches and debugging techniques.

## Learning Objectives
- Learn different types of testing
- Understand debugging techniques
- Write unit tests
- Use browser developer tools
- Handle errors gracefully

## Topics Covered

### 1. Types of Testing

#### Unit Testing

Testing individual functions or components in isolation.

\`\`\`javascript
// math.js
export function add(a, b) {
    return a + b;
}

export function divide(a, b) {
    if (b === 0) {
        throw new Error('Division by zero');
    }
    return a / b;
}

// math.test.js
import { add, divide } from './math.js';

// Simple test function
function test(description, testFn) {
    try {
        testFn();
        console.log(`✓ ${description}`);
    } catch (error) {
        console.error(`✗ ${description}: ${error.message}`);
    }
}

function expect(actual) {
    return {
        toBe: (expected) => {
            if (actual !== expected) {
                throw new Error(`Expected ${expected}, but got ${actual}`);
            }
        }
    };
}

// Test cases
test('add function adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
});

test('divide function divides two numbers', () => {
    expect(divide(10, 2)).toBe(5);
});

test('divide function throws error for division by zero', () => {
    try {
        divide(10, 0);
        throw new Error('Expected error was not thrown');
    } catch (error) {
        if (error.message !== 'Division by zero') {
            throw new Error(`Expected 'Division by zero', got '${error.message}'`);
        }
    }
});
\`\`\`

#### Integration Testing

Testing how different parts of your application work together.

\`\`\`javascript
// user-service.js
export class UserService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }
    
    async getUser(id) {
        const response = await this.apiClient.get(`/users/${id}`);
        return response.data;
    }
    
    async createUser(userData) {
        const response = await this.apiClient.post('/users', userData);
        return response.data;
    }
}

// api-client.js
export class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    
    async get(endpoint) {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        return { data: await response.json() };
    }
    
    async post(endpoint, data) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return { data: await response.json() };
    }
}

// Integration test
async function testUserServiceIntegration() {
    // Mock API client for testing
    const mockApiClient = {
        get: async (endpoint) => {
            if (endpoint === '/users/1') {
                return { data: { id: 1, name: 'John Doe' } };
            }
            throw new Error('User not found');
        },
        post: async (endpoint, data) => {
            if (endpoint === '/users') {
                return { data: { id: 2, ...data } };
            }
            throw new Error('Failed to create user');
        }
    };
    
    const userService = new UserService(mockApiClient);
    
    // Test getting a user
    const user = await userService.getUser(1);
    console.log('Retrieved user:', user);
    
    // Test creating a user
    const newUser = await userService.createUser({ name: 'Jane Doe' });
    console.log('Created user:', newUser);
}
\`\`\`

#### End-to-End (E2E) Testing

Testing complete user workflows in a real browser environment.

\`\`\`javascript
// e2e-test.js (using Playwright or similar)
import { test, expect } from '@playwright/test';

test('user can sign up and log in', async ({ page }) => {
    // Navigate to signup page
    await page.goto('/signup');
    
    // Fill out signup form
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('#signup-button');
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome');
    
    // Test logout
    await page.click('#logout-button');
    await expect(page).toHaveURL('/login');
    
    // Test login
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('#login-button');
    
    // Verify successful login
    await expect(page).toHaveURL('/dashboard');
});
\`\`\`

#### Manual Testing

Manual testing involves testing the application by hand to ensure it meets the requirements.

### 2. Testing Frameworks

#### Simple Test Framework

\`\`\`javascript
// Simple test framework
function test(description, fn) {
    try {
        fn();
        console.log(`✓ ${description}`);
    } catch (error) {
        console.log(`✗ ${description}: ${error.message}`);
    }
}

function expect(actual) {
    return {
        toBe: (expected) => {
            if (actual !== expected) {
                throw new Error(`Expected ${expected}, but got ${actual}`);
            }
        }
    };
}
\`\`\`

#### Jest

Popular testing framework with built-in assertions and mocking.

\`\`\`javascript
// package.json
{
    "scripts": {
        "test": "jest"
    },
    "devDependencies": {
        "jest": "^29.0.0"
    }
}

// math.test.js
import { add, divide } from './math.js';

describe('Math functions', () => {
    test('add should return sum of two numbers', () => {
        expect(add(2, 3)).toBe(5);
        expect(add(-1, 1)).toBe(0);
        expect(add(0, 0)).toBe(0);
    });
    
    test('divide should return quotient of two numbers', () => {
        expect(divide(10, 2)).toBe(5);
        expect(divide(9, 3)).toBe(3);
    });
    
    test('divide should throw error for division by zero', () => {
        expect(() => divide(10, 0)).toThrow('Division by zero');
    });
});

// Testing async functions
describe('Async functions', () => {
    test('async function resolves correctly', async () => {
        const result = await fetchUserData(1);
        expect(result).toEqual({ id: 1, name: 'John' });
    });
    
    test('async function rejects on error', async () => {
        await expect(fetchUserData(-1)).rejects.toThrow('Invalid user ID');
    });
});
\`\`\`

#### Vitest

Fast testing framework built for modern JavaScript.

\`\`\`javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom'
    }
});

// component.test.js
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Button from './Button';

test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
});

test('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledOnce();
});
\`\`\`

### 3. Debugging Techniques

#### Console Methods

\`\`\`javascript
function complexCalculation(data) {
    console.log('Input data:', data);
    
    const processed = data.map(item => {
        console.log('Processing item:', item);
        const result = item * 2 + 1;
        console.log('Result:', result);
        return result;
    });
    
    console.log('Final processed data:', processed);
    return processed;
}

// Better debugging with console methods
function debugExample() {
    console.group('User Processing');
    console.time('processing-time');
    
    const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    console.table(users);
    
    users.forEach(user => {
        console.count('user-processed');
        console.log(`Processing user: ${user.name}`);
    });
    
    console.timeEnd('processing-time');
    console.groupEnd();
}

// Conditional debugging
const DEBUG = process.env.NODE_ENV === 'development';

function debug(...args) {
    if (DEBUG) {
        console.log('[DEBUG]', ...args);
    }
}

function processData(data) {
    debug('Starting data processing', data);
    
    const result = data.filter(item => item.active);
    debug('Filtered data', result);
    
    return result;
}
\`\`\`

#### Breakpoints

Using breakpoints in your code can help you pause execution and inspect variables.

#### Step Debugging

Step through your code line by line to understand its execution flow.

#### Error Handling

\`\`\`javascript
// Custom error classes
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'NetworkError';
        this.statusCode = statusCode;
    }
}

// Error boundary for debugging
function withErrorHandling(fn) {
    return async function(...args) {
        try {
            return await fn.apply(this, args);
        } catch (error) {
            console.error('Function error:', {
                function: fn.name,
                arguments: args,
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    };
}

// Usage
const safeApiCall = withErrorHandling(async function apiCall(endpoint) {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new NetworkError(`API call failed: ${response.statusText}`, response.status);
    }
    return response.json();
});
\`\`\`

#### Performance Profiling

Use performance profiling tools to identify bottlenecks in your code.

### 4. Common Debugging Tools

- `console.log()`, `console.error()`, `console.warn()`
- `debugger` statement
- Browser DevTools
- Network tab
- Performance tab

## Exercises

1. Write unit tests for calculator functions
2. Debug a broken shopping cart
3. Create error handling for API calls
4. Performance test array operations

## Best Practices

- Write tests before code (TDD)
- Use descriptive test names
- Test edge cases
- Keep tests simple and focused
- Use proper error handling
\`\`\`


\`\`\`
