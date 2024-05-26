<template>
  <div class="p-6 bg-white rounded-lg shadow-md mt-4">
    <ul class="space-y-2">
      <li
        v-for="task in paginatedTasks" :key="task.id"
        class="flex justify-between items-center p-2 bg-gray-100 rounded-lg shadow-sm"
      >
        <div class="flex items-center">
          <input 
            type="checkbox" 
            @click="completeTask(task.id)" 
            class="mr-2" 
            :checked="task.completed"
          />
          <span :class="{ 'line-through': task.completed }">{{ task.text }}</span>
        </div>
        <button
          @click="deleteTask(task.id)"
          class="px-2 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </li>
    </ul>

    <div class="flex justify-center mt-4 space-x-2">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1" 
        class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        Previous
      </button>
      <span class="px-4 py-2">{{ currentPage }} / {{ totalPages }}</span>
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages" 
        class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '../stores/taskStore';
import { useToast } from 'vue-toast-notification';

export default {
  data() {
    return {
      currentPage: 1,
      tasksPerPage: 5
    };
  },
  computed: {
    taskStore() {
      return useTaskStore();
    },
    totalPages() {
      return this.taskStore.totalPages;
    },
    paginatedTasks() {
      return this.taskStore.paginatedTasks(this.currentPage);
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    completeTask(taskId) {
      const toast = useToast();
      this.taskStore.completeTask(taskId);
      toast.success('Task marked as completed.');
    },
    deleteTask(taskId) {
      const toast = useToast();
      this.taskStore.deleteTask(taskId);
      toast.success('Task deleted successfully.');
    }
  }
};
</script>

