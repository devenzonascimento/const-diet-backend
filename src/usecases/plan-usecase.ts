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
    const plan = await this.planRepository.getPlanById(planId);

    if (!plan) {
      return
    }

    const { id, name, goal, startDate, endDate, routines } = plan

    const planData = {
      id,
      name,
      goal,
      startDate,
      endDate,
      routines: routines.map(item => {
        const { date, status, routine } = item

        const { meals, ...routineRest} = routine
 
        return {
          date,
          status,
          ...routineRest,
          meals: meals.map(item => {
            const { meal, time } = item

            const { foods, ...mealsRest } = meal

            return {
              time,
              ...mealsRest,
              foods: foods.map(({ food, quantity }) => {
                return {...food, quantity }
              })          
            }
          })
        } 
      }),
    }
  
    return planData;
  }

  async getAll(userId: string) {
    return await this.planRepository.getAll(userId);
  }
}
