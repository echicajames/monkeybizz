<template>
  <AppLayout>
    <div class="container mx-auto px-4">
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-white">Branch Management</h1>
        <BaseButton
          @click="showCreateModal = true"
        >
          Create Branch
        </BaseButton>
      </div>
      <!-- Error Message -->
      <div v-if="branchesStore.error" class="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
        {{ branchesStore.error }}
      </div>
      <!-- Loading State -->
      <div v-if="branchesStore.loading" class="text-center py-4">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-indigo-600"></div>
        <p class="mt-2 text-gray-400">Loading branches...</p>
      </div>

      <!-- Data Table -->
      <DataTable
        v-else
        :columns="columns"
        :data="branchesStore.branches"
        :search-placeholder="'Search branches...'"
        @row-click="handleRowClick"
        @action-click="handleActionClick"
      >
        <template #actions="{ item }">
          <div class="flex space-x-2">
            <BaseButton
              @click="(e) => {
                e.stopPropagation();
                handleActionClick({ item, action: 'inventory' });
              }"
              variant="secondary"
              size="sm"
            >
              Inventory
            </BaseButton>
            <BaseButton
              @click="(e) => {
                e.stopPropagation();
                handleActionClick({ item, action: 'reports' });
              }"
              variant="secondary"
              size="sm"
            >
              Reports
            </BaseButton>
            <BaseButton
              @click="(e) => {
                e.stopPropagation();
                handleActionClick({ item, action: 'assets' });
              }"
              variant="secondary"
              size="sm"
            >
              Assets
            </BaseButton>
          </div>
        </template>
      </DataTable>

      <!-- Create Branch Modal -->
      <Modal
        :is-open="showCreateModal"
        title="Create New Branch"
        @close="showCreateModal = false"
      >
        <BranchForm
          @submit="handleCreateBranch"
          @cancel="showCreateModal = false"
        />
      </Modal>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import DataTable from '@/components/common/DataTable.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import Modal from '@/components/common/Modal.vue'
import BranchForm from '@/components/branch/BranchForm.vue'
import { useBranchesStore } from '@/stores/branches'
import type { Branch } from '@/services/api/branches'
import dayjs from 'dayjs'

const router = useRouter()
const branchesStore = useBranchesStore()

const { branches } = useBranchesStore()

const showCreateModal = ref(false)

interface Column {
  key: string
  label: string
  type?: 'action'
  formatter?: (value: any) => string
}

const formatDate = (date: string) => {
  return dayjs(date).format('dddd, MMMM D, YYYY')
}

const columns: Column[] = [
  { key: 'name', label: 'Branch Name' },
  { key: 'address', label: 'Address' },
  { key: 'date_opened', label: 'Date Opened', formatter: formatDate },
  { key: 'rent_type', label: 'Rent Type' },
  { key: 'rent_amount', label: 'Rent Amount' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions', type: 'action' }
]

const handleRowClick = (branch: Branch) => {
  router.push(`/branches/${branch.branch_id}`)
}

const handleCreateBranch = async (branchData: any) => {
  try {
    await branchesStore.createBranch(branchData)
    showCreateModal.value = false
  } catch (err) {
    // Error is handled in the store
  }
}

const handleActionClick = ({ item, action }: { item: Branch; action: string }) => {
  switch (action) {
    case 'inventory':
      router.push(`/branches/${item.branch_id}/inventory`)
      break
    case 'reports':
      router.push(`/branches/${item.branch_id}/reports`)
      break
    case 'assets':
      router.push(`/branches/${item.branch_id}/assets`)
      break
  }
}

// Fetch branches when component mounts
onMounted(async() => {
  await branchesStore.fetchBranches()
})
</script> 