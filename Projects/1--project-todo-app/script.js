// Main Todo App Script

// Import TodoManager class
// TodoManager is loaded via <script src="todo-manager.js"></script> in the HTML

class TodoApp {
  constructor() {
    this.todoManager = new TodoManager()
    this.draggedElement = null
    this.editingTodoId = null

    this.initializeElements()
    this.attachEventListeners()
    this.render()
    this.updateThemeToggle()
  }

  initializeElements() {
    // Form elements
    this.addTodoForm = document.getElementById("addTodoForm")
    this.todoInput = document.getElementById("todoInput")
    this.todoPriority = document.getElementById("todoPriority")
    this.todoDueDate = document.getElementById("todoDueDate")
    this.todoCategory = document.getElementById("todoCategory")

    // Control elements
    this.filterButtons = document.querySelectorAll(".filter-btn")
    this.clearCompletedBtn = document.getElementById("clearCompleted")
    this.toggleAllBtn = document.getElementById("toggleAll")
    this.searchInput = document.getElementById("searchInput")
    this.clearSearchBtn = document.getElementById("clearSearch")

    // Display elements
    this.todoList = document.getElementById("todoList")
    this.emptyState = document.getElementById("emptyState")
    this.totalCount = document.getElementById("totalCount")
    this.activeCount = document.getElementById("activeCount")
    this.completedCount = document.getElementById("completedCount")

    // Theme toggle
    this.themeToggle = document.getElementById("themeToggle")

    // Modal elements
    this.editModal = document.getElementById("editModal")
    this.editTodoForm = document.getElementById("editTodoForm")
    this.editTodoText = document.getElementById("editTodoText")
    this.editTodoPriority = document.getElementById("editTodoPriority")
    this.editTodoDueDate = document.getElementById("editTodoDueDate")
    this.editTodoCategory = document.getElementById("editTodoCategory")
    this.modalClose = document.querySelector(".modal-close")
    this.cancelEdit = document.getElementById("cancelEdit")
  }

