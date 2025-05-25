<template>
  <AppLayout>
    <div class="container mx-auto px-4">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white">Inventory Management</h1>
      </div>
      
      <DataTable
        :columns="columns"
        :data="inventoryStore.getAllStocks"
        @row-click="handleRowClick"
      />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DataTable from '@/components/common/DataTable.vue'
import { useInventoryStore } from '@/stores/inventory'
import type { Stock } from '@/types/Stock'
import AppLayout from '@/components/AppLayout.vue'

const router = useRouter()
const inventoryStore = useInventoryStore()

const columns = [
  { key: 'id', label: 'Stock ID' },
  { key: 'name', label: 'Stock Name' },
  { key: 'description', label: 'Description' },
  { key: 'quantity', label: 'Qty' }
]

const handleRowClick = (stock: Stock) => {
  // For now, we'll just show an alert
  // Later we can implement a detail view or modal
  alert(`Selected stock: ${stock.name}`)
}
</script> 