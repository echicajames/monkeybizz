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
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    initialized: false,
    initializationInProgress: false
  }),

  actions: {
    async initializeAuth() {
      // Prevent multiple simultaneous initialization attempts
      if (this.initializationInProgress || this.initialized) {
        return
      }

      this.initializationInProgress = true

      try {
        // Get CSRF token
        await csrf()
        // Check if user is authenticated
        const response = await api.get('/user');

        // To do
        this.user = response.data
        this.isAuthenticated = true
      } catch (error) {
        this.user = null
        this.isAuthenticated = false
        // Don't throw the error, just handle it silently
      } finally {
        this.initialized = true
        this.initializationInProgress = false
      }
    },

    async login(email: string, password: string) {
      try {
        // Get CSRF token first
        await csrf()
        
        // Attempt login
        const response = await api.post('/login', { email, password })
        
        console.log('response.data.user', response.data.data.user);
        if (response.data.data.user) {
          this.user = response.data.data.user;
          console.log('this.user', this.user);
          this.isAuthenticated = true
          this.initialized = true
        }
        
        return response
      } catch (error) {
        this.user = null
        this.isAuthenticated = false
        throw error
      }
    },

    async logout() {
      try {
        await api.post('/logout')
      } finally {
        this.user = null
        this.isAuthenticated = false
        this.initialized = false
        this.initializationInProgress = false
      }
    }
  }
}) 