import axios from "axios";
import { defineStore } from "pinia";
import { nextTick } from "vue";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    tasks: [],
    newTaskTitle: "",
    showNotification: false,
  }),

  actions: {
    async fetchTasks() {
      const response = await axios.get("tasks");
      this.tasks = await response.data;
    },

    async addTask() {
      if (this.newTaskTitle.trim()) {
        await axios.post("tasks", {
          title: this.newTaskTitle,
          completed: false,
        });
        this.newTaskTitle = "";
        await this.fetchTasks();
        this.showNotification = true;
        await nextTick();
        setTimeout(() => {
          this.showNotification = false;
        }, 2000);
      }
    },

    async deleteTask(id) {
      await axios.delete(`tasks/${id}`);
      await this.fetchTasks();
    },

    async toggleComplete(id) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;
        await axios.put(`tasks/${id}`, task);
      }
    },
    async editTask(id, newTitle) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.title = newTitle;
        await axios.put(`tasks/${id}`, task);
      }
    },
  },
});
