import { defineStore } from 'pinia'
import type { Stock } from '@/types/Stock'

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    stocks: [
      {
        id: 'STK001',
        name: 'Chicken Wings',
        description: 'Fresh chicken wings, 1kg pack',
        quantity: 50
      },
      {
        id: 'STK002',
        name: 'Rice',
        description: 'Premium jasmine rice, 25kg sack',
        quantity: 30
      },
      {
        id: 'STK003',
        name: 'Cooking Oil',
        description: 'Vegetable cooking oil, 5L container',
        quantity: 25
      },
      {
        id: 'STK004',
        name: 'Tomato Sauce',
        description: 'Premium tomato sauce, 2L bottle',
        quantity: 40
      },
      {
        id: 'STK005',
        name: 'Soy Sauce',
        description: 'Traditional soy sauce, 1L bottle',
        quantity: 35
      }
    ] as Stock[]
  }),

  getters: {
    getAllStocks: (state) => state.stocks,
    getStockById: (state) => (id: string) => state.stocks.find(stock => stock.id === id)
  }
}) 