import { defineStore } from 'pinia'
import api, { csrf } from '@/services/api'

interface User {
  id: number
  name: string
  email: string
  // Add other user properties as needed
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  initialized: boolean
  initializationInProgress: boolean
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    initialized: false,
    initializationInProgress: false,
    token: localStorage.getItem('token')
  }),

  actions: {
    async initializeAuth() {
      // If we have a token, set it in the API headers
      if (this.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      }

      // Prevent multiple simultaneous initialization attempts
      if (this.initializationInProgress || this.initialized) {
        return
      }

      this.initializationInProgress = true

      try {
        // Get CSRF token
        await csrf()
        // Check if user is authenticated
        const response = await api.get('/user')
        
        this.user = response.data
        this.isAuthenticated = true
        this.persistAuthState()
      } catch (error) {
        this.clearAuthState()
      } finally {
        this.initialized = true
        this.initializationInProgress = false
      }
    },

    persistAuthState() {
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('isAuthenticated', String(this.isAuthenticated))
      if (this.token) {
        localStorage.setItem('token', this.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      }
    },

    clearAuthState() {
      this.user = null
      this.isAuthenticated = false
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    },

    async login(email: string, password: string) {
      try {
        // Get CSRF token first
        await csrf()
        
        // Attempt login
        const response = await api.post('/login', { email, password })
        
        if (response.data.data.user) {
          this.user = response.data.data.user
          this.isAuthenticated = true
          this.initialized = true
          
          // Store the token if it's in the response
          if (response.data.data.token) {
            this.token = response.data.data.token
          }
          
          this.persistAuthState()
        }
        
        return response
      } catch (error) {
        this.clearAuthState()
        throw error
      }
    },

    async logout() {
      try {
        await api.post('/logout')
      } finally {
        this.clearAuthState()
        this.initialized = false
        this.initializationInProgress = false
      }
    }
  }
}) 