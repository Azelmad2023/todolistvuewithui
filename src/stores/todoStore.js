import axios from "axios";
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    tasks: [],
  }),

  actions: {
    async fetchTasks() {
      const response = await axios.get("tasks");
      this.tasks = await response.data.reverse();
    },

    async addTask(taskFrom) {
      await axios.post("tasks", {
        title: taskFrom.taskTitle.trim(),
        completed: false,
        priority: "low",
      });
      await this.fetchTasks();
    },

    async editTask(id, newTask) {
      await axios.patch(`tasks/${id}`, newTask);
      await this.fetchTasks();
    },

    async deleteTask(taskId) {
      await axios.delete(`tasks/${taskId}`);
      await this.fetchTasks();
    },
  },
});
