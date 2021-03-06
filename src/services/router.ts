import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  // #region --- Home ---
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  },
  // #endregion --- Home ---

  // #region --- Ingredients ---
  {
    path: "/ingredients",
    name: "Ingredients",
    component: () =>
      import(
        /* webpackChunkName: "ingredients" */ "../views/IngredientsView.vue"
      ),
  },
  {
    path: "/ingredients/new",
    name: "Ingredient creation",
    component: () =>
      import(
        /* webpackChunkName: "ingredients-new" */ "../views/IngredientCreationView.vue"
      ),
  },
  {
    path: "/ingredients/:id(\\d+)",
    name: "Ingredient details",
    component: () =>
      import(
        /* webpackChunkName: "ingredients-id" */ "../views/IngredientDetailsView.vue"
      ),
  },
  { path: "/ingredients/:any(.*)", redirect: "/ingredients" },
  // #endregion --- Ingredients ---

  // #region --- Utensils ---
  {
    path: "/utensils",
    name: "Utensils",
    component: () =>
      import(/* webpackChunkName: "utensils" */ "../views/UtensilsView.vue"),
  },
  {
    path: "/utensils/new",
    name: "Utensil creation",
    component: () =>
      import(
        /* webpackChunkName: "utensils-new" */ "../views/UtensilCreationView.vue"
      ),
  },
  {
    path: "/utensils/:id(\\d+)",
    name: "Utensil details",
    component: () =>
      import(
        /* webpackChunkName: "utensils-id" */ "../views/UtensilDetailsView.vue"
      ),
  },
  { path: "/utensils/:any(.*)", redirect: "/utensils" },
  // #endregion --- Utensils ---

  // #region --- Steps ---
  {
    path: "/steps",
    name: "Steps",
    component: () =>
      import(/* webpackChunkName: "steps" */ "../views/StepsView.vue"),
  },
  {
    path: "/steps/new",
    name: "Step creation",
    component: () =>
      import(
        /* webpackChunkName: "steps-new" */ "../views/StepCreationView.vue"
      ),
  },
  {
    path: "/steps/:input(\\d+)-:utensil(\\d+)-:output(\\d+)",
    name: "Step details",
    component: () =>
      import(/* webpackChunkName: "steps-id" */ "../views/StepDetailsView.vue"),
  },
  { path: "/steps/:any(.*)", redirect: "/steps" },
  // #endregion --- Steps ---

  // #region --- Recipes ---
  {
    path: "/recipes",
    name: "Recipes",
    component: () =>
      import(/* webpackChunkName: "recipes" */ "../views/RecipesView.vue"),
  },
  // #endregion --- Recipes ---

  // #region --- 404 ---
  { path: "/:any(.*)", redirect: "/" },
  // #endregion --- 404 ---
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
