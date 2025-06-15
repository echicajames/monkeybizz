import api from './config'

export interface Branch {
  branch_id: number
  name: string
  address: string
  date_opened: string
  status: boolean
  rent_amount: number
  rent_type: 'daily' | 'weekly' | 'monthly'
  date_created: string
  userid: number
}

export interface CreateBranchData {
  name: string
  address: string
  date_opened: string
  status: boolean
  rent_amount: number
  rent_type: Branch['rent_type']
  userid: number
}

export interface UpdateBranchData extends Partial<CreateBranchData> {}

export interface BranchFilters {
  page?: number
  per_page?: number
  search?: string
  status?: boolean
  rent_type?: Branch['rent_type']
  start_date?: string
  end_date?: string
  user_id?: number
}

export const branchesApi = {
  // Get all branches with optional filtering
  getAllBranches: (filters?: BranchFilters) => 
    api.get('/branches', { params: filters }),

  // Get a specific branch by ID
  getBranch: (branchId: number) => 
    api.get(`/branches/${branchId}`),

  // Create a new branch
  createBranch: (data: CreateBranchData) => 
    api.post('/branches', data),

  // Update a branch
  updateBranch: (branchId: number, data: UpdateBranchData) => 
    api.put(`/branches/${branchId}`, data),

  // Delete a branch
  deleteBranch: (branchId: number) => 
    api.delete(`/branches/${branchId}`),

  // Get branches by status
  getBranchesByStatus: (status: boolean) => 
    api.get(`/branches/by-status/${status}`),

  // Get branches by rent type
  getBranchesByRentType: (rentType: Branch['rent_type']) => 
    api.get(`/branches/by-rent-type/${rentType}`),

  // Get branches by user
  getBranchesByUser: (userId: number) => 
    api.get(`/branches/by-user/${userId}`)
} 