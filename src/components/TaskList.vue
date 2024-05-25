<template>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" @click="completeTask(task)" />
        <span :class="{ done: task.completed }">{{ task.text }}</span>
        <button @click="deleteTask(task)">Delete</button>
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
