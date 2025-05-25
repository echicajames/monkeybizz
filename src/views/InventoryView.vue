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
      
      <DataTable
        :columns="columns"
        :data="inventoryStore.getAllStocks"
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import DataTable from '@/components/common/DataTable.vue'
import Modal from '@/components/common/Modal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import StockForm from '@/components/stock/StockForm.vue'
import TransferStockModal from '@/components/modals/TransferStockModal.vue'
import PurchaseStockModal from '@/components/modals/PurchaseStockModal.vue'
import { useInventoryStore } from '@/stores/inventory'
import type { Stock } from '@/types/Stock'
import AppLayout from '@/components/AppLayout.vue'

const router = useRouter()
const inventoryStore = useInventoryStore()
const showCreateModal = ref(false)
const showTransferModal = ref(false)
const showPurchaseModal = ref(false)
const selectedStock = ref<Stock | null>(null)

const locations = [
  { id: 'main', name: 'Main' },
  { id: 'branch1', name: 'Branch 1' },
  { id: 'branch2', name: 'Branch 2' }
]

const persons = [
  { id: 'person1', name: 'Person 1' },
  { id: 'person2', name: 'Person 2' }
]

const columns = [
  { key: 'id', label: 'Stock ID' },
  { key: 'name', label: 'Stock Name' },
  { key: 'description', label: 'Description' },
  { key: 'quantity', label: 'Qty' },
  { key: 'actions', label: 'Actions', type: 'action' }
]

const isTransferValid = computed(() => {
  return (
    transferLocation.value &&
    transferQuantity.value > 0 &&
    selectedStock.value &&
    transferQuantity.value <= selectedStock.value.quantity &&
    transferBy.value
  )
})

const handleRowClick = (stock: Stock) => {
  router.push(`/inventory/main/${stock.id}`)
}

const handleCreateStock = (stockData: Omit<Stock, 'id'>) => {
  console.log('Creating stock:', stockData)
  showCreateModal.value = false
}

const handleActionClick = ({ item, action }: { item: Stock; action: string }) => {
  selectedStock.value = item
  if (action === 'transfer') {
    showTransferModal.value = true
  } else if (action === 'purchase') {
    showPurchaseModal.value = true
  }
}

const handleTransferSubmit = (data: { location: string; quantity: number; transferBy: string }) => {
  if (selectedStock.value) {
    console.log('Transferring stock:', {
      stock: selectedStock.value,
      ...data
    })
    showTransferModal.value = false
  }
}

const handlePurchaseSubmit = (data: { date: string; location: string; quantity: number; price: number; inputBy: string }) => {
  if (selectedStock.value) {
    console.log('Purchasing stock:', {
      stock: selectedStock.value,
      ...data
    })
    showPurchaseModal.value = false
  }
}
</script> 