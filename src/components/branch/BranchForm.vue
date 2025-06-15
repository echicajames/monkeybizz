<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <BaseInput
      v-model="formData.name"
      label="Branch Name"
      placeholder="Enter branch name"
      :error="errors.name"
      required
    />

    <BaseInput
      v-model="formData.address"
      label="Address"
      placeholder="Enter branch address"
      :error="errors.address"
      required
    />

    <BaseInput
      v-model="formData.date_opened"
      type="date"
      label="Date Opened"
      :error="errors.date_opened"
      required
    />

    <BaseSelect
      v-model="formData.rent_type"
      label="Rent Type"
      :options="rentTypeOptions"
      :error="errors.rent_type"
      required
    />

    <BaseInput
      v-model="formData.rent_amount"
      type="number"
      label="Rent Amount"
      placeholder="Enter rent amount"
      :error="errors.rent_amount"
      required
    />

    <div class="flex items-center">
      <input
        type="checkbox"
        v-model="formData.status"
        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label class="ml-2 block text-sm text-gray-900">
        Active
      </label>
    </div>

    <div class="flex justify-end space-x-3">
      <button
        type="button"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        @click="$emit('cancel')"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        :disabled="loading"
      >
        {{ loading ? 'Saving...' : 'Save Branch' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import type { CreateBranchData } from '@/services/api/branches'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits<{
  (e: 'submit', data: CreateBranchData): void
  (e: 'cancel'): void
}>()

const authStore = useAuthStore()
const loading = ref(false)

const rentTypeOptions = [
  { id: 'daily', name: 'Daily' },
  { id: 'weekly', name: 'Weekly' },
  { id: 'monthly', name: 'Monthly' }
]

const formData = reactive<CreateBranchData>({
  name: '',
  address: '',
  date_opened: '',
  status: true,
  rent_amount: 0,
  rent_type: 'monthly',
  userid: authStore.user?.id || 0
})

const errors = reactive({
  name: '',
  address: '',
  date_opened: '',
  rent_type: '',
  rent_amount: ''
})

const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.address = ''
  errors.date_opened = ''
  errors.rent_type = ''
  errors.rent_amount = ''

  if (!formData.name.trim()) {
    errors.name = 'Branch name is required'
    isValid = false
  }

  if (!formData.address.trim()) {
    errors.address = 'Address is required'
    isValid = false
  }

  if (!formData.date_opened) {
    errors.date_opened = 'Date opened is required'
    isValid = false
  }

  if (!formData.rent_type) {
    errors.rent_type = 'Rent type is required'
    isValid = false
  }

  if (!formData.rent_amount || formData.rent_amount <= 0) {
    errors.rent_amount = 'Rent amount must be greater than 0'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    emit('submit', { ...formData })
  } finally {
    loading.value = false
  }
}
</script> 