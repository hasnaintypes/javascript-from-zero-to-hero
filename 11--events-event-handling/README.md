# Events & Event Handling

Events are actions that happen in the browser - user interactions, page loading, timers, etc. Event handling is how we respond to these events with JavaScript.

## What are Events?

Events are signals that something has happened. They can be:
- **User interactions**: clicks, key presses, mouse movements
- **Browser events**: page load, resize, scroll
- **Form events**: submit, input changes, focus/blur
- **Custom events**: events you create yourself

## Event Listeners

Event listeners are functions that wait for specific events to occur.

### addEventListener()

The modern way to handle events.

```javascript
// Basic syntax
element.addEventListener('event', function, options);

// Example
const button = document.querySelector('#myButton');
button.addEventListener('click', function() {
    console.log('Button clicked!');
});

// Arrow function
button.addEventListener('click', () => {
    console.log('Button clicked with arrow function!');
});

// Named function
function handleClick() {
    console.log('Button clicked with named function!');
}
button.addEventListener('click', handleClick);
```

### Removing Event Listeners

```javascript
// You can only remove named functions
function handleClick() {
    console.log('This will be removed');
}

button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);

// Anonymous functions cannot be removed
button.addEventListener('click', function() {
    console.log('This cannot be removed');
});
```

### Event Handler Properties (Older Method)

```javascript
// Older way - only one handler per event
button.onclick = function() {
    console.log('Old way of handling clicks');
};

// This overwrites the previous handler
button.onclick = function() {
    console.log('This replaces the previous handler');
};
```

## Common Event Types

### Mouse Events

```javascript
const element = document.querySelector('#target');

// Click events
element.addEventListener('click', () => console.log('Clicked'));
element.addEventListener('dblclick', () => console.log('Double clicked'));

// Mouse movement
element.addEventListener('mouseenter', () => console.log('Mouse entered'));
element.addEventListener('mouseleave', () => console.log('Mouse left'));
element.addEventListener('mouseover', () => console.log('Mouse over'));
element.addEventListener('mouseout', () => console.log('Mouse out'));
element.addEventListener('mousemove', (e) => {
    console.log(`Mouse at: ${e.clientX}, ${e.clientY}`);
});

// Mouse buttons
element.addEventListener('mousedown', () => console.log('Mouse button down'));
element.addEventListener('mouseup', () => console.log('Mouse button up'));
```

### Keyboard Events

```javascript
// Keyboard events
document.addEventListener('keydown', (e) => {
    console.log(`Key down: ${e.key}`);
});

document.addEventListener('keyup', (e) => {
    console.log(`Key up: ${e.key}`);
});

document.addEventListener('keypress', (e) => {
    console.log(`Key press: ${e.key}`);
});

// Specific key handling
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        console.log('Enter key pressed');
    }
    
    if (e.key === 'Escape') {
        console.log('Escape key pressed');
    }
    
    // Check for modifier keys
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault(); // Prevent browser save
        console.log('Ctrl+S pressed');
    }
});
```

### Form Events

```javascript
const form = document.querySelector('#myForm');
const input = document.querySelector('#myInput');

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form submitted');
});

// Input events
input.addEventListener('input', (e) => {
    console.log(`Input value: ${e.target.value}`);
});

input.addEventListener('change', (e) => {
    console.log(`Input changed: ${e.target.value}`);
});

input.addEventListener('focus', () => {
    console.log('Input focused');
});

input.addEventListener('blur', () => {
    console.log('Input lost focus');
});
```

### Window Events

```javascript
// Page load events
window.addEventListener('load', () => {
    console.log('Page fully loaded');
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded');
});

// Window resize
window.addEventListener('resize', () => {
    console.log(`Window size: ${window.innerWidth}x${window.innerHeight}`);
});

// Scroll events
window.addEventListener('scroll', () => {
    console.log(`Scroll position: ${window.scrollY}`);
});

// Before page unload
window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = ''; // Show confirmation dialog
});
```

## The Event Object

Every event handler receives an event object with information about the event.

