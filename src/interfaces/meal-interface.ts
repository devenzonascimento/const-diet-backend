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

export interface MealWithFoods {
  id: string;
  name: string;
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
  findById: (mealId: string) => Promise<MealWithFoods | null>;
  getAll: (userId: string) => Promise<Meal[]>;
  update: (mealData: MealUpdate, foodsData: MealFoodUpdate) => Promise<Meal | null>;
  delete: (mealId: string) => Promise<void>;
  saveCalculatedFields: (mealId: string, calculatedFields: CalculatedFields) => void;
}
