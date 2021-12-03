import { createRouter, createWebHashHistory } from "vue-router";

import HelloWorld from "./views/HelloWorld.vue";
import Home from "./views/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/hello", component: HelloWorld },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
