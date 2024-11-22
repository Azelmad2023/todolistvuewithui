import AboutView from "@/views/AboutView.vue";
import NotFound from "@/views/NotFound.vue";
import ToDoList from "@/views/todos/ToDoList.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ToDoList
    },
    {
      path: "/about",
      name: "about",
      component: AboutView
    },
    {
      path: "/:catchAll(.*)*",
      name: "notfound",
      component: NotFound,
    },
  ],
});

export default router;
