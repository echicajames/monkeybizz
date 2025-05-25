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
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false
  }),
  
  actions: {
    login(username: string, password: string) {
      // Static account check
      if (username === 'admin' && password === 'password') {
        this.user = {
          username: 'admin',
          isAdmin: true
        }
        this.isAuthenticated = true
        return true
      }
      return false
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
    }
  }
}) 