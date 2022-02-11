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
