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
        @row-click="handleRowClick"
        @action-click="handleActionClick"
      >
        <template #transfer="{ item, onClick }">
          <BaseButton
            @click="onClick"
            variant="secondary"
            size="sm"
          >
            Transfer Stock
          </BaseButton>
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
      <Modal
        :is-open="showTransferModal"
        title="Transfer Stock"
        @close="showTransferModal = false"
      >
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Transferring stock: <span class="font-medium text-gray-900 dark:text-white">{{ selectedStock?.name }}</span>
            </p>
          </div>
          <BaseSelect
            v-model="transferLocation"
            :options="locations"
            label="Transfer to Location"
            placeholder="Select Location"
            required
          />
          <BaseInput
            v-model="transferQuantity"
            type="number"
            label="Quantity to Transfer"
            :min="1"
            :max="selectedStock?.quantity"
            required
          />
          <BaseSelect
            v-model="transferBy"
            :options="persons"
            label="Transfer By"
            placeholder="Select Person"
            required
          />
          <div class="flex justify-end space-x-3 mt-4">
            <BaseButton
              @click="showTransferModal = false"
              variant="outline"
            >
              Cancel
            </BaseButton>
            <BaseButton
              @click="handleTransferSubmit"
              :disabled="!isTransferValid"
            >
              Transfer
            </BaseButton>
          </div>
        </div>
      </Modal>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import DataTable from '@/components/common/DataTable.vue'
import Modal from '@/components/common/Modal.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import StockForm from '@/components/stock/StockForm.vue'
import { useInventoryStore } from '@/stores/inventory'
import type { Stock } from '@/types/Stock'
import AppLayout from '@/components/AppLayout.vue'

const router = useRouter()
const inventoryStore = useInventoryStore()
const showCreateModal = ref(false)
const showTransferModal = ref(false)
const selectedStock = ref<Stock | null>(null)
const transferLocation = ref('')
const transferQuantity = ref<number>(1)
const transferBy = ref('')

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
  { key: 'transfer', label: 'Actions', type: 'action' }
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
  alert(`Selected stock: ${stock.name}`)
}

const handleCreateStock = (stockData: Omit<Stock, 'id'>) => {
  console.log('Creating stock:', stockData)
  showCreateModal.value = false
}

const handleActionClick = ({ item, action }: { item: Stock; action: string }) => {
  if (action === 'transfer') {
    selectedStock.value = item
    transferQuantity.value = 1
    transferLocation.value = ''
    transferBy.value = ''
    showTransferModal.value = true
  }
}

const handleTransferSubmit = () => {
  if (selectedStock.value && isTransferValid.value) {
    console.log('Transferring stock:', {
      stock: selectedStock.value,
      quantity: transferQuantity.value,
      toLocation: transferLocation.value,
      by: transferBy.value
    })
    showTransferModal.value = false
  }
}
</script> 