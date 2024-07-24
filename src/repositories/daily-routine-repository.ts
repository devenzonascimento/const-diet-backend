import { $Enums } from "@prisma/client";
import { prisma } from "../database/prisma-client.js";

import { DailyRoutineRepository } from "../interfaces/daily-routine-interface.js";

export class DailyRoutineRepositoryPrisma implements DailyRoutineRepository {
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
}
