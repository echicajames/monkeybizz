import api from './config'

export interface Inventory {
  inventory_id: number
  branch_id: number
  stock_id: number
  userid: number,
  quantity: number
  type: 'stock_in' | 'stock_out'
  reason: string
  status: boolean
  tag: string
  date_created: string
  created_at: string
  updated_at: string
}

export interface CreateInventoryData {
  branch_id: number
  stock_id: number
  quantity: number
  type: 'stock_in' | 'stock_out'
  reason: string
  status: boolean
  tag: string
}

export interface UpdateInventoryData extends Partial<CreateInventoryData> {}

export interface InventoryFilters {
  page?: number
  per_page?: number
  search?: string
  stock_id?: number
  branch_id?: number
  type?: Inventory['type']
  status?: boolean
  start_date?: string
  end_date?: string
}

export const inventoryApi = {
  // Get all inventory items with optional filtering
  getAllInventory: (filters?: InventoryFilters) => 
    api.get('/inventory', { params: filters }),

  // Get inventory by ID
  getInventory: (id: number) => 
    api.get(`/inventory/${id}`),

  // Get inventory by stock and branch
  getInventoryByStockAndBranch: (stockId: number, branchId: number) =>
    api.get(`/inventory/stock/${stockId}/branch/${branchId}`),

  // Create new inventory item
  createInventory: (data: CreateInventoryData) => 
    api.post('/inventory', data),

  // Update inventory item
  updateInventory: (id: number, data: UpdateInventoryData) => 
    api.put(`/inventory/${id}`, data),

  // Delete inventory item
  deleteInventory: (id: number) => 
    api.delete(`/inventory/${id}`),

  // Get inventory by stock
  getInventoryByStock: (stockId: number) => 
    api.get(`/inventory/stock/${stockId}`),

  // Get inventory by branch
  getInventoryByBranch: (branchId: number) => 
    api.get(`/inventory/branch/${branchId}`),

  // Adjust inventory quantity
  adjustQuantity: (id: number, data: { 
    quantity: number
    type: Inventory['type']
    reason: string
    tag: string
  }) => api.post(`/inventory/${id}/adjust`, data)
}