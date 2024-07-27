import { prisma } from "../database/prisma-client.js";

import { $Enums } from "@prisma/client";

import { DailyRoutineRepository, MealStatus } from "../interfaces/daily-routine-interface.js";

export class DailyRoutineRepositoryPrisma implements DailyRoutineRepository {
  async getDailyRoutine(date: Date) {
    const plan = await prisma.plan.findFirst({
      where: {
        isActive: true,
      },
      select: {
        id: true,
      },
    });

    if (!plan) {
      throw new Error("No active plan found");
    }

    return await prisma.dailyRoutine.findFirst({
      where: {
        planId: plan.id,
        date,
      },
      select: {
        id: true,
        date: true,
        status: true,
        mealsStatus: true,
        routine: {
          select: {            
            name: true,
            water: true,
            calories: true,
            carbohydrates: true,
            proteins: true,
            fats: true,
            fibers: true,
            sodium: true,
            meals: {
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
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async setStatus(dailyRoutineId: string, status: $Enums.Status) {
    await prisma.dailyRoutine.update({
      where: {
        id: dailyRoutineId,
      },
      data: {
        status,
      },
    });
  }

  async getMealsStatus(dailyRoutineId: string) {
    return await prisma.dailyRoutine.findUnique({
      where: { id: dailyRoutineId },
      select: { mealsStatus: true },
    });
  }

  async setMealStatus(
    dailyRoutineId: string,
    status: $Enums.Status,
    mealsStatus: MealStatus[]
  ) {
    await prisma.dailyRoutine.update({
      where: { id: dailyRoutineId },
      data: { status, mealsStatus },
    });
  }
}
