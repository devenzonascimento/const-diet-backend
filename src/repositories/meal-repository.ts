import { prisma } from "../database/prisma-client.js";
import { MealFoodCreate, MealFoodUpdate } from "../interfaces/meal-food-interface.js";

import {
  MealRepository,
  MealCreate,
  MealUpdate,
  CalculatedFields,
} from "../interfaces/meal-interface.js";

export class MealRepositoryPrisma implements MealRepository {
  async create(mealData: MealCreate, foodsData: MealFoodCreate[]) {
    return await prisma.meal.create({
      data: {
        userId: mealData.userId,
        name: mealData.name,
        foods: {
          createMany: {
            data: foodsData.map((food) => ({
              foodId: food.foodId,
              quantity: food.quantity,            
            })),
          },
        },
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
        calories: true,
        carbohydrates: true,
        proteins: true,
        fats: true,
        fibers: true,
        sodium: true,
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
        calories: true,
        carbohydrates: true,
        proteins: true,
        fats: true,
        fibers: true,
        sodium: true,
        foods: {
          select: {
            food: true,
            quantity: true,
          },
        },
      },
    });
  }

  async update(mealData: MealUpdate, foodsData: MealFoodUpdate) {
    return await prisma.meal.update({
      where: {
        id: mealData.id,
      },
      data: {
        name: mealData.name,
        foods: {
          createMany: {
            data: foodsData.foodsToCreate.map((food) => ({
              foodId: food.foodId,
              quantity: food.quantity,            
            })),
          },
          updateMany: foodsData.foodsToUpdate.map((food) => ({
            where: {
              foodId: food.foodId
            },
            data: {
              quantity: food.quantity,
            },
          })),
          deleteMany: foodsData.foodsToDelete.map((food) => ({
            foodId: food.foodId,
          })),
        }
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

  async saveCalculatedFields(mealId: string, calculatedFields: CalculatedFields) {
    return await prisma.meal.update({
      where: {
        id: mealId,
      },
      data: calculatedFields,
      select: {
        id: true,
        name: true,        
        calories: true,
        carbohydrates: true,
        proteins: true,
        fats: true,
        fibers: true,
        sodium: true,
        foods: {
          select: {
            food: true,
            quantity: true,
          },
        },
      }
    });
  }
}
