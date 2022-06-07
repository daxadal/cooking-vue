import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  // #region --- Home ---
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  // #endregion --- Home ---

  // #region --- Ingredients ---
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
    path: "/ingredients/:id(\\d+)",
    name: "Ingredient details",
    component: () =>
      import(
        /* webpackChunkName: "ingredients-id" */ "../views/IngredientDetails.vue"
      ),
  },
  { path: "/ingredients/:any(.*)", redirect: "/ingredients" },
  // #endregion --- Ingredients ---

  // #region --- Utensils ---
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
    path: "/utensils/:id(\\d+)",
    name: "Utensil details",
    component: () =>
      import(
        /* webpackChunkName: "utensils-id" */ "../views/UtensilDetails.vue"
      ),
  },
  { path: "/utensils/:any(.*)", redirect: "/utensils" },
  // #endregion --- Utensils ---

  // #region --- Steps ---
  {
    path: "/steps",
    name: "Steps",
    component: () =>
      import(/* webpackChunkName: "steps" */ "../views/Steps.vue"),
  },
  // #endregion --- Steps ---

  // #region --- Recipes ---
  {
    path: "/recipes",
    name: "Recipes",
    component: () =>
      import(/* webpackChunkName: "recipes" */ "../views/Recipes.vue"),
  },

  // #endregion --- Recipes ---
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
