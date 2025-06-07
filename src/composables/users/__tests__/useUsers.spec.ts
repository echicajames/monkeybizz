import { describe, it, expect, beforeEach } from 'vitest'
import { useUsers } from '../__mocks__/useUsers'

describe('useUsers composable', () => {
  it('should initialize with default state', () => {
    const { state } = useUsers({ autoFetch: false })
    
    expect(state.users).toEqual([])
    expect(state.selectedUser).toBeNull()
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
    expect(state.filters).toEqual({
      page: 1,
      per_page: 10,
      sort_by: 'created_at',
      sort_direction: 'desc'
    })
  })

  it('should fetch users', async () => {
    const { state, fetchUsers } = useUsers({ autoFetch: false })
    
    await fetchUsers()
    
    expect(state.users).toHaveLength(2)
    expect(state.users[0].name).toBe('John Doe')
    expect(state.users[1].name).toBe('Jane Smith')
  })

  it('should create a new user', async () => {
    const { state, createUser } = useUsers({ autoFetch: false })
    
    await createUser({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      password_confirmation: 'password'
    })
    
    expect(state.users).toHaveLength(3)
    expect(state.users[2].name).toBe('Test User')
  })

  it('should update a user', async () => {
    const { state, updateUser } = useUsers({ autoFetch: false })
    await state.users.push({
      id: 1,
      name: 'Old Name',
      email: 'old@example.com',
      role: 'user',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })

    await updateUser(1, { name: 'New Name' })
    
    const updatedUser = state.users.find(u => u.id === 1)
    expect(updatedUser?.name).toBe('New Name')
  })

  it('should delete a user', async () => {
    const { state, deleteUser } = useUsers({ autoFetch: false })
    await state.users.push({
      id: 1,
      name: 'To Delete',
      email: 'delete@example.com',
      role: 'user',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })

    const initialLength = state.users.length
    await deleteUser(1)
    
    expect(state.users).toHaveLength(initialLength - 1)
    expect(state.users.find(u => u.id === 1)).toBeUndefined()
  })

  it('should handle bulk status updates', async () => {
    const { state, bulkUpdateStatus } = useUsers({ autoFetch: false })
    await state.users.push(
      {
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        role: 'user',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        name: 'User 2',
        email: 'user2@example.com',
        role: 'user',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    )

    await bulkUpdateStatus([1, 2], 'inactive')
    
    expect(state.users.every(u => u.status === 'inactive')).toBe(true)
  })

  it('should handle errors gracefully', async () => {
    const { state, updateUser } = useUsers({ autoFetch: false })
    
    try {
      await updateUser(999, { name: 'Non-existent User' })
    } catch (error) {
      expect(state.error).toBe('Failed to update user')
    }
  })
}) 