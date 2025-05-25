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

      <div v-if="stock" class="bg-white/10 dark:bg-gray-800/50 midnight:bg-midnight-700/50 rounded-lg p-6 space-y-6">
        <div class="grid grid-cols-2 gap-6">
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
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Quantity</h3>
            <p class="mt-1 text-lg font-medium text-gray-900 dark:text-white">{{ stock.quantity }}</p>
          </div>
          <div class="col-span-2">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
            <p class="mt-1 text-gray-900 dark:text-white">{{ stock.description }}</p>
          </div>
        </div>

        <!-- Additional stock information can be added here -->
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">Loading stock details...</p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useInventoryStore } from '@/stores/inventory'
import type { Stock } from '@/types/Stock'

const route = useRoute()
const router = useRouter()
const inventoryStore = useInventoryStore()

const locationId = route.params.locationId as string
const stockId = route.params.stockId as string
const stock = ref<Stock | null>(null)

onMounted(async () => {
  // In a real application, you would fetch the stock details here
  // For now, we'll use mock data
  const mockStock = inventoryStore.getAllStocks.find(s => s.id === stockId)
  if (mockStock) {
    stock.value = mockStock
  }
})
</script> 