import { prisma } from "../database/prisma-client.js";

import {
  RoutineRepository,
  RoutineCreate,
  RoutineUpdate,
  CalculatedFields,
} from "../interfaces/routine-interface.js";

import {
  RoutineMealCreate,
  RoutineMealUpdate,
} from "../interfaces/routine-meal-interface.js";

export class RoutineRepositoryPrisma implements RoutineRepository {
  async create(routineData: RoutineCreate, mealsData: RoutineMealCreate[]) {
    return await prisma.routine.create({
      data: {
        name: routineData.name,
        water: routineData.water,
        userId: routineData.userId,
        meals: {
          createMany: {
            data: mealsData.map((meal) => ({
              mealId: meal.mealId,
              time: meal.time,
            })),
          },
        },
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

  async update(routineData: RoutineUpdate, mealsData: RoutineMealUpdate) {
    return await prisma.routine.update({
      where: {
        id: routineData.id,
      },
      data: {
        name: routineData.name,
        water: routineData.water,
        meals: {
          createMany: {
            data: mealsData.mealsToCreate.map((meal) => ({
              mealId: meal.mealId,
              time: meal.time,
            })),
          },
          updateMany: mealsData.mealsToUpdate.map((meal) => ({
            where: {
              mealId: meal.mealId,
              time: meal.time,
            },
            data: {
              mealId: meal.mealId,
              time: meal.time,
            },
          })),
          deleteMany: mealsData.mealsToDelete.map((meal) => ({
            mealId: meal.mealId,
            time: meal.time,
          })),
        },
      },
    });
  }

  async delete(routineId: string) {
    await prisma.$transaction([
      prisma.routineMeal.deleteMany({
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
    return await prisma.routine.update({
      where: {
        id: routineId,
      },
      data: calculatedFields,
      select: {
        id: true,
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
              },
            },
          },
        },
      },
    });
  }
}
