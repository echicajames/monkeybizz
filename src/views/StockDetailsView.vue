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
        <div class="bg-white/10 dark:bg-gray-800/50 midnight:bg-midnight-700/50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-white mb-4">Transaction History</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Transaction Date
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    In
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Out
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Current Qty
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Input By
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="transaction in transactions" :key="transaction.date" class="hover:bg-gray-100/10">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {{ formatDate(transaction.date) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" :class="getTypeColorClass(transaction.type)">
                    {{ transaction.type }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                    {{ transaction.in > 0 ? '+' + transaction.in : '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                    {{ transaction.out > 0 ? '-' + transaction.out : '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {{ transaction.currentQty }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {{ transaction.inputBy }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
import { useInventoryStore } from '@/stores/inventory'
import type { Stock } from '@/types/Stock'

type TransactionType = 'From Main' | 'Repurchased' | 'Sold'

interface Transaction {
  date: Date;
  in: number;
  out: number;
  type: TransactionType;
  inputBy: string;
}

interface TransactionWithTotal extends Transaction {
  currentQty: number;
}

interface Stock {
  id: string;
  name: string;
  description: string;
  quantity: number;
  safetyStockLevel: number;
}

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

// Calculate running total for each transaction
const transactions = computed<TransactionWithTotal[]>(() => {
  let runningTotal = 0
  // Process transactions in reverse chronological order
  // but calculate totals from oldest to newest
  const orderedTransactions = [...rawTransactions.value].reverse()
  
  const processedTransactions = orderedTransactions.map(transaction => {
    runningTotal = runningTotal + transaction.in - transaction.out
    return {
      ...transaction,
      currentQty: runningTotal
    }
  })

  // Reverse back to show newest first
  return processedTransactions.reverse()
})

// Get the current quantity (latest transaction's current quantity)
const currentQuantity = computed(() => {
  return transactions.value[0]?.currentQty ?? 0
})

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

// Get the appropriate color class for transaction type
const getTypeColorClass = (type: TransactionType) => {
  switch (type) {
    case 'From Main':
      return 'text-blue-600 dark:text-blue-400'
    case 'Repurchased':
      return 'text-purple-600 dark:text-purple-400'
    case 'Sold':
      return 'text-orange-600 dark:text-orange-400'
    default:
      return 'text-gray-600 dark:text-gray-400'
  }
}

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