<template>
  <AppLayout>
    <div class="container mx-auto px-4">
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-white">Inventory Management</h1>
        <BaseButton
          @click="showCreateModal = true"
        >
          Create Stock
        </BaseButton>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
        {{ error }}
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-4">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-indigo-600"></div>
        <p class="mt-2 text-gray-400">Loading stocks...</p>
      </div>

      <!-- Data Table -->
      <DataTable
        v-else
        :columns="columns"
        :data="stocks"
        :search-placeholder="'Search stocks...'"
        @row-click="handleRowClick"
        @action-click="handleActionClick"
      >
        <template #actions="{ item }">
          <div class="flex space-x-2">
            <BaseButton
              @click="(e) => {
                e.stopPropagation();
                handleActionClick({ item, action: 'transfer' });
              }"
              variant="secondary"
              size="sm"
            >
              Transfer Stock
            </BaseButton>
            <BaseButton
              @click="(e) => {
                e.stopPropagation();
                handleActionClick({ item, action: 'purchase' });
              }"
              variant="primary"
              size="sm"
            >
              Purchase Stock
            </BaseButton>
          </div>
        </template>
      </DataTable>

      <!-- Create Stock Modal -->
      <Modal
        :is-open="showCreateModal"
        title="Create New Stock"
        @close="showCreateModal = false"
      >
        <StockForm
          @save="handleCreateStock"
          @cancel="showCreateModal = false"
        />
      </Modal>

      <!-- Transfer Stock Modal -->
      <TransferStockModal
        :show="showTransferModal"
        :stock="selectedStock"
        @close="showTransferModal = false"
        @transfer="handleTransferSubmit"
      />

      <!-- Purchase Stock Modal -->
      <PurchaseStockModal
        :show="showPurchaseModal"
        :stock="selectedStock"
        @close="showPurchaseModal = false"
        @purchase="handlePurchaseSubmit"
      />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import DataTable from '@/components/common/DataTable.vue'
import Modal from '@/components/common/Modal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import StockForm from '@/components/stock/StockForm.vue'
import TransferStockModal from '@/components/modals/TransferStockModal.vue'
import PurchaseStockModal from '@/components/modals/PurchaseStockModal.vue'
import AppLayout from '@/components/AppLayout.vue'
import { useInventoryStore } from '@/stores/inventory'
import type { Stock, CreateStockData } from '@/services/api/stocks'

const router = useRouter()
const inventoryStore = useInventoryStore()

const showCreateModal = ref(false)
const showTransferModal = ref(false)
const showPurchaseModal = ref(false)
const selectedStock = ref<Stock | null>(null)

// Use store's state directly
const stocks = computed(() => inventoryStore.stocks)
const loading = computed(() => inventoryStore.loading)
const error = computed(() => inventoryStore.error)

interface Column {
  key: string
  label: string
  type?: 'action'
}

const columns: Column[] = [
  { key: 'stock_code', label: 'Stock Code' },
  { key: 'stock_name', label: 'Stock Name' },
  { key: 'category', label: 'Category' },
  { key: 'stock_status', label: 'Status' },
  { key: 'actions', label: 'Actions', type: 'action' }
]

const handleRowClick = (stock: Stock) => {
  router.push(`/inventory/${stock.stock_id}`)
}

const handleCreateStock = async (stockData: CreateStockData) => {
  console.log(stockData);
  try {
    await inventoryStore.createStock({
      ...stockData,
      userid: 1 // Replace with actual logged-in user ID
    })
    showCreateModal.value = false
  } catch (err) {
    // Error is handled in the store
  }
}

const handleActionClick = ({ item, action }: { item: Stock; action: string }) => {
  selectedStock.value = item
  if (action === 'transfer') {
    showTransferModal.value = true
  } else if (action === 'purchase') {
    showPurchaseModal.value = true
  }
}

const handleTransferSubmit = async (data: { location: string; quantity: number; transferBy: string }) => {
  if (selectedStock.value) {
    try {
      await inventoryStore.updateStock(selectedStock.value.stock_id, {
        stock_status: true, // Update with actual transfer logic
        // Add transfer-specific fields here
      })
      showTransferModal.value = false
    } catch (err) {
      // Error is handled in the store
    }
  }
}

const handlePurchaseSubmit = async (data: { date: string; location: string; quantity: number; price: number; inputBy: string }) => {
  if (selectedStock.value) {
    try {
      await inventoryStore.updateStock(selectedStock.value.stock_id, {
        stock_status: true, // Update with actual purchase logic
        // Add purchase-specific fields here
      })
      showPurchaseModal.value = false
    } catch (err) {
      // Error is handled in the store
    }
  }
}

// Fetch stocks when component mounts
onMounted(() => {
  inventoryStore.fetchStocks()
})
</script> 