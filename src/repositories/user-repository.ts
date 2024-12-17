import { prisma } from '@/database/prisma-client.js'

import type {
  IUserRepository,
  UserCreate,
  UserUpdate,
  UserStats,
} from '@/interfaces/user-interface.js'

export class UserRepository implements IUserRepository {
  async create(data: UserCreate) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    })
  }

  async addStats(userId: number, data: UserStats) {
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
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email: email,
      },
    })
  }

  async update(userId: number, data: UserUpdate) {
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
    })
  }

  async delete(userId: number) {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    })
  }
}
