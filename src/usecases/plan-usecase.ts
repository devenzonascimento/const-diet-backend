import { PlanRepositoryPrisma } from "../repositories/plan-repository.js";

import { PlanCreate, PlanUpdate } from "../interfaces/plan-interface.js";

export class PlanUseCase {
  private planRepository;

  constructor() {
    this.planRepository = new PlanRepositoryPrisma();
  }
  async create(planData: PlanCreate) {
    return await this.planRepository.create(planData);
  }

  async update(planData: PlanUpdate) {
    const plan = await this.planRepository.update(planData);

    const { id, name, goal, startDate, endDate, routines } = plan;

    const planWithFormattedData = {
      id,
      name,
      goal,
      startDate,
      endDate,
      routines: routines.map((item) => {
        const { date, status, routine } = item;

        const { meals, ...routineRest } = routine;

        return {
          date,
          status,
          ...routineRest,
          meals: meals.map((item) => {
            const { meal, time } = item;

            const { foods, ...mealsRest } = meal;

            return {
              time,
              ...mealsRest,
              foods: foods.map(({ food, quantity }) => {
                return { ...food, quantity };
              }),
            };
          }),
        };
      }),
    };

    return planWithFormattedData;
  }

  async getPlanById(planId: string) {
    const plan = await this.planRepository.getPlanById(planId);

    if (!plan) {
      return;
    }

    const { id, name, goal, startDate, endDate, routines } = plan;

    const planWithFormattedData = {
      id,
      name,
      goal,
      startDate,
      endDate,
      routines: routines.map((item) => {
        const { date, status, routine } = item;

        const { meals, ...routineRest } = routine;

        return {
          date,
          status,
          ...routineRest,
          meals: meals.map((item) => {
            const { meal, time } = item;

            const { foods, ...mealsRest } = meal;

            return {
              time,
              ...mealsRest,
              foods: foods.map(({ food, quantity }) => {
                return { ...food, quantity };
              }),
            };
          }),
        };
      }),
    };

    return planWithFormattedData;
  }

  async getAll(userId: string) {
    return await this.planRepository.getAll(userId);
  }
}
