<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseButton from '@/components/common/BaseButton.vue'

interface StockFormData {
  name: string;
  quantity: number;
  description: string;
  location: string;
  createdBy: string;
}

const emit = defineEmits(['save', 'cancel'])

const formData = ref<StockFormData>({
  name: '',
  quantity: 0,
  description: '',
  location: 'main',
  createdBy: ''
})

const locations = [
  { id: 'main', name: 'Main' },
  { id: 'branch1', name: 'Branch 1' },
  { id: 'branch2', name: 'Branch 2' }
]

const persons = [
  { id: 'person1', name: 'Person 1' },
  { id: 'person2', name: 'Person 2' }
]

const handleSubmit = () => {
  emit('save', { ...formData.value })
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <BaseInput
      v-model="formData.name"
      label="Stock Name"
      required
    />

    <BaseInput
      v-model="formData.quantity"
      type="number"
      label="Initial Quantity"
      min="0"
      required
    />

    <BaseInput
      v-model="formData.description"
      label="Description"
      type="textarea"
    />

    <BaseSelect
      v-model="formData.location"
      :options="locations"
      label="Location"
      required
    />

    <BaseSelect
      v-model="formData.createdBy"
      :options="persons"
      label="Created By"
      placeholder="Select Person"
      required
    />

    <div class="flex justify-end space-x-3">
      <BaseButton
        type="button"
        variant="outline"
        @click="handleCancel"
      >
        Cancel
      </BaseButton>
      <BaseButton
        type="submit"
      >
        Save
      </BaseButton>
    </div>
  </form>
</template> 