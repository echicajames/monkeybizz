<script setup lang="ts">
import { computed } from 'vue'
import type { Transaction, TransactionType, TransactionWithTotal } from '@/types/Transaction'

const props = defineProps<{
  transactions: Transaction[]
}>()

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

// Calculate running total for each transaction
const processedTransactions = computed<TransactionWithTotal[]>(() => {
  let runningTotal = 0
  // Process transactions in reverse chronological order
  // but calculate totals from oldest to newest
  const orderedTransactions = [...props.transactions].reverse()
  
  const processed = orderedTransactions.map(transaction => {
    runningTotal = runningTotal + transaction.in - transaction.out
    return {
      ...transaction,
      currentQty: runningTotal
    }
  })

  // Reverse back to show newest first
  return processed.reverse()
})
</script>

<template>
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
          <tr v-for="transaction in processedTransactions" :key="transaction.date" class="hover:bg-gray-100/10">
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
</template> 