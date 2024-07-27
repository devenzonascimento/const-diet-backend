import { $Enums, Prisma } from "@prisma/client";
import { MealComplete } from "./meal-interface";

export interface DailyRoutine {
  id: string;
  status: $Enums.Status;
  name: string;
  water: number;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  fibers: number;
  sodium: number;
}

export interface MealStatus extends Prisma.JsonObject {
  mealId: string;
  time: string;
  status: $Enums.Status;
}

interface Response {
  id: string;
  date: Date;
  status: $Enums.Status;
  mealsStatus: Prisma.JsonValue;
  routine: {
    name: string;
    water: number;
    calories: number;
    carbohydrates: number;
    proteins: number;
    fats: number;
    fibers: number;
    sodium: number;
      meals: {
        time: string;
        meal: MealComplete
      }[];
  };
}

export interface DailyRoutineRepository {
  getDailyRoutine: (date: Date) => Promise<Response | null>
  getMealsStatus: (dailyRoutineId: string) => Promise<Prisma.JsonValue>
  setStatus: (dailyRoutineId: string, status: $Enums.Status) => void;
  setMealStatus: (
    dailyRoutineId: string,
    status: $Enums.Status,
    mealsStatus: MealStatus[]
  ) => void
}
