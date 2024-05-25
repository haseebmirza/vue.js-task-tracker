<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <form @submit.prevent="addTask" class="flex items-center space-x-2">
      <input v-model="task" 
             type="text" 
             class="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             placeholder="Add a new task" />
      <button type="submit" 
              class="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Add Task
      </button>
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
