import { ref, computed } from 'vue'
import { inventoryApi } from '@/services/api/inventory'
import type { Inventory, CreateInventoryData, UpdateInventoryData, InventoryFilters } from '@/services/api/inventory'

export function useInventory() {
  const inventory = ref<Inventory[]>([])
  const inventoryMap = ref<any[]>([]); // to do typescript type

  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const getAllInventory = async (filters?: InventoryFilters) => {
    loading.value = true
    error.value = null
    try {
      const response = await inventoryApi.getAllInventory(filters)
      inventory.value = response.data.data.data;
      inventoryMap.value = mapInventory(response.data.data.data);

      // return response.data.data.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch inventory'
      console.error('Error fetching inventory:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  function mapInventory(inventory: Inventory[]) {
    return inventory.map((item) => ({
      date: item.date_created,
      in: item.type === 'stock_in' ? item.quantity : 0,
      out: item.type === 'stock_out' ? item.quantity : 0,
      type: item.type,
      inputBy: item.userid,
    }))
  }

  // Get inventory by stock and branch
  const getInventoryByStockAndBranch = async (stockId: number, branchId: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await inventoryApi.getInventoryByStockAndBranch(stockId, branchId)
      inventory.value = response.data
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch inventory'
      console.error('Error fetching inventory:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Adjust inventory quantity
  // const adjustQuantity = async (id: number, data: { 
  //   quantity: number
  //   type: 'stock_in' | 'stock_out'
  //   reason: string
  //   tag: string
  // }) => {
  //   loading.value = true
  //   error.value = null
  //   try {
  //     const response = await inventoryApi.adjustQuantity(id, data)
  //     if (inventory.value?.inventory_id === id) {
  //       inventory.value = response.data
  //     }
  //     return response.data
  //   } catch (err: any) {
  //     error.value = err.response?.data?.message || 'Failed to adjust inventory'
  //     console.error('Error adjusting inventory:', err)
  //     throw err
  //   } finally {
  //     loading.value = false
  //   }
  // }

  // Create new inventory
  const createInventory = async (data: CreateInventoryData) => {
    loading.value = true
    error.value = null
    try {
      const response = await inventoryApi.createInventory(data)
      inventory.value = response.data
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to create inventory'
      console.error('Error creating inventory:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update inventory
  // const updateInventory = async (id: number, data: UpdateInventoryData) => {
  //   loading.value = true
  //   error.value = null
  //   try {
  //     const response = await inventoryApi.updateInventory(id, data)
  //     if (inventory.value?.inventory_id === id) {
  //       inventory.value = response.data
  //     }
  //     return response.data
  //   } catch (err: any) {
  //     error.value = err.response?.data?.message || 'Failed to update inventory'
  //     console.error('Error updating inventory:', err)
  //     throw err
  //   } finally {
  //     loading.value = false
  //   }
  // }

  return {
    // State
    inventory,
    inventoryMap,
    loading,
    error,

    // Methods
    getInventoryByStockAndBranch,
    //adjustQuantity,
    createInventory,
    //updateInventory,
    getAllInventory,
  }
} 