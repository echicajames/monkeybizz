<script setup lang="ts">
interface Option {
  id: string | number;
  name: string;
}

interface Props {
  modelValue: string | number;
  options: Option[];
  label?: string;
  required?: boolean;
  id?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  placeholder: 'Select an option'
})

const emit = defineEmits(['update:modelValue'])
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
    <select
      :id="id"
      :value="modelValue"
      :required="required"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="w-full px-4 py-2 rounded-lg transition-colors duration-200
        bg-white/10 border border-gray-300/10
        text-gray-900 dark:text-gray-100 midnight:text-gray-100
        placeholder-gray-500 dark:placeholder-gray-400 midnight:placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        dark:bg-gray-800/50 dark:border-gray-600/50
        midnight:bg-midnight-700/50 midnight:border-midnight-600/50"
    >
      <option value="">{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="option.id" 
        :value="option.id"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template> 