<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  isLoading: false
})

const variantClasses = {
  primary: 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700',
  secondary: 'border-transparent bg-indigo-100 text-indigo-600 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-400 dark:hover:bg-indigo-900/75',
  outline: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 midnight:bg-midnight-700 midnight:border-midnight-600 midnight:text-white midnight:hover:bg-midnight-600',
  danger: 'border-transparent bg-red-600 text-white hover:bg-red-700'
}

const sizeClasses = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
}

const baseClasses = 'inline-flex items-center justify-center rounded-md border font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || isLoading"
    :class="[
      baseClasses,
      variantClasses[variant],
      sizeClasses[size]
    ]"
  >
    <template v-if="isLoading">
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading...
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template> 