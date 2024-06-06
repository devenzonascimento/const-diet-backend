import { $Enums } from "@prisma/client";

import { Food } from "./food-interface";

export interface MealFood {
  food: Food
  quantity: number
  unit: $Enums.Unit
}