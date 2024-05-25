<template>
  <div id="app" class="mx-auto p-4 md:max-w-screen-md">
    <h1 class="text-2xl font-bold mb-4">Vue.js Task Tracker</h1>
    <TaskForm @add-task="addTask" />
    <TaskList
      :tasks="tasks"
      @complete-task="completeTask"
      @delete-task="deleteTask"
    />
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';

export default {
  name: 'App',
  components: {
    TaskForm,
    TaskList
  },
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    addTask(task) {
      if (task) {
        this.tasks.push({ id: Date.now(), text: task, completed: false });
      }
    },
    completeTask(task) {
      task.completed = !task.completed;
    },
    deleteTask(task) {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    }
  }
};
</script>

<!-- No style tag for custom CSS -->

