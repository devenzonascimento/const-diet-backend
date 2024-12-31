import type { Food } from '@/models/food-types.js'
import type { PaginationResponse } from '@/models/result-types.js'

export interface IFoodRepository {
  // COMMANDS
  create(food: Food): Promise<Food>
  update(food: Food): Promise<Food>
  delete(foodId: number): Promise<void>
  saveImageUrl(foodId: number, imageUrl: string): Promise<void>

  // QUERIES
  findById(foodId: number): Promise<Food | null>
  findByName(foodName: string): Promise<Food | null>
  getAll(): Promise<Food[]>
  getAllWithPagination(
    page: number,
    pageSize: number,
  ): Promise<PaginationResponse<Food>>
}
