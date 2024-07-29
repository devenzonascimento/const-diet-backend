import { DailyRoutineRepositoryPrisma } from "../repositories/daily-routine-repository";

import { MealStatus } from "../interfaces/daily-routine-interface";
import { RoutineMeal } from "../interfaces/routine-meal-interface";

import { $Enums } from "@prisma/client";

export class DailyRoutineUseCase {
  private dailyRoutineRepository;

  constructor() {
    this.dailyRoutineRepository = new DailyRoutineRepositoryPrisma();
  }

  async setStatus(dailyRoutineId: string, status: $Enums.Status) {
    await this.dailyRoutineRepository.setStatus(dailyRoutineId, status);
  }

  async setMealStatus(dailyRoutineId: string, mealStatus: MealStatus) {

    const dailyRoutine = await this.dailyRoutineRepository.getMealsStatus(dailyRoutineId)
  
    if (!dailyRoutine) {
      throw new Error("DailyRoutine not found!");
    }
    
    if (!Array.isArray(dailyRoutine.mealsStatus)) {
      throw new Error("MealsStatus is not formated!");
    }

    const mealsStatus = dailyRoutine.mealsStatus as MealStatus[]

    
    const updatedMealsStatus = mealsStatus.map(meal => {
      if (meal.mealId === mealStatus.mealId && meal.time === mealStatus.time) {
        return mealStatus;
      }
      
      return meal
    });

    const allCompleted = updatedMealsStatus.every(meal => meal.status === 'COMPLETED');

    await this.dailyRoutineRepository.setMealStatus(
      dailyRoutineId,
      allCompleted ? "COMPLETED" : "PENDING",
      updatedMealsStatus
    );
  }

  async getDailyRoutine() {

    const todayDate = new Date()
    todayDate.setHours(0,0,0,0)

    const dailyRoutine = await this.dailyRoutineRepository.getDailyRoutine(todayDate);

    if (!dailyRoutine) {
      throw new Error("Daily routine not found");
    }

    const { routine, mealsStatus, ...dailyRoutineRest } = dailyRoutine;



    const { meals, ...routineRest } = routine;

    const mealsWithStatus = this.mergeMealsWithStatus(meals, mealsStatus as MealStatus[])

    return {
      ...dailyRoutineRest,
      ...routineRest,
      meals: mealsWithStatus.map((meal) => {
        const { foods, ...mealRest } = meal;

        return {          
          ...mealRest,
          foods: foods.map(({ food, quantity }) => {
            return { ...food, quantity };
          }),
        };
      }),
    };
  }
  
  mergeMealsWithStatus(routineMeals: RoutineMeal[], mealsStatus: MealStatus[]) {
    const mealStatusMap = new Map<string, { status: string; time: string }>();
  
    mealsStatus.forEach((mealStatus) => {
      const key = `${mealStatus.mealId}-${mealStatus.time}`;
      mealStatusMap.set(key, { status: mealStatus.status, time: mealStatus.time });
    });
  
    return routineMeals.map(({ meal, time }) => {
      const key = `${meal.id}-${time}`;
      const mealStatus = mealStatusMap.get(key);
      return { 
        ...meal,
        time,
        status: mealStatus?.status || "PENDING" };
    });
  }
}