import { prisma } from "../database/prisma-client.js";

import {
  RoutineRepository,
  RoutineCreate,
  RoutineUpdate,
  CalculatedFields,
} from "../interfaces/routine-interface.js";

export class RoutineRepositoryPrisma implements RoutineRepository {
  async create(data: RoutineCreate) {
    return await prisma.routine.create({
      data: {
        userId: data.userId,
        name: data.name,
        water: data.water,
      },
    });
  }

  async findById(routineId: string) {
    return await prisma.routine.findUnique({
      where: {
        id: routineId,
      },
      select: {
        id: true,
        name: true,
        water: true,
        meals: {
          select: {
            status: true,
            time: true,
            meal: {
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
            },
          },
        },
      },
    });
  }

  async getAll(userId: string) {
    return await prisma.routine.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        water: true,
        totalCalories: true,
        totalCarbohydrates: true,
        totalProteins: true,
        totalFats: true,
        totalSodiums: true,
        totalFibers: true,
        meals: {
          select: {
            status: true,
            time: true,
            meal: {
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
            },
          },
        },
      },
    });
  }

  async update(data: RoutineUpdate) {
    return await prisma.routine.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        water: data.water,
      },
    });
  }

  async delete(routineId: string) {
    await prisma.$transaction([
      prisma.dailyMeal.deleteMany({
        where: {
          routineId,
        },
      }),
      prisma.routine.delete({
        where: {
          id: routineId,
        },
      }),
    ]);
  }

  async saveCalculatedFields(
    routineId: string,
    calculatedFields: CalculatedFields
  ) {
    await prisma.routine.update({
      where: {
        id: routineId,
      },
      data: calculatedFields,
    });
  }
}
