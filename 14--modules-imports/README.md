# JavaScript Modules & Imports

JavaScript modules allow you to organize code into separate files and control what functionality is shared between them.

## Learning Objectives
- Understand ES6 modules
- Learn import/export syntax
- Work with default and named exports
- Understand module bundling concepts

## Topics Covered

### 1. ES6 Modules
- What are modules?
- Benefits of modular code
- Module scope vs global scope

### 2. Export Syntax
```javascript
// Named exports
export const PI = 3.14159;
export function add(a, b) { return a + b; }

// Default export
export default class Calculator { }

// Export list
const name = "John";
const age = 30;
export { name, age };
```

### 3. Import Syntax
```javascript
// Named imports
import { PI, add } from './math.js';

// Default import
import Calculator from './calculator.js';

// Import all
import * as MathUtils from './math.js';

// Rename imports
import { add as sum } from './math.js';
```

### 4. Dynamic Imports
```javascript
// Dynamic import
const module = await import('./module.js');

// Conditional loading
if (condition) {
  const { feature } = await import('./feature.js');
}
```

## What are Modules?

Modules are reusable pieces of code that:
- Encapsulate functionality
- Control what is exposed to other modules
- Help organize large applications
- Enable code reuse across projects
- Prevent global namespace pollution

## ES6 Modules (ESM)

ES6 introduced native module support with `import` and `export` statements.

### Named Exports

Export multiple values from a module.

```javascript
// math.js
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export class Calculator {
    multiply(a, b) {
        return a * b;
    }
    
    divide(a, b) {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    }
}

// Alternative syntax - export at the end
const power = (base, exp) => Math.pow(base, exp);
const sqrt = (num) => Math.sqrt(num);

export { power, sqrt };
```

### Default Exports

Export a single main value from a module.

```javascript
// logger.js
class Logger {
    constructor(level = 'info') {
        this.level = level;
    }
    
    log(message, level = 'info') {
        if (this.shouldLog(level)) {
            console.log(`[${level.toUpperCase()}] ${message}`);
        }
    }
    
    shouldLog(level) {
        const levels = { error: 0, warn: 1, info: 2, debug: 3 };
        return levels[level] <= levels[this.level];
    }
}

export default Logger;

// Alternative syntax
// export { Logger as default };
```

### Mixed Exports

Combine named and default exports.

```javascript
// utils.js
export default function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

export function formatDate(date, locale = 'en-US') {
    return new Intl.DateTimeFormat(locale).format(date);
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const CONSTANTS = {
    MAX_RETRY_ATTEMPTS: 3,
    DEFAULT_TIMEOUT: 5000,
    API_BASE_URL: 'https://api.example.com'
};
```

## Importing Modules

### Named Imports

```javascript
// Import specific named exports
import { add, subtract, PI } from './math.js';

console.log(add(5, 3)); // 8
console.log(PI); // 3.14159

// Import with aliases
import { add as sum, subtract as diff } from './math.js';

console.log(sum(5, 3)); // 8
console.log(diff(10, 4)); // 6

// Import all named exports
import * as MathUtils from './math.js';

console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.PI); // 3.14159
```

### Default Imports

```javascript
// Import default export
import Logger from './logger.js';

const logger = new Logger('debug');
logger.log('Hello World!');

// Import default with custom name
import MyLogger from './logger.js';

const myLogger = new MyLogger('error');
```

### Mixed Imports

```javascript
// Import default and named exports
import formatCurrency, { formatDate, capitalize, CONSTANTS } from './utils.js';

console.log(formatCurrency(1234.56)); // $1,234.56
console.log(formatDate(new Date())); // Current date formatted
console.log(capitalize('hello')); // Hello
console.log(CONSTANTS.MAX_RETRY_ATTEMPTS); // 3

// Alternative syntax
import { default as format, formatDate, capitalize } from './utils.js';
```

## Dynamic Imports

Load modules conditionally or on-demand.

```javascript
// Dynamic import returns a Promise
async function loadMathModule() {
    try {
        const mathModule = await import('./math.js');
        console.log(mathModule.add(5, 3)); // 8
        
        // Access default export
        if (mathModule.default) {
            const DefaultClass = mathModule.default;
            const instance = new DefaultClass();
        }
    } catch (error) {
        console.error('Failed to load math module:', error);
    }
}

// Conditional loading
async function loadFeature(featureName) {
    let module;
    
    switch (featureName) {
        case 'charts':
            module = await import('./charts.js');
            break;
        case 'analytics':
            module = await import('./analytics.js');
            break;
        default:
            throw new Error(`Unknown feature: ${featureName}`);
    }
    
    return module;
}

// Load module based on user action
document.getElementById('load-charts').addEventListener('click', async () => {
    const chartsModule = await import('./charts.js');
    chartsModule.renderChart(data);
});
```

