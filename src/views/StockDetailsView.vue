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

      <div v-if="stock" class="space-y-8">
        <div class="bg-white/10 dark:bg-gray-800/50 midnight:bg-midnight-700/50 rounded-lg p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Stock Name</h3>
              <p class="mt-1 text-lg font-medium text-gray-900 dark:text-white">{{ stock.name }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Location ID</h3>
              <p class="mt-1 text-lg font-medium text-gray-900 dark:text-white">{{ locationId }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Stock ID</h3>
              <p class="mt-1 text-lg font-medium text-gray-900 dark:text-white">{{ stockId }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Current Quantity</h3>
              <p class="mt-1 text-lg font-medium" :class="[
                currentQuantity <= stock.safetyStockLevel 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-gray-900 dark:text-white'
              ]">
                {{ currentQuantity }}
              </p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Safety Stock Level</h3>
              <p class="mt-1 text-lg font-medium text-gray-900 dark:text-white">{{ stock.safetyStockLevel }}</p>
            </div>
            <div class="col-span-1 md:col-span-2 lg:col-span-1">
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
              <p class="mt-1 text-gray-900 dark:text-white">{{ stock.description }}</p>
            </div>
          </div>
        </div>

        <!-- Transaction History Table -->
        <TransactionHistory :transactions="rawTransactions" />
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">Loading stock details...</p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import TransactionHistory from '@/components/transaction/TransactionHistory.vue'
import { useInventoryStore } from '@/stores/inventory'
import type { Stock } from '@/types/Stock'
import type { Transaction } from '@/types/Transaction'

const route = useRoute()
const router = useRouter()
const inventoryStore = useInventoryStore()

const locationId = route.params.locationId as string
const stockId = route.params.stockId as string
const stock = ref<Stock | null>(null)

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

// Get the current quantity (from first transaction's current quantity)
const currentQuantity = computed(() => {
  const processedTransactions = [...rawTransactions.value].reverse()
  let total = 0
  processedTransactions.forEach(t => {
    total += t.in - t.out
  })
  return total
})

onMounted(async () => {
  // In a real application, you would fetch the stock details here
  // For now, we'll use mock data
  const mockStock = inventoryStore.getAllStocks.find(s => s.id === stockId)
  if (mockStock) {
    stock.value = {
      ...mockStock,
      safetyStockLevel: 5 // Adding safety stock level
    }
  }
})
</script> 