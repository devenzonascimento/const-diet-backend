import { RoutineMealCreate, RoutineMealUpdate } from "./routine-meal-interface";
import { Meal } from "./meal-interface";

export interface Routine {
  id: string;
  name: string;
  water: number;
}

export interface RoutineCreate {
  userId: string;
  name: string;
  water: number;
}
export interface RoutineUpdate {
  id: string;
  name: string;
  water: number;
}

export interface RoutineComplete {
  id: string;
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
    meal: Meal & CalculatedFields;
  }[];
}

export interface CalculatedFields {
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  fibers: number;
  sodium: number;
}

export interface RoutineRepository {
  create: (
    routineData: RoutineCreate,
    mealsData: RoutineMealCreate[]
  ) => Promise<Routine>;
  findById: (routineId: string) => Promise<RoutineComplete | null>;
  getAll: (userId: string) => Promise<Routine[]>;
  update: (routineData: RoutineUpdate, mealsData: RoutineMealUpdate) => Promise<Routine>;
  delete: (routineId: string) => Promise<void>;
  saveCalculatedFields: (
    routineId: string,
    calculatedFields: CalculatedFields
  ) => Promise<RoutineComplete>;
}
