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
  <div class="min-h-screen transition-colors duration-200
    light:bg-gray-100 dark:bg-gray-900 midnight:bg-midnight-900">
    <!-- Mobile Menu Button -->
    <div class="lg:hidden fixed top-0 left-0 m-4 z-50">
      <button @click="toggleMobileMenu" class="p-2 light:text-gray-600 dark:text-gray-400 midnight:text-gray-400 hover:text-white">
        <Bars3Icon v-if="!isMobileMenuOpen" class="h-6 w-6" />
        <XMarkIcon v-else class="h-6 w-6" />
      </button>
    </div>

    <!-- Theme Switcher -->
    <div class="fixed top-0 right-0 m-4 z-50">
      <ThemeSwitcher />
    </div>

    <!-- Sidebar -->
    <div :class="[
      'fixed inset-y-0 left-0 w-64 transition-all duration-300 ease-in-out z-40 border-r',
      'light:bg-white light:border-gray-200 light:text-gray-900',
      'dark:bg-gray-800 dark:border-gray-700 dark:text-white',
      'midnight:bg-midnight-800 midnight:border-midnight-700 midnight:text-white',
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
      <div class="p-6">
        <h1 class="text-2xl font-bold">TABELA</h1>
      </div>
      <nav class="mt-6">
        <a href="#" class="flex items-center px-6 py-3 transition-colors duration-200
          light:text-gray-600 light:hover:bg-gray-100
          dark:text-gray-400 dark:hover:bg-gray-700
          midnight:text-gray-400 midnight:hover:bg-midnight-700">
          <Squares2X2Icon class="h-5 w-5" />
          <span class="mx-3">Dashboard</span>
        </a>
        <a href="#" class="flex items-center px-6 py-3 transition-colors duration-200
          light:text-gray-600 light:hover:bg-gray-100
          dark:text-gray-400 dark:hover:bg-gray-700
          midnight:text-gray-400 midnight:hover:bg-midnight-700">
          <TableCellsIcon class="h-5 w-5" />
          <span class="mx-3">Tables</span>
        </a>
        <a href="#" class="flex items-center px-6 py-3 bg-midnight-700 text-white">
          <CalendarDaysIcon class="h-5 w-5" />
          <span class="mx-3">Reservations</span>
        </a>
        <a href="#" class="flex items-center px-6 py-3 transition-colors duration-200
          light:text-gray-600 light:hover:bg-gray-100
          dark:text-gray-400 dark:hover:bg-gray-700
          midnight:text-gray-400 midnight:hover:bg-midnight-700">
          <UserGroupIcon class="h-5 w-5" />
          <span class="mx-3">Waiters</span>
        </a>
        <a href="#" class="flex items-center px-6 py-3 text-gray-400 hover:bg-midnight-700">
          <ClipboardDocumentListIcon class="h-5 w-5" />
          <span class="mx-3">Menu</span>
        </a>
        <a href="#" class="flex items-center px-6 py-3 text-gray-400 hover:bg-midnight-700">
          <UsersIcon class="h-5 w-5" />
          <span class="mx-3">Customers</span>
        </a>
        <a href="#" class="flex items-center px-6 py-3 text-gray-400 hover:bg-midnight-700">
          <ChartBarIcon class="h-5 w-5" />
          <span class="mx-3">Reports</span>
        </a>
      </nav>
      <div class="absolute bottom-0 w-full p-4">
        <button
          @click="handleLogout"
          class="w-full flex items-center px-4 py-2 rounded transition-colors duration-200
            light:text-gray-600 light:hover:bg-gray-100
            dark:text-gray-400 dark:hover:bg-gray-700
            midnight:text-gray-400 midnight:hover:bg-midnight-700"
        >
          <ArrowRightOnRectangleIcon class="h-5 w-5" />
          <span class="mx-3">Log Out</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="lg:ml-64 p-4 lg:p-8 pt-16 lg:pt-8">
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
        <h2 class="text-2xl font-bold">Assign Waiters To The Tables</h2>
        <div class="flex items-center w-full lg:w-auto">
          <div class="relative flex-1 lg:flex-none">
            <MagnifyingGlassIcon class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2
              light:text-gray-400 dark:text-gray-400 midnight:text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              class="w-full lg:w-64 pl-10 pr-4 py-2 rounded-lg transition-colors duration-200
                light:bg-white light:border-gray-200 light:text-gray-900 light:placeholder-gray-500
                dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400
                midnight:bg-midnight-800 midnight:border-midnight-700 midnight:text-gray-100 midnight:placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <span class="hidden lg:block ml-4 light:text-gray-600 dark:text-gray-400 midnight:text-gray-400">
            Monday, July 2
          </span>
        </div>
      </div>

      <!-- Reservations -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div v-for="reservation in reservations" :key="reservation.id" 
          class="p-4 lg:p-6 rounded-lg border transition-colors duration-200
            light:bg-white light:border-gray-200
            dark:bg-gray-800 dark:border-gray-700
            midnight:bg-midnight-800 midnight:border-midnight-700">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-xl font-bold text-gray-100">{{ reservation.table }}</h3>
              <p class="text-gray-400">{{ reservation.floor }}</p>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-gray-400">
              <span>Guests</span>
              <span>{{ reservation.guests }} Persons</span>
            </div>
            <div class="flex justify-between text-gray-400">
              <span>Time</span>
              <span>{{ reservation.time }}</span>
            </div>
            <div class="flex justify-between text-gray-400">
              <span>Customer Name</span>
              <span>{{ reservation.customerName }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Waiters -->
      <div class="mt-8">
        <h3 class="text-xl font-bold mb-4">Waiters On The First Floor</h3>
        <div class="space-y-4">
          <div v-for="waiter in waiters" :key="waiter.id" 
            class="flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-lg border space-y-4 lg:space-y-0 transition-colors duration-200
              light:bg-white light:border-gray-200
              dark:bg-gray-800 dark:border-gray-700
              midnight:bg-midnight-800 midnight:border-midnight-700">
            <div class="flex items-center">
              <img :src="waiter.image" :alt="waiter.name" class="w-10 h-10 rounded-full" />
              <div class="ml-4">
                <h4 class="text-gray-100">{{ waiter.name }}</h4>
                <p class="text-gray-400">{{ waiter.floor }}</p>
              </div>
            </div>
            <div class="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
              <div>
                <p class="text-gray-400">Waiter Workload</p>
                <div class="flex space-x-1">
                  <div v-for="n in 5" :key="n" class="w-4 h-1 rounded"
                    :class="n <= waiter.workload ? 'bg-indigo-500' : 'bg-midnight-600'"></div>
                </div>
              </div>
              <button class="w-full lg:w-auto px-4 py-2 text-gray-100 hover:bg-midnight-700 rounded border border-midnight-600">
                Assign To Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 