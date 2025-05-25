import { defineStore } from 'pinia'

interface User {
  username: string
  isAdmin: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    const savedUser = localStorage.getItem('user')
    const savedAuth = localStorage.getItem('isAuthenticated')
    
    return {
      user: savedUser ? JSON.parse(savedUser) : null,
      isAuthenticated: savedAuth === 'true'
    }
  },
  
  actions: {
    login(username: string, password: string) {
      // Static account check
      if (username === 'admin' && password === 'password') {
        this.user = {
          username: 'admin',
          isAdmin: true
        }
        this.isAuthenticated = true
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('isAuthenticated', 'true')
        
        return true
      }
      return false
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
      
      // Clear localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    }
  }
}) 