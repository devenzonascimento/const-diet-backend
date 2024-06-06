import { prisma } from "../database/prisma-client.js";

import {
  FoodRepository,
  Food,
  FoodCreate,
  FoodUpdate,
} from "../interfaces/food-interface.js";

export class FoodRepositoryPrisma implements FoodRepository {
  async create(data: FoodCreate): Promise<Food> {
    return await prisma.food.create({
      data: {
        userId: data.userId,
        name: data.name,
        calories: data.calories,
        carbohydrates: data.carbohydrates,
        proteins: data.proteins,
        fats: data.fats,
        sodiums: data.sodiums,
        fibers: data.fibers,
      },
    });
  }

  async findById(foodId: string): Promise<Food | null> {
    return await prisma.food.findFirst({
      where: {
        id: foodId,
      },
      select: {
        id: true,
        name: true,
        calories: true,
        carbohydrates: true,
        proteins: true,
        fats: true,
        sodiums: true,
        fibers: true,
      }
    });
  }

  async findByName(userId: string, foodName: string): Promise<Food | null> {
    return await prisma.food.findFirst({
      where: {
        userId,
        name: foodName,
      }
    })
  }

  async getAllFoods(userId: string): Promise<Food[]> {
    return await prisma.food.findMany({ where: { userId } });
  }

  async update(foodId: string, data: FoodUpdate): Promise<Food> {
    return await prisma.food.update({
      where: {
        id: foodId,
      },
      data: {
        name: data.name,
        calories: data.calories,
        carbohydrates: data.carbohydrates,
        proteins: data.proteins,
        fats: data.fats,
        sodiums: data.sodiums,
        fibers: data.fibers,
      },
    });
  }

  async delete(foodId: string): Promise<Food> {
    return await prisma.food.delete({
      where: {
        id: foodId,
      },
    });
  }
}
