export { default as api } from './config'
export { csrf } from './config'
export { authApi } from './auth'
export { salesApi } from './sales'
export { inventoryApi } from './inventory'

// Re-export types
export type { LoginCredentials, RegisterData } from './auth'
export type { Sale, SaleItem, CreateSaleData } from './sales'
export type { Product, StockMovement, CreateProductData } from './inventory' 