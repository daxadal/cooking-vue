import * as Routes from "./routes";
import * as Mock from "./mock";

const Implementation =
  process.env.VUE_APP_BACK_MOCKED === "true" ? Mock : Routes;

// #region --- Default ---
export const getStatus = Implementation.getStatus;
// #endregion --- Default ---

// #region --- Ingredients ---
export const getAllIngredients = Implementation.getAllIngredients;
export const getIngredient = Implementation.getIngredient;
export const createIngredient = Implementation.createIngredient;
export const updateIngredient = Implementation.updateIngredient;
export const deleteIngredient = Implementation.deleteIngredient;
// #endregion --- Ingredients ---

// #region --- Utensils ---
export const getAllUtensils = Implementation.getAllUtensils;
export const getUtensil = Implementation.getUtensil;
export const createUtensil = Implementation.createUtensil;
export const updateUtensil = Implementation.updateUtensil;
export const deleteUtensil = Implementation.deleteUtensil;
// #endregion --- Utensils ---

// #region --- Steps ---
export const getAllDetailedSteps = Implementation.getAllDetailedSteps;
export const getDetailedStep = Implementation.getDetailedStep;
export const createStep = Implementation.createStep;
export const deleteStep = Implementation.deleteStep;
// #endregion --- Steps ---

// #region --- Recipes ---
export const getAllDetailedRecipes = Implementation.getAllDetailedRecipes;
// #endregion --- Recipes ---
