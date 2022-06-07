import { z } from "zod";

export function checkEnumExhausted(e: never): never {
  throw new Error(`Value ${e} not contemplated`);
}

// #region --- Default ---

export enum Colors {
  NEUTRAL = "neutral",
  CYAN = "cyan",
  GREEN = "green",
  PURPLE = "purple",
  YELLOW = "yellow",
  RED = "red",
}

export enum Environment {
  PROD = "PROD",
  DEV = "DEV",
}

export const ApiInfo = z.object({
  environment: z.nativeEnum(Environment),
  stats: z.object({
    ingredients: z.number().int(),
    utensils: z.number().int(),
    steps: z.number().int(),
    recipes: z.number().int(),
  }),
});

export type ApiInfo = z.infer<typeof ApiInfo>;

// #endregion --- Default ---

// #region --- Ingredients ---

export enum IngredientType {
  START = "start",
  MID = "mid",
  END = "end",
}

export const Ingredient = z.object({
  id: z.number().int(),
  name: z.string(),
  type: z.nativeEnum(IngredientType),
});

export type Ingredient = z.infer<typeof Ingredient>;

export const IngredientArray = z.array(Ingredient);

// #endregion --- Ingredients ---

// #region --- Utensils ---

export const Utensil = z.object({
  id: z.number().int(),
  name: z.string(),
  waitTimeInMillis: z.number().int(),
});

export type Utensil = z.infer<typeof Utensil>;

export const UtensilArray = z.array(Utensil);

// #endregion --- Utensils ---

// #region --- Steps ---

export const SimpleStep = z.object({
  input: z.number().int(),
  utensil: z.number().int(),
  output: z.number().int(),
});

export type SimpleStep = z.infer<typeof SimpleStep>;

export const SimpleStepArray = z.array(SimpleStep);

export const DetailedStep = z.object({
  input: Ingredient,
  utensil: Utensil,
  output: Ingredient,
});

export type DetailedStep = z.infer<typeof DetailedStep>;

export const DetailedStepArray = z.array(DetailedStep);

// #endregion --- Steps ---

// #region --- Recipes ---

export const SimpleRecipe = z.object({
  input: z.number().int(),
  utensil1: z.number().int(),
  mid1: z.number().int(),
  utensil2: z.number().int().optional(),
  mid2: z.number().int().optional(),
  utensil3: z.number().int().optional(),
  mid3: z.number().int().optional(),
  utensil4: z.number().int().optional(),
  mid4: z.number().int().optional(),
  utensil5: z.number().int().optional(),
  mid5: z.number().int().optional(),

  steps: z.number().int(),
  output: z.number().int(),
});

export type SimpleRecipe = z.infer<typeof SimpleRecipe>;

export const SimpleRecipeArray = z.array(SimpleRecipe);

export const DetailedRecipe = z.object({
  input: Ingredient,
  utensil1: Utensil,
  mid1: Ingredient,
  utensil2: Utensil.optional(),
  mid2: Ingredient.optional(),
  utensil3: Utensil.optional(),
  mid3: Ingredient.optional(),
  utensil4: Utensil.optional(),
  mid4: Ingredient.optional(),
  utensil5: Utensil.optional(),
  mid5: Ingredient.optional(),

  steps: z.number().int(),
  output: Ingredient,
});

export type DetailedRecipe = z.infer<typeof DetailedRecipe>;

export const DetailedRecipeArray = z.array(DetailedRecipe);

// #endregion --- Recipes ---
