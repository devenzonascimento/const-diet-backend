import { MealFood } from "./meal-food-interface";

export interface Meal {
  id: string;
  name: string;
}

export interface MealCreate {
  userId: string;
  name: string;
}

export interface MealUpdate {
  id: string;
  name: string;
}

export interface MealWithFoods {
  id: string;
  name: string;
  foods: MealFood[];
}

export interface CalculatedFields {
  totalCalories: number;
  totalCarbohydrates: number;
  totalProteins: number;
  totalFats: number;
  totalSodiums: number;
  totalFibers: number;
}

export interface MealRepository {
  create: (data: MealCreate) => Promise<Meal>;
  findById: (mealId: string) => Promise<MealWithFoods | null>;
  getAll: (userId: string) => Promise<Meal[]>;
  update: (data: MealUpdate) => Promise<Meal | null>;
  delete: (mealId: string) => Promise<void>;
  saveCalculatedFields: (mealId: string, calculatedFields: CalculatedFields) => void;
}
