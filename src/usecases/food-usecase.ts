import { FoodRepositoryPrisma } from "../repositories/food-repository.js";
import { MealFoodRepositoryPrisma } from "../repositories/meal-food-repository.js";
import { RoutineMealRepositoryPrisma } from "../repositories/routine-meal-repository.js";

import { MealUseCase } from "./meal-usecase.js";
import { RoutineUseCase } from "./routine-usecase.js";

import { FoodCreate, FoodUpdate } from "../interfaces/food-interface.js";

export class FoodUseCase {
  private foodRepository;
  private mealFoodRepository;
  private mealUseCase;
  private routineMealRepository;
  private routineUseCase;

  constructor() {
    this.foodRepository = new FoodRepositoryPrisma();
    this.mealFoodRepository = new MealFoodRepositoryPrisma();
    this.mealUseCase = new MealUseCase();
    this.routineMealRepository = new RoutineMealRepositoryPrisma();
    this.routineUseCase = new RoutineUseCase();
  }

  async create(foodData: FoodCreate) {
    const existsFood = await this.foodRepository.findByName(
      foodData.userId,
      foodData.name
    );

    if (existsFood) {
      throw new Error("This food name already exists");
    }

    return await this.foodRepository.create(foodData);
  }

  async findById(foodId: string) {
    return await this.foodRepository.findById(foodId);
  }

  async getAll(userId: string) {
    return await this.foodRepository.getAll(userId);
  }

  async update(userId: string, foodData: FoodUpdate) {
    const existsFood = await this.foodRepository.findByName(
      userId,
      foodData.name
    );

    if (existsFood && existsFood.id !== foodData.id) {
      throw new Error("This food name already exists");
    }

    const updatedFood = await this.foodRepository.update(foodData);

    const mealsIdsToRecalculate =
      await this.mealFoodRepository.getMealsIdsRelatedToFood(updatedFood.id);

    this.recalculateFieldsOnFoodUpdate(mealsIdsToRecalculate);

    return updatedFood;
  }

  async delete(foodId: string) {
    const mealsIdsToRecalculate =
      await this.mealFoodRepository.getMealsIdsRelatedToFood(foodId);

    await this.foodRepository.delete(foodId);

    this.recalculateFieldsOnFoodUpdate(mealsIdsToRecalculate);
  }

  async recalculateFieldsOnFoodUpdate(
    mealsIdsToRecalculate: { mealId: string }[]
  ) {
    mealsIdsToRecalculate.forEach(async ({ mealId }) => {
      await this.mealUseCase.saveCalculatedFields(mealId);

      const routinesIdsToRecalculate =
        await this.routineMealRepository.getRoutineIdsRelatedToMeal(mealId);

      routinesIdsToRecalculate.forEach(
        async ({ routineId }) =>
          await this.routineUseCase.saveCalculatedFields(routineId)
      );
    });
  }
}