## Module Patterns

### Singleton Pattern

```javascript
// config.js - Singleton configuration
class Config {
    constructor() {
        if (Config.instance) {
            return Config.instance;
        }
        
        this.settings = {
            apiUrl: 'https://api.example.com',
            timeout: 5000,
            retries: 3
        };
        
        Config.instance = this;
        return this;
    }
    
    get(key) {
        return this.settings[key];
    }
    
    set(key, value) {
        this.settings[key] = value;
    }
    
    getAll() {
        return { ...this.settings };
    }
}

// Export singleton instance
export default new Config();
```

### Factory Pattern

```javascript
// database.js - Database factory
class MySQLDatabase {
    connect() {
        console.log('Connecting to MySQL');
    }
}

class PostgreSQLDatabase {
    connect() {
        console.log('Connecting to PostgreSQL');
    }
}

class MongoDatabase {
    connect() {
        console.log('Connecting to MongoDB');
    }
}

export function createDatabase(type) {
    switch (type) {
        case 'mysql':
            return new MySQLDatabase();
        case 'postgresql':
            return new PostgreSQLDatabase();
        case 'mongodb':
            return new MongoDatabase();
        default:
            throw new Error(`Unsupported database type: ${type}`);
    }
}

export { MySQLDatabase, PostgreSQLDatabase, MongoDatabase };
```

### Module with Private State

```javascript
// counter.js - Module with private state
let count = 0;
const observers = [];

function notifyObservers() {
    observers.forEach(observer => observer(count));
}

export function increment() {
    count++;
    notifyObservers();
    return count;
}

export function decrement() {
    count--;
    notifyObservers();
    return count;
}

export function getCount() {
    return count;
}

export function reset() {
    count = 0;
    notifyObservers();
    return count;
}

export function subscribe(observer) {
    observers.push(observer);
    return () => {
        const index = observers.indexOf(observer);
        if (index > -1) {
            observers.splice(index, 1);
        }
    };
}
```

## CommonJS (Node.js)

CommonJS is the module system used in Node.js.

### Exporting in CommonJS

```javascript
// math.js (CommonJS)
const PI = 3.14159;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

// Export individual items
exports.PI = PI;
exports.add = add;
exports.subtract = subtract;

// Or export all at once
module.exports = {
    PI,
    add,
    subtract
};

// Export a single item (overwrites exports)
module.exports = class Calculator {
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
};
```

### Importing in CommonJS

```javascript
// Import entire module
const math = require('./math');
console.log(math.add(5, 3));

// Destructure imports
const { add, subtract, PI } = require('./math');
console.log(add(5, 3));

// Import single export
const Calculator = require('./calculator');
const calc = new Calculator();
```

## Module Resolution

How JavaScript finds and loads modules.

### Relative Imports

```javascript
// Same directory
import { utils } from './utils.js';

// Parent directory
import { config } from '../config.js';

// Nested directory
import { helpers } from './helpers/index.js';
```

### Absolute Imports

```javascript
// From node_modules
import lodash from 'lodash';
import { debounce } from 'lodash';

// From specific package files
import debounce from 'lodash/debounce';
```

### Import Maps (Modern browsers)

```html
<!-- In HTML -->
<script type="importmap">
{
    "imports": {
        "lodash": "https://cdn.skypack.dev/lodash",
        "utils/": "./src/utils/"
    }
}
</script>

<script type="module">
    import _ from 'lodash';
    import { helper } from 'utils/helper.js';
</script>
```

## Module Bundling

Tools that combine modules for production.

### Webpack Configuration

```javascript
// webpack.config.js
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
```

### Rollup Configuration

```javascript
// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        name: 'MyApp'
    },
    plugins: [
        nodeResolve(),
        terser()
    ]
};
```

## Tree Shaking

Eliminate unused code from bundles.

