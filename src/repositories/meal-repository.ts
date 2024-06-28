import { prisma } from "../database/prisma-client.js";

import {
  MealRepository,
  MealCreate,
  MealUpdate,
  CalculatedFields,
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
        totalCalories: true,
        totalCarbohydrates: true,
        totalProteins: true,
        totalFats: true,
        totalSodiums: true,
        totalFibers: true,
        foods: {
          select: {
            food: true,
            quantity: true,
          },
        },
      },
    });
  }

  async update(data: MealUpdate) {
    return await prisma.meal.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    });
  }

  async delete(mealId: string) {
    await prisma.$transaction([
      prisma.mealFood.deleteMany({
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

  async saveCalculatedFields(
    mealId: string,
    calculatedFields: CalculatedFields
  ) {
    await prisma.meal.update({
      where: {
        id: mealId,
      },
      data: calculatedFields,
    });
  }
}
