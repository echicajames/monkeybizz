import { defineStore } from 'pinia'
import { stocksApi } from '@/services/api/stocks'
import type { Stock, CreateStockData, UpdateStockData, StockFilters } from '@/services/api/stocks'

interface InventoryState {
  stocks: Stock[]
  loading: boolean
  error: string | null
  selectedStock: Stock | null
}

export const useInventoryStore = defineStore('inventory', {
  state: (): InventoryState => ({
    stocks: [],
    loading: false,
    error: null,
    selectedStock: null
  }),

  getters: {
    getAllStocks: (state) => state.stocks,
    getStockById: (state) => (id: number) => state.stocks.find(stock => stock.stock_id === id),
    getStocksByStatus: (state) => (status: Stock['stock_status']) => 
      state.stocks.filter(stock => stock.stock_status === status),
    getStocksByCategory: (state) => (category: string) => 
      state.stocks.filter(stock => stock.category === category)
  },

  actions: {
    async fetchStocks(filters?: StockFilters) {
      this.loading = true
      this.error = null
      try {
        const response = await stocksApi.getAllStocks(filters)
        this.stocks = response.data.data || []
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to fetch stocks'
        console.error('Error fetching stocks:', err)
      } finally {
        this.loading = false
      }
    },

    async createStock(stockData: CreateStockData) {
      this.loading = true
      this.error = null
      try {
        const response = await stocksApi.createStock(stockData)
        this.fetchStocks();
        return response.data
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to create stock'
        console.error('Error creating stock:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateStock(stockId: number, data: UpdateStockData) {
      this.loading = true
      this.error = null
      try {
        const response = await stocksApi.updateStock(stockId, data)
        const index = this.stocks.findIndex(stock => stock.stock_id === stockId)
        if (index !== -1) {
          this.stocks[index] = response.data
        }
        return response.data
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to update stock'
        console.error('Error updating stock:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteStock(stockId: number) {
      this.loading = true
      this.error = null
      try {
        await stocksApi.deleteStock(stockId)
        this.stocks = this.stocks.filter(stock => stock.stock_id !== stockId)
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to delete stock'
        console.error('Error deleting stock:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    setSelectedStock(stock: Stock | null) {
      this.selectedStock = stock
    }
  }
}) 