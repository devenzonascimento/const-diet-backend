import { z } from 'zod'

export type Macronutrients = {
  carbohydrates: number
  proteins: number
  fats: number
  fibers: number
  sodium: number
}

export const macronutrientsSchema = z.object({
  carbohydrates: z.number().nonnegative(),
  proteins: z.number().nonnegative(),
  fats: z.number().nonnegative(),
  sodium: z.number().nonnegative(),
  fibers: z.number().nonnegative(),
})
