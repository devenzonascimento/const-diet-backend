import type { IMealRepository } from '@/interfaces/meal-repository-interface.js'
import type { Meal, MealFood } from '@/models/meal-types.js'
import type { Macronutrients } from '@/models/macronutrients-types.js'

export class MealUseCase {
  private mealRepository: IMealRepository

  constructor(mealRepository: IMealRepository) {
    this.mealRepository = mealRepository
  }

  private calculateTotalCalories(foods: MealFood[]) {
    const calories = foods.reduce((acc, food) => {
      return acc + food.calories
    }, 0)

    return calories
  }

  private calculateTotalMacronutrients(foods: MealFood[]) {
    const macronutrients = foods.reduce((acc, m) => {
      return {
        carbohydrates: acc.carbohydrates + m.macronutrients.carbohydrates,
        proteins: acc.proteins + m.macronutrients.proteins,
        fats: acc.fats + m.macronutrients.fats,
        sodium: acc.sodium + m.macronutrients.sodium,
        fibers: acc.fibers + m.macronutrients.fibers,
      }
    }, {} as Macronutrients)

    return macronutrients
  }

  private processMealData(meal: Meal) {
    const calories = this.calculateTotalCalories(meal.foods)

    const macronutrients = this.calculateTotalMacronutrients(meal.foods)

    const foods = meal.foods.map(f => ({ id: f.id, quantity: f.quantity }))

    return {
      id: meal.id,
      name: meal.name,
      description: meal.description,
      calories: calories,
      macronutrients: macronutrients,
      foods: foods,
    }
  }

  private async existsMealWithSameName(mealName: string) {
    const mealWithSameName = await this.mealRepository.findByName(mealName)

    return mealWithSameName !== null
  }

  async create(meal: Meal) {
    const existsMealName = await this.existsMealWithSameName(meal.name)

    if (existsMealName) {
      throw new Error('This meal name already exists')
    }

    const processedMealData = this.processMealData(meal)

    return await this.mealRepository.create(processedMealData)
  }

  async update(meal: Meal) {
    const mealWithSameName = await this.mealRepository.findByName(meal.name)

    if (mealWithSameName && mealWithSameName.id !== meal.id) {
      throw new Error('This meal name already exists')
    }

    const processedMealData = this.processMealData(meal)

    return await this.mealRepository.update(processedMealData)
  }
}
