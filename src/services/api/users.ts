import api from './config'

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'staff' | 'user'
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface CreateUserData {
  name: string
  email: string
  password: string
  password_confirmation: string
  role?: User['role']
}

export interface UpdateUserData extends Partial<Omit<CreateUserData, 'password_confirmation'>> {
  status?: User['status']
}

export interface UserFilters {
  page?: number
  per_page?: number
  search?: string
  role?: User['role']
  status?: User['status']
  sort_by?: string
  sort_direction?: 'asc' | 'desc'
}

export const usersApi = {
  // Get all users with optional filtering
  getAllUsers: (filters?: UserFilters) => 
    api.get('/users', { params: filters }),

  // Get a specific user by ID
  getUser: (userId: number) => 
    api.get(`/users/${userId}`),

  // Create a new user
  createUser: (data: CreateUserData) => 
    api.post('/users', data),

  // Update a user
  updateUser: (userId: number, data: UpdateUserData) => 
    api.put(`/users/${userId}`, data),

  // Delete a user
  deleteUser: (userId: number) => 
    api.delete(`/users/${userId}`),

  // Get current user's profile
  getCurrentProfile: () => 
    api.get('/users/profile'),

  // Update current user's profile
  updateProfile: (data: UpdateUserData) => 
    api.put('/users/profile', data),

  // Change user's password
  changePassword: (data: { 
    current_password: string
    password: string
    password_confirmation: string 
  }) => api.put('/users/change-password', data),

  // Get user activity logs
  getUserLogs: (userId: number, params?: {
    page?: number
    per_page?: number
    start_date?: string
    end_date?: string
  }) => api.get(`/users/${userId}/logs`, { params }),

  // Get users by role
  getUsersByRole: (role: User['role']) => 
    api.get(`/users/by-role/${role}`),

  // Bulk update user status
  bulkUpdateStatus: (userIds: number[], status: User['status']) => 
    api.put('/users/bulk-update-status', { user_ids: userIds, status }),

  // Assign roles to users
  assignRoles: (userIds: number[], role: User['role']) => 
    api.put('/users/assign-roles', { user_ids: userIds, role })
} 