import { ref, reactive, onMounted } from 'vue'
import { usersApi } from '@/services/api/users'
import type { User, CreateUserData, UpdateUserData, UserFilters } from '@/services/api/users'
import type { UsersState, UseUsers, UseUsersOptions } from './types'

const defaultFilters: UserFilters = {
  page: 1,
  per_page: 10,
  sort_by: 'created_at',
  sort_direction: 'desc'
}

export function useUsers(options: UseUsersOptions = {}): UseUsers {
  const state = reactive<UsersState>({
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
    filters: { ...defaultFilters, ...options.initialFilters },
    totalUsers: 0,
    currentPage: 1
  })

  const fetchUsers = async () => {
    state.loading = true
    state.error = null
    try {
      const response = await usersApi.getAllUsers(state.filters)
      state.users = response.data.data
      state.totalUsers = response.data.total
      state.currentPage = response.data.current_page
    } catch (err) {
      state.error = 'Failed to fetch users'
      console.error('Error fetching users:', err)
    } finally {
      state.loading = false
    }
  }

  const createUser = async (data: CreateUserData) => {
    state.loading = true
    state.error = null
    try {
      await usersApi.createUser(data)
      await fetchUsers() // Refresh the list
    } catch (err) {
      state.error = 'Failed to create user'
      console.error('Error creating user:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  const updateUser = async (userId: number, data: UpdateUserData) => {
    state.loading = true
    state.error = null
    try {
      await usersApi.updateUser(userId, data)
      await fetchUsers() // Refresh the list
    } catch (err) {
      state.error = 'Failed to update user'
      console.error('Error updating user:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  const deleteUser = async (userId: number) => {
    state.loading = true
    state.error = null
    try {
      await usersApi.deleteUser(userId)
      await fetchUsers() // Refresh the list
    } catch (err) {
      state.error = 'Failed to delete user'
      console.error('Error deleting user:', err)
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
    state.filters = { ...defaultFilters }
    fetchUsers()
  }

  const goToPage = async (page: number) => {
    updateFilters({ page })
  }

  const bulkUpdateStatus = async (userIds: number[], status: User['status']) => {
    state.loading = true
    state.error = null
    try {
      await usersApi.bulkUpdateStatus(userIds, status)
      await fetchUsers() // Refresh the list
    } catch (err) {
      state.error = 'Failed to update users status'
      console.error('Error updating users status:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  const assignRoles = async (userIds: number[], role: User['role']) => {
    state.loading = true
    state.error = null
    try {
      await usersApi.assignRoles(userIds, role)
      await fetchUsers() // Refresh the list
    } catch (err) {
      state.error = 'Failed to assign roles'
      console.error('Error assigning roles:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  // Fetch users on mount if autoFetch is true
  if (options.autoFetch !== false) {
    onMounted(fetchUsers)
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