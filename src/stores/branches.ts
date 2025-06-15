import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Branch } from '@/services/api/branches'
import { branchesApi } from '@/services/api/branches'
import type { AxiosResponse } from 'axios'

interface ApiResponse<T> {
  data: T
  message?: string
  status?: number
}

export const useBranchesStore = defineStore('branches', () => {
  const branches = ref<Branch[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchBranches = async () => {
    try {
      loading.value = true
      error.value = null
      const response = await branchesApi.getAllBranches()
      console.log('API Response:', response)
      
      if (response.data && Array.isArray(response.data)) {
        branches.value = response.data
      } else if (response.data && typeof response.data === 'object' && 'data' in response.data) {
        const apiResponse = response.data as unknown as ApiResponse<Branch[]>
        branches.value = apiResponse.data
      } else {
        branches.value = []
      }
      console.log('Processed branches:', branches.value)
    } catch (err) {
      error.value = 'Failed to fetch branches'
      console.error('Error fetching branches:', err)
    } finally {
      loading.value = false
    }
  }

  const getBranchById = async (id: number) => {
    try {
      // If branches array is empty, fetch all branches first
      if (branches.value.length === 0) {
        await fetchBranches()
      }

      console.log('Current branches:', branches.value)
      const branch = branches.value.find(b => b.branch_id === id)
      console.log('Found branch:', branch)

      if (branch) return branch;
      
      // If branch not found in cache, fetch it directly
      const response = await branchesApi.getBranch(id)
      console.log('Direct branch fetch response:', response)
      
      if (response.data) {
        let branchData: Branch
        if (typeof response.data === 'object' && 'data' in response.data) {
          const apiResponse = response.data as unknown as ApiResponse<Branch>
          branchData = apiResponse.data
        } else {
          branchData = response.data as Branch
        }
        branches.value.push(branchData)
        return branchData
      }
      return null
    } catch (err) {
      console.error('Error getting branch:', err)
      return null
    }
  }

  const createBranch = async (branchData: any) => {
    try {
      loading.value = true
      error.value = null
      const response = await branchesApi.createBranch(branchData)
      if (response.data) {
        let newBranch: Branch
        if (typeof response.data === 'object' && 'data' in response.data) {
          const apiResponse = response.data as unknown as ApiResponse<Branch>
          newBranch = apiResponse.data
        } else {
          newBranch = response.data as Branch
        }
        branches.value.push(newBranch)
        return newBranch
      }
      return null
    } catch (err) {
      error.value = 'Failed to create branch'
      console.error('Error creating branch:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    branches,
    loading,
    error,
    fetchBranches,
    getBranchById,
    createBranch
  }
}) 