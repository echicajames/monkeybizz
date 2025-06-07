import api from './config'

export interface Product {
  id: number
  name: string
  description: string
  sku: string
  price: number
  stock_quantity: number
  category_id: number
  created_at: string
  updated_at: string
}

export interface StockMovement {
  id: number
  product_id: number
  quantity: number
  type: 'in' | 'out'
  reason: string
  reference: string
  created_at: string
}

export interface CreateProductData {
  name: string
  description: string
  sku: string
  price: number
  stock_quantity: number
  category_id: number
}

export const inventoryApi = {
  // Products CRUD
  getAllProducts: (params?: {
    page?: number
    per_page?: number
    category_id?: number
    search?: string
  }) => api.get('/products', { params }),

  getProduct: (id: number) => 
    api.get(`/products/${id}`),

  createProduct: (data: CreateProductData) => 
    api.post('/products', data),

  updateProduct: (id: number, data: Partial<CreateProductData>) => 
    api.put(`/products/${id}`, data),

  deleteProduct: (id: number) => 
    api.delete(`/products/${id}`),

  // Stock Management
  adjustStock: (productId: number, data: {
    quantity: number
    type: 'in' | 'out'
    reason: string
    reference?: string
  }) => api.post(`/products/${productId}/stock/adjust`, data),

  getStockMovements: (productId: number, params?: {
    page?: number
    per_page?: number
    start_date?: string
    end_date?: string
    type?: 'in' | 'out'
  }) => api.get(`/products/${productId}/stock/movements`, { params }),

  // Low Stock Alerts
  getLowStockProducts: (threshold?: number) => 
    api.get('/products/low-stock', { params: { threshold } }),

  // Stock Value Report
  getStockValueReport: () => 
    api.get('/products/stock-value'),

  // Categories
  getAllCategories: () => 
    api.get('/categories'),

  createCategory: (data: { name: string; description?: string }) => 
    api.post('/categories', data),

  updateCategory: (id: number, data: { name: string; description?: string }) => 
    api.put(`/categories/${id}`, data),

  deleteCategory: (id: number) => 
    api.delete(`/categories/${id}`)
} 