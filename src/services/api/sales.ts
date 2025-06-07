import api from './config'

export interface Sale {
  id: number
  order_number: string
  customer_name: string
  total_amount: number
  status: 'pending' | 'completed' | 'cancelled'
  items: SaleItem[]
  created_at: string
  updated_at: string
}

export interface SaleItem {
  id: number
  product_id: number
  quantity: number
  unit_price: number
  subtotal: number
}

export interface CreateSaleData {
  customer_name: string
  items: Array<{
    product_id: number
    quantity: number
    unit_price: number
  }>
}

export const salesApi = {
  // Get all sales with optional filtering
  getAllSales: (params?: { 
    page?: number
    per_page?: number
    status?: Sale['status']
    start_date?: string
    end_date?: string 
  }) => api.get('/sales', { params }),

  // Get a specific sale by ID
  getSale: (id: number) => 
    api.get(`/sales/${id}`),

  // Create a new sale
  createSale: (data: CreateSaleData) => 
    api.post('/sales', data),

  // Update a sale
  updateSale: (id: number, data: Partial<CreateSaleData>) => 
    api.put(`/sales/${id}`, data),

  // Delete a sale
  deleteSale: (id: number) => 
    api.delete(`/sales/${id}`),

  // Get daily sales report
  getDailySalesReport: (date: string) => 
    api.get('/sales/reports/daily', { params: { date } }),

  // Get monthly sales report
  getMonthlySalesReport: (year: number, month: number) => 
    api.get('/sales/reports/monthly', { params: { year, month } }),

  // Get sales by product
  getSalesByProduct: (productId: number, params?: { 
    start_date?: string
    end_date?: string 
  }) => api.get(`/sales/by-product/${productId}`, { params })
} 