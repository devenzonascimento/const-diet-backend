import { calculateFieldsBasedOnMeals } from "../functions/calculate-fields-based-on-meals.js";

import { RoutineRepositoryPrisma } from "../repositories/routine-repository.js";
import { RoutineMealRepositoryPrisma } from "../repositories/routine-meal-repository.js";

import { RoutineCreate, RoutineUpdate } from "../interfaces/routine-interface.js";
import { RoutineMealCreate } from "../interfaces/routine-meal-interface.js";

export class RoutineUseCase {
  private routineRepository;
  private routineMealRepository;

  constructor() {
    this.routineRepository = new RoutineRepositoryPrisma();
    this.routineMealRepository = new RoutineMealRepositoryPrisma();
  }

  async create(routineData: RoutineCreate, mealsData: RoutineMealCreate[]) {
    const { id } = await this.routineRepository.create(routineData, mealsData);

    const routine = await this.saveCalculatedFields(id)

    return routine;
  }

  async findById(routineId: string) {
    return await this.routineRepository.findById(routineId);
  }

  async getAll(userId: string) {
    return await this.routineRepository.getAll(userId);
  }

  async update(routineData: RoutineUpdate, mealsData: RoutineMealCreate[]) {
    
    const currentMeals = await this.routineMealRepository.findMany(routineData.id);
  
    const isSameMeal = (meal1: RoutineMealCreate, meal2: RoutineMealCreate) => {
      return meal1.mealId === meal2.mealId && meal1.time === meal2.time;
    };
  
    const mealsToCreate = mealsData.filter((meal) => {
      return !currentMeals.some((currentMeal) => isSameMeal(currentMeal, meal));
    });
  
    const mealsToUpdate = mealsData.filter((meal) => {
      return currentMeals.some((currentMeal) => isSameMeal(currentMeal, meal));
    });
  
    const mealsToDelete = currentMeals.filter((currentMeal) => {
      return !mealsData.some((meal) => isSameMeal(currentMeal, meal));
    });

    await this.routineRepository.update(routineData, {
      mealsToCreate,
      mealsToUpdate,
      mealsToDelete,
    });
  
    const routine = await this.saveCalculatedFields(routineData.id)

    return routine;
  }
  

  async delete(routineId: string) {
    return await this.routineRepository.delete(routineId);
  }

  async saveCalculatedFields(routineId: string) {
    const mealsToCalculate =
      await this.routineMealRepository.getCalculatedFieldsByRoutineId(routineId);

    const calculatedFields = calculateFieldsBasedOnMeals(mealsToCalculate.map(mealItem => mealItem.meal))

    return await this.routineRepository.saveCalculatedFields(routineId, calculatedFields);
  }
}


