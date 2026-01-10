# Error Handling

Proper error handling is crucial for building robust JavaScript applications that can gracefully handle unexpected situations.

## Types of Errors

### 1. Syntax Errors
Errors in code structure that prevent execution.

```javascript
// Syntax errors (these won't run)
// console.log("Hello World"; // Missing closing parenthesis
// let 123var = "invalid"; // Invalid variable name
// function() { } // Missing function name
```

### 2. Runtime Errors
Errors that occur during code execution.

```javascript
// ReferenceError
console.log(undefinedVariable); // ReferenceError: undefinedVariable is not defined

// TypeError
let obj = null;
console.log(obj.property); // TypeError: Cannot read property of null

// RangeError
let arr = new Array(-1); // RangeError: Invalid array length
```

### 3. Logical Errors
Code runs but produces incorrect results.

```javascript
// Logical error - should be <= not <
function isValidAge(age) {
    return age > 0 && age < 120; // Bug: excludes age 120
}

// Should be:
function isValidAge(age) {
    return age > 0 && age <= 120;
}
```

## Try-Catch-Finally

The primary mechanism for handling errors in JavaScript.

### Basic Try-Catch

```javascript
try {
    // Code that might throw an error
    let result = riskyOperation();
    console.log("Success:", result);
} catch (error) {
    // Handle the error
    console.error("An error occurred:", error.message);
}

function riskyOperation() {
    if (Math.random() > 0.5) {
        throw new Error("Random failure!");
    }
    return "Success!";
}
```

### Try-Catch-Finally

```javascript
function processFile(filename) {
    let file = null;
    
    try {
        file = openFile(filename);
        let data = file.read();
        return processData(data);
    } catch (error) {
        console.error("Error processing file:", error.message);
        return null;
    } finally {
        // Always executes, regardless of success or failure
        if (file) {
            file.close();
            console.log("File closed");
        }
    }
}
```

### Catching Specific Error Types

```javascript
try {
    someOperation();
} catch (error) {
    if (error instanceof TypeError) {
        console.error("Type error:", error.message);
    } else if (error instanceof ReferenceError) {
        console.error("Reference error:", error.message);
    } else if (error instanceof RangeError) {
        console.error("Range error:", error.message);
    } else {
        console.error("Unknown error:", error.message);
    }
}
```

## Throwing Errors

### Basic Error Throwing

```javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed");
    }
    return a / b;
}

try {
    let result = divide(10, 0);
} catch (error) {
    console.error(error.message); // "Division by zero is not allowed"
}
```

### Custom Error Types

```javascript
// Custom error class
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "NetworkError";
        this.statusCode = statusCode;
    }
}

// Usage
function validateUser(user) {
    if (!user.email) {
        throw new ValidationError("Email is required", "email");
    }
    
    if (!user.email.includes("@")) {
        throw new ValidationError("Invalid email format", "email");
    }
    
    if (!user.password || user.password.length < 8) {
        throw new ValidationError("Password must be at least 8 characters", "password");
    }
}

try {
    validateUser({ email: "invalid-email", password: "123" });
} catch (error) {
    if (error instanceof ValidationError) {
        console.error(`Validation failed for ${error.field}: ${error.message}`);
    } else {
        console.error("Unexpected error:", error.message);
    }
}
```

## Error Objects

### Built-in Error Properties

```javascript
try {
    throw new Error("Something went wrong");
} catch (error) {
    console.log("Name:", error.name);           // "Error"
    console.log("Message:", error.message);     // "Something went wrong"
    console.log("Stack:", error.stack);         // Stack trace
}
```

### Creating Detailed Error Objects

```javascript
class DetailedError extends Error {
    constructor(message, code, details = {}) {
        super(message);
        this.name = "DetailedError";
        this.code = code;
        this.details = details;
        this.timestamp = new Date().toISOString();
    }
    
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            details: this.details,
            timestamp: this.timestamp,
            stack: this.stack
        };
    }
}

// Usage
function processPayment(amount, cardNumber) {
    if (amount <= 0) {
        throw new DetailedError(
            "Invalid payment amount",
            "INVALID_AMOUNT",
            { amount, minAmount: 0.01 }
        );
    }
    
    if (!cardNumber || cardNumber.length < 16) {
        throw new DetailedError(
            "Invalid card number",
            "INVALID_CARD",
            { cardLength: cardNumber?.length, requiredLength: 16 }
        );
    }
}
```

