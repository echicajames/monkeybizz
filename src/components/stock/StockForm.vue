<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import type { CreateStockData } from '@/services/api/stocks'

const emit = defineEmits<{
  (e: 'save', data: CreateStockData): void
  (e: 'cancel'): void
}>()

const formData = ref<CreateStockData>({
  stock_code: '',
  stock_name: '',
  stock_type: '',
  stock_status: 'active',
  userid: 1 // This should be replaced with the actual logged-in user's ID
})

const handleSubmit = () => {
  emit('save', { ...formData.value })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="stock_code" class="block text-sm font-medium text-gray-300">Stock Code</label>
      <input
        id="stock_code"
        v-model="formData.stock_code"
        type="text"
        required
        class="mt-1 block w-full rounded-md bg-midnight-800 border-midnight-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label for="stock_name" class="block text-sm font-medium text-gray-300">Stock Name</label>
      <input
        id="stock_name"
        v-model="formData.stock_name"
        type="text"
        required
        class="mt-1 block w-full rounded-md bg-midnight-800 border-midnight-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label for="stock_type" class="block text-sm font-medium text-gray-300">Stock Type</label>
      <input
        id="stock_type"
        v-model="formData.stock_type"
        type="text"
        required
        class="mt-1 block w-full rounded-md bg-midnight-800 border-midnight-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label for="stock_status" class="block text-sm font-medium text-gray-300">Status</label>
      <select
        id="stock_status"
        v-model="formData.stock_status"
        required
        class="mt-1 block w-full rounded-md bg-midnight-800 border-midnight-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="out_of_stock">Out of Stock</option>
      </select>
    </div>

    <div class="flex justify-end space-x-3 pt-4">
      <BaseButton type="button" variant="secondary" @click="$emit('cancel')">
        Cancel
      </BaseButton>
      <BaseButton type="submit" variant="primary">
        Save
      </BaseButton>
    </div>
  </form>
</template> 