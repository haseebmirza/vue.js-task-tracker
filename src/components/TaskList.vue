<template>
  <div class="p-6 bg-white rounded-lg shadow-md mt-4">
    <ul class="space-y-2">
      <li v-for="task in tasks" :key="task.id" class="flex justify-between items-center p-2 bg-gray-100 rounded-lg shadow-sm">
        <div>
          <input type="checkbox" @click="completeTask(task)" class="mr-2" />
          <span :class="{ 'line-through': task.completed }">{{ task.text }}</span>
        </div>
        <button @click="deleteTask(task)" class="px-2 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['tasks'],
  methods: {
    completeTask(task) {
      this.$emit('complete-task', task)
    },
    deleteTask(task) {
      this.$emit('delete-task', task)
    }
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
