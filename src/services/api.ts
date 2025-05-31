import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest' // Required for Laravel to identify AJAX requests
  },
  withCredentials: true // Required for Sanctum authentication and CSRF
})

// Function to fetch CSRF token - using Laravel Sanctum's endpoint
export const csrf = () => axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true })

// Function to check authentication status
export const checkAuth = () => api.get('/user')

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized access
      window.location.href = '/login'
    }
    if (error.response?.status === 419) {
      // CSRF token mismatch, try to refresh token
      await csrf()
      // Retry the original request
      return api(error.config)
    }
    return Promise.reject(error)
  }
)

export default api 