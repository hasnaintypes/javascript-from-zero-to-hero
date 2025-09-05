// Storage Manager - Utility class for handling browser storage

class StorageManager {
  constructor() {
    this.isLocalStorageAvailable = this.checkStorageAvailability("localStorage")
    this.isSessionStorageAvailable = this.checkStorageAvailability("sessionStorage")
  }

  checkStorageAvailability(type) {
    try {
      const storage = window[type]
      const test = "__storage_test__"
      storage.setItem(test, test)
      storage.removeItem(test)
      return true
    } catch (error) {
      console.warn(`${type} is not available:`, error)
      return false
    }
  }

  // localStorage methods
  setLocal(key, value) {
    if (!this.isLocalStorageAvailable) {
      console.warn("localStorage not available")
      return false
    }

    try {
      const serializedValue = typeof value === "string" ? value : JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
      return true
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      return false
    }
  }

  getLocal(key, defaultValue = null) {
    if (!this.isLocalStorageAvailable) {
      return defaultValue
    }

    try {
      const value = localStorage.getItem(key)
      if (value === null) return defaultValue

      // Try to parse as JSON, fallback to string
      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return defaultValue
    }
  }

  removeLocal(key) {
    if (!this.isLocalStorageAvailable) return false

    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error("Error removing from localStorage:", error)
      return false
    }
  }

  clearLocal() {
    if (!this.isLocalStorageAvailable) return false

    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error("Error clearing localStorage:", error)
      return false
    }
  }

  // sessionStorage methods
  setSession(key, value) {
    if (!this.isSessionStorageAvailable) {
      console.warn("sessionStorage not available")
      return false
    }

    try {
      const serializedValue = typeof value === "string" ? value : JSON.stringify(value)
      sessionStorage.setItem(key, serializedValue)
      return true
    } catch (error) {
      console.error("Error saving to sessionStorage:", error)
      return false
    }
  }

  getSession(key, defaultValue = null) {
    if (!this.isSessionStorageAvailable) {
      return defaultValue
    }

    try {
      const value = sessionStorage.getItem(key)
      if (value === null) return defaultValue

      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    } catch (error) {
      console.error("Error reading from sessionStorage:", error)
      return defaultValue
    }
  }

  // Get all keys
  getAllLocalKeys() {
    if (!this.isLocalStorageAvailable) return []
    return Object.keys(localStorage)
  }

  getAllSessionKeys() {
    if (!this.isSessionStorageAvailable) return []
    return Object.keys(sessionStorage)
  }

  // Get storage info
  getStorageInfo() {
    const info = {
      localStorage: {
        available: this.isLocalStorageAvailable,
        keys: this.getAllLocalKeys(),
        size: 0,
      },
      sessionStorage: {
        available: this.isSessionStorageAvailable,
        keys: this.getAllSessionKeys(),
        size: 0,
      },
    }

    // Calculate approximate size
    if (this.isLocalStorageAvailable) {
      info.localStorage.size = JSON.stringify(localStorage).length
    }

    if (this.isSessionStorageAvailable) {
      info.sessionStorage.size = JSON.stringify(sessionStorage).length
    }

    return info
  }
}

// Web APIs Manager
class WebAPIsManager {
  constructor() {
    this.geolocationAvailable = "geolocation" in navigator
    this.notificationAvailable = "Notification" in window
    this.fileAPIAvailable = "FileReader" in window
  }

  // Geolocation API
  async getCurrentPosition(options = {}) {
    if (!this.geolocationAvailable) {
      throw new Error("Geolocation not supported")
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    }

    const finalOptions = { ...defaultOptions, ...options }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          }),
        (error) => reject(new Error(`Geolocation error: ${error.message}`)),
        finalOptions,
      )
    })
  }

  // Notification API
  async requestNotificationPermission() {
    if (!this.notificationAvailable) {
      throw new Error("Notifications not supported")
    }

    if (Notification.permission === "granted") {
      return "granted"
    }

    if (Notification.permission === "denied") {
      throw new Error("Notification permission denied")
    }

    const permission = await Notification.requestPermission()
    return permission
  }

  showNotification(title, options = {}) {
    if (!this.notificationAvailable) {
      console.warn("Notifications not supported")
      return null
    }

    if (Notification.permission !== "granted") {
      console.warn("Notification permission not granted")
      return null
    }

    const defaultOptions = {
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      tag: "default",
    }

    const finalOptions = { ...defaultOptions, ...options }

    return new Notification(title, finalOptions)
  }

  // File API
  readFileAsText(file) {
    if (!this.fileAPIAvailable) {
      throw new Error("File API not supported")
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (event) => resolve(event.target.result)
      reader.onerror = (error) => reject(error)

      reader.readAsText(file)
    })
  }

  readFileAsDataURL(file) {
    if (!this.fileAPIAvailable) {
      throw new Error("File API not supported")
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (event) => resolve(event.target.result)
      reader.onerror = (error) => reject(error)

      reader.readAsDataURL(file)
    })
  }
}

// Demo usage
console.log("=== Storage & Web APIs Demo ===")

const storage = new StorageManager()
const webAPIs = new WebAPIsManager()

// Storage demo
console.log("Storage info:", storage.getStorageInfo())

// Save some data
storage.setLocal("user", { name: "John", age: 30, preferences: { theme: "dark" } })
storage.setLocal("settings", { language: "en", notifications: true })
storage.setSession("currentSession", { startTime: Date.now(), page: "home" })

// Retrieve data
console.log("User data:", storage.getLocal("user"))
console.log("Settings:", storage.getLocal("settings"))
console.log("Session data:", storage.getSession("currentSession"))

// Web APIs demo
async function demoWebAPIs() {
  try {
    // Geolocation
    if (webAPIs.geolocationAvailable) {
      console.log("Geolocation is available")
      // Uncomment to test (requires user permission)
      // const position = await webAPIs.getCurrentPosition();
      // console.log('Current position:', position);
    }

    // Notifications
    if (webAPIs.notificationAvailable) {
      console.log("Notifications are available")
      // Uncomment to test (requires user permission)
      // const permission = await webAPIs.requestNotificationPermission();
      // if (permission === 'granted') {
      //     webAPIs.showNotification('Hello!', { body: 'This is a test notification' });
      // }
    }
  } catch (error) {
    console.error("Web API error:", error)
  }
}

demoWebAPIs()
