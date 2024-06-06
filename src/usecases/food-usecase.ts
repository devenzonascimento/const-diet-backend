import { FoodRepository, FoodCreate, FoodUpdate } from "../interfaces/food-interface.js";
import { FoodRepositoryPrisma } from "../repositories/food-repository.js";


export class FoodUseCase {
  private foodRepository: FoodRepository;

  constructor() {
    this.foodRepository = new FoodRepositoryPrisma();
  }

  async create(data: FoodCreate) {

    const existsFood = await this.foodRepository.findByName(data.userId, data.name)

    if (existsFood) {
      throw new Error("This food name already exists");
    }

    return await this.foodRepository.create(data);
  }

  async findById(foodId: string) {
    return await this.foodRepository.findById(foodId);
  }

  async update(userId: string, foodId: string, data: FoodUpdate) {

    const existsFood = await this.foodRepository.findByName(userId, data.name)

    if (existsFood) {
      throw new Error("This food name already exists");
    }

    return await this.foodRepository.update(foodId, data);
  }

  async delete(foodId: string) {
    return await this.foodRepository.delete(foodId);
  }

  async getAllFoods(userId: string) {
    return await this.foodRepository.getAllFoods(userId);
  }
}
