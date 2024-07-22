import { prisma } from "../database/prisma-client.js";

import { PlanCreate, PlanRepository, PlanUpdate } from "../interfaces/plan-interface.js";

export class PlanRepositoryPrisma implements PlanRepository {
  async create(planData: PlanCreate) {
    return await prisma.plan.create({
      data: {
        name: planData.name,
        goal: planData.goal,
        startDate: planData.startDate,
        endDate: planData.endDate,
        userId: planData.userId,
        routines: {
          createMany: {
            data: planData.routines.map((routine) => ({
              routineId: routine.routineId,
              date: routine.date,
              status: "PENDING",
            })),
          },
        },
      },
    });
  }

  async update(planData: PlanUpdate) {
    return await prisma.plan.update({
      where: {
        id: planData.id,
      },
      data: {
        name: planData.name,
        goal: planData.goal,
        startDate: planData.startDate,
        endDate: planData.endDate,
        routines: {
          deleteMany: {
            planId: planData.id
          },
          createMany: {
            data: planData.routines.map((routine) => ({
              routineId: routine.routineId,
              date: routine.date,
              status: "PENDING",
            })),
          },
        }
      },
    });
  }

  async getPlanById(planId: string) {
    return await prisma.plan.findUnique({
      where: {
        id: planId,
      },
      select: {
        id: true,
        name: true,
        goal: true,
        startDate: true,
        endDate: true,
        routines: {
          select: {
            date: true,
            status: true,
            routine: {
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
                  }
                }
              }
            }
          }
        }
      },
    });
  }

  async getAll(userId: string) {
    return await prisma.plan.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        goal: true,
        startDate: true,
        endDate: true,
      },
    });
  }
}
