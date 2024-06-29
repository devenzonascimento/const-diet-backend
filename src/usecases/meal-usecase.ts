import { MealRepositoryPrisma } from "../repositories/meal-repository.js";
import { MealFoodRepositoryPrisma } from "../repositories/meal-food-repository.js";

import { MealCreate, MealUpdate } from "../interfaces/meal-interface.js";
import { MealFoodCreate } from "../interfaces/meal-food-interface.js";
import { calculateTotalCalories } from "../functions/calculate-total-calories.js";
import { calculateTotalNutrients } from "../functions/calculate-total-nutrients.js";

export class MealUseCase {
  private mealRepository;
  private mealFoodRepository;

  constructor() {
    this.mealRepository = new MealRepositoryPrisma();
    this.mealFoodRepository = new MealFoodRepositoryPrisma();
  }

  async create(mealData: MealCreate, foodsData: MealFoodCreate[]) {
    const meal = await this.mealRepository.create(mealData);

    await this.mealFoodRepository.createMany(meal.id, foodsData);

    this.saveCalculatedFields(meal.id)

    return meal;
  }

  async findById(mealId: string) {
    return await this.mealRepository.findById(mealId);
  }

  async getAll(userId: string) {
    return await this.mealRepository.getAll(userId);
  }

  async update(meal: MealUpdate, foods: MealFoodCreate[]) {
    await this.mealRepository.update(meal);

    const currentFoods = await this.mealFoodRepository.findMany(meal.id);
    const currentFoodIds = currentFoods.map((food) => food.foodId);

    const newFoodIds = foods.map((food) => food.foodId);

    const foodsToCreate = foods.filter((food) => {
      return !currentFoodIds.includes(food.foodId);
    });

    const foodsToUpdate = foods.filter((food) => {
      return currentFoodIds.includes(food.foodId);
    });

    const foodsToDelete = currentFoods.filter((food) => {
      return !newFoodIds.includes(food.foodId);
    });

    await this.mealFoodRepository.update(meal.id, {
      foodsToCreate,
      foodsToUpdate,
      foodsToDelete,
    });

    this.saveCalculatedFields(meal.id)

    return;
  }

  async delete(mealId: string) {
    await this.mealRepository.delete(mealId);
  }

  async saveCalculatedFields(mealId: string) {
    const foodsToCalculate = await this.mealFoodRepository.getAllFoodsByMealId(mealId);

    const totalCalories = calculateTotalCalories(foodsToCalculate);
    const totalNutrients = calculateTotalNutrients(foodsToCalculate);

    await this.mealRepository.saveCalculatedFields(mealId, {
      totalCalories,
      totalCarbohydrates: totalNutrients.carbohydrates,
      totalProteins: totalNutrients.proteins,
      totalFats: totalNutrients.fats,
      totalSodiums: totalNutrients.sodiums,
      totalFibers: totalNutrients.fibers,
    });
  }
}