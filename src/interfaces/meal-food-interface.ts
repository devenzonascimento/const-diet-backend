import { Prisma } from "@prisma/client";
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
  createMany: (mealId: string, data: MealFoodCreate[]) => Promise<Prisma.BatchPayload>
  findMany: (mealId: string) => Promise<MealFoodComplete[]>
  getAllFoodsByMealId: (mealId: string) => Promise<MealFood[]>
  update: (mealId: string, foods: MealFoodUpdate) => Promise<void>
  delete: (mealId: string, foodId: string) => Promise<void>
}