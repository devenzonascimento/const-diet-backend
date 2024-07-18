import { Food } from "./food-interface";

export interface MealFood {
  food: Food
  quantity: number
}

export interface MealFoodComplete {
  mealId: string;
  foodId: string;
  quantity: number;
}

export interface MealFoodCreate {
  foodId: string;
  quantity: number
}

export interface MealFoodUpdate {
  foodsToCreate: {
    foodId: string;
    quantity: number;
  }[]
  foodsToUpdate: {
    foodId: string;
    quantity: number;
  }[]
  foodsToDelete: {
    foodId: string;
  }[]
}

export interface MealFoodRepository {
  findMany: (mealId: string) => Promise<MealFoodComplete[]>
  getAllFoodsByMealId: (mealId: string) => Promise<MealFood[]>
}