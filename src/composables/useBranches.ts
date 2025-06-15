import { ref, computed } from 'vue'
import { branchesApi } from '@/services/api/branches'
import type { Branch, CreateBranchData, UpdateBranchData, BranchFilters } from '@/services/api/branches'

export function useBranches() {
  const branches = ref<Branch[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedBranch = ref<Branch | null>(null)

  // Getters
  const getAllBranches = computed(() => branches.value)
  const getBranchById = (id: number) => branches.value.find(branch => branch.branch_id === id)
  const getBranchesByStatus = (status: boolean) => 
    branches.value.filter(branch => branch.status === status)
  const getBranchesByRentType = (rentType: Branch['rent_type']) => 
    branches.value.filter(branch => branch.rent_type === rentType)

  // Actions
  const fetchBranches = async (filters?: BranchFilters) => {
    loading.value = true
    error.value = null
    try {
      const response = await branchesApi.getAllBranches(filters)
      console.log('response', response.data.data);
      branches.value = response.data.data || []
      console.log('branches', branches.value);
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch branches'
      console.error('Error fetching branches:', err)
    } finally {
      loading.value = false
    }
  }

  const createBranch = async (branchData: CreateBranchData) => {
    loading.value = true
    error.value = null
    try {
      const response = await branchesApi.createBranch(branchData)
      branches.value.push(response.data)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to create branch'
      console.error('Error creating branch:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateBranch = async (branchId: number, data: UpdateBranchData) => {
    loading.value = true
    error.value = null
    try {
      const response = await branchesApi.updateBranch(branchId, data)
      const index = branches.value.findIndex(branch => branch.branch_id === branchId)
      if (index !== -1) {
        branches.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update branch'
      console.error('Error updating branch:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteBranch = async (branchId: number) => {
    loading.value = true
    error.value = null
    try {
      await branchesApi.deleteBranch(branchId)
      branches.value = branches.value.filter(branch => branch.branch_id !== branchId)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to delete branch'
      console.error('Error deleting branch:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const setSelectedBranch = (branch: Branch | null) => {
    selectedBranch.value = branch
  }

  return {
    // State
    branches,
    loading,
    error,
    selectedBranch,

    // Getters
    getAllBranches,
    getBranchById,
    getBranchesByStatus,
    getBranchesByRentType,

    // Actions
    fetchBranches,
    createBranch,
    updateBranch,
    deleteBranch,
    setSelectedBranch
  }
} 