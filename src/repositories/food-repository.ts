import { prisma } from '@/database/prisma-client.js'
import type { IFoodRepository } from '@/interfaces/food-repository-interface.js'
import type { Food } from '@/models/food-types.js'

const QUERY_SELECT = {
  id: true,
  name: true,
  imageUrl: true,
  unit: true,
  calories: true,
  macronutrients: {
    select: {
      carbohydrates: true,
      proteins: true,
      fats: true,
      sodium: true,
      fibers: true,
    },
  },
} as const

export class FoodRepository implements IFoodRepository {
  private userId: number

  constructor(userId: number) {
    this.userId = userId
  }

  // #region COMMANDS
  async create(food: Food) {
    return await prisma.food.create({
      data: {
        user: {
          connect: {
            id: this.userId,
          },
        },
        name: food.name,
        unit: food.unit,
        calories: food.calories,
        macronutrients: {
          create: {
            carbohydrates: food.macronutrients.carbohydrates,
            proteins: food.macronutrients.proteins,
            fats: food.macronutrients.fats,
            sodium: food.macronutrients.sodium,
            fibers: food.macronutrients.fibers,
          },
        },
      },
      select: QUERY_SELECT,
    })
  }

  async update(food: Food) {
    return await prisma.food.update({
      where: {
        userId: this.userId,
        id: food.id,
      },
      data: {
        name: food.name,
        unit: food.unit,
        calories: food.calories,
        macronutrients: {
          create: {
            carbohydrates: food.macronutrients.carbohydrates,
            proteins: food.macronutrients.proteins,
            fats: food.macronutrients.fats,
            sodium: food.macronutrients.sodium,
            fibers: food.macronutrients.fibers,
          },
        },
      },
      select: QUERY_SELECT,
    })
  }

  async delete(foodId: number) {
    await prisma.food.delete({
      where: {
        id: foodId,
        userId: this.userId,
      },
    })
  }

  async saveImageUrl(foodId: number, imageUrl: string) {
    await prisma.food.update({
      where: {
        id: foodId,
      },
      data: {
        imageUrl,
      },
    })
  }
  // #endregion COMMANDS

  // #region QUERIES
  async findById(foodId: number) {
    return await prisma.food.findFirst({
      where: {
        id: foodId,
        userId: this.userId,
      },
      select: QUERY_SELECT,
    })
  }

  async findByName(foodName: string) {
    return await prisma.food.findFirst({
      where: {
        name: foodName,
        userId: this.userId,
      },
      select: QUERY_SELECT,
    })
  }

  async getAll() {
    return await prisma.food.findMany({
      where: {
        userId: this.userId,
      },
      select: QUERY_SELECT,
      orderBy: {
        name: 'asc',
      },
    })
  }

  async getAllWithPagination(page: number, pageSize: number) {
    const foods = await prisma.food.findMany({
      where: {
        userId: this.userId,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: QUERY_SELECT,
      orderBy: {
        name: 'asc',
      },
    })

    const totalCount = await prisma.food.count()

    return {
      items: foods,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    }
  }
  // #endregion QUERIES
}
