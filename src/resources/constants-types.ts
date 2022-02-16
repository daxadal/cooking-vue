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
