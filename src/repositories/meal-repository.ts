import { prisma } from '../database/prisma-client.js'
import type {
  IMealRepository,
  CommandCreateMeal,
  CommandUpdateMeal,
} from '@/interfaces/meal-repository-interface.js'
import type { Meal } from '@/models/meal-types.js'
import type { Food } from '@/models/food-types.js'

type QueryMealResult = Omit<Meal, 'foods'> & {
  foods: {
    quantity: number
    food: Food
  }[]
}

const QUERY_SELECT = {
  id: true,
  name: true,
  description: true,
  imageUrl: true,
  calories: true,
  macronutrients: {
    select: {
      carbohydrates: true,
      proteins: true,
      fats: true,
      sodium: true,
      fibers: true,
    },
  },
  foods: {
    select: {
      quantity: true,
      food: {
        select: {
          id: true,
          name: true,
          unit: true,
          calories: true,
          macronutrients: {
            select: {
              carbohydrates: true,
              proteins: true,
              fats: true,
              sodium: true,
              fibers: true,
            },
          },
        },
      },
    },
  },
} as const

export class MealRepository implements IMealRepository {
  private userId: number

  constructor(userId: number) {
    this.userId = userId
  }

  private exportMeal(mealData: QueryMealResult) {
    const meal: Meal = {
      id: mealData.id,
      name: mealData.name,
      description: mealData.description,
      imageUrl: mealData.imageUrl,
      calories: mealData.calories,
      macronutrients: mealData.macronutrients,
      foods: mealData.foods.map(({ quantity, food }) => {
        return {
          ...food,
          quantity,
        }
      }),
    }

    return meal
  }

  // #region COMMANDS
  async create(mealData: CommandCreateMeal) {
    const result = await prisma.meal.create({
      data: {
        user: {
          connect: {
            id: this.userId,
          },
        },
        name: mealData.name,
        description: mealData.description,
        calories: mealData.calories,
        macronutrients: {
          create: {
            carbohydrates: mealData.macronutrients.carbohydrates,
            proteins: mealData.macronutrients.proteins,
            fats: mealData.macronutrients.fats,
            sodium: mealData.macronutrients.sodium,
            fibers: mealData.macronutrients.fibers,
          },
        },
        foods: {
          createMany: {
            data: mealData.foods.map(food => ({
              foodId: food.id,
              quantity: food.quantity,
            })),
          },
        },
      },
      select: QUERY_SELECT,
    })

    return this.exportMeal(result)
  }

  async update(mealData: CommandUpdateMeal) {
    const currentFoodIds = await this.getAllFoodIdsByMealId(mealData.id)

    const foodsToCreate = mealData.foods.filter(
      food => !currentFoodIds.includes(food.id),
    )
    const foodsToUpdate = mealData.foods.filter(food =>
      currentFoodIds.includes(food.id),
    )

    await prisma.$transaction([
      prisma.mealFood.deleteMany({
        where: {
          mealId: mealData.id,
          foodId: {
            notIn: mealData.foods.map(food => food.id),
          },
        },
      }),

      prisma.meal.update({
        where: {
          userId: this.userId,
          id: mealData.id,
        },
        data: {
          name: mealData.name,
          description: mealData.description,
          calories: mealData.calories,
          macronutrients: {
            update: {
              carbohydrates: mealData.macronutrients.carbohydrates,
              proteins: mealData.macronutrients.proteins,
              fats: mealData.macronutrients.fats,
              sodium: mealData.macronutrients.sodium,
              fibers: mealData.macronutrients.fibers,
            },
          },
          foods: {
            createMany: {
              data: foodsToCreate.map(food => ({
                foodId: food.id,
                quantity: food.quantity,
              })),
            },
            updateMany: foodsToUpdate.map(food => ({
              where: {
                foodId: food.id,
              },
              data: {
                quantity: food.quantity,
              },
            })),
          },
        },
      }),
    ])

    return await this.findById(mealData.id)
  }

  async delete(mealId: number) {
    await prisma.meal.delete({
      where: {
        userId: this.userId,
        id: mealId,
      },
    })
  }

  async saveImageUrl(mealId: number, imageUrl: string) {
    await prisma.meal.update({
      where: {
        id: mealId,
      },
      data: {
        imageUrl,
      },
    })
  }
  // #endregion COMMANDS

  // #region QUERIES
  private async getAllFoodIdsByMealId(mealId: number) {
    const result = await prisma.mealFood.findMany({
      where: {
        mealId,
      },
      select: {
        foodId: true,
      },
    })

    return result.map(({ foodId }) => foodId)
  }

  async findById(mealId: number) {
    const result = await prisma.meal.findUnique({
      where: {
        id: mealId,
      },
      select: QUERY_SELECT,
    })

    return this.exportMeal(result)
  }

  async findByName(mealName: string) {
    const result = await prisma.meal.findFirst({
      where: {
        userId: this.userId,
        name: mealName,
      },
      select: QUERY_SELECT,
    })

    return this.exportMeal(result)
  }

  async getAll() {
    const result = await prisma.meal.findMany({
      where: {
        userId: this.userId,
      },
      select: QUERY_SELECT,
    })

    return result.map(r => this.exportMeal(r))
  }

  async getAllWithPagination(page: number, pageSize: number) {
    const result = await prisma.meal.findMany({
      where: {
        userId: this.userId,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: QUERY_SELECT,
      orderBy: {
        name: 'asc',
      },
    })

    const meals = result.map(r => this.exportMeal(r))

    const totalCount = await prisma.food.count()

    return {
      itens: meals,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    }
  }
  //#endregion QUERIES
}
