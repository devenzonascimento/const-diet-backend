import { prisma } from '@/database/prisma-client.js'

import type {
  IUserRepository,
  UserCreate,
  UserUpdate,
  UserStats,
} from '@/interfaces/user-interface.js'

const QUERY_USER_CREDENTIALS = {
  id: true,
  name: true,
  email: true,
  password: true,
} as const

const QUERY_USER_SUMMARY = {
  id: true,
  name: true,
  email: true,
  age: true,
  height: true,
  weight: true,
  sex: true,
  activityLevel: true,
} as const

export class UserRepository implements IUserRepository {
  async create(data: UserCreate) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      select: QUERY_USER_CREDENTIALS,
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
      select: QUERY_USER_SUMMARY,
    })
  }

  async findById(userId: number) {
    return await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: QUERY_USER_CREDENTIALS,
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: QUERY_USER_CREDENTIALS,
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
      select: QUERY_USER_CREDENTIALS,
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
