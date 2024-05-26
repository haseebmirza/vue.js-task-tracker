<template>
  <div class="p-6 bg-white rounded-lg shadow-md" :class="{ 'dark-mode': themeStore.darkMode }">
    <h2 class="text-xl font-bold mb-4">Add a task</h2>
    <form @submit.prevent="handleSubmit" class="flex items-center space-x-2">
      <input v-model="taskText"
             type="text"
             class="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             placeholder="Add a new task" />
      <button type="submit"
              class="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {{ editingTask ? 'Edit Task' : 'Add Task' }}
      </button>
    </form>
  </div>
</template>

<script>
import { useTaskStore } from '../stores/taskStore';
import { useToast } from 'vue-toast-notification';
import { useThemeStore } from '../stores/modules/theme.js';
export default {
  
  props: {
    task: {
      type: Object,
      default: null,
    }
  },

  data() {
    return {
      taskText: '',
      editingTask: null
    };
   
  },

  setup() {
    const themeStore = useThemeStore();
    return {
      themeStore,
    };
  },
  watch: {
    task: {
      handler(newTask) {
        if (newTask) {
          this.taskText = newTask.text;
          this.editingTask = newTask;
        }
      },
      immediate: true,
    }
  },
  methods: {
    handleSubmit() {
      const taskStore = useTaskStore();
      const toast = useToast();

      if (this.taskText.trim() === '') {
        toast.error('Task cannot be empty.');
        return;
      }

      if (this.editingTask) {
        taskStore.editTask({ id: this.editingTask.id, text: this.taskText });
        toast.success('Task edited successfully.');
      } else {
        taskStore.addTask({ text: this.taskText, completed: false, id: Date.now() });
        toast.success('Task added successfully.');
      }

      this.taskText = '';
      this.editingTask = null;
    },
    editTask(task) {
      this.taskText = task.text;
      this.editingTask = task;
    }
  }
};
</script>
