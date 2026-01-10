# Local Storage & Web APIs

## Learning Objectives
- Understand browser storage options
- Work with localStorage and sessionStorage
- Use Web APIs (Geolocation, Notification, etc.)
- Handle browser compatibility

## Topics Covered

### 1. Storage Types
- localStorage (persistent)
- sessionStorage (session-based)
- Cookies (limited, sent with requests)
- IndexedDB (complex data)

### 2. localStorage API
```javascript
// Store data
localStorage.setItem('key', 'value');
localStorage.setItem('user', JSON.stringify(userObject));

// Retrieve data
const value = localStorage.getItem('key');
const user = JSON.parse(localStorage.getItem('user'));

// Remove data
localStorage.removeItem('key');
localStorage.clear(); // Remove all
```

### 3. Common Web APIs
- Geolocation API
- Notification API
- Fetch API
- File API
- Canvas API

### 4. Error Handling
```javascript
try {
    localStorage.setItem('test', 'value');
} catch (error) {
    console.log('Storage not available:', error);
}
```

## Exercises
1. Build a note-taking app with localStorage
2. Create a settings manager
3. Implement user preferences storage
4. Build a shopping cart with persistence

## Best Practices
- Always check for storage availability
- Handle quota exceeded errors
- Use JSON for complex data
- Implement fallbacks for unsupported browsers
```

```


```


```
