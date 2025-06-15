<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
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
      <label for="stock_code" class="block text-sm font-medium text-gray-300">Stock ID</label>
      <BaseInput
        id="stock_code"
        v-model="formData.stock_code"
        type="text"
        required
      />
    </div>

    <div>
      <label for="stock_name" class="block text-sm font-medium text-gray-300">Stock Name</label>
      <BaseInput
        id="stock_name"
        v-model="formData.stock_name"
        type="text"
        required
      />
    </div>

    <div>
      <label for="stock_type" class="block text-sm font-medium text-gray-300">Category</label>
      <BaseInput
        id="stock_type"
        v-model="formData.stock_type"
        type="text"
        required
      />
    </div>

    <div>
      <label for="stock_status" class="block text-sm font-medium text-gray-300">Status</label>
      <BaseSelect
        id="stock_status"
        v-model="formData.stock_status"
        required
        :options="[
          { id: 'active', name: 'Active' },
          { id: 'inactive', name: 'Inactive' },
          { id: 'out_of_stock', name: 'Out of Stock' }
        ]"
      />
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