<template>
  <Modal
    :is-open="show"
    title="Purchase Stock"
    @close="handleClose"
  >
    <div class="space-y-4">
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Purchasing stock: <span class="font-medium text-gray-900 dark:text-white">{{ stock?.name }}</span>
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Purchase Date
        </label>
        <input
          v-model="form.date"
          type="date"
          required
          class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/5 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>
      <BaseSelect
        v-model="form.location"
        :options="locations"
        label="Location"
        placeholder="Select Location"
        required
      />
      <BaseInput
        v-model="form.quantity"
        type="number"
        label="Quantity"
        :min="1"
        required
      />
      <BaseInput
        v-model="form.price"
        type="number"
        label="Price"
        :min="0"
        step="0.01"
        required
      />
      <BaseSelect
        v-model="form.inputBy"
        :options="persons"
        label="Input By"
        placeholder="Select Person"
        required
      />
      <div class="flex justify-end space-x-3 mt-4">
        <BaseButton
          @click="handleClose"
          variant="outline"
        >
          Cancel
        </BaseButton>
        <BaseButton
          @click="handleSubmit"
          :disabled="!isFormValid"
          variant="primary"
        >
          Save
        </BaseButton>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Modal from '@/components/common/Modal.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import type { Stock } from '@/types/Stock'

const props = defineProps<{
  show: boolean
  stock: Stock | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'purchase', data: { date: string; location: string; quantity: number; price: number; inputBy: string }): void
}>()

const locations = [
  { id: 'NOHS', name: 'NOHS' },
  { id: 'BOLOC', name: 'BOLOC' },
  { id: 'SIBULAN', name: 'SIBULAN' },
  { id: 'CAMANJAC', name: 'CAMANJAC' },
  { id: 'JUNOB', name: 'JUNOB' },
  { id: 'TACLOBO', name: 'TACLOBO' }
]

const persons = [
  { id: 'john.smith', name: 'John Smith' },
  { id: 'maria.garcia', name: 'Maria Garcia' },
  { id: 'david.chen', name: 'David Chen' },
  { id: 'sarah.johnson', name: 'Sarah Johnson' },
  { id: 'michael.lee', name: 'Michael Lee' }
]

const form = ref({
  date: new Date().toISOString().split('T')[0],
  location: '',
  quantity: '',
  price: '',
  inputBy: ''
})

const isFormValid = computed(() => {
  return (
    form.value.date &&
    form.value.location &&
    form.value.quantity > 0 &&
    form.value.price >= 0 &&
    form.value.inputBy
  )
})

const handleClose = () => {
  emit('close')
  // Reset form
  form.value = {
    date: new Date().toISOString().split('T')[0],
    location: '',
    quantity: '',
    price: '',
    inputBy: ''
  }
}

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('purchase', {
      date: form.value.date,
      location: form.value.location,
      quantity: Number(form.value.quantity),
      price: Number(form.value.price),
      inputBy: form.value.inputBy
    })
    handleClose()
  }
}
</script> 