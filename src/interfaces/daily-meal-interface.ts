import { $Enums, Prisma } from "@prisma/client";
import { MealWithFoods } from "./meal-interface";

export interface DailyMeal {
  status: $Enums.Status;
  time: string;
  meal: MealWithFoods;
}

export interface DailyMealComplete {
  mealId: string;
  routineId: string;
  status: $Enums.Status;
  time: string;
}

export interface DailyMealCreate {
  mealId: string;
  status: $Enums.Status;
  time: string;
}

export interface DailyMealUpdate {
  mealsToCreate: {
    mealId: string;
    status: $Enums.Status;
    time: string;
  }[];
  mealsToUpdate: {
    mealId: string;
    status: $Enums.Status;
    time: string;
  }[];
  mealsToDelete: {
    mealId: string;
    time: string;
  }[];
}

export interface DailyMealRepository {
  createMany: ( routineId: string, data: DailyMealCreate[]) => Promise<Prisma.BatchPayload>;
  findMany: (routineId: string) => Promise<DailyMealComplete[]>;
  getAllMealsByRoutineId: (routineId: string) => Promise<DailyMeal[]>;
  update: (routineId: string, meals: DailyMealUpdate) => Promise<void>;
}
