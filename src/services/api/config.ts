import axios from 'axios'

const apiConfig = {
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
}

const api = axios.create(apiConfig)

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login'
    }
    if (error.response?.status === 419) {
      // Handle CSRF token mismatch
      await csrf()
      return api(error.config)
    }
    return Promise.reject(error)
  }
)

// Function to fetch CSRF token
export const csrf = () => axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true })

export default api 