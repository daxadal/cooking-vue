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
    path: "/ingredients/new",
    name: "Ingredient creation",
    component: () =>
      import(
        /* webpackChunkName: "ingredients-new" */ "../views/IngredientCreation.vue"
      ),
  },
  {
    path: "/ingredients/:id",
    name: "Ingredient details",
    component: () =>
      import(
        /* webpackChunkName: "ingredients-id" */ "../views/IngredientDetails.vue"
      ),
  },
  {
    path: "/utensils",
    name: "Utensils",
    component: () =>
      import(/* webpackChunkName: "utensils" */ "../views/Utensils.vue"),
  },
  {
    path: "/utensils/new",
    name: "Utensil creation",
    component: () =>
      import(
        /* webpackChunkName: "utensils-new" */ "../views/UtensilCreation.vue"
      ),
  },
  {
    path: "/steps",
    name: "Steps",
    component: () =>
      import(/* webpackChunkName: "steps" */ "../views/Steps.vue"),
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: () =>
      import(/* webpackChunkName: "recipes" */ "../views/Recipes.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
