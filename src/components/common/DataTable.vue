<script setup lang="ts">
interface Column {
  key: string;
  label: string;
  type?: 'action';
}

interface Props {
  columns: Column[];
  data: any[];
}

const props = defineProps<Props>()
const emit = defineEmits(['rowClick', 'actionClick'])

const handleRowClick = (item: any) => {
  emit('rowClick', item)
}

const handleActionClick = (e: Event, item: any, action: string) => {
  e.stopPropagation() // Prevent row click when clicking action button
  emit('actionClick', { item, action })
}
</script>

<template>
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
          v-for="item in data"
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
</template> 