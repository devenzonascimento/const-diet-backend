import { PlanCreate } from "../interfaces/plan-interface.js";
import { PlanRepositoryPrisma } from "../repositories/plan-repository.js";

export class PlanUseCase {
  private planRepository;

  constructor() {
    this.planRepository = new PlanRepositoryPrisma();
  }
  async create(planData: PlanCreate) {
    return await this.planRepository.create(planData);
  }

  async getPlanById(planId: string) {
    return await this.planRepository.getPlanById(planId);
  }

  async getAll(userId: string) {
    return await this.planRepository.getAll(userId);
  }
}
