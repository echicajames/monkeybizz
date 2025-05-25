<template>
  <AppLayout>
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold mb-8 text-white">Branches</h2>
      
      <DataTable
        :columns="columns"
        :data="branches"
        @action-click="handleActionClick"
      >
        <template #actions="{ item, onClick }">
          <div class="flex space-x-2">
            <BaseButton
              @click="() => onClick('inventory', item)"
              variant="secondary"
              size="sm"
            >
              Inventory
            </BaseButton>
            <BaseButton
              @click="() => onClick('reports', item)"
              variant="secondary"
              size="sm"
            >
              Reports
            </BaseButton>
            <BaseButton
              @click="() => onClick('assets', item)"
              variant="secondary"
              size="sm"
            >
              Assets
            </BaseButton>
          </div>
        </template>
      </DataTable>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import DataTable from '@/components/common/DataTable.vue'
import BaseButton from '@/components/common/BaseButton.vue'

interface Branch {
  id: string;
  name: string;
  location: string;
  dateStarted: string;
  status: 'active' | 'inactive';
}

const router = useRouter()

const columns = [
  { key: 'name', label: 'Branch Name' },
  { key: 'location', label: 'Location' },
  { key: 'dateStarted', label: 'Date Started' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '', type: 'action' }
]

const branches = ref<Branch[]>([
  {
    id: 'nohs',
    name: 'NOHS',
    location: 'North Road, Dumaguete City',
    dateStarted: '2022-01-15',
    status: 'active'
  },
  {
    id: 'boloc',
    name: 'BOLOC',
    location: 'Boloc-Boloc, Sibulan',
    dateStarted: '2022-03-01',
    status: 'active'
  },
  {
    id: 'sibulan',
    name: 'SIBULAN',
    location: 'Sibulan Town Center',
    dateStarted: '2022-04-20',
    status: 'active'
  },
  {
    id: 'camanjac',
    name: 'CAMANJAC',
    location: 'Camanjac, Dumaguete City',
    dateStarted: '2022-06-10',
    status: 'active'
  },
  {
    id: 'junob',
    name: 'JUNOB',
    location: 'Junob, Dumaguete City',
    dateStarted: '2022-08-05',
    status: 'active'
  },
  {
    id: 'taclobo',
    name: 'TACLOBO',
    location: 'Taclobo, Dumaguete City',
    dateStarted: '2022-10-15',
    status: 'active'
  }
])

const handleActionClick = ({ item, action }: { item: Branch; action: string }) => {
  switch (action) {
    case 'inventory':
      console.log('View inventory for:', item.name)
      // router.push(`/branches/${item.id}/inventory`)
      break
    case 'reports':
      console.log('View reports for:', item.name)
      // router.push(`/branches/${item.id}/reports`)
      break
    case 'assets':
      console.log('View assets for:', item.name)
      // router.push(`/branches/${item.id}/assets`)
      break
  }
}
</script> 