  attachEventListeners() {
    // Form submission
    this.addTodoForm.addEventListener("submit", (e) => this.handleAddTodo(e))

    // Filter buttons
    this.filterButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleFilterChange(e))
    })

    // Action buttons
    this.clearCompletedBtn.addEventListener("click", () => this.handleClearCompleted())
    this.toggleAllBtn.addEventListener("click", () => this.handleToggleAll())

    // Search
    this.searchInput.addEventListener("input", (e) => this.handleSearch(e))
    this.clearSearchBtn.addEventListener("click", () => this.handleClearSearch())

    // Theme toggle
    this.themeToggle.addEventListener("click", () => this.toggleTheme())

    // Modal events
    this.editTodoForm.addEventListener("submit", (e) => this.handleEditSubmit(e))
    this.modalClose.addEventListener("click", () => this.closeEditModal())
    this.cancelEdit.addEventListener("click", () => this.closeEditModal())
    this.editModal.addEventListener("click", (e) => {
      if (e.target === this.editModal) {
        this.closeEditModal()
      }
    })

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => this.handleKeyboardShortcuts(e))

    // Todo list events (delegated)
    this.todoList.addEventListener("click", (e) => this.handleTodoListClick(e))
    this.todoList.addEventListener("change", (e) => this.handleTodoListChange(e))
    this.todoList.addEventListener("dblclick", (e) => this.handleTodoDoubleClick(e))

    // Drag and drop
    this.todoList.addEventListener("dragstart", (e) => this.handleDragStart(e))
    this.todoList.addEventListener("dragover", (e) => this.handleDragOver(e))
    this.todoList.addEventListener("drop", (e) => this.handleDrop(e))
    this.todoList.addEventListener("dragend", (e) => this.handleDragEnd(e))
  }

  // Event handlers
  handleAddTodo(e) {
    e.preventDefault()

    const text = this.todoInput.value.trim()
    const priority = this.todoPriority.value
    const dueDate = this.todoDueDate.value || null
    const category = this.todoCategory.value.trim()

    if (!text) {
      this.showNotification("Please enter a todo text", "error")
      return
    }

    try {
      this.todoManager.addTodo(text, priority, dueDate, category)
      this.clearForm()
      this.render()
      this.showNotification("Todo added successfully!", "success")
      this.todoInput.focus()
    } catch (error) {
      this.showNotification(error.message, "error")
    }
  }

  handleFilterChange(e) {
    const filter = e.target.dataset.filter

    // Update active filter button
    this.filterButtons.forEach((btn) => btn.classList.remove("active"))
    e.target.classList.add("active")

    // Update filter in manager
    this.todoManager.setFilter(filter)
    this.render()
  }

  handleClearCompleted() {
    const count = this.todoManager.clearCompleted()
    this.render()

    if (count > 0) {
      this.showNotification(`Cleared ${count} completed todo${count !== 1 ? "s" : ""}`, "success")
    } else {
      this.showNotification("No completed todos to clear", "info")
    }
  }

  handleToggleAll() {
    const allCompleted = this.todoManager.toggleAllTodos()
    this.render()

    const message = allCompleted ? "All todos marked as completed" : "All todos marked as active"
    this.showNotification(message, "success")
  }

  handleSearch(e) {
    this.todoManager.setSearchQuery(e.target.value)
    this.render()

    // Show/hide clear search button
    this.clearSearchBtn.style.display = e.target.value ? "block" : "none"
  }

  handleClearSearch() {
    this.searchInput.value = ""
    this.todoManager.setSearchQuery("")
    this.clearSearchBtn.style.display = "none"
    this.render()
    this.searchInput.focus()
  }

  handleTodoListClick(e) {
    const todoItem = e.target.closest(".todo-item")
    if (!todoItem) return

    const todoId = Number.parseInt(todoItem.dataset.id)

    if (e.target.classList.contains("edit-btn")) {
      this.openEditModal(todoId)
    } else if (e.target.classList.contains("delete-btn")) {
      this.deleteTodo(todoId)
    }
  }

  handleTodoListChange(e) {
    if (e.target.classList.contains("todo-checkbox")) {
      const todoItem = e.target.closest(".todo-item")
      const todoId = Number.parseInt(todoItem.dataset.id)

      try {
        this.todoManager.updateTodo(todoId, { completed: e.target.checked })
        this.render()

        const action = e.target.checked ? "completed" : "reactivated"
        this.showNotification(`Todo ${action}`, "success")
      } catch (error) {
        this.showNotification(error.message, "error")
        e.target.checked = !e.target.checked // Revert checkbox
      }
    }
  }

  handleTodoDoubleClick(e) {
    const todoItem = e.target.closest(".todo-item")
    if (todoItem && e.target.classList.contains("todo-text")) {
      const todoId = Number.parseInt(todoItem.dataset.id)
      this.openEditModal(todoId)
    }
  }

  handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + Enter to add todo
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && document.activeElement === this.todoInput) {
      this.addTodoForm.dispatchEvent(new Event("submit"))
    }

    // Escape to close modal
    if (e.key === "Escape" && this.editModal.classList.contains("active")) {
      this.closeEditModal()
    }

    // Ctrl/Cmd + F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === "f") {
      e.preventDefault()
      this.searchInput.focus()
    }
  }

  // Drag and drop handlers
  handleDragStart(e) {
    if (!e.target.classList.contains("todo-item")) return

    this.draggedElement = e.target
    e.target.classList.add("dragging")
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/html", e.target.outerHTML)
  }

  handleDragOver(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"

    const afterElement = this.getDragAfterElement(this.todoList, e.clientY)
    const dragging = document.querySelector(".dragging")

    if (afterElement == null) {
      this.todoList.appendChild(dragging)
    } else {
      this.todoList.insertBefore(dragging, afterElement)
    }
  }

  handleDrop(e) {
    e.preventDefault()

    if (this.draggedElement) {
      const fromIndex = Array.from(this.todoList.children).indexOf(this.draggedElement)
      const toIndex = Array.from(this.todoList.children).indexOf(e.target.closest(".todo-item"))

      if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
        this.todoManager.reorderTodos(fromIndex, toIndex)
        this.render()
        this.showNotification("Todo reordered", "success")
      }
    }
  }

  handleDragEnd(e) {
    if (e.target.classList.contains("todo-item")) {
      e.target.classList.remove("dragging")
    }
    this.draggedElement = null
  }

  getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".todo-item:not(.dragging)")]

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child }
        } else {
          return closest
        }
      },
      { offset: Number.NEGATIVE_INFINITY },
    ).element
  }

  // Modal methods
  openEditModal(todoId) {
    const todo = this.todoManager.getTodo(todoId)
    if (!todo) return

    this.editingTodoId = todoId

    // Populate form
    this.editTodoText.value = todo.text
    this.editTodoPriority.value = todo.priority
    this.editTodoDueDate.value = todo.dueDate ? todo.dueDate.toISOString().split("T")[0] : ""
    this.editTodoCategory.value = todo.category

    // Show modal
    this.editModal.classList.add("active")
    this.editModal.setAttribute("aria-hidden", "false")
    this.editTodoText.focus()

    // Prevent body scroll
    document.body.style.overflow = "hidden"
  }

  closeEditModal() {
    this.editModal.classList.remove("active")
    this.editModal.setAttribute("aria-hidden", "true")
    this.editingTodoId = null

    // Restore body scroll
    document.body.style.overflow = ""

    // Clear form
    this.editTodoForm.reset()
  }

  handleEditSubmit(e) {
    e.preventDefault()

    if (!this.editingTodoId) return

    const updates = {
      text: this.editTodoText.value.trim(),
      priority: this.editTodoPriority.value,
      dueDate: this.editTodoDueDate.value || null,
      category: this.editTodoCategory.value.trim(),
    }

    try {
      this.todoManager.updateTodo(this.editingTodoId, updates)
      this.closeEditModal()
      this.render()
      this.showNotification("Todo updated successfully!", "success")
    } catch (error) {
      this.showNotification(error.message, "error")
    }
  }

  // Todo operations
  deleteTodo(todoId) {
    if (confirm("Are you sure you want to delete this todo?")) {
      try {
        this.todoManager.deleteTodo(todoId)
        this.render()
        this.showNotification("Todo deleted", "success")
      } catch (error) {
        this.showNotification(error.message, "error")
      }
    }
  }

  // Theme methods
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light"
    const newTheme = currentTheme === "light" ? "dark" : "light"

    document.documentElement.setAttribute("data-theme", newTheme)
    this.updateThemeToggle()
    this.todoManager.saveSettings()

    this.showNotification(`Switched to ${newTheme} theme`, "success")
  }

  updateThemeToggle() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light"
    this.themeToggle.textContent = currentTheme === "light" ? "🌙" : "☀️"
    this.themeToggle.setAttribute("aria-label", `Switch to ${currentTheme === "light" ? "dark" : "light"} theme`)
  }

  // Utility methods
  clearForm() {
    this.todoInput.value = ""
    this.todoPriority.value = "medium"
    this.todoDueDate.value = ""
    this.todoCategory.value = ""
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message

    // Style the notification
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "12px 20px",
      borderRadius: "6px",
      color: "white",
      fontWeight: "600",
      zIndex: "10000",
      transform: "translateX(100%)",
      transition: "transform 0.3s ease",
      maxWidth: "300px",
      wordWrap: "break-word",
    })

    // Set background color based on type
    const colors = {
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
    }
    notification.style.backgroundColor = colors[type] || colors.info

    // Add to DOM
    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 10)

    // Remove after delay
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }

  // Render methods
  render() {
    this.renderTodos()
    this.renderStats()
    this.renderControls()
  }

  renderTodos() {
    const todos = this.todoManager.getFilteredTodos()

    if (todos.length === 0) {
      this.todoList.style.display = "none"
      this.emptyState.style.display = "block"
      return
    }

    this.todoList.style.display = "block"
    this.emptyState.style.display = "none"

    this.todoList.innerHTML = todos.map((todo) => this.createTodoElement(todo)).join("")
  }

  createTodoElement(todo) {
    const isOverdue = this.todoManager.isOverdue(todo)
    const formattedDueDate = this.todoManager.formatDueDate(todo.dueDate)

    return `
            <li class="todo-item priority-${todo.priority} ${todo.completed ? "completed" : ""}" 
                data-id="${todo.id}" 
                draggable="true">
                <input type="checkbox" 
                       class="todo-checkbox" 
                       ${todo.completed ? "checked" : ""}
                       aria-label="Mark todo as ${todo.completed ? "incomplete" : "complete"}">
                
                <div class="todo-content">
                    <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                    <div class="todo-meta">
                        ${todo.category ? `<span class="todo-category">${this.escapeHtml(todo.category)}</span>` : ""}
                        ${todo.dueDate ? `<span class="todo-due-date ${isOverdue ? "overdue" : ""}">${formattedDueDate}</span>` : ""}
                        <span class="todo-priority">Priority: ${todo.priority}</span>
                    </div>
                </div>
                
                <div class="todo-actions">
                    <button class="todo-action-btn edit-btn" aria-label="Edit todo">Edit</button>
                    <button class="todo-action-btn delete-btn" aria-label="Delete todo">Delete</button>
                </div>
            </li>
        `
  }

  renderStats() {
    const stats = this.todoManager.getStats()

    this.totalCount.textContent = stats.total
    this.activeCount.textContent = stats.active
    this.completedCount.textContent = stats.completed
  }

  renderControls() {
    const stats = this.todoManager.getStats()

    // Update filter buttons
    this.filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === this.todoManager.currentFilter)
    })

    // Update action buttons
    this.clearCompletedBtn.disabled = stats.completed === 0
    this.toggleAllBtn.disabled = stats.total === 0

    // Update button text
    const hasIncomplete = stats.active > 0
    this.toggleAllBtn.textContent = hasIncomplete ? "Complete All" : "Activate All"
  }

  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TodoApp()
})

// Service Worker registration (if available)
  if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Register service worker from the same folder as this script.
    // Using an absolute root path ("/sw.js") can 404 when the page
    // is served from a subfolder (e.g. Live Server). Use a relative path instead.
    navigator.serviceWorker
      .register("scripts/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
