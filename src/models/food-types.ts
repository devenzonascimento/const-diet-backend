import type { Macronutrients } from './macronutrients-types.js'

export type UnitType = 'GRAMS' | 'MILILITERS'

export type Food = {
  id: number
  name: string
  unit: UnitType
  calories: number
  macronutrients: Macronutrients
}
