<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import {
  Squares2X2Icon,
  TableCellsIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'
import AppLayout from '@/components/AppLayout.vue'
import BaseInput from '@/components/BaseInput.vue'

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

interface Reservation {
  id: string
  table: string
  floor: string
  guests: number
  time: string
  customerName: string
}

interface Waiter {
  id: string
  name: string
  floor: string
  workload: number
  image: string
}

const reservations = ref<Reservation[]>([
  {
    id: 'K-1',
    table: 'K-1',
    floor: '1 Floor',
    guests: 3,
    time: '17:30',
    customerName: 'Courtney Henry'
  },
  {
    id: 'T-2',
    table: 'T-2',
    floor: '2 Floor',
    guests: 2,
    time: '17:30',
    customerName: 'Michelle Rivera'
  },
  {
    id: 'M-3',
    table: 'M-3',
    floor: '3 Floor',
    guests: 3,
    time: '17:40',
    customerName: 'Jane Cooper'
  }
])

const waiters = ref<Waiter[]>([
  {
    id: '1',
    name: 'Kristin Watson',
    floor: '1 Floor',
    workload: 3,
    image: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: '2',
    name: 'Jacob Jones',
    floor: '1 Floor',
    workload: 3,
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '3',
    name: 'Ronald Richards',
    floor: '1 Floor',
    workload: 4,
    image: 'https://randomuser.me/api/portraits/men/2.jpg'
  }
])
</script>

<template>
  <AppLayout>
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
      <h2 class="text-2xl font-bold text-white">Assign Waiters To The Tables</h2>
      <div class="flex items-center w-full lg:w-auto">
        <div class="relative flex-1 lg:flex-none">
          <MagnifyingGlassIcon class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2
            light:text-gray-400 dark:text-gray-400 midnight:text-gray-400" />
          <BaseInput
            type="text"
            placeholder="Search"
            class="w-full lg:w-64 pl-10 pr-4 py-2 rounded-lg transition-colors duration-200
              light:bg-white light:border-gray-200 light:text-gray-900 light:placeholder-gray-500
              dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400
              midnight:bg-midnight-800 midnight:border-midnight-700 midnight:text-gray-100 midnight:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <span class="hidden lg:block ml-4 text-gray-400">
          Monday, July 2
        </span>
      </div>
    </div>

    <!-- Reservations -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
      <div v-for="reservation in reservations" :key="reservation.id" 
        class="p-8 rounded-lg border transition-colors duration-200 w-full
          light:bg-white light:border-gray-200
          dark:bg-gray-800 dark:border-gray-700
          midnight:bg-midnight-800 midnight:border-midnight-700">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="text-2xl font-bold text-gray-100 mb-2">{{ reservation.table }}</h3>
            <p class="text-gray-400 text-base">{{ reservation.floor }}</p>
          </div>
        </div>
        <div class="space-y-5">
          <div class="flex justify-between items-center text-gray-400">
            <span class="text-base">Guests</span>
            <span class="text-base font-medium">{{ reservation.guests }} Persons</span>
          </div>
          <div class="flex justify-between items-center text-gray-400">
            <span class="text-base">Time</span>
            <span class="text-base font-medium">{{ reservation.time }}</span>
          </div>
          <div class="flex justify-between items-center text-gray-400">
            <span class="text-base">Customer Name</span>
            <span class="text-base font-medium">{{ reservation.customerName }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Waiters -->
    <div class="mt-8">
      <h3 class="text-xl font-bold mb-4 text-gray-100">Waiters On The First Floor</h3>
      <div class="space-y-4">
        <div v-for="waiter in waiters" :key="waiter.id" 
          class="flex flex-col lg:flex-row lg:items-center justify-between p-6 rounded-lg border space-y-4 lg:space-y-0 transition-colors duration-200
            light:bg-white light:border-gray-200
            dark:bg-gray-800 dark:border-gray-700
            midnight:bg-midnight-800 midnight:border-midnight-700">
          <div class="flex items-center">
            <img :src="waiter.image" :alt="waiter.name" class="w-12 h-12 rounded-full" />
            <div class="ml-4">
              <h4 class="text-gray-100 text-lg">{{ waiter.name }}</h4>
              <p class="text-gray-400">{{ waiter.floor }}</p>
            </div>
          </div>
          <div class="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-6">
            <div>
              <p class="text-gray-400 mb-2">Waiter Workload</p>
              <div class="flex space-x-2">
                <div v-for="n in 5" :key="n" class="w-6 h-1.5 rounded"
                  :class="n <= waiter.workload ? 'bg-indigo-500' : 'bg-midnight-600'"></div>
              </div>
            </div>
            <button class="w-full lg:w-auto px-6 py-2.5 text-gray-100 bg-midnight-700 hover:bg-midnight-600 rounded-lg border border-midnight-600 transition-colors duration-200">
              Assign To Table
            </button>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template> 