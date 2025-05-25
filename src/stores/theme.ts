import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark' | 'midnight'

interface ThemeState {
  current: Theme
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    current: (localStorage.getItem('theme') as Theme) || 'midnight'
  }),

  actions: {
    setTheme(theme: Theme) {
      this.current = theme
      localStorage.setItem('theme', theme)
      
      // Remove all theme classes
      document.documentElement.classList.remove('light', 'dark', 'midnight')
      // Add the new theme class
      document.documentElement.classList.add(theme)
    },

    initTheme() {
      this.setTheme(this.current)
    }
  }
}) 