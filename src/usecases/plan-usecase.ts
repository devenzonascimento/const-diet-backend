import { PlanCreate } from "../interfaces/plan-interface.js";
import { PlanRepositoryPrisma } from "../repositories/plan-repository.js";

export class PlanUseCase {
  private planRepository;

  constructor() {
    this.planRepository = new PlanRepositoryPrisma();
  }
  async create(data: PlanCreate) {    
    return await this.planRepository.create(data);
  }

  async getAll(userId: string) {
    return await this.planRepository.getAll(userId);
  }
}
