import { prisma } from "../database/prisma-client.js";
import { PlanCreate, PlanRepository } from "../interfaces/plan-interface.js";

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

  async getPlanById(planId: string) {
    return await prisma.plan.findUnique({
      where: {
        id: planId,
      },
      include: {
        routines: {
          include: {
            routine: {
              include: {
                meals: {
                  include: {
                    meal: {
                      include: {
                        foods: true,
                      },
                    }
                  },
                },
              },
            }
          },
        },
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
