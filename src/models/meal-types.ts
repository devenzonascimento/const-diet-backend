import { z } from 'zod'
import { foodSchema, type Food } from './food-types.js'
import {
  macronutrientsSchema,
  type Macronutrients,
} from './macronutrients-types.js'

export type MealFood = Food & { quantity: number }

export type Meal = {
  id: number
  name: string
  description?: string
  imageUrl?: string
  calories: number
  macronutrients: Macronutrients
  foods: MealFood[]
}

export const mealFoodSchema = foodSchema.extend({ quantity: z.number() })

export const mealSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  calories: z.number().nonnegative(),
  macronutrients: macronutrientsSchema,
  foods: z.array(mealFoodSchema),
})
