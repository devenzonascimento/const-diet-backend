import { FoodRepository } from '@/repositories/food-repository.js'
import type { IFoodRepository } from '@/interfaces/food-repository-interface.js'
import type { Food } from '@/models/food-types.js'

export class FoodUseCase {
  private foodRepository: IFoodRepository

  constructor(foodRepository: IFoodRepository) {
    this.foodRepository = foodRepository
  }

  private async existsFoodWithSameName(foodName: string) {
    const foodWithSameName = await this.foodRepository.findByName(foodName)

    return foodWithSameName !== null
  }

  public async create(food: Food) {
    const existsFoodName = await this.existsFoodWithSameName(food.name)

    if (existsFoodName) {
      throw new Error('This food name already exists')
    }

    return await this.foodRepository.create(food)
  }

  public async update(food: Food) {
    const existsFoodName = await this.existsFoodWithSameName(food.name)

    if (existsFoodName) {
      throw new Error('This food name already exists')
    }

    return await this.foodRepository.update(food)
  }
}
