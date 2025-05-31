<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api, { csrf } from '@/services/api'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleRegister = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match'
      return
    }

    // Get CSRF token
    await csrf()
    
    // Register the user
    await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value
    })
    
    // Redirect to login after successful registration
    router.push('/login')
  } catch (e: any) {
    error.value = e.response?.data?.message || 'An error occurred during registration'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-midnight-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">Create your account</h2>
        <p class="mt-2 text-center text-sm text-gray-400">
          Or
          <router-link to="/login" class="font-medium text-indigo-400 hover:text-indigo-300">
            sign in to your account
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Name</label>
            <input
              id="name"
              v-model="name"
              name="name"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-midnight-600 placeholder-gray-500 text-gray-100 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-midnight-800"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-midnight-600 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-midnight-800"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-midnight-600 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-midnight-800"
              placeholder="Password"
            />
          </div>
          <div>
            <label for="confirm-password" class="sr-only">Confirm Password</label>
            <input
              id="confirm-password"
              v-model="confirmPassword"
              name="confirm-password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-midnight-600 placeholder-gray-500 text-gray-100 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-midnight-800"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">{{ error }}</div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  </div>
</template> 