// user.js - User management module

export class User {
  constructor(name, email, age) {
    this.name = name
    this.email = email
    this.age = age
    this.id = Date.now().toString()
  }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
    }
  }

  updateEmail(newEmail) {
    this.email = newEmail
  }
}

export class UserManager {
  constructor() {
    this.users = []
  }

  addUser(name, email, age) {
    const user = new User(name, email, age)
    this.users.push(user)
    return user
  }

  removeUser(id) {
    this.users = this.users.filter((user) => user.id !== id)
  }

  findUser(id) {
    return this.users.find((user) => user.id === id)
  }

  getAllUsers() {
    return this.users.map((user) => user.getInfo())
  }
}

// Utility functions
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateAge(age) {
  return age >= 0 && age <= 150
}
