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

  async getRoutineIdsRelatedToMeal(mealId: string) {
    return await prisma.routineMeal.findMany({
      where: {
        mealId,
      },
      select: {
        routineId: true,
      },
    })
  }
}
