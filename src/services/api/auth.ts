import api from './config'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  name: string
  password_confirmation: string
}

export const authApi = {
  login: (credentials: LoginCredentials) => 
    api.post('/login', credentials),

  register: (data: RegisterData) => 
    api.post('/register', data),

  logout: () => 
    api.post('/logout'),

  getCurrentUser: () => 
    api.get('/user'),

  updateProfile: (data: Partial<RegisterData>) => 
    api.put('/user/profile', data),

  updatePassword: (data: { current_password: string; password: string; password_confirmation: string }) => 
    api.put('/user/password', data)
} 