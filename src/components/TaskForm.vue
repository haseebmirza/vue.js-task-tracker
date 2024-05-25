<template>
  <div>
    <form @submit.prevent="addTask">
      <input v-model="task" type="text" placeholder="Add a new task" />
      <button type="submit">Add Task</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: ''
    }
  },
  methods: {
    addTask() {
      this.$emit('add-task', this.task)
      this.task = ''
    }
  }
}
</script>
