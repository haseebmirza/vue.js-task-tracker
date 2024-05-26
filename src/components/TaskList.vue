<template>
  <div
    class="p-6 bg-white rounded-lg shadow-md mt-4"
    :class="{ 'dark-mode': themeStore.darkMode }"
  >
    <ul class="space-y-2">
      <li
        v-for="task in paginatedTasks"
        :key="task.id"
        class="flex justify-between items-center p-2 bg-gray-100 rounded-lg shadow-sm"
      >
        <div class="flex items-center">
          <input
            type="checkbox"
            @click="completeTask(task.id)"
            class="mr-2"
            :checked="task.completed"
            :class="{
              'dark:bg-gray-800': themeStore.darkMode,
              'bg-white': !themeStore.darkMode,
            }"
          />
          <span
          :class="{ 'light-mode': !themeStore.darkMode, 'dark-mode': themeStore.darkMode }"
        
          >
            {{ task.text }}
          </span>
        </div>

        <div>
          <button
            @click="editTask(task)"
            class="px-2 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 mr-2"
          >
            Edit
          </button>
          <button
            @click="deleteTask(task.id)"
            class="px-2 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
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
      <span class="px-4 py-2"
        >{{ currentPage }} / {{ taskStore.totalPages }}</span
      >
      <button
        @click="nextPage"
        :disabled="currentPage === taskStore.totalPages"
        class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from "../stores/taskStore";
import { useToast } from "vue-toast-notification";
import { useThemeStore } from "../stores/modules/theme.js";

export default {
  computed: {
    taskStore() {
      return useTaskStore();
    },
    paginatedTasks() {
      return this.taskStore.paginatedTasks(this.currentPage);
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  setup() {
    const themeStore = useThemeStore();
    return {
      themeStore,
    };
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.taskStore.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    completeTask(taskId) {
      this.taskStore.completeTask(taskId);
      this.showToast("Task marked as completed.");
    },
    deleteTask(taskId) {
      this.taskStore.deleteTask(taskId);
      this.showToast("Task deleted successfully.");
    },
    editTask(task) {
      this.taskStore.setEditingTask(task);
    },
    showToast(message) {
      const toast = useToast();
      toast.success(message);
    },
  },
};
</script>
