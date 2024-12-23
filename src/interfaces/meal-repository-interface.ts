import type { Meal } from '@/models/meal-types.js'
import type { PaginationResponse } from '@/models/result-types.js'

export type CommandCreateMeal = Omit<Meal, 'foods'> & {
  foods: { id: number; quantity: number }[]
}

export type CommandUpdateMeal = Omit<Meal, 'foods'> & {
  foods: { id: number; quantity: number }[]
}

export interface IMealRepository {
  // COMMANDS
  create(mealData: CommandCreateMeal): Promise<Meal>
  update(mealData: CommandUpdateMeal): Promise<Meal>
  delete(mealId: number): Promise<void>
  saveImageUrl(mealId: number, imageUrl: string): Promise<void>

  // QUERIES
  findById(mealId: number): Promise<Meal | null>
  findByName(mealName: string): Promise<Meal | null>
  getAll(): Promise<Meal[]>
  getAllWithPagination(
    page: number,
    pageSize: number,
  ): Promise<PaginationResponse<Meal>>
}
