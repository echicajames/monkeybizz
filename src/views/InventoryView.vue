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
        Loading stocks...
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DataTable from '@/components/common/DataTable.vue'
import Modal from '@/components/common/Modal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import StockForm from '@/components/stock/StockForm.vue'
import TransferStockModal from '@/components/modals/TransferStockModal.vue'
import PurchaseStockModal from '@/components/modals/PurchaseStockModal.vue'
import AppLayout from '@/components/AppLayout.vue'
import { stocksApi } from '@/services/api/stocks'
import type { Stock } from '@/services/api/stocks'

const router = useRouter()
const showCreateModal = ref(false)
const showTransferModal = ref(false)
const showPurchaseModal = ref(false)
const selectedStock = ref<Stock | null>(null)
const stocks = ref<Stock[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

interface Column {
  key: string
  label: string
  type?: 'action'
}

const columns: Column[] = [
  { key: 'stock_code', label: 'Stock Code' },
  { key: 'stock_name', label: 'Stock Name' },
  { key: 'stock_type', label: 'Type' },
  { key: 'stock_status', label: 'Status' },
  { key: 'actions', label: 'Actions', type: 'action' }
]

const fetchStocks = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await stocksApi.getAllStocks({
      status: 'active',
      page: 1
    })
    stocks.value = response.data.data || []
  } catch (err) {
    error.value = 'Failed to fetch stocks'
    console.error('Error fetching stocks:', err)
  } finally {
    loading.value = false
  }
}

const handleRowClick = (stock: Stock) => {
  router.push(`/inventory/${stock.stock_id}`)
}

const handleCreateStock = async (stockData: Omit<Stock, 'stock_id' | 'date_created'>) => {
  try {
    await stocksApi.createStock({
      ...stockData,
      userid: 1 // Replace with actual logged-in user ID
    })
    showCreateModal.value = false
    fetchStocks() // Refresh the list
  } catch (err) {
    console.error('Error creating stock:', err)
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
      await stocksApi.updateStock(selectedStock.value.stock_id, {
        // Add your transfer logic here
      })
      showTransferModal.value = false
      fetchStocks() // Refresh the list
    } catch (err) {
      console.error('Error transferring stock:', err)
    }
  }
}

const handlePurchaseSubmit = async (data: { date: string; location: string; quantity: number; price: number; inputBy: string }) => {
  if (selectedStock.value) {
    try {
      await stocksApi.updateStock(selectedStock.value.stock_id, {
        // Add your purchase logic here
      })
      showPurchaseModal.value = false
      fetchStocks() // Refresh the list
    } catch (err) {
      console.error('Error purchasing stock:', err)
    }
  }
}

// Fetch stocks when component mounts
onMounted(() => {
  fetchStocks()
})
</script> 