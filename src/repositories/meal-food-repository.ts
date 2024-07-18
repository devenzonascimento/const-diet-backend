import { prisma } from "../database/prisma-client.js";

import { MealFoodRepository } from "../interfaces/meal-food-interface.js";

export class MealFoodRepositoryPrisma implements MealFoodRepository {
  async findMany(mealId: string) {
    return await prisma.mealFood.findMany({
      where: {
        mealId,
      },
    });
  }

  async getAllFoodsByMealId(mealId: string) {
    return await prisma.mealFood.findMany({
      where: {
        mealId,
      },
      select: {
        quantity: true,
        food: {
          select: {
            id: true,
            name: true,
            unit: true,
            calories: true,
            carbohydrates: true,
            proteins: true,
            fats: true,
            fibers: true,
            sodium: true,
          },
        },
      },
    });
  }
}
