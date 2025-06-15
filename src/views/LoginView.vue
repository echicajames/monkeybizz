<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseInput from '@/components/common/BaseInput.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleLogin = async (e: Event) => {
  e.preventDefault() // Prevent form submission
  if (isLoading.value) return

  error.value = ''
  isLoading.value = true

  try {
    await authStore.login(email.value, password.value)
    console.log(' To dashboard --->')
    await router.push('/dashboard')
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Invalid credentials'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-midnight-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">Sign in to your account</h2>
        <p class="mt-2 text-center text-sm text-gray-400">
          Or
          <router-link to="/register" class="font-medium text-indigo-400 hover:text-indigo-300">
            create a new account
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <BaseInput
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              :disabled="isLoading"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <BaseInput
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              :disabled="isLoading"
              placeholder="Password"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">{{ error }}</div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template> 