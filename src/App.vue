<template>
  <div id="app">
    <h1>Vue.js Task Tracker</h1>
    <TaskForm @add-task="addTask" />
    <TaskList
      :tasks="tasks"
      @complete-task="completeTask"
      @delete-task="deleteTask"
    />
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
