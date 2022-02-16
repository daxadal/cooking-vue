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
  utensil2: z.number(),
  mid2: z.number(),
  utensil3: z.number(),
  mid3: z.number(),
  utensil4: z.number(),
  mid4: z.number(),
  utensil5: z.number(),
  mid5: z.number(),
});

export type SimpleRecipe = z.infer<typeof SimpleRecipe>;

export const SimpleRecipeArray = z.array(SimpleRecipe);

export const DetailedRecipe = z.object({
  input: Ingredient,
  utensil1: Utensil,
  mid1: Ingredient,
  utensil2: Utensil,
  mid2: Ingredient,
  utensil3: Utensil,
  mid3: Ingredient,
  utensil4: Utensil,
  mid4: Ingredient,
  utensil5: Utensil,
  mid5: Ingredient,
});

export type DetailedRecipe = z.infer<typeof DetailedRecipe>;

export const DetailedRecipeArray = z.array(DetailedRecipe);
