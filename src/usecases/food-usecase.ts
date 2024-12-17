import { FoodRepository } from '@/repositories/food-repository.js'

import type {
  FoodCreate,
  FoodUpdate,
  IFoodRepository,
} from '@/interfaces/food-interface.js'

export class FoodUseCase {
  private foodRepository: IFoodRepository

  constructor() {
    this.foodRepository = new FoodRepository()
  }

  async create(foodData: FoodCreate) {
    const existsFood = await this.foodRepository.findByName(
      foodData.userId,
      foodData.name,
    )

    if (existsFood) {
      throw new Error('This food name already exists')
    }

    return await this.foodRepository.create(foodData)
  }

  async update(userId: number, foodData: FoodUpdate) {
    const existsFood = await this.foodRepository.findByName(
      userId,
      foodData.name,
    )

    if (existsFood && existsFood.id !== foodData.id) {
      throw new Error('This food name already exists')
    }

    const updatedFood = await this.foodRepository.update(foodData)

    return updatedFood
  }
}
