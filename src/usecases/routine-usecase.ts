import { calculateFieldsBasedOnMeals } from "../functions/calculate-fields-based-on-meals.js";
import { DailyMealCreate } from "../interfaces/daily-meal-interface.js";
import {
  RoutineCreate,
  RoutineUpdate,
} from "../interfaces/routine-interface.js";
import { DailyMealRepositoryPrisma } from "../repositories/daily-meal-repository.js";
import { RoutineRepositoryPrisma } from "../repositories/routine-repository.js";

export class RoutineUseCase {
  private routineRepository;
  private dailyMealRepository;

  constructor() {
    this.routineRepository = new RoutineRepositoryPrisma();
    this.dailyMealRepository = new DailyMealRepositoryPrisma();
  }

  async create(routineData: RoutineCreate, dailyMealsData: DailyMealCreate[]) {
    const [{ id }] = await this.routineRepository.create(routineData, dailyMealsData);

    const routine = this.saveCalculatedFields(id)

    return routine;
  }

  async findById(routineId: string) {
    return await this.routineRepository.findById(routineId);
  }

  async getAll(userId: string) {
    return await this.routineRepository.getAll(userId);
  }

  async update(routineData: RoutineUpdate, dailyMealsData: DailyMealCreate[]) {
    await this.routineRepository.update(routineData);
  
    const currentMeals = await this.dailyMealRepository.findMany(routineData.id);
  
    const isSameMeal = (meal1: DailyMealCreate, meal2: DailyMealCreate) => {
      return meal1.mealId === meal2.mealId && meal1.time === meal2.time;
    };
  
    const mealsToCreate = dailyMealsData.filter((meal) => {
      return !currentMeals.some((currentMeal) => isSameMeal(currentMeal, meal));
    });
  
    const mealsToUpdate = dailyMealsData.filter((meal) => {
      return currentMeals.some((currentMeal) => isSameMeal(currentMeal, meal));
    });
  
    const mealsToDelete = currentMeals.filter((currentMeal) => {
      return !dailyMealsData.some((meal) => isSameMeal(currentMeal, meal));
    });
  
    await this.dailyMealRepository.update(routineData.id, {
      mealsToCreate,
      mealsToUpdate,
      mealsToDelete,
    });
  
    const routine = this.saveCalculatedFields(routineData.id)

    return routine;
  }
  

  async delete(routineId: string) {
    return await this.routineRepository.delete(routineId);
  }

  async saveCalculatedFields(routineId: string) {
    const mealsToCalculate =
      await this.dailyMealRepository.getCalculatedFieldsByRoutineId(routineId);

    const calculatedFields = calculateFieldsBasedOnMeals(mealsToCalculate.map(mealItem => mealItem.meal))

    return await this.routineRepository.saveCalculatedFields(routineId, calculatedFields);
  }
}


