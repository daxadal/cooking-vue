import { Ingredient, IngredientArray } from "@/resources/constants-types";

import { del, get, post, put } from "./http-methods";

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
