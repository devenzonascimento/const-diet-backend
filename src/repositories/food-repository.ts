import { prisma } from '@/database/prisma-client.js'

import type {
  IFoodRepository,
  FoodCreate,
  FoodUpdate,
} from '@/interfaces/food-interface.js'

export class FoodRepository implements IFoodRepository {
  async create(foodData: FoodCreate) {
    return await prisma.food.create({
      data: {
        userId: foodData.userId,
        name: foodData.name,
        unit: foodData.unit,
        calories: foodData.calories,
        carbohydrates: foodData.carbohydrates,
        proteins: foodData.proteins,
        fats: foodData.fats,
        sodium: foodData.sodium,
        fibers: foodData.fibers,
      },
      select: {
        id: true,
        name: true,
        unit: true,
        calories: true,
        carbohydrates: true,
        proteins: true,
        fats: true,
        sodium: true,
        fibers: true,
      },
    })
  }

  async findById(foodId: number) {
    return await prisma.food.findFirst({
      where: {
        id: foodId,
      },
      select: {
        id: true,
        name: true,
        unit: true,
        calories: true,
        carbohydrates: true,
        proteins: true,
        fats: true,
        sodium: true,
        fibers: true,
      },
    })
  }

  async findByName(userId: number, foodName: string) {
    return await prisma.food.findFirst({
      where: {
        userId,
        name: foodName,
      },
      select: {
        id: true,
        name: true,
        unit: true,
        calories: true,
        carbohydrates: true,
        proteins: true,
        fats: true,
        sodium: true,
        fibers: true,
      },
    })
  }

  async getAll(userId: number) {
    return await prisma.food.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        unit: true,
        calories: true,
        carbohydrates: true,
        proteins: true,
        fats: true,
        sodium: true,
        fibers: true,
      },
      orderBy: {
        name: 'asc',
      },
    })
  }

  async getAllWithPagination(userId: number, page: number, pageSize: number) {
    const foods = await prisma.food.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        unit: true,
        calories: true,
        carbohydrates: true,
        proteins: true,
        fats: true,
        sodium: true,
        fibers: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    const totalCount = await prisma.food.count()

    return {
      itens: foods,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    }
  }

  async update(foodData: FoodUpdate) {
    return await prisma.food.update({
      where: {
        id: foodData.id,
      },
      data: {
        name: foodData.name,
        unit: foodData.unit,
        calories: foodData.calories,
        carbohydrates: foodData.carbohydrates,
        proteins: foodData.proteins,
        fats: foodData.fats,
        sodium: foodData.sodium,
        fibers: foodData.fibers,
      },
      select: {
        id: true,
        name: true,
        unit: true,
        calories: true,
        carbohydrates: true,
        proteins: true,
        fats: true,
        sodium: true,
        fibers: true,
      },
    })
  }

  async delete(foodId: number) {
    await prisma.food.delete({
      where: {
        id: foodId,
      },
    })
  }
}