```javascript
button.addEventListener('click', (event) => {
    console.log('Event type:', event.type);
    console.log('Target element:', event.target);
    console.log('Current target:', event.currentTarget);
    console.log('Mouse position:', event.clientX, event.clientY);
    console.log('Timestamp:', event.timeStamp);
});

// Keyboard event properties
document.addEventListener('keydown', (e) => {
    console.log('Key:', e.key);
    console.log('Key code:', e.keyCode); // Deprecated
    console.log('Code:', e.code);
    console.log('Alt key:', e.altKey);
    console.log('Ctrl key:', e.ctrlKey);
    console.log('Shift key:', e.shiftKey);
    console.log('Meta key:', e.metaKey); // Cmd on Mac, Windows key on PC
});
```

## Event Propagation

Events in the DOM follow a specific path through the document tree.

### Event Phases

1. **Capturing Phase**: Event travels from root to target
2. **Target Phase**: Event reaches the target element
3. **Bubbling Phase**: Event bubbles up from target to root

```javascript
// Event bubbling (default)
document.querySelector('#parent').addEventListener('click', () => {
    console.log('Parent clicked');
});

document.querySelector('#child').addEventListener('click', () => {
    console.log('Child clicked');
});

// Clicking child will log: "Child clicked", then "Parent clicked"

// Event capturing
document.querySelector('#parent').addEventListener('click', () => {
    console.log('Parent clicked (capturing)');
}, true); // true enables capturing

document.querySelector('#child').addEventListener('click', () => {
    console.log('Child clicked');
});

// Clicking child will log: "Parent clicked (capturing)", then "Child clicked"
```

### Stopping Propagation

```javascript
document.querySelector('#child').addEventListener('click', (e) => {
    console.log('Child clicked');
    e.stopPropagation(); // Stops event from bubbling up
});

document.querySelector('#parent').addEventListener('click', () => {
    console.log('This will not run if child stops propagation');
});

// Stop immediate propagation (stops other listeners on same element)
element.addEventListener('click', (e) => {
    console.log('First listener');
    e.stopImmediatePropagation();
});

element.addEventListener('click', () => {
    console.log('This will not run');
});
```

### Preventing Default Behavior

```javascript
// Prevent form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submission prevented');
});

// Prevent link navigation
link.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Link click prevented');
});

// Prevent context menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    console.log('Right-click menu prevented');
});
```

## Event Delegation

Instead of adding event listeners to many elements, add one to a parent element.

```javascript
// Instead of this (inefficient for many buttons)
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', handleClick);
});

// Do this (efficient event delegation)
document.querySelector('#container').addEventListener('click', (e) => {
    if (e.target.classList.contains('button')) {
        handleClick(e);
    }
});

// More specific delegation
document.querySelector('#todoList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        deleteTodo(e.target.dataset.id);
    } else if (e.target.classList.contains('edit-btn')) {
        editTodo(e.target.dataset.id);
    } else if (e.target.classList.contains('complete-btn')) {
        completeTodo(e.target.dataset.id);
    }
});
```

## Custom Events

You can create and dispatch your own events.

```javascript
// Create custom event
const customEvent = new CustomEvent('myCustomEvent', {
    detail: {
        message: 'Hello from custom event!',
        timestamp: Date.now()
    },
    bubbles: true,
    cancelable: true
});

// Listen for custom event
document.addEventListener('myCustomEvent', (e) => {
    console.log('Custom event received:', e.detail);
});

// Dispatch custom event
document.dispatchEvent(customEvent);

// More complex custom event
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
    
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
}

// Usage
const emitter = new EventEmitter();
emitter.on('userLogin', (user) => console.log('User logged in:', user));
emitter.emit('userLogin', { name: 'John', id: 123 });
```

## Event Handling Patterns

### Debouncing

Limit how often a function can be called.

```javascript
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Usage
const searchInput = document.querySelector('#search');
const debouncedSearch = debounce((e) => {
    console.log('Searching for:', e.target.value);
    // Perform search
}, 300);

searchInput.addEventListener('input', debouncedSearch);
```

### Throttling

Limit function calls to once per time period.

```javascript
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

// Usage
const throttledScroll = throttle(() => {
    console.log('Scroll position:', window.scrollY);
}, 100);

window.addEventListener('scroll', throttledScroll);
```

### Once Event Listener

Event that only fires once.

```javascript
// Using options
button.addEventListener('click', () => {
    console.log('This will only run once');
}, { once: true });

// Manual implementation
function addEventListenerOnce(element, event, handler) {
    function onceHandler(e) {
        handler(e);
        element.removeEventListener(event, onceHandler);
    }
    element.addEventListener(event, onceHandler);
}
```