## Async Error Handling

### Promises with Catch

```javascript
function fetchUserData(userId) {
    return fetch(`/api/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("User data:", data);
            return data;
        })
        .catch(error => {
            console.error("Failed to fetch user data:", error.message);
            throw error; // Re-throw if needed
        });
}

// Usage
fetchUserData(123)
    .then(user => {
        // Handle successful response
    })
    .catch(error => {
        // Handle any errors
    });
```

### Async/Await with Try-Catch

```javascript
async function fetchUserDataAsync(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("User data:", data);
        return data;
    } catch (error) {
        console.error("Failed to fetch user data:", error.message);
        throw error; // Re-throw if needed
    }
}

// Usage
async function handleUser() {
    try {
        const user = await fetchUserDataAsync(123);
        // Handle successful response
    } catch (error) {
        // Handle any errors
    }
}
```

### Multiple Async Operations

```javascript
async function fetchAllUserData(userId) {
    try {
        // Parallel requests
        const [user, posts, comments] = await Promise.all([
            fetchUser(userId),
            fetchUserPosts(userId),
            fetchUserComments(userId)
        ]);
        
        return { user, posts, comments };
    } catch (error) {
        console.error("Failed to fetch all user data:", error.message);
        
        // Try to fetch data individually if parallel fails
        try {
            const user = await fetchUser(userId);
            const posts = await fetchUserPosts(userId).catch(() => []);
            const comments = await fetchUserComments(userId).catch(() => []);
            
            return { user, posts, comments };
        } catch (fallbackError) {
            throw new Error("Failed to fetch user data even with fallback");
        }
    }
}
```

## Error Boundaries (React-like Pattern)

While JavaScript doesn't have built-in error boundaries, you can implement similar patterns.

```javascript
class ErrorBoundary {
    constructor() {
        this.errors = [];
        this.errorHandlers = [];
    }
    
    // Wrap a function with error handling
    wrap(fn, context = "Unknown") {
        return (...args) => {
            try {
                const result = fn.apply(this, args);
                
                // Handle promises
                if (result && typeof result.catch === 'function') {
                    return result.catch(error => {
                        this.handleError(error, context);
                        throw error;
                    });
                }
                
                return result;
            } catch (error) {
                this.handleError(error, context);
                throw error;
            }
        };
    }
    
    // Handle errors
    handleError(error, context) {
        const errorInfo = {
            error,
            context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        this.errors.push(errorInfo);
        
        // Notify error handlers
        this.errorHandlers.forEach(handler => {
            try {
                handler(errorInfo);
            } catch (handlerError) {
                console.error("Error in error handler:", handlerError);
            }
        });
    }
    
    // Add error handler
    onError(handler) {
        this.errorHandlers.push(handler);
    }
    
    // Get error history
    getErrors() {
        return [...this.errors];
    }
    
    // Clear errors
    clearErrors() {
        this.errors = [];
    }
}

// Usage
const errorBoundary = new ErrorBoundary();

// Add error handler
errorBoundary.onError((errorInfo) => {
    console.error("Application error:", errorInfo);
    // Send to logging service
    // logToService(errorInfo);
});

// Wrap functions
const safeCalculate = errorBoundary.wrap(function(a, b) {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
}, "Calculator");
```

## Logging and Monitoring

### Basic Logging

```javascript
class Logger {
    constructor(level = "info") {
        this.level = level;
        this.levels = {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3
        };
    }
    
    log(level, message, data = {}) {
        if (this.levels[level] <= this.levels[this.level]) {
            const timestamp = new Date().toISOString();
            const logEntry = {
                timestamp,
                level,
                message,
                data
            };
            
            console[level](`[${timestamp}] ${level.toUpperCase()}: ${message}`, data);
            
            // Send to logging service in production
            if (level === "error") {
                this.sendToLoggingService(logEntry);
            }
        }
    }
    
    error(message, data) {
        this.log("error", message, data);
    }
    
    warn(message, data) {
        this.log("warn", message, data);
    }
    
    info(message, data) {
        this.log("info", message, data);
    }
    
    debug(message, data) {
        this.log("debug", message, data);
    }
    
