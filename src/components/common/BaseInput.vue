<script setup lang="ts">
interface Props {
  modelValue: string | number;
  type?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', props.type === 'number' ? Number(target.value) : target.value)
}
</script>

<template>
  <div>
    <label 
      v-if="label" 
      :for="id" 
      class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 midnight:text-gray-300"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :required="required"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      @input="handleInput"
      class="w-full px-4 py-2 rounded-lg transition-colors duration-200
        bg-white/10 border border-gray-300/10
        text-gray-900 dark:text-gray-100 midnight:text-gray-100
        placeholder-gray-500 dark:placeholder-gray-400 midnight:placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        dark:bg-gray-800/50 dark:border-gray-600/50
        midnight:bg-midnight-700/50 midnight:border-midnight-600/50"
    />
  </div>
</template> 