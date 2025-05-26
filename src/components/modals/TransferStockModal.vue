<template>
  <Modal
    :is-open="show"
    title="Transfer Stock"
    @close="handleClose"
  >
    <div class="space-y-4">
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Transferring stock: <span class="font-medium text-gray-900 dark:text-white">{{ stock?.name }}</span>
        </p>
      </div>
      <BaseSelect
        v-model="form.location"
        :options="locations"
        label="Transfer to Location"
        placeholder="Select Location"
        required
      />
      <BaseInput
        v-model="form.quantity"
        type="number"
        label="Quantity to Transfer"
        :min="1"
        :max="stock?.quantity"
        required
      />
      <BaseSelect
        v-model="form.transferBy"
        :options="persons"
        label="Transfer By"
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
        >
          Transfer
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
  (e: 'transfer', data: { location: string; quantity: number; transferBy: string }): void
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
  location: '',
  quantity: 1,
  transferBy: ''
})

const isFormValid = computed(() => {
  return (
    form.value.location &&
    form.value.quantity > 0 &&
    props.stock &&
    form.value.quantity <= props.stock.quantity &&
    form.value.transferBy
  )
})

const handleClose = () => {
  emit('close')
  // Reset form
  form.value = {
    location: '',
    quantity: 1,
    transferBy: ''
  }
}

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('transfer', {
      location: form.value.location,
      quantity: form.value.quantity,
      transferBy: form.value.transferBy
    })
    handleClose()
  }
}
</script> 