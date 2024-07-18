import { FoodRepositoryPrisma } from "../repositories/food-repository.js";

import { FoodCreate, FoodUpdate } from "../interfaces/food-interface.js";

export class FoodUseCase {
  private foodRepository;

  constructor() {
    this.foodRepository = new FoodRepositoryPrisma();
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
    const existsFood = await this.foodRepository.findByName(userId, foodData.name);

    if (existsFood && existsFood.id !== foodData.id) {
      throw new Error("This food name already exists");
    }

    return await this.foodRepository.update(foodData);
  }

  async delete(foodId: string) {
    await this.foodRepository.delete(foodId);
  }
}
