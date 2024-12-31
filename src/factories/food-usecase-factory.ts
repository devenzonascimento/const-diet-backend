import { FoodRepository } from '@/repositories/food-repository.js'
import { FoodUseCase } from '@/usecases/food-usecase.js'

export function foodUseCaseFactory(userId: number) {
  const foodRepository = new FoodRepository(userId)

  const foodUseCase = new FoodUseCase(foodRepository)

  return foodUseCase
}
