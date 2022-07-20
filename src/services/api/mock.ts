import {
  ApiInfo,
  DetailedRecipe,
  DetailedStep,
  Environment,
  Ingredient,
  IngredientType,
  SimpleStep,
  Utensil,
} from "@/resources/constants-types";

import ingredients from "./mock-data/ingredient.json";
import utensils from "./mock-data/utensil.json";
import steps from "./mock-data/step.json";
import recipes from "./mock-data/recipe.json";

// #region --- Default ---

export const getStatus = async (): Promise<ApiInfo> =>
  Promise.resolve({
    environment: Environment.LOCAL_MOCK,
    stats: {
      ingredients: 22,
      utensils: 6,
      steps: 19,
      recipes: 10,
    },
  });

// #endregion --- Default ---

// #region --- Ingredients ---

export const getAllIngredients = async (): Promise<Ingredient[]> =>
  Promise.resolve(ingredients) as Promise<Ingredient[]>;

export const getIngredient = async (id: number): Promise<Ingredient> =>
  Promise.resolve({
    id,
    name: "Mock ingredient",
    type: IngredientType.MID,
  });

export const createIngredient = async (
  ingredient: Omit<Ingredient, "id">
): Promise<Ingredient> => Promise.resolve({ id: 999, ...ingredient });

export const updateIngredient = async (
  ingredient: Ingredient
): Promise<Ingredient> => Promise.resolve(ingredient);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteIngredient = async (id: number): Promise<void> =>
  Promise.resolve();

// #endregion --- Ingredients ---

// #region --- Utensils ---

export const getAllUtensils = async (): Promise<Utensil[]> =>
  Promise.resolve(utensils);

export const getUtensil = async (id: number): Promise<Utensil> =>
  Promise.resolve({
    id,
    name: "Mock utensil",
    waitTimeInMillis: 1234,
  });

export const createUtensil = async (
  utensil: Omit<Utensil, "id">
): Promise<Utensil> => Promise.resolve({ id: 99, ...utensil });
export const updateUtensil = async (utensil: Utensil): Promise<Utensil> =>
  Promise.resolve(utensil);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteUtensil = async (id: number): Promise<void> =>
  Promise.resolve();

// #endregion --- Utensils ---

// #region --- Steps ---

export const getAllDetailedSteps = async (): Promise<DetailedStep[]> =>
  Promise.resolve(steps) as Promise<DetailedStep[]>;

export const getDetailedStep = async ({
  input,
  utensil,
  output,
}: SimpleStep): Promise<DetailedStep> =>
  Promise.resolve({
    input: { id: input, name: "Mock input", type: IngredientType.MID },
    utensil: { id: utensil, name: "Mock utensil", waitTimeInMillis: 1234 },
    output: { id: output, name: "Mock output", type: IngredientType.MID },
  });

export const createStep = async ({
  input,
  utensil,
  output,
}: SimpleStep): Promise<DetailedStep> =>
  Promise.resolve({
    input: { id: input, name: "Mock input", type: IngredientType.MID },
    utensil: { id: utensil, name: "Mock utensil", waitTimeInMillis: 1234 },
    output: { id: output, name: "Mock output", type: IngredientType.MID },
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteStep = async (step: SimpleStep): Promise<void> =>
  Promise.resolve();

// #endregion --- Steps ---

// #region --- Recipes ---

export const getAllDetailedRecipes = async (): Promise<DetailedRecipe[]> =>
  Promise.resolve(recipes) as Promise<DetailedRecipe[]>;

// #endregion --- Recipes ---
