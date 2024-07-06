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
    date: Date[];
  }[];
}

export interface PlanRepository {
  create: ( planData: PlanCreate ) => Promise<Plan | null>;
}
