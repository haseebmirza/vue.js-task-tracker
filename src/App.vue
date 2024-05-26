<template>
  <div id="app" class="mx-auto p-4 md:max-w-screen-md">
    <h1 class="text-2xl font-bold mb-4">Vue.js Task Tracker</h1>
    <TaskForm v-if="!editingTask"  />
    
    <!-- Show EditTaskForm if editingTask is not null -->
    <EditTaskForm
      v-if="editingTask"
      :task="editingTask"
      @save-task="saveTask"
      @cancel-edit="cancelEdit"
    />
    <TaskList
      @complete-task="completeTask"
      @delete-task="deleteTask"
      @edit-task="editTask"
    />
 
  </div>
</template>

<script>
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import EditTaskForm from "./components/EditTaskForm.vue";
import { useTaskStore } from './stores/taskStore.js';
import { useToast } from 'vue-toast-notification';


export default {
  name: "App",
  components: {
    TaskForm,
    TaskList,
    EditTaskForm,
  },

  computed: {
    taskStore() {
      return useTaskStore();
    },
    paginatedTasks() {
      return this.taskStore.paginatedTasks(this.currentPage);
    },
    editingTask() {
      return this.taskStore.editingTask;
    }
  },
  data() {
    return {
     
      
    };
  },
  methods: {
    saveTask(editedTask) {
      this.taskStore.editTask(editedTask);
      this.taskStore.cancelEdit();
      const toast = useToast();
      toast.success('Task edited successfully.');
    },
    cancelEdit() {
      this.taskStore.cancelEdit();
    }
  },
};
</script>

<!-- No style tag for custom CSS -->
