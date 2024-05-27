import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    editingTask: null,
    taskText: '',
    taskDueDate: '',
  }),
  getters: {
    totalPages: (state) => {
      return Math.ceil(state.tasks.length / 5);
    },
    paginatedTasks: (state) => {
      return (currentPage) => {
        const start = (currentPage - 1) * 5;
        return state.tasks.slice(start, start + 5);
      };
    },
  },
  actions: {
    addTask(task) {
      this.tasks.push(task);
      this.updateLocalStorage();
    },
    completeTask(taskId) {
      const task = this.tasks.find(t => t.id === taskId);
      task.completed = !task.completed;
      this.updateLocalStorage();
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
      this.updateLocalStorage();
    },
    editTask(taskData) {
      const taskr = this.tasks.find((task) => task.id === taskData.id);
      
      if (taskr) {
        taskr.text = taskData.text;
        taskr.dueDate = taskData.dueDate;
        this.editingTask = null;
        this.taskText = '';
        this.taskDueDate = '';
        this.updateLocalStorage();
      }
    },
    setEditingTask(task) {
      this.editingTask = task;
      this.taskText = task.text;
      this.taskDueDate = task.dueDate;
      console.log(this.taskDueDate);
      console.log(task);
    },
    cancelEdit() {
      this.editingTask = null;
      this.taskDueDate = '';
      this.taskText = '';
    },
    updateLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
  }
});



// import { defineStore } from 'pinia';

// export const useTaskStore = defineStore('taskStore', {
//   state: () => ({
//     tasks: JSON.parse(localStorage.getItem('tasks')) || [],
//   }),
//   getters: {
//     totalPages: (state) => {
//       return Math.ceil(state.tasks.length / 5);
//     },
//     paginatedTasks: (state) => {
//       return (currentPage) => {
//         const start = (currentPage - 1) * 5;
//         return state.tasks.slice(start, start + 5);
//       };
//     },
//   },
//   actions: {
//     addTask(task) {
//       this.tasks.push(task);
//       this.updateLocalStorage();
//     },
//     completeTask(taskId) {
//       const task = this.tasks.find(t => t.id === taskId);
//       task.completed = !task.completed;
//       this.updateLocalStorage();
//     },
//     deleteTask(taskId) {
//       this.tasks = this.tasks.filter(t => t.id !== taskId);
//       this.updateLocalStorage();
//     },
//     updateLocalStorage() {
//       localStorage.setItem('tasks', JSON.stringify(this.tasks));
//     }
//   }
// });
