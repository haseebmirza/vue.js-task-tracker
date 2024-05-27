<template>
  <div :class="{ 'dark-mode': themeStore.darkMode }" class="p-6 bg-white rounded-lg shadow-md mt-4">
    <h2 class="text-xl font-bold mb-4">Edit Task</h2>
    <form @submit.prevent="handleSubmit" class="flex items-center space-x-2">
      <input v-model="taskText"
             type="text"
             class="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             placeholder="Edit task" />
      <input v-model="taskDueDate"
             type="date"
             class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
             placeholder="Due Date" />
      <button type="submit"
              class="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Save
      </button>
      <button @click="cancelEdit"
              type="button"
              class="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
        Cancel
      </button>
    </form>
  </div>
</template>
  
  <script>

import { useThemeStore } from '../stores/modules/theme.js';

  export default {
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    setup() {
    const themeStore = useThemeStore();
    return {
      themeStore,
    };
  },
    data() {
      return {
        taskText: this.task.text,
        taskDueDate: this.task.dueDate
      };
    },
    methods: {
      handleSubmit() {
        const updatedTask = {
          ...this.task,
          text: this.taskText,
          dueDate: this.taskDueDate
        };
        this.$emit('save-task', updatedTask);
      },
      cancelEdit() {
        this.$emit('cancel-edit');
      }
    },
    watch: {
      task(newTask) {
        this.taskText = newTask.text;
        this.taskDueDate = newTask.dueDate;
      }
    }
  };
  </script>
  
  <!-- No style tag for custom CSS -->
  