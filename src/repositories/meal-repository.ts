import { prisma } from "../database/prisma-client.js";

import {
  MealRepository,
  MealCreate,
  MealUpdate,
} from "../interfaces/meal-interface.js";

export class MealRepositoryPrisma implements MealRepository {
  async create(data: MealCreate) {
    return await prisma.meal.create({
      data: {
        userId: data.userId,
        name: data.name,
      },
    });
  }

  async findById(mealId: string) {
    return await prisma.meal.findUnique({
      where: {
        id: mealId,
      },
      select: {
        id: true,
        name: true,
        foods: {
          select: {
            food: true,
            quantity: true,
            unit: true,
          },
        },
      },
    });
  }

  async getAll(userId: string) {
    return await prisma.meal.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        foods: {
          select: {
            food: true,
            quantity: true,
            unit: true,
          },
        },
      },
    });
  }

  async update(mealId: string, data: MealUpdate) {
    return await prisma.meal.update({
      where: {
        id: mealId,
      },
      data: {
        name: data.name,
      },
    });
  }

  async delete(mealId: string) {
    await prisma.$transaction([
      prisma.foodInMeal.deleteMany({
        where: {
          mealId,
        },
      }),
      prisma.meal.delete({
        where: {
          id: mealId,
        },
      }),
    ]);
  }
}
