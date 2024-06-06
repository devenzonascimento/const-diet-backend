import { prisma } from "../database/prisma-client.js";

import {
  FoodRepository,
  FoodCreate,
  FoodUpdate,
} from "../interfaces/food-interface.js";

export class FoodRepositoryPrisma implements FoodRepository {
  async create(data: FoodCreate) {
    return await prisma.food.create({
      data: {
        userId: data.userId,
        name: data.name,
        calories: data.calories,
        carbohydrates: data.carbohydrates,
        proteins: data.proteins,
        fats: data.fats,
        sodiums: data.sodiums,
        fibers: data.fibers,
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
        calories: true,
        carbohydrates: true,
        proteins: true,
        fats: true,
        sodiums: true,
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
    return await prisma.food.findMany({ where: { userId } });
  }

  async update(foodId: string, data: FoodUpdate) {
    return await prisma.food.update({
      where: {
        id: foodId,
      },
      data: {
        name: data.name,
        calories: data.calories,
        carbohydrates: data.carbohydrates,
        proteins: data.proteins,
        fats: data.fats,
        sodiums: data.sodiums,
        fibers: data.fibers,
      },
    });
  }

  async delete(foodId: string) {
    await prisma.food.delete({
      where: {
        id: foodId,
      },
    });
  }
}
