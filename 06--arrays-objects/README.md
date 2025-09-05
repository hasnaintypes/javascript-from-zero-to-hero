# Arrays & Objects

Arrays and objects are JavaScript's main data structures for storing collections of data.

## Arrays

Arrays are ordered lists of values, indexed starting from 0.

### Creating Arrays

```javascript
// Array literal (most common)
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, null];

// Array constructor
let arr1 = new Array(); // Empty array
let arr2 = new Array(5); // Array with 5 empty slots
let arr3 = new Array(1, 2, 3); // [1, 2, 3]

// Array.of() - creates array from arguments
let arr4 = Array.of(1, 2, 3); // [1, 2, 3]

// Array.from() - creates array from iterable
let arr5 = Array.from("hello"); // ["h", "e", "l", "l", "o"]
```

### Accessing Array Elements

```javascript
let colors = ["red", "green", "blue"];

console.log(colors[0]);    // "red" (first element)
console.log(colors[1]);    // "green"
console.log(colors[2]);    // "blue"
console.log(colors[3]);    // undefined (doesn't exist)
console.log(colors[-1]);   // undefined (negative indices don't work)

// Get last element
console.log(colors[colors.length - 1]); // "blue"

// Array length
console.log(colors.length); // 3
```

### Modifying Arrays

```javascript
let fruits = ["apple", "banana"];

// Add elements
fruits.push("orange");        // Add to end: ["apple", "banana", "orange"]
fruits.unshift("grape");      // Add to beginning: ["grape", "apple", "banana", "orange"]

// Remove elements
let lastFruit = fruits.pop();     // Remove from end: "orange"
let firstFruit = fruits.shift();  // Remove from beginning: "grape"

// Change elements
fruits[0] = "mango";         // ["mango", "banana"]

// Add/remove at specific position
fruits.splice(1, 0, "kiwi"); // Insert "kiwi" at index 1: ["mango", "kiwi", "banana"]
fruits.splice(1, 1);         // Remove 1 element at index 1: ["mango", "banana"]
```

### Array Methods

#### Searching Methods
```javascript
let numbers = [1, 2, 3, 4, 5, 3];

// indexOf() - first occurrence
console.log(numbers.indexOf(3));    // 2
console.log(numbers.indexOf(10));   // -1 (not found)

// lastIndexOf() - last occurrence
console.log(numbers.lastIndexOf(3)); // 5

// includes() - check if element exists
console.log(numbers.includes(4));   // true
console.log(numbers.includes(10));  // false

// find() - first element that matches condition
let found = numbers.find(num => num > 3); // 4

// findIndex() - index of first element that matches
let foundIndex = numbers.findIndex(num => num > 3); // 3
```

#### Iteration Methods
```javascript
let numbers = [1, 2, 3, 4, 5];

// forEach() - execute function for each element
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});

// map() - create new array with transformed elements
let doubled = numbers.map(num => num * 2); // [2, 4, 6, 8, 10]

// filter() - create new array with elements that pass test
let evens = numbers.filter(num => num % 2 === 0); // [2, 4]

// reduce() - reduce array to single value
let sum = numbers.reduce((total, num) => total + num, 0); // 15

// some() - test if at least one element passes test
let hasEven = numbers.some(num => num % 2 === 0); // true

// every() - test if all elements pass test
let allPositive = numbers.every(num => num > 0); // true
```

#### Other Useful Methods
```javascript
let fruits = ["banana", "apple", "orange"];

// sort() - sort elements (modifies original)
fruits.sort(); // ["apple", "banana", "orange"]

// reverse() - reverse order (modifies original)
fruits.reverse(); // ["orange", "banana", "apple"]

// slice() - extract portion (doesn't modify original)
let citrus = fruits.slice(0, 2); // ["orange", "banana"]

// concat() - join arrays (doesn't modify original)
let moreFruits = fruits.concat(["grape", "kiwi"]);

// join() - convert to string
let fruitString = fruits.join(", "); // "orange, banana, apple"
```

## Objects

Objects are collections of key-value pairs (properties).

### Creating Objects

```javascript
// Object literal (most common)
let person = {
    name: "John",
    age: 30,
    city: "New York"
};

// Object constructor
let person2 = new Object();
person2.name = "Jane";
person2.age = 25;

// Object.create()
let person3 = Object.create(null); // Object with no prototype
person3.name = "Bob";
```

### Accessing Object Properties

```javascript
let car = {
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    "fuel-type": "gasoline" // Property with hyphen
};

// Dot notation
console.log(car.brand);  // "Toyota"
console.log(car.model);  // "Camry"

// Bracket notation
console.log(car["brand"]);     // "Toyota"
console.log(car["fuel-type"]); // "gasoline" (required for hyphens)

// Dynamic property access
let property = "year";
console.log(car[property]); // 2022
```

### Modifying Objects

```javascript
let user = {
    name: "Alice",
    email: "alice@example.com"
};

// Add properties
user.age = 28;
user["isActive"] = true;

// Modify properties
user.name = "Alice Smith";
user["email"] = "alice.smith@example.com";

// Delete properties
delete user.age;

console.log(user); // { name: "Alice Smith", email: "alice.smith@example.com", isActive: true }
```

