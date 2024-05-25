<template>
  <div id="app" class="min-h-screen bg-gray-100 flex flex-col items-center py-10">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">Vue.js Task Tracker</h1>
    <div class="w-full max-w-md">
      <TaskForm @add-task="addTask" />
      <TaskList
        :tasks="tasks"
        @complete-task="completeTask"
        @delete-task="deleteTask"
      />
    </div>
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

export default {
  name: 'App',
  components: {
    TaskForm,
    TaskList
  },
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    addTask(task) {
      this.tasks.push({ id: Date.now(), text: task, completed: false })
    },
    completeTask(task) {
      task.completed = !task.completed
    },
    deleteTask(task) {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }
  }
}
</script>
