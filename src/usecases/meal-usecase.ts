import { MealRepositoryPrisma } from "../repositories/meal-repository.js";
import { MealFoodRepositoryPrisma } from "../repositories/meal-food-repository.js";

import { MealCreate, MealUpdate } from "../interfaces/meal-interface.js";
import { MealFoodCreate } from "../interfaces/meal-food-interface.js";

import { calculateFieldsBasedOnFoods } from "../functions/calculate-fields-based-on-foods.js";

export class MealUseCase {
  private mealRepository;
  private mealFoodRepository;

  constructor() {
    this.mealRepository = new MealRepositoryPrisma();
    this.mealFoodRepository = new MealFoodRepositoryPrisma();
  }

  async create(mealData: MealCreate, foodsData: MealFoodCreate[]) {
    const { id } = await this.mealRepository.create(mealData, foodsData);

    const meal = await this.saveCalculatedFields(id)

    return meal;
  }

  async findById(mealId: string) {
    return await this.mealRepository.findById(mealId);
  }

  async getAll(userId: string) {
    return await this.mealRepository.getAll(userId);
  }

  async update(mealData: MealUpdate, foodsData: MealFoodCreate[]) {
    
    const currentFoods = await this.mealFoodRepository.findMany(mealData.id);

    const currentFoodIds = currentFoods.map((food) => food.foodId);
    const newFoodIds = foodsData.map((food) => food.foodId);

    const foodsToCreate = foodsData.filter((food) => {
      return !currentFoodIds.includes(food.foodId);
    });

    const foodsToUpdate = foodsData.filter((food) => {
      return currentFoodIds.includes(food.foodId);
    });

    const foodsToDelete = currentFoods.filter((food) => {
      return !newFoodIds.includes(food.foodId);
    });

    await this.mealRepository.update(mealData, {
      foodsToCreate,
      foodsToUpdate,
      foodsToDelete,
    });

    const meal = await this.saveCalculatedFields(mealData.id)

    return meal;
  }

  async delete(mealId: string) {
    await this.mealRepository.delete(mealId);
  }

  async saveCalculatedFields(mealId: string) {
    const foodsToCalculate = await this.mealFoodRepository.getAllFoodsByMealId(mealId);

    const calculatedFields = calculateFieldsBasedOnFoods(foodsToCalculate)

    return await this.mealRepository.saveCalculatedFields(mealId, calculatedFields);
  }
}