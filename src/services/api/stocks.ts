import api from './config'

export interface Stock {
  stock_id: number
  stock_code: string
  stock_name: string
  stock_status: boolean
  category: string
  userid: number
  date_created?: string
}

export interface CreateStockData {
  stock_code: string
  stock_name: string
  stock_status: boolean
  category: string
  userid: number
}

export interface UpdateStockData extends Partial<CreateStockData> {}

export interface StockFilters {
  page?: number
  per_page?: number
  search?: string
  status?: Stock['stock_status']
  category?: string
  start_date?: string
  end_date?: string
  user_id?: number
}

export const stocksApi = {
  // Get all stocks with optional filtering
  getAllStocks: (filters?: StockFilters) => 
    api.get('/stocks', { params: filters }),

  // Get a specific stock by ID
  getStock: (stockId: number) => 
    api.get(`/stocks/${stockId}`),

  // Create a new stock
  createStock: (data: CreateStockData) => 
    api.post('/stocks', data),

  // Update a stock
  updateStock: (stockId: number, data: UpdateStockData) => 
    api.put(`/stocks/${stockId}`, data),

  // Delete a stock
  deleteStock: (stockId: number) => 
    api.delete(`/stocks/${stockId}`),

  // Get stocks by category
  getStocksByCategory: (category: string) => 
    api.get(`/stocks/by-category/${category}`),

  // Get stocks by status
  getStocksByStatus: (status: Stock['stock_status']) => 
    api.get(`/stocks/by-status/${status}`),

  // Get stocks by user
  getStocksByUser: (userId: number) => 
    api.get(`/stocks/by-user/${userId}`),

  // Bulk update stock status
  bulkUpdateStatus: (stockIds: number[], status: Stock['stock_status']) => 
    api.put('/stocks/bulk-update-status', { stock_ids: stockIds, status }),

  // Get stock statistics
  getStockStats: () => 
    api.get('/stocks/statistics')
} 