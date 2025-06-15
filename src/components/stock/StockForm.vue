<script setup lang="ts">
import { ref, reactive } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import type { CreateStockData } from '@/services/api/stocks'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits<{
  (e: 'save', data: CreateStockData): void
  (e: 'cancel'): void
}>()

const authStore = useAuthStore()
const loading = ref(false)

// Update the category options to match the actual categories in the database
const categoryOptions = [
  { id: 'powder', name: 'Powder' },
  { id: 'cone', name: 'Cones' },
  { id: 'cup', name: 'Cup' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'machine', name: 'Machine' },
  { id: 'other', name: 'Other' }
]

const formData = reactive<CreateStockData>({
  stock_name: '',
  stock_code: '',
  category: '',
  stock_status: true,
  userid: authStore.user?.id || 0
})

const errors = reactive({
  stock_name: '',
  stock_code: '',
  category: '',
  stock_status: ''
})

const validateForm = () => {
  let isValid = true
  errors.stock_name = ''
  errors.stock_code = ''
  errors.category = ''
  errors.stock_status = ''

  if (!formData.stock_name.trim()) {
    errors.stock_name = 'Stock name is required'
    isValid = false
  }

  if (!formData.stock_code.trim()) {
    errors.stock_code = 'Stock code is required'
    isValid = false
  }

  if (!formData.category) {
    errors.category = 'Category is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    emit('save', { ...formData })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <BaseInput
      v-model="formData.stock_name"
      label="Stock Name"
      placeholder="Enter stock name"
      :error="errors.stock_name"
      required
    />

    <BaseInput
      v-model="formData.stock_code"
      label="Stock Code"
      placeholder="Enter stock code"
      :error="errors.stock_code"
      required
    />

    <BaseSelect
      v-model="formData.category"
      label="Category"
      :options="categoryOptions"
      :error="errors.category"
      required
    />

    <div class="flex items-center">
      <input
        type="checkbox"
        v-model="formData.stock_status"
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
        {{ loading ? 'Saving...' : 'Save Stock' }}
      </button>
    </div>
  </form>
</template> 