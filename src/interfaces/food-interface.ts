import type { $Enums } from '@prisma/client'

export type Food = {
  id: number
  name: string
  unit: $Enums.Unit
  calories: number
  carbohydrates: number
  proteins: number
  fats: number
  sodium: number
  fibers: number
}

export type FoodCreate = Food & {
  userId: number
}

export type FoodUpdate = Food

export type PaginationResponse<T> = {
  itens: T[]
  totalCount: number
  totalPages: number
  currentPage: number
}

export interface IFoodRepository {
  create(foodData: FoodCreate): Promise<Food>
  findById(foodId: number): Promise<Food | null>
  findByName(userId: number, foodName: string): Promise<Food | null>
  getAll(userId: number): Promise<Food[]>
  getAllWithPagination(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<PaginationResponse<Food>>
  update(foodData: FoodUpdate): Promise<Food>
  delete(foodId: number): Promise<void>
}
