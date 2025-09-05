// DOM Manipulation - Practical Examples

console.log("=== DOM Manipulation Demo ===")

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed")

  // 1. Selecting Elements
  console.log("\n--- Selecting Elements ---")

  // Create some elements for demonstration
  const demoContainer = document.createElement("div")
  demoContainer.id = "demo-container"
  demoContainer.innerHTML = `
        <h2 id="main-header">DOM Manipulation Demo</h2>
        <p class="intro">This is an introduction paragraph.</p>
        <div class="content">
            <p class="highlight">This is highlighted content.</p>
            <button class="btn primary">Primary Button</button>
            <button class="btn secondary">Secondary Button</button>
        </div>
        <ul id="demo-list">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
        <form id="demo-form">
            <input type="text" id="username" name="username" placeholder="Username">
            <input type="email" id="email" name="email" placeholder="Email">
            <input type="checkbox" id="agree" name="agree">
            <label for="agree">I agree to terms</label>
            <select id="country" name="country">
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
                <option value="uk">UK</option>
            </select>
        </form>
        <div id="output"></div>
    `
  document.body.appendChild(demoContainer)

  // getElementById
  const header = document.getElementById("main-header")
  console.log("Header by ID:", header)

  // getElementsByClassName
  const buttons = document.getElementsByClassName("btn")
  console.log("Buttons by class:", buttons)
  console.log("Number of buttons:", buttons.length)

  // getElementsByTagName
  const paragraphs = document.getElementsByTagName("p")
  console.log("All paragraphs:", paragraphs)

  // querySelector (first match)
  const firstButton = document.querySelector(".btn")
  const headerById = document.querySelector("#main-header")
  const firstParagraph = document.querySelector("p")

  console.log("First button:", firstButton)
  console.log("Header by querySelector:", headerById)
  console.log("First paragraph:", firstParagraph)

  // querySelectorAll (all matches)
  const allButtons = document.querySelectorAll(".btn")
  const allParagraphs = document.querySelectorAll("p")

  console.log("All buttons (NodeList):", allButtons)
  console.log("All paragraphs (NodeList):", allParagraphs)

  // Complex selectors
  const specificElement = document.querySelector("div.content > p.highlight")
  console.log("Specific element:", specificElement)

  // 2. Manipulating Element Content
  console.log("\n--- Manipulating Element Content ---")

  const outputDiv = document.querySelector("#output")

  // textContent vs innerHTML
  outputDiv.textContent = "This is plain text content"
  console.log("textContent:", outputDiv.textContent)

  setTimeout(() => {
    outputDiv.innerHTML = "<strong>This is HTML content</strong>"
    console.log("innerHTML:", outputDiv.innerHTML)
  }, 1000)

  // 3. Working with Attributes
  console.log("\n--- Working with Attributes ---")

  const usernameInput = document.querySelector("#username")

  // Get attributes
  console.log("Username placeholder:", usernameInput.getAttribute("placeholder"))
  console.log("Username type:", usernameInput.getAttribute("type"))

  // Set attributes
  usernameInput.setAttribute("maxlength", "20")
  usernameInput.setAttribute("data-validation", "required")

  // Remove attributes
  setTimeout(() => {
    usernameInput.removeAttribute("placeholder")
    console.log("Placeholder removed")
  }, 2000)

  // Check if attribute exists
  console.log("Has maxlength:", usernameInput.hasAttribute("maxlength"))

  // Direct property access
  usernameInput.value = "john_doe"
  console.log("Username value:", usernameInput.value)

  // 4. Working with Classes
  console.log("\n--- Working with Classes ---")

  const primaryButton = document.querySelector(".btn.primary")

  // Add classes
  primaryButton.classList.add("large", "animated")
  console.log("Classes after adding:", [...primaryButton.classList])

  // Remove class
  setTimeout(() => {
    primaryButton.classList.remove("animated")
    console.log("Classes after removing animated:", [...primaryButton.classList])
  }, 1500)

  // Toggle class
  setInterval(() => {
    primaryButton.classList.toggle("active")
    console.log("Toggled active class. Current classes:", [...primaryButton.classList])
  }, 3000)

  // Check if class exists
  console.log("Has primary class:", primaryButton.classList.contains("primary"))

  // Replace class
  setTimeout(() => {
    primaryButton.classList.replace("large", "medium")
    console.log("Replaced large with medium:", [...primaryButton.classList])
  }, 2500)

  // 5. Styling Elements
  console.log("\n--- Styling Elements ---")

  const highlightParagraph = document.querySelector(".highlight")

  // Individual styles
  highlightParagraph.style.color = "blue"
  highlightParagraph.style.backgroundColor = "yellow"
  highlightParagraph.style.padding = "10px"
  highlightParagraph.style.borderRadius = "5px"

  // Multiple styles at once
  setTimeout(() => {
    Object.assign(highlightParagraph.style, {
      color: "white",
      backgroundColor: "purple",
      fontSize: "18px",
      fontWeight: "bold",
    })
  }, 2000)

  // Get computed styles
  setTimeout(() => {
    const computedStyle = window.getComputedStyle(highlightParagraph)
    console.log("Computed color:", computedStyle.color)
    console.log("Computed font size:", computedStyle.fontSize)
  }, 2500)

  // 6. Creating and Adding Elements
  console.log("\n--- Creating and Adding Elements ---")

  // Create new elements
  const newDiv = document.createElement("div")
  const newParagraph = document.createElement("p")
  const newButton = document.createElement("button")

  // Set content and attributes
  newDiv.textContent = "This is a dynamically created div"
  newDiv.className = "dynamic-content"
  newDiv.id = "new-div"

  newParagraph.textContent = "This paragraph was created with JavaScript"
  newParagraph.style.fontStyle = "italic"

  newButton.textContent = "Dynamic Button"
  newButton.className = "btn dynamic"
  newButton.addEventListener("click", () => {
    alert("Dynamic button clicked!")
  })

  // Add elements to DOM
  const contentDiv = document.querySelector(".content")

  // appendChild
  contentDiv.appendChild(newDiv)

  // append (can append multiple elements)
  contentDiv.append(newParagraph, newButton)

  // insertBefore
  const referenceElement = document.querySelector(".btn.primary")
  contentDiv.insertBefore(document.createTextNode("Inserted before primary button: "), referenceElement)

  // insertAdjacentHTML
  setTimeout(() => {
    header.insertAdjacentHTML("afterend", '<p style="color: green;">Inserted after header</p>')
  }, 3000)

  // 7. Document Fragments for Performance
  console.log("\n--- Document Fragments ---")

  const list = document.querySelector("#demo-list")

  // Using document fragment for better performance
  const fragment = document.createDocumentFragment()

  for (let i = 4; i <= 10; i++) {
    const listItem = document.createElement("li")
    listItem.textContent = `Item ${i}`
    listItem.style.color = "blue"
    fragment.appendChild(listItem)
  }

  // Single DOM update
  list.appendChild(fragment)
  console.log("Added items 4-10 using document fragment")

  // 8. Navigating the DOM
  console.log("\n--- Navigating the DOM ---")

  const contentElement = document.querySelector(".content")

  // Parent navigation
  console.log("Parent of content:", contentElement.parentElement)
  console.log("Parent tag name:", contentElement.parentElement.tagName)

  // Child navigation
  console.log("Children of content:", contentElement.children)
  console.log("First child:", contentElement.firstElementChild)
  console.log("Last child:", contentElement.lastElementChild)

  // Sibling navigation
  const introParagraph = document.querySelector(".intro")
  console.log("Next sibling of intro:", introParagraph.nextElementSibling)
  console.log("Previous sibling of content:", contentElement.previousElementSibling)

  // Traversing with loops
  console.log("All children of content:")
  for (const child of contentElement.children) {
    console.log(`  - ${child.tagName}: ${child.textContent.substring(0, 30)}...`)
  }

  // 9. Form Manipulation
  console.log("\n--- Form Manipulation ---")

  const form = document.querySelector("#demo-form")
  const usernameField = document.querySelector("#username")
  const emailField = document.querySelector("#email")
  const agreeCheckbox = document.querySelector("#agree")
  const countrySelect = document.querySelector("#country")

  // Set form values
  setTimeout(() => {
    usernameField.value = "jane_doe"
    emailField.value = "jane@example.com"
    agreeCheckbox.checked = true
    countrySelect.value = "canada"

    console.log("Form values set:")
    console.log("  Username:", usernameField.value)
    console.log("  Email:", emailField.value)
    console.log("  Agree checked:", agreeCheckbox.checked)
    console.log("  Country:", countrySelect.value)
  }, 4000)

  // Form validation function
  function validateForm() {
    const errors = []

    if (!usernameField.value.trim()) {
      errors.push("Username is required")
      usernameField.style.borderColor = "red"
    } else {
      usernameField.style.borderColor = ""
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailField.value || !emailRegex.test(emailField.value)) {
      errors.push("Valid email is required")
      emailField.style.borderColor = "red"
    } else {
      emailField.style.borderColor = ""
    }

    if (!agreeCheckbox.checked) {
      errors.push("You must agree to terms")
    }

    if (errors.length > 0) {
      console.log("Form validation errors:", errors)
      return false
    } else {
      console.log("Form is valid!")
      return true
    }
  }

  // Add validation on form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    validateForm()
  })

  // 10. Data Attributes
  console.log("\n--- Data Attributes ---")

  const dataElement = document.createElement("div")
  dataElement.textContent = "Element with data attributes"

  // Set data attributes
  dataElement.setAttribute("data-user-id", "123")
  dataElement.setAttribute("data-role", "admin")

  // Using dataset property
  dataElement.dataset.userId = "456"
  dataElement.dataset.role = "user"
  dataElement.dataset.lastLogin = "2023-01-01"
  dataElement.dataset.firstName = "John" // becomes data-first-name

  console.log("Data attributes:")
  console.log("  User ID:", dataElement.dataset.userId)
  console.log("  Role:", dataElement.dataset.role)
  console.log("  Last Login:", dataElement.dataset.lastLogin)
  console.log("  First Name:", dataElement.dataset.firstName)

  demoContainer.appendChild(dataElement)

  // 11. Event Delegation Example
  console.log("\n--- Event Delegation ---")

  // Add event listener to parent instead of individual buttons
  demoContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      console.log(`Button clicked: ${e.target.textContent}`)
      e.target.style.transform = "scale(0.95)"
      setTimeout(() => {
        e.target.style.transform = ""
      }, 150)
    }
  })

  // 12. Creating Reusable Components
  console.log("\n--- Reusable Components ---")

  function createCard(title, content, imageUrl = "https://via.placeholder.com/150") {
    const card = document.createElement("div")
    card.className = "card"
    card.style.cssText = `
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 16px;
            margin: 10px;
            max-width: 300px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `

    card.innerHTML = `
            <img src="${imageUrl}" alt="${title}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px;">
            <div style="padding: 10px 0;">
                <h3 style="margin: 0 0 10px 0; color: #333;">${title}</h3>
                <p style="margin: 0 0 15px 0; color: #666; line-height: 1.4;">${content}</p>
                <button class="btn card-button" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                    Read More
                </button>
            </div>
        `

    return card
  }

  // Create and add cards
  setTimeout(() => {
    const cardsContainer = document.createElement("div")
    cardsContainer.id = "cards-container"
    cardsContainer.style.display = "flex"
    cardsContainer.style.flexWrap = "wrap"

    const cards = [
      {
        title: "JavaScript Basics",
        content: "Learn the fundamentals of JavaScript programming language.",
      },
      {
        title: "DOM Manipulation",
        content: "Master the art of manipulating HTML elements with JavaScript.",
      },
      {
        title: "Async Programming",
        content: "Understand promises, async/await, and asynchronous JavaScript.",
      },
    ]

    cards.forEach((cardData) => {
      const card = createCard(cardData.title, cardData.content)
      cardsContainer.appendChild(card)
    })

    demoContainer.appendChild(cardsContainer)
    console.log("Created and added card components")
  }, 5000)

  // 13. Dynamic List Management
  console.log("\n--- Dynamic List Management ---")

  class TodoList {
    constructor(containerId) {
      this.container = document.querySelector(containerId) || this.createContainer()
      this.todos = [
        { id: 1, text: "Learn JavaScript", completed: false },
        { id: 2, text: "Practice DOM manipulation", completed: true },
        { id: 3, text: "Build a project", completed: false },
      ]
      this.render()
    }

    createContainer() {
      const container = document.createElement("div")
      container.id = "todo-container"
      container.style.cssText = `
                margin: 20px 0;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background: #f9f9f9;
            `

      const title = document.createElement("h3")
      title.textContent = "Todo List Demo"
      title.style.marginTop = "0"

      const input = document.createElement("input")
      input.type = "text"
      input.id = "new-todo"
      input.placeholder = "Add new todo..."
      input.style.cssText = "padding: 8px; margin-right: 10px; border: 1px solid #ddd; border-radius: 4px;"

      const addButton = document.createElement("button")
      addButton.textContent = "Add Todo"
      addButton.className = "btn"
      addButton.style.cssText =
        "padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;"

      addButton.addEventListener("click", () => {
        const text = input.value.trim()
        if (text) {
          this.addTodo(text)
          input.value = ""
        }
      })

      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          addButton.click()
        }
      })

      const todoList = document.createElement("div")
      todoList.id = "todo-list"

      container.appendChild(title)
      container.appendChild(input)
      container.appendChild(addButton)
      container.appendChild(todoList)

      demoContainer.appendChild(container)
      return todoList
    }

    addTodo(text) {
      const todo = {
        id: Date.now(),
        text: text,
        completed: false,
      }
      this.todos.push(todo)
      this.render()
      console.log("Added todo:", text)
    }

    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id)
      this.render()
      console.log("Removed todo with id:", id)
    }

    toggleTodo(id) {
      const todo = this.todos.find((todo) => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
        this.render()
        console.log("Toggled todo:", todo.text, "completed:", todo.completed)
      }
    }

    render() {
      this.container.innerHTML = ""

      this.todos.forEach((todo) => {
        const todoElement = document.createElement("div")
        todoElement.className = `todo-item ${todo.completed ? "completed" : ""}`
        todoElement.style.cssText = `
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    margin: 5px 0;
                    background: white;
                    border-radius: 4px;
                    border-left: 4px solid ${todo.completed ? "#28a745" : "#007bff"};
                `

        const todoText = document.createElement("span")
        todoText.textContent = todo.text
        todoText.style.cssText = `
                    flex: 1;
                    ${todo.completed ? "text-decoration: line-through; color: #666;" : ""}
                `

        const toggleButton = document.createElement("button")
        toggleButton.textContent = todo.completed ? "Undo" : "Complete"
        toggleButton.style.cssText = `
                    margin: 0 5px;
                    padding: 4px 8px;
                    background: ${todo.completed ? "#ffc107" : "#28a745"};
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                `
        toggleButton.addEventListener("click", () => this.toggleTodo(todo.id))

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete"
        deleteButton.style.cssText = `
                    padding: 4px 8px;
                    background: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                `
        deleteButton.addEventListener("click", () => this.removeTodo(todo.id))

        todoElement.appendChild(todoText)
        todoElement.appendChild(toggleButton)
        todoElement.appendChild(deleteButton)

        this.container.appendChild(todoElement)
      })
    }
  }

  // Create todo list after a delay
  setTimeout(() => {
    const todoList = new TodoList()
    console.log("Todo list created and rendered")

    // Make it globally accessible for demo purposes
    window.demoTodoList = todoList
  }, 6000)

  // 14. Performance Monitoring
  console.log("\n--- Performance Monitoring ---")

  // Measure DOM manipulation performance
  function measurePerformance(name, fn) {
    const start = performance.now()
    fn()
    const end = performance.now()
    console.log(`${name} took ${(end - start).toFixed(2)} milliseconds`)
  }

  setTimeout(() => {
    // Test inefficient vs efficient DOM manipulation
    measurePerformance("Inefficient DOM manipulation", () => {
      const container = document.createElement("div")
      for (let i = 0; i < 100; i++) {
        const div = document.createElement("div")
        div.textContent = `Item ${i}`
        container.appendChild(div) // Multiple DOM updates
      }
      demoContainer.appendChild(container)
    })

    measurePerformance("Efficient DOM manipulation with fragment", () => {
      const container = document.createElement("div")
      const fragment = document.createDocumentFragment()
      for (let i = 0; i < 100; i++) {
        const div = document.createElement("div")
        div.textContent = `Efficient Item ${i}`
        fragment.appendChild(div) // No DOM updates
      }
      container.appendChild(fragment) // Single DOM update
      demoContainer.appendChild(container)
    })
  }, 7000)

  console.log("DOM Manipulation demo setup complete!")
})

// If DOM is already loaded
if (document.readyState === "loading") {
  console.log("DOM is still loading...")
} else {
  console.log("DOM is already loaded")
}