    sendToLoggingService(logEntry) {
        // Implementation for sending logs to external service
        // fetch('/api/logs', {
        //     method: 'POST',
        //     body: JSON.stringify(logEntry)
        // });
    }
}

const logger = new Logger("debug");

// Usage
try {
    riskyOperation();
} catch (error) {
    logger.error("Operation failed", {
        error: error.message,
        stack: error.stack,
        userId: getCurrentUserId(),
        action: "riskyOperation"
    });
}
```

## Best Practices

### 1. Fail Fast

```javascript
function processUser(user) {
    // Validate early and fail fast
    if (!user) {
        throw new Error("User is required");
    }
    
    if (!user.id) {
        throw new Error("User ID is required");
    }
    
    if (!user.email) {
        throw new Error("User email is required");
    }
    
    // Continue with processing...
    return processValidUser(user);
}
```

### 2. Provide Meaningful Error Messages

```javascript
// Bad
function withdraw(amount) {
    if (amount > balance) {
        throw new Error("Error");
    }
}

// Good
function withdraw(amount) {
    if (amount <= 0) {
        throw new Error(`Invalid withdrawal amount: ${amount}. Amount must be positive.`);
    }
    
    if (amount > balance) {
        throw new Error(`Insufficient funds. Attempted to withdraw ${amount}, but balance is only ${balance}.`);
    }
}
```

### 3. Don't Swallow Errors

```javascript
// Bad - silently ignoring errors
try {
    riskyOperation();
} catch (error) {
    // Silent failure - very bad!
}

// Good - at least log the error
try {
    riskyOperation();
} catch (error) {
    logger.error("Risky operation failed", { error: error.message });
    // Decide whether to re-throw or handle gracefully
}
```

### 4. Use Error Codes for Programmatic Handling

```javascript
class AppError extends Error {
    constructor(message, code, statusCode = 500) {
        super(message);
        this.name = "AppError";
        this.code = code;
        this.statusCode = statusCode;
    }
}

// Define error codes
const ERROR_CODES = {
    VALIDATION_FAILED: "VALIDATION_FAILED",
    USER_NOT_FOUND: "USER_NOT_FOUND",
    INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS",
    RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED"
};

// Usage
function getUser(id) {
    if (!id) {
        throw new AppError("User ID is required", ERROR_CODES.VALIDATION_FAILED, 400);
    }
    
    const user = database.findUser(id);
    if (!user) {
        throw new AppError(`User with ID ${id} not found`, ERROR_CODES.USER_NOT_FOUND, 404);
    }
    
    return user;
}

// Handle errors programmatically
try {
    const user = getUser(null);
} catch (error) {
    switch (error.code) {
        case ERROR_CODES.VALIDATION_FAILED:
            showValidationError(error.message);
            break;
        case ERROR_CODES.USER_NOT_FOUND:
            redirectToUserNotFound();
            break;
        default:
            showGenericError();
    }
}
```

### 5. Graceful Degradation

```javascript
async function enhancedUserExperience() {
    try {
        // Try to load enhanced features
        const advancedFeatures = await loadAdvancedFeatures();
        return advancedFeatures;
    } catch (error) {
        logger.warn("Advanced features failed to load, falling back to basic", {
            error: error.message
        });
        
        // Gracefully degrade to basic functionality
        return loadBasicFeatures();
    }
}

async function loadUserProfile(userId) {
    let profile = {};
    
    try {
        // Try to get full profile with all data
        profile = await fetchFullProfile(userId);
    } catch (error) {
        logger.warn("Failed to load full profile, trying basic profile", {
            userId,
            error: error.message
        });
        
        try {
            // Fallback to basic profile
            profile = await fetchBasicProfile(userId);
        } catch (basicError) {
            logger.error("Failed to load even basic profile", {
                userId,
                error: basicError.message
            });
            
            // Final fallback to default profile
            profile = {
                id: userId,
                name: "Unknown User",
                avatar: "/default-avatar.png"
            };
        }
    }
    
    return profile;
}
```

## Error Recovery Strategies

### Retry Logic

```javascript
async function retryOperation(operation, maxRetries = 3, delay = 1000) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;
            
            if (attempt === maxRetries) {
                throw new Error(`Operation failed after ${maxRetries} attempts: ${error.message}`);
            }
            
