import type { User, CreateUserData, UpdateUserData, UserFilters } from '@/services/api/users'

export interface UsersState {
  users: User[]
  selectedUser: User | null
  loading: boolean
  error: string | null
  filters: UserFilters
  totalUsers: number
  currentPage: number
}

export interface UseUsersOptions {
  initialFilters?: Partial<UserFilters>
  autoFetch?: boolean
}

export interface UseUsers {
  // State
  state: UsersState
  
  // Actions
  fetchUsers: () => Promise<void>
  createUser: (data: CreateUserData) => Promise<void>
  updateUser: (userId: number, data: UpdateUserData) => Promise<void>
  deleteUser: (userId: number) => Promise<void>
  selectUser: (user: User | null) => void
  
  // Filters
  updateFilters: (newFilters: Partial<UserFilters>) => void
  resetFilters: () => void
  
  // Pagination
  goToPage: (page: number) => Promise<void>
  
  // Bulk Actions
  bulkUpdateStatus: (userIds: number[], status: User['status']) => Promise<void>
  assignRoles: (userIds: number[], role: User['role']) => Promise<void>
} 