import { DailyMeal } from "./daily-meal-interface";

export interface Routine {
  id: string;
  name: string;
  water: number;
}

export interface RoutineCreate {
  userId: string;
  name: string;
  water: number
}
export interface RoutineUpdate {
  id: string;
  name: string;
  water: number
}

export interface RoutineComplete {
  id: string;
  name: string;
  water: number;
  meals: DailyMeal[]
}

export interface CalculatedFields {
  totalCalories: number;
  totalCarbohydrates: number;
  totalProteins: number;
  totalFats: number;
  totalSodiums: number;
  totalFibers: number;
}

export interface RoutineRepository {
  create: (data: RoutineCreate) => Promise<Routine>
  findById: (routineId: string) => Promise<RoutineComplete | null>
  getAll: (userId: string) => Promise<Routine[]>
  update: (data: RoutineUpdate) => Promise<Routine | null>
  delete: (routineId: string) => Promise<void>
}
