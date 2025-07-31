# JavaScript Introduction & Basics

## What is JavaScript?

JavaScript is a high-level, interpreted programming language that was originally created to make web pages interactive. Today, it's used for:

- **Frontend Development**: Making websites interactive
- **Backend Development**: Server-side programming with Node.js
- **Mobile Apps**: React Native, Ionic
- **Desktop Apps**: Electron
- **Game Development**: Browser-based games

## Key Characteristics

### 1. Interpreted Language
JavaScript code is executed line by line by the JavaScript engine (like V8 in Chrome).

### 2. Dynamic Typing
Variables don't need explicit type declarations - types are determined at runtime.

```javascript
let message = "Hello"; // String
message = 42;          // Now it's a Number
```

### 3. Case Sensitive
`firstName` and `firstname` are different variables.

### 4. Weakly Typed
JavaScript performs automatic type conversion when needed.

## How to Run JavaScript

### 1. Browser Console
- Open Developer Tools (F12)
- Go to Console tab
- Type JavaScript code directly

### 2. HTML File
```html
<!DOCTYPE html>
<html>
<head>
    <title>My First JS</title>
</head>
<body>
    <script>
        console.log("Hello, World!");
    </script>
</body>
</html>
```

### 3. External JavaScript File
```html
<script src="script.js"></script>
```

## Basic Syntax Rules

1. **Statements end with semicolons** (optional but recommended)
2. **Code blocks use curly braces** `{}`
3. **Comments**: `//` for single line, `/* */` for multi-line
4. **Identifiers**: Must start with letter, `$`, or `_`

## Your First JavaScript Program

```javascript
// This is a comment
console.log("Hello, World!"); // Output to console
alert("Welcome to JavaScript!"); // Show popup (browser only)
```

## Why Learn JavaScript?

1. **Essential for Web Development**: Every website uses JavaScript
2. **Versatile**: Frontend, backend, mobile, desktop
3. **Large Community**: Tons of resources and libraries
4. **Job Market**: High demand for JavaScript developers
5. **Easy to Start**: No complex setup required

## Challenge Questions

1. What are three different ways to run JavaScript code?
2. Is JavaScript case-sensitive? Give an example.
3. What's the difference between `//` and `/* */` comments?
4. Write a simple JavaScript statement that displays your name in the console.
```
