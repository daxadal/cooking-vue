import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/ingredients",
    name: "Ingredients",
    component: () =>
      import(/* webpackChunkName: "ingredients" */ "../views/Ingredients.vue"),
  },
  {
    path: "/utensils",
    name: "Utensils",
    component: () =>
      import(/* webpackChunkName: "utensils" */ "../views/Utensils.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
