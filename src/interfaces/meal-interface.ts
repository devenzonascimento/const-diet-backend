import { MealFood, MealFoodCreate, MealFoodUpdate } from "./meal-food-interface";

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

export interface MealComplete {
  id: string;
  name: string;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  fibers: number;
  sodium: number;
  foods: MealFood[];
}

export interface CalculatedFields {
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  fibers: number;
  sodium: number;
}

export interface MealRepository {
  create: (mealData: MealCreate, foodsData: MealFoodCreate[]) => Promise<Meal>;
  findById: (mealId: string) => Promise<MealComplete | null>;
  getAll: (userId: string) => Promise<MealComplete[]>;
  update: (mealData: MealUpdate, foodsData: MealFoodUpdate) => Promise<Meal>;
  delete: (mealId: string) => Promise<void>;
  saveCalculatedFields: (mealId: string, calculatedFields: CalculatedFields) => Promise<MealComplete>;
}
