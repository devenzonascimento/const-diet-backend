import { MealRepository } from '@/repositories/meal-repository.js'
import { MealUseCase } from '@/usecases/meal-usecase.js'

export function mealUseCaseFactory(userId: number) {
  const mealRepository = new MealRepository(userId)

  const mealUseCase = new MealUseCase(mealRepository)

  return mealUseCase
}
