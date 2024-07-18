import { MealWithFoods } from "./meal-interface";

export interface RoutineMeal {
  time: string;
  meal: MealWithFoods;
}

export interface RoutineMealComplete {
  mealId: string;
  routineId: string;
  time: string;
}

export interface RoutineMealCreate {
  mealId: string;
  time: string;
}

export interface RoutineMealUpdate {
  mealsToCreate: {
    mealId: string;
    time: string;
  }[];
  mealsToUpdate: {
    mealId: string;
    time: string;
  }[];
  mealsToDelete: {
    mealId: string;
    time: string;
  }[];
}

export interface RoutineMealRepository {
  findMany: (routineId: string) => Promise<RoutineMealComplete[]>;
  getAllMealsByRoutineId: (routineId: string) => Promise<RoutineMeal[]>;
  update: (routineId: string, meals: RoutineMealUpdate) => Promise<void>;
}