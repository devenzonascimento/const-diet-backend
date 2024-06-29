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
    const routine = await this.routineRepository.create(routineData);

    await this.dailyMealRepository.createMany(routine.id, dailyMealsData);

    this.saveCalculatedFields(routine.id)

    return routine;
  }

  async findById(routineId: string) {
    return await this.routineRepository.findById(routineId);
  }

  async getAll(userId: string) {
    return await this.routineRepository.getAll(userId);
  }

  async update(routine: RoutineUpdate, meals: DailyMealCreate[]) {
    await this.routineRepository.update(routine);
  
    const currentMeals = await this.dailyMealRepository.findMany(routine.id);
  
    const isSameMeal = (meal1: DailyMealCreate, meal2: DailyMealCreate) => {
      return meal1.mealId === meal2.mealId && meal1.time === meal2.time;
    };
  
    const mealsToCreate = meals.filter((meal) => {
      return !currentMeals.some((currentMeal) => isSameMeal(currentMeal, meal));
    });
  
    const mealsToUpdate = meals.filter((meal) => {
      return currentMeals.some((currentMeal) => isSameMeal(currentMeal, meal));
    });
  
    const mealsToDelete = currentMeals.filter((currentMeal) => {
      return !meals.some((meal) => isSameMeal(currentMeal, meal));
    });
  
    await this.dailyMealRepository.update(routine.id, {
      mealsToCreate,
      mealsToUpdate,
      mealsToDelete,
    });
  
    this.saveCalculatedFields(routine.id)
  
    return;
  }
  

  async delete(routineId: string) {
    return await this.routineRepository.delete(routineId);
  }

  async saveCalculatedFields(routineId: string) {
    const mealsToCalculate =
      await this.dailyMealRepository.getCalculatedFieldsByRoutineId(routineId);

    const calculatedFields = calculateFieldsBasedOnMeals(mealsToCalculate.map(mealItem => mealItem.meal))

    await this.routineRepository.saveCalculatedFields(routineId, calculatedFields);
  }
}


