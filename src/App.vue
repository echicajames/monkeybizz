<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { onMounted, watch } from 'vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})

// Watch for theme changes
watch(() => themeStore.current, (newTheme) => {
  document.documentElement.classList.remove('light', 'dark', 'midnight')
  document.documentElement.classList.add(newTheme)
})
</script>

<template>
  <div class="min-h-screen w-full transition-colors duration-200
    light:bg-gray-100 light:text-gray-900
    dark:bg-gray-900 dark:text-gray-100
    midnight:bg-midnight-900 midnight:text-gray-100">
    <RouterView />
  </div>
</template>

<style>
/* Import Tailwind in the root component */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add any global styles here */
:root {
  --primary: theme('colors.indigo.600');
  --primary-hover: theme('colors.indigo.700');
}

body {
  margin: 0;
  padding: 0;
}

#app {
  @apply min-h-screen w-full;
}

/* Theme Variables */
:root {
  --bg-primary: theme('colors.gray.100');
  --bg-secondary: theme('colors.white');
  --text-primary: theme('colors.gray.900');
  --text-secondary: theme('colors.gray.600');
  --border-color: theme('colors.gray.200');
}

.dark {
  --bg-primary: theme('colors.gray.900');
  --bg-secondary: theme('colors.gray.800');
  --text-primary: theme('colors.gray.100');
  --text-secondary: theme('colors.gray.400');
  --border-color: theme('colors.gray.700');
}

.midnight {
  --bg-primary: theme('colors.midnight.900');
  --bg-secondary: theme('colors.midnight.800');
  --text-primary: theme('colors.gray.100');
  --text-secondary: theme('colors.gray.400');
  --border-color: theme('colors.midnight.700');
}

/* Base text color for each theme */
.light {
  @apply text-gray-900;
}

.dark, .midnight {
  @apply text-gray-100;
}
</style>