            logger.warn(`Attempt ${attempt} failed, retrying in ${delay}ms`, {
                error: error.message,
                attempt,
                maxRetries
            });
            
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2; // Exponential backoff
        }
    }
}

// Usage
async function fetchDataWithRetry() {
    return retryOperation(async () => {
        const response = await fetch('/api/data');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    }, 3, 500);
}
```

### Circuit Breaker Pattern

```javascript
class CircuitBreaker {
    constructor(threshold = 5, timeout = 60000) {
        this.threshold = threshold;
        this.timeout = timeout;
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    }
    
    async execute(operation) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime > this.timeout) {
                this.state = 'HALF_OPEN';
            } else {
                throw new Error('Circuit breaker is OPEN');
            }
        }
        
        try {
            const result = await operation();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        this.state = 'CLOSED';
    }
    
    onFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        
        if (this.failureCount >= this.threshold) {
            this.state = 'OPEN';
        }
    }
}

// Usage
const apiCircuitBreaker = new CircuitBreaker(3, 30000);

async function callExternalAPI() {
    return apiCircuitBreaker.execute(async () => {
        const response = await fetch('/external-api');
        if (!response.ok) {
            throw new Error('API call failed');
        }
        return response.json();
    });
}
```

## Global Error Handling

### Unhandled Promise Rejections

```javascript
// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    // Log to error service
    logger.error('Unhandled promise rejection', {
        reason: event.reason,
        promise: event.promise
    });
    
    // Prevent the default behavior (logging to console)
    event.preventDefault();
});

// Handle uncaught exceptions
window.addEventListener('error', (event) => {
    console.error('Uncaught error:', event.error);
    
    logger.error('Uncaught error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});
```

### Error Reporting Service

```javascript
class ErrorReporter {
    constructor(apiEndpoint, apiKey) {
        this.apiEndpoint = apiEndpoint;
        this.apiKey = apiKey;
        this.queue = [];
        this.isOnline = navigator.onLine;
        
        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.flushQueue();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }
    
    report(error, context = {}) {
        const errorReport = {
            message: error.message,
            stack: error.stack,
            name: error.name,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            context
        };
        
        if (this.isOnline) {
            this.sendReport(errorReport);
        } else {
            this.queue.push(errorReport);
        }
    }
    
    async sendReport(report) {
        try {
            await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify(report)
            });
        } catch (error) {
            console.error('Failed to send error report:', error);
            this.queue.push(report);
        }
    }
    
    flushQueue() {
        while (this.queue.length > 0) {
            const report = this.queue.shift();
            this.sendReport(report);
        }
    }
}

// Initialize error reporter
const errorReporter = new ErrorReporter('/api/errors', 'your-api-key');

// Use in error handlers
try {
    riskyOperation();
} catch (error) {
    errorReporter.report(error, {
        userId: getCurrentUserId(),
        action: 'riskyOperation',
        additionalData: getContextualData()
    });
}
```

## Testing Error Handling

### Unit Testing Errors

```javascript
// Example using Jest
describe('Error Handling', () => {
    test('should throw error for invalid input', () => {
        expect(() => {
            divide(10, 0);
        }).toThrow('Division by zero is not allowed');
    });
    
    test('should handle async errors', async () => {
        await expect(fetchUserData('invalid-id')).rejects.toThrow('User not found');
    });
    
    test('should retry failed operations', async () => {
        const mockOperation = jest.fn()
            .mockRejectedValueOnce(new Error('First failure'))
            .mockRejectedValueOnce(new Error('Second failure'))
            .mockResolvedValueOnce('Success');
        
        const result = await retryOperation(mockOperation, 3);
        
        expect(result).toBe('Success');
        expect(mockOperation).toHaveBeenCalledTimes(3);
    });
});
```

## Challenge Questions

1. What's the difference between `throw` and `return` in error handling?
2. When should you use custom error classes vs built-in Error?
3. How do you handle errors in Promise chains vs async/await?
4. What's the purpose of the `finally` block?
5. How can you implement retry logic with exponential backoff?
6. What are the benefits of using error codes in addition to error messages?
7. How do you prevent memory leaks when handling errors in long-running applications?
8. What's the difference between recoverable and non-recoverable errors?
9. How do you test error handling in your code?
10. What strategies can you use for graceful degradation when services fail?
```
