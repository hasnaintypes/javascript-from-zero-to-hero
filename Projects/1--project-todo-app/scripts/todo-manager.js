// Todo Manager Class - Handles all todo operations and persistence

class TodoManager {
  constructor() {
    this.todos = []
    this.currentFilter = "all"
    this.searchQuery = ""
    this.nextId = 1
    this.storageKey = "todoApp_todos"
    this.settingsKey = "todoApp_settings"

    this.loadFromStorage()
    this.loadSettings()
  }

  // Storage methods
  saveToStorage() {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify({
          todos: this.todos,
          nextId: this.nextId,
        }),
      )
      return true
    } catch (error) {
      console.error("Failed to save to localStorage:", error)
      return false
    }
  }

  loadFromStorage() {
    try {
      const data = localStorage.getItem(this.storageKey)
      if (data) {
        const parsed = JSON.parse(data)
        this.todos = parsed.todos || []
        this.nextId = parsed.nextId || 1

        // Convert date strings back to Date objects
        this.todos.forEach((todo) => {
          if (todo.dueDate) {
            todo.dueDate = new Date(todo.dueDate)
          }
          if (todo.createdAt) {
            todo.createdAt = new Date(todo.createdAt)
          }
          if (todo.updatedAt) {
            todo.updatedAt = new Date(todo.updatedAt)
          }
        })
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error)
      this.todos = []
      this.nextId = 1
    }
  }

  saveSettings() {
    try {
      const settings = {
        theme: document.documentElement.getAttribute("data-theme") || "light",
        currentFilter: this.currentFilter,
      }
      localStorage.setItem(this.settingsKey, JSON.stringify(settings))
    } catch (error) {
      console.error("Failed to save settings:", error)
    }
  }

  loadSettings() {
    try {
      const data = localStorage.getItem(this.settingsKey)
      if (data) {
        const settings = JSON.parse(data)
        if (settings.theme) {
          document.documentElement.setAttribute("data-theme", settings.theme)
        }
        if (settings.currentFilter) {
          this.currentFilter = settings.currentFilter
        }
      }
    } catch (error) {
      console.error("Failed to load settings:", error)
    }
  }

  // Todo CRUD operations
  addTodo(text, priority = "medium", dueDate = null, category = "") {
    if (!text || text.trim() === "") {
      throw new Error("Todo text cannot be empty")
    }

    const todo = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
      priority: priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      category: category.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.todos.push(todo)
    this.saveToStorage()
    return todo
  }

  updateTodo(id, updates) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id)
    if (todoIndex === -1) {
      throw new Error("Todo not found")
    }

    const todo = this.todos[todoIndex]

    // Update allowed fields
    if (updates.text !== undefined) {
      if (!updates.text || updates.text.trim() === "") {
        throw new Error("Todo text cannot be empty")
      }
      todo.text = updates.text.trim()
    }

    if (updates.completed !== undefined) {
      todo.completed = Boolean(updates.completed)
    }

    if (updates.priority !== undefined) {
      todo.priority = updates.priority
    }

    if (updates.dueDate !== undefined) {
      todo.dueDate = updates.dueDate ? new Date(updates.dueDate) : null
    }

    if (updates.category !== undefined) {
      todo.category = updates.category.trim()
    }

    todo.updatedAt = new Date()
    this.saveToStorage()
    return todo
  }

  deleteTodo(id) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id)
    if (todoIndex === -1) {
      throw new Error("Todo not found")
    }

    const deletedTodo = this.todos.splice(todoIndex, 1)[0]
    this.saveToStorage()
    return deletedTodo
  }

  getTodo(id) {
    return this.todos.find((todo) => todo.id === id)
  }

  // Bulk operations
  toggleAllTodos() {
    const hasIncomplete = this.todos.some((todo) => !todo.completed)

    this.todos.forEach((todo) => {
      todo.completed = hasIncomplete
      todo.updatedAt = new Date()
    })

    this.saveToStorage()
    return hasIncomplete
  }

  clearCompleted() {
    const completedCount = this.todos.filter((todo) => todo.completed).length
    this.todos = this.todos.filter((todo) => !todo.completed)
    this.saveToStorage()
    return completedCount
  }

  // Filtering and searching
  setFilter(filter) {
    if (["all", "active", "completed"].includes(filter)) {
      this.currentFilter = filter
      this.saveSettings()
    }
  }

  setSearchQuery(query) {
    this.searchQuery = query.toLowerCase().trim()
  }

  getFilteredTodos() {
    let filtered = [...this.todos]

    // Apply status filter
    switch (this.currentFilter) {
      case "active":
        filtered = filtered.filter((todo) => !todo.completed)
        break
      case "completed":
        filtered = filtered.filter((todo) => todo.completed)
        break
      // 'all' shows everything
    }

    // Apply search filter
    if (this.searchQuery) {
      filtered = filtered.filter(
        (todo) =>
          todo.text.toLowerCase().includes(this.searchQuery) || todo.category.toLowerCase().includes(this.searchQuery),
      )
    }

    // Sort by priority and due date
    filtered.sort((a, b) => {
      // First sort by completion status (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }

      // Then by priority
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
      if (priorityDiff !== 0) {
        return priorityDiff
      }

      // Then by due date (overdue first, then nearest)
      if (a.dueDate && b.dueDate) {
        return a.dueDate - b.dueDate
      } else if (a.dueDate) {
        return -1
      } else if (b.dueDate) {
        return 1
      }

      // Finally by creation date (newest first)
      return b.createdAt - a.createdAt
    })

    return filtered
  }

  // Statistics
  getStats() {
    const total = this.todos.length
    const completed = this.todos.filter((todo) => todo.completed).length
    const active = total - completed

    return {
      total,
      active,
      completed,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  }

  // Utility methods
  isOverdue(todo) {
    if (!todo.dueDate || todo.completed) {
      return false
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dueDate = new Date(todo.dueDate)
    dueDate.setHours(0, 0, 0, 0)

    return dueDate < today
  }

  formatDueDate(dueDate) {
    if (!dueDate) return ""

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const dueDateObj = new Date(dueDate)

    // Reset time for comparison
    today.setHours(0, 0, 0, 0)
    tomorrow.setHours(0, 0, 0, 0)
    dueDateObj.setHours(0, 0, 0, 0)

    if (dueDateObj.getTime() === today.getTime()) {
      return "Today"
    } else if (dueDateObj.getTime() === tomorrow.getTime()) {
      return "Tomorrow"
    } else {
      return dueDateObj.toLocaleDateString()
    }
  }

  // Reordering
  reorderTodos(fromIndex, toIndex) {
    const filtered = this.getFilteredTodos()
    if (fromIndex < 0 || fromIndex >= filtered.length || toIndex < 0 || toIndex >= filtered.length) {
      return false
    }

    // Find the actual indices in the full todos array
    const fromTodo = filtered[fromIndex]
    const toTodo = filtered[toIndex]

    const fromActualIndex = this.todos.findIndex((todo) => todo.id === fromTodo.id)
    const toActualIndex = this.todos.findIndex((todo) => todo.id === toTodo.id)

    // Move the todo
    const [movedTodo] = this.todos.splice(fromActualIndex, 1)
    this.todos.splice(toActualIndex, 0, movedTodo)

    this.saveToStorage()
    return true
  }

  // Export/Import
  exportTodos() {
    const exportData = {
      todos: this.todos,
      exportDate: new Date().toISOString(),
      version: "1.0",
    }

    return JSON.stringify(exportData, null, 2)
  }

  importTodos(jsonData) {
    try {
      const data = JSON.parse(jsonData)

      if (!data.todos || !Array.isArray(data.todos)) {
        throw new Error("Invalid data format")
      }

      // Validate and process imported todos
      const importedTodos = data.todos.map((todo) => {
        if (!todo.text || typeof todo.text !== "string") {
          throw new Error("Invalid todo format")
        }

        return {
          id: this.nextId++,
          text: todo.text,
          completed: Boolean(todo.completed),
          priority: ["low", "medium", "high"].includes(todo.priority) ? todo.priority : "medium",
          dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
          category: typeof todo.category === "string" ? todo.category : "",
          createdAt: todo.createdAt ? new Date(todo.createdAt) : new Date(),
          updatedAt: new Date(),
        }
      })

      this.todos.push(...importedTodos)
      this.saveToStorage()

      return importedTodos.length
    } catch (error) {
      throw new Error(`Import failed: ${error.message}`)
    }
  }

  // Clear all data
  clearAllData() {
    this.todos = []
    this.nextId = 1
    this.currentFilter = "all"
    this.searchQuery = ""

    try {
      localStorage.removeItem(this.storageKey)
      localStorage.removeItem(this.settingsKey)
    } catch (error) {
      console.error("Failed to clear localStorage:", error)
    }

    return true
  }
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = TodoManager
}
