import type { User, UserSummary } from '@/models/user-types.js'

export type UserCreate = {
  email: string
  password: string
  name: string
}

export type UserUpdate = {
  email: string
  password: string
  name: string
  age: number | null
  height: number | null
  weight: number | null
  sex: string | null
  activityLevel: string | null
}

export type UserStats = {
  age: number
  height: number
  weight: number
  sex: string
  activityLevel: string
}

export type UserLogin = {
  email: string
  password: string
}

export interface IUserRepository {
  create: (data: UserCreate) => Promise<User>
  update: (userId: number, data: UserUpdate) => Promise<User>
  delete: (userId: number) => void
  findById: (userId: number) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  addStats: (userId: number, data: UserStats) => Promise<UserSummary>
}
