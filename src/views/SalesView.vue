<template>
  <AppLayout>
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold mb-8 text-white">Sales</h2>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

console.log('authStore', authStore.isAuthenticated);
</script> 