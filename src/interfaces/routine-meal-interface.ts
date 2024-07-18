import { CalculatedFields, MealComplete } from "./meal-interface";

export interface RoutineMeal {
  time: string;
  meal: MealComplete;
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

export interface FieldsToBeCalculated {
  meal: CalculatedFields
}

export interface RoutineMealRepository {
  findMany: (routineId: string) => Promise<RoutineMealComplete[]>;
  getCalculatedFieldsByRoutineId: (routineId: string) => Promise<FieldsToBeCalculated[]>;
}