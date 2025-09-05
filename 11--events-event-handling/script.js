// Events & Event Handling - Practical Examples

console.log("=== Events & Event Handling Demo ===")

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded - setting up event examples")

  // Create demo container
  const demoContainer = document.createElement("div")
  demoContainer.id = "events-demo"
  demoContainer.innerHTML = `
        <style>
            #events-demo {
                max-width: 800px;
                margin: 20px auto;
                padding: 20px;
                font-family: Arial, sans-serif;
            }
            .demo-section {
                margin: 20px 0;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background: #f9f9f9;
            }
            .demo-section h3 {
                margin-top: 0;
                color: #333;
            }
            .btn {
                padding: 8px 16px;
                margin: 5px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                background: #007bff;
                color: white;
            }
            .btn:hover {
                background: #0056b3;
            }
            .btn.secondary {
                background: #6c757d;
            }
            .btn.danger {
                background: #dc3545;
            }
            .input-field {
                padding: 8px;
                margin: 5px;
                border: 1px solid #ddd;
                border-radius: 4px;
                width: 200px;
            }
            .output {
                background: #e9ecef;
                padding: 10px;
                margin: 10px 0;
                border-radius: 4px;
                font-family: monospace;
                min-height: 20px;
            }
            .draggable {
                padding: 10px;
                margin: 5px;
                background: #28a745;
                color: white;
                border-radius: 4px;
                cursor: move;
                display: inline-block;
            }
            .dropzone {
                min-height: 100px;
                border: 2px dashed #ccc;
                border-radius: 4px;
                padding: 20px;
                margin: 10px 0;
                text-align: center;
                background: #f8f9fa;
            }
            .dropzone.dragover {
                border-color: #007bff;
                background: #e3f2fd;
            }
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 1000;
            }
            .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px;
                border-radius: 8px;
                max-width: 400px;
                width: 90%;
            }
            .close {
                float: right;
                font-size: 24px;
                cursor: pointer;
            }
            .error {
                border-color: #dc3545 !important;
                background: #f8d7da !important;
            }
            .error-message {
                color: #dc3545;
                font-size: 12px;
                margin-top: 5px;
            }
        </style>
        
        <h2>Events & Event Handling Demo</h2>
        
        <!-- Basic Click Events -->
        <div class="demo-section">
            <h3>1. Basic Click Events</h3>
            <button id="basic-btn" class="btn">Click Me!</button>
            <button id="counter-btn" class="btn secondary">Counter: 0</button>
            <button id="remove-listener-btn" class="btn danger">Remove My Listener</button>
            <div id="click-output" class="output"></div>
        </div>
        
        <!-- Mouse Events -->
        <div class="demo-section">
            <h3>2. Mouse Events</h3>
            <div id="mouse-area" style="width: 200px; height: 100px; background: #e9ecef; border: 1px solid #ccc; padding: 10px; cursor: pointer;">
                Hover, click, and move mouse here
            </div>
            <div id="mouse-output" class="output"></div>
        </div>
        
        <!-- Keyboard Events -->
        <div class="demo-section">
            <h3>3. Keyboard Events</h3>
            <input type="text" id="keyboard-input" class="input-field" placeholder="Type here...">
            <div id="keyboard-output" class="output"></div>
        </div>
        
        <!-- Form Events -->
        <div class="demo-section">
            <h3>4. Form Events</h3>
            <form id="demo-form">
                <input type="text" id="username" class="input-field" placeholder="Username" required>
                <div class="error-message"></div>
                <input type="email" id="email" class="input-field" placeholder="Email" required>
                <div class="error-message"></div>
                <button type="submit" class="btn">Submit</button>
            </form>
            <div id="form-output" class="output"></div>
        </div>
        
        <!-- Event Delegation -->
        <div class="demo-section">
            <h3>5. Event Delegation</h3>
            <div id="delegation-container">
                <button class="dynamic-btn btn" data-action="alert">Alert Button</button>
                <button class="dynamic-btn btn" data-action="log">Log Button</button>
                <button class="dynamic-btn btn" data-action="change">Change Button</button>
            </div>
            <button id="add-btn" class="btn secondary">Add New Button</button>
            <div id="delegation-output" class="output"></div>
        </div>
        
        <!-- Event Propagation -->
        <div class="demo-section">
            <h3>6. Event Propagation</h3>
            <div id="outer" style="padding: 20px; background: #ffebee; border: 2px solid #f44336;">
                Outer Div
                <div id="middle" style="padding: 20px; background: #e8f5e8; border: 2px solid #4caf50; margin: 10px;">
                    Middle Div
                    <div id="inner" style="padding: 20px; background: #e3f2fd; border: 2px solid #2196f3; margin: 10px;">
                        Inner Div (Click me!)
                    </div>
                </div>
            </div>
            <button id="stop-propagation-btn" class="btn">Toggle Stop Propagation</button>
            <div id="propagation-output" class="output"></div>
        </div>
        
        <!-- Custom Events -->
        <div class="demo-section">
            <h3>7. Custom Events</h3>
            <button id="custom-event-btn" class="btn">Trigger Custom Event</button>
            <button id="user-login-btn" class="btn secondary">Simulate User Login</button>
            <div id="custom-output" class="output"></div>
        </div>
        
        <!-- Debouncing -->
        <div class="demo-section">
            <h3>8. Debouncing</h3>
            <input type="text" id="search-input" class="input-field" placeholder="Search (debounced)...">
            <div id="debounce-output" class="output"></div>
        </div>
        
        <!-- Throttling -->
        <div class="demo-section">
            <h3>9. Throttling</h3>
            <div id="scroll-area" style="height: 150px; overflow-y: scroll; border: 1px solid #ccc; padding: 10px;">
                <div style="height: 500px; background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);">
                    Scroll in this area to see throttling in action
                </div>
            </div>
            <div id="throttle-output" class="output"></div>
        </div>
        
        <!-- Drag and Drop -->
        <div class="demo-section">
            <h3>10. Drag and Drop</h3>
            <div class="draggable" draggable="true" data-id="1">Drag me 1</div>
            <div class="draggable" draggable="true" data-id="2">Drag me 2</div>
            <div class="draggable" draggable="true" data-id="3">Drag me 3</div>
            <div class="dropzone" id="dropzone">Drop items here</div>
            <div id="drag-output" class="output"></div>
        </div>
        
        <!-- Modal -->
        <div class="demo-section">
            <h3>11. Modal Dialog</h3>
            <button id="open-modal-btn" class="btn">Open Modal</button>
        </div>
        
        <!-- Modal HTML -->
        <div id="demo-modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h3>Demo Modal</h3>
                <p>This is a modal dialog. You can close it by:</p>
                <ul>
                    <li>Clicking the X button</li>
                    <li>Pressing the Escape key</li>
                    <li>Clicking outside the modal</li>
                </ul>
                <button class="btn">Modal Button</button>
            </div>
        </div>
    `

  document.body.appendChild(demoContainer)

  // 1. Basic Click Events
  console.log("\n--- Basic Click Events ---")

  const basicBtn = document.getElementById("basic-btn")
  const counterBtn = document.getElementById("counter-btn")
  const removeListenerBtn = document.getElementById("remove-listener-btn")
  const clickOutput = document.getElementById("click-output")

  let clickCount = 0

  // Basic click handler
  basicBtn.addEventListener("click", () => {
    clickOutput.textContent = `Basic button clicked at ${new Date().toLocaleTimeString()}`
    console.log("Basic button clicked")
  })

  // Counter with closure
  counterBtn.addEventListener("click", function () {
    clickCount++
    this.textContent = `Counter: ${clickCount}`
    clickOutput.textContent = `Counter button clicked ${clickCount} times`
    console.log("Counter:", clickCount)
  })

  // Removable event listener
  function removableHandler() {
    clickOutput.textContent = "This listener will be removed after first click"
    console.log("Removable handler called")
    removeListenerBtn.removeEventListener("click", removableHandler)
    removeListenerBtn.textContent = "Listener Removed"
    removeListenerBtn.disabled = true
  }

  removeListenerBtn.addEventListener("click", removableHandler)

  // 2. Mouse Events
  console.log("\n--- Mouse Events ---")

  const mouseArea = document.getElementById("mouse-area")
  const mouseOutput = document.getElementById("mouse-output")

  mouseArea.addEventListener("mouseenter", function () {
    mouseOutput.textContent = "Mouse entered the area"
    this.style.background = "#d4edda"
    console.log("Mouse entered")
  })

  mouseArea.addEventListener("mouseleave", function () {
    mouseOutput.textContent = "Mouse left the area"
    this.style.background = "#e9ecef"
    console.log("Mouse left")
  })

  mouseArea.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseOutput.textContent = `Mouse position: (${Math.round(x)}, ${Math.round(y)})`
  })

  mouseArea.addEventListener("click", (e) => {
    console.log("Mouse clicked at:", e.clientX, e.clientY)
    mouseOutput.textContent = `Clicked at global position: (${e.clientX}, ${e.clientY})`
  })

  mouseArea.addEventListener("dblclick", function () {
    console.log("Double clicked")
    mouseOutput.textContent = "Double clicked!"
    this.style.background = "#f8d7da"
    setTimeout(() => {
      this.style.background = "#e9ecef"
    }, 500)
  })

  // 3. Keyboard Events
  console.log("\n--- Keyboard Events ---")

  const keyboardInput = document.getElementById("keyboard-input")
  const keyboardOutput = document.getElementById("keyboard-output")

  keyboardInput.addEventListener("keydown", (e) => {
    console.log("Key down:", e.key)
    keyboardOutput.textContent = `Key down: ${e.key} (Code: ${e.code})`

    // Special key handling
    if (e.key === "Enter") {
      keyboardOutput.textContent += " - Enter key pressed!"
    }

    if (e.ctrlKey && e.key === "a") {
      e.preventDefault()
      keyboardOutput.textContent = "Ctrl+A prevented!"
    }
  })

  keyboardInput.addEventListener("keyup", (e) => {
    console.log("Key up:", e.key)
  })

  keyboardInput.addEventListener("input", (e) => {
    console.log("Input value:", e.target.value)
    keyboardOutput.textContent = `Input value: "${e.target.value}" (Length: ${e.target.value.length})`
  })

  // 4. Form Events
  console.log("\n--- Form Events ---")

  const demoForm = document.getElementById("demo-form")
  const usernameInput = document.getElementById("username")
  const emailInput = document.getElementById("email")
  const formOutput = document.getElementById("form-output")

  // Real-time validation
  function validateField(field) {
    const value = field.value.trim()
    const errorElement = field.parentNode.querySelector(".error-message")

    field.classList.remove("error")
    errorElement.textContent = ""

    if (field.hasAttribute("required") && !value) {
      field.classList.add("error")
      errorElement.textContent = "This field is required"
      return false
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        field.classList.add("error")
        errorElement.textContent = "Please enter a valid email"
        return false
      }
    }

    return true
  }

  usernameInput.addEventListener("input", function () {
    validateField(this)
  })

  usernameInput.addEventListener("focus", () => {
    console.log("Username field focused")
    formOutput.textContent = "Username field focused"
  })

  usernameInput.addEventListener("blur", function () {
    console.log("Username field blurred")
    validateField(this)
  })

  emailInput.addEventListener("input", function () {
    validateField(this)
  })

  emailInput.addEventListener("blur", function () {
    validateField(this)
  })

  demoForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("Form submitted")

    const isUsernameValid = validateField(usernameInput)
    const isEmailValid = validateField(emailInput)

    if (isUsernameValid && isEmailValid) {
      formOutput.textContent = `Form submitted successfully! Username: ${usernameInput.value}, Email: ${emailInput.value}`
    } else {
      formOutput.textContent = "Please fix the errors before submitting"
    }
  })

  // 5. Event Delegation
  console.log("\n--- Event Delegation ---")

  const delegationContainer = document.getElementById("delegation-container")
  const addBtn = document.getElementById("add-btn")
  const delegationOutput = document.getElementById("delegation-output")
  let buttonCounter = 3

  // Event delegation - single listener handles all buttons
  delegationContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dynamic-btn")) {
      const action = e.target.dataset.action
      console.log("Dynamic button clicked:", action)

      switch (action) {
        case "alert":
          alert("Alert button clicked!")
          delegationOutput.textContent = "Alert button clicked"
          break
        case "log":
          console.log("Log button clicked")
          delegationOutput.textContent = "Log button clicked (check console)"
          break
        case "change":
          e.target.textContent = `Changed! ${new Date().toLocaleTimeString()}`
          delegationOutput.textContent = "Button text changed"
          break
      }
    }
  })

  // Add new buttons dynamically
  addBtn.addEventListener("click", () => {
    buttonCounter++
    const newButton = document.createElement("button")
    newButton.className = "dynamic-btn btn"
    newButton.dataset.action = "log"
    newButton.textContent = `Dynamic Button ${buttonCounter}`
    delegationContainer.appendChild(newButton)
    delegationOutput.textContent = `Added button ${buttonCounter}`
    console.log("Added new button:", buttonCounter)
  })

  // 6. Event Propagation
  console.log("\n--- Event Propagation ---")

  const outer = document.getElementById("outer")
  const middle = document.getElementById("middle")
  const inner = document.getElementById("inner")
  const stopPropagationBtn = document.getElementById("stop-propagation-btn")
  const propagationOutput = document.getElementById("propagation-output")

  let stopPropagation = false

  outer.addEventListener("click", (e) => {
    console.log("Outer div clicked")
    propagationOutput.textContent += "Outer → "
  })

  middle.addEventListener("click", (e) => {
    console.log("Middle div clicked")
    propagationOutput.textContent += "Middle → "
  })

  inner.addEventListener("click", (e) => {
    console.log("Inner div clicked")
    propagationOutput.textContent = "Inner → "

    if (stopPropagation) {
      e.stopPropagation()
      propagationOutput.textContent += "(stopped)"
      console.log("Propagation stopped")
    }
  })

  stopPropagationBtn.addEventListener("click", function () {
    stopPropagation = !stopPropagation
    this.textContent = stopPropagation ? "Enable Propagation" : "Stop Propagation"
    propagationOutput.textContent = `Stop propagation: ${stopPropagation}`
    console.log("Stop propagation:", stopPropagation)
  })

  // 7. Custom Events
  console.log("\n--- Custom Events ---")

  const customEventBtn = document.getElementById("custom-event-btn")
  const userLoginBtn = document.getElementById("user-login-btn")
  const customOutput = document.getElementById("custom-output")

  // Listen for custom events
  document.addEventListener("myCustomEvent", (e) => {
    console.log("Custom event received:", e.detail)
    customOutput.textContent = `Custom event: ${e.detail.message} at ${e.detail.timestamp}`
  })

  document.addEventListener("userLogin", (e) => {
    console.log("User login event:", e.detail)
    customOutput.textContent = `User ${e.detail.username} logged in with role: ${e.detail.role}`
  })

  // Trigger custom events
  customEventBtn.addEventListener("click", () => {
    const customEvent = new CustomEvent("myCustomEvent", {
      detail: {
        message: "Hello from custom event!",
        timestamp: new Date().toLocaleTimeString(),
      },
      bubbles: true,
    })

    document.dispatchEvent(customEvent)
    console.log("Custom event dispatched")
  })

  userLoginBtn.addEventListener("click", () => {
    const loginEvent = new CustomEvent("userLogin", {
      detail: {
        username: "john_doe",
        role: "admin",
        loginTime: Date.now(),
      },
      bubbles: true,
    })

    document.dispatchEvent(loginEvent)
    console.log("User login event dispatched")
  })

  // 8. Debouncing
  console.log("\n--- Debouncing ---")

  const searchInput = document.getElementById("search-input")
  const debounceOutput = document.getElementById("debounce-output")

  function debounce(func, delay) {
    let timeoutId
    return function (...args) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(this, args), delay)
    }
  }

  function performSearch(query) {
    console.log("Searching for:", query)
    debounceOutput.textContent = `Searching for: "${query}" at ${new Date().toLocaleTimeString()}`
  }

  const debouncedSearch = debounce((e) => {
    performSearch(e.target.value)
  }, 300)

  searchInput.addEventListener("input", debouncedSearch)

  // Show immediate vs debounced
  searchInput.addEventListener("input", (e) => {
    // This runs immediately
    console.log("Immediate input:", e.target.value)
  })

  // 9. Throttling
  console.log("\n--- Throttling ---")

  const scrollArea = document.getElementById("scroll-area")
  const throttleOutput = document.getElementById("throttle-output")

  function throttle(func, delay) {
    let lastCall = 0
    return function (...args) {
      const now = Date.now()
      if (now - lastCall >= delay) {
        lastCall = now
        func.apply(this, args)
      }
    }
  }

  function handleScroll(e) {
    const scrollTop = e.target.scrollTop
    const scrollHeight = e.target.scrollHeight
    const clientHeight = e.target.clientHeight
    const scrollPercent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)

    console.log("Throttled scroll:", scrollPercent + "%")
    throttleOutput.textContent = `Scroll position: ${scrollPercent}% at ${new Date().toLocaleTimeString()}`
  }

  const throttledScroll = throttle(handleScroll, 100)
  scrollArea.addEventListener("scroll", throttledScroll)

  // Show immediate vs throttled
  let scrollCount = 0
  scrollArea.addEventListener("scroll", () => {
    scrollCount++
    // This runs on every scroll event
    console.log("Immediate scroll event:", scrollCount)
  })

  // 10. Drag and Drop
  console.log("\n--- Drag and Drop ---")

  const draggables = document.querySelectorAll(".draggable")
  const dropzone = document.getElementById("dropzone")
  const dragOutput = document.getElementById("drag-output")

  let draggedElement = null

  // Add drag event listeners to all draggable elements
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", function (e) {
      draggedElement = this
      this.style.opacity = "0.5"
      dragOutput.textContent = `Started dragging: ${this.textContent}`
      console.log("Drag started:", this.textContent)

      // Set drag data
      e.dataTransfer.setData("text/plain", this.dataset.id)
      e.dataTransfer.effectAllowed = "move"
    })

    draggable.addEventListener("dragend", function (e) {
      this.style.opacity = ""
      draggedElement = null
      console.log("Drag ended")
    })
  })

  // Dropzone events
  dropzone.addEventListener("dragover", function (e) {
    e.preventDefault() // Allow drop
    e.dataTransfer.dropEffect = "move"
    this.classList.add("dragover")
  })

  dropzone.addEventListener("dragleave", function (e) {
    this.classList.remove("dragover")
  })

  dropzone.addEventListener("drop", function (e) {
    e.preventDefault()
    this.classList.remove("dragover")

    const draggedId = e.dataTransfer.getData("text/plain")
    console.log("Dropped element with ID:", draggedId)

    if (draggedElement) {
      this.appendChild(draggedElement)
      dragOutput.textContent = `Dropped: ${draggedElement.textContent} into dropzone`
    }
  })

  // 11. Modal Dialog
  console.log("\n--- Modal Dialog ---")

  const openModalBtn = document.getElementById("open-modal-btn")
  const modal = document.getElementById("demo-modal")
  const closeBtn = modal.querySelector(".close")
  const modalContent = modal.querySelector(".modal-content")

  function openModal() {
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
    console.log("Modal opened")
  }

  function closeModal() {
    modal.style.display = "none"
    document.body.style.overflow = ""
    console.log("Modal closed")
  }

  // Open modal
  openModalBtn.addEventListener("click", openModal)

  // Close on X button
  closeBtn.addEventListener("click", closeModal)

  // Close on overlay click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  // Prevent modal content clicks from closing modal
  modalContent.addEventListener("click", (e) => {
    e.stopPropagation()
  })

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal()
    }
  })

  // 12. Window Events
  console.log("\n--- Window Events ---")

  // Resize event (throttled)
  const throttledResize = throttle(() => {
    console.log("Window resized:", window.innerWidth, "x", window.innerHeight)
  }, 250)

  window.addEventListener("resize", throttledResize)

  // Scroll event (throttled)
  const throttledWindowScroll = throttle(() => {
    console.log("Window scrolled:", window.scrollY)
  }, 100)

  window.addEventListener("scroll", throttledWindowScroll)

  // Before unload (commented out to avoid annoying users)
  // window.addEventListener('beforeunload', function(e) {
  //     e.preventDefault();
  //     e.returnValue = '';
  // });

  // 13. Performance Monitoring
  console.log("\n--- Performance Monitoring ---")

  // Monitor event listener performance
  function measureEventPerformance(eventName, element, handler) {
    element.addEventListener(eventName, function (e) {
      const start = performance.now()
      handler.call(this, e)
      const end = performance.now()
      console.log(`${eventName} handler took ${(end - start).toFixed(2)}ms`)
    })
  }

  // Example usage (commented out to avoid spam)
  // measureEventPerformance('click', basicBtn, function() {
  //     // Some expensive operation
  //     for (let i = 0; i < 10000; i++) {
  //         Math.random();
  //     }
  // });

  // 14. Event Listener Cleanup Example
  console.log("\n--- Event Listener Cleanup ---")

  class EventComponent {
    constructor() {
      this.handleClick = this.handleClick.bind(this)
      this.handleKeydown = this.handleKeydown.bind(this)
      this.isActive = false
    }

    mount() {
      if (!this.isActive) {
        document.addEventListener("click", this.handleClick)
        document.addEventListener("keydown", this.handleKeydown)
        this.isActive = true
        console.log("Event component mounted")
      }
    }

    unmount() {
      if (this.isActive) {
        document.removeEventListener("click", this.handleClick)
        document.removeEventListener("keydown", this.handleKeydown)
        this.isActive = false
        console.log("Event component unmounted")
      }
    }

    handleClick(e) {
      console.log("Component click handler")
    }

    handleKeydown(e) {
      if (e.key === "Escape") {
        console.log("Component escape handler")
      }
    }
  }

  // Create and demonstrate component
  const eventComponent = new EventComponent()

  // Add controls for mounting/unmounting
  const mountBtn = document.createElement("button")
  mountBtn.textContent = "Mount Component"
  mountBtn.className = "btn"
  mountBtn.addEventListener("click", () => eventComponent.mount())

  const unmountBtn = document.createElement("button")
  unmountBtn.textContent = "Unmount Component"
  unmountBtn.className = "btn secondary"
  unmountBtn.addEventListener("click", () => eventComponent.unmount())

  const componentSection = document.createElement("div")
  componentSection.className = "demo-section"
  componentSection.innerHTML = "<h3>12. Component Lifecycle</h3>"
  componentSection.appendChild(mountBtn)
  componentSection.appendChild(unmountBtn)

  demoContainer.appendChild(componentSection)

  console.log("All event examples set up successfully!")
})

// Global event listeners that don't need DOM
console.log("\n--- Global Events ---")

// Page visibility
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("Page is now hidden")
  } else {
    console.log("Page is now visible")
  }
})

// Online/offline status
window.addEventListener("online", () => {
  console.log("Browser is online")
})

window.addEventListener("offline", () => {
  console.log("Browser is offline")
})

console.log("Events & Event Handling demo setup complete!")
