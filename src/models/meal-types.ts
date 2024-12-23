import type { Food } from './food-types.js'
import type { Macronutrients } from './macronutrients-types.js'

export type Meal = {
  id: number
  name: string
  description?: string
  imageUrl?: string
  calories: number
  macronutrients: Macronutrients
  foods: MealFood[]
}

export type MealFood = Food & { quantity: number }
