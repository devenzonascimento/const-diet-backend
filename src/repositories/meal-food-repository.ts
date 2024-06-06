import { prisma } from "../database/prisma-client.js";

import {
  MealFoodRepository,
  MealFoodCreate,
  MealFood,
  MealFoodUpdate,
} from "../interfaces/meal-food-interface.js";

export class MealFoodRepositoryPrisma implements MealFoodRepository {
  async createMany(mealId: string, data: MealFoodCreate[]) {
    return await prisma.mealFood.createMany({
      data: data.map((food) => ({
        mealId,
        foodId: food.foodId,
        quantity: food.quantity,
      })),
    });
  }

  async findMany(mealId: string) {
    return await prisma.mealFood.findMany({
      where: {
        mealId,
      }
    })
  }

  async getAllFoodsByMealId(mealId: string) {
    return await prisma.mealFood.findMany({
      where: {
        mealId,
      },
      select: {
        food: true,
        quantity: true,
      },
    });
  }

  async update(mealId: string, foods: MealFoodUpdate) {
    await prisma.$transaction([
      ...foods.foodsToCreate.map(({ foodId, quantity }) =>
        prisma.mealFood.create({
          data: {
            mealId,
            foodId,
            quantity,
          },
        })
      ),

      ...foods.foodsToUpdate.map(({ foodId, quantity }) =>
        prisma.mealFood.update({
          where: {
            mealId_foodId: {
              mealId,
              foodId,
            },
          },
          data: {
            quantity,
          },
        })
      ),

      ...foods.foodsToDelete.map(({ foodId }) =>
        prisma.mealFood.delete({
          where: {
            mealId_foodId: {
              mealId,
              foodId,
            },
          },
        })
      ),
    ]);
  }

  async delete(mealId: string, foodId: string) {
    await prisma.mealFood.delete({
      where: {
        mealId_foodId: {
          mealId,
          foodId,
        },
      },
    });
  }
}
