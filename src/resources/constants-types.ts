export enum Colors {
  NEUTRAL = "neutral",
  CYAN = "cyan",
}

export enum IngredientType {
  START = "start",
  MID = "mid",
  END = "end",
}

export interface Ingredient {
  id: number;
  name: string;
  type: IngredientType;
}