### Object Methods

Objects can contain functions as properties (methods).

```javascript
let calculator = {
    result: 0,
    
    add: function(num) {
        this.result += num;
        return this; // Return this for chaining
    },
    
    subtract: function(num) {
        this.result -= num;
        return this;
    },
    
    multiply: function(num) {
        this.result *= num;
        return this;
    },
    
    getValue: function() {
        return this.result;
    },
    
    reset: function() {
        this.result = 0;
        return this;
    }
};

// Method chaining
let result = calculator.add(10).multiply(2).subtract(5).getValue(); // 15
```

### Object Destructuring (ES6)

Extract properties into variables.

```javascript
let person = {
    name: "John",
    age: 30,
    city: "New York",
    country: "USA"
};

// Basic destructuring
let { name, age } = person;
console.log(name); // "John"
console.log(age);  // 30

// Rename variables
let { name: fullName, city: location } = person;
console.log(fullName); // "John"
console.log(location); // "New York"

// Default values
let { name: userName, profession = "Unknown" } = person;
console.log(profession); // "Unknown"

// Nested destructuring
let user = {
    id: 1,
    profile: {
        firstName: "Jane",
        lastName: "Doe"
    }
};

let { profile: { firstName, lastName } } = user;
console.log(firstName); // "Jane"
```

### Object Methods and Properties

```javascript
let person = {
    name: "John",
    age: 30,
    city: "New York"
};

// Object.keys() - get all property names
console.log(Object.keys(person)); // ["name", "age", "city"]

// Object.values() - get all property values
console.log(Object.values(person)); // ["John", 30, "New York"]

// Object.entries() - get key-value pairs
console.log(Object.entries(person)); // [["name", "John"], ["age", 30], ["city", "New York"]]

// Object.assign() - copy properties
let copy = Object.assign({}, person);
let merged = Object.assign({}, person, { profession: "Developer" });

// hasOwnProperty() - check if property exists
console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("salary")); // false

// in operator - check if property exists (including inherited)
console.log("name" in person); // true
console.log("toString" in person); // true (inherited from Object.prototype)
```

## Arrays of Objects

Common pattern for storing structured data.

```javascript
let students = [
    { name: "Alice", grade: 85, subject: "Math" },
    { name: "Bob", grade: 92, subject: "Science" },
    { name: "Charlie", grade: 78, subject: "Math" },
    { name: "Diana", grade: 96, subject: "Science" }
];

// Find student by name
let alice = students.find(student => student.name === "Alice");

// Filter students by subject
let mathStudents = students.filter(student => student.subject === "Math");

// Get all grades
let grades = students.map(student => student.grade);

// Calculate average grade
let averageGrade = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;

// Sort by grade (descending)
let sortedByGrade = students.sort((a, b) => b.grade - a.grade);
```

## Nested Data Structures

```javascript
let company = {
    name: "TechCorp",
    founded: 2010,
    departments: [
        {
            name: "Engineering",
            employees: [
                { name: "John", role: "Senior Developer", salary: 90000 },
                { name: "Jane", role: "Junior Developer", salary: 60000 }
            ]
        },
        {
            name: "Marketing",
            employees: [
                { name: "Mike", role: "Marketing Manager", salary: 75000 },
                { name: "Sarah", role: "Content Creator", salary: 50000 }
            ]
        }
    ]
};

// Access nested data
console.log(company.departments[0].employees[0].name); // "John"

// Find all employees
let allEmployees = company.departments.flatMap(dept => dept.employees);

// Calculate total salary
let totalSalary = allEmployees.reduce((total, emp) => total + emp.salary, 0);
```

## Best Practices

### 1. Use Appropriate Data Structure
```javascript
// Use arrays for ordered lists
let todoList = ["Buy groceries", "Walk the dog", "Finish project"];

// Use objects for structured data
let user = { id: 1, name: "John", email: "john@example.com" };
```

### 2. Avoid Mutating Original Arrays/Objects
```javascript
// Bad - mutates original
let numbers = [1, 2, 3];
numbers.push(4);

// Good - creates new array
let numbers = [1, 2, 3];
let newNumbers = [...numbers, 4];

// Bad - mutates original object
let user = { name: "John", age: 30 };
user.age = 31;

// Good - creates new object
let user = { name: "John", age: 30 };
let updatedUser = { ...user, age: 31 };
```

### 3. Use Descriptive Property Names
```javascript
// Bad
let u = { n: "John", a: 30 };

// Good
let user = { name: "John", age: 30 };
```

### 4. Check for Property Existence
```javascript
// Safe property access
if (user && user.profile && user.profile.email) {
    console.log(user.profile.email);
}

// Optional chaining (ES2020)
console.log(user?.profile?.email);
```

## Challenge Questions

1. What's the difference between `push()` and `unshift()` methods?
2. How do you remove the last element from an array without using `pop()`?
3. What's the difference between `map()` and `forEach()`?
4. How do you check if a property exists in an object?
5. What's the difference between dot notation and bracket notation for accessing object properties?
6. Create an array of objects representing books, then filter books by author and sort by publication year.
7. How do you create a shallow copy vs deep copy of an object?
8. What does the `this` keyword refer to in an object method?
```
