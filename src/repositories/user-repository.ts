import { prisma } from "../database/prisma-client.js";

import {
  UserRepository,
  UserCreate,
  UserUpdate,
  UserStats,
} from "../interfaces/user-interface.js";

export class UserRepositoryPrisma implements UserRepository {
  async create(data: UserCreate) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  async addStats(userId: string, data: UserStats) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        age: data.age,
        height: data.height,
        weight: data.weight,
        sex: data.sex,
        activityLevel: data.activityLevel,
      },
    });
  }

  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async update(userId: string, data: UserUpdate) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        age: data.age,
        height: data.height,
        weight: data.weight,
        sex: data.sex,
        activityLevel: data.activityLevel,
      },
    });
  }

  async delete(userId: string) {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
