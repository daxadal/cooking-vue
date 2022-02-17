import { z } from "zod";

export enum Colors {
  NEUTRAL = "neutral",
  CYAN = "cyan",
  GREEN = "green",
  PURPLE = "purple",
  YELLOW = "yellow",
}

export enum IngredientType {
  START = "start",
  MID = "mid",
  END = "end",
}

export const Ingredient = z.object({
  id: z.number(),
  name: z.string(),
  type: z.nativeEnum(IngredientType),
});

export type Ingredient = z.infer<typeof Ingredient>;

export const IngredientArray = z.array(Ingredient);

export const Utensil = z.object({
  id: z.number(),
  name: z.string(),
  waitTimeInMillis: z.number(),
});

export type Utensil = z.infer<typeof Utensil>;

export const UtensilArray = z.array(Utensil);

export const SimpleStep = z.object({
  input: z.number(),
  utensil: z.number(),
  output: z.number(),
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

export const SimpleRecipe = z.object({
  input: z.number(),
  utensil1: z.number(),
  mid1: z.number(),
  utensil2: z.number().optional(),
  mid2: z.number().optional(),
  utensil3: z.number().optional(),
  mid3: z.number().optional(),
  utensil4: z.number().optional(),
  mid4: z.number().optional(),
  utensil5: z.number().optional(),
  mid5: z.number().optional(),

  steps: z.number(),
  output: z.number(),
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

  steps: z.number(),
  output: Ingredient,
});

export type DetailedRecipe = z.infer<typeof DetailedRecipe>;

export const DetailedRecipeArray = z.array(DetailedRecipe);
