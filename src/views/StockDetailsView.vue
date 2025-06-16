<template>
  <AppLayout>
    <div class="container mx-auto px-4">
      <div class="mb-6">
        <BaseButton
          @click="router.back()"
          variant="outline"
          size="sm"
          class="mb-4"
        >
          ← Back to Inventory
        </BaseButton>
        <h1 class="text-2xl font-bold text-white">Stock Details</h1>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-indigo-600"></div>
        <p class="mt-2 text-gray-400">Loading details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-400">{{ error }}</p>
      </div>

      <!-- Content -->
      <div v-else-if="stock && branch" class="space-y-8">
        <!-- Stock Info Card -->
        <div class="bg-white/10 dark:bg-gray-800/50 rounded-lg p-6 shadow-lg">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium text-gray-400">Stock Name</h3>
                <p class="mt-1 text-lg font-medium text-white">{{ stock.stock_name }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-400">Category</h3>
                <p class="mt-1 text-lg font-medium text-white">{{ stock.category }}</p>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium text-gray-400">Branch</h3>
                <p class="mt-1 text-lg font-medium text-white">{{ branch.name }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-400">Status</h3>
                <p class="mt-1 text-lg font-medium" :class="stock.stock_status ? 'text-green-400' : 'text-red-400'">
                  {{ stock.stock_status ? 'Active' : 'Inactive' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Transaction History -->
        <TransactionHistory :transactions="inventoryMap" />
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed,ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import TransactionHistory from '@/components/transaction/TransactionHistory.vue'
import { useInventoryStore } from '@/stores/inventory'
import { useBranchesStore } from '@/stores/branches'
import type { Stock } from '@/services/api/stocks'
import type { Transaction } from '@/types/Transaction'
import type { Branch } from '@/services/api/branches'
import { useInventory } from '@/composables/useInventory'

const route = useRoute()
const router = useRouter()
const inventoryStore = useInventoryStore()
const branchesStore = useBranchesStore()
const { inventory, inventoryMap, getAllInventory, getInventoryByStockAndBranch } = useInventory()

const stock = ref<Stock | null>(null)
const branch = ref<Branch | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Mock transaction data - only storing in/out values
const rawTransactions = ref<Transaction[]>([
  {
    date: new Date('2024-03-20'),
    in: 5,
    out: 0,
    type: 'Repurchased',
    inputBy: 'John Smith'
  },
  {
    date: new Date('2024-03-19'),
    in: 0,
    out: 2,
    type: 'Sold',
    inputBy: 'Maria Garcia'
  },
  {
    date: new Date('2024-03-18'),
    in: 7,
    out: 0,
    type: 'From Main',
    inputBy: 'David Chen'
  },
  {
    date: new Date('2024-03-17'),
    in: 0,
    out: 5,
    type: 'Sold',
    inputBy: 'Sarah Johnson'
  },
  {
    date: new Date('2024-03-16'),
    in: 7,
    out: 0,
    type: 'From Main',
    inputBy: 'Michael Lee'
  }
])

const inventoryData = computed(() => inventory.value ?? [])

async function getStockInventory(stockId: number, locationId: number) {
  
  try {
    const stock = await getInventoryByStockAndBranch(stockId, locationId);
    console.log('getInventoryByStockAndBranch', stock);
  } catch (error) {
    throw new Error('Failed to get stock inventory');
  }
}

onMounted(async () => {
  await inventoryStore.fetchStocks();

  const params = {
    stock_id: parseInt(route.params.stockId as string),
    branch_id: parseInt(route.params.locationId as string),
  }
  await getAllInventory(params);

  const stockId = parseInt(route.params.stockId as string)
  const locationId = parseInt(route.params.locationId as string)
  await getStockInventory(stockId, locationId);

  try {
    loading.value = true
    error.value = null

    const locationId = parseInt(route.params.locationId as string)
    const stockId = parseInt(route.params.stockId as string)

    // Get branch data from store or fetch if not exists
    const branchData = branchesStore.branches.find(b => b.branch_id === locationId) || 
                      await branchesStore.getBranchById(locationId)
    
    if (!branchData) {
      throw new Error('Branch not found')
    }
    branch.value = branchData

    // Get stock data
    const stockData = inventoryStore.stocks.find(s => s.stock_id === stockId);
     //|| await inventoryStore.getStockById(stockId)
    
    if (!stockData) {
      throw new Error('Stock not found')
    }
    stock.value = stockData
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load details'
    console.error('Error loading details:', err)
  } finally {
    loading.value = false
  }
})
</script> 