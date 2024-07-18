import { prisma } from "../database/prisma-client.js";
import {
  RoutineMealRepository,
  RoutineMealUpdate,
} from "../interfaces/routine-meal-interface.js";

export class RoutineMealRepositoryPrisma implements RoutineMealRepository {
  async findMany(routineId: string) {
    return await prisma.routineMeal.findMany({
      where: {
        routineId,
      },
    });
  }

  async getAllMealsByRoutineId(routineId: string) {
    return await prisma.routineMeal.findMany({
      where: {
        routineId,
      },
      select: {
        time: true,
        meal: {
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
        },
      },
    });
  }

  async update(routineId: string, meals: RoutineMealUpdate) {
    await prisma.$transaction([
      ...meals.mealsToCreate.map(({ mealId, time }) =>
        prisma.routineMeal.create({
          data: {
            routineId,
            mealId,

            time,
          },
        })
      ),

      ...meals.mealsToUpdate.map(({ mealId, time }) =>
        prisma.routineMeal.update({
          where: {
            routineId_mealId_time: {
              routineId,
              mealId,
              time,
            },
          },
          data: {
            time,
          },
        })
      ),

      ...meals.mealsToDelete.map(({ mealId, time }) =>
        prisma.routineMeal.delete({
          where: {
            routineId_mealId_time: {
              routineId,
              mealId,
              time,
            },
          },
        })
      ),
    ]);
  }

  async getCalculatedFieldsByRoutineId(routineId: string) {
    return await prisma.routineMeal.findMany({
      where: {
        routineId,
      },
      select: {
        meal: {
          select: {
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
