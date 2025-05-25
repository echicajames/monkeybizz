<script setup lang="ts">
import { ref, computed } from 'vue'

interface Column {
  key: string;
  label: string;
  type?: 'action';
}

interface Props {
  columns: Column[];
  data: any[];
  showSearch?: boolean;
  searchPlaceholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showSearch: true,
  searchPlaceholder: 'Search...'
})

const emit = defineEmits(['rowClick', 'actionClick'])
const searchQuery = ref('')

const filteredData = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return props.data
  
  return props.data.filter(item => {
    return props.columns.some(column => {
      if (column.type === 'action') return false
      const value = item[column.key]
      if (!value) return false
      return String(value).toLowerCase().includes(query)
    })
  })
})

const handleRowClick = (item: any) => {
  emit('rowClick', item)
}

const handleActionClick = (e: Event, item: any, action: string) => {
  e.stopPropagation() // Prevent row click when clicking action button
  emit('actionClick', { item, action })
}
</script>

<template>
  <div class="space-y-4">
    <!-- Search Input -->
    <div v-if="showSearch" class="relative max-w-md">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="searchPlaceholder"
        class="w-full pl-10 pr-4 py-2 rounded-lg border transition-colors duration-200
          bg-white/5 border-gray-700 text-gray-100 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              class="py-3 px-6"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredData"
            :key="item.id"
            @click="handleRowClick(item)"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="py-4 px-6"
            >
              <template v-if="column.type === 'action'">
                <slot :name="column.key" :item="item" :onClick="(e: Event) => handleActionClick(e, item, column.key)">
                  <!-- Default action button if no slot is provided -->
                  <button
                    @click="(e) => handleActionClick(e, item, column.key)"
                    class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    {{ column.label }}
                  </button>
                </slot>
              </template>
              <template v-else>
                {{ item[column.key] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template> 