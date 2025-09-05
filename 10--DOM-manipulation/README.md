# DOM Manipulation

The Document Object Model (DOM) represents the structure of HTML documents as a tree of objects that JavaScript can manipulate.

## What is the DOM?

The DOM is a programming interface for HTML documents. It represents the page so that programs can change the document structure, style, and content.

### DOM Tree Structure

\`\`\`
Document
└── html
    ├── head
    │   ├── title
    │   └── meta
    └── body
        ├── h1
        ├── p
        └── div
            ├── span
            └── button
\`\`\`

## Selecting Elements

### getElementById()

\`\`\`javascript
// Select element by ID
const header = document.getElementById('main-header');
console.log(header);
\`\`\`

### getElementsByClassName()

\`\`\`javascript
// Select elements by class name (returns HTMLCollection)
const buttons = document.getElementsByClassName('btn');
console.log(buttons); // HTMLCollection

// Convert to array for easier manipulation
const buttonArray = Array.from(buttons);
\`\`\`

### getElementsByTagName()

\`\`\`javascript
// Select elements by tag name
const paragraphs = document.getElementsByTagName('p');
const allDivs = document.getElementsByTagName('div');
\`\`\`

### querySelector() and querySelectorAll()

Modern and flexible selectors using CSS syntax.

\`\`\`javascript
// Select first matching element
const firstButton = document.querySelector('.btn');
const headerById = document.querySelector('#main-header');
const firstParagraph = document.querySelector('p');

// Select all matching elements (returns NodeList)
const allButtons = document.querySelectorAll('.btn');
const allParagraphs = document.querySelectorAll('p');

// Complex selectors
const specificElement = document.querySelector('div.container > p.highlight');
const formInputs = document.querySelectorAll('form input[type="text"]');
\`\`\`

## Manipulating Element Content

### textContent vs innerHTML

\`\`\`javascript
const element = document.querySelector('#content');

// textContent - gets/sets text only (safe from XSS)
element.textContent = 'Hello World';
console.log(element.textContent);

// innerHTML - gets/sets HTML content (can be dangerous)
element.innerHTML = '<strong>Bold Text</strong>';
console.log(element.innerHTML);

// innerText - similar to textContent but respects styling
element.innerText = 'Visible text only';
\`\`\`

### Changing Attributes

\`\`\`javascript
const image = document.querySelector('img');

// Get attribute
const src = image.getAttribute('src');
const alt = image.getAttribute('alt');

// Set attribute
image.setAttribute('src', 'new-image.jpg');
image.setAttribute('alt', 'New image description');

// Remove attribute
image.removeAttribute('title');

// Check if attribute exists
if (image.hasAttribute('data-id')) {
    console.log('Element has data-id attribute');
}

// Direct property access (for standard attributes)
image.src = 'another-image.jpg';
image.alt = 'Another description';
\`\`\`

### Working with Classes

\`\`\`javascript
const element = document.querySelector('.my-element');

// Add class
element.classList.add('new-class');
element.classList.add('class1', 'class2', 'class3');

// Remove class
element.classList.remove('old-class');

// Toggle class
element.classList.toggle('active'); // adds if not present, removes if present

// Check if class exists
if (element.classList.contains('active')) {
    console.log('Element is active');
}

// Replace class
element.classList.replace('old-class', 'new-class');

// Get all classes
console.log(element.className); // string of all classes
console.log([...element.classList]); // array of classes
\`\`\`

### Styling Elements

\`\`\`javascript
const element = document.querySelector('#my-element');

// Inline styles
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '20px';
element.style.marginTop = '10px';

// Multiple styles at once
Object.assign(element.style, {
    color: 'white',
    backgroundColor: 'black',
    padding: '10px',
    borderRadius: '5px'
});

// Get computed styles
const computedStyle = window.getComputedStyle(element);
console.log(computedStyle.color);
console.log(computedStyle.fontSize);
\`\`\`

## Creating and Modifying Elements

### Creating Elements

\`\`\`javascript
// Create new element
const newDiv = document.createElement('div');
const newParagraph = document.createElement('p');
const newButton = document.createElement('button');

// Set content and attributes
newDiv.textContent = 'This is a new div';
newDiv.className = 'dynamic-content';
newDiv.id = 'new-div';

newButton.textContent = 'Click me';
newButton.setAttribute('type', 'button');
newButton.classList.add('btn', 'btn-primary');

// Create text node
const textNode = document.createTextNode('This is just text');
\`\`\`

### Adding Elements to DOM

\`\`\`javascript
const container = document.querySelector('#container');
const newElement = document.createElement('p');
newElement.textContent = 'New paragraph';

// Append as last child
container.appendChild(newElement);

// Prepend as first child
container.prepend(newElement);

// Insert before specific element
const referenceElement = document.querySelector('#reference');
container.insertBefore(newElement, referenceElement);

// Modern methods (more flexible)
container.append(newElement); // can append multiple elements/text
container.prepend('Text', newElement, 'More text');

// Insert adjacent to element
const targetElement = document.querySelector('#target');
targetElement.insertAdjacentHTML('beforebegin', '<p>Before target</p>');
targetElement.insertAdjacentHTML('afterbegin', '<p>Start of target</p>');
targetElement.insertAdjacentHTML('beforeend', '<p>End of target</p>');
targetElement.insertAdjacentHTML('afterend', '<p>After target</p>');
\`\`\`

### Removing Elements

\`\`\`javascript
const elementToRemove = document.querySelector('#remove-me');

// Modern way
elementToRemove.remove();

// Traditional way
elementToRemove.parentNode.removeChild(elementToRemove);

// Remove all children
const container = document.querySelector('#container');
container.innerHTML = ''; // Quick but not ideal for memory
// or
while (container.firstChild) {
    container.removeChild(container.firstChild);
}
\`\`\`

### Cloning Elements

\`\`\`javascript
const original = document.querySelector('#original');

// Shallow clone (element only, no children)
const shallowClone = original.cloneNode(false);

// Deep clone (element and all children)
const deepClone = original.cloneNode(true);

// Add cloned element to DOM
document.body.appendChild(deepClone);
\`\`\`

## Navigating the DOM

### Parent, Child, and Sibling Navigation

\`\`\`javascript
const element = document.querySelector('#current');

// Parent navigation
const parent = element.parentNode;
const parentElement = element.parentElement; // same as parentNode for elements

// Child navigation
const children = element.children; // HTMLCollection of child elements
const childNodes = element.childNodes; // NodeList including text nodes
const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;

// Sibling navigation
const nextSibling = element.nextElementSibling;
const previousSibling = element.previousElementSibling;

// Check relationships
if (element.contains(someOtherElement)) {
    console.log('element contains someOtherElement');
}
\`\`\`

### Traversing with Loops

\`\`\`javascript
const container = document.querySelector('#container');

// Loop through children
for (let child of container.children) {
    console.log(child.tagName);
}

// Loop through all descendants
function traverseDOM(element, callback) {
    callback(element);
    for (let child of element.children) {
        traverseDOM(child, callback);
    }
}

traverseDOM(document.body, (el) => {
    console.log(el.tagName);
});
\`\`\`

## Form Manipulation

### Getting Form Values

\`\`\`javascript
// Text inputs
const textInput = document.querySelector('#username');
const username = textInput.value;

// Checkboxes
const checkbox = document.querySelector('#agree');
const isChecked = checkbox.checked;

// Radio buttons
const selectedRadio = document.querySelector('input[name="gender"]:checked');
const genderValue = selectedRadio ? selectedRadio.value : null;

// Select dropdowns
const select = document.querySelector('#country');
const selectedCountry = select.value;
const selectedOption = select.options[select.selectedIndex];

// Multiple select
const multiSelect = document.querySelector('#skills');
const selectedSkills = Array.from(multiSelect.selectedOptions).map(option => option.value);
\`\`\`

### Setting Form Values

\`\`\`javascript
// Set text input
document.querySelector('#username').value = 'john_doe';

// Set checkbox
document.querySelector('#agree').checked = true;

// Set radio button
document.querySelector('#male').checked = true;

// Set select option
document.querySelector('#country').value = 'usa';

// Set multiple select options
const multiSelect = document.querySelector('#skills');
Array.from(multiSelect.options).forEach(option => {
    option.selected = ['javascript', 'python'].includes(option.value);
});
\`\`\`

### Form Validation

\`\`\`javascript
function validateForm() {
    const form = document.querySelector('#myForm');
    const errors = [];
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            errors.push(\`\${field.name} is required\`);
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    // Validate email
    const emailField = form.querySelector('#email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value && !emailRegex.test(emailField.value)) {
        errors.push('Please enter a valid email address');
        emailField.classList.add('error');
    }
    
    // Display errors
    const errorContainer = document.querySelector('#errors');
    if (errors.length > 0) {
        errorContainer.innerHTML = errors.map(error => \`<p>\${error}</p>\`).join('');
        return false;
    } else {
        errorContainer.innerHTML = '';
        return true;
    }
}
\`\`\`

## Working with Data Attributes

\`\`\`javascript
const element = document.querySelector('#data-element');

// Set data attributes
element.setAttribute('data-user-id', '123');
element.setAttribute('data-role', 'admin');

// Get data attributes
const userId = element.getAttribute('data-user-id');
const role = element.getAttribute('data-role');

// Using dataset property (modern approach)
element.dataset.userId = '456';
element.dataset.role = 'user';
element.dataset.lastLogin = '2023-01-01';

console.log(element.dataset.userId); // '456'
console.log(element.dataset.role); // 'user'
console.log(element.dataset.lastLogin); // '2023-01-01'

// Convert camelCase to kebab-case automatically
element.dataset.firstName = 'John'; // creates data-first-name="John"
\`\`\`

## Performance Considerations

### Document Fragments

Use document fragments for multiple DOM insertions to improve performance.

\`\`\`javascript
// Inefficient - multiple DOM updates
const container = document.querySelector('#container');
for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    div.textContent = \`Item \${i}\`;
    container.appendChild(div); // DOM update each time
}

// Efficient - single DOM update
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    div.textContent = \`Item \${i}\`;
    fragment.appendChild(div); // no DOM update
}
container.appendChild(fragment); // single DOM update
\`\`\`

### Batch DOM Operations

\`\`\`javascript
const element = document.querySelector('#element');

// Inefficient - multiple reflows
element.style.width = '100px';
element.style.height = '100px';
element.style.backgroundColor = 'red';

// Efficient - single reflow
element.style.cssText = 'width: 100px; height: 100px; background-color: red;';

// Or use classes
element.className = 'styled-element';
\`\`\`

## Common DOM Patterns

### Creating Reusable Components

\`\`\`javascript
function createCard(title, content, imageUrl) {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = \`
        <img src="\${imageUrl}" alt="\${title}" class="card-image">
        <div class="card-content">
            <h3 class="card-title">\${title}</h3>
            <p class="card-text">\${content}</p>
            <button class="card-button">Read More</button>
        </div>
    \`;
    
    return card;
}

// Usage
const container = document.querySelector('#cards-container');
const newCard = createCard('My Title', 'Card content here', 'image.jpg');
container.appendChild(newCard);
\`\`\`

### Dynamic List Management

\`\`\`javascript
class TodoList {
    constructor(containerId) {
        this.container = document.querySelector(containerId);
        this.todos = [];
        this.render();
    }
    
    addTodo(text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        this.todos.push(todo);
        this.render();
    }
    
    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.render();
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.render();
        }
    }
    
    render() {
        this.container.innerHTML = '';
        
        this.todos.forEach(todo => {
            const todoElement = document.createElement('div');
            todoElement.className = \`todo-item \${todo.completed ? 'completed' : ''}\`;
            todoElement.innerHTML = \`
                <span class="todo-text">\${todo.text}</span>
                <button onclick="todoList.toggleTodo(\${todo.id})">
                    \${todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button onclick="todoList.removeTodo(\${todo.id})">Delete</button>
            \`;
            this.container.appendChild(todoElement);
        });
    }
}

// Usage
const todoList = new TodoList('#todo-container');
\`\`\`

## Best Practices

### 1. Cache DOM Queries

\`\`\`javascript
// Bad - querying DOM multiple times
document.querySelector('#button').addEventListener('click', () => {
    document.querySelector('#output').textContent = 'Clicked!';
    document.querySelector('#counter').textContent = '1';
});

// Good - cache DOM references
const button = document.querySelector('#button');
const output = document.querySelector('#output');
const counter = document.querySelector('#counter');

button.addEventListener('click', () => {
    output.textContent = 'Clicked!';
    counter.textContent = '1';
});
\`\`\`

### 2. Use Event Delegation

\`\`\`javascript
// Bad - adding event listeners to many elements
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', handleClick);
});

// Good - single event listener on parent
document.querySelector('#container').addEventListener('click', (e) => {
    if (e.target.classList.contains('button')) {
        handleClick(e);
    }
});
\`\`\`

### 3. Minimize DOM Manipulation

\`\`\`javascript
// Bad - multiple DOM updates
const list = document.querySelector('#list');
for (let i = 0; i < items.length; i++) {
    const li = document.createElement('li');
    li.textContent = items[i];
    list.appendChild(li);
}

// Good - single DOM update
const list = document.querySelector('#list');
const html = items.map(item => \`<li>\${item}</li>\`).join('');
list.innerHTML = html;
\`\`\`

### 4. Use Semantic HTML

\`\`\`javascript
// Good - semantic structure makes DOM manipulation easier
const article = document.querySelector('article');
const header = article.querySelector('header h1');
const content = article.querySelector('.content');
const footer = article.querySelector('footer');
\`\`\`

## Challenge Questions

1. What's the difference between \`textContent\`, \`innerHTML\`, and \`innerText\`?
2. When should you use \`querySelector\` vs \`getElementById\`?
3. What's the difference between \`children\` and \`childNodes\`?
4. How can you improve performance when adding many elements to the DOM?
5. What's event delegation and why is it useful?
6. How do you safely insert user-generated content into the DOM?
7. What's the difference between \`appendChild\` and \`append\`?
8. How do you traverse the DOM tree efficiently?
\`\`\`
\`\`\`
