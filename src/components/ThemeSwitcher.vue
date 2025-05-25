<script setup lang="ts">
import { useThemeStore, type Theme } from '@/stores/theme'
import { 
  SunIcon,
  MoonIcon,
  SwatchIcon
} from '@heroicons/vue/24/outline'
import { computed } from 'vue'

const themeStore = useThemeStore()

const currentTheme = computed(() => themeStore.current)

const themes: { name: Theme; icon: any; label: string }[] = [
  { name: 'light', icon: SunIcon, label: 'Light' },
  { name: 'dark', icon: MoonIcon, label: 'Dark' },
  { name: 'midnight', icon: SwatchIcon, label: 'Midnight' }
]

const switchTheme = (theme: Theme) => {
  themeStore.setTheme(theme)
}
</script>

<template>
  <div class="relative">
    <div class="flex items-center space-x-2 rounded-lg bg-opacity-20 p-2">
      <button
        v-for="theme in themes"
        :key="theme.name"
        @click="switchTheme(theme.name)"
        :class="[
          'p-2 rounded-md transition-colors duration-200',
          currentTheme === theme.name 
            ? 'light:bg-gray-200 light:text-gray-800 dark:bg-gray-700 dark:text-white midnight:bg-midnight-700 midnight:text-white'
            : 'light:text-gray-500 light:hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 midnight:text-gray-400 midnight:hover:bg-midnight-800'
        ]"
        :title="theme.label"
      >
        <component :is="theme.icon" class="h-5 w-5" />
      </button>
    </div>
  </div>
</template> 