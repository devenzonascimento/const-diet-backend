import { prisma } from "../database/prisma-client.js";

import {
  User,
  UserCreate,
  UserRepository,
  UserStats,
  UserUpdate,
} from "../interfaces/user-interface.js";

export class UserRepositoryPrisma implements UserRepository {
  async create(data: UserCreate): Promise<User> {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  async addStats(userId: string, data: UserStats): Promise<User> {
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

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async update(userId: string, data: UserUpdate): Promise<User> {
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
