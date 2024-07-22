export interface Plan {
  id: string;
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
}

export interface PlanCreate {
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  routines: {
    routineId: string;
    date: Date;
  }[];
}

export interface PlanUpdate {
  id: string;
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  routines: {
    routineId: string;
    date: Date;
  }[];
}

export interface PlanRepository {
  create: (planData: PlanCreate) => Promise<Plan>;
  update: (planData: PlanUpdate) => Promise<Plan>;
  getPlanById: (planId: string) => Promise<Plan | null>;
  getAll: (userId: string) => Promise<Plan[]>;
}
