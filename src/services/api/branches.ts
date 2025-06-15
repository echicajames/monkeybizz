import type { AxiosResponse } from 'axios'
import api from './config'

export interface Branch {
  branch_id: number
  name: string
  address: string
  date_opened: string
  status: 'active' | 'inactive'
  rent_amount: number
  rent_type: 'daily' | 'weekly' | 'monthly'
  date_created: string
  userid: number
}

export interface CreateBranchData {
  name: string
  address: string
  date_opened: string
  rent_type: 'daily' | 'weekly' | 'monthly'
  rent_amount: number
  status: 'active' | 'inactive'
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
  getAllBranches: async (): Promise<AxiosResponse<Branch[]>> => {
    return api.get('/branches')
  },

  getBranch: async (id: number): Promise<AxiosResponse<Branch>> => {
    return api.get(`/branches/${id}`)
  },

  createBranch: async (data: CreateBranchData): Promise<AxiosResponse<Branch>> => {
    return api.post('/branches', data)
  },

  updateBranch: async (id: number, data: Partial<CreateBranchData>): Promise<AxiosResponse<Branch>> => {
    return api.put(`/branches/${id}`, data)
  },

  deleteBranch: async (id: number): Promise<AxiosResponse<void>> => {
    return api.delete(`/branches/${id}`)
  },

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