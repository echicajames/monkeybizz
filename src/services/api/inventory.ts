import api from './config'

export interface Inventory {
  id: number
  stock_id: number
  branch_id: number
  quantity: number
  last_updated: string
  updated_by: number
}

export interface CreateInventoryData {
  stock_id: number
  branch_id: number
  quantity: number
  updated_by: number
}

export interface UpdateInventoryData extends Partial<CreateInventoryData> {}

export interface InventoryFilters {
  page?: number
  per_page?: number
  search?: string
  stock_id?: number
  branch_id?: number
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
  adjustQuantity: (id: number, data: { quantity: number; updated_by: number }) =>
    api.post(`/inventory/${id}/adjust`, data)
} 