import { DailyRoutineRepositoryPrisma } from "../repositories/daily-routine-repository";

import { $Enums } from "@prisma/client";

export class DailyRoutineUseCase {
  private dailyRoutineRepository;

  constructor() {
    this.dailyRoutineRepository = new DailyRoutineRepositoryPrisma();
  }
  
  async setStatus(dailyRoutineId: string, status: $Enums.Status) {
    await this.dailyRoutineRepository.setStatus(dailyRoutineId, status);
  }
}
