import { $Enums } from "@prisma/client";

export interface DailyRoutine {
  id: string;
  status: $Enums.Status
  name: string;
  water: number;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  fibers: number;
  sodium: number;
}

export interface DailyRoutineRepository {  
  setStatus: (dailyRoutineId: string, status: $Enums.Status) => void
}