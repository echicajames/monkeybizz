<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 midnight:bg-midnight-900">
    <!-- Mobile Menu Button -->
    <div class="lg:hidden fixed top-0 left-0 m-4 z-50">
      <button @click="toggleMobileMenu" class="p-2 text-gray-400 hover:text-white">
        <Bars3Icon v-if="!isMobileMenuOpen" class="h-6 w-6" />
        <XMarkIcon v-else class="h-6 w-6" />
      </button>
    </div>

    <!-- Theme Switcher -->
    <div class="fixed top-0 right-0 m-4 z-50">
      <ThemeSwitcher />
    </div>

    <!-- Sidebar -->
    <aside :class="[
      'fixed inset-y-0 left-0 w-64 transition-all duration-300 ease-in-out z-40 border-r',
      'bg-white dark:bg-gray-800 midnight:bg-midnight-800',
      'border-gray-200 dark:border-gray-700 midnight:border-midnight-700',
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white midnight:text-white">MONKEYBIZZ</h1>
      </div>
      <nav class="mt-6">
        <router-link
          to="/dashboard"
          class="flex items-center px-6 py-3 transition-colors duration-200"
          :class="$route.path === '/dashboard' ? 'bg-midnight-700 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-midnight-700 hover:text-white'"
        >
          <Squares2X2Icon class="h-5 w-5" />
          <span class="mx-3">Dashboard</span>
        </router-link>
        <router-link
          to="/inventory"
          class="flex items-center px-6 py-3 transition-colors duration-200"
          :class="$route.path === '/inventory' ? 'bg-midnight-700 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-midnight-700 hover:text-white'"
        >
          <ClipboardDocumentListIcon class="h-5 w-5" />
          <span class="mx-3">Inventory</span>
        </router-link>
        <router-link
          to="/reports"
          class="flex items-center px-6 py-3 transition-colors duration-200"
          :class="$route.path === '/reports' ? 'bg-midnight-700 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-midnight-700 hover:text-white'"
        >
          <ChartBarIcon class="h-5 w-5" />
          <span class="mx-3">Reports</span>
        </router-link>
        <router-link
          to="/users"
          class="flex items-center px-6 py-3 transition-colors duration-200"
          :class="$route.path === '/users' ? 'bg-midnight-700 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-midnight-700 hover:text-white'"
        >
          <UsersIcon class="h-5 w-5" />
          <span class="mx-3">Users</span>
        </router-link>
      </nav>
      <div class="absolute bottom-0 w-full p-4">
        <button
          @click="handleLogout"
          class="w-full flex items-center px-4 py-2 rounded transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:bg-midnight-700 hover:text-white"
        >
          <ArrowRightOnRectangleIcon class="h-5 w-5" />
          <span class="mx-3">Log Out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="lg:ml-64 min-h-screen p-4 lg:p-12 pt-16 lg:pt-12 w-full">
      <div class="max-w-[1920px] mx-auto">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import {
  Squares2X2Icon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  UsersIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script> 