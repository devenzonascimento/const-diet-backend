import { prisma } from "../database/prisma-client.js";

import {
  FoodRepository,
  FoodCreate,
  FoodUpdate,
} from "../interfaces/food-interface.js";

export class FoodRepositoryPrisma implements FoodRepository {
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
    });
  }

  async findById(foodId: string) {
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
    });
  }

  async findByName(userId: string, foodName: string) {
    return await prisma.food.findFirst({
      where: {
        userId,
        name: foodName,
      },
    });
  }

  async getAll(userId: string) {
    return await prisma.food.findMany({
      where: {
        userId,
      },
    });
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
    });
  }

  async delete(foodId: string) {
    await prisma.$transaction([
      prisma.mealFood.deleteMany({
        where: {
          foodId,
        },
      }),
      prisma.food.delete({
        where: {
          id: foodId,
        },
      }),
    ]);
  }
}
