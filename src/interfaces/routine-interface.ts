import { Prisma } from "@prisma/client";
import { RoutineMeal, RoutineMealCreate } from "./routine-meal-interface";


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
  meals: RoutineMeal[]
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
  create: (routineData: RoutineCreate, routineMealsData: RoutineMealCreate[]) => 
    Promise<[Routine, Prisma.BatchPayload]>
  findById: (routineId: string) => Promise<RoutineComplete | null>
  getAll: (userId: string) => Promise<Routine[]>
  update: (data: RoutineUpdate) => Promise<Routine | null>
  delete: (routineId: string) => Promise<void>
}
