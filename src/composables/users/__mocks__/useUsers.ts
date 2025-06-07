import { reactive } from 'vue'
import type { User, CreateUserData, UpdateUserData, UserFilters } from '@/services/api/users'
import type { UsersState, UseUsers, UseUsersOptions } from '../types'

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    created_at: '2024-03-20T00:00:00.000Z',
    updated_at: '2024-03-20T00:00:00.000Z'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'staff',
    status: 'active',
    created_at: '2024-03-20T00:00:00.000Z',
    updated_at: '2024-03-20T00:00:00.000Z'
  }
]

export function useUsers(options: UseUsersOptions = {}): UseUsers {
  const state = reactive<UsersState>({
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
    filters: {
      page: 1,
      per_page: 10,
      sort_by: 'created_at',
      sort_direction: 'desc',
      ...options.initialFilters
    },
    totalUsers: mockUsers.length,
    currentPage: 1
  })

  // Mock delay function
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const fetchUsers = async () => {
    state.loading = true
    state.error = null
    try {
      await delay(500) // Simulate API delay
      state.users = mockUsers
    } catch (err) {
      state.error = 'Failed to fetch users'
    } finally {
      state.loading = false
    }
  }

  const createUser = async (data: CreateUserData) => {
    state.loading = true
    state.error = null
    try {
      await delay(500)
      const newUser: User = {
        id: mockUsers.length + 1,
        name: data.name,
        email: data.email,
        role: data.role || 'user',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      mockUsers.push(newUser)
      await fetchUsers()
    } catch (err) {
      state.error = 'Failed to create user'
      throw err
    } finally {
      state.loading = false
    }
  }

  const updateUser = async (userId: number, data: UpdateUserData) => {
    state.loading = true
    state.error = null
    try {
      await delay(500)
      const userIndex = mockUsers.findIndex(u => u.id === userId)
      if (userIndex === -1) throw new Error('User not found')
      
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...data,
        updated_at: new Date().toISOString()
      }
      await fetchUsers()
    } catch (err) {
      state.error = 'Failed to update user'
      throw err
    } finally {
      state.loading = false
    }
  }

  const deleteUser = async (userId: number) => {
    state.loading = true
    state.error = null
    try {
      await delay(500)
      const userIndex = mockUsers.findIndex(u => u.id === userId)
      if (userIndex === -1) throw new Error('User not found')
      
      mockUsers.splice(userIndex, 1)
      await fetchUsers()
    } catch (err) {
      state.error = 'Failed to delete user'
      throw err
    } finally {
      state.loading = false
    }
  }

  const selectUser = (user: User | null) => {
    state.selectedUser = user
  }

  const updateFilters = (newFilters: Partial<UserFilters>) => {
    state.filters = { ...state.filters, ...newFilters }
    fetchUsers()
  }

  const resetFilters = () => {
    state.filters = {
      page: 1,
      per_page: 10,
      sort_by: 'created_at',
      sort_direction: 'desc'
    }
    fetchUsers()
  }

  const goToPage = async (page: number) => {
    updateFilters({ page })
  }

  const bulkUpdateStatus = async (userIds: number[], status: User['status']) => {
    state.loading = true
    state.error = null
    try {
      await delay(500)
      userIds.forEach(userId => {
        const user = mockUsers.find(u => u.id === userId)
        if (user) user.status = status
      })
      await fetchUsers()
    } catch (err) {
      state.error = 'Failed to update users status'
      throw err
    } finally {
      state.loading = false
    }
  }

  const assignRoles = async (userIds: number[], role: User['role']) => {
    state.loading = true
    state.error = null
    try {
      await delay(500)
      userIds.forEach(userId => {
        const user = mockUsers.find(u => u.id === userId)
        if (user) user.role = role
      })
      await fetchUsers()
    } catch (err) {
      state.error = 'Failed to assign roles'
      throw err
    } finally {
      state.loading = false
    }
  }

  // Initialize if autoFetch is true
  if (options.autoFetch !== false) {
    fetchUsers()
  }

  return {
    state,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    selectUser,
    updateFilters,
    resetFilters,
    goToPage,
    bulkUpdateStatus,
    assignRoles
  }
} 