```javascript
// utils.js - Only export what's needed
export function usedFunction() {
    return 'This will be included';
}

export function unusedFunction() {
    return 'This will be tree-shaken out';
}

// main.js - Only import what you use
import { usedFunction } from './utils.js';

console.log(usedFunction());
// unusedFunction is not imported, so it won't be in the bundle
```

## Module Best Practices

### 1. Use Descriptive Names

```javascript
// Good
import { validateEmail, formatCurrency } from './validators.js';

// Bad
import { v, f } from './utils.js';
```

### 2. Keep Modules Focused

```javascript
// Good - focused module
// email-validator.js
export function validateEmail(email) {
    return /^[^s@]+@[^s@]+.[^s@]+$/.test(email);
}

export function normalizeEmail(email) {
    return email.toLowerCase().trim();
}

// Bad - too many responsibilities
// utils.js with email, date, string, math functions
```

### 3. Use Barrel Exports

```javascript
// index.js - barrel export
export { validateEmail, normalizeEmail } from './email-validator.js';
export { formatDate, parseDate } from './date-formatter.js';
export { capitalize, slugify } from './string-utils.js';

// Usage
import { validateEmail, formatDate, capitalize } from './utils/index.js';
```

### 4. Avoid Circular Dependencies

```javascript
// Bad - circular dependency
// a.js
import { b } from './b.js';
export const a = 'a' + b;

// b.js
import { a } from './a.js';
export const b = 'b' + a;

// Good - extract shared dependency
// shared.js
export const shared = 'shared';

// a.js
import { shared } from './shared.js';
export const a = 'a' + shared;

// b.js
import { shared } from './shared.js';
export const b = 'b' + shared;
```

### 5. Use Default Exports Sparingly

```javascript
// Good - clear named exports
export class UserService { }
export class ProductService { }

// Less ideal - unclear what the default is
export default class { }
```

## Module Loading Strategies

### Lazy Loading

```javascript
// Load modules only when needed
class FeatureManager {
    constructor() {
        this.loadedFeatures = new Map();
    }
    
    async loadFeature(name) {
        if (this.loadedFeatures.has(name)) {
            return this.loadedFeatures.get(name);
        }
        
        let module;
        try {
            module = await import(`./features/${name}.js`);
            this.loadedFeatures.set(name, module);
            return module;
        } catch (error) {
            console.error(`Failed to load feature ${name}:, error`);
            throw error;
        }
    }
}

const featureManager = new FeatureManager();

// Load feature on demand
document.getElementById('charts-tab').addEventListener('click', async () => {
    const chartsModule = await featureManager.loadFeature('charts');
    chartsModule.initializeCharts();
});
```

### Preloading

```javascript
// Preload modules that will likely be needed
async function preloadModules() {
    const modulePromises = [
        import('./user-profile.js'),
        import('./notifications.js'),
        import('./settings.js')
    ];
    
    try {
        await Promise.all(modulePromises);
        console.log('Modules preloaded successfully');
    } catch (error) {
        console.error('Failed to preload some modules:', error);
    }
}

// Preload after initial page load
window.addEventListener('load', () => {
    setTimeout(preloadModules, 1000);
});
```

## Testing Modules

### Unit Testing with Mocks

```javascript
// user-service.js
import { apiClient } from './api-client.js';

export async function getUser(id) {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
}

// user-service.test.js
import { getUser } from './user-service.js';
import { apiClient } from './api-client.js';

// Mock the api-client module
jest.mock('./api-client.js', () => ({
    apiClient: {
        get: jest.fn()
    }
}));

test('getUser returns user data', async () => {
    const mockUser = { id: 1, name: 'John' };
    apiClient.get.mockResolvedValue({ data: mockUser });
    
    const user = await getUser(1);
    
    expect(user).toEqual(mockUser);
    expect(apiClient.get).toHaveBeenCalledWith('/users/1');
});
```

## Challenge Questions

1. What's the difference between named exports and default exports?
2. How do dynamic imports work and when would you use them?
3. What is tree shaking and how does it work?
4. How do you handle circular dependencies in modules?
5. What's the difference between ES6 modules and CommonJS?
6. How do module bundlers like Webpack work?
7. What are barrel exports and when should you use them?
8. How do you test modules that have dependencies?
9. What strategies can you use for lazy loading modules?
10. How do import maps work in modern browsers?

## Exercises
1. Create a math utilities module
2. Build a user management system with modules
3. Implement dynamic module loading
4. Create a modular calculator app
```


```


```
