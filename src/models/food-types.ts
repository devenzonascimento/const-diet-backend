import { z } from 'zod'
import {
  macronutrientsSchema,
  type Macronutrients,
} from './macronutrients-types.js'

export type UnitType = 'GRAMS' | 'MILILITERS'

export type Food = {
  id: number
  name: string
  imageUrl?: string
  unit: UnitType
  calories: number
  macronutrients: Macronutrients
}

export const foodSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string().optional(),
  unit: z.enum(['GRAMS', 'MILILITERS']),
  calories: z.number().nonnegative(),
  macronutrients: macronutrientsSchema,
})
