import { prisma } from "../database/prisma-client.js";
import {
  DailyMealCreate,
  DailyMealRepository,
  DailyMealUpdate,
} from "../interfaces/daily-meal-interface.js";

export class DailyMealRepositoryPrisma implements DailyMealRepository {
  async createMany(routineId: string, data: DailyMealCreate[]) {
    return await prisma.dailyMeal.createMany({
      data: data.map((meal) => ({
        routineId,
        mealId: meal.mealId,
        time: meal.time,
        status: meal.status,
        
      })),
    });
  }

  async findMany(routineId: string) {
    return await prisma.dailyMeal.findMany({
      where: {
        routineId,
      },
    });
  }

  async getAllMealsByRoutineId(routineId: string) {
    return await prisma.dailyMeal.findMany({
      where: {
        routineId
      },
      select: {
        status: true,
        time: true,
        meal: {
          select: {
            id: true,
            name: true,
            foods: {
              select: {
                food: true,
                quantity: true,
              }
            }
          }
        }
      },
    });
  }

  async update(routineId: string, meals: DailyMealUpdate) {
    await prisma.$transaction([
      ...meals.mealsToCreate.map(({ mealId, status, time }) =>
        prisma.dailyMeal.create({
          data: {
            routineId,
            mealId,
            status,
            time,
          },
        })
      ),

      ...meals.mealsToUpdate.map(({ mealId, status, time }) =>
        prisma.dailyMeal.update({
          where: {
            routineId_mealId_time: {
              routineId,
              mealId,
              time
            },
          },
          data: {
            status,
            time,
          },
        })
      ),

      ...meals.mealsToDelete.map(({ mealId, time }) =>
        prisma.dailyMeal.delete({
          where: {
            routineId_mealId_time: {
              routineId,
              mealId,
              time
            },
          },
        })
      ),
    ]);
  }

  async getCalculatedFieldsByRoutineId(routineId: string) {
    return await prisma.dailyMeal.findMany({
      where: {
        routineId,
      },
      select: {
        meal: {
          select: {
            totalCalories: true,
            totalCarbohydrates: true,
            totalProteins: true,
            totalFats: true,
            totalSodiums: true,
            totalFibers: true,
          },
        },
      },
    });
  }
}