## Real-World Examples

### Modal Dialog

```javascript
class Modal {
    constructor(modalId) {
        this.modal = document.querySelector(modalId);
        this.closeBtn = this.modal.querySelector('.close');
        this.overlay = this.modal.querySelector('.overlay');
        
        this.bindEvents();
    }
    
    bindEvents() {
        // Close on X button
        this.closeBtn.addEventListener('click', () => this.close());
        
        // Close on overlay click
        this.overlay.addEventListener('click', () => this.close());
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
        
        // Prevent modal content clicks from closing modal
        this.modal.querySelector('.modal-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    open() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    
    close() {
        this.modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    isOpen() {
        return this.modal.style.display === 'block';
    }
}
```

### Drag and Drop

```javascript
class DragDrop {
    constructor(containerId) {
        this.container = document.querySelector(containerId);
        this.draggedElement = null;
        
        this.bindEvents();
    }
    
    bindEvents() {
        this.container.addEventListener('dragstart', (e) => {
            this.draggedElement = e.target;
            e.target.style.opacity = '0.5';
        });
        
        this.container.addEventListener('dragend', (e) => {
            e.target.style.opacity = '';
            this.draggedElement = null;
        });
        
        this.container.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
        });
        
        this.container.addEventListener('drop', (e) => {
            e.preventDefault();
            
            if (e.target !== this.draggedElement && e.target.classList.contains('dropzone')) {
                e.target.appendChild(this.draggedElement);
            }
        });
    }
}
```

### Form Validation

```javascript
class FormValidator {
    constructor(formId) {
        this.form = document.querySelector(formId);
        this.errors = {};
        
        this.bindEvents();
    }
    
    bindEvents() {
        // Real-time validation
        this.form.addEventListener('input', (e) => {
            this.validateField(e.target);
        });
        
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.submitForm();
            }
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const name = field.name;
        
        // Clear previous error
        delete this.errors[name];
        
        // Required validation
        if (field.hasAttribute('required') && !value) {
            this.errors[name] = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
            if (!emailRegex.test(value)) {
                this.errors[name] = 'Please enter a valid email';
            }
        }
        
        // Password validation
        if (field.type === 'password' && value) {
            if (value.length < 8) {
                this.errors[name] = 'Password must be at least 8 characters';
            }
        }
        
        this.displayFieldError(field, this.errors[name]);
    }
    
    validateForm() {
        const fields = this.form.querySelectorAll('input, textarea, select');
        fields.forEach(field => this.validateField(field));
        
        return Object.keys(this.errors).length === 0;
    }
    
    displayFieldError(field, error) {
        const errorElement = field.parentNode.querySelector('.error-message');
        
        if (error) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = error;
            }
        } else {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
    }
    
    submitForm() {
        console.log('Form is valid, submitting...');
        // Submit form data
    }
}
```

## Performance Considerations

### Passive Event Listeners

For better scroll performance:

```javascript
// Passive listeners can't call preventDefault()
window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('touchstart', handleTouch, { passive: true });
```

### Memory Leaks

Always clean up event listeners:

```javascript
class Component {
    constructor() {
        this.handleClick = this.handleClick.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }
    
    mount() {
        document.addEventListener('click', this.handleClick);
        window.addEventListener('resize', this.handleResize);
    }
    
    unmount() {
        document.removeEventListener('click', this.handleClick);
        window.removeEventListener('resize', this.handleResize);
    }
    
    handleClick(e) {
        // Handle click
    }
    
    handleResize(e) {
        // Handle resize
    }
}
```

## Best Practices

1. **Use event delegation** for dynamic content
2. **Debounce/throttle** expensive operations
3. **Use passive listeners** for scroll/touch events
4. **Clean up listeners** to prevent memory leaks
5. **Use semantic HTML** for better accessibility
6. **Prevent default** only when necessary
7. **Use named functions** for removable listeners

## Challenge Questions

1. What's the difference between event bubbling and capturing?
2. When would you use event delegation?
3. How do you prevent an event from bubbling up?
4. What's the difference between `preventDefault()` and `stopPropagation()`?
5. How do you create and dispatch custom events?
6. What's the difference between debouncing and throttling?
7. How do you handle events for dynamically created elements?
8. What are passive event listeners and when should you use them?
```
```
