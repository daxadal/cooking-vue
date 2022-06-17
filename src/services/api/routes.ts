import {
  ApiInfo,
  DetailedRecipe,
  DetailedRecipeArray,
  DetailedStep,
  DetailedStepArray,
  Ingredient,
  IngredientArray,
  SimpleStep,
  Utensil,
  UtensilArray,
} from "@/resources/constants-types";

import { del, get, post, put } from "./http-methods";

// #region --- Default ---

export const getStatus = async (): Promise<ApiInfo> => {
  const response = await get("/");
  return ApiInfo.parse(response);
};

// #endregion --- Default ---

// #region --- Ingredients ---

export const getAllIngredients = async (): Promise<Ingredient[]> => {
  const response = await get("/ingredients");
  return IngredientArray.parse(response);
};

export const getIngredient = async (id: number): Promise<Ingredient> => {
  const response = await get(`/ingredients/${id}`);
  return Ingredient.parse(response);
};

export const createIngredient = async (
  ingredient: Omit<Ingredient, "id">
): Promise<Ingredient> => {
  const response = await post("/ingredients", ingredient);
  return Ingredient.parse(response);
};

export const updateIngredient = async (
  ingredient: Ingredient
): Promise<Ingredient> => {
  const response = await put(`/ingredients/${ingredient.id}`, {
    name: ingredient.name,
    type: ingredient.type,
  });
  return Ingredient.parse(response);
};

export const deleteIngredient = async (id: number): Promise<void> =>
  del(`/ingredients/${id}`);

// #endregion --- Ingredients ---

// #region --- Utensils ---

export const getAllUtensils = async (): Promise<Utensil[]> => {
  const response = await get("/utensils");
  return UtensilArray.parse(response);
};

export const getUtensil = async (id: number): Promise<Utensil> => {
  const response = await get(`/utensils/${id}`);
  return Utensil.parse(response);
};

export const createUtensil = async (
  utensil: Omit<Utensil, "id">
): Promise<Utensil> => {
  const response = await post("/utensils", utensil);
  return Utensil.parse(response);
};

export const updateUtensil = async (utensil: Utensil): Promise<Utensil> => {
  const response = await put(`/utensils/${utensil.id}`, {
    name: utensil.name,
    waitTimeInMillis: utensil.waitTimeInMillis,
  });
  return Utensil.parse(response);
};

export const deleteUtensil = async (id: number): Promise<void> =>
  del(`/utensils/${id}`);

// #endregion --- Utensils ---

// #region --- Steps ---

export const getAllDetailedSteps = async (): Promise<DetailedStep[]> => {
  const response = await get("/steps?detailed=true");
  return DetailedStepArray.parse(response);
};

export const getDetailedStep = async ({
  input,
  utensil,
  output,
}: SimpleStep): Promise<DetailedStep> => {
  const response = await get(
    `/steps/${input}-${utensil}-${output}?detailed=true`
  );
  return DetailedStep.parse(response);
};

export const createStep = async (step: SimpleStep): Promise<DetailedStep> => {
  const response = await post("/steps", step);
  return DetailedStep.parse(response);
};

export const deleteStep = async ({
  input,
  utensil,
  output,
}: SimpleStep): Promise<void> => del(`/steps/${input}-${utensil}-${output}`);

// #endregion --- Steps ---

// #region --- Recipes ---

export const getAllDetailedRecipes = async (): Promise<DetailedRecipe[]> => {
  const response = await get("/recipes?detailed=true");
  return DetailedRecipeArray.parse(response);
};

// #endregion --- Recipes ---
